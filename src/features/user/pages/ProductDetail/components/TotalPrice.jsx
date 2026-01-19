import { Box, Typography } from "@mui/material";

const TotalPrice = ({ price, quantity }) => {
  return (
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
          ₹{price * quantity}
        </Typography>
      </Box>
    </Box>
  );
};

export default TotalPrice;

