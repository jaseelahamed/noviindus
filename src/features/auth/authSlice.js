"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";

const initialState = {
  loading: false,
  loadingAuth: true,
  access_token: null,
  refresh_token: null,
  token_type: "bearer",
  user: null,
  mobileForFlow: null,
  error: null,
};

const persistTokens = (state, data) => {
  if (!data?.access_token) return;

  state.access_token = data.access_token;
  state.token_type = data.token_type || "bearer";

  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("token_type", state.token_type);

  if (data.refresh_token) {
    state.refresh_token = data.refresh_token;
    localStorage.setItem("refresh_token", data.refresh_token);
  }
};


export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (mobile, { rejectWithValue }) => {
    try {
      const form = new FormData();
      form.append("mobile", mobile);
      const res = await api.post("/auth/send-otp", form);
      return { data: res.data, mobile };
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || "Something went wrong");
    }
  }
);


export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ mobile, otp }, { rejectWithValue }) => {
    try {
      const form = new FormData();
      form.append("mobile", mobile);
      form.append("otp", otp);
      const res = await api.post("/auth/verify-otp", form);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || "Something went wrong");
    }
  }
);


export const createProfile = createAsyncThunk(
  "auth/createProfile",
  async (data, { rejectWithValue }) => {
    try {
      const form = new FormData();
      Object.entries(data).forEach(([key, value]) => form.append(key, value));
      const res = await api.post("/auth/create-profile", form);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || "Something went wrong");
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.access_token = null;
      state.refresh_token = null;
      state.token_type = "bearer";
      state.user = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("token_type");
    },

    loadTokens(state) {
      state.access_token = localStorage.getItem("access_token");
      state.refresh_token = localStorage.getItem("refresh_token");
      state.token_type = localStorage.getItem("token_type") || "bearer";
      state.loadingAuth = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.mobileForFlow = action.payload.mobile;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        const d = action.payload;

        if (d.login) {
          persistTokens(state, d);
        }
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      .addCase(createProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.loading = false;
        const d = action.payload;

        state.user = d.user;
        persistTokens(state, d);
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { logout, loadTokens } = authSlice.actions;
export default authSlice.reducer;
