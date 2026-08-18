"use client";

import React from 'react';
import { motion } from 'framer-motion';

export function IsThisYouSection() {
  const scenarios = [
    {
      icon: "🚨",
      badge: "Emergency Dispatch",
      badgeColor: "bg-rose-50 text-rose-600 border-rose-200",
      title: "I Need Booked Emergency Calls Today",
      desc: "You have technicians on payroll and empty schedule slots. You need high-intent homeowners searching for immediate AC repair, plumbing clogs, or roof leak fixes.",
      action: "High-Intent Search Campaign + 0.8s Call Funnel",
      highlight: "Instant booked calls"
    },
    {
      icon: "📉",
      badge: "Budget Bleed",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
      title: "My Agency Is Burning Budget on Junk",
      desc: "You are spending $2,000–$10,000/month, but your phone is silent or ringing with job applicants and price shoppers instead of paying customers.",
      action: "1,200+ Negative Moat & Search Term Pruning",
      highlight: "Zero wasted spend"
    },
    {
      icon: "💰",
      badge: "High-Ticket Scale",
      badgeColor: "bg-emerald-50 text-[#059669] border-emerald-200",
      title: "I Want High-Ticket System Replacements",
      desc: "You don't just want $89 tune-ups. You want $8,000–$25,000 complete HVAC replacements, whole-house repiping, or full roof replacements.",
      action: "Affluent Radius & Demographics Targeting",
      highlight: "High ROI contracts"
    },
    {
      icon: "📊",
      badge: "Broken Tracking",
      badgeColor: "bg-blue-50 text-[#1A73E8] border-blue-200",
      title: "My Conversion Tracking Is Broken",
      desc: "You don't know your exact Cost Per Booked Job because call tracking isn't synced with your CRM or Google Ads conversion actions.",
      action: "CallRail Dynamic DNI + GA4 CRM Attribution",
      highlight: "100% verified ROI"
    }
  ];

  return (
    <section className="w-full bg-white border-b border-[#CBD5E1] py-16 lg:py-20 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[400px] bg-[radial-gradient(ellipse,rgba(26,115,232,0.025),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] bg-[radial-gradient(ellipse,rgba(5,150,105,0.025),transparent_70%)] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-[760px] mb-12 text-left">
          <span className="eyebrow mb-3.5 inline-block">
            Diagnostic Check
          </span>
          <h2 className="text-[clamp(28px,4vw,42px)] font-bold text-[#0F172A] leading-tight mb-3 font-display">
            Is This You Right Now?
          </h2>
          <p className="text-[16px] text-[#475569] leading-relaxed">
            Every local service business faces different growth bottlenecks. Choose the scenario that matches your current situation:
          </p>
        </div>

        {/* 4 Diagnostic Scenario Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {scenarios.map((s, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="p-6 rounded-[24px] border border-[#CBD5E1] bg-slate-50/70 hover:bg-white hover:border-[#1A73E8] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl p-2.5 rounded-2xl bg-white border border-[#CBD5E1] shadow-2xs group-hover:scale-110 transition-transform">
                    {s.icon}
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider border ${s.badgeColor}`}>
                    {s.badge}
                  </span>
                </div>
                
                <h3 className="text-[16.5px] font-bold text-[#0F172A] mb-2.5 leading-snug font-display group-hover:text-[#1A73E8] transition-colors">
                  {s.title}
                </h3>
                <p className="text-[13.5px] text-[#475569] leading-relaxed mb-6">
                  {s.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[#CBD5E1]/80">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9.5px] font-extrabold uppercase tracking-wider text-[#059669]">Recommended Solution</span>
                  <span className="text-[9.5px] font-bold text-[#64748B]">{s.highlight}</span>
                </div>
                <span className="text-[13px] font-bold text-[#0F172A] leading-tight block">
                  {s.action}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
