import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

/**
 * Sitemap for placeholder site. Nav items are the source of truth, so new
 * pages appear here automatically once added to the navigation.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return siteConfig.nav.map((item) => ({
    url: new URL(item.href, siteConfig.url).toString(),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: item.href === "/" ? 1 : 0.7,
  }));
}
