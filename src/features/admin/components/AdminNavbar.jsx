import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
  Typography as MenuTypography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MessageIcon from "@mui/icons-material/Message";
import InventoryIcon from "@mui/icons-material/Inventory";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";

// Dummy static notifications
const notifications = [
  {
    id: 1,
    type: "order",
    title: "New Order Received",
    message: "Order #12345 has been placed",
    time: "2 minutes ago",
    icon: <ShoppingCartIcon fontSize="small" />,
    read: false,
  },
  {
    id: 2,
    type: "message",
    title: "New Contact Message",
    message: "You have a new message from John Doe",
    time: "15 minutes ago",
    icon: <MessageIcon fontSize="small" />,
    read: false,
  },
  {
    id: 3,
    type: "product",
    title: "Low Stock Alert",
    message: "Tomatoes are running low (5 items left)",
    time: "1 hour ago",
    icon: <InventoryIcon fontSize="small" />,
    read: false,
  },
  {
    id: 4,
    type: "order",
    title: "Order Completed",
    message: "Order #12340 has been delivered",
    time: "2 hours ago",
    icon: <CheckCircleIcon fontSize="small" />,
    read: true,
  },
  {
    id: 5,
    type: "message",
    title: "New Contact Message",
    message: "You have a new message from Jane Smith",
    time: "3 hours ago",
    icon: <MessageIcon fontSize="small" />,
    read: true,
  },
];

function AdminNavbar({ handleDrawerToggle }) {
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [accountAnchor, setAccountAnchor] = useState(null);
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Dummy user data
  const user = {
    name: "Admin User",
    email: "admin@zonixfresh.com",
    role: "Administrator",
  };

  const handleNotificationClick = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const handleAccountClick = (event) => {
    setAccountAnchor(event.currentTarget);
  };

  const handleAccountClose = () => {
    setAccountAnchor(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#fff",
        color: "#424242",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 2, sm: 3 },
        }}
      >
        {/* Hamburger Menu & Page Title */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 0,
              display: { md: "none" },
              color: "#424242",
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#212121",
              fontSize: { xs: "1rem", sm: "1.25rem" },
            }}
          >
            Admin Dashboard
          </Typography>
        </Box>

        {/* Right Side Actions */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 0.5, sm: 1 },
          }}
        >
          <IconButton
            onClick={handleNotificationClick}
            sx={{
              color: "#757575",
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* Notifications Menu */}
          <Menu
            anchorEl={notificationAnchor}
            open={Boolean(notificationAnchor)}
            onClose={handleNotificationClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            PaperProps={{
              sx: {
                mt: 1.5,
                minWidth: 320,
                maxWidth: 400,
                maxHeight: 500,
                overflow: "auto",
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              },
            }}
          >
            <Box sx={{ p: 2, pb: 1 }}>
              <MenuTypography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  fontSize: "1rem",
                  color: "#1a1a1a",
                }}
              >
                Notifications
              </MenuTypography>
              {unreadCount > 0 && (
                <MenuTypography
                  variant="body2"
                  sx={{
                    color: "#666",
                    fontSize: "0.875rem",
                    mt: 0.5,
                  }}
                >
                  {unreadCount} unread
                </MenuTypography>
              )}
            </Box>
            <Divider />
            {notifications.length === 0 ? (
              <MenuItem disabled>
                <MenuTypography variant="body2" sx={{ color: "#999" }}>
                  No notifications
                </MenuTypography>
              </MenuItem>
            ) : (
              notifications.map((notification) => (
                <MenuItem
                  key={notification.id}
                  onClick={handleNotificationClose}
                  sx={{
                    py: 1.5,
                    px: 2,
                    backgroundColor: notification.read ? "transparent" : "#f5f5f5",
                    "&:hover": {
                      backgroundColor: notification.read
                        ? "#fafafa"
                        : "#eeeeee",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      color: notification.read ? "#757575" : "#2e7d32",
                    }}
                  >
                    {notification.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <MenuTypography
                        variant="body2"
                        sx={{
                          fontWeight: notification.read ? 400 : 600,
                          color: "#1a1a1a",
                          fontSize: "0.875rem",
                        }}
                      >
                        {notification.title}
                      </MenuTypography>
                    }
                    secondary={
                      <Box>
                        <MenuTypography
                          variant="body2"
                          sx={{
                            color: "#666",
                            fontSize: "0.8125rem",
                            mt: 0.25,
                          }}
                        >
                          {notification.message}
                        </MenuTypography>
                        <MenuTypography
                          variant="caption"
                          sx={{
                            color: "#999",
                            fontSize: "0.75rem",
                            mt: 0.25,
                            display: "block",
                          }}
                        >
                          {notification.time}
                        </MenuTypography>
                      </Box>
                    }
                  />
                </MenuItem>
              ))
            )}
            <Divider />
            <MenuItem
              onClick={handleNotificationClose}
              sx={{
                justifyContent: "center",
                py: 1,
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              <MenuTypography
                variant="body2"
                sx={{
                  color: "#2e7d32",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                }}
              >
                View All Notifications
              </MenuTypography>
            </MenuItem>
          </Menu>

          <IconButton
            onClick={handleAccountClick}
            sx={{
              color: "#757575",
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            <AccountCircleIcon />
          </IconButton>

          {/* Account Menu */}
          <Menu
            anchorEl={accountAnchor}
            open={Boolean(accountAnchor)}
            onClose={handleAccountClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            PaperProps={{
              sx: {
                mt: 1.5,
                minWidth: 250,
                maxWidth: 300,
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              },
            }}
          >
            {/* User Info Section */}
            <Box sx={{ p: 2, pb: 1.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: "#2e7d32",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "1rem",
                  }}
                >
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </Box>
                <Box>
                  <MenuTypography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      color: "#1a1a1a",
                      fontSize: "0.9375rem",
                      lineHeight: 1.2,
                    }}
                  >
                    {user.name}
                  </MenuTypography>
                  <MenuTypography
                    variant="body2"
                    sx={{
                      color: "#666",
                      fontSize: "0.8125rem",
                      mt: 0.25,
                    }}
                  >
                    {user.email}
                  </MenuTypography>
                </Box>
              </Box>
              <MenuTypography
                variant="caption"
                sx={{
                  color: "#2e7d32",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  display: "block",
                }}
              >
                {user.role}
              </MenuTypography>
            </Box>
            <Divider />

            {/* Menu Items */}
            <MenuItem
              onClick={handleAccountClose}
              sx={{
                py: 1.25,
                px: 2,
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: "#757575" }}>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <MenuTypography
                    variant="body2"
                    sx={{
                      fontSize: "0.875rem",
                      color: "#1a1a1a",
                    }}
                  >
                    Profile
                  </MenuTypography>
                }
              />
            </MenuItem>

            <MenuItem
              onClick={handleAccountClose}
              sx={{
                py: 1.25,
                px: 2,
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: "#757575" }}>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <MenuTypography
                    variant="body2"
                    sx={{
                      fontSize: "0.875rem",
                      color: "#1a1a1a",
                    }}
                  >
                    Settings
                  </MenuTypography>
                }
              />
            </MenuItem>

            <Divider />

            <MenuItem
              onClick={handleAccountClose}
              sx={{
                py: 1.25,
                px: 2,
                "&:hover": {
                  backgroundColor: "#ffebee",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: "#d32f2f" }}>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <MenuTypography
                    variant="body2"
                    sx={{
                      fontSize: "0.875rem",
                      color: "#d32f2f",
                      fontWeight: 500,
                    }}
                  >
                    Logout
                  </MenuTypography>
                }
              />
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default AdminNavbar;
