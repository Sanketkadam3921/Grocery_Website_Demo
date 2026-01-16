// Auth service functions

const USERS_STORAGE_KEY = "users";
const CURRENT_USER_STORAGE_KEY = "currentUser";

/**
 * Get all users from localStorage
 * @returns {Array} Array of users
 */
export const getUsers = () => {
  try {
    const usersData = localStorage.getItem(USERS_STORAGE_KEY);
    return usersData ? JSON.parse(usersData) : [];
  } catch (error) {
    console.error("Error getting users:", error);
    return [];
  }
};

/**
 * Get current logged in user
 * @returns {Object|null} Current user object or null
 */
export const getCurrentUser = () => {
  try {
    const userData = localStorage.getItem(CURRENT_USER_STORAGE_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

/**
 * Sign up a new user
 * @param {Object} userData - User data (name, email, password)
 * @returns {Object} { success: boolean, message: string, user?: Object }
 */
export const signup = (userData) => {
  try {
    const { name, email, password } = userData;

    // Validation
    if (!name || !email || !password) {
      return {
        success: false,
        message: "All fields are required",
      };
    }

    if (password.length < 6) {
      return {
        success: false,
        message: "Password must be at least 6 characters long",
      };
    }

    // Check if email already exists
    const users = getUsers();
    const existingUser = users.find((u) => u.email === email.toLowerCase().trim());

    if (existingUser) {
      return {
        success: false,
        message: "Email already registered. Please login instead.",
      };
    }

    // Create new user
    const newUser = {
      id: Date.now(), // Simple ID generation
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: password, // In production, this should be hashed
      createdAt: new Date().toISOString(),
    };

    // Save user
    users.push(newUser);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

    // Auto login after signup (exclude password)
    const userWithoutPassword = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };
    localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(userWithoutPassword));
    // Dispatch event to update UI
    window.dispatchEvent(new Event("authStateChanged"));

    return {
      success: true,
      message: "Account created successfully!",
      user: userWithoutPassword,
    };
  } catch (error) {
    console.error("Error signing up:", error);
    return {
      success: false,
      message: "Failed to create account. Please try again.",
    };
  }
};

/**
 * Login user
 * @param {Object} credentials - Login credentials (email, password)
 * @returns {Object} { success: boolean, message: string, user?: Object }
 */
export const login = (credentials) => {
  try {
    const { email, password } = credentials;

    // Validation
    if (!email || !password) {
      return {
        success: false,
        message: "Email and password are required",
      };
    }

    // Find user
    const users = getUsers();
    const user = users.find(
      (u) => u.email === email.toLowerCase().trim() && u.password === password
    );

    if (!user) {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }

    // Set current user (exclude password)
    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(userWithoutPassword));
    // Dispatch event to update UI
    window.dispatchEvent(new Event("authStateChanged"));

    return {
      success: true,
      message: "Login successful!",
      user: userWithoutPassword,
    };
  } catch (error) {
    console.error("Error logging in:", error);
    return {
      success: false,
      message: "Failed to login. Please try again.",
    };
  }
};

/**
 * Logout user
 */
export const logout = () => {
  try {
    localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
    // Dispatch event to update UI
    window.dispatchEvent(new Event("authStateChanged"));
    return { success: true };
  } catch (error) {
    console.error("Error logging out:", error);
    return { success: false };
  }
};

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return getCurrentUser() !== null;
};
