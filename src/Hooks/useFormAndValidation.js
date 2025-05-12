import { useState, useCallback } from "react";

const validationPatterns = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    errorMessage: "Please enter a valid email address",
  },
  password: {
    pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    errorMessage: "Password must contain at least one letter and one number",
  },
  name: {
    pattern: /^[A-Za-z\s]{2,30}$/,
    errorMessage: "Name should be 2-30 characters long with letters only",
  },

  url: {
    pattern:
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/,
    errorMessage: "Please enter a valid URL",
  },

  avatar: {
    pattern:
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/,
    errorMessage: "Please enter a valid image URL for your avatar",
  },
};

export function useFormAndValidation(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);

  const validateField = useCallback((name, value) => {
    if (validationPatterns[name]) {
      const { pattern, errorMessage } = validationPatterns[name];
      if (!pattern.test(value)) {
        return errorMessage;
      }
    } else if (!value) {
      return "This field is required";
    }
    return "";
  }, []);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));
      setIsValid(e.target.closest("form").checkValidity());

      const error = validateField(name, value);
      if (error) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: error,
        }));
      } else {
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors[name];
          return newErrors;
        });
      }
    },
    [validateField]
  );

  const handleBlur = useCallback(
    (e) => {
      const { name, value } = e.target;
      const error = validateField(name, value);
      if (error) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: error,
        }));
      }
    },
    [validateField]
  );
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setIsValid(true);
  }, [initialValues]);

  return {
    values,
    handleChange,
    handleBlur,
    errors,
    isValid,
    resetForm,
    setValues,
  };
}
