import { Box, Typography } from "@mui/material";

const LoadingState = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography>Loading...</Typography>
    </Box>
  );
};

export default LoadingState;

