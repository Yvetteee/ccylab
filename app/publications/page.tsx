import PageContainer from "@/components/ui/PageContainer";
import PageHeader from "@/components/ui/PageHeader";
import PublicationItem from "@/components/content/PublicationItem";
import { people, publicationThemes, publications } from "@/content";
import { groupPublicationsByTheme } from "@/lib/publications";
import { orcidUrl } from "@/lib/format";
import { createPageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export const metadata = createPageMetadata({
  title: "Publications",
  description:
    "Publications from the research group, grouped by research theme — from flow-battery energy storage and liquid-separation membranes to membrane material design and synthesis.",
  path: "/publications",
});

/**
 * Publications — a scholarly archive grouped by the legacy research themes
 * (Theme 1A…3A). Year stays on each citation but is no longer the primary
 * hierarchy. Dense single-column bibliography; Home owns the visual
 * "featured research" treatment.
 */
export default function PublicationsPage() {
  const pi = people.find((person) => person.category === "pi");
  const { groups, unmapped } = groupPublicationsByTheme(
    publications,
    publicationThemes
  );

  return (
    <PageContainer>
      <PageHeader
        title="Publications"
        description="We produce high-quality research inspired by bold ideas and underpinned by rigorous experiments. Our work spans organic chemistry, materials science, membrane engineering, and technologies for energy and the environment."
      />

      {pi ? (
        <p className={styles.profiles}>
          {pi.scholar ? (
            <a href={pi.scholar} target="_blank" rel="noopener noreferrer">
              Google Scholar →
            </a>
          ) : null}
          {pi.scholar && pi.orcid ? <span aria-hidden="true"> · </span> : null}
          {pi.orcid ? (
            <a href={orcidUrl(pi.orcid)} target="_blank" rel="noopener noreferrer">
              ORCID →
            </a>
          ) : null}
        </p>
      ) : null}

      {groups.length === 0 && unmapped.length === 0 ? (
        <p className={styles.empty}>No publications are available at this time.</p>
      ) : (
        <>
          {groups.map(({ theme, items }) =>
            items.length ? (
              <section
                key={theme.id}
                id={theme.id}
                aria-labelledby={`${theme.id}-heading`}
                className={styles.themeSection}
              >
                <div className={styles.themeHeading}>
                  <h2 id={`${theme.id}-heading`} className={styles.themeTitle}>
                    <span className={styles.themeCode}>{theme.code}</span>{" "}
                    {theme.title}
                  </h2>
                  {theme.descriptor ? (
                    <p className={styles.themeDescriptor}>{theme.descriptor}</p>
                  ) : null}
                </div>
                <div className={styles.rows}>
                  {items.map((publication) => (
                    <PublicationItem
                      key={publication.id}
                      publication={publication}
                    />
                  ))}
                </div>
              </section>
            ) : null
          )}

          {unmapped.length ? (
            <section className={styles.themeSection} aria-labelledby="unmapped-heading">
              <h2 id="unmapped-heading" className={styles.themeTitle}>
                Other work
              </h2>
              <div className={styles.rows}>
                {unmapped.map((publication) => (
                  <PublicationItem
                    key={publication.id}
                    publication={publication}
                  />
                ))}
              </div>
            </section>
          ) : null}
        </>
      )}
    </PageContainer>
  );
}
