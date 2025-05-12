import { useEffect } from "react";
import "./Modal.css";

export const Modal = ({
  children,
  onClose,
  isOpen,
  containerModifier,
  buttonModifier,
}) => {
  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [onClose]);

  const handleOverlayClickClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal ${isOpen && "modal_opened"}`}
      onClick={handleOverlayClickClose}
    >
      <div className={`modal__content ${containerModifier}`}>
        {children}
        <button
          className={`modal__close ${buttonModifier}`}
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
};
