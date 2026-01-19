import { Box } from "@mui/material";
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

function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FFF8ED",
      }}
    >
      <HeroSection />
      {/* <QuickActionTabs /> */}
      {/* <AboutSection /> */}
      <FeatureCardsSection />
      <DiscoverDifferenceSection />
      <ConnectWithUsSection />
      <ExploreFeaturesSection />
      <TrustedBrandsRow />
      <FAQSection />

      <FeaturedProductsBanner />
    </Box>
  );
}

export default Home;
