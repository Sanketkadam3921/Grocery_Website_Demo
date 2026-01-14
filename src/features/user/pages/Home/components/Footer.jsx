import { Box, Typography, Container, Grid, Link } from "@mui/material";
import logo from "../../../../../assets/Logo/shop-svgrepo-com 1.svg";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#FFF8ED",
        py: { xs: 6, md: 10 },
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          justifyContent="center"
          columnGap={{
            xs: 1, // mobile
            sm: 3, // tablets
            md: 4, // laptops
            lg: 6, // large screens
            xl: 18, // extra large
          }}
        >
          {/* Logo Column */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Box
                component="img"
                src={logo}
                alt="Zonix Fresh Logo"
                sx={{ width: 96, height: 96 }}
              />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  fontSize: "1.75rem",
                  color: "#1a1a1a",
                }}
              >
                Zonix Fresh
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                color: "#666",
                fontSize: "1rem",
                lineHeight: 1.7,
                maxWidth: "300px",
              }}
            >
              Your trusted source for fresh, quality groceries delivered to your
              door. Experience the Zonix Fresh difference today.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid
            item
            xs={6}
            sm={4}
            md={2.67}
            sx={{
              mt: 4,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: "1.125rem",
                fontWeight: 700,
                color: "#1a1a1a",
                mb: 2,
              }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Link
                href="#"
                sx={{
                  color: "#666",
                  textDecoration: "none",
                  fontSize: "1rem",
                  "&:hover": {
                    color: "#FFD84D",
                    textDecoration: "underline",
                  },
                }}
              >
                Home
              </Link>
              <Link
                href="#"
                sx={{
                  color: "#666",
                  textDecoration: "none",
                  fontSize: "1rem",
                  "&:hover": {
                    color: "#FFD84D",
                    textDecoration: "underline",
                  },
                }}
              >
                About
              </Link>
              <Link
                href="#"
                sx={{
                  color: "#666",
                  textDecoration: "none",
                  fontSize: "1rem",
                  "&:hover": {
                    color: "#FFD84D",
                    textDecoration: "underline",
                  },
                }}
              >
                Shop
              </Link>
              <Link
                href="#"
                sx={{
                  color: "#666",
                  textDecoration: "none",
                  fontSize: "1rem",
                  "&:hover": {
                    color: "#FFD84D",
                    textDecoration: "underline",
                  },
                }}
              >
                Contact
              </Link>
            </Box>
          </Grid>

          {/* Services */}
          <Grid
            item
            xs={6}
            sm={4}
            md={2.67}
            sx={{
              mt: 4,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: "1.125rem",
                fontWeight: 700,
                color: "#1a1a1a",
                mb: 2,
              }}
            >
              Services
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Link
                href="#"
                sx={{
                  color: "#666",
                  textDecoration: "none",
                  fontSize: "1rem",
                  "&:hover": {
                    color: "#FFD84D",
                    textDecoration: "underline",
                  },
                }}
              >
                Delivery
              </Link>
              <Link
                href="#"
                sx={{
                  color: "#666",
                  textDecoration: "none",
                  fontSize: "1rem",
                  "&:hover": {
                    color: "#FFD84D",
                    textDecoration: "underline",
                  },
                }}
              >
                Returns
              </Link>
              <Link
                href="#"
                sx={{
                  color: "#666",
                  textDecoration: "none",
                  fontSize: "1rem",
                  "&:hover": {
                    color: "#FFD84D",
                    textDecoration: "underline",
                  },
                }}
              >
                FAQ
              </Link>
              <Link
                href="#"
                sx={{
                  color: "#666",
                  textDecoration: "none",
                  fontSize: "1rem",
                  "&:hover": {
                    color: "#FFD84D",
                    textDecoration: "underline",
                  },
                }}
              >
                Support
              </Link>
            </Box>
          </Grid>

          {/* Connect With Us */}
          <Grid
            item
            xs={12}
            sm={4}
            md={2.67}
            sx={{
              mt: 4,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: "1.125rem",
                fontWeight: 700,
                color: "#1a1a1a",
                mb: 2,
              }}
            >
              Connect With Us
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Link
                href="#"
                sx={{
                  color: "#666",
                  textDecoration: "none",
                  fontSize: "1rem",
                  "&:hover": {
                    color: "#FFD84D",
                    textDecoration: "underline",
                  },
                }}
              >
                Newsletter
              </Link>
              <Link
                href="#"
                sx={{
                  color: "#666",
                  textDecoration: "none",
                  fontSize: "1rem",
                  "&:hover": {
                    color: "#FFD84D",
                    textDecoration: "underline",
                  },
                }}
              >
                Social Media
              </Link>
              <Link
                href="#"
                sx={{
                  color: "#666",
                  textDecoration: "none",
                  fontSize: "1rem",
                  "&:hover": {
                    color: "#FFD84D",
                    textDecoration: "underline",
                  },
                }}
              >
                Blog
              </Link>
              <Link
                href="#"
                sx={{
                  color: "#666",
                  textDecoration: "none",
                  fontSize: "1rem",
                  "&:hover": {
                    color: "#FFD84D",
                    textDecoration: "underline",
                  },
                }}
              >
                Careers
              </Link>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            borderTop: "1px solid rgba(0, 0, 0, 0.1)",
            mt: 6,
            pt: 4,
            textAlign: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#666",
              fontSize: "0.875rem",
            }}
          >
            © {new Date().getFullYear()} Zonix Fresh. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
