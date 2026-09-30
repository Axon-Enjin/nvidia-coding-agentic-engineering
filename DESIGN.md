> Derived from [docs/dsd-vibesec.md](docs/dsd-vibesec.md). Keep this reference aligned with that source.

# Design:

> Visual language and interface guidance.

## 2. Brand Primitives

### 2.0 Token Architecture

Primitive tokens hold color/spacing values; semantic tokens convey role; component tokens reference semantic tokens. Use CSS custom properties and one light theme initially.

### 2.1 Colors

| Token | Value |
|-------|-------|
| `--color-bg` | `#F4F3EE` |
| `--color-surface` | `#FFFFFF` |
| `--color-border` | `#CBD1D6` |
| `--color-primary` | `#154B66` |
| `--color-primary-hover` | `#0E354A` |
| `--color-text` | `#17212B` |
| `--color-text-muted` | `#4B5965` |
| `--color-success` | `#216540` |
| `--color-warning` | `#755000` |
| `--color-error` | `#A4262C` |

Semantic status colors pair with labels and icons, never color alone. Validate actual text/component contrast when implemented; the palette is not a completed accessibility audit.

### 2.2 Logo System

Use the plain-text wordmark VibeSec. No asset variants exist. Minimum rendered size 20px; preserve normal letter spacing and avoid effects. A favicon can be designed after the interface works.

### 2.3 Typography

System sans-serif stack for UI, system monospace stack for request and evidence text. Headings: 28/24/18px, weight 600, line-height 1.25. Body: 16px/1.5. Labels: 14px/1.4. Evidence: 13px/1.5 with wrapping and a copy control. No downloaded fonts or third-party font requests.

### 2.4 Imagery and depth

No stock photography or generated illustration. A branch diagram may show real execution receipts only, with a matching tabular list. Inline panels use borders; floating dialogs use a restrained shadow. Do not animate simulated activity as if it were live.
## 3. Layout & Spatial System

Base spacing 4px; scale 4, 8, 12, 16, 24, 32, 48px. Maximum content width 1280px. At 1024px and above, attempt list and evidence form two columns; below that they stack in reading order. Check widths 375, 768, 1024, and 1440px. Long evidence wraps without overflowing the viewport.
## 4. Core Component Specs

Buttons: 44px minimum target height; primary starts a declared fixture run, secondary exports, destructive stops work. Hover darkens the semantic fill; focus has a visible 2px outline with 2px offset. Disabled controls remain labeled with a reason, rather than opacity alone.

Inputs: fixture and profile selects only, with visible labels and inline validation. No target URL input. Scope and budgets are read-only facts supplied by the service.

Run header: fixture revision, live/replay indicator, status, elapsed time, completed/total attempts, and cleanup state. Probe row: ID/name, state, duration, and evidence link. Finding panel: assertion, observation, redacted request/response, provenance, and limitations. Comparison rows match probe IDs and use labels for confirmed, not reproduced, and inconclusive.

Empty state: choose the owned demo fixture and explain its synthetic data. Loading state: real stage and counts; no fake percentage. Error state: what failed, what remains unknown, and whether retry creates a new run. Completed state: report findings and explicit tested scope. Cancellation preserves completed evidence and marks remaining probes incomplete.
## 5. Motion

Use 120ms transitions for state changes. No pulsing branch tree, simulated progress, auto-scrolling evidence, or continuous animation. Respect reduced motion; status updates use restrained polite live announcements without reading raw request bodies aloud.
## 6. Accessibility

Use landmarks, ordered headings, native controls, table headers, visible focus, and text labels. Check 4.5:1 normal text contrast and 3:1 non-text controls. All flows work with keyboard and a screen reader. Dialogs retain focus correctly; routes put focus on their heading. Timestamp labels specify timezone. Copy controls announce completion, and export remains available without JavaScript-only interaction.
## 7. Design Settings

Low visual variance, low motion, moderate information density. The evidence is the main visual material. Keep documentation and product copy readable without familiarity with the build process.
## 8. Implementation Quality Gate

No interface has been implemented or audited. Accessibility, performance, responsive behavior, theming, and interface anti-pattern checks remain unexecuted. Before a demo release, no critical or high-severity interface defect may remain, and every primary state must be tested. Do not report a taste or accessibility score until an actual audit exists.

| Surface | Example |
|---------|---------|
| Run header | Nine checks planned. Three finished. One confirmed finding. |
| Finding | A second synthetic account read the first account's note. |
| Repaired comparison | This check did not reproduce the finding on the repaired fixture. |
| Failure | The sandbox timed out. Six checks remain incomplete. |
