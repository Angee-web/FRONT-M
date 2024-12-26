import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: [],
  user: null, // Holds user info if logged in
  guestId: localStorage.getItem("guestId") || null,
  isLoading: false,
  error: null,
};

// Helper function to get the guestId or userId
const getAuthId = (user) => {
  if (user) return { userId: user.id }; // Use user ID if authenticated
  let guestId = localStorage.getItem("guestId");
  if (!guestId) {
    guestId = crypto.randomUUID();
    localStorage.setItem("guestId", guestId);
  }
  return { guestId };
};

// Add to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }, { getState, rejectWithValue }) => {
    const { user, guestId } = getState().cart; // Get user and guestId from the state
    const authId = getAuthId(user);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/shop/cart/add",
        {
          ...authId,
          productId,
          quantity,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch cart items
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (_, { getState, rejectWithValue }) => {
    const { user, guestId } = getState().cart;
    const authId = getAuthId(user);

    try {
      const response = await axios.get("http://localhost:5000/api/shop/cart/get", {
        params: authId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update cart item quantity
export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ productId, quantity }, { getState, rejectWithValue }) => {
    const { user, guestId } = getState().cart;
    const authId = getAuthId(user);

    try {
      const response = await axios.put(
        "http://localhost:5000/api/shop/cart/update-cart",
        {
          ...authId,
          productId,
          quantity,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete cart item
export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ productId }, { getState, rejectWithValue }) => {
    const { user, guestId } = getState().cart;
    const authId = getAuthId(user);

    try {
      const response = await axios.delete(
        "http://localhost:5000/api/shop/cart/delete-cart-item",
        {
          data: { ...authId, productId },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // Update the user when they log in
      if (state.guestId) {
        localStorage.removeItem("guestId"); // Clear guestId once the user logs in
        state.guestId = null;
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.guestId = null;
      state.user = null;
      localStorage.removeItem("guestId");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data.items;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to add item to cart.";
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data.items;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch cart items.";
      })
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data.items;
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to update item quantity.";
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data.items;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to delete cart item.";
      });
  },
});

export const { setUser, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
