import { Box, Typography, Divider } from "@mui/material";

const ProductDescription = ({ description, name }) => {
  return (
    <>
      <Box>
        <Typography
          variant="body2"
          sx={{
            fontSize: { xs: "0.875rem", sm: "0.9375rem" },
            fontWeight: 600,
            color: "#1a1a1a",
            mb: { xs: 0.75, sm: 1 },
          }}
        >
          Description
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: { xs: "0.8125rem", sm: "0.875rem" },
            color: "#666",
            lineHeight: 1.6,
          }}
        >
          {description ||
            `Fresh and high-quality ${name.toLowerCase()} from our premium collection. This product is carefully selected to ensure the best quality and freshness for our customers. Perfect for your daily needs and cooking requirements.`}
        </Typography>
      </Box>

      <Divider sx={{ my: { xs: 0.5, sm: 0.75 } }} />
    </>
  );
};

export default ProductDescription;

