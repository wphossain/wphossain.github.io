"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { 
  Target, 
  BarChart3, 
  Layout, 
  Search, 
  FileText, 
  Unlock, 
  Zap, 
  Cpu, 
  Globe,
  type LucideIcon 
} from "lucide-react";

export interface WhyCard {
  title: string;
  desc: string;
  icon: string;
  color?: string;
}

interface WhyMeGridProps {
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  cards?: WhyCard[];
}

const DEFAULT_WHY_CARDS: WhyCard[] = [
  {
    title: "HVAC-first focus",
    icon: "target",
    desc: "Only local service businesses — so keywords and ad copy stay specific, not generic.",
    color: "#dc2626"
  },
  {
    title: "Tracking that reports the truth",
    icon: "bar-chart",
    desc: "Calls, forms, and chat unified in GTM and GA4 — one accurate lead count, not guesswork.",
    color: "#15803D"
  },
  {
    title: "Landing page background",
    icon: "layout",
    desc: "I build the page the click lands on too, not just the campaign that sends it there.",
    color: "#2563EB"
  },
  {
    title: "Search-term discipline",
    icon: "search",
    desc: "Weekly search-term audits cut wasted spend before it eats into your budget.",
    color: "#0891b2"
  },
  {
    title: "Reporting you can read",
    icon: "file-text",
    desc: "Monthly reports in plain language — spend, calls, and cost per booked job.",
    color: "#B45309"
  },
  {
    title: "No lock-in",
    icon: "unlock",
    desc: "Month-to-month. If results stop, you're free to walk — no long contracts.",
    color: "#15803D"
  }
];

const ICON_MAP: Record<string, LucideIcon> = {
  target: Target,
  "bar-chart": BarChart3,
  layout: Layout,
  search: Search,
  "file-text": FileText,
  unlock: Unlock,
  lightning: Zap,
  robot: Cpu,
  globe: Globe
};

function getIconComponent(iconName: string): LucideIcon {
  const normalized = (iconName || "").trim().toLowerCase();
  return ICON_MAP[normalized] || Target;
}

export function WhyMeGrid({ 
  title, 
  subtitle, 
  eyebrow = "WHY CHOOSE ME", 
  cards 
}: WhyMeGridProps) {
  const reduce = useReducedMotion();
  const activeCards = (cards && cards.length > 0) ? cards : DEFAULT_WHY_CARDS;
  const activeTitle = title || "A specialist who also understands the page the click lands on.";
  const activeSubtitle = subtitle || "I don't just run ads. I build systems that turn clicks into customers and keep them coming back long-term.";

  return (
    <div className="w-full">
      {/* HEADER AREA */}
      <div className="flex flex-col items-start max-w-[720px] mb-12 text-left">
        <span className="eyebrow inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/25 text-[#2563EB] text-[11px] font-extrabold uppercase tracking-widest mb-5 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
          {eyebrow}
        </span>
        
        <h2 className="text-[clamp(28px,4vw,42px)] font-display leading-[1.15] mb-4 text-[#1E293B] font-bold">
          {activeTitle}
        </h2>

        {/* Animated Accent Bar */}
        <div className="relative w-full h-[3px] rounded-full overflow-hidden bg-slate-200 mb-6">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#2563EB] via-[#25D366] to-transparent"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>

        {activeSubtitle && (
          <p className="text-[#475569] text-[16px] lg:text-[17px] leading-relaxed max-w-[640px]">
            {activeSubtitle}
          </p>
        )}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {activeCards.map((card, i) => {
          const IconComponent = getIconComponent(card.icon);
          const accentColor = card.color || "#2563EB";

          return (
            <motion.article
              key={i}
              className="group p-8 bg-white border border-[#E2E8F0] shadow-sm rounded-[28px] flex flex-col gap-5 hover:shadow-md transition-all duration-300"
              whileHover={!reduce ? { 
                y: -3,
                borderColor: `${accentColor}88`
              } : {}}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              {/* Icon Container */}
              <div
                className="w-12 h-12 rounded-2xl grid place-items-center border shrink-0 transition-all duration-300"
                style={{ 
                  backgroundColor: `${accentColor}14`, 
                  borderColor: `${accentColor}33`, 
                  color: accentColor 
                }}
              >
                <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[8deg]">
                  <IconComponent size={24} strokeWidth={2.2} />
                </div>
              </div>

              <div>
                <h3 className="text-[18px] lg:text-[19px] font-bold text-[#1E293B] mb-2 font-display group-hover:text-[#2563EB] transition-colors leading-snug">
                  {card.title}
                </h3>
                <p className="text-[14px] text-[#475569] leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}