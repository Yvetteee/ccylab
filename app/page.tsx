import Hero from "@/components/home/Hero";
import ResearchOverview from "@/components/home/ResearchOverview";
import GroupSpotlight from "@/components/home/GroupSpotlight";
import FeaturedResearch from "@/components/home/FeaturedResearch";
import LatestNews from "@/components/home/LatestNews";
import JoinCTA from "@/components/home/JoinCTA";
import { siteConfig } from "@/content";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  description: siteConfig.description,
  path: "/",
});

/**
 * Home page — one composition, not a stack of generic sections:
 *
 *   Hero (identity text + wide lab photo)
 *   → Our Research (1 main + 2 secondary)
 *   → The Group (full-bleed surface band + very large team photo)
 *   → Featured Research (1 main result + 2 secondary)
 *   → Latest
 *   → Join
 *
 * Each section manages its own container width and background, which is what
 * gives the page its rhythm. Every section reads from the content layer.
 */
export default function HomePage() {
  return (
    <div>
      <Hero />
      <ResearchOverview />
      <GroupSpotlight />
      <FeaturedResearch />
      <LatestNews />
      <JoinCTA />
    </div>
  );
}
