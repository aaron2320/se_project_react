import "./ItemModal.css";
import useModalClose from "../../utils/closeModalHook";

function ItemModal({
  isOpen,
  onClose,
  card,
  onDelete,
  isLoggedIn,
  currentUserId,
}) {
  useModalClose(isOpen, onClose);

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          type="button"
          className="modal__close modal__close_type_image"
          onClick={onClose}
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          {isLoggedIn && currentUserId === card.owner && (
            <button
              type="button"
              className="modal__delete-btn"
              onClick={onDelete}
            >
              Delete Item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
