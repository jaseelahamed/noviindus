"use client";

import React, { useEffect, useState } from "react";

export default function PassageModal() {
  const [open, setOpen] = useState(false);
  const [paragraph, setParagraph] = useState("");

  useEffect(() => {
    const handler = (event) => {
      setParagraph(event.detail?.paragraph || event.paragraph || "");
      setOpen(true);
    };
    window.addEventListener("openPassage", handler);
    return () => window.removeEventListener("openPassage", handler);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded max-w-6xl w-full shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-xl"
          onClick={() => setOpen(false)}
        >
          ×
        </button>

        <h3 className="text-lg font-semibold mb-3">Comprehensive Passage</h3>
        <p className="text-slate-700 whitespace-pre-wrap">{paragraph}</p>
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-3 bg-[#177A9C] text-white text-sm rounded"
            onClick={() => setOpen(false)}
          >
            Minimize
          </button>
        </div>
      </div>
    </div>
  );
}
