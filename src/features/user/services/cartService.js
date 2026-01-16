// Cart service functions

const CART_STORAGE_KEY = "grocery_cart";

/**
 * Get all items from cart
 * @returns {Array} Array of cart items
 */
export const getCart = () => {
  try {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error("Error getting cart:", error);
    return [];
  }
};

/**
 * Add item to cart or update quantity if item already exists
 * @param {Object} product - Product object to add
 * @param {number} quantity - Quantity to add (default: 1)
 * @returns {Array} Updated cart array
 */
export const addToCart = (product, quantity = 1) => {
  try {
    const cart = getCart();
    const existingItemIndex = cart.findIndex((item) => item.id === product.id);

    if (existingItemIndex >= 0) {
      // Item exists, update quantity
      cart[existingItemIndex].quantity += quantity;
    } else {
      // New item, add to cart
      cart.push({
        ...product,
        quantity: quantity,
      });
    }

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    return cart;
  } catch (error) {
    console.error("Error adding to cart:", error);
    return getCart();
  }
};

/**
 * Remove item from cart
 * @param {number} productId - ID of product to remove
 * @returns {Array} Updated cart array
 */
export const removeFromCart = (productId) => {
  try {
    const cart = getCart();
    const updatedCart = cart.filter((item) => item.id !== productId);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
    return updatedCart;
  } catch (error) {
    console.error("Error removing from cart:", error);
    return getCart();
  }
};

/**
 * Update quantity of an item in cart
 * @param {number} productId - ID of product to update
 * @param {number} quantity - New quantity (must be >= 1)
 * @returns {Array} Updated cart array
 */
export const updateCartItemQuantity = (productId, quantity) => {
  try {
    if (quantity < 1) {
      return removeFromCart(productId);
    }

    const cart = getCart();
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    );
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
    return updatedCart;
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    return getCart();
  }
};

/**
 * Increase quantity of an item by 1
 * @param {number} productId - ID of product
 * @returns {Array} Updated cart array
 */
export const increaseQuantity = (productId) => {
  try {
    const cart = getCart();
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
    return updatedCart;
  } catch (error) {
    console.error("Error increasing quantity:", error);
    return getCart();
  }
};

/**
 * Decrease quantity of an item by 1
 * @param {number} productId - ID of product
 * @returns {Array} Updated cart array
 */
export const decreaseQuantity = (productId) => {
  try {
    const cart = getCart();
    const item = cart.find((item) => item.id === productId);
    
    if (!item) return cart;
    
    if (item.quantity <= 1) {
      return removeFromCart(productId);
    }

    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
    );
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
    return updatedCart;
  } catch (error) {
    console.error("Error decreasing quantity:", error);
    return getCart();
  }
};

/**
 * Clear all items from cart
 * @returns {Array} Empty cart array
 */
export const clearCart = () => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([]));
    return [];
  } catch (error) {
    console.error("Error clearing cart:", error);
    return [];
  }
};

/**
 * Get total number of items in cart
 * @returns {number} Total quantity of all items
 */
export const getCartItemCount = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
};

/**
 * Get total price of all items in cart
 * @returns {number} Total price
 */
export const getCartTotal = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};
