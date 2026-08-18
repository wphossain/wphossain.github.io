"use client";

import React, { useState, useEffect } from 'react';
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
  availabilityStatus = "Available for Q3/Q4 Projects",
  ctaText = "Book Free Call"
}: SidebarProps) {
  const [imgError, setImgError] = useState(false);
  const [activeHash, setActiveHash] = useState('#home');
  const [isScrolled, setIsScrolled] = useState(false);

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

  const navItems = [
    { label: 'Home', href: '/#home', key: '#home' },
    { label: 'Ecosystem', href: '/#ecosystem', key: '#ecosystem' },
    { label: 'Services', href: '/#services', key: '#services' },
    { label: 'Why Me', href: '/#why-me', key: '#why-me' },
    { label: 'Portfolio', href: '/#portfolio', key: '#portfolio' },
    { label: 'Packages', href: '/#packages', key: '#packages' },
    { label: 'Reviews', href: '/#testimonials', key: '#testimonials' },
    { label: 'FAQ', href: '/#faq', key: '#faq' },
    { label: 'Blog', href: '/blog', key: '/blog' }
  ];

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 hidden lg:block ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-xs py-3' 
        : 'bg-white border-b border-[#E2E8F0] py-3.5'
    }`}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 flex items-center justify-between gap-6">
        
        {/* Brand / Logo (Always WP Hossain) */}
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

        {/* Center Navigation Links */}
        <nav className="flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = activeHash === item.key || (item.key === '#home' && activeHash === '');
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`px-3 py-1.5 rounded-lg text-[13.5px] font-semibold transition-all duration-150 ${
                  isActive
                    ? 'text-[#0F172A] font-bold bg-slate-100'
                    : 'text-[#475569] hover:text-[#0F172A] hover:bg-slate-50'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
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
