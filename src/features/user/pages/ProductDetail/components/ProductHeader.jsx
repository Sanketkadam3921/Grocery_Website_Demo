import { Typography, Divider } from "@mui/material";

const ProductHeader = ({ name, category }) => {
  return (
    <>
      <Typography
        variant="h5"
        sx={{
          fontSize: {
            xs: "1.25rem",
            sm: "1.375rem",
            md: "1.5rem",
          },
          fontWeight: 600,
          color: "#1a1a1a",
          lineHeight: 1.3,
        }}
      >
        {name}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          fontSize: { xs: "0.8125rem", sm: "0.875rem" },
          color: "#888",
          textTransform: "uppercase",
          letterSpacing: 0.3,
          fontWeight: 500,
        }}
      >
        {category}
      </Typography>

      <Divider sx={{ my: { xs: 0.5, sm: 0.75 } }} />
    </>
  );
};

export default ProductHeader;

