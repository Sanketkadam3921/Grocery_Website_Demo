import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Drawer,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddBoxIcon from "@mui/icons-material/AddBox";
import MessageIcon from "@mui/icons-material/Message";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";

const drawerWidth = 260;

const menuItems = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    path: "/admin",
  },
  {
    text: "Products",
    icon: <InventoryIcon />,
    path: "/admin/products",
  },
  {
    text: "Add Product",
    icon: <AddBoxIcon />,
    path: "/admin/products/add",
  },
  {
    text: "Orders",
    icon: <ShoppingCartIcon />,
    path: "/admin/orders",
  },
  {
    text: "Messages",
    icon: <MessageIcon />,
    path: "/admin/messages",
  },
  {
    text: "Categories",
    icon: <CategoryIcon />,
    path: "/admin/categories",
  },
];

function Sidebar({ mobileOpen, handleDrawerToggle }) {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const drawerContent = (
    <Box
      sx={{
        width: drawerWidth,
        height: "100%",
        backgroundColor: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Logo/Brand Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 2,
          borderBottom: "1px solid #e0e0e0",
          backgroundColor: "#fff",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "#2e7d32",
          }}
        >
          Admin Panel
        </Typography>
      </Box>

      {/* Navigation Menu */}
      <Box sx={{ flex: 1, pt: 2, overflow: "auto" }}>
        <List>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem key={item.text} disablePadding sx={{ px: 2, mb: 0.5 }}>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  onClick={() => {
                    if (isMobile) {
                      handleDrawerToggle();
                    }
                  }}
                  sx={{
                    borderRadius: 2,
                    backgroundColor: isActive ? "#e8f5e9" : "transparent",
                    color: isActive ? "#2e7d32" : "#424242",
                    "&:hover": {
                      backgroundColor: isActive ? "#e8f5e9" : "#f0f0f0",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive ? "#2e7d32" : "#757575",
                      minWidth: 40,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: isActive ? 600 : 400,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Sidebar */}
      <Box
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          display: { xs: "none", md: "block" },
        }}
      >
        <Box
          sx={{
            position: "fixed",
            width: drawerWidth,
            height: "100vh",
            overflow: "auto",
          }}
        >
          {drawerContent}
        </Box>
      </Box>
    </>
  );
}

export default Sidebar;
