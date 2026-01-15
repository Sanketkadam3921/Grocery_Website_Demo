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
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../../../../assets/Logo/shop-svgrepo-com 1.svg";

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
                  color: location.pathname === "/" ? "#2e7d32" : "rgba(92, 92, 92, 1)",
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
                sx={{
                  color: "rgba(92, 92, 92, 1)",
                  fontSize: "1rem",
                  cursor: "pointer",
                  "&:hover": { color: "#2e7d32" },
                }}
              >
                About
              </Typography>
              <Typography
                component={Link}
                to="/products"
                sx={{
                  color: location.pathname === "/products" ? "#2e7d32" : "rgba(92, 92, 92, 1)",
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
                sx={{
                  color: "rgba(92, 92, 92, 1)",
                  fontSize: "1rem",
                  cursor: "pointer",
                  "&:hover": { color: "#2e7d32" },
                }}
              >
                Contact
              </Typography>

              <Button
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
            </Box>

            {/* Mobile Menu Icon */}
            <IconButton
              sx={{ display: { xs: "flex", md: "none" } }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon sx={{ color: "black" }} />
            </IconButton>
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
            gap: 2,
          }}
        >
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
            onClick={toggleDrawer(false)}
            sx={{
              fontSize: "1.1rem",
              cursor: "pointer",
              color: "rgba(92, 92, 92, 1)",
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
            onClick={toggleDrawer(false)}
            sx={{
              fontSize: "1.1rem",
              cursor: "pointer",
              color: "rgba(92, 92, 92, 1)",
              "&:hover": { color: "#2e7d32" },
            }}
          >
            Contact
          </Typography>

          <Button
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "#FFDE42",
              color: "#756A38",
              borderRadius: "52px",
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Login
          </Button>
        </Box>
      </Drawer>
    </>
  );
}

export default Nav;
