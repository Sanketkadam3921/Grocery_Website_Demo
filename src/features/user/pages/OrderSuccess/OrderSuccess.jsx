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
  CheckCircle as CheckCircleIcon,
  ShoppingBag as ShoppingBagIcon,
  Home as HomeIcon,
} from "@mui/icons-material";

function OrderSuccess() {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Get order details from localStorage
    const storedOrder = localStorage.getItem("lastOrder");
    if (storedOrder) {
      setOrderDetails(JSON.parse(storedOrder));
    } else {
      // If no order details, redirect to home
      navigate("/");
    }
  }, [navigate]);

  if (!orderDetails) {
    return null;
  }

  return (
    <Box
      sx={{
        backgroundColor: "#fafafa",
        minHeight: "100vh",
        py: { xs: 4, md: 6 },
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 2,
            border: "1px solid #e0e0e0",
            backgroundColor: "white",
            textAlign: "center",
          }}
        >
          {/* Success Icon */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 3,
            }}
          >
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                backgroundColor: "#e8f5e9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CheckCircleIcon
                sx={{
                  fontSize: 60,
                  color: "#2e7d32",
                }}
              />
            </Box>
          </Box>

          {/* Success Message */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#1a1a1a",
              mb: 1,
            }}
          >
            Order Placed Successfully!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#666",
              mb: 4,
            }}
          >
            Thank you for your order. We've received your order and will begin
            processing it right away.
          </Typography>

          {/* Order Details */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 4,
              backgroundColor: "#f8f8f8",
              borderRadius: 2,
              textAlign: "left",
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
              Order Details
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Typography variant="body2" sx={{ color: "#666" }}>
                Order ID:
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {orderDetails.orderId}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Typography variant="body2" sx={{ color: "#666" }}>
                Total Items:
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {orderDetails.items.reduce(
                  (sum, item) => sum + item.quantity,
                  0
                )}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Typography variant="body2" sx={{ color: "#666" }}>
                Payment Method:
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {orderDetails.paymentMethod === "card" && "Credit/Debit Card"}
                {orderDetails.paymentMethod === "upi" && "UPI"}
                {orderDetails.paymentMethod === "cod" && "Cash on Delivery"}
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#1a1a1a" }}
              >
                Total Amount:
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#2e7d32" }}
              >
                ₹{orderDetails.total.toFixed(2)}
              </Typography>
            </Box>
          </Paper>

          {/* Shipping Address */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 4,
              backgroundColor: "#f8f8f8",
              borderRadius: 2,
              textAlign: "left",
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
              Shipping Address
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" sx={{ mb: 1 }}>
              {orderDetails.shippingInfo.firstName}{" "}
              {orderDetails.shippingInfo.lastName}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {orderDetails.shippingInfo.address}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {orderDetails.shippingInfo.city},{" "}
              {orderDetails.shippingInfo.state} -{" "}
              {orderDetails.shippingInfo.pincode}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Phone: {orderDetails.shippingInfo.phone}
            </Typography>
            <Typography variant="body2">
              Email: {orderDetails.shippingInfo.email}
            </Typography>
          </Paper>

          {/* Action Buttons */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="outlined"
              startIcon={<ShoppingBagIcon />}
              onClick={() => {
                navigate("/products");
                // Scroll to top after navigation
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }, 100);
              }}
              sx={{
                borderColor: "#2e7d32",
                color: "#2e7d32",
                textTransform: "none",
                px: 4,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                "&:hover": {
                  borderColor: "#1b5e20",
                  backgroundColor: "rgba(46, 125, 50, 0.04)",
                },
              }}
            >
              Continue Shopping
            </Button>
            <Button
              variant="contained"
              startIcon={<HomeIcon />}
              onClick={() => {
                navigate("/");
                // Scroll to top after navigation
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }, 100);
              }}
              sx={{
                minWidth: "220px",
                maxWidth: "260px",
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
              Go to Home
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default OrderSuccess;
