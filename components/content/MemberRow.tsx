import Link from "next/link";
import type { Person } from "@/types/content";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import { getInitials } from "@/lib/format";
import { portraitImageStyle } from "@/lib/people";
import styles from "./MemberRow.module.css";

interface MemberRowProps {
  person: Person;
}

/**
 * Team-directory row — the concise People entry: portrait, name, role line
 * and the link to the member's profile page (/people/[slug]), where the
 * long-form biography lives. The PI is not part of this directory; their
 * complete academic profile is the standalone /dr-ye page.
 *
 * Inactive members (alumni) have no profile page — their row renders the
 * portrait and name as static content, without the profile link.
 */
export default function MemberRow({ person }: MemberRowProps) {
  const hasProfile = person.active !== false;
  const profileHref = `/people/${person.id}`;
  const nameLink = hasProfile ? (
    <Link href={profileHref}>{person.name}</Link>
  ) : (
    person.name
  );

  return (
    <article className={styles.row}>
      {person.photo ? (
        hasProfile ? (
          <Link
            href={profileHref}
            className={styles.photoLink}
            aria-label={`View profile of ${person.name}`}
          >
            <ResponsiveImage
              src={person.photo}
              alt={`Photo of ${person.name}`}
              ratio="5 / 6"
              sizes="(min-width: 641px) 11rem, 7rem"
              className={styles.photo}
              imgStyle={portraitImageStyle(person)}
            />
          </Link>
        ) : (
          <ResponsiveImage
            src={person.photo}
            alt={`Photo of ${person.name}`}
            ratio="5 / 6"
            sizes="(min-width: 641px) 11rem, 7rem"
            className={styles.photo}
            imgStyle={portraitImageStyle(person)}
          />
        )
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
        <h3 className={styles.name}>{nameLink}{person.nameZh ? (
          <span lang={person.nameLang ?? "zh-Hans"} className={styles.nameZh}>
            {person.nameZh}
          </span>
        ) : null}</h3>

        {/* Member-level role line: visually secondary to the group heading,
           kept for clarity (photo/name/role directory summary). */}
        <p className={styles.role}>{person.role}</p>

        {hasProfile ? (
          <Link
            href={profileHref}
            className={styles.profileLink}
            aria-label={`View profile of ${person.name}`}
          >
            View profile →
          </Link>
        ) : null}
      </div>
    </article>
  );
}
