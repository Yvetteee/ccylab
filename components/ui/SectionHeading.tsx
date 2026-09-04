import type { ReactNode } from "react";
import styles from "./SectionHeading.module.css";

interface SectionHeadingProps {
  id?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  title: string;
  /** Small uppercase label rendered above the title. */
  kicker?: string;
  /** Optional supporting text rendered below the heading. */
  children?: ReactNode;
  className?: string;
}

/**
 * Heading + optional kicker and description. Level is configurable so the
 * same component can be used at the top of a page (h1) or inner sections.
 */
export default function SectionHeading({
  id,
  level = 2,
  title,
  kicker,
  children,
  className,
}: SectionHeadingProps) {
  const Tag = `h${level}` as const;

  return (
    <div className={`${styles.wrapper}${className ? ` ${className}` : ""}`}>
      {kicker ? <p className={styles.kicker}>{kicker}</p> : null}
      <Tag
        id={id}
        className={`${styles.title}${level === 1 ? ` ${styles.titleL1}` : ""}`}
      >
        {title}
      </Tag>
      {children ? <p className={styles.description}>{children}</p> : null}
    </div>
  );
}
