// CORS policy for the inquiry API. Only origins listed in ALLOWED_ORIGINS may call
// it from a browser. Nothing else gets an Access-Control-Allow-Origin header, so the
// browser refuses to hand the response to any other website.

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1"]);

/**
 * Parses a comma-separated list such as
 * "https://bharath-aadhya-intelligence.github.io,https://www.example.com".
 * Each entry is reduced to its origin (scheme + host + port), so a trailing slash
 * or path in the config does not break matching. Invalid entries are ignored.
 * Plain http is accepted only for localhost, for local testing.
 */
export function parseAllowedOrigins(raw: string | undefined): string[] {
  if (!raw) return [];

  const origins = new Set<string>();
  for (const entry of raw.split(",")) {
    const trimmed = entry.trim();
    if (!trimmed) continue;

    let url: URL;
    try {
      url = new URL(trimmed);
    } catch {
      continue;
    }

    const secure = url.protocol === "https:";
    const localDev = url.protocol === "http:" && LOCAL_HOSTS.has(url.hostname);
    if (!secure && !localDev) continue;

    origins.add(url.origin);
  }
  return [...origins];
}

export type CorsDecision =
  | { allowed: true; headers: Record<string, string> }
  | { allowed: false };

/**
 * Decides whether a request may proceed. A missing Origin header is rejected too.
 * Browsers always send Origin on cross-origin POST requests, so this only blocks
 * direct calls that do not come from the website.
 */
export function resolveCors(requestOrigin: string | null, allowedOriginsRaw: string | undefined): CorsDecision {
  if (!requestOrigin) return { allowed: false };

  const allowedOrigins = parseAllowedOrigins(allowedOriginsRaw);
  if (!allowedOrigins.includes(requestOrigin)) return { allowed: false };

  return {
    allowed: true,
    headers: {
      "Access-Control-Allow-Origin": requestOrigin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "600",
      Vary: "Origin",
    },
  };
}
