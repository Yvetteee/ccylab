import type { Opportunity, OpportunityRow, OpportunitySection } from "@/types/content";
import styles from "./OpportunityBlock.module.css";

interface OpportunityBlockProps {
  opportunity: Opportunity;
}

/** Render one structured section by its type. */
function SectionContent({ section }: { section: OpportunitySection }) {
  switch (section.type) {
    case "paragraph":
      return <p className={styles.body}>{section.body}</p>;

    case "list":
      return (
        <ul className={styles.list}>
          {section.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );

    case "intakes":
      return (
        <div className={styles.intakes}>
          {section.intro ? (
            <p className={styles.intakeIntro}>{section.intro}</p>
          ) : null}
          {section.items.map((intake) => (
            <div key={intake.label} className={styles.intake}>
              <p className={styles.intakeLabel}>{intake.label}</p>
              <p className={styles.intakePeriod}>{intake.period}</p>
            </div>
          ))}
        </div>
      );

    case "scholarships":
      return (
        <div className={styles.scholarshipGrid}>
          {section.groups.map((group) => (
            <div key={group.label} className={styles.span6}>
              <p className={styles.scholarshipLabel}>{group.label}</p>
              <ul className={styles.scholarshipList}>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
          {section.note ? (
            <p className={`${styles.note} ${styles.span7}`}>{section.note}</p>
          ) : null}
        </div>
      );

    case "apply":
      return (
        <div>
          {section.intro ? <p className={styles.body}>{section.intro}</p> : null}
          <ul className={`${styles.list} ${styles.applyList}`}>
            {section.documents.map((doc) => (
              <li key={doc}>{doc}</li>
            ))}
          </ul>

          <a className={styles.applyButton} href={section.applyUrl}>
            Submit application online
            <span aria-hidden="true">→</span>
          </a>

          <div className={styles.alternative}>
            <p className={styles.alternativeLabel}>Alternative submission</p>
            {section.emailNote ? (
              <p className={styles.emailNote}>{section.emailNote}</p>
            ) : null}
            <dl className={styles.applyMeta}>
              <div className={styles.applyItem}>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${section.email}`}>{section.email}</a>
                </dd>
              </div>
              <div className={styles.applyItem}>
                <dt>Subject</dt>
                <dd className={styles.subject}>{section.subject}</dd>
              </div>
            </dl>
          </div>
        </div>
      );
  }
}

function Section({
  section,
  className,
}: {
  section: OpportunitySection;
  className: string;
}) {
  return (
    <div className={`${styles.section} ${className}`}>
      <h3 className={styles.sectionTitle}>{section.heading}</h3>
      <SectionContent section={section} />
    </div>
  );
}

/**
 * Placement of a section inside the shared 12-column grid.
 * - two-section rail row (PhD): main 1-9, rail 9-13
 * - two-section columns row (Postdoc): both 1-7 / 7-13
 * - single-section rows: full-width scholarships (1-13) or 1-9 otherwise
 */
function spanClass(row: OpportunityRow, section: OpportunitySection): string {
  if (row.sections.length > 1) {
    if (row.layout === "columns") return styles.span6;
    return section === row.sections[0] ? styles.span8 : styles.span4;
  }
  if (section.type === "scholarships") return styles.span12;
  return styles.span8;
}

/**
 * One opportunity (PhD / Postdoc): introduction plus rows of sections, all
 * laid out on a single 12-column grid so every module shares the same
 * horizontal rhythm. Rendered editorially — no cards, no chips.
 */
export default function OpportunityBlock({ opportunity }: OpportunityBlockProps) {
  return (
    <div className={styles.grid}>
      <p className={`${styles.intro} ${styles.span8}`}>
        {opportunity.introduction}
      </p>

      {opportunity.rows.map((row, i) =>
        row.sections.map((section) => (
          <Section
            key={`${i}-${section.heading}`}
            section={section}
            className={spanClass(row, section)}
          />
        ))
      )}
    </div>
  );
}
