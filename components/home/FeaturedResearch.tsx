import Link from "next/link";
import PageContainer from "@/components/ui/PageContainer";
import HomeSection from "./HomeSection";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import { featuredPublications, sortedPublications } from "@/content";
import type { Publication } from "@/types/content";
import styles from "./FeaturedResearch.module.css";

/**
 * Home-only editorial: a one-sentence "why this matters" per featured paper,
 * keyed by publication id. Falls back to the author line when absent, so a
 * changed id degrades gracefully instead of breaking.
 */
const HIGHLIGHTS: Record<string, string> = {
  "pub-2023-nature-triazine":
    "Co-first-author work showing that rigid nanoconfinement in triazine framework membranes enables near-frictionless ion transport — a fundamental advance for membrane selectivity and energy storage.",
  "pub-2020-natmat-hydrophilic":
    "Hydrophilic microporous membranes that selectively separate ions by size and charge, enabling efficient flow-battery energy storage at scale.",
};

function publicationLink(pub: Publication): string {
  if (pub.url) return pub.url;
  if (pub.doi) return `https://doi.org/${pub.doi}`;
  return "/publications";
}

/**
 * Featured Research — text-first. Real featured publications are shown with a
 * "why it matters" blurb and full bibliographic line; no invented figures, no
 * placeholder SVGs. If a publication ever carries an authorised image it is
 * rendered; otherwise the text carries the entry (per legacy-integration
 * rules: never mislabel a generic image as a publication figure). The full
 * bibliography stays on /publications.
 */
export default function FeaturedResearch() {
  const featured = featuredPublications;
  const rest = sortedPublications.filter((pub) => !pub.featured);
  const [main, ...secondaries] = [...featured, ...rest].slice(0, 3);

  // Optional home section: hide it entirely when there is nothing to show.
  if (!main && secondaries.length === 0) return null;

  return (
    <HomeSection id="featured" kicker="Selected work" title="Featured Research">
      {main ? (
        <PageContainer width="standard" className={styles.mainWrap}>
          <article className={styles.main}>
            {main.image ? (
              <ResponsiveImage
                src={main.image}
                alt={main.title}
                ratio="16 / 9"
                sizes="100vw"
              />
            ) : null}
            <p className={styles.mainVenue}>
              {main.authors.join(", ")} — {main.venue} · {main.year}
            </p>
            <h3 className={styles.mainTitle}>
              <Link href={publicationLink(main)}>{main.title}</Link>
            </h3>
            <p className={styles.mainBlurb}>
              {HIGHLIGHTS[main.id] ?? main.authors.join(", ")}
            </p>
            <p className={styles.link}>
              <Link href={publicationLink(main)}>View publication →</Link>
            </p>
          </article>
        </PageContainer>
      ) : null}

      {secondaries.length ? (
        <PageContainer width="standard" className={styles.secondaryWrap}>
          <div className={styles.secondary}>
            {secondaries.map((pub) => (
              <article key={pub.id} className={styles.secondaryItem}>
                {pub.image ? (
                  <ResponsiveImage
                    src={pub.image}
                    alt={pub.title}
                    ratio="4 / 3"
                    sizes="(min-width: 900px) 45vw, 100vw"
                  />
                ) : null}
                <h3 className={styles.secondaryTitle}>
                  <Link href={publicationLink(pub)}>{pub.title}</Link>
                </h3>
                <p className={styles.secondaryVenue}>
                  {pub.authors.slice(0, 3).join(", ")}
                  {pub.authors.length > 3 ? ", et al." : ""} — {pub.venue} ·{" "}
                  {pub.year}
                </p>
              </article>
            ))}
          </div>
        </PageContainer>
      ) : null}
    </HomeSection>
  );
}
