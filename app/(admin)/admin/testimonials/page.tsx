"use client";

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/db';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { Save, Plus, Trash2, Star, Eye, EyeOff, MoveUp, MoveDown, MessageSquare } from 'lucide-react';

export default function TestimonialsAdminPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    const data = await db.getAllTestimonials();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  const updateItem = (i: number, patch: any) => {
    setItems(prev => prev.map((it, idx) => idx === i ? { ...it, ...patch } : it));
  };

  const saveAll = async () => {
    setSaving(true);
    try {
      for (const it of items) {
        await db.saveTestimonial(it);
      }
      alert('Testimonials saved successfully!');
      await load();
    } catch (e) {
      alert('Failed to save testimonials.');
    } finally {
      setSaving(false);
    }
  };

  const handleAdd = () => {
    setItems(prev => [...prev, {
      client_name: '',
      client_role: '',
      quote: '',
      rating: 5,
      avatar_url: '',
      display_order: prev.length + 1,
      is_published: true,
    }]);
  };

  const handleDelete = async (i: number) => {
    const it = items[i];
    if (it?.id) {
      await db.deleteTestimonial(it.id);
    }
    setItems(prev => prev.filter((_, idx) => idx !== i));
    setConfirmDelete(null);
  };

  const move = (i: number, dir: number) => {
    setItems(prev => {
      const next = [...prev];
      const j = i + dir;
      if (j < 0 || j >= next.length) return prev;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a73e8]"></div>
    </div>
  );

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-display font-bold text-white mb-2 tracking-tight">Testimonials</h1>
          <p className="text-[#aebcda] text-[15px]">Manage client reviews shown in the Testimonials section.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleAdd} className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-[13px] hover:bg-white/10 transition-all">
            <Plus size={16} /> Add Testimonial
          </button>
          <button onClick={saveAll} disabled={saving} className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-[#1a73e8] text-white font-bold text-[15px] hover:shadow-xl hover:shadow-[#1a73e8]/20 transition-all active:scale-[0.98] disabled:opacity-50 shadow-lg">
            <Save size={18} />
            {saving ? 'Saving...' : 'Save All'}
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="bg-[#0a1c34]/30 border border-dashed border-white/10 rounded-[32px] p-16 text-center">
          <MessageSquare size={40} className="text-[#7b8bad] mx-auto mb-4" />
          <p className="text-[#aebcda]">No testimonials yet. Add one to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((t, i) => (
            <div key={t.id || i} className="bg-[#0a1c34]/30 border border-white/5 rounded-[28px] p-6 space-y-4 hover:border-white/10 transition-all">
              <div className="flex items-start gap-3">
                <div className="flex-1 grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#7b8bad] uppercase tracking-widest">Client Name</label>
                    <input value={t.client_name || ''} onChange={e => updateItem(i, { client_name: e.target.value })}
                      className="w-full bg-transparent border-b border-white/5 pb-1 text-white text-sm outline-none focus:border-[#1a73e8]" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#7b8bad] uppercase tracking-widest">Role</label>
                    <input value={t.client_role || ''} onChange={e => updateItem(i, { client_role: e.target.value })}
                      className="w-full bg-transparent border-b border-white/5 pb-1 text-white text-sm outline-none focus:border-[#1a73e8]" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#7b8bad] uppercase tracking-widest">Rating</label>
                    <div className="flex gap-1 pt-1">
                      {[1,2,3,4,5].map(n => (
                        <button key={n} onClick={() => updateItem(i, { rating: n })} className={n <= (t.rating || 0) ? 'text-[#25D366]' : 'text-white/20'}>
                          <Star size={16} fill="currentColor" />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#7b8bad] uppercase tracking-widest">Avatar URL</label>
                    <input value={t.avatar_url || ''} onChange={e => updateItem(i, { avatar_url: e.target.value })}
                      className="w-full bg-transparent border-b border-white/5 pb-1 text-white text-sm outline-none focus:border-[#1a73e8]" placeholder="https://... (optional)" />
                  </div>
                  <div className="space-y-1 col-span-2 max-lg:col-span-2">
                    <label className="text-[10px] font-bold text-[#7b8bad] uppercase tracking-widest">Quote</label>
                    <textarea rows={2} value={t.quote || ''} onChange={e => updateItem(i, { quote: e.target.value })}
                      className="w-full bg-transparent text-[#aebcda] text-sm outline-none resize-none border-b border-white/5 pb-2 focus:border-[#1a73e8]" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#7b8bad] uppercase tracking-widest">Display Order</label>
                    <input type="number" value={t.display_order ?? i + 1} onChange={e => updateItem(i, { display_order: parseInt(e.target.value || '0') })}
                      className="w-full bg-transparent border-b border-white/5 pb-1 text-white text-sm outline-none focus:border-[#1a73e8]" />
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <button onClick={() => updateItem(i, { is_published: !t.is_published })}
                    className={`p-2.5 rounded-xl border transition-all ${t.is_published ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-white/5 text-[#7b8bad] border-white/10'}`}
                    title={t.is_published ? 'Published' : 'Hidden'}>
                    {t.is_published ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                  <button onClick={() => move(i, -1)} className="p-2.5 text-[#7b8bad] hover:text-white rounded-xl hover:bg-white/5" title="Move up"><MoveUp size={16} /></button>
                  <button onClick={() => move(i, 1)} className="p-2.5 text-[#7b8bad] hover:text-white rounded-xl hover:bg-white/5" title="Move down"><MoveDown size={16} /></button>
                  <button onClick={() => setConfirmDelete(i)} className="p-2.5 bg-red-400/10 text-red-400 rounded-xl hover:bg-red-400 hover:text-white transition-all border border-red-400/20" title="Delete"><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={confirmDelete !== null}
        title="Delete testimonial?"
        message="This will permanently remove this testimonial from the site."
        confirmLabel="Delete"
        onConfirm={() => confirmDelete !== null && handleDelete(confirmDelete)}
        onCancel={() => setConfirmDelete(null)}
      />
    </div>
  );
}
