"use client";

import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

interface TestimonialItem {
  client_name: string;
  client_role: string;
  quote: string;
  rating: number;
  avatar_url: string;
}

const TESTIMONIALS_LIST: TestimonialItem[] = [
  {
    client_name: "Derek Holbrook",
    client_role: "Holbrook & Sons Plumbing · Nashville, TN",
    quote: "We were drowning in tire-kicker calls for cheap $50 drain snaking while missing high-ticket $8,000 main sewer line replacements. Hossain rebuilt our keyword clusters around emergency hydro-jetting and slab leaks, backed by CallRail dynamic tracking. Our weekend dispatch schedule is now booked 3 weeks in advance.",
    rating: 5,
    avatar_url: "/avatars/derek-holbrook.jpg"
  },
  {
    client_name: "Tony Russo",
    client_role: "Sunstate Thermal & Air · Tampa, FL",
    quote: "During Florida's 95°F summer peaks, our previous agency was blowing budget on broad terms like 'how to recharge freon'. WP Hossain deployed a 1,200+ negative keyword fortress and built a 0.8s mobile click-to-call funnel. We went from losing bids to booking same-day AC replacement installs daily.",
    rating: 5,
    avatar_url: "/avatars/tony-russo.jpg"
  },
  {
    client_name: "Jake Patterson",
    client_role: "Patterson Electric & EV Systems · Denver, CO",
    quote: "Before working with WP Hossain, over 40% of our ad spend was wasted on job seekers and apprentice queries. He eliminated the search term bleed and dialed in affluent zip-code radius bidding. We now close multiple high-margin 200A panel upgrades and EV charger installs every single week.",
    rating: 5,
    avatar_url: "/avatars/jake-patterson.jpg"
  },
  {
    client_name: "Carlos Mendez",
    client_role: "Desert Shield Roofing & Restoration · Phoenix, AZ",
    quote: "Roof replacement in the desert is hyper-competitive. Hossain set up geotargeted storm-damage radius campaigns paired with instant automated SMS routing to our field estimators. We stopped wasting money on minor patch jobs and focused 100% on full insurance roof replacements with 5.4x ROAS.",
    rating: 5,
    avatar_url: "/avatars/carlos-mendez.jpg"
  }
];

export function TestimonialsSlider({ testimonials }: { testimonials?: any }) {
  const items = testimonials && testimonials.length > 0 ? testimonials : TESTIMONIALS_LIST;

  return (
    <div className="w-full">
      {/* 2x2 Grid of Testimonial Cards in Crisp Light Theme */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {items.map((item: TestimonialItem, idx: number) => (
          <article 
            key={idx} 
            className="bg-white border border-[#CBD5E1] rounded-[24px] p-7 sm:p-8 shadow-xs hover:border-[#0F172A] hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
          >
            {/* Top: 5 Golden Stars */}
            <div>
              <div className="flex items-center gap-1 text-[#F59E0B] mb-5">
                {[...Array(item.rating || 5)].map((_, i) => (
                  <Star key={i} size={17} fill="currentColor" className="text-[#F59E0B]" />
                ))}
              </div>

              {/* Middle: Review Quote */}
              <p className="text-[15px] sm:text-[15.5px] text-[#334155] italic leading-relaxed mb-6 font-normal">
                &quot;{item.quote}&quot;
              </p>
            </div>

            {/* Bottom: Client Profile */}
            <div className="flex items-center gap-3.5 pt-5 border-t border-[#E2E8F0] mt-auto">
              <div className="w-12 h-12 rounded-full flex-none overflow-hidden border-2 border-[#CBD5E1] p-0.5 bg-slate-100 shadow-2xs group-hover:border-[#0F172A] transition-colors">
                <Image 
                  src={item.avatar_url || "/avatars/derek-holbrook.jpg"} 
                  alt={item.client_name}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover rounded-full"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <strong className="block text-[15px] font-bold text-[#0F172A] font-display leading-snug truncate">
                  {item.client_name}
                </strong>
                <span className="text-[12.5px] text-[#64748B] font-medium block leading-tight truncate">
                  {item.client_role}
                </span>
              </div>
            </div>

          </article>
        ))}
      </div>
    </div>
  );
}