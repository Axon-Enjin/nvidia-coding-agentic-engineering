> Derived from [docs/dsd-vibesec.md](docs/dsd-vibesec.md). Keep this reference aligned with that source.

# Brand:

> Verbal identity and writing guidance.

## 0. Brand Stance

**Selected mode:** Product, focused on reviewing evidence.

**Cultural or aesthetic reference:** A lab notebook beside a test bench: clearly numbered attempts, legible observations, and room for uncertainty.

**Distinctive line:** Show the request. Show the record. Run the check again.

**Archetypical user:** Mira, the fictional reviewer checking a small team's app before a staging release. This is a proposed design direction, not a user-tested identity.

Give the reviewer an evidence desk: a concise editorial introduction, a three-step workbench, and the actual HTTP evidence after a run. Use bright lime for the reviewed promise and navigation cues, with red/green reserved for labeled evidence states. Avoid hacker imagery, decorative attack maps, sweeping safety scores, and celebrations for unexecuted checks. People appear through the review question and the synthetic two-user scenario, not fabricated testimonials.
## 0.5 Concept Visuals

The local browser MVP now has a CSS-only wordmark glyph and a static Alice/Bob boundary illustration. The illustration is explicitly a test case, not a run receipt. No raster assets, external logo files, or approved marketing mockups exist. The workbench shows the actual plan and evidence after execution; remote partial-run comprehension remains to be tested.
## 1. Design Philosophy & Vision

Calm, inspectable, specific. A finding should lead directly to its evidence; an incomplete run should look incomplete at first glance. Write short literal labels such as Confirmed, Not reproduced, Inconclusive, Cancelled, and Cleanup pending. Avoid a single green badge implying total security.
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
## 8. Implementation Quality Gate

A loopback interface has been implemented. Desktop rendering and a 390px device-emulated local plan/run/report flow were inspected on 2026-10-13 with no horizontal overflow or JavaScript exception observed. Accessibility, performance, remote partial-run states, and a complete interface audit remain unexecuted. Before a demo release, no critical or high-severity interface defect may remain, and every primary state must be tested. Do not report a taste or accessibility score until an actual audit exists.

| Surface | Example |
|---------|---------|
| Run header | Nine checks planned. Three finished. One confirmed finding. |
| Finding | A second synthetic account read the first account's note. |
| Repaired comparison | This check did not reproduce the finding on the repaired fixture. |
| Failure | The sandbox timed out. Six checks remain incomplete. |
## 9. Materialization

This reference derives from DSD version 0.2. The CSS-only brand treatment is implemented but not approved as a final identity. Reconcile it after further browser and evidence-state testing.
