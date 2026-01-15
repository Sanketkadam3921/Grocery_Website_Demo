import { Box, Container, Typography, Button } from "@mui/material";

function FeaturedProductsBanner() {
  return (
    <Box
      sx={{
        position: "relative",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        py: { xs: 9, md: 14 },
        overflow: "hidden",

        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.55) 100%)",
          zIndex: 1,
        },
      }}
    >
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 2 }}>
        <Box sx={{ textAlign: "center", color: "white" }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 800,
              mb: 2,
              letterSpacing: "-0.02em",
            }}
          >
            Explore Our Featured Products
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "1rem", md: "1.125rem" },
              color: "rgba(255,255,255,0.9)",
              maxWidth: 520,
              mx: "auto",
              mb: 4,
              lineHeight: 1.8,
            }}
          >
            Discover handpicked selections of premium quality groceries —
            curated for freshness, value, and everyday convenience.
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FFD84D",
              color: "#1a1a1a",
              borderRadius: "999px",
              px: { xs: 4, md: 5 },
              py: { xs: 1.25, md: 1.5 },
              textTransform: "none",
              fontSize: { xs: "1rem", md: "1.125rem" },
              fontWeight: 600,
              boxShadow: "0px 12px 24px rgba(0,0,0,0.35)",
              "&:hover": {
                backgroundColor: "#FFDE42",
                boxShadow: "0px 16px 32px rgba(0,0,0,0.45)",
              },
            }}
          >
            Shop Now
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default FeaturedProductsBanner;


