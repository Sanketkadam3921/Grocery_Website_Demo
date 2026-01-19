import { useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { getProductById } from "../../../../admin/services/productService";

function ProductCard({ product, onAddToCart }) {
  const navigate = useNavigate();
  const hasDiscount = product.mrp > product.price;

  // Get current stock from products in localStorage
  const currentProduct = getProductById(product.id);
  const stock = currentProduct?.stock ?? product.stock ?? 0;
  const isOutOfStock = stock === 0;

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  const handleAddToCartClick = (e) => {
    e.stopPropagation(); // Prevent card click when button is clicked
    if (!isOutOfStock) {
      onAddToCart(product);
    }
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
        sx={{
          objectFit: "cover",
          backgroundColor: "#f5f5f5",
        }}
      />
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          p: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "0.9375rem", md: "1rem" },
            fontWeight: 600,
            color: "#1a1a1a",
            mb: 1,
            lineHeight: 1.3,
            minHeight: { xs: "2.5em", md: "2.2em" },
          }}
        >
          {product.name}
        </Typography>

        <Box
          sx={{ mb: 1.5, display: "flex", flexDirection: "column", gap: 0.5 }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: "0.875rem",
              color: "#666",
            }}
          >
            {product.unit}
          </Typography>
          {isOutOfStock ? (
            <Chip
              label="Sold Out"
              size="small"
              sx={{
                backgroundColor: "#ffebee",
                color: "#d32f2f",
                fontWeight: 600,
                fontSize: "0.75rem",
                height: 20,
                width: "fit-content",
              }}
            />
          ) : (
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.75rem",
                color: stock < 5 ? "#f57c00" : "#666",
                fontWeight: stock < 5 ? 600 : 400,
              }}
            >
              {stock} {stock === 1 ? "item" : "items"} remaining
            </Typography>
          )}
        </Box>

        <Box
          sx={{
            mb: 2,
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "1.125rem", md: "1.25rem" },
              fontWeight: 700,
              color: "#2e7d32",
            }}
          >
            ₹{product.price}
          </Typography>

          {hasDiscount && (
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.875rem",
                color: "#999",
                textDecoration: "line-through",
              }}
            >
              ₹{product.mrp}
            </Typography>
          )}

          {hasDiscount && (
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.75rem",
                color: "#2e7d32",
                fontWeight: 600,
              }}
            >
              {Math.round(((product.mrp - product.price) / product.mrp) * 100)}%
              OFF
            </Typography>
          )}
        </Box>

        <Button
          variant="contained"
          fullWidth
          startIcon={!isOutOfStock && <AddShoppingCartIcon />}
          onClick={handleAddToCartClick}
          disabled={isOutOfStock}
          sx={{
            backgroundColor: isOutOfStock ? "#ccc" : "#2e7d32",
            color: isOutOfStock ? "#666" : "white",
            borderRadius: "8px",
            py: 1,
            textTransform: "none",
            fontSize: "0.9375rem",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: isOutOfStock ? "#ccc" : "#1b5e20",
            },
            "&:disabled": {
              backgroundColor: "#ccc",
              color: "#666",
            },
          }}
        >
          {isOutOfStock ? "Sold Out" : "Add to Cart"}
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
