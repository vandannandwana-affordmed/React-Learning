import styles from "./CarCard.module.css";

export default function CarCard({
  cardTitle,
  cardDescription,
  cardIcon,
  cardColor,
  cornerRadius,
}) {
  return (
    <div
      className={styles.card}
      style={{ backgroundColor: cardColor, borderRadius: cornerRadius }}
    >
      <img src={cardIcon} width="66px" alt="car group symbol" />
      <p class={styles.cardTitle}>{cardTitle}</p>
      <p class={styles.cardDescription}>{cardDescription}</p>
      <button class={styles.learnMoreButton} style={{ color: cardColor }}>
        Learn More
      </button>
    </div>
  );
}
