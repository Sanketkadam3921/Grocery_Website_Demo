import {
  Box,
  Typography,
  Container,
  Link as MuiLink,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import logo from "../../../../../assets/Logo/shop-svgrepo-com 1.svg";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#FFF8ED",
        py: { xs: 5, md: 4 },

        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 4, md: 6 },
            mb: 6,
          }}
        >
          {/* Logo & Description Column */}
          <Box
            sx={{
              flex: { xs: "1 1 100%", md: "1 1 40%" },
              maxWidth: { md: "400px" },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Box
                component="img"
                src={logo}
                alt="Zonix Fresh Logo"
                sx={{ width: 80, height: 80 }}
              />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "1.5rem", md: "1.75rem" },
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
                mb: 3,
              }}
            >
              Your trusted source for fresh, quality groceries delivered to your
              door. Experience the Zonix Fresh difference today.
            </Typography>

            {/* Social Icons */}
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                href="#"
                sx={{
                  backgroundColor: "#1a1a1a",
                  color: "white",
                  width: 40,
                  height: 40,
                  "&:hover": {
                    backgroundColor: "#FFD84D",
                    color: "#1a1a1a",
                  },
                }}
              >
                <FacebookIcon fontSize="small" />
              </IconButton>
              <IconButton
                href="#"
                sx={{
                  backgroundColor: "#1a1a1a",
                  color: "white",
                  width: 40,
                  height: 40,
                  "&:hover": {
                    backgroundColor: "#FFD84D",
                    color: "#1a1a1a",
                  },
                }}
              >
                <TwitterIcon fontSize="small" />
              </IconButton>
              <IconButton
                href="#"
                sx={{
                  backgroundColor: "#1a1a1a",
                  color: "white",
                  width: 40,
                  height: 40,
                  "&:hover": {
                    backgroundColor: "#FFD84D",
                    color: "#1a1a1a",
                  },
                }}
              >
                <InstagramIcon fontSize="small" />
              </IconButton>
              <IconButton
                href="#"
                sx={{
                  backgroundColor: "#1a1a1a",
                  color: "white",
                  width: 40,
                  height: 40,
                  "&:hover": {
                    backgroundColor: "#FFD84D",
                    color: "#1a1a1a",
                  },
                }}
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
              <IconButton
                href="#"
                sx={{
                  backgroundColor: "#1a1a1a",
                  color: "white",
                  width: 40,
                  height: 40,
                  "&:hover": {
                    backgroundColor: "#FFD84D",
                    color: "#1a1a1a",
                  },
                }}
              >
                <YouTubeIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          {/* Links Columns */}
          <Box
            sx={{
              flex: { xs: "1 1 100%", md: "1 1 60%" },
              display: "flex",
              flexWrap: "wrap",
              gap: { xs: 4, sm: 3, md: 4 },
            }}
          >
            {/* Quick Links */}
            <Box
              sx={{
                flex: { xs: "1 1 calc(50% - 16px)", sm: "1 1 auto" },
                minWidth: { xs: "140px", sm: "150px" },
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
                <MuiLink
                  component={Link}
                  to="/"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  sx={{
                    color: "#1a1a1a",
                    textDecoration: "none",
                    fontSize: "1rem",
                    transition: "color 0.2s ease",
                    "&:hover": {
                      color: "#2e7d32",
                      textDecoration: "underline",
                    },
                  }}
                >
                  Home
                </MuiLink>
                <MuiLink
                  component={Link}
                  to="/about"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  sx={{
                    color: "#1a1a1a",
                    textDecoration: "none",
                    fontSize: "1rem",
                    transition: "color 0.2s ease",
                    "&:hover": {
                      color: "#2e7d32",
                      textDecoration: "underline",
                    },
                  }}
                >
                  About
                </MuiLink>
                <MuiLink
                  component={Link}
                  to="/products"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  sx={{
                    color: "#1a1a1a",
                    textDecoration: "none",
                    fontSize: "1rem",
                    transition: "color 0.2s ease",
                    "&:hover": {
                      color: "#2e7d32",
                      textDecoration: "underline",
                    },
                  }}
                >
                  Shop
                </MuiLink>
                <MuiLink
                  component={Link}
                  to="/contact"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  sx={{
                    color: "#666",
                    textDecoration: "none",
                    fontSize: "1rem",
                    transition: "color 0.2s ease",
                    "&:hover": {
                      color: "#2e7d32",
                      textDecoration: "underline",
                    },
                  }}
                >
                  Contact
                </MuiLink>
              </Box>
            </Box>

            {/* Services */}
            <Box
              sx={{
                flex: { xs: "1 1 calc(50% - 16px)", sm: "1 1 auto" },
                minWidth: { xs: "140px", sm: "150px" },
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
                <MuiLink
                  href="#"
                  sx={{
                    color: "#1a1a1a",
                    textDecoration: "none",
                    fontSize: "1rem",
                    transition: "color 0.2s ease",
                    "&:hover": {
                      color: "#2e7d32",
                      textDecoration: "underline",
                    },
                  }}
                >
                  Delivery
                </MuiLink>
                <MuiLink
                  href="#"
                  sx={{
                    color: "#1a1a1a",
                    textDecoration: "none",
                    fontSize: "1rem",
                    transition: "color 0.2s ease",
                    "&:hover": {
                      color: "#2e7d32",
                      textDecoration: "underline",
                    },
                  }}
                >
                  Returns
                </MuiLink>
                <MuiLink
                  href="#"
                  sx={{
                    color: "#1a1a1a",
                    textDecoration: "none",
                    fontSize: "1rem",
                    transition: "color 0.2s ease",
                    "&:hover": {
                      color: "#2e7d32",
                      textDecoration: "underline",
                    },
                  }}
                >
                  FAQ
                </MuiLink>
                <MuiLink
                  href="#"
                  sx={{
                    color: "#1a1a1a",
                    textDecoration: "none",
                    fontSize: "1rem",
                    transition: "color 0.2s ease",
                    "&:hover": {
                      color: "#2e7d32",
                      textDecoration: "underline",
                    },
                  }}
                >
                  Support
                </MuiLink>
              </Box>
            </Box>

            {/* Connect With Us */}
            <Box
              sx={{
                flex: { xs: "1 1 calc(50% - 16px)", sm: "1 1 auto" },
                minWidth: { xs: "140px", sm: "150px" },
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
                Connect
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <MuiLink
                  href="#"
                  sx={{
                    color: "#1a1a1a",
                    textDecoration: "none",
                    fontSize: "1rem",
                    transition: "color 0.2s ease",
                    "&:hover": {
                      color: "#2e7d32",
                      textDecoration: "underline",
                    },
                  }}
                >
                  Newsletter
                </MuiLink>
                <MuiLink
                  href="#"
                  sx={{
                    color: "#1a1a1a",
                    textDecoration: "none",
                    fontSize: "1rem",
                    transition: "color 0.2s ease",
                    "&:hover": {
                      color: "#2e7d32",
                      textDecoration: "underline",
                    },
                  }}
                >
                  Blog
                </MuiLink>
                <MuiLink
                  href="#"
                  sx={{
                    color: "#1a1a1a",
                    textDecoration: "none",
                    fontSize: "1rem",
                    transition: "color 0.2s ease",
                    "&:hover": {
                      color: "#2e7d32",
                      textDecoration: "underline",
                    },
                  }}
                >
                  Careers
                </MuiLink>
                <MuiLink
                  href="#"
                  sx={{
                    color: "#1a1a1a",
                    textDecoration: "none",
                    fontSize: "1rem",
                    transition: "color 0.2s ease",
                    "&:hover": {
                      color: "#2e7d32",
                      textDecoration: "underline",
                    },
                  }}
                >
                  Press
                </MuiLink>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Bottom Bar */}
        <Box
          sx={{
            borderTop: "1px solid rgba(0, 0, 0, 0.1)",
            pt: 4,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#666",
              fontSize: "0.875rem",
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            © {new Date().getFullYear()}{" "}
            <MuiLink
              href="https://www.zonixtec.com" // change this to your actual website
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              sx={{
                color: "inherit",
                fontWeight: 600,
              }}
            >
              Zonixtec
            </MuiLink>
            . All rights reserved.
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 3,
              flexWrap: "wrap",
              justifyContent: { xs: "center", sm: "flex-end" },
            }}
          >
            <MuiLink
              href="#"
              sx={{
                color: "#1a1a1a",
                textDecoration: "none",
                fontSize: "0.875rem",
                transition: "color 0.2s ease",
                "&:hover": {
                  color: "#2e7d32",
                  textDecoration: "underline",
                },
              }}
            >
              Privacy Policy
            </MuiLink>
            <MuiLink
              href="#"
              sx={{
                color: "#1a1a1a",
                textDecoration: "none",
                fontSize: "0.875rem",
                transition: "color 0.2s ease",
                "&:hover": {
                  color: "#2e7d32",
                  textDecoration: "underline",
                },
              }}
            >
              Terms of Service
            </MuiLink>
            <MuiLink
              href="/admin"
              sx={{
                color: "#1a1a1a",
                textDecoration: "none",
                fontSize: "0.875rem",
                transition: "color 0.2s ease",
                "&:hover": {
                  color: "#2e7d32",
                  textDecoration: "underline",
                },
              }}
            >
              Cookie Policy
            </MuiLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
