import CarCard from "./CarCard";
import styles from "./CardsComponent.module.css";

export default function CardsComponent() {
  const cards = [
    {
      cardName: "SEDANS",
      cardDescription:
        "Choose a sedan for its affordability and excellent fuel economy. Ideal for cruising in the city or on your next road trip.",
      cardIcon: "./src/assets/icon-sedans.svg",
      cardColor: "#E38826",
      cornerRadius: "12px 0px 0px 12px",
    },
    {
      cardName: "SUVS",
      cardDescription:
        "Take an SUV for its spacious interior, power, and versatility. Perfect for your next family vacation and off-road adventures.",
      cardIcon: "./src/assets/icon-suvs.svg",
      cardColor: "#006970",
      
      cornerRadius: "0px 0px 0px 0px",
    },
    {
      cardName: "LUXURY",
      cardDescription:
        "Cruise in the best car brands without the bloated prices. Enjoy the enhanced comfort of a luxury rental and arrive in style.",
      cardIcon: "./src/assets/icon-luxury.svg",
      cardColor: "#004241",
      cornerRadius: "0px 12px 12px 0px",
    },
  ];
  return (
    <div className={styles.cards}>
      {cards.map((card, index) => {
        return (
          <CarCard
            key={index}
            cardName={card.cardName}
            cardDescription={card.cardDescription}
            cardIcon={card.cardIcon}
            cardColor={card.cardColor}
            cornerRadius={card.cornerRadius}
          />
        );
      })}
    </div>
  );
}
