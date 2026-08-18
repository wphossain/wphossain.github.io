"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface TestimonialItem {
  client_name: string;
  client_role: string;
  quote: string;
  rating: number;
  avatar_url?: string;
}

interface TestimonialsSliderProps {
  testimonials?: TestimonialItem[];
}

function getAvatarUrl(name: string): string {
  const colors = ['1a73e8', '0b57b0', 'f2a93d', 'e67e22', '25D366', '8e44ad'];
  const colorIndex = name.charCodeAt(0) % colors.length;
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${colors[colorIndex]}&color=fff&size=72&bold=true&font-size=0.4`;
}

export function TestimonialsSlider({ testimonials = [] }: TestimonialsSliderProps) {
  const defaultTestimonials: TestimonialItem[][] = [
    [
      { client_name: "M. Reyes", client_role: "HVAC Contractor", quote: "Since tightening up the campaigns we're getting more calls from people who are ready to book, not just browsing.", rating: 5 },
      { client_name: "D. Whitfield", client_role: "Local Service Business", quote: "Finally have one dashboard that shows exactly where every lead came from — no more guessing between forms and calls.", rating: 5 },
      { client_name: "K. Alvarado", client_role: "Service Company Owner", quote: "Reporting is clear enough that I can see what's working without asking a bunch of follow-up questions.", rating: 5 }
    ],
    [
      { client_name: "R. Bennett", client_role: "Roofing Company", quote: "The reporting finally matches what I see in results — I'm not left wondering if the ad spend is actually doing anything.", rating: 5 },
      { client_name: "T. Nakamura", client_role: "Electrical Services", quote: "Every call gets logged automatically now, so I can see exactly which keywords are actually bringing in work.", rating: 5 },
      { client_name: "S. Okafor", client_role: "Landscaping Business", quote: "Onboarding was straightforward, and I actually understand the monthly report instead of just skimming past it.", rating: 5 }
    ]
  ];

  const slides = testimonials.length > 0 ? [testimonials.slice(0, 3), testimonials.slice(3, 6)] : defaultTestimonials;
  const [currentIdx, setCurrentIdx] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const handleSlide = (dir: number) => {
    setCurrentIdx((prev) => (prev + dir + slides.length) % slides.length);
  };

  // Auto-advance with pause on hover
  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(id);
  }, [slides.length]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      handleSlide(dx < 0 ? 1 : -1);
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="testi-slider relative overflow-hidden group/slider"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div 
        className="testi-track flex transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={{ transform: `translateX(-${currentIdx * 100}%)` }}
      >
        {slides.map((slide, sIdx) => (
          <div key={sIdx} className="testi-slide flex-none w-full min-w-full">
            <div className="grid grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 gap-6 px-14 max-md:px-12">
              {slide.map((item, idx) => (
                <article key={idx} className="testi-card bg-[#132A4E]/40 border border-[#2563EB]/25 shadow-md rounded-2xl p-6 flex flex-col gap-5 hover:border-[#2563EB]/50 hover:bg-[#132A4E]/60 hover:-translate-y-1 transition-all duration-300">
                  <div className="testi-top flex items-center justify-between">
                    <div className="flex gap-0.5 text-[#25D366]">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                    <div className="opacity-20 text-[#aebcda]">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12M5.017 21L5.017 18C5.017 16.8954 5.91243 16 7.017 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.017C5.46472 8 5.017 8.44772 5.017 9V12"/></svg>
                    </div>
                  </div>
                  <p className="testi-quote text-[15px] text-white italic leading-relaxed font-medium">
                    &quot;{item.quote}&quot;
                  </p>
                  <div className="testi-who flex items-center gap-3 mt-auto pt-4 border-t border-white/10">
                    <div className="testi-avatar w-11 h-11 rounded-full flex-none overflow-hidden border border-white/15 p-0.5 bg-gradient-to-tr from-white/10 to-white/5">
                      <Image 
                        src={item.avatar_url || getAvatarUrl(item.client_name)} 
                        alt={item.client_name}
                        width={44}
                        height={44}
                        className="w-full h-full object-cover rounded-full"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <strong className="block text-[14px] font-bold text-white">{item.client_name}</strong>
                      <span className="text-[12px] text-[#aebcda] font-medium">{item.client_role}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="slider-nav flex items-center justify-between absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 pointer-events-none">
        <button className="slider-arrow w-10 h-10 rounded-full border border-white/15 bg-[#132A4E] text-white shadow-md cursor-pointer grid place-items-center hover:bg-[#2563EB] hover:border-[#2563EB] transition-all pointer-events-auto" onClick={() => handleSlide(-1)} aria-label="Previous testimonials"><ChevronLeft size={20} /></button>
        <button className="slider-arrow w-10 h-10 rounded-full border border-white/15 bg-[#132A4E] text-white shadow-md cursor-pointer grid place-items-center hover:bg-[#2563EB] hover:border-[#2563EB] transition-all pointer-events-auto" onClick={() => handleSlide(1)} aria-label="Next testimonials"><ChevronRight size={20} /></button>
      </div>

      <div className="slider-dots flex items-center justify-center gap-2.5 mt-8">
        {slides.map((_, idx) => (
          <button 
            key={idx} 
            className={`dot h-1.5 rounded-full border-none cursor-pointer p-0 transition-all duration-300 ${idx === currentIdx ? "bg-[#2563EB] w-8" : "bg-white/20 w-2 hover:bg-white/40"}`} 
            onClick={() => setCurrentIdx(idx)} 
          />
        ))}
      </div>
    </div>
  );
}