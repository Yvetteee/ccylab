import type { ReactNode } from "react";
import styles from "./PageContainer.module.css";

interface PageContainerProps {
  children: ReactNode;
  /**
   * Container width: narrow (intro text), standard (default), or wide
   * (hero photos, group photo, large scientific figures). Mixing widths is
   * what gives the home page its non-flat composition.
   */
  width?: "narrow" | "standard" | "wide";
  className?: string;
}

export default function PageContainer({
  children,
  width = "standard",
  className,
}: PageContainerProps) {
  const widthClass =
    width === "narrow" ? styles.narrow : width === "wide" ? styles.wide : "";

  return (
    <div
      className={`${styles.container}${widthClass ? ` ${widthClass}` : ""}${
        className ? ` ${className}` : ""
      }`}
    >
      {children}
    </div>
  );
}
