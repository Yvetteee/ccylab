# Third-Pass Content-Safe Refinement — STEP 1: Content/Identity Mapping

Mapping from current placeholders to authoritative real content (source: verified live
legacy Ye Group site — `github.com/Yvetteee/ccylab` `main`: index.html, pi.html, members.html,
publications.html, fetched 2026-09-02).

## Mapping table

| # | CONTENT ITEM | CURRENT PLACEHOLDER | SOURCE FILE | RENDERING | SAFE REPLACEMENT METHOD | SCHEMA CHANGE? |
|---|---|---|---|---|---|---|
| 1 | Site / group name | `Example Research Group` | `content/site.ts` (`name`) | layout metadata, footer brand, copyright, hero h1, OG/siteName | Level 1: `name` → `The Ye Group` | NO |
| 2 | Header wordmark | `The Ye Group @ NTU` (real) | `content/site.ts` (`wordmark`) | SiteHeader | already real (D-A) — no change | NO |
| 3 | Tagline | `Researching intelligent systems…` | `content/site.ts` (`tagline`) | Hero tagline | Level 1: → `Shaping Membranes: From Smart Materials to a Cleaner Future` (legacy hero subtitle) | NO |
| 4 | Description / welcome | `The Example Research Group studies ML systems…` | `content/site.ts` (`description`) | Hero welcome intro, metadata description | Level 1: → real legacy welcome paragraph (CEE/NTU, porous materials + membranes) | NO |
| 5 | PI identity | `Prof. Elena Mercer`, Northbridge, example.edu | `content/people.ts` (pi) | PIProfile | Level 1/2: → `Chunchun Ye` + `叶纯纯`; real email; real education; factual bio; real Scholar `Rw3Y8B8AAAAJ`; real ORCID `0000-0003-0171-6468`; drop fake personal website | NO |
| 6 | PI quote | real (D-C) | `content/people.ts` | PIProfile quote | already real — no change | NO |
| 7 | Members | Jonas Feld, Wei Tan, Sofia Reyes, Arjun Mehta, Lin Zhao, Hamid Nazari (fictional) | `content/people.ts` | MemberRow | Level 1/2: → real roster: Kaiping Zhu 朱开平 (postdoc), Kim Jiayi Wu 吴佳仪 (assistant), Christine Sunho On 온선호 (phd); real emails, nameZh, bio, interests | NO (`nameZh`, `bio` exist) |
| 8 | Member portraits | none → initials placeholders | `content/people.ts` | MemberRow placeholder | KEEP placeholder mechanism (no fake/stock photos; legacy photo assets not authorized for migration this pass) | NO |
| 9 | Alumni | `Dr. Clara Osei` (fictional person) | `content/people.ts` | alumni rows | remove the fictional alumni entry (no authoritative alumni supplied); Alumni section then does not render | NO |
| 10 | Publications | 7 fictional papers (fake DOIs `10.0000…`) | `content/publications.ts` | PublicationItem | Level 1: → 24 real publications from legacy `publications.html` (real titles/authors/venues/years/DOIs) | NO |
| 11 | News | 5 fictional items (Example Workshop, example.org…) | `content/news.ts` | FeaturedNews / NewsRow / LatestNews | Level 1: → real legacy lab news (Apr/Feb/Jan 2026 joins, Hiring, A New Chapter in NTU) | NO |
| 12 | Projects | 5 fictional (Example Cloud Lab, Northbridge…) | `content/projects.ts` | ProjectCard | NO authoritative real project list supplied → KEEP placeholder (documented remaining) | NO |
| 13 | Research areas | 4 fictional AI areas | `content/research-areas.ts` | ResearchAreaCard | FROZEN (out of scope; real Materials→Membranes→Applications structure is a future redesign) | NO |
| 14 | Opportunities | already real NTU/CEE | `content/opportunities.ts` | OpportunityBlock | already real — no change | NO |
| 15 | Contact | already real | `content/site.ts` (`contact`) | Contact | already real — no change | NO |
| 16 | Production URL | `https://dsh-lab.ntu.edu.sg` (TODO) | `content/site.ts` (`url`) | canonical / OG / metadataBase | KEEP (deployment config; not confirmed) — documented | NO |
| 17 | MemberRow bio | field exists, unpopulated | `components/content/MemberRow.tsx` | MemberRow | Level 2: populate `bio` on real members | NO |
| 18 | People opener | heavy grey PageHeader above PI | `app/people/page.tsx` | PageHeader | Approved visual refinement A — page-local lighter opener | NO |
| 19 | Home hero→body transition | loose seam (64px, then large section gap) | `components/home/Hero.module.css` (+ page.tsx rhythm) | Hero / ResearchOverview | Approved visual refinement B — spacing/rhythm only | NO |

## Result
- **No schema changes required.** All replacements are Level 1 (data values) / Level 2 (populate existing
  optional fields) plus the two approved page-level visual refinements (People opener, Home transition).
- No component contract rewrites. No route changes. No token/system changes.
- `name` change (item 1) propagates automatically to footer brand, copyright, hero h1, metadata title
  template, OG siteName — no component edits needed.
