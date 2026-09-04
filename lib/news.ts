import type { NewsItem } from "@/types/content";

export interface NewsYearGroup {
  year: number;
  items: NewsItem[];
}

/**
 * Group news by year (newest first within each year), newest years first.
 * The News page renders one chronology per year.
 */
export function groupNewsByYear(items: NewsItem[]): NewsYearGroup[] {
  const sorted = [...items].sort((a, b) => b.date.localeCompare(a.date));
  const byYear = new Map<number, NewsItem[]>();

  for (const item of sorted) {
    const year = new Date(`${item.date}T00:00:00`).getFullYear();
    const list = byYear.get(year) ?? [];
    list.push(item);
    byYear.set(year, list);
  }

  return [...byYear.entries()].map(([year, items]) => ({ year, items }));
}
