> Derived from [docs/dsd-vibesec.md](docs/dsd-vibesec.md). Keep this reference aligned with that source.

# Brand:

> Verbal identity and writing guidance.

## 0. Brand Stance

**Selected mode:** Product, focused on reviewing evidence.

**Cultural or aesthetic reference:** A lab notebook beside a test bench: clearly numbered attempts, legible observations, and room for uncertainty.

**Distinctive line:** Show the request. Show the record. Run the check again.

**Archetypical user:** Mira, the fictional reviewer checking a small team's app before a staging release. This is a proposed design direction, not a user-tested identity.

Give the reviewer an evidence desk: fixture revision at the top, attempts in the middle, finding detail alongside. Use color sparingly. Avoid hacker imagery, decorative attack maps, sweeping safety scores, and celebrations for unexecuted checks. People appear through the review question and the synthetic two-user scenario, not fabricated testimonials.
## 0.5 Concept Visuals

No raster assets, logo files, or approved screen mockups exist. The interface specification below is a proposal for implementation. The first browser prototype must test evidence readability and partial-run comprehension.
## 1. Design Philosophy & Vision

Calm, inspectable, specific. A finding should lead directly to its evidence; an incomplete run should look incomplete at first glance. Write short literal labels such as Confirmed, Not reproduced, Inconclusive, Cancelled, and Cleanup pending. Avoid a single green badge implying total security.
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
## 8. Implementation Quality Gate

No interface has been implemented or audited. Accessibility, performance, responsive behavior, theming, and interface anti-pattern checks remain unexecuted. Before a demo release, no critical or high-severity interface defect may remain, and every primary state must be tested. Do not report a taste or accessibility score until an actual audit exists.

| Surface | Example |
|---------|---------|
| Run header | Nine checks planned. Three finished. One confirmed finding. |
| Finding | A second synthetic account read the first account's note. |
| Repaired comparison | This check did not reproduce the finding on the repaired fixture. |
| Failure | The sandbox timed out. Six checks remain incomplete. |
## 9. Materialization

This source produces the root brand and design references. Proposed design version 0.1; no brand assets are claimed as delivered. Reconcile it after the first browser prototype and after any evidence-state change.
