import { useContext } from "react";
import { weatherTypes } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import "./WeatherCard.css";

function WeatherCard({ temp, isDay, condition }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const filteredType = weatherTypes.filter((type) => {
    return type.day === isDay && type.condition === condition;
  });

  const weatherType = filteredType[0];
  const weatherTypeUrl = filteredType[0]?.url;
  const weatherTypeCondition = filteredType[0]?.condition;

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {temp[currentTemperatureUnit]}° {currentTemperatureUnit}
      </p>
      <img
        className="weather-card__img"
        src={weatherType?.url}
        alt={`card showing ${weatherType?.day ? "day" : "night"} time ${
          weatherType?.condition
        } weather`}
      />
    </section>
  );
}

export default WeatherCard;
