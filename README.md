# VibeSec

[![Status: Local proof](https://img.shields.io/badge/status-local%20proof-745c00)](docs/index.md)

VibeSec is a planned security-testing tool for AI-built apps. It will run bounded checks against isolated copies of an app and show which failures it can reproduce, with the requests and responses needed to repeat each check.

The first demo uses an owned synthetic notes API and a repaired version. A local proof now compares one fixed authorization check across both profiles. The full app, live provider run, detection benchmark, and hosted demo do not exist yet.

## Work in this repository

The product scope, system design, interface direction, test plan, and demo outline are drafted. The local fixture and deterministic cross-user check are implemented. The next implementation task is to prove branch independence, app restart, network controls, and one valid model call against the synthetic fixture.

Run the local proof with Python 3.12 or newer, using only the standard library:

```bash
python -m vibesec.local_proof
python -m unittest discover -s tests -v
```

The proof starts both fixture profiles on loopback, makes the same request as synthetic user Bob for Alice's note, and reports an exact canary match only when the response contains it. Its output is labeled `local_fixture_proof`; it is not a Nebius Sandbox or model run. The standalone fixture can also be started with `python fixture/notes_api.py --profile vulnerable --port 8080`; use `repaired` for the negative control. Never expose the intentionally vulnerable profile outside loopback.

The planned integration uses NVIDIA Nemotron through Nebius inference and Token Factory Sandboxes for execution. Exact model and dependency versions will be recorded after live verification. Model output selects supported check IDs; reviewed code controls execution and verifies findings.

## Start developing

Clone the repository:

```bash
git clone https://github.com/Axon-Enjin/nvidia-coding-agentic-engineering.git
cd nvidia-coding-agentic-engineering
git switch -c feature/sandbox-proof
```

Read [current state](docs/state.md), the [build guide](docs/build-vibesec.md), and the [sandbox feasibility note](docs/research-vibesec.md) before continuing. Work on a task branch and open a pull request into `main`. Include the acceptance criteria addressed, checks run, and any changed assumptions.

Keep provider credentials in your local environment. Share access through the team's account controls. Remote tests must be explicit, bounded, and use owned synthetic fixtures.

## Check the documentation

Document tooling uses a separate private repository. If you have access, clone it beside this project and use the available team baseline, version 2.0.0:

```bash
git clone FMD framework ../FMD
git -C ../FMD checkout --detach 843f84a297c73a1fdf8b65483455e87e208a3707
python scripts/fmd.py check
```

Use Python 3.12; on systems where it is named `python3`, substitute that command. An existing tooling clone can be selected with `FMD_ROOT` or `python scripts/fmd.py check --fmd-root /path/to/FMD`. The launcher also discovers a clone named `FMD` one or two directories above this repository. The original drafts were authored with local tooling version 2.0.1; that unpublished revision is not required for team setup.

PowerShell, from this directory:

```powershell
.\scripts\fmd.ps1 check
.\scripts\fmd.ps1 record -Action "Describe completed work"
```

For other platforms:

```bash
python scripts/fmd.py check
python scripts/fmd.py record --action "Describe completed work"
```

After the tooling check passes, enable the optional local pre-commit check with `git config --local core.hooksPath .githooks`. It uses the same tooling clone and requires Python. If tooling access is pending, teammates can read the product specs and begin implementation; document validation requires separate tooling access. Application CI and install/run instructions will be added with the first executable slice.

## Documentation

| Document | Purpose |
|-----------|---------|
| [Current state](docs/state.md) | Position, assumptions, and next work |
| [Idea](docs/idea-vibesec.md) | Reviewer, pain, and first demo |
| [Scrutiny](docs/scrutiny-vibesec.md) | Verified sources and open risks |
| [Requirements](docs/prd-vibesec.md) | Scope and acceptance criteria |
| [System design](docs/sdd-vibesec.md) | Components, contracts, and security boundary |
| [Test plan](docs/qad-vibesec.md) | Functional, failure, abuse, and model checks |
| [Sandbox feasibility](docs/research-vibesec.md) | Documented capabilities and runtime proof still needed |
| [Competitive landscape](docs/competitive-landscape-vibesec.md) | Current alternatives, limitations, and proposed edge |
| [Full index](docs/index.md) | All existing project documents |

[Brand](BRAND.md) and [design](DESIGN.md) describe the proposed interface. [Hackathon rules](HACKATHON.md), [sponsor context](ORG.md), [original research prompt](PROMPT.md), and [original report](Nebius-Hackathon-Research-Strategy.md) remain available as source context. Claims in the original report are not automatically accepted as product evidence.

## Demo and distribution

A demo URL and video are not available yet. The planned recording shows a synthetic cross-user read, its evidence, and a repaired comparison. An empty or incomplete result will not be presented as proof of security.

A product license has not been selected. Review release contents, component licenses, and rights before public submission.
