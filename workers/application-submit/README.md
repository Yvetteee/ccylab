# application-submit (Cloudflare Worker)

**Production configured and staged; public ingress is off.** [wrangler.production.toml](wrangler.production.toml) records the closed configuration. The [Phase 3 acceptance record](../../docs/audits/APPLICATION-READINESS-2026-11.md#p34-recipient-configuration-and-staged-deployment) records the active private version, staged Vercel deployment, maintenance responsibilities and rollback.

## Request and delivery

The Next.js form sends multipart application metadata and one PDF. The Worker enforces a 21 MiB aggregate byte limit while streaming to the multipart parser, applies both rate limits, validates fields and verifies the Turnstile hostname and optional action. It checks the PDF and sends the application through Resend. API acceptance returns `200 {ok:true}`. Inbox receipt requires separate verification.

| Field | Contract |
| --- | --- |
| `applicationType` | `phd` or `postdoc` |
| `submissionId` | UUID-shaped value. The frontend generates a UUID v4 and keeps it across retries of the same form. Resend uses it for idempotency. |
| `fullName`, `institution`, `degree` | Required and bounded |
| `email` | Required and syntax-checked. Used as Reply-To. |
| `intake`, `note` | Intake required for PhD. Note optional. |
| `pdf` | Exactly one file part. It must be nonempty and at most 20 MiB, with a `.pdf` extension, an absent or PDF MIME type and the `%PDF-` signature. Extra file parts, duplicate fields and unexpected fields are rejected. |
| `cf-turnstile-response`, `website` | Required valid Siteverify token and an empty honeypot field |

`OPTIONS` returns 204 for an exact allowed origin. `POST` uses 400 for invalid input, 403 for denied origins or failed Turnstile, 413 for an oversized aggregate body, 429 for a rate limit, 503 for a missing or failing limiter and 502 when Resend rejects the send. Other methods return 405. The handler logs submission ID, application type, outcome and category. The Worker has no application datastore. Applicant data and PDFs travel through Resend and can be retained there and in the recipient mailbox.

## Configuration

| Name | Where it belongs |
| --- | --- |
| `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY` | Worker secrets |
| `TURNSTILE_EXPECTED_HOSTNAME` | Required exact client hostname, scoped to the environment. Set `TURNSTILE_EXPECTED_ACTION` only when the widget caller sends the same action. |
| `APPLICATION_FROM_EMAIL`, `APPLICATION_TO_EMAIL` | Deployment-specific Worker configuration. Use an approved sender and recipient. Keep test and Production recipients isolated. |
| `ALLOWED_ORIGINS` | Exact comma-separated origins on the Worker. Production requires the official www origin. |
| `RATE_LIMITER_GLOBAL`, `RATE_LIMITER_EMAIL` | Both native Worker bindings are required for POST. Start at 20 endpoint requests and 3 per normalized email per 60 seconds, with distinct namespaces across environments. Counters are approximate and local to a Cloudflare location. |

The Vercel frontend reads `NEXT_PUBLIC_APPLICATION_API_URL`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and the optional `NEXT_PUBLIC_APPLICATION_FALLBACK_EMAIL` at build time. The first enables the Submit button. The second loads the widget. The third adds a draft mail link and requires its own recipient approval. The [frontend template](../../.env.example) and [local Worker template](.dev.vars.example) are historical development references. Use approved per-environment settings for deployments.

## Local verification

```bash
npm ci
npm run typecheck
npm run test
```

The tests exercise validation, email construction and the handler. The handler tests stub Turnstile and Resend, including their success and failure responses. They cover both application types, a near-limit PDF and same-key retry behavior. Follow the [activation plan](../../docs/audits/APPLICATION-READINESS-2026-11.md#minimum-remaining-activation-plan) before any deployment or live delivery test.

The loopback acceptance runner starts the existing Next.js frontend with temporary HTTP Basic credentials and forwards authorized requests to a Miniflare Worker with a separate server-side bearer credential. The runner uses only synthetic recipients and intercepts Worker egress. The separate test configuration ships with Worker public URLs and version previews disabled.

```bash
npx wrangler deploy --dry-run --config wrangler.testing.toml --outdir ./node_modules/.cache/application-isolated-test
node scripts/isolated-test.mjs ./node_modules/.cache/application-isolated-test/testing.js
```
