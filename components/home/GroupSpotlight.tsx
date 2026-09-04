import Link from "next/link";
import PageContainer from "@/components/ui/PageContainer";
import HomeSection from "./HomeSection";
import styles from "./GroupSpotlight.module.css";

/**
 * The Group — a compact text-first section: one coherent prose block, then a
 * link to /people. There is no authorised real group photograph yet, so no
 * placeholder image is rendered.
 */
export default function GroupSpotlight() {
  return (
    <HomeSection
      id="group"
      kicker="Who we are"
      title="The Group"
      tone="surface"
      headingWidth="standard"
    >
      <PageContainer width="standard" className={styles.body}>
        <div className={styles.block}>
          <p className={styles.lede}>
            Research is a team effort. We are a growing and welcoming team of
            materials chemists and membrane engineers at NTU, bringing together
            diverse perspectives to develop porous materials and membrane
            technologies for energy and the environment, while learning from
            one another and shaping new ideas together.
          </p>
          <p className={styles.link}>
            <Link href="/people">Meet the group →</Link>
          </p>
        </div>
      </PageContainer>
    </HomeSection>
  );
}
