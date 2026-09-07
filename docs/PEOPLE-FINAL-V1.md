# People Final v1

Status: **APPROVED / FROZEN**

## Authoritative source

- Repository: `radiuszzz/lab-website`
- Branch at approval: `experiment/dr-ye-standalone`
- Approved commit: `ea032fe0cf0b47d78b3414b11342e9adf45547b5`
  (`refine(people): directory name anchor and group rhythm`)
- Permanent tag: **`people-final-v1`**
- Reference Vercel deployment: `dpl_bAs8xzjWPJhNxPztgvQTKLfUuC3g`
- Immutable preview: <https://lab-website-56rvnf76e-shaonianradius-4833.vercel.app/people>
- Branch alias used during review (MOVING reference, not authority):
  <https://lab-website-git-experiment-dr-ye-standalone-shaonianradius-4833.vercel.app/people>

## Authority semantics

- Branch aliases and branch HEADs are **moving references**.
- The immutable design authority is the exact commit SHA / tag above
  (`people-final-v1` = `ea032fe`).
- Later commits on any branch do NOT redefine People Final v1.

## Frozen People design scope

- Dr. Ye separated from /people; standalone `/dr-ye` PI profile
- Role-grouped People directory (Research Fellow → Research Assistants →
  PhD Students), concise member rows (portrait · name · role · View profile)
- Individual member profile pages at `/people/[slug]`
  (`generateStaticParams`, PI slug excluded → 404)
- Current portrait sizing (directory ~174×209 desktop / ~110px mobile,
  5:6 ratio, vertically centered)
- Current name hierarchy (member name 20px / role line 14px muted)
- Current group rhythm (~97px between groups)
- `PeopleOriginsVisual` world-map / flowers closing visual with the legacy
  "inclusive garden" caption
- Current responsive behavior

## Maintenance rule

Future members (PhD, Visiting, etc.) should be added **within this existing
People architecture** unless a new design revision is explicitly approved.

Allowed without redefining the baseline (data only):

- member data, member photos, roles, bios, research interests, links
- additional real member categories already supported by the data model

Changes that constitute a **new People design revision** (require explicit
approval):

- different directory layout or card grid
- different PI placement
- removal of individual member profiles
- major portrait geometry change
- major typography hierarchy change
- major group-spacing / grouping change
- removal or replacement of the closing People visual
- a new People information architecture

## Preservation in this repository

`Yvetteee/ccylab:website-v2` currently preserves People Final v1
(verified blob-identical People files against `ea032fe`; production-only
differences: canonical domain in `content/site.ts`, README, CNAME,
excluded `.env.example`).

This does NOT mean every future website-v2 commit is automatically
"People Final v1" — the design authority remains the tag / SHA above.
