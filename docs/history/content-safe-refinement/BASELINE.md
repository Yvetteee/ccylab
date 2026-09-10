# Third-Pass Content-Safe Refinement — Baseline Audit (STEP 0)

Branch: `review/content-safe-refinement` (created from `review/legacy-reconciliation-v2`)
HEAD SHA: `6d8263bc6bc89d367b86b9beb28fd2ccd7c2c8e0`
Working tree: clean. No code changed during Step 0.

## Repository / package state
- Next.js 16.3.2 (App Router, Turbopack build), React 19.2.8, TypeScript 5, ESLint 9 flat.
- Deps healthy: `next`, `react`, `react-dom`, `eslint`, `eslint-config-next`, `@types/*`.
- (Extraneous `puppeteer-core`/`@puppeteer/browsers` etc. are QA tooling left in node_modules, not app deps — untouched.)

## Routes (all exist, all render 200 at baseline)
`/`, `/research`, `/people`, `/publications`, `/projects`, `/news`, `/join`, `/contact`, `/apply/phd`, `/apply/postdoc`, `/robots.txt`, `/sitemap.xml`

## Content / data sources (all content is centralized in `content/`)
| Source | Role | Current state |
|---|---|---|
| `content/site.ts` | site identity: name/wordmark/tagline/description/url/contact/nav | name & tagline & description = PLACEHOLDER; wordmark/contact = real |
| `content/people.ts` | PI + members + alumni (Person[]) | all PLACEHOLDER (fictional) |
| `content/publications.ts` | publication list | all PLACEHOLDER (fictional, fake DOIs) |
| `content/news.ts` | news items | all PLACEHOLDER (fictional) |
| `content/projects.ts` | project list | all PLACEHOLDER (fictional) |
| `content/research-areas.ts` | research areas | all PLACEHOLDER (fictional AI) — FROZEN this pass |
| `content/opportunities.ts` | Join/Apply content | already REAL (NTU/CEE, scholarships, membranes focus) |
| `content/index.ts` | aggregate re-exports | — |

## Baseline screenshots (saved)
`recon3/baseline/home-{375,768,1024,1440,1600,1920}.png`, `people-{...}.png`

## Key rendering paths for identity
- Header wordmark: `siteConfig.wordmark` (already real).
- Footer brand / copyright / metadata site name / OG siteName / hero h1: `siteConfig.name`.
- Hero tagline: `siteConfig.tagline`. Hero welcome intro + metadata description: `siteConfig.description`.
- PI: `PIProfile` ← `people[].category === "pi"`. Members: `MemberRow` ← role-grouped.
