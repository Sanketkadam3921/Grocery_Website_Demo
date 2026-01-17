import { Box, Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function DiscoverDifferenceSection() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        backgroundColor: "white",
        py: { xs: 6, md: 12 },
        borderTop: "1px solid #f2f2f2",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 4, md: 6 },
            alignItems: "center",
          }}
        >
          {/* Left: Text Content */}
          <Box
            sx={{
              flex: 1,
              order: { xs: 2, sm: 1 },
            }}
          >
            <Box
              sx={{
                maxWidth: { xs: "100%", sm: "100%", lg: "520px" },
                textAlign: { xs: "center", sm: "left" },
                mx: { xs: "auto", sm: 0 },
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "1.75rem", sm: "2rem", md: "2.75rem" },
                  fontWeight: 700,
                  color: "#1a1a1a",
                  mb: { xs: 2, md: 3 },
                  letterSpacing: "-0.01em",
                }}
              >
                Zonix Fresh Difference
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "0.9375rem", md: "1.125rem" },
                  color: "#666",
                  mb: { xs: 3, md: 4 },
                  lineHeight: 1.8,
                }}
              >
                Quality at Zonix Fresh isn't a promise — it's a process. From
                sourcing essentials to doorstep delivery, every step is
                thoughtfully designed to ensure freshness, fairness, and
                reliability.
              </Typography>

              {/* Process Highlights */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  flexWrap: "wrap",
                  gap: { xs: 1.5, sm: 2 },
                  mb: { xs: 3, md: 4 },
                  justifyContent: { xs: "center", sm: "flex-start" },
                }}
              >
                <Box sx={{ flex: { xs: "1 1 100%", sm: "1 1 auto" } }}>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: "0.9375rem", md: "1rem" },
                      textAlign: { xs: "center", sm: "left" },
                    }}
                  >
                    🏪 Direct-from-source procurement
                  </Typography>
                </Box>

                <Box sx={{ flex: { xs: "1 1 100%", sm: "1 1 auto" } }}>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: "0.9375rem", md: "1rem" },
                      textAlign: { xs: "center", sm: "left" },
                    }}
                  >
                    🧪 Multi-stage quality checks
                  </Typography>
                </Box>

                <Box sx={{ flex: { xs: "1 1 100%", sm: "1 1 auto" } }}>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: "0.9375rem", md: "1rem" },
                      textAlign: { xs: "center", sm: "left" },
                    }}
                  >
                    ⚡ Hyperlocal fulfillment hubs
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "center", sm: "flex-start" },
                }}
              >
                {/* <Button
                  variant="contained"
                  onClick={() => {
                    navigate("/products");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  sx={{
                    backgroundColor: "#FFD84D",
                    color: "#1a1a1a",
                    borderRadius: "50px",
                    px: { xs: 3, md: 4 },
                    py: { xs: 1.25, md: 1.5 },
                    textTransform: "none",
                    fontSize: { xs: "1rem", md: "1.125rem" },
                    fontWeight: 600,
                    boxShadow: 2,
                    width: { xs: "100%", sm: "auto" },
                    "&:hover": {
                      backgroundColor: "#FFDE42",
                      boxShadow: 4,
                    },
                  }}
                >
                  Start Shopping
                </Button> */}
              </Box>
            </Box>
          </Box>

          {/* Right: Visual */}
          <Box
            sx={{
              flex: 1,
              order: { xs: 1, sm: 2 },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1542838132-92c53300491e"
              alt="Fresh groceries sourced and delivered"
              loading="lazy"
              sx={{
                width: "100%",
                maxWidth: {
                  xs: "100%",
                  sm: "400px",
                  md: "420px",
                  lg: "520px",
                },
                height: "auto",
                borderRadius: 3,
                boxShadow: 3,
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default DiscoverDifferenceSection;
