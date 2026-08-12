"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Trash2, Copy, Upload, Image as ImageIcon, Check } from 'lucide-react';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';

interface MediaItem {
  id: string;
  url: string;
  file_name: string;
  mime_type?: string;
  size_bytes?: number;
  created_at?: string;
  storage_path?: string;
}

export default function MediaAdminPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<MediaItem | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch('/api/media/list');
      const json = await res.json();
      setItems(json?.data || []);
    } catch {}
    setLoading(false);
  }

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/media/upload', { method: 'POST', body: form });
      const json = await res.json();
      if (!res.ok) {
        alert(json?.error || 'Upload failed');
      } else {
        await load();
      }
    } catch {
      alert('Upload failed');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const copyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    });
  };

  const handleDelete = async (item: MediaItem) => {
    try {
      await fetch('/api/media/list', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.id, storage_path: item.storage_path }),
      });
      await load();
    } catch {}
    setConfirmDelete(null);
  };

  const formatBytes = (b?: number) => {
    if (!b) return '';
    if (b < 1024) return b + ' B';
    if (b < 1048576) return (b / 1024).toFixed(1) + ' KB';
    return (b / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-display font-bold text-white mb-2 tracking-tight">Media Library</h1>
          <p className="text-[#aebcda] text-[15px]">Upload and manage images, then copy their URLs into blog posts, case studies, and testimonials.</p>
        </div>
        <div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => { if (e.target.files?.[0]) handleUpload(e.target.files[0]); }}
          />
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#1a73e8] text-white font-bold text-[15px] hover:shadow-xl hover:shadow-[#1a73e8]/20 transition-all active:scale-[0.98] disabled:opacity-50 shadow-lg"
          >
            <Upload size={18} />
            {uploading ? 'Uploading...' : 'Upload Image'}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a73e8]"></div>
        </div>
      ) : items.length === 0 ? (
        <div className="bg-[#0a1c34]/30 border border-dashed border-white/10 rounded-[32px] p-16 text-center">
          <ImageIcon size={40} className="text-[#7b8bad] mx-auto mb-4" />
          <p className="text-[#aebcda]">No images yet. Upload one to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 max-xl:grid-cols-2 max-sm:grid-cols-1 gap-6">
          {items.map((item) => (
            <div key={item.id} className="group bg-[#0a1c34]/30 border border-white/5 rounded-[28px] overflow-hidden hover:border-white/10 transition-all">
              <div className="aspect-video bg-[#050f1f]/60 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.url} alt={item.file_name || 'media'} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-5 space-y-3">
                <p className="text-[13px] text-white font-semibold truncate">{item.file_name || 'Untitled'}</p>
                <p className="text-[11px] text-[#7b8bad]">{formatBytes(item.size_bytes)}</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyUrl(item.id, item.url)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-[12px] font-bold text-[#aebcda] hover:text-white hover:bg-white/10 transition-all"
                  >
                    {copiedId === item.id ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    {copiedId === item.id ? 'Copied!' : 'Copy URL'}
                  </button>
                  <button
                    onClick={() => setConfirmDelete(item)}
                    className="p-2.5 bg-red-400/10 text-red-400 rounded-xl hover:bg-red-400 hover:text-white transition-all border border-red-400/20"
                    title="Delete"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={confirmDelete !== null}
        title="Delete image?"
        message="This will permanently remove the image from your media library."
        confirmLabel="Delete"
        onConfirm={() => confirmDelete && handleDelete(confirmDelete)}
        onCancel={() => setConfirmDelete(null)}
      />
    </div>
  );
}
