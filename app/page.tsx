import React from 'react';
import Script from 'next/script';
import { Sidebar } from '@/components/public/Sidebar';
import { MobileHeader } from '@/components/public/MobileHeader';
import { PulseCard } from '@/components/public/PulseCard';
import { TestimonialsSlider } from '@/components/public/TestimonialsSlider';
import { FaqAccordion } from '@/components/public/FaqAccordion';
import { ZcalEmbed } from '@/components/public/ZcalEmbed';
import { StructuredData } from '@/components/public/StructuredData';
import { GoogleAdsDashboardMockup, GA4DashboardMockup, ConversionTrackingMockup, CostPerCallTrendMockup, LandingPageConversionMockup, KeywordExpansionMockup } from '@/components/public/DashboardMockups';
import { GoogleAdsCertBadge, GoogleAnalyticsCertBadge, GTMCertBadge, MetaCertBadge } from '@/components/public/CertBadges';
import { db } from '@/lib/db';
import { LeadForm } from '@/components/public/LeadForm';
import Link from 'next/link';

export async function generateMetadata() {
  const settings = await db.getSettings();
  return {
    title: `${settings.business_name} | ${settings.job_title}`,
    description: `Specialist for HVAC contractors. Search Ads, Conversion Tracking, GTM, GA4 — built to turn ad spend into booked service calls.`,
  };
}

export default async function Home() {
  const [settings, sections, blogs, caseStudies, tracking] = await Promise.all([
    db.getSettings(),
    db.getAllSections(),
    db.getBlogs(false),
    db.getCaseStudies(),
    db.getTracking()
  ]);

  const findSection = (key: string) => sections.find((s: any) => s.section_key === key) || { title: '', subtitle: '', content_json: {} };

  const hero = findSection('hero');
  const services = findSection('services');
  const why = findSection('why');
  const process = findSection('process');
  const faq = findSection('faq');
  const certsSection = findSection('certifications');

  return (
    <>
      <StructuredData faqs={faq.content_json.faqs || []} />
      <Sidebar />
      <MobileHeader />

      {/* Inject Tracking Codes */}
      {tracking.gtm_enabled && tracking.gtm_id && (
        <>
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${tracking.gtm_id}');`}
          </Script>
        </>
      )}
      {tracking.ga4_enabled && tracking.ga4_measurement_id && (
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
      {tracking.custom_head_scripts && (
        <div dangerouslySetInnerHTML={{ __html: tracking.custom_head_scripts }} />
      )}

      <main className="content lg:ml-[var(--sidebar-w)] min-h-screen bg-[#050f1f]">
        <div className="content-inner w-full flex flex-col">

          {/* HERO */}
          <section 
            className="w-full bg-[#050f1f] min-h-[calc(100vh-80px)] lg:min-h-screen flex items-center border-b border-[var(--line)] relative" 
            id="home"
            style={{ 
              backgroundImage: 'linear-gradient(rgba(26,115,232,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(26,115,232,0.03) 1px, transparent 1px)', 
              backgroundSize: '32px 32px' 
            }}
          >
            <div className="absolute top-0 right-0 w-[45%] h-[40%] bg-[radial-gradient(circle,rgba(26,115,232,0.07),transparent_70%)] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-[radial-gradient(circle,rgba(242,169,61,0.04),transparent_70%)] pointer-events-none" />

            <div className="max-w-[var(--container)] mx-auto w-full px-10 py-16 max-lg:px-6">
              <div className="hero-grid grid grid-cols-[1.15fr_0.85fr] max-xl:grid-cols-1 gap-10 items-center">
                <div className="hero-copy">
                  <span className="eyebrow">{settings.job_title}</span>
                  <h2 className="text-[clamp(32px,4.5vw,52px)] leading-[1.1] mb-5 text-white font-bold tracking-tight">
                    {hero.title}
                  </h2>
                  <p className="lead text-[17px] text-[var(--ink-dim)] max-w-[580px] leading-relaxed mb-6.5">
                    {hero.subtitle}
                  </p>
                  <div className="hero-actions flex flex-wrap gap-3.5 my-7 max-sm:flex-col">
                    <a className="btn btn-primary px-7 py-3.5" href="#contact">
                      Book Free Consultation
                      <svg className="btn-arrow" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                    </a>
                    <a className="btn btn-ghost px-7 py-3.5" href={`https://wa.me/${settings.whatsapp_number}`} target="_blank" rel="noopener">
                      Chat on WhatsApp
                    </a>
                  </div>
                  <div className="trust-pills flex flex-wrap gap-2.5">
                    {(hero.content_json.certificates || []).map((c: any, i: number) => (
                      <span key={i} className="pill"><span className="dot" />{c.name}</span>
                    ))}
                  </div>
                </div>
                <div className="w-full">
                  <PulseCard />
                </div>
              </div>

              <div className="hero-certs mt-12 pt-8 border-t border-[var(--line)]">
                <span className="hero-certs-label block text-[10.5px] font-extrabold tracking-[0.12em] uppercase text-[var(--ink-faint)] mb-4">Certified & trained on</span>
                <div className="cert-row flex flex-wrap gap-3.5">
                  <span className="cert-badge"><span className="ico"><svg viewBox="0 0 24 24" width="26" height="26"><path d="M12,12 L12,3 A9,9 0 0,1 21,12 Z" fill="#4285F4"/><path d="M12,12 L12,3 A9,9 0 0,1 21,12 Z" fill="#EA4335" transform="rotate(90 12 12)"/><path d="M12,12 L12,3 A9,9 0 0,1 21,12 Z" fill="#FBBC05" transform="rotate(180 12 12)"/><path d="M12,12 L12,3 A9,9 0 0,1 21,12 Z" fill="#34A853" transform="rotate(270 12 12)"/></svg></span>Google Ads</span>
                  <span className="cert-badge"><span className="ico" style={{background:"#F9AB00"}}><svg viewBox="0 0 24 24" width="14" height="14"><rect x="4" y="13" width="4" height="7" rx="1" fill="#fff"/><rect x="10" y="8" width="4" height="12" rx="1" fill="#fff"/><rect x="16" y="3" width="4" height="17" rx="1" fill="#fff"/></svg></span>Google Analytics</span>
                  <span className="cert-badge"><span className="ico" style={{background:"#4285F4"}}><svg viewBox="0 0 24 24" width="14" height="14"><path d="M12.5 3H6a2 2 0 0 0-2 2v6.5a2 2 0 0 0 .586 1.414l7.5 7.5a2 2 0 0 0 2.828 0l6.5-6.5a2 2 0 0 0 0-2.828l-7.5-7.5A2 2 0 0 0 12.5 3z" fill="#fff"/><circle cx="8" cy="8" r="1.6" fill="#4285F4"/></svg></span>Tag Manager</span>
                  <span className="cert-badge"><span className="ico" style={{background:"#21759B"}}><svg viewBox="0 0 24 24" width="14" height="14"><path d="M3 5l3.2 14h2.1l2.2-9 2.2 9h2.1L18 5h-2.3l-1.9 9-2-9h-1.9l-2 9-1.9-9H3z" fill="#fff"/></svg></span>WordPress</span>
                </div>
              </div>
            </div>
          </section>

          {/* SERVICES */}
          <section className="w-full bg-[#0a1c34] border-b border-[var(--line)]" id="services">
            <div className="max-w-[var(--container)] mx-auto px-10 py-22 max-lg:px-6">
              <div className="sec-head max-w-[680px] mb-10">
                <span className="eyebrow">Services</span>
                <h2 className="text-[clamp(26px,3.5vw,36px)] leading-tight mb-3 text-white font-bold">
                  {services.title}
                </h2>
                <p className="text-[var(--ink-dim)] text-[16px] leading-relaxed">
                  {services.subtitle}
                </p>
              </div>
              <div className="grid grid-cols-4 max-xl:grid-cols-2 max-sm:grid-cols-1 gap-4 mt-8">
                {(services.content_json.services_list || []).map((s: any, i: number) => (
                  <article key={i} className="card service-card p-6 bg-[#050f1f]/50 border border-white/5 rounded-2xl hover:border-[var(--blue-light)]/30 hover:bg-[#050f1f]/80 transition-all duration-300">
                    <div className="service-icon w-10 h-10 rounded-xl bg-[rgba(26,115,232,0.12)] border border-[rgba(26,115,232,0.25)] grid place-items-center mb-4">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8ab4f8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon} /></svg>
                    </div>
                    <span className="tag inline-block text-[10px] font-extrabold tracking-[0.08em] uppercase text-[var(--gold)] bg-[var(--gold-soft)] border border-[var(--gold-line)] px-2.25 py-1 rounded-full mb-3">{s.tag}</span>
                    <h3 className="text-[17px] mb-2 font-bold text-white">{s.title}</h3>
                    <p className="text-[13.5px] text-[var(--ink-dim)] leading-relaxed">{s.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* CASE STUDIES */}
          <section className="w-full bg-[#050f1f] border-b border-[var(--line)]" id="case-studies">
            <div className="max-w-[var(--container)] mx-auto px-10 py-22 max-lg:px-6">
              <div className="sec-head max-w-[680px] mb-10">
                <span className="eyebrow">Case Studies</span>
                <h2 className="text-[clamp(26px,3.5vw,36px)] leading-tight mb-3 text-white font-bold">
                  Real accounts, real fixes — client results.
                </h2>
              </div>
              <div className="grid-3 mt-8">
                {caseStudies.map((c: any, i: number) => (
                  <article key={i} className="case-card bg-[#0a1c34]/50 border border-white/5 rounded-[18px] p-6.5 flex flex-col gap-4.5 hover:border-[var(--blue-light)]/30 hover:bg-[#0a1c34]/80 transition-all duration-300 hover:-translate-y-1">
                    <span className="text-[11.5px] font-extrabold tracking-[0.1em] uppercase text-[var(--blue-light)]">{c.client_niche}</span>
                    <div className="case-row flex flex-col gap-1">
                      <span className="text-[10px] font-extrabold tracking-[0.08em] uppercase text-[var(--ink-faint)]">Challenge</span>
                      <p className="text-[13.8px] text-[var(--ink-dim)] leading-relaxed">{c.challenge}</p>
                    </div>
                    <div className="case-row flex flex-col gap-1">
                      <span className="text-[10px] font-extrabold tracking-[0.08em] uppercase text-[var(--ink-faint)]">Strategy</span>
                      <p className="text-[13.8px] text-[var(--ink-dim)] leading-relaxed">{c.strategy}</p>
                    </div>
                    <div className="case-row mt-auto pt-3 border-t border-white/5 flex flex-col gap-1">
                      <span className="text-[10px] font-extrabold tracking-[0.08em] uppercase text-[var(--gold)]">Result</span>
                      <p className="text-[13.8px] text-[var(--ink-dim)] leading-relaxed">{c.result_summary}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* PROCESS */}
          <section className="w-full bg-[#0a1c34] border-b border-[var(--line)]" id="process">
            <div className="max-w-[var(--container)] mx-auto px-10 py-22 max-lg:px-6">
              <div className="sec-head max-w-[680px] mb-10">
                <span className="eyebrow">Process</span>
                <h2 className="text-[clamp(26px,3.5vw,36px)] leading-tight mb-3 text-white font-bold">
                  {process.title}
                </h2>
              </div>
              <div className="process-track grid grid-cols-5 gap-4.5 max-xl:grid-cols-2 max-md:grid-cols-1">
                {(process.content_json.steps || []).map((p: any, i: number) => (
                  <article key={i} className="process-step bg-[#050f1f]/50 border border-white/5 rounded-2xl p-5.5 transition-all hover:border-[var(--blue-light)]/25 hover:bg-[#050f1f]/80 duration-300">
                    <div className="num font-display text-[12px] font-bold text-[var(--navy-900)] bg-[var(--blue-light)] w-6.5 h-6.5 rounded-lg grid place-items-center mb-4">{p.num}</div>
                    <h3 className="text-[16px] font-bold text-white mb-2">{p.title}</h3>
                    <p className="text-[13.5px] text-[var(--ink-dim)] leading-relaxed">{p.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* BLOG FEED */}
          <section className="w-full bg-[#050f1f] border-b border-[var(--line)]" id="blog">
            <div className="max-w-[var(--container)] mx-auto px-10 py-22 max-lg:px-6">
              <div className="sec-head max-w-[680px] mb-10 flex justify-between items-end gap-4 max-sm:flex-col max-sm:items-start">
                <div>
                  <span className="eyebrow">Insights</span>
                  <h2 className="text-[clamp(26px,3.5vw,36px)] leading-tight text-white font-bold">
                    Latest HVAC PPC Articles
                  </h2>
                </div>
                <Link href="/blog" className="text-[14px] font-bold text-[var(--blue-light)] hover:underline">
                  View All Articles →
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
                {blogs.slice(0, 2).map((post: any) => (
                  <article key={post.id} className="card p-6 bg-[#0a1c34]/50 border border-white/5 rounded-2xl hover:border-[var(--blue-light)]/30 transition-all">
                    <span className="text-[10px] font-extrabold uppercase text-[var(--gold)] bg-[var(--gold-soft)] px-2 py-1 rounded-full mb-3 inline-block">Article</span>
                    <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                      <Link href={`/blog/${post.slug}`} className="hover:text-[var(--blue-light)] transition-colors">{post.title}</Link>
                    </h3>
                    <p className="text-[14px] text-[var(--ink-dim)] line-clamp-2 mb-4">{post.excerpt}</p>
                    <Link href={`/blog/${post.slug}`} className="text-sm font-bold text-[var(--blue-light)] flex items-center gap-1 group">
                      Read More <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* TESTIMONIALS */}
          <section className="w-full bg-[#0a1c34] border-b border-[var(--line)]" id="testimonials">
            <div className="max-w-[var(--container)] mx-auto px-10 py-22 max-lg:px-6">
              <div className="sec-head max-w-[680px] mb-10">
                <span className="eyebrow">Testimonials</span>
                <h2 className="text-[clamp(26px,3.5vw,36px)] leading-tight mb-3 text-white font-bold">
                  What clients say — once the calls start coming in.
                </h2>
              </div>
              <TestimonialsSlider />
            </div>
          </section>

          {/* CERTIFICATIONS */}
          <section className="w-full bg-[#050f1f] border-b border-[var(--line)]" id="certifications">
            <div className="max-w-[var(--container)] mx-auto px-10 py-22 max-lg:px-6">
              <div className="sec-head max-w-[680px] mb-10">
                <span className="eyebrow">Certifications</span>
                <h2 className="text-[clamp(26px,3.5vw,36px)] leading-tight mb-3 text-white font-bold">
                  {certsSection.title}
                </h2>
              </div>
              <div className="grid grid-cols-4 max-xl:grid-cols-2 max-sm:grid-cols-1 gap-4 mt-8">
                {(certsSection.content_json.certs || []).map((cert: any, i: number) => (
                  <div key={i} className="cert-card bg-[#0a1c34]/50 border border-white/5 rounded-2xl overflow-hidden hover:border-[var(--gold)]/30 transition-all">
                    <div className="cert-thumb p-4 bg-white">
                      {cert.badge_type === 'google-ads' && <GoogleAdsCertBadge />}
                      {cert.badge_type === 'google-analytics' && <GoogleAnalyticsCertBadge />}
                      {cert.badge_type === 'tag-manager' && <GTMCertBadge />}
                      {cert.badge_type === 'meta' && <MetaCertBadge />}
                      {!['google-ads', 'google-analytics', 'tag-manager', 'meta'].includes(cert.badge_type) && (
                        <div className="h-[100px] flex items-center justify-center text-[#050f1f] font-bold text-lg">
                          {cert.title}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="w-full bg-[#0a1c34] border-b border-[var(--line)]" id="faq">
            <div className="max-w-[var(--container)] mx-auto px-10 py-22 max-lg:px-6">
              <div className="sec-head max-w-[680px] mb-10">
                <span className="eyebrow">FAQ</span>
                <h2 className="text-[clamp(26px,3.5vw,36px)] leading-tight mb-3 text-white font-bold">
                  {faq.title}
                </h2>
              </div>
              <FaqAccordion />
            </div>
          </section>

          {/* ZCAL & WHAT TO EXPECT - 80/20 Layout */}
          <section className="w-full bg-[#050f1f] border-b border-[var(--line)]" id="contact">
            <div className="max-w-[var(--container)] mx-auto px-10 py-22 max-lg:px-6">
              <div className="sec-head max-w-[680px] mb-12">
                <span className="eyebrow">Book a Call</span>
                <h2 className="text-[clamp(26px,3.5vw,36px)] leading-tight mb-3 text-white font-bold">
                  Book a free Google Ads audit.
                </h2>
              </div>

              <div className="flex gap-8 max-xl:flex-col">
                {/* Zcal Embed - 80% */}
                <div className="flex-[0.8] w-full rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                  <ZcalEmbed />
                </div>
                
                {/* What to Expect - 20% */}
                <div className="flex-[0.2] min-w-[280px] flex flex-col gap-4">
                  <span className="eyebrow block text-[11px] mb-2">What to expect on the call</span>
                  {[
                    { title: "Campaign Audit", desc: "A focused review of what's helping lead flow." },
                    { title: "Structure Check", desc: "Feedback on campaign and search intent." },
                    { title: "Tracking Review", desc: "Check on calls and form tracking quality." },
                    { title: "Landing Page CRO", desc: "CRO observations for better results." },
                    { title: "Next Steps Plan", desc: "Clear action steps you can act on." }
                  ].map((item, i) => (
                    <div key={i} className="p-4 rounded-xl border border-white/5 bg-[#0a1c34]/40 flex flex-col gap-1.5 transition-all hover:bg-[#0a1c34]/80 duration-300">
                      <span className="text-[10px] font-extrabold text-[var(--gold)] uppercase tracking-wider">0{i+1}. {item.title}</span>
                      <p className="text-[12.5px] text-[var(--ink-dim)] leading-snug">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SOCIAL CONNECT & LEAD FORM - Footer Section */}
          <section className="w-full bg-[#0a1c34] border-b border-[var(--line)]">
            <div className="max-w-[var(--container)] mx-auto px-10 py-22 max-lg:px-6">
              <div className="grid grid-cols-[0.4fr_0.6fr] max-xl:grid-cols-1 gap-12 items-start">
                
                {/* Left: Social Connect */}
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-display font-bold text-white mb-2">Connect on Social Media</h2>
                    <p className="text-[var(--ink-dim)] text-[15px]">Reach out via your preferred platform for quick questions or networking.</p>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      {label:"Email",sub:settings.email,href:`mailto:${settings.email}`, icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"},
                      {label:"WhatsApp",sub:"Quick chat",href:`https://wa.me/${settings.whatsapp_number}`, icon: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.05-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-2.078l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.87 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.135-1.61a11.783 11.783 0 005.912 1.61h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"},
                      {label:"LinkedIn",sub:"/in/wphossain",href:settings.linkedin_url, icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"},
                      {label:"Website",sub:"wphossain.com",href:"https://wphossain.com", icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"}
                    ].map((l,i) => (
                      <a key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-[#050f1f]/50 hover:border-[var(--blue-light)]/30 hover:bg-[#050f1f] transition-all group" href={l.href} target="_blank" rel="noopener">
                        <div className="w-12 h-12 rounded-xl grid place-items-center bg-[rgba(26,115,232,0.1)] border border-[rgba(26,115,232,0.2)] text-[var(--blue-light)] group-hover:scale-110 transition-transform">
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={l.icon} /></svg>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[14px] text-white font-bold">{l.label}</span>
                          <span className="text-[12px] text-[var(--ink-faint)]">{l.sub}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Right: Lead Form */}
                <LeadForm />
              </div>
            </div>
          </section>

          <footer className="site-footer bg-[#050f1f] text-center text-[13px] text-[var(--ink-faint)] py-10">
            <div className="max-w-[var(--container)] mx-auto px-10">
              <p><strong className="text-[var(--ink-dim)]">{settings.business_name}</strong> — {settings.owner_name}, {settings.job_title}. © 2026. Serving global HVAC contractors.</p>
            </div>
          </footer>

        </div>
      </main>

      {/* Floating WhatsApp Button (Synced with settings) */}
      <a className="floating-wa fixed right-6 bottom-6 z-50 w-15 h-15 rounded-full grid place-items-center bg-[linear-gradient(160deg,#25D366,#128C7E)] text-white shadow-2xl hover:scale-110 transition-all active:scale-95" href={`https://wa.me/${settings.whatsapp_number}`} target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
        <span className="floating-wa-ring absolute inset-0 rounded-full border-[2px] border-[#25D366] animate-[wa-pulse_2s_ease-out_infinite]" />
        <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.05-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-2.078l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.87 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.135-1.61a11.783 11.783 0 005.912 1.61h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      <Script src="https://static.zcal.co/embed/v1/embed.js" strategy="lazyOnload" />

      {/* Custom Body Scripts Injection */}
      {tracking.custom_body_scripts && (
        <div dangerouslySetInnerHTML={{ __html: tracking.custom_body_scripts }} />
      )}
    </>
  );
}
