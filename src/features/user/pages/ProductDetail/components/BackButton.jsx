import { Button } from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      startIcon={<ArrowBackIcon />}
      onClick={() => navigate("/products")}
      sx={{
        mb: { xs: 1.5, sm: 2 },
        color: "#666",
        textTransform: "none",
        px: 0,
        minWidth: "auto",
        "&:hover": {
          backgroundColor: "transparent",
          color: "#2e7d32",
        },
      }}
    >
      Back
    </Button>
  );
};

export default BackButton;

