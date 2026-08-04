"use client";

import React, { useState } from 'react';

export default function TrackingPage() {
  const [gtmId, setGtmId] = useState('GTM-WPHOSSAIN');
  const [gtmEnabled, setGtmEnabled] = useState(true);
  const [ga4Id, setGa4Id] = useState('G-WPHOSSAIN12');
  const [ga4Enabled, setGa4Enabled] = useState(true);
  const [metaPixelId, setMetaPixelId] = useState('1234567890');
  const [metaEnabled, setMetaEnabled] = useState(true);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white mb-1">Tracking Code &amp; Pixel Manager</h1>
        <p className="text-[#aebcda] text-[14.5px]">Instant toggles and ID management for GTM, GA4, Meta Pixel, and custom Header/Footer scripts.</p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Google Tag Manager Container */}
        <div className="bg-[#0a1c34] border border-[#0e2340] rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-white text-[16px]">Google Tag Manager (GTM)</h3>
              <p className="text-[#7b8bad] text-[13px]">Injects full GTM container code in header and noscript tag.</p>
            </div>
            <input 
              type="checkbox" 
              checked={gtmEnabled} 
              onChange={(e) => setGtmEnabled(e.target.checked)}
              className="w-5 h-5 accent-[#1a73e8] cursor-pointer"
            />
          </div>
          <input 
            type="text" 
            value={gtmId} 
            onChange={(e) => setGtmId(e.target.value)}
            className="w-full bg-[#050f1f] border border-[#0e2340] rounded-lg px-4 py-2 text-white text-[14px]"
            placeholder="e.g. GTM-XXXXXXX"
          />
        </div>

        {/* GA4 Measurement ID */}
        <div className="bg-[#0a1c34] border border-[#0e2340] rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-white text-[16px]">Google Analytics 4 (GA4)</h3>
              <p className="text-[#7b8bad] text-[13px]">Direct gtag.js tracking ID.</p>
            </div>
            <input 
              type="checkbox" 
              checked={ga4Enabled} 
              onChange={(e) => setGa4Enabled(e.target.checked)}
              className="w-5 h-5 accent-[#1a73e8] cursor-pointer"
            />
          </div>
          <input 
            type="text" 
            value={ga4Id} 
            onChange={(e) => setGa4Id(e.target.value)}
            className="w-full bg-[#050f1f] border border-[#0e2340] rounded-lg px-4 py-2 text-white text-[14px]"
            placeholder="e.g. G-XXXXXXXXXX"
          />
        </div>

        {/* Meta Pixel */}
        <div className="bg-[#0a1c34] border border-[#0e2340] rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-white text-[16px]">Meta (Facebook) Pixel</h3>
              <p className="text-[#7b8bad] text-[13px]">Facebook Pixel ID for PageView tracking.</p>
            </div>
            <input 
              type="checkbox" 
              checked={metaEnabled} 
              onChange={(e) => setMetaEnabled(e.target.checked)}
              className="w-5 h-5 accent-[#1a73e8] cursor-pointer"
            />
          </div>
          <input 
            type="text" 
            value={metaPixelId} 
            onChange={(e) => setMetaPixelId(e.target.value)}
            className="w-full bg-[#050f1f] border border-[#0e2340] rounded-lg px-4 py-2 text-white text-[14px]"
            placeholder="e.g. 1234567890"
          />
        </div>

        <button 
          onClick={() => alert("Tracking codes saved and synced to public site!")}
          className="btn btn-primary self-start text-[14px] px-6 py-3 font-bold"
        >
          Save &amp; Publish Tracking Settings
        </button>
      </div>
    </div>
  );
}
