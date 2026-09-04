# CONTENT-DENSE LEGACY INTEGRATION — Pre-Implementation Report

Branch: `review/legacy-content-integration`
Starting SHA: `60ab75881222ed546773ee0d945f2e5ebd2abf61`
Content source of truth: live legacy `https://www.ccylab.com/{index,research,publications}.html` (fetched + verified byte-identical to the GitHub legacy main on index/publications).

---

## A. LEGACY CONTENT MAP

### HOME
| Legacy text | Legacy image | Proposed new placement |
|---|---|---|
| Hero: "The Ye Group" + "Shaping Membranes: From Smart Materials to a Cleaner Future" (h1/subtitle) | `NTU.png` (campus panorama, 4400×1044) | Already rendered by V4 Hero using approved `/images/hero-campus.jpg` (campus). Content kept; **hero height refined** (Phase 3). `NTU.png` NOT migrated (current approved campus image suffices; 6.5MB). |
| Welcome paragraph ("We are based in the School of Civil and Environmental Engineering…") | — | Already in `siteConfig.description` (prior pass). Kept as-is. |
| Lab News rows (Apr/Feb/Jan 2026 joins, We Are Hiring, A New Chapter) | `labnewsMay1.jpg` (Kaiping), `labnewsMay2.jpg` (Kim), `labnewsMay3.jpg` (Christine), `labnews1.png` (Hiring), `labnews2.png` (New Chapter) | Home `LatestNews` becomes **Lab News with image+text** (date/title/summary + small image), image above text on mobile (§12). News data gets `image` fields (Level 1/2, no schema change — `NewsItem.image` exists). |

### RESEARCH
| Legacy section | Legacy text | Legacy image | Proposed component |
|---|---|---|---|
| Page intro | "We design porous materials and develop membrane technologies to tackle pressing challenges in energy and the environment." | `researchmain.jpeg` (1920×654 overview banner) | Research page: PageHeader description + intro + overview image (§6). |
| 1. Designing Porous Materials | Function-guided design; building blocks with concavities → interconnected free volume; functional groups (–SO₃⁻ / –COO⁻) for ion transport. | `research3.jpeg` (2000×2000) | `ResearchArea` 1 → Research page row 1 + Home ResearchOverview main card. |
| 2. Building Better Membranes | Pore-channel shape/rigidity/length/chemistry; functional groups/gradients; forms (self-standing films, supported thin layers, hollow fibres, flat sheets); fabrication (solution casting, spin coating, roll-to-roll, phase inversion, interfacial polymerisation, electrospinning, dip-coating, 3D printing). | `research2.jpeg` (2000×2000) | `ResearchArea` 2 → Research page row 2 + Home secondary card. |
| 3. Solving Real-World Problems | Applications: energy storage & conversion; carbon capture; oil refining & petrochemicals; pharmaceutical purification; resource enrichment (uranium); resource recovery (lithium). | `research1.jpeg` (2000×2000) | `ResearchArea` 3 → Research page row 3 + Home secondary card. |

`content/research-areas.ts` will be **replaced** with these 3 real areas (each carrying `image`), plus exported `researchIntro` (shared by Research page intro and Home ResearchOverview lede). Fictional AI research-areas are removed.

### PUBLICATIONS
| Legacy theme | Legacy pubs (numbered) | Mapping confidence |
|---|---|---|
| Theme 1A: Flow Battery Energy Storage | 1–8 (Nature 2023; NatComm 2022; Angew 2022; ACS Nano 2024; AdvSci 2023; AdvMater 2023; Joule 2025; NatMater 2020) | HIGH — direct from legacy page structure |
| Theme 1B: Other Energy Conversion & Storage Technologies | 9–11 (Carbon Energy 2024; Angew 2024; JACS 2022) | HIGH |
| Theme 2A: Membrane Processes for Liquid Separation | 12–18 (AdvMater 2025; CEJ 2019; CEJ 2019; AFM 2024; ProgChem 2018; JMS 2017; JMS 2016) | HIGH |
| Theme 2B: Nanomaterials Engineering for Membrane Processes | 19–21 (JMS 2019; Mater&Design 2017; ACS AMI 2016) | HIGH |
| Theme 3A: Membrane Material Design & Synthesis | 22–24 (PolymChem 2024; ChemSci 2024; Arkivoc 2021) | HIGH |

All 24 current publications map to a legacy theme (see `PUBLICATION-MAPPING.md` for per-item evidence). No `UNCLASSIFIED / HUMAN REVIEW` items.

---

## B. SPACING AUDIT (baseline measured at 1440; responsive check at 375)

Measured section rhythm (before changes):
- **Home** DOC_H=8216. Research section h=2624 (fictional 3-area grid with 409px+545px images), Featured h=2424, Group h=795. Hero band 500px @1440.
- **Research** DOC_H=5453. Each fictional area ~1100px tall (545px image + text). PageHeader h=278, intro h=349.
- **Publications** DOC_H=6148. Year sections; per-item ~100-147px.
- **People** DOC_H=3622. PI section h=1168, member sections h=557-583.
- **News** DOC_H=2198.

| PAGE | CURRENT ISSUE | PROPOSED CHANGE | LOCAL/GLOBAL | RISK |
|---|---|---|---|---|
| Home | Hero 500-600px desktop consumes first viewport | reduce to ~420-520px (tested), keep identity (§3) | local (Hero.module.css) | LOW |
| Home | ResearchOverview 2624px tall, 2 huge image blocks | real 3-area overview with compact images (~2000px² at smaller display) + denser section spacing | local (ResearchOverview.module.css) | LOW |
| Home | Featured 2424px with big fictional SVG figures | text-first featured (real pubs), no fictional SVG | local (FeaturedResearch) | LOW |
| Home | Group 795px band + 318px placeholder image | keep placeholder (§13), trim lede + slightly reduce band padding | local (GroupSpotlight.module.css) | LOW |
| Home | News list items `--space-6` vertical | image+text rows, `--space-4` item padding | local (LatestNews.module.css) | LOW |
| Research | intro `--space-12/16`, area `--space-16` padding | reduce area padding to `--space-12`, intro to `--space-8/12` | local (research/page.module.css) | LOW |
| Research | 545px image blocks per area | real square images at ~min(40vw, 520px) | local | LOW |
| Publications | year sections `--space-16`+ gap, per-item 100-147px | theme sections `--space-12`, per-item tighter (bib-like) | local (publications page css) | LOW |
| People | — | STABLE, only natural effect of any global change; **no local change** (§16) | none | — |
| News page | — | unchanged except image fields flow in naturally | none | — |
| Global `--section-space` | — | **NOT changed blindly** (§15); any shared tightening only after per-page verified | none until verified | — |

Target: ~15–25% reduction in verified excessive whitespace, page-local first.

---

## C. SCHEMA IMPACT (publication theme grouping)

**Decision: separate theme mapping/config — NO schema change to `Publication`.**

- Publications keep their existing `Publication` shape (`year`, `doi`, `venue`, etc.) unchanged.
- A new data file `content/publication-themes.ts` defines the legacy theme list (id, code, title, descriptor, ordered `publicationIds`).
- A small lib helper `groupPublicationsByTheme(publications)` (new `lib/publications.ts` addition) groups by theme.
- Publications page switches from `groupPublicationsByYear` to `groupPublicationsByTheme`; year nav removed/deactivated (§7), year still shown per item.
- **No optional `theme` field on `Publication`, no component rewrite of PublicationItem.**

Research change is also **data-only**: `ResearchArea` shape is unchanged (real areas reuse `title/shortDescription/description/image/keywords`; `relatedProjects` left undefined for real areas so no fake links). Home components get content-level edits (lede, featured highlights, news images) — no component-logic rewrites beyond removing the fictional-SVG fallback (which is content-integrity, not architecture).

**Overall: no schema change, no route change, no shared-framework rewrite.**
