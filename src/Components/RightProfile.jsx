"use client";

import { TextField } from "@mui/material";
import React, { useState, useRef } from "react";
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined'; // Optional: Use an icon for closer match

export default function RightProfile({
  name,
  setName,
  email,
  setEmail,
  qualification,
  setQualification,
  setProfileImage,
  onSubmit,
  loading
}) {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (file) => {
    setProfileImage(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const removeImage = () => {
    setProfileImage(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Custom styles for MUI TextField to match the screenshot
  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      "& fieldset": { borderColor: "#D1D5DB" },
      "&:hover fieldset": { borderColor: "#1C3141" },
      "&.Mui-focused fieldset": { borderColor: "#1C3141" },
    },
    "& .MuiInputLabel-root": { color: "#1C3141", fontWeight: 500 },
    "& .MuiInputBase-input::placeholder": { color: "#9CA3AF", opacity: 1 },
  };

  return (
    <div className="w-full md:w-1/2 bg-white p-8 sm:p-10 flex flex-col shadow-sm border border-gray-100 rounded-xl">
      
      <h2 className="text-3xl font-bold text-[#1C3141] mb-2">
        Add Your Details
      </h2>

      {/* IMAGE UPLOADER SECTION */}
      <div className="mt-8 flex justify-center">
        <label className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center cursor-pointer relative overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors">
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
          />

          {preview ? (
            <>
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); removeImage(); }}
                className="absolute top-2 right-2 bg-black/50 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs"
              >
                ×
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <div className="mb-2 text-gray-700">
                {/* Custom Box Icon from screenshot */}
                <div className="border-2 border-gray-800 rounded-md p-1">
                   <span className="text-xl font-bold">+</span>
                </div>
              </div>
              <p className="text-[10px] sm:text-xs text-gray-400 font-medium text-center px-4">
                Add Your Profile picture
              </p>
            </div>
          )}
        </label>
      </div>

      {/* FORM FIELDS */}
      <div className="mt-10 space-y-6">
        <div className="mb-4">
        <TextField
          fullWidth
          label="Name*"
          placeholder="Enter your Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={textFieldStyles}
          InputLabelProps={{ shrink: true }}
        />
             </div>
                 <div className="mb-4">
        <TextField
          fullWidth
          label="Email"
          placeholder="Enter your Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={textFieldStyles}
          InputLabelProps={{ shrink: true }}
        />
  </div>
   <div className="mb-4">
        <TextField
          fullWidth
          label="Your qualification*"
          placeholder="Enter qualification"
          value={qualification}
          onChange={(e) => setQualification(e.target.value)}
          sx={textFieldStyles}
          InputLabelProps={{ shrink: true }}
        />
      </div>
      </div>

      {/* BUTTON */}
      <button
        onClick={onSubmit}
        disabled={loading}
        className="w-full bg-[#1C3141] text-white py-4 rounded-xl mt-8 font-bold text-lg hover:bg-[#2a455a] transition-all disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Get Started"}
      </button>
    </div>
  );
}