import Link from "next/link";
import PageContainer from "@/components/ui/PageContainer";
import PageHeader from "@/components/ui/PageHeader";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import Section from "@/components/ui/Section";
import MemberRow from "@/components/content/MemberRow";
import memberStyles from "@/components/content/MemberRow.module.css";
import PeopleOriginsVisual from "@/components/content/PeopleOriginsVisual";
import { labMascot, people } from "@/content";
import { groupPeopleByCategory } from "@/lib/people";
import { createPageMetadata } from "@/lib/metadata";
import type { RoleCategory } from "@/types/content";
import styles from "./page.module.css";

export const metadata = createPageMetadata({
  title: "People",
  description: "Members of The Ye Group at Nanyang Technological University.",
  path: "/people",
});

const mascotProfileHref = "/people/scone";

/** Current non-PI roles shown, in display order. Dormant roles (master,
 * visiting, alumni) stay hidden until real members exist. */
const CURRENT_ROLES: readonly RoleCategory[] = [
  "postdoc",
  "assistant",
  "phd",
  "visiting",
];

/**
 * People — team directory: concise entries (portrait, name, role, profile
 * link) in a role-grouped continuous roster. Long-form member biographies
 * live on the individual profile pages (/people/[slug]); the PI's complete
 * academic profile is the standalone /dr-ye page and is not listed here.
 */
export default function PeoplePage() {
  const currentGroups = groupPeopleByCategory(people).filter((group) =>
    CURRENT_ROLES.includes(group.category)
  );
  const alumni = people
    .filter((p) => p.category === "alumni")
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

  return (
    <PageContainer>
      <PageHeader
        title="People"
        description="The people behind the research — a growing and welcoming team, bringing together diverse perspectives through collaboration, curiosity and shared progress."
      />

      {currentGroups.length === 0 ? (
        <p className={styles.empty}>No current members are listed.</p>
      ) : (
        currentGroups.map((group, index) => (
          <Section
            key={group.category}
            id={group.category}
            title={group.label}
            headingLevel={2}
            first={index === 0}
            className={styles.groupSection}
          >
            <div
              className={
                group.category === "phd"
                  ? `${styles.roster} ${styles.rosterGrid}`
                  : styles.roster
              }
            >
              {group.members.map((person) => (
                <MemberRow key={person.id} person={person} />
              ))}
            </div>
          </Section>
        ))
      )}

      {alumni.length ? (
        <Section id="alumni" title="Alumni" headingLevel={2}>
          <div className={`${styles.roster} ${styles.alumniRoster}`}>
            {alumni.map((person) => (
              <MemberRow key={person.id} person={person} />
            ))}
          </div>
        </Section>
      ) : null}

      <Section
        id="lab-mascot"
        title="Lab Mascot"
        headingLevel={2}
        className={styles.groupSection}
      >
        <article className={`${memberStyles.row} ${styles.mascotRow}`}>
          <Link
            href={mascotProfileHref}
            className={`${memberStyles.photoLink} ${styles.mascotPhoto}`}
            aria-label={`View profile of ${labMascot.name}`}
          >
            <ResponsiveImage
              src={labMascot.photo}
              alt={labMascot.photoAlt}
              ratio="5 / 6"
              sizes="(min-width: 641px) 11rem, 7rem"
              className={memberStyles.photo}
            />
          </Link>
          <div className={`${memberStyles.body} ${styles.mascotIdentity}`}>
            <h3 className={memberStyles.name}>
              <Link href={mascotProfileHref}>{labMascot.name}</Link>
            </h3>
            <p className={memberStyles.role}>
              {labMascot.breed} |{" "}
              <time dateTime={labMascot.birthDate}>
                Born {labMascot.birthDateLabel}
              </time>
            </p>
            <p>Resident food critic</p>
          </div>
          <Link
            href={mascotProfileHref}
            className={styles.mascotInvitation}
            aria-label={`Pet me to learn more about ${labMascot.name}`}
          >
            <span className={styles.mascotArrow} aria-hidden="true" />
            <span className={styles.mascotInvitationText}>Pet me to learn more</span>
          </Link>
        </article>
      </Section>

      <PeopleOriginsVisual />
    </PageContainer>
  );
}
