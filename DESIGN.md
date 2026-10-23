---
name: "VibeSec"
description: "AI-assisted security checks. Proof you can inspect."
colors:
  lime: "#d6f542"
  bg: "#101315"
  petrol: "#123b48"
  blue: "#006d93"
  blue-deep: "#00536f"
  surface: "#edf0f2"
  surface-volt: "#eff5da"
  text-secondary: "#55636c"
  text-on-dark: "#becbd1"
  volt-hover: "#e2ff66"
  paper: "#f3f5f6"
  canvas: "#f8f9fa"
  ink: "#182126"
  muted: "#b7c2c7"
  line: "#d4dce0"
  dark-line: "#39484f"
  danger: "#e3a284"
  success: "#4c6227"
  panel: "#ffffff"
  action: "#006d93"
  action-text: "#ffffff"
  positive-ground: "#f0f5d9"
  positive-text: "#4b6227"
  negative-ground: "#fff0e4"
  negative-text: "#9a5833"
  unknown-ground: "#fff3d6"
  unknown-text: "#725b19"
typography:
  display:
    fontFamily: "\"Aeonik\", \"IBM Plex Sans\", sans-serif"
    fontSize: "clamp(72px, 7.2vw, 108px)"
    fontWeight: 300
    lineHeight: 0.96
    letterSpacing: "-0.035em"
  pixel:
    fontFamily: "\"Geist Pixel\", \"IBM Plex Mono\", monospace"
    fontSize: "0.92em"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "\"Aeonik\", \"IBM Plex Sans\", sans-serif"
    fontSize: "clamp(38px, 4vw, 58px)"
    fontWeight: 300
    lineHeight: 1.07
    letterSpacing: "-0.035em"
  editorial:
    fontFamily: "\"Awesome Serif\", Georgia, serif"
    fontSize: "1em"
    fontWeight: 500
    lineHeight: 1.07
    letterSpacing: "-0.015em"
  body:
    fontFamily: "\"IBM Plex Sans\", sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "\"IBM Plex Sans\", sans-serif"
    fontSize: "14px"
    fontWeight: 550
    lineHeight: 1.5
  data:
    fontFamily: "\"IBM Plex Mono\", monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.7
rounded:
  campaign: "5px"
  landing-panel: "14px"
  art-stage: "0px"
  nav: "0px"
  action: "3px"
  frame: "4px"
  field: "5px"
  notice: "6px"
  nested: "7px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  stage: "28px"
  xl: "32px"
  section: "64px"
components:
  button-campaign:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.bg}"
    rounded: "{rounded.campaign}"
    padding: "14px 22px"
    height: "52px"
  button-inverse:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.bg}"
    rounded: "{rounded.campaign}"
    padding: "11px 18px"
    height: "46px"
  button-workbench:
    backgroundColor: "{colors.action}"
    textColor: "{colors.action-text}"
    rounded: "{rounded.action}"
    padding: "10px 16px"
    height: "44px"
    typography: "{typography.label}"
  button-export:
    backgroundColor: "{colors.panel}"
    textColor: "#3f6129"
    rounded: "{rounded.action}"
    padding: "10px 16px"
    height: "44px"
  field-select:
    backgroundColor: "{colors.panel}"
    textColor: "#283e1c"
    rounded: "{rounded.field}"
    padding: "9px 32px 9px 12px"
    height: "48px"
    typography: "{typography.body}"
  chip-positive:
    backgroundColor: "{colors.positive-ground}"
    textColor: "{colors.positive-text}"
    rounded: "{rounded.frame}"
    padding: "4px 6px"
  notice-error:
    backgroundColor: "#fff1e9"
    textColor: "#8b4b2d"
    rounded: "{rounded.notice}"
    padding: "12px 16px"
  story-choice:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "0px"
    padding: "5px 0"
    height: "44px"
  navigation:
    textColor: "{colors.paper}"
    typography: "{typography.label}"
---

# Design System: VibeSec

## Overview

**Creative North Star: "Build fast. Ship with proof."**

A full-width charcoal opening pairs a left-aligned three-line headline with the original conceptual permission-boundary artwork. Volt actions and a Volt closing invitation punctuate the cool-white workflow and dark evidence section. The established palette, pixel identity, product truth, and calm workbench remain.

Updated on 2026-10-21 to combine the user's Norde, HiCloud, and CYBR/poster references. Norde governs composition and whitespace; HiCloud supplies lime/black identity and pixel geometry; the cyber references supply restrained technical artwork framing and oversized editorial type. The user requested this structural blend after the previous split-lime composition. [PRODUCT.md](PRODUCT.md) owns product truth; [BRAND.md](BRAND.md) owns the evidence-first voice. Local review artifacts live under the ignored `.impeccable/` directory.

**Key Characteristics:**
- An integrated charcoal header and asymmetric, three-line hero.
- Original security-boundary artwork beside the hero, with separate expected-permission role labels.
- A pixel eye/V identity, one pixel display word, and authored workflow symbols.
- A compact, manually controlled verification story, a dark evidence section, and an oversized footer.
- Role-based explanations, explicit previews, and unchanged actual technical evidence.

## Colors

### Primary

**Volt yellow-green** identifies VibeSec, primary landing actions, selected artwork details, and the proof principle. It is interpreted from the user's Nike React Phantom Volt reference images, paired with foam-white, rubber charcoal, cool gray, and petrol-blue details. It accents the dark opening and fills the final invitation. Normative values are in the frontmatter.

### Secondary

**Petrol blue** supplies the restrained secondary accent: workflow icons, technical labels, focus, and workbench actions. The workbench uses blue buttons with white text; landing actions use Volt with charcoal text. Pale Volt supports the first workflow panel and labeled positive states; warnings/errors retain their semantic warm colors.

### Neutral

**Canvas** is a cool white homepage ground. **Paper** carries evidence. **Rubber charcoal** grounds the integrated navigation, hero, evidence section, and footer. **Ink**, muted text, and light/dark rules establish hierarchy. The operational interface retains separate action, positive, negative, and unknown roles.

**The Evidence Rule.** A color never establishes a finding. Keep the written result, actor, actual request, and tested scope together.

## Typography

- **Marketing display:** Aeonik Light carries the left-aligned hero and primary section statements. Its open construction supplies the calm startup voice at38-108px; regular and bold cuts are reserved for supporting emphasis.
- **Pixel identity:** Geist Pixel regular marks the single hero word “proof” and the oversized footer signature. The compact logo instead uses a clean Aeonik wordmark beside the eye/V symbol: foam-white eye, Volt verification band, and charcoal V. Never use pixel type for evidence, controls, or body copy.
- **Editorial judgment:** Awesome Serif Italic is limited to two clauses where VibeSec shifts from speed to judgment: “as intended” and “Evidence decides.” It is not a repeating section-heading formula.
- **Reading:** IBM Plex Sans, usually16px; hero copy18px, preview explanations14px, controls13-14px. It owns the complete workbench and evidence interface.
- **Technical data:** IBM Plex Mono, generally12-13px, for actual methods, paths, fixture/run IDs, profile names, and JSON. Real process sequence numbers may use12px mono.
- Fonts are self-hosted in `frontend/public/fonts/`. IBM Plex includes its OFL files. Aeonik Trial, Geist Pixel, and Awesome Serif were supplied as project assets; confirm their production redistribution licenses before public deployment.

Below768px the hero uses clamp(58px,12vw,86px), reducing to53px at320px. Preserve the full accessible heading sentence and readable line breaks.

## Layout

Use one full-width charcoal header and opening. The84px desktop header sticks at the viewport top. Content uses a1320px maximum shell with56px desktop gutters. The hero has two equal columns with52px between: three-line headline, copy, action and scope on the left; conceptual artwork and expected-permission labels on the right. At1440x900 the complete gate, primary action and scope are visible together.

The artwork sits alongside the headline with one caption and two expected-permission labels in normal flow. The hero has one primary action and one concise scope note. The landing page then resolves into three distinct color chapters: a light product principle, a dark evidence explanation, and a Volt invitation. The principle pairs the central judgment with a single ruled sequence: state the promise, review both requests, and keep the evidence. This sequence explains the workflow without duplicating the working interface. Optional NVIDIA planning through Nebius and owned local execution are stated once in the footer.

The proof section pairs one explanation with an evidence-structure preview. The final invitation is a shorter full-width Volt chapter with a dark action and a visible handoff to the footer. The footer keeps a concise section map, one repository link, the integration scope, and an oversized wordmark.

Below1100px, side gutters become32px and gaps/type adapt. Below768px, gutters become20px and sections stack in reading order. The header keeps the brand and sample action; secondary links remain in the footer. Mobile hero actions stack, artwork labels remain HTML, and story choices remain native44px-or-larger controls.

The dedicated workbench retains its maximum1280px shell with48px desktop,28px tablet, and20px mobile gutters. Its218px progress rail becomes180px on tablet and a horizontal three-step rail on mobile. Requests and evidence wrap without page-level clipping.

## Elevation & Depth

Flat tonal surfaces establish hierarchy. The marketing canvas, dark chapters, Volt invitation, header, and footer share one low-alpha transparent screenprint-grain tile derived from the Proofprint material language. The light workflow chapter carries a repeating eye/V field at 2.6% opacity. Its two complete, equal-size marks sit on a measured diagonal; `space` repetition and centered positioning keep every visible logo whole at section edges. The dark evidence chapter uses grain alone. The closing Volt chapter uses one larger, unrepeated monochrome mark: a complete eye, a quiet horizontal verification band, and a V removed through negative space. Protected insets keep its complete silhouette inside the section, while 5.5% layer opacity holds it behind the content. Both watermark treatments stay behind content and do not enter the operational workbench or evidence panels. No new shadow, glow, backdrop blur, or runtime filtering is used. Physical materials and light belong to the original generated artwork. The navigation uses full-width CSS sticky positioning at the top. It has no fullscreen overlay or decorative shadow. Scoped document scroll padding keeps content and focused controls clear.

## Shapes

The navigation and artwork have square corners. Landing actions use a5px radius; story and evidence surfaces retain14px. These roles are intentional and differ from the operational fields/notices. Original coarse pixel geometry remains in the eye/V and workflow icons. Role annotations sit outside the artwork and state expectations rather than findings.

## Components

### Navigation and actions

Full-width charcoal navigation carries lime identity, plain light section links, and a lime action. All actions have real destinations. Overview, Workflow, Evidence, and Verify map to `#top`, `#workflow`, `#evidence`, and `#verify`; direct fragment loads and browser Back/Forward resolve to the same positions. Desktop destinations begin exactly at the84px sticky-header edge and mobile destinations at72px, so the preceding color block never remains visible as an accidental gap. The primary hero launch has a stable ID for contextual focus restoration. The workbench wordmark and Back to overview action return explicitly to `#top`; entry starts at the top while focus moves to the current stage heading.

Arrow direction follows action meaning: right for forward actions, left for return, down for downloads, and northeast only for external destinations. Color feedback takes140ms; fine-pointer arrow feedback moves3px along the arrow's direction over160ms. Keyboard section navigation lands immediately and focuses the destination. Pointer section navigation uses a short native smooth scroll. Reduced-motion preferences and history navigation remain immediate.

### Sample promise and conceptual artwork

The sample promise is a static, clearly labeled preview. Its workbench link opens the existing brief selection; it does not pretend a homepage choice was transferred. Do not add a free-form target input, ignored URL parameter, or native form reload without explicit state integration.

[ProductVisuals.tsx](frontend/src/components/ProductVisuals.tsx) imports two original transparent Proofprint PNG cutouts through Vite. The boundary plate expresses the actual private-note promise with two halftone identity seals, a branded eye/V inspection aperture, one allowed Volt path, and one petrol path stopped by a denial shutter. The selected detailed evidence folio connects the reviewed request, observed response, and before/after resource comparison through one continuous Volt trace and a petrol path ending at the denial shutter. Every object maps to the documented sample check; neither asset is presented as a product screenshot or live result. Adjacent HTML keeps the exact meaning inspectable, and [ASSETS.md](frontend/src/assets/ASSETS.md) records prompts, rejected exploration, and provenance. Previously retired people, glossy apparatus studies, abstract machinery, and corridor images remain archived and unshipped.

### Workflow and evidence preview

The homepage workflow is a static ruled sequence inside the principle chapter: promise, requests, and evidence. It uses no cards, simulated statuses, or fabricated findings. The detailed selection, request review, execution, and report remain in the dedicated workbench.

The dark evidence chapter explains request/response/comparison concepts and export formats without fabricated values. Missing observer or animation APIs leave all content visible.

### Marketing motion

[useLandingEntrance.ts](frontend/src/useLandingEntrance.ts) enhances two visible hero lines with native WAAPI:18px vertical settling, opacity0.65 to1,650ms with80ms line offset, using the existing ease-out token. The Proofprint boundary follows once with a16px horizontal settle, opacity0.72 to1, and a shallow8% clip reveal over760ms after140ms. The visual motion explains the boundary's arrival without animating the evidence path or implying a running scan. It runs once per document, never replays on workbench return, and is skipped for documents entered directly into the workbench. Keyboard input, reduced-motion changes, or unmount cancel it to resting styles. Mask wrappers frame the settling lines but never leave essential text hidden before enhancement.

[useChapterTransitions.ts](frontend/src/useChapterTransitions.ts) observes the principle, evidence, and Verify chapters once. The principle uses a clipped headline rise and delayed workflow rail; evidence moves copy and preview inward from opposite sides while the Proofprint card removes a shallow6% clip; Verify lifts its headline and action in sequence. Opacity completes in560ms and spatial settling in760ms on the shared exponential ease-out. The background block is always present, so transitions never expose the preceding section. Unsupported observers and reduced motion leave everything visible.

Fine-pointer arrow feedback uses160ms; button press uses120ms and does not animate focus-visible keyboard actions. Marketing motion is limited to the hero entrance, the three authored chapter reveals, proximity scroll snapping, and the pointer treatment. Each chapter keeps a distinct entrance rather than repeating one generic animation. Proximity snapping preserves ordinary wheel and touch scrolling; it is disabled under reduced motion. There is no scroll interception, sticky narrative, or artwork parallax.

- A marketing-only pointer treatment retains the native pointer everywhere. Ten pooled 6px trail elements follow one time-corrected transform chain and fade as a group after 110ms at rest. The trail uses Volt on neutral and dark chapters, then shifts over140ms to the same petrol blue used for text selection in the Volt closing chapter. There is no custom hover ring or hidden native cursor over artwork. Keyboard, pointer press, scrolling, selection, blur, touch, and reduced motion suppress decoration. The overlay is aria-hidden and cannot intercept input.

No GSAP, Three.js, WebGL engine, smooth-scroll engine, page loader, or copied NUDOT code is shipped. CSS transforms and WAAPI provide the requested depth without adding a rendering framework. The ignored local review directory retains the motion plan and live-reference observations that distinguish observed behavior from VibeSec's adaptations.

### Operational behavior

Native labeled selects, reviewed requests, busy protection, persistent errors/retries, disclosures, inconclusive outcomes, and actual exports remain. Explanations use Note owner / Other account / Signed-out visitor; expanded technical evidence and exports preserve exact original fixture actors and data. Profile names determine before/after presentation independently of array position.

`/` is the homepage and `/?view=workbench` the working view. App owns session state. The History API hook preserves state across view changes, supports direct loads/Back/Forward/modified clicks, maps same-page fragments without a reload, focuses the current workbench stage, and restores the launching link when browser history returns without an explicit destination. Explicit overview links always return to the top. Reload starts a fresh frontend session. Background completion never steals landing focus.

Actual evidence and its operational controls remain static. The marketing preview explains concepts without simulating execution. Reduced-motion preferences remove decorative pointer movement, skip both entrance systems, and disable chapter snapping. Operational updates and keyboard-initiated changes remain immediate. No simulated scans, animated findings, scroll interception, sticky narrative, or idle animation loop is used.

### Recorded verification

Local review notes document the chapter implementation. Production verification covers 320, 390, 768, 1280, 1440, and 1920px widths, direct fragment loads, two consecutive wheel transitions, reduced motion, chapter focus, and horizontal overflow. The build and the Impeccable detector pass.

## Do's and Don'ts

### Do:
- **Do** preserve the dark opening, light reading sections, and Volt identity as distinct parts of one hierarchy.
- **Do** keep controls native, labeled, keyboard reachable, and at least 44px high.
- **Do** distinguish illustrative previews from actual report evidence.
- **Do** keep actor, request, result, and local scope adjacent.
- **Do** preserve visible link titles in accessible names and use real destinations.

### Don't:
- **Don't** invent customers, security guarantees, benchmarks, or remote execution receipts.
- **Don't** apply pixel display type to controls, response JSON, or ordinary copy.
- **Don't** imply a scan is running through decorative animation or telemetry.
- **Don't** use unrelated people or corridor imagery as the main product visual.
- **Don't** conceal overflow or focus defects with page-level clipping.
