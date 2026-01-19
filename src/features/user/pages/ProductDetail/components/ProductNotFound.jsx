import { Box, Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductNotFound = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          textAlign: "center",
          py: 8,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, color: "#666" }}>
          Product not found
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/products")}
          sx={{
            backgroundColor: "#2e7d32",
            "&:hover": {
              backgroundColor: "#1b5e20",
            },
          }}
        >
          Back to Products
        </Button>
      </Box>
    </Container>
  );
};

export default ProductNotFound;

