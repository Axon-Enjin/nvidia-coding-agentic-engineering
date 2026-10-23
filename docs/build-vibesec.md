# VibeSec Build Guide

**Project:** VibeSec
**Date:** 2026-09-30
**Version:** 0.1
**Owner:** Project owner
**Status:** Draft
**Last reconciled:** 2026-10-23
**PRD:** `docs/prd-vibesec.md`
**SDD:** `docs/sdd-vibesec.md`
**SAD:** N/A; no persistent specialist roster.

Project paths in this guide are relative to the project root. This is the complete product repository. The optional FMD v3.0.1 engine remains external; `python scripts/fmd.py locate` reports it only when a contributor supplies one.

## 1. How to Build From These Docs

Follow the repository-root `AGENTS.md` pointer for session startup, engine routing, and current project state. Templates, guides, and engine scripts stay in the FMD clone. Load the smallest relevant subset for the current task.

Implement a PRD-F# by reading its acceptance criteria, SDD realization, relevant RFC, and matching QAD happy/sad/abuse rows. UI work also reads DSD. AI work also reads AIA. Data, target scope, or provider handling changes require CLR reconciliation. Do not treat Draft plans or a green document validator as implemented behavior.

**Next implementation slice:** the disposable owned-fixture sandbox/inference spike in `docs/research-vibesec.md`. Its exit evidence is explicit branch independence, service restart, denied egress plus working loopback, bounded output/timeouts, receipt reconciliation, and a selected model passing the plan schema. Do not dispatch real customer targets or use production data.

The repository-local documentation gate is always available:

```powershell
python scripts/check_project_docs.py
```

When an external FMD v3.0.1 engine is available, the strict commands are:

```powershell
.\scripts\fmd.ps1 check
.\scripts\fmd.ps1 record -Action "Describe completed work"
```

The Python launcher runs engine scripts from a separately supplied clone; the PowerShell helper locates an interpreter and calls that launcher. On other platforms use `python scripts/fmd.py check` and `python scripts/fmd.py record --action "..."`. Configure `FMD_ROOT` or pass `--fmd-root` (PowerShell: `-FmdRoot`) for a custom location. Run all commands from the project root. Do not describe the repository-local gate as an FMD strict pass.

After artifact changes, update state when the position changed, then run record. Keep implementation guidance in this canonical BUILD copy; root AGENTS stays a thin pointer. Product artifacts remain Draft until reviewed against real evidence; Locked changes require the canonical change process.

## 2. Subagents

No persistent roster. A single research delegation produced the feasibility note; no repeated specialist work or agent system is established. Implement routine work in the main agent. Delegate only when user instructions or FMD's applicable spawn rule justify it.

## 3. Stack Currency & Deprecations

| Layer | Technology | Pin / state | Verified | Source |
|-------|------------|-------------|----------|--------|
| Documentation format | FMD project documents | FMD v3.0.1 pointer; external engine not distributed | 2026-10-23 | AGENTS, README, and local consistency gate |
| Local interpreter | Python | 3.12.14 observed in bundled runtime | 2026-09-30 | Interpreter `--version`; docs.python.org/3.12 |
| Control API | Python standard-library HTTP service | Implemented loopback MVP; FastAPI/Pydantic remain a possible remote-stage migration | 2026-10-23 | `vibesec/web.py`, application tests, SDD |
| Data | In-memory local plan/report state | Implemented for the reload-fresh local MVP; SQLite persistence remains planned for remote work | 2026-10-23 | `vibesec/web.py`, SDD |
| Sandbox | Contree SDK / client | API documentation verified; package versions and account availability unpinned | 2026-09-30 | docs/research-vibesec.md |
| Model | NVIDIA Nemotron through Nebius | Exact ID selected by live catalog and eval, not by guessed casing | 2026-09-30 | docs/research-vibesec.md |
| UI | Vite 7, React 19, TypeScript 5.9, Tailwind CSS 4, selective shadcn/ui | Build and local 375/768/1440px browser flow passed; keyboard and screen reader audit pending | 2026-10-13 | `frontend/package-lock.json`, DSD and PRD flow |

Never present pending versions as pins. Create a reproducible application dependency lock after resolving and testing the versions. Recheck provider contracts, authentication, model availability, quota, and pricing before remote integration. In particular: the documented SDK takes a constructed client, defaults disposable runs differently from REST, and does not prove live-memory restoration or the planned egress policy.

## 4. Golden-Path Patterns

The local slice establishes three verified patterns: registered brief and planner-mode validation before execution; deterministic vulnerable/repaired HTTP comparison with exact-canary evidence; and JSON/Python exports derived from the reviewed plan. Remote immutable receipts, deadline/cancellation, persistence, and operation reconciliation remain planned. Prefer stdlib and existing dependencies over new frameworks; keep each new remote pattern beside its executable check.

## 5. Conventions & Guardrails

Current application layout: `vibesec/` contains the local API, model adapter, proof, and fixture orchestration; `fixture/` contains the owned synthetic notes target; `tests/` contains local contract and behavior checks; and `frontend/` contains the React application. Future remote adapters and persistence should deepen these existing modules or introduce a documented boundary after the provider spike rather than assume a nonexistent `src/` tree.

The model selects probe IDs; reviewed code builds invocations. Registry targets, limits, session authority, and confirmed classifications stay outside model control. Provider keys never enter fixture images, preserved environment, browser bundles, prompts, or logs. Evidence remains bounded, redacted, and escaped. No automatic remote work in untrusted PR CI.

One task is done when its PRD and QAD criteria pass with evidence, relevant model/API versions are recorded, affected docs and index reconcile, and source changes have meaningful checks. Release also meets the FMD Production Readiness Gate in the engine clone's `guides/workflows.md`, including user protection, observability, rollback, and cost control.

## 5.1 Brownfield Change Workflow

Once working code and canonical specs exist, use the engine clone's `scripts/change.py` to init, propose, validate, verify, and archive changes as directed by FMD. Do not create empty change folders during this greenfield setup. An architectural trade-off belongs in an RFC; a contradiction of a Locked artifact requires a Change Record and propagation.

## 5.2 Public Surface & Crawler Policy

No public application URL exists. Reports must have authorization independent of robots directives. Proposed hosted reports use noindex/noarchive and do not expose private evidence to crawlers; search/training policy is reviewed with CLR before public launch. Add and verify robots.txt at the actual host, not merely a local file. No public docs/API site exists, so llms.txt is not triggered. Use semantic HTML and only visible-content metadata.

README and pitch state planned versus measured behavior clearly. Keep internal IDs, template terminology, instructions, and security guarantees out of public copy. No market-size, customer, performance, or sandbox capability claim is accepted solely because it appears in the original research report.

## 5.3 Engineering Maturity

L0 with a working local proof: repository documentation validation, local application tests, production frontend build, and browser evidence exist. The pre-commit hook runs FMD strict validation when an engine is supplied and otherwise runs the repository-local consistency gate. No remote document CI, application CI, provider job, preview deployment, staged rollout, alerting, backup, or rollback rehearsal is configured. Application maturity is not L1 until meaningful checks run reliably in CI. PRD §9 remains the authoritative rollback plan; OPS records operational readiness.

## 6. Root References

Platform files read the stable root AGENTS pointer. BRAND and DESIGN are project references derived from DSD; keep them aligned when that source changes. If using the engine clone's `scripts/materialize.py`, pass `--out` with a temporary directory and review the output before updating those references. Its generated AGENTS is a BUILD copy and must not replace the project pointer. Root README is maintained for people and reflects the actual state of the project.
