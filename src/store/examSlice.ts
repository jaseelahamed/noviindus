// src/store/examSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "@/lib/axios";

export type Answer = {
  question_id: number;
  selected_option_id: number | null;
  marked_for_review?: boolean;
};

const initialState = {
  questions: [],
  loading: false,
  error: null,
  currentIndex: 0,
  answers: {},
  statusMap: {},
  totalTimeSeconds: 0,
  remainingSeconds: 0,
  timerRunning: false,
  result: null,
};

export const fetchQuestions = createAsyncThunk(
  "exam/fetchQuestions",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/question/list");
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const submitAnswers = createAsyncThunk(
  "exam/submitAnswers",
  async (payload: { answers: Answer[] }, { rejectWithValue }) => {
    try {
      const fd = new FormData();
      fd.append("answers", JSON.stringify(payload.answers));

      const res = await api.post("/answers/submit", fd);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    setCurrentIndex(state, action: PayloadAction<number>) {
      state.currentIndex = action.payload;
    },

    // Fix setting answer
    selectOption(
      state,
      action: PayloadAction<{ question_id: number; option_id: number }>
    ) {
      const { question_id, option_id } = action.payload;

      state.answers[question_id] = {
        question_id,
        selected_option_id: option_id,
      };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload.questions;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(submitAnswers.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitAnswers.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload; // <-- Save result here
      })
      .addCase(submitAnswers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentIndex, selectOption } = examSlice.actions;
export default examSlice.reducer;
