# 04 — Page-by-Page Three-Way Audit

> Three-version deep design reconciliation audit — read-only.
> Per page: LEGACY INTENT / V4 STRENGTH / FUSION CURRENT STATE / SUCCESSFUL INTEGRATION /
> MECHANICAL-FORCED ELEMENTS / DEEPER STRUCTURAL ISSUE / RECOMMENDED DIRECTION / PRIORITY / CONFIDENCE.
> Priority: P0 quality / P1 worth doing / P2 if budget. Confidence: H/M/L.

---

## 1. HEADER

- **Legacy intent:** red `#b62938` flag band; nav LEFT, wordmark "The Ye Group @ NTU" RIGHT; active = underline; compact.
- **V4 strength:** brand-left two-line serif + right nav; sticky; Menu toggle <1080px (legacy hid nav on mobile); scalable to 8 items.
- **Fusion current:** V4 geometry with red background + white text + white underline active + white focus rings.
- **Successful integration:** the red band IS the legacy flag; contrast verified (AA); mobile toggle preserved (fixes legacy accident).
- **Mechanical/forced:** the band frames V4 furniture — two-line serif brand + right nav — so it reads "recolored", not "translated". Brand is not the legacy's compact wordmark.
- **Deeper structural issue:** object (red) transferred without relationship (nav-left/identity-right, one-line wordmark ownership of the band).
- **Recommended direction:** keep V4 geometry (scalability) — **REINTERPRET** the band's internal identity (compact flag-mark identity text designed for the red, white type native to the band).
- **Priority:** P1 · **Confidence:** H

---

## 2. HOME

- **Legacy intent:** full-bleed campus photo + white overlay + centered bold title + italic subtitle; wide→narrow; short page; no CTA; "welcome" voice.
- **V4 strength:** mixed container widths; clear serif hierarchy; research/featured/news/join previews with real IA.
- **Fusion current:** legacy hero (photo+overlay) in V4 typography + red outlined CTA + narrow welcome; then ResearchOverview (1+2), GroupSpotlight (full-bleed team photo band), FeaturedResearch (1+2), LatestNews, JoinCTA.
- **Successful integration:** the hero carries real identity; the previews give the page purpose; content order is right.
- **Mechanical/forced:** two "1-main + 2-secondary" blocks back-to-back; hero is the only text-on-image element (seam); full-bleed→1344px snap at 1920; hero ratio-driven and very tall (~833px photo band @1920); "Explore →" arrows repeated.
- **Deeper structural issue:** hero language (legacy photo-overlay) ≠ body language (V4 flat editorial) — two visual systems on one page; page is very long (~7.5k px desktop / ~6.7k px mobile).
- **Recommended direction:** **REFINE FUSION** — cap hero height; unify the hero's type with the page's type register; merge/weaken one of the two 1+2 blocks; make the hero→body transition an explicit designed step.
- **Priority:** P0 · **Confidence:** H

---

## 3. RESEARCH

- **Legacy intent:** 1→2→3 narrative (Material→Membrane→Application); text-left/figure-right rows; rich bullet body; grey hero band.
- **V4 strength:** alternating figure/text rows with number, question, story, themes, related-projects cross-links; clear layout; scalable.
- **Fusion current:** V4 rows over **placeholder AI/ML content** (machine-learning-systems etc.); padded `01 02 03 04`; justified description (the site's only justified body); PageHeader grey band.
- **Successful integration:** the alternating layout is a genuine improvement over the legacy's 2fr/1fr rows; "Related projects" cross-links are excellent.
- **Mechanical/forced:** `01/02/03/04` padding simulates the legacy numbering without a progression; justified text is the site's only justify (inconsistent); placeholder topics read as AI-template.
- **Deeper structural issue:** list-of-directions IA replaced narrative-arc IA; the page cannot express "this builds on that" even when real content arrives.
- **Recommended direction:** **REINTERPRET** — keep V4 layout; when real content lands, structure as a progression (explicit opening diagram / 1→2→3 reading order); decide justify vs left site-wide.
- **Priority:** P1 (layout), P0-if-content-dependent · **Confidence:** H

---

## 4. PEOPLE

- **Legacy intent:** two grammars — PI = LARGE CIRCULAR portrait (250px) + name + email + signature bilingual quote (with English translation); members = PORTRAIT-ORIENTED RECTANGULAR photo (120×145) + horizontal continuous biography roster (photo left, name/Chinese-name/email + full justified bio right), role-grouped (POSTDOCS / RESEARCH ASSOCIATE / GRADUATE STUDENTS).
- **V4 strength:** PI spotlight + role-grouped sections + alumni rows; data model scales.
- **Fusion current:** PIProfile (1:1 circle, max 24rem) + role groups (Postdoc/PhD/Assistant/Visiting) as 4-col circular-card grids + alumni text rows. **No Chinese quote in content.**
- **Successful integration:** role-grouping + PI spotlight + alumni = good IA; the PI's circular portrait echoes the legacy.
- **Mechanical/forced:** uniform circular-card template applies the PI's circle to ALL members (legacy members are rectangular-roster rows); initials-in-circle placeholders = team-template smell; heavy per-role Section headers chop the roster into mini-pages.
- **Deeper structural issue:** the PI's person-specific circular grammar was object-transferred to members, flattening the two-grammar relationship (personal statement vs text-led roster); the signature quotation was dropped.
- **Recommended direction:** **REINTERPRET (D-C APPROVED)** — PI keeps a large circular portrait + signature quote (rebuilt restrainedly); members become a role-grouped continuous roster with portrait-oriented rectangular photos + text biography (not a uniform circular card grid).
- **Priority:** P0 · **Confidence:** H

---

## 5. PUBLICATIONS

- **Legacy intent:** dense scholarly archive grouped by research theme; minimal decoration; intended red "highly-cited" emphasis (never implemented).
- **V4 strength:** year-nav + single-column rows + type rail; scales to hundreds.
- **Fusion current:** PageHeader + year-nav (only when >1 year group) + year sections + single-column PublicationItem rows with type rail + red "Featured" label (realizes the legacy's never-built emphasis).
- **Successful integration:** the Featured red label legitimately completes the legacy's intended "highly-cited" emphasis; single-column rows are archival.
- **Mechanical/forced:** year-nav is a real aid only at scale (current data ~2 groups → it's an extra UI layer); type rail repeats the same word per row (Journal/Conference ×N); one row = red Featured + type + DOI (three accent touches).
- **Deeper structural issue:** the page mixes three different motivations (V4 year-nav + legacy red emphasis + archival type rail) → feature stacking rather than one coherent archive grammar.
- **Recommended direction:** **REFINE FUSION** — keep single-column rows + Featured label; show year-nav only when it genuinely helps (more years); quiet the type rail (less repetition).
- **Priority:** P2 · **Confidence:** M

---

## 6. NEWS

- **Legacy intent:** no News page in legacy (evidence gap — home LAB NEWS was empty/accident).
- **V4 strength:** featured block + year chronology; editorial-archive feel; category accents.
- **Fusion current:** PageHeader + featured news + year rows with date/category/title; red category accents.
- **Successful integration:** chronological archive reads editorial; featured block gives a current item.
- **Mechanical/forced:** small datasets make the featured block feel like it's "holding the page up"; "Read more →" arrow is template language.
- **Deeper structural issue:** none structural — largely a content-volume issue + arrow idiom.
- **Recommended direction:** **KEEP FUSION** (light REFINE on arrow idiom once content grows).
- **Priority:** P2 · **Confidence:** M

---

## 7. JOIN

- **Legacy intent:** functional recruiting; tabs (PhD/Postdoc); red action buttons `#c41e3a`; qualifications/scholarships/apply path; grey contact + map.
- **V4 strength:** ARIA tablist + URL hash state; task-focused opportunity blocks; clean structure.
- **Fusion current:** PageHeader + tabs (ARIA + hash) + OpportunityBlock per position + apply link; task-focused.
- **Successful integration:** tabs + hash are a real upgrade (fixes legacy's broken form); task focus preserved; red action = the legacy action-red role.
- **Mechanical/forced:** none strong — watch for the two-column opportunity rows starting to read "recruitment marketing" if visual weight grows; otherwise this page is the most successful fusion.
- **Deeper structural issue:** none significant.
- **Recommended direction:** **KEEP FUSION** (it is the most natural page).
- **Priority:** — · **Confidence:** H

---

## 8. APPLY

- **Legacy intent:** formal application form (name/email/file/message), red submit; part of join.html.
- **V4 strength:** separate formal workflow, noindex, back link, multi-field form; task-focused.
- **Fusion current:** `.header` with Back link above a PageHeader grey band + formal form (8 fields + file upload + submit) + noindex.
- **Successful integration:** remains an academic application page (not a recruiting landing page); formal and quiet.
- **Mechanical/forced:** the full grey PageHeader (centered 5xl title) on an application page is heavier than needed — an application page should be quieter.
- **Deeper structural issue:** template uniformity (grey band on every page) slightly overshoots on a task page.
- **Recommended direction:** **KEEP FUSION** (optionally REFINE — quieter Apply header).
- **Priority:** P2 · **Confidence:** M

---

## 9. CONTACT

- **Legacy intent:** grey contact box + Google Maps embed (in join.html); address + email.
- **V4 strength:** dl semantics + sandboxed iframe + address block.
- **Fusion current:** PageHeader + dl (4 items) + Google Maps iframe embed; red email link.
- **Successful integration:** functional, natural, secure; the most "at ease" page.
- **Mechanical/forced:** map iframe border/radius vs flat system (minor); short page + grey band is fine.
- **Deeper structural issue:** none.
- **Recommended direction:** **KEEP FUSION**.
- **Priority:** — · **Confidence:** H

---

## 10. FOOTER

- **Legacy intent:** NTU logo + "© The Ye Group" + red back-to-top on every page; institutional presence is visual.
- **V4 strength:** editorial footer (brand + nav + contact); clean hierarchy.
- **Fusion current:** dark `#444` band + serif brand + full nav + contact block + copyright + red BackToTop. **No NTU logo.**
- **Successful integration:** dark band + red back-to-top echo the legacy; footer nav is useful.
- **Mechanical/forced:** the footer reads as a contact page, not as institutional presence; the NTU flag (logo) is gone.
- **Deeper structural issue:** identity carried as text only; legacy's visual institution presence lost.
- **Recommended direction:** **HUMAN DECISION** (logo availability/licensing) + **REFINE** (identity hierarchy: brand + one clear NTU presence).
- **Priority:** P1 · **Confidence:** M

---

## Summary of verdicts

| Page | Verdict |
|---|---|
| HEADER | REINTERPRET (keep geometry, translate band identity) |
| HOME | REFINE FUSION (cap hero, merge 1+2, seam) |
| RESEARCH | REINTERPRET (progression when content lands) |
| PEOPLE | REINTERPRET (two grammars, restore quote) |
| PUBLICATIONS | REFINE FUSION (year-nav at scale, quiet rail) |
| NEWS | KEEP FUSION |
| JOIN | KEEP FUSION |
| APPLY | KEEP FUSION (optionally quieter) |
| CONTACT | KEEP FUSION |
| FOOTER | HUMAN DECISION + REFINE |
