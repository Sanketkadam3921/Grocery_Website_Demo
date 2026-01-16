import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import {
  ShoppingCart as ShoppingCartIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import CartItem from "./components/CartItem";
import {
  getCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  getCartTotal,
  clearCart,
} from "../../services/cartService";

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: "smooth" });
    loadCart();
  }, []);

  const loadCart = () => {
    const items = getCart();
    setCartItems(items);
    setTotal(getCartTotal());
  };

  const handleIncrease = (productId) => {
    increaseQuantity(productId);
    loadCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleDecrease = (productId) => {
    decreaseQuantity(productId);
    loadCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
    loadCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleCheckout = () => {
    // Scroll to top before navigating
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Navigate to checkout page
    navigate("/checkout");
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      clearCart();
      loadCart();
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#fafafa",
        minHeight: "100vh",
        py: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 3,
          }}
        >
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{
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
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1.5rem", md: "2rem" },
              color: "#1a1a1a",
            }}
          >
            Shopping Cart
          </Typography>
        </Box>

        {cartItems.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: 2,
              backgroundColor: "white",
            }}
          >
            <ShoppingCartIcon
              sx={{
                fontSize: 80,
                color: "#ccc",
                mb: 2,
              }}
            />
            <Typography
              variant="h6"
              sx={{
                color: "#666",
                mb: 1,
                fontWeight: 600,
              }}
            >
              Your cart is empty
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#999",
                mb: 3,
              }}
            >
              Add some products to get started
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/products")}
              sx={{
                backgroundColor: "#2e7d32",
                color: "white",
                textTransform: "none",
                px: 4,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "#1b5e20",
                },
              }}
            >
              Browse Products
            </Button>
          </Paper>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
              gap: 3,
            }}
          >
            {/* Cart Items Section */}
            <Box
              sx={{
                flex: 1,
                minWidth: 0,
              }}
            >
              {/* Cart Items Header */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "#1a1a1a",
                  }}
                >
                  {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
                </Typography>
                <Button
                  onClick={handleClearCart}
                  sx={{
                    color: "#d32f2f",
                    textTransform: "none",
                    fontSize: "0.875rem",
                    "&:hover": {
                      backgroundColor: "#ffebee",
                    },
                  }}
                >
                  Clear Cart
                </Button>
              </Box>

              {/* Cart Items List */}
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrease={() => handleIncrease(item.id)}
                  onDecrease={() => handleDecrease(item.id)}
                  onRemove={() => handleRemove(item.id)}
                />
              ))}
            </Box>

            {/* Order Summary Section */}
            <Box
              sx={{
                width: { xs: "100%", lg: "350px" },
                flexShrink: 0,
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  border: "1px solid #e0e0e0",
                  backgroundColor: "white",
                  position: { xs: "relative", lg: "sticky" },
                  top: { lg: 96 },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "#1a1a1a",
                    mb: 2,
                  }}
                >
                  Order Summary
                </Typography>

                <Divider sx={{ mb: 2 }} />

                {/* Subtotal */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#666",
                    }}
                  >
                    Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: "#1a1a1a",
                    }}
                  >
                    ₹{total.toFixed(2)}
                  </Typography>
                </Box>

                {/* Delivery Charges */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#666",
                    }}
                  >
                    Delivery Charges
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: "#1a1a1a",
                    }}
                  >
                    Free
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Total */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 3,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#1a1a1a",
                    }}
                  >
                    Total
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#2e7d32",
                    }}
                  >
                    ₹{total.toFixed(2)}
                  </Typography>
                </Box>

                {/* Checkout Button */}
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleCheckout}
                  sx={{
                    backgroundColor: "#2e7d32",
                    color: "white",
                    textTransform: "none",
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    fontSize: "1rem",
                    "&:hover": {
                      backgroundColor: "#1b5e20",
                    },
                  }}
                >
                  Proceed to Checkout
                </Button>
              </Paper>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default Cart;
