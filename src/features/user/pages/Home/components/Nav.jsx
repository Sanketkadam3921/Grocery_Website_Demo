// import { AppBar, Toolbar, Box, Typography, Button } from "@mui/material";

// function Nav() {
//   return (
//     <AppBar
//       position="sticky"
//       sx={{
//         backgroundColor: "transparent",
//         boxShadow: "none",
//         height: 70,
//       }}
//     >
//       <Toolbar
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           height: "100%",
//           px: { xs: 2, md: 12.5 },
//         }}
//       >
//         {/* Logo */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <Box
//             component="img"
//             src="https://via.placeholder.com/48x48?text=Logo"
//             alt="Logo"
//             sx={{ width: 48, height: 48 }}
//           />
//           <Typography
//             variant="h6"
//             sx={{
//               color: "black",
//               fontWeight: 600,
//               fontSize: "1.5rem",
//             }}
//           >
//             Zonix Fresh
//           </Typography>
//         </Box>

//         {/* Navigation Items */}
//         <Box
//           sx={{
//             display: { xs: "none", md: "flex" },
//             alignItems: "center",
//             gap: 3.75,
//           }}
//         >
//           <Typography
//             sx={{
//               color: "rgba(92, 92, 92, 1)",
//               fontSize: "1rem",
//               cursor: "pointer",
//               "&:hover": { color: "primary.main" },
//             }}
//           >
//             Home
//           </Typography>
//           <Typography
//             sx={{
//               color: "rgba(92, 92, 92, 1)",
//               fontSize: "1rem",
//               cursor: "pointer",
//               "&:hover": { color: "primary.main" },
//             }}
//           >
//             About
//           </Typography>
//           <Typography
//             sx={{
//               color: "rgba(92, 92, 92, 1)",
//               fontSize: "1rem",
//               cursor: "pointer",
//               "&:hover": { color: "primary.main" },
//             }}
//           >
//             Shop
//           </Typography>
//           <Typography
//             sx={{
//               color: "rgba(92, 92, 92, 1)",
//               fontSize: "1rem",
//               cursor: "pointer",
//               "&:hover": { color: "primary.main" },
//             }}
//           >
//             Contact
//           </Typography>
//           <Button
//             variant="contained"
//             sx={{
//               backgroundColor: "rgba(255, 222, 66, 1)",
//               color: "rgba(117, 106, 56, 1)",
//               borderRadius: "52px",
//               px: 2.5,
//               py: 1.5,
//               textTransform: "none",
//               fontSize: "1rem",
//               fontWeight: 600,
//               "&:hover": {
//                 backgroundColor: "rgba(255, 222, 66, 0.9)",
//               },
//             }}
//           >
//             Login
//           </Button>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// }

// export default Nav;

import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
  Drawer,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import logo from "../../../../../assets/Logo/shop-svgrepo-com 1.svg";
import { getCartItemCount } from "../../../services/cartService";
import { useAuth } from "../../../../auth/hooks/useAuth";

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate("/");
  };

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update cart item count
  useEffect(() => {
    const updateCartCount = () => {
      setCartItemCount(getCartItemCount());
    };

    // Initial load
    updateCartCount();

    // Listen for storage changes (when cart is updated in other tabs/components)
    window.addEventListener("storage", updateCartCount);

    // Custom event for same-tab updates
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, [location.pathname]); // Also update when location changes

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          height: 70,
          backgroundColor: scrolled
            ? "rgba(255, 248, 237, 0.9)"
            : "transparent",
          backdropFilter: scrolled ? "blur(8px)" : "none",
          boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.06)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <Toolbar sx={{ height: "100%", px: 0 }}>
          {/* CENTERED CONTAINER */}
          <Box
            sx={{
              width: "100%",
              maxWidth: "1200px", // 👈 control navbar width here
              mx: "auto", // 👈 center horizontally
              px: { xs: 2, md: 3 }, // 👈 side padding
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Logo */}
            <Box
              component={Link}
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                textDecoration: "none",
                cursor: "pointer",
                "&:hover": {
                  opacity: 0.8,
                },
              }}
            >
              <Box
                component="img"
                src={logo}
                alt="Zonix Fresh Logo"
                sx={{ width: 48, height: 48 }}
              />
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "1.5rem",
                  color: "black",
                }}
              >
                Zonix Fresh
              </Typography>
            </Box>

            {/* Desktop Navigation */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 3.75,
              }}
            >
              <Typography
                component={Link}
                to="/"
                sx={{
                  color:
                    location.pathname === "/"
                      ? "#2e7d32"
                      : "rgba(92, 92, 92, 1)",
                  fontSize: "1rem",
                  cursor: "pointer",
                  textDecoration: "none",
                  fontWeight: location.pathname === "/" ? 600 : 400,
                  "&:hover": { color: "#2e7d32" },
                }}
              >
                Home
              </Typography>
              <Typography
                component={Link}
                to="/about"
                sx={{
                  color:
                    location.pathname === "/about"
                      ? "#2e7d32"
                      : "rgba(92, 92, 92, 1)",
                  fontSize: "1rem",
                  cursor: "pointer",
                  textDecoration: "none",
                  fontWeight: location.pathname === "/about" ? 600 : 400,
                  "&:hover": { color: "#2e7d32" },
                }}
              >
                About
              </Typography>
              <Typography
                component={Link}
                to="/products"
                sx={{
                  color:
                    location.pathname === "/products"
                      ? "#2e7d32"
                      : "rgba(92, 92, 92, 1)",
                  fontSize: "1rem",
                  cursor: "pointer",
                  textDecoration: "none",
                  fontWeight: location.pathname === "/products" ? 600 : 400,
                  "&:hover": { color: "#2e7d32" },
                }}
              >
                Shop
              </Typography>
              <Typography
                component={Link}
                to="/contact"
                sx={{
                  color:
                    location.pathname === "/contact"
                      ? "#2e7d32"
                      : "rgba(92, 92, 92, 1)",
                  fontSize: "1rem",
                  cursor: "pointer",
                  textDecoration: "none",
                  fontWeight: location.pathname === "/contact" ? 600 : 400,
                  "&:hover": { color: "#2e7d32" },
                }}
              >
                Contact
              </Typography>

              {/* Cart Icon */}
              <IconButton
                component={Link}
                to="/cart"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                sx={{
                  color: "rgba(92, 92, 92, 1)",
                  "&:hover": { color: "#2e7d32" },
                }}
              >
                <Badge badgeContent={cartItemCount} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              {isAuthenticated ? (
                <>
                  <IconButton
                    onClick={handleMenuOpen}
                    sx={{
                      color: "rgba(92, 92, 92, 1)",
                      "&:hover": { color: "#2e7d32" },
                    }}
                  >
                    <AccountCircleIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <MenuItem disabled>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {user?.name}
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <Typography variant="body2">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  component={Link}
                  to="/login"
                  variant="contained"
                  sx={{
                    backgroundColor: "#FFDE42",
                    color: "#756A38",
                    borderRadius: "52px",
                    px: 2.5,
                    py: 1.5,
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  Login
                </Button>
              )}
            </Box>

            {/* Mobile/Tablet: Cart Icon and Hamburger Menu */}
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                alignItems: "center",
                gap: 1,
              }}
            >
              {/* Cart Icon for Mobile/Tablet */}
              <IconButton
                component={Link}
                to="/cart"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                sx={{
                  color: "rgba(92, 92, 92, 1)",
                  "&:hover": { color: "#2e7d32" },
                }}
              >
                <Badge badgeContent={cartItemCount} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              {/* Hamburger Menu Icon */}
              <IconButton onClick={toggleDrawer(true)}>
                <MenuIcon sx={{ color: "black" }} />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 260,
            p: 3,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {/* User Info Section - Only show if authenticated */}
          {isAuthenticated && (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 2,
                }}
              >
                <Avatar
                  sx={{
                    width: 48,
                    height: 48,
                    backgroundColor: "#2e7d32",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "1.125rem",
                  }}
                >
                  {user?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2) || "U"}
                </Avatar>
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "#1a1a1a",
                      fontWeight: 600,
                      fontSize: "1rem",
                      lineHeight: 1.2,
                    }}
                  >
                    {user?.name || "User"}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#666",
                      fontSize: "0.8125rem",
                      mt: 0.25,
                    }}
                  >
                    Logged in
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ mb: 2 }} />
            </>
          )}

          {/* Navigation Links */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography
              component={Link}
              to="/"
              onClick={toggleDrawer(false)}
              sx={{
                fontSize: "1.1rem",
                cursor: "pointer",
                color: "rgba(92, 92, 92, 1)",
                textDecoration: "none",
                "&:hover": { color: "#2e7d32" },
              }}
            >
              Home
            </Typography>
            <Typography
              component={Link}
              to="/about"
              onClick={toggleDrawer(false)}
              sx={{
                fontSize: "1.1rem",
                cursor: "pointer",
                color: "rgba(92, 92, 92, 1)",
                textDecoration: "none",
                "&:hover": { color: "#2e7d32" },
              }}
            >
              About
            </Typography>
            <Typography
              component={Link}
              to="/products"
              onClick={toggleDrawer(false)}
              sx={{
                fontSize: "1.1rem",
                cursor: "pointer",
                color: "rgba(92, 92, 92, 1)",
                textDecoration: "none",
                "&:hover": { color: "#2e7d32" },
              }}
            >
              Shop
            </Typography>
            <Typography
              component={Link}
              to="/contact"
              onClick={toggleDrawer(false)}
              sx={{
                fontSize: "1.1rem",
                cursor: "pointer",
                color: "rgba(92, 92, 92, 1)",
                textDecoration: "none",
                "&:hover": { color: "#2e7d32" },
              }}
            >
              Contact
            </Typography>
          </Box>

          {/* Divider before Logout/Login */}
          <Divider sx={{ my: 2 }} />

          {/* Logout/Login Button */}
          {isAuthenticated ? (
            <Button
              onClick={() => {
                toggleDrawer(false)();
                handleLogout();
              }}
              variant="outlined"
              fullWidth
              sx={{
                borderColor: "#2e7d32",
                color: "#2e7d32",
                borderRadius: "52px",
                textTransform: "none",
                fontWeight: 600,
                py: 1.25,
                "&:hover": {
                  borderColor: "#1b5e20",
                  backgroundColor: "rgba(46, 125, 50, 0.04)",
                },
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              component={Link}
              to="/login"
              onClick={toggleDrawer(false)}
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#FFDE42",
                color: "#756A38",
                borderRadius: "52px",
                textTransform: "none",
                fontWeight: 600,
                py: 1.25,
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Drawer>
    </>
  );
}

export default Nav;
