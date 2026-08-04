import React from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/public/Sidebar';
import { MobileHeader } from '@/components/public/MobileHeader';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return {
    title: `${slug.replace(/-/g, ' ')} | WPHossain Blog`,
    description: 'Expert HVAC Google Ads insights and conversion tracking strategies.',
  };
}

export default async function SingleBlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": slug.replace(/-/g, ' '),
    "author": {
      "@type": "Person",
      "name": "Mikail Hossain"
    },
    "publisher": {
      "@type": "Organization",
      "name": "WPHossain"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Sidebar />
      <MobileHeader />

      <main className="content lg:ml-[var(--sidebar-w)] p-6.5 max-lg:p-4.5">
        <div className="content-inner max-w-4xl mx-auto w-full flex flex-col gap-6">
          <Link href="/blog" className="text-[14px] text-[var(--ink-faint)] hover:text-[var(--gold)] font-bold">
            ← Back to Blog
          </Link>

          <article className="panel p-8">
            <span className="eyebrow">HVAC PPC Strategy</span>
            <h1 className="text-3xl font-display font-bold text-white mb-4 capitalize leading-tight">
              {slug.replace(/-/g, ' ')}
            </h1>
            
            <div className="flex items-center gap-4 text-[13px] text-[var(--ink-faint)] pb-6 mb-6 border-b border-[var(--line)]">
              <span>By Mikail Hossain</span>
              <span>•</span>
              <span>August 1, 2026</span>
              <span>•</span>
              <span>6 min read</span>
            </div>

            <div className="prose prose-invert text-[15.5px] text-[var(--ink-dim)] leading-relaxed space-y-4">
              <p>
                When running Google Ads for HVAC contractors, managing Cost Per Lead (CPL) requires a balanced approach between intent-driven keywords and robust conversion tracking.
              </p>
              <h2 className="text-xl font-bold text-white mt-6 mb-2">1. Eliminate Negative Keyword Leakage</h2>
              <p>
                Ensure terms like &quot;free&quot;, &quot;jobs&quot;, &quot;salary&quot;, and DIY troubleshooting keywords are blocked. Focus budget purely on high-intent terms like &quot;AC repair near me&quot; or &quot;emergency furnace installation&quot;.
              </p>
              <h2 className="text-xl font-bold text-white mt-6 mb-2">2. Match Landing Page Message to Ad Copy</h2>
              <p>
                Landing pages should reflect the exact service, trust badges, and local phone number promised in your search ad copy to maintain high Quality Scores and conversion rates.
              </p>
            </div>
          </article>
        </div>
      </main>
    </>
  );
}
