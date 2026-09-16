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
 *
 * HOME VISIBILITY: items marked `showOnHome: false` appear on the News page
 * only and are excluded from the Home Lab News feed.
 */
export const newsItems: NewsItem[] = [
  {
    id: "news-lora-farewell-2026-09",
    title: "A Warm Farewell to Lora",
    date: "2026-09-01",
    displayDate: "Sep 2026",
    summary:
      "We were delighted to have Lora join the Ye Group from Columbia University through the GCF programme. During her time with us, she became part of the group’s research and everyday life in Singapore. We wish her all the best for what comes next and hope she takes home rewarding research experience, new friendships and many good memories.",
    category: "Team",
    image: "/images/news/lora-farewell-2026.jpg",
    showOnHome: false,
  },
  {
    id: "news-group-dinner-2026-08-14",
    title: "Aug 14, 2026: Ye Group Dinner",
    date: "2026-08-14",
    summary:
      "The group enjoyed an evening together over dinner, taking some time to catch up outside the lab.",
    category: "Team",
    image: "/images/news/group-dinner-2026-08-14.jpg",
  },
  {
    id: "news-phd-cohort-2026-08",
    title: "A Warm Welcome to Our New PhD Students",
    date: "2026-08-01",
    displayDate: "Aug 2026",
    summary:
      "We are delighted to welcome Chunlin Zhai, Yongbin Cho, Wenchang Wang, and Jiayu Zhang, who joined the Ye Group as PhD students in August 2026. We look forward to growing, learning, and exploring new ideas together.",
    category: "Team",
    showOnHome: false,
  },
  {
    id: "news-qian-xu-2026-07",
    title: "A Warm Welcome to Qian Xu",
    date: "2026-07-01",
    displayDate: "Jul 2026",
    summary:
      "We are pleased to welcome Qian Xu, who joined the Ye Group as a visiting student in July 2026. We look forward to a rewarding and inspiring time together.",
    category: "Team",
    showOnHome: false,
  },
  {
    id: "news-icom-2026-nams-award",
    title:
      "Dr. Chunchun Ye Receives the NAMS Young Membrane Scientist Award at ICOM 2026",
    date: "2026-07-01",
    displayDate: "Jul 2026",
    summary:
      "We are delighted to share that Dr. Chunchun Ye received the NAMS Young Membrane Scientist Award at ICOM 2026 in San Antonio, Texas. The award recognises early-career contributions to membrane science and technology. During the conference, Dr. Ye presented her research and shared the new chapter of membrane research being built at NTU. It was also a wonderful opportunity to reconnect with colleagues across the membrane community and exchange perspectives on the future of membrane science.",
    category: "Announcement",
    image: "/images/news/icom-2026-nams-award.jpg",
    showOnHome: false,
  },
  {
    id: "news-hiring",
    title: "We Are Hiring — PhD Students and Postdoctoral Researchers",
    date: "2026-05-01",
    displayDate: "May 2026",
    summary:
      "We are hiring PhD students and Postdoctoral Researchers! Join us to explore cutting-edge research in materials, membranes, and sustainable solutions for energy and the environment.",
    category: "Openings",
    image: "/images/news/hiring.png",
  },
  {
    id: "news-kaiping-2026",
    title: "Apr 2026: Welcome Dr. Kaiping Zhu to the group",
    date: "2026-04-15",
    displayDate: "Apr 2026",
    summary:
      "We are delighted to welcome Dr. Kaiping Zhu to the group as our first Postdoc researcher. With Kaiping joining us, we are now officially forming the smallest unit of a research group!",
    category: "Team",
    image: "/images/news/welcome-kaiping.jpg",
  },
  {
    id: "news-kim-2026",
    title: "Feb 2026: Welcome Kim (Jiayi) Wu to the group",
    date: "2026-02-15",
    displayDate: "Feb 2026",
    summary:
      "Welcome Kim (Jiayi) Wu joining The Ye Lab as a Research Associate!",
    category: "Team",
    image: "/images/news/welcome-kim.jpg",
  },
  {
    id: "news-christine-2026",
    title: "Jan 2026: Welcome our first PhD student Christine (Sunho)",
    date: "2026-01-15",
    displayDate: "Jan 2026",
    summary:
      "We are excited to welcome our first PhD student Christine (Sunho) On joining the group!",
    category: "Team",
    image: "/images/news/welcome-christine.jpg",
  },
  {
    id: "news-new-chapter",
    title: "A New Chapter in NTU",
    date: "2025-11-01",
    summary:
      "I'm delighted to share that this November I'll be joining NTU Singapore as an Assistant Professor in Civil and Environmental Engineering, and I look forward to beginning this new chapter.",
    category: "Announcement",
    image: "/images/news/new-chapter.png",
  },
];

/** Newest-first copy used across the site. */
export const sortedNews = [...newsItems].sort((a, b) =>
  b.date.localeCompare(a.date)
);
