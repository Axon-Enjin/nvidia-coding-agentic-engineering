import { useState } from "react";
import { PixelSymbol } from "./ProductVisuals";

const phases = [
  {
    title: "Define the promise.",
    description: "Write the exact rule the app must protect.",
    heading: "Name the boundary.",
  },
  {
    title: "Review the requests.",
    description: "Confirm the actor, request, and expected access.",
    heading: "Review before running.",
  },
  {
    title: "Follow the evidence.",
    description: "Keep the response and repeatable regression check.",
    heading: "Keep the proof.",
  },
] as const;

export function VerificationStory() {
  const [active, setActive] = useState(0);

  return (
    <div className="verification-story">
      <div
        className="story-chapters"
        aria-label="Explore the verification workflow"
      >
        {phases.map((phase, index) => (
          <article
            className={`story-chapter ${active === index ? "is-active" : ""}`}
            data-story-step={index}
            key={phase.title}
          >
            <h3>
              <button
                id={`story-choice-${index}`}
                type="button"
                aria-pressed={active === index}
                aria-controls="story-preview"
                onClick={() => setActive(index)}
              >
                <span className="story-index">0{index + 1}</span>
                <span className="story-choice-title">{phase.title}</span>
                <span className="story-choice-mark" aria-hidden="true" />
              </button>
            </h3>
            <p>{phase.description}</p>
          </article>
        ))}
      </div>
      <div
        className="story-preview"
        id="story-preview"
        role="region"
        aria-labelledby={`story-choice-${active}`}
        data-phase={active}
      >
        <div className="story-preview-body">
          <p className="story-mobile-description">
            {phases[active].description}
          </p>
          <h3>{phases[active].heading}</h3>
          <div className="story-specimen" hidden={active !== 0}>
            <blockquote>Only the owner can read a private note.</blockquote>
            <div className="story-resource">
              <PixelSymbol kind="promise" />
              <div>
                <strong>Private note</strong>
                <span>Owned synthetic fixture</span>
              </div>
            </div>
            <dl className="story-permissions">
              <div>
                <dt>Note owner</dt>
                <dd>Expected access</dd>
              </div>
              <div>
                <dt>Other account</dt>
                <dd>Expected denial</dd>
              </div>
            </dl>
          </div>
          <div className="story-specimen" hidden={active !== 1}>
            <div className="story-request">
              <div>
                <strong>Note owner</strong>
                <span>Expected access</span>
              </div>
              <code>
                <b>GET</b> /notes/alice-note
              </code>
            </div>
            <div className="story-request">
              <div>
                <strong>Other account</strong>
                <span>Expected denial</span>
              </div>
              <code>
                <b>GET</b> /notes/alice-note
              </code>
            </div>
          </div>
          <div className="story-specimen" hidden={active !== 2}>
            <ol className="story-evidence-chain">
              <li>Request</li>
              <li>Response</li>
              <li>Assertion</li>
            </ol>
            <div className="story-comparison">
              <span>Before repair</span>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M3 12h17m-6-6 6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              <span>After repair</span>
            </div>
            <div className="story-artifacts">
              <div>
                <code>report.json</code>
                <span>Inspectable evidence</span>
              </div>
              <div>
                <code>regression.py</code>
                <span>Repeatable check</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
