/**
 * Worker configuration types and small helpers. All values come from
 * environment configuration — nothing here is hard-coded per deployment.
 */

export interface Env {
  /** Resend API key (secret). */
  RESEND_API_KEY: string;
  /** Verified sending address, e.g. "applications@resend.example". */
  APPLICATION_FROM_EMAIL: string;
  /** Recipient of application emails (secret). TEST PHASE:
   *  JZHANG193@e.ntu.edu.sg — production recipient NOT YET AUTHORIZED. */
  APPLICATION_TO_EMAIL: string;
  /** Cloudflare Turnstile secret key (secret). */
  TURNSTILE_SECRET_KEY: string;
  /** Comma-separated list of origins allowed to submit applications. */
  ALLOWED_ORIGINS: string;
  /**
   * Optional native Workers rate-limiting bindings. The handler uses them
   * only when the deployment provides them
   * (RATE_LIMIT_BINDING_REQUIRES_DEPLOYMENT_CONFIGURATION otherwise).
   */
  RATE_LIMITER_GLOBAL?: RateLimitBinding;
  RATE_LIMITER_EMAIL?: RateLimitBinding;
}

export interface RateLimitBinding {
  limit(key: string): Promise<{ success: boolean }>;
}

/** Parse the comma-separated ALLOWED_ORIGINS list once per request. */
export function allowedOrigins(raw: string): string[] {
  return raw
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

/** True when the given origin is explicitly approved. */
export function isAllowedOrigin(origin: string, env: Env): boolean {
  return allowedOrigins(env.ALLOWED_ORIGINS).includes(origin);
}
