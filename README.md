# The Ye Group Website (v2)

Repository for the research group website of **Chunchun Ye (CCY Lab)**,
School of Civil and Environmental Engineering, Nanyang Technological
University. The site presents the group's research, publications, news and
open positions, and receives PhD / postdoc applications online.

This branch (`website-v2`) carries the new website architecture. The previous
static site still lives on `main`.

## Current status (migration note)

- `main` is the **legacy production** branch: a static HTML site published via
  GitHub Pages (`CNAME` retained at the repository root).
- `website-v2` is the **new architecture** branch: a Next.js application.
- Production cutover has **not** happened: www.ccylab.com is still served by
  the legacy deployment, and no deployment channel is configured in this
  repository for `website-v2` yet.
- Do not change production deployment, DNS or domain settings without an
  explicit, confirmed decision.

Remove or rewrite this note once the production cutover is complete.

## Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- CSS Modules with central design tokens (`styles/tokens.css`)
- Content as typed TypeScript data files (no CMS, no database)
- **Cloudflare Worker** (`workers/application-submit/`) — server-side
  application intake
- **Resend** — transactional email delivery from the Worker
- **Cloudflare Turnstile** — spam/abuse protection on the application form
- Intended hosting for this branch: Vercel (not yet connected in this
  repository)

## Repository structure

```text
app/                  Pages and routes (App Router)
  dr-ye/              PI profile page (/dr-ye)
  apply/[type]/       Application form pages (/apply/phd, /apply/postdoc)
  robots.ts, sitemap.ts
components/
  layout/             SiteHeader, MainNavigation, SiteFooter
  ui/                 PageContainer, Section, PageHeader, ResponsiveImage, ...
  content/            Data-driven sections: PIProfile, MemberRow, NewsRow, ...
  apply/              Application form (client component)
  home/               Home page sections
content/              Single source of truth for site content (typed data)
lib/                  Helpers: metadata factory, grouping/formatting, indexing
types/                Shared content types
styles/               Design tokens + base styles
public/images/        Static assets (incl. public/images/legacy/ originals)
workers/
  application-submit/ Cloudflare Worker: receives applications, sends email
docs/                 Design-decision and migration documentation
```

## Content maintenance

Page content lives in `content/` — edit the typed data file, commit, deploy.
TypeScript keeps the shape honest; a section renders only when its data
exists.

| To update | Edit |
| --- | --- |
| Site identity, navigation, contact details | `content/site.ts` |
| PI profile (bio, career, education, awards, quote) | `content/pi.ts` (rendered on `/dr-ye`) |
| Team members and their bios | `content/people.ts` (listed on `/people`) |
| Research areas | `content/research-areas.ts` |
| Publications | `content/publications.ts`, themes in `content/publication-themes.ts` |
| Projects | `content/projects.ts` |
| News items | `content/news.ts` |
| Join Us / vacancy text | `content/opportunities.ts` |
| Images | `public/images/` (legacy originals under `public/images/legacy/`) |

News items carry a `date` (sort key) plus an optional `displayDate` (shown to
visitors), so dates are never displayed with more precision than the source
supports. After editing content, run `npm run build` locally before pushing.

## Local development

```bash
npm install     # once per clone
npm run dev     # development server
npm run lint    # eslint
npx tsc --noEmit
npm run build   # production build
npm start       # serve the production build locally
```

Requires Node.js (a current LTS release; no version is pinned in this
repository) and npm.

## Branch model

| Branch | Role |
| --- | --- |
| `main` | Legacy static site — current production (frozen content) |
| `website-v2` | New Next.js site — maintenance and validation branch |

Practical rules:

- Never force-push; do not commit to `main`.
- Significant changes land on `website-v2` and are validated in a preview
  deployment before any production decision.
- Production cutover (deployment + DNS) is a separate, explicitly confirmed
  change — not part of routine content maintenance.

## Deployment

Current reality:

```text
main (static site)   →  GitHub Pages  →  www.ccylab.com   (production, legacy)
website-v2 (Next.js) →  (deployment channel not yet connected in this repo)
```

The intended flow for `website-v2` is GitHub → Vercel → preview URL for
validation, with production only after an explicit cutover decision. Vercel
injects environment variables at build time, so changing indexability or
application settings requires a redeployment.

## Join Us / application form

- `/join` presents open positions (content in `content/opportunities.ts`).
- `/apply/phd` and `/apply/postdoc` render the application form
  (`components/apply/ApplicationForm.tsx`): application details plus **one CV
  PDF (≤ 20 MB)**.
- The form posts to a Cloudflare Worker (`workers/application-submit/`) which
  validates the submission (allowed origins, size limits, honeypot, Turnstile
  verification, PDF magic bytes) and delivers it by email through **Resend**.
- Everything runs **server-side** in the Worker; nothing about an applicant is
  persisted, and the browser never holds any API key or secret. Worker
  credentials are Cloudflare secrets (`wrangler secret put`), never committed.
- When `NEXT_PUBLIC_APPLICATION_API_URL` is not configured, the form falls
  back to a clearly-labelled email submission instead of online submission.

Current email state: the integration is configured and tested for the
preview/test phase only, with an approved NTU test recipient. Production
sending still requires a verified sender domain (and possibly DNS records)
and an authorised production recipient. Do not point the form at production
recipients without explicit approval.

## Environment variables

Names only — never commit values.

Next.js application (set in the deployment platform; read at build time):

| Variable | Purpose |
| --- | --- |
| `SITE_INDEXABLE` | Server-only; `true` enables search-engine indexing (`app/robots.ts`, meta robots). Default keeps the site unindexed. |
| `NEXT_PUBLIC_APPLICATION_API_URL` | URL of the application Worker. Empty disables online submission (email fallback). |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Public Turnstile site key; empty skips the widget. |
| `NEXT_PUBLIC_APPLICATION_FALLBACK_EMAIL` | Recipient shown in the email-fallback path. |

Cloudflare Worker (secrets/vars on the Worker, never in the repo):

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key used to deliver application emails. |
| `APPLICATION_FROM_EMAIL` | Verified sender address. |
| `APPLICATION_TO_EMAIL` | Application recipient (test phase only for now). |
| `TURNSTILE_SECRET_KEY` | Server-side Turnstile verification key. |
| `ALLOWED_ORIGINS` | Comma-separated origins allowed to submit. |

## Domains & DNS

- `www.ccylab.com` is the public website domain. DNS is managed separately
  from this repository (registrar / DNS provider, domain administrator).
- The `CNAME` file at the repository root belongs to the legacy GitHub Pages
  setup on `main`; leave it untouched while that deployment is live.
- Moving production to Vercel later requires a DNS cutover by the domain
  administrator; enabling production email sending may additionally require
  sender-domain verification records. Neither has been done yet.

## Safety notes

- Never commit `.env` files, API keys, tokens, secrets, `node_modules/`,
  `.next/` or build caches.
- Resend / Turnstile / Worker credentials live only in platform environment
  variables and Cloudflare secrets.
- Do not modify production deployment, DNS or domain settings without an
  explicit, confirmed decision; validate significant changes in a preview
  first.

## Further documentation

`docs/` contains the design-decision and migration records produced while
building this version (legacy design DNA, per-page audits, content mapping,
application-flow design). They are historical references, not living
operational docs.
