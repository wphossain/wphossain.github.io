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

const SERVICE_ITEMS = [
  {
    title: 'Google Ads Management',
    icon: '🎯',
    href: '/#services'
  },
  {
    title: 'Negative Keyword Fortresses',
    icon: '🛡️',
    href: '/#services'
  },
  {
    title: 'CallRail & Call Tracking DNI',
    icon: '📞',
    href: '/#services'
  },
  {
    title: 'Click-to-Call Landing Pages',
    icon: '⚡',
    href: '/#services'
  },
  {
    title: 'GA4 & GTM Attribution',
    icon: '🔬',
    href: '/#services'
  },
  {
    title: 'Local Service Ads (LSA)',
    icon: '🚀',
    href: '/#services'
  }
];

export function MobileHeader({
  ownerName = "WP Hossain",
  jobTitle = "Google Ads Specialist",
  avatarUrl = "/images/headshot.jpg",
  email = "Contact@wphossain.com",
  availabilityStatus = "Available for Q3/Q4 Projects",
  ctaText = "Book Call"
}: MobileHeaderProps) {
  const [imgError, setImgError] = useState(false);
  const [activeHash, setActiveHash] = useState('#home');
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesExpanded, setIsServicesExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash) {
        setActiveHash(window.location.hash);
      } else {
        setActiveHash('#home');
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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

  const handleNavClick = (key: string) => {
    setActiveHash(key);
    setIsOpen(false);
  };

  return (
    <>
      <header className={`mobile-bar sticky top-0 z-50 transition-all duration-300 lg:hidden ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-xs' 
          : 'bg-white border-b border-[#E2E8F0]'
      }`}>
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/#home" className="flex items-center gap-2.5 group">
            <div className="relative">
              {imgError ? (
                <div className="w-8 h-8 rounded-full bg-[#0F172A] grid place-items-center text-white text-[10px] font-bold shrink-0 border-2 border-white shadow-xs">
                  WH
                </div>
              ) : (
                <img 
                  src={avatarUrl} 
                  alt="WP Hossain" 
                  className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-xs shrink-0" 
                  onError={() => setImgError(true)} 
                />
              )}
              <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3 pointer-events-none">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#059669] border-2 border-white" />
              </span>
            </div>
            <div>
              <strong className="block text-[14.5px] font-display text-[#0F172A] font-bold leading-tight group-hover:text-[#059669] transition-colors">WP Hossain</strong>
              <span className="text-[11px] text-[#64748B] font-medium leading-none">Google Ads Specialist</span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <a 
              className="btn btn-primary text-[12px] font-bold py-1.5 px-3 rounded-xl shadow-xs" 
              href="https://zcal.co/wphossain/free"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Call
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-9 h-9 rounded-xl border border-[#CBD5E1] bg-slate-50 flex flex-col items-center justify-center gap-1.5 text-[#0F172A] hover:bg-slate-100 transition-all focus:outline-none"
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

      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-300"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <aside 
            className="fixed top-0 right-0 w-[300px] max-w-[85vw] h-full bg-white border-l border-[#E2E8F0] p-6 z-50 flex flex-col justify-between shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300"
            aria-label="Mobile Drawer Navigation"
          >
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse" />
                  <span className="text-[11px] font-bold text-[#059669] uppercase tracking-wider">{availabilityStatus}</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-xl border border-[#CBD5E1] bg-slate-50 grid place-items-center text-[#475569] hover:text-[#0F172A] hover:bg-slate-100 transition-colors"
                  aria-label="Close menu"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  {imgError ? (
                    <div className="w-12 h-12 rounded-full bg-[#0F172A] grid place-items-center border-2 border-slate-100 text-white text-sm font-bold shrink-0 font-display">
                      WH
                    </div>
                  ) : (
                    <img 
                      src={avatarUrl} 
                      alt="WP Hossain" 
                      className="w-12 h-12 rounded-full object-cover border-2 border-slate-100 shrink-0" 
                      onError={() => setImgError(true)} 
                    />
                  )}
                  <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 pointer-events-none">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#059669] border-2 border-white" />
                  </span>
                </div>
                <div>
                  <h2 className="text-[16px] font-bold text-[#0F172A] font-display leading-tight">WP Hossain</h2>
                  <p className="text-[12px] text-[#64748B] font-medium">{jobTitle}</p>
                </div>
              </div>

              <nav className="flex flex-col gap-1 py-2">
                
                {/* 1. Home */}
                <Link
                  href="/#home"
                  onClick={() => handleNavClick('#home')}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[14px] font-semibold transition-all duration-200 ${
                    activeHash === '#home' || activeHash === ''
                      ? 'text-[#0F172A] font-bold bg-slate-100 border-l-3 border-[#0F172A]'
                      : 'text-[#475569] hover:text-[#0F172A] hover:bg-slate-50'
                  }`}
                >
                  <span>Home</span>
                  {(activeHash === '#home' || activeHash === '') && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                  )}
                </Link>

                {/* 2. Ecosystem */}
                <Link
                  href="/#ecosystem"
                  onClick={() => handleNavClick('#ecosystem')}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[14px] font-semibold transition-all duration-200 ${
                    activeHash === '#ecosystem'
                      ? 'text-[#0F172A] font-bold bg-slate-100 border-l-3 border-[#0F172A]'
                      : 'text-[#475569] hover:text-[#0F172A] hover:bg-slate-50'
                  }`}
                >
                  <span>Ecosystem</span>
                  {activeHash === '#ecosystem' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                  )}
                </Link>

                {/* 3. Services with Collapsible Submenu */}
                <div>
                  <div className="flex items-center justify-between">
                    <Link
                      href="/#services"
                      onClick={() => handleNavClick('#services')}
                      className={`flex-1 flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[14px] font-semibold transition-all duration-200 ${
                        activeHash === '#services'
                          ? 'text-[#0F172A] font-bold bg-slate-100 border-l-3 border-[#0F172A]'
                          : 'text-[#475569] hover:text-[#0F172A] hover:bg-slate-50'
                      }`}
                    >
                      <span>Services</span>
                    </Link>
                    <button
                      onClick={() => setIsServicesExpanded(!isServicesExpanded)}
                      className="p-2.5 text-slate-400 hover:text-[#0F172A] transition-colors"
                      aria-label="Toggle Services List"
                    >
                      <svg 
                        width="14" 
                        height="14" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.5"
                        className={`transition-transform duration-200 ${isServicesExpanded ? 'rotate-180 text-[#1A73E8]' : ''}`}
                      >
                        <path d="m6 9 6 6 6-6"/>
                      </svg>
                    </button>
                  </div>

                  {isServicesExpanded && (
                    <div className="pl-3 pr-1 py-1.5 ml-3 border-l-2 border-slate-200 flex flex-col gap-1 mt-1 animate-in fade-in duration-200">
                      {SERVICE_ITEMS.map((srv, idx) => (
                        <Link
                          key={idx}
                          href={srv.href}
                          onClick={() => handleNavClick('#services')}
                          className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] text-[#475569] hover:text-[#0F172A] hover:bg-slate-100 transition-colors"
                        >
                          <span className="text-xs">{srv.icon}</span>
                          <span>{srv.title}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* 4. Why Me */}
                <Link
                  href="/#why-me"
                  onClick={() => handleNavClick('#why-me')}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[14px] font-semibold transition-all duration-200 ${
                    activeHash === '#why-me'
                      ? 'text-[#0F172A] font-bold bg-slate-100 border-l-3 border-[#0F172A]'
                      : 'text-[#475569] hover:text-[#0F172A] hover:bg-slate-50'
                  }`}
                >
                  <span>Why Me</span>
                  {activeHash === '#why-me' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                  )}
                </Link>

                {/* 5. Portfolio */}
                <Link
                  href="/#portfolio"
                  onClick={() => handleNavClick('#portfolio')}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[14px] font-semibold transition-all duration-200 ${
                    activeHash === '#portfolio'
                      ? 'text-[#0F172A] font-bold bg-slate-100 border-l-3 border-[#0F172A]'
                      : 'text-[#475569] hover:text-[#0F172A] hover:bg-slate-50'
                  }`}
                >
                  <span>Portfolio</span>
                  {activeHash === '#portfolio' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                  )}
                </Link>

                {/* 6. Pricing */}
                <Link
                  href="/#packages"
                  onClick={() => handleNavClick('#packages')}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[14px] font-semibold transition-all duration-200 ${
                    activeHash === '#packages'
                      ? 'text-[#0F172A] font-bold bg-slate-100 border-l-3 border-[#0F172A]'
                      : 'text-[#475569] hover:text-[#0F172A] hover:bg-slate-50'
                  }`}
                >
                  <span>Pricing</span>
                  {activeHash === '#packages' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                  )}
                </Link>

              </nav>
            </div>

            <div className="flex flex-col gap-4 border-t border-[#E2E8F0] pt-4 mt-auto">
              <a 
                className="btn btn-primary w-full text-[13.5px] font-bold py-3 rounded-xl text-center shadow-md block" 
                href="https://zcal.co/wphossain/free"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
              >
                Book Free Strategy Call
              </a>

              <div className="flex justify-center gap-3">
                <a href="https://www.linkedin.com/in/wphossain/" target="_blank" rel="noopener" aria-label="LinkedIn" className="w-9 h-9 rounded-xl grid place-items-center bg-slate-50 border border-[#CBD5E1] text-[#475569] hover:text-[#0F172A] hover:bg-slate-100 transition-all">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7.5 0h3.8v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.53 1.72-2.53 3.49V23h-4V8z"/></svg>
                </a>
                <a href="https://facebook.com/wphossain374" target="_blank" rel="noopener" aria-label="Facebook" className="w-9 h-9 rounded-xl grid place-items-center bg-slate-50 border border-[#CBD5E1] text-[#475569] hover:text-[#0F172A] hover:bg-slate-100 transition-all">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.16 8.44 9.94v-7.03H7.9v-2.91h2.54V9.86c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46H15.2c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22c4.78-.78 8.43-4.94 8.43-9.94z"/></svg>
                </a>
              </div>

              <p className="text-[11.5px] text-[#64748B] text-center">
                <a href={`mailto:${email}`} className="hover:text-[#059669] transition-colors">{email}</a>
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
