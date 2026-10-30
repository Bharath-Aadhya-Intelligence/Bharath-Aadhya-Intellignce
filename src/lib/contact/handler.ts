// Request handler for POST /api/contact on the backend host (Vercel).
// Runs on the Web-standard Request/Response API so it works on the Edge runtime.

import { checkRateLimit } from "./rate-limit";
import { resolveCors } from "./cors";
import { sendInquiryEmail, type SendFailureReason } from "./send-inquiry";
import { validateContactForm } from "./schema";

const MAX_BODY_BYTES = 16 * 1024;
const RATE_LIMIT = { limit: 6, windowMs: 10 * 60 * 1000 };

// Hidden honeypot field. Real visitors never see or fill it. The name is chosen
// so browser autofill is unlikely to populate it.
const HONEYPOT_FIELD = "fax_number";

// Messages are deliberately generic. Provider details go to the server log only.
const FAILURE_RESPONSES: Record<SendFailureReason, { status: number; error: string }> = {
  config: {
    status: 500,
    error: "We could not send your inquiry right now. Please try again later.",
  },
  auth: {
    status: 500,
    error: "We could not send your inquiry right now. Please try again later.",
  },
  sender: {
    status: 500,
    error: "We could not send your inquiry right now. Please try again later.",
  },
  rate: {
    status: 503,
    error: "We are receiving a high volume of inquiries. Please try again in a few minutes.",
  },
  provider: {
    status: 502,
    error: "We could not send your inquiry right now. Please try again.",
  },
};

function jsonResponse(
  body: Record<string, unknown>,
  status: number,
  headers: Record<string, string> = {}
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

function clientIp(request: Request): string {
  // The platform sets the forwarded address. Use the first entry as the visitor's IP.
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip")?.trim() || "unknown";
}

/** Example: BAI-20261030-3F9A1C2B. Unique per accepted submission. */
function createReferenceId(now: Date): string {
  const day = now.toISOString().slice(0, 10).replace(/-/g, "");
  const hex = Array.from(crypto.getRandomValues(new Uint8Array(4)), (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");
  return `BAI-${day}-${hex.toUpperCase()}`;
}

export async function handleContactRequest(request: Request): Promise<Response> {
  const cors = resolveCors(request.headers.get("origin"), process.env.ALLOWED_ORIGINS);
  if (!cors.allowed) {
    // No CORS headers here, so the browser will not expose this response to other sites.
    if (!process.env.ALLOWED_ORIGINS?.trim()) {
      console.error("[contact] ALLOWED_ORIGINS is not set; all requests are refused");
    }
    return jsonResponse(
      { ok: false, error: "This form can only be submitted from the Bharath Aadhya Intelligence website." },
      403
    );
  }

  const corsHeaders = cors.headers;

  // Browser preflight check before the actual POST.
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return jsonResponse({ ok: false, error: "Method not allowed." }, 405, {
      ...corsHeaders,
      Allow: "POST, OPTIONS",
    });
  }

  const rate = checkRateLimit(clientIp(request), RATE_LIMIT);
  if (!rate.allowed) {
    return jsonResponse(
      { ok: false, error: "Too many requests. Please wait a few minutes and try again." },
      429,
      { ...corsHeaders, "Retry-After": String(rate.retryAfterSeconds) }
    );
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return jsonResponse({ ok: false, error: "Unsupported request format." }, 415, corsHeaders);
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return jsonResponse({ ok: false, error: "The submitted information is too large." }, 413, corsHeaders);
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return jsonResponse({ ok: false, error: "Invalid request." }, 400, corsHeaders);
  }
  if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
    return jsonResponse({ ok: false, error: "The submitted information is too large." }, 413, corsHeaders);
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return jsonResponse({ ok: false, error: "Invalid request." }, 400, corsHeaders);
  }

  if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
    return jsonResponse({ ok: false, error: "Invalid request." }, 400, corsHeaders);
  }

  // Honeypot: report success to the bot but send nothing.
  if ((payload as Record<string, unknown>)[HONEYPOT_FIELD]) {
    return jsonResponse({ ok: true }, 200, corsHeaders);
  }

  const validation = validateContactForm(payload);
  if (!validation.ok) {
    return jsonResponse(
      {
        ok: false,
        error: "Please correct the highlighted fields and try again.",
        fieldErrors: validation.errors,
      },
      400,
      corsHeaders
    );
  }

  const submittedAt = new Date();
  const referenceId = createReferenceId(submittedAt);

  const sent = await sendInquiryEmail({
    values: validation.data,
    referenceId,
    submittedAt,
  });

  if (!sent.ok) {
    // Log the reference and failure type only. Never log the inquiry content.
    console.error(`[contact] email not sent ref=${referenceId} reason=${sent.reason} detail=${sent.detail}`);
    const failure = FAILURE_RESPONSES[sent.reason];
    return jsonResponse({ ok: false, error: failure.error }, failure.status, corsHeaders);
  }

  console.info(`[contact] email accepted by provider ref=${referenceId} id=${sent.messageId}`);
  return jsonResponse({ ok: true, referenceId }, 200, corsHeaders);
}
