// Admin authentication service

const ADMIN_STORAGE_KEY = "adminUser";

// Hardcoded admin credentials
const ADMIN_EMAIL = "admin@grocery.com";
const ADMIN_PASSWORD = "admin123";

/**
 * Login admin
 * @param {Object} credentials - Login credentials (email, password)
 * @returns {Object} { success: boolean, message: string, admin?: Object }
 */
export const adminLogin = (credentials) => {
  try {
    const { email, password } = credentials;

    // Validation
    if (!email || !password) {
      return {
        success: false,
        message: "Email and password are required",
      };
    }

    // Check credentials against hardcoded admin
    if (
      email.toLowerCase().trim() === ADMIN_EMAIL &&
      password === ADMIN_PASSWORD
    ) {
      // Set admin user
      const adminUser = {
        email: ADMIN_EMAIL,
        role: "admin",
      };
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminUser));
      // Dispatch event to update UI
      window.dispatchEvent(new Event("adminAuthStateChanged"));

      return {
        success: true,
        message: "Login successful!",
        admin: adminUser,
      };
    }

    return {
      success: false,
      message: "Invalid email or password",
    };
  } catch (error) {
    console.error("Error logging in admin:", error);
    return {
      success: false,
      message: "Failed to login. Please try again.",
    };
  }
};

/**
 * Logout admin
 */
export const adminLogout = () => {
  try {
    localStorage.removeItem(ADMIN_STORAGE_KEY);
    // Dispatch event to update UI
    window.dispatchEvent(new Event("adminAuthStateChanged"));
    return { success: true };
  } catch (error) {
    console.error("Error logging out admin:", error);
    return { success: false };
  }
};

/**
 * Get current admin user
 * @returns {Object|null} Current admin user or null
 */
export const getCurrentAdmin = () => {
  try {
    const adminData = localStorage.getItem(ADMIN_STORAGE_KEY);
    return adminData ? JSON.parse(adminData) : null;
  } catch (error) {
    console.error("Error getting current admin:", error);
    return null;
  }
};

/**
 * Check if admin is authenticated
 * @returns {boolean}
 */
export const isAdminAuthenticated = () => {
  return getCurrentAdmin() !== null;
};




