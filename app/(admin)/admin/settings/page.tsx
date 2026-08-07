"use client";

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/db';
import { 
  Save, 
  Settings, 
  Globe, 
  Phone, 
  MessageCircle, 
  Mail, 
  User, 
  Linkedin,
  Facebook,
  Twitter,
  ExternalLink,
  Code
} from 'lucide-react';

export default function SettingsAdminPage() {
  const [settings, setSettings] = useState({
    business_name: '',
    owner_name: '',
    job_title: '',
    email: '',
    phone: '',
    whatsapp_number: '',
    zcal_link: '',
    linkedin_url: '',
    facebook_url: '',
    twitter_url: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      const data = await db.getSettings();
      setSettings(data);
      setLoading(false);
    }
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await db.updateSettings(settings);
    setSaving(false);
    alert('Global system settings updated and synced with site components.');
  };

  if (loading) return <div className="flex items-center justify-center min-h-[400px]"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a73e8]"></div></div>;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-1">System Settings</h1>
          <p className="text-[#aebcda] text-[14.5px]">Global variables, brand identity, and social platform links.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-8 py-3 rounded-xl bg-[#1a73e8] text-white font-bold text-sm hover:shadow-lg hover:shadow-blue-500/20 transition-all disabled:opacity-50"
        >
          <Save size={18} />
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-8 max-xl:grid-cols-1">
        <div className="col-span-2 space-y-6">
          {/* Business Profile */}
          <div className="bg-[#0a1c34] border border-[#0e2340] rounded-2xl p-8 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
              <User size={18} className="text-[#1a73e8]" />
              Business Identity
            </h3>
            <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#7b8bad] uppercase tracking-wider">Business Name</label>
                <input 
                  type="text" 
                  value={settings.business_name}
                  onChange={e => setSettings({...settings, business_name: e.target.value})}
                  className="w-full bg-[#050f1f] border border-[#0e2340] rounded-xl px-4 py-3 text-white text-sm focus:border-[#1a73e8] outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#7b8bad] uppercase tracking-wider">Owner Name</label>
                <input 
                  type="text" 
                  value={settings.owner_name}
                  onChange={e => setSettings({...settings, owner_name: e.target.value})}
                  className="w-full bg-[#050f1f] border border-[#0e2340] rounded-xl px-4 py-3 text-white text-sm focus:border-[#1a73e8] outline-none"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <label className="text-xs font-bold text-[#7b8bad] uppercase tracking-wider">Professional Job Title</label>
                <input 
                  type="text" 
                  value={settings.job_title}
                  onChange={e => setSettings({...settings, job_title: e.target.value})}
                  className="w-full bg-[#050f1f] border border-[#0e2340] rounded-xl px-4 py-3 text-white text-sm focus:border-[#1a73e8] outline-none"
                />
              </div>
            </div>
          </div>

          {/* Social Platforms */}
          <div className="bg-[#0a1c34] border border-[#0e2340] rounded-2xl p-8 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
              <Globe size={18} className="text-[#1a73e8]" />
              Social Media & Professional Links
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20 shrink-0 mt-1">
                  <Linkedin size={18} />
                </div>
                <div className="flex-1">
                  <label className="text-[10px] font-bold text-[#7b8bad] uppercase tracking-wider">LinkedIn Profile URL</label>
                  <input 
                    type="url" 
                    value={settings.linkedin_url}
                    onChange={e => setSettings({...settings, linkedin_url: e.target.value})}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full bg-transparent border-b border-[#0e2340] py-1 text-white text-sm focus:border-[#1a73e8] outline-none transition-all"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-500 border border-blue-600/20 shrink-0 mt-1">
                  <Facebook size={18} />
                </div>
                <div className="flex-1">
                  <label className="text-[10px] font-bold text-[#7b8bad] uppercase tracking-wider">Facebook Page URL</label>
                  <input 
                    type="url" 
                    value={settings.facebook_url}
                    onChange={e => setSettings({...settings, facebook_url: e.target.value})}
                    className="w-full bg-transparent border-b border-[#0e2340] py-1 text-white text-sm focus:border-[#1a73e8] outline-none transition-all"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white border border-white/10 shrink-0 mt-1">
                  <Twitter size={18} />
                </div>
                <div className="flex-1">
                  <label className="text-[10px] font-bold text-[#7b8bad] uppercase tracking-wider">Twitter / X URL</label>
                  <input 
                    type="url" 
                    value={settings.twitter_url}
                    onChange={e => setSettings({...settings, twitter_url: e.target.value})}
                    className="w-full bg-transparent border-b border-[#0e2340] py-1 text-white text-sm focus:border-[#1a73e8] outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact & Integrations Side */}
        <div className="space-y-6">
          <div className="bg-[#0a1c34] border border-[#0e2340] rounded-2xl p-6 space-y-6">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Phone size={16} className="text-[#1a73e8]" />
              Contact Sync
            </h3>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#7b8bad] uppercase">Email</label>
                <input 
                  type="email" 
                  value={settings.email}
                  onChange={e => setSettings({...settings, email: e.target.value})}
                  className="w-full bg-[#050f1f] border border-[#0e2340] rounded-lg px-3 py-2 text-white text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#7b8bad] uppercase">WhatsApp Number</label>
                <input 
                  type="text" 
                  value={settings.whatsapp_number}
                  onChange={e => setSettings({...settings, whatsapp_number: e.target.value})}
                  placeholder="e.g. 10000000000"
                  className="w-full bg-[#050f1f] border border-[#0e2340] rounded-lg px-3 py-2 text-white text-sm"
                />
                <p className="text-[10px] text-green-400 font-medium">✨ Floating button updates instantly.</p>
              </div>
            </div>
          </div>

          <div className="bg-[#0a1c34] border border-[#0e2340] rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Code size={16} className="text-[#1a73e8]" />
              Zcal Integration
            </h3>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-[#7b8bad] uppercase">Zcal Direct Link</label>
              <input 
                type="text" 
                value={settings.zcal_link}
                onChange={e => setSettings({...settings, zcal_link: e.target.value})}
                className="w-full bg-[#050f1f] border border-[#0e2340] rounded-lg px-3 py-2 text-white text-sm"
                placeholder="https://zcal.co/i/..."
              />
            </div>
            <p className="text-[11px] text-[#7b8bad] leading-relaxed">
              This link is used for all "Book a Call" buttons and embedding the interactive calendar.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#1a73e8]/10 to-transparent border border-[#1a73e8]/20 rounded-2xl p-6">
            <h4 className="text-white font-bold text-sm mb-2">Supabase Sync</h4>
            <p className="text-[#aebcda] text-xs leading-relaxed">
              These settings are stored in the <code className="text-white">site_settings</code> table and distributed globally via Next.js server components for optimal SEO.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
