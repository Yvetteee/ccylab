# Website Production Release and Domain Migration — November 2026

Closeout date: 2026-11-25. The [maintenance README](../../README.md) is the living entry point. This record captures the website release and public cutover. The [Phase 3 audit](../audits/APPLICATION-READINESS-2026-11.md) covers online applications.

## Phase 1 — Final website Production release

| Evidence | Recorded result |
| --- | --- |
| Final code | [Scone profile research interests](https://github.com/Yvetteee/ccylab/commit/15029e994439f1eea69d4d625271b1ca2a60df47), plus the approved preceding interaction, mascot, news and legacy route changes |
| Validated Preview | `dpl_Aw5pc5yKAJWSZ2oQBSt1F81AtrvD`, same SHA, branch `content/scone-research-interests`, READY |
| Staged and promoted Production | `dpl_AMUoCr2CUynWkqx2pxFZnqhdEchW`, same SHA, `website-v2`, READY, [immutable URL](https://ccylab-v2-ca3n9wf1x-shaonianradius-4833.vercel.app/) |
| Pre-release rollback reference | `dpl_42GRrdRxBDTAUaABZBuT5G8HWYDf`, source `5537f9e5fe9252da7bd60b68d41600d03b8c9a62` |

The Phase 1 acceptance report recorded lint, TypeScript, build, diff and responsive QA at 1440, 1024, 768, 375 and 340 px. Coverage included both mascot photos, both biography paragraphs, People navigation, the directional arrow and reduced-motion behavior, the separator, research interests and closing remark, plus existing routes and redirects. Phase 1 ended on the Vercel alias with indexing disabled. The Preview feedback toolbar CSP message was documented during that release.

This closeout independently rechecked the Production and Preview deployment metadata and the Phase 1 rollback URL. It returned HTTPS 200 with `Disallow: /` in robots.txt. The current site still serves the Phase 1 source and Scone's profile returns 200. All six legacy redirects returned 308 on the canonical host. The earlier visual and animation acceptance results are historical evidence.

| Legacy URL | Production redirect |
| --- | --- |
| `/index.html` | `/` |
| `/pi.html` | `/dr-ye` |
| `/members.html` | `/people` |
| `/publications.html` | `/publications` |
| `/research.html` | `/research` |
| `/join.html` | `/join` |

## Phase 2 — Public domain and search indexing

Vercel reports `dpl_A7rMVanqRS8UJBn7eUWDBG3qKu7h` as READY in Production, created by redeploying `website-v2` source `15029e994439f1eea69d4d625271b1ca2a60df47`. [The canonical site](https://www.ccylab.com/) and [the stable alias](https://ccylab-v2.vercel.app/) map to this same deployment. The [immutable deployment](https://ccylab-v2-fylrpbnzi-shaonianradius-4833.vercel.app/) identifies the indexed build.

| Boundary | Independently verified on 2026-11-25 |
| --- | --- |
| Vercel domains | `www.ccylab.com` and `ccylab.com` verified on `shaonianradius-4833/ccylab-v2`. HTTPS www returns 200. HTTPS apex returns 308 to www. Both hosts upgrade HTTP to HTTPS. |
| Public apex DNS | A records `216.198.79.1` and `64.29.17.1`. No AAAA answer observed. |
| Public www DNS | CNAME `61b6865cd96a0e75.vercel-dns-017.com.` |
| Registration and authoritative DNS | Public RDAP identifies Squarespace Domains LLC. Public NS records point to `ns-cloud-d1.googledomains.com.` through `ns-cloud-d4.googledomains.com.`. Squarespace console settings and renewal billing were outside the verified evidence. |
| TLS | HTTPS certificate validation succeeded on apex and www. Vercel manages certificate provisioning and automatic renewal while the domain remains verifiable. [Vercel SSL documentation](https://vercel.com/docs/domains/working-with-ssl) |
| Production indexing configuration | `SITE_INDEXABLE=true` is scoped to Production. Homepage and Join Us return `index, follow` with www canonicals. [Robots.txt](https://www.ccylab.com/robots.txt) allows crawling and lists the [sitemap](https://www.ccylab.com/sitemap.xml). |
| Sitemap and exclusions | Eight canonical main-navigation URLs. Both application pages and `/projects` return `noindex, nofollow` and are absent from the sitemap. Scone's profile has `index, follow` and is linked from People. Member profiles and news detail pages are outside the navigation-generated sitemap. |
| Preview restrictions | The exact Phase 1 Preview returned `Disallow: /`, HTML `noindex, nofollow` and Vercel's `X-Robots-Tag: noindex`. |
| Legacy site | GitHub reports Pages enabled and built from the root of frozen `main` at `4aba7018d92b1676a91bcea5deabbffd26dc057e`, with `www.ccylab.com` as its retained custom domain. The Pages URL currently returns 301 to the official site. The `main` CNAME still records `www.ccylab.com`. |

The registrar owner handles registration and renewal. The DNS administrator controls published records. Vercel controls domain routing, TLS and deployment assignment. GitHub branch maintenance affects source history. Routine content changes follow the staged release process.

Indexing eligibility was verified at the site and Vercel. Search Console submission and actual search-engine inclusion were unverified in this closeout. The earlier Phase 1 deployment is the previous Production rollback reference and restores the earlier noindex build if promoted. Record the indexing policy alongside any rollback decision. A recovery to Pages would require checking the Pages publication and custom domain, routing, DNS and HTTPS together. A DNS-only recovery was never rehearsed.
