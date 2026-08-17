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
  hvac: { Icon: Thermometer, color: '#25D366' },
  plumbing: { Icon: Droplets, color: '#f2a93d' },
  roofing: { Icon: Home, color: '#f2a93d' },
  electrical: { Icon: Zap, color: '#4c9bff' },
  landscaping: { Icon: Leaf, color: '#25D366' },
  other: { Icon: Wrench, color: '#4c9bff' },
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

const TITLE_MAP: [string, string][] = [
  ['hvac', 'hvac'],
  ['ac repair', 'hvac'],
  ['furnace', 'hvac'],
  ['plumb', 'plumbing'],
  ['roof', 'roofing'],
  ['electr', 'electrical'],
  ['landscap', 'landscaping'],
  ['lawn', 'landscaping'],
  ['pest', 'other'],
  ['garage', 'other'],
  ['lock', 'other'],
  ['handyman', 'other'],
];

function getIconDef(s: Service): IconDef {
  const key = (s.icon || '').trim().toLowerCase();
  if (ICON_MAP[key]) return ICON_MAP[key];
  const title = (s.title || '').toLowerCase();
  const match = TITLE_MAP.find(([needle]) => title.includes(needle));
  if (match && ICON_MAP[match[1]]) {
    return { ...ICON_MAP[match[1]], color: s.color || ICON_MAP[match[1]].color };
  }
  return { Icon: Wrench, color: s.color || '#4c9bff' };
}

export function ServiceGrid({ items }: { items?: Service[] }) {
  const reduce = useReducedMotion();
  const services = items && items.length > 0 ? items : DEFAULT_SERVICES;

  return (
    <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-5">
      {services.map((s: Service, i: number) => {
        const { Icon, color } = getIconDef(s);
        return (
          <motion.article
            key={i}
            className={`group p-8 bg-white border border-[#E2E8F0] rounded-[28px] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-5`}
            whileHover={!reduce ? { 
              y: -3,
              borderColor: `${color}88`
            } : {}}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <div
              className="w-12 h-12 rounded-2xl grid place-items-center border shrink-0 transition-all duration-300"
              style={{ 
                backgroundColor: `${color}14`, 
                borderColor: `${color}33`, 
                color 
              }}
            >
              <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[8deg]">
                <Icon size={24} strokeWidth={2.2} />
              </div>
            </div>
            <div>
              {s.tag && (
                <span
                  className="inline-block text-[10px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-full mb-3 border"
                  style={{ color, backgroundColor: `${color}14`, borderColor: `${color}33` }}
                >
                  {s.tag}
                </span>
              )}
              <h3 className="text-[19px] mb-2 font-bold text-[#1E293B] font-display group-hover:text-[#2563EB] transition-colors">
                {s.title}
              </h3>
              <p className="text-[14px] text-[#475569] leading-relaxed">{s.desc}</p>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
