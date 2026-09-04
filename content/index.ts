/**
 * Content barrel — the single import surface for all site content.
 * Pages and components import from "@/content" instead of individual files,
 * which keeps the data layer swappable (e.g. for a future CMS-backed
 * implementation that preserves these exports).
 */
export { siteConfig, navItems } from "./site";
export type { NavItem } from "./site";
export { people } from "./people";
export { piPerson, piCareer, piEducation, piHonors } from "./pi";
export {
  publications,
  sortedPublications,
  featuredPublications,
} from "./publications";
export { publicationThemes } from "./publication-themes";
export {
  researchAreas,
  researchIntro,
  researchOverviewImage,
} from "./research-areas";
export { projects } from "./projects";
export { newsItems, sortedNews } from "./news";
export { opportunities, phdOpportunity, postdocOpportunity } from "./opportunities";
export type {
  Person,
  CareerRecord,
  EducationRecord,
  HonorRecord,
  Publication,
  ResearchArea,
  Project,
  NewsItem,
  RoleCategory,
  PublicationType,
  ProjectStatus,
  Opportunity,
  OpportunitySection,
  OpportunityRow,
  IntakeBlock,
  ScholarshipGroup,
} from "@/types/content";
