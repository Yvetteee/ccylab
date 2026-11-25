import { describe, expect, it, vi } from "vitest";
import { MAX_REQUEST_BYTES, readApplicationMultipart } from "../src/multipart";

const CONTENT_TYPE = "multipart/form-data; boundary=application-boundary";
const TEST_URL = "https://worker.example/";
const encoder = new TextEncoder();

function request(body: FormData | ReadableStream<Uint8Array>, contentType?: string, length?: string) {
  const init: RequestInit & { duplex: "half" } = { method: "POST", body, duplex: "half" };
  if (contentType) init.headers = { "Content-Type": contentType };
  const result = new Request(TEST_URL, init);
  if (length) result.headers.set("Content-Length", length);
  return result;
}

function sizedMultipart(total: number) {
  const first = encoder.encode(
    '--application-boundary\r\nContent-Disposition: form-data; name="pdf"; filename="cv.pdf"\r\nContent-Type: application/pdf\r\n\r\n%PDF-'
  );
  const last = encoder.encode("\r\n--application-boundary--\r\n");
  let remaining = total - first.length - last.length;
  const filler = new Uint8Array(64 * 1024);
  const cancel = vi.fn();
  const body = new ReadableStream<Uint8Array>({
    start(controller) { controller.enqueue(first); },
    pull(controller) {
      if (remaining > 0) {
        const size = Math.min(remaining, filler.length);
        controller.enqueue(filler.subarray(0, size));
        remaining -= size;
      } else {
        controller.enqueue(last);
        // A consumer must cancel after rejecting a body beyond the limit.
        if (total <= MAX_REQUEST_BYTES) controller.close();
      }
    },
    cancel,
  }, { highWaterMark: 0 });
  return { body, cancel };
}

describe("bounded multipart parsing", () => {
  it("accepts the exact aggregate byte boundary without Content-Length", async () => {
    const { body } = sizedMultipart(MAX_REQUEST_BYTES);
    const result = await readApplicationMultipart(request(body, CONTENT_TYPE), CONTENT_TYPE);
    expect(result.ok).toBe(true);
  });

  it.each([undefined, "1024"])("stops and cancels overflow with length %s", async (length) => {
    const { body, cancel } = sizedMultipart(MAX_REQUEST_BYTES + 1);
    const result = await readApplicationMultipart(request(body, CONTENT_TYPE, length), CONTENT_TYPE);
    expect(result).toEqual({ ok: false, status: 413, error: "file_too_large" });
    expect(cancel).toHaveBeenCalledOnce();
  });

  it.each(["pdf", "note", "unexpected"])("rejects an extra file part named %s", async (name) => {
    const form = new FormData();
    form.append("pdf", new File(["%PDF-"], "cv.pdf"));
    form.append(name, new File(["%PDF-"], "extra.pdf"));
    const submission = request(form);
    expect((await readApplicationMultipart(submission, submission.headers.get("Content-Type")!)).ok).toBe(false);
  });

  it("rejects a text field named pdf", async () => {
    const form = new FormData();
    form.append("pdf", "text");
    const submission = request(form);
    expect(await readApplicationMultipart(submission, submission.headers.get("Content-Type")!))
      .toMatchObject({ ok: false, error: "invalid_pdf" });
  });

  it.each(["email", "unknown"])("rejects an ambiguous or unexpected text part named %s", async (name) => {
    const form = new FormData();
    form.append("pdf", new File(["%PDF-"], "cv.pdf"));
    form.append("email", "person@example.test");
    form.append(name, "other@example.test");
    const submission = request(form);
    expect(await readApplicationMultipart(submission, submission.headers.get("Content-Type")!))
      .toMatchObject({ ok: false, error: "invalid_request" });
  });

  it("rejects a malformed multipart body", async () => {
    const body = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(encoder.encode("no multipart boundary"));
        controller.close();
      },
    });
    expect(await readApplicationMultipart(request(body, CONTENT_TYPE), CONTENT_TYPE))
      .toMatchObject({ ok: false, error: "invalid_request" });
  });
});
