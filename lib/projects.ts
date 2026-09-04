import type { Project, ProjectStatus } from "@/types/content";

export interface ProjectStatusGroup {
  status: ProjectStatus;
  label: string;
  items: Project[];
}

const STATUS_ORDER: ProjectStatus[] = ["active", "upcoming", "completed"];

const STATUS_LABELS: Record<ProjectStatus, string> = {
  active: "Active projects",
  upcoming: "Upcoming",
  completed: "Completed",
};

/**
 * Group projects by status (active → upcoming → completed). Empty groups are
 * omitted so pages render only what the data contains.
 */
export function groupProjectsByStatus(projects: Project[]): ProjectStatusGroup[] {
  return STATUS_ORDER.map((status) => ({
    status,
    label: STATUS_LABELS[status],
    items: projects.filter((p) => p.status === status),
  })).filter((group) => group.items.length > 0);
}
