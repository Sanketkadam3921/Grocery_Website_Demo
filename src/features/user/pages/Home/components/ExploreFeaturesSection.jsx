import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import VerifiedIcon from "@mui/icons-material/Verified";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const features = [
  {
    id: 1,
    title: "Easy Shopping",
    description:
      "Browse and order effortlessly with our clean, intuitive interface designed for speed and simplicity.",
    icon: <ShoppingCartIcon />,
  },
  {
    id: 2,
    title: "Flexible Delivery",
    description:
      "Choose delivery slots that fit your schedule and get fresh groceries right at your doorstep.",
    icon: <LocalShippingIcon />,
  },
  {
    id: 3,
    title: "Secure Payments",
    description:
      "Multiple trusted payment options with end-to-end security for complete peace of mind.",
    icon: <PaymentIcon />,
  },
  {
    id: 4,
    title: "Freshness Guaranteed",
    description:
      "Handpicked, quality-checked groceries with a freshness guarantee you can rely on every time.",
    icon: <VerifiedIcon />,
  },
  {
    id: 5,
    title: "Quick Support",
    description:
      "Fast and friendly customer support to help you with orders, refunds, or any questions.",
    icon: <SupportAgentIcon />,
  },
  {
    id: 6,
    title: "Best Deals & Offers",
    description:
      "Enjoy exclusive discounts, daily deals, and value packs that help you save more every time.",
    icon: <LocalOfferIcon />,
  },
];

function ExploreFeaturesSection() {
  return (
    <Box sx={{ backgroundColor: "#FAFAFA", py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: "center", mb: 7 }}>
          <Typography
            sx={{
              fontSize: { xs: "2rem", md: "2.75rem" },
              fontWeight: 700,
              color: "#1a1a1a",
              mb: 2,
            }}
          >
            Explore Zonix Fresh
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "1rem", md: "1.125rem" },
              color: "#666",
              maxWidth: 620,
              mx: "auto",
              lineHeight: 1.7,
            }}
          >
            Everything you need for a smarter grocery experience — from browsing
            to checkout and delivery.
          </Typography>
        </Box>

        {/* Feature Cards */}
        <Grid
          container
          spacing={4}
          alignItems="stretch"
          justifyContent="center"
        >
          {features.map((feature) => (
            <Grid item xs={12} md={4} key={feature.id}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 16px 32px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    p: 4,
                  }}
                >
                  {/* Icon */}
                  <Box
                    sx={{
                      width: 72,
                      height: 72,
                      borderRadius: "50%",
                      backgroundColor: "#FFF4CC",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 3,
                      "& svg": {
                        fontSize: 36,
                        color: "#FFB703",
                      },
                    }}
                  >
                    {feature.icon}
                  </Box>

                  {/* Title */}
                  <Typography
                    sx={{
                      fontSize: "1.4rem",
                      fontWeight: 700,
                      color: "#1a1a1a",
                      mb: 1.5,
                    }}
                  >
                    {feature.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      color: "#666",
                      lineHeight: 1.6,
                      maxWidth: 280,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default ExploreFeaturesSection;
