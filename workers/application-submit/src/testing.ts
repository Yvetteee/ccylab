import type { Env } from "./config";
import application from "./index";

interface TestEnv extends Env {
  TEST_INGRESS_TOKEN?: string;
}

const encoder = new TextEncoder();

async function authorized(request: Request, configuredToken?: string): Promise<boolean> {
  const supplied = request.headers.get("Authorization") ?? "";
  if (!configuredToken || configuredToken.length < 32 || supplied.length > 256) return false;

  const [actual, expected] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(supplied)),
    crypto.subtle.digest("SHA-256", encoder.encode(`Bearer ${configuredToken}`)),
  ]);
  return crypto.subtle.timingSafeEqual(actual, expected);
}

export default {
  async fetch(request: Request, env: TestEnv): Promise<Response> {
    if (!(await authorized(request, env.TEST_INGRESS_TOKEN))) {
      return Response.json({ ok: false, error: "unauthorized" }, {
        status: 401,
        headers: { "Cache-Control": "no-store" },
      });
    }
    return application.fetch(request, env);
  },
};
