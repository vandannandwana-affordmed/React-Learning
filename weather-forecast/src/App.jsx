import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import WeatherCard from "./WeatherCard";
import { useEffect, useState } from "react";
import Notification from "./Notification";

async function fetchWeather(query) {
  const fetch_url =`https://api.weatherapi.com/v1/forecast.json?key={YOUR_API_KEY}&q=${query}&days=7`;
  const response = await fetch(fetch_url);

  if (!response.ok) {
    throw new Error(data?.error?.message || "Weather API error");
  }

  return response.json();
}

function getOwnLocation() {
    return new Promise((resolve, reject)=>{
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
    })
}

function App() {
  const [notification, setNotification] = useState({
    text: "",
    color: "",
    isShow: false,
  })
  // const 
  const savedLocation = localStorage.getItem("location");
  const [query, setQuery] = useState(savedLocation || "udaipur");
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState({
    cityName: "",
    countryName: "",
    statename: "",
    localtime: "",
    temprature: "",
    windSpeed: "",
    humidity: "",
    icon: "./src/assets/react.svg",
    uvIndex: "",
    precipitation: "",
    forecastDays: [],
  });

  useEffect(() => {
    setIsLoading(true);
    fetchWeather(query)
      .then((data) => {
        setWeatherData({
          cityName: data.location.name,
          countryName: data.location.country,
          statename: data.location.region,
          localtime: data.location.localtime,
          temprature: data.current.temp_c,
          windSpeed: data.current.wind_mph,
          humidity: data.current.humidity,
          icon: data.current.condition.icon,
          uvIndex: data.current.uv,
          precipitation: data.current.precip_mm,
          forecastDays: data.forecast.forecastday,
        });
        localStorage.setItem("location", query);
        handleNotification("Weather data fetched successfully", "green");
      })
      .catch((err)=>{
        handleNotification(err.message, "red");
        console.error(err);
      })
      .finally(()=>{
        setIsLoading(false);
      });
  }, [query]);

  function handleOwnLocation() {
      getOwnLocation()
          .then((location) => {
              setQuery(location);
          })
          .catch((error) => {
              console.log(error);
              handleNotification(error, "red");
          });
  }

  function handleNotification(text, color) {
    setNotification({
      text: text,
      color: color,
      isShow: true,
    });
    setTimeout(()=>{
      setNotification({
        text: "",
        color: "",
        isShow: false,
      })
    }, 5000)
  }

  return (
    <>
      <div id="loader" style={{display: isLoading ? "block" : "none"}}></div>
      <header>
        <Header
          citySearch={(cityName) => {
            setQuery(cityName);
          }}
        />
      </header>

      <div id="notification">
        <Notification notification={notification} />
      </div>

      <aside onClick={handleOwnLocation}>
        <img src="./src/assets/location_ic.png" width="36" alt="" />
        <p>click to get your location</p>
      </aside>

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
