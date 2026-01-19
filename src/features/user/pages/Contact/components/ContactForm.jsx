import { useState } from "react";
import * as yup from "yup";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";
import SuccessMessage from "./SuccessMessage";

// Validation schema using Yup
const validationSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .matches(/^[a-zA-Z\s]+$/, "Full name should not contain numbers")
    .min(2, "Full name must be at least 2 characters"),
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
    .matches(
      /^[6-9]\d{9}$/,
      "Phone number must start with 6, 7, 8, or 9 and be exactly 10 digits"
    )
    .length(10, "Phone number must be exactly 10 digits"),
  message: yup
    .string()
    .required("Message is required")
    .min(10, "Message must be at least 10 characters"),
});

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Prevent numbers in fullName field
    if (name === "fullName") {
      const filteredValue = value.replace(/[^a-zA-Z\s]/g, "");
      setFormData((prev) => ({
        ...prev,
        [name]: filteredValue,
      }));
    }
    // Only allow digits for phone
    else if (name === "phone") {
      const filteredValue = value.replace(/\D/g, "");
      setFormData((prev) => ({
        ...prev,
        [name]: filteredValue.slice(0, 10),
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validateForm();
    if (!isValid) return;

    setLoading(true);
    setTimeout(() => {
      // Save message to localStorage
      const messageData = {
        id: `MSG-${Date.now()}`,
        ...formData,
        createdAt: new Date().toISOString(),
        status: "unread",
      };

      try {
        const existingMessages = JSON.parse(
          localStorage.getItem("contactMessages") || "[]"
        );
        existingMessages.unshift(messageData);
        localStorage.setItem(
          "contactMessages",
          JSON.stringify(existingMessages)
        );
      } catch (error) {
        console.error("Error saving message:", error);
      }

      setLoading(false);
      setSubmitted(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        message: "",
      });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, sm: 4, md: 5 },
        borderRadius: 3,
        border: "1px solid #e8e8e8",
        backgroundColor: "white",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transition: "box-shadow 0.3s ease",
        "&:hover": {
          boxShadow: "0 6px 24px rgba(0,0,0,0.12)",
        },
      }}
    >
      <Box sx={{ mb: { xs: 3, sm: 4 } }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
            color: "#1a1a1a",
            mb: 1,
            textAlign: "center",
            letterSpacing: "-0.01em",
          }}
        >
          Send us a Message
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#666",
            textAlign: "center",
            fontSize: { xs: "0.875rem", sm: "0.9375rem", md: "1rem" },
            lineHeight: 1.6,
          }}
        >
          Fill out the form below and we'll get back to you soon
        </Typography>
      </Box>

      {submitted && (
        <Box sx={{ mb: 3 }}>
          <SuccessMessage />
        </Box>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: 2.5, sm: 3, md: 3.5 },
          flex: 1,
        }}
      >
        <TextField
          fullWidth
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          error={!!errors.fullName}
          helperText={errors.fullName}
          required
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              "&:hover fieldset": {
                borderColor: "#2e7d32",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#2e7d32",
                borderWidth: 2,
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#2e7d32",
            },
          }}
        />

        <TextField
          fullWidth
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          error={!!errors.email}
          helperText={errors.email}
          required
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              "&:hover fieldset": {
                borderColor: "#2e7d32",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#2e7d32",
                borderWidth: 2,
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#2e7d32",
            },
          }}
        />

        <TextField
          fullWidth
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          error={!!errors.phone}
          helperText={errors.phone}
          required
          inputProps={{ maxLength: 10 }}
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              "&:hover fieldset": {
                borderColor: "#2e7d32",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#2e7d32",
                borderWidth: 2,
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#2e7d32",
            },
          }}
        />

        <TextField
          fullWidth
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          error={!!errors.message}
          helperText={errors.message}
          required
          multiline
          rows={5}
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              "&:hover fieldset": {
                borderColor: "#2e7d32",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#2e7d32",
                borderWidth: 2,
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#2e7d32",
            },
          }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: { xs: 1, sm: 2 },
          }}
        >
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              backgroundColor: "#2e7d32",
              color: "white",
              textTransform: "none",
              px: { xs: 5, sm: 6, md: 7 },
              py: { xs: 1.5, sm: 1.75 },
              borderRadius: 2,
              fontWeight: 600,
              fontSize: { xs: "0.9375rem", sm: "1rem", md: "1.0625rem" },
              width: { xs: "100%", sm: "100%", md: "auto" },
              minWidth: { md: "220px" },
              boxShadow: "0 4px 12px rgba(46, 125, 50, 0.3)",
              "&:hover": {
                backgroundColor: "#1b5e20",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 16px rgba(46, 125, 50, 0.4)",
              },
              "&:disabled": {
                backgroundColor: "#81c784",
                boxShadow: "none",
              },
              transition: "all 0.3s ease",
            }}
          >
            {loading ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <CircularProgress size={22} sx={{ color: "white" }} />
                <Typography sx={{ fontSize: "inherit" }}>Sending...</Typography>
              </Box>
            ) : (
              "Send Message"
            )}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ContactForm;

