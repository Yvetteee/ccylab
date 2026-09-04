import type { Project } from "@/types/content";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  project: Project;
  /** Resolve related research area ids to titles for display. */
  relatedAreaTitles?: (ids: string[]) => string[];
}

/**
 * Project entry — structured but borderless: status + time span as text,
 * title, summary, and labelled Funding / Research area lines. No box, no
 * badge.
 */
export default function ProjectCard({
  project,
  relatedAreaTitles,
}: ProjectCardProps) {
  const years =
    project.endYear && project.endYear !== project.startYear
      ? `${project.startYear}–${project.endYear}`
      : project.endYear
        ? `${project.startYear}`
        : `${project.startYear}–`;

  const areaTitles = relatedAreaTitles?.(project.relatedResearchAreas ?? []);

  return (
    <article id={project.id} className={styles.card}>
      <p className={styles.status}>
        {project.status.toUpperCase()} · {years}
      </p>
      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.summary}>{project.summary}</p>

      {project.funding ? (
        <p className={styles.meta}>
          <span className={styles.label}>Funding</span> {project.funding}
        </p>
      ) : null}
      {areaTitles?.length ? (
        <p className={styles.meta}>
          <span className={styles.label}>Research area</span>{" "}
          {areaTitles.join(", ")}
        </p>
      ) : null}
    </article>
  );
}
