import "./ModalWithForm.css";

function ModalWithForm({
  title,
  children,
  onClose,
  isOpen,
  onSubmit,
  buttonText,
  modalRef,
  isDisabled,
}) {
  const handleButtonClick = (e) => {
    e.preventDefault();
    if (!isDisabled && onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content" ref={modalRef}>
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
          aria-label="close"
        >
          ✕
        </button>
        <form className="modal__form">
          {children}
          <button
            type="button"
            className="modal__submit"
            disabled={isDisabled}
            onClick={handleButtonClick}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
