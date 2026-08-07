"use client";

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/db';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  ExternalLink,
  Eye
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

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
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Area */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-1">Blog Manager</h1>
          <p className="text-[#aebcda] text-[14.5px]">Create, edit, and publish high-converting HVAC PPC articles.</p>
        </div>
        <Link 
          href="/admin/blog/editor" 
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1a73e8] text-white font-bold text-sm hover:bg-[#1a73e8]/80 transition-all shadow-lg shadow-blue-500/20"
        >
          <Plus size={18} />
          Write New Article
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7b8bad]" size={18} />
          <input 
            type="text" 
            placeholder="Search articles by title or slug..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0a1c34] border border-[#0e2340] rounded-xl pl-12 pr-4 py-3 text-white text-sm focus:outline-none focus:border-[#1a73e8] transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#0a1c34] border border-[#0e2340] text-[#aebcda] hover:text-white transition-all text-sm font-bold">
          <Filter size={18} />
          Filters
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-[#0a1c34] border border-[#0e2340] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#0e2340] bg-[#050f1f]/30">
                <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#7b8bad]">Article Details</th>
                <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#7b8bad]">Status</th>
                <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#7b8bad]">Analytics</th>
                <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#7b8bad]">Published</th>
                <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#7b8bad] text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a73e8] mx-auto mb-4"></div>
                    <span className="text-[#7b8bad] text-sm">Loading articles...</span>
                  </td>
                </tr>
              ) : filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <p className="text-[#aebcda] font-medium">No articles found matching your criteria.</p>
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="border-b border-[#0e2340] last:border-0 hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-[15px] text-white font-bold mb-0.5 group-hover:text-[#1a73e8] transition-colors">
                          {post.title}
                        </span>
                        <span className="text-[12px] text-[#7b8bad] font-mono">
                          /{post.slug}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                        post.status === 'published' 
                          ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                          : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                      }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-[#aebcda]">
                        <Eye size={14} className="text-[#7b8bad]" />
                        <span className="text-[13px] font-bold">{post.views_count || 0}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-[13px] text-[#aebcda]">
                        {post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/admin/blog/editor?id=${post.id}`}
                          className="p-2 bg-[#1a73e8]/10 text-[#1a73e8] hover:bg-[#1a73e8] hover:text-white rounded-lg transition-all"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </Link>
                        <Link 
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="p-2 bg-white/5 text-[#7b8bad] hover:text-white rounded-lg transition-all"
                          title="View on Site"
                        >
                          <ExternalLink size={16} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(post.id)}
                          className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                          title="Delete"
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

      {/* Database Context Note */}
      <div className="p-4 bg-[#0a1c34]/50 border border-[#0e2340] rounded-xl text-center text-xs text-[#7b8bad]">
        All blog data is synchronized with your Supabase <code className="bg-[#050f1f] px-1.5 py-0.5 rounded text-[#aebcda]">blog_posts</code> table.
      </div>
    </div>
  );
}
