import type { NewsItem } from "@/types/content";
import { newsDateDisplay, newsDateTime } from "@/lib/format";
import styles from "./NewsRow.module.css";

interface NewsRowProps {
  news: NewsItem;
}

/**
 * One editorial archive row: date + category in a left rail (desktop), then
 * title, summary and an optional outbound link. No box, no card — separated
 * by a thin rule and whitespace.
 */
export default function NewsRow({ news }: NewsRowProps) {
  // Only genuine http(s) external announcements open in a new tab; anything
  // else is an in-site link and keeps the current tab.
  const isExternal = news.externalUrl
    ? /^https?:\/\//.test(news.externalUrl)
    : false;

  return (
    <li className={styles.row}>
      <div className={styles.meta}>
        <time dateTime={newsDateTime(news)} className={styles.date}>
          {newsDateDisplay(news).toUpperCase()}
        </time>
        <span className={styles.category}>{news.category}</span>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>
          {news.externalUrl ? (
            <a
              href={news.externalUrl}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
            >
              {news.title}
            </a>
          ) : (
            news.title
          )}
        </h3>
        <p className={styles.summary}>{news.summary}</p>
        {news.externalUrl ? (
          <p className={styles.link}>
            <a
              href={news.externalUrl}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
            >
              Read more →
            </a>
          </p>
        ) : null}
      </div>
    </li>
  );
}
