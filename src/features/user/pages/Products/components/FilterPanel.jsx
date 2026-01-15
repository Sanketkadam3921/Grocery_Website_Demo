import {
  Drawer,
  Box,
  Typography,
  Slider,
  FormControlLabel,
  Checkbox,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const categories = [
  "Fresh Fruits",
  "Fresh Vegetables",
  "Dairy & Bakery",
  "Staples & Grains",
  "Snacks & Beverages",
  "Household Essentials",
];

function FilterPanel({
  open,
  onClose,
  isMobile,
  priceRange,
  onPriceChange,
  selectedCategories,
  onCategoryToggle,
  onResetFilters,
}) {
  const FilterContent = () => (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: "1.25rem",
            color: "#1a1a1a",
          }}
        >
          Filters
        </Typography>
        {isMobile && (
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      {/* Price Filter */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            mb: 2,
            color: "#1a1a1a",
          }}
        >
          Price Range
        </Typography>
        <Slider
          value={priceRange}
          onChange={(e, newValue) => onPriceChange(newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
          sx={{
            color: "#2e7d32",
            "& .MuiSlider-valueLabel": {
              backgroundColor: "#2e7d32",
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 1,
          }}
        >
          <Typography variant="body2" sx={{ color: "#666" }}>
            ₹{priceRange[0]}
          </Typography>
          <Typography variant="body2" sx={{ color: "#666" }}>
            ₹{priceRange[1]}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Category Filter */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            mb: 2,
            color: "#1a1a1a",
          }}
        >
          Categories
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {categories.map((category) => (
            <FormControlLabel
              key={category}
              control={
                <Checkbox
                  checked={selectedCategories.includes(category)}
                  onChange={() => onCategoryToggle(category)}
                  sx={{
                    color: "#2e7d32",
                    "&.Mui-checked": {
                      color: "#2e7d32",
                    },
                  }}
                />
              }
              label={
                <Typography
                  sx={{
                    fontSize: "0.9375rem",
                    color: "#1a1a1a",
                  }}
                >
                  {category}
                </Typography>
              }
            />
          ))}
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Reset Button */}
      <Button
        variant="outlined"
        fullWidth
        onClick={onResetFilters}
        sx={{
          borderColor: "#2e7d32",
          color: "#2e7d32",
          textTransform: "none",
          fontWeight: 600,
          "&:hover": {
            borderColor: "#1b5e20",
            backgroundColor: "rgba(46, 125, 50, 0.04)",
          },
        }}
      >
        Reset Filters
      </Button>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        anchor="bottom"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            maxHeight: "80vh",
          },
        }}
      >
        <FilterContent />
      </Drawer>
    );
  }

  return (
    <Box
      sx={{
        position: "sticky",
        top: { md: 80 },
        alignSelf: "flex-start",
        height: "fit-content",
        maxHeight: "calc(100vh - 100px)",
        overflowY: "auto",
        backgroundColor: "white",
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        zIndex: 10,
      }}
    >
      <FilterContent />
    </Box>
  );
}

export default FilterPanel;

