# 06 — Recommended Direction (Final Matrix + Top Lists)

> Three-version deep design reconciliation audit — read-only. Nothing here is implemented.
> This is the closing document: the final verdict matrix and the five Top-5 lists requested by the task.

---

## 1. Final verdict matrix

| PAGE | CURRENT VERDICT | MAIN SOURCE OF FORCED FEELING | KEEP FROM LEGACY | KEEP FROM V4 | RECOMMENDED ACTION | PRIORITY |
|---|---|---|---|---|---|---|
| HOME | REFINE FUSION | Hero photo-overlay language ≠ V4 flat-editorial body; seam at full-bleed→1344px; two 1+2 blocks; ~7.5k px long | Photo+overlay hero, welcome voice, wide→narrow rhythm | Research/Featured/News/Join previews, container widths, hierarchy | Cap hero height; unify hero type with body; merge/weaken one 1+2 block; make hero→body a designed step | P0 |
| RESEARCH | REINTERPRET | `01/02/03/04` numbering without a progression; only-justify on site; placeholder AI content | 1→2→3 Material→Membrane→Application narrative; text-left/figure-right | Alternating rows, question/themes/related cross-links, layout quality | Structure as progression when content lands; decide justify vs left site-wide | P1 |
| PEOPLE | REINTERPRET (D-C APPROVED) | Uniform circular-card grid applies the PI's circle to ALL members (legacy members = portrait-oriented rectangular photo + continuous biography roster); initials placeholders; heavy role sections | Two grammars: PI (large circle + quote) vs members (rectangular-portrait roster + text biography); the quotation | Role-grouping IA, PI spotlight, alumni rows, data model | PI keeps large circular portrait + signature quote; members become a role-grouped continuous roster with portrait-oriented rectangular photos + text biography | P0 |
| PUBLICATIONS | REFINE FUSION | Year-nav as extra UI at small scale; type-rail word repetition; red Featured + type + DOI per row | Dense scholarly archive; the intended "highly-cited" red emphasis | Year-nav (at scale), single-column rows, type rail, scalability | Keep rows + Featured label; show year-nav only when it helps; quiet the rail | P2 |
| NEWS | KEEP FUSION | (minor) featured block "holding page up" on tiny datasets; "Read more →" idiom | — (legacy had no News page) | Featured + chronology archive | Leave as is; refine arrow idiom when content grows | P2 |
| JOIN | KEEP FUSION | — (most natural page) | Tabs + red action buttons | ARIA tabs + hash, task-focused blocks | No change; watch recruitment-marketing drift | — |
| APPLY | KEEP FUSION | Heavy grey 5xl PageHeader on a task page | Formal application intent | noindex, back link, formal workflow | Optionally quieter header | P2 |
| CONTACT | KEEP FUSION | — (most at-ease page) | Grey contact + map | dl semantics, sandboxed iframe | No change | — |
| HEADER | REINTERPRET | Red band frames V4 furniture → "recolored, not translated" | Red flag band; nav-left/identity-right spirit | Brand-left/nav-right geometry, Menu toggle, sticky | Keep geometry; re-type brand as compact flag-mark native to the red | P1 |
| FOOTER | HUMAN DECISION + REFINE | Identity is text-only; legacy NTU flag gone | NTU logo + copyright + back-to-top | Editorial footer nav/contact | Human: logo availability; refine identity hierarchy | P1 |

---

## 2. TOP 5 THINGS THE CURRENT FUSION GOT RIGHT

1. **The red header band is the lab's flag** — the single most recognizable identity element is present, white
   text on `#b62938` verified AA-compliant, with working focus states and a real mobile Menu (fixing the legacy's
   hidden-nav accident).
2. **The legacy Home hero composition survived** — full-bleed campus photo + white overlay + centered title +
   italic subtitle is genuinely the legacy's opening image.
3. **Join/Apply stayed task-focused** — ARIA tabs + URL hash (Join) and a formal, noindexed, back-linked
   workflow (Apply) are a strict improvement over the legacy's broken form, with no recruitment-landing drift.
4. **The Featured red publication label legitimately completes the legacy's never-built intent** — the legacy
   CSS had an empty red "highly-cited" div; the fusion realized it semantically.
5. **Engineering integrity was preserved end-to-end** — routes, data layer, accessibility, SEO/noindex, security
   headers, lint/tsc/build all pass; verified no mobile overflow; the fusion is deployable and maintainable.

---

## 3. TOP 5 THINGS THAT FEEL MOST MECHANICAL

1. **Header = V4 composition + red background** — the red band carries V4 furniture (two-line serif brand,
   right nav), so it reads "recolored" rather than "translated".
2. **People = uniform circular cards** — one circle template for everyone (the PI's person-specific circle
   mis-applied to members whose legacy grammar is a portrait-oriented rectangular photo + continuous biography
   roster), initials-in-circle placeholders, heavy role sections: the strongest "team template / SaaS" smell,
   and it erased the legacy's two-grammar system — including dropping the PI's signature quotation.
3. **Home = hero + two "1-main + 2-secondary" blocks + a full-bleed team photo band** — a stack of alternating
   big-image blocks (~7.5k px tall) that reads as "sections added over time", with a visible hero→body seam.
4. **Red as a universal UI color** — one red token applied to links, labels, buttons, tags, focus and BackToTop
   dilutes the flag and creates red-on-red blind spots.
5. **Numbered research rows with no progression** — `01 02 03 04` padding simulates the legacy numbering while
   the Material→Membrane→Application arc is absent (placeholder AI/ML topics).

---

## 4. TOP 5 HIGH-RETURN DESIGN CHANGES (for a future refinement round — NOT implemented)

1. **Re-type the header brand as a compact flag-mark on the red band** (keep the V4 geometry + toggle).
   Highest visibility for the lowest risk.
2. **Restore the two-grammar People system (D-C APPROVED)** — PI keeps a large circular portrait + a signature
   personal element (the quotation, signature role only); members become a role-grouped continuous roster with
   **portrait-oriented rectangular photos + text biography** (horizontal rows), not circular cards. Removes the
   biggest "template" smell.
3. **Discipline the single red** — return most links/labels/metadata/secondary actions/focus to neutral; keep
   red for the flag, the primary CTA, BackToTop, and a few signature moments. One token, fewer jobs.
4. **Cap the Home hero height and make the hero→body transition a designed step**; merge/weaken one of the two
   1+2 blocks so Home stops being a stack of big-image bands.
5. **Structure Research as a progression** (opening "Material → Membrane → Application" statement / 1→2→3 reading
   order) when real lab content lands, and unify justified-text policy site-wide.

---

## 5. TOP 5 THINGS THAT SHOULD NOT BE CHANGED

1. **The red header + white text + working mobile Menu** — identity, contrast, accessibility. Freeze.
2. **Join/Apply task-focused workflows** (tabs + hash; formal noindexed Apply) — do not add decoration or
   "landing page" energy.
3. **Publications single-column scholarly rows + the Featured red label** — the archive grammar works; keep it.
4. **Contact dl + sandboxed map + News chronological archive** — the most natural pages; leave them.
5. **V4 engineering integrity** — routes, data layer, a11y, SEO/noindex, security, maintainability, and the
   verified no-overflow responsive behavior. Never trade these for visual fidelity.

---

## 6. If ONLY one more design-refinement round were allowed

**Concentrate on three moves** (each reversible, each targeting the strongest "forced" signal, none touching
engineering integrity):

1. **People grammar (P0, D-C APPROVED)** — restore PI-vs-member distinction (PI = large circular + signature
   quote; members = rectangular-portrait continuous roster); remove the uniform circular-card grid and the
   initials-placeholder smell. This is the single most "AI team template" element.
2. **Home reduction + seam** (P0) — cap the hero, merge one of the two 1+2 blocks, make the hero→body turn an
   explicit design step (target < ~5k px desktop).
3. **Header + red discipline** (P1) — re-type the header brand as a compact flag-mark on the red band, and
   re-allocate the single red so it is a brand color, not a UI theme.

Plus one content-dependent readiness item: **decide D-D/D-H** (research progression + real content) before
judging Research.

---

## 7. Closing statement

The fusion has the *right ingredients*: the red flag, the campus hero, the grey band rhythm, circular identity,
the dark footer, task-focused Join/Apply, and a rock-solid framework. What it lacks is **relationship transfer**:
the legacy's *compositional logic* (nav-left/identity-right, bold-print hero voice, two-grammar people, the
Material→Membrane→Application progression, the NTU flag) was not carried over — only its *objects* were, painted
onto V4's structure.

The direction is therefore not "add more legacy" and not "strip back to V4". It is a **third pass that translates
legacy relationships through V4 maturity**: one flag header that owns its content, a hero that belongs to the same
page as the body, people presented at two scales that mean something, research that *narrates*, a red that is a
brand not a theme, and an institution that is visibly present.

When the real lab content (research story, PI bio + quotation, photos, publications, NTU mark) lands, the same
system should look like it "naturally evolved" — not like "V4 wearing legacy colors".

**Stop here. No implementation. D-A / D-B / D-C approved (see docs/05 + 07). Await remaining human decisions.**
