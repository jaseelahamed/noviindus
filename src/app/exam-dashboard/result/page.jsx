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
      value: String(totalQuestionsCount).padStart(3, "0"),
      bgColor: "bg-[#D9A12C]",
      icon: Copy,
    },
    {
      label: "Correct Answers:",
      value: String(result.correct).padStart(3, "0"),
      bgColor: "bg-[#5CB85C]",
      icon: CheckSquare,
    },
    {
      label: "Incorrect Answers:",
      value: String(result.wrong).padStart(3, "0"),
      bgColor: "bg-[#EE4B4B]",
      icon: XSquare,
    },
    {
      label: "Not Attended Questions:",
      value: String(result.not_attended).padStart(3, "0"),
      bgColor: "bg-[#666666]", 
      icon: HelpCircle,
    },
  ];

  return (
   
    <div className="min-h-screen p-8 bg-[#F0F7FA]">
     
      <div className="w-[393px] mx-auto bg-white rounded-[16px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] p-6 flex flex-col items-center">
        
        <div className="w-full bg-gradient-to-b from-[#1C3141] to-[#2C4A5F] rounded-[12px] p-6 text-center text-white shadow-inner mb-6">
          <p className="text-[14px] font-medium opacity-80 mb-2">Marks Obtained:</p>
          <p className="text-[48px] font-bold leading-tight">
            {result.score} <span className="text-[32px] font-medium opacity-70">/ {result?.details?.length}</span>
          </p>
        </div>

        <div className="w-full space-y-5 px-1 pb-4 flex-1">
          {summaryItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* ICON BOX */}
                <div className={`${item.bgColor} w-10 h-10 rounded-md flex items-center justify-center shadow-sm`}>
                  <item.icon className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                {/* LABEL */}
                <span className="text-[15px] font-medium text-[#475467]">
                  {item.label}
                </span>
              </div>
              <span className="text-[16px] font-bold text-[#1C3141]">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={() => router.push("/")}
          className="w-full h-[52px] mt-2 rounded-[10px] bg-[#1C3141] text-[16px] font-semibold text-white hover:bg-[#2c4355] transition-all active:scale-[0.98]"
        >
          Done
        </button>
      </div>
    </div>
  );
}