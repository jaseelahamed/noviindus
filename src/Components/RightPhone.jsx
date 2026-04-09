"use client";

import { InputAdornment, TextField } from "@mui/material";
import React from "react";

export default function RightPhone({
  mobile,
  setMobile,
  onSubmit,
  loading
}) {
  return (
    <div className="w-full md:w-1/2 bg-white p-6 sm:p-10 flex flex-col min-h-[500px] relative">
      
      {/* Content Container */}
      <div className="flex-grow">
        <h2 className="text-xl sm:text-2xl font-semibold text-[#1C3141]">
          Enter your phone number
        </h2>
        <p className="text-sm sm:text-base text-[#1C3141] mt-2 sm:mt-4">
          We use your mobile number to identify your account
        </p>

        <div className="mt-6 space-y-4">
          <TextField
            className="w-full"
            label="Phone number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">+91</InputAdornment>
                ),
              },
            }}
          />
          <p className="mt-4 text-[#64748B] flex flex-wrap items-center" 
            style={{ 
              fontFamily: 'Inter, sans-serif', 
              fontWeight: 400, 
              fontSize: '11.74px', 
              lineHeight: '16px', 
              letterSpacing: '0px' 
            }}>
            By tapping Get started, you agree to the&nbsp;
            <span className="text-[#1C3141] cursor-pointer hover:underline"
                  style={{ 
                    fontFamily: 'Inter, sans-serif', 
                    fontWeight: 400, 
                    fontSize: '11.74px', 
                    lineHeight: '16px' 
                  }}>
              Terms & Conditions
            </span>
          </p>
        </div>
      </div>

      {/* Responsive Button */}
      <div className="mt-8 sm:mt-0">
        <button
          onClick={onSubmit}
          disabled={loading}
          className="w-full bg-[#1C3141] text-white py-3 rounded-lg cursor-pointer disabled:opacity-50 transition-colors 
                     sm:absolute sm:bottom-10 sm:left-10 sm:right-10 sm:w-[calc(100%-80px)]"
        >
          {loading ? "Sending..." : "Get Started"}
        </button>
      </div>
    </div>
  );
}