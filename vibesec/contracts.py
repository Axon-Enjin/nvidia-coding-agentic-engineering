"""Reviewed synthetic briefs, security promises, and bounded plan validation."""

from dataclasses import dataclass


FIXTURE_ID = "synthetic-notes-v1"
PROMPT_VERSION = "intent-plan-v1"


@dataclass(frozen=True)
class Brief:
    id: str
    title: str
    text: str


BRIEFS = {
    "private_notes": Brief(
        "private_notes",
        "Private notes",
        "Build a notes app. A signed-in person may read their own private notes. Another person must not read them.",
    ),
    "signed_in_notes": Brief(
        "signed_in_notes",
        "Sign-in required",
        "Build a notes app where signed-in people can read their notes. Anonymous visitors must not read notes.",
    ),
}

PROMISES = {
    "owner_only": {
        "title": "Only the owner can read a private note",
        "allowed": "Alice reads Alice's note",
        "forbidden": "Bob reads Alice's note",
        "probe_ids": ["owner_reads_note_v1", "cross_user_note_read_v1"],
    },
    "sign_in_required": {
        "title": "Reading a note requires sign-in",
        "allowed": "Alice reads Alice's note",
        "forbidden": "An anonymous visitor reads Alice's note",
        "probe_ids": ["owner_reads_note_v1", "anonymous_note_read_v1"],
    },
}

LOCAL_SELECTION = {
    "private_notes": "owner_only",
    "signed_in_notes": "sign_in_required",
}


def local_plan(brief_id: str) -> dict:
    promise_id = LOCAL_SELECTION[brief_id]
    return {
        "fixture_id": FIXTURE_ID,
        "promise_id": promise_id,
        "probe_ids": PROMISES[promise_id]["probe_ids"].copy(),
        "rationale": "The selected checks exercise both the permitted read and the forbidden read in this synthetic brief.",
    }


def validate_plan(plan: object) -> dict:
    if not isinstance(plan, dict) or set(plan) != {"fixture_id", "promise_id", "probe_ids", "rationale"}:
        raise ValueError("Plan must contain exactly fixture_id, promise_id, probe_ids, and rationale")
    if plan["fixture_id"] != FIXTURE_ID:
        raise ValueError("Unknown fixture")
    promise_id = plan["promise_id"]
    if not isinstance(promise_id, str) or promise_id not in PROMISES:
        raise ValueError("Unsupported security promise")
    probe_ids = plan["probe_ids"]
    if not isinstance(probe_ids, list) or any(not isinstance(item, str) for item in probe_ids):
        raise ValueError("Probe IDs must be strings")
    if probe_ids != PROMISES[promise_id]["probe_ids"]:
        raise ValueError("The selected promise requires its exact reviewed probe pair")
    rationale = plan["rationale"]
    if not isinstance(rationale, str) or not 1 <= len(rationale) <= 360:
        raise ValueError("Rationale must be 1 to 360 characters")
    return {
        "fixture_id": FIXTURE_ID,
        "promise_id": promise_id,
        "probe_ids": probe_ids.copy(),
        "rationale": rationale,
    }
