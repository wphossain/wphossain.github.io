import React from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/public/Sidebar';
import { MobileHeader } from '@/components/public/MobileHeader';
import { db } from '@/lib/db';

export const metadata = {
  title: 'HVAC Google Ads & PPC Insights Blog | WPHossain',
  description: 'Actionable strategies, conversion tracking guides, and PPC optimization insights for HVAC contractors.',
};

export default async function BlogIndexPage() {
  // Fetch from our fallback-resilient db wrapper
  const posts = await db.getBlogs(false); // Only fetch published posts for public site

  return (
    <>
      <Sidebar />
      <MobileHeader />

      <main className="content lg:ml-[var(--sidebar-w)] p-6.5 max-lg:p-4.5">
        <div className="content-inner max-w-[var(--container)] mx-auto w-full flex flex-col gap-6">
          <section className="panel">
            <span className="eyebrow">PPC &amp; Tracking Insights</span>
            <h1 className="text-3xl font-display font-bold text-white mb-3">HVAC Google Ads Blog</h1>
            <p className="text-[var(--ink-dim)] text-[16px] max-w-2xl">
              Practical guides on Search Ads, Performance Max, GA4 tracking, and landing page optimization built for local service contractors.
            </p>
          </section>

          <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
            {posts.map((post: any) => (
              <article key={post.id} className="card flex flex-col justify-between p-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[11px] font-extrabold uppercase text-[var(--gold)] bg-[var(--gold-soft)] border border-[var(--gold-line)] px-2.5 py-1 rounded-full">
                      HVAC PPC Strategy
                    </span>
                    <span className="text-[12px] text-[var(--ink-faint)]">
                      {post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Draft'} · {post.reading_time_minutes || 5} min read
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2.5 leading-snug hover:text-[var(--blue-light)] transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="text-[14.5px] text-[var(--ink-dim)] mb-4">
                    {post.excerpt}
                  </p>
                </div>

                <Link href={`/blog/${post.slug}`} className="text-[14px] font-bold text-[var(--blue-light)] inline-flex items-center gap-1 hover:gap-2 transition-all">
                  Read Article →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
