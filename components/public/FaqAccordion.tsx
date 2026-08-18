"use client";

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs?: FaqItem[];
}

export function FaqAccordion({ faqs = [] }: FaqAccordionProps) {
  const defaultFaqs: FaqItem[] = [
    { 
      question: "How much ad budget do I need as a local contractor?", 
      answer: "Most of my local service clients spend between $1,500 and $7,500/month on Google Ads. Even with a $1,500/mo budget, a properly structured campaign with tight radius targeting and a 1,200+ negative keyword list can generate high-margin booked jobs within the first 14 days." 
    },
    { 
      question: "How long before my phone starts ringing with booked calls?", 
      answer: "Search Ads start generating phone calls within 7–14 days of launch. Month one is an active learning and calibration phase where we identify winning search terms; by month two and three, your Cost Per Lead typically drops by 30% to 50%." 
    },
    { 
      question: "How is working with you different from a traditional marketing agency?", 
      answer: "You work directly with me — no account managers or junior interns learning on your budget. I specialize exclusively in local service trades, provide custom click-to-call landing pages, and offer transparent month-to-month agreements with zero lock-in." 
    },
    { 
      question: "What tracking and call recording setup is included?", 
      answer: "Every engagement includes complete CallRail setup (Dynamic Number Insertion, whisper tones, call recording) plus GA4 server-side conversion tracking. You will see the exact keyword that produced every customer call." 
    },
    { 
      question: "Do you build the landing pages or do I need a separate web developer?", 
      answer: "I design and build the dedicated high-converting mobile landing pages as part of the service. They are engineered to load in under 1 second (96+ PageSpeed) with prominent click-to-call buttons and trust badges." 
    },
    { 
      question: "What happens during the free 15-minute Google Ads audit?", 
      answer: "I review your search term reports, negative keyword gaps, quality scores, and conversion tracking setup. I will show you exactly where you are leaking budget and provide a clear 3-step action plan to fix it — 100% free with zero sales pressure." 
    }
  ];

  const items = faqs.length > 0 ? faqs : defaultFaqs;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3.5 max-w-4xl mx-auto">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className={`border rounded-2xl bg-white px-6 transition-all duration-300 shadow-xs ${
              isOpen ? 'border-[#0F172A] shadow-sm' : 'border-[#CBD5E1] hover:border-slate-400'
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="cursor-pointer w-full py-5 relative font-bold text-[16px] text-[#0F172A] flex items-center justify-between gap-4 font-display text-left"
              aria-expanded={isOpen}
            >
              <span className="flex-1">{item.question}</span>
              <span className={`w-7 h-7 rounded-xl bg-slate-100 text-[#0F172A] flex items-center justify-center shrink-0 transition-transform duration-300 border border-[#E2E8F0] ${isOpen ? 'rotate-45 bg-[#0F172A] text-white' : ''}`}>
                <Plus size={16} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 text-[#475569] text-[14.5px] leading-relaxed border-t border-[#E2E8F0] pt-4">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
