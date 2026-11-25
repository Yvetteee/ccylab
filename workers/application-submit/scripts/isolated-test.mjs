import assert from "node:assert/strict";
import { randomBytes, randomUUID, timingSafeEqual } from "node:crypto";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";
import { convertV4MiniflareOptions, Miniflare } from "miniflare";

// Only loopback ingress and synthetic data. All Worker fetches are intercepted.
const hostname = "127.0.0.1";
const workerUrl = "http://worker.invalid/";
const submitPath = "/__application_test";
const basic = `Basic ${Buffer.from(`tester:${randomBytes(32).toString("hex")}`).toString("base64")}`;
const basicBytes = Buffer.from(basic);
const bearer = randomBytes(32).toString("hex");
const bundle = process.argv[2];
assert.ok(bundle, "Pass the path to testing.js from the isolated Wrangler dry-run.");
const root = fileURLToPath(new URL("../../../", import.meta.url));
const next = createRequire(new URL("../../../package.json", import.meta.url))("next");
const mockAttachmentSizes = [];

function authenticated(actual) {
  if (typeof actual !== "string") return false;
  const bytes = Buffer.from(actual);
  return bytes.length === basicBytes.length && timingSafeEqual(bytes, basicBytes);
}

const server = createServer((request, response) => {
  void handle(request, response).catch(() => {
    if (response.headersSent) response.destroy();
    else response.writeHead(500).end("Local check failed");
  });
});
await new Promise((accept, reject) => server.on("error", reject).listen(0, hostname, accept));
const { port } = server.address();
const origin = `http://${hostname}:${port}`;
let site;
let worker;

async function handle(request, response) {
  response.setHeader("Cache-Control", "no-store");
  if (request.headers.host !== `${hostname}:${port}` || !authenticated(request.headers.authorization)) {
    response.writeHead(401, { "WWW-Authenticate": 'Basic realm="Local application test"' }).end();
    return;
  }
  if (request.url !== submitPath) {
    await site.getRequestHandler()(request, response);
    return;
  }
  if (request.method !== "POST") {
    response.writeHead(405).end();
    return;
  }
  const headers = new Headers({ Authorization: `Bearer ${bearer}` });
  for (const name of ["origin", "content-type", "content-length"]) {
    if (typeof request.headers[name] === "string") headers.set(name, request.headers[name]);
  }
  const result = await worker.dispatchFetch(workerUrl, {
    method: "POST", headers, body: Readable.toWeb(request), duplex: "half",
  });
  response.writeHead(result.status, { "Content-Type": result.headers.get("Content-Type") });
  await pipeline(Readable.fromWeb(result.body), response);
}

function submission(type, size, token = "synthetic-token", email = `${type}@example.test`) {
  const form = new FormData();
  Object.entries({
    applicationType: type, submissionId: randomUUID(), fullName: "Synthetic Applicant",
    email, institution: "Example University", degree: "Chemistry",
    ...(type === "phd" ? { intake: "Synthetic intake" } : {}),
  }).forEach(([name, value]) => form.set(name, value));
  if (token) form.set("cf-turnstile-response", token);
  const bytes = new Uint8Array(size);
  bytes.set(new TextEncoder().encode("%PDF-"));
  form.set("pdf", new File([bytes], "synthetic.pdf", { type: "application/pdf" }));
  return form;
}

async function assertStatus(response, expected, label) {
  assert.equal(response.status, expected, label);
  await response.arrayBuffer();
  console.log(`${label}: ${expected}`);
}

try {
  worker = new Miniflare(convertV4MiniflareOptions({
    name: "local-isolated-applications",
    scriptPath: resolve(bundle),
    modules: true,
    compatibilityDate: "2026-08-01",
    host: hostname,
    cf: false,
    bindings: {
      TEST_INGRESS_TOKEN: bearer, ALLOWED_ORIGINS: origin, TURNSTILE_EXPECTED_HOSTNAME: hostname,
      TURNSTILE_SECRET_KEY: "mock-siteverify", RESEND_API_KEY: "mock-resend",
      APPLICATION_FROM_EMAIL: "applications@example.test", APPLICATION_TO_EMAIL: "intake@example.test",
    },
    ratelimits: {
      RATE_LIMITER_GLOBAL: { namespace_id: "31031", simple: { limit: 20, period: 60 } },
      RATE_LIMITER_EMAIL: { namespace_id: "31032", simple: { limit: 3, period: 60 } },
    },
    outboundService: async (request) => {
      const url = new URL(request.url);
      if (url.hostname === "challenges.cloudflare.com" && url.pathname.endsWith("/siteverify")) {
        return Response.json({ success: true, hostname });
      }
      if (url.hostname === "api.resend.com" && url.pathname === "/emails") {
        const payload = await request.json();
        assert.equal(payload.to, "intake@example.test");
        assert.match(payload.reply_to, /@example\.test$/);
        mockAttachmentSizes.push(payload.attachments[0].content.length);
        return Response.json({ id: "simulated-acceptance" });
      }
      throw new Error("Outbound networking is disabled");
    },
  }));

  process.env.NEXT_TELEMETRY_DISABLED = "1";
  process.env.SITE_INDEXABLE = "false";
  process.env.NEXT_PUBLIC_APPLICATION_API_URL = origin + submitPath;
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = "1x00000000000000000000AA";
  process.env.NEXT_PUBLIC_APPLICATION_FALLBACK_EMAIL = "";
  site = next({ dev: true, dir: root, hostname, port, httpServer: server, webpack: true });
  await site.prepare();

  await assertStatus(await fetch(origin + "/apply/phd"), 401, "anonymous frontend");
  await assertStatus(await fetch(origin + "/apply/postdoc", { headers: { Authorization: basic } }), 200, "authenticated frontend");
  const submit = (body, csrfOrigin = origin, authorization = basic) => fetch(origin + submitPath, {
    method: "POST", body, headers: { Origin: csrfOrigin, Authorization: authorization },
  });
  await assertStatus(await submit(submission("phd", 512), origin, ""), 401, "anonymous relay");
  await assertStatus(await worker.dispatchFetch(workerUrl, {
    method: "POST", headers: { Origin: origin }, body: submission("phd", 512),
  }), 401, "direct Worker without server credential");
  await assertStatus(await submit(submission("phd", 512), "https://other.example.test"), 403, "foreign origin");
  await assertStatus(await submit(submission("phd", 512)), 200, "synthetic small PhD");
  await assertStatus(await submit(submission("postdoc", 20 * 1024 * 1024)), 200, "20 MiB synthetic Postdoc");
  const oversized = new Request(workerUrl, {
    method: "POST", body: submission("phd", 21 * 1024 * 1024),
  });
  await assertStatus(await fetch(origin + submitPath, {
    method: "POST", body: oversized.body, duplex: "half",
    headers: {
      Origin: origin, Authorization: basic, "Content-Type": oversized.headers.get("Content-Type"),
    },
  }), 413, "streamed request over 21 MiB");
  for (const expected of [403, 403, 403, 429]) {
    await assertStatus(await submit(submission("phd", 512, "", "limit@example.test")), expected, "native per-email limiter");
  }
  for (let index = 0; index < 13; index++) {
    const result = await submit(submission("phd", 512, "", `limit-${index}@example.test`));
    assert.equal(result.status, 403);
    await result.arrayBuffer();
  }
  await assertStatus(await submit(submission("phd", 512, "", "endpoint-limit@example.test")), 429, "native endpoint limiter");
  assert.deepEqual(mockAttachmentSizes, [684, 27_962_028]);
  console.log("Mocked provider: two payloads accepted. No emails sent.");
} finally {
  const ingressClosed = new Promise((done) => server.close(done));
  server.closeAllConnections();
  await Promise.all([ingressClosed, worker?.dispose(), site?.close()]);
}

// Next development may keep a watcher alive after the servers have closed.
await new Promise((done) => process.stdout.write("", done));
process.exit(0);
