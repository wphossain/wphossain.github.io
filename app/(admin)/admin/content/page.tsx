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
  Activity
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
    for (const sec of sections) {
      await db.saveSection(sec.section_key, sec.title, sec.subtitle, sec.content_json, sec.is_visible);
    }
    setSaving(false);
    alert('All changes saved successfully! Site content is now updated.');
  };

  if (loading) return <div className="flex items-center justify-center min-h-[400px]"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a73e8]"></div></div>;

  const currentSection = findSection(activeTab);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-1">Page Editor</h1>
          <p className="text-[#aebcda] text-[14.5px]">Directly modify landing page headlines, lists, and section visibility.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-8 py-3 rounded-xl bg-[#1a73e8] text-white font-bold text-sm hover:shadow-lg hover:shadow-blue-500/20 transition-all disabled:opacity-50"
        >
          <Save size={18} />
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      <div className="grid grid-cols-[240px_1fr] gap-8 max-lg:grid-cols-1">
        {/* Navigation Tabs */}
        <div className="space-y-1">
          {[
            { key: 'hero', label: 'Hero Section', icon: Layout },
            { key: 'services', label: 'Services', icon: Settings2 },
            { key: 'why', label: 'Why Me', icon: CheckCircle2 },
            { key: 'process', label: 'Process', icon: Activity },
            { key: 'faq', label: 'FAQ', icon: HelpCircle },
            { key: 'certifications', label: 'Certifications', icon: Trophy }
          ].map((tab: any) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.key 
                  ? 'bg-[#1a73e8] text-white shadow-lg shadow-blue-500/10' 
                  : 'text-[#7b8bad] hover:bg-white/5 hover:text-white'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Editor Content Area */}
        <div className="bg-[#0a1c34] border border-[#0e2340] rounded-2xl p-8 space-y-8 min-h-[600px]">
          {currentSection && (
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Header Fields */}
              <div className="space-y-6 border-b border-[#0e2340] pb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white capitalize">{activeTab} Details</h3>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span className="text-xs font-bold text-[#7b8bad] uppercase tracking-wider">Visible</span>
                    <input 
                      type="checkbox" 
                      checked={currentSection.is_visible} 
                      onChange={(e) => updateSection(activeTab, { is_visible: e.target.checked })}
                      className="w-5 h-5 accent-[#1a73e8]"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#aebcda] mb-2">Main Title</label>
                    <input 
                      type="text" 
                      value={currentSection.title}
                      onChange={(e) => updateSection(activeTab, { title: e.target.value })}
                      className="w-full bg-[#050f1f] border border-[#0e2340] rounded-lg px-4 py-3 text-white focus:border-[#1a73e8] outline-none transition-all"
                    />
                  </div>
                  {(activeTab === 'hero' || activeTab === 'services') && (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#aebcda] mb-2">Subtitle / Lead Text</label>
                      <textarea 
                        rows={3}
                        value={currentSection.subtitle || ''}
                        onChange={(e) => updateSection(activeTab, { subtitle: e.target.value })}
                        className="w-full bg-[#050f1f] border border-[#0e2340] rounded-lg p-4 text-white focus:border-[#1a73e8] outline-none transition-all resize-none"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Dynamic JSON Fields */}
              <div className="space-y-6">
                {activeTab === 'hero' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#aebcda] mb-2">Availability Badge</label>
                      <input 
                        type="text" 
                        value={currentSection.content_json.availability_badge || ''}
                        onChange={(e) => updateContentJson('hero', { availability_badge: e.target.value })}
                        className="w-full bg-[#050f1f] border border-[#0e2340] rounded-lg px-4 py-3 text-white focus:border-[#1a73e8] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#aebcda] mb-4">Hero Pillars (Certificates)</label>
                      <div className="space-y-3">
                        {(currentSection.content_json.certificates || []).map((c: any, i: number) => (
                          <div key={i} className="flex gap-2">
                            <input 
                              type="text" 
                              value={c.name}
                              onChange={(e) => {
                                const certs = [...currentSection.content_json.certificates];
                                certs[i].name = e.target.value;
                                updateContentJson('hero', { certificates: certs });
                              }}
                              className="flex-1 bg-[#050f1f] border border-[#0e2340] rounded-lg px-4 py-2.5 text-white text-sm"
                            />
                            <button 
                              onClick={() => {
                                const certs = currentSection.content_json.certificates.filter((_: any, idx: number) => idx !== i);
                                updateContentJson('hero', { certificates: certs });
                              }}
                              className="p-2.5 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                            ><Trash2 size={16} /></button>
                          </div>
                        ))}
                        <button 
                          onClick={() => {
                            const certs = [...(currentSection.content_json.certificates || []), { name: 'New Badge', type: 'custom' }];
                            updateContentJson('hero', { certificates: certs });
                          }}
                          className="flex items-center gap-2 text-sm font-bold text-[#1a73e8] hover:text-[#4c9bff] transition-colors"
                        >
                          <Plus size={16} /> Add Badge
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'services' && (
                  <div className="space-y-6">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#aebcda] mb-4">Services List</label>
                    <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                      {(currentSection.content_json.services_list || []).map((s: any, i: number) => (
                        <div key={i} className="bg-[#050f1f] border border-[#0e2340] rounded-xl p-4 space-y-3">
                          <input 
                            type="text" 
                            placeholder="Service Title"
                            value={s.title}
                            onChange={(e) => {
                              const list = [...currentSection.content_json.services_list];
                              list[i].title = e.target.value;
                              updateContentJson('services', { services_list: list });
                            }}
                            className="w-full bg-transparent border-b border-[#0e2340] pb-2 font-bold text-white text-sm focus:border-[#1a73e8] outline-none"
                          />
                          <textarea 
                            rows={2}
                            placeholder="Description"
                            value={s.desc}
                            onChange={(e) => {
                              const list = [...currentSection.content_json.services_list];
                              list[i].desc = e.target.value;
                              updateContentJson('services', { services_list: list });
                            }}
                            className="w-full bg-transparent text-xs text-[#aebcda] focus:outline-none resize-none"
                          />
                          <div className="flex justify-between items-center">
                            <input 
                              type="text" 
                              placeholder="Tag"
                              value={s.tag}
                              onChange={(e) => {
                                const list = [...currentSection.content_json.services_list];
                                list[i].tag = e.target.value;
                                updateContentJson('services', { services_list: list });
                              }}
                              className="bg-white/5 px-2 py-1 rounded text-[10px] text-white"
                            />
                            <button onClick={() => {
                              const list = currentSection.content_json.services_list.filter((_: any, idx: number) => idx !== i);
                              updateContentJson('services', { services_list: list });
                            }} className="text-red-400 hover:text-red-300"><Trash2 size={14} /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button 
                      onClick={() => {
                        const list = [...(currentSection.content_json.services_list || []), { title: 'New Service', desc: '', tag: 'New', icon: 'M12 4v16m8-8H4' }];
                        updateContentJson('services', { services_list: list });
                      }}
                      className="w-full py-4 border-2 border-dashed border-[#0e2340] rounded-xl text-[#7b8bad] hover:text-white hover:border-[#1a73e8]/30 transition-all text-sm font-bold flex items-center justify-center gap-2"
                    >
                      <Plus size={18} /> Add New Service
                    </button>
                  </div>
                )}

                {activeTab === 'faq' && (
                  <div className="space-y-4">
                    {(currentSection.content_json.faqs || []).map((faq: any, i: number) => (
                      <div key={i} className="bg-[#050f1f] border border-[#0e2340] rounded-xl p-6 space-y-4">
                        <div className="flex gap-4">
                          <div className="flex-1 space-y-4">
                            <input 
                              type="text" 
                              placeholder="Question"
                              value={faq.question}
                              onChange={(e) => {
                                const list = [...currentSection.content_json.faqs];
                                list[i].question = e.target.value;
                                updateContentJson('faq', { faqs: list });
                              }}
                              className="w-full bg-transparent border-b border-[#0e2340] pb-2 font-bold text-white text-sm focus:border-[#1a73e8] outline-none"
                            />
                            <textarea 
                              rows={2}
                              placeholder="Answer"
                              value={faq.answer}
                              onChange={(e) => {
                                const list = [...currentSection.content_json.faqs];
                                list[i].answer = e.target.value;
                                updateContentJson('faq', { faqs: list });
                              }}
                              className="w-full bg-transparent text-sm text-[#aebcda] focus:outline-none resize-none"
                            />
                          </div>
                          <button onClick={() => {
                            const list = currentSection.content_json.faqs.filter((_: any, idx: number) => idx !== i);
                            updateContentJson('faq', { faqs: list });
                          }} className="p-2 self-start bg-red-500/10 text-red-400 rounded-lg"><Trash2 size={16} /></button>
                        </div>
                      </div>
                    ))}
                    <button 
                      onClick={() => {
                        const list = [...(currentSection.content_json.faqs || []), { question: 'New Question?', answer: '' }];
                        updateContentJson('faq', { faqs: list });
                      }}
                      className="w-full py-4 border-2 border-dashed border-[#0e2340] rounded-xl text-[#7b8bad] hover:text-white hover:border-[#1a73e8]/30 transition-all text-sm font-bold flex items-center justify-center gap-2"
                    >
                      <Plus size={18} /> Add New FAQ
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Trophy({ size }: { size: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>;
}
