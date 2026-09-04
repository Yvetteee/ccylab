"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems } from "@/content/site";
import styles from "./MainNavigation.module.css";

/**
 * Primary site navigation.
 *
 * Desktop: horizontal link list. Mobile: toggle button disclosing a vertical
 * list (no animation — plain show/hide). The active route is highlighted.
 */
export default function MainNavigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <button
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls="main-nav-list"
        onClick={() => setOpen((v) => !v)}
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
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
