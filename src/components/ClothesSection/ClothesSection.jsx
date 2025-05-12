import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({
  onCardClick,
  clothingItems,
  handleAddClick,
  handleCardLike,
  suggestedItems,
  weatherData,
}) {
  // Debug logs to track items being rendered
  console.log("ClothesSection - Clothing Items:", clothingItems);
  console.log("ClothesSection - Suggested Items:", suggestedItems);

  // Filter clothingItems to exclude items already in suggestedItems
  const nonSuggestedItems = clothingItems.filter(
    (item) => !suggestedItems.some((suggested) => suggested._id === item._id)
  );
  console.log("ClothesSection - Non-Suggested Items:", nonSuggestedItems);

  return (
    <div className="clothes-section">
      <div className="clothes-items-menu">
        <p>Your Items</p>
        <button className="clothes-items-menu_btn" onClick={handleAddClick}>
          + Add New
        </button>
      </div>
      {weatherData && (
        <div className="clothes-section__weather">
          <p>
            Weather in {weatherData.city}: {weatherData.temp.F}°F,{" "}
            {weatherData.type}
          </p>
          {suggestedItems && suggestedItems.length > 0 && (
            <div className="clothes-section__suggestions">
              <h3>Suggested for Today:</h3>
              <ul className="clothes-section__suggested-list">
                {suggestedItems.map((item) => (
                  <li key={item._id}>
                    <ItemCard
                      item={item}
                      onCardClick={onCardClick}
                      handleCardLike={handleCardLike}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      <ul className="clothes-section__list">
        {nonSuggestedItems.length > 0 ? (
          nonSuggestedItems.map((item) => (
            <li key={item._id}>
              <ItemCard
                item={item}
                onCardClick={onCardClick}
                handleCardLike={handleCardLike}
              />
            </li>
          ))
        ) : (
          <li>No additional items to display.</li>
        )}
      </ul>
    </div>
  );
}

export default ClothesSection;
