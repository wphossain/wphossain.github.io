"use client";

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/db';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ExternalLink,
  Eye,
  FileText,
  Calendar,
  MoreVertical,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    setLoading(true);
    const data = await db.getBlogs();
    setPosts(data);
    setLoading(false);
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      await db.deleteBlog(id);
      loadPosts();
    }
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-20">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-display font-bold text-white mb-2 tracking-tight">Blog Manager</h1>
          <p className="text-[#aebcda] text-[15px]">Create and optimize long-form PPC strategy guides.</p>
        </div>
        <Link 
          href="/admin/blog/editor" 
          className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#1a73e8] text-white font-bold text-[15px] hover:shadow-xl hover:shadow-[#1a73e8]/20 transition-all active:scale-[0.98] shadow-lg"
        >
          <Plus size={18} />
          Write New Post
        </Link>
      </div>

      {/* Search & Stats Bar */}
      <div className="flex flex-col xl:flex-row gap-6 items-center">
        <div className="flex-1 w-full relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7b8bad] group-focus-within:text-[#1a73e8] transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Filter articles by title, keywords or slug..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0a1c34]/30 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white text-[14px] focus:border-[#1a73e8] outline-none transition-all shadow-inner placeholder:text-white/10"
          />
        </div>
        <div className="flex gap-4 w-full xl:w-auto">
          <div className="bg-[#0a1c34]/30 border border-white/5 px-6 py-4 rounded-2xl flex items-center gap-3">
             <span className="text-[10px] font-bold text-[#7b8bad] uppercase tracking-widest">Total</span>
             <span className="text-white font-display font-bold">{posts.length}</span>
          </div>
          <div className="bg-[#0a1c34]/30 border border-white/5 px-6 py-4 rounded-2xl flex items-center gap-3">
             <span className="text-[10px] font-bold text-[#7b8bad] uppercase tracking-widest">Live</span>
             <span className="text-emerald-400 font-display font-bold">{posts.filter(p => p.status === 'published').length}</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a73e8]"></div>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="bg-[#0a1c34]/20 border border-white/5 rounded-[40px] p-24 text-center">
          <FileText size={48} className="text-[#7b8bad] opacity-20 mx-auto mb-6" />
          <h3 className="text-white font-display font-bold text-2xl">No matching articles</h3>
          <p className="text-[#7b8bad] text-[15px] mt-2">Start growing your organic reach by writing your first guide.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in duration-500">
          {filteredPosts.map((post) => (
            <div key={post.id} className="group bg-[#0a1c34]/30 border border-white/5 rounded-[32px] p-8 flex flex-col hover:border-[#1a73e8]/30 transition-all duration-300 backdrop-blur-sm shadow-xl relative overflow-hidden">
              <div className="flex justify-between items-start mb-6">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                  post.status === 'published' 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                    : 'bg-white/5 text-[#7b8bad] border-white/10'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${post.status === 'published' ? 'bg-emerald-400 animate-pulse' : 'bg-[#7b8bad]'}`} />
                  {post.status}
                </span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button onClick={() => handleDelete(post.id)} className="p-2 text-[#7b8bad] hover:text-red-400 transition-colors">
                     <Trash2 size={16} />
                   </button>
                </div>
              </div>

              <div className="flex-1 space-y-3">
                <h3 className="text-xl font-display font-bold text-white leading-tight group-hover:text-[#4c9bff] transition-colors line-clamp-2">
                   {post.title}
                </h3>
                <p className="text-[14px] text-[#7b8bad] line-clamp-2 leading-relaxed">
                   {post.excerpt || 'No excerpt provided for this article.'}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                   <span className="text-[9px] font-bold text-[#7b8bad] uppercase tracking-widest">Views</span>
                   <div className="flex items-center gap-2 text-white font-bold text-[14px]">
                      <Eye size={14} className="text-[#1a73e8]" /> {post.views_count || 0}
                   </div>
                </div>
                <div className="flex flex-col gap-1">
                   <span className="text-[9px] font-bold text-[#7b8bad] uppercase tracking-widest">Released</span>
                   <div className="flex items-center gap-2 text-[#aebcda] text-[13px] font-medium">
                      <Calendar size={14} /> {post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Draft'}
                   </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Link 
                  href={`/admin/blog/editor?id=${post.id}`}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs hover:bg-[#1a73e8] hover:border-[#1a73e8] transition-all group/btn"
                >
                  <Edit size={14} className="opacity-50 group-hover/btn:opacity-100" /> Edit Post
                </Link>
                <Link 
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs hover:bg-white/10 transition-all group/btn"
                >
                  <ExternalLink size={14} className="opacity-50" /> Preview
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}