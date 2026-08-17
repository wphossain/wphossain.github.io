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
import { ServiceGrid } from '@/components/public/ServiceGrid';
import { WhyMeGrid } from '@/components/public/WhyMeGrid';

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
      <Sidebar 
        ownerName={settings.owner_name} 
        jobTitle={settings.job_title} 
        avatarUrl={settings.avatar_url} 
        email={settings.email} 
        ctaText={settings.global_cta_text} 
      />
      <MobileHeader 
        ownerName={settings.owner_name} 
        jobTitle={settings.job_title} 
        avatarUrl={settings.avatar_url} 
        email={settings.email} 
        ctaText={settings.global_cta_text} 
      />
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

      <main className="content min-h-screen bg-[#F8FAFC] pb-24 lg:pb-0">
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
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[radial-gradient(circle,rgba(37,99,235,0.08),transparent_70%)] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-[radial-gradient(circle,rgba(37,211,102,0.05),transparent_70%)] pointer-events-none" />

            <div className="max-w-[var(--container)] mx-auto w-full px-6 lg:px-10 py-14 lg:py-20">
              <div className="hero-grid grid grid-cols-[1.1fr_0.9fr] max-xl:grid-cols-1 gap-10 items-stretch">
                <div className="hero-copy flex flex-col justify-between h-full animate-in fade-in slide-in-from-left-8 duration-700">
                  <div>
                    <span className="eyebrow inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] text-[11px] font-extrabold uppercase tracking-widest mb-7 shadow-[0_0_15px_rgba(37,211,102,0.15)]">
                      <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                      {hero.content_json?.eyebrow_text || 'Available For New Clients'}
                    </span>
                    <h1 className="text-[clamp(32px,4.4vw,54px)] font-display leading-[1.08] mb-6 text-white font-bold tracking-tight">
                      {hero.title}
                    </h1>
                    <p className="text-[17px] text-[#aebcda] max-w-[620px] leading-relaxed mb-8">
                      {hero.subtitle}
                    </p>
                    <div className="hero-actions flex flex-wrap gap-4 mt-12 mb-2.5 max-sm:flex-col">
                      <a className="btn btn-primary px-8 py-4 text-[15px] font-bold rounded-xl shadow-xl shadow-[#2563EB]/25 animate-double-pulse transition-all relative overflow-hidden" href={hero.content_json?.cta_primary?.link || "#contact"}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        {hero.content_json?.cta_primary?.text || 'Book Free Strategy Call'}
                      </a>
                      <a className="btn btn-ghost px-8 py-4 text-[15px] font-bold rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all backdrop-blur-sm flex items-center gap-2" href={hero.content_json?.cta_secondary?.link || "#portfolio"}>
                        <span>{hero.content_json?.cta_secondary?.text || 'View Results'}</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                      </a>
                    </div>
                    <p className="text-[12.5px] text-[#7b8bad] font-medium tracking-tight">
                      {hero.content_json?.cta_note || 'Free · No commitment · 15-min call'}
                    </p>
                  </div>

                  <div className="mt-auto pt-4">
                    <div className="trust-pills flex flex-wrap gap-3 mb-6">
                      {(hero.content_json?.certificates || []).map((c: any, i: number) => (
                        <span key={i} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[12.5px] font-semibold text-[#aebcda] hover:border-[#2563EB]/40 transition-all">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                          {c.name}
                        </span>
                      ))}
                    </div>

                    {/* Rated by clients / Trusted by businesses block */}
                    <div>
                      <a href={hero.content_json?.trusted_block?.link || "#testimonials"} className="inline-flex items-center gap-3.5 group/rated hover:opacity-90 transition-all bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl w-full sm:w-auto">
                         <img src={hero.content_json?.trusted_block?.avatar_image_url || "/images/client-avatars.png"} alt="Happy Clients" className="h-8 w-auto object-contain shrink-0" />
                         <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                               <div className="flex gap-0.5 text-[#25D366]">
                                  {[1,2,3,4,5].map(n => <svg key={n} width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>)}
                               </div>
                               <span className="text-[12px] text-[#aebcda]">{hero.content_json?.trusted_block?.rating_text || 'Rated 5.0'}</span>
                            </div>
                            <span className="text-[13px] text-white font-bold tracking-tight">Trusted by <strong className="text-[#25D366]">{hero.content_json?.trusted_block?.trust_text || '75+ businesses'}</strong> worldwide</span>
                         </div>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right Column: Pulse Card Standalone Box + Partner Logos directly below */}
                <div className="w-full flex flex-col gap-5 animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
                  <PulseCard content={hero.content_json?.niche_tabs} />

                  {/* Certified & Partnered with section moved to right panel directly below ad-preview card */}
                  <div className="hero-certs pt-2">
                    <span className="block text-[11px] font-extrabold tracking-[0.15em] uppercase text-[#7b8bad] mb-3">Certified &amp; Partnered with</span>
                    <div className="cert-row flex flex-wrap gap-2.5">
                      {[
                        { label: "Google Ads", icon: <svg viewBox="0 0 24 24" width="22" height="22"><path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.44 1.76 4.44 1.76l2.04-2.1S16.46 2 12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c7.06 0 10-4.95 10-10 0-.67-.04-1.35-.65-.9z" fill="#4285F4"/></svg>, color: "rgba(66, 133, 244, 0.1)" },
                        { label: "Google Analytics", color: "rgba(249, 171, 0, 0.1)", svg: <svg viewBox="0 0 24 24" width="14" height="14"><rect x="4" y="13" width="4" height="7" rx="1" fill="#F9AB00"/><rect x="10" y="8" width="4" height="12" rx="1" fill="#F9AB00"/><rect x="16" y="3" width="4" height="17" rx="1" fill="#F9AB00"/></svg> },
                        { label: "Tag Manager", color: "rgba(66, 133, 244, 0.1)", svg: <svg viewBox="0 0 24 24" width="14" height="14"><path d="M12.5 3H6a2 2 0 0 0-2 2v6.5a2 2 0 0 0 .586 1.414l7.5 7.5a2 2 0 0 0 2.828 0l6.5-6.5a2 2 0 0 0 0-2.828l-7.5-7.5A2 2 0 0 0 12.5 3z" fill="#4285F4"/><circle cx="8" cy="8" r="1.6" fill="#fff"/></svg> },
                        { label: "WordPress", color: "rgba(33, 117, 155, 0.1)", svg: <svg viewBox="0 0 24 24" width="20" height="20" fill="#21759B"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.12 17.55c-2.07 0-3.95-.73-5.43-1.95l2.67-7.75c.21-.57.36-1 .36-1 0-.12-.06-.21-.21-.21-.06 0-.6.09-.9.09h-.18l.12-.48.9-.03c.57-.03 1.23-.03 1.23-.03l.93.03.48.03-.12.48c-.09 0-.21 0-.39 0-.24 0-.48.06-.63.24-.15.21-.24.48-.36.87l-2.04 6 1.35-4.11 1.29 3.63zm3.72-3.12c1-.48 1.68-1.5 1.68-2.61 0-.78-.36-1.53-1.02-2.1-.66-.57-1.32-.81-1.32-.81 0-.09.09-.15.18-.15.15 0 .39.03.6.03.66 0 1.23-.09 1.23-.09l-.12-.48c-.36-.03-1.11-.03-1.11-.03l-1.05.03c-.27 0-.54.03-.84.03-.42 0-1.11-.03-1.11-.03l.12.48s.51.03.78.03c.36 0 .57.18.57.57 0 .21-.09.48-.21.84l-2.04 6c-.03.09-.06.18-.06.27l1.98-5.76 1.95 5.82s.06-.06.12-.12c.24-.24.36-.63.36-1.05zm1.5-6.6c.15-.12.27-.12.42-.12.42 0 .81.24.81.63 0 .12 0 .24-.06.33-.18.54-.42.93-.42.93s-.36.21-.84.21c-.42 0-.69-.15-.84-.15s-.27.06-.27.06-.18.24-.24.33c-.15.21-.27.42-.27.42l-.57 1.65c-.09.24-.21.57-.21.87 0 .39.15.69.45.69.18 0 .42-.06.42-.06l.12-.48s-.15.03-.24.03c-.12 0-.21-.06-.21-.21s.03-.18.09-.33l.42-1.11 1.14-3.3c.03-.09.09-.12.18-.12zm-9.06 9.3c-2.43-1.44-4.05-4.14-4.05-7.23 0-.63.15-1.23.39-1.77L8.28 18.21z"/></svg> }
                      ].map((item, idx) => (
                        <span key={idx} className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 font-bold text-[12px] text-[#aebcda] hover:border-white/20 transition-all" style={{ background: item.color || 'transparent' }}>
                          <span className="flex items-center justify-center w-5 h-5 rounded-md shrink-0">
                            {item.icon || item.svg}
                          </span>
                          {item.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Full-width thin 4-stat strip at the bottom of hero section */}
              <div className="mt-10 lg:mt-12 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
                {(hero.content_json?.hero_stats || [
                  { value: "$2.4M+", label: "Total Ad Spend Managed" },
                  { value: "42%", label: "Avg. CPL Reduction", highlight: true },
                  { value: "180+", label: "Campaigns Managed" },
                  { value: "94%", label: "Client Retention" }
                ]).map((stat: any, idx: number) => (
                  <div key={idx} className={`flex flex-col items-center text-center px-4 ${idx !== 3 ? 'md:border-r md:border-white/10' : ''}`}>
                    <strong className={`font-display text-[28px] lg:text-[34px] font-extrabold tracking-tight leading-none mb-1.5 ${stat.highlight ? 'text-[#25D366]' : 'text-white'}`}>
                      {stat.value}
                    </strong>
                    <span className="text-[11px] lg:text-[12px] font-extrabold uppercase tracking-wider text-[#7b8bad]">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Smooth transition into the ecosystem hero */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#050f1f] opacity-60" />
            </div>
          </section>

          {/* NEW TSX HERO SECTION */}
          <GrowthEcosystemHero />

          {/* SERVICES SECTION */}
          <section className="w-full bg-[#F8FAFC] border-b border-[#E2E8F0]" id="services">
            <div className="max-w-[var(--container)] mx-auto px-6 lg:px-10 py-20">
              <Reveal className="sec-head max-w-[720px] mb-12">
                <span className="eyebrow">Services</span>
                <h2 className="text-[clamp(28px,4vw,42px)] font-display leading-tight mb-4 text-[#1E293B] font-bold">
                  Google Ads for Local Service Businesses
                </h2>
                <p className="text-[#475569] text-[17px] leading-relaxed">
                  {services.subtitle || 'HVAC, plumbing, roofing, electrical, landscaping, and other local home services — built to turn paid search into booked service calls.'}
                </p>
              </Reveal>
              <ServiceGrid items={services.content_json?.services_list || []} />
            </div>
          </section>

          {/* WHY ME SECTION */}
          <section className="w-full bg-[#F8FAFC] border-b border-[#E2E8F0]" id="why-me">
            <div className="max-w-[var(--container)] mx-auto px-6 lg:px-10 py-20">
              <WhyMeGrid 
                title={why.title}
                subtitle={why.subtitle}
                eyebrow={why.content_json?.eyebrow}
                cards={why.content_json?.cards}
              />
            </div>
          </section>

          {/* PORTFOLIO SECTION */}
          <section className="w-full bg-[#F8FAFC] border-b border-[#E2E8F0]" id="portfolio">
            <div className="max-w-[var(--container)] mx-auto px-6 lg:px-10 py-20">
              <Reveal className="sec-head max-w-[720px] mb-12 flex justify-between items-end gap-6 max-sm:flex-col max-sm:items-start">
                <div>
                  <span className="eyebrow">Portfolio</span>
                  <h2 className="text-[clamp(28px,4vw,42px)] font-display leading-tight text-[#1E293B] font-bold">
                    Real accounts, real fixes — client results.
                  </h2>
                </div>
              </Reveal>
              <div className="grid grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 gap-7">
                {caseStudies.map((c: any, i: number) => (
                  <article key={i} className="group flex flex-col bg-white border border-[#E2E8F0] shadow-sm rounded-[32px] p-8 hover:border-[#2563EB]/40 hover:shadow-md transition-all hover:-translate-y-1 duration-300">
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-[11px] font-extrabold tracking-widest uppercase text-[#2563EB] bg-[#2563EB]/10 px-3 py-1 rounded-full">{c.client_niche}</span>
                    </div>
                    <div className="space-y-6 flex-1">
                      <div className="space-y-2">
                        <span className="text-[10px] font-extrabold tracking-wider uppercase text-[#64748B]">The Challenge</span>
                        <p className="text-[14.5px] text-[#475569] leading-relaxed line-clamp-3">{c.challenge}</p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-[10px] font-extrabold tracking-wider uppercase text-[#64748B]">The Strategy</span>
                        <p className="text-[14.5px] text-[#475569] leading-relaxed line-clamp-3">{c.strategy}</p>
                      </div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-[#E2E8F0]">
                      <span className="text-[10px] font-extrabold tracking-wider uppercase text-[#25D366] block mb-2">Final Result</span>
                      <p className="text-[16px] font-display font-bold text-[#1E293B] leading-tight mb-4">{c.result_summary}</p>
                      <Link href={`/portfolio/${c.slug}`} className="inline-flex items-center gap-2 text-[14px] font-bold text-[#2563EB] group/link hover:underline">
                        View Portfolio <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* PROCESS SECTION */}
          <section className="w-full bg-[#F8FAFC] border-b border-[#E2E8F0]" id="process">
            <div className="max-w-[var(--container)] mx-auto px-6 lg:px-10 py-20">
              <Reveal className="sec-head max-w-[720px] mb-16">
                <span className="eyebrow">Process</span>
                <h2 className="text-[clamp(28px,4vw,42px)] font-display leading-tight mb-4 text-[#1E293B] font-bold">
                  {process.title}
                </h2>
              </Reveal>
              <div className="relative">
                {/* Visual Connection Line */}
                <div className="absolute top-7 left-0 right-0 h-0.5 bg-gradient-to-r from-[#2563EB]/40 to-transparent max-md:hidden opacity-40" />
                <div className="grid grid-cols-5 gap-8 max-xl:grid-cols-2 max-md:grid-cols-1 relative z-10">
                  {(process.content_json?.steps || []).map((p: any, i: number) => (
                    <div key={i} className="group">
                      <div className="w-14 h-14 rounded-2xl bg-white border-2 border-[#2563EB]/30 text-[#2563EB] font-display font-bold text-xl grid place-items-center mb-6 group-hover:bg-[#2563EB] group-hover:text-white group-hover:border-[#2563EB] transition-all duration-300 shadow-sm">
                        {p.num}
                      </div>
                      <h3 className="text-[19px] font-bold text-[#1E293B] mb-3 font-display group-hover:text-[#2563EB] transition-colors">{p.title}</h3>
                      <p className="text-[14.5px] text-[#475569] leading-relaxed">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* RESULTS SECTION */}
          <section className="w-full bg-[#F8FAFC] border-b border-[#E2E8F0]" id="results">
            <div className="max-w-[var(--container)] mx-auto px-6 lg:px-10 py-20">
              <Reveal className="sec-head max-w-[720px] mb-12">
                <span className="eyebrow">Performance</span>
                <h2 className="text-[clamp(28px,4vw,42px)] font-display leading-tight mb-4 text-[#1E293B] font-bold">
                  {resultsSection.title}
                </h2>
                <p className="text-[#475569] text-[17px] leading-relaxed">
                  {resultsSection.subtitle}
                </p>
              </Reveal>
              <div className="grid grid-cols-4 max-xl:grid-cols-2 max-sm:grid-cols-1 gap-6">
                {(resultsSection.content_json?.stats || []).map((stat: any, i: number) => (
                  <div key={i} className="p-8 rounded-[32px] border border-[#E2E8F0] bg-white shadow-sm hover:shadow-md hover:border-slate-300 transition-all group overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-24 h-24 blur-3xl opacity-10 transition-opacity group-hover:opacity-20" style={{ background: stat.color }} />
                    <CountUp value={stat.value} className="block text-5xl font-display font-bold text-[#1E293B] mb-2 tracking-tight tabular-nums" />
                    <span className="text-[13px] font-bold uppercase tracking-widest block mb-3" style={{ color: stat.color }}>{stat.label}</span>
                    <p className="text-[14px] text-[#475569] leading-relaxed">{stat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* BLOG FEED SECTION */}
          <section className="w-full bg-[#F8FAFC] border-b border-[#E2E8F0]" id="blog">
            <div className="max-w-[var(--container)] mx-auto px-6 lg:px-10 py-20">
              <Reveal className="sec-head max-w-[720px] mb-12 flex justify-between items-end gap-6 max-sm:flex-col max-sm:items-start">
                <div>
                  <span className="eyebrow">Insights</span>
                  <h2 className="text-[clamp(28px,4vw,42px)] font-display leading-tight text-[#1E293B] font-bold">
                    Latest HVAC PPC Articles
                  </h2>
                </div>
                <Link href="/blog" className="text-[14px] font-bold text-[#2563EB] hover:underline flex items-center gap-1">
                  View All Insights <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </Link>
              </Reveal>
              <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1">
                {blogs.slice(0, 2).map((post: any) => (
                  <article key={post.id} className="group bg-white border border-[#E2E8F0] shadow-sm rounded-[32px] p-8 hover:border-[#2563EB]/30 hover:shadow-md transition-all flex flex-col gap-6">
                    <div>
                      <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/20 px-3 py-1 rounded-full mb-5">{post.category || 'Strategy Guide'}</span>
                      <h3 className="text-2xl font-display font-bold text-[#1E293B] mb-3 leading-tight group-hover:text-[#2563EB] transition-colors">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <p className="text-[15px] text-[#475569] line-clamp-2 leading-relaxed">{post.excerpt}</p>
                    </div>
                    <Link href={`/blog/${post.slug}`} className="text-[14px] font-bold text-[#2563EB] flex items-center gap-2 group/btn mt-auto">
                      Read Full Article <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* TESTIMONIALS SECTION */}
          <section className="w-full bg-[#F8FAFC] border-b border-[#E2E8F0]" id="testimonials">
            <div className="max-w-[var(--container)] mx-auto px-6 lg:px-10 py-20">
              <Reveal className="sec-head max-w-[720px] mb-16 text-center mx-auto">
                <span className="eyebrow mx-auto">Testimonials</span>
                <h2 className="text-[clamp(28px,4vw,42px)] font-display leading-tight mb-4 text-[#1E293B] font-bold">
                  What clients say — once the calls start coming in.
                </h2>
              </Reveal>
              <TestimonialsSlider testimonials={testimonials} />
            </div>
          </section>

          {/* CERTIFICATIONS SECTION */}
          <section className="w-full bg-[#F8FAFC] border-b border-[#E2E8F0]" id="certifications">
            <div className="max-w-[var(--container)] mx-auto px-6 lg:px-10 py-20">
              <Reveal className="sec-head max-w-[720px] mb-12">
                <span className="eyebrow">Certifications</span>
                <h2 className="text-[clamp(28px,4vw,42px)] font-display leading-tight mb-4 text-[#1E293B] font-bold">
                  {certsSection.title}
                </h2>
              </Reveal>
              <div className="grid grid-cols-4 max-xl:grid-cols-2 max-sm:grid-cols-1 gap-5">
                {(certsSection.content_json?.certs || []).map((cert: any, i: number) => (
                  <div key={i} className="group relative bg-white rounded-3xl p-8 h-40 flex items-center justify-center overflow-hidden border border-[#E2E8F0] shadow-sm transition-all hover:shadow-md hover:scale-[1.02]">
                    {cert.badge_type === 'google-ads' && <GoogleAdsCertBadge />}
                    {cert.badge_type === 'google-analytics' && <GoogleAnalyticsCertBadge />}
                    {cert.badge_type === 'tag-manager' && <GTMCertBadge />}
                    {cert.badge_type === 'meta' && <MetaCertBadge />}
                    {!['google-ads', 'google-analytics', 'tag-manager', 'meta'].includes(cert.badge_type) && (
                      <div className="text-[#1E293B] font-display font-bold text-xl">{cert.title}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ SECTION */}
          <section className="w-full bg-[#F8FAFC] border-b border-[#E2E8F0]" id="faq">
            <div className="max-w-[var(--container)] mx-auto px-6 lg:px-10 py-20">
              <Reveal className="sec-head max-w-[720px] mb-12">
                <span className="eyebrow">FAQ</span>
                <h2 className="text-[clamp(28px,4vw,42px)] font-display leading-tight mb-4 text-[#1E293B] font-bold">
                  {faq.title}
                </h2>
              </Reveal>
              <FaqAccordion />
            </div>
          </section>

          {/* CONTACT & BOOKING SECTION */}
          <section className="w-full bg-[#F8FAFC] border-b border-[#E2E8F0]" id="contact">
            <div className="max-w-[var(--container)] mx-auto px-6 lg:px-10 py-20">
              <Reveal className="sec-head max-w-[720px] mb-16">
                <span className="eyebrow">Book a Call</span>
                <h2 className="text-[clamp(28px,4vw,42px)] font-display leading-tight mb-4 text-[#1E293B] font-bold">
                  Book a free Google Ads audit.
                </h2>
                <p className="text-[#475569] text-[17px]">Select a time that works for you. I&apos;ll prepare a custom review of your current setup before we talk.</p>
              </Reveal>

              <div className="flex gap-10 max-xl:flex-col items-start">
                {/* Zcal Embed */}
                <div className="flex-[0.65] w-full rounded-[32px] overflow-hidden border border-[#E2E8F0] shadow-md bg-white p-2">
                  <ZcalEmbed />
                </div>
                
                {/* What to Expect */}
                <div className="flex-[0.35] w-full space-y-4">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#64748B] block mb-6">What to expect on the call</span>
                  {[
                    { title: "Campaign Audit", desc: "A focused review of your actual search term quality and lead flow." },
                    { title: "Structure Check", desc: "Feedback on campaign segmentation and search intent mapping." },
                    { title: "Tracking Review", desc: "Detailed check on call-swap and form tracking attribution quality." },
                    { title: "Landing Page CRO", desc: "Actionable observations for better conversion rate optimization." },
                    { title: "Next Steps Plan", desc: "A clear, no-fluff action plan for account growth and better ROI." }
                  ].map((item, i) => (
                    <div key={i} className="p-5 rounded-2xl border border-[#E2E8F0] bg-white shadow-sm flex flex-col gap-2 hover:border-slate-300 hover:shadow-md transition-all group">
                      <span className="text-[10px] font-extrabold text-[#25D366] uppercase tracking-[0.1em] group-hover:translate-x-1 transition-transform inline-block">0{i+1}. {item.title}</span>
                      <p className="text-[13px] text-[#475569] leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SOCIAL & FOOTER FORM SECTION */}
          <section className="w-full bg-[#F8FAFC] border-b border-[#E2E8F0]">
            <div className="max-w-[var(--container)] mx-auto px-6 lg:px-10 py-20">
              <div className="grid grid-cols-[0.4fr_0.6fr] max-xl:grid-cols-1 gap-16 items-start">
                
                <div className="space-y-10">
                  <div>
                    <h2 className="text-4xl font-display font-bold text-[#1E293B] mb-4 leading-tight">Let&apos;s Connect</h2>
                    <p className="text-[#475569] text-[16px] leading-relaxed">Reach out via email or LinkedIn for networking, questions, or custom project requests.</p>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      {label:"Work Email",sub:settings.email,href:`mailto:${settings.email}`, icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"},
                      {label:"WhatsApp",sub:"Message directly",href:`https://wa.me/${(settings.whatsapp_number || '').replace(/\D/g, '')}`, icon: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.05-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-2.078l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.135-1.61a11.783 11.783 0 005.912 1.61h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"},
                      {label:"LinkedIn",sub:"/in/wphossain",href:settings.linkedin_url, icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"},
                      {label:"Facebook",sub:"/wphossain374",href:"https://facebook.com/wphossain374", icon: "M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.16 8.44 9.94v-7.03H7.9v-2.91h2.54V9.86c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46H15.2c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22c4.78-.78 8.43-4.94 8.43-9.94z"},
                      {label:"YouTube",sub:"@wphossain",href:"https://youtube.com/@wphossain", icon: "M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.56a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.6 15.6V8.4l6.4 3.6-6.4 3.6z"}
                    ].map((l,i) => (
                      <a key={i} className="flex items-center gap-5 p-5 rounded-[24px] border border-[#E2E8F0] bg-white shadow-sm hover:border-[#25D366]/40 hover:shadow-md transition-all group" href={l.href} target="_blank" rel="noopener">
                        <div className="w-12 h-12 rounded-2xl grid place-items-center bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] group-hover:scale-110 transition-transform">
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={l.icon} /></svg>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[15px] text-[#1E293B] font-bold">{l.label}</span>
                          <span className="text-[13px] text-[#64748B]">{l.sub}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                <LeadForm />
              </div>
            </div>
          </section>

          <footer className="site-footer bg-[#050f1f] text-center text-[13px] text-[#94A3B8] py-12 border-t border-white/5">
            <div className="max-w-[var(--container)] mx-auto px-6 lg:px-10">
              <p><strong className="text-[#CBD5E1]">{settings.business_name}</strong> — {settings.owner_name}, {settings.job_title}. © 2026. Specialized for local service businesses.</p>
            </div>
          </footer>

        </div>
      </main>

      {/* Floating WhatsApp Button */}
      <a className="floating-wa fixed right-6 bottom-24 lg:bottom-6 z-50 w-15 h-15 rounded-full grid place-items-center bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white shadow-2xl hover:scale-110 transition-all active:scale-95 group" href={`https://wa.me/${(settings.whatsapp_number || '').replace(/\D/g, '')}`} target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
        <span className="floating-wa-ring absolute inset-0 rounded-full border-2 border-[#25D366] animate-[wa-pulse_2s_ease-out_infinite]" />
        <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" className="relative z-10">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.05-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-2.078l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.135-1.61a11.783 11.783 0 005.912 1.61h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
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
