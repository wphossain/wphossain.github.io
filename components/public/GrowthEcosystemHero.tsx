"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
  type Transition,
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
      <circle cx="12" cy="12" r="10" fill="#22C55E" />
      <path d="M7.5 12.5l3 3 6-6.5" stroke="#030712" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="#FBBF24" {...props}>
      <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6z" />
    </svg>
  );
}

/* ============================================================
   ANIMATION HELPERS
   ============================================================ */

/** Count-up number, fires once when scrolled into view. */
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
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const rounded = useTransform(
    mv,
    (v) => prefix + v.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + suffix
  );
  const [text, setText] = useState(prefix + (0).toFixed(decimals) + suffix);

  useEffect(() => {
    const unsub = rounded.on("change", (v) => setText(v));
    if (reduce) {
      mv.set(to);
      return () => unsub();
    }
    const controls = animate(mv, to, { duration, ease: "easeOut" });
    return () => {
      controls.stop();
      unsub();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [to]);

  return <span className={className}>{text}</span>;
}

/** Soft pulsing "live" dot. */
function LiveDot({ color = "bg-emerald-400", className = "" }: { color?: string; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <span className={"relative inline-flex h-1.5 w-1.5 " + className}>
      {!reduce && (
        <motion.span
          className={"absolute inset-0 rounded-full " + color}
          animate={{ scale: [1, 2.6], opacity: [0.6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <span className={"relative inline-flex h-1.5 w-1.5 rounded-full " + color} />
    </span>
  );
}

/** Plain static dot — used for checklist-style bullets that should NOT pulse. */
function Dot({ color = "bg-emerald-400", className = "" }: { color?: string; className?: string }) {
  return <span className={"inline-flex h-1.5 w-1.5 shrink-0 rounded-full " + color + " " + className} />;
}

const loop = (extra: Partial<Transition> = {}): Transition => ({
  duration: 2.4,
  repeat: Infinity,
  ease: "easeInOut",
  ...extra,
});

/* ============================================================
   SHARED LAYOUT CONSTANTS
   ============================================================ */

const SLOT_CLASS = "flex flex-1 basis-0 min-w-0";
const GAP_CLASS = "w-7 shrink-0 xl:w-9";

/* ============================================================
   SHARED PRIMITIVES
   ============================================================ */

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
    <div className="min-w-0 flex-1 rounded-lg border border-white/5 bg-white/[0.03] px-2 py-1.5">
      <p className="truncate text-[9px] text-slate-400">{label}</p>
      <p className="text-[13px] font-bold text-white leading-tight">
        <CountUp to={countTo} suffix={suffix} decimals={decimals} />
      </p>
    </div>
  );
}

/** Static status row (no per-row slide-in — kept calm on purpose). */
function StatusRow({ label, icon }: { label: string; icon?: ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 text-[10.5px] text-slate-300">
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
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      className="group relative flex w-[172px] shrink-0 flex-col gap-3 rounded-2xl border border-white/10 bg-[#0b1220]/90 p-3.5 backdrop-blur-sm transition-colors duration-300 hover:border-blue-400/40 hover:bg-[#0d1526] hover:shadow-[0_0_28px_-8px_rgba(59,130,246,0.5)] sm:w-[184px] lg:w-auto lg:min-w-0 lg:flex-1 lg:basis-0"
    >
      <div className="flex items-start gap-2">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-blue-400/30 bg-blue-500/15 text-[11px] font-semibold text-blue-300">
          {step}
        </span>
        <div className="min-w-0 min-h-[40px]">
          <p className="text-[12.5px] font-semibold leading-[1.15] text-white">{title}</p>
          {subtitle && <p className="text-[10.5px] leading-tight text-blue-300/70">{subtitle}</p>}
        </div>
      </div>
      <div className="flex flex-col gap-2">{children}</div>
    </motion.div>
  );
}

/* ---- Connector between cards: a light packet flows card → card ---- */

function Connector({ orientation = "horizontal", delay = 0 }: { orientation?: "horizontal" | "vertical"; delay?: number }) {
  const reduce = useReducedMotion();
  const isH = orientation === "horizontal";
  return (
    <div
      className={isH ? `hidden lg:flex items-center justify-center ${GAP_CLASS}` : "flex lg:hidden items-center justify-center h-7 w-full"}
      aria-hidden="true"
    >
      <svg width={isH ? 40 : 16} height={isH ? 16 : 40} viewBox={isH ? "0 0 40 16" : "0 0 16 40"} fill="none" className="overflow-visible">
        {isH ? (
          <path
            d="M2 8 H30 M30 8 L23 2.5 M30 8 L23 13.5"
            stroke="#60A5FA"
            strokeOpacity="0.7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M8 2 V30 M8 30 L2.5 23 M8 30 L13.5 23"
            stroke="#60A5FA"
            strokeOpacity="0.7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
        {!reduce && (
          <motion.circle
            r="2.4"
            fill="#93C5FD"
            style={{ filter: "drop-shadow(0 0 5px #60A5FA)" }}
            animate={isH ? { cx: [2, 30], cy: 8, opacity: [0, 1, 1, 0] } : { cx: 8, cy: [2, 30], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut", delay, repeatDelay: 0.7 }}
          />
        )}
      </svg>
    </div>
  );
}

/* ============================================================
   BOTTOM BRACKET
   ============================================================ */

const BR = {
  lCard: "7%", // card 1 center-x
  rCard: "93%", // card 6 center-x
  cCard: "58.6%", // card 4 (CRM) center-x
  lEdge: "25%", // revenue card LEFT edge
  rEdge: "75%", // revenue card RIGHT edge
  GAP: 36, // px between cards-row bottom and revenue card top
} as const;

function BracketLine({ style }: { style: CSSProperties }) {
  return <span className="absolute bg-blue-400/50" style={style} aria-hidden="true" />;
}

function ArrowSide({ left, dir }: { left: string; dir: "right" | "left" }) {
  const tip =
    dir === "right"
      ? "-translate-x-full border-l-[7px] border-l-blue-400"
      : "border-r-[7px] border-r-blue-400";
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
      className="absolute h-0 w-0 -translate-x-1/2 border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent border-t-blue-400"
      style={{ left, top: -6 }}
      aria-hidden="true"
    />
  );
}

function FlowDot({ left, top, delay }: { left: string[]; top: string[]; delay: number }) {
  return (
    <motion.span
      className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-200"
      style={{ boxShadow: "0 0 6px 2px rgba(96,165,250,0.7)" }}
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
  const reduce = useReducedMotion();
  const dropH = `calc(50% + ${BR.GAP}px)`;
  const top = -BR.GAP;
  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
      {/* LEFT: under card 1 → down → RIGHT into the revenue card's left edge */}
      <BracketLine style={{ left: BR.lCard, top, width: "1.5px", height: dropH, transform: "translateX(-50%)" }} />
      <BracketLine
        style={{ left: BR.lCard, top: "50%", height: "1.5px", width: `calc(${BR.lEdge} - ${BR.lCard})`, transform: "translateY(-50%)" }}
      />
      <ArrowSide left={BR.lEdge} dir="right" />

      {/* RIGHT: under card 6 → down → LEFT into the revenue card's right edge */}
      <BracketLine style={{ left: BR.rCard, top, width: "1.5px", height: dropH, transform: "translateX(-50%)" }} />
      <BracketLine
        style={{ left: BR.rEdge, top: "50%", height: "1.5px", width: `calc(${BR.rCard} - ${BR.rEdge})`, transform: "translateY(-50%)" }}
      />
      <ArrowSide left={BR.rEdge} dir="left" />

      {/* CENTER: card 4 (CRM) → straight down into the revenue card's top edge */}
      <BracketLine style={{ left: BR.cCard, top, width: "1.5px", height: BR.GAP, transform: "translateX(-50%)" }} />
      <ArrowDown left={BR.cCard} />

      {/* flowing packets down each side branch */}
      {!reduce && (
        <>
          <FlowDot left={[BR.lCard, BR.lCard, BR.lEdge, BR.lEdge]} top={[`${top}px`, "50%", "50%", "50%"]} delay={0} />
          <FlowDot left={[BR.rCard, BR.rCard, BR.rEdge, BR.rEdge]} top={[`${top}px`, "50%", "50%", "50%"]} delay={0.5} />
        </>
      )}
    </div>
  );
}

/* ---- Top rail ---- */

function TopRail() {
  const reduce = useReducedMotion();
  const nodes: ReactNode[] = [];
  STEPS.forEach((s, i) => {
    nodes.push(
      <div key={s.step} className={`${SLOT_CLASS} flex-col items-center`}>
        <span className="relative z-10 h-2 w-2 shrink-0 rounded-full border border-blue-300 bg-[#060c18]" />
        <span className="w-[1.5px] flex-1 bg-gradient-to-b from-blue-400/60 to-blue-400/35" />
      </div>
    );
    if (i < STEPS.length - 1) {
      nodes.push(<div key={`sp-${i}`} className={GAP_CLASS} />);
    }
  });

  return (
    <div className="relative hidden h-5 w-full lg:flex lg:flex-nowrap lg:items-stretch lg:justify-between" aria-hidden="true">
      <div className="absolute top-[4px] h-[1.5px] -translate-y-1/2 bg-blue-400/40" style={{ left: BR.lCard, right: BR.lCard }} />
      {!reduce && (
        <motion.span
          className="absolute top-[4px] h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-blue-300"
          style={{ boxShadow: "0 0 6px 2px rgba(96,165,250,0.7)" }}
          animate={{ left: [BR.lCard, BR.rCard] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
        />
      )}
      {nodes}
    </div>
  );
}

/* ============================================================
   STEP CONTENTS
   ============================================================ */

function GoogleAdsCampaignsStep() {
  const reduce = useReducedMotion();
  return (
    <>
      <div className="flex justify-center py-0.5">
        <GoogleAdsIcon className="h-9 w-9" />
      </div>
      <div className="flex items-center justify-between gap-1 rounded-lg border border-white/5 bg-white/[0.03] px-2 py-1">
        <p className="min-w-0 truncate text-[10px] text-slate-300">Search Campaigns</p>
        <span className="flex shrink-0 items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-1.5 py-0.5 text-[8.5px] font-semibold text-emerald-400">
          <LiveDot />
          Active
        </span>
      </div>
      <div className="flex gap-1.5">
        <MetricCard label="Impressions" countTo={248} suffix="K" />
        <MetricCard label="Clicks" countTo={12.4} suffix="K" decimals={1} />
      </div>
      <div className="rounded-lg border border-white/5 bg-white/[0.03] px-2 py-1.5">
        <div className="flex items-center justify-between">
          <p className="text-[9.5px] uppercase tracking-wide text-slate-400">CTR</p>
          <span className="text-[9.5px] font-medium text-emerald-400">▲ 32.5%</span>
        </div>
        <p className="text-[13px] font-bold leading-tight text-white">
          <CountUp to={8.57} suffix="%" decimals={2} />
        </p>
        <svg viewBox="0 0 120 40" className="mt-1 h-10 w-full" preserveAspectRatio="none">
          <motion.polyline
            points="0,34 15,30 30,32 45,25 60,27 75,19 90,21 105,13 120,15"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduce ? undefined : { pathLength: 0, opacity: 0.4 }}
            whileInView={reduce ? undefined : { pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: "easeInOut", delay: 0.15 }}
          />
          <motion.polyline
            points="0,28 15,23 30,25 45,15 60,18 75,9 90,11 105,3 120,5"
            fill="none"
            stroke="#60A5FA"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduce ? undefined : { pathLength: 0, opacity: 0.4 }}
            whileInView={reduce ? undefined : { pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
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
      <div className="relative h-[92px] w-full overflow-hidden rounded-lg border border-white/10 bg-slate-800">
        <Image src="/landing-page.png" alt="HVAC landing page preview" fill sizes="184px" className="object-cover object-top" />
      </div>
      <div className="flex flex-col items-center gap-1 rounded-lg border border-white/5 bg-white/[0.03] px-2 py-2">
        <span className="text-[9.5px] uppercase tracking-wide text-slate-400">Page Score</span>
        <ScoreDonut value={92} />
      </div>
      <div className="flex flex-col gap-1">
        <StatusRow label="Fast Loading" />
        <StatusRow label="Mobile Friendly" />
        <StatusRow label="Clear CTA" />
      </div>
    </>
  );
}

/* ---- Circular page-score gauge ---- */

function ScoreDonut({ value }: { value: number }) {
  const reduce = useReducedMotion();
  const R = 26;
  const C = 2 * Math.PI * R;
  const target = C * (1 - value / 100);
  return (
    <div className="relative h-[62px] w-[62px]">
      <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
        <circle cx="32" cy="32" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
        <motion.circle
          cx="32"
          cy="32"
          r={R}
          fill="none"
          stroke="#34D399"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={C}
          initial={reduce ? { strokeDashoffset: target } : { strokeDashoffset: C }}
          whileInView={{ strokeDashoffset: target }}
          viewport={{ once: true }}
          transition={reduce ? { duration: 0 } : { duration: 1.4, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        <span className="text-[17px] font-bold text-emerald-400">
          <CountUp to={value} />
        </span>
        <span className="text-[8px] text-slate-500">/100</span>
      </div>
    </div>
  );
}

function PhoneCallsStep() {
  const reduce = useReducedMotion();
  return (
    <>
      <div className="rounded-lg border border-white/5 bg-white/[0.03] px-2 py-1.5">
        <p className="text-[9.5px] uppercase tracking-wide text-slate-400">Incoming Call</p>
        <p className="text-[12.5px] font-bold text-white">214-555-0187</p>
        <p className="text-[10px] text-slate-400">Dallas, TX</p>
      </div>
      <div className="flex items-center justify-center gap-3 py-1">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500/90 text-white shadow-[0_0_12px_-2px_rgba(244,63,94,0.7)]">
          <PhoneHangUpIcon className="h-4 w-4" />
        </span>
        <span className="relative flex h-8 w-8 items-center justify-center">
          {!reduce && (
            <motion.span
              className="absolute inset-0 rounded-full bg-emerald-400/50"
              animate={{ scale: [1, 1.9], opacity: [0.5, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          <motion.span
            className="relative flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/90 text-white shadow-[0_0_12px_-2px_rgba(16,185,129,0.7)]"
            animate={reduce ? undefined : { rotate: [0, -12, 12, -12, 12, 0] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 1.2 }}
          >
            <PhoneIcon className="h-4 w-4" />
          </motion.span>
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[10px] font-semibold text-slate-300">Call Tracking</p>
        <StatusRow label="Recording" />
        <StatusRow label="Duration" />
        <StatusRow label="Source" />
      </div>
    </>
  );
}

function CrmStep() {
  const fields: Array<[string, string]> = [
    ["Name", "John Smith"],
    ["Phone", "(214) 555-0187"],
    ["Service", "AC Repair"],
    ["Location", "Dallas, TX"],
    ["Source", "Google Ads"],
  ];
  return (
    <>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold text-white">New Lead!</span>
        <motion.span
          className="rounded-full border border-rose-400/30 bg-rose-500/10 px-2 py-0.5 text-[9px] font-semibold text-rose-400"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={loop({ duration: 1.6 })}
        >
          Hot
        </motion.span>
      </div>
      <div className="flex flex-col gap-1 rounded-lg border border-white/5 bg-white/[0.03] px-2 py-1.5">
        {fields.map(([label, value]) => (
          <div key={label} className="flex flex-col leading-tight">
            <span className="text-[8.5px] uppercase tracking-wide text-slate-500">{label}</span>
            <span className="truncate text-[10.5px] font-medium text-slate-200">{value}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 py-1">
        <CheckCircleIcon className="h-3.5 w-3.5" />
        <span className="text-[10px] font-semibold text-emerald-400">Lead Saved</span>
      </div>
    </>
  );
}

function TechnicianStep() {
  return (
    <>
      <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
        <CheckCircleIcon className="h-3.5 w-3.5" />
        Job Assigned
      </span>
      <div className="relative h-[74px] w-full overflow-hidden rounded-lg border border-white/10 bg-slate-800">
        <Image src="/technician.png" alt="Dispatched HVAC technician" fill sizes="184px" className="object-cover object-top" />
      </div>
      <p className="text-[10px] text-slate-400">
        ETA <span className="font-semibold text-white">25 mins</span>
      </p>
      <div className="relative h-[58px] w-full overflow-hidden rounded-lg border border-white/10 bg-[#0a1526]">
        <Image src="/technician-map.png" alt="Technician route map" fill sizes="184px" className="object-cover" />
      </div>
    </>
  );
}

function CustomerStep() {
  const reduce = useReducedMotion();
  return (
    <>
      <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
        <CheckCircleIcon className="h-3.5 w-3.5" />
        Service Completed
      </div>
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.span
            key={i}
            animate={reduce ? undefined : { opacity: [1, 0.35, 1] }}
            transition={reduce ? undefined : { duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
          >
            <StarIcon className="h-3 w-3" />
          </motion.span>
        ))}
      </div>
      <p className="text-[10.5px] italic leading-snug text-slate-300">&ldquo;Great service, very professional. Highly recommended!&rdquo;</p>
      <p className="text-[9.5px] font-medium text-slate-500">— Michael T.</p>
      <div className="relative h-[78px] w-full overflow-hidden rounded-lg border border-white/10 bg-slate-800">
        <Image src="/customer-house.png" alt="Customer's home" fill sizes="184px" className="object-cover" />
      </div>
    </>
  );
}

function RevenueCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative z-10 mx-auto flex w-full flex-col gap-2.5 rounded-2xl border border-white/10 bg-[#0b1220]/90 p-3.5 backdrop-blur-sm sm:flex-row sm:items-center sm:gap-4 lg:w-[50%] lg:min-w-[430px]"
    >
      <div className="flex items-center gap-2 sm:w-[150px] sm:shrink-0">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-blue-400/30 bg-blue-500/15 text-[12px] font-semibold text-blue-300">7</span>
        <div>
          <p className="text-[13.5px] font-semibold leading-tight text-white">More Revenue</p>
          <p className="text-[10.5px] leading-tight text-blue-300/70">(Business Growth)</p>
        </div>
      </div>

      <div className="relative aspect-[300/64] w-full flex-1 overflow-hidden rounded-lg sm:aspect-auto sm:h-[52px]">
        <Image
          src="/revenue-stats.png"
          alt="Clicks 530K · Conversions 364K · Conv. rate 37.44% · Cost $33.5K"
          fill
          sizes="(min-width: 640px) 480px, 100vw"
          className="object-contain"
        />
      </div>

      <GrowthBars />
    </motion.div>
  );
}

function GrowthBars() {
  const reduce = useReducedMotion();
  const bars = [40, 55, 68, 82, 100];
  return (
    <div className="flex h-[44px] w-[68px] shrink-0 items-end gap-1 self-center rounded-lg border border-emerald-400/10 bg-emerald-500/5 p-1.5 sm:h-[52px] sm:w-[76px]">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className="flex-1 origin-bottom rounded-sm bg-gradient-to-t from-emerald-600 to-emerald-400"
          initial={{ height: `${h}%` }}
          animate={
            reduce
              ? undefined
              : { height: ["18%", `${h}%`, `${h}%`, "18%"] }
          }
          transition={
            reduce
              ? undefined
              : {
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.4, 0.75, 1],
                  delay: 0.15 + i * 0.08,
                }
          }
        />
      ))}
    </div>
  );
}

/* ============================================================
   FOUNDER PANEL
   ============================================================ */

function FounderPanel() {
  return (
    <div className="relative w-full shrink-0 lg:w-[36%] lg:min-h-[640px] lg:shrink-0">
      <div className="relative aspect-[3/4] w-full sm:aspect-[4/5] lg:absolute lg:inset-0 lg:aspect-auto">
        <Image
          src="/founder.png"
          alt="Founder — Google Ads specialist for HVAC companies. I Build Google Ads Systems That Generate More Booked Calls."
          fill
          priority
          sizes="(min-width: 1024px) 36vw, 100vw"
          className="object-contain object-right-bottom"
        />
      </div>
    </div>
  );
}

/* ============================================================
   MAIN HERO
   ============================================================ */

const STEPS = [
  { step: 1, title: "Google Ads Campaigns", subtitle: "", Content: GoogleAdsCampaignsStep },
  { step: 2, title: "Landing Page", subtitle: "(High Converting)", Content: LandingPageStep },
  { step: 3, title: "Phone Calls", subtitle: "(Tracked)", Content: PhoneCallsStep },
  { step: 4, title: "CRM", subtitle: "(Lead Management)", Content: CrmStep },
  { step: 5, title: "Technician", subtitle: "(Dispatched)", Content: TechnicianStep },
  { step: 6, title: "Customer", subtitle: "(Happy)", Content: CustomerStep },
];

export function GrowthEcosystemHero() {
  return (
    <section 
      id="new-hero"
      className="relative w-full overflow-hidden bg-[#050f1f] border-b border-white/5"
      style={{ 
        backgroundImage: 'linear-gradient(rgba(26,115,232,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(26,115,232,0.03) 1px, transparent 1px)', 
        backgroundSize: '40px 40px' 
      }}
    >
      <BackgroundGlow />

      <div className="relative mx-auto flex w-full max-w-[1680px] flex-col lg:flex-row lg:items-end lg:gap-x-[1.5%]">
        <FounderPanel />

        <div className="relative flex w-full min-w-0 flex-col px-4 py-8 sm:px-6 lg:flex-1 lg:justify-center lg:py-10 lg:pl-0 lg:pr-6 xl:pr-8">
          <TopRail />

          <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:gap-2 sm:overflow-visible sm:px-0 lg:mt-0 lg:flex-nowrap lg:justify-between lg:gap-0">
            {STEPS.map(({ step, title, subtitle, Content }, i) => (
              <div key={step} className="flex shrink-0 snap-start items-stretch sm:contents">
                <WorkflowCard step={step} title={title} subtitle={subtitle} delay={i * 0.09}>
                  <Content />
                </WorkflowCard>
                {i < STEPS.length - 1 && <Connector delay={i * 0.12} />}
              </div>
            ))}
          </div>

          <div className="relative mt-6 lg:mt-9">
            <BottomConnectors />

            <div className="mb-2 flex justify-center lg:hidden">
              <Connector orientation="vertical" />
            </div>

            <RevenueCard />
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mt-7 text-center text-xl font-medium tracking-tight text-white sm:text-2xl lg:mt-8 lg:text-[32px]"
          >
            Local Service Growth Ecosystem
          </motion.h2>
        </div>
      </div>
    </section>
  );
}

function BackgroundGlow() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute -top-1/4 right-[10%] h-[420px] w-[420px] rounded-full bg-blue-600/10 blur-[120px]"
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.12, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-[35%] h-[360px] w-[360px] rounded-full bg-emerald-500/8 blur-[120px]"
        animate={{ opacity: [0.3, 0.55, 0.3], scale: [1.1, 1, 1.1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export default GrowthEcosystemHero;
