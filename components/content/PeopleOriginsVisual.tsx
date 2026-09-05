import ResponsiveImage from "@/components/ui/ResponsiveImage";
import styles from "./PeopleOriginsVisual.module.css";

/**
 * Closing group-identity visual on /people — restored from the legacy
 * Members page (ccylab members.html), where member.png (1357×652 world-map
 * artwork) closed the page beneath the member listing. The caption is the
 * legacy page's own team framing, kept verbatim. Purely a quiet closing
 * figure: not a section, not interactive, no member-origin labels.
 */
export default function PeopleOriginsVisual() {
  return (
    <figure className={styles.figure}>
      <ResponsiveImage
        src="/images/legacy/member.png"
        alt="World map with flowers representing the global roots of the Ye Group team"
        ratio="1357 / 652"
        fit="contain"
        sizes="(min-width: 948px) 900px, 100vw"
      />
      <figcaption className={styles.caption}>
        In our inclusive garden of discovery, global minds converge - diverse
        in roots, united in growth.
      </figcaption>
    </figure>
  );
}
