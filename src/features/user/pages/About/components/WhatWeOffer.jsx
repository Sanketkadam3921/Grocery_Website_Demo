import { Box, Typography, Paper } from "@mui/material";
import {
  Restaurant as RestaurantIcon,
  BakeryDining as BakeryIcon,
  Kitchen as KitchenIcon,
  LocalCafe as BeverageIcon,
} from "@mui/icons-material";

// Icon mapping
const iconMap = {
  Restaurant: RestaurantIcon,
  BakeryDining: BakeryIcon,
  Kitchen: KitchenIcon,
  LocalCafe: BeverageIcon,
};

// Mock data for demonstration
const mockCategories = [
  {
    iconName: "Restaurant",
    iconSize: 48,
    title: "Fine Dining",
    description:
      "Experience exquisite culinary creations crafted by our expert chefs using the finest ingredients.",
  },
  {
    iconName: "BakeryDining",
    iconSize: 48,
    title: "Fresh Bakery",
    description:
      "Artisan breads, pastries, and desserts baked fresh daily with traditional techniques.",
  },
  {
    iconName: "Kitchen",
    iconSize: 48,
    title: "Catering Services",
    description:
      "Professional catering for all occasions, from intimate gatherings to large events.",
  },
  {
    iconName: "LocalCafe",
    iconSize: 48,
    title: "Beverages",
    description:
      "Premium coffee, teas, and refreshing drinks to complement your dining experience.",
  },
];

function WhatWeOffer() {
  const categories = mockCategories;

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
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.25rem" },
          color: "#1a1a1a",
          mb: { xs: 3, sm: 4, md: 5 },
          textAlign: "center",
          px: { xs: 2, sm: 0 },
        }}
      >
        What We Offer
      </Typography>

      {/* Grid Container for Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr", // 1 column on mobile
            sm: "repeat(2, 1fr)", // 2 columns on tablet
            md: "repeat(2, 1fr)", // 2 columns on medium screens
            lg: "repeat(4, 1fr)", // 4 columns on large screens
          },
          gap: { xs: 2, sm: 2.5, md: 3 },
          width: "100%",
        }}
      >
        {categories.map((category, index) => {
          const IconComponent = iconMap[category.iconName];
          return (
            <Box
              key={index}
              sx={{
                width: "100%",
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 3.5 },
                  textAlign: "center",
                  borderRadius: 2,
                  border: "1px solid #e0e0e0",
                  backgroundColor: "white",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    boxShadow: "0 8px 24px rgba(46, 125, 50, 0.15)",
                    transform: "translateY(-6px)",
                    borderColor: "#2e7d32",
                  },
                }}
              >
                {/* Icon Container */}
                <Box
                  sx={{
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: { xs: 64, md: 72 },
                    height: { xs: 64, md: 72 },
                    borderRadius: "50%",
                    backgroundColor: "rgba(46, 125, 50, 0.08)",
                    transition: "all 0.3s ease",
                    "& svg": {
                      transition: "all 0.3s ease",
                    },
                    ".MuiPaper-root:hover &": {
                      backgroundColor: "rgba(46, 125, 50, 0.12)",
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  {IconComponent && (
                    <IconComponent
                      sx={{
                        fontSize: { xs: 36, md: 40 },
                        color: "#2e7d32",
                      }}
                    />
                  )}
                </Box>

                {/* Title */}
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "#1a1a1a",
                    mb: 1.5,
                    fontSize: { xs: "1.125rem", md: "1.25rem" },
                    lineHeight: 1.3,
                  }}
                >
                  {category.title}
                </Typography>

                {/* Description */}
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                    lineHeight: 1.7,
                    fontSize: { xs: "0.875rem", md: "0.9375rem" },
                    flexGrow: 1,
                  }}
                >
                  {category.description}
                </Typography>
              </Paper>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default WhatWeOffer;
