# VibeSec Build Guide

**Project:** VibeSec
**Date:** 2026-09-30
**Version:** 0.1
**Owner:** Project owner
**Status:** Draft
**Last reconciled:** 2026-10-01
**PRD:** `docs/prd-vibesec.md`
**SDD:** `docs/sdd-vibesec.md`
**SAD:** N/A; no persistent specialist roster.

Project paths in this guide are relative to the project root. Engine paths are relative to the separate clone located by `python scripts/fmd.py locate`; README describes team setup.

## 1. How to Build From These Docs

Follow the repository-root `AGENTS.md` pointer for session startup, engine routing, and current project state. Templates, guides, and engine scripts stay in the FMD clone. Load the smallest relevant subset for the current task.

Implement a PRD-F# by reading its acceptance criteria, SDD realization, relevant RFC, and matching QAD happy/sad/abuse rows. UI work also reads DSD. AI work also reads AIA. Data, target scope, or provider handling changes require CLR reconciliation. Do not treat Draft plans or a green document validator as implemented behavior.

**Next implementation slice:** the disposable owned-fixture sandbox/inference spike in `docs/research-vibesec.md`. Its exit evidence is explicit branch independence, service restart, denied egress plus working loopback, bounded output/timeouts, receipt reconciliation, and a selected model passing the plan schema. Do not dispatch real customer targets or use production data.

Commands available now:

```powershell
.\scripts\fmd.ps1 check
.\scripts\fmd.ps1 record -Action "Describe completed work"
```

The Python launcher runs the engine scripts from the separate clone; the PowerShell helper locates an interpreter and calls that launcher. On other platforms use `python scripts/fmd.py check` and `python scripts/fmd.py record --action "..."`. Configure `FMD_ROOT` or pass `--fmd-root` (PowerShell: `-FmdRoot`) for a custom location. Run all from project root. On a cockpit request, use `python scripts/fmd.py cockpit`; its output is generated and ignored.

After artifact changes, update state when the position changed, then run record. Keep implementation guidance in this canonical BUILD copy; root AGENTS stays a thin pointer. Product artifacts remain Draft until reviewed against real evidence; Locked changes require the canonical change process.

## 2. Subagents

No persistent roster. A single research delegation produced the feasibility note; no repeated specialist work or agent system is established. Implement routine work in the main agent. Delegate only when user instructions or FMD's applicable spawn rule justify it.

## 3. Stack Currency & Deprecations

| Layer | Technology | Pin / state | Verified | Source |
|-------|------------|-------------|----------|--------|
| Documentation engine | FMD | FMD v3.0.1 | 2026-10-12 | README stamp |
| Local interpreter | Python | 3.12.14 observed in bundled runtime | 2026-09-30 | Interpreter `--version`; docs.python.org/3.12 |
| Control API | FastAPI / Pydantic | Proposed; exact dependency lock pending first implementation | 2026-09-30 | Confirm official docs and resolved packages before writing framework code |
| Data | SQLite via Python | Proposed single-instance store; runtime version recorded at implementation | 2026-09-30 | Python sqlite3 and SDD §3 |
| Sandbox | Contree SDK / client | API documentation verified; package versions and account availability unpinned | 2026-09-30 | docs/research-vibesec.md |
| Model | NVIDIA Nemotron through Nebius | Exact ID selected by live catalog and eval, not by guessed casing | 2026-09-30 | docs/research-vibesec.md |
| UI | HTML, CSS, small JavaScript | Proposed native browser implementation; no UI dependencies installed | 2026-09-30 | DSD and PRD flow |

Never present pending versions as pins. Create a reproducible application dependency lock after resolving and testing the versions. Recheck provider contracts, authentication, model availability, quota, and pricing before remote integration. In particular: the documented SDK takes a constructed client, defaults disposable runs differently from REST, and does not prove live-memory restoration or the planned egress policy.

## 4. Golden-Path Patterns

No code sample is claimed as verified before implementation. Establish three small tested patterns during the first slice: schema and policy validation before any adapter call; immutable attempt receipts followed by deterministic verification; and deadline/cancellation with operation reconciliation. Prefer stdlib and existing dependencies over new frameworks. Keep implementation and its executable test beside each pattern; update this section only after those tests run.

## 5. Conventions & Guardrails

Planned application layout: `src/vibesec/` for API, scope policy, planner, executor, verifier, and store; `fixtures/` for owned synthetic targets; `tests/` for policy, contract, verifier, and browser checks; `spikes/` for disposable proof. These directories do not exist as application code yet. Current local tooling validates documentation only.

The model selects probe IDs; reviewed code builds invocations. Registry targets, limits, session authority, and confirmed classifications stay outside model control. Provider keys never enter fixture images, preserved environment, browser bundles, prompts, or logs. Evidence remains bounded, redacted, and escaped. No automatic remote work in untrusted PR CI.

One task is done when its PRD and QAD criteria pass with evidence, relevant model/API versions are recorded, affected docs and index reconcile, and source changes have meaningful checks. Release also meets the FMD Production Readiness Gate in the engine clone's `guides/workflows.md`, including user protection, observability, rollback, and cost control.

## 5.1 Brownfield Change Workflow

Once working code and canonical specs exist, use the engine clone's `scripts/change.py` to init, propose, validate, verify, and archive changes as directed by FMD. Do not create empty change folders during this greenfield setup. An architectural trade-off belongs in an RFC; a contradiction of a Locked artifact requires a Change Record and propagation.

## 5.2 Public Surface & Crawler Policy

No public application URL exists. Reports must have authorization independent of robots directives. Proposed hosted reports use noindex/noarchive and do not expose private evidence to crawlers; search/training policy is reviewed with CLR before public launch. Add and verify robots.txt at the actual host, not merely a local file. No public docs/API site exists, so llms.txt is not triggered. Use semantic HTML and only visible-content metadata.

README and pitch state planned versus measured behavior clearly. Keep internal IDs, template terminology, instructions, and security guarantees out of public copy. No market-size, customer, performance, or sandbox capability claim is accepted solely because it appears in the original research report.

## 5.3 Engineering Maturity

L0: local documentation validation. The optional pre-commit check runs when FMD v3.0.1 is available and skips otherwise. No remote document CI or application checks are configured. Application maturity is not L1 until meaningful application tests run reliably in CI. Preview, automatic deploy, staged rollout, alerting, backups, and rollback rehearsal are absent. PRD §9 is the authoritative rollback plan; OPS records operational readiness.

## 6. Root References

Platform files read the stable root AGENTS pointer. BRAND and DESIGN are project references derived from DSD; keep them aligned when that source changes. If using the engine clone's `scripts/materialize.py`, pass `--out` with a temporary directory and review the output before updating those references. Its generated AGENTS is a BUILD copy and must not replace the project pointer. Root README is maintained for people and reflects the actual state of the project.
