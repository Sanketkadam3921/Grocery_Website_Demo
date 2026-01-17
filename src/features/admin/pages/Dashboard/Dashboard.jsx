import { useMemo } from "react";
import {
  Box,
  Paper,
  Typography,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  ShoppingCart as ShoppingCartIcon,
  Today as TodayIcon,
  Warning as WarningIcon,
  PendingActions as PendingActionsIcon,
} from "@mui/icons-material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

// Utility function to safely parse JSON from localStorage
const getFromStorage = (key, defaultValue = []) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

// Utility function to check if a date is today
const isToday = (dateString) => {
  if (!dateString) return false;
  const orderDate = new Date(dateString);
  const today = new Date();
  return (
    orderDate.getDate() === today.getDate() &&
    orderDate.getMonth() === today.getMonth() &&
    orderDate.getFullYear() === today.getFullYear()
  );
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

function Dashboard() {
  // Read data from localStorage
  const orders = useMemo(() => getFromStorage("orders", []), []);
  const products = useMemo(() => getFromStorage("products", []), []);

  // Calculate today's orders
  const todayOrders = useMemo(() => {
    return orders.filter((order) => isToday(order.createdAt));
  }, [orders]);

  // Calculate total revenue (sum of all order amounts)
  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
  }, [orders]);

  // Find low stock products (stock < 5)
  const lowStockProducts = useMemo(() => {
    return products.filter((product) => (product.stock || 0) < 5);
  }, [products]);

  // Calculate pending orders
  const pendingOrders = useMemo(() => {
    return orders.filter((order) => (order.status || "Pending") === "Pending");
  }, [orders]);

  // Get recent 5 orders (sorted by date, most recent first)
  const recentOrders = useMemo(() => {
    return [...orders]
      .sort((a, b) => {
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        return dateB - dateA;
      })
      .slice(0, 5);
  }, [orders]);

  // Summary Cards Data
  const summaryCards = [
    {
      title: "Total Orders",
      value: orders.length,
      icon: <ShoppingCartIcon sx={{ fontSize: 40, color: "#757575" }} />,
      color: "#f5f5f5",
    },
    {
      title: "Today's Orders",
      value: todayOrders.length,
      icon: <TodayIcon sx={{ fontSize: 40, color: "#757575" }} />,
      color: "#f5f5f5",
    },
    {
      title: "Pending Orders",
      value: pendingOrders.length,
      icon: <PendingActionsIcon sx={{ fontSize: 40, color: "#ff9800" }} />,
      color: "#fff3e0",
    },
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: <CurrencyRupeeIcon sx={{ fontSize: 40, color: "#757575" }} />,
      color: "#f5f5f5",
    },
    {
      title: "Low Stock Products",
      value: lowStockProducts.length,
      icon: <WarningIcon sx={{ fontSize: 40, color: "#757575" }} />,
      color: "#f5f5f5",
    },
  ];

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ mb: 4, fontWeight: 600, color: "#212121" }}
      >
        Dashboard Overview
      </Typography>

      {/* Summary Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(5, 1fr)",
          },
          gap: 3,
          mb: 4,
        }}
      >
        {summaryCards.map((card, index) => (
          <Paper
            key={index}
            elevation={0}
            sx={{
              p: 3,
              backgroundColor: card.color,
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              {card.icon}
              <Typography
                variant="body2"
                sx={{ ml: 2, color: "#757575", fontWeight: 500 }}
              >
                {card.title}
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 600, color: "#212121" }}>
              {card.value}
            </Typography>
          </Paper>
        ))}
      </Box>

      {/* Recent Orders Table - Full Width */}
      <Paper elevation={0} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
        <Typography
          variant="h6"
          sx={{ mb: 2, fontWeight: 600, color: "#212121" }}
        >
          Recent Orders
        </Typography>
        {recentOrders.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Order ID</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Customer</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.orderId || order.id} hover>
                    <TableCell>{order.orderId || "N/A"}</TableCell>
                    <TableCell>{order.user || "N/A"}</TableCell>
                    <TableCell>₹{order.totalAmount || 0}</TableCell>
                    <TableCell>{formatDate(order.createdAt)}</TableCell>
                    <TableCell>
                      <Chip
                        label={order.status || "Pending"}
                        size="small"
                        sx={{
                          backgroundColor:
                            order.status === "Delivered"
                              ? "#e8f5e9"
                              : "#fff3e0",
                          color:
                            order.status === "Delivered"
                              ? "#2e7d32"
                              : "#f57c00",
                          fontWeight: 500,
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box
            sx={{
              py: 4,
              textAlign: "center",
              color: "#757575",
            }}
          >
            <Typography>No orders found</Typography>
          </Box>
        )}
      </Paper>

      {/* Low Stock Alerts - Full Width */}
      <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
        <Typography
          variant="h6"
          sx={{ mb: 2, fontWeight: 600, color: "#212121" }}
        >
          Low Stock Alerts
        </Typography>
        {lowStockProducts.length > 0 ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {lowStockProducts.map((product) => (
              <Box
                key={product.id}
                sx={{
                  p: 2,
                  backgroundColor: "#fff3e0",
                  borderRadius: 1,
                  borderLeft: "4px solid #ff9800",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 500, color: "#212121", mb: 0.5 }}
                >
                  {product.name || "Unknown Product"}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#f57c00", fontWeight: 600 }}
                >
                  Stock: {product.stock || 0}
                </Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              py: 4,
              textAlign: "center",
              color: "#757575",
            }}
          >
            <Typography>All products are well stocked</Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default Dashboard;
