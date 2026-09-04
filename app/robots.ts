import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { isSiteIndexable } from "@/lib/indexing";

/**
 * Robots.txt — controlled by the SITE_INDEXABLE environment variable.
 *
 * NOT indexable (default): block everything so the pre-launch site stays out
 * of search results. Indexable (SITE_INDEXABLE === "true"): allow crawling
 * and advertise the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  const indexable = isSiteIndexable();

  return {
    rules: indexable
      ? { userAgent: "*", allow: "/" }
      : { userAgent: "*", disallow: "/" },
    sitemap: indexable
      ? new URL("/sitemap.xml", siteConfig.url).toString()
      : undefined,
  };
}
