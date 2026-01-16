import { Box, Typography, Grid, Paper } from "@mui/material";
import {
  ShoppingCart as ShoppingCartIcon,
  LocalShipping as ShippingIcon,
  CheckCircle as CheckIcon,
} from "@mui/icons-material";
import { useAboutData } from "../hooks/useAboutData";

// Icon mapping
const iconMap = {
  ShoppingCart: ShoppingCartIcon,
  LocalShipping: ShippingIcon,
  CheckCircle: CheckIcon,
};

function HowItWorks() {
  const { steps } = useAboutData();

  return (
    <Box sx={{ mb: { xs: 4, sm: 5, md: 6 } }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.25rem" },
          color: "#1a1a1a",
          mb: { xs: 3, sm: 3.5, md: 4 },
          textAlign: "center",
        }}
      >
        How It Works
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, sm: 2.5, md: 3 }}
        sx={{
          justifyContent: "center",
        }}
      >
        {steps.map((step, index) => {
          const IconComponent = iconMap[step.iconName];
          return (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2.5, sm: 3, md: 3 },
                  textAlign: "center",
                  borderRadius: 2,
                  border: "1px solid #e0e0e0",
                  backgroundColor: "white",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  position: "relative",
                }}
              >
                {/* Step Number Badge */}
                <Box
                  sx={{
                    position: "absolute",
                    top: { xs: -12, sm: -15 },
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: { xs: 36, sm: 40 },
                    height: { xs: 36, sm: 40 },
                    borderRadius: "50%",
                    backgroundColor: "#2e7d32",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: { xs: "1.125rem", sm: "1.25rem" },
                  }}
                >
                  {step.number}
                </Box>
                <Box sx={{ mt: { xs: 1.5, sm: 2 }, mb: { xs: 1.5, sm: 2 } }}>
                  {IconComponent && (
                    <IconComponent
                      sx={{
                        fontSize: { xs: 28, sm: step.iconSize },
                        color: "#2e7d32",
                      }}
                    />
                  )}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "#1a1a1a",
                    mb: 1,
                    fontSize: { xs: "1rem", sm: "1.0625rem", md: "1.125rem" },
                  }}
                >
                  {step.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                    lineHeight: 1.6,
                    fontSize: { xs: "0.875rem", sm: "0.9375rem" },
                  }}
                >
                  {step.description}
                </Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default HowItWorks;
