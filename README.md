# VibeSec

[![Status: Planning](https://img.shields.io/badge/status-planning-745c00)](docs/index.md)

VibeSec is a planned security-testing tool for AI-built apps. It will run bounded checks against isolated copies of an app and show which failures it can reproduce, with the requests and responses needed to repeat each check.

The first demo uses an owned synthetic notes API and a repaired version. It will compare the same checks before and after the repair. No working application, live provider run, detection benchmark, or hosted demo exists yet.

## Work in this repository

The product scope, system design, interface direction, test plan, and demo outline are drafted. The immediate implementation task is to prove branch independence, app restart, network controls, and one valid model call against the synthetic fixture.

The planned integration uses NVIDIA Nemotron through Nebius inference and Token Factory Sandboxes for execution. Exact model and dependency versions will be recorded after live verification. Model output selects supported check IDs; reviewed code controls execution and verifies findings.

## Start developing

Clone this private repository with an account that has team access:

```bash
git clone https://github.com/Axon-Enjin/nvidia-coding-agentic-engineering.git
cd nvidia-coding-agentic-engineering
git switch -c feature/sandbox-proof
```

Read [current state](docs/state.md), the [build guide](docs/build-vibesec.md), and the [sandbox feasibility note](docs/research-vibesec.md) before starting the first slice. Work on a task branch and open a pull request into `main`. Include the acceptance criteria addressed, checks run, and any changed assumptions. Application code and dependency installation will begin with the synthetic sandbox/inference proof; the repository currently contains its specifications.

Keep provider credentials in your local environment. Share access through the team's account controls. Remote tests must be explicit, bounded, and use owned synthetic fixtures.

## Check the documentation

Document tooling is FMD v3.0.1.

Use Python 3.12; on systems where it is named `python3`, substitute that command. An existing local directory can be selected with `FMD_ROOT` or `python scripts/fmd.py check --fmd-root /path/to/FMD`. The launcher also discovers a directory named `FMD` one or two directories above this repository.

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
| [Full index](docs/index.md) | All existing project documents |

[Brand](BRAND.md) and [design](DESIGN.md) describe the proposed interface. [Hackathon rules](HACKATHON.md), [sponsor context](ORG.md), [original research prompt](PROMPT.md), and [original report](Nebius-Hackathon-Research-Strategy.md) remain available as source context. Claims in the original report are not automatically accepted as product evidence.

## Demo and distribution

A demo URL and video are not available yet. The planned recording shows a synthetic cross-user read, its evidence, and a repaired comparison. An empty or incomplete result will not be presented as proof of security.

A product license has not been selected. Review release contents, component licenses, and rights before public submission.
