import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageContainer from "@/components/ui/PageContainer";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import { getInitials, orcidUrl } from "@/lib/format";
import { people } from "@/content";
import { createPageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

interface MemberProfilePageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Member profile — the long-form presentation for CURRENT non-PI members.
 * This route replaces the inline biographies that used to dominate /people:
 * the directory page (app/people) carries the concise photo/name/role entry,
 * and each profile page carries the detail. The PI is excluded — their
 * complete academic profile lives at /dr-ye, never at /people/chunchun-ye.
 */
export function generateStaticParams() {
  return people
    .filter((member) => member.category !== "pi" && member.active)
    .map((member) => ({ slug: member.id }));
}

/** Only the generated current-member slugs resolve; everything else 404s
 * (including the PI slug, whose profile is /dr-ye). */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: MemberProfilePageProps): Promise<Metadata> {
  const { slug } = await params;
  const member = people.find(
    (candidate) => candidate.id === slug && candidate.category !== "pi" && candidate.active
  );
  if (!member) return {};
  return createPageMetadata({
    title: member.name,
    description: `${member.role} at the School of Civil and Environmental Engineering, Nanyang Technological University.`,
    path: `/people/${member.id}`,
  });
}

export default async function MemberProfilePage({
  params,
}: MemberProfilePageProps) {
  const { slug } = await params;
  const member = people.find(
    (candidate) => candidate.id === slug && candidate.category !== "pi" && candidate.active
  );
  if (!member) notFound();

  const hasLinks = Boolean(
    member.email || member.orcid || member.scholar || member.personalWebsite
  );
  const interests = member.researchInterests?.join(" · ");

  return (
    <PageContainer>
      <p className={styles.back}>
        <Link href="/people" className={styles.backLink}>
          ← Back to People
        </Link>
      </p>

      <PageHeader title={member.name} description={member.role} />

      <div className={styles.identity}>
        {member.photo ? (
          <ResponsiveImage
            src={member.photo}
            alt={`Photo of ${member.name}`}
            ratio="5 / 6"
            sizes="(min-width: 641px) 13rem, 9rem"
            className={styles.photo}
          />
        ) : (
          <div
            className={styles.placeholder}
            role="img"
            aria-label={`Photo placeholder for ${member.name}`}
          >
            {getInitials(member.name)}
          </div>
        )}

        <div className={styles.details}>
          {member.nameZh ? (
            <p lang={member.nameLang ?? "zh-Hans"} className={styles.nameZh}>
              {member.nameZh}
            </p>
          ) : null}

          {hasLinks ? (
            <ul className={styles.links} aria-label="Contact and profiles">
              {member.email ? (
                <li>
                  <a href={`mailto:${member.email}`} aria-label={`Email ${member.name}`}>
                    {member.email}
                  </a>
                </li>
              ) : null}
              {member.orcid ? (
                <li>
                  <a
                    href={orcidUrl(member.orcid)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`ORCID profile of ${member.name}`}
                  >
                    ORCID
                  </a>
                </li>
              ) : null}
              {member.scholar ? (
                <li>
                  <a
                    href={member.scholar}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Google Scholar profile of ${member.name}`}
                  >
                    Scholar
                  </a>
                </li>
              ) : null}
              {member.personalWebsite ? (
                <li>
                  <a
                    href={member.personalWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Personal website of ${member.name}`}
                  >
                    Website
                  </a>
                </li>
              ) : null}
            </ul>
          ) : null}
        </div>
      </div>

      {member.bio ? (
        <Section id="biography" title="Biography" headingLevel={2} first>
          <p className={styles.bio}>{member.bio}</p>
        </Section>
      ) : null}

      {interests ? (
        <Section
          id="research-interests"
          title="Research Interests"
          headingLevel={2}
          first={!member.bio}
        >
          <p className={styles.interests}>{interests}</p>
        </Section>
      ) : null}
    </PageContainer>
  );
}
