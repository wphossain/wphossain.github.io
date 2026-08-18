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

export function TestimonialsSlider({ testimonials = [] }: TestimonialsSliderProps) {
  const defaultTestimonials: TestimonialItem[][] = [
    [
      { 
        client_name: "David Miller", 
        client_role: "Owner, Miller HVAC & Mechanical · Dallas, TX", 
        quote: "Since WP Hossain took over our Google Ads, our Cost Per Lead dropped from $114 to $34. Our technicians are fully booked 2 weeks out.", 
        rating: 5,
        avatar_url: "/avatars/david-m.jpg"
      },
      { 
        client_name: "Rick Bennett", 
        client_role: "Master Plumbing Contractor · Austin, TX", 
        quote: "Finally, a PPC specialist who actually understands call tracking. Every single dollar is tracked to a booked water heater or emergency slab leak job.", 
        rating: 5,
        avatar_url: "/avatars/rick-b.jpg"
      },
      { 
        client_name: "Marcus Vance", 
        client_role: "Vance Roofing & Restoration · Houston, TX", 
        quote: "The negative keyword fortress alone saved us $3,500/mo in junk search clicks. Clean reporting, fast WhatsApp communication, zero fluff.", 
        rating: 5,
        avatar_url: "/avatars/marcus-v.jpg"
      }
    ],
    [
      { 
        client_name: "David Miller", 
        client_role: "Commercial Electrical Services · Phoenix, AZ", 
        quote: "We generated 42 high-ticket panel upgrade leads in our first 30 days. He builds high-converting mobile landing pages too, which saved us thousands.", 
        rating: 5,
        avatar_url: "/avatars/david-m.jpg"
      },
      { 
        client_name: "Rick Bennett", 
        client_role: "Home Services & Emergency HVAC · Denver, CO", 
        quote: "Every incoming call gets recorded and graded in CallRail. We know exactly which keywords produce real revenue. Best PPC partner we have ever hired.", 
        rating: 5,
        avatar_url: "/avatars/rick-b.jpg"
      },
      { 
        client_name: "Marcus Vance", 
        client_role: "Commercial Landscaping & Irrigation · Atlanta, GA", 
        quote: "Onboarding took 48 hours. Month-to-month agreement with zero lock-in made it a no-brainer. Highly recommended for any trade contractor.", 
        rating: 5,
        avatar_url: "/avatars/marcus-v.jpg"
      }
    ]
  ];

  const slides = testimonials.length > 0 ? [testimonials.slice(0, 3), testimonials.slice(3, 6)] : defaultTestimonials;
  const [currentIdx, setCurrentIdx] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const handleSlide = (dir: number) => {
    setCurrentIdx((prev) => (prev + dir + slides.length) % slides.length);
  };

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % slides.length);
    }, 7000);
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
      className="relative overflow-hidden group/slider"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div 
        className="flex transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={{ transform: `translateX(-${currentIdx * 100}%)` }}
      >
        {slides.map((slide, sIdx) => (
          <div key={sIdx} className="flex-none w-full min-w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-1 lg:px-2">
              {slide.map((item, idx) => (
                <article key={idx} className="bg-white border border-[#CBD5E1] shadow-xs rounded-[24px] p-7 flex flex-col justify-between gap-5 hover:border-[#0F172A] hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex gap-1 text-[#059669]">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} size={15} fill="currentColor" />
                        ))}
                      </div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#059669] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                        Verified Contractor
                      </span>
                    </div>
                    <p className="text-[14.5px] text-[#0F172A] italic leading-relaxed font-medium">
                      &quot;{item.quote}&quot;
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-[#E2E8F0]">
                    <div className="w-12 h-12 rounded-full flex-none overflow-hidden border-2 border-emerald-100 p-0.5 bg-slate-100 shadow-2xs">
                      <Image 
                        src={item.avatar_url || "/avatars/david-m.jpg"} 
                        alt={item.client_name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover rounded-full"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <strong className="block text-[14.5px] font-bold text-[#0F172A] font-display">{item.client_name}</strong>
                      <span className="text-[12px] text-[#64748B] font-medium block leading-tight">{item.client_role}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between absolute inset-x-0 top-1/2 -translate-y-1/2 px-0 pointer-events-none">
        <button 
          className="w-10 h-10 rounded-full border border-[#CBD5E1] bg-white text-[#0F172A] shadow-md cursor-pointer grid place-items-center hover:border-[#0F172A] hover:bg-slate-50 transition-all pointer-events-auto -ml-3" 
          onClick={() => handleSlide(-1)} 
          aria-label="Previous testimonials"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          className="w-10 h-10 rounded-full border border-[#CBD5E1] bg-white text-[#0F172A] shadow-md cursor-pointer grid place-items-center hover:border-[#0F172A] hover:bg-slate-50 transition-all pointer-events-auto -mr-3" 
          onClick={() => handleSlide(1)} 
          aria-label="Next testimonials"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Slider Indicator Dots */}
      <div className="flex items-center justify-center gap-2.5 mt-8">
        {slides.map((_, idx) => (
          <button 
            key={idx} 
            className={`h-2 rounded-full border-none cursor-pointer p-0 transition-all duration-300 ${idx === currentIdx ? "bg-[#0F172A] w-8" : "bg-slate-300 w-2.5 hover:bg-slate-400"}`} 
            onClick={() => setCurrentIdx(idx)} 
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}