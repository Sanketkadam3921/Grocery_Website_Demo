import { useState } from "react";
import * as yup from "yup";

// Validation schema using Yup
const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .matches(/^[a-zA-Z\s]+$/, "First name should not contain numbers")
    .min(2, "First name must be at least 2 characters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .matches(/^[a-zA-Z\s]+$/, "Last name should not contain numbers")
    .min(2, "Last name must be at least 2 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format")
    .matches(
      /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/,
      "Email must have a valid domain (e.g., .com, .in, .org)"
    ),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[6-9]\d{9}$/, "Phone number must start with 6, 7, 8, or 9 and be exactly 10 digits")
    .length(10, "Phone number must be exactly 10 digits"),
  address: yup
    .string()
    .required("Address is required")
    .min(10, "Address must be at least 10 characters"),
  city: yup
    .string()
    .required("City is required")
    .matches(/^[a-zA-Z\s]+$/, "City should not contain numbers"),
  state: yup
    .string()
    .required("State is required")
    .matches(/^[a-zA-Z\s]+$/, "State should not contain numbers"),
  pincode: yup
    .string()
    .required("Pincode is required")
    .matches(/^\d{6}$/, "Pincode must be exactly 6 digits"),
  landmark: yup.string().optional(),
});

export const useCheckoutForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Prevent numbers in name fields
    if (name === "firstName" || name === "lastName" || name === "city" || name === "state") {
      // Only allow letters and spaces
      const filteredValue = value.replace(/[^a-zA-Z\s]/g, "");
      setFormData((prev) => ({
        ...prev,
        [name]: filteredValue,
      }));
    }
    // Only allow digits for phone and pincode
    else if (name === "phone" || name === "pincode") {
      const filteredValue = value.replace(/\D/g, "");
      // Limit phone to 10 digits and pincode to 6 digits
      const maxLength = name === "phone" ? 10 : 6;
      setFormData((prev) => ({
        ...prev,
        [name]: filteredValue.slice(0, maxLength),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const newErrors = {};
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  return {
    formData,
    errors,
    handleInputChange,
    validateForm,
  };
};
