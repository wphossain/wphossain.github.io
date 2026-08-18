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
  hvac: { Icon: Thermometer, color: '#059669' },
  plumbing: { Icon: Droplets, color: '#0F172A' },
  roofing: { Icon: Home, color: '#2563EB' },
  electrical: { Icon: Zap, color: '#D97706' },
  landscaping: { Icon: Leaf, color: '#059669' },
  other: { Icon: Wrench, color: '#0F172A' },
};

const DEFAULT_SERVICES: Service[] = [
  {
    icon: 'hvac',
    title: 'HVAC & AC Repair',
    tag: 'Emergency & Replacement',
    desc: 'Capture homeowners facing sudden AC failures in heatwaves or furnace breakdowns in winter. Geotargeted campaigns built for immediate dispatch calls.',
  },
  {
    icon: 'plumbing',
    title: 'Plumbing & Drain Cleaning',
    tag: 'High-Intent Search',
    desc: "Dominate 'plumber near me' and emergency water heater leak searches. Dynamic call tracking ensures zero missed leads from emergency callers.",
  },
  {
    icon: 'roofing',
    title: 'Roofing & Storm Damage',
    tag: 'High-Ticket Installs',
    desc: 'Target homeowners in storm-damaged zip codes searching for hail damage roof replacements and insurance claims with high-margin ROI.',
  },
  {
    icon: 'electrical',
    title: 'Licensed Master Electricians',
    tag: 'Commercial & Home',
    desc: 'Generate inquiries for 200A electrical panel upgrades, commercial rewiring, EV charger installs, and urgent emergency power fixes.',
  },
  {
    icon: 'landscaping',
    title: 'Landscaping & Tree Service',
    tag: 'Recurring Contracts',
    desc: 'High-value tree removal, hardscaping design, and recurring commercial lawn maintenance contracts across affluent neighborhoods.',
  },
  {
    icon: 'other',
    title: 'Other Trade Services',
    tag: 'Local Home Services',
    desc: 'Garage door repair, pest control, restoration, and locksmiths — custom Google Search & LSA architectures tailored to your service territory.',
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
  return { Icon: Wrench, color: s.color || '#0F172A' };
}

export function ServiceGrid({ items }: { items?: Service[] }) {
  const reduce = useReducedMotion();
  const services = items && items.length > 0 ? items : DEFAULT_SERVICES;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((s: Service, i: number) => {
        const { Icon, color } = getIconDef(s);
        return (
          <article
            key={i}
            className="group p-7 bg-white border border-[#CBD5E1] rounded-[24px] shadow-xs hover:border-[#0F172A] hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4"
          >
            <div
              className="w-12 h-12 rounded-2xl grid place-items-center border border-[#E2E8F0] bg-slate-50 shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-2xs"
              style={{ color }}
            >
              <Icon size={22} strokeWidth={2.2} />
            </div>

            <div>
              {s.tag && (
                <span
                  className="inline-block text-[10px] font-extrabold tracking-widest uppercase px-2.5 py-0.5 rounded-full mb-2.5 border border-[#E2E8F0] bg-slate-100 text-[#475569]"
                >
                  {s.tag}
                </span>
              )}
              <h3 className="text-[18px] mb-2 font-bold text-[#0F172A] font-display group-hover:text-[#059669] transition-colors leading-snug">
                {s.title}
              </h3>
              <p className="text-[13.5px] text-[#475569] leading-relaxed">{s.desc}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
