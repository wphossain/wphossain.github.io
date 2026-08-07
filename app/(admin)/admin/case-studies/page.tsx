"use client";

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/db';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Briefcase,
  GripVertical
} from 'lucide-react';
import Link from 'next/link';

export default function CaseStudiesAdminPage() {
  const [studies, setStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
    if (confirm('Delete this case study?')) {
      await db.deleteCaseStudy(id);
      loadStudies();
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-1">Case Studies</h1>
          <p className="text-[#aebcda] text-[14.5px]">Manage HVAC success stories and client results.</p>
        </div>
        <Link 
          href="/admin/case-studies/editor" 
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1a73e8] text-white font-bold text-sm hover:bg-[#1a73e8]/80 transition-all shadow-lg shadow-blue-500/20"
        >
          <Plus size={18} />
          New Case Study
        </Link>
      </div>

      <div className="bg-[#0a1c34] border border-[#0e2340] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#0e2340] bg-[#050f1f]/30">
                <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#7b8bad]">Success Story</th>
                <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#7b8bad]">Niche</th>
                <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#7b8bad]">Created At</th>
                <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#7b8bad] text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a73e8] mx-auto mb-4"></div>
                  </td>
                </tr>
              ) : studies.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center">
                    <p className="text-[#aebcda] font-medium">No case studies added yet.</p>
                  </td>
                </tr>
              ) : (
                studies.map((study) => (
                  <tr key={study.id} className="border-b border-[#0e2340] last:border-0 hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-[#050f1f] border border-[#0e2340] overflow-hidden flex items-center justify-center">
                          {study.featured_image ? (
                            <img src={study.featured_image} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <Briefcase size={20} className="text-[#1a73e8]" />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[15px] text-white font-bold">{study.title}</span>
                          <span className="text-[12px] text-[#7b8bad] truncate max-w-xs">{study.challenge}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-[12px] font-black uppercase text-[var(--gold)]">{study.client_niche}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-[13px] text-[#aebcda]">
                        {new Date(study.created_at).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/admin/case-studies/editor?id=${study.id}`}
                          className="p-2 bg-[#1a73e8]/10 text-[#1a73e8] hover:bg-[#1a73e8] hover:text-white rounded-lg transition-all"
                        >
                          <Edit size={16} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(study.id)}
                          className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
