"use client";

import React from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { setCurrentIndex, STATUS } from "@/store/examSlice";
import Timer from "./Timer";
export default function QuestionGrid() {
  const dispatch = useAppDispatch();
  const { questions, statusMap, currentIndex, remainingSeconds } = useAppSelector((s) => s.exam);
  const getQuestionId = (question) => question?.question_id ?? question?.id;

  const getColor = (status) => {
    switch (status) {
      case STATUS.ANSWERED:
        return "border-[#4CAF50] bg-[#4CAF50] text-white";
      case STATUS.NOT_ANSWERED:
        return "border-[#F44336] bg-[#F44336] text-white";
      case STATUS.MARKED_FOR_REVIEW:
        return "border-[#8E108C] bg-[#8E108C] text-white";
      case STATUS.ANSWERED_MARKED_REVIEW:
        return "border-[#8E108C] bg-[#8E108C] text-white ring-2 ring-inset ring-[#4CAF50]";
      default:
        return "border-[#D6E2EB] bg-white text-[#334155]";
    }
  };

  const legendItems = [
    { label: "Attended", color: "bg-[#4CAF50]" },
    { label: "Not Attended", color: "bg-[#F44336]" },
    { label: "Marked For Review", color: "bg-[#8E108C]" },
    {
      label: "Answered and Marked For Review",
      color: "bg-[#8E108C] ring-2 ring-inset ring-[#4CAF50]",
    },
  ];

  return (
    <div className="rounded-xl border border-[#D9E5EE] p-4 shadow-[0_2px_8px_rgba(28,49,65,0.06)]">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-small text-[#1C3141]">Question No. Sheet:</h3>
        <div className="flex items-center justify-between rounded-xl px-4 py-3 shadow-[0_2px_8px_rgba(28,49,65,0.06)]">
                      <span className="text-sm  font-small text-[#1C3141]">Remaining Time:</span>
                      <Timer remainingSeconds={remainingSeconds} />
                    </div>
      </div>

      <div className="grid grid-cols-5 gap-2 sm:grid-cols-5 lg:grid-cols-5">
        {questions.map((q, i) => (
          <button
            key={i}
            onClick={() => dispatch(setCurrentIndex(i))}
            className={`flex h-9 w-full items-center justify-center rounded border text-sm transition ${
              getColor(statusMap[getQuestionId(q)])
            } ${currentIndex === i ? "ring-2 ring-[#1E88E5] ring-offset-1" : ""}`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-[#475467]">
        {legendItems.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span className={`h-3 w-3 rounded-sm ${item.color}`}></span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
