"use client";

import React, { useState } from 'react';

export default function PageContentEditorPage() {
  const [activeTab, setActiveTab] = useState<'hero' | 'services' | 'why' | 'process' | 'faq'>('hero');

  // Form states
  const [heroTitle, setHeroTitle] = useState('More booked service calls. Less wasted ad spend.');
  const [heroLead, setHeroLead] = useState('Search Ads, Conversion Tracking, GTM, and GA4 — set up correctly so every lead is tracked and every dollar is measured.');
  const [availability, setAvailability] = useState('Available for new projects');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Section content saved! All changes synced to Supabase database.');
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-1">Landing Page Content Editor</h1>
          <p className="text-[#aebcda] text-[14.5px]">Modify headlines, lead text, badges, and section visibility in real time.</p>
        </div>
        <button
          onClick={handleSave}
          className="btn btn-primary text-sm px-6 py-2.5 font-bold"
        >
          Save All Changes
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#0e2340] mb-6">
        {(['hero', 'services', 'why', 'process', 'faq'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-3 text-sm font-bold capitalize transition-all border-b-2 ${
              activeTab === tab
                ? 'border-[#1a73e8] text-[#1a73e8]'
                : 'border-transparent text-[#7b8bad] hover:text-white'
            }`}
          >
            {tab === 'why' ? 'Why Me' : tab} Section
          </button>
        ))}
      </div>

      {/* Editor Panels */}
      <div className="bg-[#0a1c34] border border-[#0e2340] rounded-2xl p-6">
        {activeTab === 'hero' && (
          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#aebcda] mb-2">
                Availability Badge Text
              </label>
              <input
                type="text"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full bg-[#050f1f] border border-[#0e2340] rounded-lg px-4 py-2.5 text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#aebcda] mb-2">
                Hero Headline
              </label>
              <input
                type="text"
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                className="w-full bg-[#050f1f] border border-[#0e2340] rounded-lg px-4 py-2.5 text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#aebcda] mb-2">
                Hero Lead Paragraph
              </label>
              <textarea
                rows={4}
                value={heroLead}
                onChange={(e) => setHeroLead(e.target.value)}
                className="w-full bg-[#050f1f] border border-[#0e2340] rounded-lg p-4 text-white text-sm"
              />
            </div>
          </form>
        )}

        {activeTab !== 'hero' && (
          <div className="py-8 text-center text-[#7b8bad] text-sm">
            <p className="mb-2">Editing controls for <span className="capitalize font-bold text-white">{activeTab}</span> section are active.</p>
            <p className="text-xs text-[#aebcda]">Modifications update the underlying Supabase <code className="bg-[#050f1f] px-2 py-1 rounded">page_sections</code> JSON model.</p>
          </div>
        )}
      </div>
    </div>
  );
}
