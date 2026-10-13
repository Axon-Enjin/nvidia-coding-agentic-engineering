# VibeSec

[![Status: Local MVP](https://img.shields.io/badge/status-local%20MVP-745c00)](docs/index.md)

VibeSec is a security-promise experiment for AI-built apps. A reviewer starts with a short product brief, reviews a bounded security rule, and sees whether actual HTTP responses satisfy it. The current MVP tests only an owned synthetic notes app.

The MVP includes a browser interface, two synthetic briefs, reviewed positive and negative checks, a vulnerable/repaired comparison, exact-canary evidence, JSON download, and a fixture-specific regression test. It runs locally. Optional live NVIDIA planning through Nebius is implemented but has not been called or verified with this account. Nebius Sandbox execution, a hosted judge build, and a detection benchmark do not exist yet.

## Work in this repository

The product scope, system design, interface direction, test plan, and demo outline are drafts. The local MVP is executable. The next engineering task is to verify a real NVIDIA model call and Nebius Sandbox branch independence, app restart, network controls, and receipts using the synthetic fixture.

## Run the browser MVP

Use Python 3.12 or newer. No package installation or credits are needed for the local walkthrough.

```bash
python -m vibesec.web --port 8000
```

Open `http://127.0.0.1:8000`. Choose **Private notes**, leave **Local walkthrough** selected, generate the plan, review the promise, and run the comparison. The report shows Bob receiving Alice's exact note before the repair and a 403 denial afterward. Alice's legitimate read must continue to work. The **Sign-in required** brief selects a different reviewed check and demonstrates a case where no violation is observed.

Download the evidence JSON or the fixture-specific regression script from the report. To run the script, start the repaired fixture in another terminal:

```bash
python fixture/notes_api.py --profile repaired --port 8080
python regression_test.py http://127.0.0.1:8080
```

The script should pass against `repaired` and fail against `vulnerable`. The app and fixture bind to loopback only. The local result is always labeled as local execution; it is not a Sandbox receipt or a security guarantee for another app.

To enable the **Live NVIDIA model via Nebius** plan source, set `NEBIUS_API_KEY` in your local environment, run `python -m vibesec.models` to see NVIDIA models available to your account, then set `NEBIUS_MODEL` to the exact model ID and restart the web server. Do not put keys in the repository or chat. The model proposes only a reviewed promise and its fixed checks; the server validates the plan before execution. This mode uses a real inference request when configured, while execution still runs locally until the Sandbox integration is verified.

Run tests with:

```bash
python -m unittest discover -s tests -v
```

The original command-line proof is still available:

```bash
python -m vibesec.local_proof
```

The proof starts both fixture profiles on loopback, makes the same request as synthetic user Bob for Alice's note, and reports an exact canary match only when the response contains it. Its output is labeled `local_fixture_proof`; it is not a Nebius Sandbox or model run. The standalone fixture can also be started with `python fixture/notes_api.py --profile vulnerable --port 8080`; use `repaired` for the negative control. Never expose the intentionally vulnerable profile outside loopback.

The planned remote integration uses NVIDIA Nemotron through Nebius inference and Token Factory Sandboxes for execution. Exact model and dependency versions will be recorded after live verification. Model output selects a reviewed promise and its supported checks; reviewed code controls execution and verifies findings.

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

After the tooling check passes, enable the optional local pre-commit check with `git config --local core.hooksPath .githooks`. It uses the same tooling clone and requires Python. If tooling access is pending, teammates can still run the local MVP; document validation requires separate tooling access. Application CI remains pending.

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

The repository carries an MIT license. Review release contents, component licenses, and rights before public submission.
