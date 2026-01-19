import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ProductTable from "./components/ProductTable";
import { getProducts } from "../../services/productService";

function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const loadProducts = () => {
    const allProducts = getProducts();
    setProducts(allProducts);
  };

  useEffect(() => {
    loadProducts();
    // Listen for storage changes to update products list
    const handleStorageChange = () => {
      loadProducts();
    };
    window.addEventListener("storage", handleStorageChange);
    // Also listen for custom event for same-tab updates
    window.addEventListener("productsUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("productsUpdated", handleStorageChange);
    };
  }, []);

  const handleProductDeleted = () => {
    loadProducts();
    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new Event("productsUpdated"));
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            color: "#212121",
            fontSize: { xs: 20, sm: 30, md: 40 },
          }}
        >
          Products Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/admin/products/add")}
          sx={{
            minWidth: "150px",
            textTransform: "none",
            backgroundColor: "#2e7d32",
            "&:hover": {
              backgroundColor: "#1b5e20",
            },
          }}
        >
          Add Product
        </Button>
      </Box>

      <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
        <ProductTable
          products={products}
          onProductDeleted={handleProductDeleted}
        />
      </Paper>
    </Box>
  );
}

export default Products;
