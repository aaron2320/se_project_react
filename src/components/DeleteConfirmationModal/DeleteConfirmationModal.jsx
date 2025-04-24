import React from "react";
import "./DeleteConfirmationModal.css";
import close from "../../assets/close.svg";

function DeleteConfirmationModal({ isOpen, onClose, onConfirmDelete }) {
  if (!isOpen) return null;

  return (
    <div className="modal modal_opened">
      <div className="modal__content modal__content_type_confirm">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={close} alt="close" />
        </button>
        <div className="modal__title">
          <h3>
            Are you sure you want to delete this item?
            <br />
            This action is irreversible.
          </h3>
        </div>

        <div className="modal__actions">
          <button
            className="modal__button modal__button_type_confirm"
            onClick={onConfirmDelete}
          >
            Yes, delete item
          </button>
          <button
            className="modal__button modal__button_type_cancel"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
