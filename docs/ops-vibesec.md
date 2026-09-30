# Operations and Observability: VibeSec

**Project:** VibeSec
**Date:** 2026-09-30
**Version:** 0.1
**Owner:** Project owner
**Status:** Draft
**Last reconciled:** 2026-09-30
**SDD:** [sdd-vibesec.md](sdd-vibesec.md)

**Current state:** No hosted app, logs pipeline, live metrics, alert destination, backup, or deployment exists. This is the proposed runbook; nothing below is marked operational.

## 1. SLOs and SLIs

| SLI | Proposed objective | Measurement | Breach action |
|-----|--------------------|-------------|---------------|
| Scope/evidence integrity | Zero scope escapes or false confirmed findings in release evaluation | QAD results and audit events | Stop dispatch; investigate as P0 |
| Control API p95 | Under 500 ms excluding provider work | Per-route server timings | Investigate capacity or storage |
| Demo completion | Under five minutes for the bounded plan | Start/finish events | Show partial results; review cold-start measurements |
| Cleanup accounting | Every created operation has tracked terminal/cleanup state | Receipt reconciliation | Stop new remote runs if orphaned operations persist |
| Spend | Stay within configured token and resource caps | Provider usage and run limits | Stop dispatch at cap; no automatic top-up |

Targets are provisional. Currency spend ceiling must be calculated from current account prices before deployment; no dollar cost is asserted yet.

## 2. Observability

Capture structured JSON events with run ID, attempt ID, provider receipt IDs, stage, duration, output size, token usage, and error code. Exclude provider credentials, session tokens, raw request bodies, raw prompts, and personal data. Keep detailed evidence in the separately authorized report store. A single request/run ID connects API, worker, provider receipt, and verifier.

Planned metrics: active attempts, completed/failed/timed-out attempts, planner validation failures, cleanup failures, queue age, run duration, and token usage. Seven-day staging retention is provisional. A run dashboard should show these from persisted events; no dashboard is wired yet.

## 3. Alerting and On-Call

| Alert | Trigger | Severity | Owner / channel |
|-------|---------|----------|-----------------|
| Scope escape or credential exposure | Any confirmed occurrence | P0 | Project owner; actual named contact and channel TBD before release |
| Unaccounted provider operation | Recovery/cleanup cannot reconcile after two bounded attempts | P1 | Same unresolved contact |
| Spend or quota threshold | Hard configured cap reached, or repeated provider quota errors | P1 | Same unresolved contact |
| Judge demo unavailable | Two consecutive health checks fail | P1 | Same unresolved contact |

Solo ownership is assumed for planning, not a named on-call assignment. A release requires an alert test reaching a real designated person. Do not silently convert an unanswered contact question into a fabricated identity.

## 4. Incident Response

1. Disable new remote dispatch and preserve sanitized receipts.
2. Stop known active operations where supported; reconcile ambiguous IDs.
3. Revoke exposed credentials and remove affected evidence from public access.
4. Identify scope and affected data, then involve the owner in notification decisions using actual obligations.
5. Apply the authoritative [PRD §9 rollback plan](prd-vibesec.md#9-implementation-plan). Record cause, evidence, and follow-up checks before resuming.

The remote-execution switch must be a tested server-side configuration control. UI disabling alone is insufficient. Exact switch name, provider cancellation command, deploy command, and restore command are set during implementation and rehearsed before Release.

## 5. Routine Operations

Before every demo: check model and sandbox access, fixture revision, eval baseline, budgets, available quota, no active orphan, and replay labeling. Review account usage after remote runs. Rotate credentials after exposure and when moving environments. Review dependency/security updates before releases. Rebuild the synthetic fixture from its pinned source; test metadata restore before release. Preserve explicitly published judge access through the required testing period and label any replay clearly. Check current official dates before submission; do not create a reminder or monitor unless requested.
