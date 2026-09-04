import Link from "next/link";
import MainNavigation from "./MainNavigation";
import { siteConfig } from "@/content/site";
import styles from "./SiteHeader.module.css";

/**
 * Page-level header landmark: brand + main navigation. Sticky with a thin
 * bottom border. The brand is the legacy single-line flag-mark (D-A): a
 * compact wordmark in the red band, sans/semibold — the red band owns its
 * content rather than carrying a two-line editorial identity.
 */
export default function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          {siteConfig.wordmark}
        </Link>
        <MainNavigation />
      </div>
    </header>
  );
}
