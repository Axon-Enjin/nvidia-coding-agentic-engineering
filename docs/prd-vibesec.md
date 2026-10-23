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

This is the proposed hackathon slice. A loopback-only local MVP now implements a reviewed synthetic brief, bounded promise plan, deterministic checks, comparison, and fixture-specific regression export. Remote Sandbox execution and authenticated model behavior remain unverified. Targets below are acceptance requirements, not measurements.

## 1. Product Purpose & Value Proposition

Give a reviewer a reproducible security finding tied to a stated product promise. The first release demonstrates the workflow on an owned synthetic notes API and its repaired counterpart. Each finding includes the synthetic brief, reviewed promise, execution evidence, scope, and a repeatable check; an unobserved attack never becomes a confirmed vulnerability.

## 2. Target Personas

Primary: Mira, the composite fractional CTO described in the IDEA. She wants evidence that one synthetic user's notes crossed an authorization boundary, followed by a comparison after repair. Secondary: a hackathon judge evaluating real Nebius and NVIDIA usage. Neither persona is evidence of customer adoption.

## 3. Core Features & Priorities

| ID | Feature | Description | Priority |
|----|---------|-------------|----------|
| PRD-F1 | Authorized fixture scope | Only a server-side registry of owned fixture revisions and vulnerable/repaired profiles may run. | Must-Have |
| PRD-F2 | Bounded promise plan | A NVIDIA model served through Nebius maps a registered synthetic brief to a reviewed security promise and its exact allowlisted probe pair; plan validation and human review happen before execution. | Must-Have |
| PRD-F3 | Independent execution | Run probes in independent filesystem branches with restart, time, output, request, concurrency, and token limits; support cancellation and cleanup. | Must-Have |
| PRD-F4 | Evidence report | Deterministic assertions classify results; show scope, receipts, incomplete checks, and escaped reproducible evidence; export sanitized JSON. | Must-Have |
| PRD-F5 | Repair comparison | Replay the same valid plan against the repaired fixture and compare outcomes without claiming comprehensive security. | Must-Have |
| PRD-F8 | Lasting fixture check | Export a fixture-specific regression script that requires allowed behavior and denies the forbidden behavior. | Must-Have |
| PRD-F6 | Optional research context | Tavily may supply cited explanatory context after findings exist; retrieval cannot add executable probes or targets. | Could-Have |
| PRD-F7 | Arbitrary target and automatic repair | Customer URLs, uploaded repositories, generated scripts, autonomous patches, and deploy gates. | Won't-Have (v0) |

## 4. User Stories & Acceptance Criteria

**US-01: Select a scoped fixture** (PRD-F1)

As Mira, I want a declared fixture revision so I know what was tested.

- Given a permitted operator session, when a registered fixture/profile is selected, then the run records its immutable source revision, image identifier, and scope before work starts.
- Given an arbitrary URL, unknown fixture, malformed profile, or credential-bearing input, when submitted, then it is rejected and no inference or sandbox operation occurs.
- Given a read-only viewer, when they try to create, cancel, or export private run data, then the server denies the action.

**US-02: Review a bounded security promise** (PRD-F2)

- Given a registered synthetic brief, fixture contract, and catalog, when the NVIDIA model responds, then the plan contains the pinned fixture ID, one reviewed promise ID, that promise's exact required probe pair, and a bounded rationale; every field passes the schema and policy validator.
- Given a valid plan, then the operator sees the allowed and forbidden behavior before starting execution. Model prose cannot classify a finding.
- Given invented IDs, a promise unrelated to the registered brief, extra commands, tool requests, or invalid JSON, when validation runs, then the plan is rejected; one bounded repair attempt is planned for the remote service, after which the run fails visibly without executing probes. The current MVP fails immediately without retry.
- Given a real remote run, then model identifier, prompt version, provider request receipt where available, latency, and token usage are recorded without secrets. A fixture-only replay is labeled replay and cannot satisfy the live integration check.

**US-03: Execute and stop safely** (PRD-F3)

- Given one saved baseline, when up to three probe attempts run concurrently, then each starts the app explicitly in a separate branch; changes in one branch cannot affect another or the baseline.
- Given a cancel request, timeout, quota error, or exhausted budget, when detected, then no further probes are dispatched, active operations are stopped where supported, and remaining work is marked incomplete with cleanup status.
- Given cancellation or crash, then a recovery sweep finds outstanding operation IDs and attempts cleanup; failure to clean up is shown and logged, never silently ignored.

**US-04: Inspect evidence** (PRD-F4)

- Given the seeded cross-user read, when the deterministic assertion matches the exact synthetic canary, then the report links the registered brief and reviewed promise to the redacted request/response, fixture revision, probe revision, branch ID, and exit status. Local runs explicitly lack remote branch receipts.
- Given model text asserting a vulnerability without supporting evidence, then it remains a hypothesis and cannot become confirmed.
- Given HTML/script content, tokens, or oversized output, then rendering remains inert, sensitive values are redacted, and truncation is identified.
- Given a cancelled, failed, or empty run, then the interface shows incomplete coverage and never presents a green security verdict.

**US-05: Compare after repair** (PRD-F5)

- Given a completed vulnerable run, when the same plan executes against its registered repaired pair, then comparisons match probe IDs and fixture lineage.
- Given the repaired fixture denies cross-user access while the owner still reads the exact seeded note, then the seeded finding is marked not reproduced in this comparison, with both positive and negative evidence attached.
- Given a skipped or failed repaired probe, then the comparison says inconclusive; it does not claim the repair worked.

**US-06: Keep the promise as a test** (PRD-F8)

- Given a completed synthetic comparison, then the reviewer can download a fixture-specific test for the approved promise. It passes against the repaired fixture and fails against the seeded vulnerable fixture.
- The export contains synthetic identities only. It is not a general test generator for arbitrary repositories in v0.

## 5. App Flow & UX Intent

**Design reference:** [dsd-vibesec.md](dsd-vibesec.md).

### 5.1 Screen Inventory

| Screen | Purpose | States |
|--------|---------|--------|
| Start run | Select a registered synthetic brief and planning mode | Empty: choose brief; loading: planner; error: unavailable/invalid; success: reviewed plan |
| Promise review | Inspect the allowed and forbidden behavior before execution | Empty: no plan; loading: proposal; error: invalid plan; success: approved run action |
| Run detail | Show plan, attempts, elapsed time, limits, and stop control | Empty: queued; loading: active attempts; error: partial/failed; success: completed report |
| Finding detail | Present assertion and evidence | Empty: no confirmed finding; loading: evidence; error: unavailable/truncated; success: redacted evidence |
| Comparison | Show vulnerable/repaired results | Empty: no paired run; loading: replay; error: inconclusive; success: matched evidence |

### 5.2 Navigation Model & Information Architecture

One desktop report workspace. `/` enters fixture selection; `/runs/{id}` shows the run; `/runs/{id}/findings/{finding_id}` deep-links evidence; `/compare/{base_id}/{repair_id}` compares a pair. Browser history and a visible return link preserve orientation. The API is the authorization boundary. Public viewers see only explicitly published sanitized runs; control routes require an operator session.

### 5.3 App Flow

Select a registered synthetic brief, choose local or configured Nebius planning, review the promise, start the scoped run, inspect evidence, compare the repaired fixture, and download the fixture-specific test. Rejected scope returns to selection with an explanation. Provider failure offers retry as a new plan. The current local MVP holds reports in memory until restart; persisted runs, cancellation, and idempotency remain planned for the remote service.

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

One NVIDIA Nemotron planner, chosen from the account's available catalog after evaluation. Input: a registered synthetic feature brief, the fixture's API contract, and a fixed promise/probe catalog. Output: a schema-validated promise ID, its required probe IDs, and bounded rationale, never code or shell. The human reviews the promise and starts an explicitly scoped run; the backend enforces limits independently of model advice. Default budget: 12,000 input tokens and 2,000 output tokens per call, at most two calls per run. Budget selection is provisional and must be calibrated in the spike. Fail closed on refusal, invalid output, unknown model, or exhausted budget. A deterministic local plan helps testing but is visibly distinct from a live model run.

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
