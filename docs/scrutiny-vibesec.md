# IDEA Scrutiny Gate: VibeSec

**Project:** VibeSec
**Date:** 2026-09-30
**Version:** 0.1
**Owner:** Project owner
**Status:** Draft
**Last reconciled:** 2026-09-30
**IDEA:** [idea-vibesec.md](idea-vibesec.md)

## 1. Verdict

**Decision:** PROCEED WITH FIXES

**One-line rationale:** A bounded owned-fixture demo has a specific user, concrete pain, and a testable result; the proposed APIs have primary documentation, while runtime feasibility and customer demand remain unproven.

| Fix | Downstream home |
|-----|-----------------|
| Prove filesystem branching, explicit app restart, and isolation at runtime | SDD §4 and QAD sandbox contract tests |
| Prove network configuration and limit credentials to the control plane | SDD §5, RFC sandbox execution, QAD abuse tests |
| Validate available model ID and bounded JSON output before pinning dependencies | BUILD §3 and AIA §1 |
| Publish no speed, coverage, market-size, or customer claims without evidence | README, PITCH, QAD metrics |
| Treat report output as sensitive even when the fixture is synthetic | CLR §1 and report export requirements |
| Resolve source wording differences and check submission requirements again before entry | PITCH pre-flight and OPS release checklist |

## 2. Claim & Reference Audit

**Coverage:** Claims extracted: 6; load-bearing: 4; verified: 3; unverified: 3; contradicted: 0. Verified here means supported by documentation, not proven by a VibeSec run.

| ID | Category | Claim | Finding | Source | Severity if wrong |
|----|----------|-------|---------|--------|------------------|
| FC-1 | Problem | Object-level authorization failures are an established API vulnerability class. | Verified | [OWASP API1:2023](https://api-security.owasp.org/editions/2023/en/0xa1-broken-object-level-authorization/), checked 2026-09-30 | Significant |
| FC-2 | Technical | Contree provides versioned filesystem state and branching execution. | Verified | [Nebius SDK](https://github.com/nebius/contree-sdk), checked 2026-09-30 | Significant |
| FC-3 | Sponsor fit | The event requires a working application using Nebius runtime infrastructure and an NVIDIA open-source model. | Verified | [Official rules](https://nebiusglobalaihackathon.devpost.com/rules), checked 2026-09-30 | Significant |
| FC-4 | Feasibility | The planned fixture and bounded probes can run safely and reproducibly in remote branches. | Unverified; needs check | No runtime result; execute the IDEA §6 spike | Significant |
| FC-5 | User value | A reviewer like Mira will prefer this report to existing manual checks. | Unverified; needs check | Persona derived from the project research, not a customer interview | Significant |
| FC-6 | Cost / metrics | The first demo can finish within five minutes at a predictable cost. | Unverified; needs check | Proposed target only; measure in the spike | Minor |

### 2.1 References Integrity

| Reference | Backs claim | Resolves? | Supports it? | Finding |
|-----------|-------------|-----------|--------------|---------|
| [OWASP API1 page](https://api-security.owasp.org/editions/2023/en/0xa1-broken-object-level-authorization/) | FC-1 | Yes | Yes, vulnerability class; no adoption claim | Verified |
| [Nebius Contree SDK](https://github.com/nebius/contree-sdk) | FC-2 | Yes | Yes, filesystem branching; not live-memory restore | Verified |
| [Official event rules](https://nebiusglobalaihackathon.devpost.com/rules) | FC-3 | Yes | Yes, platform and model requirements; sandbox wording differs between live and indexed content | Verified |

The original research report is a source of hypotheses. Its market figures, incident statistics, acquisition claims, model prices, fine-tuning assumptions, and thousands-of-branches promises are excluded from the product's evidence base until individually verified. They are unnecessary for this slice.

## 3. Gap Analysis

| ID | Missing input | Needed by | Blocker or TBD |
|----|---------------|-----------|----------------|
| G-1 | Runtime checkpoint, loopback, network, and cleanup evidence | SDD / QAD | TBD; blocks executor promotion to a user-facing release |
| G-2 | Account-specific model and sandbox availability, quotas, pricing | BUILD / OPS | TBD; blocks a real remote demo |
| G-3 | Model response and budget evaluation | AIA / QAD | TBD; blocks model selection |
| G-4 | Actual deployment host, named release owner, alert destination | OPS | TBD; blocks deployment readiness |
| G-5 | External customer evidence | IDEA / future validation | TBD; required before claiming demand |

## 4. Assumption Stress-Test

**Load-bearing assumption:** Repeated execution against isolated copies yields reproducible evidence at a cost and latency suitable for a demo.

**Strongest argument against it:** Networking policy, service startup, fixture persistence, and output extraction may make each attempt expensive or non-repeatable. An AI planner can invent irrelevant probes or overstate results.

**Does it hold?** At risk until measured. No source contradicts the small bounded workflow. The design removes reliance on a live-memory checkpoint and prevents model output from becoming executable commands.

**Cheapest test:** Run the two-branch synthetic spike, then replay a known vulnerable and repaired fixture with deterministic assertions. Record raw exit status, timings, checkpoint IDs, and redacted evidence. No successful run has been recorded yet.

### 4.1 Audience / 10-second stress

| Check | Finding |
|-------|---------|
| Stranger hook | Pass as a design check: a working app may still let one user read another user's notes |
| Named user and pain | Pass: a transparent composite reviewer faces a specific release decision |
| Repeatable one-liner | Pass: tests a sandboxed app and shows reproducible security failures |
| Why not keep coping? | At risk: existing manual security checks may be enough; customer validation must establish the benefit |

**Audience verdict:** Holds for a technical demonstration. External demand is not established.

## 5. Feasibility & Scope

A single fixture, three allowlisted probe families, one bounded model call, and one small report interface are a plausible planning slice. This is an estimate, not calibrated delivery evidence. Use three concurrent attempts initially; increase only after measuring quota, isolation, and cost. Failed or cancelled probes are reported as incomplete, never as passing security checks.

## 6. Risk & Regulatory Pre-flight

The product's security tests stay inside owned synthetic fixtures. Target authorization, evidence minimization, model output handling, and budget limits are engineering requirements. CLR records the proposed user-protective defaults and revisit triggers. No regulatory certification or legal clearance is claimed.

## 7. Blockers

No fatal flaw found for the settled owned-fixture slice. Runtime evidence, deployment ownership, and any expansion to customer targets remain prerequisites for their respective later milestones.
