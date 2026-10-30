import { describe, expect, it, vi } from "vitest";
import type { Integration } from "@/lib/cookie-consent/config";
import { applyConsent, shownCategories } from "@/lib/cookie-consent/integrations";
import { createConsentRecord, type ConsentChoices } from "@/lib/cookie-consent/storage";

// Test-only integrations. The production registry in config.ts is empty.
function fakeIntegration(overrides: Partial<Integration> = {}): Integration & { load: ReturnType<typeof vi.fn> } {
  return {
    id: "test-analytics",
    name: "Test analytics",
    category: "analytics",
    cookieNames: ["test_analytics_id"],
    load: vi.fn(),
    ...overrides,
  } as Integration & { load: ReturnType<typeof vi.fn> };
}

function record(categories: ConsentChoices) {
  return createConsentRecord(categories, new Date("2026-10-30T12:00:00.000Z"));
}

describe("shownCategories", () => {
  it("is empty when no integration is registered", () => {
    expect(shownCategories([])).toEqual([]);
  });

  it("lists only categories that have an integration, in a fixed order", () => {
    const integrations = [
      fakeIntegration({ id: "m", category: "marketing" }),
      fakeIntegration({ id: "a", category: "analytics" }),
    ];
    expect(shownCategories(integrations)).toEqual(["analytics", "marketing"]);
    expect(shownCategories([fakeIntegration({ category: "marketing" })])).toEqual(["marketing"]);
  });
});

describe("applyConsent", () => {
  it("does not start any integration without a saved choice", () => {
    const integration = fakeIntegration();
    applyConsent(null, [integration], new Set(), vi.fn());
    expect(integration.load).not.toHaveBeenCalled();
  });

  it("does not start an integration when its category is rejected", () => {
    const integration = fakeIntegration();
    applyConsent(record({ analytics: false }), [integration], new Set(), vi.fn());
    expect(integration.load).not.toHaveBeenCalled();
  });

  it("starts an allowed integration exactly once across repeated calls", () => {
    const integration = fakeIntegration();
    const started = new Set<string>();
    applyConsent(record({ analytics: true }), [integration], started, vi.fn());
    applyConsent(record({ analytics: true }), [integration], started, vi.fn());
    expect(integration.load).toHaveBeenCalledTimes(1);
    expect(started.has("test-analytics")).toBe(true);
  });

  it("deletes the cookies of a rejected integration, even if it never ran", () => {
    const removeCookie = vi.fn();
    applyConsent(record({ analytics: false }), [fakeIntegration()], new Set(), removeCookie);
    expect(removeCookie).toHaveBeenCalledWith("test_analytics_id");
  });

  it("requires a reload when consent is withdrawn from an integration that is already running", () => {
    const integration = fakeIntegration();
    const started = new Set<string>();
    applyConsent(record({ analytics: true }), [integration], started, vi.fn());

    const removeCookie = vi.fn();
    const result = applyConsent(record({ analytics: false }), [integration], started, removeCookie);

    expect(result.reloadRequired).toBe(true);
    expect(removeCookie).toHaveBeenCalledWith("test_analytics_id");
  });

  it("does not require a reload when a never-started integration is rejected", () => {
    const result = applyConsent(record({ analytics: false }), [fakeIntegration()], new Set(), vi.fn());
    expect(result.reloadRequired).toBe(false);
  });

  it("treats a missing category answer as not allowed", () => {
    const integration = fakeIntegration();
    applyConsent(record({}), [integration], new Set(), vi.fn());
    expect(integration.load).not.toHaveBeenCalled();
  });
});
