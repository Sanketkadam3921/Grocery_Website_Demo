import { useState, useMemo, useRef, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  Pagination,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import ProductCard from "./components/ProductCard";
import FilterPanel from "./components/FilterPanel";
import { mockProducts } from "./data/mockProducts";
import { addToCart } from "../../services/cartService";
import { getProducts, initializeProducts } from "../../../admin/services/productService";
import { useAuth } from "../../../auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const PRODUCTS_PER_PAGE = 40;

function Products() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const isFirstRender = useRef(true);

  // Initialize products from localStorage or use mock data
  useEffect(() => {
    // Initialize with mockProducts if localStorage is empty
    initializeProducts(mockProducts);
    // Load products from localStorage
    const allProducts = getProducts();
    setProducts(allProducts);

    // Listen for storage changes to update products list
    const handleStorageChange = () => {
      const updatedProducts = getProducts();
      setProducts(updatedProducts);
    };
    window.addEventListener("storage", handleStorageChange);
    // Also listen for custom event for same-tab updates
    window.addEventListener("productsUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("productsUpdated", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Reset to first page when filters change
    setCurrentPage(1);

    // Scroll to top of the page when filters change
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [selectedCategories, priceRange]);

  const handlePriceChange = (newValue) => {
    setPriceRange(newValue);
  };

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleResetFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedCategories([]);
  };

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    addToCart(product, 1);
    // Dispatch custom event to update cart badge in Nav
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Filter products based on selected filters
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesCategory && matchesPrice;
    });
  }, [products, selectedCategories, priceRange]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  const showPagination = filteredProducts.length > PRODUCTS_PER_PAGE;

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const activeFiltersCount =
    selectedCategories.length +
    (priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0);

  return (
    <Box
      sx={{
        backgroundColor: "#fafafa",
        minHeight: "100vh",
        pb: 4,
      }}
    >
      <Container maxWidth="lg" sx={{ pt: { xs: 2, md: 4 } }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1.5rem", md: "2rem" },
              color: "#1a1a1a",
            }}
          >
            All Products
          </Typography>

          {/* Mobile Filter Button */}
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={() => setFilterDrawerOpen(true)}
            sx={{
              display: { xs: "flex", md: "none" },
              borderColor: "#2e7d32",
              color: "#2e7d32",
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "8px",
              "&:hover": {
                borderColor: "#1b5e20",
                backgroundColor: "rgba(46, 125, 50, 0.04)",
              },
            }}
          >
            Filters
            {activeFiltersCount > 0 && (
              <Chip
                label={activeFiltersCount}
                size="small"
                sx={{
                  ml: 1,
                  height: 20,
                  backgroundColor: "#2e7d32",
                  color: "white",
                  fontSize: "0.75rem",
                }}
              />
            )}
          </Button>
        </Box>

        {/* Active Filters Display */}
        <Box
          sx={{
            minHeight: 48,
            display: "flex",
            gap: 1,
            mb: 3,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {activeFiltersCount > 0 && (
            <>
              {selectedCategories.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  onDelete={() => handleCategoryToggle(category)}
                  sx={{
                    backgroundColor: "#e8f5e9",
                    color: "#2e7d32",
                    fontWeight: 500,
                  }}
                />
              ))}

              {(priceRange[0] > 0 || priceRange[1] < 1000) && (
                <Chip
                  label={`₹${priceRange[0]} - ₹${priceRange[1]}`}
                  onDelete={() => setPriceRange([0, 1000])}
                  sx={{
                    backgroundColor: "#e8f5e9",
                    color: "#2e7d32",
                    fontWeight: 500,
                  }}
                />
              )}
            </>
          )}
        </Box>

        {/* Main Layout: Flexbox Container */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            alignItems: "flex-start",
          }}
        >
          {/* Left Sidebar: Filter Panel (Desktop only) */}
          <Box
            sx={{
              width: "280px",
              display: { xs: "none", md: "block" },
              flexShrink: 0,
              position: "sticky",
              top: 96, // adjust based on navbar height
              height: "fit-content",
            }}
          >
            <FilterPanel
              isMobile={false}
              priceRange={priceRange}
              onPriceChange={handlePriceChange}
              selectedCategories={selectedCategories}
              onCategoryToggle={handleCategoryToggle}
              onResetFilters={handleResetFilters}
            />
          </Box>

          {/* Right Content: Products Section */}
          <Box
            sx={{
              flex: 1,
              minWidth: 0, // Prevents flex item from overflowing
            }}
          >
            {filteredProducts.length === 0 ? (
              <Box
                sx={{
                  textAlign: "center",
                  py: 8,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#666",
                    mb: 2,
                  }}
                >
                  No products found
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#999",
                  }}
                >
                  Try adjusting your filters
                </Typography>
              </Box>
            ) : (
              <>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                    mb: 2,
                  }}
                >
                  Showing{" "}
                  {showPagination
                    ? `${startIndex + 1}-${Math.min(
                        endIndex,
                        filteredProducts.length
                      )}`
                    : filteredProducts.length}{" "}
                  of {filteredProducts.length} product(s)
                </Typography>
                {/* CSS Grid for Product Cards */}
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "repeat(2, 1fr)",
                      sm: "repeat(3, 1fr)",
                      md: "repeat(4, 1fr)",
                      xl: "repeat(4, 1fr)",
                    },
                    gap: 2,
                    mb: 4,
                  }}
                >
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </Box>

                {/* Pagination */}
                {showPagination && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mt: 4,
                    }}
                  >
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={handlePageChange}
                      sx={{
                        "& .MuiPaginationItem-root": {
                          color: "#2e7d32",
                          fontSize: { xs: "0.875rem", md: "1rem" },
                          "&.Mui-selected": {
                            backgroundColor: "#2e7d32",
                            color: "white",
                            fontWeight: 600,
                            "&:hover": {
                              backgroundColor: "#1b5e20",
                            },
                          },
                          "&:hover": {
                            backgroundColor: "rgba(46, 125, 50, 0.08)",
                          },
                          "&.Mui-disabled": {
                            opacity: 0.5,
                          },
                        },
                      }}
                    />
                  </Box>
                )}
              </>
            )}
          </Box>
        </Box>

        {/* Mobile Filter Drawer */}
        <FilterPanel
          open={filterDrawerOpen}
          onClose={() => setFilterDrawerOpen(false)}
          isMobile={true}
          priceRange={priceRange}
          onPriceChange={handlePriceChange}
          selectedCategories={selectedCategories}
          onCategoryToggle={handleCategoryToggle}
          onResetFilters={handleResetFilters}
        />
      </Container>
    </Box>
  );
}

export default Products;
