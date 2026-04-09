"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  fetchQuestions,
  setCurrentIndex,
  selectOption,
  submitAnswers,
} from "@/store/examSlice";

import QuestionPanel from "./components/QuestionPanel";
import QuestionGrid from "./components/QuestionGrid";
import Timer from "./components/Timer";
import PassageModal from "./components/PassageModal";
import SubmitModal from "./components/SubmitModal";
import { useRouter } from "next/navigation";

export default function TestPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { questions, currentIndex, answers, remainingSeconds } =
    useAppSelector((s) => s.exam);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  const handleSubmitExam = async () => {
    const answerArray = Object.values(answers); // NOW CORRECT SHAPE

    const result = await dispatch(
      submitAnswers({ answers: answerArray })
    ).unwrap();

    if (result.success) {
      router.push("/exam-dashboard/result");
    }
  };

  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Exam Test</h2>
          <Timer remainingSeconds={remainingSeconds} />
        </div>

        <div className="mt-6 grid grid-cols-12 gap-4">
          <div className="col-span-8">
            {currentQuestion ? (
              <QuestionPanel
                question={currentQuestion}
                onSelect={(qid, oid) =>
                  dispatch(selectOption({ question_id: qid, option_id: oid }))
                }
                onNext={() =>
                  dispatch(
                    setCurrentIndex(Math.min(currentIndex + 1, questions.length - 1))
                  )
                }
                onPrev={() =>
                  dispatch(setCurrentIndex(Math.max(currentIndex - 1, 0)))
                }
              />
            ) : (
              "No questions found"
            )}
          </div>

          <div className="col-span-4">
            <div className="bg-white p-4 rounded shadow">
              <QuestionGrid />
              <div className="mt-4">
                <button
                  onClick={handleSubmitExam}
                  className="w-full bg-[#1C3141] text-white py-2 rounded"
                >
                  Submit Test
                </button>
              </div>
            </div>
          </div>
        </div>

        <PassageModal />
      </div>
    </div>
  );
}
