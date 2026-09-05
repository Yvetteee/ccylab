import type {
  CareerRecord,
  EducationRecord,
  HonorRecord,
  Person,
} from "@/types/content";

/**
 * Shared Chunchun Ye (PI) content — the single source behind the PI's
 * presentations: DrYeProfile on /dr-ye (Variant B, the full academic
 * profile) and any PI-related views built on the same record.
 *
 * The structured academic record below is recovered verbatim from the legacy
 * PI page (https://www.ccylab.com/pi.html, cross-checked against the local
 * legacy source on 2026-09-03): career periods keep the legacy "2024 – 2025"
 * spacing, education periods the legacy "2017–2021" spacing, and award
 * organization abbreviations / parentheticals are preserved as sourced.
 */
export const piCareer: CareerRecord[] = [
  {
    period: "2025 – Present",
    role: "Nanyang Assistant Professor",
    unit: "School of Civil and Environmental Engineering",
    institution: "Nanyang Technological University",
  },
  {
    period: "2024 – 2025",
    role: "Research Associate",
    unit: "School of Engineering & Materials Science",
    institution: "Queen Mary University of London",
  },
  {
    period: "2022 – 2025",
    role: "Research Associate",
    unit: "School of Chemistry",
    institution: "The University of Edinburgh",
  },
];

export const piEducation: EducationRecord[] = [
  {
    period: "2017–2021",
    degree: "Ph.D. in Chemistry",
    institution: "The University of Edinburgh",
  },
  {
    period: "2014–2017",
    degree: "M.Sc. in Polymer Chemistry and Physics",
    institution: "Zhejiang University",
  },
  {
    period: "2010–2014",
    degree: "B.Eng. in Materials Science and Engineering",
    institution: "Jilin University",
  },
];

export const piHonors: HonorRecord[] = [
  {
    year: "2024",
    title: "Researcher Collaborations Grants",
    organization: "The Royal Society of Chemistry (RSC)",
  },
  {
    year: "2023",
    title: "Materials Chemistry Horizon Prize: Stephanie L. Kwolek Prize (team)",
    organization: "RSC",
  },
  {
    year: "2023",
    title: "Young Academic Award",
    organization: "The European Membrane Society (EMS)",
  },
  {
    year: "2023",
    title: "Bronze Award in STEM for Britain",
    organization: "UK House of Commons",
  },
  {
    year: "2020",
    title: "Postgraduate Travel Award",
    organization: "EMS",
  },
  {
    year: "2019",
    title: "Researcher Mobility Grant",
    organization: "RSC",
  },
  {
    year: "2016",
    title: "Henkel Membrane Scholarship",
    organization: "Zhejiang University",
  },
  {
    year: "2015",
    title: "Outstanding Graduate Award",
    organization: "Zhejiang University",
  },
  {
    year: "2014",
    title: "First Prize Scholarship",
    organization: "Jilin University",
  },
  {
    year: "2013",
    title: "Undergraduate National Scholarship of China",
    context: "highest UG/PG award, Ministry of Education",
  },
];

/**
 * The PI as a Person — identical to the record previously inlined in
 * people.ts, except `education` is derived from piEducation so the two
 * presentations cannot drift.
 */
export const piPerson: Person = {
  id: "chunchun-ye",
  name: "Chunchun Ye",
  nameZh: "叶纯纯",
  role: "Principal Investigator",
  category: "pi",
  photo: "/images/legacy/chunchun.JPG",
  researchInterests: [
    "Advanced Porous Materials",
    "Polymer Membranes",
    "Energy Storage & Separation",
  ],
  education: piEducation.map(
    (entry) => `${entry.degree}, ${entry.institution} (${entry.period})`
  ),
  email: "chunchun.ye@ntu.edu.sg",
  scholar: "https://scholar.google.com/citations?hl=en&user=Rw3Y8B8AAAAJ",
  orcid: "0000-0003-0171-6468",
  bio: "Chunchun Ye is a Nanyang Assistant Professor in the School of Civil and Environmental Engineering at Nanyang Technological University. Her research focuses on advanced porous materials and membrane technologies to address pressing energy and environmental challenges — spanning materials design, membrane engineering, and electrochemical energy and separation applications.",
  /**
   * PI signature quotation (D-C) — restored in its signature role only,
   * rebuilt as a restrained design-system pull-quote (not the legacy
   * grey box). Legacy-main verified text (Han Yu, On the Teacher).
   */
  quote: {
    text: "闻道有先后，术业有专攻，如是而已",
    translation:
      "Knowledge unfolds over time; expertise is shaped by focus. Such is the way of scholarship.",
    source: "——韩愈《师说》唐 (Han Yu, On the Teacher, Tang Dynasty)",
  },
  order: 1,
  active: true,
};
