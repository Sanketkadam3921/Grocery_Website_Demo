import { Box, Paper, Typography } from "@mui/material";

function MissionVision() {
  return (
    <Box
      sx={{ mb: { xs: 4, md: 6 }, display: "flex", justifyContent: "center" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          maxWidth: 1080,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 2,
              border: "1px solid #e0e0e0",
              backgroundColor: "white",
              height: "100%",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: "#1a1a1a",
                mb: 2,
                fontSize: { xs: "1.25rem", md: "1.5rem" },
              }}
            >
              Our Mission
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#666",
                lineHeight: 1.8,
                fontSize: { xs: "1rem", md: "1.125rem" },
              }}
            >
              To make fresh groceries accessible, affordable, and convenient for
              every household by connecting local farmers, trusted suppliers,
              and modern technology — ensuring quality produce, fair prices, and
              a seamless shopping experience from farm to doorstep.
            </Typography>
          </Paper>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 2,
              border: "1px solid #e0e0e0",
              backgroundColor: "white",
              height: "100%",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: "#1a1a1a",
                mb: 2,
                fontSize: { xs: "1.25rem", md: "1.5rem" },
              }}
            >
              Our Vision
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#666",
                lineHeight: 1.8,
                fontSize: { xs: "1rem", md: "1.125rem" },
              }}
            >
              To become the most trusted digital grocery partner for Indian
              homes by building a transparent, reliable, and sustainable
              ecosystem that empowers communities, supports local producers, and
              makes healthy living simple, affordable, and accessible for
              everyone.
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

export default MissionVision;
