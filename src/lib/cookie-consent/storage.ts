// Saves and reads the visitor's cookie choice. Stores only what is needed to remember it.
// Every storage call is wrapped, because localStorage can be blocked or full (private mode, strict settings).

import {
  COOKIE_CONSENT_MAX_AGE_DAYS,
  COOKIE_CONSENT_STORAGE_KEY,
  COOKIE_CONSENT_VERSION,
  OPTIONAL_CATEGORIES,
  type OptionalCategory,
} from "./config";

export type ConsentChoices = Partial<Record<OptionalCategory, boolean>>;

export type ConsentRecord = {
  version: number;
  /** ISO 8601 time the choice was saved. */
  timestamp: string;
  /** Only the categories that were offered to the visitor are stored. */
  categories: ConsentChoices;
};

export type KeyValueStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;

const MAX_AGE_MS = COOKIE_CONSENT_MAX_AGE_DAYS * 24 * 60 * 60 * 1000;

export function createConsentRecord(categories: ConsentChoices, now: Date = new Date()): ConsentRecord {
  return {
    version: COOKIE_CONSENT_VERSION,
    timestamp: now.toISOString(),
    categories,
  };
}

/** Returns the record, or null when the raw value is missing, malformed, from another version, or expired. */
export function parseConsentRecord(raw: string | null, nowMs: number): ConsentRecord | null {
  if (!raw) return null;

  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return null;
  }
  if (typeof data !== "object" || data === null || Array.isArray(data)) return null;

  const { version, timestamp, categories } = data as Record<string, unknown>;
  if (version !== COOKIE_CONSENT_VERSION) return null;
  if (typeof timestamp !== "string") return null;

  const savedAtMs = Date.parse(timestamp);
  if (Number.isNaN(savedAtMs) || nowMs - savedAtMs >= MAX_AGE_MS) return null;

  if (typeof categories !== "object" || categories === null || Array.isArray(categories)) return null;

  const parsed: ConsentChoices = {};
  for (const [key, value] of Object.entries(categories)) {
    if (!(OPTIONAL_CATEGORIES as readonly string[]).includes(key) || typeof value !== "boolean") return null;
    parsed[key as OptionalCategory] = value;
  }

  return { version: COOKIE_CONSENT_VERSION, timestamp, categories: parsed };
}

/**
 * True when the saved choice answers every category shown now. If a category is added
 * later, the saved choice is incomplete and the visitor is asked again.
 */
export function hasCompleteChoice(record: ConsentRecord | null, shownCategories: OptionalCategory[]): boolean {
  if (!record) return false;
  return shownCategories.every((category) => typeof record.categories[category] === "boolean");
}

/** Reads the saved choice. Invalid or expired entries are removed on a best-effort basis. */
export function readConsent(storage: KeyValueStorage, nowMs: number = Date.now()): ConsentRecord | null {
  let raw: string | null;
  try {
    raw = storage.getItem(COOKIE_CONSENT_STORAGE_KEY);
  } catch {
    return null;
  }

  const record = parseConsentRecord(raw, nowMs);
  if (!record && raw !== null) {
    try {
      storage.removeItem(COOKIE_CONSENT_STORAGE_KEY);
    } catch {
      // Nothing more to do. The entry is ignored on every read anyway.
    }
  }
  return record;
}

/** Returns false when the choice could not be saved. The caller still applies it for the current page view. */
export function writeConsent(storage: KeyValueStorage, record: ConsentRecord): boolean {
  try {
    storage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(record));
    return true;
  } catch {
    return false;
  }
}

/** The browser's localStorage, or null when it is unavailable (for example during static prerendering). */
export function getBrowserStorage(): KeyValueStorage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}
