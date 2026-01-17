import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Alert,
} from "@mui/material";
import { addProduct } from "../../services/productService";

const CATEGORIES = [
  "Fresh Fruits",
  "Fresh Vegetables",
  "Dairy & Bakery",
  "Staples & Grains",
  "Snacks & Beverages",
  "Household Essentials",
];

function AddProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    image: "",
    mrp: "",
    price: "",
    unit: "",
    stock: "",
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.image.trim()) {
      newErrors.image = "Image URL is required";
    } else if (!isValidUrl(formData.image)) {
      newErrors.image = "Please enter a valid URL";
    }

    if (!formData.mrp || formData.mrp <= 0) {
      newErrors.mrp = "MRP must be greater than 0";
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (parseFloat(formData.price) > parseFloat(formData.mrp)) {
      newErrors.price = "Price cannot be greater than MRP";
    }

    if (!formData.unit.trim()) {
      newErrors.unit = "Unit is required";
    }

    if (formData.stock === "" || formData.stock < 0) {
      newErrors.stock = "Stock must be 0 or greater";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!validate()) {
      return;
    }

    try {
      const product = {
        name: formData.name.trim(),
        category: formData.category,
        image: formData.image.trim(),
        mrp: parseFloat(formData.mrp),
        price: parseFloat(formData.price),
        unit: formData.unit.trim(),
        stock: parseInt(formData.stock) || 0,
      };

      addProduct(product);
      navigate("/admin/products");
    } catch (error) {
      console.error("Error adding product:", error);
      setSubmitError("Failed to add product. Please try again.");
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", px: 2 }}>
      <Typography
        variant="h4"
        sx={{ mb: 4, fontWeight: 600, color: "#212121" }}
      >
        Add New Product
      </Typography>

      <Paper
        elevation={0}
        sx={{ p: 4, borderRadius: 2, border: "1px solid #e0e0e0" }}
      >
        {submitError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {submitError}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "grid", gap: 3 }}>
            {/* Product Name */}
            <TextField
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              required
              fullWidth
            />

            {/* Category and Unit */}
            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}
            >
              <TextField
                select
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                error={!!errors.category}
                helperText={errors.category}
                required
                fullWidth
              >
                {CATEGORIES.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Unit"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                error={!!errors.unit}
                helperText={errors.unit || "e.g., 1 kg, 500 g, 1 pack"}
                required
                fullWidth
              />
            </Box>

            {/* Image URL */}
            <TextField
              label="Image URL"
              name="image"
              value={formData.image}
              onChange={handleChange}
              error={!!errors.image}
              helperText={errors.image || "Enter a valid image URL"}
              required
              fullWidth
            />

            {/* MRP, Price, and Stock */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 3,
              }}
            >
              <TextField
                label="MRP (₹)"
                name="mrp"
                type="number"
                value={formData.mrp}
                onChange={handleChange}
                error={!!errors.mrp}
                helperText={errors.mrp}
                inputProps={{ min: 0, step: 0.01 }}
                required
                fullWidth
              />

              <TextField
                label="Selling Price (₹)"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                error={!!errors.price}
                helperText={errors.price}
                inputProps={{ min: 0, step: 0.01 }}
                required
                fullWidth
              />

              <TextField
                label="Stock Quantity"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                error={!!errors.stock}
                helperText={errors.stock}
                inputProps={{ min: 0 }}
                required
                fullWidth
              />
            </Box>

            {/* Action Buttons */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "flex-end",
                mt: 2,
              }}
            >
              <Button
                variant="outlined"
                onClick={() => navigate("/admin/products")}
                sx={{
                  textTransform: "none",
                  px: 4,
                  borderColor: "#757575",
                  color: "#757575",
                  "&:hover": {
                    borderColor: "#616161",
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  textTransform: "none",
                  px: 4,
                  backgroundColor: "#2e7d32",
                  "&:hover": {
                    backgroundColor: "#1b5e20",
                  },
                }}
              >
                Add Product
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}

export default AddProduct;
