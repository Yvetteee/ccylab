# Legacy Implementation Issues — ccylab (The Ye Group @ NTU)

> Phase 1B read-only audit. Every item below is an *implementation* defect.
> A defect here does **not** mean the associated visual idea should be
> discarded — see `OLD-TO-NEW-MAPPING.md` for the per-element disposition.

---

## 1. Layout & responsiveness

| # | Issue | Evidence | Impact |
|---|---|---|---|
| L1 | Fixed, narrow content column (`max-width: 1000px`) with no wider use | `.content-section` | Large screens (≥1200px) get excessive empty margins; content never benefits from available width |
| L2 | No real mobile navigation | `@media (max-width:768px){ .nav-menu{display:none} }` | Mobile users lose the primary nav entirely — the worst accessibility gap |
| L3 | Single crude breakpoint (768px) | only one media query for layout | Fragile behavior across tablets/laptops; nothing tuned for 768–1200px |
| L4 | Fixed pixel sizes everywhere | `20px`, `40px`, `50px`, `3rem`, `250px`, `150px` | No scaling with root font; mixed rem/px units |
| L5 | Hard-coded image heights | `.news-box{height:120px}`, `.research-image{height:120px}` | Cropped/stretched placeholders, no aspect-ratio stability |
| L6 | Dead grid classes | `.news-grid`, `.research-items`, `.pi-items`, `.pi-rows` | Confusing maintenance; some never rendered |
| L7 | `2fr 2fr` grids masquerading as ratios | `.research-items`, `.pi-rows` | Equal columns where a 2:1 intent is visible elsewhere — inconsistent |
| L8 | Float-based callouts | `.highly-cited{float:right}`, `.biography-note{float:right}` | Float clears/overlap risks on narrow screens |

## 2. Typography

| # | Issue | Evidence | Impact |
|---|---|---|---|
| T1 | `text-align: justify` on nearly all text | `.welcome-text p`, `.research-item p`, `.pub-list li` | Rivers/ragged gaps on narrow columns; justification on short labels looks broken |
| T2 | Inconsistent heading scale | h1 3rem vs h2 1.5rem vs h2 1.2rem depending on page | No system; Research items use 1.2rem while other h2s are 1.5rem |
| T3 | No vertical rhythm system | arbitrary `margin-bottom: 10/15/20/30/40px` | Page-to-page inconsistency |
| T4 | Default Arial with no webfont | `font-family: Arial, sans-serif` | Platform-dependent rendering; no optical sizes |

## 3. Semantic & accessibility

| # | Issue | Evidence | Impact |
|---|---|---|---|
| A1 | Missing mobile nav | see L2 | Screen-reader + keyboard users cannot reach most pages on mobile |
| A2 | No visible focus states | no `:focus-visible` styles anywhere | Keyboard users get no focus indicator |
| A3 | Broken form structure | `join.html` has a closing `</form>` with no opening `<form>`; `join.js` looks up `#applicationForm` which doesn't exist; `<button type="submit">` sits inside a `<section>` | The application form does not submit at all |
| A4 | Invalid HTML | unclosed `<div>`s (index.html), stray `</div>`/`</section>` (members.html, join.html), `<li>` inside `<h2>` (publications.html) | Browsers auto-correct inconsistently; maintainability |
| A5 | `<li>` in `<h2>` / headings used for styling | publications "Google Scholar / ORCID" list inside `h2` | Screen readers announce list items as headings |
| A6 | Tablist missing full ARIA wiring | buttons use role=tab but panels lack proper `aria-labelledby`/keyboard arrow navigation | Partial tab accessibility |
| A7 | Back-to-top is a `div` with no keyboard affordance on some pages | index/pi use role=button; others plain `<div>` | Inconsistent keyboard support |
| A8 | Missing alt text on some images | `pi.html` `<img src="chunchun_PI.JPG" />` no alt | Screen-reader gap |

## 4. Assets

| # | Issue | Evidence | Impact |
|---|---|---|---|
| M1 | Broken image reference | `pi.html` references `chunchun_PI.JPG`; file is `chunchun_PI.png` (case-sensitive hosts 404) | PI page photo broken |
| M2 | Unused assets shipped | `member1–7.png`, `chunchun_member.png`, `NTU_Logo.png`, `labnews1/2.png` | ~2.5MB dead weight |
| M3 | Very large originals | `NTU.png` 6.5MB, `labnews2.png` 1.6MB | Slow load, no srcset/WebP |
| M4 | Placeholder gray boxes left in markup intent | `.news-box`/`.research-image` styles defined but not used with real images on several pages | Incomplete pages (Lab News empty) |
| M5 | Low-res assets that can't be production quality | member thumbnails ~60–90KB | Flag for replacement, not upscale |

## 5. JavaScript

| # | Issue | Evidence | Impact |
|---|---|---|---|
| J1 | Obsolete dual-mode SPA/multi-page logic | `Chunchun.js` has a hash-router that never activates (only 1 `.page`) | Dead code shipped to every page |
| J2 | Hard-coded placeholder backend URL | `join.js` → `https://your-backend-url.com/apply` | Form cannot work as shipped |
| J3 | Backend not deployable as static | `server.js` needs express/multer/nodemailer; no `package.json` in the repo | Cannot run on GitHub Pages |
| J4 | Form field names/ids not wired | `singlePdf` vs `cv/cover-letter/publications`; `<input>`s lack `name` | No server can parse the payload |

## 6. CSS quality

| # | Issue | Evidence | Impact |
|---|---|---|---|
| C1 | Duplicated rule blocks | two `.footer`, two `.back-to-top`, two `.application-form form`, two `.research-main` | Last-write-wins surprises |
| C2 | 6 near-duplicate red hexes | `#b62938 #c41e3a #c51f3e #c8102e #a3182e #a50d24` | No single brand token |
| C3 | Global selector risk / no scoping | many un-namespaced element selectors | Collisions |
| C4 | Dead CSS (~15% by selector count) | `.diagram-step`, `.arrow`, `.flower-grid`, `.position-item`, `.news-grid`… | Confusing |
| C5 | No design tokens | every value literal | Re-skinning impossible |

---

## 7. What is actually *good* in the legacy implementation

Honest list so the rebuild does not throw away working ideas:

- Consistent **repeated page composition** (grey hero band + giant title) — a
  real system, even if implemented by copy-paste.
- **Semantic content organization** — numbered research themes, grouped
  publications, tabbed positions.
- **Low ceremony** — no framework, no build, trivial to host.
- **Human, unpolished warmth** — the site feels maintained by a lab, not a
  marketing team; this is a brand asset.
- **Real, correct recruitment content** (qualifications, periods, scholarship
  names, subject-line convention) — reused verbatim by the current V4
  opportunities layer.
