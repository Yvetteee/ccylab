"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import type { Opportunity } from "@/types/content";
import OpportunityBlock from "./OpportunityBlock";
import styles from "./JoinOpportunities.module.css";

interface JoinOpportunitiesProps {
  opportunities: Opportunity[];
}

/**
 * Editorial opportunity tabs (PhD / Postdoc) with URL state: the active tab
 * lives in the URL hash (/join#phd, /join#postdoc), so the tab survives
 * reload, links and Back/Forward.
 *
 * The fragment is never sent to the server, so SSR always renders the first
 * opportunity; after hydration this component syncs to the hash. Switching
 * tabs uses history.pushState (not window.location.hash) so it never triggers
 * an anchor scroll.
 */
export default function JoinOpportunities({
  opportunities,
}: JoinOpportunitiesProps) {
  const [activeId, setActiveId] = useState(opportunities[0]?.id ?? "");

  useEffect(() => {
    if (opportunities.length === 0) return;
    const syncFromHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      const id = opportunities.some((o) => o.id === hash)
        ? hash
        : opportunities[0].id;
      setActiveId(id);
    };

    syncFromHash(); // pick up the hash after hydration
    window.addEventListener("popstate", syncFromHash);
    window.addEventListener("hashchange", syncFromHash);
    return () => {
      window.removeEventListener("popstate", syncFromHash);
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, [opportunities]);

  // No openings — hide the tab list entirely. The stable Join CTA on the
  // page remains intact; there is nothing to render here.
  if (opportunities.length === 0) return null;

  const selectTab = (id: string) => {
    setActiveId(id);
    history.pushState(null, "", `#${id}`);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const index = opportunities.findIndex((o) => o.id === activeId);
    let next = index;
    if (event.key === "ArrowRight") {
      next = (index + 1) % opportunities.length;
    } else if (event.key === "ArrowLeft") {
      next = (index - 1 + opportunities.length) % opportunities.length;
    } else {
      return;
    }
    event.preventDefault();
    const nextId = opportunities[next].id;
    selectTab(nextId);
    document.getElementById(`tab-${nextId}`)?.focus();
  };

  const active =
    opportunities.find((o) => o.id === activeId) ?? opportunities[0];

  return (
    <div>
      <div role="tablist" aria-label="Opportunities" className={styles.tabs}>
        {opportunities.map((opportunity) => {
          const selected = opportunity.id === activeId;
          return (
            <button
              key={opportunity.id}
              id={`tab-${opportunity.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`panel-${opportunity.id}`}
              tabIndex={selected ? 0 : -1}
              className={`${styles.tab}${selected ? ` ${styles.active}` : ""}`}
              onClick={() => selectTab(opportunity.id)}
              onKeyDown={handleKeyDown}
            >
              {opportunity.title}
            </button>
          );
        })}
      </div>

      <div
        id={`panel-${active.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${active.id}`}
        tabIndex={0}
        className={styles.panel}
      >
        <h2 className={styles.srOnly}>{active.title}</h2>
        <OpportunityBlock opportunity={active} />
      </div>
    </div>
  );
}
