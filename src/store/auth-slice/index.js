import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as jwt_decode from "jwt-decode";

// Initial state
const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

// Helper function to initialize state
const initializeAuthState = () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decoded = jwt_decode(token); // Decode token to extract user info
      const isTokenExpired = decoded.exp * 1000 < Date.now(); // Check expiration
      if (!isTokenExpired) {
        return {
          isAuthenticated: true,
          isLoading: false,
          user: decoded, // Assume token contains user info like id, email, etc.
        };
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }
  return { ...initialState, isLoading: false }; // Default to unauthenticated state
};

// Register user
export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://server-xbzz.onrender.com/api/auth/register",
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "An error occurred during registration"
      );
    }
  }
);

// Login user
export const loginUser = createAsyncThunk(
  "/auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://server-xbzz.onrender.com/api/auth/login",
        formData
      );
      localStorage.setItem("token", response.data.token); // Store token on login
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "An error occurred during login"
      );
    }
  }
);

// Logout user
export const logoutUser = createAsyncThunk(
  "/auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://server-xbzz.onrender.com/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      localStorage.removeItem("token"); // Clear token on logout
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "An error occurred during logout"
      );
    }
  }
);

// Check if user is authenticated
export const checkAuth = createAsyncThunk(
  "/auth/checkauth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://server-xbzz.onrender.com/api/auth/check-auth",
        {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Expires: 0,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        if (window.location.pathname !== "/auth/login") {
          window.location.href = "/auth/login"; // Match your login route
        }
        return rejectWithValue("Unauthorized");
      }
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

// Forgot Password
export const forgotPassword = createAsyncThunk(
  "/auth/forgot-password",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://server-xbzz.onrender.com/api/auth/forgot-password",
        { email },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "An unexpected error occurred"
      );
    }
  }
);

// Reset Password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ email, otp, newPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://server-xbzz.onrender.com/api/auth/reset-password",
        { email, otp, newPassword }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to reset password."
      );
    }
  }
);

// Verify OTP
export const verifyOtp = createAsyncThunk(
  "/auth/verify-otp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://server-xbzz.onrender.com/api/auth/verify-otp",
        { email, otp },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "An unexpected error occurred"
      );
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: initializeAuthState(),
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    clearAuthState: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = true;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser, clearAuthState } = authSlice.actions;

export default authSlice.reducer;
