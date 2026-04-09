"use client";

import React from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { setCurrentIndex } from "@/store/examSlice";

export default function QuestionGrid() {
  const dispatch = useAppDispatch();
  const { questions, statusMap, currentIndex } = useAppSelector((s) => s.exam);

  const getColor = (status: string) => {
    switch (status) {
      case "answered":
        return "bg-green-500 text-white";
      case "not_answered":
        return "bg-red-500 text-white";
      case "marked_for_review":
        return "bg-purple-500 text-white";
      case "answered_marked_review":
        return "bg-blue-500 text-white";
      default:
        return "bg-slate-300";
    }
  };

  return (
    <>
      <h3 className="text-md font-semibold mb-3">Questions</h3>

      <div className="grid grid-cols-5 gap-2">
        {questions.map((q, i) => (
          <div
            key={q.id}
            onClick={() => dispatch(setCurrentIndex(i))}
            className={`w-full h-10 flex items-center justify-center text-sm rounded cursor-pointer 
              ${getColor(statusMap[q.id])} 
              ${currentIndex === i ? "ring-2 ring-black" : ""}
            `}
          >
            {i + 1}
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-slate-300 rounded"></div> Not Visited
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div> Not Answered
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div> Answered
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-500 rounded"></div> Marked for Review
        </div>
      </div>
    </>
  );
}
