import FutureForecastCard from "./FutureForecastCard";
import styles from "./WeatherCard.module.css";

export default function WeatherCard({weatherData}) {
  return (
    <div className={styles.weather_card}>
      <section className={styles.summary_section}>
        <section className={styles.top_left_section}>
          <div className={styles.city_date}>
            <h2>
              {weatherData.cityName +
                ", " +
                weatherData.statename +
                ", " +
                weatherData.countryName}
            </h2>
            <p>{weatherData.localtime}</p>
          </div>
          <div className={styles.temp_degree}>
            <img src={weatherData.icon} width="52" alt="" />
            <p>{weatherData.temprature}</p>
            <p className={styles.celcious_text}>°C</p>
          </div>
        </section>

        <section className={styles.weather_info}>
          <ul id="weather_info">
            <li>UV: {weatherData.uvIndex}</li>
            <li>Humidity: {weatherData.humidity}%</li>
            <li>Precipitation: {weatherData.precipitation}%</li>
            <li>Wind: {weatherData.windSpeed} mph</li>
          </ul>
        </section>
      </section>
      <hr />
      <section className={styles.forecast_section}>
        <h2 className={styles.forecast_heading}>Weather Forcast</h2>
        <ul className={styles.days_list}>
          {weatherData.forecastDays.map((item, idx) => {
            return (
              <li key={idx}>
                <FutureForecastCard item={item} />
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
