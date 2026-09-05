import Link from "next/link";
import type { Person } from "@/types/content";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import { getInitials } from "@/lib/format";
import styles from "./MemberRow.module.css";

interface MemberRowProps {
  person: Person;
}

/**
 * Team-directory row — the concise People entry: portrait, name, role line
 * and the link to the member's profile page (/people/[slug]), where the
 * long-form biography lives. The PI is not part of this directory; their
 * complete academic profile is the standalone /dr-ye page.
 */
export default function MemberRow({ person }: MemberRowProps) {
  return (
    <article className={styles.row}>
      {person.photo ? (
        <ResponsiveImage
          src={person.photo}
          alt={`Photo of ${person.name}`}
          ratio="5 / 6"
          sizes="(min-width: 641px) 11rem, 7rem"
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

        {/* Member-level role line: visually secondary to the group heading,
           kept for clarity (photo/name/role directory summary). */}
        <p className={styles.role}>{person.role}</p>

        <Link
          href={`/people/${person.id}`}
          className={styles.profileLink}
          aria-label={`View profile of ${person.name}`}
        >
          View profile →
        </Link>
      </div>
    </article>
  );
}
