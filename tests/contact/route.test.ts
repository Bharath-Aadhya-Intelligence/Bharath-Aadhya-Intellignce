import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";

// Mock the Resend SDK so tests never reach the network or need a real key.
const { sendMock, resendConstructor } = vi.hoisted(() => ({
  sendMock: vi.fn(),
  resendConstructor: vi.fn(),
}));

vi.mock("resend", () => ({
  Resend: class {
    emails = { send: sendMock };
    constructor(key: string) {
      resendConstructor(key);
    }
  },
}));

import { handleContactRequest } from "@/lib/contact/handler";
import { resetRateLimitForTests } from "@/lib/contact/rate-limit";
import apiHandler, { config } from "../../api/contact";

const SITE_ORIGIN = "https://bharath-aadhya-intelligence.github.io";

const validBody = {
  fullName: "Asha Rao",
  email: "asha.rao@example.com",
  phone: "+91 98765 43210",
  projectType: "AI / LLM Research",
  details: "We want to fine-tune a small Indian-language model for customer support.",
};

const TEST_API_KEY = "re_test_key_for_unit_tests_only";

function makeRequest(
  body: unknown,
  headers: Record<string, string> = {},
  rawBody?: string,
  method = "POST"
) {
  return new Request("https://api.example.test/api/contact", {
    method,
    headers: {
      "content-type": "application/json",
      origin: SITE_ORIGIN,
      "x-forwarded-for": "198.51.100.7",
      ...headers,
    },
    body: method === "POST" ? rawBody ?? JSON.stringify(body) : undefined,
  });
}

async function post(body: unknown, headers?: Record<string, string>, rawBody?: string) {
  const response = await handleContactRequest(makeRequest(body, headers, rawBody));
  const json = await response.json();
  return { status: response.status, json, response };
}

beforeEach(() => {
  vi.stubEnv("RESEND_API_KEY", TEST_API_KEY);
  vi.stubEnv("CONTACT_TO_EMAIL", "bharathaadhyaintelligence@gmail.com");
  vi.stubEnv("CONTACT_FROM_EMAIL", "BAI Notifications <notifications@verified-domain.test>");
  vi.stubEnv("ALLOWED_ORIGINS", SITE_ORIGIN);
  sendMock.mockReset();
  sendMock.mockResolvedValue({ data: { id: "msg_test_123" }, error: null });
  resendConstructor.mockReset();
  resetRateLimitForTests();
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "info").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("edge function entry point", () => {
  it("is configured for the Edge runtime and exports a Web-standard handler", () => {
    expect(config).toEqual({ runtime: "edge" });
    expect(typeof apiHandler).toBe("function");
  });
});

describe("CORS: only the website origin may call the API", () => {
  it("returns the exact requesting origin in Access-Control-Allow-Origin, never a wildcard", async () => {
    const { response } = await post(validBody);
    expect(response.headers.get("access-control-allow-origin")).toBe(SITE_ORIGIN);
    expect(response.headers.get("vary")).toBe("Origin");
  });

  it("answers the preflight for the website origin with 204 and the allowed methods", async () => {
    const response = await handleContactRequest(makeRequest(null, {}, undefined, "OPTIONS"));
    expect(response.status).toBe(204);
    expect(response.headers.get("access-control-allow-origin")).toBe(SITE_ORIGIN);
    expect(response.headers.get("access-control-allow-methods")).toContain("POST");
    expect(response.headers.get("access-control-allow-headers")).toContain("Content-Type");
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("refuses requests from any other origin without CORS headers", async () => {
    const response = await handleContactRequest(
      makeRequest(validBody, { origin: "https://evil.example" })
    );
    expect(response.status).toBe(403);
    expect(response.headers.get("access-control-allow-origin")).toBeNull();
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("refuses the preflight from other origins", async () => {
    const response = await handleContactRequest(
      makeRequest(null, { origin: "https://evil.example" }, undefined, "OPTIONS")
    );
    expect(response.status).toBe(403);
    expect(response.headers.get("access-control-allow-origin")).toBeNull();
  });

  it("refuses requests that have no Origin header", async () => {
    const response = await handleContactRequest(
      new Request("https://api.example.test/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(validBody),
      })
    );
    expect(response.status).toBe(403);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("does not match a different subdomain or scheme of the same site", async () => {
    for (const origin of [
      "http://bharath-aadhya-intelligence.github.io",
      "https://evil.bharath-aadhya-intelligence.github.io",
      "https://bharath-aadhya-intelligence.github.io.evil.example",
    ]) {
      const response = await handleContactRequest(makeRequest(validBody, { origin }));
      expect(response.status).toBe(403);
    }
  });

  it("refuses everything when ALLOWED_ORIGINS is unset", async () => {
    vi.stubEnv("ALLOWED_ORIGINS", "");
    const { status } = await post(validBody);
    expect(status).toBe(403);
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining("ALLOWED_ORIGINS is not set"));
  });

  it("accepts a config entry with a trailing slash or path, and multiple origins", async () => {
    vi.stubEnv("ALLOWED_ORIGINS", `https://other.example, ${SITE_ORIGIN}/`);
    const { status, response } = await post(validBody);
    expect(status).toBe(200);
    expect(response.headers.get("access-control-allow-origin")).toBe(SITE_ORIGIN);
  });

  it("rejects non-HTTPS origins in the config except localhost for local testing", async () => {
    vi.stubEnv("ALLOWED_ORIGINS", "http://bharath-aadhya-intelligence.github.io");
    const { status } = await post(validBody);
    expect(status).toBe(403);

    vi.stubEnv("ALLOWED_ORIGINS", "http://localhost:3000");
    const local = await post(validBody, { origin: "http://localhost:3000" });
    expect(local.status).toBe(200);
  });

  it("includes CORS headers on error responses so the browser can show the message", async () => {
    const { response } = await post({});
    expect(response.status).toBe(400);
    expect(response.headers.get("access-control-allow-origin")).toBe(SITE_ORIGIN);
  });
});

describe("POST /api/contact: success", () => {
  it("sends the notification and returns a reference ID", async () => {
    const { status, json } = await post(validBody);

    expect(status).toBe(200);
    expect(json.ok).toBe(true);
    expect(json.referenceId).toMatch(/^BAI-\d{8}-[0-9A-F]{8}$/);
    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(resendConstructor).toHaveBeenCalledWith(TEST_API_KEY);
  });

  it("uses the configured addresses and sets Reply-To to the visitor", async () => {
    await post(validBody);
    const payload = sendMock.mock.calls[0][0];

    expect(payload.to).toEqual(["bharathaadhyaintelligence@gmail.com"]);
    expect(payload.from).toBe("BAI Notifications <notifications@verified-domain.test>");
    expect(payload.replyTo).toBe("asha.rao@example.com");
    expect(payload.subject).toBe("New Project Inquiry | Bharath Aadhya Intelligence");
    expect(payload.html).toContain("<!DOCTYPE html>");
    expect(payload.text).toContain("NEW PROJECT INQUIRY");
  });

  it("never returns the API key or provider details to the browser", async () => {
    const { json } = await post(validBody);
    expect(JSON.stringify(json)).not.toContain(TEST_API_KEY);
    expect(JSON.stringify(json)).not.toContain("msg_test_123");
  });
});

describe("POST /api/contact: validation", () => {
  it("returns field errors for missing required fields", async () => {
    const { status, json } = await post({});

    expect(status).toBe(400);
    expect(json.ok).toBe(false);
    expect(Object.keys(json.fieldErrors).sort()).toEqual(
      ["details", "email", "fullName", "phone", "projectType"].sort()
    );
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rejects invalid email addresses without sending", async () => {
    const { status, json } = await post({ ...validBody, email: "not-an-email" });
    expect(status).toBe(400);
    expect(json.fieldErrors.email).toBeDefined();
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rejects project types that the form does not offer", async () => {
    const { status, json } = await post({ ...validBody, projectType: "Free Money" });
    expect(status).toBe(400);
    expect(json.fieldErrors.projectType).toBeDefined();
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rejects excessively long project details", async () => {
    const { status, json } = await post({ ...validBody, details: "x".repeat(3001) });
    expect(status).toBe(400);
    expect(json.fieldErrors.details).toBeDefined();
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("escapes malicious HTML in project details before it reaches the email", async () => {
    const { status } = await post({
      ...validBody,
      details: 'Please call me <img src=x onerror="alert(1)"> <script>steal()</script> about this project.',
    });

    expect(status).toBe(200);
    const html: string = sendMock.mock.calls[0][0].html;
    expect(html).not.toContain("<script>");
    expect(html).not.toContain("<img");
    expect(html).toContain("&lt;script&gt;steal()&lt;/script&gt;");
  });

  it("rejects non-object JSON payloads", async () => {
    const { status } = await post(["not", "an", "object"]);
    expect(status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rejects malformed JSON", async () => {
    const { status, json } = await post(null, undefined, "{not json");
    expect(status).toBe(400);
    expect(json.error).toBe("Invalid request.");
  });

  it("rejects non-JSON content types", async () => {
    const response = await handleContactRequest(
      new Request("https://api.example.test/api/contact", {
        method: "POST",
        headers: { "content-type": "text/plain", origin: SITE_ORIGIN, "x-forwarded-for": "198.51.100.8" },
        body: JSON.stringify(validBody),
      })
    );
    expect(response.status).toBe(415);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rejects request bodies over the size limit", async () => {
    const { status, json } = await post(null, undefined, JSON.stringify({ ...validBody, details: "x".repeat(20_000) }));
    expect(status).toBe(413);
    expect(json.ok).toBe(false);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rejects methods other than POST and OPTIONS", async () => {
    const response = await handleContactRequest(
      new Request("https://api.example.test/api/contact", { method: "GET", headers: { origin: SITE_ORIGIN } })
    );
    expect(response.status).toBe(405);
    expect(response.headers.get("allow")).toBe("POST, OPTIONS");
  });
});

describe("POST /api/contact: spam protection", () => {
  it("silently accepts submissions that fill the honeypot without sending email", async () => {
    const { status, json } = await post({ ...validBody, fax_number: "+1 555 0100" });

    expect(status).toBe(200);
    expect(json.ok).toBe(true);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rate limits repeated submissions from one client", async () => {
    for (let i = 0; i < 6; i += 1) {
      const { status } = await post(validBody);
      expect(status).toBe(200);
    }

    const blocked = await post(validBody);
    expect(blocked.status).toBe(429);
    expect(blocked.response.headers.get("retry-after")).toMatch(/^\d+$/);
    expect(sendMock).toHaveBeenCalledTimes(6);
  });

  it("tracks rate limits per client address", async () => {
    for (let i = 0; i < 6; i += 1) {
      await post(validBody);
    }
    const otherClient = await post(validBody, { "x-forwarded-for": "203.0.113.99" });
    expect(otherClient.status).toBe(200);
  });
});

describe("POST /api/contact: email provider failures", () => {
  it("returns a generic error for authentication failures and hides details", async () => {
    sendMock.mockResolvedValue({
      data: null,
      error: { name: "invalid_api_key", statusCode: 401, message: "API key is invalid" },
    });

    const { status, json } = await post(validBody);

    expect(status).toBe(500);
    expect(json.ok).toBe(false);
    expect(JSON.stringify(json)).not.toMatch(/invalid_api_key|API key|401/);
    expect(console.error).toHaveBeenCalled();
  });

  it("treats a 401 reported as validation_error as an authentication failure", async () => {
    sendMock.mockResolvedValue({
      data: null,
      error: { name: "validation_error", statusCode: 401, message: "API key is invalid" },
    });

    const { status, json } = await post(validBody);
    expect(status).toBe(500);
    expect(json.ok).toBe(false);
    expect(JSON.stringify(json)).not.toContain("API key");
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining("reason=auth"));
  });

  it("does not claim success when the provider rejects the sender domain", async () => {
    sendMock.mockResolvedValue({
      data: null,
      error: { name: "invalid_from_address", statusCode: 403, message: "domain not verified" },
    });

    const { status, json } = await post(validBody);
    expect(status).toBe(500);
    expect(json.ok).toBe(false);
  });

  it("returns a retryable status when the provider rate limit is reached", async () => {
    sendMock.mockResolvedValue({
      data: null,
      error: { name: "rate_limit_exceeded", statusCode: 429, message: "Too many requests" },
    });

    const { status, json } = await post(validBody);
    expect(status).toBe(503);
    expect(json.ok).toBe(false);
  });

  it("returns a retryable error when the provider returns another error", async () => {
    sendMock.mockResolvedValue({
      data: null,
      error: { name: "application_error", statusCode: 500, message: "boom" },
    });

    const { status, json } = await post(validBody);
    expect(status).toBe(502);
    expect(json.error).not.toContain("boom");
  });

  it("returns a retryable error when the network call throws", async () => {
    sendMock.mockRejectedValue(new Error("socket hang up"));

    const { status, json } = await post(validBody);
    expect(status).toBe(502);
    expect(json.ok).toBe(false);
    expect(JSON.stringify(json)).not.toContain("socket hang up");
  });

  it("does not attempt to send when RESEND_API_KEY is missing", async () => {
    vi.stubEnv("RESEND_API_KEY", "");

    const { status, json } = await post(validBody);
    expect(status).toBe(500);
    expect(json.ok).toBe(false);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rejects a sender address that contains header-breaking characters", async () => {
    vi.stubEnv("CONTACT_FROM_EMAIL", "notifications@verified-domain.test\r\nBcc: x@example.com");

    const { status } = await post(validBody);
    expect(status).toBe(500);
    expect(sendMock).not.toHaveBeenCalled();
  });
});
