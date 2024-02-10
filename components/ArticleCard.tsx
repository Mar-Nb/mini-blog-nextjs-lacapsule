import { CardProps } from "@/types/CardProps";
import styles from "./ArticleCard.module.css";

export function ArticleCard(props: CardProps) {
  const cardDate = new Intl.DateTimeFormat("fr-FR", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(props.createdAt));

  return (
    <div className="card">
      <div className={`card-header ${styles.header}`}>
        <p className={`card-header-title ${styles.title}`}>{props.title}</p>
      </div>

      <div className="card-content">
        <div className="content">{props.description}</div>
        <time className={styles.time} dateTime={props.createdAt}>
          {cardDate}
        </time>
      </div>

      <footer className={`card-footer ${styles.footer}`}>
        <a
          href={`/article/${props.id}`}
          className={`card-footer-item ${styles.footerLink}`}
        >
          Lire l&apos;article
        </a>
      </footer>
    </div>
  );
}
