import { Box, Container, Button } from "@mui/material";

const tabs = ["Order", "Browse", "Featured", "Categories", "Discover"];

function QuickActionTabs() {
  return (
    <Box
      sx={{
        backgroundColor: "#FFF8ED",
        py: 3,
        borderBottom: "1px solid rgba(0,0,0,0.05)",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            pb: 1,
            "&::-webkit-scrollbar": {
              height: 4,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,0.2)",
              borderRadius: 2,
            },
          }}
        >
          {tabs.map((tab) => (
            <Button
              key={tab}
              variant="outlined"
              sx={{
                backgroundColor: "white",
                color: "#1a1a1a",
                borderColor: "rgba(0,0,0,0.1)",
                borderRadius: "50px",
                px: 3,
                py: 1,
                textTransform: "none",
                fontSize: "0.9375rem",
                fontWeight: 500,
                whiteSpace: "nowrap",
                boxShadow: 1,
                "&:hover": {
                  backgroundColor: "#FFD84D",
                  borderColor: "#FFD84D",
                  color: "#1a1a1a",
                  boxShadow: 2,
                },
              }}
            >
              {tab}
            </Button>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default QuickActionTabs;
