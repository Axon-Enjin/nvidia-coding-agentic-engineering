"""Run documentation tools from an existing FMD clone."""

import argparse
import os
from pathlib import Path
import subprocess
import sys


PROJECT_ROOT = Path(__file__).resolve().parent.parent


def find_engine(explicit_root):
    configured = explicit_root or os.environ.get("FMD_ROOT")
    candidates = (
        [Path(configured).expanduser()]
        if configured
        else [PROJECT_ROOT.parent / "FMD", PROJECT_ROOT.parent.parent / "FMD"]
    )
    for candidate in candidates:
        root = candidate.resolve()
        if (root / "AGENTS.md").is_file() and (root / "scripts/check.py").is_file():
            return root
    raise FileNotFoundError(
        "FMD clone not found. Set FMD_ROOT or pass --fmd-root with its path. "
        "See README.md for team setup."
    )


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("command", nargs="?", default="check", choices=["check", "record", "cockpit", "locate"])
    parser.add_argument("--action", default="", help="completed work to append to the project log")
    parser.add_argument("--fmd-root", help="existing FMD clone; overrides FMD_ROOT and nearby discovery")
    args = parser.parse_args()
    if args.command == "record" and not args.action.strip():
        parser.error("record requires --action describing completed work")
    try:
        engine = find_engine(args.fmd_root)
    except FileNotFoundError as error:
        print(error, file=sys.stderr)
        return 2
    if args.command == "locate":
        print(engine)
        return 0
    script = engine / "scripts" / f"{args.command}.py"
    if not script.is_file():
        print(f"FMD script not found: {script}", file=sys.stderr)
        return 2
    arguments = {
        "check": [".", "--strict"],
        "record": ["docs/", "--action", args.action, "--check", "--slug", "vibesec"],
        "cockpit": ["."],
    }[args.command]
    return subprocess.run([sys.executable, str(script), *arguments], cwd=PROJECT_ROOT).returncode


if __name__ == "__main__":
    sys.exit(main())
