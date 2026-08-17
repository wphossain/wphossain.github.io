"use client";

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/db';

export function ZcalEmbed() {
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

  if (!mounted) {
    return (
      <div className="zcal-embed-wrap bg-white border border-[#E2E8F0] rounded-xl p-1.5 min-h-[400px]">
        <div className="flex items-center justify-center text-center min-h-[400px] p-3.5 rounded-lg text-[#64748B] font-medium text-[13.5px]">
          <div className="animate-pulse">Loading Calendar...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="zcal-embed-wrap bg-white border border-[#E2E8F0] rounded-xl p-1.5 min-h-[500px]">
      <div className="zcal-inline-widget w-full h-[600px]">
        <iframe 
          src={zcalLink} 
          style={{ width: '100%', height: '100%', border: 'none' }}
          title="Schedule a meeting"
          allow="calendar-import"
          loading="lazy"
        />
      </div>
    </div>
  );
}
