# Repository Structure

Practical map of the current website-v2 architecture and where maintenance
happens.

## Runtime directories

| Path | Responsibility |
| --- | --- |
| `app/` | Next.js App Router pages/routes, root layout, metadata, robots, sitemap. Each directory is a route (`dr-ye/`, `people/[slug]/`, `apply/[type]/`, …). |
| `components/` | UI building blocks: `layout/` (header/nav/footer), `ui/` (PageContainer, Section, ResponsiveImage, …), `content/` (data-driven sections: MemberRow, DrYeProfile, NewsRow, …), `home/`, `apply/`. |
| `content/` | **Single source of truth for site content** — typed data files (`site.ts`, `people.ts`, `pi.ts`, `publications.ts`, `publication-themes.ts`, `research-areas.ts`, `projects.ts`, `news.ts`, `opportunities.ts`) consumed via the `@/content` barrel. |
| `lib/` | Pure helpers: metadata factory, people grouping, news/format helpers, indexing control. |
| `types/` | Shared content types (`types/content.ts`). |
| `styles/` | Design tokens (`tokens.css`) + base/reset styles. Components use CSS Modules. |
| `public/images/` | Static assets. `legacy/` = originals migrated from the first-generation site; `people/` = derived member portraits. |
| `workers/application-submit/` | Independent Cloudflare Worker sub-project (Join Us application intake → Resend). Has its own package.json, tests (vitest), and `wrangler.toml`. |

## Root-only files (tooling expects them here)

`package.json` / `package-lock.json` (npm), `next.config.ts` (framework config +
security headers), `tsconfig.json`, `eslint.config.mjs`, `next-env.d.ts`
(generated), `.gitignore`, `.env.example` (placeholder env template),
`.vercel/` (untracked local project link).

## Deliberate non-runtime content

- `CNAME` — legacy GitHub Pages production config (kept for rollback; do not
  remove while www.ccylab.com serves the legacy deployment).
- `docs/` — historical design-decision and migration records, plus
  `docs/PEOPLE-FINAL-V1.md` (frozen People design authority) and
  `docs/audits/` (pre-launch audits).
- `AGENTS.md` / `CLAUDE.md` — AI-assistant working instructions.

## Not tracked

`node_modules/`, `.next/`, `.vercel/`, env/secret files (`.env*`,
`workers/application-submit/.dev.vars`), build caches.
