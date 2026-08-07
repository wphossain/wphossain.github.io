"use client";

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/db';
import { 
  Search, 
  Filter, 
  Trash2, 
  User, 
  Mail, 
  Globe, 
  Linkedin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Archive,
  ArrowRight
} from 'lucide-react';

export default function LeadsAdminPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
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
    if (confirm('Permanently delete this lead?')) {
      await db.deleteLead(id);
      loadLeads();
    }
  };

  const filtered = leads.filter(l => {
    const statusMatch = filterStatus === 'all' || l.status === filterStatus;
    const categoryMatch = l.category === filterCategory;
    return statusMatch && categoryMatch;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-1">Leads & Audits</h1>
          <p className="text-[#aebcda] text-[14.5px]">Manage incoming audit requests and form submissions.</p>
        </div>
        <div className="flex bg-[#0a1c34] p-1 rounded-xl border border-[#0e2340]">
          {['Inbox', 'Hot Leads', 'Archived'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterCategory === cat ? 'bg-[#1a73e8] text-white' : 'text-[#7b8bad] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4 items-center mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7b8bad]" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or email..."
            className="w-full bg-[#0a1c34] border border-[#0e2340] rounded-xl pl-12 pr-4 py-3 text-white text-sm focus:border-[#1a73e8] outline-none"
          />
        </div>
        <select 
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-[#0a1c34] border border-[#0e2340] text-sm text-[#aebcda] px-4 py-3 rounded-xl focus:outline-none focus:border-[#1a73e8]"
        >
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a73e8]"></div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-[#0a1c34] border border-[#0e2340] rounded-2xl p-20 text-center">
          <div className="w-16 h-16 bg-[#050f1f] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#0e2340]">
            <Archive size={32} className="text-[#7b8bad]" />
          </div>
          <h3 className="text-white font-bold text-lg">No leads in {filterCategory}</h3>
          <p className="text-[#aebcda] text-sm mt-1">When users fill out forms, they will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((lead) => (
            <div key={lead.id} className="bg-[#0a1c34] border border-[#0e2340] rounded-2xl p-6 group hover:border-[#1a73e8]/30 transition-all shadow-lg">
              <div className="flex justify-between items-start gap-6 max-md:flex-col">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#1a73e8]/10 flex items-center justify-center text-[#1a73e8] border border-[#1a73e8]/20">
                      <User size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-3">
                        {lead.full_name}
                        <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-black tracking-widest border ${
                          lead.status === 'new' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                          lead.status === 'qualified' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                          'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                        }`}>
                          {lead.status}
                        </span>
                      </h3>
                      <div className="flex items-center gap-4 mt-1">
                        <a href={`mailto:${lead.email}`} className="text-[#aebcda] text-xs flex items-center gap-1 hover:text-white transition-colors">
                          <Mail size={12} /> {lead.email}
                        </a>
                        {lead.phone && <span className="text-[#7b8bad] text-xs flex items-center gap-1"><Clock size={12} /> {lead.phone}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1 pt-2">
                    <div className="bg-[#050f1f]/50 p-3 rounded-xl border border-[#0e2340]">
                      <span className="text-[10px] font-bold text-[#7b8bad] uppercase block mb-1">Website</span>
                      {lead.website_url ? (
                        <a href={lead.website_url} target="_blank" className="text-white text-xs font-bold flex items-center gap-2 hover:text-[#1a73e8]">
                          <Globe size={14} /> {lead.website_url}
                        </a>
                      ) : <span className="text-[#7b8bad] text-xs italic">Not provided</span>}
                    </div>
                    <div className="bg-[#050f1f]/50 p-3 rounded-xl border border-[#0e2340]">
                      <span className="text-[10px] font-bold text-[#7b8bad] uppercase block mb-1">LinkedIn</span>
                      {lead.linkedin_url ? (
                        <a href={lead.linkedin_url} target="_blank" className="text-white text-xs font-bold flex items-center gap-2 hover:text-[#1a73e8]">
                          <Linkedin size={14} /> Profile Link
                        </a>
                      ) : <span className="text-[#7b8bad] text-xs italic">Not provided</span>}
                    </div>
                  </div>
                  
                  {lead.message && (
                    <div className="bg-[#050f1f]/50 p-4 rounded-xl border border-[#0e2340] text-sm text-[#aebcda] italic">
                      &ldquo;{lead.message}&rdquo;
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 w-[200px] max-md:w-full">
                  <span className="text-[10px] font-bold text-[#7b8bad] uppercase tracking-wider mb-1">Update Pipeline</span>
                  <div className="flex flex-col gap-2">
                    {lead.status === 'new' && (
                      <button onClick={() => handleStatusUpdate(lead.id, 'contacted', lead.category)} className="w-full py-2 bg-yellow-500/10 text-yellow-400 text-xs font-bold rounded-lg border border-yellow-500/20 hover:bg-yellow-500 hover:text-white transition-all flex items-center justify-center gap-2">
                        Mark Contacted <ArrowRight size={14} />
                      </button>
                    )}
                    {lead.status === 'contacted' && (
                      <button onClick={() => handleStatusUpdate(lead.id, 'qualified', 'Hot Leads')} className="w-full py-2 bg-green-500/10 text-green-400 text-xs font-bold rounded-lg border border-green-500/20 hover:bg-green-500 hover:text-white transition-all flex items-center justify-center gap-2">
                        Qualify & Hot List <CheckCircle2 size={14} />
                      </button>
                    )}
                    {lead.category !== 'Archived' ? (
                      <button onClick={() => handleStatusUpdate(lead.id, 'closed', 'Archived')} className="w-full py-2 bg-white/5 text-[#7b8bad] text-xs font-bold rounded-lg border border-[#0e2340] hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-2">
                        Archive Lead <Archive size={14} />
                      </button>
                    ) : (
                      <button onClick={() => handleStatusUpdate(lead.id, 'new', 'Inbox')} className="w-full py-2 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-lg border border-blue-500/20 hover:bg-blue-500 hover:text-white transition-all flex items-center justify-center gap-2">
                        Move to Inbox
                      </button>
                    )}
                    <button onClick={() => handleDelete(lead.id)} className="w-full py-2 bg-red-500/10 text-red-400 text-xs font-bold rounded-lg border border-red-500/20 hover:bg-red-500 hover:text-white transition-all">
                      Delete Permanently
                    </button>
                  </div>
                  <div className="mt-2 text-[10px] text-[#7b8bad] text-center font-medium">
                    Received: {new Date(lead.created_at).toLocaleString()}
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
