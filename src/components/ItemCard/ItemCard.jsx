import { useContext } from "react";
import AppContext from "../../contexts/AppContext";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, handleCardLike }) {
  const { isLoggedIn, currentUser } = useContext(AppContext);

  function handleLike() {
    handleCardLike({
      id: item._id,
      isLiked: item.likes.some((id) => id === currentUser._id),
    });
  }

  function handleImageClick() {
    onCardClick(item);
  }

  const isLiked = item.likes.some((id) => id === currentUser._id);

  // Fallback image if imageUrl fails
  const imageSrc = item.imageUrl || "https://via.placeholder.com/150";

  return (
    <div className="itemCard">
      {" "}
      {/* Changed from <li> to <div> */}
      <div className="itemCard__title-heart-container">
        <h2 className="itemCard-title">{item.name}</h2>
        {isLoggedIn && currentUser && (
          <button
            type="button"
            className={`itemCard-title-heart-btn ${
              isLiked ? "itemCard-title-heart-btn-liked" : ""
            }`}
            onClick={handleLike}
          ></button>
        )}
      </div>
      <img
        onClick={handleImageClick}
        className="itemCard-img"
        src={imageSrc}
        alt={item.name}
        onError={(e) => (e.target.src = "https://picsum.photos/150")} // Fallback on error
      />
    </div>
  );
}

export default ItemCard;
