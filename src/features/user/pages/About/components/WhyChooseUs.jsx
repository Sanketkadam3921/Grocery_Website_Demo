import { Box, Typography, Grid, Paper } from "@mui/material";
import {
  Restaurant as RestaurantIcon,
  LocalShipping as ShippingIcon,
  Security as SecurityIcon,
  SupportAgent as SupportIcon,
} from "@mui/icons-material";
import { useAboutData } from "../hooks/useAboutData";

// Icon mapping
const iconMap = {
  Restaurant: RestaurantIcon,
  LocalShipping: ShippingIcon,
  Security: SecurityIcon,
  SupportAgent: SupportIcon,
};

function WhyChooseUs() {
  const { features } = useAboutData();

  return (
    <Box sx={{ mb: { xs: 4, md: 6 } }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          fontSize: { xs: "1.75rem", md: "2.25rem" },
          color: "#1a1a1a",
          mb: 4,
          textAlign: "center",
        }}
      >
        Why Choose ZonixFresh
      </Typography>
      <Grid container spacing={3}>
        {features.map((feature, index) => {
          const IconComponent = iconMap[feature.iconName];
          return (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: "center",
                  borderRadius: 2,
                  border: "1px solid #e0e0e0",
                  backgroundColor: "white",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 4px 12px rgba(46, 125, 50, 0.15)",
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <Box sx={{ mb: 2 }}>
                  {IconComponent && (
                    <IconComponent
                      sx={{ fontSize: feature.iconSize, color: "#2e7d32" }}
                    />
                  )}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "#1a1a1a",
                    mb: 1,
                    fontSize: { xs: "1rem", md: "1.125rem" },
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                    lineHeight: 1.6,
                  }}
                >
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default WhyChooseUs;
