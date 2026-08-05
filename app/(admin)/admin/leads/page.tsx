"use client";

import React, { useState } from 'react';

export default function LeadsAdminPage() {
  const [filter, setFilter] = useState<'all' | 'new' | 'contacted' | 'qualified'>('all');
  
  const leads = [
    { id: 1, name: 'John Smith', email: 'john@hvacpro.com', form_type: 'audit_request', status: 'new', date: '2026-08-04' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@acrepair.co', form_type: 'contact', status: 'contacted', date: '2026-08-03' },
    { id: 3, name: 'Mike Torres', email: 'mike@coolingplus.net', form_type: 'booking_click', status: 'qualified', date: '2026-08-02' },
  ];

  const filtered = filter === 'all' ? leads : leads.filter(l => l.status === filter);
  const statusCounts = {
    all: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    qualified: leads.filter(l => l.status === 'qualified').length,
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white mb-1">Leads &amp; Audit Requests</h1>
        <p className="text-[#aebcda] text-[14.5px]">Monitor contact form submissions and audit bookings from your landing page.</p>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {(['all', 'new', 'contacted', 'qualified'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-lg text-sm font-bold capitalize transition-all ${
              filter === s
                ? 'bg-[#1a73e8] text-white'
                : 'bg-[#0a1c34] text-[#aebcda] hover:bg-[#0e2340]'
            }`}
          >
            {s} ({statusCount[s]})
          </button>
        ))}
      </div>

      {/* Leads Table */}
      <div className="bg-[#0a1c34] border border-[#0e2340] rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#0e2340]">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#7b8bad]">Name</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#7b8bad]">Email</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#7b8bad]">Type</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#7b8bad]">Status</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#7b8bad]">Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((lead) => (
              <tr key={lead.id} className="border-b border-[#0e2340] last:border-0 hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-sm text-white font-semibold">{lead.name}</td>
                <td className="px-6 py-4 text-sm text-[#aebcda]">{lead.email}</td>
                <td className="px-6 py-4 text-sm text-[#aebcda]">{lead.form_type}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    lead.status === 'new' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30' :
                    lead.status === 'contacted' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30' :
                    'bg-green-500/10 text-green-400 border border-green-500/30'
                  }`}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-[#aebcda]">{lead.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-4 bg-[#0a1c34] border border-[#0e2340] rounded-xl text-center text-sm text-[#7b8bad]">
        Data syncs from the `lead_submissions` Supabase table when configured.
      </div>
    </div>
  );
}
