"""Disposable, synthetic notes API for VibeSec's authorization probe.

This fixture is intentionally vulnerable in one profile. Never deploy it with
real data or expose it outside loopback.
"""

import argparse
import json
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlsplit


FIXTURE_ID = "synthetic-notes-v1"
CANARY = "VIBESEC-SYNTHETIC-ALICE-NOTE-7F3A"
NOTES = {"alice-note": {"owner": "alice", "body": CANARY}}
TOKENS = {"alice-demo-token": "alice", "bob-demo-token": "bob"}


def make_handler(profile: str):
    if profile not in {"vulnerable", "repaired"}:
        raise ValueError("profile must be vulnerable or repaired")

    class NotesHandler(BaseHTTPRequestHandler):
        def do_GET(self):
            path = urlsplit(self.path).path
            if path == "/health":
                return self.send_json(200, {"fixture": FIXTURE_ID, "profile": profile})

            if not path.startswith("/notes/") or path.count("/") != 2:
                return self.send_json(404, {"error": "not_found"})

            auth = self.headers.get("Authorization", "")
            user = TOKENS.get(auth.removeprefix("Bearer ")) if auth.startswith("Bearer ") else None
            if user is None:
                return self.send_json(401, {"error": "unauthorized"})

            note = NOTES.get(path.removeprefix("/notes/"))
            if note is None:
                return self.send_json(404, {"error": "not_found"})
            if profile == "repaired" and note["owner"] != user:
                return self.send_json(403, {"error": "forbidden"})

            return self.send_json(200, {"id": "alice-note", "owner": note["owner"], "body": note["body"]})

        def send_json(self, status: int, body: dict):
            payload = json.dumps(body, separators=(",", ":")).encode("utf-8")
            self.send_response(status)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(payload)))
            self.end_headers()
            self.wfile.write(payload)

        def log_message(self, format, *args):
            pass

    return NotesHandler


def create_server(profile: str, host: str = "127.0.0.1", port: int = 0):
    return ThreadingHTTPServer((host, port), make_handler(profile))


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--profile", required=True, choices=("vulnerable", "repaired"))
    parser.add_argument("--port", type=int, default=8080)
    args = parser.parse_args()
    with create_server(args.profile, port=args.port) as server:
        print(f"{FIXTURE_ID} {args.profile} listening on http://127.0.0.1:{server.server_port}", flush=True)
        server.serve_forever()
