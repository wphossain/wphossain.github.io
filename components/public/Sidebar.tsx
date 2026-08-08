"use client";

import React, { useEffect, useState } from 'react';
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
  avatarUrl = "/images/headshot.jpg",
  email = "Contact@wphossain.com",
  availabilityStatus = "Available for new projects"
}: SidebarProps) {
  const [imgError, setImgError] = useState(false);
  const [activeHash, setActiveHash] = useState('#home');

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash) {
        setActiveHash(window.location.hash);
      } else if (window.location.pathname.startsWith('/blog')) {
        setActiveHash('/blog');
      } else {
        setActiveHash('#home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    const navSectionIds = [
      'home',
      'services',
      'why-me',
      'process',
      'results',
      'case-studies',
      'testimonials',
      'certifications',
      'faq',
      'contact'
    ];

    if (window.location.pathname === '/' || window.location.pathname === '') {
      const observerCallback: IntersectionObserverCallback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            if (id) {
              setActiveHash(`#${id}`);
            }
          }
        });
      };

      const observer = new IntersectionObserver(observerCallback, {
        root: null,
        rootMargin: '-20% 0px -55% 0px',
        threshold: 0
      });

      navSectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });

      return () => {
        window.removeEventListener('hashchange', handleHashChange);
        observer.disconnect();
      };
    }

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const menuItems = [
    { label: 'Home', href: '/#home', key: '#home' },
    { label: 'Services', href: '/#services', key: '#services' },
    { label: 'Why Me', href: '/#why-me', key: '#why-me' },
    { label: 'Process', href: '/#process', key: '#process' },
    { label: 'Results', href: '/#results', key: '#results' },
    { label: 'Case Studies', href: '/#case-studies', key: '#case-studies' },
    { label: 'Testimonials', href: '/#testimonials', key: '#testimonials' },
    { label: 'Certifications', href: '/#certifications', key: '#certifications' },
    { label: 'FAQ', href: '/#faq', key: '#faq' },
    { label: 'Blog', href: '/blog', key: '/blog' },
    { label: 'Contact', href: '/#contact', key: '#contact' }
  ];

  return (
    <aside className="sidebar fixed left-0 top-0 w-[var(--sidebar-w)] h-screen bg-[#050f1f]/75 backdrop-blur-xl border-r border-white/10 p-5 pb-4 flex flex-col justify-between gap-3 z-40 overflow-y-auto hidden lg:flex shadow-[4px_0_30px_rgba(0,0,0,0.35)] transition-all">
      <div className="flex flex-col gap-4">
        {/* Profile Card */}
        <div className="profile flex flex-col items-center text-center gap-1 pb-3 border-b border-white/10">
          <div className="avatar-ring w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-[#1a73e8] via-[#f2a93d] to-[#4c9bff] mb-2 transition-transform duration-300 hover:scale-105 shadow-md shrink-0">
            {imgError ? (
              <div className="w-full h-full rounded-full bg-[#1a73e8] grid place-items-center border-2 border-[#050f1f]">
                <span className="text-white text-base font-bold">WH</span>
              </div>
            ) : (
              <img 
                src={avatarUrl} 
                alt={ownerName} 
                className="w-full h-full rounded-full object-cover border-2 border-[#050f1f]"
                onError={() => setImgError(true)}
              />
            )}
          </div>
          <span className="kicker inline-flex items-center gap-1.5 text-[9.5px] font-extrabold tracking-[0.12em] uppercase text-[#f2a93d] bg-[#f2a93d]/10 border border-[#f2a93d]/20 px-2.5 py-0.5 rounded-full mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {availabilityStatus}
          </span>
          <h1 className="text-[17px] leading-tight font-bold text-white tracking-tight">{ownerName}</h1>
          <p className="role-line inline-flex items-center gap-1.5 text-[12px] text-[#aebcda] font-medium mt-0.5">
            <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true" className="shrink-0">
              <path d="M12,12 L12,3 A9,9 0 0,1 21,12 Z" fill="#4285F4"/>
              <path d="M12,12 L12,3 A9,9 0 0,1 21,12 Z" fill="#EA4335" transform="rotate(90 12 12)"/>
              <path d="M12,12 L12,3 A9,9 0 0,1 21,12 Z" fill="#FBBC05" transform="rotate(180 12 12)"/>
              <path d="M12,12 L12,3 A9,9 0 0,1 21,12 Z" fill="#34A853" transform="rotate(270 12 12)"/>
            </svg>
            {jobTitle}
          </p>
        </div>

        {/* Navigation Section */}
        <nav className="side-nav flex flex-col gap-0.5" aria-label="Section navigation">
          {menuItems.map((item) => {
            const isActive = activeHash === item.key || (item.key === '#home' && activeHash === '');
            return (
              <Link 
                key={item.label} 
                href={item.href}
                onClick={() => setActiveHash(item.key)}
                className={`relative group flex items-center px-3.5 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                  isActive 
                    ? 'text-white font-semibold bg-[#1a73e8]/15 border-l-2 border-[#1a73e8] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]' 
                    : 'text-[#aebcda] border-l-2 border-transparent hover:text-white hover:bg-white/[0.06] hover:translate-x-0.5'
                }`}
              >
                {/* Active Glowing Dot Indicator */}
                {isActive && (
                  <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-[#4c9bff] shadow-[0_0_8px_#4c9bff]" />
                )}
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / CTA Section */}
      <div className="side-bottom flex flex-col gap-3 border-t border-white/10 pt-3 mt-auto">
        <Link className="btn btn-primary btn-block shadow-lg hover:shadow-[#1a73e8]/30 transition-all font-bold py-2.5 rounded-xl text-[13px]" href="/#contact">
          Book Free Audit
          <svg className="btn-arrow shrink-0" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </Link>

        <div className="mini-social flex justify-center gap-2" aria-label="Social links">
          <a href="https://www.linkedin.com/in/wphossain/" target="_blank" rel="noopener" aria-label="LinkedIn" className="w-8 h-8 rounded-lg grid place-items-center bg-white/5 border border-white/10 text-[#aebcda] hover:text-white hover:border-[#f2a93d]/40 hover:bg-[#f2a93d]/10 hover:-translate-y-0.5 transition-all">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7.5 0h3.8v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.53 1.72-2.53 3.49V23h-4V8z"/></svg>
          </a>
          <a href="https://facebook.com/wphossain374" target="_blank" rel="noopener" aria-label="Facebook" className="w-8 h-8 rounded-lg grid place-items-center bg-white/5 border border-white/10 text-[#aebcda] hover:text-white hover:border-[#f2a93d]/40 hover:bg-[#f2a93d]/10 hover:-translate-y-0.5 transition-all">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.16 8.44 9.94v-7.03H7.9v-2.91h2.54V9.86c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46H15.2c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22c4.78-.78 8.43-4.94 8.43-9.94z"/></svg>
          </a>
          <a href="https://youtube.com/@wphossain" target="_blank" rel="noopener" aria-label="YouTube" className="w-8 h-8 rounded-lg grid place-items-center bg-white/5 border border-white/10 text-[#aebcda] hover:text-white hover:border-[#f2a93d]/40 hover:bg-[#f2a93d]/10 hover:-translate-y-0.5 transition-all">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.56a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.6 15.6V8.4l6.4 3.6-6.4 3.6z"/></svg>
          </a>
        </div>

        <p className="side-email text-[11px] text-[#7b8bad] text-center truncate">
          Or email <a href={`mailto:${email}`} className="text-[#aebcda] font-semibold hover:text-[#f2a93d] transition-colors">{email}</a>
        </p>
      </div>
    </aside>
  );
}
