"""Run one fixed authorization probe against both synthetic fixture profiles."""

import json
from contextlib import contextmanager
from threading import Thread
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from fixture.notes_api import CANARY, FIXTURE_ID, create_server


PROBE_ID = "cross_user_note_read_v1"


@contextmanager
def running_fixture(profile: str):
    server = create_server(profile)
    thread = Thread(target=server.serve_forever, daemon=True)
    thread.start()
    try:
        yield f"http://127.0.0.1:{server.server_port}"
    finally:
        server.shutdown()
        server.server_close()
        thread.join(timeout=5)


def probe_cross_user_note(base_url: str, profile: str) -> dict:
    request = Request(
        f"{base_url}/notes/alice-note",
        headers={"Authorization": "Bearer bob-demo-token"},
    )
    try:
        with urlopen(request, timeout=3) as response:
            status = response.status
            body = response.read(4096)
    except HTTPError as error:
        status = error.code
        body = error.read(4096)
    except (URLError, TimeoutError, OSError):
        status = None
        body = b""

    try:
        document = json.loads(body)
    except (ValueError, UnicodeDecodeError):
        document = None

    canary_match = (
        status == 200
        and isinstance(document, dict)
        and document.get("body") == CANARY
    )
    return {
        "fixture": FIXTURE_ID,
        "profile": profile,
        "probe_id": PROBE_ID,
        "status": status,
        "exact_canary_match": canary_match,
        "result": "confirmed" if canary_match else "not_reproduced" if status == 403 else "inconclusive",
    }


def run_local_comparison() -> dict:
    results = []
    for profile in ("vulnerable", "repaired"):
        with running_fixture(profile) as base_url:
            results.append(probe_cross_user_note(base_url, profile))
    return {"kind": "local_fixture_proof", "remote_execution": False, "results": results}


if __name__ == "__main__":
    print(json.dumps(run_local_comparison(), indent=2))
