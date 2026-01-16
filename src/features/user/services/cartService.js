// Cart service functions

import { getCurrentUser } from "../../auth/services/authService";
import { getProductById } from "../../admin/services/productService";

/**
 * Get cart storage key for current user
 * @returns {string} Storage key
 */
const getCartStorageKey = () => {
  const user = getCurrentUser();
  if (!user) {
    // Return a default key for non-authenticated users (they won't be able to use cart)
    return "grocery_cart_guest";
  }
  return `grocery_cart_${user.id}`;
};

/**
 * Get all items from cart for current user
 * @returns {Array} Array of cart items
 */
export const getCart = () => {
  try {
    const storageKey = getCartStorageKey();
    const cartData = localStorage.getItem(storageKey);
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
    const user = getCurrentUser();
    if (!user) {
      console.warn("User must be logged in to add items to cart");
      return [];
    }

    // Check stock availability
    const currentProduct = getProductById(product.id);
    const availableStock = currentProduct?.stock ?? product.stock ?? 0;

    if (availableStock === 0) {
      console.warn("Product is out of stock");
      return getCart();
    }

    const storageKey = getCartStorageKey();
    const cart = getCart();
    const existingItemIndex = cart.findIndex((item) => item.id === product.id);

    if (existingItemIndex >= 0) {
      // Item exists, check if we can add more
      const currentQuantity = cart[existingItemIndex].quantity;
      const newTotalQuantity = currentQuantity + quantity;
      
      if (newTotalQuantity > availableStock) {
        // Limit to available stock
        cart[existingItemIndex].quantity = availableStock;
        console.warn(`Limited quantity to available stock: ${availableStock}`);
      } else {
        cart[existingItemIndex].quantity = newTotalQuantity;
      }
    } else {
      // New item, check if quantity doesn't exceed stock
      const quantityToAdd = Math.min(quantity, availableStock);
      cart.push({
        ...product,
        quantity: quantityToAdd,
      });
      
      if (quantity > availableStock) {
        console.warn(`Limited quantity to available stock: ${availableStock}`);
      }
    }

    localStorage.setItem(storageKey, JSON.stringify(cart));
    // Dispatch event to update UI
    window.dispatchEvent(new Event("cartUpdated"));
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
    const storageKey = getCartStorageKey();
    const cart = getCart();
    const updatedCart = cart.filter((item) => item.id !== productId);
    localStorage.setItem(storageKey, JSON.stringify(updatedCart));
    // Dispatch event to update UI
    window.dispatchEvent(new Event("cartUpdated"));
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

    const storageKey = getCartStorageKey();
    const cart = getCart();
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    );
    localStorage.setItem(storageKey, JSON.stringify(updatedCart));
    // Dispatch event to update UI
    window.dispatchEvent(new Event("cartUpdated"));
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
    // Check stock availability
    const product = getProductById(productId);
    const availableStock = product?.stock ?? 0;

    const storageKey = getCartStorageKey();
    const cart = getCart();
    const item = cart.find((item) => item.id === productId);
    
    if (!item) {
      return cart;
    }

    // Check if we can increase quantity
    if (item.quantity >= availableStock) {
      console.warn(`Cannot increase quantity. Only ${availableStock} items available.`);
      return cart;
    }

    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    localStorage.setItem(storageKey, JSON.stringify(updatedCart));
    // Dispatch event to update UI
    window.dispatchEvent(new Event("cartUpdated"));
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
    const storageKey = getCartStorageKey();
    const cart = getCart();
    const item = cart.find((item) => item.id === productId);
    
    if (!item) return cart;
    
    if (item.quantity <= 1) {
      return removeFromCart(productId);
    }

    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
    );
    localStorage.setItem(storageKey, JSON.stringify(updatedCart));
    // Dispatch event to update UI
    window.dispatchEvent(new Event("cartUpdated"));
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
    const storageKey = getCartStorageKey();
    localStorage.setItem(storageKey, JSON.stringify([]));
    // Dispatch event to update UI
    window.dispatchEvent(new Event("cartUpdated"));
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
