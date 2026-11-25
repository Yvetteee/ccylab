# application-submit (Cloudflare Worker)

**Production is live.** `application-submit-production` serves version `2f91c9bb-c489-48b9-a3c2-0e8bde05ea17` at 100%. The `workers.dev` ingress is enabled and version previews are disabled. [`wrangler.production.toml`](wrangler.production.toml) records the released configuration. [`wrangler.toml`](wrangler.toml) belongs to the historical Worker. [Production activation and acceptance](../../docs/audits/APPLICATION-READINESS-2026-11.md#production-activation-and-acceptance)

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
| `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, `APPLICATION_TO_EMAIL` | Production Worker secrets. Use a sending-only Resend key restricted to `send.ccylab.com`. The approved recipient is `chunchun.ye@ntu.edu.sg`. |
| `TURNSTILE_EXPECTED_HOSTNAME` | Required exact client hostname, scoped to the environment. Set `TURNSTILE_EXPECTED_ACTION` only when the widget caller sends the same action. |
| `APPLICATION_FROM_EMAIL` | Production configuration with the verified sender `The Ye Group Applications <applications@send.ccylab.com>`. |
| `ALLOWED_ORIGINS` | Exact comma-separated origins on the Worker. Production requires the official www origin. |
| `RATE_LIMITER_GLOBAL`, `RATE_LIMITER_EMAIL` | Both native Worker bindings are required for POST. Start at 20 endpoint requests and 3 per normalized email per 60 seconds, with distinct namespaces across environments. Counters are approximate and local to a Cloudflare location. |

The Vercel frontend reads `NEXT_PUBLIC_APPLICATION_API_URL`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and the optional `NEXT_PUBLIC_APPLICATION_FALLBACK_EMAIL` at build time. The first enables the Submit button. The second loads the widget. The third adds the approved draft email link to `chunchun.ye@ntu.edu.sg`. Keep all three application variables scoped to Vercel Production. The [frontend template](../../.env.example) and [local Worker template](.dev.vars.example) are historical development references. Use approved per-environment settings for deployments.

## Local verification

```bash
npm ci
npm run typecheck
npm run test
```

The tests exercise validation, email construction and the handler. The handler tests stub Turnstile and Resend, including their success and failure responses. They cover both application types, a near-limit PDF and same-key retry behavior. Follow the Production maintenance and recovery procedures below after any authorized change. Run delivery tests only within the approved recipient and message scope.

The loopback acceptance runner starts the existing Next.js frontend with temporary HTTP Basic credentials and forwards authorized requests to a Miniflare Worker with a separate server-side bearer credential. The runner uses only synthetic recipients and intercepts Worker egress. The separate test configuration ships with Worker public URLs and version previews disabled.

```bash
npx wrangler deploy --dry-run --config wrangler.testing.toml --outdir ./node_modules/.cache/application-isolated-test
node scripts/isolated-test.mjs ./node_modules/.cache/application-isolated-test/testing.js
```

## Routine Production maintenance

- Check [PhD](https://www.ccylab.com/apply/phd) and [Postdoc](https://www.ccylab.com/apply/postdoc) for enabled Submit controls, the Turnstile widget and the approved email fallback. A non-delivery `OPTIONS` check allows `https://www.ccylab.com` with `204` and rejects other origins with `403`. The Worker endpoint returns `405` for `GET`. Use these checks for routine availability.
- Inspect the Cloudflare deployment version and Worker outcomes by submission ID. Review `403` validation failures, `429` rate limits, `502` delivery failures and `503` missing or failed limiter bindings. The endpoint and normalized-email limits are 20 and 3 requests per 60 seconds in namespaces `31041` and `31042`. They are approximate and location-local. Use existing events to investigate spikes and reproduce rate limits in isolation.
- In Resend, check Emails and Logs for acceptance, failures, bounces, delays and delivery. Check current transactional usage and sending limits in the account before a recruitment period. For ambiguous browser failures, search by submission ID before considering a retry. Resend deduplicates same-key, same-payload requests for 24 hours. A new form session or manual fallback email can produce a duplicate. [Resend idempotency](https://resend.com/docs/dashboard/emails/idempotency-keys)
- For an approved recipient change, the Worker operator sets `APPLICATION_TO_EMAIL` via `npx wrangler secret put APPLICATION_TO_EMAIL --config wrangler.production.toml --name application-submit-production`. This creates and deploys a Worker version. Coordinate an approved fallback change with the Vercel operator. Update the Production-only fallback variable and applicable Join Us instructions, stage the website build and verify its fallback before promotion.
- The Cloudflare administrator owns the managed Turnstile widget for `www.ccylab.com` and the Worker secret. The Resend administrator maintains the domain-scoped sending key and sending-domain verification. Rotate secrets in the named Production Worker, verify both required credential bindings and keep keys out of Git and Vercel. A changed Turnstile site key requires a matching staged Vercel build. [Cloudflare Worker secrets](https://developers.cloudflare.com/workers/configuration/secrets/)
- The NTU mailbox owner manages authorized access, retention and deletion under institutional arrangements. The Worker retains no application datastore. Resend documents US storage and 30 days of email and log retention for this plan tier. The Resend account owner handles authorized early deletion requests using the relevant message IDs. Put only redacted operational identifiers in the release record. [Resend data handling](https://resend.com/security/gdpr)

## Recovery and shutdown

| Incident | Recovery |
| --- | --- |
| Website-only deployment failure | Roll back Vercel to the last healthy website build compatible with the live Worker. The handover baseline is `dpl_CDyqiByvYa9VEz2Mp1RgWey7rSEu`. Verify the canonical URLs, application pages and indexing. |
| Application backend failure | Compare active Worker versions and bindings. When a later Worker change causes the failure, the known-good version is `2f91c9bb-c489-48b9-a3c2-0e8bde05ea17`. From the Worker directory, run `npx wrangler rollback 2f91c9bb-c489-48b9-a3c2-0e8bde05ea17 --config wrangler.production.toml --name application-submit-production` only after confirming its recipient and credentials remain authorized. Verify the active version and run non-delivery checks. |
| Email delivery failure | Check the affected Worker submission ID, Resend rejection or delivery events, usage and NTU mailbox routing. Use the existing approved email fallback while resolving the failure. Confirm delivery state before any resend. |
| Credential compromise | Close intake if needed, revoke the affected Resend credential or rotate the Turnstile secret, install the replacement in the Production Worker and verify both bindings and the notification path through the approved scopes. Exclude versions containing compromised credentials from rollback. |
| Complete application shutdown | First close Production Worker ingress as described below. Then roll Vercel back to `dpl_A7rMVanqRS8UJBn7eUWDBG3qKu7h` and restore the pre-activation Production application variables. Verify both Submit buttons are disabled on the canonical website. Keep `SITE_INDEXABLE=true`, DNS and the existing Join Us email route. |

For immediate Worker shutdown, make a temporary copy of `wrangler.production.toml` with `workers_dev = false`, `preview_urls = false` and `routes = []`. Keep the entry point resolvable by using an absolute `main` path if the copy is outside the Worker directory. Run `npx wrangler triggers deploy --config <closed-config> --name application-submit-production` to update ingress without rebuilding the Worker. Verify external HTTP `404`. The pre-activation Vercel target had the three application environment variables absent. Remove `NEXT_PUBLIC_APPLICATION_API_URL`, `NEXT_PUBLIC_APPLICATION_FALLBACK_EMAIL` and `NEXT_PUBLIC_TURNSTILE_SITE_KEY` from the Production scope when completing shutdown. [Cloudflare workers.dev settings](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/) · [Cloudflare rollback](https://developers.cloudflare.com/workers/versions-and-deployments/rollbacks/)
