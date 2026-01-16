import { Box, Container, Typography } from "@mui/material";

function HeroSection() {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: { xs: "400px", md: "500px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        textAlign: "center",
        color: "white",
        py: { xs: 6, md: 8 },
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
            mb: 2,
            lineHeight: 1.2,
          }}
        >
          Fresh groceries, delivered with care
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
            fontWeight: 400,
            lineHeight: 1.6,
            maxWidth: "800px",
            mx: "auto",
          }}
        >
          ZonixFresh brings farm-fresh produce and daily essentials straight to
          your doorstep — fast, affordable, and reliable.
        </Typography>
      </Container>
    </Box>
  );
}

export default HeroSection;

