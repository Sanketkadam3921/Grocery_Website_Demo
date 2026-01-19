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
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { getCart, getCartTotal, clearCart } from "../../services/cartService";
import { addOrder } from "../../services/orderService";
import { updateProductStockOnOrder } from "../../../admin/services/productService";
import { useAuth } from "../../../auth/hooks/useAuth";
import { useCheckoutForm } from "./hooks/useCheckoutForm";
import { useCheckoutSteps } from "./hooks/useCheckoutSteps";
import ShippingForm from "./components/ShippingForm";
import PaymentMethodSelection from "./components/PaymentMethodSelection";
import ReviewStep from "./components/ReviewStep";
import OrderSummary from "./components/OrderSummary";
import CheckoutStepper from "./components/CheckoutStepper";

function Checkout() {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  // Custom hooks
  const { formData, errors, handleInputChange, validateForm } =
    useCheckoutForm();
  const {
    activeStep,
    paymentMethod,
    setPaymentMethod,
    handleNext,
    handleBack,
  } = useCheckoutSteps();

  useEffect(() => {
    // Wait for auth to finish loading
    if (loading) {
      return;
    }

    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Check if user is authenticated
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const items = getCart();
    if (items.length === 0) {
      navigate("/cart");
      return;
    }
    setCartItems(items);
    setTotal(getCartTotal());
  }, [navigate, isAuthenticated, loading]);

  const handlePlaceOrder = () => {
    // Scroll to top before placing order
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Update product stock before creating order
    updateProductStockOnOrder(cartItems);

    // Create order
    const orderDetails = {
      orderId: `ORD-${Date.now()}`,
      items: cartItems,
      totalAmount: total,
      shippingInfo: formData,
      paymentMethod: paymentMethod,
      status: "Pending",
    };

    // Add order to user's order history
    const order = addOrder(orderDetails);

    if (order) {
      // Store order ID temporarily for order success page
      localStorage.setItem("lastOrderId", order.orderId);

      // Clear cart
      clearCart();
      window.dispatchEvent(new Event("cartUpdated"));

      // Delay to ensure order is fully saved to localStorage before navigation
      setTimeout(() => {
        navigate("/order-success");
      }, 200);
    } else {
      console.error("Failed to place order");
      // You could show an error message here
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <ShippingForm
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
          />
        );
      case 1:
        return (
          <PaymentMethodSelection
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
        );
      case 2:
        return <ReviewStep formData={formData} paymentMethod={paymentMethod} />;
      default:
        return null;
    }
  };

  // Show loading state while checking authentication
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

  if (cartItems.length === 0) {
    return null;
  }

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
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              navigate("/cart");
            }}
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
            Back to Cart
          </Button>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1.5rem", md: "2rem" },
              color: "#1a1a1a",
            }}
          >
            Checkout
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
            alignItems: "flex-start",
          }}
        >
          {/* Left Column: Checkout Form */}
          <Box
            sx={{
              flex: { xs: "1 1 100%", md: "1 1 66.666%" },
              width: { xs: "100%", md: "auto" },
              minWidth: 0,
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 2.5, md: 3 },
                borderRadius: 2,
                border: "1px solid #e0e0e0",
                backgroundColor: "white",
              }}
            >
              {/* Stepper */}
              <CheckoutStepper activeStep={activeStep} />

              {/* Step Content */}
              {getStepContent(activeStep)}

              {/* Navigation Buttons */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 4,
                  flexDirection: { xs: "column-reverse", sm: "row" },
                  gap: { xs: 2, sm: 0 },
                }}
              >
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{
                    textTransform: "none",
                    color: "#ffffff",
                    width: { xs: "100%", sm: "auto" },
                    visibility: activeStep === 0 ? "hidden" : "visible",
                    backgroundColor: "grey",
                  }}
                >
                  Back
                </Button>
                {activeStep < 2 ? (
                  <Button
                    variant="contained"
                    onClick={async () => await handleNext(validateForm)}
                    sx={{
                      backgroundColor: "#2e7d32",
                      textTransform: "none",
                      px: { xs: 3, sm: 4 },
                      width: { xs: "100%", sm: "auto" },
                      "&:hover": {
                        backgroundColor: "#1b5e20",
                      },
                    }}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handlePlaceOrder}
                    sx={{
                      backgroundColor: "#2e7d32",
                      textTransform: "none",
                      px: { xs: 3, sm: 4 },
                      width: { xs: "100%", sm: "auto" },
                      "&:hover": {
                        backgroundColor: "#1b5e20",
                      },
                    }}
                  >
                    Place Order
                  </Button>
                )}
              </Box>
            </Paper>
          </Box>

          {/* Right Column: Order Summary */}
          <Box
            sx={{
              flex: { xs: "1 1 100%", md: "0 0 33.333%" },
              width: { xs: "100%", md: "auto" },
              minWidth: { xs: "100%", md: "320px" },
              maxWidth: { xs: "100%", md: "400px" },
            }}
          >
            <OrderSummary cartItems={cartItems} total={total} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Checkout;
