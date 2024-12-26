import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../auth-slice/api"; // Use the custom axio instance

const initialState = {
  addressList: [],
  isLoading: false,
};




export const addNewAddress = createAsyncThunk(
  "/addresses/addNewAddress",
  async (formData) => {
    const response = await api.post(
      `/shop/address/add`,
      formData
    );

    return response.data;
  }
);
export const fetchAllAddress = createAsyncThunk(
  "/addresses/fetchAllAddress",
  async (userId) => {
    const response = await api.get(
      `/shop/address/get/${userId}`
    );

    return response.data;
  }
);
export const editAddress = createAsyncThunk(
  "/addresses/editAddress",
  async ({ userId, addressId, formData }) => {
    const response = await api.put(
      `/shop/address/update/${userId}/${addressId}`,
      formData
    );

    return response.data;
  }
);
export const deleteAddress = createAsyncThunk(
  "/addresses/deleteAddress",
  async ({ userId, addressId }) => {
    const response = await api.delete(
      `/shop/address/delete/${userId}/${addressId}`
    );

    return response.data;
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.isLoading = false;
       
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
       
      })
      .addCase(fetchAllAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAllAddress.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      })
      
  },
});


export default addressSlice.reducer;