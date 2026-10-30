// Fixed-window rate limiter keyed by client IP.
//
// Limitation: state lives in this server instance's memory. On serverless
// platforms each instance keeps its own counters, so the effective limit can be
// higher under heavy traffic. For a strict global limit, replace this module's
// store with a shared store (for example Upstash Redis via @upstash/ratelimit).

export type RateLimitResult = { allowed: true } | { allowed: false; retryAfterSeconds: number };

type RateLimitOptions = {
  limit: number;
  windowMs: number;
};

type Bucket = { count: number; resetAt: number };

const MAX_TRACKED_KEYS = 10_000;

// Stored on globalThis so the counters survive hot-module reloads in development.
const globalStore = globalThis as typeof globalThis & { __contactRateLimit?: Map<string, Bucket> };
const buckets = (globalStore.__contactRateLimit ??= new Map<string, Bucket>());

function pruneExpired(now: number): void {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) {
      buckets.delete(key);
    }
  }
}

export function checkRateLimit(key: string, options: RateLimitOptions, now = Date.now()): RateLimitResult {
  if (buckets.size >= MAX_TRACKED_KEYS) {
    pruneExpired(now);
  }

  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + options.windowMs });
    return { allowed: true };
  }

  if (existing.count >= options.limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  return { allowed: true };
}

/** Clears all counters. Intended for tests only. */
export function resetRateLimitForTests(): void {
  buckets.clear();
}
