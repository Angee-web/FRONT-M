import api from "../../auth-slice/api"; // Use the custom Axios instance
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  orderList: [],
  orderDetails: null,
  isLoading: false, // Add this to manage loading state
};

export const getAllOrdersForAdmin = createAsyncThunk(
  "/order/getAllOrdersForAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/orders/get");
      return response.data;
    } catch (error) {
      // Handle errors and return a rejected action payload
      return rejectWithValue(error.response?.data || "Failed to fetch orders");
    }
  }
);

export const getOrderDetailsForAdmin = createAsyncThunk(
  "/order/getOrderDetailsForAdmin",
  async (id) => {
    const response = await api.get(`/admin/orders/details/${id}`);
    return response.data;
  }
);
export const updateOrderStatus = createAsyncThunk(
  "/order/updateOrderStatus",
  async ({id, orderStatus}) => {
    const response = await api.put(`/admin/orders/update/${id}`, {
      orderStatus,
    });
    return response.data;
  }
);

// export const updateOrderStatus = createAsyncThunk(
//   "/order/updateOrderStatus",
//   async ({ id, orderStatus }, { rejectWithValue }) => {
//     try {
//       const response = await api.put(`/admin/orders/update/${id}`, {
//         orderStatus,
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Failed to update order status");
//     }
//   }
// );


const adminOrderSlice = createSlice({
  name: "adminOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getAllOrdersForAdmin Cases
      .addCase(getAllOrdersForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersForAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.orderList = [];
        state.error = action.payload || "Failed to fetch orders";
      })

      // getOrderDetailsForAdmin Cases
      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.orderDetails = null;
        state.error = action.payload || "Failed to fetch order details";
      });
  },
});

export const { resetOrderDetails } = adminOrderSlice.actions;

export default adminOrderSlice.reducer;
