"use client";

import React from 'react';
import Link from 'next/link';

interface SidebarProps {
  ownerName?: string;
  jobTitle?: string;
  avatarUrl?: string;
  email?: string;
  availabilityStatus?: string;
}

export function Sidebar({
  ownerName = "WP Hossain",
  jobTitle = "Google Ads Specialist",
  avatarUrl = "https://wphossain.com/headshot.jpg",
  email = "Contact@wphossain.com",
  availabilityStatus = "Available for new projects"
}: SidebarProps) {
  return (
    <aside className="sidebar fixed left-0 top-0 w-[var(--sidebar-w)] h-screen bg-[rgba(5,13,26,0.92)] border-r border-[var(--line)] p-7 pb-5.5 flex flex-col justify-between gap-4.5 backdrop-blur-[18px] z-40 overflow-y-auto hidden lg:flex">
      <div>
        <div className="profile flex flex-col items-center text-center gap-1 pb-1.5">
          <div className="avatar-ring w-24 h-24 rounded-full p-0.75 bg-[conic-gradient(from_220deg,var(--blue),var(--gold),var(--blue))] mb-3.5">
            <img 
              src={avatarUrl} 
              alt={ownerName} 
              className="w-full h-full rounded-full object-cover border-3 border-[var(--navy-900)]"
            />
          </div>
          <span className="kicker inline-flex items-center gap-1.5 text-[10.5px] font-bold tracking-[0.14em] uppercase color-[var(--gold)] bg-[var(--gold-soft)] border border-[var(--gold-line)] px-2.5 py-1 rounded-full mb-2.5">
            ● {availabilityStatus}
          </span>
          <h1 className="text-[21px] leading-tight font-bold text-white">{ownerName}</h1>
          <p className="role-line inline-flex items-center gap-1.5 text-[13.5px] text-[var(--ink-dim)] font-medium mt-0.5">
            <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12,12 L12,3 A9,9 0 0,1 21,12 Z" fill="#4285F4"/>
              <path d="M12,12 L12,3 A9,9 0 0,1 21,12 Z" fill="#EA4335" transform="rotate(90 12 12)"/>
              <path d="M12,12 L12,3 A9,9 0 0,1 21,12 Z" fill="#FBBC05" transform="rotate(180 12 12)"/>
              <path d="M12,12 L12,3 A9,9 0 0,1 21,12 Z" fill="#34A853" transform="rotate(270 12 12)"/>
            </svg>
            {jobTitle}
          </p>
        </div>

        <nav className="side-nav flex flex-col gap-0.5 mt-2" aria-label="Section navigation">
          <a href="#home" className="nav-link text-[var(--ink-dim)] text-[14px] font-semibold px-3 py-2 rounded-lg border-l-2 border-transparent hover:text-white hover:bg-[var(--panel-soft)] transition-colors">Home</a>
          <a href="#services" className="nav-link text-[var(--ink-dim)] text-[14px] font-semibold px-3 py-2 rounded-lg border-l-2 border-transparent hover:text-white hover:bg-[var(--panel-soft)] transition-colors">Services</a>
          <a href="#why-me" className="nav-link text-[var(--ink-dim)] text-[14px] font-semibold px-3 py-2 rounded-lg border-l-2 border-transparent hover:text-white hover:bg-[var(--panel-soft)] transition-colors">Why Me</a>
          <a href="#process" className="nav-link text-[var(--ink-dim)] text-[14px] font-semibold px-3 py-2 rounded-lg border-l-2 border-transparent hover:text-white hover:bg-[var(--panel-soft)] transition-colors">Process</a>
          <a href="#results" className="nav-link text-[var(--ink-dim)] text-[14px] font-semibold px-3 py-2 rounded-lg border-l-2 border-transparent hover:text-white hover:bg-[var(--panel-soft)] transition-colors">Results</a>
          <a href="#case-studies" className="nav-link text-[var(--ink-dim)] text-[14px] font-semibold px-3 py-2 rounded-lg border-l-2 border-transparent hover:text-white hover:bg-[var(--panel-soft)] transition-colors">Case Studies</a>
          <a href="#testimonials" className="nav-link text-[var(--ink-dim)] text-[14px] font-semibold px-3 py-2 rounded-lg border-l-2 border-transparent hover:text-white hover:bg-[var(--panel-soft)] transition-colors">Testimonials</a>
          <a href="#certifications" className="nav-link text-[var(--ink-dim)] text-[14px] font-semibold px-3 py-2 rounded-lg border-l-2 border-transparent hover:text-white hover:bg-[var(--panel-soft)] transition-colors">Certifications</a>
          <a href="#faq" className="nav-link text-[var(--ink-dim)] text-[14px] font-semibold px-3 py-2 rounded-lg border-l-2 border-transparent hover:text-white hover:bg-[var(--panel-soft)] transition-colors">FAQ</a>
          <Link href="/blog" className="text-[var(--ink-dim)] text-[14px] font-semibold px-3 py-2 rounded-lg border-l-2 border-transparent hover:text-white hover:bg-[var(--panel-soft)] transition-colors">Blog</Link>
          <a href="#contact" className="nav-link text-[var(--ink-dim)] text-[14px] font-semibold px-3 py-2 rounded-lg border-l-2 border-transparent hover:text-white hover:bg-[var(--panel-soft)] transition-colors">Contact</a>
        </nav>
      </div>

      <div className="side-bottom flex flex-col gap-3">
        <a className="btn btn-primary btn-block" href="#contact">
          Book Free Consultation
          <svg className="btn-arrow" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6"/>
          </svg>
        </a>

        <div className="mini-social flex justify-center gap-2" aria-label="Social links">
          <a href="https://www.linkedin.com/in/wphossain/" target="_blank" rel="noopener" className="w-9 h-9 rounded-lg grid place-items-center bg-[rgba(255,255,255,0.03)] border border-[var(--line)] text-[var(--ink-dim)] hover:text-white hover:border-[var(--gold-line)] hover:bg-[var(--gold-soft)] transition-all">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7.5 0h3.8v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.53 1.72-2.53 3.49V23h-4V8z"/></svg>
          </a>
          <a href="https://facebook.com/wphossain374" target="_blank" rel="noopener" className="w-9 h-9 rounded-lg grid place-items-center bg-[rgba(255,255,255,0.03)] border border-[var(--line)] text-[var(--ink-dim)] hover:text-white hover:border-[var(--gold-line)] hover:bg-[var(--gold-soft)] transition-all">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.16 8.44 9.94v-7.03H7.9v-2.91h2.54V9.86c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46H15.2c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22c4.78-.78 8.43-4.94 8.43-9.94z"/></svg>
          </a>
          <a href="https://youtube.com/@wphossain" target="_blank" rel="noopener" className="w-9 h-9 rounded-lg grid place-items-center bg-[rgba(255,255,255,0.03)] border border-[var(--line)] text-[var(--ink-dim)] hover:text-white hover:border-[var(--gold-line)] hover:bg-[var(--gold-soft)] transition-all">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.56a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.6 15.6V8.4l6.4 3.6-6.4 3.6z"/></svg>
          </a>
        </div>

        <p className="side-email text-[12.5px] text-[var(--ink-faint)] text-center">
          Or email <a href={`mailto:${email}`} className="text-[var(--ink-dim)] font-semibold hover:text-[var(--gold)]">{email}</a>
        </p>
      </div>
    </aside>
  );
}
