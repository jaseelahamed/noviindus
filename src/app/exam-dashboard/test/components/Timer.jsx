"use client";

import React from "react";

export default function Timer({ remainingSeconds = 0 }) {
  const format = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="inline-flex items-center gap-2 rounded-md bg-[#23384B] px-3 py-1.5 text-sm font-medium text-white">
      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/15 text-[10px]">
        ⏱
      </span>
      <span>{format(remainingSeconds)}</span>
    </div>
  );
}
