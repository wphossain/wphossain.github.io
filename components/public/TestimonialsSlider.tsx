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
    client_name: "Mike Harrison",
    client_role: "Emergency Plumbing Co. · Houston, TX",
    quote: "I was burning $2,500/month on Google Ads with barely any calls coming in. WP Hossain rebuilt everything with negative keyword fortresses. In 30 days my cost per lead dropped from $165 to $32. My dispatch phone rings non-stop now.",
    rating: 5,
    avatar_url: "/avatars/mike-harrison.jpg"
  },
  {
    client_name: "Tony Russo",
    client_role: "HVAC & AC Solutions · Miami, FL",
    quote: "Every big HVAC company in South Florida was outbidding us on generic terms. Hossain flipped our strategy with emergency intent clusters and high-speed click-to-call pages. We went from 8 leads/month to 60+ booked service calls.",
    rating: 5,
    avatar_url: "/avatars/tony-russo.jpg"
  },
  {
    client_name: "Jake Patterson",
    client_role: "Master Electrician Services · Dallas, TX",
    quote: "Before working with WP Hossain, most of our ad budget was burned by DIYers searching how to wire breaker boxes. He blocked over 1,400 negative terms and wired up CallRail. Now we get high-ticket 200A panel upgrades every week.",
    rating: 5,
    avatar_url: "/avatars/jake-patterson.jpg"
  },
  {
    client_name: "Carlos Mendez",
    client_role: "Premier Roofing & Storm Repair · Phoenix, AZ",
    quote: "Roof replacement is insanely competitive online. Hossain knew exactly how to capture homeowners right after storms and filter out cheap patch jobs. Our ROAS jumped to 5.4x within two months. Best marketing decision we made.",
    rating: 5,
    avatar_url: "/avatars/carlos-mendez.jpg"
  }
];

export function TestimonialsSlider({ testimonials }: { testimonials?: any }) {
  const items = TESTIMONIALS_LIST;

  return (
    <div className="w-full">
      {/* 2x2 Grid of Testimonial Cards (Matching Reference Screenshot in Crisp Light Theme) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {items.map((item, idx) => (
          <article 
            key={idx} 
            className="bg-white border border-[#CBD5E1] rounded-[24px] p-7 sm:p-8 shadow-xs hover:border-[#0F172A] hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
          >
            {/* Top: 5 Golden Stars */}
            <div>
              <div className="flex items-center gap-1 text-[#F59E0B] mb-5">
                {[...Array(item.rating)].map((_, i) => (
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
                  src={item.avatar_url} 
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