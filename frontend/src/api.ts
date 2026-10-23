export type Brief = { id: string; title: string; text: string };
export type PromiseRule = {
  title: string;
  allowed: string;
  forbidden: string;
  probe_ids: string[];
};
export type Config = {
  fixture_id: string;
  briefs: Brief[];
  promises: Record<string, PromiseRule>;
  nebius_available: boolean;
  nebius_model: string | null;
};
export type Plan = {
  fixture_id: string;
  promise_id: string;
  probe_ids: string[];
  rationale: string;
};
export type Planned = {
  plan_id: string;
  plan: Plan;
  planner_mode: "local" | "nebius";
  planner_receipt: { model?: string | null; latency_ms?: number | null };
};
export type Check = {
  probe_id: string;
  actor: string;
  request: string;
  status: number | null;
  response: Record<string, unknown> | null;
  exact_canary_match: boolean;
  result:
    "expected_access" | "confirmed_violation" | "blocked" | "inconclusive";
  duration_ms: number;
};
export type Report = {
  run_id: string;
  outcome: "violation_repaired" | "no_violation_observed" | "inconclusive";
  profiles: { profile: "vulnerable" | "repaired"; checks: Check[] }[];
  planner_mode: "local" | "nebius";
  fixture_revision: string;
  limitation: string;
};

export async function api<T>(path: string, body?: object): Promise<T> {
  const response = await fetch(
    path,
    body
      ? {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      : undefined,
  );
  const data: unknown = await response.json();
  if (!response.ok) {
    const error = data as { message?: string; error?: string };
    throw new Error(error.message || error.error || `HTTP ${response.status}`);
  }
  return data as T;
}
