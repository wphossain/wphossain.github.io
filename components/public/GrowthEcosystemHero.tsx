"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
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

/** Count-up number that animates smoothly */
function CountUp({
  to,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 1.4,
  className,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const mv = useMotionValue(0);
  const rounded = useTransform(
    mv,
    (v) => prefix + v.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + suffix
  );
  const [text, setText] = useState(prefix + (0).toFixed(decimals) + suffix);

  useEffect(() => {
    const unsub = rounded.on("change", (v) => setText(v));
    const controls = animate(mv, to, { duration, ease: "easeOut" });
    return () => {
      controls.stop();
      unsub();
    };
  }, [to, duration, rounded, mv, decimals, prefix, suffix]);

  return <span className={className}>{text}</span>;
}

/** Pulsing "live" radar blip */
function LiveDot({ color = "bg-emerald-500", className = "" }: { color?: string; className?: string }) {
  return (
    <span className={"relative inline-flex h-2 w-2 " + className}>
      <motion.span
        className={"absolute inset-0 rounded-full " + color}
        animate={{ scale: [1, 2.6], opacity: [0.75, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
      />
      <span className={"relative inline-flex h-2 w-2 rounded-full " + color} />
    </span>
  );
}

function Dot({ color = "bg-emerald-500", className = "" }: { color?: string; className?: string }) {
  return <span className={"inline-flex h-1.5 w-1.5 shrink-0 rounded-full " + color + " " + className} />;
}

const SLOT_CLASS = "flex flex-1 basis-0 min-w-0";
const GAP_CLASS = "w-2 xl:w-3.5 shrink-0";

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
      <p className="text-[9px] font-bold text-[#64748B] uppercase tracking-wider whitespace-nowrap">{label}</p>
      <p className="text-[13px] font-bold text-[#0F172A] leading-tight font-display mt-0.5">
        <CountUp to={countTo} suffix={suffix} decimals={decimals} />
      </p>
    </div>
  );
}

function StatusRow({ label, icon }: { label: string; icon?: ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 text-[10.5px] font-medium text-[#475569]">
      {icon ?? <Dot />}
      <span className="whitespace-nowrap">{label}</span>
    </div>
  );
}

function WorkflowCard({
  step,
  title,
  subtitle,
  children,
  delay = 0,
}: {
  step: number;
  title: string;
  subtitle: string;
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group relative flex w-[170px] sm:w-[178px] lg:w-auto lg:min-w-0 lg:flex-1 lg:basis-0 shrink-0 flex-col min-h-[355px] sm:min-h-[365px] rounded-[22px] border border-[#CBD5E1] bg-white p-3.5 sm:p-4 shadow-xs transition-all duration-300 hover:border-[#1A73E8] hover:shadow-xl hover:-translate-y-1.5"
    >
      <div className="flex items-start gap-1.5 mb-2.5">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0F172A] text-[10.5px] font-bold text-white shadow-2xs group-hover:bg-[#1A73E8] transition-colors">
          {step}
        </span>
        <div className="min-w-0 min-h-[36px]">
          <p className="text-[12.5px] xl:text-[13px] font-bold leading-[1.2] text-[#0F172A] font-display">{title}</p>
          {subtitle && <p className="text-[9.5px] xl:text-[10px] font-semibold leading-tight text-[#059669] mt-0.5">{subtitle}</p>}
        </div>
      </div>
      <div className="flex flex-col gap-2 flex-1 justify-between">{children}</div>
    </motion.div>
  );
}

/* Connector between cards with continuous animated traveling pulse packet */
function Connector({ orientation = "horizontal", delay = 0 }: { orientation?: "horizontal" | "vertical"; delay?: number }) {
  const isH = orientation === "horizontal";
  return (
    <div
      className={isH ? `hidden lg:flex items-center justify-center ${GAP_CLASS}` : "flex lg:hidden items-center justify-center h-7 w-full"}
      aria-hidden="true"
    >
      <svg width={20} height={16} viewBox="0 0 20 16" fill="none" className="overflow-visible">
        {isH ? (
          <path
            d="M1 8 H16 M16 8 L12 4 M16 8 L12 12"
            stroke="#0F172A"
            strokeOpacity="0.4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M8 1 V16 M8 16 L4 12 M8 16 L12 12"
            stroke="#0F172A"
            strokeOpacity="0.4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
        <motion.circle
          r="3"
          fill="#059669"
          style={{ filter: "drop-shadow(0 0 5px rgba(5,150,105,0.9))" }}
          animate={isH ? { cx: [1, 16], cy: 8, opacity: [0, 1, 1, 0] } : { cx: 8, cy: [1, 16], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay, repeatDelay: 0.4 }}
        />
      </svg>
    </div>
  );
}

/* Bottom bracket layout coordinates */
const BR = {
  lCard: "8.3%",
  rCard: "91.7%",
  cCard: "50%",
  lEdge: "24%",
  rEdge: "76%",
  GAP: 40,
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

function FlowDot({ left, top, delay }: { left: string[]; top: string[]; delay: number }) {
  return (
    <motion.span
      className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#059669]"
      style={{ boxShadow: "0 0 10px 3px rgba(5,150,105,0.95)" }}
      animate={{ left, top, opacity: [0, 1, 1, 0] }}
      transition={{
        duration: 2.2,
        repeat: Infinity,
        ease: "easeInOut",
        repeatDelay: 0.4,
        delay,
        times: [0, 0.45, 0.9, 1],
      }}
      aria-hidden="true"
    />
  );
}

function BottomConnectors() {
  const dropH = `calc(50% + ${BR.GAP}px)`;
  const top = -BR.GAP;
  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
      {/* LEFT branch: Card 1 -> down -> turns RIGHT into Step 7 */}
      <BracketLine style={{ left: BR.lCard, top, width: "2px", height: dropH, transform: "translateX(-50%)" }} />
      <BracketLine
        style={{ left: BR.lCard, top: "50%", height: "2px", width: `calc(${BR.lEdge} - ${BR.lCard})`, transform: "translateY(-50%)" }}
      />
      <ArrowSide left={BR.lEdge} dir="right" />

      {/* RIGHT branch: Card 6 -> down -> turns LEFT into Step 7 */}
      <BracketLine style={{ left: BR.rCard, top, width: "2px", height: dropH, transform: "translateX(-50%)" }} />
      <BracketLine
        style={{ left: BR.rEdge, top: "50%", height: "2px", width: `calc(${BR.rCard} - ${BR.rEdge})`, transform: "translateY(-50%)" }}
      />
      <ArrowSide left={BR.rEdge} dir="left" />

      {/* CENTER branch: Center down into Step 7 */}
      <BracketLine style={{ left: BR.cCard, top, width: "2px", height: BR.GAP, transform: "translateX(-50%)" }} />
      <ArrowDown left={BR.cCard} />

      {/* Real-time flowing data packets along the bracket routes */}
      <FlowDot left={[BR.lCard, BR.lCard, BR.lEdge, BR.lEdge]} top={[`${top}px`, "50%", "50%", "50%"]} delay={0} />
      <FlowDot left={[BR.rCard, BR.rCard, BR.rEdge, BR.rEdge]} top={[`${top}px`, "50%", "50%", "50%"]} delay={0.6} />
      <FlowDot left={[BR.cCard, BR.cCard]} top={[`${top}px`, "0px"]} delay={1.2} />
    </div>
  );
}

function TopRail() {
  const nodes: ReactNode[] = [];
  STEPS.forEach((s, i) => {
    nodes.push(
      <div key={s.step} className={`${SLOT_CLASS} flex-col items-center`}>
        <span className="relative z-10 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-[#0F172A] bg-white shadow-2xs" />
        <span className="w-[1.5px] h-3 bg-gradient-to-b from-slate-400 to-slate-200" />
      </div>
    );
    if (i < STEPS.length - 1) {
      nodes.push(<div key={`sp-${i}`} className={GAP_CLASS} />);
    }
  });

  return (
    <div className="relative hidden h-5 w-full lg:flex lg:flex-nowrap lg:items-stretch lg:justify-between mb-4" aria-hidden="true">
      <div className="absolute top-[4px] h-[1.5px] -translate-y-1/2 bg-slate-300" style={{ left: BR.lCard, right: BR.lCard }} />
      {/* Traveling Energy Packet across Top Rail */}
      <motion.span
        className="absolute top-[4px] h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-[#059669]"
        style={{ boxShadow: "0 0 10px 3px rgba(5,150,105,0.9)" }}
        animate={{ left: [BR.lCard, BR.rCard] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
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
      <div className="flex justify-center py-1">
        <GoogleAdsIcon className="h-9 w-9" />
      </div>
      <div className="flex items-center justify-between gap-1 rounded-lg border border-[#CBD5E1] bg-slate-50 px-2.5 py-1.5">
        <p className="min-w-0 text-[11px] font-semibold text-[#0F172A] whitespace-nowrap">Search Ads</p>
        <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-[#059669]">
          <LiveDot color="bg-[#059669]" />
          Active
        </span>
      </div>
      <div className="flex gap-1.5">
        <MetricCard label="Impressions" countTo={248} suffix="K" />
        <MetricCard label="Clicks" countTo={12.4} suffix="K" decimals={1} />
      </div>
      <div className="rounded-lg border border-[#CBD5E1] bg-slate-50 px-2.5 py-1.5">
        <div className="flex items-center justify-between">
          <p className="text-[9px] font-bold uppercase tracking-wider text-[#64748B]">CTR</p>
          <span className="text-[9.5px] font-bold text-[#059669]">▲ 32.5%</span>
        </div>
        <p className="text-[13px] font-bold leading-tight text-[#0F172A] font-display mt-0.5">
          <CountUp to={8.57} suffix="%" decimals={2} />
        </p>
        <svg viewBox="0 0 120 36" className="mt-1 h-9 w-full" preserveAspectRatio="none">
          <motion.polyline
            points="0,30 15,26 30,28 45,21 60,23 75,15 90,17 105,9 120,11"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0.4 }}
            animate={{ pathLength: 1, opacity: 0.85 }}
            transition={{ duration: 1.6, ease: "easeInOut", delay: 0.15 }}
          />
          <motion.polyline
            points="0,24 15,19 30,21 45,12 60,14 75,6 90,8 105,2 120,3"
            fill="none"
            stroke="#059669"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0.4 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />
        </svg>
      </div>
    </>
  );
}

function LandingPageStep() {
  return (
    <>
      <div className="relative h-[116px] w-full overflow-hidden rounded-xl border border-[#CBD5E1] bg-slate-100 shadow-2xs">
        <Image src="/landing-page.png" alt="HVAC landing page preview" fill sizes="220px" className="object-cover object-top" />
      </div>
      <div className="flex items-center justify-between rounded-xl border border-[#CBD5E1] bg-slate-50 px-2.5 py-1.5">
        <div className="flex flex-col">
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#64748B]">PageSpeed</span>
          <span className="text-[10px] font-semibold text-[#059669]">High Converting</span>
        </div>
        <ScoreDonut value={96} />
      </div>
      <div className="flex flex-col gap-1">
        <StatusRow label="Mobile Tap-to-Call" />
        <StatusRow label="0.8s Fast Load" />
        <StatusRow label="Clear Converting CTA" />
      </div>
    </>
  );
}

function ScoreDonut({ value }: { value: number }) {
  const R = 16;
  const C = 2 * Math.PI * R;
  const target = C * (1 - value / 100);
  return (
    <div className="relative h-[38px] w-[38px]">
      <svg viewBox="0 0 44 44" className="h-full w-full -rotate-90">
        <circle cx="22" cy="22" r={R} fill="none" stroke="#E2E8F0" strokeWidth="3.5" />
        <motion.circle
          cx="22"
          cy="22"
          r={R}
          fill="none"
          stroke="#059669"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          animate={{ strokeDashoffset: target }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        <span className="text-[12px] font-bold text-[#059669] font-display">
          <CountUp to={value} />
        </span>
        <span className="text-[6px] font-bold text-[#64748B]">/100</span>
      </div>
    </div>
  );
}

function PhoneCallsStep() {
  return (
    <>
      <div className="rounded-xl border border-[#CBD5E1] bg-slate-50 px-2.5 py-1.5">
        <p className="text-[8.5px] font-bold uppercase tracking-wider text-[#64748B]">Incoming Call</p>
        <p className="text-[13px] font-bold text-[#0F172A] font-display mt-0.5 tracking-tight">(214) 555-0187</p>
        <div className="flex items-center gap-1 mt-0.5">
          <LiveDot color="bg-[#059669]" />
          <p className="text-[9.5px] text-[#059669] font-semibold truncate">Dallas, TX · AC Failure</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-3.5 py-1">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-500 text-white shadow-xs">
          <PhoneHangUpIcon className="h-4 w-4" />
        </span>
        <span className="relative flex h-9 w-9 items-center justify-center">
          <motion.span
            className="absolute inset-0 rounded-full bg-emerald-500/40"
            animate={{ scale: [1, 2.1], opacity: [0.7, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.span
            className="relative flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xs"
            animate={{ rotate: [0, -12, 12, -12, 12, 0] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 1.2 }}
          >
            <PhoneIcon className="h-4.5 w-4.5" />
          </motion.span>
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between mb-0.5">
          <p className="text-[10px] font-bold text-[#0F172A]">Call Tracking</p>
          <span className="text-[8px] font-bold text-[#059669] bg-emerald-50 border border-emerald-200 rounded-full px-1.5 py-0.2">Active</span>
        </div>
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
    ["Location", "Dallas, TX"],
    ["Source", "Google Search Ads"],
  ];
  return (
    <>
      <div className="flex items-center justify-between">
        <span className="text-[10.5px] font-bold text-[#0F172A]">New Lead Alert!</span>
        <motion.span
          className="rounded-full border border-rose-200 bg-rose-50 px-2 py-0.5 text-[8.5px] font-extrabold text-rose-600 uppercase"
          animate={{ opacity: [1, 0.45, 1], scale: [1, 1.05, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          High Intent
        </motion.span>
      </div>
      <div className="flex flex-col gap-1 rounded-xl border border-[#CBD5E1] bg-slate-50 px-2.5 py-1.5">
        {fields.map(([label, value]) => (
          <div key={label} className="flex flex-col leading-tight">
            <span className="text-[8px] font-bold uppercase tracking-wider text-[#64748B]">{label}</span>
            <span className="text-[9.5px] font-semibold text-[#0F172A] truncate">{value}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 py-1">
        <CheckCircleIcon className="h-3 w-3" />
        <span className="text-[9px] font-bold text-[#059669] whitespace-nowrap">Instant SMS Dispatched</span>
      </div>
    </>
  );
}

function TechnicianStep() {
  return (
    <>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1 text-[10px] font-bold text-[#059669]">
          <CheckCircleIcon className="h-3 w-3" />
          Job Assigned
        </span>
        <span className="text-[8.5px] font-bold text-[#059669] bg-emerald-50 border border-emerald-200 rounded-full px-1.5 py-0.2">
          ETA 22m
        </span>
      </div>
      <div className="relative h-[110px] w-full overflow-hidden rounded-xl border border-[#CBD5E1] bg-slate-100 shadow-2xs">
        <Image src="/technician.png" alt="Dispatched HVAC technician" fill sizes="220px" className="object-cover object-top" />
      </div>
      <div className="flex items-center justify-between text-[9.5px] text-[#475569] font-medium px-0.5">
        <span>Route Map</span>
        <span className="font-bold text-[#059669]">22 mins</span>
      </div>
      <div className="relative h-[74px] w-full overflow-hidden rounded-xl border border-[#CBD5E1] bg-slate-100 shadow-2xs">
        <Image src="/technician-map.png" alt="Technician live GPS route map" fill sizes="220px" className="object-cover" />
      </div>
    </>
  );
}

function CustomerStep() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-[10px] font-bold text-[#059669]">
          <CheckCircleIcon className="h-3 w-3" />
          Job Completed
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.span
              key={i}
              animate={{ opacity: [1, 0.35, 1], scale: [1, 1.15, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
            >
              <StarIcon className="h-3 w-3" />
            </motion.span>
          ))}
        </div>
      </div>
      <p className="text-[9.5px] xl:text-[10px] italic leading-snug text-[#334155]">&ldquo;They arrived in 22 mins and had our AC cooling again. Lifesaver!&rdquo;</p>
      <p className="text-[8.5px] font-bold text-[#64748B]">— Michael T. (Verified)</p>
      <div className="relative h-[128px] w-full overflow-hidden rounded-xl border border-[#CBD5E1] bg-slate-100 shadow-2xs">
        <Image src="/customer-house.png" alt="Customer's home" fill sizes="220px" className="object-cover" />
      </div>
    </>
  );
}

function RevenueCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative z-10 mx-auto inline-flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4.5 rounded-2xl border-2 border-[#0F172A] bg-white p-3.5 sm:p-4 shadow-xl max-w-[740px] w-auto"
    >
      <div className="flex items-center gap-2.5 shrink-0">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0F172A] text-[13px] font-bold text-white shadow-2xs">
          7
        </span>
        <div className="pr-1">
          <p className="text-[14px] font-bold leading-tight text-[#0F172A] font-display whitespace-nowrap">More Revenue</p>
          <p className="text-[10.5px] font-bold leading-tight text-[#059669] whitespace-nowrap">Compounding ROI</p>
        </div>
      </div>

      {/* Snug metric image frame with zero empty gap on sides */}
      <div className="relative w-[340px] sm:w-[390px] h-[58px] sm:h-[66px] shrink-0 overflow-hidden rounded-xl border border-[#CBD5E1] bg-slate-50 p-1">
        <Image
          src="/revenue-stats.png"
          alt="Clicks 530K · Conversions 364K · Conv. rate 37.44% · Cost $33.5K"
          fill
          sizes="390px"
          className="object-contain"
        />
      </div>

      <GrowthBars />
    </motion.div>
  );
}

function GrowthBars() {
  const bars = [38, 54, 70, 85, 100];
  return (
    <div className="flex h-[46px] w-[68px] shrink-0 items-end gap-1 self-center rounded-lg border border-emerald-300 bg-emerald-50 p-2">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className="flex-1 origin-bottom rounded-xs bg-gradient-to-t from-[#047857] to-[#10B981]"
          initial={{ height: `${h}%` }}
          animate={{ height: ["20%", `${h}%`, `${h}%`, "20%"] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.4, 0.75, 1],
            delay: 0.15 + i * 0.08,
          }}
        />
      ))}
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
      className="relative w-full overflow-hidden bg-white border-b border-[#CBD5E1] pt-12 lg:pt-14 pb-16 lg:pb-20"
    >
      {/* Background Ambient Radial Lights (Clean Solid White Foundation) */}
      <div className="absolute top-6 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(5,150,105,0.03),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(37,99,235,0.025),transparent_70%)] pointer-events-none" />

      {/* Standard Container */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10">
        
        {/* Section Heading - Centered with +5px balanced margin */}
        <div className="max-w-3xl mx-auto mb-8 lg:mb-9 text-center">
          <h2 className="text-[clamp(26px,3.5vw,38px)] font-bold text-[#0F172A] leading-tight font-display tracking-tight">
            Local Service Growth Ecosystem
          </h2>
        </div>

        {/* 6-Step Workflow Rail Centered & Tightly Inset (max-w-[1160px]) */}
        <div className="relative w-full max-w-[1160px] xl:max-w-[1200px] mx-auto flex flex-col items-center justify-center">
          
          {/* Top Rail with balanced bottom spacing */}
          <TopRail />

          <div className="-mx-6 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-6 pb-2 sm:mx-0 sm:overflow-visible sm:px-0 lg:mt-0 lg:flex-nowrap lg:justify-between lg:gap-0 w-full">
            {STEPS.map(({ step, title, subtitle, Content }, i) => (
              <div key={step} className="flex shrink-0 snap-start items-stretch sm:contents">
                <WorkflowCard step={step} title={title} subtitle={subtitle} delay={i * 0.08}>
                  <Content />
                </WorkflowCard>
                {step < STEPS.length && <Connector delay={i * 0.1} />}
              </div>
            ))}
          </div>

          {/* Revenue Acceleration Bottom Section with +5px top spacing (GAP: 40px) */}
          <div className="relative mt-9 lg:mt-10 w-full flex flex-col items-center">
            <BottomConnectors />

            <div className="mb-2 flex justify-center lg:hidden">
              <Connector orientation="vertical" />
            </div>

            <RevenueCard />
          </div>

        </div>

      </div>
    </section>
  );
}

export default GrowthEcosystemHero;
