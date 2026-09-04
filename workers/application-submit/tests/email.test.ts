import { describe, expect, it } from "vitest";
import {
  buildHtmlBody,
  buildResendPayload,
  buildSubject,
  buildTextBody,
  bytesToBase64,
  escapeHtml,
} from "../src/email";
import type { ApplicationFields } from "../src/validate";

const FIELDS: ApplicationFields = {
  applicationType: "phd",
  submissionId: "3f2504e0-4f89-41d3-9a0c-0305e82c3301",
  fullName: "Jane Doe",
  email: "jane@university.edu",
  institution: "Some University",
  degree: "Chemistry",
  intake: "August Intake",
  note: "I would love to join.",
};

const ENV = {
  RESEND_API_KEY: "test-key",
  APPLICATION_FROM_EMAIL: "applications@test.example",
  APPLICATION_TO_EMAIL: "JZHANG193@e.ntu.edu.sg",
  TURNSTILE_SECRET_KEY: "secret",
  ALLOWED_ORIGINS: "http://localhost:3000",
};

describe("escapeHtml", () => {
  it("escapes all HTML-significant characters", () => {
    expect(escapeHtml(`<script src="x">'&`)).toBe(
      "&lt;script src=&quot;x&quot;&gt;&#39;&amp;"
    );
  });
});

describe("buildSubject", () => {
  it("joins university, major, name and type label", () => {
    expect(buildSubject(FIELDS)).toBe(
      "Some University · Chemistry · Jane Doe · PhD Application"
    );
  });

  it("strips CR/LF (no header injection)", () => {
    const hostile = {
      ...FIELDS,
      institution: "Uni\r\nBcc: victim@example.com",
    };
    expect(buildSubject(hostile)).not.toContain("\n");
    expect(buildSubject(hostile)).not.toContain("\r");
  });
});

describe("bodies", () => {
  it("includes the structured fields and submission id", () => {
    const text = buildTextBody(FIELDS, FIELDS.submissionId);
    expect(text).toContain("Application type: PhD Application");
    expect(text).toContain("Full name: Jane Doe");
    expect(text).toContain("Applicant email: jane@university.edu");
    expect(text).toContain("Intended intake: August Intake");
    expect(text).toContain(`Submission ID: ${FIELDS.submissionId}`);
  });

  it("escapes applicant content in HTML", () => {
    const hostile: ApplicationFields = {
      ...FIELDS,
      fullName: '<script>alert("x")</script>',
      note: "line1\nline2",
    };
    const html = buildHtmlBody(hostile, hostile.submissionId);
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("line1<br>line2");
  });

  it("never includes the turnstile token or honeypot value", () => {
    const text = buildTextBody(FIELDS, FIELDS.submissionId);
    const html = buildHtmlBody(FIELDS, FIELDS.submissionId);
    expect(text).not.toContain("turnstile");
    expect(text).not.toContain("website");
    expect(html).not.toContain("turnstile");
  });
});

describe("bytesToBase64", () => {
  it("round-trips small payloads", () => {
    expect(bytesToBase64(new TextEncoder().encode("%PDF-1.7"))).toBe(
      btoa("%PDF-1.7")
    );
  });

  it("handles payloads larger than the call-stack-safe chunk size", () => {
    const big = new Uint8Array(1024 * 1024).fill(65);
    expect(bytesToBase64(big).length).toBeGreaterThan(1_000_000);
  });
});

describe("buildResendPayload", () => {
  it("wires from/to/reply-to, attachment and submission id", () => {
    const bytes = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d]);
    const payload = buildResendPayload(
      ENV,
      FIELDS,
      FIELDS.submissionId,
      bytes,
      "phd-application-x.pdf"
    );
    expect(payload.from).toBe("applications@test.example");
    expect(payload.to).toBe("JZHANG193@e.ntu.edu.sg");
    expect(payload.reply_to).toBe("jane@university.edu");
    expect(payload.attachments[0].filename).toBe("phd-application-x.pdf");
    expect(payload.attachments[0].content).toBe(btoa("%PDF-"));
    expect(payload.text).toContain(`Submission ID: ${FIELDS.submissionId}`);
  });
});
