import type { Person } from "@/types/content";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import { getInitials, orcidUrl } from "@/lib/format";
import styles from "./PIProfile.module.css";

interface PIProfileProps {
  person: Person;
}

/**
 * Principal Investigator spotlight — the legacy PI grammar: a circular
 * portrait on the left and ONE continuous right-hand text axis (bilingual
 * name, contact links, signature quote panel, bio, education), so the whole
 * profile reads as a single column beside the portrait. The role line is not
 * rendered (the section heading states it) and research interests are
 * covered by the bio and the Research page.
 */
export default function PIProfile({ person }: PIProfileProps) {
  const education = person.education;

  return (
    <article className={styles.profile}>
      <div className={styles.top}>
        {person.photo ? (
          <ResponsiveImage
            src={person.photo}
            alt={`Photo of ${person.name}`}
            ratio="1 / 1"
            sizes="(min-width: 900px) 17.5rem, 13.75rem"
            className={styles.portrait}
          />
        ) : (
          <div
            className={`${styles.placeholder} ${styles.portrait}`}
            role="img"
            aria-label={`Photo placeholder for ${person.name}`}
          >
            {getInitials(person.name)}
          </div>
        )}

        <div className={styles.identity}>
          <h3 className={styles.name}>
            {person.name}
            {person.nameZh ? (
              <span lang={person.nameLang ?? "zh-Hans"} className={styles.nameZh}>
                {person.nameZh}
              </span>
            ) : null}
          </h3>

          {(person.email ||
            person.orcid ||
            person.scholar ||
            person.personalWebsite) && (
            <ul className={styles.links} aria-label="Contact and profiles">
              {person.email ? (
                <li>
                  <a href={`mailto:${person.email}`} aria-label={`Email ${person.name}`}>
                    Email
                  </a>
                </li>
              ) : null}
              {person.orcid ? (
                <li>
                  <a
                    href={orcidUrl(person.orcid)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`ORCID profile of ${person.name}`}
                  >
                    ORCID
                  </a>
                </li>
              ) : null}
              {person.scholar ? (
                <li>
                  <a
                    href={person.scholar}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Google Scholar profile of ${person.name}`}
                  >
                    Scholar
                  </a>
                </li>
              ) : null}
              {person.personalWebsite ? (
                <li>
                  <a
                    href={person.personalWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Personal website of ${person.name}`}
                  >
                    Website
                  </a>
                </li>
              ) : null}
            </ul>
          )}

          {person.quote ? (
            <blockquote className={styles.quote}>
              <p lang="zh-Hans" className={styles.quoteText}>
                {person.quote.text}
              </p>
              {person.quote.translation ? (
                <p className={styles.quoteTranslation}>{person.quote.translation}</p>
              ) : null}
              {person.quote.source ? (
                <cite className={styles.quoteSource}>{person.quote.source}</cite>
              ) : null}
            </blockquote>
          ) : null}

          {person.bio ? <p className={styles.bio}>{person.bio}</p> : null}
          {education ? (
            <div className={styles.edu}>
              <span className={styles.label}>Education</span>
              <ul className={styles.eduList}>
                {education.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
