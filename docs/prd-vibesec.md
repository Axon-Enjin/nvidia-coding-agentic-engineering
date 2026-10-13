# Product Requirements: VibeSec

**Project:** VibeSec
**Date:** 2026-09-30
**Version:** 0.1
**Owner:** Project owner
**Status:** Draft
**Last reconciled:** 2026-09-30
**IDEA:** [idea-vibesec.md](idea-vibesec.md)
**Scrutiny:** [scrutiny-vibesec.md](scrutiny-vibesec.md)
**BRD:** N/A; no investment or commercial justification decision in this slice.

This is the proposed hackathon slice, authorized for specification by the request to complete setup. No application exists yet. Targets below are acceptance requirements, not measurements.

## 1. Product Purpose & Value Proposition

Give a reviewer a reproducible security finding from an isolated copy of an AI-built app. The first release demonstrates the workflow on an owned synthetic notes API and its repaired counterpart. Each finding includes execution evidence, scope, and a repeatable check; an unobserved attack never becomes a confirmed vulnerability.

## 2. Target Personas

Primary: Mira, the composite fractional CTO described in the IDEA. She wants evidence that one synthetic user's notes crossed an authorization boundary, followed by a comparison after repair. Secondary: a hackathon judge evaluating real Nebius and NVIDIA usage. Neither persona is evidence of customer adoption.

## 3. Core Features & Priorities

| ID | Feature | Description | Priority |
|----|---------|-------------|----------|
| PRD-F1 | Authorized fixture scope | Only a server-side registry of owned fixture revisions and vulnerable/repaired profiles may run. | Must-Have |
| PRD-F2 | Bounded AI plan | A NVIDIA model served through Nebius selects from an allowlisted probe catalog; plan validation happens before execution. | Must-Have |
| PRD-F3 | Independent execution | Run probes in independent filesystem branches with restart, time, output, request, concurrency, and token limits; support cancellation and cleanup. | Must-Have |
| PRD-F4 | Evidence report | Deterministic assertions classify results; show scope, receipts, incomplete checks, and escaped reproducible evidence; export sanitized JSON. | Must-Have |
| PRD-F5 | Repair comparison | Replay the same valid plan against the repaired fixture and compare outcomes without claiming comprehensive security. | Must-Have |
| PRD-F6 | Optional research context | Tavily may supply cited explanatory context after findings exist; retrieval cannot add executable probes or targets. | Could-Have |
| PRD-F7 | Arbitrary target and automatic repair | Customer URLs, uploaded repositories, generated scripts, autonomous patches, and deploy gates. | Won't-Have (v0) |

## 4. User Stories & Acceptance Criteria

**US-01: Select a scoped fixture** (PRD-F1)

As Mira, I want a declared fixture revision so I know what was tested.

- Given a permitted operator session, when a registered fixture/profile is selected, then the run records its immutable source revision, image identifier, and scope before work starts.
- Given an arbitrary URL, unknown fixture, malformed profile, or credential-bearing input, when submitted, then it is rejected and no inference or sandbox operation occurs.
- Given a read-only viewer, when they try to create, cancel, or export private run data, then the server denies the action.

**US-02: Review a bounded AI plan** (PRD-F2)

- Given the fixture contract and catalog, when the NVIDIA model responds, then the plan contains 1 to 9 distinct allowlisted probe IDs and the pinned fixture ID; every field passes the schema and policy validator.
- Given invented IDs, extra commands, tool requests, or invalid JSON, when validation runs, then the plan is rejected; one bounded repair attempt is allowed, after which the run fails visibly without executing probes.
- Given a real remote run, then model identifier, prompt version, provider request receipt where available, latency, and token usage are recorded without secrets. A fixture-only replay is labeled replay and cannot satisfy the live integration check.

**US-03: Execute and stop safely** (PRD-F3)

- Given one saved baseline, when up to three probe attempts run concurrently, then each starts the app explicitly in a separate branch; changes in one branch cannot affect another or the baseline.
- Given a cancel request, timeout, quota error, or exhausted budget, when detected, then no further probes are dispatched, active operations are stopped where supported, and remaining work is marked incomplete with cleanup status.
- Given cancellation or crash, then a recovery sweep finds outstanding operation IDs and attempts cleanup; failure to clean up is shown and logged, never silently ignored.

**US-04: Inspect evidence** (PRD-F4)

- Given the seeded cross-user read, when the deterministic assertion matches the exact synthetic canary, then the report records a confirmed finding and the redacted request/response, fixture revision, probe revision, branch ID, and exit status.
- Given model text asserting a vulnerability without supporting evidence, then it remains a hypothesis and cannot become confirmed.
- Given HTML/script content, tokens, or oversized output, then rendering remains inert, sensitive values are redacted, and truncation is identified.
- Given a cancelled, failed, or empty run, then the interface shows incomplete coverage and never presents a green security verdict.

**US-05: Compare after repair** (PRD-F5)

- Given a completed vulnerable run, when the same plan executes against its registered repaired pair, then comparisons match probe IDs and fixture lineage.
- Given the repaired fixture denies cross-user access, then the seeded finding is marked not reproduced in this comparison, with the new evidence attached.
- Given a skipped or failed repaired probe, then the comparison says inconclusive; it does not claim the repair worked.

## 5. App Flow & UX Intent

**Design reference:** [dsd-vibesec.md](dsd-vibesec.md).

### 5.1 Screen Inventory

| Screen | Purpose | States |
|--------|---------|--------|
| Start run | Select owned fixture/profile and inspect declared limits | Empty: choose fixture; loading: registry; error: unavailable/invalid; success: queued run |
| Run detail | Show plan, attempts, elapsed time, limits, and stop control | Empty: queued; loading: active attempts; error: partial/failed; success: completed report |
| Finding detail | Present assertion and evidence | Empty: no confirmed finding; loading: evidence; error: unavailable/truncated; success: redacted evidence |
| Comparison | Show vulnerable/repaired results | Empty: no paired run; loading: replay; error: inconclusive; success: matched evidence |

### 5.2 Navigation Model & Information Architecture

One desktop report workspace. `/` enters fixture selection; `/runs/{id}` shows the run; `/runs/{id}/findings/{finding_id}` deep-links evidence; `/compare/{base_id}/{repair_id}` compares a pair. Browser history and a visible return link preserve orientation. The API is the authorization boundary. Public viewers see only explicitly published sanitized runs; control routes require an operator session.

### 5.3 App Flow

Select fixture, review limits, start run, inspect plan and attempts, read evidence, replay repaired fixture, compare. Rejected scope returns to selection with an explanation. Provider failure offers retry as a new run. Cancellation produces a partial report. Reload resumes the persisted run; duplicate submissions with the same idempotency key return the same run.

### 5.4 Onboarding and constraints

One fixture is preselected in the judge demo. No account creation, production connection, or personal data upload is needed. Show a confirmed synthetic finding within a five-minute target, including cold start; measure rather than claim this target. Screen and report remain usable at 375px and with a keyboard.

### 5.6 Instrumentation

| Event | Properties allowed | Measures |
|-------|--------------------|----------|
| run_started | run ID, fixture ID, profile, configured limits | Count and start time |
| plan_validated | model ID, prompt version, tokens, duration, result | Planner validity and cost |
| attempt_finished | probe ID, branch ID, status, duration, output bytes | Execution coverage and reliability |
| finding_verified | assertion ID, synthetic canary match boolean | Evidence-backed finding count |
| run_cancelled / run_finished | terminal status, elapsed time, cleanup count | Completion and cleanup |

Use internal structured events. No external analytics, raw prompts, credentials, request bodies, or personal identifiers.

## 6. Out of Scope

See PRD-F7. Also exclude organization billing, vulnerability guarantees, insurance scores, real customer data, fine-tuning, and a persistent specialist-agent roster. Three probe families are planned: object authorization, missing authentication, and a synthetic query-injection fixture. Their exact assertions and non-exploit controls belong to QAD.

## 7. AI Feature Specifications

One NVIDIA Nemotron planner, chosen from the account's available catalog after evaluation. Input: the synthetic fixture's API contract and fixed probe catalog. Output: a schema-validated plan, never code or shell. The human starts an explicitly scoped run; the backend enforces limits independently of model advice. Default budget: 12,000 input tokens and 2,000 output tokens per call, at most two calls per run. Budget selection is provisional and must be calibrated in the spike. Fail closed on refusal, invalid output, unknown model, or exhausted budget. A deterministic replay helps testing but is visibly distinct from a live model run.

## 8. Dependencies & Assumptions

The [feasibility note](research-vibesec.md) distinguishes documented APIs from runtime proof. Account-specific access, regional data handling, model ID, pricing, and network settings remain unverified. These do not justify invented pin values or security guarantees.

## 9. Implementation Plan

| Milestone | Entry | Exit | Owner | Top risk |
|-----------|-------|------|-------|----------|
| Specify | Scrutiny proceeds | Review scope and measurable acceptance criteria | Project owner | Slice creep |
| Shape | Scope settled | Runtime spike, executor decision, design states reviewed | Implementer | Network isolation |
| Implement | Shape evidence recorded | Must-Haves implemented with local and adapter tests | Implementer | Provider differences |
| Verify | Functional slice exists | QAD and AI evaluations pass, cleanup and rollback rehearsed | Implementer | False findings |
| Release | User-protection bars met | Hosted judge build, instructions, video, and model receipts available | Project owner | Readiness overclaim |
| Operate | Released | Retain judge access, monitor budgets, review evidence | Project owner | Unattended spending |

**Rollout strategy:** Local synthetic development, private staging, then a hosted judge environment exposing only the fixture registry and sanitized evidence. Public discovery remains disabled until deployment policy is settled.

**Rollback plan, authoritative for OPS and BUILD:** Disable new remote dispatch on any scope escape, secret leak, inter-branch contamination, unverified finding presented as confirmed, or uncontrolled cost. Stop outstanding provider operations and revoke exposed credentials. Redeploy the previous tested application image and configuration; if none exists, serve the static read-only demo with an explicit replay label. Deployment host and the exact deploy/revert command are TBD before Release, and must be rehearsed. Never call a planned command tested.

**RFC:** [sandbox execution decision](rfc-vibesec-sandbox-execution.md).
