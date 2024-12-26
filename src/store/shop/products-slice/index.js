// //My shopping slice

import api from "../../auth-slice/api"; // Use the custom Axios instance
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
  error: null, // Add error state to track potential errors
};




// This is to fetch all products or filtered by category
// export const fetchAllFilteredProducts = createAsyncThunk(
//   "/products/fetchAllProducts",
//   async (category = "") => {
//     const result = await axios.get("http://localhost:5000/api/shop/products/get", {
//       params: { category }, // Send the category as a query parameter
//     });
//     return result?.data; // Return the data to be stored in the state
//   }
// );

export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async ({ category = "", sort = "", limit = "" }) => {
    const result = await api.get(
     `/shop/products/get`,
      {
        params: { category, sort, limit }, // Send both category and sort as query parameters
      }
    );
    return result?.data; // Return the data to be stored in the state
  }
);
export const fetchProductDetails = createAsyncThunk(
  "/products/fetchProductDetails",
  async (id) => {
    const result = await api.get(
     `/shop/products/get/${id}`,
    );
    return result?.data; // Return the data to be stored in the state
  }
);

const shoppingProductSlice = createSlice({
  name: "shoppingProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data; // Store the fetched products
      })
      .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
        state.error = action.error.message; // Capture any errors
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data; // Store the fetched products
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.productDetails = null;
        state.error = action.error.message; // Capture any errors
      });
  },
});

export default shoppingProductSlice.reducer;
