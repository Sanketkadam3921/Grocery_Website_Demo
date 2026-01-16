import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function CallToAction() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: "#2e7d32",
        borderRadius: 2,
        p: { xs: 4, md: 6 },
        textAlign: "center",
        color: "white",
        mb: 4,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          fontSize: { xs: "1.75rem", md: "2.25rem" },
          mb: 3,
        }}
      >
        Start shopping fresh today
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={() => navigate("/products")}
        sx={{
          backgroundColor: "white",
          color: "#2e7d32",
          textTransform: "none",
          px: 4,
          py: 1.5,
          borderRadius: 2,
          fontWeight: 600,
          fontSize: "1rem",
          "&:hover": {
            backgroundColor: "#f5f5f5",
            transform: "translateY(-2px)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          },
          transition: "all 0.3s ease",
        }}
      >
        Explore Products
      </Button>
    </Box>
  );
}

export default CallToAction;

