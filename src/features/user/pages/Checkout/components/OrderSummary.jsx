import { Box, Paper, Typography, Divider, Button } from "@mui/material";

function OrderSummary({ cartItems, total, onCheckout }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 2.5, md: 3 },
        borderRadius: 2,
        border: "1px solid #e0e0e0",
        backgroundColor: "white",
        position: { xs: "relative", md: "sticky" },
        top: { xs: 0, md: 96 },
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: "#1a1a1a",
          mb: 2,
          fontSize: { xs: "1.125rem", sm: "1.25rem" },
        }}
      >
        Order Summary
      </Typography>

      <Divider sx={{ mb: 2 }} />

      {/* Cart Items */}
      <Box
        sx={{
          mb: 2,
          maxHeight: { xs: "none", md: "300px" },
          overflowY: { xs: "visible", md: "auto" },
        }}
      >
        {cartItems.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              gap: 2,
              mb: 2,
              pb: 2,
              borderBottom: "1px solid #f0f0f0",
            }}
          >
            <Box
              sx={{
                width: { xs: 50, sm: 60 },
                height: { xs: 50, sm: 60 },
                borderRadius: 1,
                overflow: "hidden",
                backgroundColor: "#f8f8f8",
                flexShrink: 0,
              }}
            >
              <Box
                component="img"
                src={item.image}
                alt={item.name}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: "#1a1a1a",
                  mb: 0.5,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                }}
              >
                {item.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "#666",
                  display: "block",
                  fontSize: { xs: "0.6875rem", sm: "0.75rem" },
                }}
              >
                Qty: {item.quantity} × ₹{item.price}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "#1a1a1a",
                fontSize: { xs: "0.8125rem", sm: "0.875rem" },
              }}
            >
              ₹{item.price * item.quantity}
            </Typography>
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Price Breakdown */}
      <Box sx={{ mb: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#666",
              fontSize: { xs: "0.8125rem", sm: "0.875rem" },
            }}
          >
            Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              fontSize: { xs: "0.8125rem", sm: "0.875rem" },
            }}
          >
            ₹{total.toFixed(2)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#666",
              fontSize: { xs: "0.8125rem", sm: "0.875rem" },
            }}
          >
            Delivery Charges
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: "#2e7d32",
              fontSize: { xs: "0.8125rem", sm: "0.875rem" },
            }}
          >
            Free
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Total */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "#1a1a1a",
            fontSize: { xs: "1rem", sm: "1.25rem" },
          }}
        >
          Total
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "#2e7d32",
            fontSize: { xs: "1rem", sm: "1.25rem" },
          }}
        >
          ₹{total.toFixed(2)}
        </Typography>
      </Box>
    </Paper>
  );
}

export default OrderSummary;

