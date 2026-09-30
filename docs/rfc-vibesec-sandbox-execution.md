# RFC: Bounded Sandbox Execution

**Title:** Filesystem branches with a deterministic probe executor
**Project:** VibeSec
**Date:** 2026-09-30
**Version:** 0.1
**Author:** Implementing agent
**Owner:** Project owner
**Status:** Draft
**Last reconciled:** 2026-09-30
**RFC ID:** `vibesec-rfc-001`
**PRD Reference:** [PRD-F1 through PRD-F5](prd-vibesec.md)
**SDD Reference:** [SDD §4, §5, §8](sdd-vibesec.md)

## 1. Context & Objective

The research pitch suggests live branching and unrestricted attack generation. Those behaviors expand authority and assume more than the verified APIs establish. The demo needs repeatable evidence against an owned fixture without allowing an untrusted model or fixture to choose targets, commands, or credentials.

Success is a real two-branch remote run where one branch's write does not appear in the other, the fixed launcher restarts the service, the vulnerable canary is observed, the repaired negative control is not, and timeout/cancellation do not leave unaccounted operations.

## 2. Proposed Solution

**Proposed decision:** Use independent filesystem branches, explicit service startup, a fixed reviewed launcher, and a model-selected allowlisted probe plan. Adopt after the spike; no architecture approval or successful runtime proof is claimed here.

The control plane obtains a baseline image, starts a new branch for each attempt, executes only fixed catalog logic against loopback, verifies bounded receipts, and records cleanup status. At most three operations are active. The planner's output selects IDs and supplies no executable code.

This is intentionally narrower than testing arbitrary applications. It produces an auditable demo and a seam for later ingestion, without treating a generic sandbox as a complete authorization policy. Retaining the fixture baseline does not imply retaining provider secrets or running processes.

## 3. Technical Details & Contracts

Application adapter contract, not a claim that these exact method names exist in the provider SDK:

```text
prepare_fixture(fixture_revision, profile) -> baseline receipt
execute_probe(baseline_id, probe_id, limits, run_id) -> bounded attempt receipt
cancel_operation(operation_id) -> stopped | already_finished | unknown
cleanup(receipt) -> removed | retained_by_provider | failed
```

Each receipt carries provider operation and branch IDs when available, submitted timestamp, fixture/probe revisions, exit status, elapsed time, truncation flag, and cleanup outcome. Store provider IDs before awaiting completion. Retry only after reconciling whether an operation already exists.

State transitions and API contracts are authoritative in SDD §3 and §4. Compare only a registered vulnerable/repaired pair and a previously validated immutable plan. Database updates never erase incomplete attempts.

Networking: verify the low-level provider configuration and loopback operation before claiming denied egress. If the needed isolation cannot be demonstrated, keep remote execution disabled and continue with a visibly labeled local replay while revising this decision. That replay does not satisfy the live sandbox demo requirement.

## 4. Alternatives Considered

| Option | Benefit | Cost / decision |
|--------|---------|-----------------|
| Live-memory checkpoint and resume | Potentially faster reuse of a running app | Not established by available filesystem checkpoint documentation; excluded from v0 |
| Rebuild fixture separately per attempt | Clear independent startup path | Possible fallback if checkpoint semantics fail; measure overhead before adoption |
| Generate and execute unrestricted scripts | Larger apparent attack search space | Unbounded target/command authority and poor evidence control; excluded from this slice |
| Fixed probes without an AI planner | Simplest reliable baseline | Useful test control; live product retains a bounded model-selection task with explicit receipts |

## 5. AI Implementation Notes

The model sees the synthetic contract and catalog and returns `{fixture_id, probe_ids, rationale}`. Rationale is explanation only. Reject additional fields, unknown IDs, duplicates, over-budget counts, target overrides, or tool requests. Provider structured output is a convenience, not an enforcement mechanism. Record exact model ID only after authenticated catalog selection and evaluation.

## 6. Security, Privacy & Performance

Keep provider credentials in the service, never in fixture environment or preserved checkpoint metadata. Bound attempts, duration, output, fixture requests, tokens, and dispatcher concurrency. Fixture canaries are synthetic. Any uploaded customer artifact or arbitrary target changes the trust model and requires a separate scope/design review.

Latency, provider compute cost, quota behavior, and retained checkpoint cleanup remain unmeasured. Follow the primary sources and caveats in the [feasibility note](research-vibesec.md).

## 7. Execution Plan

1. Run the synthetic isolation/networking spike and save its receipts.
2. Bind the adapter to verified SDK/client versions and resolve timeout/retry semantics.
3. Implement the deterministic executor and verifier independently of the planner.
4. Execute QAD contract, abuse, cancellation, and before/after scenarios.

**Remote-execution switch:** Disabled until spike and QAD isolation evidence exist. No owner preference or irreversible release decision is resolved by this draft.
