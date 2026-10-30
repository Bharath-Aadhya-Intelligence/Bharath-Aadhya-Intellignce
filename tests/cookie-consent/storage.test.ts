import { describe, expect, it } from "vitest";
import {
  COOKIE_CONSENT_MAX_AGE_DAYS,
  COOKIE_CONSENT_STORAGE_KEY,
  COOKIE_CONSENT_VERSION,
} from "@/lib/cookie-consent/config";
import {
  createConsentRecord,
  hasCompleteChoice,
  parseConsentRecord,
  readConsent,
  writeConsent,
  type KeyValueStorage,
} from "@/lib/cookie-consent/storage";

const NOW = Date.parse("2026-10-30T12:00:00.000Z");
const DAY_MS = 24 * 60 * 60 * 1000;

function validRaw(overrides: Record<string, unknown> = {}): string {
  return JSON.stringify({
    version: COOKIE_CONSENT_VERSION,
    timestamp: new Date(NOW - DAY_MS).toISOString(),
    categories: { analytics: true },
    ...overrides,
  });
}

function memoryStorage(initial: Record<string, string> = {}): KeyValueStorage & { data: Map<string, string> } {
  const data = new Map(Object.entries(initial));
  return {
    data,
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => void data.set(key, value),
    removeItem: (key) => void data.delete(key),
  };
}

describe("parseConsentRecord", () => {
  it("accepts a current, unexpired record", () => {
    const record = parseConsentRecord(validRaw(), NOW);
    expect(record).not.toBeNull();
    expect(record?.categories).toEqual({ analytics: true });
  });

  it("returns null for missing or unparseable values", () => {
    expect(parseConsentRecord(null, NOW)).toBeNull();
    expect(parseConsentRecord("", NOW)).toBeNull();
    expect(parseConsentRecord("{not json", NOW)).toBeNull();
    expect(parseConsentRecord("[]", NOW)).toBeNull();
    expect(parseConsentRecord("null", NOW)).toBeNull();
  });

  it("rejects a record from another consent version", () => {
    expect(parseConsentRecord(validRaw({ version: COOKIE_CONSENT_VERSION + 1 }), NOW)).toBeNull();
    expect(parseConsentRecord(validRaw({ version: undefined }), NOW)).toBeNull();
  });

  it("rejects an expired record", () => {
    const expired = new Date(NOW - (COOKIE_CONSENT_MAX_AGE_DAYS + 1) * DAY_MS).toISOString();
    expect(parseConsentRecord(validRaw({ timestamp: expired }), NOW)).toBeNull();
  });

  it("rejects a bad timestamp", () => {
    expect(parseConsentRecord(validRaw({ timestamp: "yesterday" }), NOW)).toBeNull();
    expect(parseConsentRecord(validRaw({ timestamp: 12345 }), NOW)).toBeNull();
  });

  it("rejects unknown categories and non-boolean values", () => {
    expect(parseConsentRecord(validRaw({ categories: { fingerprinting: true } }), NOW)).toBeNull();
    expect(parseConsentRecord(validRaw({ categories: { analytics: "yes" } }), NOW)).toBeNull();
    expect(parseConsentRecord(validRaw({ categories: [] }), NOW)).toBeNull();
  });
});

describe("hasCompleteChoice", () => {
  it("is false when there is no record", () => {
    expect(hasCompleteChoice(null, [])).toBe(false);
  });

  it("is true when every shown category has an answer, including when none are shown", () => {
    const record = parseConsentRecord(validRaw({ categories: { analytics: false } }), NOW);
    expect(hasCompleteChoice(record, [])).toBe(true);
    expect(hasCompleteChoice(record, ["analytics"])).toBe(true);
  });

  it("is false when a shown category was never answered, so the visitor is asked again", () => {
    const record = parseConsentRecord(validRaw({ categories: { analytics: false } }), NOW);
    expect(hasCompleteChoice(record, ["analytics", "marketing"])).toBe(false);
  });
});

describe("readConsent and writeConsent", () => {
  it("round-trips a saved choice", () => {
    const storage = memoryStorage();
    const record = createConsentRecord({ analytics: false }, new Date(NOW));
    expect(writeConsent(storage, record)).toBe(true);
    expect(readConsent(storage, NOW)).toEqual(record);
  });

  it("stores the timestamp and version with the choice", () => {
    const storage = memoryStorage();
    writeConsent(storage, createConsentRecord({}, new Date(NOW)));
    const stored = JSON.parse(storage.data.get(COOKIE_CONSENT_STORAGE_KEY) ?? "{}");
    expect(stored).toEqual({
      version: COOKIE_CONSENT_VERSION,
      timestamp: new Date(NOW).toISOString(),
      categories: {},
    });
  });

  it("removes an invalid entry so it is not read again", () => {
    const storage = memoryStorage({ [COOKIE_CONSENT_STORAGE_KEY]: "{broken" });
    expect(readConsent(storage, NOW)).toBeNull();
    expect(storage.data.has(COOKIE_CONSENT_STORAGE_KEY)).toBe(false);
  });

  it("returns null and does not throw when storage is blocked", () => {
    const blocked: KeyValueStorage = {
      getItem: () => {
        throw new DOMException("Blocked", "SecurityError");
      },
      setItem: () => {
        throw new DOMException("Quota exceeded", "QuotaExceededError");
      },
      removeItem: () => {
        throw new DOMException("Blocked", "SecurityError");
      },
    };
    expect(readConsent(blocked, NOW)).toBeNull();
    expect(writeConsent(blocked, createConsentRecord({}, new Date(NOW)))).toBe(false);
  });
});
