import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageContainer from "@/components/ui/PageContainer";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import { sortedNews } from "@/content";
import { newsSlug } from "@/lib/news";
import { newsDateDisplay, newsDateTime } from "@/lib/format";
import { createPageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

interface NewsStoryPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * News story — a stable detail page per News item: back link, category +
 * date, title, the cover image at full editorial width (clickable through to
 * the original production image), the approved story text, and an optional
 * gallery. Visual language follows the site's single-column editorial flow.
 */
export function generateStaticParams() {
  return sortedNews.map((news) => ({ slug: newsSlug(news) }));
}

/** Only the generated story slugs resolve; anything else 404s. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: NewsStoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const news = sortedNews.find((item) => newsSlug(item) === slug);
  if (!news) return {};
  return createPageMetadata({
    title: news.title,
    description: news.summary,
    path: `/news/${slug}`,
  });
}

export default async function NewsStoryPage({ params }: NewsStoryPageProps) {
  const { slug } = await params;
  const news = sortedNews.find((item) => newsSlug(item) === slug);
  if (!news) notFound();

  return (
    <PageContainer>
      <p className={styles.back}>
        <Link href="/news">← Back to News</Link>
      </p>

      <article>
        <p className={styles.meta}>
          <span>{news.category}</span>
          <time dateTime={newsDateTime(news)}>{newsDateDisplay(news)}</time>
        </p>
        <h1 className={styles.title}>{news.title}</h1>

        {news.image ? (
          <a
            className={styles.primaryImage}
            href={news.image}
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* Natural aspect: story images keep their intrinsic composition
                (portrait covers included) — no frame crop, no stretching. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={news.image}
              alt={news.imageAlt ?? `Photo for ${news.title}`}
            />
            <span className={styles.imageHint}>
              View full-size image →
            </span>
          </a>
        ) : null}

        <p className={styles.body}>{news.summary}</p>

        {news.gallery?.length ? (
          <div className={styles.gallery}>
            {news.gallery.map((image) => (
              <figure key={image.src} className={styles.galleryItem}>
                <a href={image.src} target="_blank" rel="noopener noreferrer">
                  <ResponsiveImage
                    src={image.src}
                    alt={image.alt}
                    ratio="4 / 3"
                    fit="contain"
                    sizes="(min-width: 1024px) 1152px, 100vw"
                  />
                </a>
                {image.caption ? (
                  <figcaption className={styles.caption}>{image.caption}</figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        ) : null}
      </article>
    </PageContainer>
  );
}
