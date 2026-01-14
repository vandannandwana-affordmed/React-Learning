import styles from "./Header.module.css";
import { useState } from "react";

export default function Header({ citySearch }) {
  const [cityName, setCityName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    citySearch(cityName.trim());
  };

  return (
    <>
      <h1>Weather Forcast</h1>
      <form className={styles.search_form} onSubmit={handleSubmit}>
        <input
          className={styles.search_box}
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          placeholder="Enter your city name"
          required
        />
        <button type="submit">Search</button>
      </form>
    </>
  );
}
