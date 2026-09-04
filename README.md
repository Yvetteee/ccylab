# Research Group Website

A content-driven, wireframe-stage website framework for a university research
group. Built with **Next.js 16 (App Router) + TypeScript + React + CSS Modules**.
All content is placeholder and fictional — replace it with real lab
information before going live.

## Principles

- **Content and UI are decoupled** — pages and components read typed data from
  `content/`, never hard-coded research content.
- **Neutral wireframe styling** — no brand colors yet; everything is driven by
  design tokens in `styles/tokens.css`.
- **Redesign-friendly** — swap the visual layer (tokens + CSS Modules) while
  keeping data and most logic intact.
- **Student-maintainable** — no UI framework, no CMS, no database. Adding
  content is editing a typed data file.

## Project structure

```text
app/            Pages and routes (App Router) + root layout & metadata
components/
  layout/       SiteHeader, MainNavigation, SiteFooter
  ui/           PageContainer, Section, SectionHeading, PageHeader, Grid, ChipList
  content/      Data-driven cards: PersonCard, PublicationItem, ResearchAreaCard,
                ProjectCard, NewsCard (share card.module.css)
content/        Typed placeholder data (single source of truth)
  site.ts       Site name, nav, contact placeholders
  people.ts     Members
  publications.ts
  research-areas.ts
  projects.ts
  news.ts
  index.ts      Barrel — import everything from "@/content"
lib/            Pure helpers: grouping/sorting, metadata factory, formatting
types/          Shared content types (Person, Publication, …)
styles/         Design tokens + base/reset styles
public/         Static assets (favicon)
```

## Routes

`/` · `/research` · `/people` · `/publications` · `/projects` · `/news` ·
`/join` · `/contact` (+ `sitemap.xml`, `robots.txt`, 404 page)

## Commands

```bash
npm run dev      # development server
npm run lint     # eslint
npx tsc --noEmit # type check
npm run build    # production build
npm start        # serve the production build
```

## Editing content

1. Open the relevant file in `content/` (e.g. `content/people.ts`).
2. Follow the existing shape — TypeScript enforces the types from
   `types/content.ts` (mark new fields optional; every field is optional
   except `id`).
3. Pages pick changes up automatically (sections appear only when data for a
   role/status/year exists; home shows `featured`/first items).

## Visual redesign later

Change values in `styles/tokens.css` (colors, type scale, spacing, radius,
container width) to re-skin the whole site. For structural changes, restyle the
CSS Modules without touching data or page logic.

## Deployment

Ready for Vercel (`npm run build` / `npm start`).

Search indexing is environment-controlled:

- Set the **`SITE_INDEXABLE`** environment variable in Vercel to `true` to let
  search engines index the site; leave it unset or `false` (the safe default)
  to keep it out of search results — the robots meta directive and
  `/robots.txt` both follow this value.
- **Changing this environment variable requires a redeployment** — it is read
  at build time, not at request time.
- No other environment variables or services are required.

> ⚠️ All people, papers, projects, news, names and contact details are
> **placeholder/fictional**. Replace them with real content before launch.
