// Server-only: sends the inquiry notification through Resend.
// Only import this from server code (the backend handler). It reads secrets from
// process.env, which must never reach the browser.

import { Resend } from "resend";
import { buildInquiryEmail } from "./email-template";
import { isValidEmailAddress, type ContactFormValues } from "./schema";

export type SendInquiryResult =
  | { ok: true; messageId: string }
  | { ok: false; reason: SendFailureReason; detail: string };

/**
 * - "config":   missing or invalid environment variables (fix in hosting settings)
 * - "auth":     Resend rejected the API key
 * - "sender":   the sender domain is not verified or the from address is invalid
 * - "rate":     Resend rate or quota limit reached (temporary)
 * - "provider": any other Resend error or network failure (temporary)
 */
export type SendFailureReason = "config" | "auth" | "sender" | "rate" | "provider";

// Error names from the Resend SDK that map to each failure reason.
const RESEND_ERROR_REASONS: Record<string, SendFailureReason> = {
  missing_api_key: "auth",
  invalid_api_key: "auth",
  restricted_api_key: "auth",
  invalid_from_address: "sender",
  rate_limit_exceeded: "rate",
  daily_quota_exceeded: "rate",
  monthly_quota_exceeded: "rate",
};

/**
 * Resend does not always use a specific error name. For example, an invalid API
 * key can come back as "validation_error" with HTTP 401. Fall back to the status code.
 */
function classifyResendError(name: string, statusCode: number | null): SendFailureReason {
  const byName = RESEND_ERROR_REASONS[name];
  if (byName) return byName;
  if (statusCode === 401 || statusCode === 403) return "auth";
  if (statusCode === 429) return "rate";
  return "provider";
}

/** Accepts "address@domain" or "Display Name <address@domain>". Rejects CR/LF and other header-breaking input. */
function parseAddressEnv(name: string): { address: string } | { error: string } {
  const raw = process.env[name]?.trim();
  if (!raw) {
    return { error: `${name} is not set` };
  }

  const match = raw.match(/^([^<>\r\n"]*)<([^<>\r\n]+)>$/);
  const address = (match ? match[2] : raw).trim();

  if (/[\r\n]/.test(raw) || !isValidEmailAddress(address)) {
    return { error: `${name} must be a valid email address` };
  }

  return { address: raw };
}

export function getContactConfig():
  | { ok: true; apiKey: string; to: string; from: string }
  | { ok: false; detail: string } {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return { ok: false, detail: "RESEND_API_KEY is not set" };
  }

  const to = parseAddressEnv("CONTACT_TO_EMAIL");
  if ("error" in to) {
    return { ok: false, detail: to.error };
  }

  const from = parseAddressEnv("CONTACT_FROM_EMAIL");
  if ("error" in from) {
    return { ok: false, detail: from.error };
  }

  return { ok: true, apiKey, to: to.address, from: from.address };
}

export async function sendInquiryEmail(input: {
  values: ContactFormValues;
  referenceId: string;
  submittedAt: Date;
}): Promise<SendInquiryResult> {
  const config = getContactConfig();
  if (!config.ok) {
    return { ok: false, reason: "config", detail: config.detail };
  }

  const { subject, html, text } = buildInquiryEmail(input);
  const resend = new Resend(config.apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: config.from,
      to: [config.to],
      // The visitor's address is only used for Reply-To, so Reply in Gmail goes to the client.
      replyTo: input.values.email,
      subject,
      html,
      text,
    });

    if (error) {
      return {
        ok: false,
        reason: classifyResendError(error.name, error.statusCode),
        detail: `${error.name} (${error.statusCode ?? "no status"}): ${error.message}`,
      };
    }

    return { ok: true, messageId: data.id };
  } catch (err) {
    return {
      ok: false,
      reason: "provider",
      detail: err instanceof Error ? err.message : "unknown error",
    };
  }
}
