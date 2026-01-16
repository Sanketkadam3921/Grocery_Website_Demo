import { Box, Typography, IconButton, Paper, Divider } from "@mui/material";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const hasDiscount = item.mrp > item.price;
  const discountPercentage = hasDiscount
    ? Math.round(((item.mrp - item.price) / item.mrp) * 100)
    : 0;

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        border: "1px solid #e0e0e0",
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          p: 2,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        {/* Product Image */}
        <Box
          sx={{
            width: { xs: "100%", sm: "120px" },
            height: { xs: "200px", sm: "120px" },
            flexShrink: 0,
            borderRadius: 1,
            overflow: "hidden",
            backgroundColor: "#f8f8f8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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

        {/* Product Details */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            minWidth: 0,
          }}
        >
          {/* Product Name and Category */}
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: "1rem", sm: "1.125rem" },
                fontWeight: 600,
                color: "#1a1a1a",
                mb: 0.5,
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {item.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.8125rem",
                color: "#888",
                textTransform: "uppercase",
                letterSpacing: 0.3,
              }}
            >
              {item.category}
            </Typography>
          </Box>

          {/* Price Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: "1.125rem", sm: "1.25rem" },
                fontWeight: 700,
                color: "#2e7d32",
              }}
            >
              ₹{item.price}
            </Typography>
            {hasDiscount && (
              <>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "0.875rem",
                    color: "#999",
                    textDecoration: "line-through",
                  }}
                >
                  ₹{item.mrp}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "0.75rem",
                    color: "#2e7d32",
                    fontWeight: 600,
                    backgroundColor: "#e8f5e9",
                    px: 1,
                    py: 0.25,
                    borderRadius: 0.5,
                  }}
                >
                  {discountPercentage}% OFF
                </Typography>
              </>
            )}
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.8125rem",
                color: "#666",
                ml: "auto",
              }}
            >
              Per {item.unit}
            </Typography>
          </Box>

          {/* Quantity Controls and Remove Button */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 1,
            }}
          >
            {/* Quantity Controls */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                border: "1px solid #e0e0e0",
                borderRadius: 1,
                p: 0.5,
              }}
            >
              <IconButton
                onClick={onDecrease}
                size="small"
                sx={{
                  width: 32,
                  height: 32,
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <RemoveIcon sx={{ fontSize: 18 }} />
              </IconButton>
              <Typography
                variant="body1"
                sx={{
                  minWidth: 40,
                  textAlign: "center",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#1a1a1a",
                }}
              >
                {item.quantity}
              </Typography>
              <IconButton
                onClick={onIncrease}
                size="small"
                sx={{
                  width: 32,
                  height: 32,
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <AddIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>

            {/* Remove Button */}
            <IconButton
              onClick={onRemove}
              size="small"
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

          {/* Item Total */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1,
              pt: 1,
              borderTop: "1px solid #f0f0f0",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "#666",
              }}
            >
              Item Total:
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontSize: "1.125rem",
                fontWeight: 700,
                color: "#2e7d32",
              }}
            >
              ₹{item.price * item.quantity}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

export default CartItem;
