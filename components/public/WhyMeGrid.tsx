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
    title: "100% Local Contractor Focus",
    icon: "target",
    desc: "Exclusively HVAC, plumbing, roofing, and home services. I know your exact negative keywords, seasonal peaks, and high-ticket job economics.",
    color: "#059669"
  },
  {
    title: "Call-Level Verified Attribution",
    icon: "bar-chart",
    desc: "Calls, forms, and chat unified via CallRail & GA4. Every dollar spent is tied directly to a real homeowner call, not vanity clicks.",
    color: "#0F172A"
  },
  {
    title: "Full-Funnel Landing Pages Included",
    icon: "layout",
    desc: "I build the high-converting mobile click-to-call pages that convert your clicks into booked jobs. No extra web developer fees.",
    color: "#2563EB"
  },
  {
    title: "Weekly Negative Keyword Fortresses",
    icon: "search",
    desc: "Continuous pruning of search term reports to block DIYers, job hunters, and low-margin searches before they eat into your budget.",
    color: "#059669"
  },
  {
    title: "Plain-English Executive Reports",
    icon: "file-text",
    desc: "Monthly reports in plain numbers: Ad spend, booked calls, and Cost Per Lead. No 40-page confusing PDFs.",
    color: "#0F172A"
  },
  {
    title: "Zero Long-Term Lock-in",
    icon: "unlock",
    desc: "Month-to-month partnership. I earn your business every 30 days based on booked calls, not a 12-month hostage contract.",
    color: "#059669"
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
  eyebrow = "WHY SPECIALISTS WIN", 
  cards 
}: WhyMeGridProps) {
  const reduce = useReducedMotion();
  const activeCards = (cards && cards.length > 0) ? cards : DEFAULT_WHY_CARDS;
  const activeTitle = title || "Why Working With a Dedicated Specialist Beats Big Agencies";
  const activeSubtitle = subtitle || "You get direct access to a seasoned PPC partner who understands contractor operations, margins, and lead dispatch.";

  return (
    <div className="w-full">
      {/* HEADER AREA */}
      <div className="flex flex-col items-start max-w-[760px] mb-12 text-left">
        <span className="eyebrow mb-4">
          {eyebrow}
        </span>
        
        <h2 className="text-[clamp(28px,4vw,42px)] font-display leading-[1.15] mb-4 text-[#0F172A] font-bold">
          {activeTitle}
        </h2>

        {activeSubtitle && (
          <p className="text-[#475569] text-[16px] lg:text-[17px] leading-relaxed max-w-[660px]">
            {activeSubtitle}
          </p>
        )}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeCards.map((card, i) => {
          const IconComponent = getIconComponent(card.icon);
          const accentColor = card.color || "#0F172A";

          return (
            <article
              key={i}
              className="group p-7 bg-white border border-[#CBD5E1] shadow-xs rounded-[24px] flex flex-col gap-4 hover:border-[#0F172A] hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              {/* Icon Container */}
              <div
                className="w-12 h-12 rounded-2xl grid place-items-center border border-[#E2E8F0] bg-slate-50 shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-2xs"
                style={{ color: accentColor }}
              >
                <IconComponent size={22} strokeWidth={2.2} />
              </div>

              <div>
                <h3 className="text-[18px] font-bold text-[#0F172A] mb-2 font-display leading-snug group-hover:text-[#059669] transition-colors">
                  {card.title}
                </h3>
                <p className="text-[14px] text-[#475569] leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}