import type { Metadata } from "next";
import PageContainer from "@/components/ui/PageContainer";
import PageHeader from "@/components/ui/PageHeader";
import { createPageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

/**
 * Noindex overrides the layout's environment-controlled robots: the route is
 * kept for future reuse but holds no real content yet, so it must never
 * surface in search results even after SITE_INDEXABLE flips to true.
 * Remove this override when real project content ships.
 */
export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Projects",
    description:
      "Project information from The Ye Group will be added as the group develops.",
    path: "/projects",
  }),
  robots: { index: false, follow: false },
};

/**
 * Projects — intentionally minimal for now. There is no authoritative list
 * of real funded/collaborative projects to publish yet, and the earlier
 * placeholder project cards were fictional AI/ML content that must not be
 * presented as Ye Group research. The route is kept for future reuse; until
 * real projects exist it shows a restrained availability note. The Project
 * data model and components remain in the codebase for when real content is
 * ready.
 */
export default function ProjectsPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Projects"
        description="Project information will be added as the group develops."
      />
      <p className={styles.note}>
        Project information will be added as the group develops.
      </p>
    </PageContainer>
  );
}
