import { Box, TextField } from "@mui/material";

const PriceFields = ({
  mrp,
  price,
  stock,
  onMrpChange,
  onPriceChange,
  onStockChange,
  mrpError,
  priceError,
  stockError,
  isMobile,
}) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr 1fr",
          md: "1fr 1fr 1fr",
        },
        gap: { xs: 2.5, sm: 3 },
      }}
    >
      <TextField
        label="MRP (₹)"
        name="mrp"
        type="text"
        value={mrp}
        onChange={onMrpChange}
        error={!!mrpError}
        helperText={mrpError}
        required
        fullWidth
        size={isMobile ? "small" : "medium"}
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
      />

      <TextField
        label="Selling Price (₹)"
        name="price"
        type="text"
        value={price}
        onChange={onPriceChange}
        error={!!priceError}
        helperText={priceError}
        required
        fullWidth
        size={isMobile ? "small" : "medium"}
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
      />

      <TextField
        label="Stock Quantity"
        name="stock"
        type="text"
        value={stock}
        onChange={onStockChange}
        error={!!stockError}
        helperText={stockError}
        required
        fullWidth
        size={isMobile ? "small" : "medium"}
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        sx={{
          gridColumn: { sm: "1 / -1", md: "auto" },
        }}
      />
    </Box>
  );
};

export default PriceFields;

