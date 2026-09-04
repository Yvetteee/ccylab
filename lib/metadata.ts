import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

interface PageMetadataInput {
  /** Page title; omit on the home page so the layout default is used. */
  title?: string;
  description: string;
  /** Absolute path starting with "/", e.g. "/research". */
  path: string;
}

/**
 * Central page-metadata factory. Each page calls this instead of writing
 * canonical / Open Graph boilerplate, so SEO stays consistent and easy to
 * maintain (site name, URL base and OG defaults live in one place).
 */
export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadataInput): Metadata {
  const url = new URL(path, siteConfig.url);

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: url.toString() },
    openGraph: {
      ...(title ? { title: `${title} | ${siteConfig.name}` } : { title: siteConfig.name }),
      description,
      url: url.toString(),
      siteName: siteConfig.name,
      locale: "en_US",
      type: "website",
    },
  };
}

interface ApplyMetadataInput {
  title: string;
  description: string;
}

/**
 * Metadata for task pages that should only be reached from the site (never
 * shown in search results). `index: false` overrides the root layout's
 * environment-controlled robots, regardless of SITE_INDEXABLE.
 */
export function createApplyMetadata({
  title,
  description,
}: ApplyMetadataInput): Metadata {
  return {
    title,
    description,
    robots: { index: false, follow: false },
  };
}
