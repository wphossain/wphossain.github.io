"use client";

import React, { useEffect, useState } from 'react';

export function PulseCard() {
  const [calls, setCalls] = useState(138);
  const [cpl, setCpl] = useState(29);
  const [ctr, setCtr] = useState(9.1);

  // Simulate live data subtle fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setCalls(prev => prev + (Math.random() > 0.7 ? 1 : 0));
      setCpl(prev => Math.max(24, Math.min(34, prev + (Math.random() > 0.5 ? 1 : -1))));
      setCtr(prev => {
        const next = prev + (Math.random() - 0.5) * 0.2;
        return Math.max(8.5, Math.min(10, parseFloat(next.toFixed(1))));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pulse-card bg-[linear-gradient(165deg,var(--navy-700),var(--panel)_70%)] border border-[var(--line)] rounded-[22px] p-5.5 relative overflow-hidden group">
      <div className="absolute inset-[-40%_-20%_auto_auto] w-[220px] h-[220px] bg-[radial-gradient(circle,var(--blue-glow),transparent_70%)] opacity-50 pointer-events-none" />
      <div className="pulse-top flex items-center justify-between mb-4 relative z-10">
        <span className="pulse-live inline-flex items-center gap-1.75 text-[11px] font-extrabold tracking-[0.08em] uppercase text-[#8ab4f8]">
          <span className="blip w-1.75 h-1.75 rounded-full bg-[var(--blue)] shadow-[0_0_0_0_var(--blue-glow)] animate-[blip_1.8s_infinite]" />
          Live Campaign — HVAC · Dallas
        </span>
        <span className="pulse-sample text-[10px] text-[var(--ink-faint)] font-semibold">Sample data</span>
      </div>
      <div className="pulse-stats grid grid-cols-3 gap-2.5 mb-4 relative z-10">
        <div className="pulse-stat bg-[rgba(5,13,26,0.55)] border border-[var(--line-soft)] rounded-[13px] p-2.75 text-center transition-all duration-300 group-hover:border-[var(--blue)]/40">
          <strong className="block font-display text-[19px] text-white tabular-nums">{calls}</strong>
          <span className="text-[10px] text-[var(--ink-faint)] font-bold tracking-[0.05em] uppercase">Calls</span>
        </div>
        <div className="pulse-stat bg-[rgba(5,13,26,0.55)] border border-[var(--line-soft)] rounded-[13px] p-2.75 text-center transition-all duration-300 group-hover:border-[var(--gold)]/40">
          <strong className="block font-display text-[19px] text-white tabular-nums">${cpl}</strong>
          <span className="text-[10px] text-[var(--ink-faint)] font-bold tracking-[0.05em] uppercase">Cost / Lead</span>
        </div>
        <div className="pulse-stat bg-[rgba(5,13,26,0.55)] border border-[var(--line-soft)] rounded-[13px] p-2.75 text-center transition-all duration-300 group-hover:border-[var(--blue)]/40">
          <strong className="block font-display text-[19px] text-white tabular-nums">{ctr}%</strong>
          <span className="text-[10px] text-[var(--ink-faint)] font-bold tracking-[0.05em] uppercase">CTR</span>
        </div>
      </div>
      <div className="pulse-chart flex items-end gap-1.25 h-16 relative z-10" aria-hidden="true">
        {[38,52,44,68,58,80,70,92,84,100].map((h,i) => (
          <i key={i} className="flex-1 bg-[linear-gradient(180deg,var(--blue),rgba(26,115,232,0.25))] rounded-t-[5px] animate-[grow_0.6s_ease-out_both]" style={{height:`${h}%`,animationDelay:`${i*0.06}s`}} />
        ))}
      </div>
      <p className="pulse-foot mt-3.5 text-[12px] text-[var(--ink-faint)] relative z-10">
        Illustrative dashboard mockup — for layout reference, not a client result.
      </p>
    </div>
  );
}