"use client";

import React from 'react';

export function IsThisYouSection() {
  const scenarios = [
    {
      icon: "🚨",
      title: "I Need Booked Emergency Calls Today",
      desc: "You have technicians on payroll and empty schedule slots. You need high-intent homeowners searching for immediate AC repair, plumbing clogs, or roof leak fixes.",
      action: "High-Intent Search Campaign + 0.8s Call Funnel"
    },
    {
      icon: "📉",
      title: "My Agency Is Burning Budget on Junk",
      desc: "You are spending $2,000–$10,000/month, but your phone is silent or ringing with job applicants and price shoppers instead of paying customers.",
      action: "Comprehensive Search Term Audit & Negative Moat"
    },
    {
      icon: "💰",
      title: "I Want High-Ticket System Replacements",
      desc: "You don't just want $89 tune-ups. You want $8,000–$25,000 complete HVAC replacements, whole-house repiping, or full roof replacements.",
      action: "High-Ticket Demographic & Zip-Code Radius Targeting"
    },
    {
      icon: "📊",
      title: "My Conversion Tracking Is Broken",
      desc: "You don't know your exact Cost Per Booked Job because call tracking isn't synced with your CRM or Google Ads conversion actions.",
      action: "CallRail + Server-Side GA4 Attribution Integration"
    }
  ];

  return (
    <section className="w-full bg-white border-b border-[#CBD5E1] py-20 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="text-center max-w-[760px] mx-auto mb-14">
          <span className="eyebrow mx-auto">
            Diagnostic Check
          </span>
          <h2 className="text-[clamp(28px,4vw,42px)] font-bold text-[#0F172A] leading-tight mb-4 font-display">
            Is This You Right Now?
          </h2>
          <p className="text-[17px] text-[#475569] leading-relaxed">
            Every local service business faces different growth bottlenecks. Choose the scenario that matches your current situation:
          </p>
        </div>

        {/* 4 Diagnostic Scenario Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {scenarios.map((s, idx) => (
            <div 
              key={idx} 
              className="p-6 rounded-[24px] border border-[#CBD5E1] bg-slate-50/50 hover:bg-white hover:border-[#0F172A] hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="text-3xl mb-4 p-3 rounded-2xl bg-white border border-[#E2E8F0] inline-block shadow-2xs group-hover:scale-110 transition-transform">
                  {s.icon}
                </div>
                <h3 className="text-[17px] font-bold text-[#0F172A] mb-3 leading-snug font-display">
                  {s.title}
                </h3>
                <p className="text-[13.5px] text-[#475569] leading-relaxed mb-6">
                  {s.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E2E8F0]">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#059669] block mb-1">Recommended Strategy</span>
                <span className="text-[12.5px] font-bold text-[#0F172A] leading-tight block">
                  {s.action}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
