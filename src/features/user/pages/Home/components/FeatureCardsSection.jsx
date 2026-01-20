import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

const features = [
  {
    id: 1,
    title: "Fresh Produce",
    description:
      "Hand-picked fruits and vegetables delivered at peak freshness directly from local farms.",
    points: [
      "Farm-to-home sourcing",
      "Daily quality checks",
      "Zero storage delay",
    ],
    image:
      "https://images.openai.com/thumbnails/url/JkbTjnicu5mVUVJSUGylr5-al1xUWVCSmqJbkpRnoJdeXJJYkpmsl5yfq5-Zm5ieWmxfaAuUsXL0S7F0Tw72c3Hy9ffJyo0M8473SS329czNNI1wyQtwdMz29y-pjDT1q4rwTXN3cslJiQyviAjLUCsGAH6NJpk",
  },
  {
    id: 2,
    title: "Pantry Essentials",
    description:
      "All your daily essentials from trusted brands, carefully curated for quality and value.",
    points: [
      "Trusted national brands",
      "Best price guarantee",
      "Wide daily-use range",
    ],
    image:
      "https://urbanfarmie.com/wp-content/uploads/Featured-Image-Top-2.jpg",
  },
  {
    id: 3,
    title: "Gourmet Treats",
    description:
      "Premium selections for special occasions, featuring artisanal and imported delicacies.",
    points: [
      "Premium & imported items",
      "Perfect for gifting",
      "Curated seasonal picks",
    ],
    image:
      "https://i.pinimg.com/736x/96/12/f7/9612f7a7d7d00278a0808c1e77988ab4.jpg",
  },
];

function FeatureCardsSection() {
  return (
    <Box
      sx={{
        backgroundColor: "#fafafa",
        py: { xs: 8, md: 12 },
        px: { xs: 2, sm: 0 },
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: 700,
              color: "#1a1a1a",
              mb: 2,
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
            }}
          >
            Why Choose Zonix Fresh?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", md: "1.125rem" },
              color: "#666",
              maxWidth: "600px",
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            Experience the difference with our carefully curated selections and
            exceptional service
          </Typography>
        </Box>

        {/* Feature Cards */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: { xs: 3, md: 4 },
            justifyContent: "center",
          }}
        >
          {features.map((feature) => (
            <Box
              key={feature.id}
              sx={{
                flex: {
                  xs: "1 1 100%",
                  sm: "1 1 calc(30% - 12px)",
                  md: "1 1 calc(30% - 21px)",
                },
                maxWidth: "350px",
              }}
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                {/* Image */}
                <Box sx={{ position: "relative", paddingTop: "75%" }}>
                  <CardMedia
                    component="img"
                    image={feature.image}
                    alt={feature.title}
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>

                {/* Content */}
                <CardContent
                  sx={{
                    p: { xs: 2.5, md: 3 },
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "white",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: { xs: "1.25rem", md: "1.5rem" },
                      fontWeight: 600,
                      color: "#1a1a1a",
                      mb: 2,
                      lineHeight: 1.3,
                      fontFamily: "'Helvetica Neue', Arial, sans-serif",
                    }}
                  >
                    {feature.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "#666",
                      fontSize: { xs: "0.95rem", md: "1rem" },
                      lineHeight: 1.6,
                      mb: 2,
                    }}
                  >
                    {feature.description}
                  </Typography>

                  {/* Feature Points */}
                  <Box sx={{ mt: "auto" }}>
                    {feature.points.map((point, index) => (
                      <Typography
                        key={index}
                        variant="body2"
                        sx={{
                          fontSize: "0.9rem",
                          color: "#444",
                          mb: 0.8,
                        }}
                      >
                        • {point}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default FeatureCardsSection;
