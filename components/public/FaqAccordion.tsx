"use client";

import React from 'react';

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

  return (
    <div className="flex flex-col gap-2.5">
      {items.map((item, idx) => (
        <details key={idx} className="faq-item border border-[var(--line)] rounded-[15px] bg-[rgba(255,255,255,0.02)] px-5 py-1" open={idx === 0}>
          <summary className="cursor-pointer list-none pr-6.5 py-4 relative font-bold text-[15.5px] text-white select-none">
            {item.question}
            <span className="absolute right-0 top-3.5 text-[var(--blue)] text-[22px] font-light leading-none group-open:hidden" aria-hidden="true">+</span>
          </summary>
          <p className="pb-4 text-[var(--ink-dim)] text-[14.5px] max-w-[680px]">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
