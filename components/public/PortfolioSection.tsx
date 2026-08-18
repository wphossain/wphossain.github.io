"use client";

import React from 'react';
import Link from 'next/link';

export interface CaseStudyItem {
  id?: string;
  slug: string;
  niche: string;
  location: string;
  badge: string;
  badgeColor?: 'blue' | 'amber' | 'emerald';
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
    niche: 'Emergency HVAC',
    location: 'Dallas, TX',
    badge: 'Search Campaign',
    badgeColor: 'blue',
    headline: '911K Clicks · $356K Managed',
    subline: '3.34% CTR · 27.2M Impressions · -70% Cost Per Lead',
    dateRange: 'Jan 1 – Jun 12, 2026',
    metrics: {
      m1: { label: 'Clicks', value: '911K', color: '#1A73E8' },
      m2: { label: 'Impressions', value: '27.2M', color: '#EA4335' },
      m3: { label: 'CTR', value: '3.34%', color: '#D97706' },
      m4: { label: 'Cost', value: '$356K', color: '#059669' },
    },
    chartType: 'multi'
  },
  {
    slug: 'austin-emergency-plumbing-callrail-tracking',
    niche: 'Master Plumbing',
    location: 'Austin, TX',
    badge: 'High Conv. Rate',
    badgeColor: 'emerald',
    headline: '60% Conversion Rate',
    subline: '6 of 10 clicks converted · $28.50 CPL with CallRail DNI',
    dateRange: 'Today · May 14, 2026',
    metrics: {
      m1: { label: 'Clicks', value: '10', color: '#1A73E8' },
      m2: { label: 'Conversions', value: '6.00', color: '#EA4335' },
      m3: { label: 'Conv. rate', value: '60.00%', color: '#D97706' },
      m4: { label: 'Cost', value: '$91.7', color: '#059669' },
    },
    chartType: 'spike'
  },
  {
    slug: 'houston-storm-damage-roofing-lead-funnel',
    niche: 'Storm Damage Roofing',
    location: 'Houston, TX',
    badge: 'Efficiency Focus',
    badgeColor: 'amber',
    headline: '45.45% Conversion Rate',
    subline: '5 conversions · $62.92 cost · $148K pipeline in 60 days',
    dateRange: 'Apr 18, 2026',
    metrics: {
      m1: { label: 'Clicks', value: '11', color: '#1A73E8' },
      m2: { label: 'Conversions', value: '5.00', color: '#EA4335' },
      m3: { label: 'Conv. rate', value: '45.45%', color: '#D97706' },
      m4: { label: 'Cost', value: '$62.92', color: '#059669' },
    },
    chartType: 'steady'
  }
];

export function PortfolioSection({ items }: { items?: CaseStudyItem[] }) {
  const cards = items && items.length > 0 ? items : PORTFOLIO_CARDS;

  return (
    <section 
      className="w-full bg-white text-[#0F172A] py-20 lg:py-24 relative overflow-hidden border-b border-[#CBD5E1]" 
      id="portfolio"
    >
      {/* Subtle ambient light backlights */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-[radial-gradient(ellipse,rgba(26,115,232,0.04),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-[radial-gradient(ellipse,rgba(5,150,105,0.035),transparent_70%)] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="eyebrow mb-3.5">
              PROOF &amp; CASE STUDIES
            </span>
            <h2 className="text-[clamp(30px,4.5vw,52px)] font-display font-extrabold text-[#0F172A] leading-[1.08] tracking-tight">
              Real Results,<br />
              Real Numbers
            </h2>
            <p className="text-[16px] lg:text-[17px] text-[#475569] leading-relaxed mt-3">
              Unedited Google Ads performance data from active contractor campaigns. High-intent search terms, negative keyword fortresses, and verified call tracking.
            </p>
          </div>

          <Link 
            href="/portfolio" 
            className="btn btn-ghost px-6 py-3 text-[13.5px] font-bold rounded-xl flex items-center gap-2 group self-start md:self-end shadow-2xs hover:border-[#1A73E8] hover:text-[#1A73E8]"
          >
            <span>View All Case Studies</span>
            <span className="group-hover:translate-x-1 transition-transform text-[15px]">→</span>
          </Link>
        </div>

        {/* 3-Card Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {cards.map((card, idx) => (
            <Link 
              key={idx} 
              href={`/portfolio/${card.slug}`}
              className="group flex flex-col rounded-[24px] overflow-hidden border border-[#CBD5E1] bg-white shadow-xs hover:border-[#1A73E8] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* Google Ads Top Navigation Mockup Bar */}
              <div className="w-full bg-[#F8FAFC] border-b border-[#E2E8F0] px-4 py-2.5 flex items-center justify-between text-[11px] text-[#475569]">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-[12px] text-[#0F172A] tracking-tight flex items-center gap-1.5 font-display">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1A73E8] inline-block shadow-xs" />
                    Google Ads
                  </span>
                  <span className="text-[#CBD5E1]">|</span>
                  <span className="text-[#64748B] text-[10px] font-medium hidden sm:inline">Overview</span>
                </div>
                
                <div className="flex items-center gap-1.5 text-[9.5px] bg-white px-2.5 py-0.5 rounded-md border border-[#CBD5E1] text-[#475569] font-mono shadow-2xs">
                  <span>📅</span>
                  <span>{card.dateRange}</span>
                </div>
              </div>

              {/* 4 Colored Metric Blocks (Google Ads UI KPI Tiles) */}
              <div className="p-3 bg-slate-50/70 border-b border-[#E2E8F0] grid grid-cols-4 gap-2">
                {Object.entries(card.metrics).map(([k, m]) => (
                  <div 
                    key={k} 
                    className="rounded-xl p-2 sm:p-2.5 flex flex-col justify-between text-white shadow-sm transition-transform duration-200 group-hover:scale-[1.02]"
                    style={{ backgroundColor: m.color }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-white/95 truncate font-mono">{m.label}</span>
                      <span className="text-[8px] text-white/80">▾</span>
                    </div>
                    <strong className="text-[13px] sm:text-[15px] font-extrabold tracking-tight mt-1.5 leading-none font-display">
                      {m.value}
                    </strong>
                  </div>
                ))}
              </div>

              {/* Performance Chart Simulation (Crisp Light Theme Graph) */}
              <div className="px-4 py-3 bg-white relative h-28 overflow-hidden border-b border-[#E2E8F0]">
                <svg 
                  className="w-full h-full opacity-85 group-hover:opacity-100 transition-opacity" 
                  viewBox="0 0 300 90" 
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id={`chart-grad-blue-${idx}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1A73E8" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#1A73E8" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Clean Grid lines */}
                  <line x1="0" y1="15" x2="300" y2="15" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="0" y1="45" x2="300" y2="45" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="0" y1="75" x2="300" y2="75" stroke="#E2E8F0" strokeWidth="1" />

                  {/* Chart curves */}
                  {card.chartType === 'multi' && (
                    <>
                      <path d="M0 60 Q 50 75, 100 45 T 200 30 T 300 15 L 300 75 L 0 75 Z" fill={`url(#chart-grad-blue-${idx})`} />
                      <path d="M0 60 Q 50 75, 100 45 T 200 30 T 300 15" fill="none" stroke="#1A73E8" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M0 70 Q 70 80, 140 50 T 250 40 T 300 25" fill="none" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" />
                      <path d="M0 80 Q 90 60, 160 55 T 270 35 T 300 20" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
                      <path d="M0 85 Q 80 85, 150 65 T 260 45 T 300 10" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
                    </>
                  )}
                  {card.chartType === 'spike' && (
                    <>
                      <path d="M0 70 L 50 70 L 110 15 L 170 60 L 230 25 L 300 35 L 300 75 L 0 75 Z" fill={`url(#chart-grad-blue-${idx})`} />
                      <path d="M0 75 L 60 75 L 120 20 L 180 65 L 240 30 L 300 40" fill="none" stroke="#1A73E8" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M0 80 L 70 80 L 130 35 L 190 70 L 250 45 L 300 50" fill="none" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" />
                      <path d="M0 85 L 80 85 L 140 40 L 200 75 L 260 50 L 300 55" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
                      <path d="M0 70 L 50 70 L 110 15 L 170 60 L 230 25 L 300 35" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
                    </>
                  )}
                  {card.chartType === 'steady' && (
                    <>
                      <path d="M0 65 Q 70 60, 140 35 T 230 20 L 300 15 L 300 75 L 0 75 Z" fill={`url(#chart-grad-blue-${idx})`} />
                      <path d="M0 70 Q 80 65, 150 40 T 240 25 L 300 20" fill="none" stroke="#1A73E8" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M0 75 Q 90 70, 160 50 T 250 35 L 300 30" fill="none" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" />
                      <path d="M0 80 Q 100 75, 170 55 T 260 40 L 300 35" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
                      <path d="M0 65 Q 70 60, 140 35 T 230 20 L 300 15" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
                    </>
                  )}
                </svg>
              </div>

              {/* Case Study Meta & Summary Footer */}
              <div className="p-5 bg-white flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-extrabold uppercase font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#059669] border border-emerald-200">
                      {card.badge}
                    </span>
                    <span className="text-[11.5px] font-bold text-[#64748B]">
                      {card.niche} · {card.location}
                    </span>
                  </div>

                  <h3 className="text-[17px] sm:text-[18px] font-display font-extrabold text-[#0F172A] leading-snug tracking-tight group-hover:text-[#1A73E8] transition-colors">
                    {card.headline}
                  </h3>

                  <p className="text-[13px] text-[#475569] font-medium leading-relaxed mt-1.5">
                    {card.subline}
                  </p>
                </div>

                <div className="mt-4 pt-3.5 border-t border-[#F1F5F9] flex items-center justify-between text-[13px] font-bold text-[#1A73E8] group-hover:text-[#1557B0]">
                  <span>Explore Full Case Study</span>
                  <span className="group-hover:translate-x-1.5 transition-transform">→</span>
                </div>
              </div>

            </Link>
          ))}
        </div>

        {/* Bottom Proof Assurance Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-[#F8FAFC] border border-[#CBD5E1] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-[#059669] grid place-items-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
            </div>
            <div>
              <h4 className="text-[14.5px] font-bold text-[#0F172A] font-display">100% Verified Contractor Data</h4>
              <p className="text-[12.5px] text-[#64748B]">All metrics derived from real Google Ads accounts with CallRail dynamic number insertion.</p>
            </div>
          </div>
          <Link 
            href="https://zcal.co/wphossain/free" 
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm px-5 py-2.5 text-[13px] whitespace-nowrap shadow-md"
          >
            Get Free Campaign Audit
          </Link>
        </div>

      </div>
    </section>
  );
}
