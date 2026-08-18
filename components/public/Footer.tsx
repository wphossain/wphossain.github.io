"use client";

import React, { useState } from 'react';
import Link from 'next/link';

interface FooterProps {
  settings?: {
    business_name?: string;
    owner_name?: string;
    job_title?: string;
    avatar_url?: string;
    email?: string;
    whatsapp_number?: string;
    linkedin_url?: string;
    facebook_url?: string;
    twitter_url?: string;
    youtube_url?: string;
    zcal_link?: string;
  };
}

export function Footer({ settings }: FooterProps) {
  const [imgError, setImgError] = useState(false);
  const avatarUrl = settings?.avatar_url || "/images/headshot.jpg";
  const email = settings?.email || "Contact@wphossain.com";
  const whatsappNumber = (settings?.whatsapp_number || "10000000000").replace(/\D/g, '');
  const zcalLink = settings?.zcal_link || "https://zcal.co/wphossain/free";
  const linkedinUrl = settings?.linkedin_url || "https://linkedin.com/in/wphossain";

  return (
    <footer className="w-full bg-[#F8FAFC] text-[#0F172A] pt-16 lg:pt-20 pb-12 relative overflow-hidden border-t border-[#CBD5E1]">
      
      {/* Subtle ambient light backlights */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-[radial-gradient(ellipse,rgba(26,115,232,0.035),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-[radial-gradient(ellipse,rgba(5,150,105,0.03),transparent_70%)] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10">
        
        {/* ============================================================
            TOP 4-COLUMN GRID (Site Theme: Crisp White & Slate)
            ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12">
          
          {/* Column 1: Brand with Header-Matched Avatar Image + Animated Status Dot */}
          <div className="lg:col-span-5 flex flex-col justify-between pr-0 lg:pr-8">
            <div>
              {/* Brand Logo with Avatar & Animation (Exact Match to Header) */}
              <Link href="/#home" className="flex items-center gap-3 group mb-4">
                <div className="relative">
                  {imgError ? (
                    <div className="w-11 h-11 rounded-full bg-[#0F172A] grid place-items-center text-white text-xs font-bold shrink-0 border-2 border-white shadow-xs">
                      WH
                    </div>
                  ) : (
                    <img 
                      src={avatarUrl} 
                      alt="WP Hossain" 
                      className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-xs shrink-0" 
                      onError={() => setImgError(true)} 
                    />
                  )}
                  {/* Animated Status Dot */}
                  <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 pointer-events-none">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#059669] border-2 border-white" />
                  </span>
                </div>
                
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <strong className="text-[16px] font-bold text-[#0F172A] font-display tracking-tight group-hover:text-[#059669] transition-colors">
                      WP Hossain
                    </strong>
                    <span className="px-2 py-0.2 rounded-full text-[9.5px] font-extrabold uppercase tracking-wider bg-emerald-50 text-[#059669] border border-emerald-200">
                      PPC Partner
                    </span>
                  </div>
                  <span className="text-[11.5px] text-[#64748B] font-medium leading-none mt-0.5">
                    Google Ads Specialist for Local Contractors
                  </span>
                </div>
              </Link>

              {/* Bio & Value Proposition */}
              <p className="text-[#475569] text-[14.5px] leading-relaxed max-w-md mb-6">
                Google Ads Specialist turning search spend into real, booked service jobs for local contractors. High-intent search campaign architecture, 1,200+ negative keyword fortresses, and CallRail dynamic call tracking.
              </p>
            </div>

            {/* Social Icons Row (Crisp Light Theme Buttons) */}
            <div className="flex items-center gap-3 pt-1">
              {/* LinkedIn */}
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-xl bg-white border border-[#CBD5E1] flex items-center justify-center text-[#475569] hover:text-[#1A73E8] hover:border-[#1A73E8] hover:shadow-xs transition-all group"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-xl bg-white border border-[#CBD5E1] flex items-center justify-center text-[#475569] hover:text-[#059669] hover:border-[#059669] hover:shadow-xs transition-all group"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </a>

              {/* Email Direct */}
              <a
                href={`mailto:${email}`}
                aria-label="Email"
                className="w-10 h-10 rounded-xl bg-white border border-[#CBD5E1] flex items-center justify-center text-[#475569] hover:text-[#1A73E8] hover:border-[#1A73E8] hover:shadow-xs transition-all group"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>

              {/* Calendar / Zcal */}
              <a
                href={zcalLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Book Call"
                className="w-10 h-10 rounded-xl bg-white border border-[#CBD5E1] flex items-center justify-center text-[#475569] hover:text-[#1A73E8] hover:border-[#1A73E8] hover:shadow-xs transition-all group"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: NAVIGATE (Span 2 on large) */}
          <div className="lg:col-span-2">
            <span className="text-[#059669] font-mono text-[11px] font-extrabold uppercase tracking-[0.18em] mb-4 block">
              NAVIGATE
            </span>
            <ul className="space-y-2.5 text-[14px]">
              <li>
                <Link href="/#home" className="text-[#475569] hover:text-[#0F172A] hover:translate-x-1 inline-block transition-all font-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#ecosystem" className="text-[#475569] hover:text-[#0F172A] hover:translate-x-1 inline-block transition-all font-medium">
                  Ecosystem
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-[#475569] hover:text-[#0F172A] hover:translate-x-1 inline-block transition-all font-medium">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/#why-me" className="text-[#475569] hover:text-[#0F172A] hover:translate-x-1 inline-block transition-all font-medium">
                  Why Me
                </Link>
              </li>
              <li>
                <Link href="/#portfolio" className="text-[#475569] hover:text-[#0F172A] hover:translate-x-1 inline-block transition-all font-medium">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/#packages" className="text-[#475569] hover:text-[#0F172A] hover:translate-x-1 inline-block transition-all font-medium">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="text-[#475569] hover:text-[#0F172A] hover:translate-x-1 inline-block transition-all font-medium">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-[#475569] hover:text-[#0F172A] hover:translate-x-1 inline-block transition-all font-medium">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: SERVICES (Span 2 on large) */}
          <div className="lg:col-span-2">
            <span className="text-[#059669] font-mono text-[11px] font-extrabold uppercase tracking-[0.18em] mb-4 block">
              SERVICES
            </span>
            <ul className="space-y-2.5 text-[14px]">
              <li>
                <Link href="/#services" className="text-[#475569] hover:text-[#0F172A] hover:translate-x-1 inline-block transition-all font-medium">
                  Search Ads
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-[#475569] hover:text-[#0F172A] hover:translate-x-1 inline-block transition-all font-medium">
                  Negative Fortresses
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-[#475569] hover:text-[#0F172A] hover:translate-x-1 inline-block transition-all font-medium">
                  Call Tracking DNI
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-[#475569] hover:text-[#0F172A] hover:translate-x-1 inline-block transition-all font-medium">
                  Landing Page CRO
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-[#475569] hover:text-[#0F172A] hover:translate-x-1 inline-block transition-all font-medium">
                  GA4 &amp; GTM Setup
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-[#475569] hover:text-[#0F172A] hover:translate-x-1 inline-block transition-all font-medium">
                  Local Service Ads
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: GET IN TOUCH (Span 3 on large) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="text-[#059669] font-mono text-[11px] font-extrabold uppercase tracking-[0.18em] mb-2 block">
              GET IN TOUCH
            </span>

            <a
              href={`mailto:${email}`}
              className="text-[#334155] hover:text-[#1A73E8] text-[14px] transition-colors truncate block font-medium"
            >
              {email}
            </a>

            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#334155] hover:text-[#059669] text-[14px] transition-colors block font-medium"
            >
              WhatsApp Direct Chat
            </a>

            <a
              href={zcalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#334155] hover:text-[#1A73E8] text-[14px] transition-colors block font-medium"
            >
              Book Strategy Call
            </a>

            {/* Live Availability Badge Pill */}
            <div className="mt-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#059669] text-[12px] font-bold shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse" />
                <span>Available for New Clients</span>
              </span>
            </div>
          </div>

        </div>

        {/* ============================================================
            BOTTOM COPYRIGHT BAR
            ============================================================ */}
        <div className="pt-8 border-t border-[#E2E8F0] flex flex-col md:flex-row items-center justify-between gap-4 text-[12.5px] text-[#64748B]">
          <div>
            <span>© 2026 </span>
            <strong className="text-[#0F172A] font-bold">WP Hossain</strong>
            <span> · All rights reserved · Dedicated Google Ads Specialist for Local Contractors</span>
          </div>

          <div className="text-[#64748B] text-center md:text-right">
            <span>Turning local service clicks into booked jobs with verified attribution.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
