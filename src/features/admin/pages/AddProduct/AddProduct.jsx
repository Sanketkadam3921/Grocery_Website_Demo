import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import {
  Box,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { addProduct } from "../../services/productService";
import ProductNameField from "./components/ProductNameField";
import CategoryUnitFields from "./components/CategoryUnitFields";
import ImageUrlField from "./components/ImageUrlField";
import PriceFields from "./components/PriceFields";
import FormActions from "./components/FormActions";
import ErrorAlert from "./components/ErrorAlert";

// Validation schema using Yup
const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Product name is required")
    .trim()
    .min(2, "Product name must be at least 2 characters"),
  category: yup.string().required("Category is required"),
  image: yup
    .string()
    .required("Image URL is required")
    .url("Please enter a valid URL"),
  mrp: yup
    .number()
    .required("MRP is required")
    .typeError("MRP must be a number")
    .integer("MRP must be a whole number (no decimals)")
    .min(2, "MRP must be greater than ₹1")
    .positive("MRP must be a positive number"),
  price: yup
    .number()
    .required("Selling price is required")
    .typeError("Selling price must be a number")
    .integer("Selling price must be a whole number (no decimals)")
    .min(2, "Selling price must be greater than ₹1")
    .positive("Selling price must be a positive number")
    .test(
      "less-than-mrp",
      "Price cannot be greater than MRP",
      function (value) {
        const { mrp } = this.parent;
        if (!mrp || !value) return true;
        return value <= mrp;
      }
    ),
  unit: yup
    .string()
    .required("Unit is required")
    .trim()
    .min(1, "Unit is required"),
  stock: yup
    .number()
    .required("Stock quantity is required")
    .typeError("Stock must be a number")
    .integer("Stock must be a whole number")
    .min(1, "Stock must be greater than 0")
    .positive("Stock must be a positive number"),
});

function AddProduct() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
    
    // For MRP and Price fields, only allow whole numbers (no decimals)
    if (name === "mrp" || name === "price") {
      // Remove any non-numeric characters
      let filteredValue = value.replace(/[^0-9]/g, "");
      
      // Prevent leading zero - first digit can't be 0
      if (filteredValue.startsWith("0")) {
        filteredValue = filteredValue.replace(/^0+/, "");
      }
      
      setFormData((prev) => ({
        ...prev,
        [name]: filteredValue,
      }));
    } else if (name === "stock") {
      // For stock, only allow whole numbers
      let filteredValue = value.replace(/[^0-9]/g, "");
      
      // Prevent leading zero
      if (filteredValue.startsWith("0")) {
        filteredValue = filteredValue.replace(/^0+/, "");
      }
      
      setFormData((prev) => ({
        ...prev,
        [name]: filteredValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = async () => {
    try {
      // Convert string values to numbers for validation
      const dataToValidate = {
        ...formData,
        mrp: formData.mrp && formData.mrp !== "" ? parseInt(formData.mrp, 10) : undefined,
        price: formData.price && formData.price !== "" ? parseInt(formData.price, 10) : undefined,
        stock: formData.stock && formData.stock !== "" ? parseInt(formData.stock, 10) : undefined,
      };

      await validationSchema.validate(dataToValidate, { abortEarly: false });
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

    try {
      const product = {
        name: formData.name.trim(),
        category: formData.category,
        image: formData.image.trim(),
        mrp: parseInt(formData.mrp),
        price: parseInt(formData.price),
        unit: formData.unit.trim(),
        stock: parseInt(formData.stock),
      };

      addProduct(product);
      navigate("/admin/products");
    } catch (error) {
      console.error("Error adding product:", error);
      setSubmitError("Failed to add product. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 2, sm: 3 },
      }}
    >
      <Typography
        variant={isMobile ? "h5" : "h4"}
        sx={{
          mb: { xs: 3, sm: 4 },
          fontWeight: 600,
          color: "#212121",
        }}
      >
        Add New Product
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: 2,
          border: "1px solid #e0e0e0",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        <ErrorAlert message={submitError} />

        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: 2.5, sm: 3 },
            }}
          >
            <ProductNameField
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              isMobile={isMobile}
            />

            <CategoryUnitFields
              category={formData.category}
              unit={formData.unit}
              onCategoryChange={handleChange}
              onUnitChange={handleChange}
              categoryError={errors.category}
              unitError={errors.unit}
              isMobile={isMobile}
            />

            <ImageUrlField
              value={formData.image}
              onChange={handleChange}
              error={errors.image}
              isMobile={isMobile}
            />

            <PriceFields
              mrp={formData.mrp}
              price={formData.price}
              stock={formData.stock}
              onMrpChange={handleChange}
              onPriceChange={handleChange}
              onStockChange={handleChange}
              mrpError={errors.mrp}
              priceError={errors.price}
              stockError={errors.stock}
              isMobile={isMobile}
            />

            <FormActions isMobile={isMobile} />
          </Box>
        </form>
      </Paper>
    </Box>
  );
}

export default AddProduct;
