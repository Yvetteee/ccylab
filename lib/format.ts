/** Shared formatting / link helpers used across content components. */

/** "Dr. Jane Smith" → "JS", "Elena Mercer" → "EM" (two initials, uppercase). */
export function getInitials(name: string): string {
  const cleanName = name.replace(/^(Prof\.?|Dr\.?)\s+/i, "");
  return cleanName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

/** Normalise a bare ORCID id (or full URL) into a URL. */
export function orcidUrl(orcid: string): string {
  return /^https?:\/\//.test(orcid) ? orcid : `https://orcid.org/${orcid}`;
}

/** "2026-02-14" → "Feb 14, 2026". */
export function formatDate(iso: string, locale = "en-US"): string {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/* ---- News date precision ---- */

/** Display form of a news date: `displayDate` (verified precision) wins,
 * otherwise the full `formatDate`. Never fabricates day precision. */
export function newsDateDisplay(news: {
  date: string;
  displayDate?: string;
}): string {
  return news.displayDate ?? formatDate(news.date);
}

/**
 * Machine-readable value for `<time dateTime>`. When only a month is known
 * ("Apr 2026") the value is reduced to YYYY-MM so no unsupported day leaks
 * into the DOM; otherwise the full sort surrogate is used.
 */
export function newsDateTime(news: { date: string; displayDate?: string }): string {
  if (!news.displayDate) return news.date;
  const m = news.displayDate.match(/^([A-Za-z]{3}) (\d{4})$/);
  if (m) {
    const months: Record<string, string> = {
      Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
      Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12",
    };
    const mm = months[m[1]];
    if (mm) return `${m[2]}-${mm}`;
  }
  return news.date;
}
