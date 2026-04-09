"use client";

import { TextField } from "@mui/material";
import React from "react";
import { useAppSelector } from "@/hooks/reduxHooks";

export default function RightOtp({
  otp,
  setOtp,
  onSubmit,
  onResend,
  loading
}: any) {
  const { error } = useAppSelector((state) => state.auth);

  return (
    <div className="w-full md:w-1/2 bg-white p-6 sm:p-10 flex flex-col min-h-[500px] relative">

      <h2 className="text-xl sm:text-2xl font-semibold">Enter the code we texted you</h2>

      <div className="mt-6">
        <TextField
          className="w-full"
          label="SMS Code"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}

      <p
        className="mt-6 text-[#1C3141] text-sm underline cursor-pointer"
        onClick={onResend}
      >
        Resend OTP
      </p>

      <button
        onClick={onSubmit}
        disabled={loading}
        className=" bg-[#1C3141] text-white py-2 rounded-lg disabled:opacity-50 w-100 sm:absolute sm:bottom-10 sm:left-10 sm:right-10"
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
    </div>
  );
}
