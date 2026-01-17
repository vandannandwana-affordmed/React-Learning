import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import WeatherCard from "./WeatherCard";
import { useEffect, useState } from "react";
import Notification from "./Notification";

async function fetchWeather(query) {
  const API_KEY = import.meta.env.VITE_API_KEY;
  if (!API_KEY) {
    throw new Error("API key is not set");
  }

  const fetch_url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${query}&days=7`;
  const response = await fetch(fetch_url);

  if (!response.ok) {
    throw new Error(response?.error?.message || "Weather API error");
  }

  return response.json();
}

async function getOwnLocation() {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      reject("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        resolve(`${latitude},${longitude}`);
      },
      (error) => {
        reject(error.message);
      }
    );
  });
}

function App() {
  const [notification, setNotification] = useState({
    text: "",
    color: "",
    isVisible: false,
  });
  const [query, setQuery] = useState(()=> {
    return localStorage.getItem("location") || "Udaipur";
  });
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState({
    cityName: "",
    countryName: "",
    stateName: "",
    localTime: "",
    temperature: "",
    windSpeed: "",
    humidity: "",
    icon: "",
    uvIndex: "",
    precipitation: "",
    forecastDays: [],
  });

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setIsLoading(true);
        const data = await fetchWeather(query, controller.signal);
        setWeatherData({
          cityName: data.location.name,
          countryName: data.location.country,
          stateName: data.location.region,
          localTime: data.location.localtime,
          temperature: data.current.temp_c,
          windSpeed: data.current.wind_mph,
          humidity: data.current.humidity,
          icon: data.current.condition.icon,
          uvIndex: data.current.uv,
          precipitation: data.current.precip_mm,
          forecastDays: data.forecast.forecastday,
        });
        localStorage.setItem("location", query);
        handleNotification("Weather data fetched successfully", "green");
      } catch (err) {
        if (err !== "AbortError") {
          handleNotification("Something went wrong", "red");
        }
      } finally {
        setIsLoading(false);
      }
    }

    load();

    return () => controller.abort();
  }, [query]);

  async function handleOwnLocation() {
    try {
      const location = await getOwnLocation();
      setQuery(location);
    } catch {
      handleNotification("Failed to get location", "red");
    }
  }

  function handleNotification(text, color) {
    setNotification({
      text: text,
      color: color,
      isVisible: true,
    });
    setTimeout(() => {
      setNotification({
        text: "",
        color: "",
        isVisible: false,
      });
    }, 5000);
  }

  return (
    <>
      <div id="loader" style={{ display: isLoading ? "block" : "none" }}></div>
      <header>
        <Header
          onSearch={(cityName) => {
            setQuery(cityName);
          }}
        />
      </header>

      <div id="notification">
        <Notification notification={notification} />
      </div>

      <div id="location_button" onClick={handleOwnLocation}>
        <img
          src="./src/assets/location_ic.png"
          width="36"
          alt="icon to get your current location"
        />
        <p>click to get your location</p>
      </div>

      <main>
        <WeatherCard weatherData={weatherData} />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
