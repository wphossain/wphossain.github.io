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
  TrendingUp
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
      label: 'Total Leads', 
      value: metrics.leads.total, 
      sub: `${metrics.leads.new} new submissions`,
      icon: Users,
      color: 'blue',
      link: '/admin/leads'
    },
    { 
      label: 'Blog Posts', 
      value: metrics.blogs.total, 
      sub: `${metrics.blogs.published} live articles`,
      icon: FileText,
      color: 'gold',
      link: '/admin/blog'
    },
    { 
      label: 'Case Studies', 
      value: metrics.caseStudies, 
      sub: 'Active client success stories',
      icon: Briefcase,
      color: 'green',
      link: '/admin/content' 
    },
    { 
      label: 'Tracking Pixels', 
      value: Object.values(metrics.tracking).filter(v => v).length, 
      sub: 'Active integrations',
      icon: Zap,
      color: 'purple',
      link: '/admin/tracking'
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-1">
            Dashboard Overview
          </h1>
          <p className="text-[#aebcda] text-[14.5px]">
            Managing <span className="text-white font-bold">{metrics.settings.business}</span> digital presence and lead pipeline.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-[11px] font-bold text-green-400 uppercase tracking-wider">CMS Connected</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4 max-xl:grid-cols-2 max-sm:grid-cols-1">
        {statCards.map((card, i) => (
          <Link key={i} href={card.link} className="block group">
            <div className="bg-[#0a1c34] border border-[#0e2340] rounded-2xl p-5 transition-all group-hover:border-[#1a73e8]/30 group-hover:shadow-lg group-hover:shadow-blue-500/5 relative overflow-hidden">
              <div className="absolute -right-2 -top-2 opacity-5 group-hover:opacity-10 transition-opacity">
                <card.icon size={80} />
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  card.color === 'blue' ? 'bg-blue-500/10 text-blue-400' :
                  card.color === 'gold' ? 'bg-yellow-500/10 text-yellow-400' :
                  card.color === 'green' ? 'bg-green-500/10 text-green-400' :
                  'bg-purple-500/10 text-purple-400'
                }`}>
                  <card.icon size={20} />
                </div>
                <ArrowUpRight size={16} className="text-[#7b8bad] group-hover:text-white transition-colors" />
              </div>
              <strong className="text-3xl font-display text-white block mb-1">{card.value}</strong>
              <span className="text-[#7b8bad] text-[12px] font-bold uppercase tracking-wider block">{card.label}</span>
              <p className="text-[13px] text-[#aebcda] mt-2 font-medium">{card.sub}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6 max-xl:grid-cols-1">
        {/* Quick Links / Status */}
        <div className="col-span-2 space-y-6">
          <div className="bg-[#0a1c34] border border-[#0e2340] rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp size={18} className="text-[#1a73e8]" />
              System Health & Tracking
            </h3>
            <div className="grid grid-cols-3 gap-4 max-sm:grid-cols-1">
              {[
                { name: 'Google Tag Manager', active: metrics.tracking.gtm },
                { name: 'Google Analytics 4', active: metrics.tracking.ga4 },
                { name: 'Meta Pixel', active: metrics.tracking.meta }
              ].map((item, i) => (
                <div key={i} className="bg-[#050f1f] border border-[#0e2340] p-4 rounded-xl flex flex-col gap-2">
                  <span className="text-[11px] font-bold text-[#7b8bad] uppercase tracking-wider">{item.name}</span>
                  <div className="flex items-center gap-2">
                    {item.active ? (
                      <>
                        <CheckCircle2 size={16} className="text-green-400" />
                        <span className="text-sm font-bold text-white">Live</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle size={16} className="text-yellow-400" />
                        <span className="text-sm font-bold text-white opacity-50">Disabled</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0a1c34] to-[#050f1f] border border-[#0e2340] rounded-2xl p-8 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-3">On-Demand Content Updates</h3>
              <p className="text-[#aebcda] text-[15px] leading-relaxed max-w-2xl">
                Every section of your site—from the Hero headlines to the Service list icons and SEO metadata—is now controlled directly through this dashboard. Changes are saved to your global state and reflected instantly on the public site.
              </p>
              <div className="mt-6 flex gap-4">
                <Link href="/admin/content" className="px-6 py-2.5 rounded-lg font-bold text-sm bg-[#1a73e8] text-white hover:bg-[#1a73e8]/80 transition-colors">
                  Edit Site Content
                </Link>
                <Link href="/admin/blog" className="px-6 py-2.5 rounded-lg font-bold text-sm bg-white/5 text-white hover:bg-white/10 transition-colors border border-white/10">
                  Write New Blog
                </Link>
              </div>
            </div>
            {/* Background Decoration */}
            <div className="absolute right-0 bottom-0 w-64 h-64 bg-blue-500/5 blur-3xl rounded-full -mr-20 -mb-20"></div>
          </div>
        </div>

        {/* Support / Help */}
        <div className="bg-[#0a1c34] border border-[#0e2340] rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Admin Quick Tips</h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1a73e8] mt-2 flex-none"></div>
              <p className="text-[13.5px] text-[#aebcda] leading-relaxed">
                <strong>SEO:</strong> Use the Blog Editor to add meta titles and descriptions to boost your search presence.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1a73e8] mt-2 flex-none"></div>
              <p className="text-[13.5px] text-[#aebcda] leading-relaxed">
                <strong>Leads:</strong> Check the Leads panel regularly to mark qualified audits and move them out of the Inbox.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1a73e8] mt-2 flex-none"></div>
              <p className="text-[13.5px] text-[#aebcda] leading-relaxed">
                <strong>Images:</strong> Case studies and blogs support direct image URLs. Use high-quality compressed WebP for best performance.
              </p>
            </div>
            <div className="pt-4 border-t border-[#0e2340] mt-4">
              <p className="text-[12px] text-[#7b8bad] font-medium italic">
                Need help? Your Ideavo agent is always ready to assist with custom feature updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
