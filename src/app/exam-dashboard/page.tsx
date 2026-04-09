// app/exam-dashboard/page.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function ExamLanding() {
  const router = useRouter();

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-3xl mx-auto text-center">
        
        {/* TITLE */}
        <h2 className="text-xl sm:text-2xl font-semibold mt-4 sm:mt-6">
          Ancient Indian History — Level 1
        </h2>

        {/* STATS BOX — RESPONSIVE GRID */}
        <div className="
          mt-6 grid grid-cols-1 sm:grid-cols-3 
          bg-[#1C3141] text-white rounded overflow-hidden 
          p-6 sm:p-10 gap-y-6 sm:gap-y-0
        ">
          {/* Box 1 */}
          <div className="p-4 sm:border-r sm:border-white text-center sm:text-left">
            <div className="text-sm">Total MCQ's</div>
            <div className="text-2xl font-bold">100</div>
          </div>

          {/* Box 2 */}
          <div className="p-4 sm:border-r sm:border-white text-center sm:text-left">
            <div className="text-sm">Total marks</div>
            <div className="text-2xl font-bold">100</div>
          </div>

          {/* Box 3 */}
          <div className="p-4 text-center sm:text-left">
            <div className="text-sm">Total time</div>
            <div className="text-2xl font-bold">90 minutes</div>
          </div>
        </div>

        {/* INSTRUCTIONS BOX */}
        <div className="text-left mt-6 bg-white p-5 sm:p-6 rounded shadow text-sm">
          <h2 className="text-lg font-semibold mb-3">Instructions:</h2>

          <ol className="list-decimal space-y-2 ml-4 sm:ml-5 leading-relaxed">
            <li>You have 100 minutes to complete the test.</li>
            <li>Test consists of 100 multiple-choice questions.</li>
            <li>You are allowed 2 retest attempts if you do not pass on the first try.</li>
            <li>Each incorrect answer will incur a negative mark of -1/4.</li>
            <li>Ensure you are in a quiet environment and have a stable internet connection.</li>
            <li>Keep an eye on the timer, and try to answer all questions within the given time.</li>
            <li>Do not use any external resources such as dictionaries, websites, or assistance.</li>
            <li>Complete the test honestly to accurately assess your proficiency level.</li>
            <li>Use the grid to quickly jump to questions.</li>
            <li>Marked questions can be reviewed later.</li>
            <li>Check answers before submitting.</li>
            <li>Your test results will be displayed immediately after submission.</li>
          </ol>
        </div>

        {/* START BUTTON */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => router.push("/exam-dashboard/test")}
            className="px-6 py-3 bg-[#1C3141] text-white rounded w-full sm:w-auto"
          >
            Start Test
          </button>
        </div>
      </div>
    </div>
  );
}
