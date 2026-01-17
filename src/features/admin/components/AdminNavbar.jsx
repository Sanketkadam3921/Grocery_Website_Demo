import { AppBar, Toolbar, Box, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";

function AdminNavbar({ handleDrawerToggle }) {
  return (
    <AppBar
      position="fixed"
      sx={{
        top: 0,
        left: { xs: 0, md: "260px" },
        right: 0,
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
            sx={{
              color: "#757575",
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            <NotificationsIcon />
          </IconButton>
          <IconButton
            sx={{
              color: "#757575",
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            <AccountCircleIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default AdminNavbar;
