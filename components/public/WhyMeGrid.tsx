"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { 
  Target, 
  BarChart, 
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
    color: "#ef4444"
  },
  {
    title: "Tracking that reports the truth",
    icon: "bar-chart",
    desc: "Calls, forms, and chat unified in GTM and GA4 — one accurate lead count, not guesswork.",
    color: "#25D366"
  },
  {
    title: "Landing page background",
    icon: "layout",
    desc: "I build the page the click lands on too, not just the campaign that sends it there.",
    color: "#1a73e8"
  },
  {
    title: "Search-term discipline",
    icon: "search",
    desc: "Weekly search-term audits cut wasted spend before it eats into your budget.",
    color: "#06b6d4"
  },
  {
    title: "Reporting you can read",
    icon: "file-text",
    desc: "Monthly reports in plain language — spend, calls, and cost per booked job.",
    color: "#f2a93d"
  },
  {
    title: "No lock-in",
    icon: "unlock",
    desc: "Month-to-month. If results stop, you're free to walk — no long contracts.",
    color: "#10b981"
  }
];

const ICON_MAP: Record<string, LucideIcon> = {
  target: Target,
  "bar-chart": BarChart,
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
  const activeCards = cards && cards.length > 0 ? cards : DEFAULT_WHY_CARDS;
  const activeTitle = title || "A specialist who also understands the page the click lands on.";
  const activeSubtitle = subtitle || "I don't just run ads. I build systems that turn clicks into customers and keep them coming back long-term.";

  return (
    <div className="w-full">
      {/* LEFT-ALIGNED HEADER */}
      <div className="flex flex-col items-start max-w-[720px] mb-12 text-left">
        {/* Eyebrow badge matching existing style */}
        <span className="eyebrow inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1a73e8]/10 border border-[#1a73e8]/30 text-[#4c9bff] text-[11px] font-extrabold uppercase tracking-widest mb-5 shadow-[0_0_15px_rgba(26,115,232,0.15)]">
          <span className="w-2 h-2 rounded-full bg-[#1a73e8] animate-pulse" />
          {eyebrow}
        </span>
        
        {/* Main Headline */}
        <h2 className="text-[clamp(28px,4vw,42px)] font-display leading-[1.15] mb-4 text-white font-bold">
          {activeTitle}
        </h2>

        {/* Thin Animated Underline/Accent Bar */}
        <div className="relative w-full h-[3px] rounded-full overflow-hidden bg-white/5 mb-6">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#1a73e8] via-[#25D366] to-transparent"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>

        {/* Subheadline */}
        {activeSubtitle && (
          <p className="text-[#aebcda] text-[16px] lg:text-[17px] leading-relaxed max-w-[640px]">
            {activeSubtitle}
          </p>
        )}
      </div>

      {/* 3 COLUMNS DESKTOP / 1 COLUMN MOBILE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {activeCards.map((card, i) => {
          const IconComponent = getIconComponent(card.icon);
          const accentColor = card.color || "#1a73e8";

          return (
            <motion.article
              key={i}
              className="group p-8 bg-[#0a1c34]/50 border border-white/5 rounded-[28px] flex flex-col gap-5 hover:bg-[#0a1c34] transition-colors duration-300"
              whileHover={!reduce ? { 
                y: -3,
                borderColor: `${accentColor}66`
              } : undefined}
              initial={!reduce ? { opacity: 0, y: 16 } : { opacity: 1 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              {/* Rounded-Square Icon Container with subtle accent-tinted background */}
              <div
                className="w-12 h-12 rounded-2xl grid place-items-center border shrink-0 transition-all duration-300"
                style={{ 
                  backgroundColor: `${accentColor}1a`, 
                  borderColor: `${accentColor}25`, 
                  color: accentColor 
                }}
              >
                <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[8deg]">
                  <IconComponent size={24} strokeWidth={2.2} />
                </div>
              </div>

              {/* Card Title & Desc */}
              <div>
                <h3 className="text-[18px] lg:text-[19px] font-bold text-white mb-2 font-display group-hover:text-white transition-colors leading-snug">
                  {card.title}
                </h3>
                <p className="text-[14px] text-[#aebcda] leading-relaxed">
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