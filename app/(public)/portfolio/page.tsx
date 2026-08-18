import React from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/public/Sidebar';
import { MobileHeader } from '@/components/public/MobileHeader';
import { db } from '@/lib/db';
import { MobileCtaBar } from '@/components/public/MobileCtaBar';

export const metadata = {
  title: 'Contractor Google Ads Case Studies | WP Hossain',
  description: 'Real HVAC, plumbing, and roofing Google Ads case studies — high-intent search campaigns, negative keyword fortresses, and CallRail tracking proofs.',
};

export default async function CaseStudiesIndexPage() {
  let studies: any[] = [];
  try {
    const fetched = await db.getCaseStudies();
    if (Array.isArray(fetched) && fetched.length > 0) {
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

      <main className="min-h-screen bg-white pb-24 lg:pb-12">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 pt-8 lg:pt-12 flex flex-col gap-10">
          
          {/* Header Banner */}
          <div className="bg-[#F8FAFC] border border-[#CBD5E1] rounded-[28px] p-8 lg:p-12 relative overflow-hidden">
            <div className="max-w-3xl">
              <span className="eyebrow mb-3.5">
                VERIFIED CONTRACTOR RESULTS
              </span>
              <h1 className="text-[clamp(32px,4vw,48px)] font-display font-extrabold text-[#0F172A] tracking-tight mb-4">
                Google Ads Portfolio &amp; Proof Vault
              </h1>
              <p className="text-[#475569] text-[16px] lg:text-[18px] leading-relaxed">
                Real accounts, verified numbers. See how high-intent search structuring, 1,200+ negative keyword fortresses, and CallRail dynamic number insertion transform contractor lead flow.
              </p>
            </div>
          </div>

          {/* Grid of Case Studies */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {studies.map((s: any) => (
              <article 
                key={s.id} 
                className="group bg-white border border-[#CBD5E1] rounded-[24px] overflow-hidden shadow-xs hover:border-[#1A73E8] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar */}
                  <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] px-5 py-3 flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase font-mono px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1A73E8] border border-blue-200/80">
                      {s.client_niche || 'Contractor Campaign'}
                    </span>
                    <span className="text-[11.5px] font-bold text-[#64748B]">
                      Verified Proof
                    </span>
                  </div>

                  <div className="p-6">
                    <h2 className="text-[19px] font-display font-bold text-[#0F172A] mb-3 leading-snug group-hover:text-[#1A73E8] transition-colors">
                      <Link href={`/portfolio/${s.slug}`}>{s.title}</Link>
                    </h2>

                    {s.metrics_json && (
                      <div className="grid grid-cols-3 gap-2.5 my-4 bg-slate-50 border border-[#E2E8F0] p-3 rounded-xl">
                        {(Object.entries(s.metrics_json) as any[]).map(([k, v]: any) => (
                          <div key={k} className="text-center">
                            <strong className="block text-[15px] font-extrabold text-[#0F172A] font-display">{v}</strong>
                            <span className="text-[9px] uppercase tracking-wider text-[#64748B] font-bold">{String(k).replace(/_/g, ' ')}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <p className="text-[14px] text-[#475569] leading-relaxed line-clamp-3">
                      {s.result_summary || s.strategy || s.challenge}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <Link 
                    href={`/portfolio/${s.slug}`} 
                    className="btn btn-ghost btn-block py-3 text-[13.5px] font-bold rounded-xl text-[#0F172A] hover:bg-[#1A73E8] hover:text-white hover:border-[#1A73E8] transition-all flex items-center justify-center gap-2"
                  >
                    <span>Read Full Case Study</span>
                    <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

        </div>
      </main>
    </>
  );
}
