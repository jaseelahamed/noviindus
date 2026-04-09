"use client";

import React from "react";

export default function Timer({ remainingSeconds = 0 }) {
  const format = (sec) => {
    const h = Math.floor(sec / 3600).toString().padStart(2, "0");
    const m = Math.floor((sec % 3600) / 60).toString().padStart(2, "0");
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${h} : ${m} : ${s}`;
  };

  return (
    <div className="px-4 py-2 bg-[#1C3141] text-white rounded text-sm font-semibold">
      {format(remainingSeconds)}
    </div>
  );
}
