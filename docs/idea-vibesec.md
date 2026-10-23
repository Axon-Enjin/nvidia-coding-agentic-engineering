# Idea Brief: VibeSec

**Project:** VibeSec
**Date:** 2026-09-30
**Version:** 0.1
**Owner:** Project owner
**Status:** Draft
**Last reconciled:** 2026-09-30
**Event / context:** Nebius x NVIDIA Global AI Hackathon, Coding and Agentic Engineering.

## 1. The Spark

**One-line pitch:** VibeSec turns a builder's stated security promise into a reviewed check, shows whether an AI-built app kept it, and leaves a repeatable test.

**Problem:** A working app can still expose another user's records or accept a request without the required authorization. A builder reviewing generated code needs evidence of the failure and a way to repeat the check after a fix.

**Insight (why us, why now):** Link the product brief to an explicit access rule and observed HTTP evidence. Use repeatable sandbox state to compare a vulnerable fixture with its repaired version. A successful request against synthetic data is more useful in this demo than an unsupported vulnerability score. The proposed workflow combines a bounded AI promise planner with deterministic verification and a lasting fixture-specific check.

**Riskiest assumption:** The remote sandbox can run the fixture and independent probes with enough isolation, repeatability, and predictable latency to produce credible evidence. Documentation establishes filesystem branching; it does not establish this application-level result.

## 2. Who It's For

**Primary user (named, specific):** Mira, a fictional composite fractional CTO reviewing a small team's AI-generated web app before a staging release. She is a design persona, not an interviewed customer.

**Their moment of pain:** The app's functional tests pass, but Mira cannot tell whether a second account can retrieve a first account's private record. She needs a repeatable test before approving the release.

**Success in their words:** Target outcome, not a customer quote: show the request, the synthetic record that crossed the boundary, and the same check failing after the repair.

## 3. Scope & Cut Line

| Capability | Core to the one thing? |
|------------|------------------------|
| Select an owned, versioned fixture in vulnerable or repaired mode | Yes |
| Map a registered synthetic brief to a reviewed promise and bounded plan using NVIDIA Nemotron through Nebius | Yes |
| Execute allowlisted probes in independent Token Factory Sandbox branches | Yes |
| Verify findings from execution evidence and show a readable report | Yes |
| Re-run the same checks against the repaired fixture | Yes |
| Export the approved promise as a fixture-specific regression check | Yes |

**Explicitly out of scope (v0):** Arbitrary target URLs, repository uploads, production credentials or data, unrestricted generated shell commands, autonomous patching or deployment, thousands of parallel attacks, zero-day payload collection, billing, team accounts, and claims that an app is secure.

**If we only ship one thing:** A browser demo takes the synthetic brief "private notes," shows the rule "only the owner reads a note," runs its allowed and forbidden checks against a deliberately vulnerable two-user notes API, repeats them against the repaired fixture, and exports the check.

## 4. Success & Judging Criteria

Success means evidence-backed seeded findings, a repaired negative control, an auditable NVIDIA model call, real remote sandbox execution, and no target or credential escape. The model proposes a reviewed promise and its fixed probe IDs; code controls scope and determines whether evidence meets a finding's assertion.

| Criterion | Demo evidence to produce |
|-----------|--------------------------|
| Technological implementation | Real Nebius inference and remote sandbox run receipts |
| Design | A readable run view with clear incomplete, error, and confirmed states |
| Potential impact | A concrete authorization failure and its repair, with limitations stated |
| Quality of the idea | Independent branches and a repeatable before/after comparison |

Submission planning date: 2026-10-31 at 01:00 Asia/Manila, subject to a final check of the [official rules](https://nebiusglobalaihackathon.devpost.com/rules).

## 5. Concept Visuals

No image assets generated. The browser flow and component specification will live in the design document.

## 6. Open Questions

| Question | Owner | Resolve by |
|----------|-------|------------|
| Does a restart from the baseline checkpoint preserve synthetic state while isolating writes between branches? | Implementer | First remote spike |
| Can networking be disabled while the app and probe communicate over loopback? | Implementer | Before sandbox executor implementation |
| Which available NVIDIA model passes the bounded-plan evaluation within the token budget? | Implementer | Inference spike |
| Does this evidence format help a real reviewer make a decision? | Project owner | Before an external pilot |

**Spike plan:** Build a disposable synthetic fixture only, run two branches from one checkpoint, mutate one branch, verify the other remains unchanged, restart the fixture explicitly, and measure time, output volume, and billed resource usage. No customer data or public targets.
