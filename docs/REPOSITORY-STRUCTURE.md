# Repository Structure

Practical map of the current website-v2 architecture: where maintenance
happens, where new assets belong, and the asset ownership policy.

## Runtime directories

| Path | Responsibility |
| --- | --- |
| `app/` | Next.js App Router pages/routes, root layout, metadata, robots, sitemap. Each directory is a route (`dr-ye/`, `people/[slug]/`, `apply/[type]/`, `projects/` (intentionally minimal, noindex), …). |
| `components/` | UI building blocks: `layout/` (header/nav/footer), `ui/` (PageContainer, Section, ResponsiveImage, …), `content/` (data-driven sections: MemberRow, DrYeProfile, NewsRow, PeopleOriginsVisual, …), `home/` (Hero, FeaturedResearch, LatestNews, …), `apply/` (ApplicationForm). |
| `content/` | **Single source of truth for site content** — typed data files (`site.ts`, `people.ts`, `pi.ts`, `publications.ts`, `publication-themes.ts`, `research-areas.ts`, `news.ts`, `opportunities.ts`) consumed via the `@/content` barrel. There is intentionally no `projects.ts` — the minimal noindex `/projects` route and the `Project` /`ProjectStatus` types in `types/content.ts` are kept for future reuse. |
| `lib/` | Pure helpers: metadata factory, people grouping, news/format helpers, indexing control. |
| `types/` | Shared content types (`types/content.ts`). |
| `styles/` | Design tokens (`tokens.css`) + base/reset styles. Components use CSS Modules. |
| `workers/application-submit/` | Independent Cloudflare Worker sub-project (Join Us application intake → Resend). Has its own package.json, tests (vitest), and `wrangler.toml`. |

## Static assets — `public/images/`

Assets are organized by **semantic ownership**, not by provenance. Do NOT add
new production assets to `legacy/`; there is no `legacy/` directory anymore.

| Path | Ownership |
| --- | --- |
| `public/images/people/` | All current member portraits (filename = member slug: `kaiping-zhu.jpg`, `christine-sunho-on.png`, `chunchun-ye.jpg`, …). |
| `public/images/news/` | News feed images (`hiring.png`, `welcome-*.png/jpg`, `new-chapter.png`). A News item without an image renders without an image block (no placeholder fallback).. |
| `public/images/research/` | Research overview (`overview.jpeg`) and the three research-area images. |
| `public/images/brand/` | Institutional marks (`ntu-logo.png`, used by the footer). |
| `public/images/site/` | Shared site-wide visuals (`people-origins.png` — the People closing map). |
| `public/images/home/` | Home-only hero imagery (`hero-campus.jpg`). |

New member photo → `public/images/people/<member-slug>.<ext>` (derive a
web-sized portrait; never commit ID documents or raw originals). New news
image → `public/images/news/`. New research image → `public/images/research/`.

## Root-only files (tooling expects them here)

`package.json` / `package-lock.json` (npm), `next.config.ts` (framework config +
security headers), `tsconfig.json`, `eslint.config.mjs`, `next-env.d.ts`
(generated), `.gitignore`, `.env.example` (placeholder env template — values
empty), `.vercel/` (untracked local project link), `CNAME` (legacy GitHub
Pages production config — retained for rollback), `AGENTS.md` / `CLAUDE.md`
(AI-assistant working instructions).

## Documentation

- `docs/PEOPLE-FINAL-V1.md` — frozen People design authority.
- `docs/REPOSITORY-STRUCTURE.md` — this document.
- `docs/audits/` — pre-launch and cleanup audits.
- `docs/history/` — **archived** migration-era design records
  (`content-safe-refinement/`, `design-reconciliation-v2/`,
  `legacy-content-integration/`, `legacy-integration/`). Historical
  statements are preserved as-is; they are not operational authority.

## Not tracked

`node_modules/`, `.next/`, `.vercel/`, env/secret files (`.env*`,
`workers/application-submit/.dev.vars`), OS junk, build caches.
