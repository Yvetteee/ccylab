import type { Publication } from "@/types/content";
import styles from "./PublicationItem.module.css";

interface PublicationItemProps {
  publication: Publication;
}

/** Resolve where a publication links out to (URL beats DOI). */
function publicationHref(pub: Publication): string | undefined {
  if (pub.url) return pub.url;
  if (pub.doi) return `https://doi.org/${pub.doi}`;
  return undefined;
}

/**
 * Compact bibliography row for the Publications archive. Deliberately plain:
 * Home owns the visual "featured research" treatment; this is the scholarly
 * record. Type in a left rail, then title, authors and venue/DOI.
 */
export default function PublicationItem({ publication }: PublicationItemProps) {
  const href = publicationHref(publication);
  // Only genuine http(s) links open in a new tab; anything else keeps the
  // current tab so internal / non-http URLs are never mis-targeted.
  const isExternal = href ? /^https?:\/\//.test(href) : false;
  const venueLine = [
    publication.venue,
    publication.volume ? `vol. ${publication.volume}` : null,
    publication.issue ? `no. ${publication.issue}` : null,
    publication.pages ? `pp. ${publication.pages}` : null,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <article className={styles.row}>
      <p className={styles.type}>{publication.type}</p>
      <div className={styles.body}>
        {publication.featured ? (
          <p className={styles.featured}>Featured</p>
        ) : null}
        <h3 className={styles.title}>
          {href ? (
            <a
              href={href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
            >
              {publication.title}
            </a>
          ) : (
            publication.title
          )}
        </h3>
        {publication.authors.length ? (
          <p className={styles.authors}>{publication.authors.join(", ")}</p>
        ) : null}
        <p className={styles.venue}>
          {venueLine}
          {publication.doi ? (
            <>
              {venueLine ? " · " : ""}
              <a
                href={`https://doi.org/${publication.doi}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                DOI →
              </a>
            </>
          ) : null}
        </p>
      </div>
    </article>
  );
}
