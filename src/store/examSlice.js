import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/lib/axios";

const STATUS = {
  NOT_VISITED: "not_visited",
  NOT_ANSWERED: "not_answered",
  ANSWERED: "answered",
  MARKED_FOR_REVIEW: "marked_for_review",
  ANSWERED_MARKED_REVIEW: "answered_marked_review",
};

const getQuestionId = (question) => question?.question_id ?? question?.id;

const getStatusForQuestion = (state, questionId, fallback = STATUS.NOT_ANSWERED) => {
  const currentStatus = state.statusMap[questionId];
  const hasAnswer = Boolean(state.answers[questionId]?.selected_option_id);

  if (currentStatus === STATUS.MARKED_FOR_REVIEW) {
    return hasAnswer ? STATUS.ANSWERED_MARKED_REVIEW : STATUS.MARKED_FOR_REVIEW;
  }

  if (currentStatus === STATUS.ANSWERED_MARKED_REVIEW) {
    return hasAnswer ? STATUS.ANSWERED_MARKED_REVIEW : STATUS.MARKED_FOR_REVIEW;
  }

  if (hasAnswer) {
    return STATUS.ANSWERED;
  }

  return fallback;
};

const markCurrentQuestionVisited = (state) => {
  const currentQuestion = state.questions[state.currentIndex];
  const questionId = getQuestionId(currentQuestion);

  if (!questionId) return;

  const currentStatus = state.statusMap[questionId];
  if (!currentStatus || currentStatus === STATUS.NOT_VISITED) {
    state.statusMap[questionId] = getStatusForQuestion(
      state,
      questionId,
      STATUS.NOT_ANSWERED
    );
  }
};

const buildInitialStatusMap = (questions) => {
  const nextStatusMap = {};

  questions.forEach((question) => {
    const questionId = getQuestionId(question);
    if (questionId) {
      nextStatusMap[questionId] = STATUS.NOT_VISITED;
    }
  });

  return nextStatusMap;
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
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const submitAnswers = createAsyncThunk(
  "exam/submitAnswers",
  async (payload, { rejectWithValue }) => {
    try {
      const fd = new FormData();
      fd.append("answers", JSON.stringify(payload.answers));

      const res = await api.post("/answers/submit", fd);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    setCurrentIndex(state, action) {
      markCurrentQuestionVisited(state);
      state.currentIndex = action.payload;
      markCurrentQuestionVisited(state);
    },

    selectOption(state, action) {
      const { question_id, option_id } = action.payload;

      state.answers[question_id] = {
        question_id,
        selected_option_id: option_id,
      };

      state.statusMap[question_id] = getStatusForQuestion(
        state,
        question_id,
        STATUS.ANSWERED
      );
    },

    markCurrentForReview(state) {
      const currentQuestion = state.questions[state.currentIndex];
      const questionId = getQuestionId(currentQuestion);

      if (!questionId) return;

      const hasAnswer = Boolean(state.answers[questionId]?.selected_option_id);
      state.statusMap[questionId] = hasAnswer
        ? STATUS.ANSWERED_MARKED_REVIEW
        : STATUS.MARKED_FOR_REVIEW;
    },

    decrementTimer(state) {
      if (state.remainingSeconds > 0) {
        state.remainingSeconds -= 1;
      }

      if (state.remainingSeconds <= 0) {
        state.remainingSeconds = 0;
        state.timerRunning = false;
      }
    },

    resetExamState() {
      return initialState;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        const questions = action.payload.questions || [];
        const durationSeconds =
          action.payload.remaining_seconds ||
          action.payload.duration_seconds ||
          (action.payload.duration_minutes
            ? Number(action.payload.duration_minutes) * 60
            : 0);

        state.loading = false;
        state.questions = questions;
        state.currentIndex = 0;
        state.answers = {};
        state.result = null;
        state.statusMap = buildInitialStatusMap(questions);
        state.totalTimeSeconds = durationSeconds;
        state.remainingSeconds = durationSeconds;
        state.timerRunning = durationSeconds > 0;

        markCurrentQuestionVisited(state);
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      .addCase(submitAnswers.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitAnswers.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
        state.timerRunning = false;
      })
      .addCase(submitAnswers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const {
  setCurrentIndex,
  selectOption,
  markCurrentForReview,
  decrementTimer,
  resetExamState,
} = examSlice.actions;
export { STATUS };
export default examSlice.reducer;
