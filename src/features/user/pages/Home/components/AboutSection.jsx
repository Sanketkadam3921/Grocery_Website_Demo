import { Box, Container, Typography } from "@mui/material";

function AboutSection() {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        py: { xs: 6, md: 10 },
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "2rem", md: "2.75rem" },
            fontWeight: 700,
            color: "#1a1a1a",
            textAlign: "center",
            mb: 3,
            letterSpacing: "-0.01em",
          }}
        >
          About Zonix Fresh
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "1rem", md: "1.125rem" },
            color: "#666",
            textAlign: "center",
            lineHeight: 1.8,
            maxWidth: "700px",
            mx: "auto",
          }}
        >
          At Zonix Fresh, we're committed to bringing you the freshest, highest
          quality groceries with unmatched convenience. Our carefully curated
          selection ensures you get premium products delivered fast and fresh to
          your door. We believe in quality, freshness, and making grocery
          shopping effortless.
        </Typography>
      </Container>
    </Box>
  );
}

export default AboutSection;
