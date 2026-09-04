/**
 * Email construction + Resend delivery. One email per valid logical
 * submission; the PDF travels as a normal attachment and nothing is persisted.
 */
import type { Env } from "./config";
import type { ApplicationFields } from "./validate";
import { sanitizeSingleLine } from "./validate";

const RESEND_API_URL = "https://api.resend.com/emails";

/** Escape all applicant-controlled content before any HTML interpolation. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const TYPE_LABELS: Record<string, string> = {
  phd: "PhD Application",
  postdoc: "Postdoctoral Application",
};

/** "University · Major · Name · PhD Application" — header-injection safe. */
export function buildSubject(fields: ApplicationFields): string {
  const parts = [
    fields.institution,
    fields.degree,
    fields.fullName,
    TYPE_LABELS[fields.applicationType] ?? "Application",
  ].map((part) => sanitizeSingleLine(part, 120));
  return parts.join(" · ").slice(0, 200);
}

export function buildTextBody(
  fields: ApplicationFields,
  submissionId: string
): string {
  const lines = [
    `Application type: ${TYPE_LABELS[fields.applicationType] ?? fields.applicationType}`,
    `Full name: ${fields.fullName}`,
    `Applicant email: ${fields.email}`,
    `Current institution: ${fields.institution}`,
    `Degree / Major: ${fields.degree}`,
  ];
  if (fields.intake) lines.push(`Intended intake: ${fields.intake}`);
  if (fields.note) lines.push(`Brief note:\n${fields.note}`);
  lines.push(`Submission ID: ${submissionId}`);
  return lines.join("\n");
}

export function buildHtmlBody(
  fields: ApplicationFields,
  submissionId: string
): string {
  const row = (label: string, value: string) =>
    `<tr><th>${escapeHtml(label)}</th><td>${escapeHtml(value)}</td></tr>`;
  const intakeRow = fields.intake
    ? row("Intended intake", fields.intake)
    : "";
  const noteBlock = fields.note
    ? `<p>${escapeHtml(fields.note).replace(/\n/g, "<br>")}</p>`
    : "";
  return `<!doctype html><html><body>
<h2>${escapeHtml(TYPE_LABELS[fields.applicationType] ?? "Application")}</h2>
<table>${row("Full name", fields.fullName)}${row("Applicant email", fields.email)}${row("Current institution", fields.institution)}${row("Degree / Major", fields.degree)}${intakeRow}</table>
${noteBlock}
<p>Submission ID: ${escapeHtml(submissionId)}</p>
</body></html>`;
}

export interface ResendPayload {
  from: string;
  to: string;
  reply_to: string;
  subject: string;
  text: string;
  html: string;
  attachments: { filename: string; content: string }[];
}

/**
 * Base64 in chunks — never spread a multi-megabyte byte array through
 * Function.prototype.apply (call-stack overflow at ~20 MiB).
 */
export function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

export function buildResendPayload(
  env: Env,
  fields: ApplicationFields,
  submissionId: string,
  pdfBytes: Uint8Array,
  filename: string
): ResendPayload {
  return {
    from: env.APPLICATION_FROM_EMAIL,
    to: env.APPLICATION_TO_EMAIL,
    reply_to: fields.email,
    subject: buildSubject(fields),
    text: buildTextBody(fields, submissionId),
    html: buildHtmlBody(fields, submissionId),
    attachments: [
      {
        filename,
        content: bytesToBase64(pdfBytes),
      },
    ],
  };
}

/** Deliver through Resend. Returns true only on an accepted send. */
export async function sendApplicationEmail(
  env: Env,
  payload: ResendPayload,
  idempotencyKey: string
): Promise<boolean> {
  try {
    const response = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(30_000),
    });
    return response.ok;
  } catch {
    return false;
  }
}
