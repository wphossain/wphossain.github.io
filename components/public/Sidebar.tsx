"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface SidebarProps {
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
    color: '#4285F4',
    href: '/#services'
  },
  {
    title: 'SEO Strategy',
    icon: '📈',
    color: '#EA4335',
    href: '/#services'
  },
  {
    title: 'Performance Marketing',
    icon: '⚡',
    color: '#FBBC04',
    href: '/#services'
  },
  {
    title: 'Analytics & CRO',
    icon: '🔬',
    color: '#1A73E8',
    href: '/#services',
    hasDividerTop: true
  },
  {
    title: 'Web Development',
    icon: '💻',
    color: '#6366F1',
    href: '/#services'
  },
  {
    title: 'Growth Consulting',
    icon: '🚀',
    color: '#059669',
    href: '/#services'
  }
];

export function Sidebar({
  ownerName = "WP Hossain",
  jobTitle = "Google Ads Specialist",
  avatarUrl = "/images/headshot.jpg",
  email = "Contact@wphossain.com",
  availabilityStatus = "Available for Q3/Q4 Projects",
  ctaText = "Book Free Strategy Call"
}: SidebarProps) {
  const [imgError, setImgError] = useState(false);
  const [activeHash, setActiveHash] = useState('#home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 180);
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 hidden lg:block ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-xs py-3' 
        : 'bg-white border-b border-[#E2E8F0] py-3.5'
    }`}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 flex items-center justify-between gap-6">
        
        {/* Brand / Logo */}
        <Link href="/#home" className="flex items-center gap-3 group shrink-0">
          <div className="relative">
            {imgError ? (
              <div className="w-10 h-10 rounded-full bg-[#0F172A] grid place-items-center text-white text-xs font-bold shrink-0 border-2 border-white shadow-xs">
                WH
              </div>
            ) : (
              <img 
                src={avatarUrl} 
                alt="WP Hossain" 
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-xs shrink-0" 
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
              <strong className="text-[15px] font-bold text-[#0F172A] font-display tracking-tight group-hover:text-[#059669] transition-colors">
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

        {/* Center Navigation Links (Strictly: Home, Ecosystem, Services, Why Me, Portfolio, Pricing) */}
        <nav className="flex items-center gap-1 xl:gap-2">
          
          {/* 1. Home */}
          <Link
            href="/#home"
            className={`px-3 py-1.5 rounded-lg text-[13.5px] font-semibold transition-all duration-150 ${
              activeHash === '#home' || activeHash === ''
                ? 'text-[#0F172A] font-bold bg-slate-100'
                : 'text-[#475569] hover:text-[#0F172A] hover:bg-slate-50'
            }`}
          >
            Home
          </Link>

          {/* 2. Ecosystem */}
          <Link
            href="/#ecosystem"
            className={`px-3 py-1.5 rounded-lg text-[13.5px] font-semibold transition-all duration-150 ${
              activeHash === '#ecosystem'
                ? 'text-[#0F172A] font-bold bg-slate-100'
                : 'text-[#475569] hover:text-[#0F172A] hover:bg-slate-50'
            }`}
          >
            Ecosystem
          </Link>

          {/* 3. Services with Dropdown Menu */}
          <div 
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href="/#services"
              onClick={() => setIsDropdownOpen(false)}
              className={`px-3 py-1.5 rounded-lg text-[13.5px] font-semibold transition-all duration-150 inline-flex items-center gap-1.5 ${
                activeHash === '#services' || isDropdownOpen
                  ? 'text-[#1A73E8] font-bold bg-blue-50/80'
                  : 'text-[#475569] hover:text-[#0F172A] hover:bg-slate-50'
              }`}
            >
              <span>Services</span>
              <svg 
                width="12" 
                height="12" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-[#1A73E8]' : 'text-slate-400'}`}
              >
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </Link>

            {/* Dropdown Popup Card (Crisp White Light Theme matching site) */}
            {isDropdownOpen && (
              <div 
                className="absolute top-full left-0 mt-2 w-[270px] bg-white border border-[#CBD5E1] rounded-[22px] p-2.5 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150"
              >
                <div className="flex flex-col gap-1">
                  {SERVICE_ITEMS.map((item, i) => (
                    <React.Fragment key={i}>
                      {item.hasDividerTop && (
                        <div className="my-1.5 border-t border-[#E2E8F0]" />
                      )}
                      <Link
                        href={item.href}
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-[#E2E8F0] transition-all group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-slate-50 border border-[#CBD5E1] flex items-center justify-center text-[15px] shrink-0 group-hover:scale-105 group-hover:border-[#1A73E8] transition-all shadow-2xs">
                          {item.icon}
                        </div>
                        <span className="text-[13.5px] font-semibold text-[#0F172A] group-hover:text-[#1A73E8] transition-colors">
                          {item.title}
                        </span>
                      </Link>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 4. Why Me */}
          <Link
            href="/#why-me"
            className={`px-3 py-1.5 rounded-lg text-[13.5px] font-semibold transition-all duration-150 ${
              activeHash === '#why-me'
                ? 'text-[#0F172A] font-bold bg-slate-100'
                : 'text-[#475569] hover:text-[#0F172A] hover:bg-slate-50'
            }`}
          >
            Why Me
          </Link>

          {/* 5. Portfolio */}
          <Link
            href="/#portfolio"
            className={`px-3 py-1.5 rounded-lg text-[13.5px] font-semibold transition-all duration-150 ${
              activeHash === '#portfolio'
                ? 'text-[#0F172A] font-bold bg-slate-100'
                : 'text-[#475569] hover:text-[#0F172A] hover:bg-slate-50'
            }`}
          >
            Portfolio
          </Link>

          {/* 6. Pricing (Points to Packages section) */}
          <Link
            href="/#packages"
            className={`px-3 py-1.5 rounded-lg text-[13.5px] font-semibold transition-all duration-150 ${
              activeHash === '#packages'
                ? 'text-[#0F172A] font-bold bg-slate-100'
                : 'text-[#475569] hover:text-[#0F172A] hover:bg-slate-50'
            }`}
          >
            Pricing
          </Link>

        </nav>

        {/* Right CTA Button */}
        <div className="flex items-center gap-3 shrink-0">
          <a 
            href="https://zcal.co/wphossain/free" 
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary text-[13.5px] font-bold py-2.5 px-5 rounded-xl shadow-xs inline-flex items-center gap-1.5"
          >
            <span>Book Free Strategy Call</span>
            <span className="text-[14px]">→</span>
          </a>
        </div>

      </div>
    </header>
  );
}
