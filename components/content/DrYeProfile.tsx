import Section from "@/components/ui/Section";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import { getInitials, orcidUrl } from "@/lib/format";
import { piCareer, piEducation, piHonors, piPerson } from "@/content";
import styles from "./DrYeProfile.module.css";

/**
 * Standalone Dr. Ye profile (Variant B, /dr-ye) — the People PIProfile
 * identity grammar kept as-is (circular portrait + ONE right-hand text axis:
 * bilingual name, current role line, contact links, signature quote panel,
 * bio) and extended with the legacy PI academic record: Academic Career and
 * Education as one period | content record system, Honors & Awards as a
 * restrained two-column index. Shared data lives in content/pi.ts.
 */
export default function DrYeProfile() {
  const person = piPerson;
  const current = piCareer[0];
  /* Deterministic split: recent half left, earlier half right; the mobile
     single column stacks left then right, preserving descending chronology. */
  const split = Math.ceil(piHonors.length / 2);
  const recentHonors = piHonors.slice(0, split);
  const earlierHonors = piHonors.slice(split);

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
          <p className={styles.name}>
            {person.name}
            {person.nameZh ? (
              <span lang={person.nameLang ?? "zh-Hans"} className={styles.nameZh}>
                {person.nameZh}
              </span>
            ) : null}
          </p>

          {current ? (
            <div className={styles.affiliations}>
              <p className={styles.role}>{current.role}</p>
              <p className={styles.affiliation}>{current.unit}</p>
              <p className={styles.affiliation}>{current.institution}</p>
            </div>
          ) : null}

          {(person.email || person.orcid || person.scholar) && (
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
        </div>
      </div>

      <Section id="academic-career" title="Academic Career" headingLevel={2}>
        <ul className={styles.records}>
          {piCareer.map((record) => (
            <li key={`${record.period} ${record.role}`} className={styles.record}>
              <span className={styles.period}>{record.period}</span>
              <div className={styles.recordBody}>
                <p className={styles.recordRole}>{record.role}</p>
                <p className={styles.recordUnit}>{record.unit}</p>
                <p className={styles.recordInstitution}>{record.institution}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="education" title="Education" headingLevel={2}>
        <ul className={styles.records}>
          {piEducation.map((record) => (
            <li key={record.period} className={styles.record}>
              <span className={styles.period}>{record.period}</span>
              <div className={styles.recordBody}>
                <p className={styles.recordRole}>{record.degree}</p>
                <p className={styles.recordInstitution}>{record.institution}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="honors" title="Honors & Awards" headingLevel={2}>
        <div className={styles.awardIndex}>
          <ul className={styles.awards} aria-label="Recent honors and awards">
            {recentHonors.map((honor) => (
              <li key={`${honor.year} ${honor.title}`} className={styles.award}>
                <span className={styles.awardYear}>{honor.year}</span>
                <p className={styles.awardTitle}>{honor.title}</p>
                {honor.organization ? (
                  <p className={styles.awardMeta}>{honor.organization}</p>
                ) : null}
                {honor.context ? (
                  <p className={styles.awardMeta}>{honor.context}</p>
                ) : null}
              </li>
            ))}
          </ul>
          <ul className={styles.awards} aria-label="Earlier honors and awards">
            {earlierHonors.map((honor) => (
              <li key={`${honor.year} ${honor.title}`} className={styles.award}>
                <span className={styles.awardYear}>{honor.year}</span>
                <p className={styles.awardTitle}>{honor.title}</p>
                {honor.organization ? (
                  <p className={styles.awardMeta}>{honor.organization}</p>
                ) : null}
                {honor.context ? (
                  <p className={styles.awardMeta}>{honor.context}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </article>
  );
}
