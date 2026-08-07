"use client";

import React, { useState, useEffect } from 'react';

export function ZcalEmbed() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="zcal-embed-wrap bg-[rgba(5,13,26,0.55)] border border-[var(--line-soft)] rounded-xl p-1.5 min-h-[70px]">
        <div className="flex items-center justify-center text-center min-h-[58px] p-3.5 rounded-lg text-[#aebcda] font-medium text-[13.5px]">
          Loading Calendar...
        </div>
      </div>
    );
  }

  return (
    <div className="zcal-embed-wrap bg-[rgba(5,13,26,0.55)] border border-[var(--line-soft)] rounded-xl p-1.5 min-h-[70px]">
      <div className="zcal-inline-widget">
        <a href="https://zcal.co/i/hJJ3Hx9l" className="flex items-center justify-center text-center min-h-[58px] p-3.5 rounded-lg text-white font-bold text-[13.5px]">
          Audit Your Issue / Website / Tracking Problem - Free - Schedule a meeting
        </a>
      </div>
    </div>
  );
}
