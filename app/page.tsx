import React from 'react';
import Script from 'next/script';
import { Sidebar } from '@/components/public/Sidebar';
import { MobileHeader } from '@/components/public/MobileHeader';
import { PulseCard } from '@/components/public/PulseCard';
import { TestimonialsSlider } from '@/components/public/TestimonialsSlider';
import { FaqAccordion } from '@/components/public/FaqAccordion';
import { ZcalEmbed } from '@/components/public/ZcalEmbed';
import { StructuredData } from '@/components/public/StructuredData';
import { GoogleAdsCertBadge, GoogleAnalyticsCertBadge, GTMCertBadge, MetaCertBadge } from '@/components/public/CertBadges';
import { db } from '@/lib/db';
import { LeadForm } from '@/components/public/LeadForm';
import { MobileCtaBar } from '@/components/public/MobileCtaBar';
import { CountUp } from '@/components/public/CountUp';
import { Reveal } from '@/components/public/Reveal';
import Link from 'next/link';
import { GrowthEcosystemHero } from '@/components/public/GrowthEcosystemHero';

export const revalidate = 60;

export async function generateMetadata() {
  try {
    const settings = await db.getSettings();
    return {
      title: `${settings?.business_name || 'WPHossain'} | ${settings?.job_title || 'Google Ads Specialist'}`,
      description: `Specialist for HVAC contractors. Search Ads, Conversion Tracking, GTM, GA4 — built to turn ad spend into booked service calls.`,
    };
  } catch (e) {
    return {
      title: 'WPHossain | Google Ads Specialist for HVAC Contractors',
      description: 'Specialist for HVAC contractors. Search Ads, Conversion Tracking, GTM, GA4 — built to turn ad spend into booked service calls.',
    };
  }
}

export default async function Home() {
  const results = await Promise.allSettled([
    db.getSettings(),
    db.getAllSections(),
    db.getBlogs(false),
    db.getCaseStudies(),
    db.getTracking(),
    db.getTestimonials()
  ]);

  const settings: any = results[0].status === 'fulfilled' && results[0].value ? results[0].value : {};
  const sections: any[] = results[1].status === 'fulfilled' && Array.isArray(results[1].value) ? results[1].value : [];
  const blogs: any[] = results[2].status === 'fulfilled' && Array.isArray(results[2].value) ? results[2].value : [];
  const caseStudies: any[] = results[3].status === 'fulfilled' && Array.isArray(results[3].value) ? results[3].value : [];
  const tracking: any = results[4].status === 'fulfilled' && results[4].value ? results[4].value : {};
  const testimonials: any[] = results[5].status === 'fulfilled' && Array.isArray(results[5].value) ? results[5].value : [];

  const findSection = (key: string) => {
    const found = sections.find((s: any) => s?.section_key === key);
    return found || { title: '', subtitle: '', content_json: {} };
  };

  const hero = findSection('hero');
  const services = findSection('services');
  const why = findSection('why');
  const process = findSection('process');
  const faq = findSection('faq');
  const resultsSection = findSection('results');
  const certsSection = findSection('certifications');

  return (
    <>
      <StructuredData faqs={faq.content_json?.faqs || []} settings={settings} />
      <Sidebar />
      <MobileHeader />
      <MobileCtaBar />

      {/* Inject Tracking Codes */}
      {tracking?.gtm_enabled && tracking?.gtm_id && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${tracking.gtm_id}');`}
        </Script>
      )}
      {tracking?.ga4_enabled && tracking?.ga4_measurement_id && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${tracking.ga4_measurement_id}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${tracking.ga4_measurement_id}');`}
          </Script>
        </>
      )}
      {tracking?.custom_head_scripts && (
        <div dangerouslySetInnerHTML={{ __html: tracking.custom_head_scripts }} />
      )}

      <main className="content min-h-screen bg-[#050f1f] pb-24 lg:pb-0">
        <div className="content-inner w-full flex flex-col">

          {/* HERO SECTION (intro band) */}
          <section 
            className="w-full bg-[#050f1f] flex items-center border-b border-white/5 relative overflow-hidden" 
            id="home"
            style={{ 
              backgroundImage: 'linear-gradient(rgba(26,115,232,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(26,115,232,0.03) 1px, transparent 1px)', 
              backgroundSize: '40px 40px' 
            }}
          >
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[radial-gradient(circle,rgba(26,115,232,0.08),transparent_70%)] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-[radial-gradient(circle,rgba(37,211,102,0.05),transparent_70%)] pointer-events-none" />

            <div className="max-w-[var(--container)] mx-auto w-full px-6 lg:px-10 py-14 lg:py-20">
              <div className="hero-grid grid grid-cols-[1.1fr_0.9fr] max-xl:grid-cols-1 gap-10 items-center">
                <div className="hero-copy animate-in fade-in slide-in-from-left-8 duration-700">
                  <span className="eyebrow inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] text-[11px] font-extrabold uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(37,211,102,0.15)]">
                    <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                    FOR HVAC CONTRACTORS
                  </span>
                  <h1 className="text-[clamp(32px,4.4vw,54px)] font-display leading-[1.08] mb-5 text-white font-bold tracking-tight">
                    {hero.title}
                  </h1>
                  <p className="text-[17px] text-[#aebcda] max-w-[620px] leading-relaxed mb-7">
                    {hero.subtitle}
                  </p>
                  <div className="hero-actions flex flex-wrap gap-4 my-6 max-sm:flex-col">
                    <a className="btn btn-primary px-8 py-4 text-[15px] font-bold rounded-xl shadow-xl shadow-[#1a73e8]/25 hover:scale-[1.02] transition-all" href="#contact">
                      Book Free Audit
                      <svg className="btn-arrow ml-2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                    </a>
                    <a className="btn btn-ghost px-8 py-4 text-[15px] font-bold rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all backdrop-blur-sm" href={`https://wa.me/${settings.whatsapp_number}`} target="_blank" rel="noopener">
                      WhatsApp Chat
                    </a>
                  </div>
                  <div className="trust-pills flex flex-wrap gap-3">
                    {(hero.content_json?.certificates || []).map((c: any, i: number) => (
                      <span key={i} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[12.5px] font-semibold text-[#aebcda] hover:border-[#1a73e8]/30 transition-all">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1a73e8]" />
                        {c.name}
                      </span>
                    ))}
                  </div>

                  {/* Compact proof strip */}
                  {(resultsSection.content_json?.stats || []).length > 0 && (
                    <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-x-8 gap-y-4">
                      {(resultsSection.content_json.stats || []).slice(0, 3).map((s: any, i: number) => (
                        <div key={i} className="flex items-center gap-2.5">
                          <strong className="text-lg font-display font-bold text-white">{s.value}</strong>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#7b8bad] leading-tight">{s.label}</span>
                        </div>
                      ))}
                      <div className="flex items-center gap-2">
                        <span className="flex gap-0.5 text-[#25D366]">
                          {[1,2,3,4,5].map(n => <svg key={n} width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>)}
                        </span>
                        <span className="text-[12px] text-[#aebcda] font-semibold">Rated by clients</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="w-full animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
                  <PulseCard />
                </div>
              </div>

              <div className="hero-certs mt-12 pt-8 border-t border-white/5">
                <span className="block text-[11px] font-extrabold tracking-[0.15em] uppercase text-[#7b8bad] mb-6">Certified &amp; Partnered with</span>
                <div className="cert-row flex flex-wrap gap-5">
                  {[
                    { label: "Google Ads", icon: <svg viewBox="0 0 24 24" width="26" height="26"><path d="M12,12 L12,3 A9,9 0 0,1 21,12 Z" fill="#4285F4"/><path d="M12,12 L12,3 A9,9 0 0,1 21,12 Z" fill="#EA4335" transform="rotate(90 12 12)"/><path d="M12,12 L12,3 A9,9 0 0,1 21,12 Z" fill="#FBBC05" transform="rotate(180 12 12)"/><path d="M12,12 L12,3 A9,9 0 0,1 21,12 Z" fill="#34A853" transform="rotate(270 12 12)"/></svg> },
                    { label: "Google Analytics", color: "#F9AB00", svg: <svg viewBox="0 0 24 24" width="14" height="14"><rect x="4" y="13" width="4" height="7" rx="1" fill="#fff"/><rect x="10" y="8" width="4" height="12" rx="1" fill="#fff"/><rect x="16" y="3" width="4" height="17" rx="1" fill="#fff"/></svg> },
                    { label: "Tag Manager", color: "#4285F4", svg: <svg viewBox="0 0 24 24" width="14" height="14"><path d="M12.5 3H6a2 2 0 0 0-2 2v6.5a2 2 0 0 0 .586 1.414l7.5 7.5a2 2 0 0 0 2.828 0l6.5-6.5a2 2 0 0 0 0-2.828l-7.5-7.5A2 2 0 0 0 12.5 3z" fill="#fff"/><circle cx="8" cy="8" r="1.6" fill="#4285F4"/></svg> },
                    { label: "WordPress", color: "#21759B", svg: <svg viewBox="0 0 24 24" width="14" height="14"><path d="M3 5l3.2 14h2.1l2.2-9 2.2 9h2.1L18 5h-2.3l-1.9 9-2-9h-1.9l-2 9-1.9-9H3z" fill="#fff"/></svg> }
                  ].map((item, idx) => (
                    <span key={idx} className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 font-bold text-[13.5px] text-[#aebcda] hover:border-white/20 transition-all">
                      <span className="flex items-center justify-center w-6 h-6 rounded-md" style={{ background: item.color || 'transparent' }}>
                        {item.icon || item.svg}
                      </span>
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Smooth transition into the ecosystem hero */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#0a1c34] opacity-60" />
            </div>
          </section>

          {/* NEW TSX HERO SECTION */}
          <GrowthEcosystemHero />

          {/* SERVICES SECTION */}
          <section className="w-full bg-[#0a1c34] border-b border-white/5" id="services">
            <div className="max-w-[var(--container)] mx-auto px-6 lg:px-10 py-20">
              <Reveal className="sec-head max-w-[720px] mb-12">
                <span className="eyebrow">Services</span>
                <h2 className="text-[clamp(28px,4vw,42px)] font-display leading-tight mb-4 text-white font-bold">
                  {services.title}
                </h2>
                <p className="text-[#aebcda] text-[17px] leading-relaxed">
                  {services.subtitle}
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="grid grid-cols-4 max-xl:grid-cols-2 max-sm:grid-cols-1 gap-5">
                {(services.content_json?.services_list || []).map((s: any, i: number) => (
                  <article key={i} className="group p-7 bg-[#050f1f]/50 border border-white/5 rounded-[28px] hover:border-[#1a73e8]/30 hover:bg-[#050f1f] transition-all duration-300 flex flex-col gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#1a73e8]/10 border border-[#1a73e8]/20 grid place-items-center text-[#4c9bff] group-hover:scale-110 transition-transform">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon} /></svg>
                    </div>
                    <div>
                      <span className="inline-block text-[10px] font-extrabold tracking-widest uppercase text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/20 px-2.5 py-1 rounded-full mb-3">{s.tag}</span>
                      <h3 className="text-[19px] mb-2 font-bold text-white font-display group-hover:text-[#4c9bff] transition-colors">{s.title}</h3>
                      <p className="text-[14px] text-[#aebcda] leading-relaxed">{s.desc}</p>
                    </div>
                  </article>
                ))}
                </div>
              </Reveal>
            </div>
          </section>

          {/* WHY ME SECTION */}
          <section className="w-full bg-[#050f1f] border-b border-white/5" id="why-me">
            <div className="max-w-[var(--container)] mx-auto px-6 lg:px-10 py-20">
              <Reveal className="sec-head max-w-[720px] mb-12">
                <span className="eyebrow">Why Me</span>
                <h2 className="text-[clamp(28px,4vw,42px)] font-display leading-tight mb-4 text-white font-bold">
                  {why.title || "A specialist who also understands the page the click lands on."}
                </h2>
                {why.subtitle && <p className="text-[#aebcda] text-[17px] leading-relaxed">{why.subtitle}</p>}
              </Reveal>
              <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-10">
                <div className="space-y-6">
                  {(why.content_json?.bullets_col1 || []).map((bullet: any, i: number) => {
                    let title = '';
                    let desc = '';
                    if (bullet && typeof bullet === 'object') {
                      title = bullet.title || bullet.name || bullet.heading || '';
                      desc = bullet.desc || bullet.text || bullet.description || bullet.content || '';
                    } else if (typeof bullet === 'string') {
                      const dotIndex = bullet.indexOf('. ');
                      if (dotIndex > -1) {
                        title = bullet.slice(0, dotIndex);
                        desc = bullet.slice(dotIndex + 2);
                      } else {
                        title = bullet;
                      }
                    } else {
                      title = String(bullet || '');
                    }
                    return (
                      <div key={i} className="flex gap-5 p-6 rounded-3xl border border-white/5 bg-[#0a1c34]/30 hover:border-[#1a73e8]/20 transition-all duration-300">
                        <div className="w-12 h-12 rounded-2xl bg-[#1a73e8]/10 text-[#4c9bff] flex items-center justify-center font-bold flex-none shadow-inner">✓</div>
                        <div>
                          <h3 className="text-[18px] font-bold text-white mb-2 font-display">{title}</h3>
                          {desc && <p className="text-[14.5px] text-[#aebcda] leading-relaxed">{desc}</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="space-y-6">
                  {(why.content_json?.bullets_col2 || []).map((bullet: any, i: number) => {
                    let title = '';
                    let desc = '';
                    if (bullet && typeof bullet === 'object') {
                      title = bullet.title || bullet.name || bullet.heading || '';
                      desc = bullet.desc || bullet.text || bullet.description || bullet.content || '';
                    } else if (typeof bullet === 'string') {
                      const dotIndex = bullet.indexOf('. ');
                      if (dotIndex > -1) {
                        title = bullet.slice(0, dotIndex);
                        desc = bullet.slice(dotIndex + 2);
                      } else {
                        title = bullet;
                      }
                    } else {
                      title = String(bullet || '');
                    }
                    return (
                      <div key={i} className="flex gap-5 p-6 rounded-3xl border border-white/5 bg-[#0a1c34]/30 hover:border-[#25D366]/20 transition-all duration-300">
                        <div className="w-12 h-12 rounded-2xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center font-bold flex-none shadow-inner">✓</div>
                        <div>
                          <h3 className="text-[18px] font-bold text-white mb-2 font-display">{title}</h3>
                          {desc && <p className="text-[14.5px] text-[#aebcda] leading-relaxed">{desc}</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* CASE STUDIES SECTION */}
          <section className="w-full bg-[#050f1f] border-b border-white/5" id="case-studies">
            <div className="max-w-[var(--container)] mx-auto px-6 lg:px-10 py-20">
              <Reveal className="sec-head max-w-[720px] mb-12 flex justify-between items-end gap-6 max-sm:flex-col max-sm:items-start">
                <div>
                  <span className="eyebrow">Case Studies</span>
                  <h2 className="text-[clamp(28px,4vw,42px)] font-display leading-tight text-white font-bold">
                    Real accounts, real fixes — client results.
                  </h2>
                </div>
              </Reveal>
              <div className="grid grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 gap-7">
                {caseStudies.map((c: any, i: number) => (
                  <article key={i} className="group flex flex-col bg-[#0a1c34]/50 border border-white/5 rounded-[32px] p-8 hover:border-[#1a73e8]/30 transition-all hover:-translate-y-1 duration-300">
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-[11px] font-extrabold tracking-widest uppercase text-[#4c9bff] bg-[#1a73e8]/10 px-3 py-1 rounded-full">{c.client_niche}</span>
                    </div>
                    <div className="space-y-6 flex-1">
                      <div className="space-y-2">
                        <span className="text-[10px] font-extrabold tracking-wider uppercase text-[#7b8bad]">The Challenge</span>
                        <p className="text-[14.5px] text-[#aebcda] leading-relaxed line-clamp-3">{c.challenge}</p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-[10px] font-extrabold tracking-wider uppercase text-[#7b8bad]">The Strategy</span>
                        <p className="text-[14.5px] text-[#aebcda] leading-relaxed line-clamp-3">{c.strategy}</p>
                      </div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-white/5">
                      <span className="text-[10px] font-extrabold tracking-wider uppercase text-[#25D366] block mb-2">Final Result</span>
                      <p className="text-[16px] font-display font-bold text-white leading-tight mb-4">{c.result_summary}</p>
                      <Link href={`/case-studies/${c.slug}`} className="inline-flex items-center gap-2 text-[14px] font-bold text-[#4c9bff] group/link hover:underline">
                        View Case Study <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* PROCESS SECTION */}
          <section className="w-full bg-[#0a1c34] border-b border-white/5" id="process">
            <div className="max-w-[var(--container)] mx-auto px-6 lg:px-10 py-20">
              <Reveal className="sec-head max-w-[720px] mb-16">
                <span className="eyebrow">Process</span>
                <h2 className="text-[clamp(28px,4vw,42px)] font-display leading-tight mb-4 text-white font-bold">
                  {process.title}
                </h2>
              </Reveal>
              <div className="relative">
                {/* Visual Connection Line */}
                <div className="absolute top-7 left-0 right-0 h-0.5 bg-gradient-to-r from-[#1a73e8] to-transparent max-md:hidden opacity-20" />
                <div className="grid grid-cols-5 gap-8 max-xl:grid-cols-2 max-md:grid-cols-1 relative z-10">
                  {(process.content_json?.steps || []).map((p: any, i: number) => (
                    <div key={i} className="group">
                      <div className="w-14 h-14 rounded-2xl bg-[#050f1f] border-2 border-[#1a73e8]/30 text-white font-display font-bold text-xl grid place-items-center mb-6 group-hover:bg-[#1a73e8] group-hover:border-[#1a73e8] transition-all duration-300 shadow-xl">
                        {p.num}
                      </div>
                      <h3 className="text-[19px] font-bold text-white mb-3 font-display group-hover:text-[#4c9bff] transition-colors">{p.title}</h3>
                      <p className="text-[14.5px] text-[#aebcda] leading-relaxed">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* RESULTS SECTION */}
          <section className="w-full bg-[#0a1c34] border-b border-white/5" id="results">
            <div className="max-w-[var(--container)] mx-auto px-6 lg:px-10 py-20">
              <Reveal className="sec-head max-w-[720px] mb-12">
                <span className="eyebrow">Performance</span>
                <h2 className="text-[clamp(28px,4vw,42px)] font-display leading-tight mb-4 text-white font-bold">
                  {resultsSection.title}
                </h2>
                <p className="text-[#aebcda] text-[17px] leading-relaxed">
                  {resultsSection.subtitle}
                </p>
              </Reveal>
              <div className="grid grid-cols-4 max-xl:grid-cols-2 max-sm:grid-cols-1 gap-6">
                {(resultsSection.content_json?.stats || []).map((stat: any, i: number) => (
                  <div key={i} className="p-8 rounded-[32px] border border-white/5 bg-[#050f1f]/60 hover:border-white/10 transition-all group overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-24 h-24 blur-3xl opacity-10 transition-opacity group-hover:opacity-20" style={{ background: stat.color }} />
                    <CountUp value={stat.value} className="block text-5xl font-display font-bold text-white mb-2 tracking-tight tabular-nums" />
                    <span className="text-[13px] font-bold uppercase tracking-widest block mb-3" style={{ color: stat.color }}>{stat.label}</span>
                    <p className="text-[14px] text-[#aebcda] leading-relaxed">{stat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* BLOG FEED SECTION */}
          <section className="w-full bg-[#050f1f] border-b border-white/5" id="blog">
            <div className="max-w-[var(--container)] mx-auto px-6 lg:px-10 py-20">
              <Reveal className="sec-head max-w-[720px] mb-12 flex justify-between items-end gap-6 max-sm:flex-col max-sm:items-start">
                <div>
                  <span className="eyebrow">Insights</span>
                  <h2 className="text-[clamp(28px,4vw,42px)] font-display leading-tight text-white font-bold">
                    Latest HVAC PPC Articles
                  </h2>
                </div>
                <Link href="/blog" className="text-[14px] font-bold text-[#4c9bff] hover:underline flex items-center gap-1">
                  View All Insights <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </Link>
              </Reveal>
              <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1">
                {blogs.slice(0, 2).map((post: any) => (
                  <article key={post.id} className="group bg-[#0a1c34]/40 border border-white/5 rounded-[32px] p-8 hover:border-[#1a73e8]/20 transition-all flex flex-col gap-6">
                    <div>
                      <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/20 px-3 py-1 rounded-full mb-5">{post.category || 'Strategy Guide'}</span>
                      <h3 className="text-2xl font-display font-bold text-white mb-3 leading-tight group-hover:text-[#4c9bff] transition-colors">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <p className="text-[15px] text-[#aebcda] line-clamp-2 leading-relaxed">{post.excerpt}</p>
                    </div>
                    <Link href={`/blog/${post.slug}`} className="text-[14px] font-bold text-[#4c9bff] flex items-center gap-2 group/btn mt-auto">
                      Read Full Article <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* TESTIMONIALS SECTION */}
          <section className="w-full bg-[#0a1c34] border-b border-white/5" id="testimonials">
            <div className="max-w-[var(--container)] mx-auto px-6 lg:px-10 py-20">
              <Reveal className="sec-head max-w-[720px] mb-16 text-center mx-auto">
                <span className="eyebrow mx-auto">Testimonials</span>
                <h2 className="text-[clamp(28px,4vw,42px)] font-display leading-tight mb-4 text-white font-bold">
                  What clients say — once the calls start coming in.
                </h2>
              </Reveal>
              <TestimonialsSlider testimonials={testimonials} />
            </div>
          </section>

          {/* CERTIFICATIONS SECTION */}
          <section className="w-full bg-[#050f1f] border-b border-white/5" id="certifications">
            <div className="max-w-[var(--container)] mx-auto px-6 lg:px-10 py-20">
              <Reveal className="sec-head max-w-[720px] mb-12">
                <span className="eyebrow">Certifications</span>
                <h2 className="text-[clamp(28px,4vw,42px)] font-display leading-tight mb-4 text-white font-bold">
                  {certsSection.title}
                </h2>
              </Reveal>
              <div className="grid grid-cols-4 max-xl:grid-cols-2 max-sm:grid-cols-1 gap-5">
                {(certsSection.content_json?.certs || []).map((cert: any, i: number) => (
                  <div key={i} className="group relative bg-white rounded-3xl p-8 h-40 flex items-center justify-center overflow-hidden border border-white/5 shadow-xl transition-all hover:scale-[1.02]">
                    {cert.badge_type === 'google-ads' && <GoogleAdsCertBadge />}
                    {cert.badge_type === 'google-analytics' && <GoogleAnalyticsCertBadge />}
                    {cert.badge_type === 'tag-manager' && <GTMCertBadge />}
                    {cert.badge_type === 'meta' && <MetaCertBadge />}
                    {!['google-ads', 'google-analytics', 'tag-manager', 'meta'].includes(cert.badge_type) && (
                      <div className="text-[#050f1f] font-display font-bold text-xl">{cert.title}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ SECTION */}
          <section className="w-full bg-[#0a1c34] border-b border-white/5" id="faq">
            <div className="max-w-[var(--container)] mx-auto px-6 lg:px-10 py-20">
              <Reveal className="sec-head max-w-[720px] mb-12">
                <span className="eyebrow">FAQ</span>
                <h2 className="text-[clamp(28px,4vw,42px)] font-display leading-tight mb-4 text-white font-bold">
                  {faq.title}
                </h2>
              </Reveal>
              <FaqAccordion />
            </div>
          </section>

          {/* CONTACT & BOOKING SECTION */}
          <section className="w-full bg-[#050f1f] border-b border-white/5" id="contact">
            <div className="max-w-[var(--container)] mx-auto px-6 lg:px-10 py-20">
              <Reveal className="sec-head max-w-[720px] mb-16">
                <span className="eyebrow">Book a Call</span>
                <h2 className="text-[clamp(28px,4vw,42px)] font-display leading-tight mb-4 text-white font-bold">
                  Book a free Google Ads audit.
                </h2>
                <p className="text-[#aebcda] text-[17px]">Select a time that works for you. I&apos;ll prepare a custom review of your current setup before we talk.</p>
              </Reveal>

              <div className="flex gap-10 max-xl:flex-col items-start">
                {/* Zcal Embed */}
                <div className="flex-[0.65] w-full rounded-[32px] overflow-hidden border border-white/5 shadow-2xl bg-[#0a1c34]/30 p-2">
                  <ZcalEmbed />
                </div>
                
                {/* What to Expect */}
                <div className="flex-[0.35] w-full space-y-4">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#7b8bad] block mb-6">What to expect on the call</span>
                  {[
                    { title: "Campaign Audit", desc: "A focused review of your actual search term quality and lead flow." },
                    { title: "Structure Check", desc: "Feedback on campaign segmentation and search intent mapping." },
                    { title: "Tracking Review", desc: "Detailed check on call-swap and form tracking attribution quality." },
                    { title: "Landing Page CRO", desc: "Actionable observations for better conversion rate optimization." },
                    { title: "Next Steps Plan", desc: "A clear, no-fluff action plan for account growth and better ROI." }
                  ].map((item, i) => (
                    <div key={i} className="p-5 rounded-2xl border border-white/5 bg-[#0a1c34]/40 flex flex-col gap-2 hover:bg-[#0a1c34]/60 transition-all group">
                      <span className="text-[10px] font-extrabold text-[#25D366] uppercase tracking-[0.1em] group-hover:translate-x-1 transition-transform inline-block">0{i+1}. {item.title}</span>
                      <p className="text-[13px] text-[#aebcda] leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SOCIAL & FOOTER FORM SECTION */}
          <section className="w-full bg-[#0a1c34] border-b border-white/5">
            <div className="max-w-[var(--container)] mx-auto px-6 lg:px-10 py-20">
              <div className="grid grid-cols-[0.4fr_0.6fr] max-xl:grid-cols-1 gap-16 items-start">
                
                <div className="space-y-10">
                  <div>
                    <h2 className="text-4xl font-display font-bold text-white mb-4 leading-tight">Let&apos;s Connect</h2>
                    <p className="text-[#aebcda] text-[16px] leading-relaxed">Reach out via email or LinkedIn for networking, questions, or custom project requests.</p>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      {label:"Work Email",sub:settings.email,href:`mailto:${settings.email}`, icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"},
                      {label:"WhatsApp",sub:"Message directly",href:`https://wa.me/${settings.whatsapp_number}`, icon: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.05-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-2.078l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.87 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.135-1.61a11.783 11.783 0 005.912 1.61h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"},
                      {label:"LinkedIn",sub:"/in/wphossain",href:settings.linkedin_url, icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"},
                      {label:"Facebook",sub:"/wphossain374",href:"https://facebook.com/wphossain374", icon: "M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.16 8.44 9.94v-7.03H7.9v-2.91h2.54V9.86c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46H15.2c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22c4.78-.78 8.43-4.94 8.43-9.94z"},
                      {label:"YouTube",sub:"@wphossain",href:"https://youtube.com/@wphossain", icon: "M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.56a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.6 15.6V8.4l6.4 3.6-6.4 3.6z"}
                    ].map((l,i) => (
                      <a key={i} className="flex items-center gap-5 p-5 rounded-[24px] border border-white/5 bg-[#050f1f]/60 hover:border-[#25D366]/30 hover:bg-[#050f1f] transition-all group" href={l.href} target="_blank" rel="noopener">
                        <div className="w-12 h-12 rounded-2xl grid place-items-center bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] group-hover:scale-110 transition-transform">
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={l.icon} /></svg>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[15px] text-white font-bold">{l.label}</span>
                          <span className="text-[13px] text-[#7b8bad]">{l.sub}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                <LeadForm />
              </div>
            </div>
          </section>

          <footer className="site-footer bg-[#050f1f] text-center text-[13px] text-[#7b8bad] py-12 border-t border-white/5">
            <div className="max-w-[var(--container)] mx-auto px-6 lg:px-10">
              <p><strong className="text-[#aebcda]">{settings.business_name}</strong> — {settings.owner_name}, {settings.job_title}. © 2026. Specialized for local service businesses.</p>
            </div>
          </footer>

        </div>
      </main>

      {/* Floating WhatsApp Button */}
      <a className="floating-wa fixed right-6 bottom-24 lg:bottom-6 z-50 w-15 h-15 rounded-full grid place-items-center bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white shadow-2xl hover:scale-110 transition-all active:scale-95 group" href={`https://wa.me/${settings.whatsapp_number}`} target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
        <span className="floating-wa-ring absolute inset-0 rounded-full border-2 border-[#25D366] animate-[wa-pulse_2s_ease-out_infinite]" />
        <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" className="relative z-10">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.05-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-2.078l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.87 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.135-1.61a11.783 11.783 0 005.912 1.61h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      <Script src="https://static.zcal.co/embed/v1/embed.js" strategy="lazyOnload" />

      {/* Custom Body Scripts Injection */}
      {tracking?.custom_body_scripts && (
        <div dangerouslySetInnerHTML={{ __html: tracking.custom_body_scripts }} />
      )}
    </>
  );
}