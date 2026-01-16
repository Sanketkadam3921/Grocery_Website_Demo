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
import { getLastOrder } from "../../services/orderService";
import { useAuth } from "../../../auth/hooks/useAuth";
import { getCurrentUser } from "../../../auth/services/authService";

function OrderSuccess() {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Wait for auth to finish loading
    if (loading) {
      return;
    }

    // Check if user is authenticated
    if (!isAuthenticated) {
      navigate("/");
      return;
    }

    // Try to get order by ID first (from lastOrderId stored during checkout)
    const loadOrder = () => {
      try {
        const currentUser = getCurrentUser();
        const userId = currentUser?.id || null;
        
        // First, try to get order by stored order ID
        const lastOrderId = localStorage.getItem("lastOrderId");
        
        if (lastOrderId) {
          // Try to get order from user's orders first
          if (userId) {
            try {
              const userOrdersKey = `orders_${userId}`;
              const userOrdersData = localStorage.getItem(userOrdersKey);
              if (userOrdersData) {
                const userOrders = JSON.parse(userOrdersData);
                const order = userOrders.find((o) => o.orderId === lastOrderId);
                
                if (order) {
                  setOrderDetails(order);
                  setIsLoading(false);
                  localStorage.removeItem("lastOrderId");
                  return;
                }
              }
            } catch (error) {
              console.error("Error reading user orders:", error);
            }
          }
          
          // If not found in user orders, try global orders
          try {
            const allOrdersData = localStorage.getItem("orders");
            if (allOrdersData) {
              const allOrders = JSON.parse(allOrdersData);
              const order = allOrders.find((o) => o.orderId === lastOrderId);
              
              if (order) {
                setOrderDetails(order);
                setIsLoading(false);
                localStorage.removeItem("lastOrderId");
                return;
              }
            }
          } catch (error) {
            console.error("Error reading global orders:", error);
          }
        }
        
        // Fallback: Get last order from user's orders
        const lastOrder = getLastOrder();
        if (lastOrder) {
          setOrderDetails(lastOrder);
          setIsLoading(false);
          localStorage.removeItem("lastOrderId");
          return;
        }
        
        // Last resort: Try to get most recent order from global orders
        if (userId) {
          try {
            const allOrdersData = localStorage.getItem("orders");
            if (allOrdersData) {
              const allOrders = JSON.parse(allOrdersData);
              const userOrders = allOrders.filter(
                (order) => order.userId === userId
              );
              if (userOrders.length > 0) {
                const mostRecent = userOrders.sort(
                  (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
                )[0];
                setOrderDetails(mostRecent);
                setIsLoading(false);
                localStorage.removeItem("lastOrderId");
                return;
              }
            }
          } catch (error) {
            console.error("Error reading orders:", error);
          }
        }
        
        // If we still don't have an order, wait a bit more and try again
        console.warn("Order not found immediately, retrying...");
        setTimeout(() => {
          const retryOrderId = localStorage.getItem("lastOrderId");
          if (retryOrderId) {
            try {
              const allOrdersData = localStorage.getItem("orders");
              if (allOrdersData) {
                const allOrders = JSON.parse(allOrdersData);
                const order = allOrders.find((o) => o.orderId === retryOrderId);
                if (order) {
                  setOrderDetails(order);
                  setIsLoading(false);
                  localStorage.removeItem("lastOrderId");
                  return;
                }
              }
            } catch (error) {
              console.error("Error in retry:", error);
            }
          }
          
          // Final fallback - get most recent order
          const finalOrder = getLastOrder();
          if (finalOrder) {
            setOrderDetails(finalOrder);
            setIsLoading(false);
            localStorage.removeItem("lastOrderId");
          } else {
            console.error("No order found after retry, redirecting to home");
            setIsLoading(false);
            navigate("/");
          }
        }, 300);
      } catch (error) {
        console.error("Error loading order:", error);
        setIsLoading(false);
        navigate("/");
      }
    };

    // Small delay to ensure order is saved
    const timer = setTimeout(loadOrder, 200);
    return () => clearTimeout(timer);
  }, [navigate, isAuthenticated, loading]);

  // Show loading state
  if (loading || isLoading || !orderDetails) {
    return (
      <Box
        sx={{
          backgroundColor: "#fafafa",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography>Loading order details...</Typography>
      </Box>
    );
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
                ₹{orderDetails.totalAmount.toFixed(2)}
              </Typography>
            </Box>
          </Paper>

          {/* Ordered Items Summary */}
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
              Ordered Items
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {orderDetails.items.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    gap: 2,
                    p: 2,
                    backgroundColor: "white",
                    borderRadius: 1,
                    border: "1px solid #e0e0e0",
                  }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 1,
                      overflow: "hidden",
                      backgroundColor: "#f5f5f5",
                      flexShrink: 0,
                    }}
                  >
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.name}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 600,
                        color: "#1a1a1a",
                        mb: 0.5,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
                      Quantity: {item.quantity}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: "#2e7d32",
                      }}
                    >
                      ₹{item.price.toFixed(2)} × {item.quantity} = ₹
                      {(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              ))}
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
