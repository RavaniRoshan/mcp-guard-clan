const STORAGE_KEYS = {
  apiBase: "mcp_guardian_api_base",
  apiKey: "mcp_guardian_api_key",
};

export function getApiBase(): string {
  const fromEnv = import.meta.env.VITE_API_BASE_URL as string | undefined;
  const fromStorage = typeof localStorage !== "undefined" ? localStorage.getItem(STORAGE_KEYS.apiBase) || undefined : undefined;
  return (fromStorage || fromEnv || "").trim();
}

export function setApiBase(url: string) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.apiBase, url.trim());
}

export function getApiKey(): string {
  const fromStorage = typeof localStorage !== "undefined" ? localStorage.getItem(STORAGE_KEYS.apiKey) || "" : "";
  return fromStorage.trim();
}

export function setApiKey(key: string) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.apiKey, key.trim());
}


