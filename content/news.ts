import type { NewsItem } from "@/types/content";

/**
 * Real lab news (source: Ye Group site index, verified 2026-09-02).
 * Sorted newest-first for the News page and home preview.
 *
 * DATE PRECISION: the legacy source only records month/year for most items,
 * never a specific day. The `date` field below is a TECHNICAL SORT SURROGATE
 * only (newest-first ordering) — it must not be displayed. `displayDate`
 * carries the verified precision shown to visitors (e.g. "Apr 2026"); where a
 * genuine day exists (A New Chapter in NTU) it is kept.
 */
export const newsItems: NewsItem[] = [
  {
    id: "news-hiring",
    title: "We Are Hiring — PhD Students and Postdoctoral Researchers",
    date: "2026-05-01",
    displayDate: "May 2026",
    summary:
      "We are hiring PhD students and Postdoctoral Researchers! Join us to explore cutting-edge research in materials, membranes, and sustainable solutions for energy and the environment.",
    category: "Openings",
    image: "/images/legacy/labnews1.png",
  },
  {
    id: "news-kaiping-2026",
    title: "Apr 2026: Welcome Dr. Kaiping Zhu to the group",
    date: "2026-04-15",
    displayDate: "Apr 2026",
    summary:
      "We are delighted to welcome Dr. Kaiping Zhu to the group as our first Postdoc researcher. With Kaiping joining us, we are now officially forming the smallest unit of a research group!",
    category: "Team",
    image: "/images/legacy/labnewsMay1.jpg",
  },
  {
    id: "news-kim-2026",
    title: "Feb 2026: Welcome Kim (Jiayi) Wu to the group",
    date: "2026-02-15",
    displayDate: "Feb 2026",
    summary:
      "Welcome Kim (Jiayi) Wu joining The Ye Lab as a Research Associate!",
    category: "Team",
    image: "/images/legacy/labnewsMay2.jpg",
  },
  {
    id: "news-christine-2026",
    title: "Jan 2026: Welcome our first PhD student Christine (Sunho)",
    date: "2026-01-15",
    displayDate: "Jan 2026",
    summary:
      "We are excited to welcome our first PhD student Christine (Sunho) On joining the group!",
    category: "Team",
    image: "/images/legacy/labnewsMay3.jpg",
  },
  {
    id: "news-new-chapter",
    title: "A New Chapter in NTU",
    date: "2025-11-01",
    summary:
      "I'm delighted to share that this November I'll be joining NTU Singapore as an Assistant Professor in Civil and Environmental Engineering, and I look forward to beginning this new chapter.",
    category: "Announcement",
    image: "/images/legacy/labnews2.png",
  },
];

/** Newest-first copy used across the site. */
export const sortedNews = [...newsItems].sort((a, b) =>
  b.date.localeCompare(a.date)
);
