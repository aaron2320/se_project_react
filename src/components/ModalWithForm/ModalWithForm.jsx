import "./ModalWithForm.css";
import useModalClose from "../../utils/closeModalHook";

function ModalWithForm({
  children,
  buttonText,
  buttonWidthStyle,
  title,
  isOpen,
  onClose,
  onSubmit,
  alternativeAction,
  isValid,
}) {
  useModalClose(isOpen, onClose);

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__container">
        <h2 className="modal__title">{title}</h2>
        <form onSubmit={onSubmit} className="modal__form" noValidate>
          <button type="button" className="modal__close" onClick={onClose} />

          {children}
          <div className="modal__button-container">
            <button
              type="submit"
              className="modal__submit-btn"
              disabled={!isValid}
              style={buttonWidthStyle}
            >
              {buttonText}
            </button>
            {alternativeAction}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
