"use client";

import React, { useEffect, useState } from 'react';
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
  const [activeHash, setActiveHash] = useState('#home');

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash || '#home');
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="mobile-bar sticky top-0 z-50 bg-[#050d1a]/95 border-b border-white/5 backdrop-blur-md lg:hidden shadow-lg">
      <div className="mobile-bar-top flex items-center justify-between gap-2.5 p-4 pb-3">
        <div className="mobile-brand flex items-center gap-2.5">
          {imgError ? (
            <div className="w-9 h-9 rounded-full bg-[#1a73e8] grid place-items-center border-2 border-[#0e2340]">
              <span className="text-white text-xs font-bold">WH</span>
            </div>
          ) : (
            <img 
              src={avatarUrl} 
              alt={ownerName} 
              className="w-9 h-9 rounded-full object-cover border-2 border-[#0e2340]" 
              onError={() => setImgError(true)} 
            />
          )}
          <div>
            <strong className="block text-[14px] font-display text-white font-bold leading-tight">{ownerName}</strong>
            <span className="block text-[11px] text-[#7b8bad]">{jobTitle}</span>
          </div>
        </div>
        <Link className="btn btn-primary btn-sm text-[12px] font-bold py-2 px-3.5 rounded-xl shadow-md" href="/#contact">
          Free Audit
        </Link>
      </div>
      <div className="mobile-links flex gap-2 overflow-x-auto px-4 pb-3 no-scrollbar scroll-smooth">
        {[
          { label: 'Home', href: '/#home' },
          { label: 'Services', href: '/#services' },
          { label: 'Why Me', href: '/#why-me' },
          { label: 'Process', href: '/#process' },
          { label: 'Results', href: '/#results' },
          { label: 'Case Studies', href: '/#case-studies' },
          { label: 'Testimonials', href: '/#testimonials' },
          { label: 'Blog', href: '/blog' },
          { label: 'Contact', href: '/#contact' }
        ].map((link) => {
          const isActive = activeHash === link.href || (link.href === '/#home' && activeHash === '');
          return (
            <Link 
              key={link.label}
              href={link.href} 
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all border ${
                isActive 
                  ? 'bg-[#1a73e8] border-[#1a73e8] text-white' 
                  : 'bg-white/5 border-white/10 text-[#aebcda] hover:text-white hover:bg-white/10'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}