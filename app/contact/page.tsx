import PageContainer from "@/components/ui/PageContainer";
import PageHeader from "@/components/ui/PageHeader";
import { siteConfig } from "@/content";
import { createPageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "How to reach the research group — institution, room, address and email.",
  path: "/contact",
});

/**
 * Contact page — institutional details on the left, location on the right
 * (two columns on desktop, stacked on mobile). The map is the official
 * Google Maps embed iframe (no API key); the external link opens navigation.
 */
export default function ContactPage() {
  const { contact } = siteConfig;
  const addressLines = contact.address.split(", ");

  return (
    <PageContainer>
      <PageHeader title="Contact" description="How to reach the group." />

      <div className={styles.grid}>
        <div className={styles.column}>
          <h2 className={styles.columnTitle}>Contact details</h2>
          <dl className={styles.list}>
            <div className={styles.item}>
              <dt>Institution</dt>
              <dd>
                <p>{contact.school}</p>
                <p>{contact.institution}</p>
              </dd>
            </div>
            <div className={styles.item}>
              <dt>Room</dt>
              <dd>{contact.room}</dd>
            </div>
            <div className={styles.item}>
              <dt>Address</dt>
              <dd>
                {addressLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </dd>
            </div>
            <div className={styles.item}>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${contact.email}`} className={styles.email}>
                  {contact.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div className={styles.column}>
          <h2 className={styles.columnTitle}>Location</h2>
          <div className={styles.mapFrame}>
            <iframe
              src={contact.mapEmbedSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Research group location at Nanyang Technological University"
            />
          </div>
          <p className={styles.mapLink}>
            <a
              href={contact.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Google Maps →
            </a>
          </p>
        </div>
      </div>
    </PageContainer>
  );
}
