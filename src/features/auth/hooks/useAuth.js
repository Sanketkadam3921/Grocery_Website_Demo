import { useState, useEffect } from "react";
import { getCurrentUser, logout as logoutService } from "../services/authService";

/**
 * Custom hook for managing authentication state
 * @returns {Object} { user, isAuthenticated, logout, refreshUser }
 */
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage on mount
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);

    // Listen for storage changes (for multi-tab support)
    const handleStorageChange = () => {
      const updatedUser = getCurrentUser();
      setUser(updatedUser);
    };

    window.addEventListener("storage", handleStorageChange);
    // Also listen for custom event for same-tab updates
    window.addEventListener("authStateChanged", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("authStateChanged", handleStorageChange);
    };
  }, []);

  const logout = () => {
    logoutService();
    setUser(null);
    // Dispatch event to update other components
    window.dispatchEvent(new Event("authStateChanged"));
  };

  const refreshUser = () => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    window.dispatchEvent(new Event("authStateChanged"));
  };

  return {
    user,
    isAuthenticated: user !== null,
    loading,
    logout,
    refreshUser,
  };
};
