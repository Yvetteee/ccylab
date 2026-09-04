import Link from "next/link";
import PageContainer from "@/components/ui/PageContainer";
import PageHeader from "@/components/ui/PageHeader";
import styles from "./not-found.module.css";

export const metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <PageContainer>
      <PageHeader
        title="Page not found"
        description="The page you are looking for does not exist or has moved."
      />
      <div className={styles.content}>
        <p>
          <Link href="/" className={styles.link}>
            ← Return to the homepage
          </Link>
        </p>
      </div>
    </PageContainer>
  );
}
