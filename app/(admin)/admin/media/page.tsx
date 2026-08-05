"use client";

import React from 'react';
import { Upload, Image, FileText } from 'lucide-react';

export default function MediaAdminPage() {
  const mediaItems = [
    { id: 1, name: 'headshot.jpg', type: 'image', size: '45 KB', url: 'https://wphossain.com/headshot.jpg' },
    { id: 2, name: 'hvac-dashboard.png', type: 'image', size: '120 KB', url: '#' },
    { id: 3, name: 'google-ads-cert.pdf', type: 'document', size: '230 KB', url: '#' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-1">Media Library</h1>
          <p className="text-[#aebcda] text-[14.5px]">Upload and manage images, documents, and OG assets via Supabase Storage.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm bg-gradient-to-r from-[#1a73e8] to-[#4c9bff] text-white hover:shadow-lg transition-all">
          <Upload size={16} />
          Upload File
        </button>
      </div>

      {/* Upload Drop Zone */}
      <div className="mb-8 p-10 border-2 border-dashed border-[#0e2340] rounded-2xl text-center hover:border-[#1a73e8]/50 transition-colors cursor-pointer bg-[#0a1c34]/50">
        <Upload size={36} className="mx-auto mb-3 text-[#7b8bad]" />
        <p className="text-white font-semibold">Drop files here or click to browse</p>
        <p className="text-[#7b8bad] text-sm mt-1">Supports JPG, PNG, WebP, SVG, PDF — Max 10 MB</p>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-4 max-xl:grid-cols-2 max-md:grid-cols-1 gap-4">
        {mediaItems.map((item) => (
          <div key={item.id} className="bg-[#0a1c34] border border-[#0e2340] rounded-xl p-4 hover:border-[#1a73e8]/30 transition-all">
            <div className="h-32 rounded-lg bg-[#050f1f] flex items-center justify-center mb-3">
              {item.type === 'image' ? (
                <Image size={32} className="text-[#4c9bff]" />
              ) : (
                <FileText size={32} className="text-[#f2a93d]" />
              )}
            </div>
            <p className="text-sm text-white font-semibold truncate">{item.name}</p>
            <p className="text-xs text-[#7b8bad]">{item.size}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 p-4 bg-[#0a1c34] border border-[#0e2340] rounded-xl text-center text-sm text-[#7b8bad]">
        Files stored in Supabase Storage bucket `public-assets`. Configure RLS policies for security.
      </div>
    </div>
  );
}
