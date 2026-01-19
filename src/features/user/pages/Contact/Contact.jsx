import { Box, Container } from "@mui/material";
import HeroSection from "./components/HeroSection";
import ContactForm from "./components/ContactForm";
import ContactInfoGrid from "./components/ContactInfoGrid";

function Contact() {
  return (
    <Box
      sx={{
        backgroundColor: "#fafafa",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <HeroSection />

      <Box
        component="main"
        sx={{
          flex: 1,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          py: { xs: 4, sm: 5, md: 7 },
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            px: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "1400px",
              mx: "auto",
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr",
                md: "1.15fr 1fr",
                lg: "1.2fr 1fr",
              },
              gap: { xs: 4, sm: 5, md: 6 },
              alignItems: "start",
            }}
          >
            <ContactForm />
            <Box
              sx={{
                mt: {
                  xs: 5, // mobile
                  sm: 6, // tablet
                  md: 0, // desktop and above
                },
              }}
            >
              <ContactInfoGrid />
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default Contact;
