import { useState, useMemo, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Pagination,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  useTheme,
  useMediaQuery,
  Divider,
  Stack,
} from "@mui/material";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
} from "@mui/icons-material";

// Utility function to safely parse JSON from localStorage
const getMessagesFromStorage = () => {
  try {
    const data = localStorage.getItem("contactMessages");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading messages from localStorage:", error);
    return [];
  }
};

// Utility function to format date
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const MESSAGES_PER_PAGE = 10;

function Messages() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Load messages from localStorage
  useEffect(() => {
    const loadMessages = () => {
      const allMessages = getMessagesFromStorage();
      setMessages(allMessages);
    };
    loadMessages();
    
    // Listen for storage changes (when new messages are added)
    window.addEventListener("storage", loadMessages);
    return () => window.removeEventListener("storage", loadMessages);
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(messages.length / MESSAGES_PER_PAGE);
  const paginatedMessages = useMemo(() => {
    const startIndex = (currentPage - 1) * MESSAGES_PER_PAGE;
    const endIndex = startIndex + MESSAGES_PER_PAGE;
    return messages.slice(startIndex, endIndex);
  }, [messages, currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    setOpenDialog(true);
    
    // Mark as read
    if (message.status === "unread") {
      const updatedMessages = messages.map((msg) =>
        msg.id === message.id ? { ...msg, status: "read" } : msg
      );
      setMessages(updatedMessages);
      localStorage.setItem("contactMessages", JSON.stringify(updatedMessages));
    }
  };

  const handleDeleteMessage = (messageId) => {
    const updatedMessages = messages.filter((msg) => msg.id !== messageId);
    setMessages(updatedMessages);
    localStorage.setItem("contactMessages", JSON.stringify(updatedMessages));
    
    // Adjust page if current page becomes empty
    const newTotalPages = Math.ceil(updatedMessages.length / MESSAGES_PER_PAGE);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    } else if (newTotalPages === 0) {
      setCurrentPage(1);
    }
    
    if (openDialog && selectedMessage?.id === messageId) {
      setOpenDialog(false);
      setSelectedMessage(null);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedMessage(null);
  };

  const unreadCount = messages.filter((msg) => msg.status === "unread").length;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: { xs: 3, md: 4 },
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 2, sm: 0 },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            color: "#212121",
            fontSize: { xs: "1.5rem", sm: "2rem" },
          }}
        >
          Contact Messages
        </Typography>
        {unreadCount > 0 && (
          <Chip
            label={`${unreadCount} Unread`}
            color="error"
            size="small"
            sx={{ fontWeight: 600 }}
          />
        )}
      </Box>

      {messages.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 6 },
            textAlign: "center",
            borderRadius: 2,
            border: "1px solid #e0e0e0",
            backgroundColor: "white",
          }}
        >
          <EmailIcon sx={{ fontSize: { xs: 48, md: 64 }, color: "#bdbdbd", mb: 2 }} />
          <Typography
            variant="h6"
            sx={{ color: "#757575", mb: 1, fontSize: { xs: "1rem", md: "1.25rem" } }}
          >
            No Messages Yet
          </Typography>
          <Typography variant="body2" sx={{ color: "#9e9e9e" }}>
            Contact messages from users will appear here
          </Typography>
        </Paper>
      ) : (
        <>
          {/* Mobile Card View */}
          {isMobile ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {paginatedMessages.map((message) => (
                <Paper
                  key={message.id}
                  elevation={0}
                  sx={{
                    p: 2.5,
                    borderRadius: 2,
                    border: "1px solid #e0e0e0",
                    backgroundColor:
                      message.status === "unread" ? "#f1f8e9" : "white",
                    borderLeft: `4px solid ${
                      message.status === "unread" ? "#2e7d32" : "#bdbdbd"
                    }`,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          backgroundColor: "rgba(46, 125, 50, 0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <PersonIcon sx={{ color: "#2e7d32", fontSize: 20 }} />
                      </Box>
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 600, color: "#212121" }}
                        >
                          {message.fullName}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#757575", fontSize: "0.8125rem" }}
                        >
                          {formatDate(message.createdAt)}
                        </Typography>
                      </Box>
                    </Box>
                    <Chip
                      label={message.status === "unread" ? "Unread" : "Read"}
                      size="small"
                      sx={{
                        backgroundColor:
                          message.status === "unread" ? "#fff3e0" : "#e8f5e9",
                        color:
                          message.status === "unread" ? "#f57c00" : "#2e7d32",
                        fontWeight: 500,
                      }}
                    />
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Stack spacing={1.5} sx={{ mb: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <EmailIcon sx={{ fontSize: 18, color: "#757575" }} />
                      <Typography variant="body2" sx={{ color: "#424242" }}>
                        {message.email}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <PhoneIcon sx={{ fontSize: 18, color: "#757575" }} />
                      <Typography variant="body2" sx={{ color: "#424242" }}>
                        {message.phone}
                      </Typography>
                    </Box>
                  </Stack>

                  <Box
                    sx={{
                      p: 1.5,
                      backgroundColor: "#fafafa",
                      borderRadius: 1,
                      mb: 2,
                      maxHeight: 80,
                      overflow: "hidden",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#666",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {message.message}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 1,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => handleViewMessage(message)}
                      sx={{
                        color: "#2e7d32",
                        "&:hover": {
                          backgroundColor: "#e8f5e9",
                        },
                      }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteMessage(message.id)}
                      sx={{
                        color: "#d32f2f",
                        "&:hover": {
                          backgroundColor: "#ffebee",
                        },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Paper>
              ))}
            </Box>
          ) : (
            /* Desktop Table View */
            <TableContainer
              component={Paper}
              elevation={0}
              sx={{
                borderRadius: 2,
                border: "1px solid #e0e0e0",
                mb: 3,
              }}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedMessages.map((message) => (
                    <TableRow
                      key={message.id}
                      hover
                      sx={{
                        backgroundColor:
                          message.status === "unread" ? "#f1f8e9" : "white",
                      }}
                    >
                      <TableCell sx={{ fontWeight: 500 }}>
                        {message.fullName}
                      </TableCell>
                      <TableCell>{message.email}</TableCell>
                      <TableCell>{message.phone}</TableCell>
                      <TableCell>{formatDate(message.createdAt)}</TableCell>
                      <TableCell>
                        <Chip
                          label={message.status === "unread" ? "Unread" : "Read"}
                          size="small"
                          sx={{
                            backgroundColor:
                              message.status === "unread" ? "#fff3e0" : "#e8f5e9",
                            color:
                              message.status === "unread" ? "#f57c00" : "#2e7d32",
                            fontWeight: 500,
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        <IconButton
                          size="small"
                          onClick={() => handleViewMessage(message)}
                          sx={{
                            color: "#2e7d32",
                            "&:hover": {
                              backgroundColor: "#e8f5e9",
                            },
                          }}
                        >
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteMessage(message.id)}
                          sx={{
                            color: "#d32f2f",
                            ml: 1,
                            "&:hover": {
                              backgroundColor: "#ffebee",
                            },
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size={isMobile ? "medium" : "large"}
                showFirstButton={!isMobile}
                showLastButton={!isMobile}
              />
            </Box>
          )}
        </>
      )}

      {/* Message Detail Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle sx={{ borderBottom: "1px solid #e0e0e0", pb: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Message Details
            </Typography>
            {selectedMessage && (
              <Chip
                label={selectedMessage.status === "unread" ? "Unread" : "Read"}
                size="small"
                sx={{
                  backgroundColor:
                    selectedMessage.status === "unread"
                      ? "#fff3e0"
                      : "#e8f5e9",
                  color:
                    selectedMessage.status === "unread" ? "#f57c00" : "#2e7d32",
                }}
              />
            )}
          </Box>
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          {selectedMessage && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Box>
                <Typography
                  variant="body2"
                  sx={{ color: "#757575", mb: 0.5, fontWeight: 600 }}
                >
                  Name
                </Typography>
                <Typography variant="body1">{selectedMessage.fullName}</Typography>
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  sx={{ color: "#757575", mb: 0.5, fontWeight: 600 }}
                >
                  Email
                </Typography>
                <Typography variant="body1">{selectedMessage.email}</Typography>
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  sx={{ color: "#757575", mb: 0.5, fontWeight: 600 }}
                >
                  Phone
                </Typography>
                <Typography variant="body1">{selectedMessage.phone}</Typography>
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  sx={{ color: "#757575", mb: 0.5, fontWeight: 600 }}
                >
                  Date
                </Typography>
                <Typography variant="body1">
                  {formatDate(selectedMessage.createdAt)}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  sx={{ color: "#757575", mb: 0.5, fontWeight: 600 }}
                >
                  Message
                </Typography>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    backgroundColor: "#fafafa",
                    borderRadius: 1,
                    border: "1px solid #e0e0e0",
                  }}
                >
                  <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                    {selectedMessage.message}
                  </Typography>
                </Paper>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2, borderTop: "1px solid #e0e0e0" }}>
          {selectedMessage && (
            <Button
              onClick={() => handleDeleteMessage(selectedMessage.id)}
              color="error"
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          )}
          <Button onClick={handleCloseDialog} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Messages;

