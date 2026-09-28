# ORG.md: Goals and Objectives of the Hackathon Partners

Covers **NVIDIA**, **Nebius** (the Sponsor) and **Tavily** (supporting sponsor, a Nebius subsidiary). It also covers the partner ecosystems they have named publicly.

- **Retrieved:** 2026-09-28
- **Source tiers:** T1 = primary (company filings, press releases, shareholder letters, official blogs). T3 = analyst or journalistic.
- Sections 1–4 are sourced facts. Section 5 is labeled inference.

---

## 1. NVIDIA

### Positioning
NVIDIA frames itself as a full-stack **"AI factory"** company. It sells chips, rack systems, networking, software and open models. At GTC 2026, Jensen Huang built the keynote on five pillars: **inference optimization, AI factory architecture, OpenClaw/agents, physical AI and robotics**. He summed up the stance on models as *"proprietary and open"*. [T1: NVIDIA GTC 2026 blog]

### Strategic objectives

| # | Objective | Evidence |
|---|---|---|
| 1 | **Win inference and agentic AI infrastructure** | Vera Rubin platform: 7 chips, 5 rack-scale systems, built for agentic AI. It is in full production with CoreWeave, Google Cloud, Azure, Oracle and **Nebius**. Other launches: the Vera CPU for AI agents, the Groq 3 LPX inference accelerator, and Dynamo inference software. [T1: GTC 2026; Q2 FY27 results] |
| 2 | **Own the open-model layer (Nemotron)** | Nemotron 3 Nano, Super and Ultra, plus Omni (multimodal) and VoiceChat. The **Nemotron Coalition** launched Mar 16, 2026 with Black Forest Labs, Cursor, LangChain, Mistral AI, Perplexity, Reflection AI, Sarvam and Thinking Machines Lab. It is co-developing a Nemotron 4 base model with Mistral on DGX Cloud, to be released as open source. [T1: NVIDIA IR press release] |
| 3 | **Be the secure runtime beneath enterprise agents** | The **NVIDIA Agent Toolkit** has three parts. **NemoClaw** is a secure agent runtime with process isolation, least-privilege access and a PII-stripping privacy router. **OpenShell** is the runtime and policy engine. **AI-Q** is a deep-research blueprint distributed through LangChain, which NVIDIA says is about half the cost of frontier-only setups. NVIDIA positions it as infrastructure *under* ServiceNow and Salesforce, not as a competitor. It is also expanding support for **OpenClaw**. [T1 GTC blog; T3 Futurum] |
| 4 | **Physical AI and robotics** | Six open model families: Nemotron, **Cosmos** (world models; Cosmos 3 is the first open "omnimodel"), **Isaac GR00T** (humanoids, with a reference design released), Alpamayo (autonomous vehicles), BioNeMo and Earth-2. Also IGX Thor at the edge (now generally available), Halos for Robotics safety, and **Jetson** edge devices, which are this hackathon's track prizes. Partners include BYD, Hyundai, ABB, KUKA, J&J and Medtronic. [T1] |
| 5 | **Sovereign AI** | Open models, datasets and NeMo let countries tailor AI to local language, culture and regulation. Examples: Nemotron-Personas datasets for Vietnam and El Salvador, YTL's ILMU models in Malaysia, the SOOFI consortium in Europe, and national builds in Korea and Japan. NVIDIA Cloud Partners doubled their AI factory footprint year over year. [T1] |
| 6 | **Grow the developer ecosystem and demand** | Huang projects **≥$1T in revenue from 2025 through 2027**. There is a $500B compute-financing platform with Apollo, BlackRock, Blackstone, KKR and others. DGX Spark and DGX Station put AI on the desktop. [T1] |

### Latest numbers: Q2 FY2027 (quarter ended Jul 26, 2026) [T1]
- Revenue **$96.2B**: +106% YoY, +18% QoQ
- Data Center **$89.0B**: +117% YoY
- Edge Computing **$7.2B**: +27% YoY
- Gross margin **75.0%**
- Q3 FY27 outlook: **$108.0B ±2%**, with no China data-center compute assumed
- About $26.0B returned to shareholders
- CNBC reports that Huang forecast about 70% revenue growth in FY2028 [T3]

### What NVIDIA wants from this hackathon
- **Nemotron adoption and proof points** beyond benchmarks. The hackathon requires at least one NVIDIA open model.
- **Real apps on its Agent Toolkit**: NemoClaw, OpenShell and Hermes Agent, named in the Personal AI track.
- **Physical AI pipeline**: GR00T, Cosmos and Sonic, plus Jetson hardware prizes that seed edge developers.
- **Developer feedback on its tools.** The feedback section is mandatory.

---

## 2. Nebius (Sponsor)

### Mission and positioning
Nebius describes itself as *"the AI cloud company building the full-stack platform for developers and companies to take charge of their AI future — from data and model training to production deployment."* Analysts summarize its aim as owning the stack **"from rack to token to agent."** It is headquartered in Amsterdam, listed on Nasdaq as NBIS, and led by founder and CEO **Arkady Volozh**. [T1 Nebius newsroom; T3 Futurum]

### Strategic objectives

| # | Objective | Evidence (Q2 2026 shareholder letter, Aug 12, 2026 unless noted) [T1] |
|---|---|---|
| 1 | **Scale capacity fast** | Year-end 2026 contracted-power target raised to **5 GW**, up from 4 GW+. Plans to **deploy >1 GW per year starting in 2027**. New sites in the UK, Estonia and Finland, plus owned US AI factories. A new **asset-light partner model** lets partners run Nebius's stack in their own data centers. |
| 2 | **Move up the stack from GPUs to tokens (Token Factory)** | Token Factory is its managed inference platform, with SLAs on throughput, latency and cost. **Production inference workloads grew more than 3x in Q2**, increasingly on open models, and a growing share of the workload is agentic. Day-one model support includes **Nemotron 3 Ultra**, Kimi K3, GLM-5.2 and MiniMax 3. It acquired **Eigen AI** and **Clarifai's core team** for inference optimization. |
| 3 | **Serve the full lifecycle** | "Training and inference are converging." Nebius hosts training, RL rollouts, evals, fine-tuning and serving on one platform, and uses that to argue it beats standalone inference providers. |
| 4 | **Become the agentic cloud** | The **Tavily** acquisition pairs real-time web search with inference. **Nebius Echo** is an AI agent that runs infrastructure in natural language, built on open models served by Token Factory. Nebius is adding CPU compute, including early NVIDIA Vera CPUs, for tool-calling and memory workloads. |
| 5 | **Win developers and the ecosystem** | The **Nebius Builder Program** (early preview) offers credits across AI Cloud, Token Factory, Tavily and Academy, plus office hours. It also runs Nebius Certifications and a Customer Advisory Board (AMI, Black Forest Labs, Cloudflare, Cognition, Cohere, Higgsfield, Revolut and others). **This hackathon is part of that effort.** |
| 6 | **Enterprise-grade and regulated workloads** | Aether 3.6 adds KMS with customer-managed keys, Workload Identity Federation, Budgets for FinOps, and Bring Your Own Image. |
| 7 | **Profitable hypergrowth** | See the numbers below. |

### NVIDIA ↔ Nebius relationship
- **NVIDIA invested $2B in Nebius**, announced Mar 13, 2026. The deal combines capital with co-design work. NVIDIA's stated aims: deploy **more than 5 GW of NVIDIA systems by 2030**, get early validation of Rubin, Vera and BlueField, and collaborate on **Dynamo** inference. [T3 Futurum; verify against T1 before citing externally]
- Nebius has **received its first Vera Rubin NVL72 systems** and is validating them for production. It is named as a Vera Rubin launch partner. [T1]

### Latest numbers: Q2 2026 [T1]
- Group revenue **$582.3M**, +454% YoY. AI cloud revenue **$575M**, +514%. **ARR $3.0B**.
- AI cloud adjusted EBITDA margin **about 50%**
- 4 landmark deals averaging **more than $1B TCV** each, with Reflection, Cohere, a US AI neolab and a quant trading firm. Q2 TCV grew about 4x QoQ.
- **More than $40B in customer commitments.** More than **$9B in customer prepayments** expected in 2026.
- Q2 capex about **$5.7B**. About $8B cash at the end of Q2.
- Other businesses: **Avride** (autonomous vehicles and robodelivery, with more than 60k Uber rides) and TripleTen (edtech). Equity stakes in Toloka and ClickHouse.

### What Nebius wants from this hackathon (inference)
- **Token Factory consumption and showcase apps**, especially agentic ones, since that is its growth engine
- **Use of the newer products**: Token Factory Sandboxes, Serverless Endpoints and Serverless Jobs
- **Physical AI proof points.** Its judges include a Head of GTM for Physical AI and a Physical AI Ecosystem principal, and Avride shows its robotics interest.
- **Builder Program sign-ups** and structured product feedback

---

## 3. Tavily (supporting sponsor)

### Mission
*"To onboard the next billion AI agents to the web."* Tavily is an API-first search engine for LLM and agent workflows. It covers real-time search, extraction, crawling and multi-step research, and returns ranked chunks with citations. [T1 Nebius newsroom; T3 Sacra]

### Objectives and status
| Item | Detail |
|---|---|
| Ownership | **Acquired by Nebius.** Announced Feb 10, 2026. Tavily keeps its brand and operates independently. Founder and CEO **Rotem Weiss** joined Nebius. Nebius did not disclose the price; third parties report **about $275M** [T3, unverified]. |
| Deal rationale | Token Factory handles reasoning and Tavily provides real-time grounding for factual accuracy. Together they give one vendor for agent builders, with less "patching together disparate vendors." [T1] |
| Growth | More than **2.5M developers** by Q2 2026, up from 1M in February. Serves Fortune 500 companies. [T1] |
| Q2 2026 launches | **Keyless pay-per-search** for autonomous agents. **ISO 27001** certification. [T1] |
| Prior funding | $5M seed (Jul 2024) and $20M Series A (Aug 2025, led by Insight Partners and Alpha Wave), for $25M total [T3] |

### What Tavily wants from this hackathon
- **Runtime Tavily API usage in agents.** The $3,000 Best Use of Tavily prize requires a functional runtime call.
- Showcases of Token Factory reasoning combined with Tavily grounding, which is the deal thesis in working form

---

## 4. Partner ecosystem named by the sponsors

| Ecosystem | Members / partners | Relevance |
|---|---|---|
| **Nemotron Coalition** (NVIDIA) | Black Forest Labs, Cursor, LangChain, Mistral AI, Perplexity, Reflection AI, Sarvam, Thinking Machines Lab | Open frontier models. Nemotron 4 base model with Mistral. |
| **Vera Rubin launch clouds** (NVIDIA) | CoreWeave, Google Cloud, Microsoft Azure, Oracle, **Nebius** | Nebius sits alongside the hyperscalers |
| **Agent Toolkit distribution** (NVIDIA) | LangChain (AI-Q), ServiceNow, Salesforce (NemoClaw as the layer beneath) | Enterprise agents |
| **Physical AI** (NVIDIA) | BYD, Hyundai, Nissan, Geely, ABB, Universal Robots, KUKA, J&J, Medtronic, KARL STORZ, T-Mobile | Robotics, autonomous vehicles, edge |
| **Sovereign AI** (NVIDIA) | SK Telecom, NAVER, YTL (Malaysia), SOOFI (EU), Japan national AI infrastructure | Local-language and regulated AI |
| **Nebius anchor customers** | Microsoft, Meta, Reflection, Cohere | Multi-billion-dollar capacity deals |
| **Nebius Customer Advisory Board** | AMI, Black Forest Labs, Cloudflare, Cognition, Cohere, Core Automation, Higgsfield, Recraft, Revolut, Rhoda | Feedback loop for the Nebius roadmap |
| **Nebius group** | Tavily, Avride, TripleTen, Eigen AI, Clarifai team; stakes in Toloka and ClickHouse | Search, robotics/autonomous vehicles, education, inference optimization |

---

## 5. Where the partners' goals overlap (inference)

All three sponsors want the same story shown on screen: **an open NVIDIA model, served on Nebius Token Factory, grounded by Tavily, running as a real agent that people use.**

| Shared goal | NVIDIA | Nebius | Tavily | Implication for a submission |
|---|---|---|---|---|
| Open models win in production | Nemotron | Token Factory runs on open models | None | Use Nemotron as the main model, not a token call. Show routing across Nano, Super and Ultra tiers by task cost. |
| Agents are the growth workload | Agent Toolkit, NemoClaw | Agentic share of inference growing | "Next billion agents" | Build something multi-step and tool-calling, not a chat wrapper |
| Secure, private, governed agents | NemoClaw privacy router and isolation | KMS, Workload Identity, sovereign-friendly | ISO 27001 | This fits the Personal AI track and PH data-privacy framing (RA 10173) |
| Real-time grounding | AI-Q research agent | Tavily in-stack | Core product | One real Tavily call opens the $3k bonus and matches the deal thesis |
| Physical AI | GR00T, Cosmos, Jetson | Physical AI GTM team, Avride | None | The highest-signal track for both judge groups, but it needs real hardware footage |
| Developer feedback | Tool feedback | Builder Program | Developer relations judges | Treat the mandatory feedback as a deliverable |

---

## Sources

**T1 (primary)**
- [Nebius Q2 2026 Letter to Shareholders (Aug 12, 2026)](https://assets.nebius.com/assets/a6ecfd85-a6cb-4967-8ef7-9a25bd261f9c/SHLQ226.pdf)
- [Nebius: agreement to acquire Tavily (Feb 10, 2026)](https://nebius.com/newsroom/nebius-announces-agreement-to-acquire-tavily-to-add-agentic-search-to-its-ai-cloud-platform)
- [Nebius blog: Bringing agentic search into the production AI stack](https://nebius.com/blog/posts/bringing-agentic-search-into-the-production-ai-stack)
- [NVIDIA: Nemotron Coalition press release (Mar 16, 2026)](https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Launches-Nemotron-Coalition-of-Leading-Global-AI-Labs-to-Advance-Open-Frontier-Models/default.aspx)
- [NVIDIA GTC 2026 live updates blog](https://blogs.nvidia.com/blog/gtc-2026-news/)
- [NVIDIA Q2 FY2027 financial results (Aug 26, 2026)](https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-second-quarter-fiscal-2027)
- [Hackathon overview](https://nebiusglobalaihackathon.devpost.com/), [Rules](https://nebiusglobalaihackathon.devpost.com/rules) and [Resources](https://nebiusglobalaihackathon.devpost.com/resources)

**T3 (analyst / journalistic)**
- [Futurum: Nebius designs the agentic era with NVIDIA investment](https://futurumgroup.com/insights/nebius-designs-the-agentic-era-of-ai-cloud-platforms-with-nvidia-investment/)
- [Futurum: At GTC 2026, NVIDIA stakes its claim on autonomous agent infrastructure](https://futurumgroup.com/insights/at-gtc-2026-nvidia-stakes-its-claim-on-autonomous-agent-infrastructure/)
- [CNBC: Nvidia Q2 FY27 earnings takeaways](https://www.cnbc.com/2026/08/26/nvidia-nvda-earnings-report-q2-2027-live-updates.html)
- [Sacra: Tavily](https://sacra.com/c/tavily/)
- [Insight Partners: Tavily raises $25M](https://www.insightpartners.com/ideas/tavily-raises-25-million-to-power-the-internet-of-agents/)
- [Medium: Tavily alternatives after the Nebius acquisition](https://medium.com/@unicodeveloper/tavily-alternatives-in-2026-after-the-nebius-acquisition-9de526780686), the source of the ~$275M figure (unverified)

**Open items:** Two figures come only from secondary sources and need a primary source before external use. They are the **$2B NVIDIA investment in Nebius** and the **$275M Tavily price**.
