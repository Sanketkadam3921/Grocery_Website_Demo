import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
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
    // Clear error for this field
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
      <Box>
        <Alert severity="error" sx={{ mb: 3 }}>
          {submitError}
        </Alert>
        <Button
          variant="outlined"
          onClick={() => navigate("/admin/products")}
          sx={{ textTransform: "none" }}
        >
          Back to Products
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, color: "#212121" }}>
        Edit Product
      </Typography>

      <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
        {submitError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {submitError}
          </Alert>
        )}

        {/* Display Product Info (Read-only) */}
        <Box sx={{ mb: 4, p: 3, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Product Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ color: "#757575", mb: 0.5 }}>
                Product Name
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {product.name}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ color: "#757575", mb: 0.5 }}>
                Category
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {product.category}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ color: "#757575", mb: 0.5 }}>
                MRP
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                ₹{product.mrp}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ color: "#757575", mb: 0.5 }}>
                Unit
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {product.unit}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Selling Price (₹)"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                error={!!errors.price}
                helperText={errors.price || `Current MRP: ₹${product.mrp}`}
                inputProps={{ min: 0, step: 0.01 }}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Stock Quantity"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                error={!!errors.stock}
                helperText={errors.stock}
                inputProps={{ min: 0 }}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/admin/products")}
                  sx={{
                    textTransform: "none",
                    px: 4,
                    borderColor: "#757575",
                    color: "#757575",
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
                  Update Product
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}

export default EditProduct;
