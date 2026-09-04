"use client";

import { useEffect, useState } from "react";
import styles from "./BackToTop.module.css";

/**
 * Page-level back-to-top navigation — fixed near the lower-right viewport
 * corner, deliberately OUTSIDE the footer's visual composition. Appears
 * after meaningful scrolling (~600px) so it never competes with the hero.
 * The legacy red affordance, rebuilt as a restrained red circle with a white
 * chevron; no shadow, glow or animation beyond a color/opacity fade.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY >= 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`${styles.button}${visible ? ` ${styles.visible}` : ""}`}
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <svg
        viewBox="0 0 24 24"
        width={18}
        height={18}
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M4 15l8-8 8 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
