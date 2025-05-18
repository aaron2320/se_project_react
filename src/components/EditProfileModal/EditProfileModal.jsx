import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect, useContext } from "react";
import AppContext from "../../contexts/AppContext";
import "./EditProfileModal.css";

export default function EditProfileModal({
  onClose,
  isOpen,
  handleUpdateProfile,
}) {
  const { currentUser } = useContext(AppContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const initialName = currentUser?.username || "";
      const initialAvatar = currentUser?.avatar || "";
      setName(initialName);
      setAvatar(initialAvatar);
      setErrors({}); // Clear errors on modal open
      setHasInteracted(false); // Reset interaction state
      setIsFormValid(initialName.length >= 4); // Set initial validity
    }
  }, [isOpen, currentUser]);

  const validateForm = () => {
    const newErrors = {};
    if (!name || name.length < 4) {
      newErrors.name = "Name must be at least 4 characters";
    }
    if (avatar && !/^https?:\/\/\S+$/i.test(avatar)) {
      newErrors.avatar = "Please enter a valid avatar URL (or leave blank)";
    }
    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  function handleNameChange(e) {
    setName(e.target.value);
    setHasInteracted(true); // Mark as interacted
    validateForm();
  }

  function handleAvatarChange(e) {
    setAvatar(e.target.value);
    setHasInteracted(true); // Mark as interacted
    validateForm();
  }

  function handleSubmit(e) {
    e.preventDefault();
    validateForm(); // Validate on submit
    if (isFormValid) {
      handleUpdateProfile({ name, avatar })
        .then(() => onClose())
        .catch((err) => console.error("Error updating profile:", err));
    }
  }

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save Changes"
      buttonWidthStyle={{ width: "128px" }}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isFormValid}
    >
      <label htmlFor="change-name-input" className="modal__label">
        Name*
        <input
          id="change-name-input"
          type="text"
          className={`modal__input ${
            hasInteracted && errors.name ? "modal__input_invalid" : ""
          }`}
          name="name"
          required
          value={name}
          onChange={handleNameChange}
        />
        {hasInteracted && errors.name && (
          <span className="modal__input_error">{errors.name}</span>
        )}
      </label>
      <label htmlFor="change-avatar-input" className="modal__label">
        Avatar URL
        <input
          id="change-avatar-input"
          name="avatar"
          type="url"
          className={`modal__input ${
            hasInteracted && errors.avatar ? "modal__input_invalid" : ""
          }`}
          value={avatar}
          onChange={handleAvatarChange}
        />
        {hasInteracted && errors.avatar && (
          <span className="modal__input_error">{errors.avatar}</span>
        )}
      </label>
    </ModalWithForm>
  );
}
