import { Box } from "@mui/material";
import Nav from "./components/Nav";
import HeroSection from "./components/HeroSection";
import QuickActionTabs from "./components/QuickActionTabs";
import AboutSection from "./components/AboutSection";
import FeatureCardsSection from "./components/FeatureCardsSection";
import DiscoverDifferenceSection from "./components/DiscoverDifferenceSection";
import ConnectWithUsSection from "./components/ConnectWithUsSection";
import ExploreFeaturesSection from "./components/ExploreFeaturesSection";
import FAQSection from "./components/FAQSection";
import TrustedBrandsRow from "./components/TrustedBrandsRow";
import FeaturedProductsBanner from "./components/FeaturedProductsBanner";
import Footer from "./components/Footer";

function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#FFF8ED",
      }}
    >
      <Nav />
      <HeroSection />
      {/* <QuickActionTabs /> */}
      {/* <AboutSection /> */}
      <FeatureCardsSection />
      <DiscoverDifferenceSection />
      <ConnectWithUsSection />
      <ExploreFeaturesSection />
      <FAQSection />
      <TrustedBrandsRow />
      <FeaturedProductsBanner />
      <Footer />
    </Box>
  );
}

export default Home;
