import PageContainer from "@/components/ui/PageContainer";
import PageHeader from "@/components/ui/PageHeader";
import FeaturedNews from "@/components/content/FeaturedNews";
import NewsRow from "@/components/content/NewsRow";
import { sortedNews } from "@/content";
import { groupNewsByYear } from "@/lib/news";
import { createPageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export const metadata = createPageMetadata({
  title: "News",
  description:
    "Announcements, awards and recent activity from the research group.",
  path: "/news",
});

/**
 * News — an editorial archive, not a card grid. The most recent item is
 * featured large (photo + title + summary), the rest are grouped by year in
 * a chronology of date + category + title rows.
 */
export default function NewsPage() {
  const [featured, ...rest] = sortedNews;
  const yearGroups = groupNewsByYear(rest);

  return (
    <PageContainer>
      <PageHeader
        title="News"
        description="Announcements and recent activity from the group."
      />

      {sortedNews.length === 0 ? (
        <p className={styles.empty}>No news is available at this time.</p>
      ) : (
        <>
          {featured ? (
            <div className={styles.featured}>
              <FeaturedNews news={featured} />
            </div>
          ) : null}

          {yearGroups.map((group) => (
            <section
              key={group.year}
              id={`year-${group.year}`}
              aria-labelledby={`year-${group.year}-heading`}
              className={styles.yearSection}
            >
              <h2 id={`year-${group.year}-heading`} className={styles.yearTitle}>
                {group.year}
              </h2>
              <ol className={styles.rows}>
                {group.items.map((news) => (
                  <NewsRow key={news.id} news={news} />
                ))}
              </ol>
            </section>
          ))}
        </>
      )}
    </PageContainer>
  );
}
