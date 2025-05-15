import { useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import AppContext from "../../contexts/AppContext";

function Main({
  weatherData,
  handleCardClick,
  clothingItems,
  handleCardLike,
  suggestedItems,
}) {
  const { currentTemperatureUnit } = useContext(AppContext);

  // Default message if weatherData isn't loaded
  const tempDisplay = weatherData?.temp
    ? weatherData.temp[currentTemperatureUnit]
    : "N/A";

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {tempDisplay}°{currentTemperatureUnit} / You may want to
          wear:
        </p>
        <ul className="cards__list">
          {suggestedItems.length > 0 ? (
            suggestedItems.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                handleCardLike={handleCardLike}
              />
            ))
          ) : (
            <li className="cards__no-items">
              No suggested items for this weather type.
            </li>
          )}
        </ul>
      </section>
    </main>
  );
}

export default Main;
