/**
 * Server-side Cloudflare Turnstile verification. A token from the browser is
 * convenience only — nothing is trusted until Cloudflare confirms it here.
 */

const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function verifyTurnstileToken(
  token: string,
  secretKey: string,
  expectedHostname: string,
  expectedAction?: string
): Promise<boolean> {
  const hostname = expectedHostname?.trim().toLowerCase();
  const action = expectedAction?.trim();
  if (!token || !secretKey || !hostname) return false;
  try {
    const response = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: secretKey, response: token }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) return false;
    const result = (await response.json()) as {
      success?: boolean;
      hostname?: string;
      action?: string;
    } | null;
    return result?.success === true &&
      typeof result.hostname === "string" &&
      result.hostname.toLowerCase() === hostname &&
      (!action || result.action === action);
  } catch {
    return false;
  }
}
