"use client";

import React, { useState, useEffect } from 'react';
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
  MoveDown
} from 'lucide-react';

export default function PageContentEditorPage() {
  const [sections, setSections] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('hero');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSections();
  }, []);

  async function loadSections() {
    setLoading(true);
    const data = await db.getAllSections();
    setSections(data);
    setLoading(false);
  }

  const findSection = (key: string) => sections.find(s => s.section_key === key);

  const updateSection = (key: string, data: any) => {
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
    { key: 'services', label: 'Services', icon: Settings2 },
    { key: 'why', label: 'Why Me', icon: CheckCircle2 },
    { key: 'process', label: 'Process', icon: Activity },
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
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-[#7b8bad] uppercase tracking-widest ml-1">Availability Status</label>
                        <input 
                          type="text" 
                          value={currentSection.content_json.availability_badge || ''}
                          onChange={(e) => updateContentJson('hero', { availability_badge: e.target.value })}
                          className="w-full bg-[#050f1f]/80 border border-white/5 rounded-xl px-5 py-3 text-white text-sm"
                        />
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
                            <div className="flex items-center gap-3">
                              <span className="text-[9px] font-bold text-[#7b8bad] uppercase tracking-widest">Label</span>
                              <input 
                                type="text" 
                                value={s.tag}
                                onChange={(e) => {
                                  const list = [...currentSection.content_json.services_list];
                                  list[i].tag = e.target.value;
                                  updateContentJson('services', { services_list: list });
                                }}
                                className="bg-white/5 px-3 py-1 rounded-lg text-[10px] text-[#f2a93d] font-bold uppercase border border-[#f2a93d]/20"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      <button 
                        onClick={() => {
                          const list = [...(currentSection.content_json.services_list || []), { title: 'New PPC Service', desc: '', tag: 'Strategy', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' }];
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
                      {(currentSection.content_json.steps || []).map((p: any, i: number) => (
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

                  {(activeTab !== 'hero' && activeTab !== 'services' && activeTab !== 'faq' && activeTab !== 'process') && (
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