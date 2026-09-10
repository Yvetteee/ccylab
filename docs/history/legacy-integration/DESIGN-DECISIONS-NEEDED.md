# Design Decisions Needed — deferred to human review

> Every question follows the same shape:
> **CURRENT LEGACY BEHAVIOR · CURRENT V4 BEHAVIOR · PROBLEM · OPTION A ·
> OPTION B · RECOMMENDATION · VISUAL CONSEQUENCE.**
> These are deliberately deferred — the legacy gives no unambiguous answer, and
> generic modern-web defaults are NOT an acceptable fallback (task §7).

---

## STATUS — human approvals & implementation (updated during propagation)

| # | Decision | Status |
|---|----------|--------|
| D-1 | Accent color | **APPROVED (q4)** — single NTU-red token; implemented in `styles/tokens.css` |
| D-2 | Red header | **APPROVED (q2)** — implemented (red band + white nav, structure/breakpoints/a11y unchanged) |
| D-3 | Flat vs rounded | **Option A followed** (kept V4 flat, no shadows) — pages reviewed page-by-page |
| D-4 | Serif vs heavy-sans | **Option A followed** (kept V4 serif headings, legacy scale/italic motif) |
| D-5 | Home hero overlay | **APPROVED (q3)** — implemented (campus photo + white overlay + centred title) |
| D-6 | Featured red callout | **Option A implemented** — inline red "Featured" label on featured publications |
| D-7 | Justified text | **Option A implemented** — justify on long-form research descriptions (desktop only) |
| D-8 | Back-to-top | **Option A implemented** — red back-to-top in dark footer (shared shell) |
| D-9 | Legacy assets | Home hero adopted (downscaled NTU campus photo); other assets **still flagged for human review** |
| D-10 | Propagation scope | Human chose to **accelerate shell harmonization**: red header done first, dark footer + back-to-top done with final harmonization |

Human guardrails captured from the approvals:
- Design language propagates across pages; Home hero *composition* is Home-only (no photo-hero copies on subpages).
- Grey surface bands only where they meaningfully group a section (not grey/white alternation everywhere).
- Research / People / Publications keep their own info structure and content semantics.
- Join / Apply stay task-focused (no heavy hero or decoration).
- Red used as a restrained accent (links/active/buttons/small highlights/focus); body stays white/grey/neutral; hover/active stay in the red family.
- Scientific-figure green is NOT a UI accent and is left untouched.
- Single reversible red token; no page-level hard-coded red.

---

## D-1 — Primary accent color (identity-critical)

- **CURRENT LEGACY BEHAVIOR:** NTU red family (`#b62938` header band,
  `#c41e3a` accents). The site is instantly recognizable by it.
- **CURRENT V4 BEHAVIOR:** deep green accent `--color-accent: #0f5e4f` (editorial
  "one accent" token used by links, kickers, active nav).
- **PROBLEM:** The single most identity-defining decision. The green is a
  deliberate V4 design choice; the red is the lab's recognizable brand. They
  cannot both be "the accent".
- **OPTION A:** Replace `--color-accent` with NTU red (legacy brand wins;
  V4 keeps the flat/editorial system around it).
- **OPTION B:** Keep green as the structural accent and introduce NTU red only
  in the header band + action elements (dual-accent — more complex to keep
  consistent).
- **RECOMMENDATION:** **Option A** — one semantic red token; matches legacy
  identity with V4-level consistency. Header band adopts the same red.
- **VISUAL CONSEQUENCE:** Site reads instantly as the same lab; links/kickers/
  active nav become red. Fully reversible in one token file.

---

## D-2 — Header: red band vs current white sticky header

- **CURRENT LEGACY BEHAVIOR:** full-width red `#b62938` band, white 20px nav,
  bold wordmark right.
- **CURRENT V4 BEHAVIOR:** white sticky header, thin bottom border, sans
  wordmark + institution left, small uppercase nav, mobile hamburger.
- **PROBLEM:** Red band is the strongest identity cue, but V4's white sticky
  header is a deliberate, polished a11y choice (contrast, no layout shift).
- **OPTION A:** Red band header (legacy identity) with white text; keep V4
  mobile menu + sticky behavior + focus rings.
- **OPTION B:** Keep white header; use red only in nav hover/active accents.
- **RECOMMENDATION:** **Option A**, tuned for contrast (white on `#b62938`
  passes WCAG AA at nav size; darker red `#a3152c` hover optional). Landing
  during final Header/Footer harmonization step.
- **VISUAL CONSEQUENCE:** The header — the most-seen element — becomes the
  recognizable NTU-red bar; active item keeps a white underline.

---

## D-3 — Card language: legacy rounded+shadow vs V4 flat

- **CURRENT LEGACY BEHAVIOR:** cards/images use `border-radius: 8–12px`, soft
  1px shadows, light gray `#f8f9fa` panels.
- **CURRENT V4 BEHAVIOR:** flat editorial — thin `#dadada` borders, radii 2–6px,
  no shadows, `#f6f7f5` surfaces.
- **PROBLEM:** V4 explicitly documents "no shadows, small radii" as its design
  language. Legacy's rounding is soft but not a "generic startup" look.
- **OPTION A:** Keep V4 flat radii; translate legacy's *gray band + panel*
  structure (identity) without the rounded/shadow gloss.
- **OPTION B:** Adopt legacy's rounded+subtle-shadow on cards/figures
  (higher fidelity, drifts from V4's documented flatness).
- **RECOMMENDATION:** **Option A** — preserve the composition and gray-band
  rhythm; keep flatness as the framework's distinguishing robustness. Flag
  if a specific page looks too severe.
- **VISUAL CONSEQUENCE:** Same layout skeleton as legacy, crisper edges.

---

## D-4 — Typography: serif headings vs legacy heavy-sans headings

- **CURRENT LEGACY BEHAVIOR:** default Arial sans, huge bold headings
  (3rem h1), italic subtitles.
- **CURRENT V4 BEHAVIOR:** Source Serif 4 headings + Inter body (webfonts,
  variable weights, optical polish).
- **PROBLEM:** Legacy's sans is not a *character* — it's the platform default.
  V4's serif editorial voice is its strongest polish. Fidelity vs framework.
- **OPTION A:** Keep V4 serif headings; translate legacy's *scale* (large
  page titles, bold emphasis, italic taglines) and grey-band composition.
- **OPTION B:** Switch headings to a bold sans (closer to legacy, loses V4's
  distinctive serif voice).
- **RECOMMENDATION:** **Option A.** The legacy's typographic *character* (tall,
  confident, generous) is preserved through scale + weight + the italic
  subtitle motif, while the serif keeps the site unmistakably more polished.
- **VISUAL CONSEQUENCE:** Recognizable lab voice, V4-grade typography.

---

## D-5 — Home hero treatment: overlay-on-photo vs current text-above-photo

- **CURRENT LEGACY BEHAVIOR:** full-bleed campus photo, translucent white
  overlay `rgba(255,255,255,.7)`, title + italic subtitle centred on the photo.
- **CURRENT V4 BEHAVIOR:** centred text block above a wide photo (no overlay).
- **PROBLEM:** The overlay hero is iconic and *the* Home identity; V4's
  separated text+photo is cleaner for long descriptions and a11y.
- **OPTION A:** Reconstruct the legacy overlay hero (photo + white overlay +
  centred title/subtitle). Title over photo.
- **OPTION B:** Keep text-above-photo, but bring the legacy title/subtitle
  scale and italic motif to the text block.
- **RECOMMENDATION:** **Option A** for the hero only, with the white overlay
  behind an aria-hidden decorative layer and real text on top (contrast-safe,
  inherits V4 focus/SEO). If the current description text is long, it moves
  below the hero.
- **VISUAL CONSEQUENCE:** The Home page immediately reads as the legacy lab.

---

## D-6 — "Highly cited" red callout / red floating accents

- **CURRENT LEGACY BEHAVIOR:** `float: right` red bold "highly cited" /
  "biography" callouts.
- **CURRENT V4 BEHAVIOR:** no such callouts; publications use year navigation
  + grouped lists.
- **PROBLEM:** The *float* is an accident; the *red highlight* idea (drawing
  attention to notable work) is intentional.
- **OPTION A:** Add a small red "Featured / Highly cited" inline label on
  featured publications (semantic, non-floating).
- **OPTION B:** Drop the callout entirely (featured work already surfaced by
  home + year nav).
- **RECOMMENDATION:** **Option A**, as an inline `<span>` label — low risk,
  preserves the red-highlight motif.
- **VISUAL CONSEQUENCE:** Featured papers carry the recognizable red emphasis.

---

## D-7 — Justified body text

- **CURRENT LEGACY BEHAVIOR:** `text-align: justify` on paragraphs (welcome,
  research, publications).
- **CURRENT V4 BEHAVIOR:** left-aligned, `text-wrap: pretty`.
- **PROBLEM:** Justification is a legacy typographic tic; it risks rivers on
  narrow columns but is part of the "academic print" feel.
- **OPTION A:** Apply justify only to long-form content columns (research
  descriptions, publication entries) on wide screens; keep left-align on
  short labels/mobile.
- **OPTION B:** Drop justify entirely (V4 already handles text better).
- **RECOMMENDATION:** **Option A** — a faithful, controlled translation of the
  print-like academic feel without the rendering risks.
- **VISUAL CONSEQUENCE:** Long-form paragraphs regain the legacy print
  character on desktop; nothing breaks on mobile.

---

## D-8 — Back-to-top motif

- **CURRENT LEGACY BEHAVIOR:** small red rounded square (`40px`, radius 5,
  white `^`) fixed/at footer.
- **CURRENT V4 BEHAVIOR:** no back-to-top control.
- **PROBLEM:** Legacy back-to-top is a recognizable, useful motif; V4 has none.
  Adding UI is a behavior change beyond pure styling.
- **OPTION A:** Add a red back-to-top (footer-right + optional floating),
  accessible button.
- **OPTION B:** Skip — V4 pages are short and headers are reachable.
- **RECOMMENDATION:** **Option A** (footer placement only, keyboard-accessible)
  during final harmonization; it is a legacy signature.
- **VISUAL CONSEQUENCE:** A familiar affordance + red accent returns.

---

## D-9 — Legacy asset adoption (photos)

- **CURRENT LEGACY BEHAVIOR:** real campus/group/research photos (NTU.png 6.5MB,
  member.png, research*.jpeg).
- **CURRENT V4 BEHAVIOR:** placeholder SVG figures (`hero-lab.svg`,
  `group-wide.svg`, `research-1/2/3.svg`).
- **PROBLEM:** Using the real legacy photos would strongly anchor identity, but
  several are low-res / huge; rights are unclear (journal figures must not be
  used as general artwork).
- **OPTION A:** Adopt select legacy photos (hero campus, a research figure,
  member portraits) after resolution/rights check; downscale + WebP.
- **OPTION B:** Keep V4 SVGs; migrate assets only when real photos are
  supplied.
- **RECOMMENDATION:** **Option A for Home hero only as proof-of-concept**
  (NTU campus photo, downscaled), and flag the rest for human asset review.
- **VISUAL CONSEQUENCE:** The hero becomes a real photo → immediate identity
  anchor; flagged assets replaced later.

---

## D-10 — Scope of the Home proof-of-concept

- **CURRENT LEGACY BEHAVIOR:** red header + red accents + grey bands everywhere.
- **CURRENT V4 BEHAVIOR:** green accent + white header everywhere.
- **PROBLEM:** Section 11 requires Home-first with no global propagation; but
  the header/footer are shared layout. A red header on Home alone is impossible
  without changing the shared shell.
- **OPTION A:** Home proof-of-concept = Home page body only (hero, sections,
  composition) + the shared accent token change (reversible); header/footer
  red-band treatment deferred to final harmonization.
- **OPTION B:** Include the red shell (header/footer) in the Home proof — a
  real "looks like the lab" screenshot, at the cost of changing the shared
  layout before page-by-page review.
- **RECOMMENDATION:** **Option A** (scope-clean, matches task §11 and §Phase-3
  "Header/Footer final harmonization" ordering); present Option B's visual as
  a mock in the comparison so the human can choose to accelerate.
- **VISUAL CONSEQUENCE:** The Home body demonstrates the language; the shell
  follows after approval.
