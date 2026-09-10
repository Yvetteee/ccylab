# Old → New Mapping — legacy element disposition

> Phase 1C. Classifies every important legacy element. Legend:
> **KEEP VIS** = keep visual identity · **ADAPT** = keep visual character,
> adapt implementation · **RECON** = reconstruct using current framework ·
> **HUMAN** = ambiguous, defer to human · **DROP** = do not migrate.

Source of truth split:
- **Legacy = visual/brand source of truth**
- **Current V4 = engineering source of truth** (routes, data, components,
  responsive, a11y, SEO, forms, deployment)

---

## A. Global / shell

| Legacy element | Class | Disposition on V4 |
|---|---|---|
| NTU-red header band `#b62938` + white nav | KEEP VIS → RECON | SiteHeader becomes a red band (white text). Human-gated: red band changes every page's shell, so it lands in the final "Header/Footer harmonization" step, not the Home proof-of-concept. |
| Wordmark right-aligned in header | KEEP VIS → ADAPT | V4 brand (name + institution) stays as the current brand block; alignment/layout adapted to V4 header (left brand, right nav). |
| Dark gray footer + NTU logo + centred copyright + red back-to-top | KEEP VIS → RECON | V4 footer restyled toward legacy (dark band, centred copyright, red back-to-top). Final harmonization step. |
| Justified body text | HUMAN | See DESIGN-DECISIONS-NEEDED (D-7). |
| Arial default font | DROP (implementation accident) | V4 keeps Source Serif 4 + Inter webfonts (engineering source of truth). Legacy's *large/tall scale* translated, not its default system font. |

## B. Home page

| Legacy element | Class | Disposition |
|---|---|---|
| Full-bleed campus/team photo + white overlay + bold title + italic subtitle | KEEP VIS → RECON | V4 Hero rebuilt: large image + overlay + centred title/subtitle, using ResponsiveImage + PageContainer. Home proof-of-concept. |
| Welcome paragraph + "LAB NEWS" heading | KEEP VIS → RECON | V4 sections already implement welcome/Latest; restyle toward legacy headings, keep V4 data-driven structure. |
| "Lab News" (never populated) | KEEP VIS → RECON | V4 LatestNews (data-driven, empty-state-safe) replaces it — strictly better. |

## C. Subpage heroes

| Legacy element | Class | Disposition |
|---|---|---|
| Grey band `#f8f9fa` + centred giant `h1` (3rem) + lead | KEEP VIS → RECON | V4 PageHeader is border-based; legacy grey-band hero becomes the shared subpage header treatment. Human-gated (affects all subpages) — deferred to page-by-page propagation. |

## D. Research

| Legacy element | Class | Disposition |
|---|---|---|
| Numbered research themes (1., 2., 3.) | KEEP VIS → RECON | V4 already numbers rows (01, 02…). Keep numbering. |
| Text-left + thumbnail-right rows (`2fr 1fr`) | KEEP VIS → RECON | V4 research page already alternates figure/text rows via CSS Grid — legacy's recognizable two-column composition preserved; keep V4 alternating implementation (better than legacy's fixed right thumbnails). |
| Research main hero figure (centered, rounded) | KEEP VIS → ADAPT | V4 wide-container figure; legacy's rounded + subtle-shadow look is a borderline (HUMAN D-3). |
| Research section bullets (`• Design and synthesise…`) | KEEP VIS → RECON | V4 structured lists; keep content semantics. |

## E. People

| Legacy element | Class | Disposition |
|---|---|---|
| Circular portraits | KEEP VIS → RECON | V4 PersonCard (initials avatar fallback) gains circular treatment. Human-gated for the shared PersonCard (People page). |
| PI profile (photo + name + quote) | KEEP VIS → RECON | V4 PIProfile exists; legacy's circular photo + bilingual quote block mapped onto it. |
| Member list grouped by role | KEEP VIS → ADAPT | V4 role-grouped people data (category) is the engineering truth; legacy's flat list is inferior. Keep V4 grouping. |
| "This could be you…" future-member section | KEEP VIS → RECON | Preserve the inviting recruitment sentiment in V4 JoinCTA/People empty states. |

## F. Publications

| Legacy element | Class | Disposition |
|---|---|---|
| Grey hero + grouped theme `h2` + justified numbered citation list | KEEP VIS → RECON | V4 publications page already groups + year navigation; restyle toward legacy's editorial list. |
| Google Scholar / ORCID links | KEEP VIS → ADAPT | Move out of `h2` (legacy had `<li>` inside `<h2>` — a11y accident); keep as accessible link row. |
| Red "highly cited" callout | HUMAN | See DESIGN-DECISIONS-NEEDED (D-6). |

## G. Join / Apply (operational protection)

| Legacy element | Class | Disposition |
|---|---|---|
| PhD / Postdoc tab structure with red active underline | KEEP VIS → ADAPT | V4 join tabs already exist; adopt legacy red underline accent. Must not regress tab keyboard/hash behavior. |
| Light-gray tab panels | KEEP VIS → ADAPT | V4 panel styling toward legacy gray panel. |
| Application form card (white, soft shadow, red submit) | KEEP VIS → ADAPT | V4 ApplicationForm is the engineering truth (routes /apply/phd, /apply/postdoc, noindex). Legacy red submit accent may map onto V4 form. Human-gated shared form component. |
| Broken legacy form (`</form>` without open, id mismatch, placeholder URL) | DROP (defect) | V4 ApplicationForm replaces it entirely. |
| Contact info + embedded map two-column | KEEP VIS → ADAPT | V4 Contact page map must not break; legacy's grey info block styling may influence. |

## H. Assets

| Legacy asset | Class | Disposition |
|---|---|---|
| Campus/group photos (NTU.png, member.png, research*.jpeg) | RECON (migrate selectively) | Potential home hero / research figures. Must check rights & resolution first (§15). DO NOT upscale. |
| NTU logo (NTU_Logo.webp) | RECON | Candidate for footer/header if higher-res source exists. |
| chunchun_PI.JPG→.png mismatch, unused memberN.png, huge NTU.png | DROP | Not migrated as-is; weak/large assets flagged for replacement. |

## I. JS / behavior

| Legacy element | Class | Disposition |
|---|---|---|
| `Chunchun.js` hash-router SPA mode (never activates) | DROP | V4 Next.js routing is the truth. |
| `Chunchun.js` multi-page nav highlighting | ADAPT (already covered) | V4 MainNavigation `usePathname` handles this better. |
| Back-to-top | ADAPT | V4 has no back-to-top; legacy's is a recognizable motif. Candidate for final harmonization (red square). HUMAN gating. |
| `join.js` tabs/apply-scroll | ADAPT (already covered) | V4 Join tabs + Apply CTA cover this. |

## J. Framework features preserved (must not regress)

- App Router routes: `/`, `/research`, `/people`, `/publications`, `/projects`,
  `/news`, `/join`, `/contact`, `/apply/[type]`, 404.
- Join tabs, keyboard behavior, hash state.
- Apply PhD / Apply Postdoc: form architecture, back links, noindex, no
  main-nav entry.
- Contact map embed, external links, canonical URL, security headers,
  robots/indexing logic.
- People role-grouped rendering, empty states.
- Publications year navigation.
- Content layer data schemas (`@/content`, `@/types/content`).
