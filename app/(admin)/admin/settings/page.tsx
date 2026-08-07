"use client";

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/db';
import { 
  Save, 
  Globe, 
  Phone, 
  Mail, 
  User, 
  Linkedin,
  Facebook,
  Twitter,
  Calendar,
  Zap,
  Briefcase,
  AtSign
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
    try {
      await db.updateSettings(settings);
      alert('System settings published successfully!');
    } catch (err) {
      alert('Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a73e8]"></div>
    </div>
  );

  const SettingGroup = ({ title, icon: Icon, children }: any) => (
    <div className="bg-[#0a1c34]/30 border border-white/5 rounded-[32px] p-8 space-y-8 backdrop-blur-sm shadow-xl">
      <div className="flex items-center gap-4 border-b border-white/5 pb-6">
        <div className="w-12 h-12 rounded-[18px] bg-[#1a73e8]/10 text-[#4c9bff] flex items-center justify-center border border-[#1a73e8]/20 shadow-inner">
          <Icon size={24} />
        </div>
        <div>
          <h3 className="text-xl font-display font-bold text-white tracking-tight">{title}</h3>
          <p className="text-[#7b8bad] text-xs font-medium uppercase tracking-widest mt-0.5">Global Configuration</p>
        </div>
      </div>
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );

  const InputField = ({ label, icon: Icon, ...props }: any) => (
    <div className="space-y-2 group">
      <label className="text-[11px] font-bold text-[#7b8bad] uppercase tracking-widest ml-1 flex items-center gap-2 group-focus-within:text-[#1a73e8] transition-colors">
        {Icon && <Icon size={12} />}
        {label}
      </label>
      <input 
        {...props}
        className="w-full bg-[#050f1f]/80 border border-white/5 rounded-2xl px-5 py-4 text-white text-[15px] focus:border-[#1a73e8] outline-none transition-all shadow-inner placeholder:text-white/5"
      />
    </div>
  );

  return (
    <form onSubmit={handleSave} className="space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-display font-bold text-white mb-2 tracking-tight">System Settings</h1>
          <p className="text-[#aebcda] text-[15px]">Manage global brand identity, contact vectors, and API integration links.</p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-10 py-4 rounded-2xl bg-[#1a73e8] text-white font-bold text-[15px] hover:shadow-xl hover:shadow-[#1a73e8]/20 transition-all active:scale-[0.98] disabled:opacity-50 shadow-lg"
        >
          <Save size={18} />
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      <div className="grid grid-cols-12 gap-8 items-start">
        {/* Left Column: Core Identity */}
        <div className="col-span-12 lg:col-span-7 space-y-8">
          <SettingGroup title="Business Profile" icon={Briefcase}>
            <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1">
              <InputField 
                label="Legal Business Name"
                value={settings.business_name}
                onChange={(e: any) => setSettings({...settings, business_name: e.target.value})}
                placeholder="Agency Name"
              />
              <InputField 
                label="Owner / Representative"
                value={settings.owner_name}
                onChange={(e: any) => setSettings({...settings, owner_name: e.target.value})}
                placeholder="Your Name"
              />
            </div>
            <InputField 
              label="Professional Job Title"
              value={settings.job_title}
              onChange={(e: any) => setSettings({...settings, job_title: e.target.value})}
              placeholder="Google Ads Specialist..."
            />
          </SettingGroup>

          <SettingGroup title="Social Media Connect" icon={Globe}>
            <div className="space-y-4">
              <div className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-[#4c9bff] flex items-center justify-center shrink-0 border border-blue-500/10">
                  <Linkedin size={20} />
                </div>
                <div className="flex-1">
                  <input 
                    type="url" 
                    value={settings.linkedin_url}
                    onChange={e => setSettings({...settings, linkedin_url: e.target.value})}
                    placeholder="LinkedIn Profile URL"
                    className="w-full bg-transparent border-b border-white/5 py-2 text-white text-[14px] outline-none focus:border-[#1a73e8] transition-all"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-blue-600/10 text-blue-500 flex items-center justify-center shrink-0 border border-blue-600/10">
                  <Facebook size={20} />
                </div>
                <div className="flex-1">
                  <input 
                    type="url" 
                    value={settings.facebook_url}
                    onChange={e => setSettings({...settings, facebook_url: e.target.value})}
                    placeholder="Facebook Page URL"
                    className="w-full bg-transparent border-b border-white/5 py-2 text-white text-[14px] outline-none focus:border-[#1a73e8] transition-all"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-white/5 text-white flex items-center justify-center shrink-0 border border-white/10">
                  <Twitter size={20} />
                </div>
                <div className="flex-1">
                  <input 
                    type="url" 
                    value={settings.twitter_url}
                    onChange={e => setSettings({...settings, twitter_url: e.target.value})}
                    placeholder="Twitter / X Profile URL"
                    className="w-full bg-transparent border-b border-white/5 py-2 text-white text-[14px] outline-none focus:border-[#1a73e8] transition-all"
                  />
                </div>
              </div>
            </div>
          </SettingGroup>
        </div>

        {/* Right Column: Contact & Tools */}
        <div className="col-span-12 lg:col-span-5 space-y-8">
          <SettingGroup title="Direct Communication" icon={Phone}>
            <div className="space-y-6">
              <InputField 
                label="Primary Business Email"
                icon={AtSign}
                type="email"
                value={settings.email}
                onChange={(e: any) => setSettings({...settings, email: e.target.value})}
              />
              <div className="space-y-2 group">
                <label className="text-[11px] font-bold text-[#7b8bad] uppercase tracking-widest ml-1 flex items-center gap-2 group-focus-within:text-emerald-500 transition-colors">
                  <Phone size={12} /> WhatsApp (Numeric Only)
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={settings.whatsapp_number}
                    onChange={e => setSettings({...settings, whatsapp_number: e.target.value})}
                    placeholder="e.g. 10000000000"
                    className="w-full bg-[#050f1f]/80 border border-white/5 rounded-2xl px-5 py-4 text-white text-[15px] focus:border-emerald-500 outline-none transition-all shadow-inner"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                     <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                     <span className="text-[9px] font-black text-emerald-500/50 tracking-tighter uppercase">Live Sync</span>
                  </div>
                </div>
                <p className="text-[11px] text-[#7b8bad] leading-relaxed px-1">Floating contact button on public site uses this value for the click-to-chat link.</p>
              </div>
            </div>
          </SettingGroup>

          <SettingGroup title="Booking Integration" icon={Calendar}>
            <InputField 
              label="Zcal Direct Booking Link"
              value={settings.zcal_link}
              onChange={(e: any) => setSettings({...settings, zcal_link: e.target.value})}
              placeholder="https://zcal.co/i/..."
            />
            <div className="p-4 rounded-2xl bg-[#1a73e8]/5 border border-[#1a73e8]/10 flex gap-3">
              <Zap size={16} className="text-[#4c9bff] shrink-0 mt-0.5" />
              <p className="text-[12px] text-[#aebcda] leading-relaxed">Changes to this link will update all &ldquo;Book Consultation&rdquo; buttons and the embedded calendar widget globally.</p>
            </div>
          </SettingGroup>
        </div>
      </div>
    </form>
  );
}