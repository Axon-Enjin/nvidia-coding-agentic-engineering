> Derived from [docs/dsd-vibesec.md](docs/dsd-vibesec.md). Keep this reference aligned with that source.

# Design:

> Visual language and interface guidance.

## 2. Brand Primitives

### 2.0 Token Architecture

Primitive tokens hold color/spacing values; semantic tokens convey role; component tokens reference semantic tokens. The local interface uses warm light surfaces, fine rules, and a restrained evergreen accent. Evidence states retain text labels.

### 2.1 Colors

| Token | Value |
|-------|-------|
| `--bg` | `#F7F8F5` |
| `--surface` | `#FFFFFF` |
| `--line` | `#D6DED6` |
| `--ink` | `#1C2922` |
| `--accent` | `#285F45` |
| `--muted` | `#59665F` |
| `--green` | `#286347` |
| `--amber` | `#77571F` |
| `--red` | `#A6363F` |

Semantic status colors pair with labels and icons, never color alone. Validate actual text/component contrast when implemented; the palette is not a completed accessibility audit.

### 2.2 Logo System

The local MVP uses a plain VibeSec text wordmark with a small slash. It is an interface treatment, not a final approved logo. Keep rendered text at least 20px and avoid external logo dependencies. A favicon can be designed after the interface works.

### 2.3 Typography

System sans-serif stack for UI, system monospace stack for small labels and evidence. The first-screen question is prominent without crowding the diagram; workbench headings are smaller for easy scanning. Body is 16px/1.5; request and response text wraps at 12px/1.5 in the local MVP. No downloaded fonts or third-party font requests. A copy control remains planned.

### 2.4 Imagery and depth

No stock photography or external imagery. The original SVG shows a single owned note and two actors; the question mark on Bob's path stays unresolved until execution. Any future branch diagram that depicts execution must use real receipts with a matching tabular list. Evidence panels use borders; no simulated activity is animated as if live.
## 3. Layout & Spatial System

Base spacing 4px; scale 4, 8, 12, 16, 24, 32, 48px. Maximum content width 1220px. The local workbench and comparison use two columns on desktop and stack in reading order below 760px. Check widths 375, 768, 1024, and 1440px. Long evidence wraps without overflowing the viewport.
## 4. Core Component Specs

Buttons: 44px minimum target height; primary starts a declared fixture run, secondary exports, destructive stops work. Hover darkens the semantic fill; focus has a visible 2px outline with 2px offset. Disabled controls remain labeled with a reason, rather than opacity alone.

Inputs: fixture and profile selects only, with visible labels and inline validation. No target URL input. Scope and budgets are read-only facts supplied by the service.

Run header: fixture revision, live/replay indicator, status, elapsed time, completed/total attempts, and cleanup state. Probe row: ID/name, state, duration, and evidence link. Finding panel: assertion, observation, redacted request/response, provenance, and limitations. Comparison rows match probe IDs and use labels for confirmed, not reproduced, and inconclusive.

Empty state: choose the owned demo fixture and explain its synthetic data. Loading state: real stage and counts; no fake percentage. Error state: what failed, what remains unknown, and whether retry creates a new run. Completed state: report findings and explicit tested scope. Cancellation preserves completed evidence and marks remaining probes incomplete.
## 5. Motion

The first screen is static. Plan and report arrival use a 200ms opacity transition; hover feedback uses 150ms color changes. The boundary illustration does not move or imply live execution. No simulated progress or continuous animation. Respect reduced motion, and announce status changes politely without reading raw request bodies aloud.
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
