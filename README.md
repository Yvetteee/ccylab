# The Ye Group Website

The Ye Group at Nanyang Technological University publishes its research, publications, news and open positions on [www.ccylab.com](https://www.ccylab.com/).

## Production and maintenance branches

| Item | Verified baseline on 2026-11-25 |
| --- | --- |
| Hosting | Vercel project `shaonianradius-4833/ccylab-v2` |
| Public and fallback URLs | [Canonical website](https://www.ccylab.com/), [permanent apex redirect](https://ccylab.com/), [stable Vercel alias](https://ccylab-v2.vercel.app/) |
| Live deployment | `dpl_A7rMVanqRS8UJBn7eUWDBG3qKu7h` from source `15029e994439f1eea69d4d625271b1ca2a60df47` |
| Previous Production reference | `dpl_AMUoCr2CUynWkqx2pxFZnqhdEchW` has the same source and the earlier noindex build settings |
| `website-v2` | Active maintenance branch. Documentation-only commits can advance Git HEAD independently of the live source. |
| `main` | Frozen legacy GitHub Pages source. [The retained Pages URL](https://yvetteee.github.io/ccylab/) redirects to the public site. |

Squarespace handles domain registration and renewal. The domain administrator manages the authoritative DNS zone. Vercel serves the website and automatically renews its managed TLS certificates while validation succeeds. GitHub holds the source and release notes. Routine content releases use the existing domain records. DNS values, rollback constraints and verification evidence are in the [Phase 1 and Phase 2 release record](docs/history/PRODUCTION-RELEASE-PHASE-1-AND-2-2026-11.md). See [Vercel certificate renewal](https://vercel.com/docs/domains/working-with-ssl#automatic-certificate-renewal).

`SITE_INDEXABLE=true` is scoped to Vercel Production. [Production robots.txt](https://www.ccylab.com/robots.txt) allows crawling and advertises the [canonical sitemap](https://www.ccylab.com/sitemap.xml) of main navigation routes. Preview defaults to blocked crawling and `noindex, nofollow`. `/apply/phd`, `/apply/postdoc` and `/projects` stay out of the sitemap and use `noindex, nofollow` in Production. Crawl permission and a sitemap make pages eligible for indexing. Search-engine inclusion depends on the search engine.

## Content and local development

The site uses Next.js App Router, React, TypeScript and CSS Modules. Edit the typed content data and follow the [repository structure and asset guide](docs/REPOSITORY-STRUCTURE.md).

| To update | File or directory |
| --- | --- |
| Site identity, navigation and public contact details | [content/site.ts](content/site.ts) |
| PI profile | [content/pi.ts](content/pi.ts) |
| People and lab mascot | [content/people.ts](content/people.ts) |
| Research areas | [content/research-areas.ts](content/research-areas.ts) |
| Publications and themes | [content/publications.ts](content/publications.ts), [content/publication-themes.ts](content/publication-themes.ts) |
| News | [content/news.ts](content/news.ts) |
| Recruitment copy | [content/opportunities.ts](content/opportunities.ts) |
| Images and design tokens | [public/images](public/images), [styles/tokens.css](styles/tokens.css) |

Use an active Node.js LTS release and npm. News dates use a sort date with an optional display date for sources that give only a month or year.

```bash
npm ci
npm run dev
npm run lint
npx tsc --noEmit
npm run build
git diff --check
```

## Content release workflow

1. Start from the current `website-v2` and run the technical checks above.
2. Deploy a Vercel Preview and verify the actual Preview URL, including the affected pages, navigation and noindex behavior. Record the validated commit SHA.
3. Fast-forward and push `website-v2`. The project uses manual Vercel CLI deployments. Confirm the remote SHA and record the current Production deployment as the rollback target.
4. Stage that revision using `vercel deploy --prod --skip-domain`. Validate the staged deployment and confirm the Production aliases still resolve to the previous deployment.
5. Run `vercel promote <validated-deployment>` for that exact deployment. Verify the canonical site, stable alias and deployed source SHA. Check the apex HTTPS redirect, indexing and affected routes. Record the live deployment and rollback reference.

For docs-only updates, review links and scope, run `git diff --check` and confirm the push will leave Production in place. A rollback restores the target deployment's build-time settings, so check indexing and other environment-dependent behavior before choosing it. See [Vercel deploy](https://vercel.com/docs/cli/deploy), [promote](https://vercel.com/docs/cli/promote) and [rollback](https://vercel.com/docs/cli/rollback).

## Online applications

**Production configured and staged; public submissions are paused.** The official website still serves both application pages with submission disabled, and Join Us continues to offer email submission. The separate Production Worker has the approved NTU recipient and its public ingress is off. The pending Vercel candidate contains the approved Worker URL, Turnstile public key and in-form fallback to the approved NTU mailbox.

The [application readiness audit and activation plan](docs/audits/APPLICATION-READINESS-2026-11.md) separates live checks, local tests and unverified provider settings. The [Worker README](workers/application-submit/README.md) describes the current handler, local tests and configuration names. [The frontend template](.env.example) is reference material for development. Configure recipient identities in the appropriate platform after approval and keep credentials out of Git.
