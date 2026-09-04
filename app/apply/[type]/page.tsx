import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ApplicationForm from "@/components/apply/ApplicationForm";
import PageContainer from "@/components/ui/PageContainer";
import PageHeader from "@/components/ui/PageHeader";
import { phdOpportunity, postdocOpportunity } from "@/content/opportunities";
import { createApplyMetadata } from "@/lib/metadata";
import type { Opportunity } from "@/types/content";
import styles from "./page.module.css";

const opportunities: Record<string, Opportunity> = {
  phd: phdOpportunity,
  postdoc: postdocOpportunity,
};

export function generateStaticParams() {
  return [{ type: "phd" }, { type: "postdoc" }];
}

const PAGE_TITLES: Record<string, string> = {
  phd: "PhD Application",
  postdoc: "Postdoctoral Application",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;
  const opportunity = opportunities[type];
  if (!opportunity) return {};
  return createApplyMetadata({
    title: PAGE_TITLES[type],
    description: `Apply online for the ${opportunity.title} position in the research group.`,
  });
}

/**
 * Online application form. Intentionally NOT in the navigation, sitemap or
 * search index — the only entry point is the "Submit application online"
 * button on the Join Us page (`/join#phd`, `/join#postdoc`).
 */
export default async function ApplyPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const opportunity = opportunities[type];
  if (!opportunity) return notFound();

  return (
    <PageContainer>
      <div className={styles.header}>
        <Link className={styles.back} href={`/join#${type}`}>
          ← Back to {opportunity.title}
        </Link>

        <PageHeader
          title={PAGE_TITLES[type]}
          description="Please complete the form below and upload your application materials as a single PDF."
        />
      </div>

      <div className={styles.formWrap}>
        <ApplicationForm opportunity={opportunity} />
      </div>
    </PageContainer>
  );
}
