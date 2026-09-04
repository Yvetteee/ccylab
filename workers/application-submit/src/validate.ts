/**
 * Pure request-validation helpers. Frontend validation is convenience only —
 * everything in this module is authoritative. No network access happens here,
 * which keeps the whole module directly unit-testable.
 */

export const ALLOWED_APPLICATION_TYPES = ["phd", "postdoc"] as const;
export type ApplicationType = (typeof ALLOWED_APPLICATION_TYPES)[number];

export const MAX_PDF_BYTES = 20 * 1024 * 1024; // 20 MiB

/** Field length bounds (client-side caps are convenience, these are truth). */
export const LIMITS = {
  submissionId: 64,
  fullName: 200,
  email: 254,
  institution: 200,
  degree: 200,
  intake: 100,
  note: 2000,
} as const;

export interface ApplicationFields {
  applicationType: ApplicationType;
  submissionId: string;
  fullName: string;
  email: string;
  institution: string;
  degree: string;
  intake: string;
  note: string;
}

/**
 * Remove control characters (including CR/LF — no header injection) and trim.
 */
export function sanitizeSingleLine(value: string, maxLength: number): string {
  return value
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001f\u007f]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

/** Multiline variant: keeps newlines, strips every other control character. */
export function sanitizeMultiline(value: string, maxLength: number): string {
  return value
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0009\u000b-\u001f\u007f]+/g, "")
    .replace(/\r\n/g, "\n")
    .trim()
    .slice(0, maxLength);
}

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isValidSubmissionId(value: string): boolean {
  return UUID_RE.test(value);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  const trimmed = value.trim();
  return trimmed.length <= LIMITS.email && EMAIL_RE.test(trimmed);
}

export type FieldValidation =
  | { ok: true; fields: ApplicationFields }
  | { ok: false; error: string };

/**
 * Validate and normalize the submitted metadata. Returns a safe error code —
 * never a reason that would help an attacker probe the endpoint.
 */
export function validateFields(form: FormData): FieldValidation {
  const rawType = String(form.get("applicationType") ?? "");
  if (
    !(ALLOWED_APPLICATION_TYPES as readonly string[]).includes(rawType)
  ) {
    return { ok: false, error: "invalid_type" };
  }
  const applicationType = rawType as ApplicationType;

  const submissionId = String(form.get("submissionId") ?? "");
  if (!isValidSubmissionId(submissionId)) {
    return { ok: false, error: "invalid_submission" };
  }

  const fullName = sanitizeSingleLine(
    String(form.get("fullName") ?? ""),
    LIMITS.fullName
  );
  if (!fullName) return { ok: false, error: "invalid_field" };

  const email = String(form.get("email") ?? "").trim();
  if (!isValidEmail(email)) return { ok: false, error: "invalid_field" };

  const institution = sanitizeSingleLine(
    String(form.get("institution") ?? ""),
    LIMITS.institution
  );
  if (!institution) return { ok: false, error: "invalid_field" };

  const degree = sanitizeSingleLine(
    String(form.get("degree") ?? ""),
    LIMITS.degree
  );
  if (!degree) return { ok: false, error: "invalid_field" };

  // The intended intake is required for PhD applications only; the postdoc
  // form does not declare structured intakes.
  let intake = "";
  if (applicationType === "phd") {
    intake = sanitizeSingleLine(String(form.get("intake") ?? ""), LIMITS.intake);
    if (!intake) return { ok: false, error: "invalid_field" };
  }

  const note = sanitizeMultiline(String(form.get("note") ?? ""), LIMITS.note);

  return {
    ok: true,
    fields: {
      applicationType,
      submissionId,
      fullName,
      email,
      institution,
      degree,
      intake,
      note,
    },
  };
}

/** The honeypot field must be absent-mindedly empty for humans. */
export function isHoneypotFilled(form: FormData): boolean {
  return String(form.get("website") ?? "").trim().length > 0;
}

export type PdfValidation = { ok: true } | { ok: false; error: string };

/** Metadata-level PDF checks (size, extension, MIME). */
export function validatePdfMetadata(file: unknown): PdfValidation {
  if (!(file instanceof File)) return { ok: false, error: "invalid_pdf" };
  if (file.size <= 0 || file.size > MAX_PDF_BYTES) {
    return { ok: false, error: "file_too_large" };
  }
  if (!/\.pdf$/i.test(file.name)) return { ok: false, error: "invalid_pdf" };
  if (file.type && file.type !== "application/pdf") {
    return { ok: false, error: "invalid_pdf" };
  }
  return { ok: true };
}

/** Binary signature check — a real PDF starts with "%PDF-". */
export function hasPdfMagicBytes(bytes: Uint8Array): boolean {
  return (
    bytes.length >= 5 &&
    bytes[0] === 0x25 && // %
    bytes[1] === 0x50 && // P
    bytes[2] === 0x44 && // D
    bytes[3] === 0x46 && // F
    bytes[4] === 0x2d // -
  );
}

/**
 * Safe attachment filename: no path separators, no control characters, no
 * unnecessary PII — the submission id already identifies the document.
 */
export function safeAttachmentFilename(
  type: ApplicationType,
  submissionId: string
): string {
  return `${type}-application-${sanitizeSingleLine(submissionId, LIMITS.submissionId).replace(/[^0-9a-f-]/gi, "")}.pdf`;
}
