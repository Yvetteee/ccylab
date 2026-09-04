# 07 — Second-Pass Design Decisions (Approved Set)

> Three-version deep design reconciliation audit — second pass.
> This document records the **human-approved decisions** and the **implementation scope** for the
> `review/legacy-reconciliation-v2` branch.
> Application code is modified ONLY within the scoped items below, each as an independent commit with
> before/after QA. Everything outside the scope remains untouched.

---

## 0. Status

| Decision | Status |
|---|---|
| D-A — Header identity | **APPROVED** |
| D-B — Red allocation / focus treatment | **APPROVED** |
| D-C — People grammar + PI quotation | **APPROVED (with legacy-evidence correction)** |
| D-E — Footer NTU mark | **APPROVED CONDITIONALLY** (only if a compliant official NTU logo asset is validated) |
| D-F — Home Hero | **APPROVED WITH REVISION** (identity moment, no CTA, mid height, screenshot acceptance) |
| D-G — PageHeader per-page deviation | **APPROVED** (design-system rule; no full-site refactor) |
| D-H — Placeholder-content freeze | **APPROVED** |
| Research note (D-D) | **DIRECTIVE: reconcile structure only when real Material → Membrane → Application content lands** |

---

## 1. Corrected legacy evidence for D-C (verified against current `main`)

> Correction: an earlier audit snapshot (stale local extraction) showed a circular `.member-photo`.
> The **current `main`** of `github.com/Yvetteee/ccylab` does NOT use it — it is **commented out** in the HTML
> (an inactive leftover template). The ACTIVE roster grammar is `future-member-profile`.

**PI** (`pi.html`, main):
- **LARGE CIRCULAR photo** (250px, `border-radius:50%`)
- name incl. Chinese (`Chunchun Ye 叶 纯 纯`), email
- **signature bilingual Chinese quotation with English translation**:
  「闻道有先后，术业有专攻，如是而已」 — *Knowledge unfolds over time; expertise is shaped by focus.
  Such is the way of scholarship.* ——韩愈《师说》唐 (Han Yu, *On the Teacher*, Tang Dynasty)

**Members** (`members.html`, main):
- **PORTRAIT-ORIENTED RECTANGULAR photo** (`.future-member-photo` 120px × 145px, no radius, object-fit cover,
  object-position center top)
- **horizontal continuous biography roster** (`.future-member-profile` grid 120px 1fr): photo LEFT, heading
  (name + Chinese name `lang="zh-Hans"` + email) and full justified biography to the RIGHT
- **role-grouped** with centered role headers: `POSTDOCS` / `RESEARCH ASSOCIATE` / `GRADUATE STUDENTS`
- real members present (e.g., Kaiping Zhu, Kim Jiayi Wu, Christine Sunho On) with real NTU emails and bios

**Consequence:** the fusion's "everyone gets a circular card" **mis-applied the PI's person-specific circle to
members whose legacy grammar is a rectangular photo + biography roster**. This is a *shape + relationship* error,
not merely a scale one.

---

## 2. D-A — APPROVED: Header identity

**Decision:**
- **Keep** the V4 **header geometry + responsive behavior** — brand-left / nav-right, sticky, Menu toggle
  (<1080px). Do **NOT** restore the legacy nav-left/brand-right geometry.
- **Re-interpret the brand inside the red band as a single-line compact flag-mark**, e.g. `The Ye Group @ NTU`
  (legacy wordmark character), replacing the current V4 two-line serif name + uppercase institution.
- **Header shell typography: sans / semibold.** Serif remains reserved for **academic page titles** (not the header).
- Rationale: the red band is the lab's flag; its content must read as native to the flag, not as V4 furniture
  dropped onto red.

**Guardrails:**
- No change to sticky behavior, toggle breakpoint, contrast (white on `#b62938`, AA), focus treatment on the band.

---

## 3. D-B — APPROVED: NTU red converges to brand moments

**Decision:**
- NTU red (`#b62938` token) moves from **global semantic accent** to **brand moments**.
- Red is used for:
  - the **Header** (the flag),
  - the **primary CTA**,
  - a **few signature emphasis moments** (e.g., the Featured publication label; the PI's signature accent),
  - **BackToTop**.
- **Ordinary links / labels / metadata / secondary actions / focus rings must NOT default to red.**
- **Focus** must use an **independent high-contrast treatment per background** (e.g., a neutral dark ring on
  white; a light ring on the red band) so focus is never invisible and never red-on-red.
- **Do NOT restore green as a brand color.**

**Guardrails:**
- Stays within the single-red-token decision (re-allocation, not a new color).
- Scientific-figure green (in figures, not UI) remains untouched.

---

## 4. D-C — APPROVED (with correction): two-grammar People

**Decision:**
- **PI** = **large circular portrait** + identity/profile (name incl. Chinese, role, email, bio, education) +
  the **signature bilingual quotation** as the PI's personal signature.
- **Members** = **role-grouped continuous roster** with **portrait-oriented rectangular photo** + text biography
  (horizontal rows), NOT a uniform 4-column circular card grid.
- **Preserve V4 data architecture and role grouping** (postdoc/phd/assistant/visiting/alumni) and the PI-spotlight
  structure.
- **The Chinese quotation is approved for restoration — in its signature role only.** It must be **rebuilt
  restrainedly inside the new design system**; do NOT mechanically copy the legacy grey-box / border-left style.

**Guardrails:**
- No uniform circular cards for members; no initials-in-circle placeholder pattern as the default member grammar.
- Data model / routing / a11y unchanged.

---

## 5. Research directive (D-D note)

**Directive:**
- **Do NOT perform further visual optimization around the placeholder AI content** on Research.
- The next round should **synchronize structural reconciliation with the real Ye Group
  Material → Membrane → Application content landing** (progression narrative, not a numbered list).
- Until real content lands, Research remains as-is.

---

## 5b. D-E — APPROVED CONDITIONALLY: Footer NTU institutional mark

**Decision:**
- Restore the **NTU institutional mark's role in the Footer** — **only if** the asset used is a **current,
  compliant official NTU logo** (source / version / usage must be confirmed).
- If the source / version / usage is unclear → **keep the text-only identity line** (current state). Do **NOT**
  self-migrate legacy assets (e.g., the old `NTU_Logo.webp`).
- The logo is a **footer-only institutional signature** — do **NOT** reinforce/repeat it in the Header or Hero.

**Implementation rule:** this item ships **only after asset validation passes**; otherwise it is skipped and
documented (no fabricated placeholder logo).

**Asset-validation result (D-E, this branch):**
- Repo `public/` contains **no official NTU logo asset** (only group SVGs, hero photo, research SVGs).
- The legacy `NTU_Logo.webp` is explicitly excluded by this decision (no self-migration without confirmed
  source/version/usage).
- **Validation FAILED → D-E is SKIPPED.** The footer keeps its **text-only institutional signature**
  (Nanyang Technological University + school + address + email + copyright), verified rendering with
  **no logo image and no broken image**.
- Revisit when a validated official NTU logo asset is available (e.g., supplied by the owner or the
  institution's brand portal with confirmed usage terms).

---

## 5c. D-F — APPROVED WITH REVISION: Home Hero

**Decision:**
- **Keep** the real NTU campus hero, white overlay, large title, italic subtitle (the identity moment).
- **Remove the primary CTA from the Hero** — the hero is an **identity moment, not a conversion module**.
- **Desktop height ≈ 500–600px visual range (mid, not full-screen); mobile ≈ 320–420px.**
  These are acceptance targets, **NOT hard-coded design truth** — final acceptance is by cropped screenshots at
  **375 / 1440 / 1600 / 1920**.
- Keep the Hero→body transition as an explicit designed step.

---

## 5d. D-G — APPROVED: PageHeader is optional per page

**Decision:**
- Pages are **allowed to deviate** from the shared grey PageHeader template.
- **Shared shell ≠ shared composition.** PageHeader may remain as an optional component, but it must **not be
  forced** on Research/People/Publications/News/Join/Apply/Contact uniformly — the opening of each page follows
  its own semantics.
- **Implementation rule:** only remove/adjust PageHeader where the scoped pages actually need it; do **not**
  refactor all pages in this pass.

---

## 5e. D-H — APPROVED: placeholder-content freeze

**Decision:**
- **Freeze all deep visual optimization that depends on placeholder content.**
- Research's next structural change must be **synchronized with the real Material → Membrane → Application
  content landing**; do not keep tuning spacing/layout around the current AI placeholder.
- Other pages likewise: no pixel-polish of obvious placeholder strings.

---

## 6. Second-pass implementation scope (`review/legacy-reconciliation-v2`)

**This round implements ONLY:**

1. **D-A — Header identity** (single-line compact flag-mark brand on the red band; header shell sans/semibold).
2. **D-B — Red semantics / focus treatment** (red → brand moments; neutral links/labels/metadata; per-background
   high-contrast focus; no green).
3. **D-F — Home Hero + Hero→body transition** (keep identity; remove primary CTA; mid height; screenshot acceptance).
4. **D-C — People dual grammar** (PI = large circle + signature quote; members = role-grouped continuous roster
   with portrait-oriented rectangular photos + text biography; no uniform circular card grid).
5. **D-E — Footer NTU mark** — **only if** the official NTU logo asset validation passes; else keep text line.

**Explicitly NOT in this round:** page-level refactors of Research / Publications / News / Join / Apply / Contact.

**Execution rules:**
- Order: **Header → color semantics → Home → People → conditional Footer.**
- Each P0 item = **independent commit + before/after QA**. No "finish the whole site then report".
- Keep routes / data architecture / a11y / SEO / security intact.
- Everything remains reversible.

---

## 6b. Implementation log (branch `review/legacy-reconciliation-v2`)

| Commit | Item | Change | QA (verified) |
|---|---|---|---|
| `c66f3a8` | **D-A Header** | Single-line compact flag-mark wordmark `The Ye Group @ NTU` in the red band (sans/semibold); two-line serif brand + institution sub removed | Brand text/Inter/600/white single-line @1440+375; sticky 72px; 8 nav; Menu toggle @375; 0 overflow |
| `af7351f` | **D-B Red semantics** | `--color-focus` red→neutral `#161616`; links/labels/metadata/numbering → neutral; red reserved for header flag, primary CTAs, BackToTop, Featured label, Join active tab, hero eyebrow, ::selection, radio accent | Header red; kicker muted; Featured red; year-nav/venue links neutral; root focus `#161616` |
| `d04a8b3` | **D-F Home Hero** | Hero CTA removed (identity moment); band height clamped — mobile 320px / desktop 600px (ratio + min/max-height, cover crop) | 320@375, 600@1440/1600/1920; CTA removed; welcome step kept; 0 overflow |
| `7ee7220` | **D-C People dual grammar** | PI keeps large circular portrait + signature bilingual quote (restrained pull-quote, no grey box); members = role-grouped continuous roster, portrait-oriented rectangular photo + text biography (`MemberRow`), circular-card grid removed | PI radius 50%; quote zh/en/source rendered; 6 members all rectangular (0 circles); single-column roster; 0 overflow @1440+375 |
| *(doc commit)* | **D-E Footer NTU** | **Skipped** — asset validation failed (no compliant official logo in repo); text-only footer kept | Footer text identity intact; 0 logo images, 0 broken images |

**Branch status:** `review/legacy-reconciliation-v2`, clean working tree, all commits local (not yet pushed).

---

## 7. Reference: audit documents

The full reconciliation evidence lives in `01`–`06`; decisions above reference them.
`05-HUMAN-DESIGN-DECISIONS.md` retains the question framing; this document is the authoritative approved set.
