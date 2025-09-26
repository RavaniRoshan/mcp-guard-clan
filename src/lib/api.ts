export type Severity = "critical" | "high" | "medium" | "low";

export type AttackLog = {
  id: string;
  sessionId: string;
  timestamp: string;
  serverUrl: string;
  attackType: string;
  severity: Severity;
  payload: string;
  blocked: boolean;
  sourceIP: string;
};

export type MetricsResponse = {
  securityScore: number;
  activeThreats: number;
  monitoredServers: number;
  responseTimeMs: number;
  deltas: {
    securityScore: number; // +2.1 means +2.1%
    activeThreats: number; // negative means decrease
    monitoredServers: number;
    responseTimeMs: number; // negative means faster
  };
};

export type ChartPoint = {
  time: string;
  critical: number;
  high: number;
  medium: number;
  low: number;
};

export type ReplayFrame = {
  index: number;
  type: "input" | "tool" | "output" | "system";
  content: string;
  ts: string;
};

import { getApiBase, getApiKey } from "@/lib/config";

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init?.headers as Record<string, string> | undefined),
  };
  const apiKey = getApiKey();
  if (apiKey) headers["x-api-key"] = apiKey;
  headers["x-signature"] = headers["x-signature"] ?? "dev-signature";

  const base = getApiBase();
  const url = base ? `${base.replace(/\/$/, "")}${path}` : path;
  const res = await fetch(url, { ...init, headers });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${path} failed: ${res.status} ${text}`);
  }
  return res.json();
}

export const Api = {
  getAttacks: () => apiFetch<{ data: AttackLog[]; total: number }>("/api/attacks"),
  getAttackById: (id: string) => apiFetch<AttackLog>(`/api/attacks/${id}`),
  getMetrics: () => apiFetch<MetricsResponse>("/api/metrics"),
  getChart: () => apiFetch<{ data: ChartPoint[] }>("/api/chart"),
  getReplay: (sessionId: string) => apiFetch<{ frames: ReplayFrame[] }>(`/api/replay/${sessionId}`),
  getHoneypotRecent: () => apiFetch<{ items: Array<{ ts: string; severity: Severity; summary: string }> }>("/api/honeypot/recent"),
  exportAttacksCsv: () => apiFetch<string>("/api/attacks/export", { headers: { Accept: "text/csv" } }).then(() => ""),
  getCriticalAlerts: () => apiFetch<{ count24h: number; items: AttackLog[] }>("/api/alerts/critical"),
  getHoneypotStatus: () => apiFetch<{ status: string; collecting: boolean; uptimeSec: number; captures24h: number }>("/api/honeypot/status"),
  exportHoneypotCsv: () => apiFetch<string>("/api/honeypot/export", { headers: { Accept: "text/csv" } }).then(() => ""),
  generateHoneypotReport: () => apiFetch<{ markdown: string }>("/api/honeypot/report", { method: "POST" }),
  generateAttackSummary: (id: string) => apiFetch<{ markdown: string }>(`/api/attacks/${id}/summary`, { method: "POST" }),
};


