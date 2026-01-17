import { useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import AdminNavbar from "./AdminNavbar";

function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#fafafa",
        margin: 0,
        padding: 0,
      }}
    >
      {/* Sidebar */}
      <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

      {/* Main Content Area */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          width: { xs: "100%", md: "calc(100% - 260px)" },
          marginLeft: { xs: 0, md: "260px" },
        }}
      >
        {/* Navbar */}
        <AdminNavbar handleDrawerToggle={handleDrawerToggle} />

        {/* Content Area with Outlet */}
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            p: { xs: 2, sm: 3 },
            mt: { xs: "64px", sm: "64px" },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default AdminLayout;



