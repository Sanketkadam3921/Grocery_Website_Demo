import { Box, Typography } from "@mui/material";

const HeroSection = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        py: { xs: 5, sm: 6, md: 8 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        minHeight: { xs: "280px", sm: "320px", md: "400px" },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "brightness(0.35) saturate(1.1)",
          zIndex: 0,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 100%)",
          zIndex: 1,
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          maxWidth: "900px",
          width: "100%",
          px: { xs: 3, sm: 4, md: 5 },
          textAlign: "center",
          color: "white",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "2rem", sm: "2.75rem", md: "3.5rem" },
            mb: { xs: 2, sm: 2.5 },
            lineHeight: 1.1,
            textShadow: "0 4px 12px rgba(0,0,0,0.4)",
            letterSpacing: "-0.02em",
          }}
        >
          Get in Touch
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "1rem", sm: "1.2rem", md: "1.35rem" },
            fontWeight: 400,
            lineHeight: { xs: 1.6, sm: 1.7 },
            opacity: 0.95,
            textShadow: "0 2px 6px rgba(0,0,0,0.3)",
            maxWidth: "700px",
            mx: "auto",
            px: { xs: 1, sm: 0 },
          }}
        >
          Have a question or need help? We're here to assist you with anything you need.
        </Typography>
      </Box>
    </Box>
  );
};

export default HeroSection;



