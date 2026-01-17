import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  InputAdornment,
} from "@mui/material";
import { Lock as LockIcon, Email as EmailIcon } from "@mui/icons-material";
import { adminLogin } from "../../services/adminAuthService";

function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  // Hardcoded admin credentials for placeholders
  const ADMIN_EMAIL = "admin@grocery.com";
  const ADMIN_PASSWORD = "admin123";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
    setSubmitError("");
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!validate()) {
      return;
    }

    const result = adminLogin({
      email: formData.email,
      password: formData.password,
    });

    if (result.success) {
      navigate("/admin");
    } else {
      setSubmitError(result.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 2,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            border: "1px solid #e0e0e0",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 3,
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                backgroundColor: "#2e7d32",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LockIcon sx={{ color: "white", fontSize: 32 }} />
            </Box>
          </Box>

          <Typography
            variant="h4"
            sx={{
              mb: 1,
              fontWeight: 700,
              color: "#212121",
              textAlign: "center",
            }}
          >
            Admin Login
          </Typography>
          <Typography
            variant="body2"
            sx={{
              mb: 4,
              color: "#757575",
              textAlign: "center",
            }}
          >
            Sign in to access the admin dashboard
          </Typography>

          {submitError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {submitError}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                required
                autoComplete="email"
                placeholder={ADMIN_EMAIL}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: "#757575" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#2e7d32",
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                required
                autoComplete="current-password"
                placeholder={ADMIN_PASSWORD}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: "#757575" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#2e7d32",
                    },
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  py: 1.5,
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 600,
                  backgroundColor: "#2e7d32",
                  "&:hover": {
                    backgroundColor: "#1b5e20",
                  },
                }}
              >
                Sign In
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}

export default AdminLogin;
