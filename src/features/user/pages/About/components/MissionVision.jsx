import { Box, Grid, Paper, Typography } from "@mui/material";

function MissionVision() {
  return (
    <Box sx={{ mb: { xs: 4, md: 6 } }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
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
              every household.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
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
              homes.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MissionVision;

