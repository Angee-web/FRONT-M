
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../auth-slice/api"; // Use the custom api instance


// Async thunk for posting a new schedule
export const postSchedule = createAsyncThunk(
  "schedule/postSchedule",
  async (scheduleData, { rejectWithValue }) => {
    try {
      console.log("Posting schedule with data:", scheduleData); // Debugging log
      const response = await api.post(
        `/schedule`,
        scheduleData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

// Async thunk for getting all schedules
export const getAllSchedules = createAsyncThunk(
  "schedule/getAllSchedules",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/schedules"`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);


// Async thunk for getting a schedule by ID
export const getScheduleById = createAsyncThunk(
  "schedule/getScheduleById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/schedules/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

// Async thunk for updating a schedule
export const updateSchedule = createAsyncThunk(
  "schedule/updateSchedule",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/schedules/${id}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);


// Async thunk for deleting a schedule
export const deleteSchedule = createAsyncThunk(
  "schedule/deleteSchedule",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `/schedules/${id}`
      );
      return { id }; // Return the ID of the deleted schedule
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

// Schedule Slice
const scheduleSlice = createSlice({
  name: "schedule",
  initialState: {
    schedules: [], // Holds all schedules
    schedule: null, // Holds a single schedule
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetScheduleState: (state) => {
      state.schedule = null;
      state.schedules = [];
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Schedule
      .addCase(postSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(postSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.schedule = action.payload.newSchedule;
        state.success = true;
      })
      .addCase(postSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Get All Schedules
      .addCase(getAllSchedules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSchedules.fulfilled, (state, action) => {
        state.loading = false;
        state.schedules = action.payload;
      })
      .addCase(getAllSchedules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Schedule by ID
      .addCase(getScheduleById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getScheduleById.fulfilled, (state, action) => {
        state.loading = false;
        state.schedule = action.payload;
      })
      .addCase(getScheduleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Schedule
      .addCase(updateSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.schedule = action.payload.updatedSchedule;
        state.success = true;
      })
      .addCase(updateSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Schedule
      .addCase(deleteSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.schedules = state.schedules.filter(
          (schedule) => schedule._id !== action.payload.id
        );
        state.success = true;
      })
      .addCase(deleteSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetScheduleState } = scheduleSlice.actions;

export default scheduleSlice.reducer;