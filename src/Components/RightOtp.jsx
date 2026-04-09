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
}) {
  const { error } = useAppSelector((state) => state.auth);

  return (
 <div className="w-full md:w-[450px] bg-white p-8 flex flex-col min-h-[550px] relative border border-gray-100 rounded-xl shadow-sm">
      {/* Title */}
      <h2 className="text-[28px] leading-tight font-bold text-[#1C3141] tracking-tight">
        Enter the code we texted you
      </h2>

      {/* Subtitle */}
      <p className="mt-4 text-[#475467] text-[17px]">
        We’ve sent an SMS to <span className="font-medium">+91 1234 567891</span>
      </p>

      {/* OTP Input */}
      <div className="mt-8">
        <TextField
          fullWidth
          label="SMS code"
          variant="outlined"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="123 456"
          // Customizing MUI Input Styles
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              height: "64px",
              fontSize: "22px",
              color: "#1C3141",
              "& fieldset": { borderColor: "#D0D5DD" },
              "&:hover fieldset": { borderColor: "#1C3141" },
              "&.Mui-focused fieldset": { borderColor: "#1C3141", borderWidth: "1px" },
            },
            "& .MuiInputLabel-root": { color: "#667085" },
            "& .MuiInputLabel-root.Mui-focused": { color: "#1C3141" },
          }}
        />
      </div>

      {/* Info Text */}
      <p className="mt-4 text-[#667085] text-sm leading-relaxed max-w-[320px]">
        Your 6 digit code is on its way. This can sometimes take a few moments to arrive.
      </p>

      {/* Resend Link */}
      <button
        onClick={onResend}
        className="mt-6 text-[#1C3141] text-[16px] font-bold underline text-left w-fit hover:opacity-70 transition-opacity"
      >
        Resend code
      </button>

      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}

      {/* Bottom Button */}
      <button
        onClick={onSubmit}
        disabled={loading}
        className="mt-auto sm:absolute sm:bottom-10 sm:left-8 sm:right-8 bg-[#1C3141] text-white py-4 rounded-xl font-semibold text-lg transition-all active:scale-[0.98] disabled:opacity-50"
      >
        {loading ? "Verifying..." : "Get Started"}
      </button>
    </div>
  );
}
