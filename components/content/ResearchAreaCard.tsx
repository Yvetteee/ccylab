import type { ResearchArea } from "@/types/content";
import ChipList from "@/components/ui/ChipList";
import card from "./card.module.css";
import styles from "./ResearchAreaCard.module.css";

interface ResearchAreaCardProps {
  area: ResearchArea;
}

/**
 * Research area card: title, short description and keywords. Long-form
 * description and related projects live on the Research page.
 */
export default function ResearchAreaCard({ area }: ResearchAreaCardProps) {
  return (
    <article className={card.card}>
      <h3 className={styles.title}>{area.title}</h3>
      <p className={styles.description}>{area.shortDescription}</p>
      {area.keywords.length ? (
        <ChipList items={area.keywords} label="Keywords" />
      ) : null}
    </article>
  );
}
