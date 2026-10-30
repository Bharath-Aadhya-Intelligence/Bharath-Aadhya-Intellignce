// Shared validation for the Project Inquiry form.
// This file is imported by both the client component and the backend handler, so it
// must stay free of server-only code and secrets. The server always re-runs it.

export const PROJECT_TYPES = [
  "Website Development",
  "Mobile App Development",
  "AI / LLM Research",
  "Product Incubation",
  "Custom AI Integration",
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];

export const CONTACT_LIMITS = {
  fullNameMin: 2,
  fullNameMax: 100,
  emailMax: 254,
  phoneMax: 25,
  phoneMinDigits: 7,
  phoneMaxDigits: 15,
  detailsMin: 10,
  detailsMax: 3000,
} as const;

export type ContactFormValues = {
  fullName: string;
  email: string;
  phone: string;
  projectType: string;
  details: string;
};

export type ContactFieldErrors = Partial<Record<keyof ContactFormValues, string>>;

export type ContactValidationResult =
  | { ok: true; data: ContactFormValues }
  | { ok: false; errors: ContactFieldErrors };

// Control characters (except tab, LF, CR) and bidi/zero-width characters that
// can be used to disguise or reorder text.
const DISALLOWED_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u200B-\u200F\u202A-\u202E\u2066-\u2069\uFEFF]/g;

// Letters (any script), combining marks, spaces, apostrophes, periods and hyphens.
const NAME_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M}' ’.-]*$/u;

// Practical email syntax check (RFC 5322 subset). Rejects whitespace, quotes,
// and angle brackets, which also keeps CR/LF out of header values.
const EMAIL_PATTERN =
  /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@([A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,63}$/;

// Optional leading "+", then digits with common separators. Works for any country.
const PHONE_PATTERN = /^\+?[0-9 ().-]+$/;

function stripDisallowed(value: string): string {
  return value.replace(DISALLOWED_CHARS, "");
}

/** Single-line field: removes control characters and collapses whitespace. */
export function normalizeLine(value: string): string {
  return stripDisallowed(value).replace(/\s+/g, " ").trim();
}

/** Multi-line field: keeps line breaks, normalizes them, and trims excess blank lines. */
export function normalizeMultiline(value: string): string {
  return stripDisallowed(value)
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/g, "").replace(/^[ \t]+/g, ""))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function isValidEmailAddress(value: string): boolean {
  if (value.length > CONTACT_LIMITS.emailMax) return false;
  // RFC 5321: the local part (before "@") may be at most 64 characters.
  const localPartLength = value.indexOf("@");
  if (localPartLength < 1 || localPartLength > 64) return false;
  return EMAIL_PATTERN.test(value);
}

export function isProjectType(value: string): value is ProjectType {
  return (PROJECT_TYPES as readonly string[]).includes(value);
}

/**
 * Validates and sanitizes raw form input. Accepts `unknown` because the server
 * receives untrusted JSON; non-string values are rejected as invalid.
 */
export function validateContactForm(input: unknown): ContactValidationResult {
  const source: Record<string, unknown> =
    typeof input === "object" && input !== null ? (input as Record<string, unknown>) : {};
  const errors: ContactFieldErrors = {};

  const raw = {
    fullName: typeof source.fullName === "string" ? source.fullName : "",
    email: typeof source.email === "string" ? source.email : "",
    phone: typeof source.phone === "string" ? source.phone : "",
    projectType: typeof source.projectType === "string" ? source.projectType : "",
    details: typeof source.details === "string" ? source.details : "",
  };

  // Full name
  const fullName = normalizeLine(raw.fullName);
  if (!fullName) {
    errors.fullName = "Please enter your full name.";
  } else if (fullName.length < CONTACT_LIMITS.fullNameMin) {
    errors.fullName = `Your name must be at least ${CONTACT_LIMITS.fullNameMin} characters.`;
  } else if (fullName.length > CONTACT_LIMITS.fullNameMax) {
    errors.fullName = `Your name must be ${CONTACT_LIMITS.fullNameMax} characters or fewer.`;
  } else if (!NAME_PATTERN.test(fullName)) {
    errors.fullName = "Please use letters, spaces, apostrophes, periods or hyphens only.";
  }

  // Business email
  const email = raw.email.trim();
  if (!email) {
    errors.email = "Please enter your business email address.";
  } else if (email.length > CONTACT_LIMITS.emailMax || !isValidEmailAddress(email)) {
    errors.email = "Please enter a valid email address.";
  }

  // Phone number (international, including Indian formats such as +91 98765 43210)
  const phone = normalizeLine(raw.phone);
  const phoneDigits = phone.replace(/\D/g, "").length;
  if (!phone) {
    errors.phone = "Please enter your phone number.";
  } else if (phone.length > CONTACT_LIMITS.phoneMax || !PHONE_PATTERN.test(phone)) {
    errors.phone = "Please enter a valid phone number (digits, spaces, +, -, ( ) only).";
  } else if (
    phoneDigits < CONTACT_LIMITS.phoneMinDigits ||
    phoneDigits > CONTACT_LIMITS.phoneMaxDigits
  ) {
    errors.phone = `A phone number must contain ${CONTACT_LIMITS.phoneMinDigits} to ${CONTACT_LIMITS.phoneMaxDigits} digits.`;
  }

  // Project type must be one of the options the form offers
  const projectType = raw.projectType.trim();
  if (!projectType) {
    errors.projectType = "Please select a project type.";
  } else if (!isProjectType(projectType)) {
    errors.projectType = "Please select one of the listed project types.";
  }

  // Project details
  const details = normalizeMultiline(raw.details);
  if (!details) {
    errors.details = "Please describe your project.";
  } else if (details.length < CONTACT_LIMITS.detailsMin) {
    errors.details = `Please provide at least ${CONTACT_LIMITS.detailsMin} characters about your project.`;
  } else if (details.length > CONTACT_LIMITS.detailsMax) {
    errors.details = `Project details must be ${CONTACT_LIMITS.detailsMax} characters or fewer.`;
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: { fullName, email, phone, projectType, details },
  };
}
