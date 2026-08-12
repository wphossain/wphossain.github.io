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
  const defaultFaqs = [
    { question: "How much ad budget do I need?", answer: "It depends on your service area and competition. For most local HVAC businesses, the better starting question isn't budget size — it's whether that budget is being spent efficiently and tracked correctly." },
    { question: "How long before I see results?", answer: "Some improvements show up quickly after campaign cleanup and tracking fixes, especially if the account already has demand. Bigger gains build over time as search-term quality and targeting improve." },
    { question: "Which industries do you work with?", answer: "HVAC is the primary focus. I also work with plumbing, roofing, and electrical contractors, plus cleaning, landscaping, pest control, and garage door companies where the same call-focused approach applies." },
    { question: "What tracking will I actually get?", answer: "GTM, GA4, and conversion tracking are core to every engagement — calls, form fills, and booking clicks are tracked so you can see exactly what's producing service calls." },
    { question: "Do you require long-term contracts?", answer: "No lock-in is required. The audit and early setup work are designed to show value quickly, so continuing makes sense on its own merits." },
    { question: "Can Google Ads handle seasonal HVAC demand?", answer: "Yes. Cooling demand, heating demand, and emergency search behavior shift throughout the year, and campaign structure and messaging should shift with them." }
  ];

  const items = faqs.length > 0 ? faqs : defaultFaqs;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className={`group faq-item border rounded-2xl bg-[#050f1f]/40 px-6 transition-all duration-300 hover:border-white/10 hover:bg-[#050f1f]/60 ${
              isOpen ? 'border-white/20' : 'border-white/5'
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="cursor-pointer w-full py-5 relative font-bold text-[16px] text-white flex items-center justify-between gap-4"
              aria-expanded={isOpen}
            >
              <span className="flex-1 text-left">{item.question}</span>
              <span className={`w-6 h-6 rounded-lg bg-[#1a73e8]/10 text-[#1a73e8] flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                <Plus size={16} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 text-[#aebcda] text-[14.5px] leading-relaxed max-w-3xl border-t border-white/5 pt-4 mt-1">
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
