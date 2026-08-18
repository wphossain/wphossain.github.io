import React from 'react';
import Script from 'next/script';
import Link from 'next/link';
import Image from 'next/image';
import { Sidebar } from '@/components/public/Sidebar';
import { MobileHeader } from '@/components/public/MobileHeader';
import { MobileCtaBar } from '@/components/public/MobileCtaBar';
import { PulseCard } from '@/components/public/PulseCard';
import { GrowthEcosystemHero } from '@/components/public/GrowthEcosystemHero';
import { IsThisYouSection } from '@/components/public/IsThisYouSection';
import { ServiceGrid } from '@/components/public/ServiceGrid';
import { WhyMeGrid } from '@/components/public/WhyMeGrid';
import { PackagesSection } from '@/components/public/PackagesSection';
import { TestimonialsSlider } from '@/components/public/TestimonialsSlider';
import { FaqAccordion } from '@/components/public/FaqAccordion';
import { PortfolioSection } from '@/components/public/PortfolioSection';
import { LeadForm } from '@/components/public/LeadForm';
import { FloatingContactFab } from '@/components/public/FloatingContactFab';
import { StructuredData } from '@/components/public/StructuredData';
import { GoogleAdsCertBadge, GoogleAnalyticsCertBadge, GTMCertBadge, MetaCertBadge } from '@/components/public/CertBadges';
import { Reveal } from '@/components/public/Reveal';
import { TrustedByStrip } from '@/components/public/TrustedByStrip';
import { BeforeAfterSliderSection } from '@/components/public/BeforeAfterSliderSection';
import { CertificationsSection } from '@/components/public/CertificationsSection';
import { Footer } from '@/components/public/Footer';
import { db } from '@/lib/db';

export const revalidate = 60;

const DEFAULT_CASE_STUDIES = [
  {
    client_niche: "HVAC Contractor · Dallas, TX",
    challenge: "Paying $114 per lead from low-intent DIY searches, job seekers, and broad-match keyword bleed during peak summer heatwaves.",
    strategy: "Pruned 1,200+ negative keywords, built high-speed 0.8s mobile click-to-call landing pages, and shifted budget to high-intent emergency AC replacement clusters.",
    result_summary: "Cost Per Lead dropped from $114 to $34.20 (-70%), booked monthly jobs jumped from 18 to 48 (+166%).",
    slug: "dallas-emergency-hvac-lead-generation"
  },
  {
    client_niche: "Master Plumber · Austin, TX",
    challenge: "Unverified call tracking with massive click waste during non-operational weekend and overnight hours.",
    strategy: "Integrated CallRail dynamic number insertion with GA4 offline conversion tracking and scheduled daypart bidding during peak dispatch hours.",
    result_summary: "Generated 62 booked calls/mo at $28.50 CPL with 6.1x verified revenue return on ad spend.",
    slug: "austin-emergency-plumbing-callrail-tracking"
  },
  {
    client_niche: "Roofing & Storm Damage · Houston, TX",
    challenge: "High competition during storm seasons and slow lead follow-up losing bids to competitors.",
    strategy: "Deployed geotargeted storm radius campaigns paired with instant automated SMS lead routing to sales estimators.",
    result_summary: "$148,000 in closed residential roof replacement contracts generated within 60 days.",
    slug: "houston-storm-damage-roofing-lead-funnel"
  }
];

const DEFAULT_CERTS = [
  { badge_type: 'google-ads', title: 'Google Ads Search Certified' },
  { badge_type: 'google-analytics', title: 'Google Analytics 4 (GA4)' },
  { badge_type: 'tag-manager', title: 'Google Tag Manager Specialist' },
  { badge_type: 'meta', title: 'Meta Certified Partner' }
];

export async function generateMetadata() {
  try {
    const settings = await db.getSettings();
    return {
      title: `${settings?.business_name || 'WP Hossain'} | Google Ads Specialist for Local Contractors`,
      description: `Turn local service clicks into booked jobs. High-intent Search Ads, 1,200+ Negative Keyword Fortresses, CallRail Dynamic Number Insertion, and 0.8s Call Funnels.`,
    };
  } catch (e) {
    return {
      title: 'WP Hossain | Google Ads Specialist for Local Contractors',
      description: 'Turn local service clicks into booked jobs. High-intent Search Ads, 1,200+ Negative Keyword Fortresses, CallRail Dynamic Number Insertion, and 0.8s Call Funnels.',
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
  const dbCaseStudies: any[] = results[3].status === 'fulfilled' && Array.isArray(results[3].value) ? results[3].value : [];
  const tracking: any = results[4].status === 'fulfilled' && results[4].value ? results[4].value : {};
  const testimonials: any[] = results[5].status === 'fulfilled' && Array.isArray(results[5].value) ? results[5].value : [];

  const caseStudies = dbCaseStudies.length > 0 ? dbCaseStudies : DEFAULT_CASE_STUDIES;

  const findSection = (key: string) => {
    const found = sections.find((s: any) => s?.section_key === key);
    return found || { title: '', subtitle: '', content_json: {} };
  };

  const hero = findSection('hero');
  const services = findSection('services');
  const why = findSection('why');
  const faq = findSection('faq');
  const certsSection = findSection('certifications');
  const activeCerts = certsSection.content_json?.certs?.length > 0 ? certsSection.content_json.certs : DEFAULT_CERTS;

  return (
    <>
      <StructuredData faqs={faq.content_json?.faqs || []} settings={settings} />
      
      {/* Sticky Desktop & Mobile Navigation */}
      <Sidebar 
        ownerName="WP Hossain" 
        jobTitle={settings.job_title || "Google Ads Specialist"} 
        avatarUrl={settings.avatar_url} 
        email={settings.email} 
        ctaText="Book Free Strategy Call" 
      />
      <MobileHeader 
        ownerName="WP Hossain" 
        jobTitle={settings.job_title || "Google Ads Specialist"} 
        avatarUrl={settings.avatar_url} 
        email={settings.email} 
        ctaText="Book Call" 
      />
      <MobileCtaBar />

      {/* Floating Multi-Channel Quick Contact FAB */}
      <FloatingContactFab 
        whatsappNumber={settings.whatsapp_number} 
        email={settings.email} 
      />

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

      <main className="min-h-screen bg-white pb-20 lg:pb-0">
        
        {/* ============================================================
            1. MAIN HERO SECTION (Full Viewport Balanced · Optically Grounded)
            ============================================================ */}
        <section 
          className="w-full bg-white relative overflow-hidden min-h-[calc(100vh-76px)] flex items-center py-12 lg:py-16" 
          id="home"
        >
          {/* Subtle Ambient Radial Backlights */}
          <div className="absolute -top-24 right-0 w-[550px] h-[550px] bg-[radial-gradient(circle,rgba(26,115,232,0.04),transparent_70%)] pointer-events-none" />
          <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(5,150,105,0.035),transparent_70%)] pointer-events-none" />

          <div className="max-w-[1440px] mx-auto w-full px-6 lg:px-10">
            <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
              
              {/* Left Column: Value Proposition & CTAs */}
              <div className="flex flex-col justify-center">
                <div>
                  {/* Clean Minimalist Availability Badge */}
                  <span className="eyebrow inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#059669] text-[11.5px] font-extrabold uppercase tracking-widest mb-6 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse" />
                    Available for new clients
                  </span>

                  {/* Headline: Punchy 2-Line Format with Google Blue Focus */}
                  <h1 className="text-[clamp(34px,4.5vw,56px)] font-display leading-[1.1] mb-6 text-[#0F172A] font-extrabold tracking-tight">
                    Google Ads Spend That <br className="hidden sm:inline" />
                    <span className="text-[#1A73E8]">Actually Converts.</span>
                  </h1>

                  {/* Subtitle with Key Phrase Highlight */}
                  <p className="text-[17.5px] text-[#475569] max-w-[620px] leading-relaxed mb-8">
                    I build and manage high-intent Search campaigns with precision call tracking that actually reports the truth — so you know which keywords produce <strong className="text-[#0F172A] font-bold">booked jobs</strong>, not just clicks.
                  </p>

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-4 mb-4 max-sm:flex-col">
                    <a 
                      className="btn btn-primary px-8 py-3.5 text-[15px] font-bold rounded-xl shadow-lg hover:shadow-xl transition-all" 
                      href="https://zcal.co/wphossain/free"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white mr-2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      Book Free Strategy Call
                    </a>
                    <a 
                      className="btn btn-ghost px-7 py-3.5 text-[15px] font-bold rounded-xl border border-[#CBD5E1] bg-white text-[#0F172A] hover:bg-slate-50 transition-all flex items-center gap-2 shadow-2xs" 
                      href="#portfolio"
                    >
                      <span>View Case Studies</span>
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                    </a>
                  </div>
                  
                  <p className="text-[12.5px] text-[#64748B] font-medium tracking-tight mb-8">
                    ✓ Free Strategy Call · No Long-Term Contract · Direct Specialist Access
                  </p>
                </div>

                {/* Layer 1: Real Contractor Reviews (Single Line, Full Title) */}
                <div className="pt-5 border-t border-[#E2E8F0] flex flex-col gap-3.5">
                  
                  <a 
                    href="#testimonials" 
                    className="inline-flex items-center gap-3 bg-slate-50 border border-[#CBD5E1] px-4 py-2.5 rounded-xl shadow-2xs hover:border-[#1A73E8] hover:bg-white transition-all w-fit group"
                  >
                    <div className="flex -space-x-2 overflow-hidden">
                      {['/avatars/david-m.jpg', '/avatars/rick-b.jpg', '/avatars/marcus-v.jpg'].map((src, i) => (
                        <div key={i} className="inline-block h-7 w-7 rounded-full ring-2 ring-white overflow-hidden bg-slate-200 shadow-2xs">
                          <img src={src} alt="Contractor" className="h-full w-full object-cover" />
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex text-[#F59E0B]">
                        {[1,2,3,4,5].map(n => <svg key={n} width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>)}
                      </div>
                      <span className="text-[12.5px] font-bold text-[#0F172A] whitespace-nowrap group-hover:text-[#1A73E8] transition-colors">5.0 · Trusted by 75+ Local Service Companies</span>
                    </div>
                  </a>

                  {/* Layer 2: Official Tech Badges (Google Ads, GA4, GTM, Any CMS) */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    {/* Google Partner */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#CBD5E1] bg-slate-50 text-[11.5px] font-bold text-[#0F172A] shadow-2xs">
                      <svg width="14" height="14" viewBox="0 0 24 24"><path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.44 1.76 4.44 1.76l2.04-2.1S16.46 2 12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c7.06 0 10-4.95 10-10 0-.67-.04-1.35-.65-.9z" fill="#4285F4"/></svg>
                      <span>Google Partner</span>
                    </div>

                    {/* Google Ads */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#CBD5E1] bg-slate-50 text-[11.5px] font-bold text-[#0F172A] shadow-2xs">
                      <svg width="14" height="14" viewBox="0 0 40 40"><rect x="10.5" y="2" width="10" height="30" rx="5" fill="#4285F4" transform="rotate(30 20 20)"/><path d="M27.5 14 L36 29 a5.4 5.4 0 0 1 -4.68 8.1 a5.4 5.4 0 0 1 -4.67-2.7L18.5 20.4Z" fill="#34A853"/><circle cx="9.4" cy="31.5" r="5.4" fill="#FBBC04"/></svg>
                      <span>Google Ads</span>
                    </div>

                    {/* GA4 & GTM */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#CBD5E1] bg-slate-50 text-[11.5px] font-bold text-[#0F172A] shadow-2xs">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="#059669"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                      <span>GA4 &amp; GTM</span>
                    </div>

                    {/* Any CMS or Custom Site */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#CBD5E1] bg-slate-50 text-[11.5px] font-bold text-[#475569] shadow-2xs">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                      <span>Any CMS or Custom Site</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Right Column: Google Search Ad with Van & 4-Color Dashboard */}
              <div className="w-full">
                <PulseCard content={hero.content_json?.niche_tabs} />
              </div>

            </div>
          </div>
        </section>

        {/* ============================================================
            FULL-WIDTH SOCIAL PROOF & STATS RIBBON (Below Hero Fold - Strictly Appears On Scroll)
            ============================================================ */}
        <section className="w-full bg-[#F8FAFC] border-y border-[#CBD5E1] py-10 lg:py-12">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 items-center">
              {[
                { value: "$2.4M+", label: "Total Ad Spend Managed" },
                { value: "42%", label: "Avg. CPL Reduction", highlight: true },
                { value: "180+", label: "Campaigns Launched" },
                { value: "94%", label: "Client Retention Rate", highlight: true }
              ].map((stat, idx) => (
                <div key={idx} className={`flex flex-col items-center text-center px-4 ${idx !== 3 ? 'md:border-r md:border-[#CBD5E1]' : ''}`}>
                  <strong className={`font-display text-[34px] lg:text-[42px] font-extrabold tracking-tight leading-none mb-2 ${stat.highlight ? 'text-[#059669]' : 'text-[#0F172A]'}`}>
                    {stat.value}
                  </strong>
                  <span className="text-[12px] font-extrabold uppercase tracking-wider text-[#64748B]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            2. INTERACTIVE GROWTH ECOSYSTEM
            ============================================================ */}
        <GrowthEcosystemHero />

        {/* ============================================================
            3. IS THIS YOU? DIAGNOSTIC SECTION
            ============================================================ */}
        <IsThisYouSection />

        {/* ============================================================
            5. SERVICES & SPECIALIZED WEAPONS (Bento Grid)
            ============================================================ */}
        <section className="w-full bg-[#F8FAFC] border-b border-[#CBD5E1] py-20 relative overflow-hidden" id="services">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
            <div className="max-w-[760px] mb-12 text-left">
              <span className="eyebrow mb-3.5">Trade Specialization</span>
              <h2 className="text-[clamp(28px,4vw,42px)] font-display leading-tight mb-4 text-[#0F172A] font-bold">
                Google Ads Architecture Built for Local Contractors
              </h2>
              <p className="text-[#475569] text-[17px] leading-relaxed">
                HVAC, plumbing, roofing, electrical, landscaping, and trade home services — built to turn search clicks into booked jobs.
              </p>
            </div>
            <ServiceGrid items={services.content_json?.services_list || []} />
          </div>
        </section>

        {/* ============================================================
            6. WHY ME SECTION (Specialist vs Agency)
            ============================================================ */}
        <section className="w-full bg-white border-b border-[#CBD5E1] py-20 relative overflow-hidden" id="why-me">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10">
            <WhyMeGrid 
              title={why.title}
              subtitle={why.subtitle}
              eyebrow={why.content_json?.eyebrow}
              cards={why.content_json?.cards}
            />
          </div>
        </section>

        {/* ============================================================
            TRUSTED BY STRIP (BrandWeld, PaMii, Spring Health, WorldClass, etc.)
            ============================================================ */}
        <TrustedByStrip />

        {/* ============================================================
            7. PORTFOLIO & PROOF VAULT (Real Results, Real Numbers)
            ============================================================ */}
        <PortfolioSection />

        {/* ============================================================
            8. TRANSPARENT PACKAGES & SCOPE (MasudPPC Inspired)
            ============================================================ */}
        <PackagesSection />

        {/* ============================================================
            9. TESTIMONIALS & VERIFIED REVIEWS (Left-Aligned)
            ============================================================ */}
        <section className="w-full bg-white border-b border-[#CBD5E1] py-20 relative overflow-hidden" id="testimonials">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10">
            <div className="max-w-[760px] mb-12 text-left">
              <span className="eyebrow mb-3.5">Client Reviews</span>
              <h2 className="text-[clamp(28px,4vw,42px)] font-display leading-tight mb-3 text-[#0F172A] font-bold">
                What Business Owners Say Once The Calls Start Rolling In
              </h2>
              <p className="text-[#475569] text-[16.5px] leading-relaxed">
                Service business owners across the US trust WP Hossain to run their Google Ads. They get leads, not excuses.
              </p>
            </div>
            <TestimonialsSlider testimonials={testimonials} />
          </div>
        </section>

        {/* ============================================================
            10. PROOF OF WORK: BEFORE & AFTER INTERACTIVE SLIDER
            ============================================================ */}
        <BeforeAfterSliderSection />

        {/* ============================================================
            11. CERTIFICATIONS & OFFICIAL GOOGLE PARTNER
            ============================================================ */}
        <CertificationsSection />

        {/* ============================================================
            11. FAQ ACCORDION (Left-Aligned)
            ============================================================ */}
        <section className="w-full bg-white border-b border-[#CBD5E1] py-20 relative overflow-hidden" id="faq">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
            <div className="max-w-[760px] mb-10 text-left">
              <span className="eyebrow mb-3.5">Frequently Asked Questions</span>
              <h2 className="text-[clamp(28px,4vw,42px)] font-display leading-tight mb-3 text-[#0F172A] font-bold">
                Everything You Need to Know Before Booking a Call
              </h2>
              <p className="text-[#475569] text-[16.5px] leading-relaxed">
                Direct answers regarding ad budgets, timelines, contracts, and tracking setups.
              </p>
            </div>
            <FaqAccordion />
          </div>
        </section>

        {/* ============================================================
            12. AUDIT CALENDAR BOOKING & EXPECTATIONS
            ============================================================ */}
        <section className="w-full bg-[#F8FAFC] border-b border-[#CBD5E1] py-20 relative overflow-hidden" id="contact">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10">
            
            <div className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] rounded-[32px] p-8 lg:p-12 text-white border border-slate-700 shadow-2xl mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
                <div>
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11.5px] font-extrabold uppercase tracking-widest mb-4">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Direct Booking Available
                  </span>
                  <h2 className="text-[clamp(28px,4vw,42px)] font-display font-extrabold text-white leading-tight mb-4">
                    Book a Free 15-Minute Google Ads Strategy Call
                  </h2>
                  <p className="text-slate-300 text-[16px] leading-relaxed max-w-xl mb-6">
                    Pick a convenient time slot on my calendar. I will personally review your search campaigns, negative keywords, and call tracking setup before we jump on the call.
                  </p>
                  <div className="flex flex-wrap gap-4 items-center">
                    <a 
                      href="https://zcal.co/wphossain/free" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-primary px-8 py-4 text-[15px] font-bold rounded-xl shadow-xl hover:scale-105 transition-all inline-flex items-center gap-2"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      <span>Book Free Strategy Call on Zcal</span>
                      <span className="text-[16px]">↗</span>
                    </a>
                    <span className="text-[12.5px] text-slate-400 font-medium">
                      ✓ Instant confirmation · Zero sales pitch
                    </span>
                  </div>
                </div>

                {/* Quick Benefit Cards */}
                <div className="bg-slate-900/60 border border-slate-700/80 rounded-2xl p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-[14px] text-slate-200">
                    <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm shrink-0">1</span>
                    <span>15-Minute focused screen share on your account</span>
                  </div>
                  <div className="flex items-center gap-3 text-[14px] text-slate-200">
                    <span className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm shrink-0">2</span>
                    <span>Uncover search term leaks &amp; broad match bleed</span>
                  </div>
                  <div className="flex items-center gap-3 text-[14px] text-slate-200">
                    <span className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm shrink-0">3</span>
                    <span>Get a direct 3-step action plan to lower CPL</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 5-Step What to Expect on the Call */}
            <div className="w-full bg-white border border-[#CBD5E1] rounded-[28px] p-7 lg:p-8 shadow-2xs">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#64748B] block mb-5">What Happens on the 15-Min Call</span>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {[
                  { title: "Search Term Audit", desc: "A review of actual search queries to find wasted spend on DIY and job hunter terms." },
                  { title: "Negative Keyword Moat", desc: "Inspection of your negative keyword lists to prevent budget leakage." },
                  { title: "Tracking & CallRail Check", desc: "Verification of dynamic number insertion and GA4 conversion attribution." },
                  { title: "Landing Page CRO", desc: "Review of mobile page speed and tap-to-call conversion friction points." },
                  { title: "Clear Action Plan", desc: "A straightforward 3-step growth plan for lower Cost Per Lead and higher ROI." }
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-xl border border-[#E2E8F0] bg-slate-50 flex flex-col gap-1.5">
                    <span className="text-[11px] font-bold text-[#059669] font-display">0{i+1}. {item.title}</span>
                    <p className="text-[12.5px] text-[#475569] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ============================================================
            13. CUSTOM PPC AUDIT & PACKAGE BUILDER
            ============================================================ */}
        <section className="w-full bg-white border-b border-[#CBD5E1] py-20 relative overflow-hidden" id="contact">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10">
            {/* Full-Width Custom Package Builder & Audit Request Form */}
            <LeadForm isDark={false} />
          </div>
        </section>

        {/* ============================================================
            14. PROFESSIONAL SITE FOOTER (4-Col + Highlight Stats)
            ============================================================ */}
        <Footer settings={settings} />

      </main>

      {/* Custom Body Scripts */}
      {tracking?.custom_body_scripts && (
        <div dangerouslySetInnerHTML={{ __html: tracking.custom_body_scripts }} />
      )}
    </>
  );
}
