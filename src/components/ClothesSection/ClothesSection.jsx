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
  // Filter clothingItems to exclude items already in suggestedItems
  const nonSuggestedItems = clothingItems.filter(
    (item) => !suggestedItems.some((suggested) => suggested._id === item._id)
  );

  return (
    <div className="clothes-section">
      <div className="clothes-items-menu">
        <p>Your Items</p>
        <button className="clothes-items-menu_btn" onClick={handleAddClick}>
          + Add New
        </button>
      </div>
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
