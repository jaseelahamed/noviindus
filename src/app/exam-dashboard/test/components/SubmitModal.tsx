"use client";

import React, { useEffect, useState } from "react";

export default function SubmitModal({ onSubmit }: { onSubmit: () => void }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("openSubmit", handler);
    return () => window.removeEventListener("openSubmit", handler);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-md shadow relative">
        <button
          className="absolute top-2 right-2 text-xl"
          onClick={() => setOpen(false)}
        >
          ×
        </button>

        <h2 className="text-lg font-semibold">Submit Test?</h2>
        <p className="text-sm text-slate-600 mt-3">
          Are you sure you want to submit your answers?  
          You cannot change anything after submission.
        </p>

        <div className="flex justify-end mt-6 gap-3">
          <button
            className="px-4 py-2 bg-slate-200 rounded"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-[#1C3141] text-white rounded"
            onClick={() => {
              setOpen(false);
              onSubmit();
            }}
          >
            Submit Test
          </button>
        </div>
      </div>
    </div>
  );
}
