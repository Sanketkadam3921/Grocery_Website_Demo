import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Box,
  TextField,
  InputAdornment,
  Typography,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { deleteProduct } from "../../../services/productService";

function ProductTable({ products, onProductDeleted }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products;
    const term = searchTerm.toLowerCase();
    return products.filter(
      (product) =>
        product.name?.toLowerCase().includes(term) ||
        product.category?.toLowerCase().includes(term)
    );
  }, [products, searchTerm]);

  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(productId);
      if (onProductDeleted) {
        onProductDeleted();
      }
    }
  };

  const handleEdit = (productId) => {
    navigate(`/admin/products/edit/${productId}`);
  };

  if (products.length === 0) {
    return (
      <Box
        sx={{
          textAlign: "center",
          py: 8,
          color: "#757575",
        }}
      >
        <Typography variant="h6">No products found</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Add your first product to get started
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <TextField
        fullWidth
        placeholder="Search products by name or category..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Product Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>MRP</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Price</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Unit</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Stock</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                  <Typography variant="body2" sx={{ color: "#757575" }}>
                    No products match your search
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id} hover>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      {product.image && (
                        <Box
                          component="img"
                          src={product.image}
                          alt={product.name}
                          sx={{
                            width: 50,
                            height: 50,
                            objectFit: "cover",
                            borderRadius: 1,
                          }}
                        />
                      )}
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {product.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={product.category}
                      size="small"
                      sx={{
                        backgroundColor: "#e8f5e9",
                        color: "#2e7d32",
                        fontWeight: 500,
                      }}
                    />
                  </TableCell>
                  <TableCell>₹{product.mrp}</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#2e7d32" }}>
                    ₹{product.price}
                  </TableCell>
                  <TableCell>{product.unit}</TableCell>
                  <TableCell>
                    <Chip
                      label={product.stock || 0}
                      size="small"
                      sx={{
                        backgroundColor:
                          (product.stock || 0) < 5 ? "#fff3e0" : "#e8f5e9",
                        color:
                          (product.stock || 0) < 5 ? "#f57c00" : "#2e7d32",
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(product.id)}
                        sx={{
                          color: "#2e7d32",
                          "&:hover": {
                            backgroundColor: "rgba(46, 125, 50, 0.08)",
                          },
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(product.id)}
                        sx={{
                          color: "#d32f2f",
                          "&:hover": {
                            backgroundColor: "rgba(211, 47, 47, 0.08)",
                          },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ProductTable;
