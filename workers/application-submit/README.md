# application-submit (Cloudflare Worker)

**Implemented and previously tested; Production activation pending.** The [November readiness audit](../../docs/audits/APPLICATION-READINESS-2026-11.md) records endpoint reachability, evidence limits and activation gates.

## Request and delivery

The Next.js form sends multipart application metadata and one PDF. The Worker checks method, origin, content type and declared size, applies configured rate limits, validates fields and verifies Turnstile. It checks the PDF and sends the application through Resend. API acceptance returns `200 {ok:true}`. Inbox receipt requires separate verification.

| Field | Contract |
| --- | --- |
| `applicationType` | `phd` or `postdoc` |
| `submissionId` | UUID-shaped value. The frontend generates a UUID v4 and keeps it across retries of the same form. Resend uses it for idempotency. |
| `fullName`, `institution`, `degree` | Required and bounded |
| `email` | Required and syntax-checked. Used as Reply-To. |
| `intake`, `note` | Intake required for PhD. Note optional. |
| `pdf` | First PDF part is read. The file must be nonempty and at most 20 MiB, with a `.pdf` extension, an absent or PDF MIME type and the `%PDF-` signature. |
| `cf-turnstile-response`, `website` | Required valid Siteverify token and an empty honeypot field |

`OPTIONS` returns 204 for an exact allowed origin. `POST` uses 400 for invalid input, 403 for denied origins or failed Turnstile, 429 when a configured rate limit is reached and 502 when Resend rejects the send. Other methods return 405. The handler logs submission ID, application type, outcome and category. The Worker has no application datastore. Applicant data and PDFs travel through Resend and can be retained there and in the recipient mailbox.

## Configuration

| Name | Where it belongs |
| --- | --- |
| `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY` | Worker secrets |
| `APPLICATION_FROM_EMAIL`, `APPLICATION_TO_EMAIL` | Deployment-specific Worker configuration. Use an approved sender and recipient. Keep test and Production recipients isolated. |
| `ALLOWED_ORIGINS` | Exact comma-separated origins on the Worker. Production requires the official www origin. |
| `RATE_LIMITER_GLOBAL`, `RATE_LIMITER_EMAIL` | Native Worker bindings. Tracked examples are commented out. The endpoint and per-email limits apply per Cloudflare location when configured. |

The Vercel frontend reads `NEXT_PUBLIC_APPLICATION_API_URL`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and the optional `NEXT_PUBLIC_APPLICATION_FALLBACK_EMAIL` at build time. The first enables the Submit button. The second loads the widget. The third adds a draft mail link and requires its own recipient approval. The [frontend template](../../.env.example) and [local Worker template](.dev.vars.example) are historical development references. Use approved per-environment settings for deployments.

## Local verification

```bash
npm ci
npm run typecheck
npm run test
```

The tests exercise validation, email construction and the handler. The handler tests stub Turnstile and Resend, including their success and failure responses. They cover both application types, a near-limit PDF and same-key retry behavior. Follow the [activation plan](../../docs/audits/APPLICATION-READINESS-2026-11.md#minimum-remaining-activation-plan) before any deployment or live delivery test.
