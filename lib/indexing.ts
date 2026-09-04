/**
 * Environment-controlled search indexing.
 *
 * Read server-side only — deliberately NOT a NEXT_PUBLIC_ variable: this
 * value never needs to reach browser JavaScript. Vercel injects environment
 * variables at build time, so flipping `SITE_INDEXABLE` requires a
 * redeployment.
 *
 * Safe default is NOT indexable: the site is kept out of search results
 * until `SITE_INDEXABLE === "true"` exactly.
 */

export function isSiteIndexable(): boolean {
  return process.env.SITE_INDEXABLE === "true";
}

/** Robots directives for the root metadata (index/follow mirror each other). */
export function getIndexingRobots(): { index: boolean; follow: boolean } {
  const indexable = isSiteIndexable();
  return { index: indexable, follow: indexable };
}
