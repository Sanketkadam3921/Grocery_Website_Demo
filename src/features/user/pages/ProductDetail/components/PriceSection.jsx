import { Box, Typography, Chip, Divider } from "@mui/material";

const PriceSection = ({ price, mrp, unit, hasDiscount, discountPercentage }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: 0.25, sm: 0.5 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 0.75, sm: 1 },
            flexWrap: "wrap",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontSize: {
                xs: "1.5rem",
                sm: "1.75rem",
                md: "2rem",
              },
              fontWeight: 700,
              color: "#2e7d32",
              lineHeight: 1,
            }}
          >
            ₹{price}
          </Typography>
          {hasDiscount && (
            <Typography
              variant="body1"
              sx={{
                fontSize: {
                  xs: "1rem",
                  sm: "1.125rem",
                },
                color: "#999",
                textDecoration: "line-through",
                fontWeight: 400,
              }}
            >
              ₹{mrp}
            </Typography>
          )}
          {hasDiscount && (
            <Chip
              label={`${discountPercentage}% OFF`}
              sx={{
                backgroundColor: "#2e7d32",
                color: "white",
                fontWeight: 600,
                fontSize: { xs: "0.75rem", sm: "0.8125rem" },
                height: { xs: 24, sm: 28 },
                px: { xs: 0.5, sm: 0.75 },
              }}
            />
          )}
        </Box>
        <Typography
          variant="body2"
          sx={{
            fontSize: { xs: "0.8125rem", sm: "0.875rem" },
            color: "#666",
            fontWeight: 400,
          }}
        >
          Per {unit}
        </Typography>
      </Box>

      <Divider sx={{ my: { xs: 0.5, sm: 0.75 } }} />
    </>
  );
};

export default PriceSection;



