import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FormActions = ({ isMobile }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column-reverse", sm: "row" },
        gap: 2,
        justifyContent: "flex-end",
        mt: { xs: 1, sm: 2 },
      }}
    >
      <Button
        variant="outlined"
        onClick={() => navigate("/admin/products")}
        fullWidth={isMobile}
        sx={{
          textTransform: "none",
          px: 4,
          py: { xs: 1.2, sm: 1 },
          borderColor: "#757575",
          color: "#757575",
          fontSize: { xs: "0.95rem", sm: "0.875rem" },
          fontWeight: 500,
          "&:hover": {
            borderColor: "#616161",
            backgroundColor: "#f5f5f5",
          },
        }}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        variant="contained"
        fullWidth={isMobile}
        sx={{
          textTransform: "none",
          px: 4,
          py: { xs: 1.2, sm: 1 },
          fontSize: { xs: "0.95rem", sm: "0.875rem" },
          fontWeight: 500,
          backgroundColor: "#2e7d32",
          boxShadow: "0 2px 4px rgba(46, 125, 50, 0.2)",
          "&:hover": {
            backgroundColor: "#1b5e20",
            boxShadow: "0 4px 8px rgba(46, 125, 50, 0.3)",
          },
        }}
      >
        Add Product
      </Button>
    </Box>
  );
};

export default FormActions;

