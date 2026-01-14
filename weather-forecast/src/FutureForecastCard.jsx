import styles from "./FutureForecastCard.module.css";

export default function FutureForecastCard({ item }) {
  const day = {
    date: item.date,
    max: item.day.maxtemp_c,
    min: item.day.mintemp_c,
    icon: item.day.condition.icon,
  };

  return (
    <div className={styles.day_item}>
      <div className={styles.day_date}>
        <p className={styles.day}>{day.date}</p>
      </div>
      <img
        className={styles.day_weather_icon}
        src={day.icon}
        width="36px"
        alt="weather icon"
      />
      <div className={styles.day_temp}>
        <p className={styles.max_temp}>{day.max}°C</p>
        <p className={styles.min_temp}>{day.min}°C</p>
      </div>
    </div>
  );
}
