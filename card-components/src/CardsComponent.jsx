import CarCard from "./CarCard";
import styles from "./CardsComponent.module.css";

export default function CardsComponent() {
  const cards = [
    {
      card_name: "SEDANS",
      card_description:
        "Choose a sedan for its affordability and excellent fuel economy. Ideal for cruising in the city or on your next road trip.",
      card_icon: "./src/assets/icon-sedans.svg",
      card_color: "#E38826",
      corner_radius: "12px 0px 0px 12px",
    },
    {
      card_name: "SUVS",
      card_description:
        "Take an SUV for its spacious interior, power, and versatility. Perfect for your next family vacation and off-road adventures.",
      card_icon: "./src/assets/icon-suvs.svg",
      card_color: "#006970",
    },
    {
      card_name: "LUXURY",
      card_description:
        "Cruise in the best car brands without the bloated prices. Enjoy the enhanced comfort of a luxury rental and arrive in style.",
      card_icon: "./src/assets/icon-luxury.svg",
      card_color: "#004241",
      corner_radius: "0px 12px 12px 0px",
    },
  ];
  return (
    <div className={styles.cards}>
      {cards.map((card, index) => {
        return (
          <CarCard
            key={index}
            card_name={card.card_name}
            card_description={card.card_description}
            card_icon={card.card_icon}
            card_color={card.card_color}
            corner_radius={card.corner_radius}
          />
        );
      })}
    </div>
  );
}
