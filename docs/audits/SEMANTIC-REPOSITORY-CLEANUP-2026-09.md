# Semantic Repository Cleanup

- Baseline: `d8e2df60c79220267353fda8c37e54bf0842486e` (website-v2)
- Date: 2026-09-10
- Scope: semantic ownership normalization for runtime assets, removal of
  fictional/obsolete scaffold, historical docs archive. Zero visual/content
  change intended and verified.

## Problems identified

1. Active runtime assets (member portraits, news images, research images,
   PI portrait, NTU logo, People origins map) lived under
   `public/images/legacy/` — "legacy" described provenance, not ownership.
2. `public/images/` root mixed live heroes with unreferenced development
   SVGs (`group-wide.svg`, `hero-group.svg`, `research-1/2/3.svg`).
3. `content/projects.ts` contained five fictional AI/ML projects (unrelated
   to Ye Group) behind a noindex route; `lib/projects.ts`,
   `components/content/ProjectCard.*` were unreachable from any page.
4. `components/content/ResearchAreaCard.*` + `ChipList.*` +
   `card.module.css` were unreachable (research page uses its own layout).
5. Migration-era docs sat at `docs/` top level next to current operational
   docs.

## Asset ownership — before

- `public/images/` root: 3 used (hero-campus.jpg, hero-lab.svg) +
  5 unreferenced SVGs.
- `public/images/legacy/`: 12 used + 3 orphaned (NTU.png 6.2 MB,
  chunchun_PI.png, superseded kaiping-zhu.png) + nothing else — 17 files.
- `public/images/people/`: 6 member portraits (slug-named).

## Asset ownership — after

- `people/`: 9 files (8 member portraits incl. `chunchun-ye.jpg` + legacy
  originals for Kaiping/Christine/Kim renamed to member slugs).
- `news/`: 6 files (5 renamed feed images + hero-lab.svg fallback).
- `research/`: 4 files (overview + research1–3).
- `brand/`: ntu-logo.png.
- `site/`: people-origins.png.
- `home/`: hero-campus.jpg.
- root: **empty** (no stray files). `legacy/`: **removed** (empty after
  migration; the 3 orphans deleted with Git history as provenance).

## File mapping

| Old path | Classification | New path / action | Runtime refs |
| --- | --- | --- | --- |
| legacy/chunchun.JPG | PEOPLE (PI) | people/chunchun-ye.jpg | content/pi.ts |
| legacy/christine.png | PEOPLE | people/christine-sunho-on.png | content/people.ts |
| legacy/jiayi-wu.png | PEOPLE | people/kim-jiayi-wu.png | content/people.ts |
| legacy/labnews1.png | NEWS | news/hiring.png | content/news.ts |
| legacy/labnews2.png | NEWS | news/new-chapter.png | content/news.ts |
| legacy/labnewsMay1.jpg | NEWS | news/welcome-kaiping.jpg | content/news.ts |
| legacy/labnewsMay2.jpg | NEWS | news/welcome-kim.jpg | content/news.ts |
| legacy/labnewsMay3.jpg | NEWS | news/welcome-christine.jpg | content/news.ts |
| legacy/researchmain.jpeg | RESEARCH | research/overview.jpeg | content/research-areas.ts |
| legacy/research1.jpeg | RESEARCH | research/research1.jpeg | content/research-areas.ts, app/research/page.tsx |
| legacy/research2.jpeg | RESEARCH | research/research2.jpeg | content/research-areas.ts |
| legacy/research3.jpeg | RESEARCH | research/research3.jpeg | content/research-areas.ts |
| legacy/NTU_Logo.png | BRAND | brand/ntu-logo.png | components/layout/SiteFooter.tsx |
| legacy/member.png | SITE | site/people-origins.png | PeopleOriginsVisual.tsx |
| hero-campus.jpg | HOME | home/hero-campus.jpg | components/home/Hero.tsx |
| hero-lab.svg | NEWS | news/hero-lab.svg | FeaturedNews.tsx (fallback) |

All moves via `git mv`; 14/14 renames blob-identical (100% similarity);
the 2 non-legacy hero moves verified byte-identical via working-tree copy.

## Removed placeholders

- `public/images/group-wide.svg`
- `public/images/hero-group.svg`
- `public/images/research-1.svg`
- `public/images/research-2.svg`
- `public/images/research-3.svg`

Evidence: zero references across app/components/content/lib/types/styles;
unreferenced development mockups (research page uses the legacy research
photographs).

## Removed fictional runtime scaffold

- `content/projects.ts`: 5 fictional AI/ML project records deleted
  (records were unreachable — `app/projects/page.tsx` renders a static
  availability note and never imports project data). File retained as an
  empty typed scaffold (`export const projects: Project[] = []`).
- `components/content/ProjectCard.tsx` + `.module.css`: sole consumer was
  the fictional data render; unreachable → removed.
- `lib/projects.ts` (`groupProjectsByStatus`): sole consumer was the
  fictional data render → removed.
- `components/content/ResearchAreaCard.tsx` + `.module.css` +
  `components/ui/ChipList.tsx` + `components/content/card.module.css`:
  unreachable from any route (research page uses its own layout) → removed.

Retained: `app/projects/` route (noindex, availability note) and the
`Project`/`ProjectStatus` types (future scaffold per task scope).

## Historical docs moved

`docs/{content-safe-refinement, design-reconciliation-v2,
legacy-content-integration, legacy-integration}` → `docs/history/…`
(git mv; content unchanged; no cross-references broke).

## Intentionally retained

- `CNAME` (rollback-sensitive), `AGENTS.md`, `CLAUDE.md`, `.env.example`
  (placeholder template restored earlier this cycle),
  `docs/PEOPLE-FINAL-V1.md`, `docs/audits/*`,
  `docs/history/**` (archived this pass).

## Ambiguous items left untouched

- `Jiayu photo.png` in the external member-update staging package (not a
  website-repo file; not part of this cleanup).
- Residual `js-yaml` advisory (dependency task, separate authorization).

## Validation

- lint/typecheck/build: PASS (24 pages).
- Routes: full set re-smoked — unchanged (22 checks PASS, 404s correct).
- Worker tests: not rerun (Worker files untouched by cleanup).
