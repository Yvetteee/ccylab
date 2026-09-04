import PageContainer from "@/components/ui/PageContainer";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import MemberRow from "@/components/content/MemberRow";
import { people } from "@/content";
import { groupPeopleByCategory } from "@/lib/people";
import { createPageMetadata } from "@/lib/metadata";
import type { RoleCategory } from "@/types/content";
import styles from "./page.module.css";

export const metadata = createPageMetadata({
  title: "People",
  description: "Members of The Ye Group at Nanyang Technological University.",
  path: "/people",
});

/** Current non-PI roles shown, in display order. Dormant roles (master,
 * visiting, alumni) stay hidden until real members exist. */
const CURRENT_ROLES: readonly RoleCategory[] = [
  "postdoc",
  "assistant",
  "phd",
  "visiting",
];

/**
 * People — a group of people doing research together, not a directory.
 * Variant B information architecture: the full PI academic profile lives on
 * the standalone /dr-ye page (DrYeProfile, sharing piPerson); this page lists
 * the TEAM only — members appear in a role-grouped CONTINUOUS ROSTER with a
 * portrait-oriented rectangular photo and text biography (MemberRow), no
 * uniform circular card grid. Alumni are compact text rows.
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
          >
            <div className={styles.roster}>
              {group.members.map((person) => (
                <MemberRow key={person.id} person={person} />
              ))}
            </div>
          </Section>
        ))
      )}

      {alumni.length ? (
        <Section id="alumni" title="Alumni" headingLevel={2}>
          <ul className={styles.alumni}>
            {alumni.map((person) => (
              <li key={person.id} className={styles.alumniRow}>
                <span className={styles.alumniName}>{person.name}</span>
                <span className={styles.alumniRole}> — {person.role}</span>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
    </PageContainer>
  );
}
