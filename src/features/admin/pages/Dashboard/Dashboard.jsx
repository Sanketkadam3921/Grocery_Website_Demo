import { useMemo, useState, useEffect } from "react";
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
  FormControl,
  Select,
  MenuItem,
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

const DATE_FILTERS = [
  { value: "today", label: "Today" },
  { value: "this_week", label: "This week" },
  { value: "last_week", label: "Last week" },
  { value: "last_month", label: "Last month" },
  { value: "this_year", label: "This year" },
];

const startOfDay = (date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);

const endOfDay = (date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);

const getWeekStart = (date) => {
  // Week starts on Monday
  const d = new Date(date);
  const day = d.getDay(); // 0=Sun ... 6=Sat
  const diffToMonday = (day + 6) % 7; // Mon->0, Tue->1 ... Sun->6
  d.setDate(d.getDate() - diffToMonday);
  return startOfDay(d);
};

const getDateRange = (filterValue) => {
  const now = new Date();

  if (filterValue === "today") {
    return { start: startOfDay(now), end: endOfDay(now) };
  }

  if (filterValue === "this_week") {
    const start = getWeekStart(now);
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    return { start, end: endOfDay(end) };
  }

  if (filterValue === "last_week") {
    const thisWeekStart = getWeekStart(now);
    const start = new Date(thisWeekStart);
    start.setDate(start.getDate() - 7);
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    return { start: startOfDay(start), end: endOfDay(end) };
  }

  if (filterValue === "last_month") {
    const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const end = new Date(now.getFullYear(), now.getMonth(), 0); // last day of prev month
    return { start: startOfDay(start), end: endOfDay(end) };
  }

  // this_year
  const start = new Date(now.getFullYear(), 0, 1);
  const end = new Date(now.getFullYear(), 11, 31);
  return { start: startOfDay(start), end: endOfDay(end) };
};

function Dashboard() {
  const [dateFilter, setDateFilter] = useState("this_week");
  const [orders, setOrders] = useState(() => getFromStorage("orders", []));
  const [products, setProducts] = useState(() => getFromStorage("products", []));

  // Keep dashboard in sync when orders/products change
  useEffect(() => {
    const loadAll = () => {
      setOrders(getFromStorage("orders", []));
      setProducts(getFromStorage("products", []));
    };

    loadAll();
    window.addEventListener("storage", loadAll);
    window.addEventListener("ordersUpdated", loadAll);
    window.addEventListener("productsUpdated", loadAll);
    return () => {
      window.removeEventListener("storage", loadAll);
      window.removeEventListener("ordersUpdated", loadAll);
      window.removeEventListener("productsUpdated", loadAll);
    };
  }, []);

  const { start: rangeStart, end: rangeEnd } = useMemo(
    () => getDateRange(dateFilter),
    [dateFilter],
  );

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const createdAt = order?.createdAt ? new Date(order.createdAt) : null;
      if (!createdAt || Number.isNaN(createdAt.getTime())) return false;
      return createdAt >= rangeStart && createdAt <= rangeEnd;
    });
  }, [orders, rangeStart, rangeEnd]);

  // Calculate today's orders
  const todayOrders = useMemo(() => {
    return filteredOrders.filter((order) => isToday(order.createdAt));
  }, [filteredOrders]);

  // Calculate total revenue (sum of all order amounts)
  const totalRevenue = useMemo(() => {
    return filteredOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
  }, [filteredOrders]);

  // Find low stock products (stock < 5)
  const lowStockProducts = useMemo(() => {
    return products.filter((product) => (product.stock || 0) < 5);
  }, [products]);

  // Calculate pending orders
  const pendingOrders = useMemo(() => {
    return filteredOrders.filter(
      (order) => (order.status || "Pending") === "Pending",
    );
  }, [filteredOrders]);

  // Get recent 5 orders (sorted by date, most recent first)
  const recentOrders = useMemo(() => {
    return [...filteredOrders]
      .sort((a, b) => {
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        return dateB - dateA;
      })
      .slice(0, 5);
  }, [filteredOrders]);

  // Summary Cards Data
  const summaryCards = [
    {
      title: "Total Orders",
      value: filteredOrders.length,
      icon: <ShoppingCartIcon sx={{ fontSize: 40, color: "#757575" }} />,
      color: "#f5f5f5",
    },
    {
      title: "Orders (Today)",
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
      title: "Revenue (Range)",
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600, color: "#212121" }}>
            Dashboard Overview
          </Typography>
          <Typography variant="body2" sx={{ color: "#757575", mt: 0.5 }}>
            Showing orders from {formatDate(rangeStart)} to {formatDate(rangeEnd)}
          </Typography>
        </Box>

        <FormControl size="small" sx={{ minWidth: 200 }}>
          <Select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            sx={{
              backgroundColor: "white",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#e0e0e0",
              },
            }}
          >
            {DATE_FILTERS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

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
