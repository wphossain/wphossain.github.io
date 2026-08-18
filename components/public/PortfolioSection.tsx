"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface CaseStudyItem {
  id?: string;
  slug: string;
  niche: string;
  location: string;
  badge: string;
  badgeColor?: 'blue' | 'amber' | 'emerald';
  headline: string;
  subline: string;
  image: string;
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
    image: '/case-studies/dashboard-1.svg'
  },
  {
    slug: 'austin-emergency-plumbing-callrail-tracking',
    niche: 'Master Plumbing',
    location: 'Austin, TX',
    badge: 'High Conv. Rate',
    badgeColor: 'emerald',
    headline: '60% Conversion Rate',
    subline: '6 of 10 clicks converted · $28.50 CPL with CallRail DNI',
    image: '/case-studies/dashboard-2.svg'
  },
  {
    slug: 'houston-storm-damage-roofing-lead-funnel',
    niche: 'Storm Damage Roofing',
    location: 'Houston, TX',
    badge: 'Efficiency Focus',
    badgeColor: 'amber',
    headline: '45.45% Conversion Rate',
    subline: '5 conversions · $62.92 cost · $148K pipeline in 60 days',
    image: '/case-studies/dashboard-3.svg'
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
        
        {/* Header Section (Left-Aligned) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl text-left">
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
              {/* Top: Real Google Ads Dashboard Image Preview */}
              <div className="relative aspect-[16/10] w-full bg-slate-50 border-b border-[#E2E8F0] overflow-hidden p-2.5 flex items-center justify-center">
                <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xs border border-slate-200/80 group-hover:scale-[1.02] transition-transform duration-300">
                  <Image 
                    src={card.image || `/case-studies/dashboard-${idx + 1}.svg`} 
                    alt={card.headline}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Bottom: Case Study Meta & Summary */}
              <div className="p-6 bg-white flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-[11px] font-extrabold uppercase font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#059669] border border-emerald-200">
                      {card.badge}
                    </span>
                    <span className="text-[11.5px] font-bold text-[#64748B]">
                      {card.niche} · {card.location}
                    </span>
                  </div>

                  <h3 className="text-[18px] font-display font-extrabold text-[#0F172A] leading-snug tracking-tight group-hover:text-[#1A73E8] transition-colors">
                    {card.headline}
                  </h3>

                  <p className="text-[13px] text-[#475569] font-medium leading-relaxed mt-2">
                    {card.subline}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#F1F5F9] flex items-center justify-between text-[13px] font-bold text-[#1A73E8] group-hover:text-[#1557B0]">
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
