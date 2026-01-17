import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

const faqs = [
  {
    id: 1,
    question: "How fast is your delivery?",
    answer:
      "We offer same-day and next-day delivery options depending on your location. Most orders are delivered within 24-48 hours of placement.",
  },
  {
    id: 2,
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, debit cards, and digital payment methods including PayPal, Apple Pay, and Google Pay.",
  },
  {
    id: 3,
    question: "Can I track my order?",
    answer:
      "Yes! Once your order is confirmed, you'll receive a tracking number and can monitor your delivery in real-time through our app or website.",
  },
  {
    id: 4,
    question: "What if I'm not satisfied with my order?",
    answer:
      "We offer a 100% satisfaction guarantee. If you're not happy with your order, contact us within 24 hours and we'll make it right.",
  },
];

function FAQSection() {
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panelId) => (_, isExpanded) => {
    setExpanded(isExpanded ? panelId : null);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#FFF8ED",
        py: { xs: 6, md: 10 },
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "2rem", md: "2.75rem" },
            fontWeight: 700,
            color: "#1a1a1a",
            textAlign: "center",
            mb: { xs: 4, md: 6 },
            letterSpacing: "-0.01em",
          }}
        >
          Frequently Asked Questions
        </Typography>

        <Box
          sx={{
            maxWidth: 820,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {faqs.map((faq) => (
            <Accordion
              key={faq.id}
              expanded={expanded === faq.id}
              onChange={handleChange(faq.id)}
              disableGutters
              elevation={0}
              sx={{
                borderRadius: 2,
                backgroundColor: "white",
                border: "1px solid #eee",
                transition: "all 0.25s ease",
                "&:before": {
                  display: "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color: "#FFD84D",
                      fontSize: 28,
                    }}
                  />
                }
                sx={{
                  px: 3,
                  py: 2,
                  "& .MuiAccordionSummary-content": {
                    margin: 0,
                  },
                  "&:hover": {
                    backgroundColor: "rgba(255, 216, 77, 0.06)",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "1rem", md: "1.125rem" },
                    fontWeight: 600,
                    color: "#1a1a1a",
                  }}
                >
                  {faq.question}
                </Typography>
              </AccordionSummary>

              <AccordionDetails
                sx={{
                  px: 3,
                  pt: 0,
                  pb: 3,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1rem",
                    color: "#666",
                    lineHeight: 1.7,
                  }}
                >
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default FAQSection;




