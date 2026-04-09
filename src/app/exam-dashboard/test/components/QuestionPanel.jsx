"use client";

import React from "react";
import { useAppSelector } from "@/hooks/reduxHooks";

export default function QuestionPanel({
  question,
  onSelect,
  onNext,
  onPrev,
  onMarkForReview,
  questionNumber,
  totalQuestions,
}) {
  const answers = useAppSelector((s) => s.exam.answers);
  const questionId = question.question_id ?? question.id;
  const selected = answers[questionId]?.selected_option_id;
  const passage = question.comprehension;
  const image =
    question.image 
  
  const prompt =
    question.question ||
"Question not available";

  const openPassage = () => {
    if (!passage) return;
    window.dispatchEvent(
      new CustomEvent("openPassage", {
        detail: { paragraph: passage },
      })
    );
  };

  return (
    <div className="rounded-xl border border-[#D9E5EE] shadow-[0_2px_8px_rgba(28,49,65,0.06)]">
      <div className="flex items-center justify-between rounded-t-xl border-b border-[#E3EDF4] bg-[#EEF5FA] px-4 py-2">
        <h2 className="text-base font-medium text-[#1C3141]">
          Ancient Indian History MCQ
        </h2>
        <div className="rounded border border-[#D9E5EE] bg-white px-3 py-1 text-sm text-[#475467]">
          {String(questionNumber).padStart(2, "0")}/{String(totalQuestions).padStart(2, "0")}
        </div>
      </div>

      <div className="p-4 sm:p-5">
        {passage ? (
          <button
            onClick={openPassage}
            className="inline-flex items-center gap-2 rounded bg-[#177A9C] px-4 py-2 text-xs font-medium text-white"
          >
            <span className="text-sm">📖</span>
            Read Comprehensive Paragraph
          </button>
        ) : null}

        <div className="mt-5 rounded border border-[#E3EDF4] bg-white p-4">
          <p className="text-[15px] leading-7 text-[#1C3141]">
            {questionNumber}. {prompt}
          </p>

          {image ? (
            <div className="mt-5">
              <img
                src={image}
                alt="Question"
                className="h-28 w-auto rounded object-cover"
              />
            </div>
          ) : null}
        </div>

        <p className="mt-4 text-xs text-[#667085]">Choose the answer:</p>

        <div className="mt-2 space-y-3">
          {(question.options || []).map((opt, index) => {
            const optionId = opt.id ?? opt.option_id;
            const optionText = opt.option ?? opt.option_text ?? opt.text;
            const label = String.fromCharCode(65 + index);

            return (
              <label
                key={optionId ?? index}
                className={`flex cursor-pointer items-center justify-between rounded-md border px-4 py-3 transition ${
                  selected === optionId
                    ? "border-[#F2C94C] bg-[#FFFDF2]"
                    : "border-[#D9E5EE] bg-white"
                }`}
              >
                <div className="flex items-center gap-3 text-sm text-[#1C3141]">
                  <span>{label}. {optionText}</span>
                </div>
                <input
                  type="radio"
                  name={`question-${questionId}`}
                  checked={selected === optionId}
                  onChange={() => onSelect(questionId, optionId)}
                  className="h-4 w-4 accent-[#1C3141]"
                />
              </label>
            );
          })}
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={onMarkForReview}
            className="w-full rounded bg-[#8E108C] py-3 text-sm font-medium text-white sm:max-w-[195px]"
          >
            Mark for review
          </button>
          <button
            onClick={onPrev}
            className="w-full rounded bg-[#C9C9C9] py-3 text-sm font-medium text-[#23384B]"
          >
            Previous
          </button>
          <button
            onClick={onNext}
            className="w-full rounded bg-[#23384B] py-3 text-sm font-medium text-white"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
