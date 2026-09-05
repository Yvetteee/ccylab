import Link from "next/link";
import PageContainer from "@/components/ui/PageContainer";
import HomeSection from "./HomeSection";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import { sortedNews } from "@/content";
import { newsDateDisplay, newsDateTime } from "@/lib/format";
import styles from "./LatestNews.module.css";

/**
 * Lab News — a living log, not cards: a small news image beside date +
 * headline + summary. Image sits above the text on mobile and to the side on
 * desktop. Dense and un-decorated.
 *
 * TEMPORARY content-density decision: with only a handful of real items, the
 * feed shows ALL current entries (no slice limit). Revisit a "latest N" cut
 * when the news volume actually grows.
 */
export default function LatestNews() {
  // Optional home section: hide it entirely when there are no items.
  if (sortedNews.length === 0) return null;

  return (
    <HomeSection id="news" kicker="What&apos;s happening" title="Lab News">
      <PageContainer width="standard">
        <ol className={styles.list}>
          {sortedNews.map((news) => (
            <li key={news.id} className={styles.item}>
              {news.image ? (
                <div className={styles.media}>
                  <ResponsiveImage
                    src={news.image}
                    alt=""
                    ratio="4 / 3"
                    fit="contain"
                    sizes="(min-width: 1024px) 300px, (min-width: 640px) 248px, 100vw"
                    className={styles.thumb}
                  />
                </div>
              ) : null}
              <div className={styles.body}>
                <div className={styles.meta}>
                  <time dateTime={newsDateTime(news)} className={styles.date}>
                    {newsDateDisplay(news)}
                  </time>
                  <span className={styles.category}>{news.category}</span>
                </div>
                <h3 className={styles.title}>{news.title}</h3>
                <p className={styles.summary}>{news.summary}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className={styles.link}>
          <Link href="/news">View all news →</Link>
        </p>
      </PageContainer>
    </HomeSection>
  );
}
