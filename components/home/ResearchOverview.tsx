import Link from "next/link";
import PageContainer from "@/components/ui/PageContainer";
import HomeSection from "./HomeSection";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import {
  researchAreas,
  researchIntro,
  researchOverviewImage,
} from "@/content";
import styles from "./ResearchOverview.module.css";

/**
 * Research overview — a compact, text-first home summary. The detailed
 * scientific images belong on /research (they are not repeated here): this
 * section uses ONE overview image plus the three real directions as concise
 * editorial lines, then hands off to /research. No card grid, no repeated
 * per-area figures.
 */
export default function ResearchOverview() {
  // Optional home section: hide it entirely when there is nothing to show.
  if (researchAreas.length === 0) return null;

  return (
    <HomeSection
      id="research"
      kicker="What we study"
      title="Our Research"
      className={styles.first}
    >
      <PageContainer width="standard" className={styles.overviewWrap}>
        <ResponsiveImage
          src={researchOverviewImage}
          alt="Research overview — porous materials and membrane technologies"
          ratio="2.94 / 1"
          fit="contain"
          sizes="100vw"
        />
      </PageContainer>

      <PageContainer width="standard" className={styles.ledeWrap}>
        <p className={styles.lede}>{researchIntro}</p>
      </PageContainer>

      <PageContainer width="standard" className={styles.listWrap}>
        <ol className={styles.list}>
          {researchAreas.slice(0, 3).map((area, i) => (
            <li key={area.id} className={styles.item}>
              <p className={styles.index}>{String(i + 1).padStart(2, "0")}</p>
              <h3 className={styles.title}>{area.title}</h3>
              <p className={styles.desc}>{area.shortDescription}</p>
              <p className={styles.link}>
                <Link href={`/research#${area.id}`}>Explore →</Link>
              </p>
            </li>
          ))}
        </ol>
      </PageContainer>

      <PageContainer width="standard" className={styles.allLink}>
        <Link href="/research">View all research →</Link>
      </PageContainer>
    </HomeSection>
  );
}
