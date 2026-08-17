import React from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/public/Sidebar';
import { MobileHeader } from '@/components/public/MobileHeader';
import { db } from '@/lib/db';
import { MobileCtaBar } from '@/components/public/MobileCtaBar';

export const metadata = {
  title: 'Portfolio | WPHossain',
  description: 'Real HVAC, plumbing, and local service Google Ads results — account rebuilds, tracking fixes, and landing page lifts.',
};

export default async function CaseStudiesIndexPage() {
  let studies: any[] = [];
  try {
    const fetched = await db.getCaseStudies();
    if (Array.isArray(fetched)) {
      studies = fetched.filter((s: any) => (typeof s.is_published === 'boolean' ? s.is_published : true));
    }
  } catch (e) {
    console.error("Error loading case studies:", e);
  }

  return (
    <>
      <Sidebar />
      <MobileHeader />
      <MobileCtaBar />

      <main className="content p-6.5 max-lg:p-4.5 min-h-screen bg-[#F8FAFC] pb-24 lg:pb-0">
        <div className="content-inner max-w-[var(--container)] mx-auto w-full flex flex-col gap-6">
          <section className="panel">
            <span className="eyebrow">Client Results</span>
            <h1 className="text-3xl font-display font-bold text-[#1E293B] mb-3">Portfolio</h1>
            <p className="text-[var(--ink-dim)] text-[16px] max-w-2xl">
              Real accounts, real fixes — a look at how focused account rebuilds, clean tracking, and landing page work move the metrics that matter.
            </p>
          </section>

          {studies.length === 0 ? (
            <p className="text-[var(--ink-dim)]">Case studies are coming soon.</p>
          ) : (
            <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
              {studies.map((s: any) => (
                <article key={s.id} className="card flex flex-col justify-between p-6">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[11px] font-extrabold uppercase text-[#2563EB] bg-[#2563EB]/10 border border-[#2563EB]/20 px-2.5 py-1 rounded-full">
                        {s.client_niche}
                      </span>
                      <span className="text-[12px] text-[var(--ink-faint)]">
                        {s.result_summary ? 'Result documented' : ''}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-[#1E293B] mb-2.5 leading-snug hover:text-[#2563EB] transition-colors">
                      <Link href={`/portfolio/${s.slug}`}>{s.title}</Link>
                    </h2>
                    {s.metrics_json && (
                      <div className="flex flex-wrap gap-4 my-4">
                        {(Object.entries(s.metrics_json) as any[]).map(([k, v]: any) => (
                          <div key={k} className="text-center">
                            <strong className="block text-lg font-bold text-[#1E293B]">{v}</strong>
                            <span className="text-[10px] uppercase tracking-widest text-[var(--ink-faint)]">{String(k).replace(/_/g, ' ')}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <p className="text-[14.5px] text-[var(--ink-dim)] mb-4">
                      {s.result_summary || s.strategy}
                    </p>
                  </div>

                  <Link href={`/portfolio/${s.slug}`} className="text-[14px] font-bold text-[#2563EB] inline-flex items-center gap-1 hover:gap-2 transition-all">
                    View Case Study →
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
