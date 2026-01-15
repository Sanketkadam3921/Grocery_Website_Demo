import { useState, useEffect, useRef } from "react";
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
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);
  const isDraggingRef = useRef(false);

  // Sync local state only when panel opens (mobile) or on mount (desktop) or when reset is clicked
  useEffect(() => {
    if (!isDraggingRef.current) {
      setLocalPriceRange(priceRange);
    }
  }, [priceRange, open]);

  const handleSliderChange = (event, newValue) => {
    isDraggingRef.current = true;
    setLocalPriceRange(newValue);
  };

  const handleApplyFilters = () => {
    isDraggingRef.current = false;

    // Validate values
    const minValue = Math.max(0, localPriceRange[0]);
    const maxValue = Math.min(1000, Math.max(minValue, localPriceRange[1]));

    // Update local state with validated values
    setLocalPriceRange([minValue, maxValue]);

    // Apply filters
    onPriceChange([minValue, maxValue]);
  };

  const handleResetFilters = () => {
    isDraggingRef.current = false;
    onResetFilters();
    // Local state will sync via useEffect when priceRange updates
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
        <Slider
          value={localPriceRange}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
          sx={{
            color: "#2e7d32",
            mb: 2,
            "& .MuiSlider-valueLabel": {
              backgroundColor: "#2e7d32",
            },
            "& .MuiSlider-thumb": {
              "&:hover": {
                boxShadow: "0 0 0 8px rgba(46, 125, 50, 0.16)",
              },
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: "#666" }}>
            ₹{localPriceRange[0]}
          </Typography>
          <Typography variant="body2" sx={{ color: "#666" }}>
            ₹{localPriceRange[1]}
          </Typography>
        </Box>

        {/* Apply Filters Button */}
        <Button
          variant="contained"
          fullWidth
          onClick={handleApplyFilters}
          sx={{
            backgroundColor: "#2e7d32",
            color: "white",
            textTransform: "none",
            fontWeight: 600,
            py: 1.25,
            "&:hover": {
              backgroundColor: "#1b5e20",
            },
          }}
        >
          Apply Filters
        </Button>
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
