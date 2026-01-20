import { Box, Typography, Chip, Divider } from "@mui/material";

const StockInfo = ({ stock, isOutOfStock }) => {
  return (
    <>
      <Box>
        {isOutOfStock ? (
          <Chip
            label="Sold Out"
            sx={{
              backgroundColor: "#ffebee",
              color: "#d32f2f",
              fontWeight: 600,
              fontSize: "0.875rem",
            }}
          />
        ) : (
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: "0.875rem", sm: "0.9375rem" },
              color: stock < 5 ? "#f57c00" : "#666",
              fontWeight: stock < 5 ? 600 : 400,
            }}
          >
            {stock} {stock === 1 ? "item" : "items"} in stock
          </Typography>
        )}
      </Box>

      <Divider sx={{ my: { xs: 0.5, sm: 0.75 } }} />
    </>
  );
};

export default StockInfo;


