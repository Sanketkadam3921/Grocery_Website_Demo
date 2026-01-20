import { Box, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

const SuccessMessage = () => {
  return (
    <Box
      sx={{
        p: { xs: 2, sm: 2.5 },
        mb: 3,
        borderRadius: 2,
        backgroundColor: "#e8f5e9",
        border: "1.5px solid #2e7d32",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1.5,
        boxShadow: "0 2px 8px rgba(46, 125, 50, 0.15)",
      }}
    >
      <CheckCircle sx={{ color: "#2e7d32", fontSize: { xs: 20, sm: 24 } }} />
      <Typography
        variant="body1"
        sx={{
          fontWeight: 600,
          color: "#2e7d32",
          fontSize: { xs: "0.875rem", sm: "0.9375rem" },
        }}
      >
        Thank you! We'll get back to you soon.
      </Typography>
    </Box>
  );
};

export default SuccessMessage;



