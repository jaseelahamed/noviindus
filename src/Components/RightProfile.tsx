"use client";

import { TextField } from "@mui/material";
import React, { useState, useRef } from "react";

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
}: any) {

  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (file: File | null) => {
    setProfileImage(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const removeImage = () => {
    setProfileImage(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="w-full md:w-1/2 bg-white p-6 sm:p-10 flex flex-col min-h-[500px] relative">

      <h2 className="text-xl sm:text-2xl font-semibold text-[#1C3141]">
        Add Your Details
      </h2>

      {/* IMAGE SECTION - RESPONSIVE */}
      <div className="mt-6 flex justify-center">
        <label className="w-28 h-28 sm:w-32 sm:h-32 border-2 border-dashed border-[#D1D5DB]
                           rounded-lg flex flex-col items-center justify-center cursor-pointer 
                           relative overflow-hidden">

          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
          />

          {preview && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                removeImage();
              }}
              className="absolute top-1 right-1 bg-[#00000080] text-white w-5 h-5 sm:w-6 sm:h-6
                         rounded-full flex items-center justify-center text-xs sm:text-sm"
            >
              ×
            </button>
          )}

          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <>
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#1C3141] bg-opacity-10 rounded-md flex items-center justify-center">
                <span className="text-[#1C3141] text-lg sm:text-xl font-bold">+</span>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center px-1">
                Add Your Profile picture
              </p>
            </>
          )}
        </label>
      </div>

      <div className="mt-6 sm:mt-8 space-y-4">
        <TextField className="w-full" label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField className="w-full" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField className="w-full" label="Qualification" value={qualification} onChange={(e) => setQualification(e.target.value)} />
      </div>

      <button
        onClick={onSubmit}
        disabled={loading}
        className=" w-100 bg-[#1C3141] text-white py-3 rounded-lg mt-6 disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Get Started"}
      </button>
    </div>
  );
}
