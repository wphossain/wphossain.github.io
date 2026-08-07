"use client";

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { db } from '@/lib/db';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Type, 
  Link as LinkIcon, 
  Image as ImageIcon,
  Heading1,
  Heading2,
  List,
  Bold,
  Italic,
  Settings as SettingsIcon,
  Search,
  Globe
} from 'lucide-react';
import Link from 'next/link';

function BlogEditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');

  const [loading, setLoading] = useState(editId ? true : false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'seo'>('content');
  
  // Blog State
  const [blog, setBlog] = useState({
    id: '',
    title: '',
    slug: '',
    excerpt: '',
    content_html: '',
    status: 'draft',
    meta_title: '',
    meta_description: '',
    canonical_url: '',
    og_image: '',
    reading_time_minutes: 5
  });

  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editId) {
      async function loadBlog() {
        const blogs = await db.getBlogs();
        const found = blogs.find((b: any) => b.id === editId);
        if (found) {
          setBlog(found);
          if (editorRef.current) {
            editorRef.current.innerHTML = found.content_html;
          }
        }
        setLoading(false);
      }
      loadBlog();
    }
  }, [editId]);

  const handleCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
  };

  const handleSave = async () => {
    setSaving(true);
    const content = editorRef.current?.innerHTML || '';
    const slug = blog.slug || blog.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    
    const blogData = {
      ...blog,
      content_html: content,
      slug: slug,
      meta_title: blog.meta_title || blog.title,
      meta_description: blog.meta_description || blog.excerpt
    };

    await db.saveBlog(blogData);
    setSaving(false);
    router.push('/admin/blog');
    router.refresh();
  };

  const syncContent = () => {
    if (editorRef.current) {
      setBlog(prev => ({ ...prev, content_html: editorRef.current!.innerHTML }));
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-[400px]"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a73e8]"></div></div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between bg-[#0a1c34] border border-[#0e2340] p-4 rounded-2xl sticky top-4 z-30 shadow-xl">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog" className="p-2 hover:bg-white/5 rounded-lg text-[#7b8bad] hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-white leading-none">
              {editId ? 'Edit Article' : 'Write New Article'}
            </h1>
            <span className="text-[11px] text-[#7b8bad] font-bold uppercase tracking-widest">Blog Editor</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={blog.status}
            onChange={(e) => setBlog({...blog, status: e.target.value})}
            className="bg-[#050f1f] border border-[#0e2340] text-sm text-[#aebcda] px-3 py-2 rounded-lg focus:outline-none focus:border-[#1a73e8]"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-[#1a73e8] text-white font-bold text-sm hover:bg-[#1a73e8]/80 transition-all disabled:opacity-50"
          >
            <Save size={16} />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_300px] gap-6 max-xl:grid-cols-1">
        {/* Main Editor Area */}
        <div className="space-y-6">
          {/* Editor Header Inputs */}
          <div className="bg-[#0a1c34] border border-[#0e2340] rounded-2xl p-8 space-y-6">
            <input 
              type="text"
              placeholder="Article Title..."
              value={blog.title}
              onChange={(e) => setBlog({...blog, title: e.target.value})}
              className="w-full bg-transparent border-none text-4xl font-display font-bold text-white placeholder:text-white/10 focus:outline-none"
            />
            <textarea 
              placeholder="Write a short excerpt for the card preview..."
              value={blog.excerpt}
              onChange={(e) => setBlog({...blog, excerpt: e.target.value})}
              rows={2}
              className="w-full bg-transparent border-none text-[#aebcda] text-lg placeholder:text-[#7b8bad]/30 focus:outline-none resize-none"
            />
          </div>

          {/* Editor Tabs */}
          <div className="flex gap-1 border-b border-[#0e2340]">
            <button 
              onClick={() => setActiveTab('content')}
              className={`px-6 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${activeTab === 'content' ? 'border-[#1a73e8] text-white' : 'border-transparent text-[#7b8bad] hover:text-white'}`}
            >
              <Type size={16} /> Content
            </button>
            <button 
              onClick={() => setActiveTab('seo')}
              className={`px-6 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${activeTab === 'seo' ? 'border-[#1a73e8] text-white' : 'border-transparent text-[#7b8bad] hover:text-white'}`}
            >
              <Search size={16} /> SEO & Metadata
            </button>
          </div>

          {activeTab === 'content' ? (
            <div className="bg-[#0a1c34] border border-[#0e2340] rounded-2xl overflow-hidden flex flex-col min-h-[600px]">
              {/* Toolbar */}
              <div className="flex items-center flex-wrap gap-1 p-2 bg-[#050f1f]/50 border-b border-[#0e2340]">
                <button onClick={() => handleCommand('formatBlock', 'H1')} className="p-2 hover:bg-white/10 rounded text-[#aebcda]" title="H1"><Heading1 size={18} /></button>
                <button onClick={() => handleCommand('formatBlock', 'H2')} className="p-2 hover:bg-white/10 rounded text-[#aebcda]" title="H2"><Heading2 size={18} /></button>
                <div className="w-px h-6 bg-[#0e2340] mx-1"></div>
                <button onClick={() => handleCommand('bold')} className="p-2 hover:bg-white/10 rounded text-[#aebcda]" title="Bold"><Bold size={18} /></button>
                <button onClick={() => handleCommand('italic')} className="p-2 hover:bg-white/10 rounded text-[#aebcda]" title="Italic"><Italic size={18} /></button>
                <div className="w-px h-6 bg-[#0e2340] mx-1"></div>
                <button onClick={() => handleCommand('insertUnorderedList')} className="p-2 hover:bg-white/10 rounded text-[#aebcda]" title="List"><List size={18} /></button>
                <button onClick={() => {
                  const url = prompt('Enter URL:');
                  if (url) handleCommand('createLink', url);
                }} className="p-2 hover:bg-white/10 rounded text-[#aebcda]" title="Link"><LinkIcon size={18} /></button>
                <button onClick={() => {
                  const url = prompt('Enter Image URL:');
                  if (url) handleCommand('insertImage', url);
                }} className="p-2 hover:bg-white/10 rounded text-[#aebcda]" title="Image"><ImageIcon size={18} /></button>
              </div>

              {/* Editable Area */}
              <div 
                ref={editorRef}
                contentEditable
                onInput={syncContent}
                className="flex-1 p-10 focus:outline-none text-[#eef3fb] text-lg leading-relaxed prose prose-invert max-w-none"
              ></div>
            </div>
          ) : (
            <div className="bg-[#0a1c34] border border-[#0e2340] rounded-2xl p-8 space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7b8bad] mb-2">Slug (URL Path)</label>
                  <div className="flex items-center bg-[#050f1f] border border-[#0e2340] rounded-lg px-4 py-2.5">
                    <span className="text-[#7b8bad] text-sm">wphossain.com/blog/</span>
                    <input 
                      type="text" 
                      value={blog.slug}
                      onChange={(e) => setBlog({...blog, slug: e.target.value})}
                      className="flex-1 bg-transparent border-none text-white text-sm focus:outline-none ml-1"
                      placeholder="url-friendly-slug"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7b8bad] mb-2">Meta Title</label>
                  <input 
                    type="text" 
                    value={blog.meta_title}
                    onChange={(e) => setBlog({...blog, meta_title: e.target.value})}
                    className="w-full bg-[#050f1f] border border-[#0e2340] rounded-lg px-4 py-2.5 text-white text-sm focus:border-[#1a73e8] focus:outline-none"
                    placeholder="Search engine title..."
                  />
                  <p className="mt-1 text-[11px] text-[#7b8bad]">Ideally between 50-60 characters.</p>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7b8bad] mb-2">Meta Description</label>
                  <textarea 
                    value={blog.meta_description}
                    onChange={(e) => setBlog({...blog, meta_description: e.target.value})}
                    rows={3}
                    className="w-full bg-[#050f1f] border border-[#0e2340] rounded-lg p-4 text-white text-sm focus:border-[#1a73e8] focus:outline-none"
                    placeholder="Search engine description..."
                  />
                  <p className="mt-1 text-[11px] text-[#7b8bad]">Ideally between 150-160 characters.</p>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7b8bad] mb-2">Canonical URL</label>
                  <input 
                    type="text" 
                    value={blog.canonical_url}
                    onChange={(e) => setBlog({...blog, canonical_url: e.target.value})}
                    className="w-full bg-[#050f1f] border border-[#0e2340] rounded-lg px-4 py-2.5 text-white text-sm focus:border-[#1a73e8] focus:outline-none"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-[#0a1c34] border border-[#0e2340] rounded-2xl p-6">
            <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <SettingsIcon size={16} className="text-[#1a73e8]" />
              Publishing Details
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-[#7b8bad] uppercase mb-1.5">Reading Time (Min)</label>
                <input 
                  type="number" 
                  value={blog.reading_time_minutes}
                  onChange={(e) => setBlog({...blog, reading_time_minutes: parseInt(e.target.value)})}
                  className="w-full bg-[#050f1f] border border-[#0e2340] rounded-lg px-4 py-2 text-white text-sm focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#7b8bad] uppercase mb-1.5">Featured Image URL</label>
                <input 
                  type="text" 
                  value={blog.og_image}
                  onChange={(e) => setBlog({...blog, og_image: e.target.value})}
                  className="w-full bg-[#050f1f] border border-[#0e2340] rounded-lg px-4 py-2 text-white text-sm focus:outline-none"
                  placeholder="https://..."
                />
                {blog.og_image && (
                  <div className="mt-2 aspect-video rounded-lg overflow-hidden border border-[#0e2340] bg-[#050f1f]">
                    <img src={blog.og_image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-[#0a1c34] border border-[#0e2340] rounded-2xl p-6">
            <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Globe size={16} className="text-[#1a73e8]" />
              Live Preview
            </h4>
            <p className="text-[12px] text-[#aebcda] leading-relaxed mb-4">
              Once saved, your article will be formatted using the agency design system on the public blog index.
            </p>
            <Link 
              href={`/blog/${blog.slug || 'preview'}`} 
              target="_blank"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-white/10 text-white text-[13px] font-bold hover:bg-white/5 transition-all"
            >
              <Eye size={16} /> View on Site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BlogEditorPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[400px]"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a73e8]"></div></div>}>
      <BlogEditorContent />
    </Suspense>
  );
}
