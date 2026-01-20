import { useState, useEffect, useRef } from "react";
import {
  Drawer,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  Divider,
  IconButton,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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

const priceRanges = [
  { label: "Under ₹100", min: 0, max: 100 },
  { label: "₹100 - ₹500", min: 100, max: 500 },
  { label: "₹500 - ₹1000", min: 500, max: 1000 },
  { label: "Above ₹1000", min: 1000, max: 10000 },
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
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const isDraggingRef = useRef(false);

  // Find matching price range on mount or when priceRange changes
  useEffect(() => {
    const matchingRange = priceRanges.find(
      (range) => range.min === priceRange[0] && range.max === priceRange[1],
    );
    setSelectedPriceRange(matchingRange ? matchingRange.label : null);
  }, [priceRange]);

  const handlePriceRangeClick = (range) => {
    setSelectedPriceRange(range.label);
    onPriceChange([range.min, range.max]);

    // Auto-close drawer on mobile after selection
    if (isMobile) {
      setTimeout(() => onClose(), 300);
    }
  };

  const handleResetFilters = () => {
    isDraggingRef.current = false;
    setSelectedPriceRange(null);
    onResetFilters();
  };

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

        {/* Price Range Buttons */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          {priceRanges.map((range) => (
            <Button
              key={range.label}
              variant={
                selectedPriceRange === range.label ? "contained" : "outlined"
              }
              onClick={() => handlePriceRangeClick(range)}
              sx={{
                justifyContent: "flex-start",
                textTransform: "none",
                fontWeight: 500,
                py: 1.25,
                px: 2,
                borderColor:
                  selectedPriceRange === range.label ? "#2e7d32" : "#e0e0e0",
                backgroundColor:
                  selectedPriceRange === range.label
                    ? "#2e7d32"
                    : "transparent",
                color: selectedPriceRange === range.label ? "white" : "#1a1a1a",
                "&:hover": {
                  borderColor: "#2e7d32",
                  backgroundColor:
                    selectedPriceRange === range.label
                      ? "#1b5e20"
                      : "rgba(46, 125, 50, 0.04)",
                },
              }}
            >
              {range.label}
            </Button>
          ))}
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
        onClick={handleResetFilters}
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
        top: { md: 90 },
        alignSelf: "flex-start",
        height: "fit-content",
        maxHeight: "calc(100vh - 100px)",
        overflowY: "auto",
        overflowX: "hidden",
        backgroundColor: "white",
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        zIndex: 10,
        width: "100%",
      }}
    >
      <FilterContent />
    </Box>
  );
}

export default FilterPanel;
