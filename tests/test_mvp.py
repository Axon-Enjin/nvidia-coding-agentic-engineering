import json
import subprocess
import sys
import tempfile
import threading
import unittest
from pathlib import Path
from unittest.mock import patch
from urllib.error import HTTPError
from urllib.request import Request, urlopen

from vibesec.contracts import local_plan, validate_plan
from vibesec.executor import regression_script, run_local_comparison
from vibesec.local_proof import running_fixture
from vibesec.web import create_app_server
from vibesec.planner import PlannerError, plan_with_nebius


class ContractTests(unittest.TestCase):
    def test_plan_cannot_add_commands_or_drop_positive_control(self):
        plan = local_plan("private_notes")
        plan["command"] = "anything"
        with self.assertRaises(ValueError):
            validate_plan(plan)
        plan = local_plan("private_notes")
        plan["probe_ids"] = ["cross_user_note_read_v1"]
        with self.assertRaises(ValueError):
            validate_plan(plan)

    def test_two_briefs_produce_distinct_bounded_checks(self):
        private = validate_plan(local_plan("private_notes"))
        signed_in = validate_plan(local_plan("signed_in_notes"))
        self.assertNotEqual(private["promise_id"], signed_in["promise_id"])
        self.assertNotEqual(private["probe_ids"][1], signed_in["probe_ids"][1])

    def test_positive_and_negative_controls_shape_verdict(self):
        private = run_local_comparison(local_plan("private_notes"), "private_notes")
        self.assertEqual(private["outcome"], "violation_repaired")
        self.assertFalse(private["remote_execution"])
        signed_in = run_local_comparison(local_plan("signed_in_notes"), "signed_in_notes")
        self.assertEqual(signed_in["outcome"], "no_violation_observed")

    def test_exported_regression_check_passes_repair_and_fails_vulnerability(self):
        with tempfile.TemporaryDirectory() as directory:
            script = Path(directory) / "regression_test.py"
            script.write_text(regression_script("owner_only"), encoding="utf-8")
            with running_fixture("repaired") as base_url:
                passed = subprocess.run([sys.executable, str(script), base_url], capture_output=True, text=True, timeout=10)
            with running_fixture("vulnerable") as base_url:
                failed = subprocess.run([sys.executable, str(script), base_url], capture_output=True, text=True, timeout=10)
        self.assertEqual(passed.returncode, 0, passed.stderr)
        self.assertNotEqual(failed.returncode, 0)


class PlannerTests(unittest.TestCase):
    def test_live_response_is_validated_and_receipted(self):
        class FakeResponse:
            headers = {"x-request-id": "synthetic-request-1"}
            def __enter__(self):
                return self
            def __exit__(self, *_):
                return None
            def read(self, *_):
                return json.dumps({
                    "model": "nvidia/test-model",
                    "choices": [{"finish_reason": "stop", "message": {"content": json.dumps(local_plan("private_notes"))}}],
                    "usage": {"prompt_tokens": 100, "completion_tokens": 25},
                }).encode()
        with patch.dict("os.environ", {"NEBIUS_API_KEY": "synthetic-key", "NEBIUS_MODEL": "nvidia/test-model"}), patch("vibesec.planner.urlopen", return_value=FakeResponse()):
            plan, receipt = plan_with_nebius("private_notes")
        self.assertEqual(plan["promise_id"], "owner_only")
        self.assertEqual(receipt["request_id"], "synthetic-request-1")
        self.assertEqual(receipt["input_tokens"], 100)

    def test_live_model_cannot_invent_probe(self):
        bad = local_plan("private_notes")
        bad["probe_ids"] = ["shell_anything"]
        class FakeResponse:
            headers = {}
            def __enter__(self):
                return self
            def __exit__(self, *_):
                return None
            def read(self, *_):
                return json.dumps({"choices": [{"finish_reason": "stop", "message": {"content": json.dumps(bad)}}]}).encode()
        with patch.dict("os.environ", {"NEBIUS_API_KEY": "synthetic-key", "NEBIUS_MODEL": "nvidia/test-model"}), patch("vibesec.planner.urlopen", return_value=FakeResponse()):
            with self.assertRaises(PlannerError):
                plan_with_nebius("private_notes")

    def test_live_model_cannot_select_unrelated_promise(self):
        wrong = local_plan("signed_in_notes")
        class FakeResponse:
            headers = {}
            def __enter__(self):
                return self
            def __exit__(self, *_):
                return None
            def read(self, *_):
                return json.dumps({"choices": [{"finish_reason": "stop", "message": {"content": json.dumps(wrong)}}]}).encode()
        with patch.dict("os.environ", {"NEBIUS_API_KEY": "synthetic-key", "NEBIUS_MODEL": "nvidia/test-model"}), patch("vibesec.planner.urlopen", return_value=FakeResponse()):
            with self.assertRaises(PlannerError):
                plan_with_nebius("private_notes")


class WebTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server = create_app_server(0)
        cls.thread = threading.Thread(target=cls.server.serve_forever, daemon=True)
        cls.thread.start()
        cls.base = f"http://127.0.0.1:{cls.server.server_port}"

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        cls.server.server_close()
        cls.thread.join(timeout=5)

    def request_json(self, path, payload=None, origin=None):
        headers = {"Content-Type": "application/json"}
        if origin:
            headers["Origin"] = origin
        data = json.dumps(payload).encode() if payload is not None else None
        request = Request(self.base + path, data=data, headers=headers)
        try:
            with urlopen(request, timeout=10) as response:
                return response.status, json.load(response)
        except HTTPError as error:
            return error.code, json.load(error)

    def test_review_then_run_then_download(self):
        status, config = self.request_json("/api/config")
        self.assertEqual(status, 200)
        self.assertEqual(config["fixture_id"], "synthetic-notes-v1")
        status, planned = self.request_json("/api/plans", {"brief_id": "private_notes", "mode": "local"})
        self.assertEqual(status, 200)
        self.assertEqual(planned["plan"]["promise_id"], "owner_only")
        status, report = self.request_json("/api/runs", {"plan_id": planned["plan_id"]})
        self.assertEqual(status, 200)
        self.assertEqual(report["outcome"], "violation_repaired")
        self.assertEqual(report["planner_mode"], "local")
        status, saved = self.request_json("/api/runs/" + report["run_id"])
        self.assertEqual(status, 200)
        self.assertEqual(saved["run_id"], report["run_id"])
        with urlopen(self.base + "/api/runs/" + report["run_id"] + "/regression.py") as response:
            self.assertIn(b"Owner read failed", response.read())

    def test_rejects_unknown_scope_and_foreign_origin(self):
        status, _ = self.request_json("/api/plans", {"brief_id": "https://example.com", "mode": "local"})
        self.assertEqual(status, 400)
        status, _ = self.request_json("/api/plans", {"brief_id": "private_notes", "mode": "local"}, origin="https://evil.example")
        self.assertEqual(status, 403)


if __name__ == "__main__":
    unittest.main()
