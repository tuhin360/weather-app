import { useState, useEffect } from "react";
import {
  FaSearch,
  FaTachometerAlt,
  FaTemperatureHigh,
  FaTemperatureLow,
  FaWind,
} from "react-icons/fa";
import { FaLocationDot, FaMountainSun } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Weather.css";
import { PiSunHorizonFill } from "react-icons/pi";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });

    const fetchDefaultWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Dhaka&units=metric&appid=${API_KEY}`
        );
        if (response.ok) {
          const data = await response.json();
          setWeatherData(data);
        }
      } catch (err) {
        console.error("Failed to load default weather data");
      }
    };

    fetchDefaultWeather();
  }, [API_KEY]);

  const fetchWeatherData = async () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
      } else {
        setError("City not found. Please enter a valid city name.");
        setWeatherData(null);
      }
    } catch (error) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") fetchWeatherData();
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="container">
      {/* Main App Content Wrapper */}
      <main className="main-content">
        <header className="app-header" data-aos="fade-down">
          <h1 className="app-title">WeatherSphere</h1>
          <p className="app-subtitle">Real-time weather updates</p>
        </header>

        <div className="search-container" data-aos="fade-up" data-aos-delay="100">
          <div className="search-input-wrapper">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter city name..."
              className="search-input"
            />
            <button onClick={fetchWeatherData} className="search-button" disabled={loading}>
              {loading ? "..." : <FaSearch />}
            </button>
          </div>
        </div>

        {error && <p className="error-message" data-aos="fade-up">{error}</p>}

        {weatherData && weatherData.weather && (
          <div className="weather-content" data-aos="fade-up">
            <div className="weather-main">
              <div className="weather-icon">
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                  alt={weatherData.weather[0].description}
                />
                <p className="weather-description">{weatherData.weather[0].description}</p>
              </div>
              <div className="weather-temp">
                <h2>{Math.round(weatherData.main.temp)}<span>&deg;</span>C</h2>
              </div>
              <div className="location">
                <FaLocationDot className="location-icon" />
                <h2>{weatherData.name}, {weatherData.sys.country}</h2>
              </div>
            </div>

            <div className="weather-stats">
              {[
                { icon: <FaWind />, val: `${weatherData.wind.speed} km/h`, label: "Wind Speed" },
                { icon: <WiHumidity />, val: `${weatherData.main.humidity}%`, label: "Humidity" },
                { icon: <PiSunHorizonFill />, val: formatTime(weatherData.sys.sunrise), label: "Sunrise" },
                { icon: <FaMountainSun />, val: formatTime(weatherData.sys.sunset), label: "Sunset" },
                { icon: <FaTemperatureHigh />, val: `${Math.round(weatherData.main.feels_like)}°C`, label: "Feels Like" },
                { icon: <FaTemperatureLow />, val: `${Math.round(weatherData.main.temp_min)}°C`, label: "Min Temp" },
                { icon: <FaTemperatureHigh />, val: `${Math.round(weatherData.main.temp_max)}°C`, label: "Max Temp" },
                { icon: <FaTachometerAlt />, val: `${weatherData.main.pressure} hPa`, label: "Pressure" },
              ].map((stat, idx) => (
                <div className="weather-card" key={idx} data-aos="fade-up" data-aos-delay={100 + idx * 50}>
                  <div className="weather-icon">{stat.icon}</div>
                  <h3>{stat.val}</h3>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer" data-aos="fade-up">
        <p>&copy; {new Date().getFullYear()} WeatherSphere developed by Jahedi Alam Tuhin</p>
      </footer>
    </div>
  );
};

export default Weather;