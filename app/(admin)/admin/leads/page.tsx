"use client";

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/db';
import { 
  Search, 
  Trash2, 
  User, 
  Mail, 
  Globe, 
  Linkedin,
  Calendar,
  CheckCircle2,
  Archive,
  ArrowRight,
  Inbox,
  Flame,
  MessageSquare,
  ExternalLink
} from 'lucide-react';

export default function LeadsAdminPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('Inbox');

  useEffect(() => {
    loadLeads();
  }, []);

  async function loadLeads() {
    setLoading(true);
    const data = await db.getLeads();
    setLeads(data);
    setLoading(false);
  }

  const handleStatusUpdate = async (id: string, status: string, category: string) => {
    await db.updateLeadStatus(id, status, category);
    loadLeads();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Permanently delete this lead? This action cannot be undone.')) {
      await db.deleteLead(id);
      loadLeads();
    }
  };

  const filtered = leads.filter(l => {
    const searchMatch = 
      l.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      l.email.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = filterStatus === 'all' || l.status === filterStatus;
    const categoryMatch = l.category === filterCategory;
    return searchMatch && statusMatch && categoryMatch;
  });

  const categories = [
    { name: 'Inbox', icon: Inbox, count: leads.filter(l => l.category === 'Inbox').length },
    { name: 'Hot Leads', icon: Flame, count: leads.filter(l => l.category === 'Hot Leads').length },
    { name: 'Archived', icon: Archive, count: leads.filter(l => l.category === 'Archived').length },
  ];

  return (
    <div className="space-y-8">
      {/* Header & Category Switcher */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-display font-bold text-white mb-2 tracking-tight">Leads & Audits</h1>
          <p className="text-[#aebcda] text-[15px]">Inbound pipeline from landing page audit forms.</p>
        </div>
        
        <div className="flex bg-[#0a1c34]/50 p-1.5 rounded-[20px] border border-white/5 backdrop-blur-sm self-start">
          {categories.map(cat => (
            <button
              key={cat.name}
              onClick={() => setFilterCategory(cat.name)}
              className={`flex items-center gap-2.5 px-6 py-2.5 rounded-2xl text-[13px] font-bold transition-all duration-300 ${
                filterCategory === cat.name 
                  ? 'bg-[#1a73e8] text-white shadow-lg shadow-[#1a73e8]/20' 
                  : 'text-[#7b8bad] hover:text-white hover:bg-white/5'
              }`}
            >
              <cat.icon size={16} />
              {cat.name}
              {cat.count > 0 && (
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${
                  filterCategory === cat.name ? 'bg-white/20 text-white' : 'bg-white/5 text-[#7b8bad]'
                }`}>
                  {cat.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center animate-in fade-in duration-500">
        <div className="flex-1 w-full relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7b8bad] group-focus-within:text-[#1a73e8] transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search leads by name, email or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0a1c34]/30 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white text-[14px] focus:border-[#1a73e8] outline-none transition-all shadow-inner placeholder:text-white/10"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <span className="text-[11px] font-bold text-[#7b8bad] uppercase tracking-widest hidden md:block">Status</span>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full md:w-44 bg-[#0a1c34]/30 border border-white/5 text-[13px] font-bold text-white px-4 py-4 rounded-2xl focus:outline-none focus:border-[#1a73e8] appearance-none cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="new">NEW</option>
            <option value="contacted">CONTACTED</option>
            <option value="qualified">QUALIFIED</option>
            <option value="closed">CLOSED</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a73e8]"></div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-[#0a1c34]/20 border border-white/5 rounded-[40px] p-24 text-center animate-in zoom-in-95 duration-500">
          <div className="w-24 h-24 bg-[#050f1f] rounded-[32px] flex items-center justify-center mx-auto mb-6 border border-white/5 shadow-2xl">
            <MessageSquare size={44} className="text-[#7b8bad] opacity-20" />
          </div>
          <h3 className="text-white font-display font-bold text-2xl tracking-tight">Zero matching leads found</h3>
          <p className="text-[#7b8bad] text-[15px] mt-2 max-w-sm mx-auto">Try adjusting your search terms or checking a different category.</p>
          <button onClick={() => {setSearchTerm(''); setFilterStatus('all');}} className="mt-8 px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs hover:bg-white/10 transition-all">Clear All Filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {filtered.map((lead) => (
            <div key={lead.id} className="group bg-[#0a1c34]/30 border border-white/5 rounded-[32px] p-8 hover:border-[#1a73e8]/30 transition-all duration-300 backdrop-blur-sm relative overflow-hidden">
              <div className="flex flex-col xl:flex-row justify-between items-start gap-10">
                
                {/* Lead Profile Area */}
                <div className="flex-1 w-full space-y-6">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-[22px] bg-gradient-to-br from-[#1a73e8] to-[#4c9bff] flex items-center justify-center text-white shadow-xl">
                      <User size={28} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-2xl font-display font-bold text-white tracking-tight">{lead.full_name}</h3>
                        <span className={`text-[10px] px-3 py-1 rounded-full uppercase font-black tracking-widest border ${
                          lead.status === 'new' ? 'bg-[#1a73e8]/10 text-[#4c9bff] border-[#1a73e8]/20' :
                          lead.status === 'qualified' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                          'bg-[#f2a93d]/10 text-[#f2a93d] border-[#f2a93d]/20'
                        }`}>
                          {lead.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                        <a href={`mailto:${lead.email}`} className="text-[#aebcda] text-[14px] flex items-center gap-2 hover:text-[#4c9bff] transition-colors">
                          <Mail size={14} className="opacity-50" /> {lead.email}
                        </a>
                        {lead.phone && (
                           <span className="text-[#7b8bad] text-[14px] flex items-center gap-2">
                             <Calendar size={14} className="opacity-50" /> {lead.phone}
                           </span>
                        )}
                        <span className="text-[11px] font-bold text-[#7b8bad] uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded">
                          {lead.form_type?.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                    <div className="bg-[#050f1f]/80 p-4 rounded-2xl border border-white/5 group-hover:border-white/10 transition-colors">
                      <span className="text-[10px] font-bold text-[#7b8bad] uppercase tracking-widest block mb-2">Target Website</span>
                      {lead.website_url ? (
                        <a href={lead.website_url} target="_blank" className="text-white text-[13px] font-bold flex items-center gap-2 hover:text-[#1a73e8] transition-colors truncate">
                          <Globe size={14} className="text-[#4c9bff]" /> {lead.website_url}
                          <ExternalLink size={12} className="opacity-30" />
                        </a>
                      ) : <span className="text-[#7b8bad] text-[13px] italic opacity-50">No URL provided</span>}
                    </div>
                    <div className="bg-[#050f1f]/80 p-4 rounded-2xl border border-white/5 group-hover:border-white/10 transition-colors">
                      <span className="text-[10px] font-bold text-[#7b8bad] uppercase tracking-widest block mb-2">LinkedIn Profile</span>
                      {lead.linkedin_url ? (
                        <a href={lead.linkedin_url} target="_blank" className="text-white text-[13px] font-bold flex items-center gap-2 hover:text-[#1a73e8] transition-colors truncate">
                          <Linkedin size={14} className="text-[#4c9bff]" /> Profile Snapshot
                          <ExternalLink size={12} className="opacity-30" />
                        </a>
                      ) : <span className="text-[#7b8bad] text-[13px] italic opacity-50">Not provided</span>}
                    </div>
                  </div>
                  
                  {lead.message && (
                    <div className="bg-[#1a73e8]/5 p-5 rounded-2xl border border-[#1a73e8]/10 text-[14.5px] text-[#aebcda] leading-relaxed relative">
                      <span className="absolute -top-3 left-6 px-2 bg-[#050f1f] text-[9px] font-bold uppercase tracking-widest text-[#1a73e8]">Submit Message</span>
                      &ldquo;{lead.message}&rdquo;
                    </div>
                  )}
                </div>

                {/* Lead Actions Panel */}
                <div className="flex flex-col gap-3 w-full xl:w-[240px] p-6 rounded-[24px] bg-[#050f1f]/60 border border-white/5">
                  <span className="text-[10px] font-extrabold text-[#7b8bad] uppercase tracking-[0.15em] block mb-2 border-b border-white/5 pb-2">Admin Controls</span>
                  
                  <div className="space-y-2">
                    {lead.status === 'new' && (
                      <button 
                        onClick={() => handleStatusUpdate(lead.id, 'contacted', lead.category)} 
                        className="w-full py-3 bg-[#f2a93d]/10 text-[#f2a93d] text-[12px] font-bold rounded-xl border border-[#f2a93d]/20 hover:bg-[#f2a93d] hover:text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#f2a93d]/5"
                      >
                        Mark Contacted <ArrowRight size={14} />
                      </button>
                    )}
                    {lead.status === 'contacted' && (
                      <button 
                        onClick={() => handleStatusUpdate(lead.id, 'qualified', 'Hot Leads')} 
                        className="w-full py-3 bg-emerald-500/10 text-emerald-400 text-[12px] font-bold rounded-xl border border-emerald-500/20 hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/5"
                      >
                        Qualify Lead <CheckCircle2 size={14} />
                      </button>
                    )}
                    
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {lead.category !== 'Archived' ? (
                        <button 
                          onClick={() => handleStatusUpdate(lead.id, 'closed', 'Archived')} 
                          className="py-2.5 bg-white/5 text-[#7b8bad] text-[11px] font-bold rounded-lg border border-white/5 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-2"
                        >
                          <Archive size={14} /> Archive
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleStatusUpdate(lead.id, 'new', 'Inbox')} 
                          className="py-2.5 bg-[#1a73e8]/10 text-[#4c9bff] text-[11px] font-bold rounded-lg border border-[#1a73e8]/20 hover:bg-[#1a73e8] hover:text-white transition-all flex items-center justify-center gap-2"
                        >
                          Restore
                        </button>
                      )}
                      <button 
                        onClick={() => handleDelete(lead.id)} 
                        className="py-2.5 bg-red-500/5 text-red-400/70 text-[11px] font-bold rounded-lg border border-red-500/10 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/5 flex flex-col items-center gap-1">
                    <span className="text-[9px] font-bold text-[#7b8bad] uppercase opacity-50 tracking-widest">Received</span>
                    <span className="text-[11px] text-white font-medium">{new Date(lead.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}