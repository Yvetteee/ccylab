import type { NewsItem } from "@/types/content";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import { newsDateDisplay, newsDateTime } from "@/lib/format";
import styles from "./FeaturedNews.module.css";

interface FeaturedNewsProps {
  news: NewsItem;
}

/**
 * The most recent / most important news item, rendered large: a wide photo,
 * then category · date, a big serif title, the summary and an outbound link.
 * Everything else on the News page stays in the year-grouped chronology.
 *
 * Media: news artwork (hiring posters, welcome graphics) is NOT cropped.
 * `contain` preserves the whole graphic — no poster text is cut by the frame.
 */
export default function FeaturedNews({ news }: FeaturedNewsProps) {
  const href = news.externalUrl;

  return (
    <article className={styles.featured}>
      <ResponsiveImage
        src={news.image ?? "/images/hero-lab.svg"}
        alt={news.image ? `Photo for ${news.title}` : `Placeholder image for ${news.title}`}
        ratio="3 / 2"
        fit="contain"
        sizes="100vw"
      />
      <div className={styles.body}>
        <p className={styles.meta}>
          <span className={styles.category}>{news.category}</span>
          <time dateTime={newsDateTime(news)} className={styles.date}>
            {newsDateDisplay(news)}
          </time>
        </p>
        <h2 className={styles.title}>
          {href ? (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {news.title}
            </a>
          ) : (
            news.title
          )}
        </h2>
        <p className={styles.summary}>{news.summary}</p>
        {href ? (
          <p className={styles.link}>
            <a href={href} target="_blank" rel="noopener noreferrer">
              Read more →
            </a>
          </p>
        ) : null}
      </div>
    </article>
  );
}
