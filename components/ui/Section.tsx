import type { ReactNode } from "react";
import SectionHeading from "./SectionHeading";
import styles from "./Section.module.css";

interface SectionProps {
  id?: string;
  /** Heading level for this section's title (h2 by default). */
  headingLevel?: 1 | 2 | 3 | 4;
  title: string;
  /** Small uppercase label rendered above the title (editorial kicker). */
  kicker?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  /**
   * First section on a page: removes the top border that separates sections,
   * so it sits directly under the page header.
   */
  first?: boolean;
}

/**
 * Semantic page section: a labelled <section> with a consistent heading.
 * The heading id is auto-generated so the section can be referenced via
 * aria-labelledby for assistive technology.
 */
export default function Section({
  id,
  headingLevel = 2,
  title,
  kicker,
  description,
  children,
  className,
  first = false,
}: SectionProps) {
  const headingId = id ? `${id}-heading` : undefined;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`${styles.section}${first ? ` ${styles.first}` : ""}${
        className ? ` ${className}` : ""
      }`}
    >
      <SectionHeading id={headingId} level={headingLevel} title={title} kicker={kicker}>
        {description}
      </SectionHeading>
      {children}
    </section>
  );
}
