import { Button } from "@mui/material";
import { AddShoppingCart as AddShoppingCartIcon } from "@mui/icons-material";

const AddToCartButton = ({ onAddToCart, isOutOfStock, disabled }) => {
  return (
    <Button
      variant="contained"
      fullWidth
      startIcon={!isOutOfStock && <AddShoppingCartIcon />}
      onClick={onAddToCart}
      disabled={disabled || isOutOfStock}
      sx={{
        backgroundColor: isOutOfStock ? "#ccc" : "#2e7d32",
        color: isOutOfStock ? "#666" : "white",
        borderRadius: { xs: 1, sm: 1.5 },
        py: { xs: 1.125, sm: 1.25 },
        textTransform: "none",
        fontSize: { xs: "0.875rem", sm: "0.9375rem" },
        fontWeight: 600,
        mt: { xs: 0.75, sm: 1 },
        boxShadow: "none",
        "&:hover": {
          backgroundColor: isOutOfStock ? "#ccc" : "#1b5e20",
          boxShadow: "none",
        },
        "&:disabled": {
          backgroundColor: "#ccc",
          color: "#666",
        },
      }}
    >
      {isOutOfStock ? "Sold Out" : "Add to Cart"}
    </Button>
  );
};

export default AddToCartButton;



