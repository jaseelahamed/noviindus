"use client";

import React, { useEffect, useState } from "react";

export default function PassageModal() {
  const [open, setOpen] = useState(false);
  const [paragraph, setParagraph] = useState("");

  useEffect(() => {
    const handler = (event) => {
      setParagraph(event.detail?.paragraph || event.paragraph || "");
      setOpen(true);
    };
    window.addEventListener("openPassage", handler);
    return () => window.removeEventListener("openPassage", handler);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded max-w-6xl w-full shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-xl"
          onClick={() => setOpen(false)}
        >
          ×
        </button>
        <h3 className="font-['Inter'] font-medium text-[16px] leading-[100%] tracking-[0%] text-[#1C3141] flex items-center mb-3">
          Comprehensive Paragraph
        </h3>
        <p className="font-['Inter'] font-medium text-[18px] leading-[100%] tracking-[0%] text-[#1C3141] whitespace-pre-wrap">
          {paragraph}
        </p>
        <div className="flex justify-end mt-4">
         <button
  onClick={() => setOpen(false)}
  className="w-[361px] h-[48px] rounded-[10px] bg-[#1C3141] text-[#ffffff] font-medium transition-opacity opacity-100 flex items-center justify-center"
>
  Minimize
</button>
        </div>
      </div>
    </div>
  );
}
