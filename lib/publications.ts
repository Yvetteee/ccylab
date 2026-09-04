import type { Publication, PublicationTheme } from "@/types/content";

/** Sort publications by year, newest (desc) or oldest (asc) first. */
export function sortPublications(
  publications: Publication[],
  order: "desc" | "asc" = "desc"
): Publication[] {
  return [...publications].sort((a, b) =>
    order === "desc" ? b.year - a.year : a.year - b.year
  );
}

export interface YearGroup {
  year: number;
  items: Publication[];
}

/**
 * Group publications by year in descending order, preserving the given
 * order within each year. The Publications page renders one section per year.
 */
export function groupPublicationsByYear(
  publications: Publication[]
): YearGroup[] {
  const sorted = sortPublications(publications);
  const byYear = new Map<number, Publication[]>();

  for (const pub of sorted) {
    const list = byYear.get(pub.year) ?? [];
    list.push(pub);
    byYear.set(pub.year, list);
  }

  return [...byYear.entries()].map(([year, items]) => ({ year, items }));
}

export interface ThemeGroup {
  theme: PublicationTheme;
  items: Publication[];
}

/**
 * Group publications by legacy research theme. Themes render in the given
 * order; publications within a theme render in the order their ids appear in
 * the theme config. Every mapped publication is included exactly once; a
 * publication id that does not exist is skipped (never duplicated, never
 * silently lost — the caller can diff against the full list). Unmapped
 * publications are collected for review rather than dropped.
 */
export function groupPublicationsByTheme(
  publications: Publication[],
  themes: PublicationTheme[]
): { groups: ThemeGroup[]; unmapped: Publication[] } {
  const byId = new Map(publications.map((pub) => [pub.id, pub]));
  const placed = new Set<string>();

  const groups = themes.map((theme) => {
    const items = theme.publicationIds
      .map((id) => byId.get(id))
      .filter((pub): pub is Publication => {
        if (!pub) return false;
        if (placed.has(pub.id)) return false; // guard: never duplicate
        placed.add(pub.id);
        return true;
      });
    return { theme, items };
  });

  const unmapped = publications.filter((pub) => !placed.has(pub.id));
  return { groups, unmapped };
}
