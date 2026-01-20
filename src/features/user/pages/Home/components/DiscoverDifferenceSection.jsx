import { Box, Container, Typography } from "@mui/material";

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
                maxWidth: { xs: "100%", lg: "520px" },
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
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "1fr 1fr",
                  },
                  gap: { xs: 2, md: 2.5 },
                  mb: { xs: 3, md: 4 },
                }}
              >
                {/* Item 1 */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box
                    component="img"
                    src="https://cdn-icons-png.flaticon.com/128/2756/2756716.png"
                    alt="Direct sourcing"
                    sx={{ width: 40, height: 40 }}
                  />
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: "0.9375rem", md: "1rem" },
                      color: "#666",
                    }}
                  >
                    Direct-from-source procurement
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: "0.9375rem", md: "1rem" },
                    color: "#666",
                  }}
                >
                  Multi-stage quality
                  <Box
                    component="br"
                    sx={{ display: { xs: "block", md: "none" } }}
                  />
                  checks
                </Typography>

                {/* Item 3 */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box
                    component="img"
                    src="https://cdn-icons-png.flaticon.com/128/2203/2203206.png"
                    alt="Fast delivery"
                    sx={{ width: 40, height: 40 }}
                  />

                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: "0.9375rem", md: "1rem" },
                      color: "#666",
                    }}
                  >
                    Hyperlocal fulfillment
                    <Box
                      component="br"
                      sx={{ display: { xs: "block", md: "none" } }}
                    />
                    hubs
                  </Typography>
                </Box>

                {/* Item 4 (NEW) */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box
                    component="img"
                    src="https://cdn-icons-png.flaticon.com/128/2769/2769400.png"
                    alt="Customer trust"
                    sx={{ width: 40, height: 40 }}
                  />
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: "0.9375rem", md: "1rem" },
                      color: "#666",
                    }}
                  >
                    Transparent pricing & customer trust
                  </Typography>
                </Box>
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
