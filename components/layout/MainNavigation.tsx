"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { RefObject } from "react";
import { navItems } from "@/content/site";
import styles from "./MainNavigation.module.css";

interface MainNavigationProps {
  /** Disclosure state owned by SiteHeader. */
  open: boolean;
  /** Toggle handler (also receives explicit close requests). */
  onToggle: (next: boolean) => void;
  /** Ref to the toggle button, for focus return on Escape. */
  toggleRef: RefObject<HTMLButtonElement | null>;
}

/**
 * Primary site navigation.
 *
 * Desktop: horizontal link list. Mobile: toggle button disclosing a vertical
 * list (no animation — plain show/hide). The active route is highlighted.
 * Open/close state is owned by SiteHeader so the wordmark link and route
 * changes collapse the menu too.
 */
export default function MainNavigation({
  open,
  onToggle,
  toggleRef,
}: MainNavigationProps) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <button
        type="button"
        ref={toggleRef}
        className={styles.toggle}
        aria-expanded={open}
        aria-controls="main-nav-list"
        onClick={() => onToggle(!open)}
      >
        {open ? "Close" : "Menu"}
      </button>
      <ul
        id="main-nav-list"
        className={`${styles.list}${open ? ` ${styles.open}` : ""}`}
      >
        {navItems.map((item) => (
          <li key={item.href} className={styles.item}>
            <Link
              href={item.href}
              className={isActive(item.href) ? styles.active : undefined}
              aria-current={isActive(item.href) ? "page" : undefined}
              onClick={() => onToggle(false)}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
