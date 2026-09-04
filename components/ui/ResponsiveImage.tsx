import Image from "next/image";
import styles from "./ResponsiveImage.module.css";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  /** CSS aspect-ratio, e.g. "4 / 3" (see tokens: --aspect-*). */
  ratio?: string;
  /** cover crops to the frame; contain shows the whole image (figures). */
  fit?: "cover" | "contain";
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/**
 * The single image primitive for the site: a fixed-aspect-ratio frame with
 * consistent object-fit behaviour. Keeps every image system consistent and
 * lets real photos/figures drop in without layout shifts.
 */
export default function ResponsiveImage({
  src,
  alt,
  ratio = "4 / 3",
  fit = "cover",
  sizes = "100vw",
  priority = false,
  className,
}: ResponsiveImageProps) {
  const isSvg = src.toLowerCase().endsWith(".svg");

  return (
    <div
      className={`${styles.frame}${className ? ` ${className}` : ""}`}
      style={{ aspectRatio: ratio }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={fit === "contain" ? styles.contain : styles.cover}
        unoptimized={isSvg}
      />
    </div>
  );
}
