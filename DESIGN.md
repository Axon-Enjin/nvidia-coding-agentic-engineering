> Derived from [docs/dsd-vibesec.md](docs/dsd-vibesec.md). Keep this reference aligned with that source.

# Design:

> Visual language and interface guidance.

## 2. Brand Primitives

### 2.0 Token Architecture

Primitive tokens hold color/spacing values; semantic tokens convey role; component tokens reference semantic tokens. The local interface uses warm light surfaces, a dark hero illustration and footer, and a lime accent. Evidence states retain text labels.

### 2.1 Colors

| Token | Value |
|-------|-------|
| `--bg` | `#F4F4F0` |
| `--paper` | `#FDFDF9` |
| `--line` | `#C8CDCA` |
| `--ink` | `#111719` |
| `--lime` | `#CEFB73` |
| `--muted` | `#56605F` |
| `--green` | `#246548` |
| `--amber` | `#76551E` |
| `--red` | `#A72F3B` |

Semantic status colors pair with labels and icons, never color alone. Validate actual text/component contrast when implemented; the palette is not a completed accessibility audit.

### 2.2 Logo System

The local MVP uses a lowercase text wordmark with a small CSS bar glyph and lime accent. It is an interface treatment, not a final approved logo. Keep rendered text at least 20px and avoid external logo dependencies. A favicon can be designed after the interface works.

### 2.3 Typography

System sans-serif stack for UI, system monospace stack for labels and evidence. The first-screen headline is oversized and tightly tracked; workbench headings step down sharply so results remain easy to scan. Body is 16px/1.5; request and response text wraps at 12px/1.55 in the local MVP. No downloaded fonts or third-party font requests. A copy control remains planned.

### 2.4 Imagery and depth

No stock photography or generated illustration. The static hero orbit depicts the sample Alice/Bob ownership question and is labeled as the test case. Any future branch diagram that depicts execution must use real receipts with a matching tabular list. Evidence panels use borders; no simulated activity is animated as if live.
## 3. Layout & Spatial System

Base spacing 4px; scale 4, 8, 12, 16, 24, 32, 48px. Maximum content width 1400px. The local workbench and comparison use two columns on desktop and stack in reading order below 800px. Check widths 375, 768, 1024, and 1440px. Long evidence wraps without overflowing the viewport.
## 4. Core Component Specs

Buttons: 44px minimum target height; primary starts a declared fixture run, secondary exports, destructive stops work. Hover darkens the semantic fill; focus has a visible 2px outline with 2px offset. Disabled controls remain labeled with a reason, rather than opacity alone.

Inputs: fixture and profile selects only, with visible labels and inline validation. No target URL input. Scope and budgets are read-only facts supplied by the service.

Run header: fixture revision, live/replay indicator, status, elapsed time, completed/total attempts, and cleanup state. Probe row: ID/name, state, duration, and evidence link. Finding panel: assertion, observation, redacted request/response, provenance, and limitations. Comparison rows match probe IDs and use labels for confirmed, not reproduced, and inconclusive.

Empty state: choose the owned demo fixture and explain its synthetic data. Loading state: real stage and counts; no fake percentage. Error state: what failed, what remains unknown, and whether retry creates a new run. Completed state: report findings and explicit tested scope. Cancellation preserves completed evidence and marks remaining probes incomplete.
## 5. Motion

The rare first-screen entrance uses an opacity/translate reveal of 650–800ms. The note and two identity markers join that entrance once to explain the boundary. Plan and report arrival use 280ms; buttons and other routine feedback use 140–200ms. The boundary illustration does not pulse or imply live execution. No simulated progress or continuous animation. Respect reduced motion, and announce status changes politely without reading raw request bodies aloud.
## 6. Accessibility

Use landmarks, ordered headings, native controls, table headers, visible focus, and text labels. Check 4.5:1 normal text contrast and 3:1 non-text controls. All flows work with keyboard and a screen reader. Dialogs retain focus correctly; routes put focus on their heading. Timestamp labels specify timezone. Copy controls announce completion, and export remains available without JavaScript-only interaction.
## 7. Design Settings

Low visual variance, low motion, moderate information density. The evidence is the main visual material. Keep documentation and product copy readable without familiarity with the build process.
## 8. Implementation Quality Gate

A loopback interface has been implemented. Desktop rendering and a 390px device-emulated local plan/run/report flow were inspected on 2026-10-13 with no horizontal overflow or JavaScript exception observed. Accessibility, performance, remote partial-run states, and a complete interface audit remain unexecuted. Before a demo release, no critical or high-severity interface defect may remain, and every primary state must be tested. Do not report a taste or accessibility score until an actual audit exists.

| Surface | Example |
|---------|---------|
| Run header | Nine checks planned. Three finished. One confirmed finding. |
| Finding | A second synthetic account read the first account's note. |
| Repaired comparison | This check did not reproduce the finding on the repaired fixture. |
| Failure | The sandbox timed out. Six checks remain incomplete. |
