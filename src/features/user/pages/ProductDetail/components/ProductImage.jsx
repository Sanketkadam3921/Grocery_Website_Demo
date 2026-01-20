import { Box } from "@mui/material";

const ProductImage = ({ image, name }) => {
  return (
    <Box
      sx={{
        width: { xs: "100%", md: "50%" },
        flexShrink: 0,
        display: "flex",
        alignItems: "stretch",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: "400px", sm: "500px", md: "600px" },
          borderRadius: { xs: 1, sm: 1.5 },
          overflow: "hidden",
          backgroundColor: "#f8f8f8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          src={image}
          alt={name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover", // Changed from "contain" to "cover" for consistent fill
          }}
        />
      </Box>
    </Box>
  );
};

export default ProductImage;

