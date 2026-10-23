import json
import unittest
from urllib.error import HTTPError
from urllib.request import Request, urlopen

from vibesec.local_proof import probe_cross_user_note, run_local_comparison, running_fixture


def get_note(base_url, token=None):
    headers = {"Authorization": f"Bearer {token}"} if token else {}
    request = Request(f"{base_url}/notes/alice-note", headers=headers)
    try:
        with urlopen(request, timeout=3) as response:
            return response.status, json.load(response)
    except HTTPError as error:
        return error.code, json.load(error)


class FixtureTests(unittest.TestCase):
    def test_owner_can_read_in_both_profiles(self):
        for profile in ("vulnerable", "repaired"):
            with self.subTest(profile=profile), running_fixture(profile) as base_url:
                status, body = get_note(base_url, "alice-demo-token")
                self.assertEqual(status, 200)
                self.assertEqual(body["owner"], "alice")

    def test_anonymous_user_is_denied(self):
        for profile in ("vulnerable", "repaired"):
            with self.subTest(profile=profile), running_fixture(profile) as base_url:
                self.assertEqual(get_note(base_url)[0], 401)

    def test_cross_user_canary_is_confirmed_only_when_observed(self):
        with running_fixture("vulnerable") as base_url:
            result = probe_cross_user_note(base_url, "vulnerable")
            self.assertEqual(result["result"], "confirmed")
            self.assertTrue(result["exact_canary_match"])
        with running_fixture("repaired") as base_url:
            result = probe_cross_user_note(base_url, "repaired")
            self.assertEqual(result["status"], 403)
            self.assertEqual(result["result"], "not_reproduced")
            self.assertFalse(result["exact_canary_match"])

    def test_comparison_is_labeled_local(self):
        comparison = run_local_comparison()
        self.assertEqual(comparison["kind"], "local_fixture_proof")
        self.assertFalse(comparison["remote_execution"])
        self.assertEqual([r["result"] for r in comparison["results"]], ["confirmed", "not_reproduced"])

    def test_unreachable_target_is_inconclusive(self):
        result = probe_cross_user_note("http://127.0.0.1:0", "vulnerable")
        self.assertEqual(result["result"], "inconclusive")
        self.assertFalse(result["exact_canary_match"])


if __name__ == "__main__":
    unittest.main()
