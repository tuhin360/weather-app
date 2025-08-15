import { useState } from "react";
import {
  FaMountain,
  FaSearch,
  FaSun,
  FaTachometerAlt,
  FaTemperatureHigh,
  FaTemperatureLow,
  FaWater,
  FaWind,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { BsFillSunsetFill } from "react-icons/bs";
import "./Weather.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState();
  const [error, setError] = useState();
  const API_KEY = "dc51bd85494dfb908d3f31137230d6e4";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  const handleOnChange = (e) => {
    setCity(e.target.value);
  };

  const fetchWeatherData = async () => {
    try {
      let response = await fetch(url);
      let data = await response.json();
      if (response.ok) {
        setWeatherData(data);
        setError("");
      } else {
        setError("No data found. Please enter a valid city name.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchWeatherData();
    }
  };

  return (
    <div className="container">
      <header className="app-header">
        <h1 className="app-title">WeatherSphere</h1>
        <p className="app-subtitle">Real-time weather updates</p>
      </header>

      <div className="search-container">
        <input
          type="text"
          value={city}
          onChange={handleOnChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter city name"
          className="search-input"
        />
        <button onClick={fetchWeatherData} className="search-button">
          <FaSearch />
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {weatherData && weatherData.weather && (
        <div className="weather-content">
          <div className="weather-main">
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
                <span>°C</span>
              </h2>
            </div>

            <div className="location">
              <FaLocationDot className="location-icon" />
              <h2>
                {weatherData.name}, {weatherData.sys.country}
              </h2>
            </div>
          </div>

          <div className="weather-stats">
            {/* Wind */}
            <div className="weather-card">
              <FaWind className="weather-icon" />
              <h3>{weatherData.wind.speed} km/h</h3>
              <p>Wind Speed</p>
            </div>

            {/* Humidity */}
            <div className="weather-card">
              <WiHumidity className="weather-icon" />
              <h3>{weatherData.main.humidity}%</h3>
              <p>Humidity</p>
            </div>

            {/* Sunrise */}
            <div className="weather-card">
              <FaSun className="weather-icon" />
              <h3>
                {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </h3>
              <p>Sunrise</p>
            </div>

            {/* Sunset */}
            <div className="weather-card">
              <BsFillSunsetFill className="weather-icon" />
              <h3>
                {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </h3>
              <p>Sunset</p>
            </div>

            {/* Feels Like */}
            <div className="weather-card">
              <FaTemperatureHigh className="weather-icon" />
              <h3>{Math.round(weatherData.main.feels_like)}°C</h3>
              <p>Feels Like</p>
            </div>

            {/* Min Temp */}
            <div className="weather-card">
              <FaTemperatureLow className="weather-icon" />
              <h3>{Math.round(weatherData.main.temp_min)}°C</h3>
              <p>Min Temp</p>
            </div>

            {/* Max Temp */}
            <div className="weather-card">
              <FaTemperatureHigh className="weather-icon" />
              <h3>{Math.round(weatherData.main.temp_max)}°C</h3>
              <p>Max Temp</p>
            </div>

            {/* Pressure */}
            <div className="weather-card">
              <FaTachometerAlt className="weather-icon" />
              <h3>{weatherData.main.pressure} hPa</h3>
              <p>Pressure</p>
            </div>
          </div>
        </div>
      )}

      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Weather App by Tuhin</p>
      </footer>
    </div>
  );
};

export default Weather;