import boundaryArtwork from "../assets/vibesec-proofprint-boundary.png";
import evidenceSpecimen from "../assets/vibesec-proofprint-evidence-folio.png";

export function BoundaryArtwork() {
  return (
    <figure className="boundary-artwork">
      <div className="boundary-scene">
        <img
          className="boundary-backplane"
          src={boundaryArtwork}
          width="1448"
          height="1086"
          alt="A screenprinted authorization proof plate shows the Volt owner path crossing the VibeSec inspection aperture to a private note while the petrol other-account path stops at a denial shutter."
          fetchPriority="high"
        />
      </div>
      <figcaption>
        <span>One note. Two identities. One boundary.</span>
      </figcaption>
    </figure>
  );
}

export function PixelSymbol({ kind }: { kind: "promise" | "probe" | "proof" }) {
  const paths = {
    promise: "M8 0h24v4h4v32H0V4h8Zm0 8H4v24h28V8ZM8 12h20v4H8Zm0 8h16v4H8Z",
    probe:
      "M12 0h12v4h4v4h4v4h4v12h-4v4h-4v4h-4v4H12v-4H8v-4H4v-4H0V12h4V8h4V4h4Zm0 8v4H8v12h4v4h12v-4h4V12h-4V8Zm4 4h4v4h4v4h-4v4h-4v-4h-4v-4h4Z",
    proof:
      "M4 0h24v4h4v4h4v28H0V4h4Zm0 8v24h28V12H24V4H8v4Zm4 12h4v4h4v-4h4v-4h4v-4h4v8h-4v4h-4v4H12v-4H8Z",
  };
  return (
    <svg
      className="pixel-symbol"
      viewBox="0 0 36 36"
      fill="currentColor"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <path fillRule="evenodd" d={paths[kind]} />
    </svg>
  );
}

export function EvidenceIllustration() {
  return (
    <figure className="evidence-illustration" aria-labelledby="record-heading">
      <figcaption className="record-chrome">
        <PixelSymbol kind="proof" />
        <span id="record-heading">A finding you can follow.</span>
      </figcaption>
      <div className="evidence-specimen">
        <img
          src={evidenceSpecimen}
          width="1536"
          height="1024"
          alt="A three-leaf forensic folio links the reviewed request and observed response to a before-and-after comparison where the repaired path ends at a denial shutter."
          loading="lazy"
          decoding="async"
        />
      </div>
      <ol className="proof-chain">
        <li>
          <span>The request</span>
          <strong>Know exactly what was tested.</strong>
          <p>Actor, method, path, and reviewed permission.</p>
        </li>
        <li>
          <span>The response</span>
          <strong>See what the app actually returned.</strong>
          <p>HTTP status, response body, and bounded assertions.</p>
        </li>
        <li>
          <span>The comparison</span>
          <strong>Check the same behavior after repair.</strong>
          <p>Identical requests. Two fixture versions.</p>
        </li>
      </ol>
      <div className="record-exports">
        <span>
          <code>report.json</code>
          <small>Inspect the evidence</small>
        </span>
        <span>
          <code>regression.py</code>
          <small>Repeat the check</small>
        </span>
      </div>
    </figure>
  );
}

