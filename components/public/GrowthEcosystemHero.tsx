"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode, type SVGProps, type CSSProperties } from "react";

/* ============================================================
   ICONS
   ============================================================ */

function GoogleAdsIcon({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-label="Google Ads" role="img">
      <rect x="10.5" y="2" width="10" height="30" rx="5" fill="#4285F4" transform="rotate(30 20 20)" />
      <path d="M27.5 14 L36 29 a5.4 5.4 0 0 1 -4.68 8.1 a5.4 5.4 0 0 1 -4.67-2.7L18.5 20.4Z" fill="#34A853" />
      <circle cx="9.4" cy="31.5" r="5.4" fill="#FBBC04" />
    </svg>
  );
}

function PhoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1.1.5 1.1 1.1V20c0 .6-.5 1.1-1.1 1.1C10.6 21.1 2.9 13.4 2.9 3.1 2.9 2.5 3.4 2 4 2h3.3c.6 0 1.1.5 1.1 1.1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1L6.6 10.8z" />
    </svg>
  );
}

function PhoneHangUpIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 9c-2.6 0-5.1.5-7.4 1.4a1.4 1.4 0 0 0-.9 1.4l.2 2.6c.1.7.6 1.2 1.3 1.3.8.1 1.6.1 2.3-.1.5-.1.9-.6.9-1.1v-1.6c1-.2 2.1-.4 3.6-.4s2.6.2 3.6.4v1.6c0 .5.4 1 .9 1.1.7.2 1.5.2 2.3.1.7-.1 1.2-.6 1.3-1.3l.2-2.6c0-.6-.3-1.2-.9-1.4A17.9 17.9 0 0 0 12 9z" />
    </svg>
  );
}

function CheckCircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="10" fill="#10B981" />
      <path d="M7.5 12.5l3 3 6-6.5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="#F59E0B" {...props}>
      <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6z" />
    </svg>
  );
}

/* ============================================================
   ANIMATION HELPERS
   ============================================================ */

/** Count-up number that animates on load */
function CountUp({
  to,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 1500,
  className,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let frameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setVal(ease * to);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(step);
      }
    };

    frameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frameId);
  }, [to, duration]);

  const formatted = prefix + val.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + suffix;
  return <span className={className}>{formatted}</span>;
}

/** Pulsing "live" radar blip */
function LiveDot({ color = "bg-emerald-500", className = "" }: { color?: string; className?: string }) {
  return (
    <span className={"relative inline-flex h-2.5 w-2.5 " + className}>
      <span className={"animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 " + color} />
      <span className={"relative inline-flex h-2.5 w-2.5 rounded-full " + color} />
    </span>
  );
}

function Dot({ color = "bg-emerald-500", className = "" }: { color?: string; className?: string }) {
  return <span className={"inline-flex h-1.5 w-1.5 shrink-0 rounded-full " + color + " " + className} />;
}

const SLOT_CLASS = "flex flex-1 basis-0 min-w-0";
const GAP_CLASS = "w-6 shrink-0 xl:w-8";

function MetricCard({
  label,
  countTo,
  suffix,
  decimals,
}: {
  label: string;
  countTo: number;
  suffix?: string;
  decimals?: number;
}) {
  return (
    <div className="min-w-0 flex-1 rounded-lg border border-[#CBD5E1] bg-slate-50 px-2 py-1.5 shadow-2xs">
      <p className="truncate text-[9.5px] font-bold text-[#64748B] uppercase tracking-wider">{label}</p>
      <p className="text-[13px] font-bold text-[#0F172A] leading-tight font-display">
        <CountUp to={countTo} suffix={suffix} decimals={decimals} />
      </p>
    </div>
  );
}

function StatusRow({ label, icon }: { label: string; icon?: ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#475569]">
      {icon ?? <Dot />}
      <span className="truncate">{label}</span>
    </div>
  );
}

function WorkflowCard({
  step,
  title,
  subtitle,
  children,
}: {
  step: number;
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="group relative flex w-[176px] shrink-0 flex-col gap-3 rounded-2xl border border-[#CBD5E1] bg-white p-3.5 shadow-xs transition-all duration-300 hover:border-[#0F172A] hover:shadow-lg hover:-translate-y-1 sm:w-[188px] lg:w-auto lg:min-w-0 lg:flex-1 lg:basis-0">
      <div className="flex items-start gap-2">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0F172A] text-[11px] font-bold text-white shadow-2xs group-hover:bg-[#059669] transition-colors">
          {step}
        </span>
        <div className="min-w-0 min-h-[38px]">
          <p className="text-[13px] font-bold leading-[1.15] text-[#0F172A] font-display">{title}</p>
          {subtitle && <p className="text-[10.5px] font-semibold leading-tight text-[#059669]">{subtitle}</p>}
        </div>
      </div>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

/* Connector between cards with continuous animated traveling pulse dot */
function Connector({ orientation = "horizontal" }: { orientation?: "horizontal" | "vertical" }) {
  const isH = orientation === "horizontal";
  return (
    <div
      className={isH ? `hidden lg:flex items-center justify-center ${GAP_CLASS}` : "flex lg:hidden items-center justify-center h-7 w-full"}
      aria-hidden="true"
    >
      <svg width={isH ? 36 : 16} height={isH ? 16 : 36} viewBox={isH ? "0 0 36 16" : "0 0 16 36"} fill="none" className="overflow-visible">
        {isH ? (
          <>
            <path
              d="M2 8 H28 M28 8 L22 3 M28 8 L22 13"
              stroke="#0F172A"
              strokeOpacity="0.35"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Animated Packet */}
            <circle
              r="3.5"
              fill="#059669"
              className="animate-flow-h"
              style={{
                filter: "drop-shadow(0 0 5px #059669)",
                animation: "flow-h 2.2s infinite ease-in-out"
              }}
              cx="2"
              cy="8"
            />
          </>
        ) : (
          <>
            <path
              d="M8 2 V28 M8 28 L3 22 M8 28 L13 22"
              stroke="#0F172A"
              strokeOpacity="0.35"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              r="3.5"
              fill="#059669"
              style={{
                filter: "drop-shadow(0 0 5px #059669)",
                animation: "pulse 1.8s infinite"
              }}
              cx="8"
              cy="15"
            />
          </>
        )}
      </svg>
    </div>
  );
}

/* Bottom bracket layout coordinates */
const BR = {
  lCard: "7%",
  rCard: "93%",
  cCard: "58.6%",
  lEdge: "25%",
  rEdge: "75%",
  GAP: 36,
} as const;

function BracketLine({ style }: { style: CSSProperties }) {
  return <span className="absolute bg-slate-300" style={style} aria-hidden="true" />;
}

function ArrowSide({ left, dir }: { left: string; dir: "right" | "left" }) {
  const tip =
    dir === "right"
      ? "-translate-x-full border-l-[7px] border-l-[#0F172A]"
      : "border-r-[7px] border-r-[#0F172A]";
  return (
    <span
      className={`absolute h-0 w-0 -translate-y-1/2 border-b-[5px] border-t-[5px] border-b-transparent border-t-transparent ${tip}`}
      style={{ left, top: "50%" }}
      aria-hidden="true"
    />
  );
}

function ArrowDown({ left }: { left: string }) {
  return (
    <span
      className="absolute h-0 w-0 -translate-x-1/2 border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#0F172A]"
      style={{ left, top: -6 }}
      aria-hidden="true"
    />
  );
}

function BottomConnectors() {
  const dropH = `calc(50% + ${BR.GAP}px)`;
  const top = -BR.GAP;
  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
      <BracketLine style={{ left: BR.lCard, top, width: "1.5px", height: dropH, transform: "translateX(-50%)" }} />
      <BracketLine
        style={{ left: BR.lCard, top: "50%", height: "1.5px", width: `calc(${BR.lEdge} - ${BR.lCard})`, transform: "translateY(-50%)" }}
      />
      <ArrowSide left={BR.lEdge} dir="right" />

      <BracketLine style={{ left: BR.rCard, top, width: "1.5px", height: dropH, transform: "translateX(-50%)" }} />
      <BracketLine
        style={{ left: BR.rEdge, top: "50%", height: "1.5px", width: `calc(${BR.rCard} - ${BR.rEdge})`, transform: "translateY(-50%)" }}
      />
      <ArrowSide left={BR.rEdge} dir="left" />

      <BracketLine style={{ left: BR.cCard, top, width: "1.5px", height: BR.GAP, transform: "translateX(-50%)" }} />
      <ArrowDown left={BR.cCard} />

      {/* Continuously Pulsing Energy Node */}
      <span 
        className="absolute h-2.5 w-2.5 rounded-full bg-[#059669] shadow-[0_0_8px_#059669] animate-ping"
        style={{ left: BR.cCard, top: -3, transform: 'translateX(-50%)' }}
      />
    </div>
  );
}

function TopRail() {
  const nodes: ReactNode[] = [];
  STEPS.forEach((s, i) => {
    nodes.push(
      <div key={s.step} className={`${SLOT_CLASS} flex-col items-center`}>
        <span className="relative z-10 h-2 w-2 shrink-0 rounded-full border-2 border-[#0F172A] bg-white" />
        <span className="w-[1.5px] flex-1 bg-gradient-to-b from-slate-400 to-slate-200" />
      </div>
    );
    if (i < STEPS.length - 1) {
      nodes.push(<div key={`sp-${i}`} className={GAP_CLASS} />);
    }
  });

  return (
    <div className="relative hidden h-5 w-full lg:flex lg:flex-nowrap lg:items-stretch lg:justify-between mb-1" aria-hidden="true">
      <div className="absolute top-[4px] h-[1.5px] -translate-y-1/2 bg-slate-300" style={{ left: BR.lCard, right: BR.lCard }} />
      {/* Traveling Energy Packet across Top Rail */}
      <span
        className="absolute top-[4px] h-3 w-3 -translate-y-1/2 rounded-full bg-[#059669] shadow-[0_0_8px_2px_rgba(5,150,105,0.9)] animate-flow-rail"
      />
      {nodes}
    </div>
  );
}

/* ============================================================
   STEP CONTENTS
   ============================================================ */

function GoogleAdsCampaignsStep() {
  return (
    <>
      <div className="flex justify-center py-0.5">
        <GoogleAdsIcon className="h-9 w-9" />
      </div>
      <div className="flex items-center justify-between gap-1 rounded-lg border border-[#CBD5E1] bg-slate-50 px-2 py-1">
        <p className="min-w-0 truncate text-[10.5px] font-semibold text-[#0F172A]">Search Ads</p>
        <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-[#059669]">
          <LiveDot color="bg-[#059669]" />
          Active
        </span>
      </div>
      <div className="flex gap-1.5">
        <MetricCard label="Impressions" countTo={248} suffix="K" />
        <MetricCard label="Clicks" countTo={12.4} suffix="K" decimals={1} />
      </div>
      <div className="rounded-lg border border-[#CBD5E1] bg-slate-50 px-2 py-1.5">
        <div className="flex items-center justify-between">
          <p className="text-[9.5px] font-bold uppercase tracking-wider text-[#64748B]">CTR</p>
          <span className="text-[10px] font-bold text-[#059669]">▲ 32.5%</span>
        </div>
        <p className="text-[13px] font-bold leading-tight text-[#0F172A] font-display">
          <CountUp to={8.57} suffix="%" decimals={2} />
        </p>
        <svg viewBox="0 0 120 40" className="mt-1 h-9 w-full" preserveAspectRatio="none">
          <polyline
            points="0,34 15,30 30,32 45,25 60,27 75,19 90,21 105,13 120,15"
            fill="none"
            stroke="#94A3B8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.6"
          />
          <polyline
            points="0,28 15,23 30,25 45,15 60,18 75,9 90,11 105,3 120,5"
            fill="none"
            stroke="#059669"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </>
  );
}

function LandingPageStep() {
  return (
    <>
      <div className="relative h-[92px] w-full overflow-hidden rounded-lg border border-[#CBD5E1] bg-slate-100">
        <Image src="/landing-page.png" alt="HVAC landing page preview" fill sizes="188px" className="object-cover object-top" />
      </div>
      <div className="flex flex-col items-center gap-1 rounded-lg border border-[#CBD5E1] bg-slate-50 px-2 py-2">
        <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#64748B]">PageSpeed Score</span>
        <ScoreDonut value={96} />
      </div>
      <div className="flex flex-col gap-1">
        <StatusRow label="Mobile Tap-to-Call" />
        <StatusRow label="0.8s Load Time" />
        <StatusRow label="Trust Badges" />
      </div>
    </>
  );
}

function ScoreDonut({ value }: { value: number }) {
  const R = 26;
  const C = 2 * Math.PI * R;
  const target = C * (1 - value / 100);
  return (
    <div className="relative h-[60px] w-[60px]">
      <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
        <circle cx="32" cy="32" r={R} fill="none" stroke="#E2E8F0" strokeWidth="5" />
        <circle
          cx="32"
          cy="32"
          r={R}
          fill="none"
          stroke="#059669"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={target}
          style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        <span className="text-[16px] font-bold text-[#059669] font-display">
          <CountUp to={value} />
        </span>
        <span className="text-[8px] font-bold text-[#64748B]">/100</span>
      </div>
    </div>
  );
}

function PhoneCallsStep() {
  return (
    <>
      <div className="rounded-lg border border-[#CBD5E1] bg-slate-50 px-2 py-1.5">
        <p className="text-[9px] font-bold uppercase tracking-wider text-[#64748B]">Incoming Call</p>
        <p className="text-[12.5px] font-bold text-[#0F172A] font-display">(214) 555-0187</p>
        <p className="text-[10px] text-[#059669] font-semibold">Dallas, TX · AC Failure</p>
      </div>
      <div className="flex items-center justify-center gap-3 py-1">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-white shadow-xs">
          <PhoneHangUpIcon className="h-4 w-4" />
        </span>
        <span className="relative flex h-8 w-8 items-center justify-center">
          <span className="animate-ping absolute inset-0 rounded-full bg-emerald-500/40 opacity-80" />
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xs animate-ring-shake">
            <PhoneIcon className="h-4 w-4" />
          </span>
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[10.5px] font-bold text-[#0F172A]">CallRail Attribution</p>
        <StatusRow label="Keyword Recorded" />
        <StatusRow label="Dynamic Swap" />
        <StatusRow label="Whisper Tone" />
      </div>
    </>
  );
}

function CrmStep() {
  const fields: Array<[string, string]> = [
    ["Homeowner", "David Miller"],
    ["Phone", "(214) 555-0187"],
    ["Job Type", "Emergency AC Install"],
    ["Source", "Google Search Ads"],
  ];
  return (
    <>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-[#0F172A]">New Lead Alert!</span>
        <span className="rounded-full border border-rose-200 bg-rose-50 px-2 py-0.5 text-[9px] font-extrabold text-rose-600 uppercase animate-pulse">
          High Intent
        </span>
      </div>
      <div className="flex flex-col gap-1 rounded-lg border border-[#CBD5E1] bg-slate-50 px-2 py-1.5">
        {fields.map(([label, value]) => (
          <div key={label} className="flex flex-col leading-tight">
            <span className="text-[8.5px] font-bold uppercase tracking-wider text-[#64748B]">{label}</span>
            <span className="truncate text-[10.5px] font-semibold text-[#0F172A]">{value}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 py-1">
        <CheckCircleIcon className="h-3.5 w-3.5" />
        <span className="text-[10px] font-bold text-[#059669]">Instant SMS Dispatched</span>
      </div>
    </>
  );
}

function TechnicianStep() {
  return (
    <>
      <span className="flex items-center gap-1 text-[10.5px] font-bold text-[#059669]">
        <CheckCircleIcon className="h-3.5 w-3.5" />
        Tech Dispatched
      </span>
      <div className="relative h-[78px] w-full overflow-hidden rounded-lg border border-[#CBD5E1] bg-slate-100">
        <Image src="/technician.png" alt="Dispatched HVAC technician" fill sizes="188px" className="object-cover object-top" />
      </div>
      <p className="text-[10.5px] text-[#475569] font-medium">
        On Route · ETA <span className="font-bold text-[#0F172A]">22 mins</span>
      </p>
      <div className="rounded-lg border border-[#CBD5E1] bg-slate-50 p-1.5 flex items-center justify-between">
        <span className="text-[9.5px] font-bold uppercase text-[#64748B]">Truck Stock</span>
        <span className="text-[10px] font-bold text-[#059669]">100% Ready</span>
      </div>
    </>
  );
}

function CustomerStep() {
  return (
    <>
      <div className="flex items-center gap-1 text-[10.5px] font-bold text-[#059669]">
        <CheckCircleIcon className="h-3.5 w-3.5" />
        Job Completed
      </div>
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="animate-pulse" style={{ animationDelay: `${i * 200}ms` }}>
            <StarIcon className="h-3.5 w-3.5" />
          </span>
        ))}
      </div>
      <p className="text-[10.5px] italic leading-snug text-[#334155]">&ldquo;They arrived in 25 mins and had our AC cooling again. Lifesaver!&rdquo;</p>
      <p className="text-[9.5px] font-bold text-[#64748B]">— Michael T. (Verified Homeowner)</p>
      <div className="relative h-[72px] w-full overflow-hidden rounded-lg border border-[#CBD5E1] bg-slate-100">
        <Image src="/customer-house.png" alt="Customer's home" fill sizes="188px" className="object-cover" />
      </div>
    </>
  );
}

function RevenueCard() {
  return (
    <div className="relative z-10 mx-auto flex w-full flex-col gap-3 rounded-2xl border border-[#0F172A] bg-white p-4 shadow-xl sm:flex-row sm:items-center sm:gap-5 lg:w-[60%] lg:min-w-[480px]">
      <div className="flex items-center gap-2.5 sm:w-[160px] sm:shrink-0">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0F172A] text-[13px] font-bold text-white shadow-2xs">
          7
        </span>
        <div>
          <p className="text-[14px] font-bold leading-tight text-[#0F172A] font-display">More Revenue</p>
          <p className="text-[11px] font-bold leading-tight text-[#059669]">Compounding ROI</p>
        </div>
      </div>

      <div className="relative aspect-[300/64] w-full flex-1 overflow-hidden rounded-lg sm:aspect-auto sm:h-[54px] border border-[#CBD5E1] bg-slate-50 p-1">
        <Image
          src="/revenue-stats.png"
          alt="Clicks 530K · Conversions 364K · Conv. rate 37.44% · Cost $33.5K"
          fill
          sizes="(min-width: 640px) 480px, 100vw"
          className="object-contain"
        />
      </div>

      <GrowthBars />
    </div>
  );
}

function GrowthBars() {
  return (
    <div className="flex h-[44px] w-[68px] shrink-0 items-end gap-1.5 self-center rounded-lg border border-emerald-300 bg-emerald-50 p-1.5 sm:h-[52px] sm:w-[76px]">
      <span className="flex-1 origin-bottom rounded-xs bg-gradient-to-t from-[#047857] to-[#10B981]" style={{ animation: 'eq-bounce-1 1.8s infinite ease-in-out' }} />
      <span className="flex-1 origin-bottom rounded-xs bg-gradient-to-t from-[#047857] to-[#10B981]" style={{ animation: 'eq-bounce-2 1.8s infinite ease-in-out 0.2s' }} />
      <span className="flex-1 origin-bottom rounded-xs bg-gradient-to-t from-[#047857] to-[#10B981]" style={{ animation: 'eq-bounce-3 1.8s infinite ease-in-out 0.4s' }} />
      <span className="flex-1 origin-bottom rounded-xs bg-gradient-to-t from-[#047857] to-[#10B981]" style={{ animation: 'eq-bounce-4 1.8s infinite ease-in-out 0.6s' }} />
      <span className="flex-1 origin-bottom rounded-xs bg-gradient-to-t from-[#047857] to-[#10B981]" style={{ animation: 'eq-bounce-5 1.8s infinite ease-in-out 0.8s' }} />
    </div>
  );
}

/* ============================================================
   FOUNDER PANEL (Full Standing Specialist Image)
   ============================================================ */

function FounderPanel() {
  return (
    <div className="relative w-full shrink-0 lg:w-[32%] xl:w-[34%] lg:min-h-[620px] lg:shrink-0 flex items-end justify-center">
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(5,150,105,0.12),transparent_70%)] pointer-events-none" />
      
      <div className="relative aspect-[3/4] w-full max-w-[420px] sm:aspect-[4/5] lg:absolute lg:inset-0 lg:aspect-auto lg:max-w-none">
        <Image
          src="/founder.webp"
          alt="WP Hossain — Google Ads specialist for Local Contractors & Service Businesses"
          fill
          priority
          sizes="(min-width: 1024px) 34vw, 100vw"
          className="object-contain object-right-bottom drop-shadow-xl"
        />
      </div>

      {/* Floating Trust Pill on Founder */}
      <div className="absolute bottom-6 left-6 z-20 hidden lg:flex items-center gap-2.5 bg-white/95 backdrop-blur-md border border-[#CBD5E1] py-2 px-3.5 rounded-2xl shadow-lg">
        <span className="w-2.5 h-2.5 rounded-full bg-[#059669] animate-pulse" />
        <div className="flex flex-col">
          <span className="text-[12px] font-bold text-[#0F172A] leading-tight">WP Hossain</span>
          <span className="text-[10px] font-semibold text-[#64748B]">Google Ads Specialist</span>
        </div>
      </div>
    </div>
  );
}

const STEPS = [
  { step: 1, title: "Google Ads Campaigns", subtitle: "(High Intent)", Content: GoogleAdsCampaignsStep },
  { step: 2, title: "Landing Page", subtitle: "(96 PageSpeed CRO)", Content: LandingPageStep },
  { step: 3, title: "Phone Calls", subtitle: "(Tracked CallRail)", Content: PhoneCallsStep },
  { step: 4, title: "CRM Lead Capture", subtitle: "(Instant Alert)", Content: CrmStep },
  { step: 5, title: "Technician", subtitle: "(Dispatched & Routed)", Content: TechnicianStep },
  { step: 6, title: "Happy Customer", subtitle: "(5-Star Google Review)", Content: CustomerStep },
];

export function GrowthEcosystemHero() {
  return (
    <section 
      id="ecosystem"
      className="relative w-full overflow-hidden bg-white border-b border-[#CBD5E1] pt-12 lg:pt-16 pb-12"
      style={{ 
        backgroundImage: 'linear-gradient(rgba(15,23,42,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.02) 1px, transparent 1px)', 
        backgroundSize: '48px 48px' 
      }}
    >
      {/* Background Ambient Radial Lights */}
      <div className="absolute top-10 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(5,150,105,0.05),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(37,99,235,0.04),transparent_70%)] pointer-events-none" />

      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-[800px] mx-auto mb-8 lg:mb-12">
          <span className="eyebrow mx-auto">
            The Complete Growth Engine
          </span>
          <h2 className="text-[clamp(28px,4vw,44px)] font-bold text-[#0F172A] leading-tight mb-3 font-display">
            Local Service Growth Ecosystem
          </h2>
          <p className="text-[16.5px] text-[#475569] leading-relaxed">
            How we turn targeted local search clicks into high-ticket dispatched jobs, 5-star Google reviews, and predictable recurring revenue.
          </p>
        </div>

        {/* Master Flex: Founder on Left + 6-Step Workflow Rail on Right */}
        <div className="relative mx-auto flex w-full flex-col lg:flex-row lg:items-end lg:gap-x-4">
          
          {/* Founder Panel on the Left */}
          <FounderPanel />

          {/* Interactive Workflow Rail on the Right */}
          <div className="relative flex w-full min-w-0 flex-col px-2 py-4 sm:px-4 lg:flex-1 lg:justify-center lg:py-6">
            <TopRail />

            <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:gap-2 sm:overflow-visible sm:px-0 lg:mt-0 lg:flex-nowrap lg:justify-between lg:gap-0">
              {STEPS.map(({ step, title, subtitle, Content }) => (
                <div key={step} className="flex shrink-0 snap-start items-stretch sm:contents">
                  <WorkflowCard step={step} title={title} subtitle={subtitle}>
                    <Content />
                  </WorkflowCard>
                  {step < STEPS.length && <Connector />}
                </div>
              ))}
            </div>

            {/* Revenue Acceleration Bottom Section */}
            <div className="relative mt-7 lg:mt-9">
              <BottomConnectors />

              <div className="mb-2 flex justify-center lg:hidden">
                <Connector orientation="vertical" />
              </div>

              <RevenueCard />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default GrowthEcosystemHero;
