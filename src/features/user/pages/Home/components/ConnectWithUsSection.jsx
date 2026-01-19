import { Box, Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ConnectWithUsSection() {
  const navigate = useNavigate();

  const handleGetInTouch = () => {
    navigate("/contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box
      sx={{
        backgroundColor: "#FFF8ED",
        py: { xs: 6, md: 12 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 4, md: 6 },
            alignItems: "center",
          }}
        >
          {/* Left: Image */}
          <Box
            sx={{
              flex: 1,
              order: { xs: 1, sm: 1 },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src="https://imgs.search.brave.com/YuvAj8ka0XuSqQsVjXv293xfXvqC0h2EUNSzqdMcmG4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA5LzExLzQ1LzEw/LzM2MF9GXzkxMTQ1/MTA0N19iTjNOMlVF/M1FBb0NwcE52dGJJ/VGhsWE5mVWR3cGY1/dS5qcGc"
              alt="Fresh groceries in bowl"
              loading="lazy"
              sx={{
                width: "100%",
                maxWidth: {
                  xs: "100%",
                  sm: "400px",
                  md: "420px",
                  lg: "520px",
                },
                height: { xs: 260, sm: 340, md: 400 },
                objectFit: "cover",
                borderRadius: 4,
                boxShadow: "0px 20px 40px rgba(0,0,0,0.08)",
              }}
            />
          </Box>

          {/* Right: Text Content */}
          <Box
            sx={{
              flex: 1,
              order: { xs: 2, sm: 2 },
            }}
          >
            <Box
              sx={{
                maxWidth: { xs: "100%", sm: "100%", lg: "520px" },
                textAlign: { xs: "center", sm: "left" },
                mx: { xs: "auto", sm: 0 },
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "1.75rem", sm: "2.1rem", md: "2.75rem" },
                  fontWeight: 700,
                  color: "#1a1a1a",
                  mb: { xs: 2, md: 3 },
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                }}
              >
                Connect with Us
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: "0.95rem", md: "1.125rem" },
                  color: "#555",
                  mb: { xs: 3, md: 4 },
                  lineHeight: 1.8,
                }}
              >
                Stay updated with exclusive offers, fresh arrivals, and
                hand-picked deals. Subscribe to our updates or reach out — we're
                always happy to help make your grocery experience seamless.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: { xs: "center", sm: "flex-start" },
                  gap: 2,
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleGetInTouch}
                  sx={{
                    backgroundColor: "#FFD84D",
                    color: "black",
                    borderRadius: "999px",
                    px: { xs: 3, md: 4 },
                    py: { xs: 1.25, md: 1.5 },
                    textTransform: "none",
                    fontSize: { xs: "1rem", md: "1.05rem" },
                    fontWeight: 600,
                    width: { xs: "100%", sm: "auto" },
                    boxShadow: "0px 10px 20px rgba(0,0,0,0.15)",
                    "&:hover": {
                      backgroundColor: "#FFD84D",
                    },
                  }}
                >
                  Get in Touch
                </Button>
                {/* 
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "#1a1a1a",
                    color: "#1a1a1a",
                    borderRadius: "999px",
                    px: { xs: 3, md: 4 },
                    py: { xs: 1.25, md: 1.5 },
                    textTransform: "none",
                    fontSize: { xs: "1rem", md: "1.05rem" },
                    fontWeight: 600,
                    width: { xs: "100%", sm: "auto" },
                    borderWidth: 2,
                    "&:hover": {
                      backgroundColor: "rgba(0,0,0,0.04)",
                      borderWidth: 2,
                    },
                  }}
                >
                  Chat with Us
                </Button> */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default ConnectWithUsSection;
