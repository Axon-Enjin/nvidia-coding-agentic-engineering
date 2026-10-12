# User Protection and Regulatory Posture: VibeSec

**Project:** VibeSec
**Date:** 2026-09-30
**Version:** 0.1
**Owner:** Project owner
**Status:** Draft
**Last reconciled:** 2026-10-01
**PRD:** [prd-vibesec.md](prd-vibesec.md)
**SDD:** [sdd-vibesec.md](sdd-vibesec.md)

This records the proposed synthetic-demo boundary and user-protective defaults. No founder sign-off, customer permission, legal clearance, or regulatory certification is claimed. The owner reviews material postures before external deployment or scope expansion.

## 0. Target Markets

Current scope is a project operated from the Philippines for a global online hackathon, using owned synthetic fixtures. No commercial market launch is committed. A globally accessible judge build is a future deployment, not an assertion of worldwide legal compliance. Review actual operator location, hosting region, viewers, and data flows before launch.

## 1. Data Inventory

| Activity | Data | Recipients | Retention / handling |
|----------|------|------------|----------------------|
| Fixture and probes | Fake users, fake notes, synthetic canaries | Owned sandbox operation | Versioned synthetic seed; no customer content |
| Model planning | Synthetic API contract and catalog | Nebius inference service | Account-specific provider terms unverified; no secrets |
| Run evidence | IDs, durations, model usage, redacted synthetic observations | Control-plane store; permitted reviewer | Seven-day staging target; published judge data separately retained |
| Operator session | Opaque session and scope IDs | Control plane | Expiring session; no email signup planned |
| Hosting access logs | IP/user-agent may be recorded by host | Hosting provider not selected | Inventory and minimize before deployment; do not assume no personal data |
| Optional Tavily | Non-sensitive research query | Tavily if explicitly enabled later | Disabled initially; terms and runtime use verified before enabling |

No payment, biometric, health, child, precise location, advertising, or production-user data is requested. Provider secrets are credentials, not fixture data, and remain outside sandbox and model context. Retention at a provider is distinct from deletion in the local store.

## 2. Obligations Awareness

Authorized testing is a core boundary. [RA 10175](https://lawphil.net/statutes/repacts/ra2012/ra_10175_2012.html), checked 2026-09-30, addresses access without right and other computer misuse; personal criminal exposure can arise from unauthorized conduct. Do not infer authorization from an open URL or possession of code. This slice uses the team's owned fixtures only.

[NPC Advisory 2024-04](https://privacy.gov.ph/wp-content/uploads/2025/02/Advisory-2024.12.19-Guidelines-on-Artificial-Intelligence-w-SGD.pdf) addresses AI processing personal data. It does not justify treating public personal data as unrestricted. Data minimization, actual provider terms, and user rights must be reviewed if real data enters the product.

## 3. User-Protection Bars

| Flag | Bar | Evidence / status |
|------|-----|-------------------|
| Untrusted execution | Fixed scope registry, probe catalog, isolation, cancellation | SDD §5; QAD AB-03/05/07, unexecuted |
| Credential and evidence disclosure | No control-plane keys in sandbox/prompts; redact before persistence/export | QAD AI-06 / AB-02, unexecuted |
| Personal hosting/session data | Minimal collection, restricted access, deletion/retention policy | Host inventory pending before deployment |
| Misleading security conclusion | Findings require evidence; incomplete runs explicit; no security guarantee | PRD-F4; QAD H-04 and AB-06, unexecuted |
| Incident | Contain execution, stop dispatch, revoke leaked keys, assess affected data | OPS §4, not rehearsed |

No bar is marked met because a design document exists. A release requires the corresponding test and operational evidence.

## 4. Terms and Use Readiness

Judge instructions must state synthetic scope, live versus replay behavior, limits, known failures, and that absence of findings is not proof of security. Arbitrary customer-target testing requires an explicit authorization record and a new data/scope review. No paid tier or customer terms are drafted in this slice.

## 5. IP and Distribution

Authoring uses FMD v3.0.1 outside this repository. This repository keeps the project documents and does not vendor the engine. Product code does not yet exist and no product license has been selected. Before a public hackathon release, the owner must choose an eligible product license and review distribution rights for included components. Keep software/component notices distinct. No brand clearance or model-output ownership conclusion is claimed. System fonts and a plain-text wordmark avoid unlicensed media assets.

## 6. Platforms

No app store submission. Before judge hosting, verify infrastructure terms, actual model license, region, logs, TLS, and account quotas. Providing a live inference call and a model name alone does not establish product readiness.

## 7. Regulatory Posture Register

Proposed default postures for owner review, not a claim of accepted financial or regulatory risk.

| ID | Obligation / concern | Posture | Rationale / exposure | Owner | Revisit trigger | Fallback |
|----|----------------------|---------|----------------------|-------|-----------------|----------|
| CLR-P1 | Authority to test and computer misuse | COMPLY | Only owned fixtures; unauthorized testing can create personal criminal exposure | Project owner | Any target or data expansion | Disable remote dispatch and reject unsupported targets |
| CLR-P2 | Personal-data processing and AI privacy | COMPLY | Minimize sessions/logs; synthetic inputs; assess actual host/provider handling before release | Project owner | Hosting choice or any real data | Keep synthetic-only mode; remove unnecessary collection |
| CLR-P3 | Component/model licensing and hackathon source release | COMPLY | Preserve included component notices; select eligible product license; keep FMD v3.0.1 outside this repository | Project owner | Before public distribution or submission | Hold distribution until rights and contents are settled |
| CLR-P4 | New jurisdictions or consequential AI decisions | DEFER | No commercial target market or consequential automated decisions in this slice | Project owner | External pilot, sale, or changed AI use | Restrict new scope and reassess |

No CONTEST or ENGAGE posture is selected. Legal advice or counsel may inform future obligations; the current plan makes no determination for a commercial launch.
