"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";

const initialState = {
  loading: false,
  loadingAuth: true,      
  access_token: null,
  refresh_token: null,
  user: null,
  mobileForFlow: null,
  error: null,
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
      state.user = null;
      localStorage.clear();
    },

    loadTokens(state) {
      state.access_token = localStorage.getItem("access_token");
      state.refresh_token = localStorage.getItem("refresh_token");
      state.loadingAuth = false;   // <--- TOKEN LOAD COMPLETE
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
          state.access_token = d.access_token;
          localStorage.setItem("access_token", d.access_token);

          if (d.refresh_token) {
            state.refresh_token = d.refresh_token;
            localStorage.setItem("refresh_token", d.refresh_token);
          }
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

        state.access_token = d.access_token;
        state.user = d.user;
        localStorage.setItem("access_token", d.access_token);

        if (d.refresh_token) {
          state.refresh_token = d.refresh_token;
          localStorage.setItem("refresh_token", d.refresh_token);
        }
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { logout, loadTokens } = authSlice.actions;
export default authSlice.reducer;
