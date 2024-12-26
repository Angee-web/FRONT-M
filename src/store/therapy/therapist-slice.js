import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../auth-slice/api"; // Use the custom api instance

const initialState = {
  therapists: [], // List of all therapists
  therapist: null, // Single therapist details
  loading: false,
  error: null,
};



// Async thunk to create a new therapist
export const createNewTherapist = createAsyncThunk(
  "/therapists/create",
  async (therapistData, { rejectWithValue }) => {
    try {
      console.log("Therapist data received in thunk:", therapistData);

      const response = await api.post(
        `/therapists`,
        therapistData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("Therapist API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error in createNewTherapist thunk:", error);
      return rejectWithValue(
        error.response && error.response.data
          ? error.response.data
          : "An error occurred"
      );
    }
  }
);


// Async thunk to get all therapists
export const getAllTherapists = createAsyncThunk(
  "/therapists/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/therapists`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response && error.response.data
          ? error.response.data
          : "An error occurred"
      );
    }
  }
);

// Async thunk to get a single therapist by ID
export const getTherapistById = createAsyncThunk(
  "/therapists/getById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/therapists/${id}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data
          ? error.response.data
          : "An error occurred"
      );
    }
  }
);

// Async thunk to update a therapist
export const updateTherapist = createAsyncThunk(
  "/therapists/update",
  async ({ data, token }, { rejectWithValue }) => {
    try {
      console.log("Token being sent:", token); // Log the token
      console.log("Data being sent:", data); // Log the request data

      const response = await api.put(
        `/therapists/${data._id}`,
        data,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update therapist."
      );
    }
  }
);


// Async thunk to delete a therapist by ID
export const deleteTherapist = createAsyncThunk(
  "/therapists/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `/therapists/${id}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data
          ? error.response.data
          : "An error occurred"
      );
    }
  }
);




const therapistsSlice = createSlice({
  name: "therapists",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createNewTherapist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewTherapist.fulfilled, (state, action) => {
        state.loading = false;
        state.therapists.push(action.payload.therapist); // Add the new therapist to the list
      })
      .addCase(createNewTherapist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllTherapists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTherapists.fulfilled, (state, action) => {
        state.loading = false;
        // Ensure you access therapists from the payload properly
        state.therapists = action.payload.therapists || [];
      })
      .addCase(getAllTherapists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getTherapistById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTherapistById.fulfilled, (state, action) => {
        state.loading = false;
        state.therapist = action.payload.therapist; // Store the single therapist details
      })
      .addCase(getTherapistById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTherapist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTherapist.fulfilled, (state, action) => {
        state.loading = false;
        state.therapist = action.payload.therapist; // Store the single therapist details
      })
      .addCase(updateTherapist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTherapist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTherapist.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted therapist from the list
        state.therapists = state.therapists.filter(
          (therapist) => therapist._id !== action.meta.arg // Assuming `id` was passed as the argument
        );
      })
      .addCase(deleteTherapist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default therapistsSlice.reducer;
