/**
 * Site-level configuration: name, description, navigation, contact details.
 *
 * Institution, room, address and email are real lab information. The group
 * name itself is still a placeholder until the official lab name is
 * confirmed. Centralising this keeps pages free of hard-coded site data.
 */

export interface NavItem {
  label: string;
  href: string;
}

export const siteConfig = {
  /** Group name — the Ye Group (legacy identity; header wordmark keeps the
      "@ NTU" flag form). */
  name: "The Ye Group",
  /**
   * Header flag-mark (D-A): the single-line compact wordmark shown in the red
   * header band.
   */
  wordmark: "The Ye Group @ NTU",
  /** Real lab tagline (legacy hero subtitle). */
  tagline: "Shaping Membranes: From Smart Materials to a Cleaner Future",
  description:
    "We are based in the School of Civil and Environmental Engineering at Nanyang Technological University, where our research focuses on advanced porous materials and membrane technologies to address pressing energy and environmental challenges. As an open and growing team, we are committed to excellence, freedom, diversity and inclusion.",
  /**
   * Canonical deployment URL.
   * TODO(pre-launch): replace with the actual production domain.
   */
  url: "https://dsh-lab.ntu.edu.sg",
  nav: [
    { label: "Home", href: "/" },
    { label: "Research", href: "/research" },
    { label: "Dr. Ye", href: "/dr-ye" },
    { label: "People", href: "/people" },
    { label: "Publications", href: "/publications" },
    { label: "News", href: "/news" },
    { label: "Join Us", href: "/join" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavItem[],
  contact: {
    /** University. */
    institution: "Nanyang Technological University",
    /** School / department. */
    school: "School of Civil and Environmental Engineering",
    /** Office / lab room (Contact page only — not repeated in the footer). */
    room: "N1-01a-29",
    address: "50 Nanyang Avenue, Singapore 639798",
    email: "chunchun.ye@ntu.edu.sg",
    /** External map deep link — no maps API. */
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=50+Nanyang+Avenue+Singapore+639798",
    /** Official Google Maps "Embed a map" iframe src (maps/embed?pb=...).
        Obtained via Share → Embed a map → Copy HTML — not the Maps Embed
        API, no API key required. The pb string's `!1szh-CN` language tokens
        were removed so the map UI follows each visitor's locale instead of
        forcing Chinese on this English-language site. */
    mapEmbedSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7178628141246!2d103.67766167527803!3d1.3457292615884346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da0f752e339a5d%3A0x4f2f29417633181b!2z5Zyf5pyo5LiO546v5aKD5bel56iL5a2m6Zmi!5e0!4v1787736058590",
  },
} as const;

export const navItems: NavItem[] = [...siteConfig.nav];
