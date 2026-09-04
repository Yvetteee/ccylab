import type { ReactNode } from "react";
import styles from "./ChipList.module.css";

interface ChipListProps {
  items: ReactNode[];
  /** Accessible label for the list (omitted when not needed). */
  label?: string;
  className?: string;
}

/**
 * Small labelled list of chips (keywords, interests, tags). Shared by several
 * content cards to avoid repeating the same list markup and styles.
 */
export default function ChipList({ items, label, className }: ChipListProps) {
  return (
    <ul
      className={`${styles.list}${className ? ` ${className}` : ""}`}
      aria-label={label}
    >
      {items.map((item, index) => (
        <li key={index} className={styles.chip}>
          {item}
        </li>
      ))}
    </ul>
  );
}
