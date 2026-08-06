import React from 'react';
import { Sidebar } from '@/components/public/Sidebar';
import { MobileHeader } from '@/components/public/MobileHeader';
import { PulseCard } from '@/components/public/PulseCard';
import { TestimonialsSlider } from '@/components/public/TestimonialsSlider';
import { FaqAccordion } from '@/components/public/FaqAccordion';
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

      <main className="content lg:ml-[var(--sidebar-w)] p-6.5 max-lg:p-4.5">
        <div className="content-inner max-w-[var(--container)] mx-auto w-full flex flex-col gap-5">

          {/* HERO */}
          <section className="panel hero p-11 max-lg:p-7" id="home">
            <div className="hero-grid grid grid-cols-[1.15fr_0.85fr] max-xl:grid-cols-1 gap-8.5 items-center">
              <div className="hero-copy">
                <span className="eyebrow">Google Ads Specialist · HVAC Contractors</span>
                <h2 className="text-[clamp(30px,4vw,46px)] leading-[1.12] mb-4 text-white">More booked <span className="text-[var(--blue)]">service calls</span>. Less wasted ad spend.</h2>
                <p className="lead text-[16.5px] text-[var(--ink-dim)] max-w-[560px]">Search Ads, Conversion Tracking, GTM, and GA4 — set up correctly so every lead is tracked and every dollar is measured.</p>
                <div className="hero-actions flex flex-wrap gap-3 my-6.5 max-sm:flex-col">
                  <a className="btn btn-primary" href="#contact">Book Free Consultation<svg className="btn-arrow" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
                  <a className="btn btn-ghost" href="https://wa.me/10000000000" target="_blank" rel="noopener">Chat on WhatsApp</a>
                </div>
                <div className="trust-pills flex flex-wrap gap-2.25">
                  <span className="pill"><span className="w-1.5 h-1.5 rounded-full bg-[var(--blue)] mr-1.5" />Google Ads Certified</span>
                  <span className="pill"><span className="w-1.5 h-1.5 rounded-full bg-[var(--blue)] mr-1.5" />GTM + GA4 Tracking</span>
                  <span className="pill"><span className="w-1.5 h-1.5 rounded-full bg-[var(--blue)] mr-1.5" />Local Service Focus</span>
                </div>
              </div>
              <PulseCard />
            </div>
            <div className="hero-certs mt-8 pt-6 border-t border-[var(--line)]">
              <span className="hero-certs-label block text-[11px] font-extrabold tracking-[0.1em] uppercase text-[var(--ink-faint)] mb-3.5">Certified & trained on</span>
              <div className="cert-row flex flex-wrap gap-3">
                <span className="cert-badge"><span className="ico"><svg viewBox="0 0 24 24" width="26" height="26"><path d="M12,12 L12,3 A9,9 0 0,1 21,12 Z" fill="#4285F4"/><path d="M12,12 L12,3 A9,9 0 0,1 21,12 Z" fill="#EA4335" transform="rotate(90 12 12)"/><path d="M12,12 L12,3 A9,9 0 0,1 21,12 Z" fill="#FBBC05" transform="rotate(180 12 12)"/><path d="M12,12 L12,3 A9,9 0 0,1 21,12 Z" fill="#34A853" transform="rotate(270 12 12)"/></svg></span>Google Ads</span>
                <span className="cert-badge"><span className="ico" style={{background:"#F9AB00"}}><svg viewBox="0 0 24 24" width="14" height="14"><rect x="4" y="13" width="4" height="7" rx="1" fill="#fff"/><rect x="10" y="8" width="4" height="12" rx="1" fill="#fff"/><rect x="16" y="3" width="4" height="17" rx="1" fill="#fff"/></svg></span>Google Analytics</span>
                <span className="cert-badge"><span className="ico" style={{background:"#4285F4"}}><svg viewBox="0 0 24 24" width="14" height="14"><path d="M12.5 3H6a2 2 0 0 0-2 2v6.5a2 2 0 0 0 .586 1.414l7.5 7.5a2 2 0 0 0 2.828 0l6.5-6.5a2 2 0 0 0 0-2.828l-7.5-7.5A2 2 0 0 0 12.5 3z" fill="#fff"/><circle cx="8" cy="8" r="1.6" fill="#4285F4"/></svg></span>Tag Manager</span>
                <span className="cert-badge"><span className="ico" style={{background:"#21759B"}}><svg viewBox="0 0 24 24" width="14" height="14"><path d="M3 5l3.2 14h2.1l2.2-9 2.2 9h2.1L18 5h-2.3l-1.9 9-2-9h-1.9l-2 9-1.9-9H3z" fill="#fff"/></svg></span>WordPress</span>
              </div>
            </div>
          </section>

          {/* SERVICES */}
          <section className="panel" id="services">
            <div className="sec-head max-w-[680px] mb-8">
              <span className="eyebrow">Services</span>
              <h2 className="text-[clamp(24px,3vw,32px)] leading-snug mb-2.5">Everything a Google Ads account needs to produce booked jobs.</h2>
              <p className="text-[var(--ink-dim)] text-[15.5px]">From strategy to daily optimization — built around repair, install, maintenance, and emergency calls.</p>
            </div>
            <div className="grid-4 mt-6">
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
                <article key={i} className="card service-card">
                  <div className="service-icon w-10 h-10 rounded-xl bg-[rgba(26,115,232,0.12)] border border-[rgba(26,115,232,0.25)] grid place-items-center mb-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8ab4f8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon} /></svg>
                  </div>
                  <span className="tag inline-block text-[10.5px] font-extrabold tracking-[0.08em] uppercase text-[var(--gold)] bg-[var(--gold-soft)] border border-[var(--gold-line)] px-2.25 py-1 rounded-full mb-2">{s.tag}</span>
                  <h3 className="text-[17.5px] mb-2 font-bold text-white">{s.title}</h3>
                  <p className="text-[14px] text-[var(--ink-dim)]">{s.desc}</p>
                </article>
              ))}
            </div>
          </section>

          {/* WHY ME */}
          <section className="panel" id="why-me">
            <div className="sec-head max-w-[680px] mb-8">
              <span className="eyebrow">Why Me</span>
              <h2 className="text-[clamp(24px,3vw,32px)] leading-snug mb-2.5">A specialist who also understands the page the click lands on.</h2>
            </div>
            <div className="grid-2 gap-4.5">
              <div className="card"><ul className="bullets flex flex-col gap-3.5">
                {["Built for HVAC, not generic PPC. Campaigns are structured around repair, install, maintenance, and emergency call intent.","Tracking that holds up under scrutiny. GTM and GA4 are set up so every lead is tracked and every dollar of spend is measured.","A former websites/CMS specialist. That background means I look closely at landing pages too — not just campaign settings."].map((t,i) => (
                  <li key={i} className="relative pl-6 text-[14.5px] text-[var(--ink-dim)] before:absolute before:left-0 before:top-2 before:w-2.25 before:h-2.25 before:rounded-[3px] before:bg-[var(--blue)]">{t}</li>
                ))}
              </ul></div>
              <div className="card"><ul className="bullets flex flex-col gap-3.5">
                {["Fewer wasted clicks. The focus is qualified calls, not raw click volume or impression share.","Clear reporting on what's working. See exactly which keyword, ad, and landing page is generating real service calls.","Built for growing local service teams. A good fit for HVAC contractors with 3-30 employees."].map((t,i) => (
                  <li key={i} className="relative pl-6 text-[14.5px] text-[var(--ink-dim)] before:absolute before:left-0 before:top-2 before:w-2.25 before:h-2.25 before:rounded-[3px] before:bg-[var(--blue)]">{t}</li>
                ))}
              </ul></div>
            </div>
          </section>

          {/* PROCESS */}
          <section className="panel" id="process">
            <div className="sec-head max-w-[680px] mb-8">
              <span className="eyebrow">Process</span>
              <h2 className="text-[clamp(24px,3vw,32px)] leading-snug mb-2.5">A repeatable five-step system, not a one-off campaign launch.</h2>
            </div>
            <div className="process-track grid grid-cols-5 gap-3.5 max-xl:grid-cols-2 max-md:grid-cols-1">
              {[
                {num:"1",title:"Audit",desc:"Full review of the account, keywords, and tracking."},
                {num:"2",title:"Tracking Setup",desc:"GTM and GA4 configured correctly."},
                {num:"3",title:"Campaign Build",desc:"Structure rebuilt around local service demand."},
                {num:"4",title:"Launch",desc:"Campaigns go live with clean tracking."},
                {num:"5",title:"Optimization",desc:"Regular review and refinement."}
              ].map((p,i) => (
                <article key={i} className="process-step bg-[rgba(255,255,255,0.03)] border border-[var(--line)] rounded-2xl p-4.5">
                  <div className="num font-display text-[12px] font-bold text-[var(--navy-900)] bg-[var(--blue)] w-6.5 h-6.5 rounded-lg grid place-items-center mb-3">{p.num}</div>
                  <h3 className="text-[15.5px] font-bold text-white mb-1.5">{p.title}</h3>
                  <p className="text-[13px] text-[var(--ink-dim)]">{p.desc}</p>
                </article>
              ))}
            </div>
          </section>

          {/* PORTFOLIO — With SVG Dashboard Mockups */}
          <section className="panel" id="results">
            <div className="sec-head max-w-[680px] mb-8">
              <span className="eyebrow">Results / Portfolio</span>
              <h2 className="text-[clamp(24px,3vw,32px)] leading-snug mb-2.5">Real dashboards and account snapshots — added as they're ready.</h2>
              <p className="text-[var(--ink-dim)] text-[15.5px]">The graphics below are illustrative mockups so the layout reads complete. Real screenshots and numbers replace them before launch.</p>
            </div>
            <div className="grid-3 mt-6">
              <div className="portfolio-card bg-[rgba(255,255,255,0.03)] border border-[var(--line)] rounded-2xl overflow-hidden group hover:border-[var(--blue)]/50 transition-all hover:-translate-y-1">
                <div className="portfolio-thumb h-[130px] overflow-hidden bg-white"><GoogleAdsDashboardMockup /></div>
                <div className="p-4"><h3 className="text-[15px] font-bold text-white mb-1">HVAC Search Campaign</h3><p className="text-[13px] text-[var(--ink-faint)]">Clicks, CPL, CTR breakdown</p></div>
              </div>
              <div className="portfolio-card bg-[rgba(255,255,255,0.03)] border border-[var(--line)] rounded-2xl overflow-hidden group hover:border-[var(--blue)]/50 transition-all hover:-translate-y-1">
                <div className="portfolio-thumb h-[130px] overflow-hidden bg-white"><GA4DashboardMockup /></div>
                <div className="p-4"><h3 className="text-[15px] font-bold text-white mb-1">GA4 Analytics</h3><p className="text-[13px] text-[var(--ink-faint)]">Traffic & conversion events</p></div>
              </div>
              <div className="portfolio-card bg-[rgba(255,255,255,0.03)] border border-[var(--line)] rounded-2xl overflow-hidden group hover:border-[var(--blue)]/50 transition-all hover:-translate-y-1">
                <div className="portfolio-thumb h-[130px] overflow-hidden bg-white"><ConversionTrackingMockup /></div>
                <div className="p-4"><h3 className="text-[15px] font-bold text-white mb-1">Conversion Tracking Setup</h3><p className="text-[13px] text-[var(--ink-faint)]">Calls, forms, offline events</p></div>
              </div>
              <div className="portfolio-card bg-[rgba(255,255,255,0.03)] border border-[var(--line)] rounded-2xl overflow-hidden group hover:border-[var(--blue)]/50 transition-all hover:-translate-y-1">
                <div className="portfolio-thumb h-[130px] overflow-hidden bg-white"><CostPerCallTrendMockup /></div>
                <div className="p-4"><h3 className="text-[15px] font-bold text-white mb-1">Cost-Per-Call Trend</h3><p className="text-[13px] text-[var(--ink-faint)]">Optimization window</p></div>
              </div>
              <div className="portfolio-card bg-[rgba(255,255,255,0.03)] border border-[var(--line)] rounded-2xl overflow-hidden group hover:border-[var(--blue)]/50 transition-all hover:-translate-y-1">
                <div className="portfolio-thumb h-[130px] overflow-hidden bg-white"><LandingPageConversionMockup /></div>
                <div className="p-4"><h3 className="text-[15px] font-bold text-white mb-1">Landing Page Lift</h3><p className="text-[13px] text-[var(--ink-faint)]">Before/after conversion rate</p></div>
              </div>
              <div className="portfolio-card bg-[rgba(255,255,255,0.03)] border border-[var(--line)] rounded-2xl overflow-hidden group hover:border-[var(--blue)]/50 transition-all hover:-translate-y-1">
                <div className="portfolio-thumb h-[130px] overflow-hidden bg-white"><KeywordExpansionMockup /></div>
                <div className="p-4"><h3 className="text-[15px] font-bold text-white mb-1">Local Keyword Expansion</h3><p className="text-[13px] text-[var(--ink-faint)]">New market search terms</p></div>
              </div>
            </div>
          </section>

          {/* CASE STUDIES */}
          <section className="panel" id="case-studies">
            <div className="sec-head max-w-[680px] mb-8">
              <span className="eyebrow">Case Studies</span>
              <h2 className="text-[clamp(24px,3vw,32px)] leading-snug mb-2.5">Real accounts, real fixes — details added as clients sign off.</h2>
            </div>
            <div className="grid-3 mt-6">
              {[
                {niche:"HVAC",challenge:"Cost-per-lead had crept up as broad-match keywords pulled in low-intent clicks.",strategy:"Rebuilt the account around tightly themed ad groups, added call tracking.",result:"Example pattern: cost-per-call trending down while booked-job volume holds steady."},
                {niche:"Plumbing",challenge:"Conversions were technically live, but forms, calls, and chat weren't unified.",strategy:"Rebuilt GTM and GA4 from scratch with unified call, form, and chat tracking.",result:"Example pattern: one accurate lead count across every channel."},
                {niche:"Roofing",challenge:"Paid traffic was landing on a generic homepage, most visitors left without quoting.",strategy:"Built a dedicated landing page matched to the ad message with a shorter form.",result:"Example pattern: higher share of visitors requesting a quote from the same ad spend."}
              ].map((c,i) => (
                <article key={i} className="case-card bg-[rgba(255,255,255,0.03)] border border-[var(--line)] rounded-[18px] p-5.5 flex flex-col gap-3 hover:border-[var(--blue)]/50 transition-all hover:-translate-y-1">
                  <span className="text-[11px] font-extrabold tracking-[0.08em] uppercase text-[var(--blue)]">{c.niche}</span>
                  <div className="case-row"><span className="text-[10.5px] font-extrabold tracking-[0.07em] uppercase text-[var(--ink-faint)]">Challenge</span><p className="text-[13.8px] text-[var(--ink-dim)]">{c.challenge}</p></div>
                  <div className="case-row"><span className="text-[10.5px] font-extrabold tracking-[0.07em] uppercase text-[var(--ink-faint)]">Strategy</span><p className="text-[13.8px] text-[var(--ink-dim)]">{c.strategy}</p></div>
                  <div className="case-row mt-auto"><span className="text-[10.5px] font-extrabold tracking-[0.07em] uppercase text-[var(--gold)]">Result</span><p className="text-[13.8px] text-[var(--ink-dim)]">{c.result}</p></div>
                </article>
              ))}
            </div>
          </section>

          {/* TESTIMONIALS */}
          <section className="panel" id="testimonials">
            <div className="sec-head max-w-[680px] mb-8">
              <span className="eyebrow">Testimonials</span>
              <h2 className="text-[clamp(24px,3vw,32px)] leading-snug mb-2.5">What clients say — once the calls start coming in.</h2>
            </div>
            <TestimonialsSlider />
          </section>

          {/* CERTIFICATIONS — With SVG Badges */}
          <section className="panel" id="certifications">
            <div className="sec-head max-w-[680px] mb-8">
              <span className="eyebrow">Certifications</span>
              <h2 className="text-[clamp(24px,3vw,32px)] leading-snug mb-2.5">Credentials on file — real certificates added as issued.</h2>
            </div>
            <div className="grid-4 mt-6">
              <div className="cert-card bg-[rgba(255,255,255,0.03)] border border-[var(--line)] rounded-2xl overflow-hidden hover:border-[var(--gold)]/50 transition-all hover:-translate-y-1"><div className="cert-thumb p-3 bg-white"><GoogleAdsCertBadge /></div></div>
              <div className="cert-card bg-[rgba(255,255,255,0.03)] border border-[var(--line)] rounded-2xl overflow-hidden hover:border-[var(--gold)]/50 transition-all hover:-translate-y-1"><div className="cert-thumb p-3 bg-white"><GoogleAnalyticsCertBadge /></div></div>
              <div className="cert-card bg-[rgba(255,255,255,0.03)] border border-[var(--line)] rounded-2xl overflow-hidden hover:border-[var(--gold)]/50 transition-all hover:-translate-y-1"><div className="cert-thumb p-3 bg-white"><GTMCertBadge /></div></div>
              <div className="cert-card bg-[rgba(255,255,255,0.03)] border border-[var(--line)] rounded-2xl overflow-hidden hover:border-[var(--gold)]/50 transition-all hover:-translate-y-1"><div className="cert-thumb p-3 bg-white"><MetaCertBadge /></div></div>
            </div>
          </section>

          {/* FAQ */}
          <section className="panel" id="faq">
            <div className="sec-head max-w-[680px] mb-8">
              <span className="eyebrow">FAQ</span>
              <h2 className="text-[clamp(24px,3vw,32px)] leading-snug mb-2.5">Everything HVAC owners usually want to know before booking a call.</h2>
            </div>
            <FaqAccordion />
          </section>

          {/* CONTACT */}
          <section className="panel" id="contact">
            <div className="sec-head max-w-[680px] mb-8">
              <span className="eyebrow">Book a Call & Contact</span>
              <h2 className="text-[clamp(24px,3vw,32px)] leading-snug mb-2.5">Book a free Google Ads audit, or reach out directly.</h2>
            </div>
            <div className="book-panel bg-[linear-gradient(165deg,var(--navy-700),var(--panel))] border border-[var(--line)] rounded-[20px] p-7 grid grid-cols-[30%_1fr] max-xl:grid-cols-1 gap-7.5 items-start">
              <div>
                <span className="eyebrow block mb-2.5">What to expect</span>
                <h3 className="text-[18px] font-bold text-white mb-2.5">What to expect on the call.</h3>
                <ul className="bullets flex flex-col gap-3.5 mt-1.5">
                  {["A focused review of what's helping or hurting lead flow right now.","Feedback on campaign structure, search intent, and wasted spend risks.","A quick check on tracking quality — calls, forms, and booking actions.","Landing page observations that may be reducing call conversion.","Clear next steps you can act on, whether or not we work together."].map((t,i) => (
                    <li key={i} className="relative pl-6 text-[14.5px] text-[var(--ink-dim)] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-[3px] before:bg-[var(--blue)]">{t}</li>
                  ))}
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
            <div className="icon-link-grid grid grid-cols-4 max-xl:grid-cols-2 max-sm:grid-cols-1 gap-3.5 mt-4">
              {[
                {label:"Email",sub:"Contact@wphossain.com",href:"mailto:Contact@wphossain.com"},
                {label:"WhatsApp",sub:"Quick chat",href:"https://wa.me/10000000000"},
                {label:"Website",sub:"wphossain.com",href:"https://wphossain.com"},
                {label:"LinkedIn",sub:"/in/wphossain",href:"https://www.linkedin.com/in/wphossain/"}
              ].map((l,i) => (
                <a key={i} className="icon-link flex items-center gap-3 p-3.5 rounded-xl border border-[var(--line)] bg-[rgba(255,255,255,0.03)] hover:border-[var(--gold-line)] hover:bg-[var(--gold-soft)] transition-all" href={l.href} target="_blank" rel="noopener">
                  <span className="icon-link-badge flex-none w-10.5 h-10.5 rounded-xl grid place-items-center bg-[rgba(26,115,232,0.14)] border border-[rgba(26,115,232,0.3)] text-[#8ab4f8]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9.2"/><path d="M2.8 12h18.4M12 2.8c2.6 2.6 4 6 4 9.2s-1.4 6.6-4 9.2c-2.6-2.6-4-6-4-9.2s1.4-6.6 4-9.2z"/></svg>
                  </span>
                  <span className="icon-link-text flex flex-col gap-0.25 min-w-0">
                    <strong className="text-[13.8px] text-white font-bold">{l.label}</strong>
                    <span className="text-[11.8px] text-[var(--ink-faint)] truncate">{l.sub}</span>
                  </span>
                </a>
              ))}
            </div>
          </section>

          <footer className="site-footer text-center text-[13px] text-[var(--ink-faint)] py-5">
            <p><strong className="text-[var(--ink-dim)]">WPHossain</strong> — Mikail Hossain, Google Ads Specialist for HVAC Contractors. © 2026. Serving the USA, Canada, Australia, New Zealand, and the UK.</p>
          </footer>
        </div>
      </main>

      <a className="floating-wa fixed right-5 bottom-5 z-50 w-14.5 h-14.5 rounded-full grid place-items-center bg-[linear-gradient(160deg,#25D366,#128C7E)] text-white shadow-lg hover:scale-105 transition-all" href="https://wa.me/10000000000" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
        <span className="floating-wa-ring absolute inset-0 rounded-full border-[1.5px] border-[#25D366] animate-[wa-pulse_2.2s_ease-out_infinite]" />
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Z"/></svg>
      </a>

      <script type="text/javascript" async src="https://static.zcal.co/embed/v1/embed.js" />
    </>
  );
}
