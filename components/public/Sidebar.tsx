"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface SidebarProps {
  ownerName?: string;
  jobTitle?: string;
  avatarUrl?: string;
  email?: string;
  availabilityStatus?: string;
  ctaText?: string;
}

export function Sidebar({
  ownerName = "WP Hossain",
  jobTitle = "Google Ads Specialist",
  avatarUrl = "/images/headshot.jpg",
  email = "Contact@wphossain.com",
  availabilityStatus = "Available for new projects",
  ctaText = "Book Free Call"
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
      'portfolio',
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
    { label: 'Portfolio', href: '/#portfolio', key: '#portfolio' },
    { label: 'Process', href: '/#process', key: '#process' },
    { label: 'Results', href: '/#results', key: '#results' },
    { label: 'FAQ', href: '/#faq', key: '#faq' },
    { label: 'Blog', href: '/blog', key: '/blog' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#050f1f]/85 backdrop-blur-xl border-b border-white/10 shadow-xl hidden lg:block">
      <div className="max-w-[var(--container)] mx-auto px-6 lg:px-10 py-3 flex items-center justify-between gap-6">
        
        {/* Brand & Avatar with Green Blinking Status */}
        <Link href="/#home" className="flex items-center gap-3 group shrink-0">
          <div className="relative">
            <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-[#1a73e8] via-[#25D366] to-[#4c9bff] shadow-md transition-transform duration-300 group-hover:scale-105 shrink-0">
              {imgError ? (
                <div className="w-full h-full rounded-full bg-[#1a73e8] grid place-items-center border-2 border-[#050f1f]">
                  <span className="text-white text-xs font-bold">WH</span>
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
            {/* Blinking Green Dot on Top Edge of Avatar */}
            <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 pointer-events-none">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-80" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#25D366] border-2 border-[#050f1f]" />
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[17px] leading-tight font-bold text-white tracking-tight font-display group-hover:text-[#4c9bff] transition-colors">
              {ownerName}
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="flex items-center gap-1 xl:gap-2">
          {menuItems.map((item) => {
            const isActive = activeHash === item.key || (item.key === '#home' && activeHash === '');
            return (
              <Link 
                key={item.label} 
                href={item.href}
                onClick={() => setActiveHash(item.key)}
                className={`px-3.5 py-1.5 rounded-lg text-[13.5px] font-medium transition-all duration-200 ${
                  isActive 
                    ? 'text-white font-bold bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]' 
                    : 'text-[#aebcda] hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action CTA Button */}
        <div className="flex items-center gap-3 shrink-0">
          <Link 
            className="btn btn-primary px-5 py-2.5 text-[13px] font-bold rounded-xl shadow-lg shadow-[#1a73e8]/30 hover:scale-[1.03] transition-all flex items-center gap-2" 
            href="/#contact"
          >
            <span>{ctaText}</span>
            <svg className="btn-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </Link>
        </div>

      </div>
    </header>
  );
}
