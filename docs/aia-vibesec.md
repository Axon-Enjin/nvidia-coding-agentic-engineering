# AI Assurance Dossier: VibeSec

**Project:** VibeSec
**Date:** 2026-09-30
**Version:** 0.1
**Owner:** Project owner
**Status:** Draft
**Last reconciled:** 2026-09-30
**PRD:** [prd-vibesec.md](prd-vibesec.md)
**SDD:** [sdd-vibesec.md](sdd-vibesec.md)
**QAD:** [qad-vibesec.md](qad-vibesec.md)
**CLR:** [clr-vibesec.md](clr-vibesec.md)

An assurance plan, not certification or evidence of a deployed system. Every mitigation below is planned and untested.

## 0. Trigger and Scope

PRD-F2 supplies an AI plan selector; PRD-F4 separates explanation from proof. The control plane consumes a synthetic fixture contract and a fixed probe catalog. The model chooses IDs and writes rationale. It cannot choose hosts, credentials, commands, budgets, confirmed classifications, repairs, or deployments.

No output determines a person's rights, credit, employment, health, or access. Reports inform a human reviewer. Any future deployment gate or customer-data ingestion changes this scope.

## 1. Model / System Card

Intended use: propose bounded tests for an owned synthetic demo and explain verified observations. Intended users: the operator, reviewer, and judge. Excluded: public target discovery, unrestricted exploitation, autonomous repair, vulnerability guarantees, insurance risk scoring, and automated decisions about people.

One NVIDIA Nemotron model served through Nebius is proposed. Exact model ID, provider version, SDK versions, and operating region are pending authenticated catalog verification and evaluation. Candidate IDs in the [research note](research-vibesec.md) are not a deployment pin.

No fine-tuning or customer training data. Runtime input is synthetic contract metadata and catalog entries; fixture-controlled text is untrusted. Output has fixture ID, 1 to 9 distinct allowlisted probe IDs, and a bounded rationale. Local validation rejects extra fields and unsupported values. One repair call maximum; failure remains visible. A model refusal is not evidence that the app passed.

Provider retention/training/region terms are unresolved for the actual account. The synthetic-only boundary applies until CLR is reconciled. Known limitations: limited catalog coverage, model plan relevance, cold starts, unavailable provider features, missed vulnerabilities, and false explanations. No detection or latency benchmark exists.

## 2. NIST AI RMF Risk Register

Mapped to Govern, Map, Measure, and Manage and selected categories from the [NIST GenAI Profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf), checked 2026-09-30. This is a voluntary organizational mapping, not a conformity claim.

| Risk ID | Risk / category | RMF function | Severity | SDD control | QAD eval | Owner | Status |
|---------|-----------------|--------------|----------|-------------|----------|-------|--------|
| AIA-R1 | Prompt injection / Information Security | Map, Manage | Critical | §8.1 labeled context and deterministic policy | AI-04 | Implementer | Open |
| AIA-R2 | Fabricated findings / Confabulation | Measure, Manage | High | §8.1 verifier controls classification | AI-02 | Implementer | Open |
| AIA-R3 | Credential or evidence disclosure / Data Privacy | Govern, Manage | Critical | §5 secret separation and redaction | AI-06 | Implementer | Open |
| AIA-R4 | Overpowered model / Human-AI Configuration | Govern, Manage | Critical | §8.1 catalog authority and budget limits | AI-05 | Implementer | Open |
| AIA-R5 | Unsafe output / Information Security | Measure, Manage | High | §5 escaping and schema validation | AI-03, AB-02 | Implementer | Open |
| AIA-R6 | Provider or model change / Value Chain and Component Integration | Govern, Measure | High | §8 fixed model/prompt evaluation | AI-01, AI-07 | Project owner | Open |

Review this register before model/prompt changes, external users, target expansion, or release. Planned controls become mitigated only after passing evidence is linked.

## 3. Self-Audit Trail

Scoping is captured in IDEA and PRD; system mapping in SDD; artifact collection includes provider documentation and this register. Testing is unexecuted. Reflection is the PROCEED WITH FIXES verdict and the pending runtime proof tasks. Provider terms, selected model, actual outputs, eval corpus, and test receipts remain absent; do not fill them with invented evidence.

## 4. Safety Bars and Escalation

| Flag | Present? | Required bar | Met? |
|------|----------|--------------|------|
| Output determines significant rights/access decisions | No in v0 | Human review and appeal if added | N/A; reassess on scope change |
| Sensitive inference or real personal data | No in synthetic fixture | Consent, minimization, human fallback if added | N/A for fixture; logging review still pending |
| Untrusted input reaches execution or other users | Yes | Validated authority, inert output, passing abuse evals | No; planned only |
| Unresolved data/model licensing or provenance | Potentially | Verify selected model and fixture/code rights before distribution | No; selected-model review pending |

Remote execution and release stay disabled until applicable safety bars have evidence. This holds the later release milestone; it does not invalidate the documented synthetic design.

## 5. Regulatory Awareness

The [NPC AI advisory](https://privacy.gov.ph/wp-content/uploads/2025/02/Advisory-2024.12.19-Guidelines-on-Artificial-Intelligence-w-SGD.pdf), checked 2026-09-30, concerns AI systems processing personal data. Customer data is excluded here; actual hosting logs still require inventory. CLR-P2 records the proposed posture and revisit trigger. Other jurisdictions, high-risk decision uses, and sector requirements are not assessed for a future commercial product. No ISO certification or EU classification is asserted.
