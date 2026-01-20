import { Box } from "@mui/material";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
} from "@mui/icons-material";
import ContactInfoCard from "./ContactInfoCard";

const ContactInfoGrid = () => {
  const contactInfo = [
    {
      icon: (
        <EmailIcon
          sx={{ fontSize: { xs: 28, sm: 32, md: 36 }, color: "#2e7d32" }}
        />
      ),
      title: "Email",
      content: "support@zonixfresh.com",
      href: "mailto:support@zonixfresh.com",
    },
    {
      icon: (
        <PhoneIcon
          sx={{ fontSize: { xs: 28, sm: 32, md: 36 }, color: "#2e7d32" }}
        />
      ),
      title: "Phone",
      content: "+91 9876543210",
      href: "tel:+919876543210",
    },
    {
      icon: (
        <LocationIcon
          sx={{ fontSize: { xs: 28, sm: 32, md: 36 }, color: "#2e7d32" }}
        />
      ),
      title: "Address",
      content: "Pune, Maharashtra, India",
      href: "https://www.google.com/maps/place/Pune,+Maharashtra",
    },
    {
      icon: (
        <TimeIcon
          sx={{ fontSize: { xs: 28, sm: 32, md: 36 }, color: "#2e7d32" }}
        />
      ),
      title: "Hours",
      content: "9:00 AM – 9:00 PM (Mon–Sat)",
      // No href or onClick - not clickable
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr 1fr",
          sm: "1fr 1fr",
          md: "1fr 1fr",
        },
        gap: { xs: 2.5, sm: 3, md: 3.5 },
      }}
    >
      {contactInfo.map((info, index) => (
        <ContactInfoCard
          key={index}
          icon={info.icon}
          title={info.title}
          content={info.content}
          href={info.href}
          onClick={info.onClick}
        />
      ))}
    </Box>
  );
};

export default ContactInfoGrid;


