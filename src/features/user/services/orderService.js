// Order service functions

import { getCurrentUser } from "../../auth/services/authService";

/**
 * Get orders storage key for current user
 * @returns {string} Storage key
 */
const getOrdersStorageKey = () => {
  const user = getCurrentUser();
  if (!user) {
    return null;
  }
  return `orders_${user.id}`;
};

/**
 * Get all orders for current user
 * @returns {Array} Array of orders
 */
export const getOrders = () => {
  try {
    const storageKey = getOrdersStorageKey();
    if (!storageKey) {
      return [];
    }
    const ordersData = localStorage.getItem(storageKey);
    return ordersData ? JSON.parse(ordersData) : [];
  } catch (error) {
    console.error("Error getting orders:", error);
    return [];
  }
};

/**
 * Get a single order by ID for current user
 * @param {string} orderId - ID of the order
 * @returns {Object|null} Order object or null if not found
 */
export const getOrderById = (orderId) => {
  try {
    const orders = getOrders();
    return orders.find((order) => order.orderId === orderId) || null;
  } catch (error) {
    console.error("Error getting order by ID:", error);
    return null;
  }
};

/**
 * Add a new order for current user
 * @param {Object} orderData - Order data
 * @returns {Object} Created order
 */
export const addOrder = (orderData) => {
  try {
    const user = getCurrentUser();
    if (!user) {
      console.error("User must be logged in to place orders");
      return null;
    }

    const storageKey = getOrdersStorageKey();
    const orders = getOrders();

    const newOrder = {
      ...orderData,
      userId: user.id,
      user: user.name,
      createdAt: new Date().toISOString(),
    };

    orders.push(newOrder);
    localStorage.setItem(storageKey, JSON.stringify(orders));

    // Also store in global orders for admin dashboard (if needed)
    const allOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    allOrders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(allOrders));

    // Dispatch event to update UI
    window.dispatchEvent(new Event("ordersUpdated"));

    return newOrder;
  } catch (error) {
    console.error("Error adding order:", error);
    return null;
  }
};

/**
 * Get last order for current user (for order success page)
 * @returns {Object|null} Last order or null
 */
export const getLastOrder = () => {
  try {
    const orders = getOrders();
    if (orders.length === 0) {
      return null;
    }
    // Return the most recent order
    return orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
  } catch (error) {
    console.error("Error getting last order:", error);
    return null;
  }
};

