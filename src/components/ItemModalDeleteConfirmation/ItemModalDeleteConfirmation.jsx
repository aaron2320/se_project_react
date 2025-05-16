import "./ItemModalDeleteConfirmation.css";
import useModalClose from "../../Hooks/useModalClose"; // Updated path

export default function ItemModalDeleteConfirmation({
  isOpen,
  onClose,
  onHandleDeleteCard,
}) {
  useModalClose(isOpen, onClose);

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__confirm-delete">
        <button
          type="button"
          className="modal__close modal__close_type_image_confirmation"
          onClick={onClose}
        ></button>
        <p className="modal__confirm-delete-message">
          Are you sure you want to delete this item? <br />
          This action is irreversible
        </p>
        <button
          type="button"
          className="modal__delete-card-btn"
          onClick={onHandleDeleteCard}
        >
          Yes, Delete item
        </button>
        <button
          type="button"
          className="modal__delete-card-btn_cancel"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
