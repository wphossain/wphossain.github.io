"use client";

import React, { useState, useEffect, useRef } from 'react';
import { db } from '@/lib/db';
import { 
  Save, 
  Plus, 
  Trash2, 
  Layout, 
  Settings2, 
  CheckCircle2, 
  HelpCircle,
  Activity,
  Trophy,
  Eye,
  EyeOff,
  MoveUp,
  MoveDown,
  TrendingUp
} from 'lucide-react';

export default function PageContentEditorPage() {
  const [sections, setSections] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('hero');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const dirtyRef = useRef(false);

  useEffect(() => {
    loadSections();
  }, []);

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (dirtyRef.current) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, []);

  async function loadSections() {
    setLoading(true);
    const data = await db.getAllSections();
    setSections(data);
    dirtyRef.current = false;
    setLoading(false);
  }

  const findSection = (key: string) => sections.find(s => s.section_key === key);

  const updateSection = (key: string, data: any) => {
    dirtyRef.current = true;
    setSections(prev => prev.map(s => s.section_key === key ? { ...s, ...data } : s));
  };

  const updateContentJson = (key: string, contentData: any) => {
    const sec = findSection(key);
    updateSection(key, { content_json: { ...sec.content_json, ...contentData } });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const sec of sections) {
        await db.saveSection(sec.section_key, sec.title, sec.subtitle, sec.content_json, sec.is_visible);
      }
      alert('All changes saved successfully!');
      dirtyRef.current = false;
    } catch (err) {
      alert('Failed to save changes.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a73e8]"></div>
    </div>
  );

  const currentSection = findSection(activeTab);

  const tabs = [
    { key: 'hero', label: 'Hero Section', icon: Layout },
    { key: 'growth_hero', label: 'Ecosystem Hero', icon: Layout },
    { key: 'services', label: 'Services', icon: Settings2 },
    { key: 'why', label: 'Why Me', icon: CheckCircle2 },
    { key: 'process', label: 'Process', icon: Activity },
    { key: 'case-studies', label: 'Portfolio', icon: Layout },
    { key: 'results', label: 'Results / KPIs', icon: TrendingUp },
    { key: 'faq', label: 'FAQ', icon: HelpCircle },
    { key: 'certifications', label: 'Certifications', icon: Trophy }
  ];

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-display font-bold text-white mb-2 tracking-tight">Page Editor</h1>
          <p className="text-[#aebcda] text-[15px]">Directly modify landing page headlines, content lists, and section visibility.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#1a73e8] text-white font-bold text-[15px] hover:shadow-xl hover:shadow-[#1a73e8]/20 transition-all active:scale-[0.98] disabled:opacity-50 shadow-lg"
        >
          <Save size={18} />
          {saving ? 'Synchronizing...' : 'Publish All Changes'}
        </button>
      </div>

      <div className="grid grid-cols-[280px_1fr] gap-10 max-lg:grid-cols-1">
        {/* Navigation Sidebar */}
        <aside className="space-y-2">
          <span className="text-[11px] font-bold text-[#7b8bad] uppercase tracking-widest ml-4 mb-4 block">Site Sections</span>
          {tabs.map((tab: any) => {
            const isActive = activeTab === tab.key;
            const isSectionVisible = findSection(tab.key)?.is_visible;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-[14px] font-bold transition-all group ${
                  isActive 
                    ? 'bg-[#1a73e8] text-white shadow-xl shadow-[#1a73e8]/10 scale-[1.02]' 
                    : 'text-[#aebcda] hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <tab.icon size={18} className={isActive ? 'text-white' : 'text-[#7b8bad] group-hover:text-white'} />
                  {tab.label}
                </div>
                {!isSectionVisible && <EyeOff size={14} className="opacity-40" />}
              </button>
            );
          })}
        </aside>

        {/* Editor Main Area */}
        <div className="bg-[#0a1c34]/30 border border-white/5 rounded-[32px] overflow-hidden backdrop-blur-sm shadow-2xl">
          {currentSection ? (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              {/* Editor Header */}
              <div className="p-8 border-b border-white/5 bg-white/5 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-display font-bold text-white flex items-center gap-3 capitalize">
                    {activeTab.replace('-', ' ')} Editor
                  </h3>
                  <p className="text-[#7b8bad] text-xs mt-1">Configure section global fields and internal data objects.</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-[#7b8bad] uppercase tracking-wider">Status:</span>
                  <button 
                    onClick={() => updateSection(activeTab, { is_visible: !currentSection.is_visible })}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      currentSection.is_visible 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : 'bg-white/5 text-[#7b8bad] border border-white/10'
                    }`}
                  >
                    {currentSection.is_visible ? <Eye size={14} /> : <EyeOff size={14} />}
                    {currentSection.is_visible ? 'VISIBLE' : 'HIDDEN'}
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-8 space-y-10">
                {/* Global Section Fields */}
                <div className="grid grid-cols-1 gap-8">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-[#7b8bad] uppercase tracking-widest ml-1">Main Heading (Title)</label>
                    <input 
                      type="text" 
                      value={currentSection.title}
                      onChange={(e) => updateSection(activeTab, { title: e.target.value })}
                      className="w-full bg-[#050f1f]/80 border border-white/5 rounded-2xl px-6 py-4 text-white text-[15px] focus:border-[#1a73e8] outline-none transition-all shadow-inner"
                      placeholder="Enter section title..."
                    />
                  </div>
                  {(activeTab === 'hero' || activeTab === 'services' || activeTab === 'why' || activeTab === 'faq') && (
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-[#7b8bad] uppercase tracking-widest ml-1">Introductory Text (Subtitle)</label>
                      <textarea 
                        rows={3}
                        value={currentSection.subtitle || ''}
                        onChange={(e) => updateSection(activeTab, { subtitle: e.target.value })}
                        className="w-full bg-[#050f1f]/80 border border-white/5 rounded-2xl px-6 py-4 text-white text-[15px] focus:border-[#1a73e8] outline-none transition-all resize-none shadow-inner leading-relaxed"
                        placeholder="Provide more context..."
                      />
                    </div>
                  )}
                </div>

                {/* Section Specific Structured Content */}
                <div className="space-y-6 pt-6 border-t border-white/5">
                  <h4 className="text-sm font-bold text-white uppercase tracking-widest">Section Data Models</h4>
                  
                  {activeTab === 'hero' && (
                    <div className="space-y-8">
                      <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1">
                        <div className="space-y-2">
                          <label className="text-[11px] font-bold text-[#7b8bad] uppercase tracking-widest ml-1">Eyebrow Text</label>
                          <input 
                            type="text" 
                            value={currentSection.content_json.eyebrow_text || 'Available For New Clients'}
                            onChange={(e) => updateContentJson('hero', { eyebrow_text: e.target.value })}
                            className="w-full bg-[#050f1f]/80 border border-white/5 rounded-xl px-5 py-3 text-white text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[11px] font-bold text-[#7b8bad] uppercase tracking-widest ml-1">Availability Badge</label>
                          <input 
                            type="text" 
                            value={currentSection.content_json.availability_badge || ''}
                            onChange={(e) => updateContentJson('hero', { availability_badge: e.target.value })}
                            className="w-full bg-[#050f1f]/80 border border-white/5 rounded-xl px-5 py-3 text-white text-sm"
                          />
                        </div>
                      </div>

                      {/* Call to Actions Editor */}
                      <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-4">
                        <h5 className="text-[11px] font-bold text-[#1a73e8] uppercase tracking-widest">Call To Action Buttons</h5>
                        <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                           <div className="space-y-2">
                             <label className="text-[10px] font-bold text-[#7b8bad] uppercase">Primary Button Text</label>
                             <input 
                               type="text" 
                               value={currentSection.content_json.cta_primary?.text || 'Book Free Strategy Call'}
                               onChange={(e) => updateContentJson('hero', { cta_primary: { ...(currentSection.content_json.cta_primary || {}), text: e.target.value } })}
                               className="w-full bg-[#050f1f] border border-white/10 rounded-xl px-4 py-2 text-white text-sm"
                             />
                           </div>
                           <div className="space-y-2">
                             <label className="text-[10px] font-bold text-[#7b8bad] uppercase">Primary Button Link</label>
                             <input 
                               type="text" 
                               value={currentSection.content_json.cta_primary?.link || '#contact'}
                               onChange={(e) => updateContentJson('hero', { cta_primary: { ...(currentSection.content_json.cta_primary || {}), link: e.target.value } })}
                               className="w-full bg-[#050f1f] border border-white/10 rounded-xl px-4 py-2 text-white text-sm"
                             />
                           </div>
                           <div className="space-y-2">
                             <label className="text-[10px] font-bold text-[#7b8bad] uppercase">Secondary Button Text</label>
                             <input 
                               type="text" 
                               value={currentSection.content_json.cta_secondary?.text || 'View Results'}
                               onChange={(e) => updateContentJson('hero', { cta_secondary: { ...(currentSection.content_json.cta_secondary || {}), text: e.target.value } })}
                               className="w-full bg-[#050f1f] border border-white/10 rounded-xl px-4 py-2 text-white text-sm"
                             />
                           </div>
                           <div className="space-y-2">
                             <label className="text-[10px] font-bold text-[#7b8bad] uppercase">Secondary Button Link</label>
                             <input 
                               type="text" 
                               value={currentSection.content_json.cta_secondary?.link || '#portfolio'}
                               onChange={(e) => updateContentJson('hero', { cta_secondary: { ...(currentSection.content_json.cta_secondary || {}), link: e.target.value } })}
                               className="w-full bg-[#050f1f] border border-white/10 rounded-xl px-4 py-2 text-white text-sm"
                             />
                           </div>
                           <div className="col-span-2 max-sm:col-span-1 space-y-2">
                             <label className="text-[10px] font-bold text-[#7b8bad] uppercase">CTA Sub-Note (Under Buttons)</label>
                             <input 
                               type="text" 
                               value={currentSection.content_json.cta_note || 'Free · No commitment · 15-min call'}
                               onChange={(e) => updateContentJson('hero', { cta_note: e.target.value })}
                               className="w-full bg-[#050f1f] border border-white/10 rounded-xl px-4 py-2 text-white text-sm"
                             />
                           </div>
                        </div>
                      </div>

                      {/* Trusted / Rating Card Editor */}
                      <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-4">
                        <h5 className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest">Trusted / Rating Card</h5>
                        <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                           <div className="space-y-2">
                             <label className="text-[10px] font-bold text-[#7b8bad] uppercase">Rating Label</label>
                             <input 
                               type="text" 
                               value={currentSection.content_json.trusted_block?.rating_text || 'Rated 5.0'}
                               onChange={(e) => updateContentJson('hero', { trusted_block: { ...(currentSection.content_json.trusted_block || {}), rating_text: e.target.value } })}
                               className="w-full bg-[#050f1f] border border-white/10 rounded-xl px-4 py-2 text-white text-sm"
                             />
                           </div>
                           <div className="space-y-2">
                             <label className="text-[10px] font-bold text-[#7b8bad] uppercase">Trust Highlight Text</label>
                             <input 
                               type="text" 
                               value={currentSection.content_json.trusted_block?.trust_text || '75+ businesses'}
                               onChange={(e) => updateContentJson('hero', { trusted_block: { ...(currentSection.content_json.trusted_block || {}), trust_text: e.target.value } })}
                               className="w-full bg-[#050f1f] border border-white/10 rounded-xl px-4 py-2 text-white text-sm"
                             />
                           </div>
                           <div className="space-y-2">
                             <label className="text-[10px] font-bold text-[#7b8bad] uppercase">Client Avatar Image URL</label>
                             <input 
                               type="text" 
                               value={currentSection.content_json.trusted_block?.avatar_image_url || '/images/client-avatars.png'}
                               onChange={(e) => updateContentJson('hero', { trusted_block: { ...(currentSection.content_json.trusted_block || {}), avatar_image_url: e.target.value } })}
                               className="w-full bg-[#050f1f] border border-white/10 rounded-xl px-4 py-2 text-white text-sm"
                             />
                           </div>
                           <div className="space-y-2">
                             <label className="text-[10px] font-bold text-[#7b8bad] uppercase">Click Destination Link</label>
                             <input 
                               type="text" 
                               value={currentSection.content_json.trusted_block?.link || '#testimonials'}
                               onChange={(e) => updateContentJson('hero', { trusted_block: { ...(currentSection.content_json.trusted_block || {}), link: e.target.value } })}
                               className="w-full bg-[#050f1f] border border-white/10 rounded-xl px-4 py-2 text-white text-sm"
                             />
                           </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="text-[11px] font-bold text-[#7b8bad] uppercase tracking-widest ml-1">Trust Pills (Badges)</label>
                        <div className="grid grid-cols-1 gap-3">
                          {(currentSection.content_json.certificates || []).map((c: any, i: number) => (
                            <div key={i} className="flex gap-3 animate-in slide-in-from-left-2 duration-300">
                              <input 
                                type="text" 
                                value={c.name}
                                onChange={(e) => {
                                  const certs = [...currentSection.content_json.certificates];
                                  certs[i].name = e.target.value;
                                  updateContentJson('hero', { certificates: certs });
                                }}
                                className="flex-1 bg-[#050f1f]/80 border border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:border-[#1a73e8] outline-none"
                              />
                              <button 
                                onClick={() => {
                                  const certs = currentSection.content_json.certificates.filter((_: any, idx: number) => idx !== i);
                                  updateContentJson('hero', { certificates: certs });
                                }}
                                className="p-3 bg-red-400/10 text-red-400 hover:bg-red-400 hover:text-white rounded-xl transition-all border border-red-400/20"
                              ><Trash2 size={16} /></button>
                            </div>
                          ))}
                          <button 
                            onClick={() => {
                              const certs = [...(currentSection.content_json.certificates || []), { name: 'New Feature', type: 'custom' }];
                              updateContentJson('hero', { certificates: certs });
                            }}
                            className="flex items-center justify-center gap-2 py-3 border-2 border-dashed border-white/5 rounded-xl text-[#7b8bad] hover:text-[#1a73e8] hover:border-[#1a73e8]/30 transition-all text-sm font-bold mt-2"
                          >
                            <Plus size={16} /> Add Trust Pill
                          </button>
                        </div>
                      </div>

                      {/* Bottom 4-Stat Strip Editor */}
                      <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-4">
                         <h5 className="text-[11px] font-bold text-[#f2a93d] uppercase tracking-widest">Bottom 4-Stat Strip Editor</h5>
                         <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                            {(currentSection.content_json.hero_stats || [
                              { value: "$2.4M+", label: "Total Ad Spend Managed" },
                              { value: "42%", label: "Avg. CPL Reduction", highlight: true },
                              { value: "180+", label: "Campaigns Managed" },
                              { value: "94%", label: "Client Retention" }
                            ]).map((s: any, idx: number) => (
                               <div key={idx} className="p-4 bg-[#050f1f] rounded-2xl border border-white/5 space-y-2">
                                  <div className="flex gap-2">
                                     <input 
                                        type="text"
                                        placeholder="Value e.g. $2.4M+"
                                        value={s.value}
                                        onChange={(e) => {
                                           const stats = [...(currentSection.content_json.hero_stats || [
                                             { value: "$2.4M+", label: "Total Ad Spend Managed" },
                                             { value: "42%", label: "Avg. CPL Reduction", highlight: true },
                                             { value: "180+", label: "Campaigns Managed" },
                                             { value: "94%", label: "Client Retention" }
                                           ])];
                                           stats[idx].value = e.target.value;
                                           updateContentJson('hero', { hero_stats: stats });
                                        }}
                                        className="w-1/2 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-white text-sm font-bold"
                                     />
                                     <input 
                                        type="text"
                                        placeholder="Label"
                                        value={s.label}
                                        onChange={(e) => {
                                           const stats = [...(currentSection.content_json.hero_stats || [
                                             { value: "$2.4M+", label: "Total Ad Spend Managed" },
                                             { value: "42%", label: "Avg. CPL Reduction", highlight: true },
                                             { value: "180+", label: "Campaigns Managed" },
                                             { value: "94%", label: "Client Retention" }
                                           ])];
                                           stats[idx].label = e.target.value;
                                           updateContentJson('hero', { hero_stats: stats });
                                        }}
                                        className="w-1/2 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-white text-sm"
                                     />
                                  </div>
                               </div>
                            ))}
                         </div>
                      </div>

                      {/* Interactive Card Section Editor */}
                      <div className="pt-6 border-t border-white/5 space-y-6">
                         <h5 className="text-[11px] font-bold text-white uppercase tracking-widest bg-white/5 px-4 py-2 rounded-lg inline-block">Interactive Dashboard Editor</h5>
                         <p className="text-[12px] text-[#7b8bad]">Configure the details for HVAC, Plumbing, and Roofing tabs on the hero card.</p>
                         
                         <div className="p-5 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                           <label className="text-[10px] font-bold text-[#7b8bad] uppercase tracking-widest">Dashboard Global Caption (Under Metrics)</label>
                           <input 
                              type="text" 
                              value={currentSection.content_json.dashboard_caption || 'Aggregate across managed accounts'}
                              onChange={(e) => updateContentJson('hero', { dashboard_caption: e.target.value })}
                              className="w-full bg-[#050f1f] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm"
                           />
                         </div>
                         
                         <div className="space-y-8">
                            {['hvac', 'plumbing', 'roofing'].map((niche) => {
                               const nicheData = currentSection.content_json.niche_tabs?.[niche] || {};
                               return (
                                  <div key={niche} className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-5">
                                     <div className="flex items-center justify-between">
                                        <h6 className="text-sm font-bold text-[#1a73e8] uppercase tracking-wide">{niche} Configuration</h6>
                                     </div>
                                     <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                           <label className="text-[10px] text-[#7b8bad] uppercase font-bold">Campaign Name</label>
                                           <input 
                                              type="text" 
                                              placeholder="e.g. Dallas HVAC Campaign"
                                              value={nicheData.campaign_name || ''}
                                              onChange={(e) => {
                                                 const tabs = currentSection.content_json.niche_tabs || {};
                                                 updateContentJson('hero', { niche_tabs: { ...tabs, [niche]: { ...nicheData, campaign_name: e.target.value } } });
                                              }}
                                              className="w-full bg-[#050f1f] border border-white/10 rounded-xl px-4 py-2 text-white text-sm"
                                           />
                                        </div>
                                        <div className="space-y-1">
                                           <label className="text-[10px] text-[#7b8bad] uppercase font-bold">Ad Headline</label>
                                           <input 
                                              type="text" 
                                              placeholder="Catchy headline..."
                                              value={nicheData.ad_headline || ''}
                                              onChange={(e) => {
                                                 const tabs = currentSection.content_json.niche_tabs || {};
                                                 updateContentJson('hero', { niche_tabs: { ...tabs, [niche]: { ...nicheData, ad_headline: e.target.value } } });
                                              }}
                                              className="w-full bg-[#050f1f] border border-white/10 rounded-xl px-4 py-2 text-white text-sm"
                                           />
                                        </div>
                                     </div>
                                     <div className="space-y-1">
                                        <label className="text-[10px] text-[#7b8bad] uppercase font-bold">Ad Description</label>
                                        <textarea 
                                           rows={2}
                                           value={nicheData.ad_desc || ''}
                                           onChange={(e) => {
                                              const tabs = currentSection.content_json.niche_tabs || {};
                                              updateContentJson('hero', { niche_tabs: { ...tabs, [niche]: { ...nicheData, ad_desc: e.target.value } } });
                                           }}
                                           className="w-full bg-[#050f1f] border border-white/10 rounded-xl px-4 py-2 text-white text-sm resize-none"
                                        />
                                     </div>
                                     <div className="space-y-1">
                                        <label className="text-[10px] text-[#7b8bad] uppercase font-bold">Chart Image URL</label>
                                        <input 
                                           type="text" 
                                           placeholder="/images/charts/..."
                                           value={nicheData.chart || ''}
                                           onChange={(e) => {
                                              const tabs = currentSection.content_json.niche_tabs || {};
                                              updateContentJson('hero', { niche_tabs: { ...tabs, [niche]: { ...nicheData, chart: e.target.value } } });
                                           }}
                                           className="w-full bg-[#050f1f] border border-white/10 rounded-xl px-4 py-2 text-white text-sm"
                                        />
                                     </div>
                                  </div>
                               )
                            })}
                         </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'services' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 gap-4">
                        {(currentSection.content_json.services_list || []).map((s: any, i: number) => (
                          <div key={i} className="group bg-[#050f1f]/80 border border-white/5 rounded-[24px] p-6 space-y-4 hover:border-white/10 transition-all animate-in slide-in-from-bottom-2 duration-300">
                            <div className="flex items-center justify-between border-b border-white/5 pb-4">
                              <input 
                                type="text" 
                                placeholder="Service Title"
                                value={s.title}
                                onChange={(e) => {
                                  const list = [...currentSection.content_json.services_list];
                                  list[i].title = e.target.value;
                                  updateContentJson('services', { services_list: list });
                                }}
                                className="bg-transparent font-bold text-white text-[16px] focus:text-[#4c9bff] outline-none w-full"
                              />
                              <div className="flex gap-2">
                                <button onClick={() => {
                                  const list = currentSection.content_json.services_list.filter((_: any, idx: number) => idx !== i);
                                  updateContentJson('services', { services_list: list });
                                }} className="p-2 text-[#7b8bad] hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
                              </div>
                            </div>
                            <textarea 
                              rows={2}
                              placeholder="Description of this service offering..."
                              value={s.desc}
                              onChange={(e) => {
                                const list = [...currentSection.content_json.services_list];
                                list[i].desc = e.target.value;
                                updateContentJson('services', { services_list: list });
                              }}
                              className="w-full bg-transparent text-sm text-[#aebcda] outline-none resize-none leading-relaxed"
                            />
                            <div className="flex flex-wrap items-center gap-4">
                              <div className="flex items-center gap-3">
                                <span className="text-[9px] font-bold text-[#7b8bad] uppercase tracking-widest">Label</span>
                                <input 
                                  type="text" 
                                  value={s.tag || ''}
                                  onChange={(e) => {
                                    const list = [...currentSection.content_json.services_list];
                                    list[i].tag = e.target.value;
                                    updateContentJson('services', { services_list: list });
                                  }}
                                  className="bg-white/5 px-3 py-1 rounded-lg text-[10px] text-[#f2a93d] font-bold uppercase border border-[#f2a93d]/20"
                                />
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-[9px] font-bold text-[#7b8bad] uppercase tracking-widest">Icon</span>
                                <select 
                                  value={s.icon || 'hvac'}
                                  onChange={(e) => {
                                    const list = [...currentSection.content_json.services_list];
                                    list[i].icon = e.target.value;
                                    updateContentJson('services', { services_list: list });
                                  }}
                                  className="bg-white/5 px-3 py-1.5 rounded-lg text-[11px] text-white font-bold uppercase border border-white/10 outline-none focus:border-[#1a73e8]"
                                >
                                  <option value="hvac" className="bg-[#050f1f]">HVAC</option>
                                  <option value="plumbing" className="bg-[#050f1f]">Plumbing</option>
                                  <option value="roofing" className="bg-[#050f1f]">Roofing</option>
                                  <option value="electrical" className="bg-[#050f1f]">Electrical</option>
                                  <option value="landscaping" className="bg-[#050f1f]">Landscaping</option>
                                  <option value="other" className="bg-[#050f1f]">Other</option>
                                </select>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-[9px] font-bold text-[#7b8bad] uppercase tracking-widest">Color</span>
                                <input 
                                  type="color"
                                  value={s.color || '#4c9bff'}
                                  onChange={(e) => {
                                    const list = [...currentSection.content_json.services_list];
                                    list[i].color = e.target.value;
                                    updateContentJson('services', { services_list: list });
                                  }}
                                  className="w-8 h-8 rounded-lg border border-white/10 bg-transparent cursor-pointer"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button 
                        onClick={() => {
                          const list = [...(currentSection.content_json.services_list || []), { title: 'New PPC Service', desc: '', tag: 'Strategy', icon: 'hvac', color: '#4c9bff' }];
                          updateContentJson('services', { services_list: list });
                        }}
                        className="w-full py-5 border-2 border-dashed border-white/5 rounded-[24px] text-[#7b8bad] hover:text-white hover:border-[#1a73e8]/30 transition-all text-sm font-bold flex items-center justify-center gap-2 mt-4"
                      >
                        <Plus size={18} /> Add New Service Card
                      </button>
                    </div>
                  )}

                  {activeTab === 'faq' && (
                    <div className="space-y-4">
                      {(currentSection.content_json.faqs || []).map((faq: any, i: number) => (
                        <div key={i} className="bg-[#050f1f]/80 border border-white/5 rounded-[20px] p-6 space-y-4 hover:border-white/10 transition-all">
                          <div className="flex gap-4">
                            <div className="flex-1 space-y-4">
                              <input 
                                type="text" 
                                placeholder="Question Text"
                                value={faq.question}
                                onChange={(e) => {
                                  const list = [...currentSection.content_json.faqs];
                                  list[i].question = e.target.value;
                                  updateContentJson('faq', { faqs: list });
                                }}
                                className="w-full bg-transparent border-b border-white/5 pb-3 font-bold text-white text-[15px] outline-none focus:border-[#1a73e8]"
                              />
                              <textarea 
                                rows={3}
                                placeholder="Comprehensive Answer..."
                                value={faq.answer}
                                onChange={(e) => {
                                  const list = [...currentSection.content_json.faqs];
                                  list[i].answer = e.target.value;
                                  updateContentJson('faq', { faqs: list });
                                }}
                                className="w-full bg-transparent text-[14px] text-[#aebcda] outline-none resize-none leading-relaxed"
                              />
                            </div>
                            <button onClick={() => {
                              const list = currentSection.content_json.faqs.filter((_: any, idx: number) => idx !== i);
                              updateContentJson('faq', { faqs: list });
                            }} className="p-3 self-start bg-red-400/10 text-red-400 rounded-xl hover:bg-red-400 hover:text-white transition-all"><Trash2 size={16} /></button>
                          </div>
                        </div>
                      ))}
                      <button 
                        onClick={() => {
                          const list = [...(currentSection.content_json.faqs || []), { question: 'Frequently Asked Question?', answer: '' }];
                          updateContentJson('faq', { faqs: list });
                        }}
                        className="w-full py-5 border-2 border-dashed border-white/5 rounded-[20px] text-[#7b8bad] hover:text-white hover:border-[#1a73e8]/30 transition-all text-sm font-bold flex items-center justify-center gap-2 mt-4"
                      >
                        <Plus size={18} /> Add New FAQ Item
                      </button>
                    </div>
                  )}

                  {activeTab === 'process' && (
                    <div className="space-y-4">
                      {(currentSection.content_json?.steps || []).map((p: any, i: number) => (
                        <div key={i} className="flex gap-4 items-start bg-[#050f1f]/80 border border-white/5 rounded-[20px] p-6">
                           <div className="w-10 h-10 rounded-xl bg-[#1a73e8]/10 text-[#1a73e8] flex items-center justify-center font-bold font-display shrink-0 border border-[#1a73e8]/20">{p.num}</div>
                           <div className="flex-1 grid grid-cols-1 gap-4">
                              <input 
                                type="text" 
                                value={p.title}
                                onChange={(e) => {
                                  const steps = [...currentSection.content_json.steps];
                                  steps[i].title = e.target.value;
                                  updateContentJson('process', { steps });
                                }}
                                className="bg-transparent font-bold text-white border-b border-white/5 outline-none focus:border-[#1a73e8] pb-2"
                                placeholder="Step Title"
                              />
                              <textarea 
                                value={p.desc}
                                onChange={(e) => {
                                  const steps = [...currentSection.content_json.steps];
                                  steps[i].desc = e.target.value;
                                  updateContentJson('process', { steps });
                                }}
                                className="bg-transparent text-sm text-[#aebcda] outline-none resize-none"
                                placeholder="Step Description"
                                rows={2}
                              />
                           </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'results' && (
                    <div className="space-y-4">
                      <p className="text-[12px] text-[#7b8bad] leading-relaxed">
                        Edit the headline performance stats shown in the <strong className="text-white">Results / Performance</strong> section. Each stat animates on the public site and updates live.
                      </p>
                      {(currentSection.content_json?.stats || []).map((s: any, i: number) => (
                        <div key={i} className="bg-[#050f1f]/80 border border-white/5 rounded-[24px] p-6 space-y-4 hover:border-white/10 transition-all">
                          <div className="flex items-start gap-3">
                            <div className="flex-1 grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-[#7b8bad] uppercase tracking-widest">Value</label>
                                <input 
                                  value={s.value}
                                  onChange={(e) => {
                                    const stats = [...(currentSection.content_json?.stats || [])];
                                    stats[i] = { ...stats[i], value: e.target.value };
                                    updateContentJson('results', { stats });
                                  }}
                                  className="w-full bg-transparent border-b border-white/5 pb-1 font-display font-bold text-white text-lg outline-none focus:border-[#1a73e8]"
                                  placeholder="$28.50"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-[#7b8bad] uppercase tracking-widest">Label</label>
                                <input 
                                  value={s.label}
                                  onChange={(e) => {
                                    const stats = [...(currentSection.content_json?.stats || [])];
                                    stats[i] = { ...stats[i], label: e.target.value };
                                    updateContentJson('results', { stats });
                                  }}
                                  className="w-full bg-transparent border-b border-white/5 pb-1 text-white text-sm outline-none focus:border-[#1a73e8]"
                                  placeholder="Average HVAC CPL"
                                />
                              </div>
                              <div className="space-y-1 col-span-2">
                                <label className="text-[10px] font-bold text-[#7b8bad] uppercase tracking-widest">Description</label>
                                <textarea 
                                  rows={2}
                                  value={s.desc}
                                  onChange={(e) => {
                                    const stats = [...(currentSection.content_json?.stats || [])];
                                    stats[i] = { ...stats[i], desc: e.target.value };
                                    updateContentJson('results', { stats });
                                  }}
                                  className="w-full bg-transparent text-[#aebcda] text-sm outline-none resize-none border-b border-white/5 pb-2 focus:border-[#1a73e8]"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-[#7b8bad] uppercase tracking-widest">Accent Color</label>
                                <div className="flex items-center gap-2">
                                  <input 
                                    type="color"
                                    value={s.color || '#1a73e8'}
                                    onChange={(e) => {
                                      const stats = [...(currentSection.content_json?.stats || [])];
                                      stats[i] = { ...stats[i], color: e.target.value };
                                      updateContentJson('results', { stats });
                                    }}
                                    className="w-10 h-10 rounded-lg border border-white/10 bg-transparent cursor-pointer"
                                  />
                                  <input 
                                    value={s.color || ''}
                                    onChange={(e) => {
                                      const stats = [...(currentSection.content_json?.stats || [])];
                                      stats[i] = { ...stats[i], color: e.target.value };
                                      updateContentJson('results', { stats });
                                    }}
                                    className="flex-1 bg-transparent text-white text-sm outline-none border-b border-white/5 pb-1"
                                    placeholder="#1a73e8"
                                  />
                                </div>
                              </div>
                              <div className="flex items-end justify-end">
                                <button 
                                  onClick={() => {
                                    const stats = (currentSection.content_json?.stats || []).filter((_: any, idx: number) => idx !== i);
                                    updateContentJson('results', { stats });
                                  }}
                                  className="p-2.5 self-end bg-red-400/10 text-red-400 rounded-xl hover:bg-red-400 hover:text-white transition-all border border-red-400/20"
                                ><Trash2 size={16} /></button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      <button 
                        onClick={() => {
                          const stats = [...(currentSection.content_json?.stats || []), { value: '0%', label: 'New Metric', desc: '', color: '#1a73e8' }];
                          updateContentJson('results', { stats });
                        }}
                        className="w-full py-5 border-2 border-dashed border-white/5 rounded-[24px] text-[#7b8bad] hover:text-white hover:border-[#1a73e8]/30 transition-all text-sm font-bold flex items-center justify-center gap-2 mt-4"
                      >
                        <Plus size={18} /> Add New Metric
                      </button>
                    </div>
                  )}

                  {activeTab === 'why' && (
                    <div className="space-y-8">
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-[#7b8bad] uppercase tracking-widest ml-1">Eyebrow Badge Text</label>
                        <input 
                          type="text" 
                          value={currentSection.content_json?.eyebrow || 'WHY CHOOSE ME'}
                          onChange={(e) => updateContentJson('why', { eyebrow: e.target.value })}
                          className="w-full bg-[#050f1f]/80 border border-white/5 rounded-xl px-5 py-3 text-white text-sm focus:border-[#1a73e8] outline-none"
                          placeholder="WHY CHOOSE ME"
                        />
                      </div>

                      <div className="space-y-4">
                        <label className="text-[11px] font-bold text-[#7b8bad] uppercase tracking-widest ml-1">Icon Cards (Grid)</label>
                        <div className="grid grid-cols-1 gap-4">
                          {(currentSection.content_json?.cards || []).map((card: any, i: number) => (
                            <div key={i} className="group bg-[#050f1f]/80 border border-white/5 rounded-[24px] p-6 space-y-4 hover:border-white/10 transition-all">
                              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                <input 
                                  type="text" 
                                  placeholder="Card Title"
                                  value={card.title || ''}
                                  onChange={(e) => {
                                    const cards = [...currentSection.content_json.cards];
                                    cards[i].title = e.target.value;
                                    updateContentJson('why', { cards });
                                  }}
                                  className="bg-transparent font-bold text-white text-[16px] focus:text-[#4c9bff] outline-none w-full"
                                />
                                <button 
                                  onClick={() => {
                                    const cards = currentSection.content_json.cards.filter((_: any, idx: number) => idx !== i);
                                    updateContentJson('why', { cards });
                                  }} 
                                  className="p-2 text-[#7b8bad] hover:text-red-400 transition-colors"
                                ><Trash2 size={16} /></button>
                              </div>
                              <textarea 
                                rows={2}
                                placeholder="Short description..."
                                value={card.desc || ''}
                                onChange={(e) => {
                                  const cards = [...currentSection.content_json.cards];
                                  cards[i].desc = e.target.value;
                                  updateContentJson('why', { cards });
                                }}
                                className="w-full bg-transparent text-sm text-[#aebcda] outline-none resize-none"
                              />
                              <div className="flex flex-wrap items-center gap-6">
                                <div className="flex items-center gap-3">
                                  <span className="text-[9px] font-bold text-[#7b8bad] uppercase tracking-widest">Icon</span>
                                  <select 
                                    value={card.icon || 'target'}
                                    onChange={(e) => {
                                      const cards = [...currentSection.content_json.cards];
                                      cards[i].icon = e.target.value;
                                      updateContentJson('why', { cards });
                                    }}
                                    className="bg-white/5 px-3 py-1 rounded-lg text-[11px] text-white font-bold border border-white/10 outline-none"
                                  >
                                    <option value="target" className="bg-[#050f1f]">Target</option>
                                    <option value="bar-chart" className="bg-[#050f1f]">Bar Chart</option>
                                    <option value="layout" className="bg-[#050f1f]">Layout</option>
                                    <option value="search" className="bg-[#050f1f]">Search</option>
                                    <option value="file-text" className="bg-[#050f1f]">File Text</option>
                                    <option value="unlock" className="bg-[#050f1f]">Unlock</option>
                                    <option value="lightning" className="bg-[#050f1f]">Lightning</option>
                                    <option value="robot" className="bg-[#050f1f]">Robot</option>
                                    <option value="globe" className="bg-[#050f1f]">Globe</option>
                                  </select>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="text-[9px] font-bold text-[#7b8bad] uppercase tracking-widest">Color</span>
                                  <input 
                                    type="color"
                                    value={card.color || '#1a73e8'}
                                    onChange={(e) => {
                                      const cards = [...currentSection.content_json.cards];
                                      cards[i].color = e.target.value;
                                      updateContentJson('why', { cards });
                                    }}
                                    className="w-8 h-8 rounded-lg border border-white/10 bg-transparent cursor-pointer"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <button 
                          onClick={() => {
                            const cards = [...(currentSection.content_json?.cards || []), { title: 'New Point', icon: 'target', desc: '', color: '#1a73e8' }];
                            updateContentJson('why', { cards });
                          }}
                          className="w-full py-5 border-2 border-dashed border-white/5 rounded-[24px] text-[#7b8bad] hover:text-white hover:border-[#1a73e8]/30 transition-all text-sm font-bold flex items-center justify-center gap-2 mt-4"
                        >
                          <Plus size={18} /> Add New Why Card
                        </button>
                      </div>
                    </div>
                  )}

                  {(activeTab !== 'hero' && activeTab !== 'services' && activeTab !== 'why' && activeTab !== 'faq' && activeTab !== 'process' && activeTab !== 'results') && (
                    <div className="bg-[#050f1f]/60 p-12 rounded-3xl text-center border border-dashed border-white/5">
                      <p className="text-[#7b8bad] text-sm">Rich data fields for <span className="text-white font-bold">{activeTab}</span> are coming soon. Use Global Title/Subtitle fields for now.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
             <div className="flex items-center justify-center h-full text-[#7b8bad]">Select a section to begin editing.</div>
          )}
        </div>
      </div>
    </div>
  );
}