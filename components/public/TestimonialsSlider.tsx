"use client";

import React, { useState } from 'react';

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
  const defaultTestimonials: TestimonialItem[] = [
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

  const handleSlide = (dir: number) => {
    setCurrentIdx((prev) => (prev + dir + slides.length) % slides.length);
  };

  return (
    <div className="testi-slider overflow-hidden">
      <div 
        className="testi-track flex transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ transform: `translateX(-${currentIdx * 100}%)` }}
      >
        {slides.map((slide, sIdx) => (
          <div key={sIdx} className="testi-slide flex-none w-full min-w-full">
            <div className="grid-3 gap-[18px]">
              {slide.map((item, idx) => (
                <article key={idx} className="testi-card bg-[rgba(255,255,255,0.03)] border border-[var(--line)] rounded-[18px] p-5.5 flex flex-col gap-3.5">
                  <div className="testi-top flex items-center justify-between gap-2.5">
                    <span className="stars text-[var(--gold)] text-[13px] tracking-[2px]" aria-label={`${item.rating} out of 5 stars`}>
                      {"★".repeat(item.rating)}
                    </span>
                  </div>
                  <p className="testi-quote text-[14.5px] text-[#e6ecfa] italic">
                    &quot;{item.quote}&quot;
                  </p>
                  <div className="testi-who flex items-center gap-2.5 mt-auto">
                    <div className="testi-avatar w-[38px] h-[38px] rounded-full flex-none overflow-hidden grid place-items-center border border-[var(--line)]">
                      <img 
                        src={item.avatar_url || getAvatarUrl(item.client_name)} 
                        alt={item.client_name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <strong className="block text-[13.5px] font-bold text-white">{item.client_name}</strong>
                      <span className="text-[12px] text-[var(--ink-faint)]">{item.client_role}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="slider-controls flex items-center justify-center gap-4 mt-5.5">
        <button className="slider-arrow w-9 h-9 rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.03)] text-white text-[18px] cursor-pointer grid place-items-center hover:border-[var(--blue)] hover:text-[var(--blue)] transition-all" onClick={() => handleSlide(-1)} aria-label="Previous testimonials">‹</button>
        <div className="slider-dots flex items-center gap-2">
          {slides.map((_, idx) => (
            <button 
              key={idx} 
              className={`dot h-2 rounded-full border-none cursor-pointer p-0 transition-all ${idx === currentIdx ? "bg-[var(--blue)] w-5.5" : "bg-[var(--line-soft)] w-2"}`} 
              onClick={() => setCurrentIdx(idx)} 
              aria-label={`Show testimonials, slide ${idx + 1}`}
            />
          ))}
        </div>
        <button className="slider-arrow w-9 h-9 rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.03)] text-white text-[18px] cursor-pointer grid place-items-center hover:border-[var(--blue)] hover:text-[var(--blue)] transition-all" onClick={() => handleSlide(1)} aria-label="Next testimonials">›</button>
      </div>
    </div>
  );
}