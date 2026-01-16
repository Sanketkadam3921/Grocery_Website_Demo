import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Stack,
  CircularProgress,
} from "@mui/material";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  ShoppingCart as OrderIcon,
  Feedback as FeedbackIcon,
  Business as BusinessIcon,
} from "@mui/icons-material";

function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setLoading(false);
      setSubmitted(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        message: "",
      });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  // Contact information data
  const contactInfo = [
    {
      icon: <EmailIcon sx={{ fontSize: 32, color: "#2e7d32" }} />,
      title: "Email",
      content: "support@zonixfresh.com",
      link: "mailto:support@zonixfresh.com",
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 32, color: "#2e7d32" }} />,
      title: "Phone",
      content: "+91 9XXXXXXXXX",
      link: "tel:+919XXXXXXXXX",
    },
    {
      icon: <LocationIcon sx={{ fontSize: 32, color: "#2e7d32" }} />,
      title: "Address",
      content: "Pune, Maharashtra, India",
      link: null,
    },
    {
      icon: <TimeIcon sx={{ fontSize: 32, color: "#2e7d32" }} />,
      title: "Support Hours",
      content: "9:00 AM – 9:00 PM (Mon–Sat)",
      link: null,
    },
  ];

  // Why contact us data
  const whyContactUs = [
    {
      icon: <OrderIcon sx={{ fontSize: 40, color: "#2e7d32" }} />,
      title: "Order & delivery support",
      description: "Get help with your orders, tracking, and delivery queries",
    },
    {
      icon: <FeedbackIcon sx={{ fontSize: 40, color: "#2e7d32" }} />,
      title: "Product feedback & suggestions",
      description: "Share your feedback and help us improve our services",
    },
    {
      icon: <BusinessIcon sx={{ fontSize: 40, color: "#2e7d32" }} />,
      title: "Business & partnership queries",
      description: "Interested in partnerships? Reach out to our business team",
    },
  ];

  return (
    <h1>
        Conttact
    </h1>
    // <Box sx={{ backgroundColor: "#fafafa", minHeight: "100vh" }}>
    //   {/* Header / Hero Section */}
    //   <Box
    //     sx={{
    //       width: "100%",
    //       background: "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)",
    //       py: { xs: 4, sm: 5, md: 6 },
    //       textAlign: "center",
    //       color: "white",
    //     }}
    //   >
    //     <Container maxWidth="md">
    //       <Typography
    //         variant="h2"
    //         sx={{
    //           fontWeight: 700,
    //           fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
    //           mb: 2,
    //           lineHeight: 1.2,
    //         }}
    //       >
    //         Get in Touch
    //       </Typography>
    //       <Typography
    //         variant="h6"
    //         sx={{
    //           fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
    //           fontWeight: 400,
    //           lineHeight: 1.6,
    //           opacity: 0.95,
    //         }}
    //       >
    //         Have a question, feedback, or need help with your order? We're here
    //         to help.
    //       </Typography>
    //     </Container>
    //   </Box>

    //   {/* Main Content Layout */}
    //   <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
    //     <Grid container spacing={4}>
    //       {/* Left Column: Contact Information (Desktop) / First (Mobile) */}
    //       <Grid item xs={12} md={5}>
    //         <Typography
    //           variant="h5"
    //           sx={{
    //             fontWeight: 600,
    //             fontSize: { xs: "1.5rem", md: "1.75rem" },
    //             color: "#1a1a1a",
    //             mb: 3,
    //           }}
    //         >
    //           Contact Information
    //         </Typography>
    //         <Grid container spacing={2}>
    //           {contactInfo.map((info, index) => (
    //             <Grid item xs={12} sm={6} md={12} key={index}>
    //               <Paper
    //                 elevation={0}
    //                 component={info.link ? "a" : "div"}
    //                 href={info.link || undefined}
    //                 sx={{
    //                   p: 3,
    //                   borderRadius: 2,
    //                   border: "1px solid #e0e0e0",
    //                   backgroundColor: "white",
    //                   textDecoration: "none",
    //                   color: "inherit",
    //                   transition: "all 0.3s ease",
    //                   "&:hover": info.link
    //                     ? {
    //                         boxShadow: "0 4px 12px rgba(46, 125, 50, 0.15)",
    //                         transform: "translateY(-2px)",
    //                       }
    //                     : {},
    //                   height: "100%",
    //                 }}
    //               >
    //                 <Box
    //                   sx={{
    //                     display: "flex",
    //                     alignItems: "flex-start",
    //                     gap: 2,
    //                   }}
    //                 >
    //                   <Box sx={{ flexShrink: 0 }}>{info.icon}</Box>
    //                   <Box>
    //                     <Typography
    //                       variant="h6"
    //                       sx={{
    //                         fontWeight: 600,
    //                         color: "#1a1a1a",
    //                         mb: 0.5,
    //                         fontSize: { xs: "1rem", md: "1.125rem" },
    //                       }}
    //                     >
    //                       {info.title}
    //                     </Typography>
    //                     <Typography
    //                       variant="body2"
    //                       sx={{
    //                         color: "#666",
    //                         lineHeight: 1.6,
    //                       }}
    //                     >
    //                       {info.content}
    //                     </Typography>
    //                   </Box>
    //                 </Box>
    //               </Paper>
    //             </Grid>
    //           ))}
    //         </Grid>
    //       </Grid>

    //       {/* Right Column: Contact Form (Desktop) / Second (Mobile) */}
    //       <Grid item xs={12} md={7}>
    //         <Paper
    //           elevation={0}
    //           sx={{
    //             p: { xs: 3, md: 4 },
    //             borderRadius: 2,
    //             border: "1px solid #e0e0e0",
    //             backgroundColor: "white",
    //           }}
    //         >
    //           <Typography
    //             variant="h5"
    //             sx={{
    //               fontWeight: 600,
    //               fontSize: { xs: "1.5rem", md: "1.75rem" },
    //               color: "#1a1a1a",
    //               mb: 3,
    //             }}
    //           >
    //             Send us a Message
    //           </Typography>

    //           {submitted && (
    //             <Box
    //               sx={{
    //                 p: 2,
    //                 mb: 3,
    //                 borderRadius: 1,
    //                 backgroundColor: "#e8f5e9",
    //                 color: "#2e7d32",
    //               }}
    //             >
    //               <Typography variant="body2" sx={{ fontWeight: 500 }}>
    //                 Thank you for your message! We'll get back to you soon.
    //               </Typography>
    //             </Box>
    //           )}

    //           <Box component="form" onSubmit={handleSubmit}>
    //             <Stack spacing={3}>
    //               <TextField
    //                 fullWidth
    //                 label="Full Name"
    //                 name="fullName"
    //                 value={formData.fullName}
    //                 onChange={handleInputChange}
    //                 error={!!errors.fullName}
    //                 helperText={errors.fullName}
    //                 required
    //                 sx={{
    //                   "& .MuiOutlinedInput-root": {
    //                     borderRadius: 2,
    //                   },
    //                 }}
    //               />
    //               <TextField
    //                 fullWidth
    //                 label="Email Address"
    //                 name="email"
    //                 type="email"
    //                 value={formData.email}
    //                 onChange={handleInputChange}
    //                 error={!!errors.email}
    //                 helperText={errors.email}
    //                 required
    //                 sx={{
    //                   "& .MuiOutlinedInput-root": {
    //                     borderRadius: 2,
    //                   },
    //                 }}
    //               />
    //               <TextField
    //                 fullWidth
    //                 label="Phone Number (Optional)"
    //                 name="phone"
    //                 value={formData.phone}
    //                 onChange={handleInputChange}
    //                 sx={{
    //                   "& .MuiOutlinedInput-root": {
    //                     borderRadius: 2,
    //                   },
    //                 }}
    //               />
    //               <TextField
    //                 fullWidth
    //                 label="Message"
    //                 name="message"
    //                 value={formData.message}
    //                 onChange={handleInputChange}
    //                 error={!!errors.message}
    //                 helperText={errors.message}
    //                 required
    //                 multiline
    //                 rows={6}
    //                 sx={{
    //                   "& .MuiOutlinedInput-root": {
    //                     borderRadius: 2,
    //                   },
    //                 }}
    //               />
    //               <Box
    //                 sx={{
    //                   display: "flex",
    //                   justifyContent: { xs: "stretch", md: "flex-end" },
    //                 }}
    //               >
    //                 <Button
    //                   type="submit"
    //                   variant="contained"
    //                   disabled={loading}
    //                   sx={{
    //                     backgroundColor: "#2e7d32",
    //                     color: "white",
    //                     textTransform: "none",
    //                     px: { xs: 4, md: 6 },
    //                     py: 1.5,
    //                     borderRadius: 2,
    //                     fontWeight: 600,
    //                     fontSize: "1rem",
    //                     width: { xs: "100%", md: "auto" },
    //                     minWidth: { md: "200px" },
    //                     "&:hover": {
    //                       backgroundColor: "#1b5e20",
    //                     },
    //                     "&:disabled": {
    //                       backgroundColor: "#81c784",
    //                     },
    //                   }}
    //                 >
    //                   {loading ? (
    //                     <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    //                       <CircularProgress size={20} sx={{ color: "white" }} />
    //                       <Typography>Sending...</Typography>
    //                     </Box>
    //                   ) : (
    //                     "Send Message"
    //                   )}
    //                 </Button>
    //               </Box>
    //             </Stack>
    //           </Box>
    //         </Paper>
    //       </Grid>
    //     </Grid>

    //     {/* Why Contact Us Section */}
    //     <Box sx={{ mt: { xs: 6, md: 8 } }}>
    //       <Typography
    //         variant="h4"
    //         sx={{
    //           fontWeight: 700,
    //           fontSize: { xs: "1.75rem", md: "2.25rem" },
    //           color: "#1a1a1a",
    //           mb: 4,
    //           textAlign: "center",
    //         }}
    //       >
    //         Why Contact Us
    //       </Typography>
    //       <Grid container spacing={3}>
    //         {whyContactUs.map((item, index) => (
    //           <Grid item xs={12} md={4} key={index}>
    //             <Paper
    //               elevation={0}
    //               sx={{
    //                 p: 3,
    //                 textAlign: "center",
    //                 borderRadius: 2,
    //                 border: "1px solid #e0e0e0",
    //                 backgroundColor: "white",
    //                 height: "100%",
    //                 display: "flex",
    //                 flexDirection: "column",
    //                 alignItems: "center",
    //                 boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    //                 transition: "all 0.3s ease",
    //                 "&:hover": {
    //                   boxShadow: "0 4px 12px rgba(46, 125, 50, 0.15)",
    //                   transform: "translateY(-4px)",
    //                 },
    //               }}
    //             >
    //               <Box sx={{ mb: 2 }}>{item.icon}</Box>
    //               <Typography
    //                 variant="h6"
    //                 sx={{
    //                   fontWeight: 600,
    //                   color: "#1a1a1a",
    //                   mb: 1,
    //                   fontSize: { xs: "1rem", md: "1.125rem" },
    //                 }}
    //               >
    //                 {item.title}
    //               </Typography>
    //               <Typography
    //                 variant="body2"
    //                 sx={{
    //                   color: "#666",
    //                   lineHeight: 1.6,
    //                 }}
    //               >
    //                 {item.description}
    //               </Typography>
    //             </Paper>
    //           </Grid>
    //         ))}
    //       </Grid>
    //     </Box>

    //     {/* Map / Location Section */}
    //     <Box sx={{ mt: { xs: 6, md: 8 } }}>
    //       <Box
    //         sx={{
    //           borderRadius: 2,
    //           overflow: "hidden",
    //           border: "1px solid #e0e0e0",
    //           backgroundColor: "white",
    //           boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    //         }}
    //       >
    //         <Box
    //           sx={{
    //             height: { xs: "300px", md: "400px" },
    //             backgroundColor: "#e8f5e9",
    //             display: "flex",
    //             alignItems: "center",
    //             justifyContent: "center",
    //             position: "relative",
    //           }}
    //         >
    //           <Box
    //             sx={{
    //               textAlign: "center",
    //               zIndex: 1,
    //             }}
    //           >
    //             <LocationIcon
    //               sx={{
    //                 fontSize: 64,
    //                 color: "#2e7d32",
    //                 mb: 2,
    //               }}
    //             />
    //             <Typography
    //               variant="h6"
    //               sx={{
    //                 fontWeight: 600,
    //                 color: "#1a1a1a",
    //                 fontSize: { xs: "1.125rem", md: "1.25rem" },
    //               }}
    //             >
    //               Serving customers across Pune
    //             </Typography>
    //             <Typography
    //               variant="body2"
    //               sx={{
    //                 color: "#666",
    //                 mt: 1,
    //               }}
    //             >
    //               Pune, Maharashtra, India
    //             </Typography>
    //           </Box>
    //           {/* Placeholder for Google Maps embed */}
    //           <Box
    //             sx={{
    //               position: "absolute",
    //               top: 0,
    //               left: 0,
    //               width: "100%",
    //               height: "100%",
    //               opacity: 0.1,
    //               backgroundImage:
    //                 "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200')",
    //               backgroundSize: "cover",
    //               backgroundPosition: "center",
    //             }}
    //           />
    //         </Box>
    //       </Box>
    //     </Box>

    //     {/* Bottom Call To Action */}
    //     <Box
    //       sx={{
    //         mt: { xs: 6, md: 8 },
    //         backgroundColor: "#2e7d32",
    //         borderRadius: 2,
    //         p: { xs: 4, md: 6 },
    //         textAlign: "center",
    //         color: "white",
    //       }}
    //     >
    //       <Typography
    //         variant="h4"
    //         sx={{
    //           fontWeight: 700,
    //           fontSize: { xs: "1.75rem", md: "2.25rem" },
    //           mb: 2,
    //         }}
    //       >
    //         Need quick help?
    //       </Typography>
    //       <Typography
    //         variant="body1"
    //         sx={{
    //           fontSize: { xs: "1rem", md: "1.125rem" },
    //           mb: 4,
    //           opacity: 0.95,
    //         }}
    //       >
    //         Check our FAQs or reach out to us directly.
    //       </Typography>
    //       <Stack
    //         direction={{ xs: "column", sm: "row" }}
    //         spacing={2}
    //         sx={{
    //           justifyContent: "center",
    //           alignItems: "center",
    //         }}
    //       >
    //         <Button
    //           variant="contained"
    //           onClick={() => navigate("/products")}
    //           sx={{
    //             backgroundColor: "white",
    //             color: "#2e7d32",
    //             textTransform: "none",
    //             px: 4,
    //             py: 1.5,
    //             borderRadius: 2,
    //             fontWeight: 600,
    //             fontSize: "1rem",
    //             width: { xs: "100%", sm: "auto" },
    //             minWidth: { sm: "180px" },
    //             "&:hover": {
    //               backgroundColor: "#f5f5f5",
    //               transform: "translateY(-2px)",
    //               boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    //             },
    //             transition: "all 0.3s ease",
    //           }}
    //         >
    //           Browse Products
    //         </Button>
    //         <Button
    //           variant="outlined"
    //           onClick={() => {
    //             // Scroll to FAQ section if exists, or navigate to home
    //             window.scrollTo({ top: 0, behavior: "smooth" });
    //             navigate("/");
    //           }}
    //           sx={{
    //             borderColor: "white",
    //             color: "white",
    //             textTransform: "none",
    //             px: 4,
    //             py: 1.5,
    //             borderRadius: 2,
    //             fontWeight: 600,
    //             fontSize: "1rem",
    //             width: { xs: "100%", sm: "auto" },
    //             minWidth: { sm: "180px" },
    //             "&:hover": {
    //               borderColor: "white",
    //               backgroundColor: "rgba(255, 255, 255, 0.1)",
    //               transform: "translateY(-2px)",
    //             },
    //             transition: "all 0.3s ease",
    //           }}
    //         >
    //           FAQs
    //         </Button>
    //       </Stack>
    //     </Box>
    //   </Container>
    // </Box>
  );
}

export default Contact;
