import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Chip,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../../services/categoryService";

function Categories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const loadCategories = () => {
    const allCategories = getCategories();
    setCategories(allCategories);
  };

  useEffect(() => {
    loadCategories();

    // Listen for storage changes
    const handleStorageChange = () => {
      loadCategories();
    };
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("categoriesUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("categoriesUpdated", handleStorageChange);
    };
  }, []);

  const handleOpenAddDialog = () => {
    setEditingCategory(null);
    setCategoryName("");
    setError("");
    setOpenDialog(true);
  };

  const handleOpenEditDialog = (category) => {
    setEditingCategory(category);
    setCategoryName(category);
    setError("");
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingCategory(null);
    setCategoryName("");
    setError("");
  };

  const handleOpenDeleteDialog = (category) => {
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setCategoryToDelete(null);
  };

  const handleCategoryNameChange = (e) => {
    const value = e.target.value;
    // Only allow alphabetic characters and spaces
    const filteredValue = value.replace(/[^a-zA-Z\s]/g, "");
    setCategoryName(filteredValue);
    setError("");
  };

  const handleSave = () => {
    setError("");

    const trimmedName = categoryName.trim();

    if (!trimmedName) {
      setError("Category name is required");
      return;
    }

    // Validate that category name contains only alphabetic characters and spaces
    if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
      setError("Category name can only contain alphabetic characters and spaces");
      return;
    }

    // Validate minimum length
    if (trimmedName.length < 2) {
      setError("Category name must be at least 2 characters");
      return;
    }

    try {
      if (editingCategory) {
        // Update existing category
        updateCategory(editingCategory, trimmedName);
      } else {
        // Add new category
        addCategory(trimmedName);
      }
      loadCategories();
      handleCloseDialog();
    } catch (err) {
      setError(err.message || "An error occurred");
    }
  };

  const handleConfirmDelete = () => {
    if (!categoryToDelete) return;

    try {
      deleteCategory(categoryToDelete);
      loadCategories();
      handleCloseDeleteDialog();
    } catch (err) {
      setError(err.message || "Cannot delete category");
      handleCloseDeleteDialog();
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
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
          Category Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenAddDialog}
          sx={{
            minWidth: "150px",
            textTransform: "none",
            backgroundColor: "#2e7d32",
            "&:hover": {
              backgroundColor: "#1b5e20",
            },
          }}
        >
          Add Category
        </Button>
      </Box>

      {error && !openDialog && !deleteDialogOpen && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
        {categories.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
              color: "#757575",
            }}
          >
            <Typography variant="h6">No categories found</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Add your first category to get started
            </Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell sx={{ fontWeight: 600 }}>Category Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }} align="right">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((category, index) => (
                  <TableRow key={index} hover>
                    <TableCell>
                      <Chip
                        label={category}
                        sx={{
                          backgroundColor: "#e8f5e9",
                          color: "#2e7d32",
                          fontWeight: 500,
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                        <IconButton
                          size="small"
                          onClick={() => handleOpenEditDialog(category)}
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
                          onClick={() => handleOpenDeleteDialog(category)}
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
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Add/Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingCategory ? "Edit Category" : "Add New Category"}
        </DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            autoFocus
            margin="dense"
            label="Category Name"
            fullWidth
            variant="outlined"
            value={categoryName}
            onChange={handleCategoryNameChange}
            error={!!error}
            helperText={error || "Only alphabetic characters and spaces are allowed"}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ textTransform: "none" }}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              textTransform: "none",
              backgroundColor: "#2e7d32",
              "&:hover": {
                backgroundColor: "#1b5e20",
              },
            }}
          >
            {editingCategory ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Delete Category</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the category{" "}
            <strong>"{categoryToDelete}"</strong>?
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, color: "#757575" }}>
            Note: You cannot delete a category if it is being used by any
            products.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDeleteDialog}
            sx={{ textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
            sx={{ textTransform: "none" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Categories;

