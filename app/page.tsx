import React from 'react';
import { Sidebar } from '@/components/public/Sidebar';
import { MobileHeader } from '@/components/public/MobileHeader';
import { PulseCard } from '@/components/public/PulseCard';
import { TestimonialsSlider } from '@/components/public/TestimonialsSlider';
import { FaqAccordion } from '@/components/public/FaqAccordion';

export const metadata = {
  title: 'WPHossain | Google Ads Specialist for HVAC Contractors',
  description: 'Google Ads Specialist for HVAC contractors. Search Ads, Conversion Tracking, GTM, GA4 — built to turn ad spend into booked service calls. Book a free audit.',
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "WPHossain — Mikail Hossain, Google Ads Specialist",
    "url": "https://wphossain.com",
    "image": "https://wphossain.com/headshot.jpg",
    "email": "Contact@wphossain.com",
    "description": "Helping HVAC contractors generate more booked service calls through Google Search Ads, Performance Max, Conversion Tracking, GTM, and GA4.",
    "founder": {
      "@type": "Person",
      "name": "Mikail Hossain",
      "jobTitle": "Google Ads Specialist"
    },
    "areaServed": [
      { "@type": "Country", "name": "United States" },
      { "@type": "Country", "name": "Canada" },
      { "@type": "Country", "name": "Australia" },
      { "@type": "Country", "name": "New Zealand" },
      { "@type": "Country", "name": "United Kingdom" }
    ],
    "knowsAbout": ["HVAC Marketing", "Google Search Ads", "Performance Max", "Conversion Tracking", "Google Tag Manager", "GA4"]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Sidebar />
      <MobileHeader />

      <main className="content lg:ml-[var(--sidebar-w)] p-6.5 max-lg:p-4.5 max-md:p-3.5">
        <div className="content-inner max-w-[var(--container)] mx-auto w-full flex flex-col gap-5">

          {/* HERO SECTION */}
          <section className="panel hero p-11 max-lg:p-7 max-sm:p-4.5" id="home">
            <div className="hero-inner max-w-[var(--container)] mx-auto w-full">
              <div className="hero-grid grid grid-cols-[1.15fr_0.85fr] max-xl:grid-cols-1 gap-8.5 items-center">
                <div className="hero-copy">
                  <span className="eyebrow">Google Ads Specialist · HVAC Contractors</span>
                  <h2 className="text-[clamp(30px,4vw,46px)] leading-[1.12] mb-4 text-white">
                    More booked <span className="text-[var(--blue)]">service calls</span>. Less wasted ad spend.
                  </h2>
                  <p className="lead text-[16.5px] text-[var(--ink-dim)] max-w-[560px]">
                    Search Ads, Conversion Tracking, GTM, and GA4 — set up correctly so every lead is tracked and every dollar is measured. Built specifically for HVAC contractors who need the phone to ring, not just the impressions to climb.
                  </p>
                  <div className="hero-actions flex flex-wrap gap-3 my-6.5 max-sm:flex-col">
                    <a className="btn btn-primary" href="#contact">
                      Book Free Consultation
                      <svg className="btn-arrow" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                    </a>
                    <a className="btn btn-ghost" href="https://wa.me/10000000000" target="_blank" rel="noopener">Chat on WhatsApp</a>
                  </div>
                  <div className="trust-pills flex flex-wrap gap-2.25">
                    <span className="pill inline-flex items-center gap-1.5 px-3.25 py-2 rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.03)] text-[12.8px] font-semibold text-[var(--ink-dim)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--blue)]" />Google Ads Certified
                    </span>
                    <span className="pill inline-flex items-center gap-1.5 px-3.25 py-2 rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.03)] text-[12.8px] font-semibold text-[var(--ink-dim)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--blue)]" />GTM + GA4 Tracking
                    </span>
                    <span className="pill inline-flex items-center gap-1.5 px-3.25 py-2 rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.03)] text-[12.8px] font-semibold text-[var(--ink-dim)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--blue)]" />Local Service Focus
                    </span>
                  </div>
                </div>

                <PulseCard />
              </div>

              <div className="hero-certs mt-8 pt-6 border-t border-[var(--line)]">
                <span className="hero-certs-label block text-[11px] font-extrabold tracking-[0.1em] uppercase text-[var(--ink-faint)] mb-3.5">
                  Certified &amp; trained on
                </span>
                <div className="cert-row flex flex-wrap gap-3">
                  <span className="cert-badge flex items-center gap-2.5 px-4 py-3 rounded-[14px] bg-[rgba(255,255,255,0.03)] border border-[var(--line)] font-bold text-[13.5px] text-[var(--ink-dim)]">
                    <span className="ico w-6.5 h-6.5 rounded-full grid place-items-center flex-none">
                      <svg viewBox="0 0 24 24" width="26" height="26">
                        <path d="M12,12 L12,3 A9,9 0 0,1 21,12 Z" fill="#4285F4"/>
                        <path d="M12,12 L12,3 A9,9 0 0,1 21,12 Z" fill="#EA4335" transform="rotate(90 12 12)"/>
                        <path d="M12,12 L12,3 A9,9 0 0,1 21,12 Z" fill="#FBBC05" transform="rotate(180 12 12)"/>
                        <path d="M12,12 L12,3 A9,9 0 0,1 21,12 Z" fill="#34A853" transform="rotate(270 12 12)"/>
                      </svg>
                    </span>Google Ads
                  </span>
                  <span className="cert-badge flex items-center gap-2.5 px-4 py-3 rounded-[14px] bg-[rgba(255,255,255,0.03)] border border-[var(--line)] font-bold text-[13.5px] text-[var(--ink-dim)]">
                    <span className="ico w-6.5 h-6.5 rounded-full grid place-items-center bg-[#F9AB00] text-white flex-none">
                      <svg viewBox="0 0 24 24" width="14" height="14"><rect x="4" y="13" width="4" height="7" rx="1" fill="#fff"/><rect x="10" y="8" width="4" height="12" rx="1" fill="#fff"/><rect x="16" y="3" width="4" height="17" rx="1" fill="#fff"/></svg>
                    </span>Google Analytics
                  </span>
                  <span className="cert-badge flex items-center gap-2.5 px-4 py-3 rounded-[14px] bg-[rgba(255,255,255,0.03)] border border-[var(--line)] font-bold text-[13.5px] text-[var(--ink-dim)]">
                    <span className="ico w-6.5 h-6.5 rounded-full grid place-items-center bg-[#4285F4] text-white flex-none">
                      <svg viewBox="0 0 24 24" width="14" height="14"><path d="M12.5 3H6a2 2 0 0 0-2 2v6.5a2 2 0 0 0 .586 1.414l7.5 7.5a2 2 0 0 0 2.828 0l6.5-6.5a2 2 0 0 0 0-2.828l-7.5-7.5A2 2 0 0 0 12.5 3z" fill="#fff"/><circle cx="8" cy="8" r="1.6" fill="#4285F4"/></svg>
                    </span>Tag Manager
                  </span>
                  <span className="cert-badge flex items-center gap-2.5 px-4 py-3 rounded-[14px] bg-[rgba(255,255,255,0.03)] border border-[var(--line)] font-bold text-[13.5px] text-[var(--ink-dim)]">
                    <span className="ico w-6.5 h-6.5 rounded-full grid place-items-center bg-[#21759B] text-white flex-none">
                      <svg viewBox="0 0 24 24" width="14" height="14"><path d="M3 5l3.2 14h2.1l2.2-9 2.2 9h2.1L18 5h-2.3l-1.9 9-2-9h-1.9l-2 9-1.9-9H3z" fill="#fff"/></svg>
                    </span>WordPress
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* SERVICES SECTION */}
          <section className="panel" id="services">
            <div className="sec-head max-w-[680px] mb-8">
              <span className="eyebrow">Services</span>
              <h2 className="text-[clamp(24px,3vw,32px)] leading-snug mb-2.5">Everything a Google Ads account needs to produce booked jobs.</h2>
              <p className="text-[var(--ink-dim)] text-[15.5px]">From strategy to daily optimization — built around repair, install, maintenance, and emergency calls.</p>
            </div>
            <div className="grid-4 mt-6">
              <article className="card service-card"><span className="tag inline-block text-[10.5px] font-extrabold tracking-[0.08em] uppercase text-[var(--gold)] bg-[var(--gold-soft)] border border-[var(--gold-line)] px-2.25 py-1 rounded-full mb-3">Core</span><h3 className="text-[17.5px] mb-2 font-bold text-white">Google Search Ads</h3><p className="text-[14px] text-[var(--ink-dim)]">High-intent search campaigns for AC repair, furnace repair, and installs — the searches that turn into same-day calls.</p></article>
              <article className="card service-card"><span className="tag inline-block text-[10.5px] font-extrabold tracking-[0.08em] uppercase text-[var(--gold)] bg-[var(--gold-soft)] border border-[var(--gold-line)] px-2.25 py-1 rounded-full mb-3">Reach</span><h3 className="text-[17.5px] mb-2 font-bold text-white">Performance Max</h3><p className="text-[14px] text-[var(--ink-dim)]">Layered on top of Search once tracking is solid, so it adds tracked reach instead of vanity impressions.</p></article>
              <article className="card service-card"><span className="tag inline-block text-[10.5px] font-extrabold tracking-[0.08em] uppercase text-[var(--gold)] bg-[var(--gold-soft)] border border-[var(--gold-line)] px-2.25 py-1 rounded-full mb-3">Tracking</span><h3 className="text-[17.5px] mb-2 font-bold text-white">Conversion Tracking</h3><p className="text-[14px] text-[var(--ink-dim)]">Calls, form fills, and booking clicks tracked accurately so every dollar of ad spend is measurable.</p></article>
              <article className="card service-card"><span className="tag inline-block text-[10.5px] font-extrabold tracking-[0.08em] uppercase text-[var(--gold)] bg-[var(--gold-soft)] border border-[var(--gold-line)] px-2.25 py-1 rounded-full mb-3">Setup</span><h3 className="text-[17.5px] mb-2 font-bold text-white">Google Tag Manager</h3><p className="text-[14px] text-[var(--ink-dim)]">Clean GTM container setup — no duplicate tags, no broken triggers, no quietly double-counted leads.</p></article>
              <article className="card service-card"><span className="tag inline-block text-[10.5px] font-extrabold tracking-[0.08em] uppercase text-[var(--gold)] bg-[var(--gold-soft)] border border-[var(--gold-line)] px-2.25 py-1 rounded-full mb-3">Setup</span><h3 className="text-[17.5px] mb-2 font-bold text-white">GA4 Configuration</h3><p className="text-[14px] text-[var(--ink-dim)]">Analytics configured to your actual funnel, so reports answer real questions instead of showing raw traffic.</p></article>
              <article className="card service-card"><span className="tag inline-block text-[10.5px] font-extrabold tracking-[0.08em] uppercase text-[var(--gold)] bg-[var(--gold-soft)] border border-[var(--gold-line)] px-2.25 py-1 rounded-full mb-3">Audit</span><h3 className="text-[17.5px] mb-2 font-bold text-white">Google Ads Audit</h3><p className="text-[14px] text-[var(--ink-dim)]">A full account review — wasted spend, weak match types, and missed local-intent opportunities, laid out plainly.</p></article>
              <article className="card service-card"><span className="tag inline-block text-[10.5px] font-extrabold tracking-[0.08em] uppercase text-[var(--gold)] bg-[var(--gold-soft)] border border-[var(--gold-line)] px-2.25 py-1 rounded-full mb-3">Conversion</span><h3 className="text-[17.5px] mb-2 font-bold text-white">Landing Page Review</h3><p className="text-[14px] text-[var(--ink-dim)]">Headline clarity, trust placement, and CTA flow, reviewed for HVAC-specific call and quote conversion.</p></article>
              <article className="card service-card"><span className="tag inline-block text-[10.5px] font-extrabold tracking-[0.08em] uppercase text-[var(--gold)] bg-[var(--gold-soft)] border border-[var(--gold-line)] px-2.25 py-1 rounded-full mb-3">Growth</span><h3 className="text-[17.5px] mb-2 font-bold text-white">Campaign Optimization</h3><p className="text-[14px] text-[var(--ink-dim)]">Ongoing search-term cleanup, bid and budget refinement, and structure changes as the account matures.</p></article>
            </div>
          </section>

          {/* WHY ME SECTION */}
          <section className="panel" id="why-me">
            <div className="sec-head max-w-[680px] mb-8">
              <span className="eyebrow">Why Me</span>
              <h2 className="text-[clamp(24px,3vw,32px)] leading-snug mb-2.5">A specialist who also understands the page the click lands on.</h2>
            </div>
            <div className="grid-2 gap-4.5">
              <div className="card">
                <ul className="bullets flex flex-col gap-3.5">
                  <li className="relative pl-6 text-[14.5px] text-[var(--ink-dim)] before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.25 before:h-2.25 before:rounded-[3px] before:bg-[var(--blue)]">
                    <strong className="block text-white text-[15px] font-bold">Built for HVAC, not generic PPC.</strong> Campaigns are structured around repair, install, maintenance, and emergency call intent — not a copy-pasted template.
                  </li>
                  <li className="relative pl-6 text-[14.5px] text-[var(--ink-dim)] before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.25 before:h-2.25 before:rounded-[3px] before:bg-[var(--blue)]">
                    <strong className="block text-white text-[15px] font-bold">Tracking that holds up under scrutiny.</strong> GTM and GA4 are set up so every lead is tracked and every dollar of spend is measured, not estimated.
                  </li>
                  <li className="relative pl-6 text-[14.5px] text-[var(--ink-dim)] before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.25 before:h-2.25 before:rounded-[3px] before:bg-[var(--blue)]">
                    <strong className="block text-white text-[15px] font-bold">A former websites/CMS specialist.</strong> That background means I look closely at landing pages too — not just campaign settings — because a great campaign can still land on a page that leaks conversions.
                  </li>
                </ul>
              </div>
              <div className="card">
                <ul className="bullets flex flex-col gap-3.5">
                  <li className="relative pl-6 text-[14.5px] text-[var(--ink-dim)] before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.25 before:h-2.25 before:rounded-[3px] before:bg-[var(--blue)]">
                    <strong className="block text-white text-[15px] font-bold">Fewer wasted clicks.</strong> The focus is qualified calls, not raw click volume or impression share.
                  </li>
                  <li className="relative pl-6 text-[14.5px] text-[var(--ink-dim)] before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.25 before:h-2.25 before:rounded-[3px] before:bg-[var(--blue)]">
                    <strong className="block text-white text-[15px] font-bold">Clear reporting on what's working.</strong> You should be able to see exactly which keyword, ad, and landing page is generating real service calls.
                  </li>
                  <li className="relative pl-6 text-[14.5px] text-[var(--ink-dim)] before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.25 before:h-2.25 before:rounded-[3px] before:bg-[var(--blue)]">
                    <strong className="block text-white text-[15px] font-bold">Built for growing local service teams.</strong> A good fit for HVAC contractors with 3–30 employees, $1,000+ monthly ad spend, and a goal of more booked service calls.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* PROCESS SECTION */}
          <section className="panel" id="process">
            <div className="sec-head max-w-[680px] mb-8">
              <span className="eyebrow">Process</span>
              <h2 className="text-[clamp(24px,3vw,32px)] leading-snug mb-2.5">A repeatable five-step system, not a one-off campaign launch.</h2>
            </div>
            <div className="process-track grid grid-cols-5 gap-3.5 max-xl:grid-cols-2 max-md:grid-cols-1">
              <article className="process-step bg-[rgba(255,255,255,0.03)] border border-[var(--line)] rounded-2xl p-4.5">
                <div className="num font-display text-[12px] font-bold text-[var(--navy-900)] bg-[var(--blue)] w-6.5 h-6.5 rounded-lg grid place-items-center mb-3">1</div>
                <h3 className="text-[15.5px] font-bold text-white mb-1.5">Audit</h3>
                <p className="text-[13px] text-[var(--ink-dim)]">Full review of the account, keywords, and tracking to find exactly where spend is leaking.</p>
              </article>
              <article className="process-step bg-[rgba(255,255,255,0.03)] border border-[var(--line)] rounded-2xl p-4.5">
                <div className="num font-display text-[12px] font-bold text-[var(--navy-900)] bg-[var(--blue)] w-6.5 h-6.5 rounded-lg grid place-items-center mb-3">2</div>
                <h3 className="text-[15.5px] font-bold text-white mb-1.5">Tracking Setup</h3>
                <p className="text-[13px] text-[var(--ink-dim)]">GTM and GA4 configured so calls, forms, and bookings are all measured correctly.</p>
              </article>
              <article className="process-step bg-[rgba(255,255,255,0.03)] border border-[var(--line)] rounded-2xl p-4.5">
                <div className="num font-display text-[12px] font-bold text-[var(--navy-900)] bg-[var(--blue)] w-6.5 h-6.5 rounded-lg grid place-items-center mb-3">3</div>
                <h3 className="text-[15.5px] font-bold text-white mb-1.5">Campaign Build</h3>
                <p className="text-[13px] text-[var(--ink-dim)]">Structure, keywords, and geo-targeting rebuilt around real local service demand.</p>
              </article>
              <article className="process-step bg-[rgba(255,255,255,0.03)] border border-[var(--line)] rounded-2xl p-4.5">
                <div className="num font-display text-[12px] font-bold text-[var(--navy-900)] bg-[var(--blue)] w-6.5 h-6.5 rounded-lg grid place-items-center mb-3">4</div>
                <h3 className="text-[15.5px] font-bold text-white mb-1.5">Launch</h3>
                <p className="text-[13px] text-[var(--ink-dim)]">Campaigns go live with clean tracking already in place — no guessing after the fact.</p>
              </article>
              <article className="process-step bg-[rgba(255,255,255,0.03)] border border-[var(--line)] rounded-2xl p-4.5">
                <div className="num font-display text-[12px] font-bold text-[var(--navy-900)] bg-[var(--blue)] w-6.5 h-6.5 rounded-lg grid place-items-center mb-3">5</div>
                <h3 className="text-[15.5px] font-bold text-white mb-1.5">Optimization</h3>
                <p className="text-[13px] text-[var(--ink-dim)]">Regular review of cost-per-call, search terms, and budget allocation as data comes in.</p>
              </article>
            </div>
          </section>

          {/* RESULTS / PORTFOLIO SECTION */}
          <section className="panel" id="results">
            <div className="sec-head max-w-[680px] mb-8">
              <span className="eyebrow">Results / Portfolio</span>
              <h2 className="text-[clamp(24px,3vw,32px)] leading-snug mb-2.5">Real dashboards and account snapshots — added as they're ready.</h2>
              <p className="text-[var(--ink-dim)] text-[15.5px]">The graphics below are illustrative mockups so the layout reads complete. Real screenshots and numbers replace them before launch.</p>
            </div>
            <div className="grid-3 mt-6">
              <div className="ph-card border border-dashed border-[var(--gold-line)] bg-[rgba(242,169,61,0.045)] rounded-2xl p-5 flex flex-col gap-2.5">
                <span className="ph-badge self-start text-[10px] font-extrabold tracking-[0.07em] uppercase text-[var(--gold)] bg-[var(--gold-soft)] border border-[var(--gold-line)] px-2.25 py-1 rounded-full">Sample data</span>
                <div className="ph-thumb h-[110px] rounded-xl bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.04)_0_10px,rgba(255,255,255,0.01)_10px_20px)] border border-[var(--line-soft)] grid place-items-center text-[var(--ink-faint)] text-[12px] font-bold tracking-[0.05em] uppercase">
                  <svg viewBox="0 0 120 48" width="100%" height="70" preserveAspectRatio="none">
                    <rect x="4" y="30" width="14" height="18" rx="3" fill="#1a73e8"/>
                    <rect x="24" y="22" width="14" height="26" rx="3" fill="#1a73e8"/>
                    <rect x="44" y="26" width="14" height="22" rx="3" fill="#1a73e8"/>
                    <rect x="64" y="14" width="14" height="34" rx="3" fill="#1a73e8"/>
                    <rect x="84" y="18" width="14" height="30" rx="3" fill="#1a73e8"/>
                    <rect x="104" y="4" width="14" height="44" rx="3" fill="#4c9bff"/>
                  </svg>
                </div>
                <h3 className="text-[15px] font-bold text-white">HVAC Search Campaign</h3>
                <p className="text-[13px] text-[var(--ink-faint)]">HVAC search campaign — clicks, CPL, CTR.</p>
              </div>
              <div className="ph-card border border-dashed border-[var(--gold-line)] bg-[rgba(242,169,61,0.045)] rounded-2xl p-5 flex flex-col gap-2.5">
                <span className="ph-badge self-start text-[10px] font-extrabold tracking-[0.07em] uppercase text-[var(--gold)] bg-[var(--gold-soft)] border border-[var(--gold-line)] px-2.25 py-1 rounded-full">Sample data</span>
                <div className="ph-thumb h-[110px] rounded-xl bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.04)_0_10px,rgba(255,255,255,0.01)_10px_20px)] border border-[var(--line-soft)] grid place-items-center text-[var(--ink-faint)] text-[12px] font-bold tracking-[0.05em] uppercase">
                  <svg viewBox="0 0 120 48" width="100%" height="70" preserveAspectRatio="none">
                    <polyline points="2,38 20,34 38,36 56,22 74,26 92,12 118,6" fill="none" stroke="#1a73e8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-[15px] font-bold text-white">Client Reporting Pipeline</h3>
                <p className="text-[13px] text-[var(--ink-faint)]">Live reporting pipeline for a client account.</p>
              </div>
              <div className="ph-card border border-dashed border-[var(--gold-line)] bg-[rgba(242,169,61,0.045)] rounded-2xl p-5 flex flex-col gap-2.5">
                <span className="ph-badge self-start text-[10px] font-extrabold tracking-[0.07em] uppercase text-[var(--gold)] bg-[var(--gold-soft)] border border-[var(--gold-line)] px-2.25 py-1 rounded-full">Sample data</span>
                <div className="ph-thumb h-[110px] rounded-xl bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.04)_0_10px,rgba(255,255,255,0.01)_10px_20px)] border border-[var(--line-soft)] grid place-items-center text-[var(--ink-faint)] text-[12px] font-bold tracking-[0.05em] uppercase">
                  <svg viewBox="0 0 48 48" width="70" height="70">
                    <circle cx="24" cy="24" r="18" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="8"/>
                    <circle cx="24" cy="24" r="18" fill="none" stroke="#1a73e8" strokeWidth="8" strokeDasharray="70 113" strokeLinecap="round" transform="rotate(-90 24 24)"/>
                    <circle cx="24" cy="24" r="18" fill="none" stroke="#f2a93d" strokeWidth="8" strokeDasharray="30 113" strokeDashoffset="-70" strokeLinecap="round" transform="rotate(-90 24 24)"/>
                  </svg>
                </div>
                <h3 className="text-[15px] font-bold text-white">Conversion Tracking Setup</h3>
                <p className="text-[13px] text-[var(--ink-faint)]">Conversion setup — calls, forms, and offline events.</p>
              </div>
              <div className="ph-card border border-dashed border-[var(--gold-line)] bg-[rgba(242,169,61,0.045)] rounded-2xl p-5 flex flex-col gap-2.5">
                <span className="ph-badge self-start text-[10px] font-extrabold tracking-[0.07em] uppercase text-[var(--gold)] bg-[var(--gold-soft)] border border-[var(--gold-line)] px-2.25 py-1 rounded-full">Sample data</span>
                <div className="ph-thumb h-[110px] rounded-xl bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.04)_0_10px,rgba(255,255,255,0.01)_10px_20px)] border border-[var(--line-soft)] grid place-items-center text-[var(--ink-faint)] text-[12px] font-bold tracking-[0.05em] uppercase">
                  <svg viewBox="0 0 120 48" width="100%" height="70" preserveAspectRatio="none">
                    <rect x="20" y="20" width="26" height="28" rx="4" fill="rgba(255,255,255,.15)"/>
                    <rect x="74" y="6" width="26" height="42" rx="4" fill="#1a73e8"/>
                  </svg>
                </div>
                <h3 className="text-[15px] font-bold text-white">Landing Page Conversion Lift</h3>
                <p className="text-[13px] text-[var(--ink-faint)]">Before/after conversion rate on a service page.</p>
              </div>
              <div className="ph-card border border-dashed border-[var(--gold-line)] bg-[rgba(242,169,61,0.045)] rounded-2xl p-5 flex flex-col gap-2.5">
                <span className="ph-badge self-start text-[10px] font-extrabold tracking-[0.07em] uppercase text-[var(--gold)] bg-[var(--gold-soft)] border border-[var(--gold-line)] px-2.25 py-1 rounded-full">Sample data</span>
                <div className="ph-thumb h-[110px] rounded-xl bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.04)_0_10px,rgba(255,255,255,0.01)_10px_20px)] border border-[var(--line-soft)] grid place-items-center text-[var(--ink-faint)] text-[12px] font-bold tracking-[0.05em] uppercase">
                  <svg viewBox="0 0 120 48" width="100%" height="70" preserveAspectRatio="none">
                    <rect x="4" y="6" width="90" height="8" rx="4" fill="#1a73e8"/>
                    <rect x="4" y="20" width="65" height="8" rx="4" fill="#4c9bff"/>
                    <rect x="4" y="34" width="40" height="8" rx="4" fill="#f2a93d"/>
                  </svg>
                </div>
                <h3 className="text-[15px] font-bold text-white">Local Keyword Expansion</h3>
                <p className="text-[13px] text-[var(--ink-faint)]">Local search term expansion for a new market.</p>
              </div>
              <div className="ph-card border border-dashed border-[var(--gold-line)] bg-[rgba(242,169,61,0.045)] rounded-2xl p-5 flex flex-col gap-2.5">
                <span className="ph-badge self-start text-[10px] font-extrabold tracking-[0.07em] uppercase text-[var(--gold)] bg-[var(--gold-soft)] border border-[var(--gold-line)] px-2.25 py-1 rounded-full">Sample data</span>
                <div className="ph-thumb h-[110px] rounded-xl bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.04)_0_10px,rgba(255,255,255,0.01)_10px_20px)] border border-[var(--line-soft)] grid place-items-center text-[var(--ink-faint)] text-[12px] font-bold tracking-[0.05em] uppercase">
                  <svg viewBox="0 0 120 48" width="100%" height="70" preserveAspectRatio="none">
                    <polyline points="2,8 20,14 38,16 56,28 74,26 92,38 118,44" fill="none" stroke="#f2a93d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-[15px] font-bold text-white">Cost-Per-Call Trend</h3>
                <p className="text-[13px] text-[var(--ink-faint)]">Cost-per-call trend across an optimization window.</p>
              </div>
            </div>
          </section>

          {/* CASE STUDIES SECTION */}
          <section className="panel" id="case-studies">
            <div className="sec-head max-w-[680px] mb-8">
              <span className="eyebrow">Case Studies</span>
              <h2 className="text-[clamp(24px,3vw,32px)] leading-snug mb-2.5">Real accounts, real fixes — details added as clients sign off.</h2>
            </div>
            <div className="grid-3 mt-6">
              <article className="case-card bg-[rgba(255,255,255,0.03)] border border-[var(--line)] rounded-[18px] p-5.5 flex flex-col gap-3">
                <div className="case-top flex items-center justify-between gap-2.5">
                  <span className="kicker text-[11px] font-extrabold tracking-[0.08em] uppercase text-[var(--blue)]">HVAC</span>
                </div>
                <div className="case-row flex flex-col gap-0.75">
                  <span className="text-[10.5px] font-extrabold tracking-[0.07em] uppercase text-[var(--ink-faint)]">Challenge</span>
                  <p className="text-[13.8px] text-[var(--ink-dim)]">Cost-per-lead had crept up as broad-match keywords pulled in low-intent clicks, with no clear view of which calls turned into booked jobs.</p>
                </div>
                <div className="case-row flex flex-col gap-0.75">
                  <span className="text-[10.5px] font-extrabold tracking-[0.07em] uppercase text-[var(--ink-faint)]">Strategy</span>
                  <p className="text-[13.8px] text-[var(--ink-dim)]">Rebuilt the account around tightly themed ad groups, added call tracking, and shifted budget toward the highest-intent search terms.</p>
                </div>
                <div className="case-row flex flex-col gap-0.75">
                  <span className="text-[10.5px] font-extrabold tracking-[0.07em] uppercase text-[var(--ink-faint)]">Result</span>
                  <p className="text-[13.8px] text-[var(--ink-dim)]">Example pattern: cost-per-call trending down while booked-job volume holds steady or improves.</p>
                </div>
              </article>

              <article className="case-card bg-[rgba(255,255,255,0.03)] border border-[var(--line)] rounded-[18px] p-5.5 flex flex-col gap-3">
                <div className="case-top flex items-center justify-between gap-2.5">
                  <span className="kicker text-[11px] font-extrabold tracking-[0.08em] uppercase text-[var(--blue)]">Plumbing</span>
                </div>
                <div className="case-row flex flex-col gap-0.75">
                  <span className="text-[10.5px] font-extrabold tracking-[0.07em] uppercase text-[var(--ink-faint)]">Challenge</span>
                  <p className="text-[13.8px] text-[var(--ink-dim)]">Conversions were technically live, but forms, calls, and chat weren't unified — so real lead volume was mostly a guess.</p>
                </div>
                <div className="case-row flex flex-col gap-0.75">
                  <span className="text-[10.5px] font-extrabold tracking-[0.07em] uppercase text-[var(--ink-faint)]">Strategy</span>
                  <p className="text-[13.8px] text-[var(--ink-dim)]">Rebuilt GTM and GA4 from scratch with unified call, form, and chat tracking feeding into a single clean report.</p>
                </div>
                <div className="case-row flex flex-col gap-0.75">
                  <span className="text-[10.5px] font-extrabold tracking-[0.07em] uppercase text-[var(--ink-faint)]">Result</span>
                  <p className="text-[13.8px] text-[var(--ink-dim)]">Example pattern: one accurate lead count across every channel, replacing scattered guesswork.</p>
                </div>
              </article>

              <article className="case-card bg-[rgba(255,255,255,0.03)] border border-[var(--line)] rounded-[18px] p-5.5 flex flex-col gap-3">
                <div className="case-top flex items-center justify-between gap-2.5">
                  <span className="kicker text-[11px] font-extrabold tracking-[0.08em] uppercase text-[var(--blue)]">Roofing</span>
                </div>
                <div className="case-row flex flex-col gap-0.75">
                  <span className="text-[10.5px] font-extrabold tracking-[0.07em] uppercase text-[var(--ink-faint)]">Challenge</span>
                  <p className="text-[13.8px] text-[var(--ink-dim)]">Paid traffic was landing on a generic homepage, and most visitors left without requesting a quote.</p>
                </div>
                <div className="case-row flex flex-col gap-0.75">
                  <span className="text-[10.5px] font-extrabold tracking-[0.07em] uppercase text-[var(--ink-faint)]">Strategy</span>
                  <p className="text-[13.8px] text-[var(--ink-dim)]">Built a dedicated landing page matched to the ad message, with a shorter form and a clearer above-the-fold CTA.</p>
                </div>
                <div className="case-row flex flex-col gap-0.75">
                  <span className="text-[10.5px] font-extrabold tracking-[0.07em] uppercase text-[var(--ink-faint)]">Result</span>
                  <p className="text-[13.8px] text-[var(--ink-dim)]">Example pattern: a noticeably higher share of visitors requesting a quote from the same ad spend.</p>
                </div>
              </article>
            </div>
          </section>

          {/* TESTIMONIALS SECTION */}
          <section className="panel" id="testimonials">
            <div className="sec-head max-w-[680px] mb-8">
              <span className="eyebrow">Testimonials</span>
              <h2 className="text-[clamp(24px,3vw,32px)] leading-snug mb-2.5">What clients say — once the calls start coming in.</h2>
            </div>
            <TestimonialsSlider />
          </section>

          {/* CERTIFICATIONS SECTION */}
          <section className="panel" id="certifications">
            <div className="sec-head max-w-[680px] mb-8">
              <span className="eyebrow">Certifications</span>
              <h2 className="text-[clamp(24px,3vw,32px)] leading-snug mb-2.5">Credentials on file — real certificates added as issued.</h2>
              <p className="text-[var(--ink-dim)] text-[15.5px]">The badges below are illustrative mockups. Real certification images and issue dates replace them before launch.</p>
            </div>
            <div className="grid-4 mt-6">
              <div className="ph-card border border-dashed border-[var(--gold-line)] bg-[rgba(242,169,61,0.045)] rounded-2xl p-5 flex flex-col gap-2.5">
                <div className="ph-thumb h-[110px] rounded-xl bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.04)_0_10px,rgba(255,255,255,0.01)_10px_20px)] border border-[var(--line-soft)] grid place-items-center">
                  <svg viewBox="0 0 48 48" width="52" height="52">
                    <circle cx="24" cy="18" r="13" fill="none" stroke="#4285F4" strokeWidth="3"/>
                    <path d="M24 5 L28 14 L38 15 L30 22 L32 32 L24 27 L16 32 L18 22 L10 15 L20 14 Z" fill="#4285F4" opacity=".9"/>
                    <path d="M17 29 L13 44 L24 38 L35 44 L31 29" fill="none" stroke="#4285F4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-[15px] font-bold text-white">Google Ads Certification</h3>
                <p className="text-[13px] text-[var(--ink-faint)]">Google Ads — Search / Display / Measurement.</p>
              </div>
              <div className="ph-card border border-dashed border-[var(--gold-line)] bg-[rgba(242,169,61,0.045)] rounded-2xl p-5 flex flex-col gap-2.5">
                <div className="ph-thumb h-[110px] rounded-xl bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.04)_0_10px,rgba(255,255,255,0.01)_10px_20px)] border border-[var(--line-soft)] grid place-items-center">
                  <svg viewBox="0 0 48 48" width="52" height="52">
                    <circle cx="24" cy="18" r="13" fill="none" stroke="#F9AB00" strokeWidth="3"/>
                    <path d="M24 5 L28 14 L38 15 L30 22 L32 32 L24 27 L16 32 L18 22 L10 15 L20 14 Z" fill="#F9AB00" opacity=".9"/>
                    <path d="M17 29 L13 44 L24 38 L35 44 L31 29" fill="none" stroke="#F9AB00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-[15px] font-bold text-white">Google Analytics Certification</h3>
                <p className="text-[13px] text-[var(--ink-faint)]">Google Analytics (GA4) certification.</p>
              </div>
              <div className="ph-card border border-dashed border-[var(--gold-line)] bg-[rgba(242,169,61,0.045)] rounded-2xl p-5 flex flex-col gap-2.5">
                <div className="ph-thumb h-[110px] rounded-xl bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.04)_0_10px,rgba(255,255,255,0.01)_10px_20px)] border border-[var(--line-soft)] grid place-items-center">
                  <svg viewBox="0 0 48 48" width="52" height="52">
                    <circle cx="24" cy="18" r="13" fill="none" stroke="#4285F4" strokeWidth="3"/>
                    <path d="M24 5 L28 14 L38 15 L30 22 L32 32 L24 27 L16 32 L18 22 L10 15 L20 14 Z" fill="#4285F4" opacity=".9"/>
                    <path d="M17 29 L13 44 L24 38 L35 44 L31 29" fill="none" stroke="#4285F4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-[15px] font-bold text-white">Tag Manager Certification</h3>
                <p className="text-[13px] text-[var(--ink-faint)]">Google Tag Manager fundamentals.</p>
              </div>
              <div className="ph-card border border-dashed border-[var(--gold-line)] bg-[rgba(242,169,61,0.045)] rounded-2xl p-5 flex flex-col gap-2.5">
                <div className="ph-thumb h-[110px] rounded-xl bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.04)_0_10px,rgba(255,255,255,0.01)_10px_20px)] border border-[var(--line-soft)] grid place-items-center">
                  <svg viewBox="0 0 48 48" width="52" height="52">
                    <circle cx="24" cy="18" r="13" fill="none" stroke="#1877F2" strokeWidth="3"/>
                    <path d="M24 5 L28 14 L38 15 L30 22 L32 32 L24 27 L16 32 L18 22 L10 15 L20 14 Z" fill="#1877F2" opacity=".9"/>
                    <path d="M17 29 L13 44 L24 38 L35 44 L31 29" fill="none" stroke="#1877F2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-[15px] font-bold text-white">Meta Blueprint Certification</h3>
                <p className="text-[13px] text-[var(--ink-faint)]">Meta Blueprint / Ads certification.</p>
              </div>
            </div>
          </section>

          {/* FAQ SECTION */}
          <section className="panel" id="faq">
            <div className="sec-head max-w-[680px] mb-8">
              <span className="eyebrow">FAQ</span>
              <h2 className="text-[clamp(24px,3vw,32px)] leading-snug mb-2.5">Everything HVAC owners usually want to know before booking a call.</h2>
            </div>
            <FaqAccordion />
          </section>

          {/* CONTACT & BOOKING SECTION */}
          <section className="panel" id="contact">
            <div className="sec-head max-w-[680px] mb-8">
              <span className="eyebrow">Book a Call &amp; Contact</span>
              <h2 className="text-[clamp(24px,3vw,32px)] leading-snug mb-2.5">Book a free Google Ads audit, or reach out directly.</h2>
              <p className="text-[var(--ink-dim)] text-[15.5px]">A low-friction next step if you want clarity before making bigger decisions about your ad spend.</p>
            </div>

            <div className="book-panel bg-[linear-gradient(165deg,var(--navy-700),var(--panel))] border border-[var(--line)] rounded-[20px] p-7 grid grid-cols-[30%_1fr] max-xl:grid-cols-1 gap-7.5 items-start">
              <div className="expect-col">
                <span className="eyebrow block mb-2.5">What to expect</span>
                <h3 className="text-[18px] font-bold text-white mb-2.5">What to expect on the call.</h3>
                <ul className="bullets flex flex-col gap-3.5 mt-1.5">
                  <li className="relative pl-6 text-[14.5px] text-[var(--ink-dim)] before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-[3px] before:bg-[var(--blue)]">A focused review of what's helping or hurting lead flow right now.</li>
                  <li className="relative pl-6 text-[14.5px] text-[var(--ink-dim)] before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-[3px] before:bg-[var(--blue)]">Feedback on campaign structure, search intent, and wasted spend risks.</li>
                  <li className="relative pl-6 text-[14.5px] text-[var(--ink-dim)] before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-[3px] before:bg-[var(--blue)]">A quick check on tracking quality — calls, forms, and booking actions.</li>
                  <li className="relative pl-6 text-[14.5px] text-[var(--ink-dim)] before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-[3px] before:bg-[var(--blue)]">Landing page observations that may be reducing call conversion.</li>
                  <li className="relative pl-6 text-[14.5px] text-[var(--ink-dim)] before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-[3px] before:bg-[var(--blue)]">Clear next steps you can act on, whether or not we work together.</li>
                </ul>
              </div>
              <div className="zcal-embed-wrap bg-[rgba(5,13,26,0.55)] border border-[var(--line-soft)] rounded-xl p-1.5 min-h-[70px]">
                <div className="zcal-inline-widget">
                  <a href="https://zcal.co/i/hJJ3Hx9l" className="flex items-center justify-center text-center min-h-[58px] p-3.5 rounded-lg text-white font-bold text-[13.5px]">
                    Audit Your Issue / Website / Tracking Problem - Free - Schedule a meeting
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Contact Icons Grid */}
            <div className="icon-link-grid grid grid-cols-4 max-xl:grid-cols-2 max-sm:grid-cols-1 gap-3.5 mt-[18px]">
              <a className="icon-link flex items-center gap-3 p-3.5 rounded-xl border border-[var(--line)] bg-[rgba(255,255,255,0.03)] hover:border-[var(--gold-line)] hover:bg-[var(--gold-soft)] hover:-translate-y-0.5 transition-all group" href="mailto:Contact@wphossain.com">
                <span className="icon-link-badge flex-none w-10.5 h-10.5 rounded-xl grid place-items-center bg-[rgba(26,115,232,0.14)] border border-[rgba(26,115,232,0.3)] text-[#8ab4f8] group-hover:bg-[var(--gold-soft)] group-hover:border-[var(--gold-line)] group-hover:text-[var(--gold)] transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="M3 6.5l9 6.5 9-6.5"/></svg>
                </span>
                <span className="icon-link-text flex flex-col gap-0.25 min-w-0">
                  <strong className="text-[13.8px] text-white font-bold">Email</strong>
                  <span className="text-[11.8px] text-[var(--ink-faint)] truncate">Contact@wphossain.com</span>
                </span>
              </a>

              <a className="icon-link flex items-center gap-3 p-3.5 rounded-xl border border-[var(--line)] bg-[rgba(255,255,255,0.03)] hover:border-[var(--gold-line)] hover:bg-[var(--gold-soft)] hover:-translate-y-0.5 transition-all group" href="https://wa.me/10000000000" target="_blank" rel="noopener">
                <span className="icon-link-badge flex-none w-10.5 h-10.5 rounded-xl grid place-items-center bg-[rgba(26,115,232,0.14)] border border-[rgba(26,115,232,0.3)] text-[#8ab4f8] group-hover:bg-[var(--gold-soft)] group-hover:border-[var(--gold-line)] group-hover:text-[var(--gold)] transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Zm5.86 14.03c-.25.7-1.45 1.34-2 1.42-.51.08-1.15.11-1.86-.12-.43-.14-.98-.32-1.68-.62-2.96-1.28-4.89-4.26-5.04-4.46-.15-.2-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.46.27-.3.58-.37.78-.37.2 0 .39 0 .56.01.18.01.42-.07.65.5.25.6.85 2.06.92 2.21.07.15.12.33.02.53-.1.2-.15.32-.3.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.61.17.3.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.36 1.46.3.15.48.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.72.81 2.01.96.3.15.49.22.56.35.08.13.08.75-.17 1.45Z"/></svg>
                </span>
                <span className="icon-link-text flex flex-col gap-0.25 min-w-0">
                  <strong className="text-[13.8px] text-white font-bold">WhatsApp</strong>
                  <span className="text-[11.8px] text-[var(--ink-faint)] truncate">Quick chat</span>
                </span>
              </a>

              <a className="icon-link flex items-center gap-3 p-3.5 rounded-xl border border-[var(--line)] bg-[rgba(255,255,255,0.03)] hover:border-[var(--gold-line)] hover:bg-[var(--gold-soft)] hover:-translate-y-0.5 transition-all group" href="https://wphossain.com" target="_blank" rel="noopener">
                <span className="icon-link-badge flex-none w-10.5 h-10.5 rounded-xl grid place-items-center bg-[rgba(26,115,232,0.14)] border border-[rgba(26,115,232,0.3)] text-[#8ab4f8] group-hover:bg-[var(--gold-soft)] group-hover:border-[var(--gold-line)] group-hover:text-[var(--gold)] transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9.2"/><path d="M2.8 12h18.4M12 2.8c2.6 2.6 4 6 4 9.2s-1.4 6.6-4 9.2c-2.6-2.6-4-6-4-9.2s1.4-6.6 4-9.2z"/></svg>
                </span>
                <span className="icon-link-text flex flex-col gap-0.25 min-w-0">
                  <strong className="text-[13.8px] text-white font-bold">Website</strong>
                  <span className="text-[11.8px] text-[var(--ink-faint)] truncate">wphossain.com</span>
                </span>
              </a>

              <a className="icon-link flex items-center gap-3 p-3.5 rounded-xl border border-[var(--line)] bg-[rgba(255,255,255,0.03)] hover:border-[var(--gold-line)] hover:bg-[var(--gold-soft)] hover:-translate-y-0.5 transition-all group" href="https://www.linkedin.com/in/wphossain/" target="_blank" rel="noopener">
                <span className="icon-link-badge flex-none w-10.5 h-10.5 rounded-xl grid place-items-center bg-[rgba(26,115,232,0.14)] border border-[rgba(26,115,232,0.3)] text-[#8ab4f8] group-hover:bg-[var(--gold-soft)] group-hover:border-[var(--gold-line)] group-hover:text-[var(--gold)] transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7.5 0h3.8v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.53 1.72-2.53 3.49V23h-4V8z"/></svg>
                </span>
                <span className="icon-link-text flex flex-col gap-0.25 min-w-0">
                  <strong className="text-[13.8px] text-white font-bold">LinkedIn</strong>
                  <span className="text-[11.8px] text-[var(--ink-faint)] truncate">/in/wphossain</span>
                </span>
              </a>
            </div>
          </section>

          <footer className="site-footer text-center text-[13px] text-[var(--ink-faint)] py-5">
            <p><strong>WPHossain</strong> — Mikail Hossain, Google Ads Specialist for HVAC Contractors. © 2026. Serving the USA, Canada, Australia, New Zealand, and the UK.</p>
          </footer>
        </div>
      </main>

      {/* Floating WhatsApp Action */}
      <a className="floating-wa fixed right-5 bottom-5 z-50 w-14.5 h-14.5 rounded-full grid place-items-center bg-[linear-gradient(160deg,#25D366,#128C7E)] text-white shadow-[0_14px_34px_rgba(37,211,102,0.4)] transition-all hover:scale-105" href="https://wa.me/10000000000" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
        <span className="floating-wa-ring absolute inset-0 rounded-full border-[1.5px] border-[#25D366] animate-[wa-pulse_2.2s_ease-out_infinite]" />
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Zm5.86 14.03c-.25.7-1.45 1.34-2 1.42-.51.08-1.15.11-1.86-.12-.43-.14-.98-.32-1.68-.62-2.96-1.28-4.89-4.26-5.04-4.46-.15-.2-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.46.27-.3.58-.37.78-.37.2 0 .39 0 .56.01.18.01.42-.07.65.5.25.6.85 2.06.92 2.21.07.15.12.33.02.53-.1.2-.15.32-.3.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.61.17.3.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.36 1.46.3.15.48.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.72.81 2.01.96.3.15.49.22.56.35.08.13.08.75-.17 1.45Z"/></svg>
      </a>

      {/* Script injection for Zcal scheduler */}
      <script type="text/javascript" async src="https://static.zcal.co/embed/v1/embed.js" />
    </>
  );
}
