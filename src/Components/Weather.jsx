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
import "aos/dist/aos.css"; // AOS styles
import "./Weather.css"; // Custom CSS styles
import { PiSunHorizonFill } from "react-icons/pi";

const Weather = () => {
  // State management for city input, weather data, and errors
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState();
  const [error, setError] = useState();

  // OpenWeatherMap API configuration
  const API_KEY = "dc51bd85494dfb908d3f31137230d6e4";

  // Initialize animations and fetch default weather
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
      offset: 120,
    });

    // Fetch Dhaka's weather by default
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Dhaka&units=metric&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => setWeatherData(data))
      .catch((err) => setError("Failed to load default weather data"));
  }, []);

  // Fetch weather data from API
  const fetchWeatherData = async () => {
    if (!city.trim()) return;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
        setError("");
      } else {
        setError("City not found. Please enter a valid city name.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // Event handlers
  const handleChange = (e) => setCity(e.target.value);
  const handleSearch = () => {
    fetchWeatherData();
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchWeatherData();
    }
  };

  // Format time helper
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="container">
      {/* App Header with fade-down animation */}
      <header className="app-header" data-aos="fade-down">
        <h1 className="app-title">WeatherSphere</h1>
        <p className="app-subtitle">Real-time weather updates</p>
      </header>

      {/* Search Container with fade-up animation and slight delay */}
      <div className="search-container" data-aos="fade-up" data-aos-delay="100">
        <div className="search-input-wrapper">
          <input
            type="text"
            value={city}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            placeholder="Enter city name"
            className="search-input"
          />
          <div className="vertical-divider"></div>
          <button onClick={handleSearch} className="search-button">
            <FaSearch />
          </button>
        </div>
      </div>

      {/* Error Message with fade-up animation */}
      {error && (
        <p className="error-message" data-aos="fade-up">
          {error}
        </p>
      )}

      {/* Main Weather Content - Only shown when data is available */}
      {weatherData && weatherData.weather && (
        <div className="weather-content">
          {/* Current Weather Section */}
          <div className="weather-main" data-aos="fade-up">
            <div className="weather-icon">
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                alt={weatherData.weather[0].description}
              />
              <p className="weather-description">
                {weatherData.weather[0].description}
              </p>
            </div>

            <div className="weather-temp">
              <h2>
                {Math.round(weatherData.main.temp)}
                <span>&deg;</span>C
              </h2>
            </div>

            <div className="location">
              <FaLocationDot className="location-icon" />
              <h2>
                {weatherData.name}, {weatherData.sys.country}
              </h2>
            </div>
          </div>

          {/* Weather Stats Grid - Each card has staggered animation */}
          <div className="weather-stats">
            {/* Wind Card with fade-up and delay */}
            <div
              className="weather-card"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <FaWind className="weather-icon" />
              <h3>{weatherData.wind.speed} km/h</h3>
              <p>Wind Speed</p>
            </div>

            {/* Humidity Card with fade-up and slightly longer delay */}
            <div
              className="weather-card"
              data-aos="fade-up"
              data-aos-delay="150"
            >
              <WiHumidity className="weather-icon" />
              <h3>{weatherData.main.humidity}%</h3>
              <p>Humidity</p>
            </div>

            {/* Sunrise Card */}
            <div
              className="weather-card"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <PiSunHorizonFill className="weather-icon" />
              <h3>{formatTime(weatherData.sys.sunrise)}</h3>
              <p>Sunrise</p>
            </div>

            {/* Sunset Card */}
            <div
              className="weather-card"
              data-aos="fade-up"
              data-aos-delay="250"
            >
              <FaMountainSun className="weather-icon" />
              <h3>{formatTime(weatherData.sys.sunset)}</h3>
              <p>Sunset</p>
            </div>

            {/* Feels Like Card */}
            <div
              className="weather-card"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <FaTemperatureHigh className="weather-icon" />
              <h3>
                {Math.round(weatherData.main.feels_like)} <span>&deg;</span>C
              </h3>
              <p>Feels Like</p>
            </div>

            {/* Min Temperature Card */}
            <div
              className="weather-card"
              data-aos="fade-up"
              data-aos-delay="350"
            >
              <FaTemperatureLow className="weather-icon" />
              <h3>
                {Math.round(weatherData.main.temp_min)}
                <span>&deg;</span>C
              </h3>
              <p>Min Temp</p>
            </div>

            {/* Max Temperature Card */}
            <div
              className="weather-card"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <FaTemperatureHigh className="weather-icon" />
              <h3>{Math.round(weatherData.main.temp_max)}°C</h3>
              <p>Max Temp</p>
            </div>

            {/* Pressure Card */}
            <div
              className="weather-card"
              data-aos="fade-up"
              data-aos-delay="450"
            >
              <FaTachometerAlt className="weather-icon" />
              <h3>{weatherData.main.pressure} hPa</h3>
              <p>Pressure</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer with fade-up animation */}
      <footer className="app-footer" data-aos="fade-up">
        <p>
          &copy; {new Date().getFullYear()} WeatherSphere developed by Jahedi
          Alam Tuhin
        </p>
      </footer>
    </div>
  );
};

export default Weather;
