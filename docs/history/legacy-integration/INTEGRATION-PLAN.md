# Integration Plan — Legacy visual reconstruction on V4

> Phase 1 output. The working branch is `review/legacy-integration`, branched
> from `review/v4` (e93d68d). `main` and `preview` are untouched. Every stage
> is independently reversible; commits are small and reviewable; no pushes
> without explicit authorization.

---

## Guiding principles (from the task)

1. **Framework stability wins** over visual fidelity.
2. **Legacy = visual/brand truth; V4 = engineering truth.**
3. Preserve the *visual result*, rebuild the *implementation*.
4. Ambiguous legacy → **do not invent** → defer to human (D-1…D-10).
5. Do not introduce CSS frameworks, component libraries, or needless deps.
6. Content layer and data schemas are engineering truth — **not** replaced.
7. Report content conflicts; do not silently resolve them.
8. No generic-modern defaults (cards/pills/shadows/gradients) unless a legacy
   idea demands them.

---

## Phase map

### Phase 1 — Audit (READ ONLY) ✅ done
- `LEGACY-DESIGN-DNA.md` — what makes the lab recognizable; intentional vs
  accidental.
- `LEGACY-IMPLEMENTATION-ISSUES.md` — defects, and what was actually good.
- `OLD-TO-NEW-MAPPING.md` — KEEP/ADAPT/RECONSTRUCT/HUMAN/DROP per element.
- `DESIGN-DECISIONS-NEEDED.md` — 10 deferred questions (D-1…D-10).
- `INTEGRATION-PLAN.md` — this file.

### Phase 2 — Design-system translation
- Translate legacy appearance → V4 tokens → reusable components.
- Add/adapt semantic tokens in `styles/tokens.css` (single reversible commit):
  - accent → NTU red (**D-1**, human-gated decision; applied as the proposed
    value, reversible in one file);
  - add legacy grey-band surface / dark footer / red-action token slots;
  - keep V4 typography (serif headings), translate legacy *scale*.
- **No per-page hard-coded colors**; page modules keep using tokens.

### Phase 3 — Page-by-page implementation (Home first)
Recommended order (task §10):
**Home → Research → People → Publications → News → Join → Apply → Contact →
Header/Footer final harmonization.**

For each page:
1. capture current V4 behavior; 2. identify legacy reference;
3. reconstruct legacy character with current components; 4. keep responsive +
   functional behavior; 5. validate; 6. human visual review; 7. then continue.

**Home proof-of-concept (stage 3A):**
- Reconstruct legacy Home hero (photo + white overlay + bold title + italic
  subtitle) (**D-5**).
- Bring legacy composition to home sections (welcome + Latest, numbered
  research rows character, red accents, large titles, italic motifs).
- Keep all V4 components/containers/responsive behavior intact.
- Produce the **LEGACY / CURRENT V4 / LEGACY-STYLE RECONSTRUCTION** comparison.
- **STOP for human approval** before propagating to other pages (task §11).

### Later stages (only after Home approval)
- Research page: grey hero band + numbered rows + justified long-form
  (**D-7**) + selective figure asset adoption.
- People page: circular portraits, PI profile quote block, role grouping kept.
- Publications page: legacy editorial list character + Scholar/ORCID row fix +
  optional featured red label (**D-6**).
- News / Projects: keep V4 data-driven structure; adopt legacy section rhythm.
- Join / Apply: keep tabs, hash, keyboard, form routes intact; adopt red
  active-underline, gray panels, legacy grey info block.
- Contact: keep map embed + security headers + canonical; adopt grey info
  block styling.
- **Header/Footer harmonization** (last, per task §10): red band header
  (**D-2**), dark footer + NTU logo + back-to-top (**D-8**).

---

## Hard boundaries (never crossed)

- No legacy Git repo merge; no wholesale legacy CSS import.
- App Router architecture, routes, data schemas, security headers, canonical
  URL, robots/indexing — unchanged.
- `/join` tabs/hash/keyboard; `/apply/phd`, `/apply/postdoc` (form, back links,
  noindex, no main-nav entry) — unbroken.
- Contact map, People grouping, Publications year navigation — unbroken.
- No new npm dependencies, no CSS framework, no component library.
- Content facts are not rewritten; conflicts reported, not silently resolved.
- `main` and `preview` never modified; no force push, no history rewrite.

---

## Testing gate (every stage)

- `npm run lint` — clean.
- TypeScript validation (`npx tsc --noEmit`) — clean.
- `npm run build` — succeeds; no hydration/console errors; no broken routes,
  missing assets, or overflow regressions.
- No error suppression to pass checks.

## Responsive QA (every migrated page)

375 / 768 / 1024 / 1200 / 1440 / 1600 / 1920 px. Watch: unwanted wrapping,
excessive empty space, too-narrow columns, drifting content on large
displays, inconsistent alignment, image cropping, header crowding, nav
overflow, content density. Do not preserve artificial text-width limits where
usable page width exists for structured content.

## Commit discipline

Small, reviewable, independently revertible commits, e.g.:
- `docs(legacy): add Phase 1 legacy integration audit docs`
- `refactor(design): translate legacy color + typography tokens`
- `refactor(home): reconstruct legacy home hero + section character`
One concern per commit; no mixed cleanup/deps/content/architecture.

## Rollback

Each stage = one commit on `review/legacy-integration`. Revert page-by-page
via `git revert <commit>` or branch reset; nothing is squashed into a single
"merge old site" commit.

## Final report (end of each phase)

FILES CHANGED · VISUAL ELEMENTS PRESERVED · DEFECTS REMOVED · FRAMEWORK
FEATURES PRESERVED · DECISIONS DEFERRED · TEST RESULTS · RESPONSIVE QA ·
KNOWN RISKS · NEXT RECOMMENDED PAGE.

---

## Open items / risks

- **Content conflict (REPORTED):** current V4 content is placeholder/fictional
  (research areas, people, publications, news marked "entirely fictional");
  the legacy site carries the real lab's membranes/materials content. Per task
  §14 this integration does **not** migrate content — it migrates visual
  identity only. The real content swap is a separate, human-authorized task.
  Join/Apply content is already real and matches the legacy.
- **Legacy assets:** several are low-res or very large; usage rights of journal
  figures are unclear. Home hero photo adoption is proposed but must pass the
  human asset check (D-9).
- **Shared shell:** header/footer changes touch all pages → deferred to final
  harmonization and gated by human approval (D-2, D-8, D-10).
