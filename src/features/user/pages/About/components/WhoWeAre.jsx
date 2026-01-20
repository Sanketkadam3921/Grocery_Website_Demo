import { Box, Typography } from "@mui/material";

function WhoWeAre() {
  return (
    <Box
      sx={{
        mb: { xs: 4, sm: 5, md: 6 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: { xs: 0, sm: 1 },
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.25rem" },
          color: "#1a1a1a",
          mb: { xs: 2, sm: 2.5, md: 3 },
          textAlign: "center",
        }}
      >
        Who We Are
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: "0.9375rem", sm: "1rem", md: "1.125rem" },
          color: "#666",
          lineHeight: { xs: 1.7, md: 1.8 },
          textAlign: "center",
          maxWidth: "800px",
        }}
      >
        Zonix Fresh is a modern online grocery platform dedicated to bringing
        you the freshest produce and daily essentials. We focus on freshness,
        quality, and convenience, ensuring that every product reaches your home
        at its peak quality.
      </Typography>
    </Box>
  );
}

export default WhoWeAre;
