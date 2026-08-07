"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { db } from '@/lib/db';
import { ArrowLeft, Save, Briefcase, Zap, Target, Trophy } from 'lucide-react';
import Link from 'next/link';

function CaseStudyEditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');

  const [loading, setLoading] = useState(editId ? true : false);
  const [saving, setSaving] = useState(false);
  
  const [study, setStudy] = useState({
    id: '',
    title: '',
    slug: '',
    client_niche: 'HVAC',
    challenge: '',
    strategy: '',
    result_summary: '',
    featured_image: '',
    display_order: 0
  });

  useEffect(() => {
    if (editId) {
      async function loadStudy() {
        const studies = await db.getCaseStudies();
        const found = studies.find((s: any) => s.id === editId);
        if (found) setStudy(found);
        setLoading(false);
      }
      loadStudy();
    }
  }, [editId]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const slug = study.slug || study.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    await db.saveCaseStudy({ ...study, slug });
    setSaving(false);
    router.push('/admin/case-studies');
    router.refresh();
  };

  if (loading) return <div className="flex items-center justify-center min-h-[400px]"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a73e8]"></div></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/case-studies" className="p-2 hover:bg-white/5 rounded-lg text-[#7b8bad] transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-display font-bold text-white">
            {editId ? 'Edit Case Study' : 'New Case Study'}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-[#0a1c34] border border-[#0e2340] rounded-2xl p-8 space-y-6">
          <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
            <div className="col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7b8bad] mb-2">Title</label>
              <input 
                type="text" 
                value={study.title}
                onChange={e => setStudy({...study, title: e.target.value})}
                required
                className="w-full bg-[#050f1f] border border-[#0e2340] rounded-lg px-4 py-3 text-white focus:border-[#1a73e8] outline-none"
                placeholder="e.g. AC Repair Cost Reduction"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7b8bad] mb-2">Client Niche</label>
              <input 
                type="text" 
                value={study.client_niche}
                onChange={e => setStudy({...study, client_niche: e.target.value})}
                className="w-full bg-[#050f1f] border border-[#0e2340] rounded-lg px-4 py-3 text-white focus:border-[#1a73e8] outline-none"
                placeholder="e.g. HVAC, Plumbing"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7b8bad] mb-2">Display Order</label>
              <input 
                type="number" 
                value={study.display_order}
                onChange={e => setStudy({...study, display_order: parseInt(e.target.value)})}
                className="w-full bg-[#050f1f] border border-[#0e2340] rounded-lg px-4 py-3 text-white focus:border-[#1a73e8] outline-none"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7b8bad] mb-2 flex items-center gap-2">
                <Target size={14} className="text-red-400" /> Challenge
              </label>
              <textarea 
                value={study.challenge}
                onChange={e => setStudy({...study, challenge: e.target.value})}
                rows={3}
                className="w-full bg-[#050f1f] border border-[#0e2340] rounded-lg p-4 text-white focus:border-[#1a73e8] outline-none resize-none"
                placeholder="What was the problem?"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7b8bad] mb-2 flex items-center gap-2">
                <Zap size={14} className="text-yellow-400" /> Strategy
              </label>
              <textarea 
                value={study.strategy}
                onChange={e => setStudy({...study, strategy: e.target.value})}
                rows={3}
                className="w-full bg-[#050f1f] border border-[#0e2340] rounded-lg p-4 text-white focus:border-[#1a73e8] outline-none resize-none"
                placeholder="What did you do?"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7b8bad] mb-2 flex items-center gap-2">
                <Trophy size={14} className="text-green-400" /> Result Summary
              </label>
              <textarea 
                value={study.result_summary}
                onChange={e => setStudy({...study, result_summary: e.target.value})}
                rows={3}
                className="w-full bg-[#050f1f] border border-[#0e2340] rounded-lg p-4 text-white focus:border-[#1a73e8] outline-none resize-none"
                placeholder="What were the outcomes?"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7b8bad] mb-2">Featured Image URL</label>
              <input 
                type="text" 
                value={study.featured_image}
                onChange={e => setStudy({...study, featured_image: e.target.value})}
                className="w-full bg-[#050f1f] border border-[#0e2340] rounded-lg px-4 py-3 text-white focus:border-[#1a73e8] outline-none"
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#1a73e8] text-white font-bold hover:bg-[#1a73e8]/80 transition-all disabled:opacity-50 shadow-lg shadow-blue-500/20"
            >
              <Save size={20} />
              {saving ? 'Saving...' : 'Save Case Study'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function CaseStudyEditorPage() {
  return (
    <Suspense fallback={<div>Loading Editor...</div>}>
      <CaseStudyEditorContent />
    </Suspense>
  );
}
