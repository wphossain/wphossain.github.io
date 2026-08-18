"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface MobileHeaderProps {
  ownerName?: string;
  jobTitle?: string;
  avatarUrl?: string;
  email?: string;
  availabilityStatus?: string;
  ctaText?: string;
}

export function MobileHeader({
  ownerName = "WP Hossain",
  jobTitle = "Google Ads Specialist",
  avatarUrl = "/images/headshot.jpg",
  email = "Contact@wphossain.com",
  availabilityStatus = "Available for new projects",
  ctaText = "Book Free Call"
}: MobileHeaderProps) {
  const [imgError, setImgError] = useState(false);
  const [activeHash, setActiveHash] = useState('#home');
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Lock background scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const menuItems = [
    { label: 'Home', href: '/#home', key: '#home' },
    { label: 'Services', href: '/#services', key: '#services' },
    { label: 'Why Me', href: '/#why-me', key: '#why-me' },
    { label: 'Portfolio', href: '/#portfolio', key: '#portfolio' },
    { label: 'Process', href: '/#process', key: '#process' },
    { label: 'Results', href: '/#results', key: '#results' },
    { label: 'FAQ', href: '/#faq', key: '#faq' },
    { label: 'Blog', href: '/blog', key: '/blog' },
    { label: 'Contact', href: '/#contact', key: '#contact' }
  ];

  const handleNavClick = (key: string) => {
    setActiveHash(key);
    setIsOpen(false);
  };

  return (
    <>
      {/* Top Header Bar for Mobile & Tablet */}
      <header className={`mobile-bar sticky top-0 z-50 transition-all duration-300 lg:hidden ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl border-b border-[#E2E8F0] shadow-sm' 
          : 'bg-white border-b border-transparent'
      }`}>
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <Link href="/#home" className="mobile-brand flex items-center gap-2.5 group">
            <div className="relative">
              {imgError ? (
                <div className="w-9 h-9 rounded-full bg-[#2563EB] grid place-items-center border-2 border-white text-white text-xs font-bold shrink-0">
                  WH
                </div>
              ) : (
                <img 
                  src={avatarUrl} 
                  alt={ownerName} 
                  className="w-9 h-9 rounded-full object-cover border-2 border-white shrink-0" 
                  onError={() => setImgError(true)} 
                />
              )}
              {/* Green Blinking Status Dot */}
              <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3 pointer-events-none">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-80" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25D366] border-2 border-white" />
              </span>
            </div>
            <div>
              <strong className="block text-[14px] font-display text-[#1E293B] font-bold leading-tight group-hover:text-[#2563EB] transition-colors">{ownerName}</strong>
            </div>
          </Link>

          <div className="flex items-center gap-2.5">
            <Link 
              className="btn btn-primary text-[12px] font-bold py-1.5 px-3.5 rounded-xl shadow-md bg-[#2563EB] hover:bg-[#1D4ED8]" 
              href="/#contact"
            >
              {ctaText.replace('Book ', '')}
            </Link>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-9 h-9 rounded-xl border border-[#E2E8F0] bg-slate-50 flex flex-col items-center justify-center gap-1.5 text-[#1E293B] hover:bg-slate-100 transition-all focus:outline-none"
              aria-label={isOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
              aria-expanded={isOpen}
            >
              <span className={`w-4 h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-4 h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`w-4 h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out Drawer & Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop Blur Overlay */}
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <aside 
            className="fixed top-0 right-0 w-[300px] max-w-[85vw] h-full bg-[#050f1f]/95 border-l border-white/10 p-6 z-50 flex flex-col justify-between backdrop-blur-2xl shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300"
            aria-label="Mobile Drawer Navigation"
          >
            <div className="flex flex-col gap-5">
              {/* Drawer Top Header with Close Button */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                  <span className="text-[11px] font-bold text-[#25D366] uppercase tracking-wider">{availabilityStatus}</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-xl border border-white/10 bg-white/5 grid place-items-center text-[#aebcda] hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close menu"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>

              {/* Profile Card in Drawer */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  {imgError ? (
                    <div className="w-12 h-12 rounded-full bg-[#2563EB] grid place-items-center border-2 border-[#050f1f] text-white text-sm font-bold shrink-0">
                      WH
                    </div>
                  ) : (
                    <img 
                      src={avatarUrl} 
                      alt={ownerName} 
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#050f1f] shrink-0" 
                      onError={() => setImgError(true)} 
                    />
                  )}
                  <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 pointer-events-none">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-80" />
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#25D366] border-2 border-[#050f1f]" />
                  </span>
                </div>
                <div>
                  <h2 className="text-[16px] font-bold text-white font-display leading-tight">{ownerName}</h2>
                  <p className="text-[12px] text-[#aebcda] font-medium">{jobTitle}</p>
                </div>
              </div>

              {/* Menu Items List */}
              <nav className="flex flex-col gap-1 py-2">
                {menuItems.map((item) => {
                  const isActive = activeHash === item.key || (item.key === '#home' && activeHash === '');
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => handleNavClick(item.key)}
                      className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-200 ${
                        isActive
                          ? 'text-white font-bold bg-[#2563EB]/20 border-l-2 border-[#2563EB]'
                          : 'text-[#aebcda] hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] shadow-[0_0_8px_#25D366]" />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions & Socials */}
            <div className="flex flex-col gap-4 border-t border-white/10 pt-4 mt-auto">
              <Link 
                className="btn btn-primary w-full text-[13.5px] font-bold py-3 rounded-xl text-center shadow-lg bg-[#2563EB] hover:bg-[#1D4ED8]" 
                href="/#contact"
                onClick={() => setIsOpen(false)}
              >
                {ctaText}
              </Link>

              <div className="flex justify-center gap-3">
                <a href="https://www.linkedin.com/in/wphossain/" target="_blank" rel="noopener" aria-label="LinkedIn" className="w-9 h-9 rounded-xl grid place-items-center bg-white/5 border border-white/10 text-[#aebcda] hover:text-white hover:border-[#25D366]/40 hover:bg-[#25D366]/10 transition-all">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7.5 0h3.8v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.53 1.72-2.53 3.49V23h-4V8z"/></svg>
                </a>
                <a href="https://facebook.com/wphossain374" target="_blank" rel="noopener" aria-label="Facebook" className="w-9 h-9 rounded-xl grid place-items-center bg-white/5 border border-white/10 text-[#aebcda] hover:text-white hover:border-[#25D366]/40 hover:bg-[#25D366]/10 transition-all">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.16 8.44 9.94v-7.03H7.9v-2.91h2.54V9.86c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46H15.2c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22c4.78-.78 8.43-4.94 8.43-9.94z"/></svg>
                </a>
                <a href="https://youtube.com/@wphossain" target="_blank" rel="noopener" aria-label="YouTube" className="w-9 h-9 rounded-xl grid place-items-center bg-white/5 border border-white/10 text-[#aebcda] hover:text-white hover:border-[#25D366]/40 hover:bg-[#25D366]/10 transition-all">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.56a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.6 15.6V8.4l6.4 3.6-6.4 3.6z"/></svg>
                </a>
              </div>

              <p className="text-[11.5px] text-[#7b8bad] text-center">
                <a href={`mailto:${email}`} className="hover:text-[#25D366] transition-colors">{email}</a>
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
