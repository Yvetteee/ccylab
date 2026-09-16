import type { NewsItem } from "@/types/content";
import Link from "next/link";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import { newsDateDisplay, newsDateTime } from "@/lib/format";
import { newsSlug } from "@/lib/news";
import styles from "./FeaturedNews.module.css";

interface FeaturedNewsProps {
  news: NewsItem;
}

/**
 * The explicitly featured news item, rendered large: a wide photo, then
 * category · date, a big serif title, the summary and a link. Everything
 * else on the News page stays in the year-grouped chronology.
 *
 * Without an external announcement the story links to its detail page
 * (/news/[slug]) — title, image and an explicit "View story" affordance.
 *
 * Media: news artwork (hiring posters, welcome graphics) is NOT cropped.
 * `contain` preserves the whole graphic — no poster text is cut by the frame.
 */
export default function FeaturedNews({ news }: FeaturedNewsProps) {
  const href = news.externalUrl;
  const detailHref = `/news/${newsSlug(news)}`;
  const alt = news.imageAlt ?? `Photo for ${news.title}`;

  return (
    <article className={styles.featured}>
      {news.image ? (
        href ? (
          <a href={href} target="_blank" rel="noopener noreferrer">
            <ResponsiveImage
              src={news.image}
              alt={alt}
              ratio="3 / 2"
              fit="contain"
              sizes="100vw"
              className={styles.image}
            />
          </a>
        ) : (
          <Link href={detailHref} className={styles.imageLink} aria-label={`View story: ${news.title}`}>
            <ResponsiveImage
              src={news.image}
              alt={alt}
              ratio="3 / 2"
              fit="contain"
              sizes="100vw"
              className={styles.image}
            />
          </Link>
        )
      ) : null}
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
            <Link href={detailHref}>{news.title}</Link>
          )}
        </h2>
        <p className={styles.summary}>{news.summary}</p>
        {href ? (
          <p className={styles.link}>
            <a href={href} target="_blank" rel="noopener noreferrer">
              Read more →
            </a>
          </p>
        ) : (
          <p className={styles.link}>
            <Link href={detailHref}>View story →</Link>
          </p>
        )}
      </div>
    </article>
  );
}
