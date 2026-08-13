"use client";

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface ServiceGridProps {
  items: any[];
}

export function ServiceGrid({ items }: ServiceGridProps) {
  const reduce = useReducedMotion();

  return (
    <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-5">
      {items.map((s: any, i: number) => (
        <motion.article
          key={i}
          className={`group p-7 bg-[#050f1f]/50 border border-white/5 rounded-[28px] hover:bg-[#050f1f] transition-all duration-200 flex flex-col gap-5 ${
            reduce ? 'hover:border-[#1a73e8]/40' : 'hover:border-[#1a73e8]/40 hover:-translate-y-1'
          }`}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-12 h-12 rounded-2xl bg-[#1a73e8]/10 border border-[#1a73e8]/20 grid place-items-center text-[#4c9bff] group-hover:scale-110 transition-transform">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={s.icon} />
            </svg>
          </div>
          <div>
            {s.tag && (
              <span className="inline-block text-[10px] font-extrabold tracking-widest uppercase text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/20 px-2.5 py-1 rounded-full mb-3">
                {s.tag}
              </span>
            )}
            <h3 className="text-[19px] mb-2 font-bold text-white font-display group-hover:text-[#4c9bff] transition-colors">
              {s.title}
            </h3>
            <p className="text-[14px] text-[#aebcda] leading-relaxed">{s.desc}</p>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
