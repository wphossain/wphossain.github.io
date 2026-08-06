"use client";

import React from 'react';
import Link from 'next/link';

interface MobileHeaderProps {
  ownerName?: string;
  jobTitle?: string;
  avatarUrl?: string;
}

export function MobileHeader({
  ownerName = "WP Hossain",
  jobTitle = "Google Ads Specialist",
  avatarUrl = "/images/headshot.jpg"
}: MobileHeaderProps) {
  const [imgError, setImgError] = React.useState(false);

  return (
    <div className="mobile-bar sticky top-0 z-50 bg-[rgba(5,13,26,0.97)] border-b border-[var(--line)] backdrop-blur-md lg:hidden">
      <div className="mobile-bar-top flex items-center justify-between gap-2.5 p-3 px-4 pb-2">
        <div className="mobile-brand flex items-center gap-2.5">
          {imgError ? (
            <div className="w-8.5 h-8.5 rounded-full bg-[var(--blue)] grid place-items-center border-2 border-[var(--navy-700)]">
              <span className="text-white text-xs font-bold">WH</span>
            </div>
          ) : (
            <img src={avatarUrl} alt={ownerName} className="w-8.5 h-8.5 rounded-full object-cover border-2 border-[var(--navy-700)]" onError={() => setImgError(true)} />
          )}
          <div>
            <strong className="block text-[14.5px] font-display text-white">{ownerName}</strong>
            <span className="block text-[11px] text-[var(--ink-faint)]">{jobTitle}</span>
          </div>
        </div>
        <a className="btn btn-primary btn-sm text-[12.5px] py-1.5 px-3" href="#contact">
          Book Consultation
        </a>
      </div>
      <div className="mobile-links flex gap-1.5 overflow-x-auto px-4 pb-3 no-scrollbar">
        <a href="#home" className="whitespace-nowrap px-3 py-1.5 rounded-full bg-[rgba(255,255,255,0.04)] border border-[var(--line)] text-[var(--ink-dim)] text-[12.5px] font-semibold">Home</a>
        <a href="#services" className="whitespace-nowrap px-3 py-1.5 rounded-full bg-[rgba(255,255,255,0.04)] border border-[var(--line)] text-[var(--ink-dim)] text-[12.5px] font-semibold">Services</a>
        <a href="#why-me" className="whitespace-nowrap px-3 py-1.5 rounded-full bg-[rgba(255,255,255,0.04)] border border-[var(--line)] text-[var(--ink-dim)] text-[12.5px] font-semibold">Why Me</a>
        <a href="#process" className="whitespace-nowrap px-3 py-1.5 rounded-full bg-[rgba(255,255,255,0.04)] border border-[var(--line)] text-[var(--ink-dim)] text-[12.5px] font-semibold">Process</a>
        <a href="#results" className="whitespace-nowrap px-3 py-1.5 rounded-full bg-[rgba(255,255,255,0.04)] border border-[var(--line)] text-[var(--ink-dim)] text-[12.5px] font-semibold">Results</a>
        <a href="#case-studies" className="whitespace-nowrap px-3 py-1.5 rounded-full bg-[rgba(255,255,255,0.04)] border border-[var(--line)] text-[var(--ink-dim)] text-[12.5px] font-semibold">Case Studies</a>
        <a href="#testimonials" className="whitespace-nowrap px-3 py-1.5 rounded-full bg-[rgba(255,255,255,0.04)] border border-[var(--line)] text-[var(--ink-dim)] text-[12.5px] font-semibold">Testimonials</a>
        <Link href="/blog" className="whitespace-nowrap px-3 py-1.5 rounded-full bg-[rgba(255,255,255,0.04)] border border-[var(--line)] text-[var(--ink-dim)] text-[12.5px] font-semibold">Blog</Link>
        <a href="#contact" className="whitespace-nowrap px-3 py-1.5 rounded-full bg-[rgba(255,255,255,0.04)] border border-[var(--line)] text-[var(--ink-dim)] text-[12.5px] font-semibold">Contact</a>
      </div>
    </div>
  );
}