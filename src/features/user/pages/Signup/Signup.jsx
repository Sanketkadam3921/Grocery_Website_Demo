import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as yup from "yup";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Link as MuiLink,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { signup } from "../../../auth/services/authService";
import { useAuth } from "../../../auth/hooks/useAuth";

// Validation schema using Yup
const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Full name is required")
    .matches(/^[a-zA-Z\s]+$/, "Full name should not contain numbers")
    .min(2, "Full name must be at least 2 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format")
    .test(
      "valid-tld",
      "Email must have a valid domain extension (e.g., .com, .in, .org, .gov, .net, .edu)",
      (value) => {
        if (!value) return false;
        // List of valid TLDs
        const validTLDs = [
          "com",
          "in",
          "org",
          "gov",
          "net",
          "edu",
          "co",
          "io",
          "ai",
          "uk",
          "us",
          "ca",
          "au",
          "de",
          "fr",
          "jp",
          "cn",
          "ru",
          "br",
          "mx",
          "info",
          "biz",
          "tech",
          "online",
          "site",
          "xyz",
          "me",
          "tv",
          "cc",
          "ws",
          "name",
          "mobi",
          "asia",
          "tel",
          "pro",
          "travel",
          "jobs",
          "mil",
          "int",
        ];
        // Extract TLD from email (part after the last dot)
        const emailParts = value.split("@");
        if (emailParts.length !== 2) return false;
        const domainParts = emailParts[1].split(".");
        if (domainParts.length < 2) return false;
        const tld = domainParts[domainParts.length - 1].toLowerCase();
        return validTLDs.includes(tld);
      },
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(/^\S*$/, "Password cannot contain spaces"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords do not match")
    .matches(/^\S*$/, "Password cannot contain spaces"),
});

function Signup() {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let filteredValue = value;

    // Prevent numbers in name field
    if (name === "name") {
      filteredValue = value.replace(/[^a-zA-Z\s]/g, "");
    }
    // Prevent spaces in password fields
    else if (name === "password" || name === "confirmPassword") {
      filteredValue = value.replace(/\s/g, "");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: filteredValue,
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

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
    setSubmitError("");

    const isValid = await validateForm();
    if (!isValid) {
      return;
    }

    const result = signup({
      name: formData.name,
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
        mt: 4,
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
            Create Account
          </Typography>
          <Typography
            variant="body2"
            sx={{
              mb: 4,
              color: "#757575",
              textAlign: "center",
            }}
          >
            Sign up to start shopping with us
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
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                required
                autoComplete="name"
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
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                required
                autoComplete="email"
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
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={
                  errors.password ||
                  "Must be at least 6 characters, no spaces allowed"
                }
                required
                autoComplete="new-password"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        sx={{
                          color: "#666",
                          backgroundColor: "#fff",
                          "&:hover": {
                            backgroundColor: "#f5f5f5",
                          },
                        }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={
                  errors.confirmPassword ||
                  "Must match password, no spaces allowed"
                }
                required
                autoComplete="new-password"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        sx={{
                          color: "#666",
                          backgroundColor: "#fff",
                          "&:hover": {
                            backgroundColor: "#f5f5f5",
                          },
                        }}
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
                Sign Up
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
              Already have an account?{" "}
              <MuiLink
                component={Link}
                to="/login"
                sx={{
                  color: "#2e7d32",
                  fontWeight: 600,
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Sign In
              </MuiLink>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Signup;
