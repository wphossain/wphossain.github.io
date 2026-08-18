"use client";

import React from 'react';
import Link from 'next/link';

interface CaseStudyItem {
  id?: string;
  slug: string;
  badge: string;
  headline: string;
  subline: string;
  dateRange: string;
  metrics: {
    m1: { label: string; value: string; color: string };
    m2: { label: string; value: string; color: string };
    m3: { label: string; value: string; color: string };
    m4: { label: string; value: string; color: string };
  };
  chartType: 'multi' | 'spike' | 'steady';
}

const PORTFOLIO_CARDS: CaseStudyItem[] = [
  {
    slug: 'dallas-emergency-hvac-lead-generation',
    badge: 'Search Campaign',
    headline: '911K Clicks · $356K Managed',
    subline: '3.34% CTR · 27.2M Impressions',
    dateRange: 'Jan 1 – Jun 12, 2026',
    metrics: {
      m1: { label: 'Clicks', value: '911K', color: '#1A73E8' },
      m2: { label: 'Impressions', value: '27.2M', color: '#EA4335' },
      m3: { label: 'CTR', value: '3.34%', color: '#FBBC04' },
      m4: { label: 'Cost', value: '$356K', color: '#0F9D58' },
    },
    chartType: 'multi'
  },
  {
    slug: 'austin-emergency-plumbing-callrail-tracking',
    badge: 'High Conv. Rate',
    headline: '60% Conversion Rate',
    subline: '6 of 10 clicks converted · $91.7 cost',
    dateRange: 'Today · May 14, 2026',
    metrics: {
      m1: { label: 'Clicks', value: '10', color: '#1A73E8' },
      m2: { label: 'Conversions', value: '6.00', color: '#EA4335' },
      m3: { label: 'Conv. rate', value: '60.00%', color: '#FBBC04' },
      m4: { label: 'Cost', value: '$91.7', color: '#0F9D58' },
    },
    chartType: 'spike'
  },
  {
    slug: 'houston-storm-damage-roofing-lead-funnel',
    badge: 'Efficiency Focus',
    headline: '45.45% Conversion Rate',
    subline: '5 conversions · $62.92 cost',
    dateRange: 'Apr 18, 2026',
    metrics: {
      m1: { label: 'Clicks', value: '11', color: '#1A73E8' },
      m2: { label: 'Conversions', value: '5.00', color: '#EA4335' },
      m3: { label: 'Conv. rate', value: '45.45%', color: '#FBBC04' },
      m4: { label: 'Cost', value: '$62.92', color: '#0F9D58' },
    },
    chartType: 'steady'
  }
];

export function PortfolioSection() {
  return (
    <section 
      className="w-full bg-[#080D1A] text-white py-20 lg:py-24 relative overflow-hidden border-b border-slate-800/80" 
      id="portfolio"
    >
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-[radial-gradient(ellipse,rgba(26,115,232,0.07),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-[radial-gradient(ellipse,rgba(245,158,11,0.05),transparent_70%)] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10">
        
        {/* Header matching user reference image */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-[#F59E0B] font-extrabold text-[12px] uppercase tracking-[0.22em] block mb-3 font-mono">
              PORTFOLIO
            </span>
            <h2 className="text-[clamp(32px,4.5vw,54px)] font-display font-extrabold text-white leading-[1.08] tracking-tight">
              Real Results,<br />
              Real Numbers
            </h2>
          </div>

          <Link 
            href="/portfolio" 
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#11192E] border border-slate-700/80 text-[13.5px] font-bold text-white hover:bg-slate-800 hover:border-slate-500 hover:shadow-lg transition-all self-start md:self-end group shadow-sm"
          >
            <span>View All Results</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* 3/2 Image Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {PORTFOLIO_CARDS.map((card, idx) => (
            <Link 
              key={idx} 
              href={`/portfolio/${card.slug}`}
              className="group block relative w-full aspect-[3/2] rounded-[20px] overflow-hidden border border-slate-800 bg-[#0F172A] shadow-xl hover:border-slate-600 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Google Ads Top Navigation Mockup */}
              <div className="absolute inset-0 bg-[#0F172A] overflow-hidden flex flex-col">
                
                {/* Google Ads Bar */}
                <div className="w-full bg-[#1E293B] border-b border-slate-700/60 px-3.5 py-2 flex items-center justify-between text-[10px] text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-[11px] text-white tracking-tight flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4] inline-block" />
                      Google Ads
                    </span>
                    <span className="hidden sm:inline text-slate-400">|</span>
                    <span className="text-slate-400 text-[9.5px]">Overview</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[9.5px] bg-slate-800/90 px-2 py-0.5 rounded border border-slate-700 text-slate-300 font-mono">
                    <span>📅</span>
                    <span>{card.dateRange}</span>
                  </div>
                </div>

                {/* 4 Colored Metric Blocks (Google Ads Style: Blue, Red, Orange, Green) */}
                <div className="p-3 grid grid-cols-4 gap-1.5 z-0">
                  {Object.entries(card.metrics).map(([k, m], mIdx) => (
                    <div 
                      key={k} 
                      className="rounded-lg p-2 flex flex-col justify-between text-white shadow-sm"
                      style={{ backgroundColor: m.color }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-white/90 truncate">{m.label}</span>
                        <span className="text-[8px] text-white/70">▾</span>
                      </div>
                      <strong className="text-[13px] sm:text-[14px] font-extrabold tracking-tight mt-1 leading-none">{m.value}</strong>
                    </div>
                  ))}
                </div>

                {/* Performance Chart Simulation */}
                <div className="flex-1 px-3 pb-16 relative">
                  <svg className="w-full h-full opacity-60 group-hover:opacity-85 transition-opacity" viewBox="0 0 300 90" preserveAspectRatio="none">
                    {/* Grid lines */}
                    <line x1="0" y1="20" x2="300" y2="20" stroke="#334155" strokeWidth="0.5" strokeDasharray="3 3" />
                    <line x1="0" y1="50" x2="300" y2="50" stroke="#334155" strokeWidth="0.5" strokeDasharray="3 3" />
                    <line x1="0" y1="80" x2="300" y2="80" stroke="#334155" strokeWidth="0.5" />

                    {/* Chart curves */}
                    {card.chartType === 'multi' && (
                      <>
                        <path d="M0 60 Q 50 75, 100 45 T 200 30 T 300 15" fill="none" stroke="#1A73E8" strokeWidth="2.5" />
                        <path d="M0 70 Q 70 80, 140 50 T 250 40 T 300 25" fill="none" stroke="#EA4335" strokeWidth="2" />
                        <path d="M0 80 Q 90 60, 160 55 T 270 35 T 300 20" fill="none" stroke="#FBBC04" strokeWidth="2" />
                        <path d="M0 85 Q 80 85, 150 65 T 260 45 T 300 10" fill="none" stroke="#0F9D58" strokeWidth="2.5" />
                      </>
                    )}
                    {card.chartType === 'spike' && (
                      <>
                        <path d="M0 75 L 60 75 L 120 20 L 180 65 L 240 30 L 300 40" fill="none" stroke="#1A73E8" strokeWidth="2.5" />
                        <path d="M0 80 L 70 80 L 130 35 L 190 70 L 250 45 L 300 50" fill="none" stroke="#EA4335" strokeWidth="2" />
                        <path d="M0 85 L 80 85 L 140 40 L 200 75 L 260 50 L 300 55" fill="none" stroke="#FBBC04" strokeWidth="2" />
                        <path d="M0 70 L 50 70 L 110 15 L 170 60 L 230 25 L 300 35" fill="none" stroke="#0F9D58" strokeWidth="2.5" />
                      </>
                    )}
                    {card.chartType === 'steady' && (
                      <>
                        <path d="M0 70 Q 80 65, 150 40 T 240 25 L 300 20" fill="none" stroke="#1A73E8" strokeWidth="2.5" />
                        <path d="M0 75 Q 90 70, 160 50 T 250 35 L 300 30" fill="none" stroke="#EA4335" strokeWidth="2" />
                        <path d="M0 80 Q 100 75, 170 55 T 260 40 L 300 35" fill="none" stroke="#FBBC04" strokeWidth="2" />
                        <path d="M0 65 Q 70 60, 140 35 T 230 20 L 300 15" fill="none" stroke="#0F9D58" strokeWidth="2.5" />
                      </>
                    )}
                  </svg>
                </div>
              </div>

              {/* Frosted Glass Floating Bottom Pill Overlay (Matching Screenshot Reference) */}
              <div className="absolute inset-x-3.5 bottom-3.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-amber-500/25 p-3.5 shadow-2xl transition-all duration-300 group-hover:border-amber-400 group-hover:bg-slate-950/95">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[#FBBF24] text-[11.5px] font-extrabold tracking-wide uppercase font-mono">
                    {card.badge}
                  </span>
                </div>
                <h3 className="text-[15px] sm:text-[16px] font-display font-extrabold text-white leading-snug tracking-tight">
                  {card.headline}
                </h3>
                <p className="text-[12px] text-slate-300 font-medium leading-tight mt-0.5">
                  {card.subline}
                </p>
              </div>

            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
