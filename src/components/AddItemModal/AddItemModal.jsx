import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

export default function AddItemModal({
  onClose,
  isOpen,
  onAddItemModalSubmit,
}) {
  const [name, setName] = useState("");
  const [garmentUrl, setGarmentUrl] = useState("");
  const [tempButton, setTempButton] = useState("hot"); // Default to "hot"
  const [hasInteracted, setHasInteracted] = useState(false); // Track user interaction

  // Validation state
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Validate form only after user interaction
  useEffect(() => {
    if (hasInteracted) {
      const validateForm = () => {
        const newErrors = {};
        if (!name || name.length < 4) {
          newErrors.name = "Name must be at least 4 characters";
        }
        if (!garmentUrl || !/^https?:\/\/\S+$/i.test(garmentUrl)) {
          newErrors.garmentUrl = "Please enter a valid image URL";
        }
        if (!["hot", "warm", "cold"].includes(tempButton)) {
          newErrors.tempButton = "Please select a weather type";
        }
        setErrors(newErrors);
        setIsFormValid(Object.keys(newErrors).length === 0);
      };
      validateForm();
    }
  }, [name, garmentUrl, tempButton, hasInteracted]);

  function handleNameChange(e) {
    setName(e.target.value);
    if (!hasInteracted) setHasInteracted(true); // Trigger validation after first change
  }

  function handleImageUrlChange(e) {
    setGarmentUrl(e.target.value);
    if (!hasInteracted) setHasInteracted(true); // Trigger validation after first change
  }

  function handleTempButton(e) {
    setTempButton(e.target.value);
    if (!hasInteracted) setHasInteracted(true); // Trigger validation after first change
  }

  function resetForm() {
    setName("");
    setGarmentUrl("");
    setTempButton("hot"); // Reset to default
    setErrors({});
    setIsFormValid(false);
    setHasInteracted(false); // Reset interaction state
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isFormValid || !hasInteracted) {
      // If no interaction yet, validate on submit
      const validateForm = () => {
        const newErrors = {};
        if (!name || name.length < 4) {
          newErrors.name = "Name must be at least 4 characters";
        }
        if (!garmentUrl || !/^https?:\/\/\S+$/i.test(garmentUrl)) {
          newErrors.garmentUrl = "Please enter a valid image URL";
        }
        if (!["hot", "warm", "cold"].includes(tempButton)) {
          newErrors.tempButton = "Please select a weather type";
        }
        setErrors(newErrors);
        setIsFormValid(Object.keys(newErrors).length === 0);
        setHasInteracted(true); // Mark as interacted after submit attempt
        return Object.keys(newErrors).length === 0;
      };
      if (validateForm()) {
        onAddItemModalSubmit({ name, garmentUrl, tempButton }, resetForm);
      }
    } else if (isFormValid) {
      onAddItemModalSubmit({ name, garmentUrl, tempButton }, resetForm);
    }
  }

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isFormValid} // Pass validation state
    >
      <label htmlFor="add-garment-name-input" className="modal__label">
        Name{" "}
        <input
          id="add-garment-name-input"
          type="text"
          className={`modal__input ${
            hasInteracted && errors.name ? "modal__input_invalid" : ""
          }`}
          name="name"
          placeholder="Name"
          required
          size="52"
          onChange={handleNameChange}
          value={name}
        />
        {hasInteracted && errors.name && (
          <div className="modal__error">{errors.name}</div>
        )}
      </label>
      <label htmlFor="add-garment-link" className="modal__label">
        Image{" "}
        <input
          id="add-garment-link"
          type="url"
          className={`modal__input ${
            hasInteracted && errors.garmentUrl ? "modal__input_invalid" : ""
          }`}
          name="link"
          placeholder="Image URL"
          required
          size="52"
          value={garmentUrl}
          onChange={handleImageUrlChange}
        />
        {hasInteracted && errors.garmentUrl && (
          <div className="modal__error">{errors.garmentUrl}</div>
        )}
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the Weather type:</legend>
        <div className="modal__radio-group">
          <label htmlFor="hot" className="modal__radio-label">
            <input
              id="hot"
              name="climate"
              type="radio"
              className="modal__radio-input"
              value="hot"
              onChange={handleTempButton}
              checked={tempButton === "hot"}
            />
            <span className="modal__radio-text">Hot</span>
          </label>
          <label htmlFor="warm" className="modal__radio-label">
            <input
              id="warm"
              name="climate"
              type="radio"
              className="modal__radio-input"
              value="warm"
              onChange={handleTempButton}
              checked={tempButton === "warm"}
            />
            <span className="modal__radio-text">Warm</span>
          </label>
          <label htmlFor="cold" className="modal__radio-label">
            <input
              id="cold"
              name="climate"
              type="radio"
              className="modal__radio-input"
              value="cold"
              onChange={handleTempButton}
              checked={tempButton === "cold"}
            />
            <span className="modal__radio-text">Cold</span>
          </label>
        </div>
        {hasInteracted && errors.tempButton && (
          <div className="modal__error">{errors.tempButton}</div>
        )}
      </fieldset>
    </ModalWithForm>
  );
}
