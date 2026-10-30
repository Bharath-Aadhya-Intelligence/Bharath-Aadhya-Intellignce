import { describe, expect, it } from "vitest";
import { CONTACT_LIMITS, PROJECT_TYPES, validateContactForm } from "@/lib/contact/schema";

const validInput = {
  fullName: "  Asha Rao  ",
  email: "asha.rao@example.com",
  phone: "+91 98765 43210",
  projectType: "Website Development",
  details: "We need a corporate website with an AI chatbot for lead capture.",
};

function errorsFor(overrides: Record<string, unknown>) {
  const result = validateContactForm({ ...validInput, ...overrides });
  if (result.ok) throw new Error("Expected validation to fail");
  return result.errors;
}

describe("validateContactForm", () => {
  it("accepts a valid submission and trims the name", () => {
    const result = validateContactForm(validInput);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.fullName).toBe("Asha Rao");
      expect(result.data.email).toBe("asha.rao@example.com");
    }
  });

  it("requires every field", () => {
    const result = validateContactForm({});
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(Object.keys(result.errors).sort()).toEqual(
        ["details", "email", "fullName", "phone", "projectType"].sort()
      );
    }
  });

  it("rejects non-object input", () => {
    expect(validateContactForm("hello").ok).toBe(false);
    expect(validateContactForm(null).ok).toBe(false);
    expect(validateContactForm(42).ok).toBe(false);
  });

  it("rejects non-string values for text fields", () => {
    const errors = errorsFor({ fullName: 123, details: ["x"] });
    expect(errors.fullName).toBeDefined();
    expect(errors.details).toBeDefined();
  });

  describe("full name", () => {
    it("rejects names that are too short or too long", () => {
      expect(errorsFor({ fullName: "A" }).fullName).toBeDefined();
      expect(errorsFor({ fullName: "A".repeat(CONTACT_LIMITS.fullNameMax + 1) }).fullName).toBeDefined();
    });

    it("rejects markup and digits", () => {
      expect(errorsFor({ fullName: "<script>alert(1)</script>" }).fullName).toBeDefined();
      expect(errorsFor({ fullName: "Asha 2" }).fullName).toBeDefined();
    });

    it("accepts names with apostrophes, hyphens and non-Latin letters", () => {
      expect(validateContactForm({ ...validInput, fullName: "Mary-Jane O'Brien" }).ok).toBe(true);
      expect(validateContactForm({ ...validInput, fullName: "ಅಶ್ವಿನಿ ರಾವ್" }).ok).toBe(true);
    });
  });

  describe("business email", () => {
    it.each(["not-an-email", "a@b", "user@@example.com", "user name@example.com", "a@example.c"])(
      "rejects %s",
      (email) => {
        expect(errorsFor({ email }).email).toBeDefined();
      }
    );

    it("rejects header-injection attempts", () => {
      expect(errorsFor({ email: "a@example.com\r\nBcc: victim@example.com" }).email).toBeDefined();
      expect(errorsFor({ email: "a@example.com>\nBcc: x@example.com" }).email).toBeDefined();
    });

    it("rejects excessively long addresses", () => {
      const local = "a".repeat(70);
      expect(errorsFor({ email: `${local}@example.com` }).email).toBeDefined();
    });
  });

  describe("phone number", () => {
    it.each(["+91 98765 43210", "098765 43210", "+1 (415) 555-2671", "+44 20 7946 0958", "9876543210"])(
      "accepts %s",
      (phone) => {
        expect(validateContactForm({ ...validInput, phone }).ok).toBe(true);
      }
    );

    it.each(["abc", "12345", "+91 98765 4321a", "+91+98765 43210", "1234567890123456"])(
      "rejects %s",
      (phone) => {
        expect(errorsFor({ phone }).phone).toBeDefined();
      }
    );
  });

  describe("project type", () => {
    it("accepts every offered option", () => {
      for (const projectType of PROJECT_TYPES) {
        expect(validateContactForm({ ...validInput, projectType }).ok).toBe(true);
      }
    });

    it("rejects values the form does not offer", () => {
      expect(errorsFor({ projectType: "Crypto Trading Bot" }).projectType).toBeDefined();
      expect(errorsFor({ projectType: "website development" }).projectType).toBeDefined();
      expect(errorsFor({ projectType: "" }).projectType).toBeDefined();
    });
  });

  describe("project details", () => {
    it("rejects details that are too short", () => {
      expect(errorsFor({ details: "short" }).details).toBeDefined();
    });

    it("rejects details longer than the limit", () => {
      const details = "x".repeat(CONTACT_LIMITS.detailsMax + 1);
      expect(errorsFor({ details }).details).toBeDefined();
    });

    it("accepts details exactly at the limit", () => {
      const details = "x".repeat(CONTACT_LIMITS.detailsMax);
      expect(validateContactForm({ ...validInput, details }).ok).toBe(true);
    });

    it("keeps line breaks but removes control characters", () => {
      const result = validateContactForm({
        ...validInput,
        details: "Line one\r\nLine two\u0000\u0007\n\n\n\nLine three",
      });
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data.details).toBe("Line one\nLine two\n\nLine three");
      }
    });

    it("strips bidirectional override characters", () => {
      const result = validateContactForm({ ...validInput, details: "Build \u202Eevil text here" });
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data.details).toBe("Build evil text here");
      }
    });
  });
});
