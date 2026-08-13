"use client";

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Thermometer, Droplets, Home, Zap, Leaf, Wrench, type LucideIcon } from 'lucide-react';

export interface Service {
  icon?: string;
  title?: string;
  desc?: string;
  tag?: string;
  color?: string;
}

type IconDef = { Icon: LucideIcon; color: string };

const ICON_MAP: Record<string, IconDef> = {
  hvac: { Icon: Thermometer, color: '#4c9bff' },
  plumbing: { Icon: Droplets, color: '#4c9bff' },
  roofing: { Icon: Home, color: '#f2a93d' },
  electrical: { Icon: Zap, color: '#f2a93d' },
  landscaping: { Icon: Leaf, color: '#25D366' },
  other: { Icon: Wrench, color: '#f2a93d' },
};

const DEFAULT_SERVICES: Service[] = [
  {
    icon: 'hvac',
    title: 'HVAC',
    tag: 'Heating & Cooling',
    desc: '24/7 emergency repair searches, seasonal campaigns, and local radius targeting that fills your schedule year-round.',
  },
  {
    icon: 'plumbing',
    title: 'Plumbing',
    tag: 'Plumbing',
    desc: "Dominate 'plumber near me' searches with tight local targeting and call-tracked campaigns built for booked jobs, not just clicks.",
  },
  {
    icon: 'roofing',
    title: 'Roofing',
    tag: 'Roofing',
    desc: 'Capture homeowners actively searching for roof repair, storm damage, and reroofing — filtered for high-intent buyers only.',
  },
  {
    icon: 'electrical',
    title: 'Electrical Services',
    tag: 'Electrical',
    desc: 'Target emergency electrical searches and panel upgrade leads with campaigns tuned for licensed, high-ticket electrical work.',
  },
  {
    icon: 'landscaping',
    title: 'Landscaping & Lawn Care',
    tag: 'Landscaping',
    desc: 'Recurring-client campaigns for lawn care, landscaping design, and seasonal cleanup — built to keep your crew booked week after week.',
  },
  {
    icon: 'other',
    title: 'Other Home Services',
    tag: 'Home Services',
    desc: 'Pest control, garage doors, locksmith, handyman — any local service business can dominate Google Search with the right strategy and campaign structure.',
  },
];

function getIconDef(key?: string): IconDef {
  return ICON_MAP[key || ''] || { Icon: Wrench, color: '#4c9bff' };
}

export function ServiceGrid({ items }: { items?: Service[] }) {
  const reduce = useReducedMotion();
  const services = items && items.length > 0 ? items : DEFAULT_SERVICES;

  return (
    <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-5">
      {services.map((s: Service, i: number) => {
        const { Icon, color } = getIconDef(s.icon);
        return (
          <motion.article
            key={i}
            className={`group p-7 bg-[#050f1f]/50 border border-white/5 rounded-[28px] hover:bg-[#050f1f] transition-all duration-200 flex flex-col gap-5 ${
              reduce ? 'hover:border-white/20' : 'hover:border-[#1a73e8]/40 hover:-translate-y-1'
            }`}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="w-12 h-12 rounded-2xl grid place-items-center group-hover:scale-110 transition-transform border"
              style={{ backgroundColor: `${color}1a`, borderColor: `${color}33`, color }}
            >
              <Icon size={24} strokeWidth={2} />
            </div>
            <div>
              {s.tag && (
                <span
                  className="inline-block text-[10px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-full mb-3 border"
                  style={{ color, backgroundColor: `${color}1a`, borderColor: `${color}33` }}
                >
                  {s.tag}
                </span>
              )}
              <h3 className="text-[19px] mb-2 font-bold text-white font-display group-hover:text-[#4c9bff] transition-colors">
                {s.title}
              </h3>
              <p className="text-[14px] text-[#aebcda] leading-relaxed">{s.desc}</p>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
