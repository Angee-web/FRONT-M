import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../auth-slice/api"; // Use the custom Axios instance

//This is my redux file for adding products, deleting products, editing products and fetching all products
const initialState = {
  productList: [],
  isLoading: false,
  error: null,
};


//This to add a new product
export const addNewProduct = createAsyncThunk(
  "/products/addNewProduct",
  async (formData) => {
    const result = await api.post(
      `/admin/products/add`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

//This is to fetch all products
export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async (formData) => {
    const result = await api.get(
      `/admin/products/get`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

//This is to edit a product
export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async ({ id, formData }) => {
    const result = await api.put(
      `/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

//This is to delete a product
export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    const result = await api.delete(`/admin/products/delete/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result?.data;
  }
);


const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.productList = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
        state.error = action.error;
      });
  },
});

export default AdminProductsSlice.reducer;
