import { Box, Typography } from "@mui/material";
import ProductCard from "../../Products/components/ProductCard";

const SimilarProducts = ({ similarProducts, onAddToCart }) => {
  if (similarProducts.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mt: { xs: 3, sm: 4, md: 5 } }}>
      <Typography
        variant="h5"
        sx={{
          fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
          fontWeight: 600,
          color: "#1a1a1a",
          mb: { xs: 2, sm: 2.5 },
        }}
      >
        Similar Products
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: { xs: 1.5, sm: 2, md: 2.5 },
        }}
      >
        {similarProducts.map((similarProduct) => (
          <ProductCard
            key={similarProduct.id}
            product={similarProduct}
            onAddToCart={onAddToCart}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SimilarProducts;


