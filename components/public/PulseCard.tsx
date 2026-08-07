"use client";

import React, { useEffect, useState } from 'react';

export function PulseCard() {
  const [calls, setCalls] = useState(165);
  const [cpl, setCpl] = useState(29);
  const [ctr, setCtr] = useState(8.5);

  // Live counter simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCalls(prev => prev + (Math.random() > 0.85 ? 1 : 0));
      setCpl(prev => Math.max(25, Math.min(32, prev + (Math.random() > 0.5 ? 0.5 : -0.5))));
      setCtr(prev => {
        const next = prev + (Math.random() - 0.5) * 0.15;
        return Math.max(8.2, Math.min(9.4, parseFloat(next.toFixed(1))));
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pulse-card bg-[linear-gradient(165deg,rgba(10,28,52,0.9),rgba(5,15,31,0.95))] border border-[var(--line)] rounded-[24px] p-6 relative overflow-hidden group shadow-2xl transition-all duration-500 hover:border-blue-500/35">
      {/* Background radial glow */}
      <div className="absolute inset-[-40%_-20%_auto_auto] w-[260px] h-[260px] bg-[radial-gradient(circle,rgba(26,115,232,0.18),transparent_70%)] opacity-70 pointer-events-none" />
      
      {/* Search Ad Mockup Section */}
      <div className="ad-mockup bg-[#050f1f]/80 border border-white/5 rounded-xl p-4.5 mb-5.5 relative z-10 transition-all duration-500 group-hover:bg-[#050f1f]/95">
        <div className="flex items-center justify-between gap-1.5 border-b border-white/5 pb-2.5 mb-3">
          <span className="text-[9.5px] font-extrabold uppercase tracking-wider text-[#7b8bad] flex items-center gap-1.5">
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            Google Search Ads Preview
          </span>
          <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-bold">
            ● Active
          </span>
        </div>
        
        {/* Ad Contents */}
        <div className="flex items-start gap-1 mb-1.5">
          <span className="text-[10px] font-extrabold text-[#7b8bad] border border-white/10 px-1 py-0.2 rounded bg-white/5 mr-1.5 mt-0.5 select-none">Ad</span>
          <span className="text-[11.5px] text-[#aebcda] truncate">www.yourhvaccompany.com/emergency-service</span>
        </div>
        
        <h4 className="text-[14.5px] font-bold text-[#4c9bff] hover:underline cursor-pointer leading-snug mb-1.5">
          24/7 Emergency AC Repair — Same-Day Service Guarantee
        </h4>
        
        <p className="text-[11.8px] text-[#7b8bad] leading-normal mb-3">
          Licensed & certified HVAC technicians near you. Fast response times, upfront transparent pricing, & 100% satisfaction guaranteed. Book online in 60s.
        </p>
        
        {/* Dynamic Ad Badges */}
        <div className="flex gap-2 flex-wrap">
          <span className="px-2 py-1 text-[10px] font-semibold bg-[#1a73e8]/10 text-[#4c9bff] rounded border border-[#1a73e8]/20">
            ✓ GTM Call-Tracking
          </span>
          <span className="px-2 py-1 text-[10px] font-semibold bg-[#f2a93d]/10 text-[#f2a93d] rounded border border-[#f2a93d]/20">
            ✓ GA4 Conversion Active
          </span>
        </div>
      </div>

      {/* Live Metrics Header */}
      <div className="pulse-top flex items-center justify-between mb-4 relative z-10">
        <span className="pulse-live inline-flex items-center gap-1.75 text-[10px] font-extrabold tracking-[0.08em] uppercase text-[#aebcda]">
          <span className="blip w-2 h-2 rounded-full bg-[var(--blue)] shadow-[0_0_0_0_var(--blue-glow)] animate-[blip_1.8s_infinite]" />
          Live Dallas HVAC Campaign
        </span>
        <span className="pulse-sample text-[9px] text-[var(--ink-faint)] font-bold uppercase tracking-wider">Real-Time Data</span>
      </div>

      {/* Metrics Row */}
      <div className="pulse-stats grid grid-cols-3 gap-3 mb-4.5 relative z-10">
        <div className="pulse-stat bg-[#050f1f]/60 border border-white/5 rounded-xl p-3 text-center transition-all duration-300 hover:border-blue-500/20">
          <strong className="block font-display text-[21px] text-white tabular-nums tracking-tight">{calls}</strong>
          <span className="text-[9.5px] text-[var(--ink-faint)] font-extrabold tracking-[0.05em] uppercase block mt-0.5">Calls</span>
        </div>
        <div className="pulse-stat bg-[#050f1f]/60 border border-white/5 rounded-xl p-3 text-center transition-all duration-300 hover:border-blue-500/20">
          <strong className="block font-display text-[21px] text-white tabular-nums tracking-tight">${cpl.toFixed(2)}</strong>
          <span className="text-[9.5px] text-[var(--ink-faint)] font-extrabold tracking-[0.05em] uppercase block mt-0.5">CPL</span>
        </div>
        <div className="pulse-stat bg-[#050f1f]/60 border border-white/5 rounded-xl p-3 text-center transition-all duration-300 hover:border-blue-500/20">
          <strong className="block font-display text-[21px] text-white tabular-nums tracking-tight">{ctr.toFixed(1)}%</strong>
          <span className="text-[9.5px] text-[var(--ink-faint)] font-extrabold tracking-[0.05em] uppercase block mt-0.5">CTR</span>
        </div>
      </div>

      {/* Mini Chart visualization */}
      <div className="pulse-chart flex items-end gap-1.5 h-14 relative z-10" aria-hidden="true">
        {[42, 58, 48, 72, 62, 85, 74, 94, 88, 100].map((h, i) => (
          <i 
            key={i} 
            className="flex-1 bg-[linear-gradient(180deg,rgba(26,115,232,0.85),rgba(26,115,232,0.15))] rounded-t-[4px] transition-all duration-500 ease-out" 
            style={{ 
              height: `${h}%`,
              animation: 'grow 0.6s ease-out both',
              animationDelay: `${i * 0.05}s`
            }} 
          />
        ))}
      </div>
      
      <p className="pulse-foot mt-4 text-[11px] text-[var(--ink-faint)] relative z-10 leading-normal border-t border-white/5 pt-3">
        Interactive ad dashboard mockup — simulating actual call-volume performance.
      </p>
    </div>
  );
}
