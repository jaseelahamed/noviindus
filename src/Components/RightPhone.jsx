"use client";

import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import Flag from "react-world-flags"; // Import the flag library

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
            variant="outlined"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                '& fieldset': {
                  borderColor: '#D1D5DB', 
                },
                // Add padding to ensure the flag doesn't touch the border
                paddingLeft: '12px', 
              },
              '& .MuiInputLabel-root': {
                color: '#64748B',
              },
              '& .MuiInputBase-input': {
                fontSize: '1.25rem',
                fontWeight: '500',
                color: '#1C3141',
                paddingLeft: '8px',
              }
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start" sx={{ gap: 1.5, opacity: 1 }}>
                    {/* Realistic Indian Flag */}
                    <div style={{ width: '28px', display: 'flex', alignItems: 'center' }}>
                      <Flag code="IN" style={{ borderRadius: '2px' }} />
                    </div>
                    <span className="text-xl text-[#1C3141] font-medium">+91</span>
                  </InputAdornment>
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
            <span className="text-[#1C3141] cursor-pointer hover:underline font-medium">
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