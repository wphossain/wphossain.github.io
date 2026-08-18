"use client";

import React from 'react';
import Image from 'next/image';

/* Count-up animation helper for real-time ticker effect */
function MetricCountUp({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1800,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    let startTimestamp: number | null = null;
    let frameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(ease * to);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(step);
      }
    };

    frameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frameId);
  }, [to, duration]);

  const formatted = prefix + value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + suffix;
  return <span>{formatted}</span>;
}

export function PulseCard({ content }: { content?: any }) {
  return (
    <div className="w-full bg-white border border-[#CBD5E1] rounded-[26px] lg:rounded-[30px] p-5 sm:p-6 lg:p-7 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.12),0_0_60px_-10px_rgba(5,150,105,0.08)] relative overflow-hidden transition-all duration-300 hover:border-slate-400">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle,rgba(26,115,232,0.05),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[radial-gradient(circle,rgba(30,142,62,0.05),transparent_70%)] pointer-events-none" />

      {/* Top Google SERP Header */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-bold text-[#202124] tracking-tight font-display flex items-center gap-1.5">
            <svg width="18" height="18" viewBox="0 0 24 24"><path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.44 1.76 4.44 1.76l2.04-2.1S16.46 2 12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c7.06 0 10-4.95 10-10 0-.67-.04-1.35-.65-.9z" fill="#4285F4"/></svg>
            Sponsored Results
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-extrabold uppercase tracking-wider bg-emerald-50 text-[#059669] border border-emerald-200 shadow-2xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#059669]" />
          </span>
          Top Page Bid
        </span>
      </div>

      {/* ============================================================
          EXACT GOOGLE SEARCH AD UNIT (Matching User Screenshot 1)
          ============================================================ */}
      <div className="bg-white rounded-2xl p-1 relative">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_160px] lg:grid-cols-[1fr_180px] gap-4 items-start">
          
          {/* Left: Ad Copy, Metadata, Ratings & Buttons */}
          <div className="flex flex-col">
            
            {/* Favicon + Business Name & URL */}
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-full bg-[#1A73E8]/10 text-[#1A73E8] grid place-items-center shrink-0 border border-[#1A73E8]/20">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"/></svg>
              </div>
              <div className="flex flex-col leading-tight min-w-0">
                <span className="text-[13px] font-bold text-[#202124] truncate">Local Service Pro</span>
                <span className="text-[11px] text-[#5F6368] truncate">https://www.localservicepro.com</span>
              </div>
              <button className="text-[#5F6368] hover:text-[#202124] ml-auto p-1" aria-label="Ad options">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>
              </button>
            </div>

            {/* Clickable Blue Headline */}
            <h4 className="text-[17px] sm:text-[18px] font-medium text-[#1A0DAB] hover:underline cursor-pointer leading-[1.25] mb-1 font-display">
              Schedule HVAC, Plumbing &amp; Service Repair — Same-Day Dispatch
            </h4>

            {/* Trade & Business Sub-line */}
            <p className="text-[12px] text-[#4D5156] mb-1">
              <strong className="text-[#3C4043] font-semibold">Home Services</strong> · 24/7 Emergency Response · <span className="text-[#137333] font-medium">Open 24 hours</span>
            </p>

            {/* 4.9 Stars Rating & Total Reviews */}
            <div className="flex items-center gap-1.5 text-[12px] text-[#4D5156] mb-2">
              <span className="font-bold text-[#202124]">4.9</span>
              <div className="flex text-[#F9AB00]">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                ))}
              </div>
              <span className="text-[#5F6368] font-medium">(3,509)</span>
            </div>

            {/* Snippet Description */}
            <p className="text-[12.5px] text-[#4D5156] leading-relaxed mb-4">
              Professional HVAC, electrical &amp; plumbing services from Local Service Pro. Upfront transparent pricing, 100% satisfaction guaranteed, &amp; fast dispatched techs.
            </p>

            {/* Rounded Pill CTA Buttons (Website, Directions, Crisp Large Call Us) */}
            <div className="flex flex-wrap items-center gap-2.5 mt-auto">
              
              {/* Website Button */}
              <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#DADCE0] bg-white text-[#1A73E8] hover:bg-[#F8FAFC] hover:border-slate-400 text-[12.5px] font-semibold transition-colors cursor-pointer shadow-2xs">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"/></svg>
                <span>Website</span>
              </div>

              {/* Directions Button */}
              <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#DADCE0] bg-white text-[#1A73E8] hover:bg-[#F8FAFC] hover:border-slate-400 text-[12.5px] font-semibold transition-colors cursor-pointer shadow-2xs">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                <span>Directions</span>
              </div>

              {/* Large, High-Contrast Crisp Call Us Button */}
              <div className="relative">
                <div className="relative flex items-center gap-2 px-4.5 py-2 rounded-full bg-[#059669] hover:bg-[#047857] text-white text-[13px] font-bold shadow-sm transition-all cursor-pointer">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1.1.5 1.1 1.1V20c0 .6-.5 1.1-1.1 1.1C10.6 21.1 2.9 13.4 2.9 3.1 2.9 2.5 3.4 2 4 2h3.3c.6 0 1.1.5 1.1 1.1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1L6.6 10.8z"/></svg>
                  <span>Call us (24/7)</span>
                </div>
              </div>

            </div>

          </div>

          {/* Right: Real Branded Service Van Thumbnail with Carousel Dots */}
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-[#CBD5E1] bg-slate-100 shadow-sm group">
            <Image
              src="/service-van.jpg"
              alt="Local Service Pro - Branded HVAC, Plumbing & Electric Service Van"
              fill
              sizes="(min-width: 768px) 180px, 100vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Carousel Slider Pill Overlay */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-full text-white text-[9px] shadow-sm pointer-events-none">
              <span className="opacity-70">‹</span>
              <span className="w-3 h-1 bg-white rounded-full inline-block" />
              <span className="w-1 h-1 bg-white/50 rounded-full inline-block" />
              <span className="opacity-70">›</span>
            </div>
          </div>

        </div>
      </div>

      {/* ============================================================
          ANIMATED FLOW MARKER (With Enhanced Generous Spacing Gap)
          ============================================================ */}
      <div className="my-6 relative flex items-center justify-center" aria-hidden="true">
        <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-slate-300 to-transparent relative">
          <span 
            className="absolute -top-1.5 h-3 w-3 rounded-full bg-[#059669] shadow-[0_0_8px_2px_#059669] animate-flow-rail"
          />
        </div>
        <span className="absolute bg-white border border-[#CBD5E1] px-4 py-1 rounded-full text-[10.5px] font-extrabold uppercase tracking-widest text-[#0F172A] shadow-xs flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse" />
          High-Intent Clicks ➔ Verified ROI
        </span>
      </div>

      {/* ============================================================
          GOOGLE ADS 4-COLOR KPI SUMMARY DASHBOARD (Matching User Screenshot 3)
          ============================================================ */}
      <div className="grid grid-cols-2 md:grid-cols-4 rounded-xl overflow-hidden shadow-md border border-slate-200">
        
        {/* 1. BLUE: CLICKS */}
        <div className="bg-[#1A73E8] p-3.5 sm:p-4 text-white flex flex-col justify-between min-h-[92px] relative overflow-hidden group hover:brightness-105 transition-all">
          <div className="flex items-center justify-between text-[12px] font-semibold text-white/95">
            <span className="flex items-center gap-0.5 cursor-pointer">
              Clicks <span className="text-[10px]">▾</span>
            </span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 3l7 18 3-7 7-3L3 3z"/></svg>
          </div>
          <div className="text-[25px] sm:text-[28px] font-extrabold text-white tracking-tight font-display leading-none mt-1.5">
            <MetricCountUp to={689} suffix="K" />
          </div>
        </div>

        {/* 2. RED: CONVERSIONS */}
        <div className="bg-[#D93025] p-3.5 sm:p-4 text-white flex flex-col justify-between min-h-[92px] relative overflow-hidden group hover:brightness-105 transition-all">
          <div className="flex items-center justify-between text-[12px] font-semibold text-white/95">
            <span className="flex items-center gap-0.5 cursor-pointer">
              Conversions <span className="text-[10px]">▾</span>
            </span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div className="text-[25px] sm:text-[28px] font-extrabold text-white tracking-tight font-display leading-none mt-1.5">
            <MetricCountUp to={521} suffix="K" />
          </div>
        </div>

        {/* 3. AMBER/YELLOW: CONV. RATE */}
        <div className="bg-[#F9AB00] p-3.5 sm:p-4 text-white flex flex-col justify-between min-h-[92px] relative overflow-hidden group hover:brightness-105 transition-all">
          <div className="flex items-center justify-between text-[12px] font-semibold text-white/95">
            <span className="flex items-center gap-0.5 cursor-pointer">
              Conv. rate <span className="text-[10px]">▾</span>
            </span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 3v18h18"/><path d="M18 9l-5 5-4-4-6 6"/></svg>
          </div>
          <div className="text-[25px] sm:text-[28px] font-extrabold text-white tracking-tight font-display leading-none mt-1.5">
            <MetricCountUp to={31.76} suffix="%" decimals={2} />
          </div>
        </div>

        {/* 4. GREEN: COST */}
        <div className="bg-[#1E8E3E] p-3.5 sm:p-4 text-white flex flex-col justify-between min-h-[92px] relative overflow-hidden group hover:brightness-105 transition-all">
          <div className="flex items-center justify-between text-[12px] font-semibold text-white/95">
            <span className="flex items-center gap-0.5 cursor-pointer">
              Cost <span className="text-[10px]">▾</span>
            </span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
          </div>
          <div className="text-[25px] sm:text-[28px] font-extrabold text-white tracking-tight font-display leading-none mt-1.5">
            <MetricCountUp to={41.3} prefix="$" suffix="K" decimals={1} />
          </div>
        </div>

      </div>

    </div>
  );
}
