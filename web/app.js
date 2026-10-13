const byId = (id) => document.getElementById(id);
const status = byId("live-status");
const state = { config: null, planId: null, plan: null };

function setStatus(message, error = false) {
  status.textContent = message;
  status.classList.toggle("error", error);
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || data.error || `HTTP ${response.status}`);
  return data;
}

function selectedBrief() {
  return state.config.briefs.find((brief) => brief.id === byId("brief-select").value);
}

function updateBrief() {
  byId("brief-text").textContent = selectedBrief().text;
  byId("plan-content").hidden = true;
  byId("plan-empty").hidden = false;
  byId("result-section").hidden = true;
  state.planId = null;
  document.body.dataset.stage = "intent";
  setStatus("");
}

function updatePlannerHelp() {
  const live = byId("planner-mode").value === "nebius";
  byId("planner-help").textContent = live
    ? "A real NVIDIA model call will use your configured Nebius key. The checks still run locally until Sandbox integration is verified."
    : "Local mode uses a fixed reviewed plan and is clearly labeled in the report.";
}

function renderPlan(data) {
  const promise = state.config.promises[data.plan.promise_id];
  byId("promise-title").textContent = promise.title;
  byId("promise-allowed").textContent = promise.allowed;
  byId("promise-forbidden").textContent = promise.forbidden;
  byId("plan-rationale").textContent = data.plan.rationale;
  byId("plan-source").textContent = data.planner_mode === "nebius"
    ? `LIVE PLAN · ${data.planner_receipt.model} · ${data.planner_receipt.latency_ms} ms`
    : "LOCAL DETERMINISTIC PLAN · NO MODEL CALL";
  byId("plan-empty").hidden = true;
  byId("plan-content").hidden = false;
  byId("result-section").hidden = true;
  document.body.dataset.stage = "rule";
}

function outcomeText(outcome) {
  if (outcome === "violation_repaired") return ["Violation reproduced, then blocked", "The vulnerable app returned Alice's exact note to Bob. The repaired app denied the same request while Alice could still read her note."];
  if (outcome === "no_violation_observed") return ["No violation in this check", "Both app versions denied the forbidden request and allowed the owner's request. This says nothing about untested behavior."];
  return ["Inconclusive", "At least one required request did not produce the expected evidence. No repair or security conclusion is made."];
}

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function renderCheck(check) {
  const row = element("div", "check");
  const title = element("div", "check-title");
  const label = element("strong", "", `${check.actor} · ${check.probe_id === "owner_reads_note_v1" ? "expected access" : "forbidden access"}`);
  const result = element("span", `status ${check.result}`, check.result.replaceAll("_", " "));
  title.append(label, result);
  const evidence = element("div", "evidence");
  const response = check.response ? JSON.stringify(check.response) : "No parseable response";
  evidence.textContent = `${check.request}\nActor: ${check.actor}\nHTTP: ${check.status ?? "no response"}\nResponse: ${response}\nExact canary match: ${check.exact_canary_match ? "yes" : "no"}`;
  row.append(title, evidence);
  return row;
}

function renderReport(report) {
  const [badge, summary] = outcomeText(report.outcome);
  byId("outcome-badge").className = `outcome-badge ${report.outcome}`;
  byId("outcome-badge").textContent = badge;
  byId("result-summary").textContent = summary;
  const comparison = byId("comparison");
  comparison.replaceChildren();
  for (const profile of report.profiles) {
    const card = element("div", "profile-card");
    const head = element("div", "profile-head");
    head.append(element("h4", "", profile.profile === "vulnerable" ? "Before repair" : "After repair"));
    head.append(element("span", "", profile.profile.toUpperCase()));
    card.append(head, ...profile.checks.map(renderCheck));
    comparison.append(card);
  }
  byId("report-mode").textContent = report.planner_mode === "nebius"
    ? `Live Nebius plan · local fixture execution · revision ${report.fixture_revision}`
    : `Local walkthrough · no provider calls · revision ${report.fixture_revision}`;
  byId("report-limitation").textContent = report.limitation;
  byId("json-link").href = `/api/runs/${report.run_id}/report.json`;
  byId("test-link").href = `/api/runs/${report.run_id}/regression.py`;
  byId("result-section").hidden = false;
  document.body.dataset.stage = "proof";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  byId("result-section").scrollIntoView({ behavior: reduceMotion ? "instant" : "smooth", block: "start" });
}

async function generatePlan() {
  const button = byId("plan-button");
  button.disabled = true;
  setStatus("Generating a bounded security plan…");
  try {
    const data = await api("/api/plans", {
      method: "POST",
      body: JSON.stringify({ brief_id: byId("brief-select").value, mode: byId("planner-mode").value }),
    });
    state.planId = data.plan_id;
    state.plan = data.plan;
    renderPlan(data);
    setStatus("Plan ready. Review the security promise before running it.");
  } catch (error) {
    setStatus(`Plan could not be created: ${error.message}`, true);
  } finally {
    button.disabled = false;
  }
}

async function runChecks() {
  const button = byId("run-button");
  button.disabled = true;
  setStatus("Running the same reviewed checks against both local app versions…");
  try {
    const report = await api("/api/runs", {
      method: "POST",
      body: JSON.stringify({ plan_id: state.planId }),
    });
    renderReport(report);
    setStatus("Comparison complete. Inspect each response and download the regression test.");
  } catch (error) {
    setStatus(`Checks did not complete: ${error.message}`, true);
  } finally {
    button.disabled = false;
  }
}

async function start() {
  try {
    state.config = await api("/api/config");
    const select = byId("brief-select");
    for (const brief of state.config.briefs) {
      const option = document.createElement("option");
      option.value = brief.id;
      option.textContent = brief.title;
      select.append(option);
    }
    const nebiusOption = byId("planner-mode").querySelector('[value="nebius"]');
    nebiusOption.disabled = !state.config.nebius_available;
    if (!state.config.nebius_available) nebiusOption.textContent += " · configure API key";
    select.addEventListener("change", updateBrief);
    byId("planner-mode").addEventListener("change", () => { updatePlannerHelp(); updateBrief(); });
    byId("plan-button").addEventListener("click", generatePlan);
    byId("run-button").addEventListener("click", runChecks);
    updateBrief();
    updatePlannerHelp();
  } catch (error) {
    setStatus(`Could not load the local app: ${error.message}`, true);
  }
}

start();
