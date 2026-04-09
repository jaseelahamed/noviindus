"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  decrementTimer,
  fetchQuestions,
  markCurrentForReview,
  setCurrentIndex,
  selectOption,
  submitAnswers,
} from "@/store/examSlice";

import QuestionPanel from "./components/QuestionPanel";
import QuestionGrid from "./components/QuestionGrid";
import Timer from "./components/Timer";
import PassageModal from "./components/PassageModal";
import SubmitSummaryModal from "./components/SubmitSummaryModal";
import { useRouter } from "next/navigation";

export default function TestPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { questions, currentIndex, answers, remainingSeconds, loading, error } =
    useAppSelector((s) => s.exam);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  useEffect(() => {
    if (remainingSeconds <= 0) return undefined;

    const timer = window.setInterval(() => {
      dispatch(decrementTimer());
    }, 1000);

    return () => window.clearInterval(timer);
  }, [dispatch, remainingSeconds]);

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
  const openSubmitModal = () => {
    window.dispatchEvent(new Event("openSubmit"));
  };

  const handleNext = () => {
    if (currentIndex === questions.length - 1) {
      openSubmitModal();
      return;
    }

    dispatch(setCurrentIndex(Math.min(currentIndex + 1, questions.length - 1)));
  };

  const handlePrev = () => {
    dispatch(setCurrentIndex(Math.max(currentIndex - 1, 0)));
  };

  return (
    <div className="min-h-screen bg-[#F4FAFD] p-4 sm:p-5">
      <div className="mx-auto max-w-[1280px]">
        {loading && !questions.length ? (
          <div className="rounded-xl border border-[#D9E5EE] bg-white p-6 text-sm text-[#475467]">
            Loading questions...
          </div>
        ) : null}

        {error ? (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-7">
            {currentQuestion ? (
              <QuestionPanel
                question={currentQuestion}
                questionNumber={currentIndex + 1}
                totalQuestions={questions.length}
                onSelect={(qid, oid) =>
                  dispatch(selectOption({ question_id: qid, option_id: oid }))
                }
                onNext={handleNext}
                onPrev={handlePrev}
                onMarkForReview={() => dispatch(markCurrentForReview())}
              />
            ) : (
              <div className="rounded-xl border border-[#D9E5EE] bg-white p-6 text-sm text-[#475467]">
                No questions found.
              </div>
            )}
          </div>

          <div className="space-y-4 lg:col-span-5">
          

            <div>
              <QuestionGrid />
            </div>

            {/* <button
              onClick={openSubmitModal}
              className="w-full rounded-lg bg-[#1C3141] py-3 text-sm font-medium text-white"
            >
              Submit Test
            </button> */}
          </div>
        </div>
        <PassageModal />
        <SubmitSummaryModal onSubmit={handleSubmitExam} />
      </div>
    </div>
  );
}
