# VibeSec visual assets

## Active production visuals

The landing page uses the original **Proofprint** asset family generated with OpenAI's built-in image generation tool on 2026-10-23. Both files are transparent RGBA PNGs and contain no embedded copy; [ProductVisuals.tsx](../components/ProductVisuals.tsx) keeps roles, expected outcomes, and evidence terminology in accessible HTML.

[vibesec-proofprint-boundary.png](vibesec-proofprint-boundary.png) depicts the exact sample promise: one private note, one Volt owner path crossing the VibeSec eye aperture, and one petrol other-account path stopping at a physical denial shutter. [vibesec-proofprint-evidence-folio.png](vibesec-proofprint-evidence-folio.png) is the user-selected detailed three-leaf folio: request, observed response, and a before/after resource comparison where the repaired path ends at a denial shutter.

[vibesec-screenprint-grain.png](vibesec-screenprint-grain.png) is a deterministic 160px transparent RGBA tile authored for the marketing background surfaces. Its very low-alpha black-and-white flecks echo the physical screenprint texture of the Proofprint artwork without placing noise over the workbench or evidence panels. [vibesec-eye-watermark.svg](vibesec-eye-watermark.svg) arranges two complete, equal-size eye/V silhouettes on a measured diagonal tile for the light workflow chapter. CSS `space` repetition preserves full marks at section edges. [vibesec-brand-watermark.svg](vibesec-brand-watermark.svg) reproduces the complete eye silhouette with the V removed through negative space. Two restrained opacity levels preserve the horizontal verification band while the closing Volt chapter keeps the entire mark at low contrast. The dark evidence chapter uses grain alone so its copy and product illustration remain visually dominant.

### Proofprint boundary prompt

Built-in image generation, transparent-background mode, generated from scratch. The prompt specified screenprinted acid-Volt and petrol inks, foam-white die-cut paper, matte-black anodized aluminum, one subtle VibeSec eye/V aperture, exactly two halftone identity seals, one recognizable private-note sheet, one allowed path, and one denied path. It explicitly rejected people, profile icons, locks, shields, hackers, robots, dashboards, circuits, cubes, particles, glossy chrome, random fragments, readable text, and environmental backgrounds.

### Detailed Proofprint evidence folio prompt

Built-in image generation, transparent-background mode, generated as one physical forensic archive with three connected leaves. The prompt mapped the leaves to reviewed request, observed response, and before/after comparison; requested one continuous Volt trace, a petrol unauthorized path, and a solid denial shutter; and used warm paper, black registration hardware, translucent petrol acetate, and sparse halftone seals. Essential labels remain in HTML below the image.

The simpler Proofprint evidence plate and earlier glossy apparatus, evidence cassettes, and abstract boundary studies remain unimported by the production bundle.

Fonts are self-hosted under `frontend/public/fonts/`:

- **Aeonik Trial Light / Regular / Bold** — marketing display and supporting emphasis; supplied project files. Confirm production redistribution rights before public deployment.
- **Geist Pixel Variable** — hero proof accent and VibeSec identity signature; supplied project file. Confirm production redistribution rights before public deployment.
- **Awesome Serif Italic** — short editorial judgment phrases; supplied project files. Confirm production redistribution rights before public deployment.
- **IBM Plex Sans / IBM Plex Mono** — product interface, evidence reading, and technical data; SIL Open Font License.
- **Archivo Black, Silkscreen, and Barlow Condensed** — retained legacy assets, currently inactive; accompanying OFL files remain in the font directory.

## Archived generated artwork

The following earlier generated assets remain in the repository but are not imported by the current Vite build:

- Earlier builder-portrait and environment experiments remain in the ignored local review archive; they are not shipped with the product.

These files are historical design material. They are not current product screenshots, execution evidence, or runtime dependencies.
