import WeatherCard from "../WeatherCard/WeatherCard";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import './Main.css';
function Main({ weatherData, handleCardClick }) {

  return (
    <main>
      <WeatherCard temperature={weatherData.temp.F}
        isDay={weatherData.isDay}
        condition={weatherData.condition} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp.F} &deg; F / You may want to wear:</p>
        <ul className="cards__list">
          {defaultClothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  item={item}
                  key={item._id}
                  onCardClick={handleCardClick} />
              );
            })}
        </ul>

      </section>
    </main>
  );
}

export default Main;