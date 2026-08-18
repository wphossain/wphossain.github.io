"use client";

import React from 'react';
import Image from 'next/image';

interface CertificateItem {
  id: string;
  title: string;
  image: string;
  issued: string;
  expires: string;
  issuer: string;
  certId: string;
  badgeTheme: {
    bg: string;
    text: string;
    border: string;
  };
}

const CERTIFICATES_DATA: CertificateItem[] = [
  {
    id: "gads-search",
    title: "Google Ads Search Certification",
    image: "/certificates/google-search-cert.jpg",
    issued: "May 11, 2026",
    expires: "May 11, 2027",
    issuer: "Google",
    certId: "1829195244",
    badgeTheme: {
      bg: "bg-blue-50",
      text: "text-[#1A73E8]",
      border: "border-blue-200"
    }
  },
  {
    id: "gads-measurement",
    title: "Google Ads Measurement & GA4",
    image: "/certificates/google-measurement-cert.jpg",
    issued: "May 12, 2026",
    expires: "May 12, 2027",
    issuer: "Google",
    certId: "1823117112",
    badgeTheme: {
      bg: "bg-emerald-50",
      text: "text-[#059669]",
      border: "border-emerald-200"
    }
  },
  {
    id: "gads-display",
    title: "Google Ads Display Certification",
    image: "/certificates/google-display-cert.jpg",
    issued: "May 12, 2026",
    expires: "May 12, 2027",
    issuer: "Google",
    certId: "1821947990",
    badgeTheme: {
      bg: "bg-indigo-50",
      text: "text-[#4F46E5]",
      border: "border-indigo-200"
    }
  },
  {
    id: "gads-ai-performance",
    title: "AI-Powered Performance & Shopping Ads",
    image: "/certificates/google-ai-performance-cert.jpg",
    issued: "May 13, 2026",
    expires: "May 13, 2027",
    issuer: "Google",
    certId: "1821183781",
    badgeTheme: {
      bg: "bg-purple-50",
      text: "text-[#7C3AED]",
      border: "border-purple-200"
    }
  }
];

export function CertificationsSection() {
  return (
    <section id="certifications" className="w-full bg-[#F8FAFC] border-b border-[#CBD5E1] py-20 relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-[radial-gradient(ellipse,rgba(26,115,232,0.035),transparent_70%)] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10">
        
        {/* Section Header (Matching Reference Screenshot in Crisp Light Theme) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-[760px] text-left">
            <div className="flex items-center gap-2 mb-3.5">
              <span className="eyebrow">
                Certifications
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-[#1A73E8] border border-blue-200">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Verified Issuer / Google
              </span>
            </div>

            <h2 className="text-[clamp(28px,4vw,42px)] font-display leading-tight mb-3 text-[#0F172A] font-bold">
              Officially <span className="text-[#1A73E8]">Certified</span> by Google.
            </h2>
            
            <p className="text-[#475569] text-[16.5px] leading-relaxed">
              Every certificate is current and verifiable. I keep my expertise fresh so your campaigns stay on top of every algorithm change.
            </p>
          </div>
        </div>

        {/* 4-Column Grid of Certificate Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CERTIFICATES_DATA.map((cert) => (
            <article 
              key={cert.id} 
              className="bg-white border border-[#CBD5E1] rounded-[24px] overflow-hidden shadow-xs hover:border-[#0F172A] hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Top: Certificate Image Preview */}
              <div className="relative aspect-[4/3] w-full bg-slate-50 border-b border-[#E2E8F0] overflow-hidden p-2.5 flex items-center justify-center">
                <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xs border border-slate-200/80 group-hover:scale-[1.03] transition-transform duration-300">
                  <Image 
                    src={cert.image} 
                    alt={cert.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Bottom: Certificate Info & Metadata */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  {/* Verified Badge & ID */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-extrabold uppercase tracking-wider ${cert.badgeTheme.bg} ${cert.badgeTheme.text} border ${cert.badgeTheme.border}`}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                      VERIFIED
                    </span>
                    <span className="text-[11px] font-mono font-semibold text-[#94A3B8]">
                      ID: {cert.certId}
                    </span>
                  </div>

                  {/* Certificate Title */}
                  <h3 className="text-[15px] sm:text-[15.5px] font-bold text-[#0F172A] font-display leading-snug mb-4 group-hover:text-[#1A73E8] transition-colors">
                    {cert.title}
                  </h3>
                </div>

                {/* Key-Value Details */}
                <div className="space-y-1.5 pt-3 border-t border-[#E2E8F0] text-[12px] text-[#64748B]">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span>📅</span> Issued
                    </span>
                    <span className="font-bold text-[#0F172A]">{cert.issued}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span>⏳</span> Expires
                    </span>
                    <span className="font-bold text-[#0F172A]">{cert.expires}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span>🏢</span> Issuer
                    </span>
                    <span className="font-bold text-[#1A73E8]">{cert.issuer}</span>
                  </div>
                </div>

              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
