"use client";

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/db';
import { 
  Save, 
  Code, 
  ShieldCheck, 
  Info, 
  Terminal,
  Activity,
  Zap,
  Lock,
  Globe
} from 'lucide-react';

export default function TrackingPage() {
  const [tracking, setTracking] = useState({
    gtm_id: '',
    gtm_enabled: false,
    ga4_measurement_id: '',
    ga4_enabled: false,
    meta_pixel_id: '',
    meta_pixel_enabled: false,
    custom_head_scripts: '',
    custom_body_scripts: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadTracking() {
      const data = await db.getTracking();
      setTracking(data);
      setLoading(false);
    }
    loadTracking();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await db.updateTracking(tracking);
      alert('Tracking settings published successfully!');
    } catch (err) {
      alert('Failed to update tracking settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a73e8]"></div>
    </div>
  );

  const TrackingCard = ({ title, subtitle, icon: Icon, color, idKey, enabledKey, placeholder }: any) => (
    <div className="bg-[#0a1c34]/30 border border-white/5 rounded-[32px] p-8 space-y-6 hover:border-white/10 transition-all backdrop-blur-sm shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${
            color === 'blue' ? 'bg-[#1a73e8]/10 text-[#4c9bff]' :
            color === 'gold' ? 'bg-[#f2a93d]/10 text-[#f2a93d]' :
            'bg-purple-500/10 text-purple-400'
          }`}>
            <Icon size={28} />
          </div>
          <div>
            <h3 className="text-xl font-display font-bold text-white">{title}</h3>
            <span className="text-[10px] text-[#7b8bad] uppercase font-black tracking-widest block mt-0.5">{subtitle}</span>
          </div>
        </div>
        <button 
          onClick={() => setTracking({...tracking, [enabledKey]: !tracking[enabledKey as keyof typeof tracking]})}
          className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none ${
            tracking[enabledKey as keyof typeof tracking] ? 'bg-[#1a73e8]' : 'bg-white/5 border border-white/10'
          }`}
        >
          <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
            tracking[enabledKey as keyof typeof tracking] ? 'translate-x-8 shadow-md' : 'translate-x-1'
          }`} />
        </button>
      </div>
      
      <div className="space-y-2">
        <label className="text-[11px] font-bold text-[#7b8bad] uppercase tracking-widest ml-1">Account ID / ID String</label>
        <div className="relative group">
          <input 
            type="text" 
            value={tracking[idKey as keyof typeof tracking] as string}
            onChange={e => setTracking({...tracking, [idKey]: e.target.value})}
            placeholder={placeholder}
            className="w-full bg-[#050f1f]/80 border border-white/5 rounded-2xl px-6 py-4 text-white text-[15px] focus:border-[#1a73e8] outline-none transition-all shadow-inner placeholder:text-white/5"
          />
          <Lock className="absolute right-5 top-1/2 -translate-y-1/2 text-white/5 group-focus-within:opacity-0 transition-opacity" size={18} />
        </div>
      </div>
      
      <div className="flex items-center gap-2 text-[12px] text-[#7b8bad] bg-white/5 p-3 rounded-xl border border-white/5">
        <Info size={14} className="text-[#1a73e8]" />
        <span>Used for client-side event tracking and conversion signals.</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-display font-bold text-white mb-2 tracking-tight">Tracking & Pixels</h1>
          <p className="text-[#aebcda] text-[15px]">Synchronize marketing signals and conversion tracking containers.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#1a73e8] text-white font-bold text-[15px] hover:shadow-xl hover:shadow-[#1a73e8]/20 transition-all active:scale-[0.98] disabled:opacity-50 shadow-lg"
        >
          <Save size={18} />
          {saving ? 'Publishing...' : 'Deploy Tracking'}
        </button>
      </div>

      <div className="grid grid-cols-12 gap-8 items-start">
        <div className="col-span-12 lg:col-span-7 space-y-6">
          <TrackingCard 
            title="Google Tag Manager"
            subtitle="GTM Container"
            icon={ShieldCheck}
            color="blue"
            idKey="gtm_id"
            enabledKey="gtm_enabled"
            placeholder="GTM-XXXXXXX"
          />
          
          <TrackingCard 
            title="Google Analytics 4"
            subtitle="GA4 Property"
            icon={Globe}
            color="gold"
            idKey="ga4_measurement_id"
            enabledKey="ga4_enabled"
            placeholder="G-XXXXXXXXXX"
          />
          
          <TrackingCard 
            title="Meta Pixel"
            subtitle="Ads Measurement"
            icon={Activity}
            color="purple"
            idKey="meta_pixel_id"
            enabledKey="meta_pixel_enabled"
            placeholder="123456789012345"
          />
        </div>

        <div className="col-span-12 lg:col-span-5 space-y-6">
          {/* Custom Injection Area */}
          <div className="bg-[#0a1c34]/30 border border-white/5 rounded-[32px] p-8 space-y-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#1a73e8]/5 blur-3xl rounded-full" />
            
            <div className="relative">
              <h3 className="text-xl font-display font-bold text-white flex items-center gap-3 mb-6">
                <Terminal size={22} className="text-[#1a73e8]" />
                Advanced Code Injection
              </h3>
              
              <div className="space-y-8">
                <div className="space-y-3">
                  <div className="flex items-center justify-between ml-1">
                    <label className="text-[11px] font-bold text-[#7b8bad] uppercase tracking-widest">Global Head Code</label>
                    <span className="text-[9px] font-bold text-[#1a73e8] bg-[#1a73e8]/10 px-2 py-0.5 rounded border border-[#1a73e8]/20">BEFORE &lt;/HEAD&gt;</span>
                  </div>
                  <textarea 
                    rows={8}
                    value={tracking.custom_head_scripts}
                    onChange={e => setTracking({...tracking, custom_head_scripts: e.target.value})}
                    placeholder="<!-- Add GSC, Pinterest, or Clarity scripts -->"
                    className="w-full bg-[#050f1f]/80 border border-white/5 rounded-2xl p-5 text-[#aebcda] text-[12px] font-mono focus:border-[#1a73e8] outline-none transition-all shadow-inner leading-relaxed"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between ml-1">
                    <label className="text-[11px] font-bold text-[#7b8bad] uppercase tracking-widest">Global Body Code</label>
                    <span className="text-[9px] font-bold text-[#1a73e8] bg-[#1a73e8]/10 px-2 py-0.5 rounded border border-[#1a73e8]/20">AFTER &lt;BODY&gt;</span>
                  </div>
                  <textarea 
                    rows={8}
                    value={tracking.custom_body_scripts}
                    onChange={e => setTracking({...tracking, custom_body_scripts: e.target.value})}
                    placeholder="<!-- Add Noscript tags or chat widgets -->"
                    className="w-full bg-[#050f1f]/80 border border-white/5 rounded-2xl p-5 text-[#aebcda] text-[12px] font-mono focus:border-[#1a73e8] outline-none transition-all shadow-inner leading-relaxed"
                  />
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 text-amber-500/80 text-xs leading-relaxed flex gap-3">
              <Zap size={16} className="shrink-0 mt-0.5" />
              <p>Exercise caution: Malformed script tags or unclosed scripts in these fields can break the public site rendering completely.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}