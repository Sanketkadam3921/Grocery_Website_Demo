import { Box, Typography, IconButton } from "@mui/material";
import { Remove as RemoveIcon, Add as AddIcon } from "@mui/icons-material";

const QuantitySelector = ({
  quantity,
  onQuantityChange,
  maxQuantity,
  isOutOfStock,
}) => {
  return (
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
          onClick={() => onQuantityChange(-1)}
          disabled={quantity <= 1 || isOutOfStock}
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
          onClick={() => onQuantityChange(1)}
          disabled={quantity >= maxQuantity || isOutOfStock}
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
          <AddIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default QuantitySelector;

