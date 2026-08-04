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
                </div>
              </div>
            </div>
          </section>

          {/* SERVICES SECTION */}
          <section className="panel" id="services">
            <div className="sec-head max-w-[680px] mb-2">
              <span className="eyebrow">Services</span>
              <h2 className="text-[clamp(24px,3vw,32px)] leading-snug mb-2.5">Everything a Google Ads account needs to produce booked jobs.</h2>
              <p className="text-[var(--ink-dim)] text-[15.5px]">From strategy to daily optimization — built around repair, install, maintenance, and emergency calls.</p>
            </div>
            <div className="grid-4 mt-6">
              <article className="card service-card"><span className="tag inline-block text-[10.5px] font-extrabold tracking-[0.08em] uppercase text-[var(--gold)] bg-[var(--gold-soft)] border border-[var(--gold-line)] px-2.25 py-1 rounded-full mb-3">Core</span><h3 className="text-[17.5px] mb-2 font-bold text-white">Google Search Ads</h3><p className="text-[14px] text-[var(--ink-dim)]">High-intent search campaigns for AC repair, furnace repair, and installs — the searches that turn into same-day calls.</p></article>
              <article className="card service-card"><span className="tag inline-block text-[10.5px] font-extrabold tracking-[0.08em] uppercase text-[var(--gold)] bg-[var(--gold-soft)] border border-[var(--gold-line)] px-2.25 py-1 rounded-full mb-3">Reach</span><h3 className="text-[17.5px] mb-2 font-bold text-white">Performance Max</h3><p className="text-[14px] text-[var(--ink-dim)]">Layered on top of Search once tracking is solid, so it adds tracked reach instead of vanity impressions.</p></article>
              <article className="card service-card"><span className="tag inline-block text-[10.5px] font-extrabold tracking-[0.08em] uppercase text-[var(--gold)] bg-[var(--gold-soft)] border border-[var(--gold-line)] px-2.25 py-1 rounded-full mb-3">Tracking</span><h3 className="text-[17.5px] mb-2 font-bold text-white">Conversion Tracking</h3><p className="text-[14px] text-[var(--ink-dim)]">Calls, form fills, and booking clicks tracked accurately so every dollar of ad spend is measurable.</p></article>
              <article className="card service-card"><span className="tag inline-block text-[10.5px] font-extrabold tracking-[0.08em] uppercase text-[var(--gold)] bg-[var(--gold-soft)] border border-[var(--gold-line)] px-2.25 py-1 rounded-full mb-3">Setup</span><h3 className="text-[17.5px] mb-2 font-bold text-white">Google Tag Manager</h3><p className="text-[14px] text-[var(--ink-dim)]">Clean GTM container setup — no duplicate tags, no broken triggers, no quietly double-counted leads.</p></article>
            </div>
          </section>

          {/* TESTIMONIALS SECTION */}
          <section className="panel" id="testimonials">
            <div className="sec-head max-w-[680px] mb-2">
              <span className="eyebrow">Testimonials</span>
              <h2 className="text-[clamp(24px,3vw,32px)] leading-snug mb-2.5">What clients say — once the calls start coming in.</h2>
            </div>
            <TestimonialsSlider />
          </section>

          {/* FAQ SECTION */}
          <section className="panel" id="faq">
            <div className="sec-head max-w-[680px] mb-2">
              <span className="eyebrow">FAQ</span>
              <h2 className="text-[clamp(24px,3vw,32px)] leading-snug mb-2.5">Everything HVAC owners usually want to know before booking a call.</h2>
            </div>
            <FaqAccordion />
          </section>

          {/* CONTACT SECTION */}
          <section className="panel" id="contact">
            <div className="sec-head max-w-[680px] mb-2">
              <span className="eyebrow">Book a Call &amp; Contact</span>
              <h2 className="text-[clamp(24px,3vw,32px)] leading-snug mb-2.5">Book a free Google Ads audit, or reach out directly.</h2>
            </div>
            <div className="book-panel bg-[linear-gradient(165deg,var(--navy-700),var(--panel))] border border-[var(--line)] rounded-[20px] p-7 flex flex-col justify-between gap-4.5">
              <p className="text-[14.5px] text-[var(--ink-dim)]">
                Direct email: <a href="mailto:Contact@wphossain.com" className="text-[var(--gold)] font-semibold">Contact@wphossain.com</a>
              </p>
            </div>
          </section>

          <footer className="site-footer text-center text-[13px] text-[var(--ink-faint)] py-5">
            <p><strong>WPHossain</strong> — Mikail Hossain, Google Ads Specialist for HVAC Contractors. © 2026.</p>
          </footer>
        </div>
      </main>

      {/* Floating WhatsApp Action */}
      <a className="floating-wa fixed right-5 bottom-5 z-50 w-14.5 h-14.5 rounded-full grid place-items-center bg-[linear-gradient(160deg,#25D366,#128C7E)] text-white shadow-[0_14px_34px_rgba(37,211,102,0.4)] transition-all hover:scale-105" href="https://wa.me/10000000000" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
        <span className="floating-wa-ring absolute inset-0 rounded-full border-[1.5px] border-[#25D366] animate-[wa-pulse_2.2s_ease-out_infinite]" />
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Zm5.86 14.03c-.25.7-1.45 1.34-2 1.42-.51.08-1.15.11-1.86-.12-.43-.14-.98-.32-1.68-.62-2.96-1.28-4.89-4.26-5.04-4.46-.15-.2-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.46.27-.3.58-.37.78-.37.2 0 .39 0 .56.01.18.01.42-.07.65.5.25.6.85 2.06.92 2.21.07.15.12.33.02.53-.1.2-.15.32-.3.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.61.17.3.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.36 1.46.3.15.48.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.72.81 2.01.96.3.15.49.22.56.35.08.13.08.75-.17 1.45Z"/></svg>
      </a>
    </>
  );
}
