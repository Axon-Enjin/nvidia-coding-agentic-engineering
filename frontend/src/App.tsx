import { useEffect, useId, useRef, useState } from "react";
import {
  api,
  type Brief,
  type Check,
  type Config,
  type Planned,
  type Report,
} from "./api";
import { Button } from "./components/ui/button";
import {
  Arrow,
  BrandMark,
  BrandName,
  SignalSite,
} from "./components/SignalSite";
import { useSiteView } from "./useSiteView";

type Mode = "local" | "nebius";
type Notice = { text: string; error?: boolean } | null;

// Role labels clarify the demo; raw fixture identities remain in evidence/exports.
function actorLabel(actor: string) {
  return (
    (
      {
        Alice: "Note owner",
        Bob: "Other account",
        "Anonymous visitor": "Signed-out visitor",
      } as Record<string, string>
    )[actor] ?? actor
  );
}

function roleCopy(text: string) {
  const labels: Record<string, string> = {
    "Alice reads Alice's note": "Note owner reads their own private note",
    "Bob reads Alice's note": "Other account reads the owner's private note",
    "An anonymous visitor reads Alice's note":
      "Signed-out visitor reads a private note",
  };
  if (labels[text]) return labels[text];
  return text
    .replace(/Alice[’']s/g, "the owner's")
    .replace(/\bAlice\b/g, "the note owner")
    .replace(/\bBob\b/g, "another account");
}

// Presentation metadata for the registered local probes in vibesec/executor.py.
const probeDescriptions: Record<
  string,
  { actor: string; request: string; permission: string }
> = {
  owner_reads_note_v1: {
    actor: "Note owner",
    request: "GET /notes/alice-note",
    permission: "Expected access",
  },
  cross_user_note_read_v1: {
    actor: "Other account",
    request: "GET /notes/alice-note",
    permission: "Expected denial",
  },
  anonymous_note_read_v1: {
    actor: "Signed-out visitor",
    request: "GET /notes/alice-note",
    permission: "Expected denial",
  },
};

const outcomes = {
  violation_repaired: {
    label: "Violation found, then blocked",
    body: "The vulnerable app exposed a private note to another account. The repaired app denied the same request while preserving access for the note owner. The comparison is limited to these tested requests.",
  },
  no_violation_observed: {
    label: "No violation in this check",
    body: "Both versions denied the forbidden request and allowed the owner’s request. Untested behavior remains unknown.",
  },
  inconclusive: {
    label: "Inconclusive result",
    body: "A required request did not produce the expected evidence. This run cannot establish a repair or security conclusion.",
  },
};

const checkLabels = {
  expected_access: "Expected access",
  confirmed_violation: "Confirmed violation",
  blocked: "Blocked",
  inconclusive: "Inconclusive",
};

const interpretation = {
  expected_access: "Owner read succeeded",
  confirmed_violation: "Private note returned",
  blocked: "Access denied",
  inconclusive: "Result unknown",
};

function AccessDiagram({
  report,
  deniedActor,
}: {
  report: Report | null;
  deniedActor: string;
}) {
  const beforeProfile = report?.profiles.find(
    (profile) => profile.profile === "vulnerable",
  );
  const afterProfile = report?.profiles.find(
    (profile) => profile.profile === "repaired",
  );
  const ownerBefore = beforeProfile?.checks.find(
    (check) => check.probe_id === "owner_reads_note_v1",
  );
  const ownerAfter = afterProfile?.checks.find(
    (check) => check.probe_id === "owner_reads_note_v1",
  );
  const before = beforeProfile?.checks.find(
    (check) => check.probe_id !== "owner_reads_note_v1",
  );
  const after = afterProfile?.checks.find(
    (check) => check.probe_id !== "owner_reads_note_v1",
  );
  const ownerActor = actorLabel(ownerBefore?.actor ?? "Alice");
  const requester = actorLabel(before?.actor ?? deniedActor);

  return (
    <div
      className={`access-diagram ${report ? "has-result" : ""}`}
      aria-label={
        report
          ? `Access boundary study. ${ownerActor}'s owner request returned HTTP ${ownerBefore?.status ?? "no response"} before and HTTP ${ownerAfter?.status ?? "no response"} after repair. ${requester}'s forbidden request returned HTTP ${before?.status ?? "no response"} before and HTTP ${after?.status ?? "no response"} after repair.`
          : `Access boundary study: the note owner should have access; ${requester} should not. Run the sample to observe the actual responses.`
      }
    >
      <div className="diagram-headings" aria-hidden="true">
        <span>User &amp; request</span>
        <span>Access boundary</span>
        <span>Observed response</span>
      </div>
      <div className="diagram-route alice-route">
        <div className="route-person">
          <span className="person-dot">O</span>
          <div>
            <strong>{ownerActor}</strong>
            <small>Owner of the note</small>
          </div>
        </div>
        <span className="route-request">
          {ownerBefore?.request ?? "GET /notes/alice-note"}{" "}
          <small>as {ownerActor}</small>
        </span>
        <div className="route-track">
          <i />
        </div>
        <div className="route-answer">
          <strong>
            {report
              ? ownerBefore?.status === ownerAfter?.status
                ? (ownerBefore?.status ?? "?")
                : `${ownerBefore?.status ?? "?"}→${ownerAfter?.status ?? "?"}`
              : "?"}
          </strong>
          <span>{report ? "Both versions" : "Awaiting run"}</span>
        </div>
      </div>
      <div className="diagram-route bob-route">
        <div className="route-person">
          <span className="person-dot">
            {requester === "Signed-out visitor" ? "?" : "X"}
          </span>
          <div>
            <strong>{requester}</strong>
            <small>
              {requester === "Signed-out visitor"
                ? "Not signed in"
                : "Another user"}
            </small>
          </div>
        </div>
        <span className="route-request">
          {before?.request ?? "GET /notes/alice-note"}{" "}
          <small>as {requester}</small>
        </span>
        <div className="route-track">
          <i />
        </div>
        <div className="route-answer">
          <strong>
            {report ? `${before?.status ?? "?"}→${after?.status ?? "?"}` : "?"}
          </strong>
          <span>{report ? "Before / after" : "Awaiting run"}</span>
        </div>
      </div>
      <div className="diagram-boundary" aria-hidden="true">
        <span>Private note</span>
        <i />
      </div>
      <div className="diagram-caption">
        <span>Same note. Two users.</span>
        <strong>
          {after
            ? `The same forbidden request: HTTP ${before?.status ?? "no response"} before, HTTP ${after.status ?? "no response"} after.`
            : "Run the check to see where the request ends."}
        </strong>
      </div>
    </div>
  );
}

function EvidenceCheck({ check }: { check: Check }) {
  const isOwner = check.probe_id === "owner_reads_note_v1";
  const [open, setOpen] = useState(!isOwner);
  const panelId = useId();
  return (
    <div className="evidence-row">
      <button
        className="evidence-toggle"
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((expanded) => !expanded)}
      >
        <span className="evidence-identity">
          <strong>{actorLabel(check.actor)}</strong>
          <small>{isOwner ? "Permitted request" : "Forbidden request"}</small>
        </span>
        <span className={`result-tag ${check.result}`}>
          {checkLabels[check.result]}
        </span>
        <span className="expand-mark" aria-hidden="true">
          {open ? "−" : "+"}
        </span>
      </button>
      <div className="evidence-detail" id={panelId} hidden={!open}>
        <div className="request-meta">
          <span>Fixture actor: {check.actor}</span>
          <span>{check.request}</span>
          <span>HTTP {check.status ?? "no response"}</span>
          <span>{check.duration_ms} ms</span>
        </div>
        <pre>
          {JSON.stringify(check.response ?? "No parseable response", null, 2)}
        </pre>
        <p>
          Exact synthetic note match:{" "}
          <strong>{check.exact_canary_match ? "Yes" : "No"}</strong>
        </p>
      </div>
    </div>
  );
}

function ReportView({
  report,
  onBack,
  onRestart,
}: {
  report: Report;
  onBack: () => void;
  onRestart: () => void;
}) {
  const outcome = outcomes[report.outcome];
  const beforeProfile = report.profiles.find(
    (profile) => profile.profile === "vulnerable",
  );
  const afterProfile = report.profiles.find(
    (profile) => profile.profile === "repaired",
  );
  const before = beforeProfile?.checks.find(
    (check) => check.probe_id !== "owner_reads_note_v1",
  );
  const after = afterProfile?.checks.find(
    (check) => check.probe_id !== "owner_reads_note_v1",
  );
  return (
    <section
      className="stage-content stage-enter"
      aria-labelledby="stage-heading"
    >
      <div className="stage-heading-row">
        <div>
          <span className="stage-kicker">Step 3 of 3 · Read the evidence</span>
          <h3 id="stage-heading" tabIndex={-1}>
            The response is the answer.
          </h3>
          <p>
            Inspect the same request before and after repair. Open each row to
            see its response.
          </p>
        </div>
        <span className={`outcome-chip ${report.outcome}`}>
          {outcome.label}
        </span>
      </div>
      {before && after && (
        <div
          className="status-shift"
          aria-label="Forbidden request HTTP comparison"
        >
          <div className="status-shift-label">
            <span>Forbidden request</span>
            <strong>{actorLabel(before.actor)} requests a private note</strong>
          </div>
          <div className="status-pair">
            <div>
              <small>Before repair</small>
              <strong>{before.status ?? "—"}</strong>
              <span>{interpretation[before.result]}</span>
            </div>
            <span className="status-arrow" aria-hidden="true">
              →
            </span>
            <div>
              <small>After repair</small>
              <strong>{after.status ?? "—"}</strong>
              <span>{interpretation[after.result]}</span>
            </div>
          </div>
        </div>
      )}
      <p className="report-explanation">{outcome.body}</p>
      <div className="evidence-section-heading">
        <h4>Open the evidence</h4>
        <span>Two versions, same reviewed plan</span>
      </div>
      <div className="evidence-grid">
        {[beforeProfile, afterProfile].map((profile, index) =>
          profile ? (
            <section
              className="evidence-profile"
              aria-label={index === 0 ? "Before repair" : "After repair"}
              key={profile.profile}
            >
              <div className="profile-heading">
                <span>
                  Version {index + 1} / {profile.profile}
                </span>
                <h5>{index === 0 ? "Before repair" : "After repair"}</h5>
              </div>
              {profile.checks.map((check) => (
                <EvidenceCheck key={check.probe_id} check={check} />
              ))}
            </section>
          ) : null,
        )}
      </div>
      <div className="report-bottom">
        <div>
          <strong>
            {report.planner_mode === "nebius"
              ? "Live Nebius plan · local fixture execution"
              : "Local walkthrough · no provider calls"}
          </strong>
          <span>
            Fixture revision {report.fixture_revision} · Run{" "}
            {report.run_id.slice(0, 8)}
          </span>
          <p>{report.limitation}</p>
        </div>
        <div className="export-actions">
          <Button asChild variant="outline">
            <a href={`/api/runs/${report.run_id}/report.json`} download>
              Evidence JSON <Arrow direction="download" />
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href={`/api/runs/${report.run_id}/regression.py`} download>
              Regression test <Arrow direction="download" />
            </a>
          </Button>
        </div>
      </div>
      <div className="stage-footer">
        <button type="button" className="text-action" onClick={onBack}>
          ← Review the plan
        </button>
        <button type="button" className="text-action" onClick={onRestart}>
          Start another check <Arrow />
        </button>
      </div>
    </section>
  );
}

export default function App() {
  const view = useSiteView();
  const [config, setConfig] = useState<Config | null>(null);
  const [configAttempt, setConfigAttempt] = useState(0);
  const [briefId, setBriefId] = useState("");
  const [mode, setMode] = useState<Mode>("local");
  const [planned, setPlanned] = useState<Planned | null>(null);
  const [report, setReport] = useState<Report | null>(null);
  const [busy, setBusy] = useState<"config" | "plan" | "run" | null>("config");
  const [notice, setNotice] = useState<Notice>(null);
  const busyRef = useRef<typeof busy>("config");

  useEffect(() => {
    let active = true;
    busyRef.current = "config";
    setBusy("config");
    setNotice(null);
    api<Config>("/api/config")
      .then((data) => {
        if (!active) return;
        setConfig(data);
        setBriefId(data.briefs[0]?.id ?? "");
      })
      .catch((error: Error) => {
        if (!active) return;
        setNotice({
          text: `Could not load the local app: ${error.message}`,
          error: true,
        });
      })
      .finally(() => {
        if (!active) return;
        busyRef.current = null;
        setBusy(null);
      });
    return () => {
      active = false;
    };
  }, [configAttempt]);

  const brief: Brief | undefined = config?.briefs.find(
    (item) => item.id === briefId,
  );
  const rule = planned && config?.promises[planned.plan.promise_id];
  const stage = report ? 3 : planned ? 2 : 1;
  const reportProbe = report?.profiles
    .find((profile) => profile.profile === "vulnerable")
    ?.checks.find((check) => check.probe_id !== "owner_reads_note_v1");
  const forbiddenProbeId =
    planned?.plan.probe_ids.find((id) => id !== "owner_reads_note_v1") ??
    (briefId === "signed_in_notes"
      ? "anonymous_note_read_v1"
      : "cross_user_note_read_v1");
  const deniedActor =
    reportProbe?.actor ??
    probeDescriptions[forbiddenProbeId]?.actor ??
    "Another user";

  function focusStage() {
    requestAnimationFrame(() => {
      const heading = document.querySelector<HTMLHeadingElement>(
        "#workbench-main #stage-heading",
      );
      if (!heading) return;
      heading.focus({ preventScroll: true });
      heading.scrollIntoView({
        behavior: "instant",
        block: "start",
      });
    });
  }

  function resetStudy() {
    if (busyRef.current) return;
    setPlanned(null);
    setReport(null);
    setNotice(null);
    requestAnimationFrame(() =>
      document.getElementById("brief-select")?.focus(),
    );
  }

  async function preparePlan() {
    if (busyRef.current || !config || !briefId) return;
    busyRef.current = "plan";
    setBusy("plan");
    setPlanned(null);
    setReport(null);
    setNotice({ text: "Preparing the bounded plan…" });
    try {
      const data = await api<Planned>("/api/plans", {
        brief_id: briefId,
        mode,
      });
      setPlanned(data);
      setNotice({
        text: "Plan ready. Review the two requests before the run.",
      });
      focusStage();
    } catch (error) {
      setNotice({
        text: `Plan could not be created: ${(error as Error).message}`,
        error: true,
      });
    } finally {
      busyRef.current = null;
      setBusy(null);
    }
  }

  async function runChecks() {
    if (busyRef.current || !planned) return;
    busyRef.current = "run";
    setBusy("run");
    setReport(null);
    setNotice({
      text: "Running the same reviewed requests against both local app versions…",
    });
    try {
      const data = await api<Report>("/api/runs", { plan_id: planned.plan_id });
      setReport(data);
      setNotice({
        text: "Comparison complete. The actual responses are shown below.",
      });
      focusStage();
    } catch (error) {
      setNotice({
        text: `Checks did not complete: ${(error as Error).message}`,
        error: true,
      });
    } finally {
      busyRef.current = null;
      setBusy(null);
    }
  }

  if (view === "landing") return <SignalSite />;

  return (
    <>
      <a className="skip-link" href="#workbench-main">
        Skip to the workbench
      </a>
      <header className="workbench-header shell">
        <a className="wordmark" href="/#top" aria-label="VibeSec home">
          <BrandMark />
          <BrandName />
        </a>
        <a className="back-to-overview" href="/#top">
          <Arrow direction="back" /> Back to overview
        </a>
      </header>
      <main id="workbench-main" className="workbench-page" tabIndex={-1}>
        <section
          className="lab-section product-section"
          id="lab"
          aria-labelledby="lab-heading"
        >
          <div className="shell">
            <div className="lab-intro" id="product">
              <div>
                <h1 id="lab-heading">Security workbench.</h1>
              </div>
              <p>
                Pick a registered brief, review exactly what will be checked,
                and inspect both responses. No public targets.
              </p>
            </div>
            <div className="lab-window">
              <div className="lab-chrome">
                <span className="lab-chrome-brand">
                  <BrandMark /> VibeSec / Workbench
                </span>
                <span className="lab-scope">
                  <i aria-hidden="true" /> Synthetic notes app, local only
                </span>
              </div>
              <div className="lab-layout">
                <aside className="lab-sidebar" aria-label="Study progress">
                  <ol>
                    <li
                      className={stage === 1 ? "active" : "done"}
                      aria-current={stage === 1 ? "step" : undefined}
                    >
                      <span>01</span>
                      <div>
                        <strong>Choose a brief</strong>
                        <small>Define the promise</small>
                      </div>
                    </li>
                    <li
                      className={
                        stage === 2 ? "active" : stage > 2 ? "done" : ""
                      }
                      aria-current={stage === 2 ? "step" : undefined}
                    >
                      <span>02</span>
                      <div>
                        <strong>Review the plan</strong>
                        <small>Know the requests</small>
                      </div>
                    </li>
                    <li
                      className={stage === 3 ? "active" : ""}
                      aria-current={stage === 3 ? "step" : undefined}
                    >
                      <span>03</span>
                      <div>
                        <strong>Read the evidence</strong>
                        <small>Compare responses</small>
                      </div>
                    </li>
                  </ol>
                </aside>
                <div className="lab-main">
                  {notice && (
                    <p
                      className={`notice ${notice.error ? "error" : ""}`}
                      role="status"
                      aria-live="polite"
                    >
                      <span>{notice.text}</span>
                      {!config && !busy && (
                        <button
                          type="button"
                          onClick={() => {
                            if (busyRef.current) return;
                            busyRef.current = "config";
                            setConfigAttempt((attempt) => attempt + 1);
                          }}
                        >
                          Retry connection <Arrow />
                        </button>
                      )}
                    </p>
                  )}
                  {stage === 1 && (
                    <section
                      className="stage-content stage-enter"
                      aria-labelledby="stage-heading"
                    >
                      <span className="stage-kicker">
                        Step 1 of 3 · Choose a brief
                      </span>
                      <h3 id="stage-heading" tabIndex={-1}>
                        What should the app protect?
                      </h3>
                      <p className="stage-description">
                        Start with one prepared product claim. The checks run
                        only on our synthetic notes app.
                      </p>
                      <div className="field-grid">
                        <div>
                          <label htmlFor="brief-select">
                            Sample product brief
                          </label>
                          <select
                            id="brief-select"
                            value={briefId}
                            disabled={!config || !!busy}
                            onChange={(event) => {
                              setBriefId(event.target.value);
                              setNotice(null);
                            }}
                          >
                            {!config && (
                              <option value="">
                                {busy === "config"
                                  ? "Loading sample briefs..."
                                  : "Sample app unavailable"}
                              </option>
                            )}
                            {config?.briefs.map((item) => (
                              <option value={item.id} key={item.id}>
                                {roleCopy(item.title)}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="planner-mode">
                            How to prepare the plan
                          </label>
                          <select
                            id="planner-mode"
                            value={mode}
                            disabled={!config || !!busy}
                            onChange={(event) => {
                              setMode(event.target.value as Mode);
                              setNotice(null);
                            }}
                          >
                            <option value="local">
                              Local reviewed plan · no credits
                            </option>
                            <option
                              value="nebius"
                              disabled={!config?.nebius_available}
                            >
                              Live NVIDIA model via Nebius
                              {config && !config.nebius_available
                                ? " · configure API key"
                                : ""}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="brief-preview">
                        <span>
                          Product claim:{" "}
                          {(brief && roleCopy(brief.title)) ??
                            (busy === "config" ? "Loading" : "Unavailable")}
                        </span>
                        <blockquote>
                          {(brief && roleCopy(brief.text)) ??
                            (busy === "config"
                              ? "Loading the owned sample app..."
                              : "The sample app is unavailable. Retry the connection to continue.")}
                        </blockquote>
                      </div>
                      <p className="mode-note">
                        {mode === "nebius"
                          ? "This makes a real NVIDIA model call with your configured Nebius key. The checks still run locally."
                          : "A fixed reviewed plan is used. No model call or credits are needed."}
                      </p>
                      <div className="stage-footer">
                        <span>Step 1 of 3 · Owned fixture only</span>
                        <Button
                          onClick={preparePlan}
                          disabled={!config || !!busy}
                        >
                          {busy === "plan"
                            ? "Preparing plan…"
                            : "Prepare the plan"}
                          <Arrow />
                        </Button>
                      </div>
                    </section>
                  )}
                  {stage === 2 && rule && planned && (
                    <section
                      className="stage-content stage-enter"
                      aria-labelledby="stage-heading"
                    >
                      <span className="stage-kicker">
                        Step 2 of 3 · Review the plan
                      </span>
                      <h3 id="stage-heading" tabIndex={-1}>
                        Here is the boundary.
                      </h3>
                      <p className="stage-description">
                        The plan selects two reviewed requests. It cannot invent
                        a target or decide the result.
                      </p>
                      <div className="promise-header">
                        <span>Security promise</span>
                        <h4>{roleCopy(rule.title)}</h4>
                      </div>
                      <div className="boundary-grid">
                        <div className="boundary-card allowed">
                          <span className="boundary-symbol">
                            <svg
                              viewBox="0 0 20 20"
                              fill="none"
                              aria-hidden="true"
                            >
                              <path
                                d="m4 10 4 4 8-8"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span>Expected access</span>
                          <strong>{roleCopy(rule.allowed)}</strong>
                        </div>
                        <div className="boundary-card forbidden">
                          <span className="boundary-symbol">
                            <svg
                              viewBox="0 0 20 20"
                              fill="none"
                              aria-hidden="true"
                            >
                              <path
                                d="m5 5 10 10M15 5 5 15"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                strokeLinecap="round"
                              />
                            </svg>
                          </span>
                          <span>Forbidden access</span>
                          <strong>{roleCopy(rule.forbidden)}</strong>
                        </div>
                      </div>
                      <div className="review-requests">
                        <p>
                          Reviewed requests{" "}
                          <span>
                            Owned fixture:{" "}
                            <code>{planned.plan.fixture_id}</code>
                          </span>
                        </p>
                        {planned.plan.probe_ids.map((id) => {
                          const request = probeDescriptions[id];
                          return (
                            <div className="review-request" key={id}>
                              <code>{request?.request ?? id}</code>
                              <span>
                                As {request?.actor ?? "registered actor"}
                              </span>
                              <strong>
                                {request?.permission ?? "Review required"}
                              </strong>
                            </div>
                          );
                        })}
                      </div>
                      <p className="plan-reason">
                        {roleCopy(planned.plan.rationale)}
                      </p>
                      <p className="plan-provenance">
                        {planned.planner_mode === "nebius"
                          ? `Live plan through Nebius · ${planned.planner_receipt.model ?? "Model unreported"}`
                          : "Local reviewed plan · no model call"}
                      </p>
                      <div className="stage-footer">
                        <button
                          type="button"
                          className="text-action"
                          onClick={resetStudy}
                          disabled={!!busy}
                        >
                          ← Change the brief
                        </button>
                        <Button onClick={runChecks} disabled={!!busy}>
                          {busy === "run"
                            ? "Running checks…"
                            : "Run both versions"}
                          <Arrow />
                        </Button>
                      </div>
                    </section>
                  )}
                  {stage === 3 && report && (
                    <ReportView
                      report={report}
                      onBack={() => {
                        if (busyRef.current) return;
                        setReport(null);
                        setNotice(null);
                        focusStage();
                      }}
                      onRestart={resetStudy}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className="workbench-boundary"
          aria-labelledby="boundary-heading"
        >
          <div className="shell">
            <div className="section-heading-row">
              <h2 id="boundary-heading">The access boundary.</h2>
              <p>
                Private data belongs to its owner. {actorLabel(deniedActor)}{" "}
                should be denied access. Run the reviewed plan to compare actual
                responses from both versions.
              </p>
            </div>
            <AccessDiagram report={report} deniedActor={deniedActor} />
          </div>
        </section>
      </main>
    </>
  );
}
