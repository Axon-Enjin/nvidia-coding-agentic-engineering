# VibeSec Demo Script

**Project:** VibeSec
**Date:** 2026-09-30
**Version:** 0.1
**Owner:** Project owner
**Status:** Draft
**Last reconciled:** 2026-09-30
**IDEA:** [idea-vibesec.md](idea-vibesec.md)
**Requirements:** [product requirements](prd-vibesec.md)

This is a proposed recording plan. The application, runtime footage, findings, and performance measurements do not exist yet. Replace each planned scene with real footage before presenting it as completed work.

## 1. Narrative Spine

Hook: The app works. Can one account read another account's private note?

Problem: A functional test shows that a feature runs. A reviewer still needs evidence that the authorization boundary holds.

Solution: VibeSec tests an owned synthetic app in isolated copies and reports reproducible observations.

Proof: Show the exact synthetic record crossing the boundary, then the same check against the repaired version.

Close: This demonstrates a bounded security workflow. It does not claim to find every vulnerability or prove an app secure.

## 2. Scene Outline

| Scene | On screen | Spoken point | Seconds |
|-------|-----------|--------------|---------|
| 1 | Two synthetic accounts and a private note | A normal feature can work while its access rule fails. | 15 |
| 2 | Fixture revision and declared test scope | This demo uses our own fixture and fake data. | 20 |
| 3 | Live plan receipt and model identifier | NVIDIA Nemotron through Nebius chooses from a bounded test catalog. | 25 |
| 4 | Actual remote attempts and recorded branch IDs | The checks run in separate Token Factory Sandbox branches. | 35 |
| 5 | Confirmed observation and redacted request/response | Show what crossed the boundary and how to repeat the check. | 30 |
| 6 | Repaired comparison | The same check now returns the expected denial. | 25 |
| 7 | Scope and limitations | This is evidence for the checks shown, not a security guarantee. | 15 |

**Total time:** 165 seconds, leaving margin below three minutes. Wait time may be edited; label any cuts and show measured timings rather than implying instantaneous execution.

## 3. Demo Preparation

The presenter is not assigned yet. Prepare the known fixture revisions, credentials for synthetic accounts only, bounded quotas, sanitized receipts, model usage evidence, and a recorded fallback. Show live and replay states truthfully. Do not connect a real customer target or disclose operator/provider credentials. If the provider fails, use labeled recorded footage and explain the failure; do not present replay as a fresh run.

## 4. Judging Criteria Map

| Criterion | Scene | Evidence to earn |
|-----------|-------|------------------|
| Technological implementation | 3 and 4 | Real model call and sandbox execution receipts |
| Design | 2, 5, and 6 | Coherent scope, evidence, incomplete states, and comparison |
| Potential impact | 1 and 5 | Concrete review problem and reproducible result |
| Quality of the idea | 4 and 6 | Branch independence and a repeatable repair comparison |

The [official rules](https://nebiusglobalaihackathon.devpost.com/rules) govern; check them again before entry. Planned deadline: October 31, 2026 at 1:00 am Manila. Judge availability through the end of the testing period must be verified before submission.

## 5. Pre-Demo Readiness

**Gate status:** Not ready; no application or evaluated integration exists. Runtime proof, interface audit, budget/cancellation controls, release owner, hosting, judge instructions, and actual recording remain open. The product license is MIT.

## 6. Anticipated Questions

| Question | Honest answer |
|----------|---------------|
| Does this prove the app is secure? | It proves only the observations from the checks and fixture revisions shown. |
| Does it restore a running app's memory? | The planned demo restarts from filesystem state; live-memory restoration is not claimed. |
| Does the AI execute whatever it generates? | It selects supported check IDs; reviewed code controls execution and verifies observations. |
| Can I test a production URL? | This first demo accepts only our registered synthetic fixtures. |
| How much does a run cost? | Publish the measured provider usage and pricing after the integration benchmark; no estimate is claimed yet. |
