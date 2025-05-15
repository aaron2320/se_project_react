import sunny from "../../assets/sunny.svg";
import nightStorm from "../../assets/nightstorm.png";
import nightSnow from "../../assets/nightsnow.png";
import nightRain from "../../assets/nightrain.png";
import nightFog from "../../assets/nightfog.png";
import nightCloudy from "../../assets/nightcloudy.png";
import nightClear from "../../assets/nightclear.png";
import dayStorm from "../../assets/daystorm.png";
import daySnow from "../../assets/daysnow.png";
import dayRain from "../../assets/dayrain.png";
import dayFog from "../../assets/dayfog.png";
import dayCloudy from "../../assets/daycloudy.png";
import dayClear from "../../assets/dayclear.svg";
import "./WeatherCard.css";
import AppContext from "../../contexts/AppContext";
import { useContext } from "react";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit, isOn } = useContext(AppContext);

  // Default values if weatherData is not fully loaded
  const temp = weatherData?.temp
    ? isOn
      ? weatherData.temp.C
      : weatherData.temp.F
    : "N/A";
  const weatherType = weatherData?.type || "unknown";
  const isDay = weatherData?.isDay ?? true; // Use nullish coalescing for safer default

  // Map weather types to corresponding images based on day/night and condition
  const weatherImages = {
    sunny: dayClear,
    "sunny with clouds": dayCloudy,
    "night time": nightClear,
    "night time with clouds": nightCloudy,
    cloudy: isDay ? dayCloudy : nightCloudy,
    raining: isDay ? dayRain : nightRain,
    fog: isDay ? dayFog : nightFog,
    snowing: isDay ? daySnow : nightSnow,
    hot: dayClear,
    warm: dayClear,
    cold: isDay ? dayCloudy : nightCloudy,
    unknown: isDay ? dayCloudy : nightCloudy,
  };

  const weatherImage =
    weatherImages[weatherType.toLowerCase()] ||
    (isDay ? dayCloudy : nightCloudy);

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {temp}°{currentTemperatureUnit}
      </p>
      <img
        src={weatherImage}
        alt={`${weatherType} Weather`}
        className="weather-card__img"
      />
    </section>
  );
}

export default WeatherCard;
