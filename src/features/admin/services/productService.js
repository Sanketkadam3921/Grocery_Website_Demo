// Product service functions

const PRODUCTS_STORAGE_KEY = "products";

/**
 * Get all products from localStorage
 * @returns {Array} Array of products
 */
export const getProducts = () => {
  try {
    const productsData = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    return productsData ? JSON.parse(productsData) : [];
  } catch (error) {
    console.error("Error getting products:", error);
    return [];
  }
};

/**
 * Get a single product by ID
 * @param {number} productId - ID of the product
 * @returns {Object|null} Product object or null if not found
 */
export const getProductById = (productId) => {
  try {
    const products = getProducts();
    return products.find((product) => product.id === productId) || null;
  } catch (error) {
    console.error("Error getting product by ID:", error);
    return null;
  }
};

/**
 * Add a new product
 * @param {Object} product - Product object to add
 * @returns {Array} Updated products array
 */
export const addProduct = (product) => {
  try {
    const products = getProducts();
    // Generate new ID if not provided
    const newId = product.id || Math.max(...products.map((p) => p.id || 0), 0) + 1;
    const newProduct = {
      ...product,
      id: newId,
      stock: product.stock || 0, // Default stock to 0 if not provided
      status: product.status || "active", // Default status to active
    };
    products.push(newProduct);
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    // Dispatch event to update UI in other tabs/components
    window.dispatchEvent(new Event("productsUpdated"));
    return products;
  } catch (error) {
    console.error("Error adding product:", error);
    return getProducts();
  }
};

/**
 * Update an existing product
 * @param {number} productId - ID of the product to update
 * @param {Object} updates - Object with fields to update
 * @returns {Array} Updated products array
 */
export const updateProduct = (productId, updates) => {
  try {
    const products = getProducts();
    const productIndex = products.findIndex((p) => p.id === productId);
    
    if (productIndex === -1) {
      console.error("Product not found");
      return products;
    }
    
    products[productIndex] = {
      ...products[productIndex],
      ...updates,
    };
    
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    // Dispatch event to update UI in other tabs/components
    window.dispatchEvent(new Event("productsUpdated"));
    return products;
  } catch (error) {
    console.error("Error updating product:", error);
    return getProducts();
  }
};

/**
 * Delete a product
 * @param {number} productId - ID of the product to delete
 * @returns {Array} Updated products array
 */
export const deleteProduct = (productId) => {
  try {
    const products = getProducts();
    const filteredProducts = products.filter((p) => p.id !== productId);
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(filteredProducts));
    // Dispatch event to update UI in other tabs/components
    window.dispatchEvent(new Event("productsUpdated"));
    return filteredProducts;
  } catch (error) {
    console.error("Error deleting product:", error);
    return getProducts();
  }
};

/**
 * Update product stock when an order is placed
 * @param {Array} orderItems - Array of cart items with id and quantity
 * @returns {Array} Updated products array
 */
export const updateProductStockOnOrder = (orderItems) => {
  try {
    const products = getProducts();
    let hasUpdates = false;

    // Update stock for each item in the order
    orderItems.forEach((orderItem) => {
      const productIndex = products.findIndex((p) => p.id === orderItem.id);
      
      if (productIndex !== -1) {
        const currentStock = products[productIndex].stock || 0;
        const orderedQuantity = orderItem.quantity || 1;
        
        // Reduce stock, but don't go below 0
        const newStock = Math.max(0, currentStock - orderedQuantity);
        products[productIndex].stock = newStock;
        hasUpdates = true;
      } else {
        console.warn(`Product with ID ${orderItem.id} not found in products list`);
      }
    });

    if (hasUpdates) {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
      // Dispatch event to update UI in other tabs/components
      window.dispatchEvent(new Event("productsUpdated"));
    }

    return products;
  } catch (error) {
    console.error("Error updating product stock on order:", error);
    return getProducts();
  }
};

/**
 * Initialize products with mock data if localStorage is empty
 * @param {Array} mockProducts - Array of mock products to initialize with
 */
export const initializeProducts = (mockProducts = []) => {
  try {
    const existingProducts = getProducts();
    if (existingProducts.length === 0 && mockProducts.length > 0) {
      // Add stock field to products if missing (default to 10)
      const productsWithStock = mockProducts.map((product) => ({
        ...product,
        stock: product.stock !== undefined ? product.stock : 10,
        status: product.status || "active",
      }));
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(productsWithStock));
      return productsWithStock;
    }
    return existingProducts;
  } catch (error) {
    console.error("Error initializing products:", error);
    return [];
  }
};
