"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import MainNavigation from "./MainNavigation";
import { siteConfig } from "@/content/site";
import styles from "./SiteHeader.module.css";

/**
 * Page-level header landmark: brand + main navigation. Sticky with a thin
 * bottom border. The brand is the legacy single-line flag-mark (D-A): a
 * compact wordmark in the red band, sans/semibold — the red band owns its
 * content rather than carrying a two-line editorial identity.
 *
 * The mobile menu state lives here (not inside the navigation) so the brand
 * link can also collapse it, and so any route change — including same-route
 * clicks — closes it during render (React's state-from-props pattern).
 */
export default function SiteHeader() {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const toggleRef = useRef<HTMLButtonElement>(null);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setNavOpen(false);
  }

  // While open, Escape closes the menu and returns focus to the toggle.
  useEffect(() => {
    if (!navOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setNavOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [navOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link
          href="/"
          className={styles.brand}
          onClick={() => setNavOpen(false)}
        >
          {siteConfig.wordmark}
        </Link>
        <MainNavigation
          open={navOpen}
          onToggle={setNavOpen}
          toggleRef={toggleRef}
        />
      </div>
    </header>
  );
}
