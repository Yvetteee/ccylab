import type { Person, RoleCategory } from "@/types/content";

export interface PersonGroup {
  category: RoleCategory;
  label: string;
  members: Person[];
}

/** Display labels for each role category. */
export const CATEGORY_LABELS: Record<RoleCategory, string> = {
  pi: "Principal Investigator",
  postdoc: "Research Fellow",
  assistant: "Research Assistants",
  phd: "PhD Students",
  master: "Master Students",
  visiting: "Visiting Researchers",
  alumni: "Alumni",
};

/**
 * Stable display order. The People page renders one section per non-empty
 * group in this order; dormant groups (master / visiting / alumni) simply
 * stay hidden until real members exist.
 */
const CATEGORY_ORDER: RoleCategory[] = [
  "pi",
  "postdoc",
  "assistant",
  "phd",
  "master",
  "visiting",
  "alumni",
];

/**
 * Group people by role category, in a stable display order, omitting empty
 * categories. Filters to active members only (inactive members are data
 * retained for reference but not shown on listing pages). The People page
 * renders one section per non-empty group, so new roles appear automatically
 * as data is added.
 */
export function groupPeopleByCategory(people: Person[]): PersonGroup[] {
  return CATEGORY_ORDER.map((category) => ({
    category,
    label: CATEGORY_LABELS[category],
    members: people
      .filter((p) => p.category === category && p.active !== false)
      .sort((a, b) => (a.order ?? 999) - (b.order ?? 999)),
  })).filter((group) => group.members.length > 0);
}
