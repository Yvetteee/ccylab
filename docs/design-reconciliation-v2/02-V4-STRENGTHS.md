# 02 — V4 Framework's True Strengths

> Three-version deep design reconciliation audit — read-only.
> V4 baseline: `radiuszzz/lab-website` branch `review/v4` @ `e93d68d` (worktree
> `D:\vault\projects\lab-website-v4-baseline`, served at :3124).
>
> We do NOT list only engineering strengths. We identify the **visual / information-design strengths**
> the framework genuinely has, and classify each as **MUST PRESERVE / PREFER PRESERVE / SAFE TO REINTERPRET**.

---

## 0. The V4 character in one sentence

V4 is a **flat, single-accent editorial system**: serif headings + Inter body, thin borders, no shadows,
small radii, deliberate whitespace, container widths that are used *on purpose*, and task-oriented IA
(Join/Apply/News/Publications each solve a specific job). It looks like a well-built university editorial site —
just not yet like *this* lab.

---

## 1. Engineering / structural strengths (source of truth — never regress)

| Strength | Detail |
|---|---|
| Next.js 16 architecture | App Router, server components, typed content layer |
| Route set | /, /research, /people, /publications, /projects, /news, /join, /contact, /apply/phd, /apply/postdoc |
| Component architecture | CSS Modules per component, design tokens, reusable ui primitives (PageContainer/PageHeader/Section/Grid/ResponsiveImage) |
| Responsive system | token spacing scale, mobile-first media queries, verified no overflow at 375/360/414 |
| Accessibility | semantic landmarks, focus states, tablist ARIA on Join, dl on Contact, img alt, noindex on Apply |
| SEO / metadata | createPageMetadata per page, canonical URL |
| Security | security headers, sandboxed map iframe |
| Maintainability | content layer isolated from presentation; every section reads from content |

---

## 2. Visual / information-design strengths (what V4 does *better than legacy*)

### 2.1 Better desktop use of available width
- Container system: `--container-narrow:46rem` (736px), `--container-width:74rem` (1184px), `--container-wide:84rem` (1344px).
- Home deliberately *mixes* widths (narrow lede → wide figures) to create rhythm instead of one uniform column.
- Measured (rendered): at 1440 the widest content column = 1344px centered; at 1920 content stays 1344px
  (margins ~280px). Standard editorial, but deliberate rather than accidental.

### 2.2 Clear typographic hierarchy
- Serif (Source Serif 4) headings vs Inter body — an academic "journal" voice.
- Scale: xs→5xl tokens; uppercase letter-spaced eyebrows/labels create a secondary "editorial" register.
- This is a genuine upgrade over the legacy's single Arial voice.

### 2.3 Stronger responsive transitions
- Nav collapses to a real Menu toggle at <1080px (legacy just hid the nav).
- Grids collapse cleanly (4→2→1), hero text scales via tokens.

### 2.4 Better structured content / deliberate whitespace
- `--section-space`, spacing tokens, container padding — consistent rhythm.
- Empty states ("No publications are available at this time") — graceful, honest.

### 2.5 Stronger page-specific IA
- **People**: PI spotlight + role-grouped sections + alumni text rows — scales as the group grows.
- **Publications**: year-navigation + single-column scholarly rows — scales to hundreds of papers.
- **News**: featured block + year chronology — editorial archive.
- **Join**: tabs + URL hash state (phd/postdoc) — task-focused.
- **Apply**: formal multi-field workflow, noindex, back link — an application, not a landing page.
- **Contact**: dl semantics + map embed — functional.

### 2.6 Task-oriented Join / Apply
- Join uses real ARIA tabs + hash; Apply is a formal workflow with noindex. This is *better* than the legacy's
  single-page form with a placeholder backend.

### 2.7 Better publication scanning
- Single-column rows with venue/year + type rail → readable at scale; year-nav gives jumps.

### 2.8 Better group/member scalability
- Role grouping + PI spotlight + alumni rows = a data model that survives 5 members or 50.

---

## 3. Classification

| V4 strength | Class |
|---|---|
| Routes / data / components / a11y / SEO / security / maintainability | **MUST PRESERVE** |
| Single-accent discipline as a SYSTEM (one accent, neutral everywhere else) | **MUST PRESERVE** (the *discipline*, not necessarily red-everywhere) |
| Serif + Inter typographic hierarchy | **PREFER PRESERVE** |
| Container width system + deliberate whitespace | **MUST PRESERVE** |
| People role-grouping IA + PI spotlight + alumni rows | **MUST PRESERVE** |
| Publications year-nav + scalable single-column rows | **MUST PRESERVE** |
| News featured + chronology archive | **MUST PRESERVE** |
| Join tabs + hash state | **MUST PRESERVE** |
| Apply workflow (formal, noindex, back link) | **MUST PRESERVE** |
| Contact dl + sandboxed map | **MUST PRESERVE** |
| Flat / no-shadow / small radii editorial system | **PREFER PRESERVE** |
| Uppercase letter-spaced eyebrow/label register | **PREFER PRESERVE** |
| The exact grey PageHeader template on every page | **SAFE TO REINTERPRET** (per-page differentiation; see §8 of the task) |
| Home "1-main + 2-secondary" asymmetric blocks (ResearchOverview/FeaturedResearch) | **SAFE TO REINTERPRET** (the pattern is good once, repetitive twice) |
| Uniform PersonCard grammar | **SAFE TO REINTERPRET** (see Risk 3) |
| "Explore → / View publication →" arrow pattern | **SAFE TO REINTERPRET** (over-used) |
| Initials-in-circle placeholder | **SAFE TO REINTERPRET** (generic team-template smell) |
| Placeholder content (AI/ML topics, SVG figures, fake pubs) | **SAFE TO REINTERPRET** — *content, not design*; must be replaced with real lab content |

---

## 4. Caveat that matters for the whole audit

A large share of the "AI-template / generic" feeling in the CURRENT site is **placeholder content**, not the
design system: AI/ML research topics, SVG figures, fabricated publications, initials placeholders. The legacy
had real photos and a real scientific story. **Any verdict about "mechanical feeling" must separate "the design
system is generic" from "the content is still placeholder."** V4's *system* is strong; its *content* is dummy.
