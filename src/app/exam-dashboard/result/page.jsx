"use client";

import React from "react";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useRouter } from "next/navigation";
import { Copy, CheckSquare, XSquare, HelpCircle } from "lucide-react"; 

export default function ResultPage() {
  const { result, questions } = useAppSelector((s) => s.exam); 
  const router = useRouter();

  if (!result) return <div className="p-8 text-center text-gray-600">No result found. Please submit a test first.</div>;

  const totalQuestionsCount = questions ? questions.length : 100; 

  const summaryItems = [
    {
      label: "Total Questions:",
      value: String(totalQuestionsCount).padStart(2, "0"),
      bgColor: "bg-[#D9A12C]",
      icon: Copy,
    },
    {
      label: "Correct Answers:",
      value: String(result.correct).padStart(2, "0"),
      bgColor: "bg-[#5CB85C]",
      icon: CheckSquare,
    },
    {
      label: "Incorrect Answers:",
      value: String(result.wrong).padStart(2, "0"),
      bgColor: "bg-[#EE4B4B]",
      icon: XSquare,
    },
    {
      label: "Not Attended:",
      value: String(result.not_attended).padStart(2, "0"),
      bgColor: "bg-[#666666]", 
      icon: HelpCircle,
    },
  ];

  return (
    // Added flex and items-center to keep the card centered on all screens
    <div className="min-h-screen p-4 sm:p-8 bg-[#F0F7FA] flex items-center justify-center">
      
      {/* CHANGES MADE:
          - Changed w-[393px] to w-full max-w-[400px] 
          - This ensures it shrinks on small phones but never gets too wide on tablets.
      */}
      <div className="w-full max-w-[400px] bg-white rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-6 sm:p-8 flex flex-col items-center">
        
        {/* Score Header */}
        <div className="w-full bg-gradient-to-b from-[#1C3141] to-[#2C4A5F] rounded-[16px] p-8 text-center text-white shadow-inner mb-8">
          <p className="text-[14px] font-medium opacity-80 mb-2 uppercase tracking-wide">Marks Obtained</p>
          <p className="text-[48px] font-bold leading-tight">
            {result.score} <span className="text-[28px] font-medium opacity-70">/ {result?.details?.length}</span>
          </p>
        </div>

        {/* Stats List */}
        <div className="w-full space-y-6 px-1 mb-8">
          {summaryItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`${item.bgColor} w-10 h-10 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0`}>
                  <item.icon className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-[15px] font-semibold text-[#475467]">
                  {item.label}
                </span>
              </div>
              <span className="text-[18px] font-bold text-[#1C3141] font-mono">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={() => router.push("/")}
          className="w-full h-[56px] rounded-[14px] bg-[#1C3141] text-[16px] font-bold text-white hover:bg-[#2c4355] transition-all active:scale-[0.97] shadow-lg shadow-blue-900/10"
        >
          Done
        </button>
      </div>
    </div>
  );
}