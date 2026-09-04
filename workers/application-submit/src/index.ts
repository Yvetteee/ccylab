/**
 * Application submission Worker.
 *
 * Single responsibility: receive an application (metadata + one PDF),
 * validate it, deliver it through Resend, return a result. Not a database,
 * archive or admin system — nothing about the applicant is persisted.
 *
 * Validation order is cheap-first: method → origin → content-type → size
 * signal → rate limit → metadata fields → honeypot → Turnstile (network) →
 * PDF (bytes) → Resend (network).
 */
import type { Env } from "./config";
import { isAllowedOrigin } from "./config";
import { buildResendPayload, sendApplicationEmail } from "./email";
import {
  hasPdfMagicBytes,
  isHoneypotFilled,
  safeAttachmentFilename,
  validateFields,
  validatePdfMetadata,
} from "./validate";
import { verifyTurnstileToken } from "./turnstile";

const MAX_REQUEST_BYTES = 21 * 1024 * 1024; // 20 MiB PDF + multipart overhead

function logEvent(
  submissionId: string,
  applicationType: string,
  outcome: string,
  category = ""
) {
  // Privacy-conscious operational logging only — never payloads, PDFs,
  // tokens, secrets or applicant identity.
  console.log(
    JSON.stringify({
      event: "application_submit",
      submissionId,
      applicationType,
      outcome,
      category,
    })
  );
}

function jsonResponse(
  status: number,
  body: Record<string, unknown>,
  origin?: string
): Response {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (origin) headers["Access-Control-Allow-Origin"] = origin;
  return new Response(JSON.stringify(body), { status, headers });
}

function handleOptions(request: Request, env: Env): Response {
  const origin = request.headers.get("Origin") ?? "";
  if (!isAllowedOrigin(origin, env)) {
    return new Response(null, { status: 403 });
  }
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin") ?? "";

    if (request.method === "OPTIONS") {
      return handleOptions(request, env);
    }
    if (request.method !== "POST") {
      return jsonResponse(405, { ok: false, error: "method_not_allowed" });
    }

    // Origin validation before any expensive work.
    if (!origin || !isAllowedOrigin(origin, env)) {
      return jsonResponse(403, { ok: false, error: "origin_not_allowed" });
    }
    const cors = origin;

    const contentType = request.headers.get("Content-Type") ?? "";
    if (!contentType.startsWith("multipart/form-data")) {
      return jsonResponse(400, { ok: false, error: "invalid_content_type" }, cors);
    }

    // Early defensive size signal — File.size remains the final truth.
    const contentLength = Number(request.headers.get("Content-Length") ?? "0");
    if (contentLength > MAX_REQUEST_BYTES) {
      return jsonResponse(400, { ok: false, error: "file_too_large" }, cors);
    }

    // Endpoint-wide rate limit (deployment-provided binding only).
    if (env.RATE_LIMITER_GLOBAL) {
      const result = await env.RATE_LIMITER_GLOBAL.limit("endpoint");
      if (!result.success) {
        logEvent("", "", "rate_limited", "global");
        return jsonResponse(429, { ok: false, error: "rate_limited" }, cors);
      }
    }

    let form: FormData;
    try {
      form = await request.formData();
    } catch {
      return jsonResponse(400, { ok: false, error: "invalid_request" }, cors);
    }

    // Honeypot: humans never fill this; bots get a generic rejection.
    if (isHoneypotFilled(form)) {
      logEvent("", "", "rejected", "honeypot");
      return jsonResponse(400, { ok: false, error: "invalid_request" }, cors);
    }

    const fields = validateFields(form);
    if (!fields.ok) {
      logEvent("", "", "rejected", fields.error);
      return jsonResponse(400, { ok: false, error: fields.error }, cors);
    }
    const application = fields.fields;

    // Per-applicant rate limit on the normalized email.
    if (env.RATE_LIMITER_EMAIL) {
      const result = await env.RATE_LIMITER_EMAIL.limit(
        `email:${application.email.toLowerCase()}`
      );
      if (!result.success) {
        logEvent(application.submissionId, application.applicationType, "rate_limited", "email");
        return jsonResponse(429, { ok: false, error: "rate_limited" }, cors);
      }
    }

    // Turnstile server verification — mandatory, before file work.
    const turnstileToken = String(form.get("cf-turnstile-response") ?? "");
    const turnstileOk = await verifyTurnstileToken(
      turnstileToken,
      env.TURNSTILE_SECRET_KEY
    );
    if (!turnstileOk) {
      logEvent(application.submissionId, application.applicationType, "rejected", "turnstile");
      return jsonResponse(403, { ok: false, error: "turnstile_failed" }, cors);
    }

    // PDF validation — metadata first, then binary signature.
    const pdf = form.get("pdf");
    const metadata = validatePdfMetadata(pdf);
    if (!metadata.ok) {
      logEvent(application.submissionId, application.applicationType, "rejected", metadata.error);
      return jsonResponse(400, { ok: false, error: metadata.error }, cors);
    }
    const pdfFile = pdf as File;
    const pdfBytes = new Uint8Array(await pdfFile.arrayBuffer());
    if (!hasPdfMagicBytes(pdfBytes)) {
      logEvent(application.submissionId, application.applicationType, "rejected", "invalid_pdf");
      return jsonResponse(400, { ok: false, error: "invalid_pdf" }, cors);
    }

    // Deliver through Resend, then discard. Nothing is stored.
    const filename = safeAttachmentFilename(
      application.applicationType,
      application.submissionId
    );
    const payload = buildResendPayload(
      env,
      application,
      application.submissionId,
      pdfBytes,
      filename
    );
    const sent = await sendApplicationEmail(
      env,
      payload,
      application.submissionId
    );
    if (!sent) {
      logEvent(application.submissionId, application.applicationType, "failed", "resend");
      return jsonResponse(502, { ok: false, error: "delivery_failed" }, cors);
    }

    logEvent(application.submissionId, application.applicationType, "accepted");
    return jsonResponse(200, { ok: true }, cors);
  },
};
