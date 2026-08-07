"use client";

import React, { useEffect, useState } from 'react';

type Niche = 'hvac' | 'plumbing' | 'roofing';

export function PulseCard() {
  const [activeNiche, setActiveNiche] = useState<Niche>('hvac');
  const [metrics, setMetrics] = useState({
    hvac: { calls: 165, cpl: 28.50, ctr: 8.5 },
    plumbing: { calls: 212, cpl: 24.80, ctr: 9.2 },
    roofing: { calls: 84, cpl: 48.00, ctr: 7.1 }
  });

  const campaigns = {
    hvac: {
      location: "Dallas HVAC Campaign",
      headline: "24/7 Emergency AC Repair — Same-Day Service Guarantee",
      url: "www.yourhvaccompany.com/emergency-service",
      desc: "Licensed & certified HVAC technicians near you. Fast response times, upfront transparent pricing, & 100% satisfaction guaranteed. Book online in 60s."
    },
    plumbing: {
      location: "Austin Plumbing Campaign",
      headline: "Slab Leak & Emergency Clog Experts — $50 Off Any Repair",
      url: "www.austineliteplumbing.com/emergency-drain",
      desc: "Slab leaks, clogged drains, water heater failures? Fast response, fully stocked trucks, and expert plumbers ready today. No extra charge on weekends."
    },
    roofing: {
      location: "Houston Roofing Campaign",
      headline: "Storm Damage Roof Inspection — 100% Insurance Covered",
      url: "www.lonestarroofrepair.com/hail-audit",
      desc: "Recent hail storms? Avoid leaks with a free drone roof inspection. We help with claim filing and direct insurance billing. High-quality lifetime shingles."
    }
  };

  // Live counter simulation for all niches
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        hvac: {
          calls: prev.hvac.calls + (Math.random() > 0.85 ? 1 : 0),
          cpl: Math.max(25, Math.min(32, prev.hvac.cpl + (Math.random() > 0.5 ? 0.3 : -0.3))),
          ctr: Math.max(8.1, Math.min(9.4, parseFloat((prev.hvac.ctr + (Math.random() - 0.5) * 0.1).toFixed(1))))
        },
        plumbing: {
          calls: prev.plumbing.calls + (Math.random() > 0.85 ? 1 : 0),
          cpl: Math.max(21, Math.min(28, prev.plumbing.cpl + (Math.random() > 0.5 ? 0.25 : -0.25))),
          ctr: Math.max(8.8, Math.min(9.9, parseFloat((prev.plumbing.ctr + (Math.random() - 0.5) * 0.1).toFixed(1))))
        },
        roofing: {
          calls: prev.roofing.calls + (Math.random() > 0.9 ? 1 : 0),
          cpl: Math.max(42, Math.min(54, prev.roofing.cpl + (Math.random() > 0.5 ? 0.4 : -0.4))),
          ctr: Math.max(6.5, Math.min(7.9, parseFloat((prev.roofing.ctr + (Math.random() - 0.5) * 0.08).toFixed(1))))
        }
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentMetric = metrics[activeNiche];
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
        <div className="flex gap-2 flex-wrap">
          <span className="px-2 py-1 text-[9.5px] font-semibold bg-[#1a73e8]/10 text-[#4c9bff] rounded border border-[#1a73e8]/20">
            ✓ Dynamic Call Swap
          </span>
          <span className="px-2 py-1 text-[9.5px] font-semibold bg-[#f2a93d]/10 text-[#f2a93d] rounded border border-[#f2a93d]/20">
            ✓ GA4 Conversion Active
          </span>
        </div>
      </div>

      {/* Live Metrics Header */}
      <div className="pulse-top flex items-center justify-between mb-4 relative z-10">
        <span className="pulse-live inline-flex items-center gap-1.75 text-[10px] font-extrabold tracking-[0.08em] uppercase text-[#aebcda]">
          <span className="blip w-2 h-2 rounded-full bg-[#1a73e8] shadow-[0_0_0_0_rgba(26,115,232,0.35)] animate-[blip_1.8s_infinite] mr-1.5" />
          {currentCampaign.location}
        </span>
        <span className="pulse-sample text-[9px] text-[#7b8bad] font-bold uppercase tracking-wider">Simulated Live Data</span>
      </div>

      {/* Metrics Row */}
      <div className="pulse-stats grid grid-cols-3 gap-3 mb-4.5 relative z-10">
        <div className="pulse-stat bg-[#050f1f]/80 border border-white/5 rounded-xl p-3 text-center transition-all duration-300 hover:border-[#1a73e8]/30">
          <strong className="block font-display text-[21px] text-white tabular-nums tracking-tight font-bold">{currentMetric.calls}</strong>
          <span className="text-[9px] text-[#7b8bad] font-extrabold tracking-[0.05em] uppercase block mt-0.5">Calls</span>
        </div>
        <div className="pulse-stat bg-[#050f1f]/80 border border-white/5 rounded-xl p-3 text-center transition-all duration-300 hover:border-[#1a73e8]/30">
          <strong className="block font-display text-[21px] text-white tabular-nums tracking-tight font-bold">${currentMetric.cpl.toFixed(2)}</strong>
          <span className="text-[9px] text-[#7b8bad] font-extrabold tracking-[0.05em] uppercase block mt-0.5">CPL</span>
        </div>
        <div className="pulse-stat bg-[#050f1f]/80 border border-white/5 rounded-xl p-3 text-center transition-all duration-300 hover:border-[#1a73e8]/30">
          <strong className="block font-display text-[21px] text-white tabular-nums tracking-tight font-bold">{currentMetric.ctr.toFixed(1)}%</strong>
          <span className="text-[9px] text-[#7b8bad] font-extrabold tracking-[0.05em] uppercase block mt-0.5">CTR</span>
        </div>
      </div>

      {/* Mini Chart visualization */}
      <div className="pulse-chart flex items-end gap-1.5 h-14 relative z-10" aria-hidden="true">
        {(activeNiche === 'hvac' ? [42, 58, 48, 72, 62, 85, 74, 94, 88, 100] : activeNiche === 'plumbing' ? [50, 65, 55, 80, 70, 92, 82, 100, 90, 95] : [30, 45, 40, 60, 50, 75, 68, 85, 78, 82]).map((h, i) => (
          <i 
            key={i} 
            className="flex-1 bg-gradient-to-t from-[#1a73e8]/20 to-[#4c9bff]/90 rounded-t-[4px] transition-all duration-500 ease-out" 
            style={{ 
              height: `${h}%`,
              animation: 'grow 0.6s ease-out both',
              animationDelay: `${i * 0.05}s`
            }} 
          />
        ))}
      </div>
      
      <p className="pulse-foot mt-4 text-[10.5px] text-[#7b8bad] relative z-10 leading-normal border-t border-white/5 pt-3">
        Interactive live dashboard simulation — click different niche tabs above.
      </p>
    </div>
  );
}
