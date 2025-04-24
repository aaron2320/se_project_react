import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";
import "./AddItemModal.css";

const AddItemModal = ({ isOpen, onAddItem, onClose, modalRef }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");
  const [showWeatherError, setShowWeatherError] = useState(false);
  const [submitted, setSubmitted] = useState(false); // Track if form was submitted

  useEffect(() => {
    if (isOpen) {
      setName("");
      setImageUrl("");
      setWeather("");
      setShowWeatherError(false);
      setSubmitted(false); // Reset on modal open
    }
  }, [isOpen]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
    setShowWeatherError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true); // Mark form as submitted
    if (!weather) {
      setShowWeatherError(true);
      return;
    }
    if (!name.trim() || !imageUrl.trim()) {
      return; // Don't submit if name or imageUrl is empty
    }
    onAddItem({ name, imageUrl, weather });
  };

  const isFormValid = name.trim() && imageUrl.trim() && weather;

  return (
    <ModalWithForm
      title="New garment"
      isOpen={isOpen}
      onClose={onClose}
      modalRef={modalRef}
      onSubmit={handleSubmit}
      buttonText="Add garment"
      isDisabled={!isFormValid}
    >
      <label className="modal__label" htmlFor="name">
        Name
        <input
          className={`modal__input ${
            submitted && !name.trim() ? "modal__input_invalid" : ""
          }`}
          type="text"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </label>
      <label className="modal__label" htmlFor="imageUrl">
        Image
        <input
          className={`modal__input ${
            submitted && !imageUrl.trim() ? "modal__input_invalid" : ""
          }`}
          type="url"
          id="imageUrl"
          placeholder="Image URL"
          value={imageUrl}
          onChange={handleImageUrlChange}
          required
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label className="modal__radio-button">
          <input
            className="modal__radio-input"
            type="radio"
            id="weather-hot"
            name="weather"
            value="hot"
            checked={weather === "hot"}
            onChange={handleWeatherChange}
            required
          />
          <span className="modal__radio-label">Hot</span>
        </label>
        <label className="modal__radio-button">
          <input
            className="modal__radio-input"
            type="radio"
            id="weather-warm"
            name="weather"
            value="warm"
            checked={weather === "warm"}
            onChange={handleWeatherChange}
            required
          />
          <span className="modal__radio-label">Warm</span>
        </label>
        <label className="modal__radio-button">
          <input
            className="modal__radio-input"
            type="radio"
            id="weather-cold"
            name="weather"
            value="cold"
            checked={weather === "cold"}
            onChange={handleWeatherChange}
            required
          />
          <span className="modal__radio-label">Cold</span>
        </label>
        {showWeatherError && (
          <p className="modal__error">Please select a weather type</p>
        )}
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
