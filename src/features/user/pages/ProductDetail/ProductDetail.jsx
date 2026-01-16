import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Paper,
  Divider,
  Chip,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  AddShoppingCart as AddShoppingCartIcon,
  Remove as RemoveIcon,
  Add as AddIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { mockProducts } from "../Products/data/mockProducts";
import ProductCard from "../Products/components/ProductCard";
import { addToCart } from "../../services/cartService";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    // Scroll to top when component mounts or product ID changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  useEffect(() => {
    // Find product by ID
    const foundProduct = mockProducts.find((p) => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      setProduct(null);
    }
    setLoading(false);
  }, [id]);

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = (productToAdd) => {
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
      if (result && Array.isArray(result)) {
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
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            textAlign: "center",
            py: 8,
          }}
        >
          <Typography variant="h5" sx={{ mb: 2, color: "#666" }}>
            Product not found
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/products")}
            sx={{
              backgroundColor: "#2e7d32",
              "&:hover": {
                backgroundColor: "#1b5e20",
              },
            }}
          >
            Back to Products
          </Button>
        </Box>
      </Container>
    );
  }

  const hasDiscount = product.mrp > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  // Get similar products (same category, excluding current product)
  const similarProducts = mockProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        py: { xs: 1.5, sm: 2, md: 3 },
      }}
    >
      <Container maxWidth="lg">
        {/* Back Button */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/products")}
          sx={{
            mb: { xs: 1.5, sm: 2 },
            color: "#666",
            textTransform: "none",
            px: 0,
            minWidth: "auto",
            "&:hover": {
              backgroundColor: "transparent",
              color: "#2e7d32",
            },
          }}
        >
          Back
        </Button>

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
            {/* Left Column: Product Image */}
            <Box
              sx={{
                width: { xs: "100%", md: "50%" },
                flexShrink: 0,
                maxHeight: { xs: "none", md: "650px" },
                display: "flex",
                alignItems: "stretch",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "1 / 1",
                  maxHeight: { xs: "100%", md: "650px" },
                  borderRadius: { xs: 1, sm: 1.5 },
                  overflow: "hidden",
                  backgroundColor: "#f8f8f8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  component="img"
                  src={product.image}
                  alt={product.name}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
                {hasDiscount && (
                  <Chip
                    label={`${discountPercentage}% OFF`}
                    sx={{
                      position: "absolute",
                      top: { xs: 8, sm: 10 },
                      left: { xs: 8, sm: 10 },
                      backgroundColor: "#2e7d32",
                      color: "white",
                      fontWeight: 600,
                      fontSize: { xs: "0.6875rem", sm: "0.75rem" },
                      height: { xs: 20, sm: 24 },
                    }}
                  />
                )}
              </Box>
            </Box>

            {/* Right Column: Product Details */}
            <Box
              sx={{
                flex: { xs: "0 0 auto", md: "1 1 0" },
                width: { xs: "100%", md: "50%" },
                display: "flex",
                flexDirection: "column",
                maxHeight: { xs: "none", md: "650px" },
                overflow: { xs: "visible", md: "visible" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: { xs: 1.25, sm: 1.5 },
                  height: "100%",
                  overflowY: { xs: "visible", md: "visible" },
                  overflowX: "hidden",
                  pr: { xs: 0, md: 1 },
                }}
              >
                {/* Product Name */}
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: {
                      xs: "1.25rem",
                      sm: "1.375rem",
                      md: "1.5rem",
                    },
                    fontWeight: 600,
                    color: "#1a1a1a",
                    lineHeight: 1.3,
                  }}
                >
                  {product.name}
                </Typography>

                {/* Category */}
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                    color: "#888",
                    textTransform: "uppercase",
                    letterSpacing: 0.3,
                    fontWeight: 500,
                  }}
                >
                  {product.category}
                </Typography>

                <Divider sx={{ my: { xs: 0.5, sm: 0.75 } }} />

                {/* Price Section */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: { xs: 0.25, sm: 0.5 },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: { xs: 0.75, sm: 1 },
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontSize: {
                          xs: "1.5rem",
                          sm: "1.75rem",
                          md: "2rem",
                        },
                        fontWeight: 700,
                        color: "#2e7d32",
                        lineHeight: 1,
                      }}
                    >
                      ₹{product.price}
                    </Typography>
                    {hasDiscount && (
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: {
                            xs: "1rem",
                            sm: "1.125rem",
                          },
                          color: "#999",
                          textDecoration: "line-through",
                          fontWeight: 400,
                        }}
                      >
                        ₹{product.mrp}
                      </Typography>
                    )}
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                      color: "#666",
                      fontWeight: 400,
                    }}
                  >
                    Per {product.unit}
                  </Typography>
                </Box>

                <Divider sx={{ my: { xs: 0.5, sm: 0.75 } }} />

                {/* Product Description */}
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: "0.875rem", sm: "0.9375rem" },
                      fontWeight: 600,
                      color: "#1a1a1a",
                      mb: { xs: 0.75, sm: 1 },
                    }}
                  >
                    Description
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                      color: "#666",
                      lineHeight: 1.6,
                    }}
                  >
                    {product.description ||
                      `Fresh and high-quality ${product.name.toLowerCase()} from our premium collection. This product is carefully selected to ensure the best quality and freshness for our customers. Perfect for your daily needs and cooking requirements.`}
                  </Typography>
                </Box>

                <Divider sx={{ my: { xs: 0.5, sm: 0.75 } }} />

                {/* Quantity Selector */}
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: "0.875rem", sm: "0.9375rem" },
                      fontWeight: 600,
                      color: "#1a1a1a",
                      mb: { xs: 0.75, sm: 1 },
                    }}
                  >
                    Quantity
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: { xs: 1.25, sm: 1.5 },
                      width: "fit-content",
                    }}
                  >
                    <IconButton
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: 1,
                        width: { xs: 32, sm: 36 },
                        height: { xs: 32, sm: 36 },
                        "&:hover": {
                          backgroundColor: "#f5f5f5",
                          borderColor: "#2e7d32",
                        },
                        "&.Mui-disabled": {
                          borderColor: "#e0e0e0",
                          opacity: 0.4,
                        },
                      }}
                    >
                      <RemoveIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />
                    </IconButton>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: { xs: 36, sm: 44 },
                        textAlign: "center",
                        fontSize: { xs: "1rem", sm: "1.125rem" },
                        fontWeight: 600,
                        color: "#1a1a1a",
                      }}
                    >
                      {quantity}
                    </Typography>
                    <IconButton
                      onClick={() => handleQuantityChange(1)}
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: 1,
                        width: { xs: 32, sm: 36 },
                        height: { xs: 32, sm: 36 },
                        "&:hover": {
                          backgroundColor: "#f5f5f5",
                          borderColor: "#2e7d32",
                        },
                      }}
                    >
                      <AddIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />
                    </IconButton>
                  </Box>
                </Box>

                {/* Total Price Display */}
                <Box
                  sx={{
                    mt: { xs: 0.5, sm: 0.75 },
                    p: { xs: 1.25, sm: 1.5 },
                    backgroundColor: "#f8f8f8",
                    borderRadius: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: { xs: "0.875rem", sm: "0.9375rem" },
                        fontWeight: 600,
                        color: "#1a1a1a",
                      }}
                    >
                      Total:
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: { xs: "1.125rem", sm: "1.25rem" },
                        fontWeight: 700,
                        color: "#2e7d32",
                      }}
                    >
                      ₹{product.price * quantity}
                    </Typography>
                  </Box>
                </Box>

                {/* Add to Cart Button */}
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<AddShoppingCartIcon />}
                  onClick={() => handleAddToCart()}
                  disabled={!product}
                  sx={{
                    backgroundColor: "#2e7d32",
                    color: "white",
                    borderRadius: { xs: 1, sm: 1.5 },
                    py: { xs: 1.125, sm: 1.25 },
                    textTransform: "none",
                    fontSize: { xs: "0.875rem", sm: "0.9375rem" },
                    fontWeight: 600,
                    mt: { xs: 0.75, sm: 1 },
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: "#1b5e20",
                      boxShadow: "none",
                    },
                    "&:disabled": {
                      backgroundColor: "#ccc",
                      color: "#666",
                    },
                  }}
                >
                  Add to Cart
                </Button>
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* Similar Products Section */}
        {similarProducts.length > 0 && (
          <Box sx={{ mt: { xs: 3, sm: 4, md: 5 } }}>
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
                fontWeight: 600,
                color: "#1a1a1a",
                mb: { xs: 2, sm: 2.5 },
              }}
            >
              Similar Products
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, 1fr)",
                  sm: "repeat(3, 1fr)",
                  md: "repeat(4, 1fr)",
                },
                gap: { xs: 1.5, sm: 2, md: 2.5 },
              }}
            >
              {similarProducts.map((similarProduct) => (
                <ProductCard
                  key={similarProduct.id}
                  product={similarProduct}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </Box>
          </Box>
        )}
      </Container>

      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Item added to cart successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ProductDetail;
