# application-submit (Cloudflare Worker)

Receives group applications (metadata + one PDF), validates them, delivers
them through [Resend](https://resend.com) and returns a result.

Request → validate → send → discard. **No applicant data or PDF is stored**
anywhere — no database, KV, R2, D1, Blob or repository archive.

## Flow

```
Vercel frontend (form + Turnstile)
  ↓ multipart/form-data
Cloudflare Worker (this Worker: origin check → rate limit → field validation
  → honeypot → Turnstile server verification → PDF validation)
  ↓ Resend (attachment + Reply-To)
APPLICATION_TO_EMAIL mailbox
```

## API

`POST /` — `multipart/form-data` only.

| Field | Notes |
| --- | --- |
| `applicationType` | `phd` or `postdoc` |
| `submissionId` | UUID v4 from the frontend; stable across retries; basis of the Resend idempotency key |
| `fullName`, `institution`, `degree` | required, bounded |
| `email` | required, syntax-validated; used as Reply-To (never as From) |
| `intake` | required for `phd` only |
| `note` | optional |
| `pdf` | exactly one file, 0 < size ≤ 20 MiB, `.pdf` extension, `application/pdf`, `%PDF-` magic bytes |
| `cf-turnstile-response` | Turnstile token — verified server-side with Cloudflare Siteverify |
| `website` | honeypot — must stay empty; filled submissions get a generic rejection |

Responses: `200 {ok:true}` · `400` validation · `403` origin/Turnstile ·
`429` rate limit · `502` delivery failure. All client-facing messages are
generic; no internals, tokens or configuration are echoed. Logs contain only
submission id, application type, outcome and a coarse error category.

## Configuration

Worker secrets (`wrangler secret put <NAME>`):

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key |
| `APPLICATION_FROM_EMAIL` | verified sending address |
| `APPLICATION_TO_EMAIL` | application recipient |
| `TURNSTILE_SECRET_KEY` | Turnstile secret key |

Non-secret (`[vars]` or dashboard):

| Variable | Purpose |
| --- | --- |
| `ALLOWED_ORIGINS` | comma-separated origins allowed to submit (CORS + origin check) |

**Recipients**

```
TEST PHASE (approved):          APPLICATION_TO_EMAIL=JZHANG193@e.ntu.edu.sg
PRODUCTION RECIPIENT:           NOT YET AUTHORIZED
```

Changing the recipient requires explicit human authorization; it is
configuration only (`APPLICATION_TO_EMAIL`), never a source-code change.

**Rate limiting** uses the native Workers rate-limiting bindings
(`RATE_LIMITER_GLOBAL` ≈ 20/min endpoint-wide, `RATE_LIMITER_EMAIL` ≈ 3/min
per normalized applicant email). The bindings require deployment-level
configuration — see the commented block in `wrangler.toml`
(`RATE_LIMIT_BINDING_REQUIRES_DEPLOYMENT_CONFIGURATION`). Until they are
enabled, Turnstile server verification, origin validation, the honeypot and
strict field/file validation remain the active defenses.

## Frontend counterpart

The Next.js frontend reads (build time, see `.env.example`):

```
NEXT_PUBLIC_APPLICATION_API_URL=       # this Worker's URL
NEXT_PUBLIC_TURNSTILE_SITE_KEY=        # Turnstile site key (Managed mode)
NEXT_PUBLIC_APPLICATION_FALLBACK_EMAIL=JZHANG193@e.ntu.edu.sg
```

With no API URL configured the form disables online submission and keeps the
secondary email fallback available.

## Development

```bash
npm install
npm run typecheck   # tsc --noEmit
npm run test        # vitest (validation, email construction, handler contract)
npm run dry-run     # wrangler deploy --dry-run (offline bundle check)
```

Local secrets: copy `.dev.vars.example` to `.dev.vars` (Turnstile provides
test keys: `1x0000…AA` always passes, `2x0000…AB` always fails).

## Deployment checklist (EXTERNAL_SETUP_REQUIRED)

1. `wrangler deploy` (Cloudflare account access required).
2. Create a Turnstile widget (Managed) → set the site key in Vercel env, the
   secret key via `wrangler secret put`.
3. Verify a sending domain/address in Resend → `RESEND_API_KEY` +
   `APPLICATION_FROM_EMAIL` via `wrangler secret put`.
4. Set `ALLOWED_ORIGINS` to the exact frontend origins (preview + production).
5. Enable the rate-limiting bindings if the account supports them.
6. Live test sends go ONLY to `JZHANG193@e.ntu.edu.sg` (one small, one
   near-limit) until the production recipient is authorized.
