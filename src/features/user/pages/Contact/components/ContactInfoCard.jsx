import { Box, Typography, Paper } from "@mui/material";

const ContactInfoCard = ({ icon, title, content, onClick, href }) => {
  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  const isClickable = onClick || href;
  const isExternalLink = href && !href.startsWith("mailto:") && !href.startsWith("tel:");

  return (
    <Paper
      component={href ? "a" : "div"}
      href={href}
      onClick={onClick ? handleClick : undefined}
      target={isExternalLink ? "_blank" : undefined}
      rel={isExternalLink ? "noopener noreferrer" : undefined}
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
        cursor: isClickable ? "pointer" : "default",
        textDecoration: "none",
        "&:hover": {
          transform: isClickable ? "translateY(-4px)" : "none",
          boxShadow: isClickable ? "0 8px 24px rgba(0,0,0,0.12)" : "none",
          borderColor: isClickable ? "#2e7d32" : "#e8e8e8",
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


