import type { ReactNode } from "react";
import styles from "./PageHeader.module.css";

interface PageHeaderProps {
  title: string;
  /** Optional lede paragraph under the page title. */
  description?: ReactNode;
}

/**
 * Consistent page header: a single h1 + optional description.
 * Every top-level page renders exactly one of these so heading hierarchy
 * stays predictable (h1 → section h2 → card h3).
 */
export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      {description ? <p className={styles.description}>{description}</p> : null}
    </header>
  );
}
