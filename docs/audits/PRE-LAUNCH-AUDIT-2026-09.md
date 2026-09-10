# Pre-Launch Website Audit — 2026-09

- Baseline: `Yvetteee/ccylab:website-v2` @ `ea29abdfb0c94675b51ad1f438a4c47aae0c6ca7`
- Audit date: 2026-09-10
- Scope: full route/content/security/dependency/repository audit before
  Join Us activation and domain cutover.
- Method: build + local production server, SSR DOM analysis (RSC flight
  payloads excluded), blob-level repository comparison, read-only Vercel/CLI
  probes. No secrets printed.

## Route matrix (22 checked — all PASS)

`/` `/research` `/dr-ye` `/people` `/people/{8 member slugs}`
`/publications` `/news` `/join` `/apply/phd` `/apply/postdoc` `/contact`
`/robots.txt` `/sitemap.xml` → 200; invalid member slug & unknown route → 404.
`/projects` retained intentionally hidden (200 + `noindex` meta).

## Findings

### P1 — HIGH (report only, remediation requires authorised task)

1. **next 16.3.2 — critical advisories (RCE)**
   - GHSA: "Unauthenticated RCE on windows-hosted servers" and
     "Unauthenticated RCE in Image Optimization API (AVIF)".
   - Reachability: production runs on Vercel (Linux) — the Windows-hosted RCE
     does not apply there; AVIF image-optimization reachability not fully
     ruleable from here. Local Windows development machines ARE in scope.
   - Fix: `next@16.3.4` (patch-level, `fixAvailable` non-major).
   - Not auto-fixed: Phase W forbids Next upgrades without a separate
     authorised remediation task.

2. **sharp — high (libheif, GHSA-g89c-p67h-r497 / GHSA-2jg2-4ch7-h545)**
   - Used by Next image optimization; fix available. Report only (same rule).

### P2 — MEDIUM

1. **Worker `ALLOWED_ORIGINS` does not include the new deployment origins**
   (probed: old lab-website preview → 204; `ccylab-v2.vercel.app` /
   `www.ccylab.com` → 403). Blocks Join Us online submission and the future
   cutover. Platform configuration task — not a code defect.
2. **Join Us frontend env absent on ccylab-v2** (`NEXT_PUBLIC_APPLICATION_API_URL`,
   `NEXT_PUBLIC_TURNSTILE_SITE_KEY`): form renders in safe disabled state with
   setup notice. Expected pre-activation state; configure with the Worker
   deploy (single authorised activation task).

### P3 — LOW

1. **`.dev.vars` not ignored** for `workers/application-submit/` — the
   Cloudflare convention for local Worker secrets. Fixed in this pass
   (worker `.gitignore`).
2. **`.env.example` missing** from this repository (excluded during the v2
   import). Restored in this pass as a placeholder-only template; four
   site variables it documents are referenced by code.
3. **`Thumbs.db` not ignored** (Windows OS junk; `.DS_Store` already was).
   Fixed in this pass.
4. **Orphaned image assets (7)** — zero references in code/CSS; kept for
   provenance/rollback: `public/images/group-wide.svg`, `hero-group.svg`,
   `research-1/2/3.svg`, `public/images/legacy/NTU.png` (6.2 MB),
   `legacy/chunchun_PI.png`, `legacy/kaiping-zhu.png` (superseded by the new
   source photo this week). Defer to a later authorised cleanup if desired.
5. **Large legacy originals** in `public/images/legacy/` (up to 6.2 MB).
   Served through Next/Image optimisation; keep as originals. INFO-level.

### INFO

- `SITE_INDEXABLE` unset → robots `Disallow: /` site-wide (intentional
  pre-launch state; verified on production preview and local build).
- Git integration for `ccylab-v2` not connected (GitHub App authorisation);
  production deploys are manual CLI from a clean website-v2 tree.
- Data-model wording legacy notes: member role "Research Associate" inside
  the "Research Assistants" group; legacy phrase "The Ye Lab" inside one
  news summary. Both predate Version B and are member/content sourced.

### OPTIONAL_DESIGN_NOTE

- None raised by this audit.

## Security summary

- No secrets in the tracked tree (10-pattern scan, incl. filename history).
- No `dangerouslySetInnerHTML` / `innerHTML` / `eval` / `new Function`.
- All 11 `target="_blank"` anchors carry `rel` (noopener/noreferrer).
- `NEXT_PUBLIC_*` limited to the four documented public-by-design variables.
- CSP: strict default; `unsafe-inline` script/style present (Next.js/
  Turnstile requirement), external endpoints limited to Turnstile +
  configured Worker origin; no wildcards. No change made.
- Worker: origin allow-list, honeypot, Turnstile siteverify, PDF magic-byte
  validation, idempotency key, 42/42 unit tests passing.

## Repository classification

RUNTIME_SOURCE: app/, components/, lib/, styles/, types/, content/
STATIC_ASSET: public/images/**
DOCUMENTATION: README.md, docs/ (18 historical design/migration records),
AGENTS.md, CLAUDE.md, docs/PEOPLE-FINAL-V1.md
TOOLING: package*.json, tsconfig.json, eslint.config.mjs, next.config.ts,
workers/application-submit/ (deployable sub-project)
DEPLOYMENT_CONFIG: CNAME (legacy GitHub Pages rollback — retained),
workers/application-submit/wrangler.toml
GENERATED/LOCAL (untracked): .next/, node_modules/, .vercel/

## Post-audit hygiene applied (this pass)

- `workers/application-submit/.gitignore`: + `.dev.vars`
- root `.gitignore`: + `Thumbs.db`
- `.env.example`: restored placeholder-only template (values empty)
- `docs/REPOSITORY-STRUCTURE.md`: added
- `README.md`: references `.env.example`

No runtime code, content, People, Join Us, canonical, robots, or Vercel
configuration was modified by the hygiene pass (verified by diff review
and route re-smoke).
