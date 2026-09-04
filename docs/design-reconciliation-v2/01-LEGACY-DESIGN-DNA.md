# 01 — Legacy Design DNA (Reconstructed from Source)

> Three-version deep design reconciliation audit — read-only.
> Legacy reference: `ccylab-main` (github.com/Yvetteee/ccylab, `main`) — extracted at
> `D:\vault\forge\ccylab-main\ccylab-main` (index / research / publications / pi / members / join + Chunchun.css / Chunchun.js).
>
> Rule applied: the legacy site is VISUAL / HISTORICAL / LAB-IDENTITY reference, not engineering truth.
> We reconstruct what defined the site as *relationships and composition logic*, and separate
> **CORE IDENTITY** from **SECONDARY IDENTITY** from **CONTENT-SPECIFIC PATTERN** from **IMPLEMENTATION ACCIDENT**.

---

## 0. Executive summary of the DNA

The legacy Ye Group site is a **one-typeface, print-register prospectus**. Its character comes from
*relationships*, not from individual properties:

1. **Red = the flag.** A single solid `#b62938` band across the top of every page with white text. The
   red does not decorate — it *is* the lab's identity strip. A second, slightly different red `#c41e3a`
   is reserved for *action/emphasis* (buttons, tab underline, intended highlights).
2. **Wide statement, narrow body.** A full-width photographic statement (hero / page band) opens the page;
   the content below is a narrow centered column (~1000px). Width change is the rhythm.
3. **The group reads like a numbered narrative.** Research is three numbered steps that build on each
   other (Material → Membrane → Application). The site explains itself in order.
4. **Two portrait grammars, not one.** The PI is a *large* circle + big name + a signature bilingual
   Chinese quotation. Members are a *small* circle + inline name/role/email in a horizontal row.
   People are presented at two different scales with two different text relationships.
5. **Institutional presence is visual.** Every footer carries the NTU logo + "The Ye Group" copyright.
6. **Body copy is justified** (home welcome, research, publications) — the "printed document" voice.
7. **Grey `#f8f9fa` page bands** frame every sub-page title (Research / Publications / PI / Members / Join).

The implementation is rough (see Accidents), but the *relationships* above are coherent and consistent
across every page.

---

## 1. HEADER

**Source evidence** (`Chunchun.css` `.header`, `index.html`):

```
<header class="header">            →  background #b62938, color #fff, padding 15px 0
  <div class="header-container">   →  max-width 1600px, flex, justify-content: space-between
    <nav aria-label="Primary">     →  LEFT
      <ul class="nav-menu">        →  6 items, gap 30px, font-size 20px, font-weight 500
    <div class="logo">…</div>      →  RIGHT  "The Ye Group @ NTU", font-size 22px, bold
```

- **nav-left / identity-right** — the composition is *navigation on the left, wordmark on the right*.
  The identity reads as a signature at the end of the strip, not as a logo badge at the start.
- **Active state** = underline (`text-underline-offset: 4px`); hover = opacity 0.8.
- **Header is wide** (1600px) while page content is ~1000–1200px — the red strip reads as a full-width flag.
- **Mobile**: `.nav-menu { display:none }` below 768px — the nav *disappears entirely*. No hamburger.
  This is an accident, not a design statement.

**Classification**

| Trait | Class |
|---|---|
| Red `#b62938` band = the lab's flag | **CORE IDENTITY** |
| nav-left / wordmark-right composition | **CORE IDENTITY** (relationship) |
| White text on red, active = underline | **SECONDARY IDENTITY** |
| Exact font sizes (20px/22px), gap 30px, padding 15px | IMPLEMENTATION detail (re-interpretable) |
| Nav hidden on mobile (no toggle) | **IMPLEMENTATION ACCIDENT** |

---

## 2. HOME

**Source evidence** (`index.html`):

```
<section class="hero-section">        full-width NTU.png + overlay
  .hero-overlay.full-overlay          rgba(255,255,255,0.7), centered flex
    h1.hero-title  → "Welcome to the Ye Lab!"  3rem bold
    h2.hero-subtitle → italic 1.5rem "Shaping Membranes: From Smart Materials to a Cleaner Future"
<div class="content-section">         max-width 1000px
  .welcome-text → "Welcome to our lab," + justified paragraph
  .lab-news → h2 "LAB NEWS"  (empty)
```

- **Photo + white overlay + centered statement** — the campus photo is *under* a 70% white veil; the text
  sits *on* the photo, centered. This is the single most memorable legacy image.
- **One typeface, two weights**: bold title + italic subtitle (both Arial). No serif/sans pairing.
- **Wide hero → narrow body**: hero is full-bleed, body is a narrow 1000px column.
- **The page is SHORT** (~2–3 screens): hero + welcome + (empty) news + footer. Restraint is part of the voice.
- **No CTA button on Home.** No "Explore →". The legacy home does not sell; it welcomes.

**Classification**

| Trait | Class |
|---|---|
| Full-bleed campus photo + white overlay + centered title/subtitle | **CORE IDENTITY** |
| "Welcome to our lab" narrow justified paragraph | **CORE IDENTITY** (welcome voice) |
| Wide→narrow width rhythm | **SECONDARY IDENTITY** |
| Bold-title + italic-subtitle single-typeface voice | **SECONDARY IDENTITY** |
| Empty LAB NEWS block | **IMPLEMENTATION ACCIDENT** |

---

## 3. RESEARCH

**Source evidence** (`research.html` + `Chunchun.css`):

```
<section class="research-hero">   #f8f9fa grey band, centered
  h1 "Research" 3rem + intro paragraph + research-main image (researchmain.jpeg, max 900px)
<div class="content-section">
  .research-rows  (3 rows)
    .research-row  grid 2fr 1fr  → text LEFT, image RIGHT (thumb max 320px, justify-self:end)
      .research-item h2 → "1. Designing Porous Materials"
                         → "2. Building Better Membranes"
                         → "3. Solving Real-World Problems"
```

- **Numbered narrative progression**: 1 → 2 → 3 is a *story*: design the material → build the membrane →
  solve the problem = **MATERIAL → MEMBRANE → APPLICATION**. Each row literally builds on the previous.
- **Text-left / figure-right** in every row; the figure hugs the right edge (320px thumb).
- **Rich bullet body**: each row's paragraph uses `•  Design and synthesise building blocks …` bold lead-ins.
- CSS contains an abandoned **dark 3-step diagram with arrows** (`.research-diagram`) replaced by a hero
  image ("Replace diagram with image" comment) — the *progression* idea was deliberate and then dropped.
- Research body is justified.

**Classification**

| Trait | Class |
|---|---|
| 1→2→3 Material→Membrane→Application progression | **CORE IDENTITY** (the scientific narrative) |
| Numbered text-left / figure-right rows | **CORE IDENTITY** (relationship) |
| Grey hero band + big centered title | **SECONDARY IDENTITY** |
| Bold-lead `•` bullets inside rows | **CONTENT-SPECIFIC PATTERN** |
| Dark 3-step diagram + arrows (unused) | abandoned idea → **REINTERPRETABLE** |
| Justified paragraph | **SECONDARY IDENTITY** (print voice) |

---

## 4. PEOPLE

**Source evidence** (`pi.html`, `members.html`, `Chunchun.css`):

```
PI PAGE:
  .pi-hero   grey band, h1 "PI"
  .pi-content  grid 300px 1fr
    .pi-photo   250px × 250px, border-radius:50%   ← LARGE CIRCLE
    .pi-info    h2 "Chunchun Ye" 2rem
                .chinese-quote  grey #f0f0f0 box, border-left 4px #333, italic, bilingual:
                  "闻道有先后，术业有专攻，如是而已 … ——韩愈《师说》唐 (Han Yu, On the Teacher)"
  + .career-section / .education-section / .awards-section (plain lists)

MEMBERS PAGE (current `main` on GitHub — Yvetteee/ccylab):
  .members-hero  grey band, h1 "Members" + members-quote
  .future-members  role-grouped CONTINUOUS ROSTER:
    h2 role headers → "POSTDOCS" / "RESEARCH ASSOCIATE" / "GRADUATE STUDENTS" (centered)
    .future-member-profile  grid 120px 1fr   ← portrait LEFT, biography RIGHT
      .future-member-photo  120px × 145px, NO border-radius  ← PORTRAIT-ORIENTED RECTANGULAR photo
      .future-member-heading  h3 name (+ Chinese name span) + email, inline
      .future-member-info > p  full biography, justified, max-width 680px
  (the old circular .member-photo template is COMMENTED OUT in current main — inactive leftover)
```

- **TWO portrait grammars — the PI is circular, the members are RECTANGULAR**:
  - **PI** = **LARGE CIRCULAR photo** (250px) + 2rem name (incl. Chinese) + email + the **signature bilingual
    Chinese quotation with English translation** (grey box, left border). Personal, intellectual, human.
  - **Members** = **PORTRAIT-ORIENTED RECTANGULAR photo** (120px × 145px, object-fit cover, top-positioned) +
    **horizontal continuous biography roster**: photo left, heading (name + Chinese name + email) and full
    justified biography to the right; grouped by role with centered section headers.
- The circular `.member-photo` (180px) still exists in CSS but is **commented out** in current main HTML — it is
  an inactive template, NOT the active member roster.

**Classification**

| Trait | Class |
|---|---|
| PI = LARGE CIRCLE + name + signature bilingual quotation | **CORE IDENTITY** (the PI's personal statement) |
| Members = portrait-oriented RECTANGULAR photo + horizontal continuous biography roster (role-grouped) | **CORE IDENTITY** (roster grammar) |
| Grey page band per people page | **SECONDARY IDENTITY** |
| Bilingual Chinese quotation block (with English translation) | **CORE IDENTITY** (cultural signature) |
| Old circular `.member-photo` template (commented out in current main) | **IMPLEMENTATION ACCIDENT / leftover** |

---

## 5. PUBLICATIONS

**Source evidence** (`publications.html` + `Chunchun.css`):

```
.publications-hero  grey band + h1 + pub-intro ("We produce high-quality research…")
.pub-theme  (×6)  grouped by research THEME:
   Multidisciplinary Research
   Theme 1A: Flow Battery Energy Storage
   Theme 1B: Other Energy Conversion & Storage
   Theme 2A: Membrane Processes for Liquid Separation
   Theme 2B: Nanomaterials Engineering for Membrane Processes
   Theme 3A: Membrane Material Design & Synthesis
   each .pub-list: dense numbered scholarly entries (bold authors, italic journal, DOI links, year)
```

- **Dense scholarly archive grouped by research theme** — this is a bibliography, not a card wall.
- Minimal decoration; justified text; numbered `<li>`.
- `.highly-cited` (float-right red `#c41e3a`) exists in CSS but the div is **empty** — the legacy *intended*
  a red "highly-cited" emphasis label and never implemented it.

**Classification**

| Trait | Class |
|---|---|
| Dense, numbered, theme-grouped scholarly list | **CORE IDENTITY** |
| Emphasis by red `#c41e3a` (intended "highly-cited") | **CORE IDENTITY (intent) — never implemented** |
| Justified text | **SECONDARY IDENTITY** |
| Empty `.highly-cited` div | **IMPLEMENTATION ACCIDENT** (a realized idea the fusion can legitimately complete) |

---

## 6. JOIN

**Source evidence** (`join.html` + `Chunchun.css`):

```
.join-hero  grey band, h1 "Join us!" + intro + NTU-building hero image (max 920px)
.positions-tabs  tabs (PhD / Postdoc)  role=tablist, red active underline #c41e3a
  .tab-panel  grey #f8f9fa panel → qualifications / application period / scholarships / submit-as-PDF / email
  .apply-btn  red #c41e3a
.application-form  white card + shadow + red submit  (name/email/file/message)
.contact-grid  2-col: .contact-info (grey box) + .map-embed iframe (Google Maps)
```

- **Functional recruiting tone**: tabs, qualifications, scholarships, a clear "apply" path — task-focused.
- **Red = action**: tab underline, apply buttons, submit — `#c41e3a` (the action red, distinct from the header).
- The white-card + shadow + radius (position-item / application-form) is a generic "modern web" pattern —
  **not lab identity**.

**Classification**

| Trait | Class |
|---|---|
| Tabs + red active underline + clear apply path | **SECONDARY IDENTITY** (functional) |
| Red action buttons `#c41e3a` | **CORE IDENTITY** (action = red) |
| Grey contact box + map embed | **SECONDARY IDENTITY** |
| Cards + shadows + radius on forms/cards | **IMPLEMENTATION ACCIDENT** (generic web pattern) |
| Orphan `</form>`; form posts to placeholder URL | **IMPLEMENTATION ACCIDENT** |

---

## 7. FOOTER

**Source evidence** (`Chunchun.css` — note `.footer` is defined twice; the second `#444` rule wins; every HTML page):

```
.footer            #444 dark band, white text
.footer-container  flex, max-width 1200px
  .ntu-logo  → NTU_Logo.webp  (the institutional flag)
  .copyright → "© 2025 The Ye Group" (centered)
  .back-to-top → red square/button (#c8102e / #b62938) "^"
```

- **NTU logo + group copyright + back-to-top** on *every* page. Institutional identity is *visual*.
- The red back-to-top echoes the red header — the page starts and ends with red.

**Classification**

| Trait | Class |
|---|---|
| NTU logo presence on every page | **CORE IDENTITY** (institutional flag) |
| "© The Ye Group" copyright | **CORE IDENTITY** |
| Red back-to-top echoing the header | **SECONDARY IDENTITY** |
| `#666` vs `#444` double rule | **IMPLEMENTATION ACCIDENT** (later rule wins) |

---

## 8. Cross-cutting legacy traits → classification

| Trait | Class |
|---|---|
| Red `#b62938` = identity flag (header) | **CORE IDENTITY** |
| Red `#c41e3a` = action/emphasis (buttons, underline, intended highlights) | **CORE IDENTITY** — *two reds, two jobs* |
| One typeface (Arial) bold-title + italic-subtitle print voice | **SECONDARY IDENTITY** (re-interpretable) |
| Grey `#f8f9fa` page-hero bands | **SECONDARY IDENTITY** |
| Justified body copy | **SECONDARY IDENTITY** (print voice) |
| Full-bleed photo + white overlay hero | **CORE IDENTITY** |
| Numbered narrative rows (Material→Membrane→Application) | **CORE IDENTITY** |
| Two portrait grammars (PI circular vs members rectangular roster) | **CORE IDENTITY** |
| NTU logo + copyright + back-to-top footer | **CORE IDENTITY** |
| Tabs + red action buttons on Join | **SECONDARY IDENTITY** |
| Mobile nav disappears | **IMPLEMENTATION ACCIDENT** |
| Empty LAB NEWS / empty highly-cited / orphan form / commented-out circular member template | **IMPLEMENTATION ACCIDENTS** |
| Card+shadow+radius "modern web" styling on Join | **IMPLEMENTATION ACCIDENT** (generic) |

---

## 9. What the fusion must NOT lose (the CORE IDENTITY set)

1. The red band as the lab's *flag* — identity, not decoration.
2. The wide-statement → narrow-body width rhythm (hero vs content).
3. The photo + white-overlay + centered-statement hero.
4. The **1→2→3 narrative** (Material → Membrane → Application), not just numbered rows.
5. **Two portrait grammars** — PI (large circular portrait + personal statement) vs members (portrait-oriented
   rectangular photo + continuous biography roster).
6. The PI's **bilingual Chinese quotation**.
7. Dense **theme-grouped scholarly publications** (the "highly-cited" red emphasis was intended but never built).
8. **Red as action** on Join (buttons, tab underline) — task-focused recruiting.
9. **NTU logo + copyright + back-to-top** institutional footer.
10. Grey page-hero bands as a *rhythm*, not necessarily as an identical template.
