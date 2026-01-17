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
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
} from "@mui/icons-material";

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

function Contact() {
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
      // Only allow letters and spaces
      const filteredValue = value.replace(/[^a-zA-Z\s]/g, "");
      setFormData((prev) => ({
        ...prev,
        [name]: filteredValue,
      }));
    }
    // Only allow digits for phone
    else if (name === "phone") {
      const filteredValue = value.replace(/\D/g, "");
      // Limit phone to 10 digits
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
        existingMessages.unshift(messageData); // Add new message at the beginning
        localStorage.setItem(
          "contactMessages",
          JSON.stringify(existingMessages)
        );
      } catch (error) {
        console.error("Error saving message:", error);
      }

      console.log("Form submitted:", formData);
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

  const contactInfo = [
    {
      icon: <EmailIcon sx={{ fontSize: 32, color: "#2e7d32" }} />,
      title: "Email",
      content: "support@zonixfresh.com",
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 32, color: "#2e7d32" }} />,
      title: "Phone",
      content: "+91 9XXXXXXXXX",
    },
    {
      icon: <LocationIcon sx={{ fontSize: 32, color: "#2e7d32" }} />,
      title: "Address",
      content: "Pune, Maharashtra, India",
    },
    {
      icon: <TimeIcon sx={{ fontSize: 32, color: "#2e7d32" }} />,
      title: "Hours",
      content: "9:00 AM – 9:00 PM (Mon–Sat)",
    },
  ];

  return (
    <Box sx={{ backgroundColor: "#fafafa", minHeight: "100vh" }}>
      {/* Header Section with Background Image */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          py: { xs: 6, sm: 7, md: 8 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          minHeight: { xs: "280px", sm: "320px", md: "360px" },
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "brightness(0.4)",
            zIndex: 0,
          },
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            maxWidth: "800px",
            width: "100%",
            px: { xs: 2, sm: 3, md: 4 },
            textAlign: "center",
            color: "white",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              mb: 2,
              lineHeight: 1.2,
              textShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }}
          >
            Get in Touch
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
              fontWeight: 400,
              lineHeight: 1.6,
              opacity: 0.95,
              textShadow: "0 1px 4px rgba(0,0,0,0.2)",
            }}
          >
            Have a question or need help? We're here to assist you.
          </Typography>
        </Box>
      </Box>

      {/* Main Content - Side by Side Layout */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 4, md: 6 },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1200px",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 4, md: 4 },
            alignItems: "stretch",
          }}
        >
          {/* Contact Form - Left Side */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 4, md: 5 },
              borderRadius: 2,
              border: "1px solid #e0e0e0",
              backgroundColor: "white",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              flex: { xs: "1 1 100%", md: "1.2 1 0" },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                fontSize: { xs: "1.5rem", md: "1.75rem" },
                color: "#1a1a1a",
                mb: 1,
                textAlign: "center",
              }}
            >
              Send us a Message
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#666",
                mb: 4,
                textAlign: "center",
              }}
            >
              Fill out the form below and we'll get back to you soon
            </Typography>

            {submitted && (
              <Box
                sx={{
                  p: 2,
                  mb: 3,
                  borderRadius: 1,
                  backgroundColor: "#e8f5e9",
                  border: "1px solid #2e7d32",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, color: "#2e7d32" }}
                >
                  ✓ Thank you! We'll get back to you soon.
                </Typography>
              </Box>
            )}

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                flex: 1,
                justifyContent: "space-between",
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
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
                rows={6}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 1,
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
                    px: { xs: 4, md: 6 },
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    fontSize: "1rem",
                    width: { xs: "100%", sm: "auto" },
                    minWidth: { sm: "200px" },
                    "&:hover": {
                      backgroundColor: "#1b5e20",
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(46, 125, 50, 0.3)",
                    },
                    "&:disabled": {
                      backgroundColor: "#81c784",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  {loading ? (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CircularProgress size={20} sx={{ color: "white" }} />
                      <Typography>Sending...</Typography>
                    </Box>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </Box>
            </Box>
          </Paper>

          {/* Contact Info Cards - Right Side */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: { xs: 2.5, md: 3 },
              flex: { xs: "1 1 100%", md: "1 1 0" },
            }}
          >
            {contactInfo.map((info, index) => (
              <Paper
                key={index}
                elevation={0}
                sx={{
                  p: { xs: 2.5, md: 3 },
                  textAlign: "center",
                  borderRadius: 2,
                  border: "1px solid #e0e0e0",
                  backgroundColor: "white",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  flex: { xs: "1 1 calc(50% - 10px)", md: "1 1 calc(50% - 12px)" },
                  minWidth: { xs: "calc(50% - 10px)", md: "calc(50% - 12px)" },
                  maxWidth: { xs: "calc(50% - 10px)", md: "calc(50% - 12px)" },
                }}
              >
                <Box
                  sx={{
                    mb: 1.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: { xs: 56, md: 64 },
                    height: { xs: 56, md: 64 },
                    borderRadius: "50%",
                    backgroundColor: "rgba(46, 125, 50, 0.08)",
                  }}
                >
                  {info.icon}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "#1a1a1a",
                    mb: 0.5,
                    fontSize: { xs: "1rem", md: "1.125rem" },
                  }}
                >
                  {info.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                    lineHeight: 1.6,
                    fontSize: { xs: "0.875rem", md: "0.9375rem" },
                  }}
                >
                  {info.content}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Contact;
