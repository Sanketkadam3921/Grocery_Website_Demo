import { Box, Container, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid";

function DiscoverDifferenceSection() {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        py: { xs: 6, md: 12 },
        borderTop: "1px solid #f2f2f2",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={{ xs: 4, md: 6 }}
          alignItems="center"
          justifyContent="center"
        >
          {/* Left: Text Content */}
          <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
            <Box
              sx={{
                maxWidth: { xs: "100%", sm: "400px", md: "370px", lg: "520px" },
                textAlign: { xs: "center", md: "left" },
                mx: { xs: "auto", md: 0 },
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
                The Zonix Fresh Difference
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
              <Grid
                container
                spacing={{ xs: 1.5, sm: 2 }}
                sx={{
                  mb: { xs: 3, md: 4 },
                  justifyContent: { xs: "center", sm: "flex-start" },
                }}
              >
                <Grid item xs={12} sm={4}>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: "0.9375rem", md: "1rem" },
                      textAlign: { xs: "center", sm: "left" },
                    }}
                  >
                    🏪 Direct-from-source procurement
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: "0.9375rem", md: "1rem" },
                      textAlign: { xs: "center", sm: "left" },
                    }}
                  >
                    🧪 Multi-stage quality checks
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: "0.9375rem", md: "1rem" },
                      textAlign: { xs: "center", sm: "left" },
                    }}
                  >
                    ⚡ Hyperlocal fulfillment hubs
                  </Typography>
                </Grid>
              </Grid>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <Button
                  variant="contained"
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
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Right: Visual */}
          <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
            <Box
              sx={{
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
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default DiscoverDifferenceSection;
