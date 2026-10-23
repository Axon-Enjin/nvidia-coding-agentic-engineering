# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The first audience for the site is a hackathon judge assessing whether VibeSec performs a real, bounded security check and produces inspectable evidence. The product's primary working persona in the PRD is a security-minded fractional CTO reviewing an authorization boundary.

## Product Purpose

VibeSec turns a stated product promise into a reviewed, controlled request against an owned synthetic app. It compares actual HTTP responses from vulnerable and repaired versions and exports a fixture-specific regression check. A successful local demonstration lets a reviewer trace the promise through the request, response, and conclusion.

## Positioning

The specific mechanism is a promise-to-evidence chain: a bounded plan selects allowlisted positive and negative checks, a reviewer sees them before execution, deterministic assertions classify actual responses, and the identical checks run on the repaired fixture. Model prose does not determine the security finding.

## Operating Context

The current experience is a loopback-only sample using a synthetic notes app. A visitor selects a prepared brief and local or configured Nebius planning, reviews the exact checks, starts a run, reads before/after evidence, and downloads JSON and a Python regression test. The homepage explains that workflow through an interactive expected-permission diagram, product-value copy, and an evidence preview; the dedicated workbench opens at `/?view=workbench`. The local walkthrough needs no account or provider credits.

## Capabilities and Constraints

- Preserve the working React, TypeScript, Vite frontend and Python API contract.
- Scope execution to registered owned fixtures; do not invite arbitrary URLs or customer data.
- Distinguish local deterministic planning from configured Nebius planning and local fixture execution.
- Show inconclusive results without turning them into security claims.
- Reports live in memory until server restart.
- Remote sandbox execution, authenticated model behavior, a hosted judge build, and customer adoption are not verified in this slice.

## Brand Commitments

The product name is VibeSec. The user's binding direction is a distinctive, commercially credible startup experience with original assets, strong information hierarchy, and deliberate motion. The visual identity itself is open for redesign.

## Evidence on Hand

The owned synthetic fixture, real local API responses, report JSON, and regression export are available in this repository. `docs/prd-vibesec.md` and related docs state the intended scope and limitations. There are no verified customer logos, testimonials, benchmark claims, or public deployment evidence to present.

## Product Principles

1. Put the actual request and response ahead of claims about security.
2. Make scope and provenance legible wherever a result appears.
3. Let a first-time judge complete the sample without setup or credentials.
4. Preserve an honest distinction between demonstrated behavior and planned integrations.

## Accessibility & Inclusion

The PRD requires the workbench and report to work at 375px and with a keyboard. The visual redesign must keep semantic controls, visible focus, reduced-motion support, and readable contrast.
