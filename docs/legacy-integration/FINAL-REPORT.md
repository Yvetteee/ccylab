# Final Report — Legacy Lab Website Visual Reconstruction

> **Project:** D:\vault\projects\lab-website (Next.js V4)
> **Branch:** `review/legacy-integration` (based on `review/v4`, baseline e93d68d)
> **Reference:** ccylab = The Ye Group @ NTU (legacy static site, `D:\vault\forge\ccylab-main`)
> **Goal:** rebuild the legacy visual identity on the current stable framework — legacy is the *visual/brand reference only*; V4 is the engineering source of truth. Never merge legacy code; never copy CSS wholesale; framework stability wins.

---

## Phase 1 — Documentation (read-only)

**FILES CHANGED**
- `docs/legacy-integration/LEGACY-DESIGN-DNA.md`
- `docs/legacy-integration/LEGACY-IMPLEMENTATION-ISSUES.md`
- `docs/legacy-integration/OLD-TO-NEW-MAPPING.md`
- `docs/legacy-integration/DESIGN-DECISIONS-NEEDED.md` (D-1…D-10, with approval/status log)
- `docs/legacy-integration/INTEGRATION-PLAN.md`

**VISUAL ELEMENTS PRESERVED** — n/a (documentation phase).

**DEFECTS REMOVED (documented, not silently fixed in legacy)** — pi.html references non-existent `chunchun_PI.JPG` (file is `.png`); join.html has a closing `</form>` without an opening tag; join.js posts to the placeholder `https://your-backend-url.com/apply`; `server.js` has no package.json. These were **reported**, not copied into V4 (V4 has its own form).

**FRAMEWORK FEATURES PRESERVED** — n/a.

---

## Phase 2 — Design-system translation (tokens → shared primitives)

**FILES CHANGED**
- `styles/tokens.css` — `--color-accent: #b62938` (legacy NTU red, replaces green), `--color-accent-dark: #a3182e`, `--color-accent-strong: var(--color-accent-dark)`, `--color-surface: #f8f9fa` (legacy grey hero band), `--color-focus: #b62938`, `--color-footer: #444444`.
- `components/ui/PageHeader.module.css` — legacy grey-band page header (centred large title; mobile 4xl / desktop 5xl), shared by every top-level page.

**VISUAL ELEMENTS PRESERVED** — one semantic NTU-red accent token; grey hero-band page headers; V4 flatness/radii/no-shadow language kept (D-3 Option A).

**DEFECTS REMOVED** — n/a.

**FRAMEWORK FEATURES PRESERVED** — single-token re-skin (reversible in one file); no per-page hard-coded colors; serif/sans typography untouched.

---

## Phase 3 — Page-by-page implementation

### Home (proof of concept, human-approved)
**FILES CHANGED** — `components/home/Hero.tsx`, `Hero.module.css`, `public/images/hero-campus.jpg` (adopted + downscaled legacy NTU campus photo).
**VISUAL ELEMENTS PRESERVED** — full-bleed campus photo + white overlay + centred title/subtitle + red eyebrow/CTA.
**DEFECTS REMOVED** — hero photo downscaled 6.5 MB → 206 KB (load performance).
**FRAMEWORK FEATURES PRESERVED** — `ResponsiveImage` (next/image), `siteConfig` data, focus/SEO, responsive scale.
**DECISIONS DEFERRED** — hero photo is Home-only composition (human-approved); replacement with a higher-res asset is a future asset task (D-9).

### Shared shell — red header (human-approved)
**FILES CHANGED** — `components/layout/SiteHeader.module.css`, `MainNavigation.module.css`.
**VISUAL ELEMENTS PRESERVED** — NTU-red `#b62938` full-width band + white nav + white mobile toggle.
**DEFECTS REMOVED** — n/a.
**FRAMEWORK FEATURES PRESERVED** — header height/layout, nav structure, breakpoints, mobile panel behavior, keyboard/focus (white focus rings re-tuned on red), sticky behavior, a11y.
**RESPONSIVE QA** — verified 375/768/1024/1440/1600/1920 (true viewport via CDP): red band exact `#b62938` to the edges; white text present; no crowding/wrap/overflow; mobile toggle opens the 8-link panel.

### Research
**FILES CHANGED** — `app/research/page.module.css` (+ shared grey-band PageHeader).
**VISUAL ELEMENTS PRESERVED** — legacy grey hero band + centred title; numbered text-left/image-right rows (V4 already mirrored legacy); red index numerals.
**DEFECTS REMOVED** — legacy research rows used generic Bootstrap cards (rounded/shadow) — V4 keeps flat editorial rows (D-3).
**FRAMEWORK FEATURES PRESERVED** — alternating flip rows, related-project links, `research-areas.ts` data.
**A/B GATE (final acceptance)** — desktop justify vs left-align quantified: justify = 28–36 flush-right rows per paragraph, left = 0–17. Current committed state = **A (justified, D-7 recommendation)**. Evidence: `visual-qa/gate/research-A-justify-1440.png`, `research-B-left-1440.png`, composite `research-AB-compare-para2.png`.

### People
**FILES CHANGED** — `components/content/PersonCard.tsx`/`.module.css`, `PIProfile.tsx`/`.module.css`.
**VISUAL ELEMENTS PRESERVED** — legacy circular 1:1 portraits (PI large circle + member round cards), role-grouped sections, alumni rows.
**DEFECTS REMOVED** — legacy used placeholder circles + tiny 208 px photos (flagged D-9 for replacement); V4 circular initials placeholders are crisp.
**FRAMEWORK FEATURES PRESERVED** — role-category grouping, grid, `people.ts` data, profile links, `ResponsiveImage`.
**OBJECT-POSITION READINESS (final acceptance)** — confirmed: `ResponsiveImage`'s `.cover` uses default `object-position: 50% 50%`; the outer frame accepts a per-person `className` and the inner `<Image>` accepts an inline `objectPosition`. Adding per-person adjustment is a small isolated change: an `objectPosition?: string` prop on `ResponsiveImage` (applied as `style={{ objectPosition }}`) + an optional `photoPosition` field on `Person`. **Not implemented now** (no behavioural scope creep); mechanism confirmed.

### Publications
**FILES CHANGED** — `components/content/PublicationItem.tsx`/`.module.css`.
**VISUAL ELEMENTS PRESERVED** — legacy red emphasis on notable work via a semantic inline **Featured** label (D-6 Option A; replaces the legacy floating "highly cited" accident).
**DEFECTS REMOVED** — legacy red float-right callout (layout accident) → inline label.
**FRAMEWORK FEATURES PRESERVED** — year navigation, grouped bibliography, `featured` data flag, DOI/external link handling.

### News / Join / Apply / Contact
**FILES CHANGED** — none (inherit the language via tokens + shared grey-band PageHeader).
**VISUAL ELEMENTS PRESERVED** — red category/type accents, red active tab underline (Join), red submit/CTA accents (Apply), grey page headers.
**DEFECTS REMOVED** — n/a.
**FRAMEWORK FEATURES PRESERVED** — news: FeaturedNews + year chronology; join: ARIA tablist/tab/tabpanel + URL-hash state + apply entry; apply: full 8-field form + file upload + submit (noindex, outside nav/sitemap); contact: `<dl>` details + Google Maps embed iframe.
**GATE VERIFICATION (final acceptance)** — 1440 px screenshots for all four (`visual-qa/gate/*.png`): red header `#b62938` ✓, grey PageHeader band ✓ (apply at y≈180–360 due to back-link offset), red accents ✓; DOM semantics verified intact (see above).

### Footer harmonization
**FILES CHANGED** — `components/layout/SiteFooter.tsx`/`.module.css`, `components/ui/BackToTop.tsx`/`.module.css`, `styles/tokens.css` (`--color-footer`).
**VISUAL ELEMENTS PRESERVED** — legacy dark `#444` footer band + red back-to-top square (D-8 Option A), complements the red header (legacy "red top / dark bottom" frame).
**DEFECTS REMOVED** — legacy back-to-top only existed in JS for the then-current page; now an accessible client button.
**FRAMEWORK FEATURES PRESERVED** — footer contact block, nav links, copyright (build year), keyboard focus.

---

## Test Results
- `npm run lint` — **0** errors.
- `npx tsc --noEmit` — **0** errors.
- `npm run build` — **exit 0**, all routes static/SSG.
- Server verified at `http://localhost:3123` (production `npm run start`).

## Responsive QA
- Red header band exact `#b62938` at 375/768/1024/1440/1600/1920 (CDP-verified true viewports; headless `--window-size` has a ≥526 px inner-width minimum — **all mobile checks re-run via CDP device metrics**).
- Horizontal overflow: **0** at 375/360/414 (only offender = the a11y skip-link intentionally off-screen at -9999).
- Back-to-top button: right edge of footer at all widths (375 → left 323, 1440 → left 1239); red background `rgb(182,41,56)`.
- Page heights: desktop 7549 px, mobile 6737 px; footer renders complete at the bottom.

## Known Risks
1. **Legacy asset rights/quality (D-9, deferred):** member photos are ~208 px (low-res); journal figures are copyright-risky and must NOT be used as general artwork. Adopting real group photos is a human asset task.
2. **Hero campus photo** is downscaled from the legacy 4400×1044; a higher-res licensed replacement is recommended later.
3. **Justified research text (A)** can create rivers on very narrow desktop columns; it is desktop-only (mobile left-aligned) and reversible in one CSS block.
4. Content conflicts (V4 placeholder research/people/publications/news data vs real legacy/contact data) were **reported, not resolved** — see `DESIGN-DECISIONS-NEEDED.md` and `OLD-TO-NEW-MAPPING.md`.

## Decisions Deferred (unchanged)
- D-9 legacy asset adoption beyond the Home hero.
- Actual content data (placeholder vs real) replacement.
- Back-to-top floating variant (footer-only implemented).

## Next Recommended Page / Steps
- No further pages require visual work — the full route set carries the language.
- Recommended next human decision: (a) pick Research A (justified) or B (left) if you prefer to switch; (b) approve/supply real member photos + higher-res hero for asset migration (D-9); (c) if satisfied, consider promoting the branch per the repo's normal review process (no pushes performed).

---

## Commit Log (review/legacy-integration)
```
33d46fa refactor(home): reconstruct legacy home hero … adopt NTU campus hero asset
d054f37 refactor(layout): legacy NTU-red header band with white navigation …
08d0d9f refactor(ui): legacy grey-band page header (shared centred large title)
17f62d1 refactor(research): … justified long-form descriptions on desktop (D-7)
d90278e refactor(people): legacy circular portraits …
62d214f refactor(publications): legacy red 'Featured' emphasis label (D-6)
bef5900 feat(footer): legacy dark footer band (#444) with red back-to-top (D-8)
2629b1e docs(legacy): record human approvals (D-1..D-10 status) + guardrails
```
All commits small, reviewable, independently revertible. `main`/`preview` untouched. No pushes performed.
