import type { NextConfig } from "next";

// 'unsafe-eval' is only needed by React debugging in dev (Next.js CSP
// guidance); production ships without it.
const isDev = process.env.NODE_ENV === "development";

// Cloudflare Turnstile (application forms) and the configured application
// Worker are the only external endpoints this site talks to. The Worker
// origin comes from build-time configuration — no wildcards.
const TURNSTILE_ORIGIN = "https://challenges.cloudflare.com";
let workerOrigin = "";
try {
  const apiUrl = process.env.NEXT_PUBLIC_APPLICATION_API_URL?.trim();
  workerOrigin = apiUrl ? new URL(apiUrl).origin : "";
} catch {
  workerOrigin = "";
}

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} ${TURNSTILE_ORIGIN}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      `connect-src 'self'${workerOrigin ? ` ${workerOrigin}` : ""}`,
      `frame-src https://www.google.com https://maps.google.com ${TURNSTILE_ORIGIN}`,
      "frame-ancestors 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
