import { Box, Paper, Typography, Divider, Alert } from "@mui/material";

function ReviewStep({ formData, paymentMethod }) {
  return (
    <Box sx={{ mt: 3 }}>
      <Alert severity="info" sx={{ mb: 3 }}>
        Please review your order details before placing the order.
      </Alert>

      {/* Shipping Information Review */}
      <Paper elevation={0} sx={{ p: 3, mb: 3, border: "1px solid #e0e0e0" }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, mb: 2, color: "#1a1a1a" }}
        >
          Shipping Information
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body2" sx={{ mb: 1 }}>
          <strong>Name:</strong> {formData.firstName} {formData.lastName}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          <strong>Email:</strong> {formData.email}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          <strong>Phone:</strong> {formData.phone}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          <strong>Address:</strong> {formData.address}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          <strong>City:</strong> {formData.city}, <strong>State:</strong>{" "}
          {formData.state}, <strong>Pincode:</strong> {formData.pincode}
        </Typography>
        {formData.landmark && (
          <Typography variant="body2">
            <strong>Landmark:</strong> {formData.landmark}
          </Typography>
        )}
      </Paper>

      {/* Payment Method Review */}
      <Paper elevation={0} sx={{ p: 3, mb: 3, border: "1px solid #e0e0e0" }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, mb: 2, color: "#1a1a1a" }}
        >
          Payment Method
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body2">
          {paymentMethod === "card" && "Credit/Debit Card"}
          {paymentMethod === "upi" && "UPI (Google Pay, PhonePe, Paytm)"}
          {paymentMethod === "cod" && "Cash on Delivery"}
        </Typography>
      </Paper>
    </Box>
  );
}

export default ReviewStep;

