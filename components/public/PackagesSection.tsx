"use client";

import React from 'react';

export function PackagesSection() {
  const packages = [
    {
      name: "Starter Growth",
      tag: "Audit & Launch",
      ideal: "For local contractors testing Google Ads or fixing an underperforming existing campaign.",
      features: [
        "1 Core Search Campaign (Emergency/Install)",
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
      ideal: "For established HVAC, plumbing, or roofing companies looking to scale booked job volume consistently.",
      features: [
        "Search Ads + Local Service Ads (LSA) Setup",
        "Custom Dedicated Click-to-Call Landing Page",
        "Advanced Dynamic Number Insertion (DNI)",
        "Call Whisper & Call Recording Quality Grading",
        "Up to $10,000/mo Ad Spend Managed",
        "Weekly Bid Optimizations & Negative Pruning",
        "Direct WhatsApp Access & Monthly Strategy Call",
        "Competitor Conquesting & Zip-Code Radius Bids"
      ],
      popular: true,
      cta: "Claim Your Market →"
    },
    {
      name: "Enterprise Multi-Location",
      tag: "Full Growth Engine",
      ideal: "For multi-truck or multi-branch service businesses spending $10k+/month across multiple service territories.",
      features: [
        "Multi-Location Search & LSA Campaigns",
        "Custom Multi-Variant Landing Page Funnels",
        "Full CRM Integration (ServiceTitan / Housecall Pro)",
        "Unlimited Ad Spend Managed",
        "Daily Account Monitoring & Live Bid Adjustments",
        "Priority VIP WhatsApp & Phone Access",
        "Custom Live Data Studio Performance Dashboard",
        "Dedicated A/B Creative Testing"
      ],
      popular: false,
      cta: "Schedule Enterprise Call →"
    }
  ];

  return (
    <section id="packages" className="w-full bg-[#F8FAFC] border-b border-[#CBD5E1] py-20 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        
        {/* Section Header (Unified Left Alignment) */}
        <div className="max-w-[760px] mb-12 text-left">
          <span className="eyebrow mb-3.5">
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
            <div 
              key={idx} 
              className={`rounded-[28px] p-8 flex flex-col justify-between transition-all duration-300 relative ${
                pkg.popular 
                  ? 'bg-white border-2 border-[#0F172A] shadow-xl lg:-translate-y-2' 
                  : 'bg-white border border-[#CBD5E1] shadow-sm hover:shadow-md'
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#0F172A] text-white text-[11px] font-extrabold uppercase tracking-widest px-4 py-1 rounded-full shadow-xs">
                  {pkg.tag}
                </span>
              )}

              <div>
                {!pkg.popular && (
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#64748B] bg-slate-100 px-3 py-1 rounded-full inline-block mb-3 border border-[#E2E8F0]">
                    {pkg.tag}
                  </span>
                )}
                
                <h3 className="text-2xl font-bold text-[#0F172A] mb-2 font-display">
                  {pkg.name}
                </h3>
                
                <p className="text-[13.5px] text-[#475569] leading-relaxed mb-6 pb-6 border-b border-[#E2E8F0]">
                  {pkg.ideal}
                </p>

                {/* Deliverables List */}
                <div className="space-y-3 mb-8">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#64748B] block">Included In Scope:</span>
                  {pkg.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-[13.5px] text-[#334155]">
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" className="text-[#059669] shrink-0 mt-0.5"><circle cx="12" cy="12" r="10" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="2"/><path d="M8 12l2.5 2.5 5.5-5.5" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <a 
                href="https://zcal.co/wphossain/free" 
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn-block py-3.5 rounded-xl text-[14px] font-bold ${
                  pkg.popular 
                    ? 'btn-primary' 
                    : 'btn-ghost'
                }`}
              >
                {pkg.cta}
              </a>
            </div>
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
