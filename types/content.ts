/**
 * Content types for the research group website.
 *
 * All site content flows through these types. Components consume typed data
 * objects — never hard-coded research content. This keeps the door open for
 * a future CMS: replace the data provider while keeping the same shapes.
 */

/** Broad role groups used for grouping the People page by section. */
export type RoleCategory =
  | "pi"
  | "postdoc"
  | "assistant"
  | "phd"
  | "master"
  | "visiting"
  | "alumni";

export interface Person {
  id: string;
  name: string;
  /** Chinese name (legacy grammar: shown beside the romanised name). */
  nameZh?: string;
  /** BCP-47 language of `nameZh` — defaults to "zh-Hans"; e.g. "ko" for a
   * Korean native name. Kept as a tiny optional field, not a localisation
   * system. */
  nameLang?: string;
  /** Human-readable role label, e.g. "PhD Student". */
  role: string;
  /** Grouping key — a section is rendered only when members exist. */
  category: RoleCategory;
  /** Optional research sub-group / lab division. */
  group?: string;
  photo?: string;
  researchInterests?: string[];
  education?: string[];
  email?: string;
  /** Google Scholar profile URL. */
  scholar?: string;
  /** ORCID identifier (bare or full URL). */
  orcid?: string;
  personalWebsite?: string;
  bio?: string;
  /**
   * PI signature quotation (D-C): restored in its signature role only —
   * a bilingual quote rendered as a restrained design-system pull-quote.
   */
  quote?: {
    /** Original language text (Chinese). */
    text: string;
    /** English translation. */
    translation?: string;
    /** Source attribution, e.g. "韩愈《师说》唐". */
    source?: string;
  };
  /** Lower number = higher position in a list. */
  order?: number;
  /** Alumni and other inactive members can be kept in data. */
  active: boolean;
}

/* ---- Structured PI academic record (standalone /dr-ye page) ---- */

/** One position held by the PI, displayed as period | role/unit/institution. */
export interface CareerRecord {
  /** Display period exactly as sourced, e.g. "2024 – 2025". */
  period: string;
  role: string;
  /** School / department within the institution. */
  unit: string;
  institution: string;
}

/** One completed degree, same record grammar as CareerRecord. */
export interface EducationRecord {
  period: string;
  degree: string;
  institution: string;
}

/** One honour / award in the awards index. */
export interface HonorRecord {
  /** Display year, e.g. "2024". */
  year: string;
  title: string;
  /** Awarding organization as sourced (abbreviations preserved). */
  organization?: string;
  /** Source parenthetical context (team designation, ranking note). */
  context?: string;
}

export type PublicationType =
  | "journal"
  | "conference"
  | "preprint"
  | "thesis"
  | "other";

export interface Publication {
  id: string;
  title: string;
  /** Display-ready author list; may include "et al." already. */
  authors: string[];
  /**
   * Journal / conference / venue name. Named `venue` (not `journal`) because
   * conference papers, preprints and books share the same slot.
   */
  venue: string;
  year: number;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  url?: string;
  image?: string;
  type: PublicationType;
  featured?: boolean;
  keywords?: string[];
}

export interface ResearchArea {
  id: string;
  title: string;
  shortDescription: string;
  /** Longer description used on the Research page. */
  description: string;
  /**
   * Optional structured points for the Research page. When present, the long
   * `description` reads as the intro paragraph and each point renders as a
   * bold label + explanatory line (legacy research.html hierarchy).
   */
  points?: Array<{ label: string; text: string }>;
  image?: string;
  keywords: string[];
  /** ids of related projects. */
  relatedProjects?: string[];
  featured?: boolean;
}

/** A thematic grouping of publications (legacy theme-first archive). */
export interface PublicationTheme {
  id: string;
  /** Short code, e.g. "1A". */
  code: string;
  title: string;
  /** One-line descriptor of what the theme covers. */
  descriptor: string;
  /** Publication ids in display order (years stay on each citation). */
  publicationIds: string[];
}

export type ProjectStatus = "active" | "completed" | "upcoming";

export interface Project {
  id: string;
  title: string;
  summary: string;
  description?: string;
  status: ProjectStatus;
  startYear: number;
  endYear?: number;
  collaborators?: string[];
  funding?: string;
  image?: string;
  /** ids of related research areas — the conceptual link to ResearchArea. */
  relatedResearchAreas?: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  /**
   * ISO sort date (YYYY-MM-DD). TECHNICAL SORT SURROGATE ONLY — the legacy
   * source rarely records an exact day, so this value must NOT be shown to
   * visitors. When only month/year is verified, provide `displayDate`.
   */
  date: string;
  /**
   * Display label with the precision actually supported by the source, e.g.
   * "Apr 2026". When present it overrides `formatDate(date)` everywhere.
   */
  displayDate?: string;
  summary: string;
  /** Long-form body, reserved for a future `/news/[slug]` detail page. */
  content?: string;
  image?: string;
  category: string;
  /** Link out to an external announcement when there is no local detail page. */
  externalUrl?: string;
}

/* ---- Opportunities (Join Us) ---- */

export interface IntakeBlock {
  /** e.g. "August Intake". */
  label: string;
  /** e.g. "1 October – 31 January". */
  period: string;
}

export interface ScholarshipGroup {
  label: string;
  items: string[];
}

type OpportunitySectionBase = { heading: string };

/**
 * Join Us content is structured so the page renders it without hard-coding:
 * each section is one of a small set of block types (paragraph, list,
 * application intakes, scholarship columns, apply instructions).
 */
export type OpportunitySection =
  | (OpportunitySectionBase & { type: "paragraph"; body: string })
  | (OpportunitySectionBase & { type: "list"; items: string[] })
  | (OpportunitySectionBase & {
      type: "intakes";
      /** Optional lead-in line, e.g. "Two intakes each year". */
      intro?: string;
      items: IntakeBlock[];
    })
  | (OpportunitySectionBase & {
      type: "scholarships";
      groups: ScholarshipGroup[];
      /** Concluding emphasis note below the groups. */
      note?: string;
    })
  | (OpportunitySectionBase & {
      type: "apply";
      intro?: string;
      documents: string[];
      /** Online application form URL (primary channel). */
      applyUrl: string;
      email: string;
      /** Email subject line, shown copyable. */
      subject: string;
      /** Short note clarifying email is the fallback channel. */
      emailNote?: string;
    });

export interface OpportunityRow {
  /**
   * Two-section row layout:
   * - "rail" (default): main column + compact information rail (PhD).
   * - "columns": two long-form editorial columns of equal weight (Postdoc).
   */
  layout?: "rail" | "columns";
  /** One section (full width) or two sections (two columns on desktop). */
  sections: OpportunitySection[];
}

export interface Opportunity {
  id: string;
  title: string;
  introduction: string;
  /** Rows of one or two sections; a two-section row lays out in two columns. */
  rows: OpportunityRow[];
}
