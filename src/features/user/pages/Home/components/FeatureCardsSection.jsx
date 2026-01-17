import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const features = [
  {
    id: 1,
    title: "Fresh Produce",
    description:
      "Hand-picked fruits and vegetables delivered at peak freshness directly from local farms.",
    image:
      "https://images.openai.com/thumbnails/url/JkbTjnicu5mVUVJSUGylr5-al1xUWVCSmqJbkpRnoJdeXJJYkpmsl5yfq5-Zm5ieWmxfaAuUsXL0S7F0Tw72c3Hy9ffJyo0M8473SS329czNNI1wyQtwdMz29y-pjDT1q4rwTXN3cslJiQyviAjLUCsGAH6NJpk",
  },
  {
    id: 2,
    title: "Pantry Essentials",
    description:
      "All your daily essentials from trusted brands, carefully curated for quality and value.",
    image:
      "https://urbanfarmie.com/wp-content/uploads/Featured-Image-Top-2.jpg",
  },
  {
    id: 3,
    title: "Gourmet Treats",
    description:
      "Premium selections for special occasions, featuring artisanal and imported delicacies.",
    image:
      "https://i.pinimg.com/736x/96/12/f7/9612f7a7d7d00278a0808c1e77988ab4.jpg",
  },
];

function FeatureCardsSection() {
  const theme = useTheme();
  const navigate = useNavigate();

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

        {/* Cards - Using Flexbox */}
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
                  xs: "1 1 100%", // Mobile: 1 card per row
                  sm: "1 1 calc(50% - 12px)", // Small tablet: 2 cards per row
                  md: "1 1 calc(33.333% - 21px)", // Tablet & up: 3 cards per row
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
                {/* Image Container - Fixed Aspect Ratio */}
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
                    gutterBottom
                    variant="h5"
                    component="h3"
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
                      flexGrow: 1,
                    }}
                  >
                    {feature.description}
                  </Typography>

                  {/* Learn More Link */}
                  <Box sx={{ mt: 3, pt: 2, borderTop: "1px solid #f0f0f0" }}>
                    <Typography
                      component="button"
                      onClick={() => {
                        navigate("/products");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      sx={{
                        color: "#2a9d8f",
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        fontFamily: "inherit",
                        "&:hover": {
                          color: "#21867a",
                          textDecoration: "underline",
                        },
                      }}
                    >
                      Learn more →
                    </Typography>
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
