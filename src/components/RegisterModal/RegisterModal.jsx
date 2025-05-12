import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect, useRef, useContext } from "react";
import "./RegisterModal.css";
import AppContext from "../../contexts/AppContext";

export default function RegisterModal({
  onClose,
  isOpen,
  handleRegistration,
  handleModalSwitch,
}) {
  const emailInputRef = useRef(null);
  const { handleValidation } = useContext(AppContext);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    const validationErrors =
      handleValidation({ ...data, [name]: value }) === true
        ? {}
        : handleValidation({ ...data, [name]: value });
    setErrors(validationErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      handleRegistration(data).catch((err) =>
        setServerError(err.message || "Registration failed")
      );
    }
  };

  useEffect(() => {
    if (isOpen) {
      emailInputRef.current?.focus();
      setData({ email: "", password: "", name: "", avatar: "" });
      setErrors({});
      setServerError("");
    }
  }, [isOpen]);

  const isSubmitDisabled = Object.keys(errors).length > 0;

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign up"
      buttonWidthStyle={{ width: "86px" }}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      alternativeAction={
        <button
          type="button"
          className="modal__alternateAction-link"
          onClick={handleModalSwitch}
        >
          or Log In
        </button>
      }
      isValid={!isSubmitDisabled}
    >
      <label htmlFor="signup-email-input" className="modal__label">
        Email*
      </label>
      <input
        ref={emailInputRef}
        id="signup-email-input"
        type="email"
        className={`modal__input ${errors.email ? "modal__input_error" : ""}`}
        name="email"
        placeholder="Email"
        required
        onChange={handleChange}
        value={data.email}
      />
      {errors.email && <span className="modal__error">{errors.email}</span>}

      <label htmlFor="signup-password-input" className="modal__label">
        Password*
      </label>
      <input
        id="signup-password-input"
        name="password"
        type="password"
        className={`modal__input ${
          errors.password ? "modal__input_error" : ""
        }`}
        placeholder="Password"
        value={data.password}
        required
        onChange={handleChange}
      />
      {errors.password && (
        <span className="modal__error">{errors.password}</span>
      )}

      <label htmlFor="signup-name-input" className="modal__label">
        Name*
      </label>
      <input
        id="signup-name-input"
        name="name"
        type="text"
        className={`modal__input ${errors.name ? "modal__input_error" : ""}`}
        placeholder="Name"
        required
        value={data.name}
        onChange={handleChange}
      />
      {errors.name && <span className="modal__error">{errors.name}</span>}

      <label htmlFor="signup-avatar-input" className="modal__label">
        Avatar URL (optional)
      </label>
      <input
        id="signup-avatar-input"
        name="avatar"
        type="url"
        className={`modal__input ${errors.avatar ? "modal__input_error" : ""}`}
        placeholder="Avatar URL"
        value={data.avatar}
        onChange={handleChange}
      />
      {errors.avatar && <span className="modal__error">{errors.avatar}</span>}
      {serverError && (
        <span className="modal__error modal__error_server">{serverError}</span>
      )}
    </ModalWithForm>
  );
}
