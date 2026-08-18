"use client";

import React from 'react';
import Image from 'next/image';

interface TrustedCompany {
  name: string;
  type: 'image' | 'custom';
  src?: string;
  width?: number;
  height?: number;
  customRender?: React.ReactNode;
}

const TRUSTED_COMPANIES: TrustedCompany[] = [
  {
    name: "BrandWeld",
    type: "image",
    src: "/logos/brandweld.png",
    width: 130,
    height: 38
  },
  {
    name: "PaMii",
    type: "image",
    src: "/logos/pamii.png",
    width: 90,
    height: 38
  },
  {
    name: "Spring Health",
    type: "image",
    src: "/logos/springhealth.png",
    width: 140,
    height: 34
  },
  {
    name: "WorldClass",
    type: "image",
    src: "/logos/worldclass.png",
    width: 160,
    height: 36
  },
  {
    name: "HexigonAI",
    type: "custom",
    customRender: (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#CBD5E1] shadow-2xs">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-cyan-500">
          <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" stroke="currentColor" strokeWidth="2.5" fill="none" />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
        <span className="font-bold text-[14px] tracking-tight text-[#0F172A] font-display">
          hexigon<span className="text-cyan-600 font-extrabold">AI</span>
        </span>
      </div>
    )
  },
  {
    name: "CanvasMi",
    type: "custom",
    customRender: (
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#CBD5E1] shadow-2xs">
        <span className="font-black text-[15px] tracking-wider text-[#0F172A] font-display">
          CANVAS<span className="text-cyan-500 font-extrabold">Mi</span>
        </span>
      </div>
    )
  }
];

export function TrustedByStrip() {
  return (
    <div className="w-full bg-[#F8FAFC] border-b border-[#CBD5E1] py-8 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        
        {/* Horizontal Container: "TRUSTED BY" box on the left, logos side-by-side on the right */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          
          {/* Left Title Badge: [ ♡ TRUSTED BY ] */}
          <div className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F172A] text-white border-2 border-[#0F172A] shadow-xs">
            <svg 
              width="15" 
              height="15" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="text-rose-400 shrink-0"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            </svg>
            <span className="text-[12.5px] font-extrabold uppercase tracking-widest text-white whitespace-nowrap">
              TRUSTED BY
            </span>
          </div>

          {/* Right: Logos Side by Side in the Same Line */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8 lg:gap-10 w-full overflow-x-auto py-1 scrollbar-none">
            {TRUSTED_COMPANIES.map((company, idx) => (
              <div 
                key={idx} 
                className="shrink-0 flex items-center justify-center grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-105"
                title={company.name}
              >
                {company.type === 'image' && company.src && (
                  <div className="relative flex items-center justify-center h-10 px-2">
                    <Image
                      src={company.src}
                      alt={`${company.name} Logo`}
                      width={company.width || 120}
                      height={company.height || 36}
                      className="object-contain max-h-9 w-auto"
                      loading="lazy"
                    />
                  </div>
                )}
                {company.type === 'custom' && company.customRender}
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
