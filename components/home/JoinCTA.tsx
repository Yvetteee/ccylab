import Link from "next/link";
import PageContainer from "@/components/ui/PageContainer";
import HomeSection from "./HomeSection";
import { opportunities } from "@/content";
import styles from "./JoinCTA.module.css";

/**
 * Join the Group — a restrained, academic invitation in a narrow centred
 * block. The core sentence and CTA stay stable; only the list of currently
 * open roles is derived from the opportunities data, and it is omitted when
 * there are no openings (the CTA never depends on opportunities[0]).
 */
export default function JoinCTA() {
  const openings = opportunities.map((o) => ({ id: o.id, title: o.title }));

  return (
    <HomeSection
      id="join"
      title="Join the Group"
      align="center"
      headingWidth="narrow"
    >
      <PageContainer width="narrow" className={styles.body}>
        <p className={styles.text}>
          We welcome prospective PhD students and postdoctoral researchers
          interested in materials, membranes and advanced separation
          technologies.
        </p>
        {openings.length ? (
          <p className={styles.openings}>
            Currently open:{" "}
            {openings.map((opening, i) => (
              <span key={opening.id}>
                {i > 0 ? " · " : ""}
                <Link href={`/join#${opening.id}`}>{opening.title}</Link>
              </span>
            ))}
          </p>
        ) : null}
        <p className={styles.link}>
          <Link href="/join">View opportunities →</Link>
        </p>
      </PageContainer>
    </HomeSection>
  );
}
