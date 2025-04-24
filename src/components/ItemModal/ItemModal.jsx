import "./ItemModal.css";

function ItemModal({ card, onClose, handleDelete, isOpen, modalRef }) {
  const handleDeleteClick = () => {
    handleDelete(card);
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content" ref={modalRef}>
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
          aria-label="close"
        >
          ✕
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__info">
          <h2 className="modal__title">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          <button
            type="button"
            className="modal__delete"
            onClick={handleDeleteClick}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
