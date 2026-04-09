"use client";

import React from "react";
import { useAppSelector } from "@/hooks/reduxHooks";

export default function QuestionPanel({
  question,
  onSelect,
  onNext,
  onPrev,
}) {
  const answers = useAppSelector((s) => s.exam.answers);
  const selected = answers[question.question_id]?.selected_option_id;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold">Question {question.number}</h2>

      <p className="mt-4 text-slate-700">{question.question}</p>

      <div className="mt-6 space-y-3">
        {question.options.map((opt) => (
          <label
            key={opt.id}
            className={`flex items-center gap-3 p-3 border rounded cursor-pointer ${
              selected === opt.id ? "border-[#1C3141]" : "border-slate-300"
            }`}
          >
            <input
              type="radio"
              checked={selected === opt.id}
              onChange={() => onSelect(question.question_id, opt.id)}
            />
            <span>{opt.option}</span>
          </label>
        ))}
      </div>

      <div className="flex justify-between mt-6 gap-5">
        <button onClick={onPrev} className="w-full bg-gray-200 rounded py-2">
          Previous
        </button>
        <button onClick={onNext} className="w-full bg-[#1C3141] text-white rounded py-2">
          Next
        </button>
      </div>
    </div>
  );
}
