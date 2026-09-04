import { describe, expect, it } from "vitest";
import {
  hasPdfMagicBytes,
  isHoneypotFilled,
  isValidEmail,
  isValidSubmissionId,
  safeAttachmentFilename,
  sanitizeMultiline,
  sanitizeSingleLine,
  validateFields,
  validatePdfMetadata,
} from "../src/validate";

const VALID_UUID = "3f2504e0-4f89-41d3-9a0c-0305e82c3301";

function pdfFile(size = 1024): File {
  const bytes = new Uint8Array(size);
  if (size >= 5) bytes.set([0x25, 0x50, 0x44, 0x46, 0x2d], 0); // %PDF-
  return new File([bytes], "cv.pdf", { type: "application/pdf" });
}

function baseForm(): FormData {
  const form = new FormData();
  form.set("applicationType", "phd");
  form.set("submissionId", VALID_UUID);
  form.set("fullName", "Jane Doe");
  form.set("email", "jane@university.edu");
  form.set("institution", "Some University");
  form.set("degree", "Chemistry");
  form.set("intake", "August Intake");
  form.set("note", "Hello");
  return form;
}

describe("sanitizeSingleLine", () => {
  it("strips CR/LF and control characters (no header injection)", () => {
    expect(sanitizeSingleLine("A\r\nB\rInjected", 200)).toBe("A B Injected");
    expect(sanitizeSingleLine("A\u0000B\u001fC", 200)).toBe("A B C");
  });

  it("collapses whitespace, trims and caps length", () => {
    expect(sanitizeSingleLine("  a   b  ", 200)).toBe("a b");
    expect(sanitizeSingleLine("x".repeat(300), 100)).toHaveLength(100);
  });
});

describe("sanitizeMultiline", () => {
  it("keeps newlines but strips other control characters", () => {
    expect(sanitizeMultiline("line1\r\nline2\u0000line3", 200)).toBe(
      "line1\nline2line3"
    );
  });
});

describe("isValidSubmissionId", () => {
  it("accepts UUIDs case-insensitively", () => {
    expect(isValidSubmissionId(VALID_UUID)).toBe(true);
    expect(isValidSubmissionId(VALID_UUID.toUpperCase())).toBe(true);
  });
  it("rejects non-UUIDs", () => {
    expect(isValidSubmissionId("abc")).toBe(false);
    expect(isValidSubmissionId("")).toBe(false);
  });
});

describe("isValidEmail", () => {
  it("accepts reasonable addresses", () => {
    expect(isValidEmail("jane@university.edu")).toBe(true);
  });
  it("rejects malformed addresses", () => {
    expect(isValidEmail("jane")).toBe(false);
    expect(isValidEmail("jane@university")).toBe(false);
    expect(isValidEmail("jane jane@university.edu")).toBe(false);
  });
});

describe("validateFields", () => {
  it("accepts a valid PhD application", () => {
    const result = validateFields(baseForm());
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.fields.intake).toBe("August Intake");
      expect(result.fields.email).toBe("jane@university.edu");
    }
  });

  it("accepts a postdoc application without intake", () => {
    const form = baseForm();
    form.set("applicationType", "postdoc");
    form.delete("intake");
    const result = validateFields(form);
    expect(result.ok).toBe(true);
  });

  it("requires intake for PhD applications", () => {
    const form = baseForm();
    form.delete("intake");
    const result = validateFields(form);
    expect(result).toEqual({ ok: false, error: "invalid_field" });
  });

  it("rejects unknown application types", () => {
    const form = baseForm();
    form.set("applicationType", "internship");
    expect(validateFields(form)).toEqual({ ok: false, error: "invalid_type" });
  });

  it("rejects malformed submission ids", () => {
    const form = baseForm();
    form.set("submissionId", "not-a-uuid");
    expect(validateFields(form)).toEqual({
      ok: false,
      error: "invalid_submission",
    });
  });

  it("rejects missing or invalid required fields", () => {
    const missingName = baseForm();
    missingName.set("fullName", "  ");
    expect(validateFields(missingName)).toEqual({
      ok: false,
      error: "invalid_field",
    });

    const badEmail = baseForm();
    badEmail.set("email", "nope");
    expect(validateFields(badEmail)).toEqual({
      ok: false,
      error: "invalid_field",
    });
  });
});

describe("honeypot", () => {
  it("detects a filled honeypot field", () => {
    const form = baseForm();
    expect(isHoneypotFilled(form)).toBe(false);
    form.set("website", "https://spam.example");
    expect(isHoneypotFilled(form)).toBe(true);
  });
});

describe("PDF validation", () => {
  it("accepts a real PDF file", () => {
    expect(validatePdfMetadata(pdfFile())).toEqual({ ok: true });
  });

  it("rejects non-File values, empty files, oversized files", () => {
    expect(validatePdfMetadata(null)).toEqual({ ok: false, error: "invalid_pdf" });
    expect(validatePdfMetadata(pdfFile(0))).toEqual({
      ok: false,
      error: "file_too_large",
    });
    expect(validatePdfMetadata(pdfFile(20 * 1024 * 1024 + 1))).toEqual({
      ok: false,
      error: "file_too_large",
    });
  });

  it("rejects wrong extension or MIME", () => {
    const wrongExt = new File([new Uint8Array(100)], "cv.exe", {
      type: "application/pdf",
    });
    expect(validatePdfMetadata(wrongExt)).toEqual({
      ok: false,
      error: "invalid_pdf",
    });
    const wrongMime = new File([new Uint8Array(100)], "cv.pdf", {
      type: "text/html",
    });
    expect(validatePdfMetadata(wrongMime)).toEqual({
      ok: false,
      error: "invalid_pdf",
    });
  });

  it("checks the %PDF- magic bytes", () => {
    const good = new Uint8Array(100);
    good.set([0x25, 0x50, 0x44, 0x46, 0x2d], 0);
    expect(hasPdfMagicBytes(good)).toBe(true);
    const bad = new Uint8Array([0x4d, 0x5a, 0x00, 0x01, 0x02]);
    expect(hasPdfMagicBytes(bad)).toBe(false);
    expect(hasPdfMagicBytes(new Uint8Array(2))).toBe(false);
  });
});

describe("safeAttachmentFilename", () => {
  it("uses the type + submission id with a .pdf extension", () => {
    expect(safeAttachmentFilename("phd", VALID_UUID)).toBe(
      `phd-application-${VALID_UUID}.pdf`
    );
  });

  it("removes path separators and unsafe characters", () => {
    // The sanitizer keeps only hex digits and hyphens — always safe, and the
    // production filename is a UUID, which is pure hex.
    expect(
      safeAttachmentFilename("postdoc", "../../etc/passwd asdf")
    ).toBe("postdoc-application-ecadadf.pdf");
  });
});
