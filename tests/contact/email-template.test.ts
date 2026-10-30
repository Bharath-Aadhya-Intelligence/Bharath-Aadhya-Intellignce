import { describe, expect, it } from "vitest";
import { buildInquiryEmail, escapeHtml, formatUtc, INQUIRY_SUBJECT } from "@/lib/contact/email-template";

const values = {
  fullName: "Asha Rao",
  email: "asha.rao@example.com",
  phone: "+91 98765 43210",
  projectType: "Website Development",
  details: "First line\nSecond line with <b>bold</b> & \"quotes\"",
};

const submittedAt = new Date("2026-10-30T14:05:09.000Z");

describe("escapeHtml", () => {
  it("escapes the five HTML-significant characters", () => {
    expect(escapeHtml(`<a href="x">'&'</a>`)).toBe("&lt;a href=&quot;x&quot;&gt;&#39;&amp;&#39;&lt;/a&gt;");
  });
});

describe("formatUtc", () => {
  it("formats the timestamp in UTC", () => {
    expect(formatUtc(submittedAt)).toBe("2026-10-30 14:05:09 UTC");
  });
});

describe("buildInquiryEmail", () => {
  const email = buildInquiryEmail({ values, referenceId: "BAI-20261030-AB12CD34", submittedAt });

  it("uses the required subject line", () => {
    expect(email.subject).toBe("New Project Inquiry | Bharath Aadhya Intelligence");
    expect(INQUIRY_SUBJECT).toBe(email.subject);
  });

  it("includes every required section in the HTML and plain-text bodies", () => {
    for (const label of [
      "New Project Inquiry",
      "Client Information",
      "Full Name",
      "Business Email",
      "Phone Number",
      "Project Information",
      "Selected Project Type",
      "Project Details",
      "Submission Information",
      "Inquiry Reference ID",
    ]) {
      expect(email.html).toContain(label);
    }

    for (const line of [
      "NEW PROJECT INQUIRY",
      "CLIENT INFORMATION",
      "PROJECT INFORMATION",
      "SUBMISSION INFORMATION",
      "Full Name: Asha Rao",
      "Business Email: asha.rao@example.com",
      "Phone Number: +91 98765 43210",
      "Selected Project Type: Website Development",
      "Submission date and time (UTC): 2026-10-30 14:05:09 UTC",
      "Inquiry Reference ID: BAI-20261030-AB12CD34",
    ]) {
      expect(email.text).toContain(line);
    }
  });

  it("escapes user-provided HTML but keeps line breaks", () => {
    expect(email.html).toContain("&lt;b&gt;bold&lt;/b&gt; &amp; &quot;quotes&quot;");
    expect(email.html).not.toContain("<b>bold</b>");
    expect(email.html).toContain("First line<br />Second line");
  });

  it("neutralizes script injection in every user-controlled field", () => {
    const hostile = buildInquiryEmail({
      values: {
        ...values,
        fullName: "<img src=x onerror=alert(1)>",
        details: "<script>alert('x')</script>",
      },
      referenceId: "BAI-1",
      submittedAt,
    });

    expect(hostile.html).not.toMatch(/<script/i);
    expect(hostile.html).not.toMatch(/<img/i);
    expect(hostile.html).toContain("&lt;script&gt;alert(&#39;x&#39;)&lt;/script&gt;");
  });

  it("keeps the plain-text body free of HTML escaping", () => {
    expect(email.text).toContain("<b>bold</b> & \"quotes\"");
  });

  it("does not include secrets or stack traces", () => {
    expect(email.html).not.toMatch(/re_|RESEND|stack|Error:/);
    expect(email.text).not.toMatch(/re_|RESEND|stack|Error:/);
  });
});
