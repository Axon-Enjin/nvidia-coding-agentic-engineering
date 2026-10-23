"""Loopback-only MVP web server. Run with: python -m vibesec.web"""

import argparse
import json
import mimetypes
import threading
import uuid
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit

from vibesec.contracts import BRIEFS, FIXTURE_ID, PROMISES, local_plan, validate_plan
from vibesec.executor import regression_script, run_local_comparison
from vibesec.planner import PlannerError, configured_model, plan_with_nebius


ASSETS = Path(__file__).resolve().parents[1] / "frontend" / "dist"


class AppState:
    def __init__(self):
        self.lock = threading.Lock()
        self.plans = {}
        self.runs = {}

    def save_plan(self, record):
        plan_id = uuid.uuid4().hex
        with self.lock:
            self.plans[plan_id] = record
        return plan_id

    def get_plan(self, plan_id):
        with self.lock:
            return self.plans.get(plan_id)

    def save_run(self, report):
        run_id = uuid.uuid4().hex
        report["run_id"] = run_id
        with self.lock:
            self.runs[run_id] = report
        return report

    def get_run(self, run_id):
        with self.lock:
            return self.runs.get(run_id)


def make_handler(state: AppState):
    class Handler(BaseHTTPRequestHandler):
        def respond(self, status, content, content_type="application/json; charset=utf-8", attachment=None):
            if isinstance(content, (dict, list)):
                content = json.dumps(content, ensure_ascii=False).encode("utf-8")
            elif isinstance(content, str):
                content = content.encode("utf-8")
            self.send_response(status)
            self.send_header("Content-Type", content_type)
            self.send_header("Content-Length", str(len(content)))
            self.send_header("Cache-Control", "no-store")
            self.send_header("X-Content-Type-Options", "nosniff")
            self.send_header("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'; base-uri 'none'; form-action 'self'")
            if attachment:
                self.send_header("Content-Disposition", f'attachment; filename="{attachment}"')
            self.end_headers()
            self.wfile.write(content)

        def do_GET(self):
            path = urlsplit(self.path).path
            if path == "/api/config":
                return self.respond(200, {
                    "fixture_id": FIXTURE_ID,
                    "briefs": [brief.__dict__ for brief in BRIEFS.values()],
                    "promises": PROMISES,
                    "nebius_available": bool(configured_model()),
                    "nebius_model": configured_model(),
                })
            if path.startswith("/api/runs/"):
                parts = path.split("/")
                if len(parts) not in (4, 5):
                    return self.respond(404, {"error": "not_found"})
                run = state.get_run(parts[3])
                if run is None:
                    return self.respond(404, {"error": "not_found"})
                if len(parts) == 4:
                    return self.respond(200, run)
                if parts[4] == "report.json":
                    return self.respond(200, run, attachment="vibesec-report.json")
                if parts[4] == "regression.py":
                    return self.respond(
                        200,
                        regression_script(run["promise_id"]),
                        content_type="text/x-python; charset=utf-8",
                        attachment="regression_test.py",
                    )
                return self.respond(404, {"error": "not_found"})
            if path not in ("/", "/favicon.svg") and not path.startswith(("/assets/", "/fonts/")):
                return self.respond(404, {"error": "not_found"})
            asset = (ASSETS / ("index.html" if path == "/" else path.lstrip("/"))).resolve()
            if not asset.is_relative_to(ASSETS.resolve()) or not asset.is_file():
                return self.respond(404, {"error": "asset_not_found", "message": "Build the frontend with npm run build first."})
            content_type = mimetypes.guess_type(asset.name)[0] or "application/octet-stream"
            if content_type.startswith("text/") or content_type in ("application/javascript", "image/svg+xml"):
                content_type += "; charset=utf-8"
            return self.respond(200, asset.read_bytes(), content_type)

        def do_POST(self):
            origin = self.headers.get("Origin")
            expected_origin = f"http://127.0.0.1:{self.server.server_port}"
            if origin and origin != expected_origin:
                return self.respond(403, {"error": "cross_origin_denied"})
            if self.headers.get("Content-Type", "").split(";")[0].strip() != "application/json":
                return self.respond(415, {"error": "json_required"})
            try:
                length = int(self.headers.get("Content-Length", "0"))
                if not 0 < length <= 2048:
                    raise ValueError("request too large")
                payload = json.loads(self.rfile.read(length))
                if not isinstance(payload, dict):
                    raise ValueError("expected object")
            except (ValueError, json.JSONDecodeError):
                return self.respond(400, {"error": "invalid_request"})

            path = urlsplit(self.path).path
            if path == "/api/plans":
                if set(payload) != {"brief_id", "mode"}:
                    return self.respond(400, {"error": "invalid_plan_request"})
                brief_id, mode = payload["brief_id"], payload["mode"]
                if not isinstance(brief_id, str) or brief_id not in BRIEFS or mode not in ("local", "nebius"):
                    return self.respond(400, {"error": "unsupported_selection"})
                try:
                    if mode == "nebius":
                        plan, receipt = plan_with_nebius(brief_id)
                    else:
                        plan = validate_plan(local_plan(brief_id))
                        receipt = {"provider": "local deterministic planner", "model": None}
                except PlannerError as error:
                    return self.respond(502, {"error": "planning_failed", "message": str(error)})
                plan_id = state.save_plan({"brief_id": brief_id, "mode": mode, "plan": plan, "planner_receipt": receipt})
                return self.respond(200, {"plan_id": plan_id, "brief": BRIEFS[brief_id].__dict__, "plan": plan, "planner_mode": mode, "planner_receipt": receipt})

            if path == "/api/runs":
                if set(payload) != {"plan_id"} or not isinstance(payload["plan_id"], str):
                    return self.respond(400, {"error": "invalid_run_request"})
                record = state.get_plan(payload["plan_id"])
                if record is None:
                    return self.respond(404, {"error": "unknown_plan"})
                try:
                    report = run_local_comparison(record["plan"], record["brief_id"])
                except (ValueError, OSError):
                    return self.respond(500, {"error": "execution_failed", "message": "The local fixture did not complete; the result is inconclusive"})
                report["planner_mode"] = record["mode"]
                report["planner_receipt"] = record["planner_receipt"]
                return self.respond(200, state.save_run(report))
            return self.respond(404, {"error": "not_found"})

        def log_message(self, format, *args):
            pass

    return Handler


def create_app_server(port=8000):
    return ThreadingHTTPServer(("127.0.0.1", port), make_handler(AppState()))


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=8000)
    args = parser.parse_args()
    with create_app_server(args.port) as server:
        print(f"VibeSec MVP: http://127.0.0.1:{server.server_port}", flush=True)
        server.serve_forever()
