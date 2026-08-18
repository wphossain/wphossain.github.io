"use client";

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/db';
import { Calendar, Clock, ShieldCheck } from 'lucide-react';

export function ZcalEmbed({ isDark = false }: { isDark?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const [zcalLink, setZcalLink] = useState('https://zcal.co/i/hJJ3Hx9l');

  useEffect(() => {
    setMounted(true);
    async function loadLink() {
      const settings = await db.getSettings();
      if (settings.zcal_link) setZcalLink(settings.zcal_link);
    }
    loadLink();
  }, []);

  return (
    <div className="w-full rounded-[28px] p-5 sm:p-6 lg:p-8 transition-all bg-white border border-[#CBD5E1] shadow-sm">
      {/* Visual Frame Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-5 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-[#CBD5E1] text-[#0F172A] grid place-items-center shrink-0">
            <Calendar size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-[#059669]"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#059669]"></span>
              </span>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#059669]">Live Calendar Active</span>
            </div>
            <h3 className="text-[16px] font-bold leading-tight mt-0.5 text-[#0F172A] font-display">
              Select a Day &amp; Time for Your 1-on-1 Strategy Call
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[12.5px] font-semibold">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border bg-slate-50 border-[#CBD5E1] text-[#475569]">
            <Clock size={14} className="text-[#0F172A]" />
            15 Minutes
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border bg-emerald-50 border-emerald-200 text-[#059669]">
            <ShieldCheck size={14} className="text-[#059669]" />
            Free &amp; Zero Commitment
          </span>
        </div>
      </div>

      {/* Embed Container with Fallback */}
      {!mounted ? (
        <div className="w-full flex flex-col items-center justify-center text-center min-h-[600px] rounded-2xl border p-8 bg-slate-50 border-[#E2E8F0]">
          <div className="w-12 h-12 rounded-full bg-slate-100 border border-[#CBD5E1] flex items-center justify-center text-[#0F172A] mb-4 animate-pulse">
            <Calendar size={24} />
          </div>
          <p className="text-[#0F172A] font-bold text-[15px] mb-1 font-display">Loading Interactive Calendar...</p>
          <p className="text-[#64748B] text-[13px] max-w-sm">Fetching available Google Meet audit slots directly from calendar.</p>
        </div>
      ) : (
        <div className="zcal-inline-widget w-full min-h-[700px] rounded-2xl overflow-hidden bg-slate-50 border border-[#E2E8F0]">
          <iframe 
            src={zcalLink} 
            style={{ width: '100%', height: '750px', minHeight: '700px', border: 'none' }}
            title="Schedule a Google Ads strategy meeting"
            allow="camera; microphone; calendar-import"
            loading="lazy"
            className="w-full rounded-2xl"
          />
        </div>
      )}
    </div>
  );
}
