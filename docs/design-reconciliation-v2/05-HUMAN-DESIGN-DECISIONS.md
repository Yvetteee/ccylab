# 05 — Human Design Decisions Required Before Implementation

> Three-version deep design reconciliation audit — read-only. Nothing here is implemented.
> These are the subjective / content / brand decisions that must be made by the lab owner (human)
> before any further design refinement. Each is framed with the trade-off and a recommendation.

---

## D-A — Header identity: geometry and brand grammar

**Question:** Should the header keep V4's brand-left / nav-right geometry (recommended — scalable, and the
legacy's nav-left is cramped at 8 items + long name), and should the brand inside the red band become a
**single-line compact flag-mark** (closer to the legacy's "The Ye Group @ NTU" wordmark) instead of the current
two-line serif name + uppercase institution?

- Option A (recommended): keep geometry; re-type the brand as one compact identity statement native to the red band.
- Option B: keep the current two-line V4 brand (less legacy, more editorial).

**Why it matters:** this is the single most-seen element and the biggest "recolored vs translated" tell.

---

## D-B — Red allocation (within the single existing red token)

**Question:** Approve re-allocating the ONE red so it carries **brand meaning** (header flag, primary CTA,
BackToTop, a few signature moments) while **links, labels, metadata, secondary actions and focus rings return to
neutral** (with a high-contrast non-red focus ring where red is invisible)?

- Option A (recommended): disciplined red — fewer, stronger moments.
- Option B: keep red-everywhere (current) — risks reading as a red-themed template.

**Why it matters:** this directly answers "is NTU red a brand identity or an over-systematized UI color?"

---

## D-C — People grammar + the PI quotation

> **Evidence correction (verified against the current legacy `main` on GitHub — Yvetteee/ccylab):**
> the ACTIVE legacy member roster is `future-member-profile` — **portrait-oriented RECTANGULAR photo**
> (120×145, no radius) + **horizontal continuous biography roster** (photo left, name + Chinese name + email,
> full justified biography right), role-grouped (POSTDOCS / RESEARCH ASSOCIATE / GRADUATE STUDENTS). The circular
> `.member-photo` in CSS is a **commented-out inactive template**, not the active roster. The PI uses a **LARGE
> CIRCULAR photo** (250px) + name + email + **signature bilingual Chinese quotation with English translation**.
> → The fusion's "everyone gets a circular card" mis-applied the PI's circle to members who were rectangular-roster rows.

**Questions (two):**
1. **Grammar:** restore the two-grammar people system — PI = large circular portrait + identity/profile + signature
   personal element; members = role-grouped **continuous roster** with **portrait-oriented rectangular photo** +
   text biography (horizontal rows), NOT a uniform 4-col circular card grid?
2. **The quotation:** the legacy PI page's signature bilingual Chinese quotation (闻道有先后，术业有专攻 …
   Han Yu, *On the Teacher*) is **absent from the content layer**. Re-introduce it as the PI's personal signature
   (is the text/translation authorized for the site)? Restore only its *signature role* — rebuilt restrainedly
   inside the new design system, not a mechanical copy of the old grey-box/border style.

**Why it matters:** People is the site's biggest "team-template" smell, and the quotation is a genuine CORE IDENTITY
element that was lost.

---

## D-D — Research narrative (content-dependent)

**Question:** When real lab content is authored, should the Research page be structured as the legacy's
**progression** (Material → Membrane → Application, with an explicit opening diagram or 1→2→3 reading order),
rather than the current list-of-independent-directions IA?

**Why it matters:** the layout already supports progression (related-projects cross-links, numbered rows); the
question is whether the real research areas will *narrate* (progression) or *enumerate* (list). This is content
architecture, decided by the lab.

---

## D-E — NTU logo / institutional identity

**Questions:**
1. Is the official NTU logo asset available and licensed for use on a dark footer (brand-guideline compliant)?
2. If yes — should the footer carry it (as legacy did on every page), replacing/augmenting the current text-only
   institution block?
3. If no — is the current text identity ("Nanyang Technological University" as an identity line, not a contact
   detail) acceptable?

**Why it matters:** institutional presence is currently text-only; the legacy's visual NTU flag is gone. This is
a brand/legal decision, not a design one.

---

## D-F — Home hero size and role

**Questions:**
1. Approve a **height cap** on the hero photo band (currently ratio-driven 16/7 → ~833px photo band at 1920,
   plus a ~220px welcome block)? A cap keeps the hero from dominating the first screen on large displays.
2. Keep the red outlined CTA on the hero, or move the action lower (more legacy-restrained)?

**Why it matters:** the hero is the seam's epicenter and the tallest single element.

---

## D-G — Over-unification tolerance

**Question:** Approve **letting pages deviate** from the shared grey-PageHeader template where their job differs —
e.g., Apply quieter (no heavy centred 5xl band), Research led by its narrative, Contact more natural — while
keeping the shared shell/typography/color discipline for identity?

**Why it matters:** §8 of the audit: the final site does not need every page to have identical composition; shared
identity should come from shell/type/color/spacing/image treatment, not a forced template.

---

## D-H — Placeholder content

**Question:** Until real lab content arrives (real research areas with the progression, real photos, real
publications, the PI bio + quotation, real news), should the site keep the V4 placeholder AI/ML topics and SVG
figures, or is there an interim content pass (real names/areas) before further design refinement?

**Why it matters:** a meaningful share of the "generic/AI-template" feeling is placeholder content, not design.
Design refinement will be judged much more fairly on real content.

---

## Decision summary table

> D-A, D-B, D-C are **APPROVED** (recorded in `07-SECOND-PASS-DESIGN-DECISIONS.md`). The remaining decisions below
> are still open.

| ID | Question | Status | Recommended | Blocking for implementation? |
|---|---|---|---|---|
| D-A | Header brand grammar | **APPROVED** | Keep V4 geometry; single-line compact flag-mark on red; header shell sans/semibold | Yes (Header) |
| D-B | Red re-allocation | **APPROVED** | Disciplined red = brand moments only (Header, primary CTA, few signature emphasis, BackToTop); neutral links/labels/focus with per-background high-contrast focus; no green | Yes (site-wide) |
| D-C1 | People two-grammar | **APPROVED (with evidence correction)** | PI = large circular + identity + signature quote; members = role-grouped continuous roster + portrait-oriented rectangular photo + text biography | Yes (People redesign) |
| D-C2 | PI quotation | **APPROVED (signature role only)** | Re-introduce; rebuilt restrainedly in the new design system, not the old grey-box/border copy | Content-dependent |
| D-D | Research progression | OPEN | Progression when real Material→Membrane→Application content lands; no further visual work on placeholder AI content now | Content-dependent |
| D-E | NTU logo | OPEN | Logo if licensed; else text identity line | Asset/legal |
| D-F | Hero cap / CTA | OPEN | Cap height; decide CTA | No |
| D-G | Per-page deviation | OPEN | Approve differentiation | Yes (template change) |
| D-H | Placeholder content | OPEN | Prefer real content before judging design | Content |
