"use client";

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/db';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Briefcase,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Image as ImageIcon
} from 'lucide-react';
import Link from 'next/link';

export default function CaseStudiesAdminPage() {
  const [studies, setStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadStudies();
  }, []);

  async function loadStudies() {
    setLoading(true);
    const data = await db.getCaseStudies();
    setStudies(data);
    setLoading(false);
  }

  const handleDelete = async (id: string) => {
    if (confirm('Permanently delete this case study? ROI data will be lost.')) {
      await db.deleteCaseStudy(id);
      loadStudies();
    }
  };

  const filtered = studies.filter(s => 
    s.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.client_niche?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-20">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-display font-bold text-white mb-2 tracking-tight">Case Studies</h1>
          <p className="text-[#aebcda] text-[15px]">Manage client success stories and ROI performance metrics.</p>
        </div>
        <Link 
          href="/admin/case-studies/editor" 
          className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#1a73e8] text-white font-bold text-[15px] hover:shadow-xl hover:shadow-[#1a73e8]/20 transition-all active:scale-[0.98] shadow-lg"
        >
          <Plus size={18} />
          Add Case Study
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="w-full relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7b8bad] group-focus-within:text-[#1a73e8] transition-colors" size={20} />
        <input 
          type="text" 
          placeholder="Filter by niche, client name or campaign type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#0a1c34]/30 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white text-[14px] focus:border-[#1a73e8] outline-none transition-all shadow-inner placeholder:text-white/10"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a73e8]"></div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-[#0a1c34]/20 border border-white/5 rounded-[40px] p-24 text-center">
          <Briefcase size={48} className="text-[#7b8bad] opacity-20 mx-auto mb-6" />
          <h3 className="text-white font-display font-bold text-2xl">No cases documented</h3>
          <p className="text-[#7b8bad] text-[15px] mt-2">Document your first client success to build trust with prospects.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">
          {filtered.map((study) => (
            <div key={study.id} className="group bg-[#0a1c34]/30 border border-white/5 rounded-[32px] overflow-hidden flex flex-col hover:border-[#1a73e8]/30 transition-all duration-300 backdrop-blur-sm shadow-xl relative">
              
              <div className="p-8 flex-1 space-y-6">
                <div className="flex justify-between items-start">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#f2a93d]/10 text-[#f2a93d] border border-[#f2a93d]/20 text-[10px] font-black uppercase tracking-widest">
                    {study.client_niche}
                  </span>
                  <button onClick={() => handleDelete(study.id)} className="p-2 text-[#7b8bad] hover:text-red-400 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>

                <div>
                   <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-[#4c9bff] transition-colors">{study.title || 'Untitled Case Study'}</h3>
                   <p className="text-[14.5px] text-[#aebcda] line-clamp-2 leading-relaxed italic opacity-80">&ldquo;{study.result_summary}&rdquo;</p>
                </div>

                <div className="grid grid-cols-1 gap-4 pt-2">
                   <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1a73e8] mt-2 shrink-0" />
                      <p className="text-[13px] text-[#7b8bad] line-clamp-2"><span className="text-white font-bold">Challenge:</span> {study.challenge}</p>
                   </div>
                   <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                      <p className="text-[13px] text-[#7b8bad] line-clamp-2"><span className="text-white font-bold">Strategy:</span> {study.strategy}</p>
                   </div>
                </div>
              </div>

              <div className="px-8 py-5 bg-white/5 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] text-[#7b8bad] font-bold uppercase tracking-widest">Client Success documented</span>
                <div className="flex gap-2">
                  <Link 
                    href={`/admin/case-studies/editor?id=${study.id}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1a73e8] text-white font-bold text-xs hover:bg-[#1a73e8]/80 transition-all shadow-lg shadow-[#1a73e8]/10"
                  >
                    <Edit size={14} /> Edit Case
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}