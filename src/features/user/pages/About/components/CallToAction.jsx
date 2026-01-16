import { Box, Typography, Button } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";

function CallToAction() {
  const handleNavigate = () => {
    console.log("Navigate to products");
    // navigate("/products") - replace with your navigation logic
  };

  return (
    <Box
      sx={{
        width: "100%",
        px: { xs: 0, sm: 2, md: 3, lg: 4 },
        py: { xs: 4, sm: 5, md: 6 },
        maxWidth: "1400px",
        mx: "auto",
      }}
    >
      <Box
        sx={{
          position: "relative",
          borderRadius: { xs: 2, md: 3 },
          overflow: "hidden",
          minHeight: { xs: "320px", sm: "380px", md: "420px" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url('https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "brightness(0.5)",
            zIndex: 0,
          },
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,

            zIndex: 1,
          },
        }}
      >
        {/* Content Container */}
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            color: "white",
            px: { xs: 3, sm: 4, md: 6 },
            py: { xs: 4, md: 6 },
            maxWidth: "800px",
            width: "100%",
          }}
        >
          {/* Heading */}
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.75rem" },
              mb: { xs: 1.5, sm: 2 },
              lineHeight: 1.2,
              textShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }}
          >
            Start Shopping Fresh Today
          </Typography>

          {/* Subheading */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 400,
              fontSize: { xs: "0.9375rem", sm: "1.0625rem", md: "1.25rem" },
              mb: { xs: 3, sm: 4 },
              opacity: 0.95,
              lineHeight: { xs: 1.5, md: 1.6 },
              maxWidth: "600px",
              mx: "auto",
              textShadow: "0 1px 4px rgba(0,0,0,0.2)",
            }}
          >
            Discover premium quality products delivered fresh to your doorstep
          </Typography>

          {/* CTA Button */}
          <Button
            variant="contained"
            size="large"
            onClick={handleNavigate}
            endIcon={<ArrowForward />}
            sx={{
              backgroundColor: "white",
              color: "#2e7d32",
              textTransform: "none",
              px: { xs: 3, md: 5 },
              py: { xs: 1.5, md: 2 },
              borderRadius: 2,
              fontWeight: 600,
              fontSize: { xs: "1rem", md: "1.125rem" },
              boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
              "&:hover": {
                backgroundColor: "#f5f5f5",
                transform: "translateY(-3px)",
                boxShadow: "0 6px 24px rgba(0,0,0,0.3)",
                "& .MuiSvgIcon-root": {
                  transform: "translateX(4px)",
                },
              },
              "& .MuiSvgIcon-root": {
                transition: "transform 0.3s ease",
              },
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            Explore Products
          </Button>

          {/* Optional: Feature badges */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: { xs: 1.5, sm: 2, md: 4 },
              mt: { xs: 3, sm: 4 },
              flexWrap: "wrap",
            }}
          >
            {["Fresh Daily", "Free Delivery", "Best Prices"].map(
              (badge, index) => (
                <Box
                  key={index}
                  sx={{
                    px: { xs: 1.5, sm: 2, md: 3 },
                    py: { xs: 0.75, sm: 1 },
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(10px)",
                    borderRadius: 2,
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    fontSize: { xs: "0.8125rem", sm: "0.875rem", md: "1rem" },
                    fontWeight: 500,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.25)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  {badge}
                </Box>
              )
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default CallToAction;
