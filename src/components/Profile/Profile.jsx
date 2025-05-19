import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import { useContext } from "react";
import AppContext from "../../contexts/AppContext";

function Profile({
  onCardClick,
  clothingItems,
  handleAddClick,
  handleCardLike,
  handleEditProfileClick,
  weatherData,
  getWeatherSuggestions,
}) {
  const { currentTemperatureUnit } = useContext(AppContext);
  const suggestedItems = getWeatherSuggestions(weatherData, clothingItems);

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar handleEditProfileClick={handleEditProfileClick} />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          handleCardLike={handleCardLike}
          suggestedItems={suggestedItems}
          weatherData={weatherData}
        />
      </section>
    </div>
  );
}

export default Profile;
