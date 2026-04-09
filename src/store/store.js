"use client";

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import examReducer from "@/store/examSlice";  

const store = configureStore({
  reducer: {
    auth: authReducer,
    exam: examReducer,
  },
});

export default store;
