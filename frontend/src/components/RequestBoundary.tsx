import { useEffect, useRef, useState } from "react";

type Account = "owner" | "other";

function AccountIcon({ owner = false }: { owner?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3" />
      <path d="M5 21v-3a7 7 0 0 1 14 0v3" />
      {owner && <path d="m18 4 1.2 1.2L22 2.5" />}
    </svg>
  );
}

/** An expectation diagram. It never reads or fabricates execution results. */
export function RequestBoundary() {
  const [account, setAccount] = useState<Account>("other");
  const [pointerInput, setPointerInput] = useState(false);
  const track = useRef<HTMLDivElement>(null);
  const packet = useRef<HTMLSpanElement>(null);
  const flight = useRef<Animation | null>(null);

  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const stop = () => {
      flight.current?.cancel();
      setPointerInput(false);
    };
    preference.addEventListener("change", stop);
    document.addEventListener("keydown", stop, true);
    return () => {
      flight.current?.cancel();
      preference.removeEventListener("change", stop);
      document.removeEventListener("keydown", stop, true);
    };
  }, []);

  function choose(next: Account, pointer: boolean) {
    setAccount(next);
    setPointerInput(pointer);
    flight.current?.cancel();
    const node = packet.current;
    if (
      !pointer ||
      !node ||
      !track.current ||
      typeof node.animate !== "function" ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const distance = Math.max(
      0,
      track.current.clientWidth * (next === "owner" ? 1 : 0.62) - 8,
    );
    const animation = node.animate(
      [
        { transform: "translateX(0)", opacity: 0 },
        { transform: "translateX(0)", opacity: 1, offset: 0.08 },
        {
          transform: "translateX(" + distance + "px)",
          opacity: 1,
          offset: 0.88,
        },
        { transform: "translateX(" + distance + "px)", opacity: 0 },
      ],
      { duration: 650, easing: "cubic-bezier(0.77, 0, 0.175, 1)" },
    );
    flight.current = animation;
    animation.onfinish = () => {
      animation.cancel();
      if (flight.current === animation) flight.current = null;
    };
  }

  return (
    <figure
      className="permission-study"
      data-account={account}
      data-input={pointerInput ? "pointer" : "instant"}
      aria-labelledby="study-rule"
    >
      <figcaption className="study-rule">
        <p id="study-rule">“Only the owner can read a private note.”</p>
        <span>Sample product promise</span>
      </figcaption>
      <div className="study-flow">
        <div className="study-account">
          <p>Who is asking?</p>
          <div
            className="account-choices"
            role="group"
            aria-label="Preview an account role"
          >
            <button
              type="button"
              aria-pressed={account === "owner"}
              onClick={(e) => choose("owner", e.detail > 0)}
            >
              <AccountIcon owner />
              <span>Note owner</span>
              <i aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-pressed={account === "other"}
              onClick={(e) => choose("other", e.detail > 0)}
            >
              <AccountIcon />
              <span>Other account</span>
              <i aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="study-request">
          <code>
            <b>GET</b> /notes/:note_id
          </code>
          <div className="request-track" ref={track} aria-hidden="true">
            <span className="request-rail" />
            <span className="request-permission" />
            <span className="request-packet" ref={packet} />
            <span className="request-boundary">
              <i />
              <i />
              <i />
              <i />
              <i />
            </span>
            <svg className="request-end" viewBox="0 0 24 24" fill="none">
              <path d="m8 5 7 7-7 7" />
            </svg>
            <span className="boundary-annotation">Ownership boundary</span>
          </div>
          <span className="request-pattern">
            Route pattern · same resource, different account
          </span>
        </div>
        <div className="study-resource">
          <svg viewBox="0 0 32 40" fill="none" aria-hidden="true">
            <path d="M2 1h19l9 9v29H2Z" />
            <path d="M21 1v9h9M8 19h16M8 25h16M8 31h10" />
          </svg>
          <h3>Private note</h3>
          <p>
            Belongs to the
            <br />
            note owner.
          </p>
        </div>
      </div>
      <div className="study-reading">
        <div
          className="study-expectation"
          aria-live="polite"
          aria-atomic="true"
        >
          <span>Expected permission</span>
          <strong>
            {account === "owner"
              ? "Allow the owner."
              : "Deny the other account."}
          </strong>
        </div>
        <p>
          {account === "owner"
            ? "The feature should keep working for the person who owns the note."
            : "Knowing the note’s address should never be enough to read it."}
        </p>
        <span className="study-preview">
          Illustration only.
          <br />A real run checks both accounts.
        </span>
      </div>
    </figure>
  );
}
