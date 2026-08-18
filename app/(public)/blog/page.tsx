import React from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/public/Sidebar';
import { MobileHeader } from '@/components/public/MobileHeader';
import { db } from '@/lib/db';
import { MobileCtaBar } from '@/components/public/MobileCtaBar';
import { Footer } from '@/components/public/Footer';

export const metadata = {
  title: 'Google Ads & PPC Insights Blog | WP Hossain',
  description: 'Actionable strategies, negative keyword guides, and conversion tracking insights for local contractors.',
};

export default async function BlogIndexPage() {
  let posts: any[] = [];
  let settings: any = {};
  try {
    const [fetched, set] = await Promise.all([
      db.getBlogs(false),
      db.getSettings()
    ]);
    if (Array.isArray(fetched)) posts = fetched;
    settings = set || {};
  } catch (e) {
    console.error("Error loading blog posts:", e);
  }

  return (
    <>
      <Sidebar />
      <MobileHeader />
      <MobileCtaBar />

      <main className="min-h-screen bg-white pb-24 lg:pb-0">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 pt-8 lg:pt-12 pb-16 flex flex-col gap-10">
          
          {/* Header Banner */}
          <div className="bg-[#F8FAFC] border border-[#CBD5E1] rounded-[28px] p-8 lg:p-12 relative overflow-hidden">
            <div className="max-w-3xl">
              <span className="eyebrow mb-3.5">
                PPC &amp; CONVERSION INSIGHTS
              </span>
              <h1 className="text-[clamp(32px,4vw,48px)] font-display font-extrabold text-[#0F172A] tracking-tight mb-4">
                Google Ads &amp; Paid Search Blog
              </h1>
              <p className="text-[#475569] text-[16px] lg:text-[18px] leading-relaxed">
                Practical breakdowns on Search Ads, CallRail attribution, negative keyword fortresses, and landing page CRO built for local contractors.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {posts.map((post: any) => (
              <article 
                key={post.id} 
                className="group bg-white border border-[#CBD5E1] rounded-[24px] overflow-hidden shadow-xs hover:border-[#1A73E8] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] px-5 py-3 flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#059669] border border-emerald-200">
                      {post.category || 'Google Ads Strategy'}
                    </span>
                    <span className="text-[11.5px] font-bold text-[#64748B]">
                      {post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent'} · {post.reading_time_minutes || 5}m
                    </span>
                  </div>

                  <div className="p-6">
                    <h2 className="text-[19px] font-display font-bold text-[#0F172A] mb-3 leading-snug group-hover:text-[#1A73E8] transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="text-[14px] text-[#475569] leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <Link 
                    href={`/blog/${post.slug}`} 
                    className="btn btn-ghost btn-block py-3 text-[13.5px] font-bold rounded-xl text-[#0F172A] hover:bg-[#1A73E8] hover:text-white hover:border-[#1A73E8] transition-all flex items-center justify-center gap-2"
                  >
                    <span>Read Article</span>
                    <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

        </div>

        <Footer settings={settings} />
      </main>
    </>
  );
}
