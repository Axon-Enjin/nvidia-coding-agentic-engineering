import { useEffect, useRef, useState } from "react";
import { useChapterTransitions } from "../useChapterTransitions";
import { useLandingEntrance } from "../useLandingEntrance";
import { MarketingPointer } from "./MarketingPointer";
import {
  BoundaryArtwork,
  EvidenceIllustration,
} from "./ProductVisuals";
const workbench = "/?view=workbench";

function useActiveLandingSection() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const marker = window.innerWidth < 768 ? 96 : 112;
      let next = "";
      for (const id of ["workflow", "evidence", "verify"]) {
        const section = document.getElementById(id);
        if (!section) continue;
        const bounds = section.getBoundingClientRect();
        if (bounds.top <= marker && bounds.bottom > marker) next = id;
      }
      setActiveSection((current) => (current === next ? current : next));
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return activeSection;
}

type ArrowDirection = "forward" | "back" | "external" | "download";

const arrowPaths: Record<ArrowDirection, string> = {
  forward: "M3 12h17m-7-7 7 7-7 7",
  back: "M21 12H4m7-7-7 7 7 7",
  external: "M5 19 19 5M8 5h11v11",
  download: "M12 3v14m-6-6 6 6 6-6M5 21h14",
};

export function Arrow({
  direction = "forward",
}: {
  direction?: ArrowDirection;
}) {
  return (
    <svg
      className={`arrow arrow-${direction}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={arrowPaths[direction]}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
export function BrandMark() {
  return (
    <svg
      className="brand-mark"
      viewBox="0 0 48 28"
      aria-hidden="true"
    >
      <path
        className="brand-mark__eye"
        d="M2 14C7.8 6.4 14.8 3 24 3s16.2 3.4 22 11c-5.8 7.6-12.8 11-22 11S7.8 21.6 2 14Z"
      />
      <path
        className="brand-mark__band"
        d="M4.4 13.7C9.8 9.2 16 7.2 24 7.2s14.2 2 19.6 6.5v.6C38.2 18.8 32 20.8 24 20.8s-14.2-2-19.6-6.5Z"
      />
      <path
        className="brand-mark__v"
        d="M9.5 4.8h8.2L24 15.9l6.3-11.1h8.2L27.1 23.4h-6.2Z"
      />
    </svg>
  );
}

export function BrandName() {
  return (
    <span className="brand-name" aria-hidden="true">
      VibeSec
    </span>
  );
}

export function SignalSite() {
  const root = useRef<HTMLDivElement>(null);
  const activeSection = useActiveLandingSection();
  useLandingEntrance(root);
  useChapterTransitions(root);
  return (
    <div className="signal-site" id="top" ref={root}>
      <MarketingPointer />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="VibeSec home">
          <BrandMark />
          <BrandName />
        </a>
        <nav aria-label="Main navigation">
          <a
            href="/#workflow"
            aria-current={activeSection === "workflow" ? "location" : undefined}
          >
            Workflow
          </a>
          <a
            href="/#evidence"
            aria-current={activeSection === "evidence" ? "location" : undefined}
          >
            Evidence
          </a>
        </nav>
        <a className="header-action" href={workbench}>
          Run a sample <Arrow />
        </a>
      </header>
      <main id="main-content" tabIndex={-1}>
        <section
          className="campaign-hero site-chapter chapter-hero"
          aria-labelledby="hero-title"
        >
          <div className="hero-composition content-shell">
            <div className="hero-copy">
              <h1
                id="hero-title"
                tabIndex={-1}
                aria-label="Build fast. Ship with proof."
              >
                <span className="hero-line">
                  <span data-intro-line>Build fast.</span>
                </span>
                <span className="hero-line">
                  <span data-intro-line>Ship with</span>
                </span>
                <span className="headline-pixel">proof.</span>
              </h1>
              <p>
                AI can build the feature. VibeSec helps you question its
                boundaries. Review security checks and inspect the evidence.
              </p>
              <div className="hero-actions">
                <a
                  className="campaign-button"
                  id="launch-sample"
                  href={workbench}
                >
                  Run the sample check <Arrow />
                </a>
              </div>
              <small className="hero-disclosure">
                Local sample · no credits
              </small>
            </div>
            <div className="hero-visual">
              <BoundaryArtwork />
              <div className="permission-callout permission-owner">
                <i className="permission-marker" aria-hidden="true" />
                <div>
                  <strong>Note owner</strong>
                  <span>Expected: access allowed</span>
                </div>
              </div>
              <div className="permission-callout permission-other">
                <i className="permission-marker" aria-hidden="true" />
                <div>
                  <strong>Other account</strong>
                  <span>Expected: access denied</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className="product-principle content-shell site-chapter chapter-principle"
          id="workflow"
          data-chapter
          aria-labelledby="principle-heading"
        >
          <div className="principle-intro">
            <div data-chapter-copy>
              <h2 id="principle-heading">
              Working isn’t the same
              <br />
              as working <span>as intended.</span>
              </h2>
            </div>
            <div data-chapter-detail>
              <p>
                A feature can work perfectly for its owner and still expose data
                to another account. Test both sides of the boundary.
              </p>
            </div>
          </div>
          <ol className="principle-flow" data-chapter-visual>
            <li>
              <span>01</span>
              <strong>State the promise.</strong>
              <p>Only the owner should read a private note.</p>
            </li>
            <li>
              <span>02</span>
              <strong>Review both requests.</strong>
              <p>One expected access. One expected denial.</p>
            </li>
            <li>
              <span>03</span>
              <strong>Keep the evidence.</strong>
              <p>Response, assertion, and regression export.</p>
            </li>
          </ol>
        </section>
        <section
          className="proof-section site-chapter chapter-evidence"
          id="evidence"
          data-chapter
          aria-labelledby="proof-heading"
        >
          <div className="editorial-section content-shell">
            <div className="editorial-copy" id="about" data-chapter-copy>
              <h2 id="proof-heading">
                AI proposes.
                <br />
                <span>Evidence decides.</span>
              </h2>
              <p>
                A finding should lead straight to the request that produced it.
                VibeSec keeps the actor, response, tested scope, and repeatable
                regression check together.
              </p>
            </div>
            <div data-chapter-visual>
              <EvidenceIllustration />
            </div>
          </div>
        </section>
        <section
          className="evidence-band site-chapter chapter-verify"
          id="verify"
          data-chapter
          data-pointer-tone="blue"
          aria-labelledby="evidence-heading"
        >
          <div className="content-shell evidence-band-inner">
            <h2 id="evidence-heading" data-chapter-copy>
              Verify one promise.
            </h2>
            <div className="verify-action" data-chapter-detail>
              <p>Review the request. Run the check. Keep the evidence.</p>
              <a className="campaign-button" href={workbench}>
                Run the sample <Arrow />
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="campaign-footer">
        <div className="content-shell footer-top">
          <nav aria-label="Footer navigation">
            <a href="/#top">Overview</a>
            <a
              href="/#workflow"
              aria-current={activeSection === "workflow" ? "location" : undefined}
            >
              Workflow
            </a>
            <a
              href="/#evidence"
              aria-current={activeSection === "evidence" ? "location" : undefined}
            >
              Evidence
            </a>
            <a
              href="/#verify"
              aria-current={activeSection === "verify" ? "location" : undefined}
            >
              Verify
            </a>
            <a
              href="https://github.com/wolfsenberg/nvidia-coding-agentic-engineering"
              target="_blank"
              rel="noreferrer"
            >
              Repository <Arrow direction="external" />
            </a>
          </nav>
        </div>
        <div className="footer-display content-shell" aria-hidden="true">
          vibesec<span>_</span>
        </div>
        <div className="footer-baseline">
          <div className="content-shell">
            <span>
              Built for the NVIDIA Coding &amp; Agentic Engineering Hackathon
            </span>
            <span>Optional NVIDIA planning via Nebius · local execution</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

