import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { getProductById, updateProduct } from "../../services/productService";

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    price: "",
    stock: "",
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const productId = parseInt(id);
    if (isNaN(productId)) {
      setSubmitError("Invalid product ID");
      setLoading(false);
      return;
    }

    const foundProduct = getProductById(productId);
    if (!foundProduct) {
      setSubmitError("Product not found");
      setLoading(false);
      return;
    }

    setProduct(foundProduct);
    setFormData({
      price: foundProduct.price || "",
      stock: foundProduct.stock || "",
    });
    setLoading(false);
  }, [id]);

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

    if (!formData.price || formData.price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (product && parseFloat(formData.price) > parseFloat(product.mrp)) {
      newErrors.price = "Price cannot be greater than MRP";
    }

    if (formData.stock === "" || formData.stock < 0) {
      newErrors.stock = "Stock must be 0 or greater";
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

    try {
      const updates = {
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0,
      };

      updateProduct(product.id, updates);
      navigate("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error);
      setSubmitError("Failed to update product. Please try again.");
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (submitError && !product) {
    return (
      <Box sx={{ maxWidth: 900, mx: "auto", px: { xs: 2, sm: 3 } }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {submitError}
        </Alert>
        <Button
          variant="outlined"
          onClick={() => navigate("/admin/products")}
          sx={{
            textTransform: "none",
            px: 4,
            height: 42,
            borderColor: "#757575",
            color: "#757575",
            width: { xs: "100%", sm: "auto" },
            "&:hover": {
              borderColor: "#616161",
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          Back to Products
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", px: { xs: 2, sm: 3 } }}>
      <Typography
        variant="h4"
        sx={{
          mb: { xs: 3, md: 4 },
          fontWeight: 600,
          color: "#212121",
          fontSize: { xs: "1.75rem", sm: "2rem", md: "2.125rem" },
        }}
      >
        Edit Product
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 3, md: 4 },
          borderRadius: 2,
          border: "1px solid #e0e0e0",
        }}
      >
        {submitError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {submitError}
          </Alert>
        )}

        {/* Display Product Info (Read-only) */}
        <Box
          sx={{
            mb: 4,
            p: { xs: 2, sm: 2.5, md: 3 },
            backgroundColor: "#f5f5f5",
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: { xs: 2, md: 3 },
              fontWeight: 600,
              color: "#212121",
              fontSize: { xs: "1.125rem", sm: "1.25rem" },
            }}
          >
            Product Information
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
              gap: { xs: 2, sm: 2.5, md: 3 },
            }}
          >
            <Box>
              <Typography
                variant="body2"
                sx={{ color: "#757575", mb: 0.5, fontSize: "0.875rem" }}
              >
                Product Name
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: 500, color: "#212121" }}
              >
                {product.name}
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="body2"
                sx={{ color: "#757575", mb: 0.5, fontSize: "0.875rem" }}
              >
                Category
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: 500, color: "#212121" }}
              >
                {product.category}
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="body2"
                sx={{ color: "#757575", mb: 0.5, fontSize: "0.875rem" }}
              >
                MRP
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: 500, color: "#212121" }}
              >
                ₹{product.mrp}
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="body2"
                sx={{ color: "#757575", mb: 0.5, fontSize: "0.875rem" }}
              >
                Unit
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: 500, color: "#212121" }}
              >
                {product.unit}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Editable Section */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{
              mb: { xs: 2, md: 3 },
              fontWeight: 600,
              color: "#212121",
              fontSize: { xs: "1.125rem", sm: "1.25rem" },
            }}
          >
            Update Details
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "grid", gap: 3 }}>
              {/* Price and Stock in one row on desktop, stacked on mobile */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 3,
                }}
              >
                <TextField
                  label="Selling Price (₹)"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  error={!!errors.price}
                  helperText={errors.price || `Maximum: ₹${product.mrp}`}
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
                  helperText={errors.stock || "Available units in inventory"}
                  inputProps={{ min: 0 }}
                  required
                  fullWidth
                />
              </Box>

              {/* Action Buttons */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                  justifyContent: { xs: "stretch", sm: "flex-end" },
                  mt: 2,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => navigate("/admin/products")}
                  sx={{
                    textTransform: "none",
                    px: 4,
                    height: 42,
                    borderColor: "#757575",
                    color: "#757575",
                    width: { xs: "100%", sm: "auto" },
                    order: { xs: 2, sm: 1 },
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
                    height: 42,
                    backgroundColor: "#2e7d32",
                    width: { xs: "100%", sm: "auto" },
                    order: { xs: 1, sm: 2 },
                    "&:hover": {
                      backgroundColor: "#1b5e20",
                    },
                  }}
                >
                  Update Product
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Paper>
    </Box>
  );
}

export default EditProduct;
