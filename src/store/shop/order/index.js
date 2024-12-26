import api from "../../auth-slice/api"; // Use the custom Axios instance

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  orderId: null, // Stores the order details
  paymentUrl: null, // Stores the Paystack payment URL
  orderList: [],
  orderDetails: null,
  isLoading: false,
};




export const createNewOrder = createAsyncThunk(
  "order/createNewOrder",
  async (orderData) => {
    const response = await api.post(
      `/shop/order/create`,
      orderData
    );
    return response.data;
  }
);
export const capturePayment = createAsyncThunk(
  "/order/capturePayment",
  async ({ reference, orderId }) => {
    const response = await api.post(
      `/shop/order/verify`,
      {
        reference,
        orderId,
      }
    );
    return response.data;
  }
);
export const getAllOrdersByUserId = createAsyncThunk(
  "/order/getAllOrdersByUserId",
  async (userId) => {
    const response = await api.get(
      `/shop/order/list/${userId}`
    );
    return response.data;
  }
);
export const getOrderDetails = createAsyncThunk(
  "/order/orderDetails",
  async (id) => {
    const response = await api.get(
      `/shop/order/details/${id}`
    );
    return response.data;
  }
);

const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails :(state)=>{
      state.orderDetails = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderId = action.payload.orderId;
        console.log(action.payload.orderId, "action.payload.orderId");
        state.paymentUrl = action.payload.paymentUrl;

        //This is store the orderId
        if (action.payload.orderId) {
          sessionStorage.setItem(
            "currentOrderId",
            JSON.stringify(action.payload.orderId)
          );
          console.log(
            "Stored orderId in Session Storage:",
            sessionStorage.getItem("currentOrderId")
          ); // Confirm storage
        } else {
          console.error("Order ID is undefined or missing from payload");
        }
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.paymentUrl = null;
        state.orderId = null;
      })
      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersByUserId.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const {resetOrderDetails} = shoppingOrderSlice.actions;

export default shoppingOrderSlice.reducer;
