import React from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/public/Sidebar';
import { MobileHeader } from '@/components/public/MobileHeader';
import { db } from '@/lib/db';
import { MobileCtaBar } from '@/components/public/MobileCtaBar';
import { Footer } from '@/components/public/Footer';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const study = await db.getCaseStudyBySlug(slug);
    if (!study) return { title: 'Case Study Not Found' };
    return {
      title: `${study.meta_title || study.title} | WP Hossain`,
      description: study.meta_description || study.result_summary || study.challenge,
      alternates: {
        canonical: `https://wphossain.com/portfolio/${study.slug}`,
      },
      openGraph: {
        images: study.featured_image ? [{ url: study.featured_image }] : [],
      },
    };
  } catch (e) {
    return { title: 'WP Hossain Case Study' };
  }
}

export default async function SingleCaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let study: any = null;
  let settings: any = {};
  try {
    const [st, set] = await Promise.all([
      db.getCaseStudyBySlug(slug),
      db.getSettings()
    ]);
    study = st;
    settings = set || {};
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
    "author": { "@type": "Person", "name": "WP Hossain" },
    "publisher": {
      "@type": "Organization",
      "name": "WP Hossain",
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

      <main className="min-h-screen bg-white pb-24 lg:pb-0">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-10 pt-8 lg:pt-12 pb-16 flex flex-col gap-6">
          
          <Link 
            href="/#portfolio" 
            className="text-[13.5px] text-[#64748B] hover:text-[#1A73E8] font-bold flex items-center gap-2 transition-colors w-fit"
          >
            ← Back to All Case Studies
          </Link>

          <article className="bg-white border border-[#CBD5E1] rounded-[28px] p-8 lg:p-12 shadow-xs">
            <span className="eyebrow mb-4">
              {study.client_niche || 'Contractor Growth Campaign'}
            </span>
            
            <h1 className="text-[clamp(28px,4vw,44px)] font-display font-extrabold text-[#0F172A] mb-6 leading-tight tracking-tight">
              {study.title}
            </h1>

            {study.featured_image && (
              <div className="mb-8 rounded-2xl overflow-hidden border border-[#CBD5E1]">
                <img src={study.featured_image} alt={study.featured_image_alt || study.title} className="w-full h-auto object-cover" loading="lazy" />
              </div>
            )}

            {/* Key KPI Metric Tiles */}
            {metrics.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
                {metrics.map(([key, value]: any) => (
                  <div key={key} className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#CBD5E1] text-center shadow-2xs">
                    <strong className="block text-2xl lg:text-3xl font-extrabold text-[#0F172A] font-display">{value}</strong>
                    <span className="text-[11px] uppercase tracking-wider text-[#64748B] font-bold mt-1 block">{String(key).replace(/_/g, ' ')}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-8 mt-10">
              {/* Challenge */}
              <section className="p-6 rounded-2xl bg-slate-50 border border-[#E2E8F0]">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-rose-600 font-mono block mb-2">
                  01. The Problem &amp; Budget Leaks
                </span>
                <p className="text-[15.5px] text-[#334155] leading-relaxed">{study.challenge}</p>
              </section>

              {/* Strategy */}
              <section className="p-6 rounded-2xl bg-blue-50/50 border border-blue-100">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#1A73E8] font-mono block mb-2">
                  02. Search Strategy &amp; Negative Fortress
                </span>
                <p className="text-[15.5px] text-[#334155] leading-relaxed">{study.strategy}</p>
              </section>

              {/* Result */}
              <section className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#059669] font-mono block mb-2">
                  03. Verified Numbers &amp; Revenue Outcome
                </span>
                <p className="text-[17px] font-display font-bold text-[#0F172A] leading-snug">{study.result_summary}</p>
              </section>
            </div>

            {/* Bottom CTA */}
            <div className="mt-12 pt-8 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-bold text-[#0F172A] font-display">Ready for results like these in your service area?</h3>
                <p className="text-[13.5px] text-[#64748B]">Let&apos;s review your search campaign structure on a 15-minute screen share.</p>
              </div>
              <a 
                href="https://zcal.co/wphossain/free" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary px-7 py-3.5 text-[14px] font-bold rounded-xl whitespace-nowrap shadow-lg shrink-0"
              >
                Book Free Strategy Call →
              </a>
            </div>

          </article>
        </div>

        <Footer settings={settings} />
      </main>
    </>
  );
}
