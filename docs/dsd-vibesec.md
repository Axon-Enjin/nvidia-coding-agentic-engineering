# Design System: VibeSec Proof Lab

**System Name:** VibeSec Proof Lab
**Date:** 2026-09-30
**Version:** 0.7
**Owner:** Project owner
**Status:** Draft
**Last reconciled:** 2026-10-23
**PRD:** [prd-vibesec.md](prd-vibesec.md)

## 0. Brand Stance

**Selected mode:** Product, focused on reviewing evidence.

**Cultural or aesthetic reference:** Technical editorial graphics, physical evidence folders, and permission-boundary diagrams. A request travels toward an explicit access boundary; only observed HTTP evidence completes the route.

**Distinctive line:** Show the request. Show the record. Run the check again.

**Archetypical user:** A builder or reviewer checking a small team's app before a staging release. This is a proposed design direction, not a user-tested identity.

Lead with the exact question the sample can answer: can another account read the note owner's private record? The project-authored boundary illustration distinguishes the expected allowed and denied paths. Use cool reading surfaces, charcoal, Volt, and restrained petrol blue. Status always has a written label. Avoid fabricated logos, safety scores, and celebrations for unexecuted checks.

## 0.5 Concept Visuals

The marketing page uses product-specific permission-boundary and evidence-folio artwork. Essential claims, actors, expectations, and technical values remain HTML. The workbench report gives the forbidden request a prominent before/after HTTP pair and exact responses in expandable evidence rows. Remote partial-run comprehension remains to be tested.

## 1. Design Philosophy & Vision

Calm, inspectable, specific. A finding should lead directly to its evidence; an incomplete run should look incomplete at first glance. Write short literal labels such as Confirmed, Not reproduced, Inconclusive, Cancelled, and Cleanup pending. Avoid a single green badge implying total security.

## 2. Brand Primitives

### 2.0 Token Architecture

Primitive tokens hold color and spacing values; semantic tokens convey role; component tokens reference semantic tokens. The marketing page uses cool white and charcoal with Volt emphasis and petrol-blue technical accents. Evidence states retain text labels.

### 2.1 Colors

| Token | Value |
|-------|-------|
| `--volt` | `#D6F542` |
| `--ink` | `#101315` |
| `--paper` | `#F8F9FA` |
| `--surface` | `#F3F5F6` |
| `--panel` | `#EDF0F2` |
| `--blue` | `#006D93` |
| `--blue-deep` | `#00536F` |
| `--muted` | `#5C656B` |
| `--success` | `#356B45` |
| `--danger` | `#A63D2F` |

Semantic status colors pair with labels and icons, never color alone. Validate actual text/component contrast when implemented; the palette is not a completed accessibility audit.

### 2.2 Logo System

The VibeSec lockup pairs a clean Aeonik wordmark with the original eye/V symbol: a complete eye silhouette, one Volt verification band, and a dark V cut through the center. The compact mark, watermark, and favicon derive from the same geometry. Avoid external logo dependencies.

### 2.3 Typography

Self-hosted Aeonik carries the calm marketing hierarchy. Geist Pixel is limited to the hero word “proof” and the oversized identity signature. Awesome Serif Italic marks the short judgment phrases “as intended” and “Evidence decides.” IBM Plex Sans carries the product interface; IBM Plex Mono carries requests, responses, identifiers, and provenance. No third-party font request occurs at runtime. IBM Plex license files ship with the fonts; production redistribution rights for the supplied Aeonik Trial, Geist Pixel, and Awesome Serif files must be confirmed before public deployment.

### 2.4 Imagery and depth

No stock photography or unrelated portraits. Original generated artwork depicts the implemented concepts: an engineered permission boundary and a traceable request/response evidence folio. Prompt and provenance records live beside the assets. Essential wording stays in HTML, and operational evidence panels use actual HTTP responses. Subtle screenprint grain and complete eye/V watermarks may texture marketing surfaces; they never enter the workbench evidence panels.

## 3. Layout & Spatial System

Base spacing 4px; scale 4, 8, 12, 16, 24, 32, 48, 64, and 96px. Maximum content width 1380px. The marketing page moves through four clear chapters: hero, “Working isn’t the same as working as intended,” “AI proposes. Evidence decides,” and “Verify one promise.” The workbench uses a horizontal progress row and one active stage; evidence columns stack on narrow screens. Check widths 320, 390, 768, 1280, 1440, and 1920px. Long evidence wraps without overflowing the viewport.

## 4. Core Component Specs

Buttons: 44px minimum target height; primary starts a declared fixture run, secondary exports, destructive stops work. Hover uses a short color response; focus has a visible outline with offset on both dark and light surfaces. Arrow movement is restrained and directional. Disabled controls remain labeled with a reason, rather than opacity alone.

Inputs: registered synthetic brief and planner-mode selects in the local MVP; the future remote run also shows fixture/profile and declared limits. All have visible labels and inline validation. No target URL input. Scope and budgets are read-only facts supplied by the service.

Run header: fixture revision, live/replay indicator, status, elapsed time, completed/total attempts, and cleanup state. Probe row: ID/name, state, duration, and evidence link. Finding panel: assertion, observation, redacted request/response, provenance, and limitations. Comparison rows match probe IDs and use labels for confirmed, not reproduced, and inconclusive.

Empty state: choose the owned demo fixture and explain its synthetic data. Loading state: real stage and counts; no fake percentage. Error state: what failed, what remains unknown, and whether retry creates a new run. Completed state: report findings and explicit tested scope. Cancellation preserves completed evidence and marks remaining probes incomplete.

## 5. Motion

Marketing headings and artwork enter once with restrained opacity and transform changes as their chapter becomes visible. The native cursor remains visible; a small pooled pixel trail is decorative, stops during selection and scrolling, and does not run for touch or reduced-motion users. Lab stages and expanded evidence use short transitions. There is no simulated run progress, smooth-scroll override, looping ornament, or animated finding. Reduced-motion preference removes decorative motion. Announce operational status changes immediately without reading raw request bodies aloud.

## 6. Accessibility

Use landmarks, ordered headings, native controls, table headers, visible focus, and text labels. Check 4.5:1 normal text contrast and 3:1 non-text controls. All flows work with keyboard and a screen reader. Dialogs retain focus correctly; routes put focus on their heading. Timestamp labels specify timezone. Copy controls announce completion, and export remains available without JavaScript-only interaction.

## 7. Design Settings

One strong question, one original route diagram, and a quiet workspace. The actual request and response remain the main product material. Keep documentation and product copy readable without familiarity with the build process.

## 8. Implementation Quality Gate

The React frontend and local API flow have browser evidence across 320px through 1920px, including reduced motion, focus behavior, view retention, failure and inconclusive states, the local 200-to-403 forbidden-request comparison, and both exports. The production build passes as of 2026-10-23. A full screen-reader audit, physical-device performance certification, remote partial-run check, provider check, and hosted check remain unexecuted. Do not report an accessibility, security, or taste score without an actual audit.

| Surface | Example |
|---------|---------|
| Run header | Nine checks planned. Three finished. One confirmed finding. |
| Finding | A second synthetic account read the first account's note. |
| Repaired comparison | This check did not reproduce the finding on the repaired fixture. |
| Failure | The sandbox timed out. Six checks remain incomplete. |

## 9. Materialization

This source produces the root brand and design references. Version 0.7 records the implemented editorial chapters, eye/V identity, typography, product-specific artwork, and calm evidence workbench. It is not customer-tested brand validation or remote integration proof.
