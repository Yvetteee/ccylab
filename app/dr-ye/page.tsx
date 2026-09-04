import PageContainer from "@/components/ui/PageContainer";
import PageHeader from "@/components/ui/PageHeader";
import DrYeProfile from "@/components/content/DrYeProfile";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Dr. Ye",
  description:
    "Academic career, education and honors of Chunchun Ye, Nanyang Assistant Professor in the School of Civil and Environmental Engineering at Nanyang Technological University.",
  path: "/dr-ye",
});

/**
 * Dr. Ye — standalone PI profile (Variant B). Same page grammar as the other
 * top-level pages (PageContainer + PageHeader + one h1); the profile body is
 * DrYeProfile, sharing its content with the People PI spotlight through
 * content/pi.ts. Variant A (PI inside /people) is untouched.
 */
export default function DrYePage() {
  return (
    <PageContainer>
      <PageHeader title="Dr. Ye" description="Principal Investigator" />
      <DrYeProfile />
    </PageContainer>
  );
}
