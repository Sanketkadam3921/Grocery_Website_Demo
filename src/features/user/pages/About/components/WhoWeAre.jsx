import { Box, Typography } from "@mui/material";

function WhoWeAre() {
  return (
    <Box
      sx={{
        mb: { xs: 4, md: 6 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          fontSize: { xs: "1.75rem", md: "2.25rem" },
          color: "#1a1a1a",
          mb: 3,
          textAlign: { xs: "center", md: "left" },
        }}
      >
        Who We Are
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: "1rem", md: "1.125rem" },
          color: "#666",
          lineHeight: 1.8,
          textAlign: { xs: "center", md: "left" },
          maxWidth: "800px",
        }}
      >
        ZonixFresh is a modern online grocery platform dedicated to bringing you
        the freshest produce and daily essentials. We focus on freshness,
        quality, and convenience, ensuring that every product reaches your home
        at its peak quality.
      </Typography>
    </Box>
  );
}

export default WhoWeAre;
