import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Link as MuiLink,
} from "@mui/material";
import { login } from "../../../auth/services/authService";
import { useAuth } from "../../../auth/hooks/useAuth";

function Login() {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

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

    const result = login({
      email: formData.email,
      password: formData.password,
    });

    if (result.success) {
      refreshUser();
      navigate("/");
    } else {
      setSubmitError(result.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 200px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
        backgroundColor: "#fafafa",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 2,
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 1,
              fontWeight: 700,
              color: "#212121",
              textAlign: "center",
            }}
          >
            Welcome Back
          </Typography>
          <Typography
            variant="body2"
            sx={{
              mb: 4,
              color: "#757575",
              textAlign: "center",
            }}
          >
            Sign in to your account to continue shopping
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

          <Box
            sx={{
              mt: 3,
              textAlign: "center",
            }}
          >
            <Typography variant="body2" sx={{ color: "#757575" }}>
              Don't have an account?{" "}
              <MuiLink
                component={Link}
                to="/signup"
                sx={{
                  color: "#2e7d32",
                  fontWeight: 600,
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Sign Up
              </MuiLink>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;


