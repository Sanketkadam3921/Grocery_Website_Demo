import { Box, Container } from "@mui/material";
import HeroSection from "./components/HeroSection";
import WhoWeAre from "./components/WhoWeAre";
import WhatWeOffer from "./components/WhatWeOffer";
import WhyChooseUs from "./components/WhyChooseUs";
import MissionVision from "./components/MissionVision";
import HowItWorks from "./components/HowItWorks";
import CallToAction from "./components/CallToAction";

function About() {
  return (
    <Box sx={{ backgroundColor: "#fafafa", minHeight: "100vh" }}>
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 4, sm: 5, md: 6 },
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {/* Who We Are Section */}
        <WhoWeAre />

        {/* What We Offer - Categories Section */}
        <WhatWeOffer />

        {/* Why Choose ZonixFresh Section */}
        <WhyChooseUs />

        {/* Mission & Vision Section */}
        {/* <MissionVision /> */}

        {/* Call To Action Section */}
        <CallToAction />
      </Container>
    </Box>
  );
}

export default About;
