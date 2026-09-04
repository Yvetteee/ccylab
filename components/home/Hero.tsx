import PageContainer from "@/components/ui/PageContainer";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import { siteConfig } from "@/content";
import styles from "./Hero.module.css";

/**
 * Hero — legacy lab-home reconstruction (see docs/legacy-integration).
 *
 * The legacy home opens with a full-bleed campus photograph, a translucent
 * white overlay, a large bold title and an italic one-line subtitle. That
 * composition is rebuilt here on the current framework: the photo + overlay
 * carry identity (institution eyebrow, group name, tagline), and the welcome
 * copy sits in a narrow block beneath, like the legacy "Welcome to our lab"
 * paragraph. No 50/50 split, no carousel.
 *
 * D-F: the hero is an IDENTITY MOMENT, not a conversion module — it carries
 * no primary CTA. The band height is clamped (mobile ~320-420px, desktop
 * ~500-600px) instead of scaling with viewport width.
 */
export default function Hero() {
  const institution = siteConfig.contact.institution.split(",")[0];

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.band}>
        <ResponsiveImage
          src="/images/hero-campus.jpg"
          alt="NTU campus — where the research group is based"
          ratio="16 / 7"
          sizes="100vw"
          priority
          className={styles.photo}
        />
        <div className={styles.overlay}>
          <p className={styles.institution}>{institution}</p>
          <h1 id="hero-title" className={styles.title}>
            Welcome to the Ye Lab!
          </h1>
          <p className={styles.tagline}>{siteConfig.tagline}</p>
        </div>
      </div>

      <PageContainer width="standard" className={styles.welcome}>
        <p className={styles.intro}>{siteConfig.description}</p>
      </PageContainer>
    </section>
  );
}
