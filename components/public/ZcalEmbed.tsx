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

  const themeClasses = "bg-white border border-[#CBD5E1] shadow-sm";
  const textHeading = "text-[#1E293B]";
  const textSub = "text-[#475569]";
  const borderClass = "border-[#E2E8F0]";

  return (
    <div className={`w-full rounded-[28px] p-4 sm:p-6 lg:p-8 transition-all ${themeClasses}`}>
      {/* Visual Frame Header Bar */}
      <div className={`flex flex-wrap items-center justify-between gap-3 pb-5 mb-5 border-b ${borderClass}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] grid place-items-center shrink-0">
            <Calendar size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-[#15803D]"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#15803D]"></span>
              </span>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#15803D]">Live Booking Active</span>
            </div>
            <h3 className={`text-[16px] font-bold leading-tight mt-0.5 ${textHeading}`}>Select a Day &amp; Time for Your 1-on-1 Audit Call</h3>
          </div>
        </div>

        <div className="flex items-center gap-4 text-[12.5px] font-medium">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border bg-[#F8FAFC] border-[#E2E8F0] text-[#475569]">
            <Clock size={14} className="text-[#2563EB]" />
            15 Minutes
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border bg-[#F8FAFC] border-[#E2E8F0] text-[#475569]">
            <ShieldCheck size={14} className="text-[#15803D]" />
            Free &amp; Zero Commitment
          </span>
        </div>
      </div>

      {/* Embed Container with Fallback */}
      {!mounted ? (
        <div className="w-full flex flex-col items-center justify-center text-center min-h-[600px] rounded-2xl border p-8 bg-[#F8FAFC] border-[#E2E8F0]">
          <div className="w-12 h-12 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center justify-center text-[#2563EB] mb-4 animate-pulse">
            <Calendar size={24} />
          </div>
          <p className={`${textHeading} font-bold text-[15px] mb-1`}>Loading Interactive Calendar...</p>
          <p className={`${textSub} text-[13px] max-w-sm`}>Fetching available Google Meet audit slots directly from calendar.</p>
        </div>
      ) : (
        <div className="zcal-inline-widget w-full min-h-[700px] rounded-2xl overflow-hidden bg-[#F8FAFC]">
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
