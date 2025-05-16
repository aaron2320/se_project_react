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
  // Sort clothingItems by _id in descending order to show new items first
  const sortedClothingItems = [...clothingItems].sort((a, b) =>
    b._id.localeCompare(a._id)
  );

  return (
    <div className="clothes-section">
      <div className="clothes-items-menu">
        <p>Your Items</p>
        <button className="clothes-items-menu_btn" onClick={handleAddClick}>
          + Add New
        </button>
      </div>

      <ul className="clothes-section__list">
        {sortedClothingItems.length > 0 ? (
          sortedClothingItems.map((item) => (
            <li key={item._id}>
              <ItemCard
                item={item}
                onCardClick={onCardClick}
                handleCardLike={handleCardLike}
              />
            </li>
          ))
        ) : (
          <li>No items to display.</li>
        )}
      </ul>
    </div>
  );
}

export default ClothesSection;
