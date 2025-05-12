import { useState } from "react";

export default function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });

    if (value.trim() === "") {
      setErrors({ ...errors, [name]: "This field is required" });
    } else {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return { values, errors, handleChange, setValues, setErrors, resetForm };
}
