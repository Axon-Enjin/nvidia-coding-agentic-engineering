# Design System: VibeSec Evidence Desk

**System Name:** VibeSec Evidence Desk
**Date:** 2026-09-30
**Version:** 0.3
**Owner:** Project owner
**Status:** Draft
**Last reconciled:** 2026-10-13
**PRD:** [prd-vibesec.md](prd-vibesec.md)

## 0. Brand Stance

**Selected mode:** Product, focused on reviewing evidence.

**Cultural or aesthetic reference:** A lab notebook beside a test bench: clearly numbered attempts, legible observations, and room for uncertainty.

**Distinctive line:** Show the request. Show the record. Run the check again.

**Archetypical user:** Mira, the fictional reviewer checking a small team's app before a staging release. This is a proposed design direction, not a user-tested identity.

Give the reviewer an evidence desk: a direct question about Bob and Alice's note, a three-step workbench, and the actual HTTP evidence after a run. Use a restrained evergreen accent for navigation and review; reserve red/green for labeled evidence states. Avoid hacker imagery, decorative attack maps, sweeping safety scores, and celebrations for unexecuted checks. People appear through the synthetic two-user scenario, not fabricated testimonials.

## 0.5 Concept Visuals

The local browser MVP uses a plain text wordmark and a project-authored SVG of Alice's note and Bob's access question (`web/access-study.svg`). The illustration is labeled as a synthetic example, not a run receipt. No raster assets, external logo files, or approved marketing mockups exist. The workbench shows the actual plan and evidence after execution; remote partial-run comprehension remains to be tested.

## 1. Design Philosophy & Vision

Calm, inspectable, specific. A finding should lead directly to its evidence; an incomplete run should look incomplete at first glance. Write short literal labels such as Confirmed, Not reproduced, Inconclusive, Cancelled, and Cleanup pending. Avoid a single green badge implying total security.

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

Inputs: registered synthetic brief and planner-mode selects in the local MVP; the future remote run also shows fixture/profile and declared limits. All have visible labels and inline validation. No target URL input. Scope and budgets are read-only facts supplied by the service.

Run header: fixture revision, live/replay indicator, status, elapsed time, completed/total attempts, and cleanup state. Probe row: ID/name, state, duration, and evidence link. Finding panel: assertion, observation, redacted request/response, provenance, and limitations. Comparison rows match probe IDs and use labels for confirmed, not reproduced, and inconclusive.

Empty state: choose the owned demo fixture and explain its synthetic data. Loading state: real stage and counts; no fake percentage. Error state: what failed, what remains unknown, and whether retry creates a new run. Completed state: report findings and explicit tested scope. Cancellation preserves completed evidence and marks remaining probes incomplete.

## 5. Motion

The first screen is static. Plan and report arrival use a 200ms opacity transition; hover feedback uses 150ms color changes. The boundary illustration does not move or imply live execution. No simulated progress or continuous animation. Respect reduced motion, and announce status changes politely without reading raw request bodies aloud.

## 6. Accessibility

Use landmarks, ordered headings, native controls, table headers, visible focus, and text labels. Check 4.5:1 normal text contrast and 3:1 non-text controls. All flows work with keyboard and a screen reader. Dialogs retain focus correctly; routes put focus on their heading. Timestamp labels specify timezone. Copy controls announce completion, and export remains available without JavaScript-only interaction.

## 7. Design Settings

Low visual variance, low motion, moderate information density. The evidence is the main visual material. Keep documentation and product copy readable without familiarity with the build process.

## 8. Implementation Quality Gate

A loopback browser interface has been implemented. Desktop rendering and a 390px device-emulated local plan/run/report flow were inspected on 2026-10-13; no horizontal overflow or JavaScript exception was observed in that run. Accessibility, performance, remote partial-run states, and a complete interface audit remain unexecuted. Before a demo release, no critical or high-severity interface defect may remain, and every primary state must be tested. Do not report a taste or accessibility score until an actual audit exists.

| Surface | Example |
|---------|---------|
| Run header | Nine checks planned. Three finished. One confirmed finding. |
| Finding | A second synthetic account read the first account's note. |
| Repaired comparison | This check did not reproduce the finding on the repaired fixture. |
| Failure | The sandbox timed out. Six checks remain incomplete. |

## 9. Materialization

This source produces the root brand and design references. Proposed design version 0.3; the plain wordmark and original SVG are implemented but not approved as a final identity. Reconcile it after further browser and evidence-state testing.
