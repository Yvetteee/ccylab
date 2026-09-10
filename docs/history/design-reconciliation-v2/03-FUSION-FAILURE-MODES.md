# 03 — Fusion Failure Modes: Why the Fusion Still Feels Forced

> Three-version deep design reconciliation audit — read-only.
> Fusion candidate: `radiuszzz/lab-website` branch `review/legacy-integration` @ `e7f4d11`
> (served at :3123).
>
> The user's feeling: *"The fusion clearly incorporates part of the legacy style, but the integration still
> feels somewhat forced."*
>
> This document identifies **concrete structural causes** — not "needs more consistency / polish".

---

## 0. The core thesis (the one structural cause behind the rest)

The fusion transferred legacy **OBJECTS** onto V4 **STRUCTURE**, but did not transfer legacy **RELATIONSHIPS**.

- Objects moved: the red band, circular portraits, grey page bands, justified text, dark footer, red back-to-top.
- Relationships lost: nav-left/identity-right header grammar; the bold-print single-typeface overlay voice;
  the PI-vs-member two-grammar people system; the Material→Membrane→Application *progression* (not just numbering);
  the visual NTU logo presence; the two-red job split (identity vs action).

Because V4's *typography, layout, containers, and component grammar are 100% intact*, the legacy contributions
read as **coloring** applied to a V4 skeleton. Result: "V4 wearing legacy colors and decorations" rather than
"the legacy Ye Group website naturally evolved."

---

## 1. RISK 1 — Header Geometry: recolored, not translated

**Evidence (verified in source):**
- Legacy: `nav` on the LEFT, wordmark "The Ye Group @ NTU" on the RIGHT; red `#b62938` band; active = underline.
- V4 baseline `SiteHeader.module.css`: brand (serif name + uppercase muted institution) on the LEFT, `MainNavigation`
  on the RIGHT, white background, bottom border.
- Fusion `SiteHeader.module.css`: **byte-for-byte the V4 geometry** (same `.inner` flex column brand-left,
  nav-right, same `min-height: var(--header-height)`, same container/spacing/gap) with the background changed to
  `var(--color-accent)` (red) and text to white.

**Finding:** the fusion header = **V4 header composition + legacy red background**. The legacy shell relationship
(navigation left, identity right, one-line bold wordmark) was *not* adopted. The brand itself is V4's two-line
serif + uppercase letter-spaced institution — not the legacy's single bold wordmark.

**Why it feels forced:** the red band is the single most iconic legacy element, but it now *contains V4 furniture*
(a serif two-line brand, a right-aligned 8-item nav). A viewer who knows the legacy sees "the old red flag with
new occupants." The band no longer *owns* its content.

**Evaluation:**
- Identity: V4 geometry is conventional and scalable (8 items + a long two-line name fit naturally);
  legacy geometry (nav-left) is authentic but cramped at 8 items + long name.
- Usability/responsive: V4 geometry + Menu toggle at <1080px is genuinely better than legacy (which hid the nav).
- **Do NOT restore nav-left geometry.** But the header needs its *typography and internal rhythm* to feel native
  to the red band (a single-line identity statement; nav that reads as "white on the flag"), rather than V4 type
  sitting on a red surface.

**Verdict: REINTERPRET** — keep the geometry, translate the *relationship* (identity as a compact flag-mark,
white text designed for the red), and keep the Menu toggle.

---

## 2. RISK 2 — Home Design Seam

**Evidence (verified in source + rendered):**
- Legacy hero: full-bleed photo + `rgba(255,255,255,0.7)` overlay + centered bold 3rem title + italic 1.5rem
  subtitle; then a narrow "welcome" justified paragraph. No CTA button. One typeface.
- Fusion `Hero.tsx`: same photo+overlay composition, but with **V4 typography** — red uppercase institution
  eyebrow, serif `--text-5xl` title, serif italic tagline — plus a **V4 outlined red CTA button**
  ("Explore our research →") and a narrow justified welcome block below.
- Below the hero: pure V4 editorial sections (ResearchOverview, GroupSpotlight, FeaturedResearch, LatestNews, JoinCTA).
- Rendered (measured): hero is full-bleed (1425px @1440 → 1905px @1920) and **ratio-driven height** — 16/7 gives a
  ~623px photo band @1440 and ~833px @1920; the welcome block adds ~220px. Content below is capped at 1344px
  (`--container-wide`), i.e., at 1920 the hero spans 1905px and the body snaps to a 1344px column (~281px margins).

**Finding:** the hero's *image language* (photo + white overlay, legacy) is married to V4's *type language*
(serif + eyebrow + italic) and a V4 *action* (outlined red CTA), and then transitions to a *narrow editorial body*.
Three layers in one first screen; the photo-overlay hero is the only text-on-image element on the site, so it is
the obvious seam.

**Structural causes (not symptoms):**
1. Typography mismatch: the overlay uses V4 serif/eyebrow rather than the legacy's single bold-print voice.
2. The CTA button is a V4 action construct the legacy never had, placed exactly at the seam.
3. Full-bleed hero → 1344px column snap, which *widens* as the viewport grows (worst at 1920).
4. Ratio-driven hero height → very tall hero on large screens (no height cap).

**Do NOT delete the V4 home sections** (Research/Featured/News/Join are valuable). Find a deeper compositional
translation: the hero should open with the *same type system and restraint* as the rest of the page (it already
uses V4 type — the problem is it is the ONLY text-over-image element), and the hero→body transition should be an
explicit, designed step (e.g., the welcome block as a deliberate "from picture to words" turn) instead of a third
layer.

**Verdict: REFINE FUSION.**

---

## 3. RISK 3 — People Portrait Grammar: the PI's circle wrongly applied to everyone

**Evidence (verified in the CURRENT legacy `main` on GitHub — Yvetteee/ccylab):**
- Legacy **PI** (`pi.html` main): **LARGE CIRCULAR photo** (250px) + 2rem name (incl. Chinese) + email + the
  **signature bilingual Chinese quotation with English translation** (grey box, left border).
- Legacy **members** (`members.html` main): **PORTRAIT-ORIENTED RECTANGULAR photo** (120px × 145px, no radius,
  object-fit cover, top-positioned) + **horizontal continuous biography roster** — photo LEFT, heading (name +
  Chinese name + email) and full justified biography to the RIGHT; grouped by role with centered headers
  (POSTDOCS / RESEARCH ASSOCIATE / GRADUATE STUDENTS).
- The circular `.member-photo` (180px) still in CSS is **COMMENTED OUT in current main** — an inactive leftover,
  NOT the active member roster.
- Fusion `PIProfile`: 1:1 circle (max 24rem ≈ 384px) + name/role/bio/interests/education/links — **no quotation**.
- Fusion `PersonCard`: 1:1 circle + name/role/group/interests/links, laid out in a 4-column card grid.
- `grep` of the fusion content layer: **no Chinese quotation anywhere** ("quote/闻道/师说/Han Yu" → 0 matches).

**Finding:** the fusion committed exactly the misinterpretation this audit warns against: it took the PI's
**circular** portrait (a person-specific grammar) and generalized it into "everyone gets a circular card",
applying the PI grammar to members whose active legacy grammar is a **rectangular portrait + text biography
roster**. The members' horizontal continuous roster (low visual weight, biography-forward) was flattened into a
heavy 4-column circular card grid; and the PI's **signature bilingual quotation** was dropped entirely.

**Structural cause:** object transfer without relationship transfer. "Circular portrait" was treated as a
site-wide decoration instead of as a *person-specific grammar*; the relationship that mattered — PI = a personal
statement, members = a continuous text-led roster — was lost. The 4-col circular card grid + initials-in-circle
placeholders is the single most "AI team template" element on the site.

**Verdict: REINTERPRET (APPROVED as D-C).** Keep V4 role-grouping IA + data model. Restore the two grammars:
- **PI** = large circular portrait + identity/profile + the signature bilingual quotation (restored in its
  *signature role*, rebuilt restrainedly inside the new design system — not a mechanical copy of the old
  grey-box/border style);
- **members** = role-grouped **continuous roster** with **portrait-oriented rectangular photo** + text biography
  (horizontal rows), NOT a uniform circular card grid.

---

## 4. RISK 4 — Red Semantic Overreach

**Evidence (verified in source — `styles/tokens.css`):**
- Legacy used **two reds with two jobs**: `#b62938` = the identity flag (header); `#c41e3a` = action/emphasis
  (buttons, tab underline, intended "highly-cited" highlights).
- Fusion token file explicitly *collapses* them: comment reads *"header band #b62938 / accent #c41e3a collapsed
  into one semantic token."* Single `--color-accent:#b62938`, `--color-accent-dark:#a3182e`, `--color-focus:#b62938`.
- The single red is applied to: links, active nav underline, buttons, CTAs, labels, Featured publication label,
  BackToTop, focus ring, group text on PersonCard, etc.

**Finding:** NTU red has shifted from **brand identity** (a flag) to an **over-systematized UI color** (every
interactive/emphasis state). Consequences:
1. Dilution — red stops meaning "this is the lab" and starts meaning "anything emphasized."
2. Red-on-red blind spots — focus rings and active states on red elements are invisible (fusion already
   workarounds the header with white rings; the same problem exists wherever red sits on red).
3. "Red-themed template" rather than "a lab whose flag is red."

**The question is NOT "what second color?"** It is: **where should red carry brand meaning, and where should
neutral UI stay neutral?** A disciplined allocation within the existing single token:
- Keep red: the header flag, the primary CTA, BackToTop, and a *few* signature moments (e.g., the PI accent, a
  Featured label).
- Return to neutral: most text links (underlined neutral), labels/metadata (muted), secondary actions,
  focus rings where red is invisible.

**Verdict: REFINE FUSION.** (Stays within the human-approved "one red accent" decision — this is re-allocation,
not a new color.)

---

## 5. RISK 5 — Research Narrative Depth

**Evidence (verified in source + content):**
- Legacy Research = **three numbered steps that build a progression**: 1 Designing Porous Materials →
  2 Building Better Membranes → 3 Solving Real-World Problems = **MATERIAL → MEMBRANE → APPLICATION**.
  The legacy even had an abandoned dark 3-step diagram with arrows (the intent was explicit).
- Fusion `app/research/page.tsx` renders `researchAreas` from the content layer — currently the **V4 placeholder
  topics** (machine-learning-systems / human-centered-ai / embodied-intelligence / trustworthy-computing), rendered
  as independent alternating rows with padded numbers `01 02 03 04`. Metadata even quotes "machine learning systems
  to human-centered AI."

**Finding:** the fusion preserved the **layout object** (numbered alternating text-left/figure-right rows,
question/themes/related) but **not the narrative relationship**. A numbered *list* of independent directions is
not the legacy's *progression* (each step builds on the previous). The "1→2→3" survives only as `01/02/03/04`
padding.

**Structural cause:** the legacy's depth lived in the *content structure* (a story with an arc) and the *visual
reading order*; the fusion inherited V4's *list-of-directions* IA, so the page cannot express progression even
when real content arrives. This is partly content (real lab areas must be authored) and partly layout (the page
should be able to *show* progression: an explicit opening diagram or a "1→2→3" reading order + cross-links).

**Verdict: REINTERPRET.** Keep V4 layout quality; when real content lands, structure it as a progression and let
the page express it (e.g., an opening "Material → Membrane → Application" statement, not just `01 02 03`).

---

## 6. RISK 6 — Footer / NTU Identity

**Evidence (verified in source):**
- Legacy footer on **every page**: NTU logo + centered "© 2025 The Ye Group" + red back-to-top. Institutional
  identity is *visual*.
- Fusion `SiteFooter.tsx`: dark `#444` band + serif brand + full footer nav + contact block (school/institution/
  address/email) + copyright + red BackToTop. **No NTU logo anywhere.** Institution appears only as text
  (`contact.institution`) and as the header's uppercase `brandSub`.

**Finding:** the fusion replaced the legacy's *visual institutional presence* (the NTU flag) with an *editorial
footer* (nav + contact). The institution is factually present but emotionally absent — the site no longer "shows"
its university.

**Assessment (do NOT insert logos blindly):**
- NTU logo in a dark footer is a low-risk, conventional institutional signal, but it requires the official asset,
  correct sizing/contrast, and NTU brand-guideline compliance — a HUMAN/BRAND decision.
- The deeper structural point: identity is currently carried by *text only*; if the logo is unavailable, the
  footer should at least make "Nanyang Technological University" read as an identity line, not a contact detail.
- Institutional identity is better carried here (one NTU presence in the footer) than by adding *more* red UI
  elements elsewhere.

**Verdict: HUMAN DESIGN DECISION** (logo availability/licensing) **+ REFINE FUSION** (footer identity hierarchy:
brand name + institution identity line + optional NTU mark, with a single clear hierarchy).

---

## 7. Additional failure modes (beyond the six mandated risks)

| # | Failure mode | Evidence | Verdict |
|---|---|---|---|
| FM7 | **One grey-PageHeader template on every top-level page** — grey band + centered 5xl serif + centered 62ch desc. The legacy also used grey bands, but simpler (h1 + optional line); the fusion editorialized them into an identical machine. Combined with red header + dark footer → "template strips". | `PageHeader.module.css` shared by all pages | **REFINE** — keep the band rhythm, let pages differ (Apply quieter, Research narrative-led, Contact natural) |
| FM8 | **Two "1-main + 2-secondary" blocks back-to-back on Home** (ResearchOverview + FeaturedResearch) plus GroupSpotlight's full-bleed photo band. Home = a stack of alternating big-image blocks; at 1920 the hero alone is ~833px tall. | Home `page.tsx`; `ResearchOverview.tsx`; `FeaturedResearch.tsx` | **REFINE** — reduce one block or merge them; cap hero height |
| FM9 | **"→" arrow CTA pattern everywhere** (Explore → / View publication → / Read more →) — a modern-web template idiom, over-used. | Hero, ResearchOverview, FeaturedResearch, News | **REFINE** — use sparingly |
| FM10 | **Initials-in-circle placeholders** repeated across the People grid — team-template/SaaS smell. | `PersonCard.module.css .placeholder` | **REFINE** — degrade or wait for real photos |
| FM11 | **Red as default link color site-wide** — dilutes the flag (part of Risk 4). | `--color-accent` on `.links a` etc. | **REFINE** — neutral links, red reserved |

---

## 8. The structural "WHY" (summary — what a reviewer must report, not symptoms)

1. **Object-transferred, relationship-lost.** The fusion moved legacy *visible elements* (red band, circles,
   grey bands, justify, dark footer, back-to-top) onto V4 *structure*, but did not move legacy *relationships*
   (nav-left/identity-right, bold-print overlay voice, PI-vs-member grammar, Material→Membrane→Application
   progression, visual NTU presence, two-red job split).
2. **V4 type on legacy colors.** Typography (serif, uppercase eyebrows, Inter, muted labels) is 100% V4; the
   legacy's one-typeface bold-print voice is gone. So the legacy reads as "coloring", V4 as "structure" — two
   systems, one page.
3. **Over-systematization of an organic red.** One red token doing every job turns brand into UI-theme and
   creates red-on-red blind spots.
4. **Template uniformity.** Grey-band + section + grid on every page = "one template"; the distinctive
   photo-overlay hero becomes the outlier that exposes the seam.
5. **Content layer not migrated.** Real lab content (research progression, the PI quotation, NTU logo, real
   photos, real publications) is absent. Some of the "forced/generic" feeling is **placeholder content**, not
   design — this must be separated from genuine design failures.
