import type { ReactNode } from "react";
import PageContainer from "@/components/ui/PageContainer";
import SectionHeading from "@/components/ui/SectionHeading";
import styles from "./HomeSection.module.css";

interface HomeSectionProps {
  id: string;
  kicker?: string;
  title: string;
  /** Short supporting line under the title (rendered via SectionHeading). */
  description?: string;
  /** surface renders a full-bleed background band instead of a divider. */
  tone?: "plain" | "surface";
  align?: "left" | "center";
  /** Width of the heading container. */
  headingWidth?: "narrow" | "standard" | "wide";
  children: ReactNode;
  className?: string;
}

/**
 * Home-only section wrapper. Unlike the shared <Section> used by subpages,
 * home sections separate themselves with whitespace and background bands —
 * not a stack of border dividers — which is what gives the page its "living
 * group" composition instead of a report-like layout.
 */
export default function HomeSection({
  id,
  kicker,
  title,
  description,
  tone = "plain",
  align = "left",
  headingWidth = "standard",
  children,
  className,
}: HomeSectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`${styles.section}${tone === "surface" ? ` ${styles.surface}` : ""}${
        className ? ` ${className}` : ""
      }`}
    >
      <PageContainer width={headingWidth} className={styles.heading}>
        <SectionHeading
          id={headingId}
          level={2}
          title={title}
          kicker={kicker}
          className={align === "center" ? styles.centered : undefined}
        >
          {description}
        </SectionHeading>
      </PageContainer>
      {children}
    </section>
  );
}
