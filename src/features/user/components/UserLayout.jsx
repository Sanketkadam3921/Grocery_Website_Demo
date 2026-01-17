import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Nav from "../pages/Home/components/Nav";
import Footer from "../pages/Home/components/Footer";

function UserLayout() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Nav />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}

export default UserLayout;




