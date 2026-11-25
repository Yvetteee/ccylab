# The Ye Group Website

The Ye Group at Nanyang Technological University publishes its research, publications, news and open positions on [www.ccylab.com](https://www.ccylab.com/).

## Production and maintenance branches

| Item | Verified baseline on 2026-11-25 |
| --- | --- |
| Hosting | Vercel project `shaonianradius-4833/ccylab-v2` |
| Public and fallback URLs | [Canonical website](https://www.ccylab.com/), [permanent apex redirect](https://ccylab.com/), [stable Vercel alias](https://ccylab-v2.vercel.app/) |
| Live website deployment | `dpl_CDyqiByvYa9VEz2Mp1RgWey7rSEu`, from source `c9428ce3455b2414103f59ec1328b725d757fce1` |
| Live application Worker | `application-submit-production`, version `2f91c9bb-c489-48b9-a3c2-0e8bde05ea17` |
| Indexed pre-activation rollback | `dpl_A7rMVanqRS8UJBn7eUWDBG3qKu7h`, from source `15029e994439f1eea69d4d625271b1ca2a60df47`. Restores the website with online submission disabled. |
| `website-v2` | Active maintenance branch. Documentation-only commits can advance Git HEAD independently of the live source. |
| `main` | Frozen legacy GitHub Pages source. [The retained Pages URL](https://yvetteee.github.io/ccylab/) redirects to the public site. |

The Squarespace account owner manages domain registration, renewal and payment. The DNS administrator maintains the authoritative web and mail records. The Vercel operator maintains the `www` and apex domain associations, verifies the HTTPS redirect and checks managed TLS provisioning and renewal. The Resend administrator monitors `send.ccylab.com` verification and coordinates changes to its sending records with the DNS administrator. Routine website content releases use the existing Cloudflare, Resend and DNS configuration. [Phase 1 and Phase 2 release record](docs/history/PRODUCTION-RELEASE-PHASE-1-AND-2-2026-11.md) · [Vercel certificate renewal](https://vercel.com/docs/domains/working-with-ssl#automatic-certificate-renewal)

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

For docs-only updates, review links and scope and run `git diff --check`. `ccylab-v2` has no Git deploy link and the repository has no release workflow, so this handover push leaves the live deployment in place.

For a website-only failure, run `vercel rollback <previous-healthy-deployment> --scope shaonianradius-4833` and verify the canonical URLs, indexing and both application pages. As of this handover, `dpl_CDyqiByvYa9VEz2Mp1RgWey7rSEu` is the verified website deployment with working forms. Rollback restores the target build's application and indexing settings. Use the pre-activation rollback above when intentionally disabling intake. [Vercel deploy](https://vercel.com/docs/cli/deploy) · [Vercel promote](https://vercel.com/docs/cli/promote) · [Vercel rollback](https://vercel.com/docs/cli/rollback)

## Online applications

**Online applications are live.** Both forms submit to the Production Worker and offer email submission to `chunchun.ye@ntu.edu.sg`. The official PhD TEST returned HTTP `200` and Resend reported `Delivered`. Supervisor inbox confirmation remains pending. [PhD form](https://www.ccylab.com/apply/phd) · [Postdoc form](https://www.ccylab.com/apply/postdoc)

The Phase 3 record is the authority for acceptance and its limitations. Use the Worker README for availability checks, provider diagnostics, credential and recipient changes, and emergency shutdown. The frontend environment template is for development. [Production activation and acceptance](docs/audits/APPLICATION-READINESS-2026-11.md#production-activation-and-acceptance) · [Worker maintenance and recovery](workers/application-submit/README.md#routine-production-maintenance) · [Frontend environment template](.env.example)
