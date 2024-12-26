import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../auth-slice/api"; // Use the custom Axios instance




// Async thunk for posting a new questionnaire
export const postQuestionnaire = createAsyncThunk(
  "questionnaire/postQuestionnaire",
  async (questionnaireData, { rejectWithValue }) => {
    try {
      const response = await api.post(
       `/question"`,
        questionnaireData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

// Async thunk for getting all questionnaires
export const getAllQuestionnaires = createAsyncThunk(
  "questionnaire/getAllQuestionnaires",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/question`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

// Async thunk for getting a questionnaire by ID
export const getQuestionnaireById = createAsyncThunk(
  "questionnaire/getQuestionnaireById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/question/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

// Async thunk for updating a questionnaire
export const updateQuestionnaire = createAsyncThunk(
  "questionnaire/updateQuestionnaire",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/question/${id}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

// Async thunk for deleting a questionnaire
export const deleteQuestionnaire = createAsyncThunk(
  "questionnaire/deleteQuestionnaire",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `/question/${id}`
      );
      return { id }; // Return the ID of the deleted questionnaire
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

// Questionnaire Slice
const questionnaireSlice = createSlice({
  name: "questionnaire",
  initialState: {
    questionnaires: [], // Holds all questionnaires
    questionnaire: null, // Holds a single questionnaire
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetQuestionnaireState: (state) => {
      state.questionnaire = null;
      state.questionnaires = [];
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Questionnaire
      .addCase(postQuestionnaire.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(postQuestionnaire.fulfilled, (state, action) => {
        state.loading = false;
        state.questionnaire = action.payload.newQuestionnaire;
        state.success = true;
      })
      .addCase(postQuestionnaire.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Get All Questionnaires
      .addCase(getAllQuestionnaires.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllQuestionnaires.fulfilled, (state, action) => {
        state.loading = false;
        state.questionnaires = action.payload;
      })
      .addCase(getAllQuestionnaires.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Questionnaire by ID
      .addCase(getQuestionnaireById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getQuestionnaireById.fulfilled, (state, action) => {
        state.loading = false;
        state.questionnaire = action.payload;
      })
      .addCase(getQuestionnaireById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Questionnaire
      .addCase(updateQuestionnaire.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuestionnaire.fulfilled, (state, action) => {
        state.loading = false;
        state.questionnaire = action.payload.updatedQuestionnaire;
        state.success = true;
      })
      .addCase(updateQuestionnaire.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Questionnaire
      .addCase(deleteQuestionnaire.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteQuestionnaire.fulfilled, (state, action) => {
        state.loading = false;
        state.questionnaires = state.questionnaires.filter(
          (questionnaire) => questionnaire._id !== action.payload.id
        );
        state.success = true;
      })
      .addCase(deleteQuestionnaire.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetQuestionnaireState } = questionnaireSlice.actions;

export default questionnaireSlice.reducer;
