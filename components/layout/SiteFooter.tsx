import Link from "next/link";
import Image from "next/image";
import { navItems, siteConfig } from "@/content/site";
import styles from "./SiteFooter.module.css";

/** Build year — cached at build time; update by rebuilding. */
const BUILD_YEAR = new Date().getFullYear();

/**
 * Page-level footer: institutional brand cluster (legacy NTU mark + group
 * name), inline nav links, essential institution contact (school,
 * university, address, email — the room stays on the Contact page) and a
 * copyright line. The legacy dark band keeps its white text; back-to-top is
 * page-level navigation and lives outside this composition.
 */
export default function SiteFooter() {
  const { contact } = siteConfig;

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brandCluster}>
            <Image
              src="/images/legacy/NTU_Logo.png"
              alt="Nanyang Technological University"
              width={89}
              height={32}
              sizes="89px"
              className={styles.logo}
            />
            <p className={styles.brand}>{siteConfig.name}</p>
          </div>
        </div>

        <nav className={styles.nav} aria-label="Footer navigation">
          <ul className={styles.links}>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.bottom}>
          <div className={styles.contact}>
            <p>{contact.school}</p>
            <p>{contact.institution}</p>
            <p>{contact.address}</p>
            <p>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </p>
          </div>
          <p className={styles.copyright}>© {BUILD_YEAR} {siteConfig.name}</p>
        </div>
      </div>
    </footer>
  );
}
