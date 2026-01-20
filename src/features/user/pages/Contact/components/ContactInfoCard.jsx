import { Box, Typography, Paper } from "@mui/material";

const ContactInfoCard = ({ icon, title, content }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, sm: 3, md: 3.5 },
        textAlign: "center",
        borderRadius: 3,
        border: "1px solid #e8e8e8",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: { xs: "160px", sm: "180px", md: "200px" },
        transition: "all 0.3s ease",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          borderColor: "#2e7d32",
        },
      }}
    >
      <Box
        sx={{
          mb: { xs: 1.5, sm: 2 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: { xs: 56, sm: 64, md: 72 },
          height: { xs: 56, sm: 64, md: 72 },
          borderRadius: "50%",
          backgroundColor: "rgba(46, 125, 50, 0.1)",
          transition: "all 0.3s ease",
        }}
      >
        {icon}
      </Box>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          color: "#1a1a1a",
          mb: { xs: 0.75, sm: 1 },
          fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "#666",
          lineHeight: { xs: 1.5, sm: 1.6 },
          fontSize: { xs: "0.8125rem", sm: "0.875rem", md: "0.9375rem" },
          wordBreak: "break-word",
        }}
      >
        {content}
      </Typography>
    </Paper>
  );
};

export default ContactInfoCard;


