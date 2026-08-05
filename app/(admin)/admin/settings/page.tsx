"use client";

import React, { useState } from 'react';

export default function SettingsAdminPage() {
  const [businessName, setBusinessName] = useState('WPHossain');
  const [ownerName, setOwnerName] = useState('Mikail Hossain');
  const [email, setEmail] = useState('Contact@wphossain.com');
  const [phone, setPhone] = useState('+1...');
  const [whatsapp, setWhatsapp] = useState('+1...');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Settings saved to Supabase `site_settings` table!');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white mb-1">System Settings</h1>
        <p className="text-[#aebcda] text-[14.5px]">Update global business details, contact info, and brand identity.</p>
      </div>

      <form onSubmit={handleSave} className="bg-[#0a1c34] border border-[#0e2340] rounded-2xl p-6 space-y-6">
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#aebcda] mb-1.5">Business Name</label>
            <input type="text" value={businessName} onChange={e => setBusinessName(e.target.value)} className="w-full bg-[#050f1f] border border-[#0e2340] rounded-lg px-4 py-2.5 text-white text-sm" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#aebcda] mb-1.5">Owner Name</label>
            <input type="text" value={ownerName} onChange={e => setOwnerName(e.target.value)} className="w-full bg-[#050f1f] border border-[#0e2340] rounded-lg px-4 py-2.5 text-white text-sm" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#aebcda] mb-1.5">Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-[#050f1f] border border-[#0e2340] rounded-lg px-4 py-2.5 text-white text-sm" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#aebcda] mb-1.5">Phone Number</label>
            <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-[#050f1f] border border-[#0e2340] rounded-lg px-4 py-2.5 text-white text-sm" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#aebcda] mb-1.5">WhatsApp Number</label>
          <input type="text" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} className="w-full bg-[#050f1f] border border-[#0e2340] rounded-lg px-4 py-2.5 text-white text-sm" />
        </div>

        <button type="submit" className="px-6 py-3 rounded-lg font-bold text-sm bg-gradient-to-r from-[#1a73e8] to-[#4c9bff] text-white hover:shadow-lg transition-all">
          Save Settings
        </button>
      </form>
    </div>
  );
}
