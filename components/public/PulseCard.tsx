"use client";

import React from 'react';

export function PulseCard() {
  return (
    <div className="pulse-card bg-[linear-gradient(165deg,var(--navy-700),var(--panel)_70%)] border border-[var(--line)] rounded-[22px] p-5.5 relative overflow-hidden">
      <div className="pulse-top flex items-center justify-between mb-4 relative z-10">
        <span className="pulse-live inline-flex items-center gap-1.75 text-[11px] font-extrabold tracking-[0.08em] uppercase text-[#8ab4f8]">
          <span className="blip w-1.75 h-1.75 rounded-full bg-[var(--blue)] shadow-[0_0_0_0_var(--blue-glow)] animate-[blip_1.8s_infinite]" />
          Live Campaign — HVAC · Dallas
        </span>
        <span className="pulse-sample text-[10px] text-[var(--ink-faint)] font-semibold">Sample data</span>
      </div>
      <div className="pulse-stats grid grid-cols-3 gap-2.5 mb-4 relative z-10">
        <div className="pulse-stat bg-[rgba(5,13,26,0.55)] border border-[var(--line-soft)] rounded-[13px] p-2.75 text-center">
          <strong className="block font-display text-[19px] text-white">142</strong>
          <span className="text-[10px] text-[var(--ink-faint)] font-bold tracking-[0.05em] uppercase">Calls</span>
        </div>
        <div className="pulse-stat bg-[rgba(5,13,26,0.55)] border border-[var(--line-soft)] rounded-[13px] p-2.75 text-center">
          <strong className="block font-display text-[19px] text-white">$28</strong>
          <span className="text-[10px] text-[var(--ink-faint)] font-bold tracking-[0.05em] uppercase">Cost / Lead</span>
        </div>
        <div className="pulse-stat bg-[rgba(5,13,26,0.55)] border border-[var(--line-soft)] rounded-[13px] p-2.75 text-center">
          <strong className="block font-display text-[19px] text-white">9.4%</strong>
          <span className="text-[10px] text-[var(--ink-faint)] font-bold tracking-[0.05em] uppercase">CTR</span>
        </div>
      </div>
      <div className="pulse-chart flex items-end gap-1.25 h-16 relative z-10" aria-hidden="true">
        <i className="flex-1 bg-[linear-gradient(180deg,var(--blue),rgba(26,115,232,0.25))] rounded-t-[5px] h-[38%] animate-[grow_1.1s_ease-out_backwards]" />
        <i className="flex-1 bg-[linear-gradient(180deg,var(--blue),rgba(26,115,232,0.25))] rounded-t-[5px] h-[52%] animate-[grow_1.1s_ease-out_backwards]" />
        <i className="flex-1 bg-[linear-gradient(180deg,var(--blue),rgba(26,115,232,0.25))] rounded-t-[5px] h-[44%] animate-[grow_1.1s_ease-out_backwards]" />
        <i className="flex-1 bg-[linear-gradient(180deg,var(--blue),rgba(26,115,232,0.25))] rounded-t-[5px] h-[68%] animate-[grow_1.1s_ease-out_backwards]" />
        <i className="flex-1 bg-[linear-gradient(180deg,var(--blue),rgba(26,115,232,0.25))] rounded-t-[5px] h-[58%] animate-[grow_1.1s_ease-out_backwards]" />
        <i className="flex-1 bg-[linear-gradient(180deg,var(--blue),rgba(26,115,232,0.25))] rounded-t-[5px] h-[80%] animate-[grow_1.1s_ease-out_backwards]" />
        <i className="flex-1 bg-[linear-gradient(180deg,var(--blue),rgba(26,115,232,0.25))] rounded-t-[5px] h-[70%] animate-[grow_1.1s_ease-out_backwards]" />
        <i className="flex-1 bg-[linear-gradient(180deg,var(--blue),rgba(26,115,232,0.25))] rounded-t-[5px] h-[92%] animate-[grow_1.1s_ease-out_backwards]" />
        <i className="flex-1 bg-[linear-gradient(180deg,var(--blue),rgba(26,115,232,0.25))] rounded-t-[5px] h-[84%] animate-[grow_1.1s_ease-out_backwards]" />
        <i className="flex-1 bg-[linear-gradient(180deg,var(--blue),rgba(26,115,232,0.25))] rounded-t-[5px] h-[100%] animate-[grow_1.1s_ease-out_backwards]" />
      </div>
      <p className="pulse-foot mt-3.5 text-[12px] text-[var(--ink-faint)] relative z-10">
        Illustrative dashboard mockup — for layout reference, not a client result.
      </p>
    </div>
  );
}
