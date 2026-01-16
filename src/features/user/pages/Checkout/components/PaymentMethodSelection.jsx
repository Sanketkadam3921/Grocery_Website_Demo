import { Box, Paper, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Typography } from "@mui/material";
import {
  CreditCard as CreditCardIcon,
  AccountBalanceWallet as WalletIcon,
  LocalAtm as CashIcon,
} from "@mui/icons-material";

function PaymentMethodSelection({ paymentMethod, setPaymentMethod }) {
  return (
    <Box sx={{ mt: 3 }}>
      <FormControl component="fieldset" fullWidth>
        <FormLabel
          component="legend"
          sx={{
            mb: 2,
            fontSize: "1.125rem",
            fontWeight: 600,
            color: "#1a1a1a",
          }}
        >
          Select Payment Method
        </FormLabel>
        <RadioGroup
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <Paper
            elevation={0}
            sx={{
              p: 2,
              mb: 2,
              border:
                paymentMethod === "card"
                  ? "2px solid #2e7d32"
                  : "1px solid #e0e0e0",
              borderRadius: 2,
              cursor: "pointer",
              "&:hover": {
                borderColor: "#2e7d32",
              },
            }}
            onClick={() => setPaymentMethod("card")}
          >
            <FormControlLabel
              value="card"
              control={<Radio />}
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CreditCardIcon sx={{ color: "#2e7d32" }} />
                  <Typography sx={{ fontWeight: 600 }}>
                    Credit/Debit Card
                  </Typography>
                </Box>
              }
            />
          </Paper>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              mb: 2,
              border:
                paymentMethod === "upi"
                  ? "2px solid #2e7d32"
                  : "1px solid #e0e0e0",
              borderRadius: 2,
              cursor: "pointer",
              "&:hover": {
                borderColor: "#2e7d32",
              },
            }}
            onClick={() => setPaymentMethod("upi")}
          >
            <FormControlLabel
              value="upi"
              control={<Radio />}
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <WalletIcon sx={{ color: "#2e7d32" }} />
                  <Typography sx={{ fontWeight: 600 }}>
                    UPI (Google Pay, PhonePe, Paytm)
                  </Typography>
                </Box>
              }
            />
          </Paper>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              border:
                paymentMethod === "cod"
                  ? "2px solid #2e7d32"
                  : "1px solid #e0e0e0",
              borderRadius: 2,
              cursor: "pointer",
              "&:hover": {
                borderColor: "#2e7d32",
              },
            }}
            onClick={() => setPaymentMethod("cod")}
          >
            <FormControlLabel
              value="cod"
              control={<Radio />}
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CashIcon sx={{ color: "#2e7d32" }} />
                  <Typography sx={{ fontWeight: 600 }}>
                    Cash on Delivery
                  </Typography>
                </Box>
              }
            />
          </Paper>
        </RadioGroup>
      </FormControl>
    </Box>
  );
}

export default PaymentMethodSelection;

