# Legacy Design DNA — The Ye Group @ NTU (ccylab)

> Phase 1 read-only audit. Source: `D:\vault\forge\ccylab-main\ccylab-main`
> (a static HTML/CSS/JS site — "Chunchun.css", "Chunchun.js"). This document
> separates what the site *intentionally looks like* from what it merely
> *happens to do*. Everything below is descriptive, not prescriptive.

---

## 1. Design DNA summary (the "recognizable THIS lab" list)

A visitor who knows the legacy site recognizes it by, in priority order:

1. **The NTU-red header band** (`#b62938`) with white navigation text and the
   serif-sans group wordmark on the right — the single most recognizable
   element. Red = NTU identity.
2. **A full-width campus/group photograph with a translucent white overlay**
   carrying a large bold title and an italic one-line subtitle on the Home hero.
3. **Light-gray hero bands** (`#f8f9fa`) at the top of every subpage with a
   very large centred page title (≈ 3rem) — Research, Publications, PI,
   Members, Join all share this pattern.
4. **Red as the action accent** — active tab underline, "Apply now" buttons,
   submit buttons, back-to-top button, "highly cited" callouts.
5. **Numbered, text-left + thumbnail-right research rows** (the classic
   two-column academic layout).
6. **Circular portraits** for the PI and members.
7. **A dark gray footer** with an NTU logo, centred copyright, and a small red
   back-to-top square.
8. **Justified body text** throughout (the legacy typesets paragraphs with
   `text-align: justify`).
9. **A bilingual identity moment**: the PI page includes a Chinese quotation
   from Han Yu's *Shi Shuo* with an English translation in a left-bordered,
   gray-background quote block.
10. **A restrained, content-first, no-navigation-hype mood**: the site reads as
    a research group's noticeboard, not a startup landing page.

---

## 2. Colors

### Primary / brand
| Token-ish name | Legacy value | Where it appears |
|---|---|---|
| Header band | `#b62938` (NTU red) | top navigation bar; also first back-to-top variant |
| Body heading text | `#333` | all `h1/h2/h3`, content headings |
| Body text | `#555` / `#666` | paragraphs, secondary text |
| Near-black tab text | `#111` / `#222` | active tab, tab hover |

### Accent red family (intentionally red, inconsistently defined)
| Value | Where |
|---|---|
| `#c41e3a` | active tab underline, `.join-section h2`, apply buttons, submit button, "highly cited", biography note, footer back-to-top (second variant `#c8102e`) |
| `#b62938` | header band, main back-to-top |
| hover `#a3182e` / `#a81833` / `#a50d24` | button/back-to-top hovers |

> **Note for translation:** the *concept* is "one NTU red accent". The *values*
> are a spread of 6 similar reds (`#b62938`, `#c41e3a`, `#c51f3e`, `#c8102e`,
> `#a3182e`, `#a50d24`) — an implementation accident to collapse into one
> semantic red token.

### Neutrals / surfaces
| Value | Where |
|---|---|
| `#ffffff` | page background, cards |
| `#f8f9fa` | hero bands, tab panels, contact info block, join hero |
| `#f0f0f0` | PI quote background |
| `#f9f9f9` | join section card background |
| `#c0c0c0` + `2px #999` border | gray placeholder image boxes |

### Borders / rules
| Value | Where |
|---|---|
| `#e5e7eb` | light card borders, tab rule, map border, pi thumb border |
| `#ddd` / `#ccc` | join section border, form inputs |
| `#999` | placeholder image borders |

### Footer
Dark gray (`#666` in the first block, overridden later to `#444`), white text.
*Two definitions survive in the CSS — an accident; the effective one is `#444`.*

---

## 3. Typography

- **Body family:** `Arial, sans-serif` (default system sans — the legacy never
  shipped a webfont).
- **Character:** heavy, large, bold sans headings; italic serif-style subtitle;
  justified body text with relaxed leading (1.6–1.7).
- **Sizes (desktop):**
  | Element | Size |
  |---|---|
  | Home hero title | `3rem`, bold |
  | Home hero subtitle | `1.5rem`, italic |
  | Subpage page title (all heroes) | `3rem` (→ `2.2rem` ≤ 768px) |
  | PI name | `2rem` |
  | Content `h2` (Home welcome, Lab News, pub themes, members) | `1.5rem` |
  | Career/education/awards `h3` | `1.5rem` |
  | Welcome paragraph | `1.2rem`, line-height 1.7, justified |
  | Research item `h2` | `1.2rem` |
  | Publication list items | `1rem`, line-height 1.4, justified |
  | Nav links | `20px`, weight 500 |
  | Logo/wordmark | `22px`, bold |
  | PI quote | `1.2rem`, italic |
  | Career list items | `1.2rem` |

---

## 4. Layout & composition

| Aspect | Legacy behavior |
|---|---|
| Header | Full-width red band; inner container max-width **1600px**; left = nav menu (6 items, 30px gap), right = wordmark. One row. |
| Page width philosophy | Content sections capped at **1000px**; footer at 1200px; header 1600px. No wider use of large screens. |
| Vertical rhythm | Sections pad `40px 20px`; big hero bands pad `50px 20px`; generous but not systematic. |
| Hero (Home) | Full-bleed image; white overlay `rgba(255,255,255,0.7)`; centred title + italic subtitle stacked. |
| Subpage heroes | Centred `h1` (3rem) on `#f8f9fa` band; short lead paragraph under it. |
| Research rows | Grid `2fr 1fr`: long text block left, thumbnail right (max 320px, right-aligned). Rows separated by 32px. |
| PI page | Grid `300px 1fr`: circular photo left, name + quote right; then stacked career/education/awards `h3` sections. |
| Members page | Flex row: 150px circular photo + name/role/email; then "This could be you…" future-member section. |
| Publications | Grey hero; grouped theme `h2` headers; long justified numbered citation list with inline DOI links. |
| Join | Grey hero + hero image; two tabs (PhD / Postdoc) with red active underline; light-gray tab panels; then a white application card (700–720px, soft shadow). |
| Footer | Dark band; NTU logo left, centred copyright, red back-to-top square right. |

### Borders / rules / dividers
- Thin light borders (`#e5e7eb`) around cards and images.
- A single **left border** (`4px #333`) on the PI quote block — the only
  editorial rule accent.
- Tab underline `3px` in red for the active tab.
- Placeholder image boxes used `2px #999`.

### Image treatment
- Hero: full-bleed `object-fit: cover`.
- Thumbnails: rounded (8–12px), subtle 1px shadow, right-aligned in rows.
- Portraits: **circular** (`border-radius: 50%`), `object-fit: cover`.
- Research main hero figure: centered, rounded, up to 600–900px.
- No fixed aspect-ratio system; images often `height: auto` with hard caps
  (`max-width: 320px` thumbnails, `250px` PI photo, `150px` member photos).

### Distinctive repeated patterns
- Grey hero band + giant centred title — **every subpage**.
- Red accent on interactive/action elements — tabs, buttons, back-to-top.
- Justified paragraphs.
- Circular portraits.
- NTU logo in the footer.
- Numbered research rows with right-aligned thumbnail.

---

## 5. Intentional visual character vs implementation accidents

### Intentional (preserve the *visual result*)
| Intent | Legacy evidence |
|---|---|
| NTU-red header band | consistent on all 6 pages |
| Red action accent | tabs, buttons, back-to-top, callouts |
| Large centred page titles on grey bands | all subpages |
| Big campus photo home hero with overlay + bold/italic title pair | home |
| Text-left + thumbnail-right research rows | research page (clear design intent) |
| Circular portraits | PI + members |
| Dark footer + NTU logo + red back-to-top | all pages |
| Justified body text | universal |
| Bilingual PI quote block | PI page |
| Numbered section headings (1./2./3.) | research page |
| Tabs with red active underline | join page |
| Two-column contact (info + embedded map) | join page |

### Implementation accidents (do NOT preserve the accident; may preserve the idea)
| Accident | Notes |
|---|---|
| 6 near-duplicate red hexes | collapse to one semantic red |
| Two footer definitions (`#666` then `#444`) | pick one |
| Two `.back-to-top` definitions | pick one |
| Duplicate `.research-main` / `.research-image` / `.application-form form` blocks | dead/redundant CSS |
| Fixed `2fr 2fr` grids (equal halves, not the intended ratio) | `.research-items`, `.pi-rows` |
| Dead/unused CSS (`.news-grid`, `.flower-grid`, `.position-item`, `.diagram-step`, `.arrow`, `.biography-note`, `.highly-cited` float) | never rendered |
| Fixed pixel image heights (120px news/research placeholders) | replaced by the image system |
| `float: right` callouts | no longer needed |
| Mobile nav = `display: none` (no mobile menu at all) | accessibility defect |
| Missing `<form>` open tag / orphan `</form>` / id mismatch in `join.html`/`join.js` | broken application form |
| HTML validation issues (unclosed divs, `</section>` strays, `<li>` inside `<h2>`) | structural |
| Mixed image extensions (`chunchun_PI.JPG` vs actual `.png`) | broken asset reference |
| `text-align: justify` on short labels | keep only on long-form paragraphs |
| Hard-coded `20px`/`40px`/`50px` paddings | tokens |
| Box-shadows on cards (soft, subtle) | borderline: intentional softness vs flat-v4 language → HUMAN |
| 8–12px border-radius on cards/buttons | borderline: legacy rounded vs v4 flat 2–6px → HUMAN |

---

## 6. Mood / brand character (qualitative)

- **Mood:** matter-of-fact, academic, warm-but-restrained; the NTU red gives it
  institutional energy; the grey bands give it a lab-noticeboard feel.
- **It is NOT:** playful, dark, card-heavy SaaS, gradient-filled, or
  dashboard-like.
- **Its strength:** instant institutional recognisability (NTU red + campus
  photo + big serif-sans titles) paired with plain, honest content typography.
