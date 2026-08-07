"use client";

import React, { useEffect, useState } from 'react';
import { db } from '@/lib/db';
import { 
  Users, 
  FileText, 
  Briefcase, 
  Zap, 
  CheckCircle2, 
  AlertCircle,
  ArrowUpRight,
  TrendingUp,
  Layout,
  Plus,
  MousePointer2
} from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const [metrics, setMetrics] = useState({
    leads: { total: 0, new: 0 },
    blogs: { total: 0, published: 0 },
    caseStudies: 0,
    tracking: { gtm: false, ga4: false, meta: false },
    settings: { business: '' }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMetrics() {
      const [leads, blogs, studies, tracking, settings] = await Promise.all([
        db.getLeads(),
        db.getBlogs(),
        db.getCaseStudies(),
        db.getTracking(),
        db.getSettings()
      ]);

      setMetrics({
        leads: {
          total: leads.length,
          new: leads.filter((l: any) => l.status === 'new').length
        },
        blogs: {
          total: blogs.length,
          published: blogs.filter((b: any) => b.status === 'published').length
        },
        caseStudies: studies.length,
        tracking: {
          gtm: tracking.gtm_enabled,
          ga4: tracking.ga4_enabled,
          meta: tracking.meta_pixel_enabled
        },
        settings: {
          business: settings.business_name
        }
      });
      setLoading(false);
    }
    loadMetrics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a73e8]"></div>
      </div>
    );
  }

  const statCards = [
    { 
      label: 'New Leads', 
      value: metrics.leads.new, 
      total: metrics.leads.total,
      sub: 'Action required',
      icon: Users,
      color: 'blue',
      link: '/admin/leads'
    },
    { 
      label: 'Live Blogs', 
      value: metrics.blogs.published, 
      total: metrics.blogs.total,
      sub: 'Total articles',
      icon: FileText,
      color: 'gold',
      link: '/admin/blog'
    },
    { 
      label: 'Case Studies', 
      value: metrics.caseStudies, 
      total: metrics.caseStudies,
      sub: 'Client ROI proof',
      icon: Briefcase,
      color: 'green',
      link: '/admin/case-studies' 
    },
    { 
      label: 'Pixel Status', 
      value: Object.values(metrics.tracking).filter(v => v).length, 
      total: 3,
      sub: 'Integrations live',
      icon: Zap,
      color: 'purple',
      link: '/admin/tracking'
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-display font-bold text-white mb-2 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-[#aebcda] text-[15px] flex items-center gap-2">
            Managing <span className="text-white font-bold bg-white/5 px-2 py-0.5 rounded-md border border-white/10">{metrics.settings.business}</span> platform performance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/content" className="flex items-center gap-2 px-4 py-2 bg-[#1a73e8] text-white rounded-xl font-bold text-[13px] hover:bg-[#1a73e8]/80 transition-all shadow-lg shadow-[#1a73e8]/20">
            <Plus size={16} /> Edit Page
          </Link>
          <div className="flex items-center gap-2 px-3 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest">System Online</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-5 max-xl:grid-cols-2 max-sm:grid-cols-1">
        {statCards.map((card, i) => (
          <Link key={i} href={card.link} className="group block">
            <div className="h-full bg-[#0a1c34]/40 border border-white/5 rounded-3xl p-6 transition-all duration-300 group-hover:border-[#1a73e8]/30 group-hover:bg-[#0a1c34]/60 group-hover:shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  card.color === 'blue' ? 'bg-blue-500/10 text-[#4c9bff]' :
                  card.color === 'gold' ? 'bg-yellow-500/10 text-[#f2a93d]' :
                  card.color === 'green' ? 'bg-emerald-500/10 text-emerald-400' :
                  'bg-purple-500/10 text-purple-400'
                }`}>
                  <card.icon size={22} />
                </div>
                <ArrowUpRight size={18} className="text-[#7b8bad] group-hover:text-white transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <strong className="text-4xl font-display text-white font-bold">{card.value}</strong>
                  {card.total > card.value && (
                    <span className="text-[#7b8bad] text-sm font-medium">/ {card.total}</span>
                  )}
                </div>
                <span className="text-[#7b8bad] text-[11px] font-bold uppercase tracking-widest block mb-2">{card.label}</span>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mb-2">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      card.color === 'blue' ? 'bg-[#1a73e8]' :
                      card.color === 'gold' ? 'bg-[#f2a93d]' :
                      card.color === 'green' ? 'bg-emerald-500' :
                      'bg-purple-500'
                    }`}
                    style={{ width: `${(card.value / (card.total || 1)) * 100}%` }}
                  />
                </div>
                <p className="text-[13px] text-[#aebcda] font-medium">{card.sub}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-8 max-xl:grid-cols-1">
        {/* Main Section: Health & Content */}
        <div className="col-span-2 space-y-8">
          <div className="bg-[#0a1c34]/30 border border-white/5 rounded-[32px] p-8 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-display font-bold text-white flex items-center gap-3">
                <TrendingUp size={20} className="text-[#1a73e8]" />
                Lead & Conversion Health
              </h3>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-[#7b8bad] uppercase">Last 30 Days</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-5 max-sm:grid-cols-1">
              {[
                { name: 'GTM Setup', status: metrics.tracking.gtm ? 'Connected' : 'Missing', active: metrics.tracking.gtm },
                { name: 'GA4 Analytics', status: metrics.tracking.ga4 ? 'Connected' : 'Missing', active: metrics.tracking.ga4 },
                { name: 'Meta Pixel', status: metrics.tracking.meta ? 'Connected' : 'Missing', active: metrics.tracking.meta }
              ].map((item, i) => (
                <div key={i} className="bg-[#050f1f]/80 border border-white/5 p-5 rounded-[20px] transition-all hover:border-white/10">
                  <span className="text-[10px] font-bold text-[#7b8bad] uppercase tracking-widest block mb-3">{item.name}</span>
                  <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${item.active ? 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.3)]' : 'bg-red-400'}`} />
                    <span className={`text-[15px] font-bold ${item.active ? 'text-white' : 'text-[#7b8bad]'}`}>{item.status}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 rounded-2xl bg-[#1a73e8]/5 border border-[#1a73e8]/10">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-[#1a73e8]/10 text-[#4c9bff] flex items-center justify-center shrink-0">
                  <MousePointer2 size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">Conversion Tip</h4>
                  <p className="text-[#aebcda] text-[13px] leading-relaxed">
                    Your form tracking is live. Consider adding a &quot;Thank You&quot; page redirect to GA4 for cleaner conversion measurement in high-spend campaigns.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-[32px]">
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a73e8] to-[#4c9bff] opacity-10 group-hover:opacity-15 transition-opacity" />
            <div className="relative p-10 border border-white/5 bg-[#0a1c34]/20 backdrop-blur-xl">
              <div className="max-w-2xl">
                <h3 className="text-2xl font-display font-bold text-white mb-4">Master Your Site Content</h3>
                <p className="text-[#aebcda] text-[16px] leading-relaxed mb-8">
                  Update headlines, services, icons, and SEO metadata in real-time. Every change you make in the Page Editor is reflected instantly across your public landing page.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/admin/content" className="px-8 py-3.5 bg-white text-[#050f1f] rounded-xl font-bold text-[14px] hover:scale-[1.03] transition-all shadow-xl">
                    Launch Page Editor
                  </Link>
                  <Link href="/admin/blog" className="px-8 py-3.5 bg-white/5 border border-white/10 text-white rounded-xl font-bold text-[14px] hover:bg-white/10 transition-all">
                    Write New Article
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar: Tips & Shortcuts */}
        <div className="space-y-6">
          <div className="bg-[#0a1c34]/30 border border-white/5 rounded-[32px] p-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
              <Layout size={18} className="text-[#f2a93d]" />
              Quick Shortcuts
            </h3>
            <div className="space-y-3">
              {[
                { name: 'View Site', href: '/', icon: ArrowUpRight },
                { name: 'Pixel Settings', href: '/admin/tracking', icon: Zap },
                { name: 'Manage Leads', href: '/admin/leads', icon: Users },
                { name: 'Blog Drafts', href: '/admin/blog', icon: FileText }
              ].map((s, i) => (
                <Link key={i} href={s.href} className="flex items-center justify-between p-4 rounded-2xl bg-[#050f1f]/60 border border-white/5 hover:border-[#1a73e8]/30 hover:bg-[#050f1f] transition-all group">
                  <span className="text-[13.5px] font-semibold text-[#aebcda] group-hover:text-white transition-colors">{s.name}</span>
                  <s.icon size={16} className="text-[#7b8bad] group-hover:text-[#4c9bff]" />
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-[#0a1c34]/30 border border-white/5 rounded-[32px] p-8">
            <h3 className="text-lg font-bold text-white mb-6">Pro Tips</h3>
            <div className="space-y-6">
              {[
                { title: 'Rich Media', text: 'Use high-resolution WebP images for your case studies to keep the page load under 2s.' },
                { title: 'Lead Status', text: 'Mark leads as "Qualified" or "Archive" to keep your dashboard inbox focused on active audits.' },
                { title: 'SEO Titles', text: 'Keep blog meta titles between 50-60 characters for optimal Google search visibility.' }
              ].map((tip, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1a73e8] mt-2 shrink-0" />
                  <div>
                    <h4 className="text-[13px] font-bold text-white mb-1">{tip.title}</h4>
                    <p className="text-[12.5px] text-[#7b8bad] leading-relaxed">{tip.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 text-center">
              <p className="text-[11px] text-[#7b8bad] font-medium italic">
                Platform redesigned by Ideavo Agent.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}