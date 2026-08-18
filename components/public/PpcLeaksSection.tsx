"use client";

import React from 'react';

export function PpcLeaksSection() {
  const leaks = [
    {
      id: "01",
      badge: "The Broad Match Trap",
      problem: "Bidding on generic DIY search terms like \"how to fix AC myself\" or job seeker queries (\"HVAC technician salary\").",
      impact: "30%–50% of your monthly ad budget wasted on non-buying traffic.",
      solution: "1,200+ Negative Keyword Fortress",
      solutionDesc: "Pre-built negative keyword lists refined over $2.4M in local service spend to ensure 100% of clicks come from homeowners ready to hire."
    },
    {
      id: "02",
      badge: "The Slow Homepage Trap",
      problem: "Sending paid traffic to a bloated 6-second WordPress homepage with 20 distracting menu links.",
      impact: "Homeowners bounce in 3 seconds and call your competitor down the street.",
      solution: "Dedicated Click-to-Call Landing Pages",
      solutionDesc: "Lightning-fast (96+ PageSpeed) mobile landing pages with sticky tap-to-call buttons, trust badges, and 0.8s load times."
    },
    {
      id: "03",
      badge: "The Missing Attribution Trap",
      problem: "Using default Google Ads \"smart campaigns\" without dynamic phone call tracking or whisper messages.",
      impact: "You have no idea which search keywords generated booked revenue vs spam calls.",
      solution: "CallRail & Server-Side GA4 Tracking",
      solutionDesc: "Keyword-level call recording, dynamic number insertion (DNI), and offline conversion tracking piped directly back into Google AI."
    },
    {
      id: "04",
      badge: "The Agency Junior Trap",
      problem: "Big agencies assigning your account to a junior intern who logs in once every 3 weeks to \"check the auto-apply recommendations\".",
      impact: "Google AI automatically raises bids and wastes budget on low-intent search partner networks.",
      solution: "Direct Senior Specialist Management",
      solutionDesc: "You work directly with WP Hossain. Daily search term auditing, manual bid shaping, and transparent weekly reporting with zero fluff."
    }
  ];

  return (
    <section id="leaks" className="w-full bg-[#F8FAFC] border-b border-[#CBD5E1] py-20 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="max-w-[760px] mb-14">
          <span className="eyebrow">
            The Cost of Inaction
          </span>
          <h2 className="text-[clamp(28px,4vw,42px)] font-bold text-[#0F172A] leading-tight mb-4 font-display">
            The 4 Biggest Leaks Draining Local Service Ad Budgets
          </h2>
          <p className="text-[17px] text-[#475569] leading-relaxed">
            If your Google Ads aren&apos;t generating consistent booked calls, you are likely suffering from one of these 4 critical leaks. Here is how we fix them.
          </p>
        </div>

        {/* 2x2 Grid of Leaks vs Solutions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
          {leaks.map((leak) => (
            <div 
              key={leak.id} 
              className="bg-white border border-[#CBD5E1] rounded-[24px] p-7 shadow-xs hover:border-[#0F172A] hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#E2E8F0]">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-rose-600 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
                    Leak #{leak.id} · {leak.badge}
                  </span>
                  <span className="text-[12px] font-bold text-[#94A3B8] font-display">
                    High Risk
                  </span>
                </div>

                {/* Problem Statement */}
                <div className="space-y-2 mb-5">
                  <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-[#64748B] block">The Problem</span>
                  <p className="text-[14.5px] text-[#0F172A] font-semibold leading-snug">
                    {leak.problem}
                  </p>
                  <p className="text-[13px] text-rose-600 font-medium">
                    ⚠️ {leak.impact}
                  </p>
                </div>
              </div>

              {/* Solution Block */}
              <div className="mt-4 pt-5 border-t border-[#E2E8F0] bg-slate-50/80 -mx-7 -mb-7 p-6 rounded-b-[24px]">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#059669]" />
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#059669]">The WP Hossain Fix</span>
                </div>
                <h4 className="text-[15px] font-bold text-[#0F172A] mb-1.5 font-display">
                  {leak.solution}
                </h4>
                <p className="text-[13.5px] text-[#475569] leading-relaxed">
                  {leak.solutionDesc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-12 p-6 lg:p-8 rounded-[24px] bg-[#0F172A] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl lg:text-2xl font-bold font-display text-white">Want to see where your account is leaking ad budget?</h3>
            <p className="text-slate-300 text-[14px]">I&apos;ll run a comprehensive audit of your search terms, negative keywords, and tracking setup for free.</p>
          </div>
          <a href="#contact" className="btn btn-emerald px-7 py-3.5 text-[14px] font-bold rounded-xl whitespace-nowrap shrink-0 shadow-lg">
            Request Free Account Audit →
          </a>
        </div>

      </div>
    </section>
  );
}
