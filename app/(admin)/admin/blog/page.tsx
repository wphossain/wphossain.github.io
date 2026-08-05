"use client";

import React, { useState } from 'react';

export default function BlogAdminPage() {
  const [posts] = useState([
    { id: 1, title: 'How to Lower HVAC Google Ads Cost Per Lead in 2026', status: 'published', date: '2026-08-01', slug: 'lower-hvac-cost-per-lead' },
    { id: 2, title: 'Setting Up Google Tag Manager for Call & Form Tracking', status: 'draft', date: '2026-07-28', slug: 'gtm-call-form-tracking' },
  ]);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-1">Blog Manager</h1>
          <p className="text-[#aebcda] text-[14.5px]">Create, edit, and publish blog posts with category tags and SEO metadata.</p>
        </div>
        <button className="px-5 py-2.5 rounded-lg font-bold text-sm bg-gradient-to-r from-[#1a73e8] to-[#4c9bff] text-white hover:shadow-lg transition-all">
          + New Post
        </button>
      </div>

      <div className="bg-[#0a1c34] border border-[#0e2340] rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#0e2340]">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#7b8bad]">Title</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#7b8bad]">Status</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#7b8bad]">Date</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#7b8bad]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-[#0e2340] last:border-0 hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-sm text-white font-semibold">{post.title}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    post.status === 'published' 
                      ? 'bg-green-500/10 text-green-400 border border-green-500/30' 
                      : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
                  }`}>
                    {post.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-[#aebcda]">{post.date}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 text-xs font-bold rounded-lg bg-[#1a73e8]/10 text-[#4c9bff] hover:bg-[#1a73e8]/20 transition-colors">Edit</button>
                    <button className="px-3 py-1.5 text-xs font-bold rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-4 bg-[#0a1c34] border border-[#0e2340] rounded-xl text-center text-sm text-[#7b8bad]">
        Blog posts load from Supabase `blog_posts` table. Supabase Auth required for mutations.
      </div>
    </div>
  );
}
