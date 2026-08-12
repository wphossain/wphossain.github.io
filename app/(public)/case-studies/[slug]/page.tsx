import React from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/public/Sidebar';
import { MobileHeader } from '@/components/public/MobileHeader';
import { db } from '@/lib/db';
import { MobileCtaBar } from '@/components/public/MobileCtaBar';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const study = await db.getCaseStudyBySlug(slug);
    if (!study) return { title: 'Case Study Not Found' };
    return {
      title: `${study.meta_title || study.title} | WPHossain`,
      description: study.meta_description || study.result_summary || study.challenge,
      alternates: {
        canonical: `https://wphossain.com/case-studies/${study.slug}`,
      },
      openGraph: {
        images: study.featured_image ? [{ url: study.featured_image }] : [],
      },
    };
  } catch (e) {
    return { title: 'WPHossain Case Study' };
  }
}

export default async function SingleCaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let study: any = null;
  try {
    study = await db.getCaseStudyBySlug(slug);
  } catch (e) {
    console.error("Error fetching case study:", e);
  }

  if (!study) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": study.title,
    "description": study.result_summary || study.challenge,
    "image": study.featured_image,
    "datePublished": study.created_at,
    "author": { "@type": "Person", "name": "Mikail Hossain" },
    "publisher": {
      "@type": "Organization",
      "name": "WPHossain",
      "logo": { "@type": "ImageObject", "url": "https://wphossain.com/images/headshot.jpg" },
    },
  };

  const metrics: any[] = study.metrics_json ? Object.entries(study.metrics_json) : [];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Sidebar />
      <MobileHeader />
      <MobileCtaBar />

      <main className="content p-6.5 max-lg:p-4.5 min-h-screen bg-[#050f1f] pb-24 lg:pb-0">
        <div className="content-inner max-w-4xl mx-auto w-full flex flex-col gap-6">
          <Link href="/case-studies" className="text-[14px] text-[var(--ink-faint)] hover:text-[var(--blue-light)] font-bold flex items-center gap-2 transition-colors">
            ← Back to Case Studies
          </Link>

          <article className="panel p-10 max-sm:p-6">
            <span className="eyebrow">{study.client_niche}</span>
            <h1 className="text-4xl font-display font-bold text-white mb-4 leading-tight">
              {study.title}
            </h1>

            {study.featured_image && (
              <div className="mb-8 rounded-2xl overflow-hidden border border-white/5">
                <img src={study.featured_image} alt={study.featured_image_alt || study.title} className="w-full h-auto object-cover" loading="lazy" />
              </div>
            )}

            {metrics.length > 0 && (
              <div className="grid grid-cols-3 gap-4 max-sm:grid-cols-1 my-6">
                {metrics.map(([key, value]: any) => (
                  <div key={key} className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <strong className="block text-2xl font-bold text-white">{value}</strong>
                    <span className="text-[11px] uppercase tracking-widest text-[var(--ink-faint)]">{String(key).replace(/_/g, ' ')}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-8 mt-8">
              <section>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[var(--blue-light)]">The Challenge</span>
                <p className="mt-2 text-[15.5px] text-[var(--ink-dim)] leading-relaxed">{study.challenge}</p>
              </section>
              <section>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[var(--blue-light)]">The Strategy</span>
                <p className="mt-2 text-[15.5px] text-[var(--ink-dim)] leading-relaxed">{study.strategy}</p>
              </section>
              <section>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[var(--accent-green)]">Final Result</span>
                <p className="mt-2 text-[16px] font-display font-bold text-white leading-tight">{study.result_summary}</p>
              </section>
            </div>
          </article>
        </div>
      </main>
    </>
  );
}
