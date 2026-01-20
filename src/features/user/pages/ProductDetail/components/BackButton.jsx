import { Button } from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    // Go back in browser history, or navigate to products page if no history
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/products");
    }
  };

  return (
    <Button
      startIcon={<ArrowBackIcon />}
      onClick={handleBack}
      sx={{
        mb: { xs: 1.5, sm: 2 },
        mt: { xs: 1, sm: 1.5 },
        color: "#666",
        textTransform: "none",
        px: 2,
        py: 1,
        minWidth: "auto",
        fontSize: { xs: "0.875rem", sm: "0.9375rem" },
        fontWeight: 500,
        "&:hover": {
          backgroundColor: "rgba(46, 125, 50, 0.08)",
          color: "#2e7d32",
        },
      }}
    >
      Back
    </Button>
  );
};

export default BackButton;


