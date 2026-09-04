import PageContainer from "@/components/ui/PageContainer";
import PageHeader from "@/components/ui/PageHeader";
import JoinOpportunities from "@/components/content/JoinOpportunities";
import { opportunities } from "@/content";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Join Us",
  description:
    "Opportunities to study and work with the research group — PhD and postdoctoral positions.",
  path: "/join",
});

/**
 * Join Us — two editorial tabs (PhD / Postdoc) rendered from the structured
 * opportunities data. No full recruitment-document dump: the tabs keep the
 * page short, and the two-column rows keep desktop from becoming a single
 * narrow column. Contact details live on the Contact page / footer.
 */
export default function JoinPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Join Us"
        description="Opportunities to study and work with the group."
      />
      <JoinOpportunities opportunities={opportunities} />
    </PageContainer>
  );
}
