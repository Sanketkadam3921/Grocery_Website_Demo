import { Box, TextField, MenuItem } from "@mui/material";

const CATEGORIES = [
  "Fresh Fruits",
  "Fresh Vegetables",
  "Dairy & Bakery",
  "Staples & Grains",
  "Snacks & Beverages",
  "Household Essentials",
];

const CategoryUnitFields = ({
  category,
  unit,
  onCategoryChange,
  onUnitChange,
  categoryError,
  unitError,
  isMobile,
}) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
        gap: { xs: 2.5, sm: 3 },
      }}
    >
      <TextField
        select
        label="Category"
        name="category"
        value={category}
        onChange={onCategoryChange}
        error={!!categoryError}
        helperText={categoryError}
        required
        fullWidth
        size={isMobile ? "small" : "medium"}
      >
        {CATEGORIES.map((cat) => (
          <MenuItem key={cat} value={cat}>
            {cat}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Unit"
        name="unit"
        value={unit}
        onChange={onUnitChange}
        error={!!unitError}
        helperText={unitError || "e.g., 1 kg, 500 g, 1 pack"}
        required
        fullWidth
        size={isMobile ? "small" : "medium"}
      />
    </Box>
  );
};

export default CategoryUnitFields;

