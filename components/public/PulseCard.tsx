"use client";

import React, { useEffect, useState } from 'react';

type Niche = 'hvac' | 'plumbing' | 'roofing';

interface PulseCardProps {
  content?: any;
}

export function PulseCard({ content }: PulseCardProps) {
  const [activeNiche, setActiveNiche] = useState<Niche>('hvac');

  const campaignsFallback = {
    hvac: {
      location: "Dallas HVAC Campaign",
      headline: "24/7 Emergency AC Repair — Same-Day Service Guarantee",
      url: "www.yourhvaccompany.com/emergency-service",
      desc: "Licensed & certified HVAC technicians near you. Fast response times, upfront transparent pricing, & 100% satisfaction guaranteed. Book online in 60s.",
      chart: "/images/charts/hvac-chart.png"
    },
    plumbing: {
      location: "Austin Plumbing Campaign",
      headline: "Slab Leak & Emergency Clog Experts — $50 Off Any Repair",
      url: "www.austineliteplumbing.com/emergency-drain",
      desc: "Slab leaks, clogged drains, water heater failures? Fast response, fully stocked trucks, and expert plumbers ready today. No extra charge on weekends.",
      chart: "/images/charts/plumbing-chart.png"
    },
    roofing: {
      location: "Houston Roofing Campaign",
      headline: "Storm Damage Roof Inspection — 100% Insurance Covered",
      url: "www.lonestarroofrepair.com/hail-audit",
      desc: "Recent hail storms? Avoid leaks with a free drone roof inspection. We help with claim filing and direct insurance billing. High-quality lifetime shingles.",
      chart: "/images/charts/roofing-chart.png"
    }
  };

  const campaigns: any = {
     hvac: { ...campaignsFallback.hvac, location: content?.hvac?.campaign_name || campaignsFallback.hvac.location, headline: content?.hvac?.ad_headline || campaignsFallback.hvac.headline, desc: content?.hvac?.ad_desc || campaignsFallback.hvac.desc },
     plumbing: { ...campaignsFallback.plumbing, location: content?.plumbing?.campaign_name || campaignsFallback.plumbing.location, headline: content?.plumbing?.ad_headline || campaignsFallback.plumbing.headline, desc: content?.plumbing?.ad_desc || campaignsFallback.plumbing.desc },
     roofing: { ...campaignsFallback.roofing, location: content?.roofing?.campaign_name || campaignsFallback.roofing.location, headline: content?.roofing?.ad_headline || campaignsFallback.roofing.headline, desc: content?.roofing?.ad_desc || campaignsFallback.roofing.desc }
  };

  const currentCampaign = campaigns[activeNiche];

  return (
    <div className="pulse-card bg-[#0a1c34]/90 border border-white/5 rounded-[24px] p-6 relative overflow-hidden group shadow-2xl transition-all duration-500 hover:border-[#1a73e8]/30">
      {/* Background radial glow */}
      <div className="absolute inset-[-40%_-20%_auto_auto] w-[260px] h-[260px] bg-[radial-gradient(circle,rgba(26,115,232,0.15),transparent_70%)] opacity-70 pointer-events-none" />
      
      {/* Interactive Tabs */}
      <div className="flex gap-1.5 p-1 bg-[#050f1f]/80 rounded-xl mb-5 relative z-10 border border-white/5">
        {(['hvac', 'plumbing', 'roofing'] as Niche[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveNiche(tab)}
            className={`flex-1 py-2 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all duration-300 ${
              activeNiche === tab 
                ? 'bg-[#1a73e8] text-white shadow' 
                : 'text-[#7b8bad] hover:text-white hover:bg-white/5'
            }`}
          >
            {tab === 'hvac' ? 'HVAC' : tab === 'plumbing' ? 'Plumbing' : 'Roofing'}
          </button>
        ))}
      </div>

      {/* Search Ad Mockup Section */}
      <div className="ad-mockup bg-[#050f1f]/90 border border-white/5 rounded-xl p-4 mb-5 relative z-10 transition-all duration-300">
        <div className="flex items-center justify-between gap-1.5 border-b border-white/5 pb-2.5 mb-3">
          <span className="text-[9.5px] font-extrabold uppercase tracking-wider text-[#7b8bad] flex items-center gap-1.5">
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            Google Ads Preview
          </span>
          <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-bold uppercase tracking-wider">
            ● Active
          </span>
        </div>
        
        {/* Ad Contents */}
        <div className="flex items-start gap-1 mb-1.5">
          <span className="text-[10px] font-extrabold text-[#7b8bad] border border-white/10 px-1 py-0.2 rounded bg-white/5 mr-1.5 mt-0.5 select-none">Ad</span>
          <span className="text-[11px] text-[#aebcda] truncate">{currentCampaign.url}</span>
        </div>
        
        <h4 className="text-[14px] font-bold text-[#4c9bff] leading-snug mb-1.5">
          {currentCampaign.headline}
        </h4>
        
        <p className="text-[11.5px] text-[#7b8bad] leading-normal mb-3">
          {currentCampaign.desc}
        </p>
        
        {/* Dynamic Ad Badges */}
        <div className="flex gap-2 flex-wrap items-center">
          <span className="px-2 py-1 text-[9.5px] font-semibold bg-[#1a73e8]/10 text-[#4c9bff] rounded border border-[#1a73e8]/20">
            ✓ Dynamic Call Swap
          </span>
          <span className="px-2 py-1 text-[9.5px] font-semibold bg-[#25D366]/10 text-[#25D366] rounded border border-[#25D366]/20 mr-auto">
            ✓ GA4 Conversion Active
          </span>
          
          <div className="flex items-center gap-1.5 text-emerald-500 animate-slow-blink bg-emerald-500/5 px-2 py-1 rounded-md border border-emerald-500/10">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-4.2-6.6-7l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z"/></svg>
            <span className="text-[9px] font-black uppercase tracking-wider">Call Now</span>
          </div>
        </div>
      </div>

      {/* Result Chart Image Section */}
      <div className="result-image-box bg-[#050f1f]/60 rounded-xl p-2 border border-white/5 animate-in fade-in zoom-in-95 duration-500">
         <img 
           src={currentCampaign.chart} 
           alt={`${activeNiche} results`} 
           className="w-full h-auto rounded-lg shadow-inner"
         />
      </div>
    </div>
  );
}
