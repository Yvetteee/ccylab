import PageContainer from "@/components/ui/PageContainer";
import PageHeader from "@/components/ui/PageHeader";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import { researchAreas, researchIntro, researchOverviewImage } from "@/content";
import { createPageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export const metadata = createPageMetadata({
  title: "Research",
  description:
    "We design porous materials and develop membrane technologies to tackle pressing challenges in energy and the environment — from materials to membranes to real-world applications.",
  path: "/research",
});

/**
 * Research — the group's scientific narrative (legacy research.html).
 * A short intro + overview image, then three sections telling one continuous
 * story: MATERIAL → MEMBRANE → APPLICATION. Deliberately un-decorated:
 * relationship and continuity matter more than editorial complexity — no
 * cards, no pill labels, no large empty bands.
 */
export default function ResearchPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Research"
        description={researchIntro}
      />

      <div className={styles.overview}>
        <ResponsiveImage
          src={researchOverviewImage}
          alt="Research overview — porous materials and membrane technologies"
          ratio="2.94 / 1"
          fit="contain"
          sizes="100vw"
        />
      </div>

      {researchAreas.length === 0 ? (
        <p className={styles.empty}>No research areas are available at this time.</p>
      ) : (
        researchAreas.map((area, index) => (
          <section
            key={area.id}
            id={area.id}
            aria-labelledby={`${area.id}-heading`}
            className={styles.area}
          >
            <div className={`${styles.row}${index % 2 ? ` ${styles.flip}` : ""}`}>
              <ResponsiveImage
                src={area.image ?? "/images/legacy/research1.jpeg"}
                alt={`${area.title} — Ye Group research`}
                ratio="1 / 1"
                sizes="(min-width: 900px) 40vw, 100vw"
              />
              <div className={styles.text}>
                <p className={styles.index}>
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 id={`${area.id}-heading`} className={styles.title}>
                  {area.title}
                </h2>
                <p className={styles.question}>{area.shortDescription}</p>
                <p className={styles.description}>{area.description}</p>

                {area.points?.length ? (
                  <ul className={styles.points}>
                    {area.points.map((point) => (
                      <li key={point.label} className={styles.point}>
                        {/* explicit space: JSX strips newline whitespace
                            between the elements, gluing label to text */}
                        <strong className={styles.pointLabel}>
                          {point.label}
                        </strong>{" "}
                        <span className={styles.pointText}>{point.text}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </section>
        ))
      )}
    </PageContainer>
  );
}
