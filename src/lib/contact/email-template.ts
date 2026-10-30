// Builds the HTML and plain-text notification email for a new inquiry.
// Pure functions only: no environment access, no network calls.

import type { ContactFormValues } from "./schema";

export const BUSINESS_NAME = "Bharath Aadhya Intelligence";
export const INQUIRY_SUBJECT = "New Project Inquiry | Bharath Aadhya Intelligence";

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Escapes text for safe insertion into HTML element content or attribute values. */
export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);
}

/** Formats a date as e.g. "2026-10-30 14:05:09 UTC". */
export function formatUtc(date: Date): string {
  return `${date.toISOString().replace("T", " ").slice(0, 19)} UTC`;
}

type InquiryEmailInput = {
  values: ContactFormValues;
  referenceId: string;
  submittedAt: Date;
};

type InquiryEmail = {
  subject: string;
  html: string;
  text: string;
};

const STYLES = {
  body: "margin:0;padding:0;background:#f4f4fb;font-family:Arial,Helvetica,sans-serif;color:#1f2937;",
  card: "max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;",
  header: "background:linear-gradient(135deg,#6366f1,#3b82f6);padding:24px 28px;color:#ffffff;",
  section: "padding:20px 28px 0 28px;",
  sectionTitle:
    "margin:0 0 12px 0;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#6366f1;font-weight:bold;",
  row: "padding:10px 0;border-bottom:1px solid #eef0f6;",
  label: "display:block;font-size:12px;color:#6b7280;margin-bottom:2px;",
  value: "display:block;font-size:15px;color:#111827;word-break:break-word;",
  details:
    "margin:0;padding:14px 16px;background:#f8f7ff;border-left:4px solid #6366f1;border-radius:6px;font-size:15px;line-height:1.6;color:#111827;word-break:break-word;white-space:normal;",
  footer: "padding:20px 28px 24px 28px;font-size:12px;color:#9ca3af;text-align:center;",
} as const;

function htmlRow(label: string, value: string): string {
  return `<tr><td style="${STYLES.row}">
          <span style="${STYLES.label}">${escapeHtml(label)}</span>
          <span style="${STYLES.value}">${escapeHtml(value)}</span>
        </td></tr>`;
}

function htmlDetails(details: string): string {
  // Escape first, then convert line breaks. Only our own <br> tags remain as markup.
  const body = escapeHtml(details).replace(/\n/g, "<br />");
  return `<tr><td style="padding:10px 0 4px 0;">
          <span style="${STYLES.label}">Project Details</span>
          <p style="${STYLES.details}">${body}</p>
        </td></tr>`;
}

function htmlSection(title: string, rows: string): string {
  return `<div style="${STYLES.section}">
        <p style="${STYLES.sectionTitle}">${escapeHtml(title)}</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          ${rows}
        </table>
      </div>`;
}

function buildHtml(input: InquiryEmailInput): string {
  const { values, referenceId, submittedAt } = input;

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>${escapeHtml(INQUIRY_SUBJECT)}</title>
  </head>
  <body style="${STYLES.body}">
    <div style="padding:24px 12px;">
      <div style="${STYLES.card}">
        <div style="${STYLES.header}">
          <p style="margin:0 0 6px 0;font-size:12px;letter-spacing:2px;text-transform:uppercase;opacity:0.85;">New Project Inquiry</p>
          <h1 style="margin:0;font-size:22px;line-height:1.3;">${escapeHtml(BUSINESS_NAME)}</h1>
        </div>

        ${htmlSection(
          "Client Information",
          [
            htmlRow("Full Name", values.fullName),
            htmlRow("Business Email", values.email),
            htmlRow("Phone Number", values.phone),
          ].join("\n")
        )}

        ${htmlSection(
          "Project Information",
          [htmlRow("Selected Project Type", values.projectType), htmlDetails(values.details)].join("\n")
        )}

        ${htmlSection(
          "Submission Information",
          [
            htmlRow("Submitted (UTC)", formatUtc(submittedAt)),
            htmlRow("Inquiry Reference ID", referenceId),
          ].join("\n")
        )}

        <div style="${STYLES.footer}">
          Reply directly to this email to contact the client. Their address is set as the Reply-To.
        </div>
      </div>
    </div>
  </body>
</html>`;
}

function buildText(input: InquiryEmailInput): string {
  const { values, referenceId, submittedAt } = input;

  return [
    "NEW PROJECT INQUIRY",
    `Business: ${BUSINESS_NAME}`,
    "",
    "CLIENT INFORMATION",
    `- Full Name: ${values.fullName}`,
    `- Business Email: ${values.email}`,
    `- Phone Number: ${values.phone}`,
    "",
    "PROJECT INFORMATION",
    `- Selected Project Type: ${values.projectType}`,
    "- Project Details:",
    values.details,
    "",
    "SUBMISSION INFORMATION",
    `- Submission date and time (UTC): ${formatUtc(submittedAt)}`,
    `- Inquiry Reference ID: ${referenceId}`,
    "",
    "Reply directly to this email to contact the client. Their address is set as the Reply-To.",
  ].join("\n");
}

/** Returns the subject, HTML, and plain-text bodies for an accepted inquiry. */
export function buildInquiryEmail(input: InquiryEmailInput): InquiryEmail {
  return {
    subject: INQUIRY_SUBJECT,
    html: buildHtml(input),
    text: buildText(input),
  };
}
