import { Box, Container, Typography } from "@mui/material";

const brands = [
  {
    id: 1,
    name: "Amul",
    logo: "https://1000logos.net/wp-content/uploads/2023/11/Amul-Logo-500x281.png",
  },
  {
    id: 2,
    name: "Tata Consumer Products",
    logo: "https://imgs.search.brave.com/0fkhtLXVX9LhSNNe1NAr8qTAbM3pFBfQ1iFCmFoDS8E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kaW1l/bnNpb25zaHJkLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAx/OS8xMS9UQVRBLUNv/bnN1bWVyLVByb2R1/Y3RzLnBuZw",
  },
  {
    id: 3,
    name: "Britannia",
    logo: "https://i.pinimg.com/736x/f9/dd/64/f9dd64d720e480f82d23f10430e5a4c9.jpg",
  },
  {
    id: 4,
    name: "Nestle",
    logo: "https://1000logos.net/wp-content/uploads/2017/03/Nestle-Logo-500x281.png",
  },

  {
    id: 6,
    name: "Fortune",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-JFQtkBSaogC9lUWyTCJIz8QA9B6vFlM5RA&s",
  },
];

function TrustedBrandsRow() {
  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        py: { xs: 4, md: 6 },
        borderTop: "1px solid #f0f0f0",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          sx={{
            fontSize: { xs: "0.85rem", md: "1rem" },
            fontWeight: 600,
            color: "#777",
            textAlign: "center",
            mb: 4,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
          }}
        >
          Trusted by Leading Grocery Brands
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: { xs: 4, md: 7 },
            flexWrap: "wrap",
            overflowX: "auto",
            pb: 1,
            "&::-webkit-scrollbar": {
              height: 4,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,0.15)",
              borderRadius: 2,
            },
          }}
        >
          {brands.map((brand) => (
            <Box
              key={brand.id}
              component="img"
              src={brand.logo}
              alt={brand.name}
              loading="lazy"
              sx={{
                height: { xs: 70, md: 100 },
                width: "auto",
                transition: "all 0.25s ease",
                cursor: "pointer",
                "&:hover": {
                  filter: "grayscale(0%)",
                  opacity: 1,
                  transform: "scale(1.05)",
                },
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default TrustedBrandsRow;

