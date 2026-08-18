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
      <div className="w-full flex items-center justify-center text-center min-h-[500px] text-[#64748B] font-medium text-[14px]">
        <div className="animate-pulse">Loading Calendar...</div>
      </div>
    );
  }

  return (
    <div className="w-full zcal-inline-widget min-h-[700px]">
      <iframe 
        src={zcalLink} 
        style={{ width: '100%', height: '750px', minHeight: '700px', border: 'none' }}
        title="Schedule a meeting"
        allow="calendar-import"
        loading="lazy"
      />
    </div>
  );
}
