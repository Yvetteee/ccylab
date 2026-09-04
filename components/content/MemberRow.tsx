import type { Person } from "@/types/content";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import { getInitials, orcidUrl } from "@/lib/format";
import styles from "./MemberRow.module.css";

interface MemberRowProps {
  person: Person;
}

/**
 * Member roster row (D-C) — the legacy member grammar: a PORTRAIT-ORIENTED
 * RECTANGULAR photo on the left and a continuous text biography on the right,
 * in a role-grouped roster (NOT a circular card grid).
 *
 * The PI keeps the circular grammar (PIProfile); every other member uses this
 * rectangular-photo row. The text column renders the real fields available in
 * the data (name + role + email + research interests, or a bio when present);
 * placeholder members are not given invented biographies.
 */
export default function MemberRow({ person }: MemberRowProps) {
  const interests = person.researchInterests?.join(" · ");
  const hasLinks = Boolean(
    person.email || person.orcid || person.scholar || person.personalWebsite
  );

  return (
    <article className={styles.row}>
      {person.photo ? (
        <ResponsiveImage
          src={person.photo}
          alt={`Photo of ${person.name}`}
          ratio="5 / 6"
          sizes="(min-width: 641px) 13rem, 9rem"
          className={styles.photo}
        />
      ) : (
        <div
          className={styles.placeholder}
          role="img"
          aria-label={`Photo placeholder for ${person.name}`}
        >
          {getInitials(person.name)}
        </div>
      )}

      <div className={styles.body}>
        <h3 className={styles.name}>
          {person.name}
          {person.nameZh ? (
            <span lang={person.nameLang ?? "zh-Hans"} className={styles.nameZh}>
              {person.nameZh}
            </span>
          ) : null}
        </h3>

        {person.group ? <p className={styles.group}>{person.group}</p> : null}
        {interests ? <p className={styles.interests}>{interests}</p> : null}
        {person.bio ? <p className={styles.bio}>{person.bio}</p> : null}

        {hasLinks ? (
          <ul className={styles.links} aria-label="Contact and profiles">
            {person.email ? (
              <li>
                <a href={`mailto:${person.email}`} aria-label={`Email ${person.name}`}>
                  {person.email}
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
        ) : null}
      </div>
    </article>
  );
}
