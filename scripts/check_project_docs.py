"""Check repository-local documentation consistency.

This is a fallback integrity gate for contributors who only have the VibeSec
repository. It does not replace or impersonate the external FMD v3.0.1 engine.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs"
FMD_VERSION = "FMD v3.0.1"

REQUIRED_DOCS = (
    "state.md",
    "index.md",
    "idea-vibesec.md",
    "scrutiny-vibesec.md",
    "prd-vibesec.md",
    "dsd-vibesec.md",
    "sdd-vibesec.md",
    "rfc-vibesec-sandbox-execution.md",
    "qad-vibesec.md",
    "build-vibesec.md",
    "clr-vibesec.md",
    "aia-vibesec.md",
    "ops-vibesec.md",
    "pitch-vibesec.md",
    "log-vibesec.md",
)

STALE_ACTIVE_PHRASES = {
    "docs/clr-vibesec.md": ("Product code does not yet exist",),
    "docs/qad-vibesec.md": ("when code exists", "existing FMD clone"),
    "docs/sdd-vibesec.md": ("existing FMD clone",),
    "docs/state.md": ("documentation validation is pending",),
}

MOJIBAKE = ("Â", "â€™", "â€œ", "â€", "ï»¿")
LINK_RE = re.compile(r"(?<!!)\[[^\]]+\]\(([^)]+)\)")


def read(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def main() -> int:
    failures: list[str] = []

    for name in REQUIRED_DOCS:
        if not (DOCS / name).is_file():
            failures.append(f"missing required document: docs/{name}")

    pointer_files = (ROOT / "AGENTS.md", ROOT / "README.md", DOCS / "index.md")
    for path in pointer_files:
        if path.is_file() and FMD_VERSION not in read(path):
            failures.append(f"{path.relative_to(ROOT)} does not name {FMD_VERSION}")

    markdown_files = sorted(ROOT.glob("*.md")) + sorted(DOCS.rglob("*.md"))
    for path in markdown_files:
        content = read(path)
        relative = path.relative_to(ROOT).as_posix()

        if re.search(r"^(<<<<<<<|=======|>>>>>>>)", content, re.MULTILINE):
            failures.append(f"{relative} contains a merge-conflict marker")
        for marker in MOJIBAKE:
            if marker in content:
                failures.append(f"{relative} contains mojibake marker {marker!r}")
        for phrase in STALE_ACTIVE_PHRASES.get(relative, ()):
            if phrase.casefold() in content.casefold():
                failures.append(f"{relative} contains stale statement: {phrase!r}")

        for raw_target in LINK_RE.findall(content):
            target = raw_target.strip().split(maxsplit=1)[0].strip("<>\"")
            if not target or target.startswith(("#", "http://", "https://", "mailto:")):
                continue
            target = target.split("#", 1)[0].split("?", 1)[0]
            if not target:
                continue
            resolved = (path.parent / target).resolve()
            if not resolved.exists():
                failures.append(f"{relative} has unresolved link: {raw_target}")

    state_text = read(DOCS / "state.md")
    index_text = read(DOCS / "index.md")
    state_date_match = re.search(r"\*\*Last updated:\*\*\s*(\d{4}-\d{2}-\d{2})", state_text)
    index_date_match = re.search(
        r"\| STATE · Operating position \|.*?\| (\d{4}-\d{2}-\d{2}) \|",
        index_text,
    )
    if not state_date_match:
        failures.append("docs/state.md has no parseable Last updated date")
    if not index_date_match:
        failures.append("docs/index.md has no parseable STATE inventory date")
    if state_date_match and index_date_match and state_date_match.group(1) != index_date_match.group(1):
        failures.append(
            "state/index date mismatch: "
            f"{state_date_match.group(1)} != {index_date_match.group(1)}"
        )

    if failures:
        print("Repository documentation consistency check failed:", file=sys.stderr)
        for failure in failures:
            print(f"- {failure}", file=sys.stderr)
        print(f"\n{len(failures)} failure(s)", file=sys.stderr)
        return 1

    print(
        f"Repository documentation consistency check passed: "
        f"{len(markdown_files)} Markdown files, {len(REQUIRED_DOCS)} required artifacts."
    )
    print("This local gate does not replace the external FMD v3.0.1 strict validator.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
