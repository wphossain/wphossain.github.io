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

export const metadata = {
  title: 'WPHossain | Google Ads Specialist for HVAC Contractors',
  description: 'Google Ads Specialist for HVAC contractors. Search Ads, Conversion Tracking, GTM, GA4 — built to turn ad spend into booked service calls.',
};

const faqs = [
  { question: "How much ad budget do I need?", answer: "It depends on your service area and competition. For most local HVAC businesses, the better starting question isn't budget size — it's whether that budget is being spent efficiently and tracked correctly." },
  { question: "How long before I see results?", answer: "Some improvements show up quickly after campaign cleanup and tracking fixes, especially if the account already has demand. Bigger gains build over time as search-term quality and targeting improve." },
  { question: "Which industries do you work with?", answer: "HVAC is the primary focus. I also work with plumbing, roofing, and electrical contractors, plus cleaning, landscaping, pest control, and garage door companies where the same call-focused approach applies." },
  { question: "What tracking will I actually get?", answer: "GTM, GA4, and conversion tracking are core to every engagement — calls, form fills, and booking clicks are tracked so you can see exactly what's producing service calls." },
  { question: "Do you require long-term contracts?", answer: "No lock-in is required. The audit and early setup work are designed to show value quickly, so continuing makes sense on its own merits." },
  { question: "Can Google Ads handle seasonal HVAC demand?", answer: "Yes. Cooling demand, heating demand, and emergency search behavior shift throughout the year, and campaign structure and messaging should shift with them." }
];

export default function Home() {
  return (
    <>
      <StructuredData faqs={faqs} />
      <Sidebar />
      <MobileHeader />

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
            {/* Subtle top/bottom radial glow */}
            <div className="absolute top-0 right-0 w-[45%] h-[40%] bg-[radial-gradient(circle,rgba(26,115,232,0.07),transparent_70%)] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-[radial-gradient(circle,rgba(242,169,61,0.04),transparent_70%)] pointer-events-none" />

            <div className="max-w-[var(--container)] mx-auto w-full px-10 py-16 max-lg:px-6">
              <div className="hero-grid grid grid-cols-[1.15fr_0.85fr] max-xl:grid-cols-1 gap-10 items-center">
                <div className="hero-copy">
                  <span className="eyebrow">Google Ads Specialist · HVAC Contractors</span>
                  <h2 className="text-[clamp(32px,4.5vw,52px)] leading-[1.1] mb-5 text-white font-bold tracking-tight">
                    More booked <span className="text-[var(--blue-light)] bg-gradient-to-r from-[#1a73e8] to-[#4c9bff] bg-clip-text text-transparent">service calls</span>. Less wasted ad spend.
                  </h2>
                  <p className="lead text-[17px] text-[var(--ink-dim)] max-w-[580px] leading-relaxed mb-6.5">
                    Search Ads, Conversion Tracking, GTM, and GA4 — set up correctly so every lead is tracked and every dollar is measured.
                  </p>
                  <div className="hero-actions flex flex-wrap gap-3.5 my-7 max-sm:flex-col">
                    <a className="btn btn-primary px-7 py-3.5" href="#contact">
                      Book Free Consultation
                      <svg className="btn-arrow" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                    </a>
                    <a className="btn btn-ghost px-7 py-3.5" href="https://wa.me/10000000000" target="_blank" rel="noopener">
                      Chat on WhatsApp
                    </a>
                  </div>
                  <div className="trust-pills flex flex-wrap gap-2.5">
                    <span className="pill"><span className="dot" />Google Ads Certified</span>
                    <span className="pill"><span className="dot" />GTM + GA4 Tracking</span>
                    <span className="pill"><span className="dot" />Local Service Focus</span>
                  </div>
                </div>
                
                {/* Stunning Live Ad metrics mockup component */}
                <div className="w-full">
                  <PulseCard />
                </div>
              </div>

              {/* Hero Credentials Footer */}
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
                  Everything a Google Ads account needs to produce booked jobs.
                </h2>
                <p className="text-[var(--ink-dim)] text-[16px] leading-relaxed">
                  From strategy to daily optimization — built around repair, install, maintenance, and emergency calls.
                </p>
              </div>
              <div className="grid-4 mt-8">
                {[
                  {tag:"Core",title:"Google Search Ads",desc:"High-intent search campaigns for AC repair, furnace repair, and installs.",icon:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"},
                  {tag:"Reach",title:"Performance Max",desc:"Layered on top of Search once tracking is solid.",icon:"M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"},
                  {tag:"Tracking",title:"Conversion Tracking",desc:"Calls, form fills, and booking clicks tracked accurately.",icon:"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"},
                  {tag:"Setup",title:"Google Tag Manager",desc:"Clean GTM container setup — no duplicate tags.",icon:"M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z"},
                  {tag:"Setup",title:"GA4 Configuration",desc:"Analytics configured to your actual funnel.",icon:"M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"},
                  {tag:"Audit",title:"Google Ads Audit",desc:"A full account review — wasted spend, weak match types.",icon:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"},
                  {tag:"Conversion",title:"Landing Page Review",desc:"Headline clarity, trust placement, and CTA flow.",icon:"M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"},
                  {tag:"Growth",title:"Campaign Optimization",desc:"Ongoing search-term cleanup, bid and budget refinement.",icon:"M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"}
                ].map((s,i) => (
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

          {/* WHY ME */}
          <section className="w-full bg-[#050f1f] border-b border-[var(--line)]" id="why-me">
            <div className="max-w-[var(--container)] mx-auto px-10 py-22 max-lg:px-6">
              <div className="sec-head max-w-[680px] mb-10">
                <span className="eyebrow">Why Me</span>
                <h2 className="text-[clamp(26px,3.5vw,36px)] leading-tight mb-3 text-white font-bold">
                  A specialist who also understands the page the click lands on.
                </h2>
              </div>
              <div className="grid-2 gap-6">
                <div className="card p-6.5 bg-[#0a1c34]/50 border border-white/5 rounded-2xl">
                  <ul className="bullets flex flex-col gap-4">
                    {["Built for HVAC, not generic PPC. Campaigns are structured around repair, install, maintenance, and emergency call intent.","Tracking that holds up under scrutiny. GTM and GA4 are set up so every lead is tracked and every dollar of spend is measured.","A former websites/CMS specialist. That background means I look closely at landing pages too — not just campaign settings."].map((t,i) => (
                      <li key={i} className="relative pl-6.5 text-[14.5px] text-[var(--ink-dim)] leading-relaxed before:absolute before:left-0 before:top-2 before:w-2.25 before:h-2.25 before:rounded-[3px] before:bg-[var(--blue-light)]">{t}</li>
                    ))}
                  </ul>
                </div>
                <div className="card p-6.5 bg-[#0a1c34]/50 border border-white/5 rounded-2xl">
                  <ul className="bullets flex flex-col gap-4">
                    {["Fewer wasted clicks. The focus is qualified calls, not raw click volume or impression share.","Clear reporting on what's working. See exactly which keyword, ad, and landing page is generating real service calls.","Built for growing local service teams. A good fit for HVAC contractors with 3-30 employees."].map((t,i) => (
                      <li key={i} className="relative pl-6.5 text-[14.5px] text-[var(--ink-dim)] leading-relaxed before:absolute before:left-0 before:top-2 before:w-2.25 before:h-2.25 before:rounded-[3px] before:bg-[var(--blue-light)]">{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* PROCESS */}
          <section className="w-full bg-[#0a1c34] border-b border-[var(--line)]" id="process">
            <div className="max-w-[var(--container)] mx-auto px-10 py-22 max-lg:px-6">
              <div className="sec-head max-w-[680px] mb-10">
                <span className="eyebrow">Process</span>
                <h2 className="text-[clamp(26px,3.5vw,36px)] leading-tight mb-3 text-white font-bold">
                  A repeatable five-step system, not a one-off campaign launch.
                </h2>
              </div>
              <div className="process-track grid grid-cols-5 gap-4.5 max-xl:grid-cols-2 max-md:grid-cols-1">
                {[
                  {num:"1",title:"Audit",desc:"Full review of the account, keywords, and tracking."},
                  {num:"2",title:"Tracking Setup",desc:"GTM and GA4 configured correctly."},
                  {num:"3",title:"Campaign Build",desc:"Structure rebuilt around local service demand."},
                  {num:"4",title:"Launch",desc:"Campaigns go live with clean tracking."},
                  {num:"5",title:"Optimization",desc:"Regular review and refinement."}
                ].map((p,i) => (
                  <article key={i} className="process-step bg-[#050f1f]/50 border border-white/5 rounded-2xl p-5.5 transition-all hover:border-[var(--blue-light)]/25 hover:bg-[#050f1f]/80 duration-300">
                    <div className="num font-display text-[12px] font-bold text-[var(--navy-900)] bg-[var(--blue-light)] w-6.5 h-6.5 rounded-lg grid place-items-center mb-4">{p.num}</div>
                    <h3 className="text-[16px] font-bold text-white mb-2">{p.title}</h3>
                    <p className="text-[13.5px] text-[var(--ink-dim)] leading-relaxed">{p.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* PORTFOLIO — With SVG Dashboard Mockups */}
          <section className="w-full bg-[#050f1f] border-b border-[var(--line)]" id="results">
            <div className="max-w-[var(--container)] mx-auto px-10 py-22 max-lg:px-6">
              <div className="sec-head max-w-[680px] mb-10">
                <span className="eyebrow">Results / Portfolio</span>
                <h2 className="text-[clamp(26px,3.5vw,36px)] leading-tight mb-3 text-white font-bold">
                  Real dashboards and account snapshots — added as they're ready.
                </h2>
                <p className="text-[var(--ink-dim)] text-[16px] leading-relaxed">
                  The graphics below are illustrative mockups so the layout reads complete. Real screenshots and numbers replace them before launch.
                </p>
              </div>
              <div className="grid-3 mt-8">
                {[
                  { title: "HVAC Search Campaign", desc: "Clicks, CPL, CTR breakdown", comp: <GoogleAdsDashboardMockup /> },
                  { title: "GA4 Analytics", desc: "Traffic & conversion events", comp: <GA4DashboardMockup /> },
                  { title: "Conversion Tracking Setup", desc: "Calls, forms, offline events", comp: <ConversionTrackingMockup /> },
                  { title: "Cost-Per-Call Trend", desc: "Optimization window", comp: <CostPerCallTrendMockup /> },
                  { title: "Landing Page Lift", desc: "Before/after conversion rate", comp: <LandingPageConversionMockup /> },
                  { title: "Local Keyword Expansion", desc: "New market search terms", comp: <KeywordExpansionMockup /> }
                ].map((item, i) => (
                  <div key={i} className="portfolio-card bg-[#0a1c34]/50 border border-white/5 rounded-2xl overflow-hidden group hover:border-[var(--blue-light)]/30 hover:bg-[#0a1c34]/80 transition-all duration-300 hover:-translate-y-1">
                    <div className="portfolio-thumb h-[135px] overflow-hidden bg-white">{item.comp}</div>
                    <div className="p-5">
                      <h3 className="text-[15.5px] font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-[13px] text-[var(--ink-faint)] font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CASE STUDIES */}
          <section className="w-full bg-[#0a1c34] border-b border-[var(--line)]" id="case-studies">
            <div className="max-w-[var(--container)] mx-auto px-10 py-22 max-lg:px-6">
              <div className="sec-head max-w-[680px] mb-10">
                <span className="eyebrow">Case Studies</span>
                <h2 className="text-[clamp(26px,3.5vw,36px)] leading-tight mb-3 text-white font-bold">
                  Real accounts, real fixes — details added as clients sign off.
                </h2>
              </div>
              <div className="grid-3 mt-8">
                {[
                  {niche:"HVAC",challenge:"Cost-per-lead had crept up as broad-match keywords pulled in low-intent clicks.",strategy:"Rebuilt the account around tightly themed ad groups, added call tracking.",result:"Example pattern: cost-per-call trending down while booked-job volume holds steady."},
                  {niche:"Plumbing",challenge:"Conversions were technically live, but forms, calls, and chat weren't unified.",strategy:"Rebuilt GTM and GA4 from scratch with unified call, form, and chat tracking.",result:"Example pattern: one accurate lead count across every channel."},
                  {niche:"Roofing",challenge:"Paid traffic was landing on a generic homepage, most visitors left without quoting.",strategy:"Built a dedicated landing page matched to the ad message with a shorter form.",result:"Example pattern: higher share of visitors requesting a quote from the same ad spend."}
                ].map((c,i) => (
                  <article key={i} className="case-card bg-[#050f1f]/50 border border-white/5 rounded-[18px] p-6.5 flex flex-col gap-4.5 hover:border-[var(--blue-light)]/30 hover:bg-[#050f1f]/80 transition-all duration-300 hover:-translate-y-1">
                    <span className="text-[11.5px] font-extrabold tracking-[0.1em] uppercase text-[var(--blue-light)]">{c.niche}</span>
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
                      <p className="text-[13.8px] text-[var(--ink-dim)] leading-relaxed">{c.result}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* TESTIMONIALS */}
          <section className="w-full bg-[#050f1f] border-b border-[var(--line)]" id="testimonials">
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

          {/* CERTIFICATIONS — With SVG Badges */}
          <section className="w-full bg-[#0a1c34] border-b border-[var(--line)]" id="certifications">
            <div className="max-w-[var(--container)] mx-auto px-10 py-22 max-lg:px-6">
              <div className="sec-head max-w-[680px] mb-10">
                <span className="eyebrow">Certifications</span>
                <h2 className="text-[clamp(26px,3.5vw,36px)] leading-tight mb-3 text-white font-bold">
                  Credentials on file — real certificates added as issued.
                </h2>
              </div>
              <div className="grid-4 mt-8">
                <div className="cert-card bg-[#050f1f]/50 border border-white/5 rounded-2xl overflow-hidden hover:border-[var(--gold)]/30 hover:bg-[#050f1f]/80 transition-all duration-300 hover:-translate-y-1"><div className="cert-thumb p-4 bg-white"><GoogleAdsCertBadge /></div></div>
                <div className="cert-card bg-[#050f1f]/50 border border-white/5 rounded-2xl overflow-hidden hover:border-[var(--gold)]/30 hover:bg-[#050f1f]/80 transition-all duration-300 hover:-translate-y-1"><div className="cert-thumb p-4 bg-white"><GoogleAnalyticsCertBadge /></div></div>
                <div className="cert-card bg-[#050f1f]/50 border border-white/5 rounded-2xl overflow-hidden hover:border-[var(--gold)]/30 hover:bg-[#050f1f]/80 transition-all duration-300 hover:-translate-y-1"><div className="cert-thumb p-4 bg-white"><GTMCertBadge /></div></div>
                <div className="cert-card bg-[#050f1f]/50 border border-white/5 rounded-2xl overflow-hidden hover:border-[var(--gold)]/30 hover:bg-[#050f1f]/80 transition-all duration-300 hover:-translate-y-1"><div className="cert-thumb p-4 bg-white"><MetaCertBadge /></div></div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="w-full bg-[#050f1f] border-b border-[var(--line)]" id="faq">
            <div className="max-w-[var(--container)] mx-auto px-10 py-22 max-lg:px-6">
              <div className="sec-head max-w-[680px] mb-10">
                <span className="eyebrow">FAQ</span>
                <h2 className="text-[clamp(26px,3.5vw,36px)] leading-tight mb-3 text-white font-bold">
                  Everything HVAC owners usually want to know before booking a call.
                </h2>
              </div>
              <FaqAccordion />
            </div>
          </section>

          {/* CONTACT & CALENDAR */}
          <section className="w-full bg-[#0a1c34]" id="contact">
            <div className="max-w-[var(--container)] mx-auto px-10 py-22 max-lg:px-6">
              <div className="sec-head max-w-[680px] mb-10">
                <span className="eyebrow">Book a Call & Contact</span>
                <h2 className="text-[clamp(26px,3.5vw,36px)] leading-tight mb-3 text-white font-bold">
                  Book a free Google Ads audit, or reach out directly.
                </h2>
              </div>
              
              {/* What to expect cards */}
              <div className="mb-10">
                <span className="eyebrow block mb-4.5">What to expect on the call</span>
                <div className="grid grid-cols-5 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4">
                  {[
                    { title: "Campaign Audit", desc: "A focused review of what's helping or hurting lead flow right now." },
                    { title: "Structure Check", desc: "Feedback on campaign structure, search intent, and wasted spend risks." },
                    { title: "Tracking Review", desc: "A quick check on tracking quality — calls, forms, and booking actions." },
                    { title: "Landing Page CRO", desc: "Landing page observations that may be reducing call conversion." },
                    { title: "Next Steps Plan", desc: "Clear next steps you can act on, whether or not we work together." }
                  ].map((item, i) => (
                    <div key={i} className="p-4.5 rounded-xl border border-white/5 bg-[#050f1f]/50 flex flex-col gap-2 transition-all hover:border-[var(--blue-light)]/20 hover:bg-[#050f1f]/80 duration-300">
                      <span className="text-[11px] font-extrabold text-[var(--gold)] uppercase tracking-wider">0{i+1}. {item.title}</span>
                      <p className="text-[13.2px] text-[var(--ink-dim)] leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Full-width Calendar */}
              <div className="w-full mb-10 shadow-2xl rounded-2xl overflow-hidden border border-white/5">
                <ZcalEmbed />
              </div>

              <div className="icon-link-grid grid grid-cols-4 max-xl:grid-cols-2 max-sm:grid-cols-1 gap-4 mt-6">
                {[
                  {label:"Email",sub:"Contact@wphossain.com",href:"mailto:Contact@wphossain.com"},
                  {label:"WhatsApp",sub:"Quick chat",href:"https://wa.me/10000000000"},
                  {label:"Website",sub:"wphossain.com",href:"https://wphossain.com"},
                  {label:"LinkedIn",sub:"/in/wphossain",href:"https://www.linkedin.com/in/wphossain/"}
                ].map((l,i) => (
                  <a key={i} className="icon-link flex items-center gap-3.5 p-4 rounded-xl border border-white/5 bg-[#050f1f]/50 hover:border-[var(--gold-line)] hover:bg-[var(--gold-soft)] transition-all duration-300" href={l.href} target="_blank" rel="noopener">
                    <span className="icon-link-badge flex-none w-10.5 h-10.5 rounded-xl grid place-items-center bg-[rgba(26,115,232,0.14)] border border-[rgba(26,115,232,0.3)] text-[#8ab4f8]">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9.2"/><path d="M2.8 12h18.4M12 2.8c2.6 2.6 4 6 4 9.2s-1.4 6.6-4 9.2c-2.6-2.6-4-6-4-9.2s1.4-6.6 4-9.2z"/></svg>
                    </span>
                    <span className="icon-link-text flex flex-col gap-0.25 min-w-0">
                      <strong className="text-[14px] text-white font-bold">{l.label}</strong>
                      <span className="text-[12px] text-[var(--ink-faint)] truncate">{l.sub}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </section>

          <footer className="site-footer bg-[#050f1f] border-t border-[var(--line)] text-center text-[13px] text-[var(--ink-faint)] py-7">
            <div className="max-w-[var(--container)] mx-auto px-10">
              <p><strong className="text-[var(--ink-dim)]">WPHossain</strong> — Mikail Hossain, Google Ads Specialist for HVAC Contractors. © 2026. Serving the USA, Canada, Australia, New Zealand, and the UK.</p>
            </div>
          </footer>

        </div>
      </main>

      {/* Floating WhatsApp Button */}
      <a className="floating-wa fixed right-5 bottom-5 z-50 w-14.5 h-14.5 rounded-full grid place-items-center bg-[linear-gradient(160deg,#25D366,#128C7E)] text-white shadow-lg hover:scale-105 transition-all" href="https://wa.me/10000000000" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
        <span className="floating-wa-ring absolute inset-0 rounded-full border-[1.5px] border-[#25D366] animate-[wa-pulse_2.2s_ease-out_infinite]" />
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.05-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-2.078l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.87 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.135-1.61a11.783 11.783 0 005.912 1.61h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      <Script src="https://static.zcal.co/embed/v1/embed.js" strategy="lazyOnload" />
    </>
  );
}
