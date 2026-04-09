"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function ExamLanding() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F4F9FC] p-4 sm:p-10 font-['Inter']">
      <div className="max-w-[800px] mx-auto">
        
        {/* TITLE */}
        <div className="text-center">
          <h2 className="font-medium text-[26px] leading-[144%] tracking-[0%] text-[#1C3141]">
            Ancient Indian History MCQ
          </h2>
        </div>

        {/* STATS BOX */}
        <div className="mt-8 bg-[#1C3141] text-white rounded-[10px] p-8 sm:p-12 shadow-lg">
          <div className="grid grid-cols-3 items-center">
            {/* Box 1 */}
            <div className="flex flex-col items-center border-r border-white/40 px-2">
              <span className="text-[14px] font-medium mb-4 opacity-90">Total MCQ's:</span>
              <span className="text-[42px] font-normal leading-none">100</span>
            </div>

            {/* Box 2 */}
            <div className="flex flex-col items-center border-r border-white/40 px-2">
              <span className="text-[14px] font-medium mb-4 opacity-90">Total marks:</span>
              <span className="text-[42px] font-normal leading-none">100</span>
            </div>

            {/* Box 3 */}
            <div className="flex flex-col items-center px-2">
              <span className="text-[14px] font-medium mb-4 opacity-90">Total time:</span>
              <span className="text-[42px] font-normal leading-none">90:00</span>
            </div>
          </div>
        </div>

        {/* INSTRUCTIONS BOX */}
        <div className="mt-10 px-2">
          <h3 className="text-[#6B7280] font-bold text-[16px] mb-4">Instructions:</h3>

          <ol className="list-decimal space-y-3 ml-5 text-[#6B7280] text-[15px] leading-[1.6]">
            <li>You have 100 minutes to complete the test.</li>
            <li>Test consists of 100 multiple-choice q's.</li>
            <li>You are allowed 2 retest attempts if you do not pass on the first try.</li>
            <li>Each incorrect answer will incur a negative mark of -1/4.</li>
            <li>Ensure you are in a quiet environment and have a stable internet connection.</li>
            <li>Keep an eye on the timer, and try to answer all questions within the given time.</li>
            <li>Do not use any external resources such as dictionaries, websites, or assistance.</li>
            <li>Complete the test honestly to accurately assess your proficiency level.</li>
            <li>Check answers before submitting.</li>
            <li>Your test results will be displayed immediately after submission, indicating whether you have passed or need to retake the test.</li>
          </ol>
        </div>

        {/* START BUTTON */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => router.push("/exam-dashboard/test")}
            className="w-full sm:w-[350px] py-4 bg-[#1C3141] text-white text-[18px] font-semibold rounded-[10px] hover:bg-[#152531] transition-colors"
          >
            Start Test
          </button>
        </div>
      </div>
    </div>
  );
}