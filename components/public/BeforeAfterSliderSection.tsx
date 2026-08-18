"use client";

import React, { useState, useRef, useCallback } from 'react';

interface BeforeAfterItem {
  trade: string;
  location: string;
  badge1: string;
  badge2: string;
  badge3: string;
  period: string;
  before: {
    cpl: string;
    cplLabel: string;
    leads: string;
    leadsLabel: string;
    convRate: string;
    convLabel: string;
    waste: string;
    wasteLabel: string;
  };
  after: {
    cpl: string;
    cplLabel: string;
    leads: string;
    leadsLabel: string;
    convRate: string;
    convLabel: string;
    cost: string;
    costLabel: string;
  };
}

const COMPARISON_DATA: BeforeAfterItem[] = [
  {
    trade: "Emergency HVAC & AC Replacement",
    location: "Dallas-Fort Worth, TX",
    badge1: "↑ Leads +310%",
    badge2: "↓ CPL -58%",
    badge3: "Quality Score 9/10",
    period: "Optimization Period: 60 Days",
    before: {
      cpl: "$142",
      cplLabel: "Cost / Lead (Too High)",
      leads: "18",
      leadsLabel: "Booked Jobs (Low)",
      convRate: "4.2%",
      convLabel: "Conv. Rate (Weak)",
      waste: "43%",
      wasteLabel: "Budget Waste (DIY)"
    },
    after: {
      cpl: "$59",
      cplLabel: "Cost / Lead (-58%)",
      leads: "74",
      leadsLabel: "Booked Jobs (4.1x)",
      convRate: "34.8%",
      convLabel: "Conv. Rate (High CRO)",
      cost: "$4.3K",
      costLabel: "Monthly Spend"
    }
  },
  {
    trade: "Residential Plumbing & Drain Cleaning",
    location: "Austin & Round Rock, TX",
    badge1: "↑ Booked Calls 4x",
    badge2: "↓ CPL -52%",
    badge3: "ROI +240%",
    period: "Optimization Period: 90 Days",
    before: {
      cpl: "$128",
      cplLabel: "Cost / Lead (Burned)",
      leads: "24",
      leadsLabel: "Monthly Calls (Low)",
      convRate: "3.8%",
      convLabel: "Conv. Rate (Leaking)",
      waste: "39%",
      wasteLabel: "Job Seeker Waste"
    },
    after: {
      cpl: "$61",
      cplLabel: "Cost / Lead (-52%)",
      leads: "96",
      leadsLabel: "Monthly Calls (4x)",
      convRate: "31.2%",
      convLabel: "Conv. Rate (CallRail)",
      cost: "$5.8K",
      costLabel: "Monthly Spend"
    }
  }
];

function SliderCard({ item }: { item: BeforeAfterItem }) {
  const [sliderPos, setSliderPos] = useState(50); // percentage (0 - 100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clamped = Math.max(10, Math.min(90, (x / rect.width) * 100));
    setSliderPos(clamped);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  }, [handleMove]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  }, [isDragging, handleMove]);

  return (
    <div className="bg-white border border-[#CBD5E1] rounded-[26px] p-5 sm:p-7 shadow-xs hover:border-[#0F172A] hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      
      {/* Card Top Title & Highlight Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#E2E8F0] mb-5">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#059669] block mb-1">
            {item.location}
          </span>
          <h3 className="text-[17px] sm:text-[18px] font-bold text-[#0F172A] font-display leading-snug">
            {item.trade}
          </h3>
        </div>

        {/* Highlight Pills */}
        <div className="flex flex-wrap items-center gap-1.5 shrink-0">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-50 text-[#059669] border border-emerald-200">
            {item.badge1}
          </span>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-blue-50 text-[#1A73E8] border border-blue-200">
            {item.badge2}
          </span>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-slate-100 text-[#0F172A] border border-[#CBD5E1]">
            {item.badge3}
          </span>
        </div>
      </div>

      {/* Interactive Split Slider Container */}
      <div
        ref={containerRef}
        className="relative w-full rounded-2xl overflow-hidden select-none touch-none cursor-ew-resize border border-[#CBD5E1] bg-slate-50 min-h-[290px]"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* ============================================================
            LAYER 1: AFTER STATE (Exact 4-Color Google Ads Hero Metrics)
            ============================================================ */}
        <div className="absolute inset-0 bg-[#F8FAFC] p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
            <span className="px-3 py-1 rounded-full bg-[#059669] text-white text-[11px] font-extrabold uppercase tracking-wider shadow-xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              ✓ AFTER (WP Hossain Architecture)
            </span>
            <span className="text-[11.5px] font-bold text-[#059669] hidden sm:inline-block">
              Top Page Rank &amp; Call Tracking
            </span>
          </div>

          {/* 4-Color Google Ads Tiles (Exact Match to Hero Section) */}
          <div className="grid grid-cols-2 md:grid-cols-4 rounded-xl overflow-hidden shadow-sm border border-slate-200 my-auto">
            
            {/* 1. BLUE TILE */}
            <div className="bg-[#1A73E8] p-3 text-white flex flex-col justify-between min-h-[96px]">
              <div className="flex items-center justify-between text-[11px] font-semibold text-white/95">
                <span>Clicks &amp; Leads ▾</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 3l7 18 3-7 7-3L3 3z"/></svg>
              </div>
              <div>
                <div className="text-[22px] sm:text-[24px] font-extrabold text-white tracking-tight font-display leading-none">
                  {item.after.leads}
                </div>
                <span className="text-[9.5px] font-bold text-blue-100 block mt-0.5 truncate">
                  {item.after.leadsLabel}
                </span>
              </div>
            </div>

            {/* 2. RED TILE */}
            <div className="bg-[#D93025] p-3 text-white flex flex-col justify-between min-h-[96px]">
              <div className="flex items-center justify-between text-[11px] font-semibold text-white/95">
                <span>Cost / Lead ▾</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/></svg>
              </div>
              <div>
                <div className="text-[22px] sm:text-[24px] font-extrabold text-white tracking-tight font-display leading-none">
                  {item.after.cpl}
                </div>
                <span className="text-[9.5px] font-bold text-red-100 block mt-0.5 truncate">
                  {item.after.cplLabel}
                </span>
              </div>
            </div>

            {/* 3. AMBER TILE */}
            <div className="bg-[#F9AB00] p-3 text-white flex flex-col justify-between min-h-[96px]">
              <div className="flex items-center justify-between text-[11px] font-semibold text-white/95">
                <span>Conv. Rate ▾</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 3v18h18"/><path d="M18 9l-5 5-4-4-6 6"/></svg>
              </div>
              <div>
                <div className="text-[22px] sm:text-[24px] font-extrabold text-white tracking-tight font-display leading-none">
                  {item.after.convRate}
                </div>
                <span className="text-[9.5px] font-bold text-amber-100 block mt-0.5 truncate">
                  {item.after.convLabel}
                </span>
              </div>
            </div>

            {/* 4. GREEN TILE */}
            <div className="bg-[#1E8E3E] p-3 text-white flex flex-col justify-between min-h-[96px]">
              <div className="flex items-center justify-between text-[11px] font-semibold text-white/95">
                <span>Ad Spend ▾</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/></svg>
              </div>
              <div>
                <div className="text-[22px] sm:text-[24px] font-extrabold text-white tracking-tight font-display leading-none">
                  {item.after.cost}
                </div>
                <span className="text-[9.5px] font-bold text-emerald-100 block mt-0.5 truncate">
                  {item.after.costLabel}
                </span>
              </div>
            </div>

          </div>

          <div className="flex items-center justify-between text-[11.5px] text-[#059669] font-bold border-t border-emerald-200/60 pt-2">
            <span>✓ Negative keyword moat applied</span>
            <span>100% CallRail DNI Attribution</span>
          </div>
        </div>

        {/* ============================================================
            LAYER 2: BEFORE STATE (Clipped Warning State)
            ============================================================ */}
        <div 
          className="absolute inset-0 bg-[#FEF2F2] p-4 sm:p-5 flex flex-col justify-between border-r-2 border-[#0F172A]"
          style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
        >
          <div className="flex items-center justify-between pb-2 border-b border-red-200">
            <span className="px-3 py-1 rounded-full bg-red-600 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-xs">
              ⚠️ BEFORE (Past Agency Setup)
            </span>
            <span className="text-[11.5px] font-bold text-red-600 hidden sm:inline-block">
              Broad Match &amp; Low Intent Bleed
            </span>
          </div>

          {/* 4-Color Warning Tiles for Before State */}
          <div className="grid grid-cols-2 md:grid-cols-4 rounded-xl overflow-hidden shadow-sm border border-red-200 my-auto">
            
            {/* 1. Dark Slate (Low Leads) */}
            <div className="bg-[#475569] p-3 text-white flex flex-col justify-between min-h-[96px]">
              <div className="flex items-center justify-between text-[11px] font-semibold text-white/90">
                <span>Clicks / Leads ▾</span>
                <span className="text-xs">⚠️</span>
              </div>
              <div>
                <div className="text-[22px] sm:text-[24px] font-extrabold text-white tracking-tight font-display leading-none">
                  {item.before.leads}
                </div>
                <span className="text-[9.5px] font-bold text-slate-200 block mt-0.5 truncate">
                  {item.before.leadsLabel}
                </span>
              </div>
            </div>

            {/* 2. Red Tile (High CPL) */}
            <div className="bg-[#B91C1C] p-3 text-white flex flex-col justify-between min-h-[96px]">
              <div className="flex items-center justify-between text-[11px] font-semibold text-white/90">
                <span>Cost / Lead ▾</span>
                <span className="text-xs">🔻</span>
              </div>
              <div>
                <div className="text-[22px] sm:text-[24px] font-extrabold text-white tracking-tight font-display leading-none">
                  {item.before.cpl}
                </div>
                <span className="text-[9.5px] font-bold text-red-200 block mt-0.5 truncate">
                  {item.before.cplLabel}
                </span>
              </div>
            </div>

            {/* 3. Dark Amber (Low Conv Rate) */}
            <div className="bg-[#D97706] p-3 text-white flex flex-col justify-between min-h-[96px]">
              <div className="flex items-center justify-between text-[11px] font-semibold text-white/90">
                <span>Conv. Rate ▾</span>
                <span className="text-xs">⚠️</span>
              </div>
              <div>
                <div className="text-[22px] sm:text-[24px] font-extrabold text-white tracking-tight font-display leading-none">
                  {item.before.convRate}
                </div>
                <span className="text-[9.5px] font-bold text-amber-200 block mt-0.5 truncate">
                  {item.before.convLabel}
                </span>
              </div>
            </div>

            {/* 4. Deep Red (Wasted Spend) */}
            <div className="bg-[#991B1B] p-3 text-white flex flex-col justify-between min-h-[96px]">
              <div className="flex items-center justify-between text-[11px] font-semibold text-white/90">
                <span>Budget Bleed ▾</span>
                <span className="text-xs">🔻</span>
              </div>
              <div>
                <div className="text-[22px] sm:text-[24px] font-extrabold text-white tracking-tight font-display leading-none">
                  {item.before.waste}
                </div>
                <span className="text-[9.5px] font-bold text-red-200 block mt-0.5 truncate">
                  {item.before.wasteLabel}
                </span>
              </div>
            </div>

          </div>

          <div className="flex items-center justify-between text-[11.5px] text-red-600 font-bold border-t border-red-200 pt-2">
            <span>⚠️ Zero negative keyword filtering</span>
            <span>Vanity Clicks Only</span>
          </div>
        </div>

        {/* ============================================================
            DRAG DIVIDER HANDLE BAR
            ============================================================ */}
        <div 
          className="absolute top-0 bottom-0 pointer-events-none z-20"
          style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
        >
          <div className="w-0.5 h-full bg-[#0F172A]" />
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white border-2 border-[#0F172A] shadow-xl flex items-center justify-center text-[#0F172A] text-[12px] font-black">
            ↔
          </div>
        </div>

      </div>

      {/* Helper text & Card Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-4 mt-2 text-[12px] text-[#64748B]">
        <span className="flex items-center gap-1.5 font-medium">
          <span className="text-slate-400">↔</span> Drag slider left/right to compare
        </span>
        <span className="font-bold text-[#0F172A]">
          {item.period}
        </span>
      </div>

    </div>
  );
}

export function BeforeAfterSliderSection() {
  return (
    <section id="proof-of-work" className="w-full bg-[#F8FAFC] border-b border-[#CBD5E1] py-20 relative overflow-hidden">
      
      {/* Ambient background accents */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-[radial-gradient(ellipse,rgba(5,150,105,0.035),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-[radial-gradient(ellipse,rgba(26,115,232,0.03),transparent_70%)] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10">
        
        {/* Section Header (Left-Aligned matching site design system) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-[760px] text-left">
            <span className="eyebrow mb-3.5">
              Proof of Work
            </span>
            <h2 className="text-[clamp(28px,4vw,42px)] font-bold text-[#0F172A] leading-tight mb-3 font-display">
              Google Ads Results — Before &amp; After
            </h2>
            <p className="text-[16.5px] text-[#475569] leading-relaxed">
              Real contractor campaigns before and after optimization. Drag the slider to compare how high-intent keyword architecture and negative moats turn wasted spend into profitable booked jobs.
            </p>
          </div>

          <div className="hidden lg:block text-right shrink-0">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-[#CBD5E1] text-[13px] font-bold text-[#0F172A] shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#059669] animate-pulse" />
              <span>Verified Account Data</span>
            </div>
          </div>
        </div>

        {/* 2-Column Comparison Slider Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {COMPARISON_DATA.map((item, idx) => (
            <SliderCard key={idx} item={item} />
          ))}
        </div>

      </div>
    </section>
  );
}
