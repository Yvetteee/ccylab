import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import handler from "../src/index";
import type { Env } from "../src/config";

const ORIGIN = "http://localhost:3000";
const VALID_UUID = "3f2504e0-4f89-41d3-9a0c-0305e82c3301";

const ENV: Env = {
  RESEND_API_KEY: "test-resend-key",
  APPLICATION_FROM_EMAIL: "applications@test.example",
  APPLICATION_TO_EMAIL: "JZHANG193@e.ntu.edu.sg",
  TURNSTILE_SECRET_KEY: "test-turnstile-secret",
  ALLOWED_ORIGINS: ORIGIN,
};

function pdfFile(size = 1024): File {
  const bytes = new Uint8Array(size);
  if (size >= 5) bytes.set([0x25, 0x50, 0x44, 0x46, 0x2d], 0);
  return new File([bytes], "cv.pdf", { type: "application/pdf" });
}

function applicationForm(overrides?: {
  type?: string;
  withoutToken?: boolean;
  withoutFile?: boolean;
  honeypot?: string;
}): FormData {
  const form = new FormData();
  form.set("applicationType", overrides?.type ?? "phd");
  form.set("submissionId", VALID_UUID);
  form.set("fullName", "Jane Doe");
  form.set("email", "jane@university.edu");
  form.set("institution", "Some University");
  form.set("degree", "Chemistry");
  form.set("intake", "August Intake");
  form.set("note", "Hello");
  if (!overrides?.withoutFile) form.set("pdf", pdfFile());
  if (!overrides?.withoutToken) form.set("cf-turnstile-response", "tok");
  if (overrides?.honeypot) form.set("website", overrides.honeypot);
  return form;
}

function postRequest(form: FormData, origin = ORIGIN): Request {
  return new Request("https://worker.example/submit", {
    method: "POST",
    headers: { Origin: origin },
    body: form,
  });
}

const resendCalls: { url: string; init: RequestInit }[] = [];

beforeEach(() => {
  resendCalls.length = 0;
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input instanceof Request ? input.url : input);
      resendCalls.push({ url, init: init ?? {} });
      if (url.includes("siteverify")) {
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
        });
      }
      if (url.includes("api.resend.com")) {
        return new Response(JSON.stringify({ id: "email-1" }), {
          status: 200,
        });
      }
      return new Response("{}", { status: 404 });
    })
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("application worker", () => {
  it("rejects GET requests", async () => {
    const response = await handler.fetch(
      new Request("https://worker.example/", { method: "GET" }),
      ENV
    );
    expect(response.status).toBe(405);
  });

  it("answers OPTIONS preflights from allowed origins", async () => {
    const response = await handler.fetch(
      new Request("https://worker.example/", {
        method: "OPTIONS",
        headers: { Origin: ORIGIN },
      }),
      ENV
    );
    expect(response.status).toBe(204);
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe(ORIGIN);
  });

  it("rejects disallowed and missing origins before parsing", async () => {
    const hostile = await handler.fetch(
      postRequest(applicationForm(), "https://evil.example"),
      ENV
    );
    expect(hostile.status).toBe(403);

    const noOrigin = new Request("https://worker.example/submit", {
      method: "POST",
      body: applicationForm(),
    });
    const response = await handler.fetch(noOrigin, ENV);
    expect(response.status).toBe(403);
  });

  it("rejects non-multipart content types", async () => {
    const request = new Request("https://worker.example/submit", {
      method: "POST",
      headers: { Origin: ORIGIN, "Content-Type": "application/json" },
      body: JSON.stringify({ applicationType: "phd" }),
    });
    const response = await handler.fetch(request, ENV);
    expect(response.status).toBe(400);
  });

  it("rejects a filled honeypot generically", async () => {
    const response = await handler.fetch(
      postRequest(applicationForm({ honeypot: "https://spam.example" })),
      ENV
    );
    expect(response.status).toBe(400);
    const body = (await response.json()) as { error: string };
    expect(body.error).toBe("invalid_request");
  });

  it("rejects missing and invalid turnstile tokens server-side", async () => {
    const missing = await handler.fetch(
      postRequest(applicationForm({ withoutToken: true })),
      ENV
    );
    expect(missing.status).toBe(403);

    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        new Response(JSON.stringify({ success: false }), { status: 200 })
      )
    );
    const invalid = await handler.fetch(postRequest(applicationForm()), ENV);
    expect(invalid.status).toBe(403);
    const body = (await invalid.json()) as { error: string };
    expect(body.error).toBe("turnstile_failed");
  });

  it("rejects invalid application metadata", async () => {
    const badType = await handler.fetch(
      postRequest(applicationForm({ type: "internship" })),
      ENV
    );
    expect(badType.status).toBe(400);
    const body = (await badType.json()) as { error: string };
    expect(body.error).toBe("invalid_type");

    const missingIntake = applicationForm();
    missingIntake.delete("intake");
    const response = await handler.fetch(postRequest(missingIntake), ENV);
    expect(response.status).toBe(400);
  });

  it("rejects missing, empty, faked and oversized PDFs", async () => {
    const missing = await handler.fetch(
      postRequest(applicationForm({ withoutFile: true })),
      ENV
    );
    expect(missing.status).toBe(400);

    const empty = applicationForm();
    empty.set("pdf", pdfFile(0));
    const emptyResponse = await handler.fetch(postRequest(empty), ENV);
    expect(emptyResponse.status).toBe(400);

    const fake = applicationForm();
    fake.set("pdf", new File([new TextEncoder().encode("definitely not")], "cv.pdf", { type: "application/pdf" }));
    const fakeResponse = await handler.fetch(postRequest(fake), ENV);
    expect(fakeResponse.status).toBe(400);
    const fakeBody = (await fakeResponse.json()) as { error: string };
    expect(fakeBody.error).toBe("invalid_pdf");

    const oversized = applicationForm();
    oversized.set("pdf", pdfFile(20 * 1024 * 1024 + 1));
    const oversizedResponse = await handler.fetch(postRequest(oversized), ENV);
    expect(oversizedResponse.status).toBe(400);
  });

  it("accepts a valid PhD application and delivers through Resend", async () => {
    const response = await handler.fetch(postRequest(applicationForm()), ENV);
    expect(response.status).toBe(200);
    const body = (await response.json()) as { ok: boolean };
    expect(body.ok).toBe(true);

    const resendCall = resendCalls.find((call) =>
      call.url.includes("api.resend.com")
    );
    expect(resendCall).toBeDefined();
    expect(resendCall?.init.headers).toMatchObject({
      "Idempotency-Key": VALID_UUID,
    });
    const payload = JSON.parse(String(resendCall?.init.body)) as {
      to: string;
      attachments: { filename: string }[];
    };
    expect(payload.to).toBe("JZHANG193@e.ntu.edu.sg");
    expect(payload.attachments[0].filename).toBe(
      `phd-application-${VALID_UUID}.pdf`
    );
  });

  it("accepts a valid postdoc application without intake", async () => {
    const response = await handler.fetch(
      postRequest(applicationForm({ type: "postdoc" })),
      ENV
    );
    expect(response.status).toBe(200);
  });

  it("processes a near-limit (~19 MiB) PDF without runtime errors", async () => {
    const nearLimit = applicationForm();
    nearLimit.set("pdf", pdfFile(19 * 1024 * 1024));
    const response = await handler.fetch(postRequest(nearLimit), ENV);
    expect(response.status).toBe(200);
    const resendCall = resendCalls.find((call) =>
      call.url.includes("api.resend.com")
    );
    const payload = JSON.parse(String(resendCall?.init.body)) as {
      attachments: { content: string }[];
    };
    // attachment survived the base64 round-trip
    expect(payload.attachments[0].content.length).toBeGreaterThan(19_000_000);
  }, 30_000);

  it("derives a stable idempotency key across retries", async () => {
    await handler.fetch(postRequest(applicationForm()), ENV);
    await handler.fetch(postRequest(applicationForm()), ENV);
    const keys = resendCalls
      .filter((call) => call.url.includes("api.resend.com"))
      .map((call) => (call.init.headers as Record<string, string>)["Idempotency-Key"]);
    expect(keys).toEqual([VALID_UUID, VALID_UUID]);
  });

  it("maps Resend failures to a generic 502", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL) => {
        const url = String(input instanceof Request ? input.url : input);
        if (url.includes("siteverify")) {
          return new Response(JSON.stringify({ success: true }), {
            status: 200,
          });
        }
        return new Response("boom", { status: 500 });
      })
    );
    const response = await handler.fetch(postRequest(applicationForm()), ENV);
    expect(response.status).toBe(502);
    const body = (await response.json()) as { error: string };
    expect(body.error).toBe("delivery_failed");
  });
});
