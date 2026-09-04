"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import type { Opportunity } from "@/types/content";
import styles from "./ApplicationForm.module.css";

interface ApplicationFormProps {
  opportunity: Opportunity;
}

/**
 * Build-time public configuration (see .env.example). No email addresses or
 * Worker URLs are hard-coded in components.
 */
const API_URL = (process.env.NEXT_PUBLIC_APPLICATION_API_URL ?? "").trim();
const TURNSTILE_SITE_KEY = (
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""
).trim();
const FALLBACK_EMAIL = (
  process.env.NEXT_PUBLIC_APPLICATION_FALLBACK_EMAIL ?? ""
).trim();

const MAX_FIELD_LENGTH = 500;
const MAX_PDF_BYTES = 20 * 1024 * 1024; // 20 MiB

interface FormState {
  fullName: string;
  email: string;
  institution: string;
  degree: string;
  intake: string;
  note: string;
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId?: string) => void;
    };
    __onTurnstileLoad?: () => void;
  }
}

/** Map safe server error codes to concise client-facing copy. */
function errorMessageFor(code: string): string {
  switch (code) {
    case "invalid_pdf":
      return "Please upload a valid PDF.";
    case "file_too_large":
      return "The file exceeds the 20 MB limit.";
    case "turnstile_failed":
      return "Verification failed. Please try again.";
    case "rate_limited":
      return "Too many attempts. Please try again later.";
    default:
      return "We could not submit your application. Please try again later.";
  }
}

/**
 * Real online application form — one component shared by the PhD and
 * Postdoc pages, driven by the opportunity data. Fields that differ between
 * the routes (intended intake) render only when the data declares them.
 *
 * Submission POSTs multipart/form-data (metadata + ONE PDF) to the
 * configured Worker endpoint, protected by Cloudflare Turnstile and a
 * honeypot field. The Worker — not this form — is the authoritative
 * validator. A secondary email fallback stays available while the online
 * endpoint is being configured; it is intentionally the quieter path.
 */
export default function ApplicationForm({ opportunity }: ApplicationFormProps) {
  const applySection = opportunity.rows
    .flatMap((row) => row.sections)
    .find((section) => section.type === "apply");
  const subject =
    applySection?.type === "apply" ? applySection.subject : "";

  const intakesSection = opportunity.rows
    .flatMap((row) => row.sections)
    .find((section) => section.type === "intakes");
  const intakes =
    intakesSection?.type === "intakes" ? intakesSection.items : [];

  const [values, setValues] = useState<FormState>({
    fullName: "",
    email: "",
    institution: "",
    degree: "",
    intake: "",
    note: "",
  });
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfError, setPdfError] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [submissionError, setSubmissionError] = useState("");

  // One stable id per logical submission — retried attempts reuse it and the
  // Worker derives its Resend idempotency key from it.
  const submissionIdRef = useRef<string>("");
  useEffect(() => {
    if (!submissionIdRef.current && typeof crypto.randomUUID === "function") {
      submissionIdRef.current = crypto.randomUUID();
    }
  }, []);

  // Turnstile (Managed mode) — loaded and rendered only when a site key is
  // configured. Presence of a token here is convenience; the Worker verifies
  // it server-side.
  const [turnstileReady, setTurnstileReady] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    // Script already present (cached or double mount): defer through the
    // same async path instead of setting state synchronously in the effect.
    if (window.turnstile) {
      const id = window.setTimeout(() => setTurnstileReady(true), 0);
      return () => window.clearTimeout(id);
    }
    window.__onTurnstileLoad = () => setTurnstileReady(true);
    const script = document.createElement("script");
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=__onTurnstileLoad";
    script.async = true;
    document.head.appendChild(script);
    return () => {
      delete window.__onTurnstileLoad;
    };
  }, []);

  useEffect(() => {
    if (
      !TURNSTILE_SITE_KEY ||
      !turnstileReady ||
      !turnstileContainerRef.current ||
      turnstileWidgetId.current
    ) {
      return;
    }
    turnstileWidgetId.current = window.turnstile!.render(
      turnstileContainerRef.current,
      {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token: string) => setTurnstileToken(token),
        "expired-callback": () => setTurnstileToken(""),
      }
    );
  }, [turnstileReady]);

  const resetTurnstile = useCallback(() => {
    setTurnstileToken("");
    if (TURNSTILE_SITE_KEY && window.turnstile && turnstileWidgetId.current) {
      window.turnstile.reset(turnstileWidgetId.current);
    }
  }, []);

  const update =
    (key: keyof FormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((prev) => ({
        ...prev,
        [key]: event.target.value.slice(0, MAX_FIELD_LENGTH),
      }));

  function handlePdfChange(event: ChangeEvent<HTMLInputElement>) {
    setPdfError("");
    const file = event.target.files?.[0] ?? null;
    if (!file) {
      setPdfFile(null);
      return;
    }
    if (!/\.pdf$/i.test(file.name) || (file.type && file.type !== "application/pdf")) {
      setPdfError("Please upload a valid PDF.");
      setPdfFile(null);
      event.target.value = "";
      return;
    }
    if (file.size <= 0) {
      setPdfError("Please upload a valid PDF.");
      setPdfFile(null);
      event.target.value = "";
      return;
    }
    if (file.size > MAX_PDF_BYTES) {
      setPdfError("The file exceeds the 20 MB limit.");
      setPdfFile(null);
      event.target.value = "";
      return;
    }
    setPdfFile(file);
  }

  function resetForm() {
    setValues({
      fullName: "",
      email: "",
      institution: "",
      degree: "",
      intake: "",
      note: "",
    });
    setPdfFile(null);
    setPdfError("");
    const pdfInput = document.getElementById("document") as HTMLInputElement | null;
    if (pdfInput) pdfInput.value = "";
    // next logical submission gets a fresh id
    submissionIdRef.current = crypto.randomUUID();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    if (!pdfFile) {
      setSubmissionError("Please upload a valid PDF.");
      setStatus("error");
      return;
    }
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setSubmissionError("Verification failed. Please try again.");
      setStatus("error");
      resetTurnstile();
      return;
    }

    setStatus("submitting");
    setSubmissionError("");

    const data = new FormData();
    data.set("applicationType", opportunity.id);
    data.set("submissionId", submissionIdRef.current);
    data.set("fullName", values.fullName.trim());
    data.set("email", values.email.trim());
    data.set("institution", values.institution.trim());
    data.set("degree", values.degree.trim());
    if (values.intake) data.set("intake", values.intake);
    data.set("note", values.note.trim());
    data.set("pdf", pdfFile, pdfFile.name);
    if (turnstileToken) data.set("cf-turnstile-response", turnstileToken);
    data.set("website", honeypot);

    try {
      const response = await fetch(API_URL, { method: "POST", body: data });
      if (response.ok) {
        setStatus("success");
        resetForm();
        resetTurnstile();
        return;
      }
      let code = "";
      try {
        const payload = (await response.json()) as { error?: string };
        code = typeof payload.error === "string" ? payload.error : "";
      } catch {}
      setSubmissionError(errorMessageFor(code));
      setStatus("error");
      resetTurnstile();
    } catch {
      setSubmissionError(
        "We could not submit your application. Please try again later."
      );
      setStatus("error");
      resetTurnstile();
    }
  }

  // Secondary email fallback — intentionally the quieter path. During the
  // test phase the recipient comes from configuration, never the PI address.
  const fallbackBody = [
    `Full name: ${values.fullName}`,
    `Email address: ${values.email}`,
    `Current institution: ${values.institution}`,
    `Degree / Major: ${values.degree}`,
    values.intake ? `Intended intake: ${values.intake}` : "",
    values.note ? `Brief note:\n${values.note}` : "",
    "",
    "Please remember to attach your application PDF before sending this email.",
  ]
    .filter(Boolean)
    .join("\n");
  const fallbackHref = FALLBACK_EMAIL
    ? `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(fallbackBody)}`
    : "";

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate={false}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="fullName">
          Full name
        </label>
        <input
          className={styles.input}
          id="fullName"
          name="fullName"
          type="text"
          required
          maxLength={MAX_FIELD_LENGTH}
          autoComplete="name"
          value={values.fullName}
          onChange={update("fullName")}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="email">
          Email address
        </label>
        <input
          className={styles.input}
          id="email"
          name="email"
          type="email"
          required
          maxLength={MAX_FIELD_LENGTH}
          autoComplete="email"
          value={values.email}
          onChange={update("email")}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="institution">
          Current institution
        </label>
        <input
          className={styles.input}
          id="institution"
          name="institution"
          type="text"
          required
          maxLength={MAX_FIELD_LENGTH}
          autoComplete="organization"
          value={values.institution}
          onChange={update("institution")}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="degree">
          Degree / Major
        </label>
        <input
          className={styles.input}
          id="degree"
          name="degree"
          type="text"
          required
          maxLength={MAX_FIELD_LENGTH}
          value={values.degree}
          onChange={update("degree")}
        />
      </div>

      {intakes.length > 0 ? (
        <fieldset className={styles.fieldset}>
          <legend className={styles.label}>Intended intake</legend>
          <div className={styles.radios}>
            {intakes.map((intake) => (
              <label key={intake.label} className={styles.radio}>
                <input
                  type="radio"
                  name="intake"
                  value={intake.label}
                  required
                  checked={values.intake === intake.label}
                  onChange={update("intake")}
                />
                {intake.label}
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}

      <div className={styles.field}>
        <label className={styles.label} htmlFor="note">
          Brief note
        </label>
        <textarea
          className={styles.textarea}
          id="note"
          name="note"
          rows={4}
          maxLength={MAX_FIELD_LENGTH}
          value={values.note}
          onChange={update("note")}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="document">
          Application PDF
        </label>
        <p className={styles.hint}>
          Please upload one PDF containing your application materials
          (max&nbsp;20&nbsp;MB).
        </p>
        <input
          className={styles.fileInput}
          id="document"
          name="document"
          type="file"
          accept=".pdf,application/pdf"
          required
          onChange={handlePdfChange}
        />
        <label className={styles.fileButton} htmlFor="document">
          Choose PDF
        </label>
        <span className={styles.fileName} aria-live="polite">
          {pdfFile ? pdfFile.name : "No file chosen"}
        </span>
        {pdfError ? (
          <p className={styles.fileError} role="alert">
            {pdfError}
          </p>
        ) : null}
      </div>

      {/* Honeypot — invisible to humans and assistive technology; bots that
          fill it are rejected server-side without explanation. */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      {TURNSTILE_SITE_KEY ? (
        <div className={styles.turnstileBlock}>
          <div ref={turnstileContainerRef} />
        </div>
      ) : null}

      {status === "success" ? (
        <p className={styles.statusSuccess} role="status" aria-live="polite">
          Your application has been submitted successfully.
        </p>
      ) : null}
      {status === "error" && submissionError ? (
        <p className={styles.statusError} role="alert" aria-live="polite">
          {submissionError}
        </p>
      ) : null}

      {!API_URL ? (
        <p className={styles.notice}>
          Online submission is being set up. Please use the email option below
          for now.
        </p>
      ) : null}

      <button
        className={styles.submit}
        type="submit"
        disabled={status === "submitting" || !API_URL}
      >
        {status === "submitting" ? "Submitting…" : "Submit application"}
      </button>

      <p className={styles.privacy}>
        Your application materials will be used only for recruitment-related
        review by the Ye Group and will not be publicly shared.
      </p>

      {fallbackHref ? (
        <p className={styles.fallback}>
          Prefer email?{" "}
          <a
            href={fallbackHref}
            onClick={() => {
              if (status === "success") setStatus("idle");
            }}
          >
            Submit by email instead
          </a>
          . Your form details will be used to draft the message.
        </p>
      ) : null}
    </form>
  );
}
