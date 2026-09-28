# TRACK 1: Coding & Agentic Engineering. Deep Research Meta-Prompt

> **Operator notes (do not paste this block)**
> - Runs in Gemini Deep Research, ChatGPT Deep Research, Perplexity Deep Research, Claude Research, or a Crow → Zilch pipeline run.
> - Copy everything below the `=== PROMPT START ===` line.
> - Fill in `{{OPTIONAL_FOCUS}}` or leave it blank to allow an open scan.
> - Expected output is one report of about 6–10k words, with tables, written to `research/track1_report.md`.
> - Source of hackathon facts: `hackathon.md` and `ORG.md`, retrieved 2026-09-28.

=== PROMPT START ===

## 0. Role and mission

You are a senior research team of three people:
1. **Research analyst.** Returns sourced facts only. Tags every fact with a source tier and date.
2. **Market strategist.** Turns facts into commercial judgment. Labels every judgment `[INFERENCE]`.
3. **Product strategist.** Designs solution angles that can win a hackathon *and* survive as a business.

**Mission:** Find the single best **problem → solution → value** thesis for a submission to the **Coding & Agentic Engineering Track** of the *Nebius x NVIDIA Global AI Hackathon*.

Rules for how you work:
- Be skeptical. Evidence comes before enthusiasm.
- A visible gap ("no reliable data found") is correct output. A confident invented number is a failure.

Optional focus from the operator: `{{OPTIONAL_FOCUS}}`

---

## 1. Fixed context (treat as ground truth)

**Track brief:** "Build coding agents and developer tools: agents that write, run, and test code in Token Factory Sandboxes."

**Hard requirements:**
- The project runs on **Nebius Token Factory** or **Nebius AI Cloud**.
- It uses **≥1 NVIDIA open model**: Nemotron Nano, Super or Ultra, or another NVIDIA open model.
- It is working software, not a mockup.
- Deliverables:
  - A public repo under Apache-2.0, MIT or MPL-2.0
  - A README
  - A YouTube demo of 3 minutes or less that narrates how Token Factory and Nemotron are used
  - Mandatory product feedback
- The project must be new, or significantly updated after Aug 26, 2026.

**Available stack:**
- Nebius: Token Factory (managed inference plus **Sandboxes**), AI Cloud (GPUs), Serverless Endpoints, Serverless Jobs
- NVIDIA: Nemotron models; NemoClaw, a secure agent runtime with isolation and a privacy router; OpenShell, a runtime and policy engine; the AI-Q research-agent blueprint
- Tavily: search and extract API. It is optional, but a real runtime call makes the project eligible for the $3k bonus.

**Judging:**
- Stage 1 is pass/fail. Is this a genuine attempt at the track's goal?
- Stage 2 has four equally weighted criteria, in tie-break order:
  1. **Technological Implementation**: quality of the build and depth of Token Factory and Nemotron use
  2. **Design**: a complete product, not a proof of concept
  3. **Potential Impact**: a real problem for a real audience
  4. **Quality of Idea**: creative and non-obvious
- Judges may score from the video and description alone.

**Judge panel (21):**
- 6 from NVIDIA: engineers and Physical AI DevRel
- 12 from Nebius: Token Factory PMM, Serverless AI PM, ML research, DevRel, Physical AI GTM
- 3 from Tavily: forward-deployed engineers and DevRel

**Prizes:**
- Grand prize $20k, 2nd $10k, 3rd $6k
- Track winner gets a Jetson Orin Nano
- Best Use of Tavily $3k
- A project can win one overall prize, *or* one track prize plus one bonus prize.

**Deadline:** Oct 30, 2026, 10:00 AM PT. Today is {{TODAY}}.

**What the sponsors are trying to prove (see ORG.md):**
- **NVIDIA** wants Nemotron adoption and wants its Agent Toolkit (NemoClaw, OpenShell) to be the secure layer beneath enterprise agents. Cursor and LangChain are Nemotron Coalition members.
- **Nebius** is moving "from rack to token to agent". Agentic workloads drive Token Factory growth, which tripled in Q2 2026.
- **Tavily** wants runtime agent search usage.

**Team context:**
- A small AI-native builder team. Execution is done by agents under human orchestration and human review. It is **not** a conventional engineering team.
- Home market: the Philippines / Southeast Asia. The hackathon itself is global.

---

## 2. Research rules (non-negotiable)

1. **Source tiers.** Tag every factual claim with a tier:
   - **T1 Primary:** filings (SEC 10-K/20-F/S-1), government statistics, peer-reviewed papers, official company data, benchmark leaderboards with methodology
   - **T2 Expert:** Big 3 / Big 4 reports, Gartner, IDC, Forrester, arXiv, the Stanford AI Index
   - **T3 Journalistic:** Reuters, FT, WSJ, Bloomberg, The Information, TechCrunch
   - **T4 Web / community:** blogs, Reddit, Hacker News, X, G2 reviews, GitHub issues
2. **Date every claim.** Give the publication date and the date of the data inside it. Flag anything older than 24 months as `[STALE]`.
3. **Triangulate load-bearing numbers.** Any figure behind a go/no-go decision needs **≥2 independent sources**. Otherwise mark it `[SINGLE-SOURCE]`.
4. **Separate fact from judgment.**
   - Facts carry a citation.
   - Judgments are labeled `[INFERENCE]`.
   - Numbers you calculated are labeled `[DERIVED]` and show the formula.
5. **Never fabricate.** If a number is not findable, write `NOT FOUND`. Name the source that would contain it, and move on.
6. **Discount for bias.**
   - Consulting and vendor reports sell services, so treat their headline market sizes as upper bounds.
   - Vendor-reported productivity gains are self-reported.
   - Always look for disconfirming evidence (for example METR 2025, DORA 2024).
7. **Paywalls.** If a report is paywalled, cite its public summary or press release and mark it `[SUMMARY-ONLY]`.
8. **Build effort (Estimation Rule).** Never estimate build effort in hours, days, person-days or sprints. Instead:
   - List components as agent-executable or irreducibly human.
   - Name the constraint step. The default assumption is human review and integration bandwidth.
   - Mark effort `UNCALIBRATED` unless the operator supplies logged rates.
   - Flag every component where AI execution is *riskier or slower* than a human's, such as novel integration or ambiguous specs.
9. **Pricing.** Base pricing on value and outcome. Never derive price from time.

---

## 3. Phase A: Problem discovery (the 5-test screen)

### A1. Build a longlist (12–15 candidate problems)

Start from these seed hypotheses. Then **add at least 5 of your own**, found in evidence such as developer surveys, GitHub issues, HN threads and incident post-mortems.

| # | Seed hypothesis |
|---|---|
| S1 | AI-generated code ships faster than teams can **review and verify** it. Review is now the bottleneck. |
| S2 | Agents that *run* code are a **security and sandboxing** liability: exfiltration, destructive commands, supply-chain attacks, prompt injection through repos. |
| S3 | **Legacy modernization** (COBOL, old Java, PHP, jQuery) is huge, risky and under-served by general assistants. |
| S4 | **Test generation and flaky-test repair** are tedious. Coverage is theater without mutation or property testing. |
| S5 | **Dependency and CVE remediation** backlogs grow faster than teams can patch. |
| S6 | Coding agents on closed frontier APIs are **too expensive at scale**, or **non-compliant** under data-residency and sovereignty rules. This is where open models on an open cloud come in. |
| S7 | **Infra-as-code and cloud misconfiguration**: agents that write, plan and test Terraform or K8s safely |
| S8 | **Onboarding into large unfamiliar codebases**: comprehension, not generation |
| S9 | **Data and ML pipeline code**: notebooks to production, SQL correctness, reproducibility |
| S10 | **Regulated-industry code** (fintech, health, gov): audit trails for AI-written code and provenance of every change |

### A2. Score each candidate on the five tests

Score each test 1–5 and give the evidence behind every score.

| Test | Question | Evidence required | Metrics to collect | Pass bar | Red flag |
|---|---|---|---|---|---|
| **1. Is it REAL?** | Do identifiable people experience this pain *today*, in their own words? | ≥3 independent T1–T4 sources. At least one is a direct user voice (survey data, forum threads, issues, reviews) and at least one is quantitative. | Survey % reporting the pain; volume of GitHub issues or discussions; frequency on HN or Reddit; workaround behaviors | Pain is described unprompted by users, not only by vendors | Only vendors and VCs describe the problem |
| **2. Is it LARGE?** | How many people or organizations have it, and how much money or time is at stake? | Population counts (developers, companies, repos); spend data | Number of affected devs or orgs; $ spent on current solutions; cost of the pain (incidents, delays, rework) | A path to a credible TAM of ≥$1B (global) or a clearly dominant niche | Only "everyone who codes" framings with no spend data |
| **3. Is it SIGNIFICANT?** | Is it a top-3 priority or a mild annoyance? What happens if it's never solved? | Priority rankings in surveys; budget allocation; incident and breach costs | Rank in dev and CTO priority surveys; cost per incident; churn or turnover tied to the pain | Buyers already pay for, or hack around, a solution | A "nice-to-have" with no current spend or workaround |
| **4. Is it RELEVANT?** | (a) To this **track**; (b) to the **sponsors' goals**: Nemotron adoption, Token Factory and Sandbox usage, agentic workloads, open and sovereign AI; (c) to the **ICP's** current workflow | Direct mapping to the track brief and ORG.md goals | Which sponsor products it *requires* (not merely allows) | Needs Sandboxes plus Nemotron, and ideally tool-calling agent loops | Could be built equally well on any closed API, so no sponsor story |
| **5. Is it URGENT?** | Why now, and not two years ago or two years from now? | Dated triggers: regulation, a platform shift, cost curve, incidents, adoption inflection | Recent incidents; regulatory dates (EU AI Act, CRA, SEC cyber rules, PH DICT/NPC); adoption curves; open-model quality versus the frontier | A trigger dated in the past 12 months, or a hard date in the next 12 months | "Always been a problem" with no forcing function |

**Output for Phase A:**
1. A scored longlist table. Columns: problem · Real · Large · Significant · Relevant · Urgent · total out of 25 · key evidence · weakest test.
2. A **shortlist of the top 3**.
3. The **final problem** you selected, with a one-paragraph *problem statement* written as: *"[Who] struggles to [job] because [root cause], which costs [quantified impact]. It matters now because [trigger]."*
4. A **"Kill test"**: the one piece of evidence that, if found, would invalidate the chosen problem. State whether you found it.

---

## 4. Phase B: Three Pitches (solution divergence)

Apply the **Three Pitches Rule**: develop **three genuinely distinct** solution angles for the chosen problem. Do not settle for the first idea.

**Divergence rule:** each pitch must differ from the others on **at least two** of:
- Target user
- Core mechanism or technical approach
- Point of insertion in the workflow
- Business model

Use these forcing slots:
- **Pitch 1: The Obvious, done exceptionally.** The idea most teams will build. Make it best-in-class.
- **Pitch 2: The Inversion.** Flip a core assumption. Examples: instead of an agent that writes code, an agent that *refuses* or *proves* code; instead of the developer as user, the reviewer, the auditor or the CFO.
- **Pitch 3: The Adjacent Leap.** Borrow a mechanism from another domain, such as aviation checklists, clinical trials or insurance underwriting, or target an overlooked user.

**For each pitch, provide:**

| Field | Content |
|---|---|
| Name + one-liner | ≤12 words |
| Positioning statement | "For [ICP] who [pain], [product] is a [category] that [benefit]. Unlike [main alternative], it [differentiator]." |
| Core mechanism | How it works. Show the agent loop: plan → write → run in a Token Factory Sandbox → test → verify → report. |
| Sponsor stack mapping | Which Nemotron tier does what, and why; for example Nano for routing, Super for sub-agents, Ultra for hard reasoning. Where Sandboxes, Serverless Jobs, NemoClaw/OpenShell and Tavily are used. Flag any piece that is decorative rather than load-bearing. |
| The demo moment | The ≤20-second "wow" in the 3-minute video. What does the judge *see*? |
| Why it's non-obvious | Evidence that few competitors do this |
| Biggest risk | Technical, market or adoption |
| Build decomposition | Components tagged agent-executable or human-irreducible. Name the constraint. Effort stays `UNCALIBRATED`. |

---

## 5. Phase C: Market value

### C1. Ideal Customer Profile (per pitch where it differs)

| Dimension | Detail |
|---|---|
| Firmographics | Company size, industry, region, engineering headcount, stack, regulatory exposure |
| Persona(s) | Economic buyer, champion and end user. Give titles and what each one is measured on (KPIs). |
| Jobs-to-be-done | Functional, emotional and social jobs |
| Pain triggers | The events that make them go looking for a solution now |
| Current alternatives | What they use or do today, including "do nothing" and in-house scripts |
| Buying process | Bottom-up self-serve versus top-down procurement; security review; typical cycle |
| Willingness to pay | Evidence from comparable tools' pricing and budgets per seat or per repo |
| Where they gather | Communities, conferences, newsletters, subreddits, Discords |
| **Anti-ICP** | Who looks like a fit but isn't, and why |
| **PH / SEA lens** | Size of the PH/SEA developer base, IT-BPM and GCC/offshore engineering centers, local constraints (cost sensitivity, data residency, RA 10173), and whether this is a beachhead or only a later market |

### C2. Competitive market analysis

Cover all four layers:
1. **Direct competitors.** At minimum: GitHub Copilot (and Copilot coding agent), Cursor, Claude Code, OpenAI Codex, Cognition (Devin / Windsurf), Google Jules / Gemini Code Assist, Amazon Q Developer / Kiro, Replit Agent, Sourcegraph Amp, Tabnine, Qodo, CodeRabbit, Graphite, Factory, Augment. Also open source: OpenHands, Aider, Cline, Continue, SWE-agent.
2. **Indirect competitors.** Static analysis and security (Snyk, Semgrep, SonarQube, Socket, Endor Labs), testing (Diffblue, Mabl), and sandbox infrastructure (E2B, Modal, Daytona).
3. **Substitutes.** Offshore or outsourced dev, in-house platform teams, and "just use ChatGPT."
4. **Sponsor-adjacent.** Anything NVIDIA, Nebius or their partners already ship, such as AI-Q or Nebius Echo. Is the pitch complementary to them or competing?

**For each relevant competitor, report:**
- Positioning
- Target ICP
- Pricing
- Funding and valuation or revenue: public figures only, T1/T3
- Model dependency: closed or open
- Deployment: SaaS, VPC or self-host
- Known weaknesses: from reviews, issues and churn complaints

**Then produce:**
- A **feature/positioning matrix** comparing the 3 pitches against the top 8 competitors
- A **2×2 positioning map**. Choose axes that reveal white space, such as autonomy × verifiability or closed × open models.
- A **white-space statement**: where no one credible plays, and why. Is it an unmet need or a graveyard?
- A **"Why won't incumbents just add this?"** answer for each pitch

### C3. TAM / SAM / SOM

Do **both methods** and reconcile them:
- **Top-down.** Analyst market size for AI code tools, dev tools or application security, adjusted to the pitch's slice. Cite each figure and note the variance between analysts.
- **Bottom-up (mandatory for SOM).** Number of reachable ICP accounts × adoption rate × annual contract value.

Show every formula and put every assumption in a table with a source or `[ASSUMPTION]`.

| Layer | Definition to use |
|---|---|
| TAM | Global annual spend on the job the product does, whoever currently does it |
| SAM | The portion reachable with this product's form factor, deployment model, regions and ICP |
| SOM | Realistic 3-year capture given GTM channels and competition. Bottom-up only. |

Also provide:
- **Sensitivity analysis.** Low, base and high cases. Name which assumption swings the number most.
- **PH/SEA beachhead SOM**, sized separately.
- **Growth and "Why Now" data.** CAGR estimates and adoption curves; open-model versus closed-model share of inference; the cost trend per million tokens.

---

## 6. Phase D: Business value

| Area | What to research / produce |
|---|---|
| **Quantified customer value** | Time, cost or risk removed per customer, backed by evidence: incident cost data, review-time studies, CVE backlog cost. Include disconfirming studies, such as METR 2025 on experienced developers and DORA 2024 on throughput. |
| **Unit economics** | Cost per agent task on Token Factory: fetch **current Nemotron pricing** per million input and output tokens and estimate tokens per task `[DERIVED]`. Add sandbox compute cost. Compare with the same task on closed frontier APIs. Target gross margin. |
| **Pricing model** | Value-based options: per seat, per repo, per successful task or outcome, or usage. Benchmark against the competitors from C2. No cost-plus pricing. |
| **Moat / defensibility** | Data flywheel, workflow lock-in, proprietary evals, compliance posture, distribution. Rate each Weak, Medium or Strong. |
| **GTM** | First 10 and first 100 customers: channel, motion (PLG, open-source-led, sales-led) and wedge. Say where the Nebius Builders Program or NVIDIA Inception helps. |
| **Platform risk** | Dependence on Nebius or NVIDIA, the risk that sponsors or frontier labs absorb the feature, and model-quality risk of open versus closed models on coding benchmarks (SWE-bench Verified, Terminal-Bench, LiveCodeBench). Cite current scores. |
| **Regulatory / ethical** | Code provenance and licensing of generated code, secure execution, EU AI Act and Cyber Resilience Act duties, PH Data Privacy Act (RA 10173). *Awareness only, not legal advice.* |
| **Business-model viability verdict** | `[INFERENCE]` Venture-scale, lifestyle, or feature-not-a-company, with reasoning |

---

## 7. Phase E: Hackathon value

Score each of the 3 pitches from 1 to 10 on each line below and justify every score.

| Criterion | Pitch 1 | Pitch 2 | Pitch 3 |
|---|---|---|---|
| Stage 1 fit (genuine track attempt) | | | |
| Technological Implementation (depth of Token Factory, Sandbox and Nemotron use) | | | |
| Design (complete product feel within a 3-minute video) | | | |
| Potential Impact | | | |
| Quality of Idea (non-obvious) | | | |
| Tavily bonus eligibility (a natural runtime search need, not a bolt-on) | | | |
| Demo-ability (can the key moment be *seen*?) | | | |
| Differentiation from likely competing submissions `[INFERENCE]` | | | |

Also report:
- **Likely crowding:** what most of the ~13k registrants will build in this track, based on past Devpost AI hackathon galleries, and how each pitch avoids that crowd.
- **Judge-lens read:** what a Token Factory PMM, a Serverless AI PM, and an NVIDIA engineer would each reward or penalize.

---

## 8. Phase F: Decision

1. Build a **weighted decision matrix** with these weights:
   - Problem strength (5-test total): 30%
   - Market value: 20%
   - Business value: 15%
   - Hackathon value: 35%

   Show the math.
2. **Recommendation** `[INFERENCE]`: one pitch, with the reason, the strongest counter-argument, and what evidence would change the call.
3. **Kill criteria**: three findings that should stop the build.
4. **Open questions**: what primary research is needed, such as 5 user interviews and the questions to ask them.
5. **Validation plan**: the cheapest experiments to confirm demand before or during the build, such as a landing page, a Discord poll or a GitHub issue survey.

---

## 9. Output format

Return a single Markdown report with these sections, in order:
1. Executive Summary (≤250 words: problem, recommended pitch, TAM/SAM/SOM, why it wins)
2. Phase A: Problem Screen (longlist table → shortlist → problem statement → kill test)
3. Phase B: Three Pitches (one card per pitch)
4. Phase C: Market Value (ICP, Competition, TAM/SAM/SOM)
5. Phase D: Business Value
6. Phase E: Hackathon Scorecard
7. Phase F: Decision Matrix and Recommendation
8. Evidence Register: a table of `# | claim | value | source | tier | pub date | data date | confidence (H/M/L) | flags`
9. Gaps and `NOT FOUND` list
10. Full source list with URLs

Use tables wherever you are comparing things. Keep prose tight. Every number carries a citation or a `[DERIVED]` or `[ASSUMPTION]` tag.

---

## 10. Source playbook (where to find strong data)

**Big 3 strategy firms (T2; treat headline sizes as upper bounds)**
- **McKinsey**: *The State of AI* (annual), McKinsey Global Institute (the economic potential of generative AI), McKinsey Technology Trends Outlook, QuantumBlack developer-productivity research
- **BCG**: BCG Henderson Institute, *AI at Work*, *AI Radar*, "Where's the value in AI?"
- **Bain**: *Technology Report* (annual), generative-AI software development surveys, and e-Conomy SEA (with Google and Temasek) for PH and SEA digital economy data

**Big 4 (T2)**
- **Deloitte**: *State of Generative AI in the Enterprise*, *Tech Trends*, Deloitte Insights software engineering pieces
- **PwC**: *Global AI Jobs Barometer*, CEO Survey, *Sizing the Prize*
- **EY**: *AI Pulse Survey*, CEO Outlook, reimagining software engineering
- **KPMG**: *Trust, attitudes and use of AI* (global study with the University of Melbourne), KPMG AI Quarterly Pulse
- Also Tier-2 consulting: Accenture *Technology Vision*, Capgemini Research Institute (generative AI in software engineering)

**Industry analysts (T2)**
- Gartner: Magic Quadrant / Critical Capabilities for AI Code Assistants; Hype Cycle for Software Engineering
- IDC: worldwide developer population, AI software spending guides
- Forrester: AI code tools Wave, developer surveys

**Developer and technical data (T1/T2)**
- Stack Overflow Developer Survey (AI section)
- GitHub Octoverse and GitHub's Copilot research
- JetBrains *State of Developer Ecosystem*
- Google DORA *State of DevOps / AI-assisted software delivery*
- METR (developer-productivity RCTs, task-horizon studies)
- SWE-bench, Terminal-Bench, LiveCodeBench, Aider leaderboards
- Artificial Analysis (model and provider speed, price, accuracy)
- OpenRouter token-share rankings
- Stanford HAI *AI Index*, Epoch AI
- CISA, NVD and OSV (CVE volumes); Verizon DBIR and IBM Cost of a Data Breach (incident cost)

**Company and market data (T1/T3)**
- SEC EDGAR filings (GitLab, Atlassian, JFrog, Datadog, Microsoft segment notes)
- Nebius and NVIDIA IR
- Crunchbase, PitchBook, CB Insights, Dealroom (funding)
- Sacra (private-company revenue estimates)
- The Information (T3)
- Menlo Ventures *State of Generative AI in the Enterprise*
- a16z enterprise AI surveys
- Sequoia and ICONIQ *State of AI* reports
- Retool *State of AI*

**Voice of customer (T4; use for REAL and SIGNIFICANT)**
- Hacker News (Algolia search), r/programming, r/ExperiencedDevs, r/cscareerquestions
- GitHub issues and discussions on the competitors' repos
- G2, Capterra and TrustRadius reviews of competitors
- Product Hunt launches, X/Bluesky developer threads, Discord communities

**PH / SEA (T1/T2)**
- PSA (Philippine Statistics Authority), DICT, IBPAP (IT-BPM sector size and headcount)
- NPC (National Privacy Commission) advisories
- e-Conomy SEA (Google/Temasek/Bain)
- ADB and World Bank digital economy reports

**Hackathon intelligence**
- Past Devpost AI hackathon winner galleries, for crowding analysis
- Nebius and NVIDIA developer blogs and docs: Token Factory model list and pricing, Sandbox docs, Nemotron model cards on Hugging Face and build.nvidia.com

**Validation rule:** For every load-bearing claim, pair at least one consulting or analyst source (the "what executives say") with one behavioral or primary source (the "what developers actually do"). Report any gap between the two explicitly.

=== PROMPT END ===
