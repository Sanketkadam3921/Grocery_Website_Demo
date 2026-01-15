import { Card, CardMedia, CardContent, Typography, Button, Box } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

function ProductCard({ product, onAddToCart }) {
  const hasDiscount = product.mrp > product.price;

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
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

        <Typography
          variant="body2"
          sx={{
            fontSize: "0.875rem",
            color: "#666",
            mb: 1.5,
          }}
        >
          {product.unit}
        </Typography>

        <Box sx={{ mb: 2, flexGrow: 1 }}>
          {hasDiscount && (
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.875rem",
                color: "#999",
                textDecoration: "line-through",
                display: "inline-block",
                mr: 1,
              }}
            >
              ₹{product.mrp}
            </Typography>
          )}
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "1.125rem", md: "1.25rem" },
              fontWeight: 700,
              color: "#2e7d32",
              display: "inline-block",
            }}
          >
            ₹{product.price}
          </Typography>
          {hasDiscount && (
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.75rem",
                color: "#2e7d32",
                ml: 1,
                fontWeight: 600,
              }}
            >
              {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
            </Typography>
          )}
        </Box>

        <Button
          variant="contained"
          fullWidth
          startIcon={<AddShoppingCartIcon />}
          onClick={() => onAddToCart(product)}
          sx={{
            backgroundColor: "#2e7d32",
            color: "white",
            borderRadius: "8px",
            py: 1,
            textTransform: "none",
            fontSize: "0.9375rem",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "#1b5e20",
            },
          }}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProductCard;

