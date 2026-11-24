import Link from "next/link";
import PageContainer from "@/components/ui/PageContainer";
import PageHeader from "@/components/ui/PageHeader";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import Section from "@/components/ui/Section";
import { labMascot } from "@/content";
import { createPageMetadata } from "@/lib/metadata";
import memberStyles from "../[slug]/page.module.css";
import styles from "./page.module.css";

export const metadata = createPageMetadata({
  title: labMascot.name,
  description: "Meet Scone, the Ye Group's Cavapoo and Lab Mascot.",
  path: "/people/scone",
});

export default function SconeProfilePage() {
  return (
    <PageContainer>
      <p className={memberStyles.back}>
        <Link href="/people#lab-mascot" className={memberStyles.backLink}>
          ← Back to People
        </Link>
      </p>

      <PageHeader
        title={labMascot.name}
        description={
          <>
            {labMascot.breed} |{" "}
            <time dateTime={labMascot.birthDate}>
              Born {labMascot.birthDateLabel}
            </time>
          </>
        }
      />

      <div className={styles.profile}>
        <ResponsiveImage
          src={labMascot.offDutyPhoto}
          alt={labMascot.offDutyPhotoAlt}
          ratio="3 / 4"
          fit="contain"
          sizes="(min-width: 384px) 22rem, calc(100vw - 2rem)"
          className={`${memberStyles.photo} ${styles.portrait}`}
        />
        <div className={styles.introduction}>
          {labMascot.introduction.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <Section id="research-interests" title="Research Interests" first>
        <p className={memberStyles.interests}>
          {labMascot.researchInterests.join(" · ")}
        </p>
        <p className={styles.closingRemark}>
          <em>{labMascot.closingRemark}</em>
        </p>
      </Section>
    </PageContainer>
  );
}
