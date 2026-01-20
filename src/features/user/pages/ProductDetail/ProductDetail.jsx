import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Container, Paper } from "@mui/material";
import { mockProducts } from "../Products/data/mockProducts";
import { getProductById, getProducts, initializeProducts } from "../../../admin/services/productService";
import { addToCart } from "../../services/cartService";
import { useAuth } from "../../../auth/hooks/useAuth";
import BackButton from "./components/BackButton";
import ProductImage from "./components/ProductImage";
import ProductDetailsSection from "./components/ProductDetailsSection";
import SimilarProducts from "./components/SimilarProducts";
import SuccessSnackbar from "./components/SuccessSnackbar";
import LoadingState from "./components/LoadingState";
import ProductNotFound from "./components/ProductNotFound";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    // Scroll to top when component mounts or product ID changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  useEffect(() => {
    // Initialize products if empty
    initializeProducts(mockProducts);
    // Find product by ID from localStorage
    const productId = parseInt(id);
    const foundProduct = getProductById(productId);
    if (foundProduct) {
      setProduct(foundProduct);
      // Set initial quantity based on stock
      const stock = foundProduct.stock || 0;
      if (stock > 0) {
        setQuantity(1);
      } else {
        setQuantity(0);
      }
    } else {
      setProduct(null);
    }
    setLoading(false);
  }, [id]);

  // Get current stock
  const stock = product?.stock || 0;
  const isOutOfStock = stock === 0;
  const maxQuantity = stock;

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => {
      const newQuantity = prev + delta;
      if (newQuantity < 1) return 1;
      if (newQuantity > maxQuantity) return maxQuantity;
      return newQuantity;
    });
  };

  const handleAddToCart = (productToAdd) => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // Use the product passed as argument, or fall back to the current product
    const productToAddToCart = productToAdd || product;
    
    // If no product is available, return early
    if (!productToAddToCart) {
      console.error("Cannot add to cart: Product is missing");
      return;
    }
    
    // Validate product has required fields
    if (!productToAddToCart.id) {
      console.error("Cannot add to cart: Product ID is missing", productToAddToCart);
      return;
    }
    
    // Determine quantity: if productToAdd is passed (from similar products), use 1, otherwise use selected quantity
    const quantityToAdd = productToAdd ? 1 : quantity;
    
    // Ensure quantity is a valid number
    if (!quantityToAdd || quantityToAdd < 1) {
      console.error("Cannot add to cart: Invalid quantity", quantityToAdd);
      return;
    }
    
    try {
      // Add product to cart
      const result = addToCart(productToAddToCart, quantityToAdd);
      
      // Verify the product was added
      if (result && Array.isArray(result) && result.length > 0) {
        const addedItem = result.find(item => item.id === productToAddToCart.id);
        if (addedItem) {
          // Dispatch custom event to update cart badge in Nav
          window.dispatchEvent(new Event("cartUpdated"));
          
          // Show success message
          setSnackbarOpen(true);
        } else {
          console.error("Product was not added to cart");
        }
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return <LoadingState />;
  }

  if (!product) {
    return <ProductNotFound />;
  }

  const hasDiscount = product.mrp > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  // Get similar products (same category, excluding current product)
  const allProducts = getProducts();
  const similarProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        pt: { xs: 10, sm: 11, md: 12 },
        pb: { xs: 1.5, sm: 2, md: 3 },
      }}
    >
      <Container maxWidth="lg">
        <BackButton />

        {/* Main Product Detail Layout */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: { xs: 1, sm: 2 },
            overflow: "hidden",
            backgroundColor: "white",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "stretch", md: "stretch" },
              gap: { xs: 2, sm: 2.5, md: 3 },
              p: { xs: 1.5, sm: 2, md: 2.5 },
            }}
          >
            <ProductImage image={product.image} name={product.name} />

            <ProductDetailsSection
              product={product}
              hasDiscount={hasDiscount}
              discountPercentage={discountPercentage}
              stock={stock}
              isOutOfStock={isOutOfStock}
              quantity={quantity}
              onQuantityChange={handleQuantityChange}
              maxQuantity={maxQuantity}
              onAddToCart={() => handleAddToCart()}
            />
          </Box>
        </Paper>

        <SimilarProducts
          similarProducts={similarProducts}
          onAddToCart={handleAddToCart}
        />
      </Container>

      <SuccessSnackbar open={snackbarOpen} onClose={handleCloseSnackbar} />
    </Box>
  );
}

export default ProductDetail;
