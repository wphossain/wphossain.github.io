"use client";

import React from 'react';
import { motion } from 'framer-motion';

export function PackagesSection() {
  const packages = [
    {
      name: "Starter Growth",
      tag: "Audit & Launch",
      timeline: "⚡ 7-Day Fast Launch",
      ideal: "For local contractors testing Google Ads or fixing an underperforming existing campaign.",
      features: [
        "1 Core High-Intent Search Campaign",
        "1,200+ Negative Keyword Fortress Setup",
        "High-Converting Landing Page Audit & CRO",
        "CallRail & Google Ads Conversion Sync",
        "Up to $3,000/mo Ad Spend Managed",
        "Bi-Weekly Search Term & Bid Pruning",
        "Monthly Plain-English Performance Report"
      ],
      popular: false,
      cta: "Get Started →"
    },
    {
      name: "Market Dominance",
      tag: "Most Popular for Contractors",
      timeline: "🚀 Full Territory Monopoly",
      ideal: "For established HVAC, plumbing, or roofing companies looking to scale booked job volume consistently.",
      features: [
        "Search Ads + Local Service Ads (LSA) Setup",
        "Custom Dedicated 0.8s Click-to-Call Landing Page",
        "Advanced Dynamic Number Insertion (DNI)",
        "Call Whisper & Audio Recording Quality Grading",
        "Up to $10,000/mo Ad Spend Managed",
        "Weekly Bid Optimizations & Negative Pruning",
        "Direct VIP WhatsApp Access & Strategy Calls",
        "Competitor Conquesting & High-Ticket Radius Bids"
      ],
      popular: true,
      cta: "Claim Your Market →"
    },
    {
      name: "Enterprise Multi-Location",
      tag: "Full Growth Engine",
      timeline: "🏆 Multi-Branch Scale",
      ideal: "For multi-truck or multi-branch service businesses spending $10k+/month across multiple territories.",
      features: [
        "Multi-Location Search & LSA Campaigns",
        "Custom Multi-Variant Landing Page Funnels",
        "Full CRM Integration (ServiceTitan / Housecall Pro)",
        "Unlimited Ad Spend Managed",
        "Daily Account Monitoring & Live Bid Adjustments",
        "Priority 24/7 VIP WhatsApp & Phone Access",
        "Custom Live Data Studio Performance Dashboard",
        "Dedicated A/B Creative & Headline Testing"
      ],
      popular: false,
      cta: "Schedule Enterprise Call →"
    }
  ];

  return (
    <section id="packages" className="w-full bg-[#F8FAFC] border-b border-[#CBD5E1] py-16 lg:py-20 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[350px] bg-[radial-gradient(ellipse,rgba(5,150,105,0.03),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[350px] bg-[radial-gradient(ellipse,rgba(26,115,232,0.03),transparent_70%)] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-[760px] mb-12 text-left">
          <span className="eyebrow mb-3.5 inline-block">
            Transparent Engagement
          </span>
          <h2 className="text-[clamp(28px,4vw,42px)] font-bold text-[#0F172A] leading-tight mb-3 font-display">
            Simple, No-Fluff Growth Packages
          </h2>
          <p className="text-[16.5px] text-[#475569] leading-relaxed">
            Flat-rate specialist management tailored to your local service business. No percentage-of-spend traps, no long lock-in contracts, cancel anytime.
          </p>
        </div>

        {/* 3 Tiered Packages */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className={`rounded-[28px] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                pkg.popular 
                  ? 'bg-white border-2 border-[#1A73E8] shadow-2xl lg:-translate-y-2.5 ring-4 ring-blue-500/10' 
                  : 'bg-white border border-[#CBD5E1] shadow-xs hover:shadow-lg hover:border-[#0F172A]'
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#1A73E8] text-white text-[10.5px] font-extrabold uppercase tracking-wider px-4 py-1 rounded-full shadow-md flex items-center gap-1.5 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  {pkg.tag}
                </span>
              )}

              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  {!pkg.popular ? (
                    <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-[#64748B] bg-slate-100 px-3 py-1 rounded-full border border-[#E2E8F0]">
                      {pkg.tag}
                    </span>
                  ) : <span />}
                  <span className="text-[11px] font-bold text-[#059669] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {pkg.timeline}
                  </span>
                </div>
                
                <h3 className="text-[22px] sm:text-[24px] font-bold text-[#0F172A] mb-2 font-display">
                  {pkg.name}
                </h3>
                
                <p className="text-[13.5px] text-[#475569] leading-relaxed mb-6 pb-5 border-b border-[#E2E8F0]">
                  {pkg.ideal}
                </p>

                {/* Deliverables List */}
                <div className="space-y-3 mb-8">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#64748B] block">Included In Scope:</span>
                  {pkg.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-[13.5px] text-[#334155]">
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" className="text-[#059669] shrink-0 mt-0.5"><circle cx="12" cy="12" r="10" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="2"/><path d="M8 12l2.5 2.5 5.5-5.5" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <a 
                href="https://zcal.co/wphossain/free" 
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3.5 rounded-xl text-[14px] font-bold text-center transition-all duration-200 shadow-xs hover:shadow-md block ${
                  pkg.popular 
                    ? 'bg-[#1A73E8] text-white hover:bg-[#1557B0]' 
                    : 'bg-[#0F172A] text-white hover:bg-[#1E293B]'
                }`}
              >
                {pkg.cta}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Custom Scope Footer Teaser */}
        <p className="text-center text-[13.5px] text-[#64748B] mt-10">
          Need a custom engagement or have multiple trade locations? <a href="https://zcal.co/wphossain/free" target="_blank" rel="noopener noreferrer" className="text-[#0F172A] font-bold underline hover:text-[#059669]">Book a 15-min strategy call</a> and we will build a custom scope.
        </p>

      </div>
    </section>
  );
}
