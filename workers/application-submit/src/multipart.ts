export const MAX_REQUEST_BYTES = 21 * 1024 * 1024;

const TEXT_FIELDS = new Set([
  "applicationType", "submissionId", "fullName", "email", "institution",
  "degree", "intake", "note", "cf-turnstile-response", "website",
]);

type MultipartResult =
  | { ok: true; form: FormData }
  | { ok: false; status: 400 | 413; error: string };

/** Limit bytes in flight to the native multipart parser without copying chunks. */
export async function readApplicationMultipart(
  request: Request,
  contentType: string
): Promise<MultipartResult> {
  if (!request.body) return { ok: false, status: 400, error: "invalid_request" };

  let remaining = MAX_REQUEST_BYTES;
  let oversized = false;
  const limited = request.body.pipeThrough(new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      remaining -= chunk.byteLength;
      if (remaining < 0) {
        oversized = true;
        // Erroring the pipe cancels its upstream reader and stops the parser.
        throw new Error("request_too_large");
      }
      controller.enqueue(chunk);
    },
  }));

  let form: FormData;
  try {
    form = await new Response(limited, {
      headers: { "Content-Type": contentType },
    }).formData();
  } catch {
    return oversized
      ? { ok: false, status: 413, error: "file_too_large" }
      : { ok: false, status: 400, error: "invalid_request" };
  }

  const files = form.getAll("pdf");
  if (files.length !== 1 || typeof files[0] === "string") {
    return { ok: false, status: 400, error: "invalid_pdf" };
  }

  const seen = new Set<string>();
  for (const [name, value] of form) {
    if (name === "pdf") continue;
    if (!TEXT_FIELDS.has(name) || typeof value !== "string" || seen.has(name)) {
      return { ok: false, status: 400, error: "invalid_request" };
    }
    seen.add(name);
  }
  return { ok: true, form };
}
