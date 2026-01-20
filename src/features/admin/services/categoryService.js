// Category service functions

const CATEGORIES_STORAGE_KEY = "categories";

// Default categories to initialize if none exist
const DEFAULT_CATEGORIES = [
  "Fresh Fruits",
  "Fresh Vegetables",
  "Dairy & Bakery",
  "Staples & Grains",
  "Snacks & Beverages",
  "Household Essentials",
];

/**
 * Get all categories from localStorage
 * @returns {Array} Array of category strings
 */
export const getCategories = () => {
  try {
    const categoriesData = localStorage.getItem(CATEGORIES_STORAGE_KEY);
    if (categoriesData) {
      return JSON.parse(categoriesData);
    }
    // Initialize with default categories if none exist
    initializeCategories();
    return DEFAULT_CATEGORIES;
  } catch (error) {
    console.error("Error getting categories:", error);
    return DEFAULT_CATEGORIES;
  }
};

/**
 * Initialize categories with default values if localStorage is empty
 */
export const initializeCategories = () => {
  try {
    const existingCategories = localStorage.getItem(CATEGORIES_STORAGE_KEY);
    if (!existingCategories) {
      localStorage.setItem(
        CATEGORIES_STORAGE_KEY,
        JSON.stringify(DEFAULT_CATEGORIES),
      );
    }
  } catch (error) {
    console.error("Error initializing categories:", error);
  }
};

/**
 * Add a new category
 * @param {string} categoryName - Name of the category to add
 * @returns {Array} Updated categories array
 */
export const addCategory = (categoryName) => {
  try {
    const categories = getCategories();
    const trimmedName = categoryName.trim();

    // Check if category already exists (case-insensitive)
    const exists = categories.some(
      (cat) => cat.toLowerCase() === trimmedName.toLowerCase(),
    );

    if (exists) {
      throw new Error("Category already exists");
    }

    if (!trimmedName) {
      throw new Error("Category name cannot be empty");
    }

    categories.push(trimmedName);
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
    window.dispatchEvent(new Event("categoriesUpdated"));
    return categories;
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
};

/**
 * Update an existing category
 * @param {string} oldName - Current name of the category
 * @param {string} newName - New name for the category
 * @returns {Array} Updated categories array
 */
export const updateCategory = (oldName, newName) => {
  try {
    const categories = getCategories();
    const trimmedNewName = newName.trim();

    if (!trimmedNewName) {
      throw new Error("Category name cannot be empty");
    }

    // Check if new name already exists (excluding the current one)
    const exists = categories.some(
      (cat) =>
        cat.toLowerCase() === trimmedNewName.toLowerCase() &&
        cat !== oldName,
    );

    if (exists) {
      throw new Error("Category name already exists");
    }

    const index = categories.findIndex((cat) => cat === oldName);
    if (index === -1) {
      throw new Error("Category not found");
    }

    categories[index] = trimmedNewName;
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));

    // Update all products with this category
    updateProductsCategory(oldName, trimmedNewName);

    window.dispatchEvent(new Event("categoriesUpdated"));
    return categories;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

/**
 * Delete a category
 * @param {string} categoryName - Name of the category to delete
 * @returns {Array} Updated categories array
 */
export const deleteCategory = (categoryName) => {
  try {
    const categories = getCategories();

    // Check if category is used by any products
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const isUsed = products.some(
      (product) => product.category === categoryName,
    );

    if (isUsed) {
      throw new Error(
        "Cannot delete category. It is being used by one or more products.",
      );
    }

    const filteredCategories = categories.filter(
      (cat) => cat !== categoryName,
    );
    localStorage.setItem(
      CATEGORIES_STORAGE_KEY,
      JSON.stringify(filteredCategories),
    );
    window.dispatchEvent(new Event("categoriesUpdated"));
    return filteredCategories;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

/**
 * Update all products that use the old category name to use the new name
 * @param {string} oldName - Old category name
 * @param {string} newName - New category name
 */
const updateProductsCategory = (oldName, newName) => {
  try {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const updatedProducts = products.map((product) => {
      if (product.category === oldName) {
        return { ...product, category: newName };
      }
      return product;
    });
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    window.dispatchEvent(new Event("productsUpdated"));
  } catch (error) {
    console.error("Error updating products category:", error);
  }
};

