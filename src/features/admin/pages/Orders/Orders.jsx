import { useState, useMemo, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Pagination,
  Button,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Stack,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  ShoppingCart as ShoppingCartIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from "@mui/icons-material";

// Utility function to safely parse JSON from localStorage
const getOrdersFromStorage = () => {
  try {
    const data = localStorage.getItem("orders");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading orders from localStorage:", error);
    return [];
  }
};

// Function to delete an order
const deleteOrderFromStorage = (orderId) => {
  try {
    const orders = getOrdersFromStorage();
    const orderToDelete = orders.find((o) => o.orderId === orderId);

    const updatedOrders = orders.filter((order) => order.orderId !== orderId);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    // Also update in user-specific storage if exists
    const userId = orderToDelete?.userId;
    if (userId) {
      const userOrdersKey = `orders_${userId}`;
      const userOrders = JSON.parse(localStorage.getItem(userOrdersKey) || "[]");
      const updatedUserOrders = userOrders.filter((o) => o.orderId !== orderId);
      localStorage.setItem(userOrdersKey, JSON.stringify(updatedUserOrders));
    } else {
      // Best-effort: if we don't know userId, still try to remove from any user order lists
      const allUserIds = [
        ...new Set(orders.map((o) => o.userId).filter(Boolean)),
      ];
      allUserIds.forEach((uid) => {
        const userOrdersKey = `orders_${uid}`;
        const userOrders = JSON.parse(
          localStorage.getItem(userOrdersKey) || "[]",
        );
        const updatedUserOrders = userOrders.filter((o) => o.orderId !== orderId);
        localStorage.setItem(userOrdersKey, JSON.stringify(updatedUserOrders));
      });
    }

    // Dispatch event to update UI
    window.dispatchEvent(new Event("ordersUpdated"));
    return updatedOrders;
  } catch (error) {
    console.error("Error deleting order:", error);
    return getOrdersFromStorage();
  }
};

// Utility function to format date
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Function to update order status
const updateOrderStatus = (orderId, newStatus) => {
  try {
    const orders = getOrdersFromStorage();
    const updatedOrders = orders.map((order) =>
      order.orderId === orderId ? { ...order, status: newStatus } : order,
    );
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    // Also update in user-specific storage if exists
    const userIds = [...new Set(orders.map((o) => o.userId).filter(Boolean))];
    userIds.forEach((userId) => {
      const userOrdersKey = `orders_${userId}`;
      const userOrders = JSON.parse(
        localStorage.getItem(userOrdersKey) || "[]",
      );
      const updatedUserOrders = userOrders.map((order) =>
        order.orderId === orderId ? { ...order, status: newStatus } : order,
      );
      localStorage.setItem(userOrdersKey, JSON.stringify(updatedUserOrders));
    });

    // Dispatch event to update UI
    window.dispatchEvent(new Event("ordersUpdated"));
    return updatedOrders;
  } catch (error) {
    console.error("Error updating order status:", error);
    return getOrdersFromStorage();
  }
};

const ORDERS_PER_PAGE = 10;

function Orders() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  // Load orders from localStorage
  useEffect(() => {
    const loadOrders = () => {
      const allOrders = getOrdersFromStorage();
      // Sort by date, most recent first
      const sortedOrders = [...allOrders].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
      setOrders(sortedOrders);
    };
    loadOrders();

    // Listen for storage changes
    window.addEventListener("storage", loadOrders);
    window.addEventListener("ordersUpdated", loadOrders);
    return () => {
      window.removeEventListener("storage", loadOrders);
      window.removeEventListener("ordersUpdated", loadOrders);
    };
  }, []);

  // Reset pagination when searching
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredOrders = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return orders;

    return orders.filter((order) => {
      const orderId = String(order.orderId || "").toLowerCase();
      const customer = String(order.user || "").toLowerCase();
      return orderId.includes(term) || customer.includes(term);
    });
  }, [orders, searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * ORDERS_PER_PAGE;
    const endIndex = startIndex + ORDERS_PER_PAGE;
    return filteredOrders.slice(startIndex, endIndex);
  }, [filteredOrders, currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    const updatedOrders = orders.map((order) =>
      order.orderId === orderId ? { ...order, status: newStatus } : order,
    );
    setOrders(updatedOrders);
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const handleDeleteClick = (order) => {
    setOrderToDelete(order);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setOrderToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (!orderToDelete?.orderId) return;

    deleteOrderFromStorage(orderToDelete.orderId);
    setOrders((prev) => prev.filter((o) => o.orderId !== orderToDelete.orderId));

    // If the detail dialog is open for the same order, close it
    if (selectedOrder?.orderId === orderToDelete.orderId) {
      setOpenDialog(false);
      setSelectedOrder(null);
    }

    handleCloseDeleteDialog();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
  };

  const pendingCount = filteredOrders.filter(
    (order) => order.status === "Pending",
  ).length;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: { xs: 3, md: 4 },
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 2, sm: 2 },
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
          Orders Management
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <TextField
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Order ID or Customer"
            size="small"
            sx={{
              width: { xs: "100%", sm: 320 },
              "& .MuiOutlinedInput-root": {
                backgroundColor: "white",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          {pendingCount > 0 && (
            <Chip
              label={`${pendingCount} Pending`}
              color="warning"
              size="small"
              sx={{ fontWeight: 600, flexShrink: 0 }}
            />
          )}
        </Box>
      </Box>

      {filteredOrders.length === 0 ? (
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
          <ShoppingCartIcon
            sx={{ fontSize: { xs: 48, md: 64 }, color: "#bdbdbd", mb: 2 }}
          />
          <Typography
            variant="h6"
            sx={{
              color: "#757575",
              mb: 1,
              fontSize: { xs: "1rem", md: "1.25rem" },
            }}
          >
            No Orders Yet
          </Typography>
          <Typography variant="body2" sx={{ color: "#9e9e9e" }}>
            Orders placed by users will appear here
          </Typography>
        </Paper>
      ) : (
        <>
          {/* Mobile Card View */}
          {isMobile ? (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(2, 1fr)",
                },
                gap: 2,
              }}
            >
              {paginatedOrders.map((order) => (
                <Paper
                  key={order.orderId}
                  elevation={0}
                  sx={{
                    p: 2.5,
                    borderRadius: 2,
                    border: "1px solid #e0e0e0",
                    backgroundColor: "white",
                    borderLeft: `4px solid ${
                      order.status === "Pending" ? "#ff9800" : "#2e7d32"
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
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 600, color: "#212121", mb: 0.5 }}
                      >
                        {order.orderId}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#757575", fontSize: "0.8125rem" }}
                      >
                        {order.user || "Guest"}
                      </Typography>
                    </Box>
                    <Chip
                      label={order.status || "Pending"}
                      size="small"
                      sx={{
                        backgroundColor:
                          order.status === "Delivered" ? "#e8f5e9" : "#fff3e0",
                        color:
                          order.status === "Delivered" ? "#2e7d32" : "#f57c00",
                        fontWeight: 600,
                      }}
                    />
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ display: "grid", gap: 1.5, mb: 2 }}>
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "#757575",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: 0.5,
                          display: "block",
                          mb: 0.5,
                        }}
                      >
                        Date
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#212121" }}>
                        {formatDate(order.createdAt)}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "#757575",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: 0.5,
                          display: "block",
                          mb: 0.5,
                        }}
                      >
                        Total Amount
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#212121",
                          fontWeight: 700,
                          fontSize: "1.125rem",
                        }}
                      >
                        ₹{order.totalAmount || 0}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "#757575",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: 0.5,
                          display: "block",
                          mb: 0.5,
                        }}
                      >
                        Items
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#212121" }}>
                        {order.items?.length || 0} item(s)
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "grid", gap: 1.5 }}>
                    <FormControl fullWidth size="small">
                      <Select
                        value={order.status || "Pending"}
                        onChange={(e) =>
                          handleStatusChange(order.orderId, e.target.value)
                        }
                        sx={{
                          height: 42,
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#e0e0e0",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#bdbdbd",
                          },
                        }}
                      >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Delivered">Delivered</MenuItem>
                      </Select>
                    </FormControl>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<VisibilityIcon />}
                      onClick={() => handleViewOrder(order)}
                      sx={{
                        textTransform: "none",
                        height: 42,
                        borderColor: "#2e7d32",
                        color: "#2e7d32",
                        fontWeight: 600,
                        "&:hover": {
                          borderColor: "#1b5e20",
                          backgroundColor: "#e8f5e9",
                        },
                      }}
                    >
                      View Details
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteClick(order)}
                      sx={{
                        textTransform: "none",
                        height: 42,
                        borderColor: "#d32f2f",
                        color: "#d32f2f",
                        fontWeight: 600,
                        "&:hover": {
                          borderColor: "#b71c1c",
                          backgroundColor: "#ffebee",
                        },
                      }}
                    >
                      Delete
                    </Button>
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
                    <TableCell sx={{ fontWeight: 600 }}>Order ID</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Customer</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Items</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedOrders.map((order) => (
                    <TableRow
                      key={order.orderId}
                      hover
                      sx={{
                        backgroundColor:
                          order.status === "Pending" ? "#fffbf0" : "white",
                      }}
                    >
                      <TableCell sx={{ fontWeight: 500 }}>
                        {order.orderId}
                      </TableCell>
                      <TableCell>{order.user || "Guest"}</TableCell>
                      <TableCell>{formatDate(order.createdAt)}</TableCell>
                      <TableCell>{order.items?.length || 0}</TableCell>
                      <TableCell>₹{order.totalAmount || 0}</TableCell>
                      <TableCell>
                        <FormControl size="small" sx={{ minWidth: 120 }}>
                          <Select
                            value={order.status || "Pending"}
                            onChange={(e) =>
                              handleStatusChange(order.orderId, e.target.value)
                            }
                            sx={{
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#e0e0e0",
                              },
                            }}
                          >
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="Delivered">Delivered</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <IconButton
                            size="small"
                            onClick={() => handleViewOrder(order)}
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
                            onClick={() => handleDeleteClick(order)}
                            sx={{
                              color: "#d32f2f",
                              "&:hover": {
                                backgroundColor: "#ffebee",
                              },
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
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

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Delete Order</DialogTitle>
        <DialogContent>
          <Typography sx={{ color: "#616161" }}>
            Are you sure you want to delete{" "}
            <strong>{orderToDelete?.orderId || "this order"}</strong>? This
            action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={handleCloseDeleteDialog}
            sx={{ textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            sx={{ textTransform: "none" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Order Detail Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            borderRadius: isMobile ? 0 : 2,
            maxHeight: isMobile ? "100%" : "90vh",
          },
        }}
      >
        {/* Header */}
        <DialogTitle sx={{ borderBottom: "1px solid #e0e0e0", pb: 2, px: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#212121" }}>
              Order Details
            </Typography>
            {selectedOrder && (
              <Chip
                label={selectedOrder.status || "Pending"}
                size="small"
                sx={{
                  backgroundColor:
                    selectedOrder.status === "Delivered"
                      ? "#e8f5e9"
                      : "#fff3e0",
                  color:
                    selectedOrder.status === "Delivered"
                      ? "#2e7d32"
                      : "#f57c00",
                  fontWeight: 600,
                  px: 1,
                }}
              />
            )}
          </Box>
        </DialogTitle>

        {/* Content */}
        <DialogContent sx={{ p: 3 }}>
          {selectedOrder && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {/* Order Information Grid */}
              <Box
                sx={{
                  mt: 2,
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 3,
                }}
              >
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#757575",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                    }}
                  >
                    Order ID
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 0.5, fontWeight: 500 }}>
                    {selectedOrder.orderId}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#757575",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                    }}
                  >
                    Customer Name
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 0.5, fontWeight: 500 }}>
                    {selectedOrder.user || "Guest"}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#757575",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                    }}
                  >
                    Order Date
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 0.5, fontWeight: 500 }}>
                    {formatDate(selectedOrder.createdAt)}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#757575",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                    }}
                  >
                    Payment Method
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 0.5, fontWeight: 500 }}>
                    {selectedOrder.paymentMethod || "Not specified"}
                  </Typography>
                </Box>
              </Box>

              <Divider />

              {/* Total Amount - Highlighted */}
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  backgroundColor: "#f5f5f5",
                  borderRadius: 1,
                  border: "1px solid #e0e0e0",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 600, color: "#212121" }}
                  >
                    Total Amount
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, color: "#2e7d32" }}
                  >
                    ₹{selectedOrder.totalAmount || 0}
                  </Typography>
                </Box>
              </Paper>

              {/* Shipping Address */}
              {selectedOrder.shippingInfo && (
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ mb: 1.5, fontWeight: 600, color: "#212121" }}
                  >
                    Shipping Address
                  </Typography>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2.5,
                      backgroundColor: "#fafafa",
                      borderRadius: 1,
                      border: "1px solid #e0e0e0",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, mb: 0.5, color: "#212121" }}
                    >
                      {selectedOrder.shippingInfo.firstName}{" "}
                      {selectedOrder.shippingInfo.lastName}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#616161", lineHeight: 1.6 }}
                    >
                      {selectedOrder.shippingInfo.address}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#616161", lineHeight: 1.6 }}
                    >
                      {selectedOrder.shippingInfo.city},{" "}
                      {selectedOrder.shippingInfo.state} -{" "}
                      {selectedOrder.shippingInfo.pincode}
                    </Typography>
                    <Box
                      sx={{ mt: 1.5, pt: 1.5, borderTop: "1px solid #e0e0e0" }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ color: "#616161", mb: 0.5 }}
                      >
                        📱 {selectedOrder.shippingInfo.phone}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#616161" }}>
                        ✉️ {selectedOrder.shippingInfo.email}
                      </Typography>
                    </Box>
                  </Paper>
                </Box>
              )}
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: "#757575", fontWeight: 600 }}
                >
                  Update Status:
                </Typography>
                {selectedOrder && (
                  <FormControl size="small" sx={{ minWidth: 150 }}>
                    <Select
                      value={selectedOrder.status || "Pending"}
                      onChange={(e) => {
                        handleStatusChange(
                          selectedOrder.orderId,
                          e.target.value,
                        );
                        setSelectedOrder({
                          ...selectedOrder,
                          status: e.target.value,
                        });
                      }}
                      sx={{
                        "& .MuiSelect-select": {
                          py: 1,
                        },
                      }}
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Delivered">Delivered</MenuItem>
                    </Select>
                  </FormControl>
                )}
              </Box>

              {/* Order Items */}
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 1.5, fontWeight: 600, color: "#212121" }}
                >
                  Order Items ({selectedOrder.items?.length || 0})
                </Typography>
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 1,
                    border: "1px solid #e0e0e0",
                    overflow: "hidden",
                  }}
                >
                  {selectedOrder.items?.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 2.5,
                        backgroundColor:
                          index % 2 === 0 ? "#fafafa" : "#ffffff",
                        borderBottom:
                          index < selectedOrder.items.length - 1
                            ? "1px solid #e0e0e0"
                            : "none",
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: 600, mb: 0.5, color: "#212121" }}
                        >
                          {item.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#757575" }}>
                          {item.quantity} × ₹{item.price}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 600, color: "#212121", ml: 2 }}
                      >
                        ₹{item.price * item.quantity}
                      </Typography>
                    </Box>
                  ))}
                </Paper>
              </Box>
            </Box>
          )}
        </DialogContent>

        {/* Footer Actions */}
        <DialogActions
          sx={{ px: 3, py: 2.5, borderTop: "1px solid #e0e0e0", gap: 2 }}
        >
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            sx={{
              textTransform: "none",
              px: 4,
              height: 42,
              backgroundColor: "#2e7d32",
              "&:hover": {
                backgroundColor: "#1b5e20",
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Orders;
