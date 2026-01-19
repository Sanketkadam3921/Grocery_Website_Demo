import { Box, Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import heroImage from "../../../../../assets/homepage/Herosection/Foodstuff-PNG-HD-Image.png";

function HeroSection() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        backgroundColor: "#FFF8ED",
        py: { xs: 6, md: 12 },
      }}
    >
      <Container maxWidth="lg">
        {/* Main Flex Wrapper */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: { xs: 4, md: 8 },
          }}
        >
          {/* LEFT: Image */}
          <Box
            sx={{
              width: { xs: "100%", md: 550 },
              flexShrink: 0,
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "relative",
                overflow: "hidden",
                backgroundColor: "#FFF8ED",
              }}
            >
              <Box
                component="img"
                src={heroImage}
                alt="Fresh Groceries"
                sx={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  opacity: 0.9,
                }}
              />
              {/* Gradient overlay for seamless blending with background */}
              {/* <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background:
                    "linear-gradient(to right, rgba(255, 248, 237, 0.6) 0%, rgba(255, 248, 237, 0.3) 25%, rgba(255, 248, 237, 0.1) 50%, transparent 70%)",
                  pointerEvents: "none",
                }}
              /> */}
            </Box>
          </Box>

          {/* RIGHT: Text Content */}
          <Box
            sx={{
              width: { xs: "100%", md: 520 },
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.3rem", md: "2.8rem", lg: "46px" },
                fontWeight: 700,
                color: "#1a1a1a",
                mb: 3,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
              }}
            >
              Welcome to Zonix Fresh Your Fresh Grocery Destination
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "1rem", md: "1.125rem" },
                color: "#666",
                mb: 4,
                lineHeight: 1.7,
              }}
            >
              Discover the freshest produce, premium quality groceries, and
              convenient delivery options. We bring farm-fresh goodness right to
              your doorstep with fast, reliable service you can trust.
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
              }}
            >
              <Button
                variant="contained"
                onClick={() => {
                  navigate("/products");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                sx={{
                  backgroundColor: "#FFD84D",
                  color: "#1a1a1a",
                  borderRadius: "50px",
                  px: 4,
                  py: 1.5,
                  textTransform: "none",
                  fontSize: "1.125rem",
                  fontWeight: 600,
                  boxShadow: 2,
                  "&:hover": {
                    backgroundColor: "#FFDE42",
                    boxShadow: 4,
                  },
                }}
              >
                Shop Now
              </Button>

              {/* <Button
                variant="outlined"
                onClick={() => {
                  navigate("/products");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                sx={{
                  borderColor: "#1a1a1a",
                  color: "#1a1a1a",
                  borderRadius: "50px",
                  px: 4,
                  py: 1.5,
                  textTransform: "none",
                  fontSize: "1.125rem",
                  fontWeight: 600,
                  borderWidth: 2,
                  "&:hover": {
                    backgroundColor: "rgba(26, 26, 26, 0.05)",
                    borderWidth: 2,
                  },
                }}
              >
                Explore
              </Button> */}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default HeroSection;
