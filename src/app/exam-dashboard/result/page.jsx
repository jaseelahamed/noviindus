"use client";

import React from "react";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useRouter } from "next/navigation";

export default function ResultPage() {
  const { result } = useAppSelector((s) => s.exam);
  const router = useRouter();

  if (!result) return <div>No result</div>;

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold">Exam Result</h2>

        <div className="mt-4">
          <p className="text-lg font-semibold">
            Score: {result.score} / {result.total_marks}
          </p>

          <p>Correct: {result.correct}</p>
          <p>Wrong: {result.wrong}</p>
          <p>Not Attempted: {result.not_attended}</p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-[#1C3141] text-white rounded"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
