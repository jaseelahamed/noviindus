"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/reduxHooks";
import { STATUS } from "@/store/examSlice";
import { Clock, Copy, Layout, FileText, X } from "lucide-react";

export default function SubmitSummaryModal({ onSubmit }) {
  const [open, setOpen] = useState(false);
  const { questions, remainingSeconds, statusMap } = useAppSelector((s) => s.exam);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("openSubmit", handler);
    return () => window.removeEventListener("openSubmit", handler);
  }, []);

  if (!open) return null;

  const format = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const answeredCount = Object.values(statusMap).filter(
    (status) => status === STATUS.ANSWERED || status === STATUS.ANSWERED_MARKED_REVIEW
  ).length;

  const reviewCount = Object.values(statusMap).filter(
    (status) => status === STATUS.MARKED_FOR_REVIEW || status === STATUS.ANSWERED_MARKED_REVIEW
  ).length;

  const summaryItems = [
    { label: "Remaining Time:", value: format(remainingSeconds), bg: "bg-[#23384B]", iconSrc: "/Timer.svg"},
    { label: "Total Questions:", value: String(questions.length).padStart(3, "0"), bg: "bg-[#D9A12C]",iconSrc: "/Vector.svg" },
    { label: "Questions Answered:", value: String(answeredCount).padStart(3, "0"), bg: "bg-[#5CB85C]", iconSrc: "/Vector.svg" },
    { label: "Marked for review:", value: String(reviewCount).padStart(3, "0"), bg: "bg-[#8E108C]", iconSrc: "/Vector.svg" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
     
      <div className="relative w-[393px] bg-white rounded-[16px] shadow-2xl flex flex-col p-6">
        
     
        <button
          className="absolute right-5 top-5 text-[#475467] hover:text-black transition-colors"
          onClick={() => setOpen(false)}
        >
          <X size={20} />
        </button>

     
        <div className="pr-8">
          <h2 className="text-[18px] font-semibold text-[#1C3141] leading-tight">
            Are you sure you want to submit the test?
          </h2>
        </div>

     
        <div className="w-full h-[1px] bg-gray-100 mt-5 mb-2" />

     
        <div className="space-y-4 py-4">
          {summaryItems.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
          
                <div className={`${item.bg} w-10 h-10 rounded-md flex items-center justify-center shadow-sm`}>
              
               <img 
                    src={item.iconSrc} 
                    alt={item.label} 
                    className="w-5 h-5 brightness-0 invert" 
                  />
                </div>
                <span className="text-[15px] font-medium text-[#475467]">
                  {item.label}
                </span>
              </div>
              <span className="text-[18px] font-bold text-[#1C3141] font-mono">
                {item.value}
              </span>
            </div>
          ))}
        </div>

       
        <button
          className="mt-4 w-full h-[52px] rounded-[10px] bg-[#1C3141] text-[16px] font-bold text-white hover:bg-[#2c4355] transition-all active:scale-[0.98]"
          onClick={() => {
            setOpen(false);
            onSubmit();
          }}
        >
          Submit Test
        </button>
      </div>
    </div>
  );
}