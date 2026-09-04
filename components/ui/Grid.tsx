import type { ReactNode } from "react";
import styles from "./Grid.module.css";

interface GridProps {
  children: ReactNode;
  /** Max column count on wide screens (scales down on small screens). */
  columns?: 2 | 3 | 4;
  className?: string;
}

/**
 * Responsive content grid: 1 column on small screens, growing to the
 * requested column count on wide screens. One place to tune card layout.
 */
export default function Grid({ children, columns = 2, className }: GridProps) {
  // `.grid` already provides the two-column layout at ≥640px, so 2 columns
  // needs no extra class — and undefined must never reach the className.
  const columnClass =
    columns === 3 ? styles.cols3 : columns === 4 ? styles.cols4 : "";

  return (
    <div
      className={[styles.grid, columnClass, className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
