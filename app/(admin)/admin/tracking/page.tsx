"use client";

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/db';
import { 
  Save, 
  Code, 
  ShieldCheck, 
  Info, 
  ExternalLink,
  ChevronRight,
  Terminal
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
    await db.updateTracking(tracking);
    setSaving(false);
    alert('Tracking settings published! Scripts will be injected into the public site immediately.');
  };

  if (loading) return <div className="flex items-center justify-center min-h-[400px]"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a73e8]"></div></div>;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-1">Tracking & Pixels</h1>
          <p className="text-[#aebcda] text-[14.5px]">Manage GTM, GA4, Meta Pixel, and custom code injections.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-8 py-3 rounded-xl bg-[#1a73e8] text-white font-bold text-sm hover:shadow-lg hover:shadow-blue-500/20 transition-all disabled:opacity-50"
        >
          <Save size={18} />
          {saving ? 'Saving...' : 'Publish Tracking'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6 max-xl:grid-cols-1">
        <div className="space-y-6">
          {/* GTM */}
          <div className="bg-[#0a1c34] border border-[#0e2340] rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white">Google Tag Manager</h3>
                  <span className="text-[11px] text-[#7b8bad] uppercase font-bold tracking-wider">Header & Body Injection</span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={tracking.gtm_enabled} onChange={e => setTracking({...tracking, gtm_enabled: e.target.checked})} className="sr-only peer" />
                <div className="w-11 h-6 bg-[#050f1f] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#7b8bad] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1a73e8] peer-checked:after:bg-white"></div>
              </label>
            </div>
            <input 
              type="text" 
              value={tracking.gtm_id}
              onChange={e => setTracking({...tracking, gtm_id: e.target.value})}
              placeholder="GTM-XXXXXXX"
              className="w-full bg-[#050f1f] border border-[#0e2340] rounded-xl px-4 py-3 text-white text-sm focus:border-[#1a73e8] outline-none"
            />
          </div>

          {/* GA4 */}
          <div className="bg-[#0a1c34] border border-[#0e2340] rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-400 border border-yellow-500/20">
                  <Code size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white">Google Analytics 4</h3>
                  <span className="text-[11px] text-[#7b8bad] uppercase font-bold tracking-wider">Measurement ID</span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={tracking.ga4_enabled} onChange={e => setTracking({...tracking, ga4_enabled: e.target.checked})} className="sr-only peer" />
                <div className="w-11 h-6 bg-[#050f1f] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#7b8bad] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1a73e8] peer-checked:after:bg-white"></div>
              </label>
            </div>
            <input 
              type="text" 
              value={tracking.ga4_measurement_id}
              onChange={e => setTracking({...tracking, ga4_measurement_id: e.target.value})}
              placeholder="G-XXXXXXXXXX"
              className="w-full bg-[#050f1f] border border-[#0e2340] rounded-xl px-4 py-3 text-white text-sm focus:border-[#1a73e8] outline-none"
            />
          </div>

          {/* Meta */}
          <div className="bg-[#0a1c34] border border-[#0e2340] rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500 border border-blue-600/20">
                  <Terminal size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white">Meta Pixel</h3>
                  <span className="text-[11px] text-[#7b8bad] uppercase font-bold tracking-wider">Facebook Pixel ID</span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={tracking.meta_pixel_enabled} onChange={e => setTracking({...tracking, meta_pixel_enabled: e.target.checked})} className="sr-only peer" />
                <div className="w-11 h-6 bg-[#050f1f] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#7b8bad] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1a73e8] peer-checked:after:bg-white"></div>
              </label>
            </div>
            <input 
              type="text" 
              value={tracking.meta_pixel_id}
              onChange={e => setTracking({...tracking, meta_pixel_id: e.target.value})}
              placeholder="1234567890"
              className="w-full bg-[#050f1f] border border-[#0e2340] rounded-xl px-4 py-3 text-white text-sm focus:border-[#1a73e8] outline-none"
            />
          </div>
        </div>

        {/* Custom Scripts */}
        <div className="bg-[#0a1c34] border border-[#0e2340] rounded-2xl p-8 space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Terminal size={20} className="text-[#1a73e8]" />
            Custom Code Injection
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#aebcda] mb-2 flex items-center justify-between">
                Head Scripts (Inside &lt;head&gt;)
                <span className="text-[10px] text-[#7b8bad]">HTML Tags Supported</span>
              </label>
              <textarea 
                rows={8}
                value={tracking.custom_head_scripts}
                onChange={e => setTracking({...tracking, custom_head_scripts: e.target.value})}
                placeholder="<!-- Example: <script>...</script> -->"
                className="w-full bg-[#050f1f] border border-[#0e2340] rounded-xl p-4 text-[#aebcda] text-xs font-mono focus:border-[#1a73e8] outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#aebcda] mb-2 flex items-center justify-between">
                Body Scripts (After &lt;body&gt;)
                <span className="text-[10px] text-[#7b8bad]">HTML Tags Supported</span>
              </label>
              <textarea 
                rows={8}
                value={tracking.custom_body_scripts}
                onChange={e => setTracking({...tracking, custom_body_scripts: e.target.value})}
                placeholder="<!-- Example: Noscript tags or chat widgets -->"
                className="w-full bg-[#050f1f] border border-[#0e2340] rounded-xl p-4 text-[#aebcda] text-xs font-mono focus:border-[#1a73e8] outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
