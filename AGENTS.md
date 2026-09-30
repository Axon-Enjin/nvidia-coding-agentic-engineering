# VibeSec agent guide

At session start, read [docs/state.md](docs/state.md) and [docs/index.md](docs/index.md). For implementation, use [docs/build-vibesec.md](docs/build-vibesec.md) and the relevant requirements, design, and test criteria. The product documents are Draft; current implementation status is in state.md.

For the FMD workflow, locate the separate engine clone with `python scripts/fmd.py locate` (PowerShell: `./scripts/fmd.ps1 locate`). Read its AGENTS.md and templates/_triggers.md. Engine-relative paths resolve inside that clone; project outputs stay here. Load templates and guides only when the current task requires them. If engine access is pending, continue from the existing project specs; do not invent engine checks or copy its files here.

Team setup and the available engine revision are in [README.md](README.md). Use `FMD_ROOT` for a custom location. The launcher also discovers a clone named FMD one or two directories above this repository. The draft suite was authored with local FMD 2.0.1; the documented team baseline is the available 2.0.0 revision.

Use `python scripts/fmd.py check` for strict validation and `python scripts/fmd.py record --action "Describe completed work"` to update the index and append the log. PowerShell equivalents use scripts/fmd.ps1. Generate a cockpit only on request.

Keep this file as a pointer. The engine materializer writes AGENTS.md, so use an explicit temporary --out directory when materializing references. Project build guidance remains in docs/build-vibesec.md.
