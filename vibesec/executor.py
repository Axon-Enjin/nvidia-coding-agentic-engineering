"""Deterministic, local-only execution of reviewed synthetic note probes."""

import hashlib
import json
import time
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from fixture.notes_api import CANARY
from vibesec.contracts import BRIEFS, PROMISES, validate_plan
from vibesec.local_proof import running_fixture


FIXTURE_REVISION = hashlib.sha256(
    (Path(__file__).resolve().parents[1] / "fixture" / "notes_api.py").read_bytes()
).hexdigest()[:16]
PROBE_REVISION = "local-probes-v1"
PROBES = {
    "owner_reads_note_v1": ("Alice", "alice-demo-token", 200),
    "cross_user_note_read_v1": ("Bob", "bob-demo-token", 403),
    "anonymous_note_read_v1": ("Anonymous visitor", None, 401),
}


def execute_probe(base_url: str, probe_id: str, profile: str) -> dict:
    actor, token, denied_status = PROBES[probe_id]
    headers = {"Authorization": f"Bearer {token}"} if token else {}
    request = Request(f"{base_url}/notes/alice-note", headers=headers)
    start = time.monotonic()
    try:
        with urlopen(request, timeout=3) as response:
            status = response.status
            raw = response.read(4096)
    except HTTPError as error:
        status = error.code
        raw = error.read(4096)
    except (URLError, TimeoutError, OSError):
        status = None
        raw = b""
    try:
        body = json.loads(raw)
    except (ValueError, UnicodeDecodeError):
        body = None
    exact_canary = (
        status == 200 and isinstance(body, dict) and body.get("body") == CANARY
    )
    if probe_id == "owner_reads_note_v1":
        result = "expected_access" if exact_canary else "inconclusive"
    else:
        result = "confirmed_violation" if exact_canary else "blocked" if status == denied_status else "inconclusive"
    return {
        "probe_id": probe_id,
        "probe_revision": PROBE_REVISION,
        "profile": profile,
        "actor": actor,
        "request": "GET /notes/alice-note",
        "status": status,
        "response": body if isinstance(body, dict) else None,
        "exact_canary_match": exact_canary,
        "result": result,
        "duration_ms": round((time.monotonic() - start) * 1000),
    }


def run_local_comparison(plan: dict, brief_id: str) -> dict:
    plan = validate_plan(plan)
    if brief_id not in BRIEFS:
        raise ValueError("Unknown brief")
    profiles = []
    for profile in ("vulnerable", "repaired"):
        with running_fixture(profile) as base_url:
            checks = [execute_probe(base_url, probe_id, profile) for probe_id in plan["probe_ids"]]
        profiles.append({"profile": profile, "checks": checks})

    first = {item["probe_id"]: item for item in profiles[0]["checks"]}
    second = {item["probe_id"]: item for item in profiles[1]["checks"]}
    forbidden_id = plan["probe_ids"][1]
    owners_ok = all(
        checks["owner_reads_note_v1"]["result"] == "expected_access"
        for checks in (first, second)
    )
    before = first[forbidden_id]["result"]
    after = second[forbidden_id]["result"]
    if not owners_ok or "inconclusive" in (before, after):
        outcome = "inconclusive"
    elif before == "confirmed_violation" and after == "blocked":
        outcome = "violation_repaired"
    elif before == "blocked" and after == "blocked":
        outcome = "no_violation_observed"
    else:
        outcome = "inconclusive"
    return {
        "kind": "local_fixture_comparison",
        "remote_execution": False,
        "fixture_revision": FIXTURE_REVISION,
        "brief_id": brief_id,
        "brief": BRIEFS[brief_id].text,
        "promise_id": plan["promise_id"],
        "promise": PROMISES[plan["promise_id"]],
        "plan": plan,
        "profiles": profiles,
        "outcome": outcome,
        "limitation": "This checked one owned synthetic fixture on local loopback. It does not establish that another app is secure.",
    }


def regression_script(promise_id: str) -> str:
    if promise_id not in PROMISES:
        raise ValueError("Unsupported promise")
    forbidden_token = "bob-demo-token" if promise_id == "owner_only" else None
    forbidden_status = 403 if promise_id == "owner_only" else 401
    return f'''"""Fixture-specific regression check exported by VibeSec. Synthetic accounts only."""
import json
import sys
from urllib.error import HTTPError
from urllib.request import Request, urlopen

EXPECTED_CANARY = {CANARY!r}

def read(base_url, token):
    headers = {{"Authorization": "Bearer " + token}} if token else {{}}
    request = Request(base_url.rstrip("/") + "/notes/alice-note", headers=headers)
    try:
        with urlopen(request, timeout=3) as response:
            return response.status, json.load(response)
    except HTTPError as error:
        return error.code, json.load(error)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit("Usage: python regression_test.py http://127.0.0.1:8080")
    owner_status, owner_body = read(sys.argv[1], "alice-demo-token")
    if owner_status != 200 or owner_body.get("body") != EXPECTED_CANARY:
        raise SystemExit("Owner read failed")
    forbidden_status, _ = read(sys.argv[1], {forbidden_token!r})
    if forbidden_status != {forbidden_status}:
        raise SystemExit("Forbidden read was not denied")
    print("Security promise holds for these two synthetic requests")
'''
