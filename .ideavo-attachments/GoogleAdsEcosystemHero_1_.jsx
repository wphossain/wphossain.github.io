import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  HardHat,
  Phone,
  PhoneOff,
  Users,
  Star,
  CheckCircle2,
  MapPin,
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart3,
} from "lucide-react";

/**
 * GoogleAdsEcosystemHero  (polish pass — same architecture as v1)
 * ---------------------------------------------------------------------
 * Premium SaaS hero (Stripe / Linear / Framer / Vercel register).
 * The "HVAC Growth Ecosystem" — a connected 7-node flow — is the main
 * attraction (~80% of the hero). The founder photo occupies <20% and is
 * a REAL photograph, CSS-treated to match the brand.
 *
 * File target: app/_components/GoogleAdsEcosystemHero.tsx   ("use client")
 * Deps:        npm i framer-motion lucide-react
 * ---------------------------------------------------------------------
 */

const COLORS = {
  bg: "#070C18",
  panel: "#0F1B3D",
  navy: "#1E3A8A",
  blue: "#2563EB",
  yellow: "#FBBF24",
  green: "#34D399",
  slate: "#94A3B8",
};

const EASE = [0.16, 1, 0.3, 1];

/* ------------------------------- utilities ------------------------------ */

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

/** Cursor parallax — now actually consumed by the ecosystem wrapper. */
function useParallax() {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 60, damping: 18, mass: 0.6 });

  const onMouseMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width - 0.5);
      y.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [x, y]
  );
  const onMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { ref, sx, sy, onMouseMove, onMouseLeave };
}

/** Fires count-up only once the element is actually visible. */
function useInViewOnce(threshold = 0.3) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current || inView) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [inView, threshold]);
  return [ref, inView];
}

function useCountUp(target, active, duration = 1100) {
  const [val, setVal] = useState(target[0]);
  useEffect(() => {
    if (!active) return;
    let raf;
    const start = performance.now();
    const [from, to] = target;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(from + (to - from) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, target[0], target[1]]);
  return val;
}

/** Measures an element's box for GPU-accelerated (transform-based) travel distances. */
function useMeasure() {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setSize({ width, height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, size];
}

/* ------------------------------ base card -------------------------------- */
/* Entrance + idle float + hover lift are split across two layers so they   */
/* never fight over the same transform.                                     */

function Card({ children, className = "", delay = 0, floatOffset = 0, elevated = false, reduced }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      style={{ willChange: "transform, opacity" }}
    >
      <motion.div
        animate={reduced ? {} : { y: [0, -5, 0] }}
        transition={{ duration: 4.5 + floatOffset, repeat: Infinity, ease: "easeInOut", delay: floatOffset * 0.4 }}
        style={{ willChange: "transform" }}
        className="h-full"
      >
        <motion.div
          whileHover={reduced ? {} : { y: -4, scale: 1.015 }}
          transition={{ duration: 0.25, ease: EASE }}
          style={{ willChange: "transform" }}
          className={`relative h-full rounded-xl border bg-[#101c40]/80 backdrop-blur-md
            border-white/10 hover:border-blue-400/40
            shadow-[0_2px_6px_rgba(0,0,0,0.3),0_16px_40px_rgba(0,0,0,0.4)]
            hover:shadow-[0_4px_10px_rgba(0,0,0,0.35),0_20px_50px_rgba(37,99,235,0.25)]
            transition-[border-color,box-shadow] duration-300
            ${elevated ? "border-blue-400/30 shadow-[0_0_0_1px_rgba(37,99,235,0.25),0_20px_60px_rgba(37,99,235,0.2)]" : ""}
            ${className}`}
        >
          {/* glass sheen */}
          <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-white/[0.06] to-transparent" />
          <div className="relative">{children}</div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function Pill({ children, tone = "green", pulse = false }) {
  const tones = {
    green: "bg-green-500/15 text-green-400",
    red: "bg-red-500/15 text-red-400",
    yellow: "bg-yellow-500/15 text-yellow-400",
  };
  const dot = { green: "bg-green-400", red: "bg-red-400", yellow: "bg-yellow-400" };
  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] px-2 py-1 rounded-full font-medium ${tones[tone]}`}>
      {pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <motion.span
            className={`absolute inline-flex h-full w-full rounded-full ${dot[tone]}`}
            animate={{ scale: [1, 2.2], opacity: [0.7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
          />
          <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${dot[tone]}`} />
        </span>
      )}
      {children}
    </span>
  );
}

/** Traveling light particles along a horizontal or vertical track — transform-only. */
function FlowParticles({ length, axis = "x", count = 3, duration = 3.2, color = COLORS.yellow, baseStyle = {} }) {
  if (!length) return null;
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            background: color,
            boxShadow: `0 0 10px 2px ${color}99`,
            willChange: "transform, opacity",
            ...baseStyle,
          }}
          animate={
            axis === "x"
              ? { x: [0, length], opacity: [0, 1, 1, 0] }
              : { y: [0, length], opacity: [0, 1, 1, 0] }
          }
          transition={{
            duration,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: (i * duration) / count,
          }}
        />
      ))}
    </>
  );
}

/* ----------------------------- founder photo ----------------------------- */

function FounderPhoto({ photoSrc = "/founder.jpg", name = "WP Hossain" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="relative w-full max-w-[220px] mx-auto lg:mx-0 mb-6"
    >
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(37,99,235,0.25)]">
        <Image src={photoSrc} alt={name} fill sizes="220px" className="object-cover" priority />
        <div
          className="absolute inset-0 mix-blend-color"
          style={{ background: `linear-gradient(160deg, ${COLORS.blue}, ${COLORS.navy})`, opacity: 0.55 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070C18] via-transparent to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5, ease: EASE }}
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-[#0F1B3D] border border-yellow-400/40 px-3 py-1.5 shadow-lg whitespace-nowrap"
      >
        <HardHat className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
        <span className="text-[11px] font-semibold text-white">Google Ads Specialist</span>
      </motion.div>
    </motion.div>
  );
}

/* --------------------------- campaign performance ------------------------ */

function CampaignPerformanceCard({ reduced }) {
  const [ref, inView] = useInViewOnce(0.4);
  const clicks = useCountUp([0, 12.4], inView, 1300);
  const conversions = useCountUp([0, 362], inView, 1300);
  const cpl = useCountUp([46, 30.68], inView, 1300);
  const ctr = useCountUp([3.2, 8.57], inView, 1300);

  const points = [12, 30, 24, 46, 38, 60, 52, 74, 66, 90];
  const path = points
    .map((v, i) => `${i === 0 ? "M" : "L"} ${(i / (points.length - 1)) * 260} ${70 - (v / 100) * 70}`)
    .join(" ");

  return (
    <div ref={ref}>
      <Card className="w-full max-w-[260px] mx-auto lg:mx-0 p-4" delay={0.15} floatOffset={0.3} reduced={reduced}>
        <p className="text-[10px] font-semibold tracking-wider text-slate-400 mb-3">LIVE CAMPAIGN PERFORMANCE</p>
        <div className="grid grid-cols-4 gap-2 mb-3">
          {[
            ["Clicks", clicks.toFixed(1) + "K", "+28.6%"],
            ["Conv.", Math.round(conversions), "+45.3%"],
            ["CPL", "$" + cpl.toFixed(2), "-27.4%"],
            ["CTR", ctr.toFixed(2) + "%", "+32.5%"],
          ].map(([label, val, delta]) => (
            <div key={label}>
              <p className="text-[9px] text-slate-500">{label}</p>
              <p className="text-[11px] font-bold text-white leading-tight">{val}</p>
              <p className="text-[9px] text-green-400">{delta}</p>
            </div>
          ))}
        </div>
        <svg viewBox="0 0 260 70" className="w-full h-14">
          <motion.path
            d={path}
            fill="none"
            stroke={COLORS.blue}
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.4, ease: EASE }}
          />
        </svg>
      </Card>
    </div>
  );
}

/* --------------------------------- rail ---------------------------------- */

function FlowRail({ count, reduced }) {
  const [trackRef, { width }] = useMeasure();
  return (
    <div className="relative hidden md:flex items-center justify-between px-6 mb-4 h-6">
      <div
        ref={trackRef}
        className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent"
      />
      {!reduced && width > 0 && (
        <div className="absolute left-6 top-1/2" style={{ transform: "translateY(-50%)" }}>
          <FlowParticles length={width - 48} axis="x" count={3} duration={3.4} />
        </div>
      )}
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="relative z-10 w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_6px_1px_rgba(96,165,250,0.6)]" />
      ))}
    </div>
  );
}

function NodeNumber({ n }) {
  return (
    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold shrink-0 shadow-[0_0_0_3px_rgba(37,99,235,0.2)]">
      {n}
    </span>
  );
}

/* ------------------------------ 6 flow nodes ------------------------------ */

function NodeGoogleAds({ reduced }) {
  const [ref, inView] = useInViewOnce(0.4);
  const ctr = useCountUp([3.2, 8.57], inView, 1200);
  return (
    <div ref={ref} className="h-full">
      <Card className="p-4" delay={0.05} floatOffset={0} reduced={reduced}>
        <div className="flex items-center gap-2 mb-3">
          <NodeNumber n={1} />
          <p className="text-sm font-semibold text-white leading-tight">Google Ads Campaigns</p>
        </div>
        <div className="flex items-center justify-between mb-3">
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-blue-500 to-yellow-400" />
          <Pill pulse>Active</Pill>
        </div>
        <div className="flex justify-between text-[10px] text-slate-400 mb-2">
          <span>Impressions <b className="text-white block text-[11px]">248K</b></span>
          <span>Clicks <b className="text-white block text-[11px]">12.4K</b></span>
        </div>
        <p className="text-[10px] text-slate-500">CTR</p>
        <p className="text-lg font-bold text-white flex items-center gap-1.5">
          {ctr.toFixed(2)}% <TrendingUp className="w-3.5 h-3.5 text-green-400" />
        </p>
      </Card>
    </div>
  );
}

function NodeLandingPage({ reduced }) {
  const [ref, inView] = useInViewOnce(0.4);
  return (
    <div ref={ref} className="h-full flex flex-col gap-3">
      <Card className="p-4" delay={0.1} floatOffset={0.15} reduced={reduced}>
        <div className="flex items-center gap-2 mb-3">
          <NodeNumber n={2} />
          <p className="text-sm font-semibold text-white leading-tight">Landing Page</p>
        </div>
        <div className="rounded-md overflow-hidden border border-white/10">
          <div className="flex gap-1 px-2 py-1.5 bg-black/30">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          </div>
          <div className="p-2.5 bg-[#0B1330]">
            <p className="text-[11px] font-semibold text-white">24/7 HVAC Repair Services</p>
            <p className="text-[10px] text-slate-400 mb-2">Fast. Reliable. Professional.</p>
            <span className="inline-block text-[10px] font-medium bg-blue-600 text-white px-2.5 py-1 rounded-md">Book Now</span>
          </div>
        </div>
      </Card>
      <Card className="p-4 flex-1" delay={0.16} floatOffset={0.45} reduced={reduced}>
        <div className="flex items-center gap-2.5 mb-3">
          <div className="relative w-10 h-10 shrink-0">
            <svg viewBox="0 0 40 40" className="w-10 h-10 -rotate-90">
              <circle cx="20" cy="20" r="16" fill="none" stroke="#1E293B" strokeWidth="4" />
              <motion.circle
                cx="20" cy="20" r="16" fill="none" stroke={COLORS.green} strokeWidth="4" strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 16}
                initial={{ strokeDashoffset: 2 * Math.PI * 16 }}
                animate={inView ? { strokeDashoffset: 2 * Math.PI * 16 * (1 - 0.92) } : {}}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-white">92</div>
          </div>
          <p className="text-[10px] text-slate-400">Page Score</p>
        </div>
        <ul className="space-y-1.5 text-[10px] text-slate-300">
          {["Fast Loading", "Mobile Friendly", "Clear CTA"].map((t) => (
            <li key={t} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" /> {t}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

function NodePhoneCalls({ reduced }) {
  return (
    <div className="h-full flex flex-col gap-3">
      <Card className="p-4" delay={0.16} floatOffset={0.6} reduced={reduced}>
        <div className="flex items-center gap-2 mb-3">
          <NodeNumber n={3} />
          <p className="text-sm font-semibold text-white leading-tight">Phone Calls</p>
        </div>
        <p className="text-[10px] text-slate-500">Incoming Call</p>
        <p className="text-[13px] font-bold text-white mb-2">214-555-0187</p>
        <p className="text-[10px] text-slate-400 mb-3">Dallas, TX</p>
        <div className="flex gap-2.5">
          <span className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center shrink-0">
            <PhoneOff className="w-4 h-4 text-white" />
          </span>
          <motion.span
            className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shrink-0"
            animate={reduced ? {} : { rotate: [0, -14, 12, -8, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
          >
            <Phone className="w-4 h-4 text-white" />
          </motion.span>
        </div>
      </Card>
      <Card className="p-4 flex-1" delay={0.22} floatOffset={0.9} reduced={reduced}>
        <Pill pulse>Call Tracking · Active</Pill>
        <ul className="space-y-1.5 text-[10px] text-slate-300 mt-3">
          {["Recording", "Duration", "Source"].map((t) => (
            <li key={t} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" /> {t}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

function NodeCRM({ reduced }) {
  return (
    <div className="h-full relative">
      {/* breathing glow — this is where the hot lead lands */}
      <motion.div
        className="pointer-events-none absolute -inset-2 rounded-2xl bg-yellow-400/10 blur-xl"
        animate={reduced ? {} : { opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <Card className="p-4" delay={0.26} floatOffset={0.25} reduced={reduced}>
        <div className="flex items-center gap-2 mb-3">
          <NodeNumber n={4} />
          <p className="text-sm font-semibold text-white leading-tight">CRM</p>
        </div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-[12px] font-semibold text-white">New Lead!</p>
          <Pill tone="yellow" pulse>Hot</Pill>
        </div>
        <dl className="text-[10px] text-slate-300 space-y-1.5">
          <div><dt className="text-slate-500 inline">Name </dt><dd className="inline text-white">John Smith</dd></div>
          <div><dt className="text-slate-500 inline">Phone </dt><dd className="inline text-white">(214) 555-0187</dd></div>
          <div><dt className="text-slate-500 inline">Service </dt><dd className="inline text-white">AC Repair</dd></div>
          <div><dt className="text-slate-500 inline">Location </dt><dd className="inline text-white">Dallas, TX</dd></div>
        </dl>
        <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-medium bg-green-500/15 text-green-400 px-2.5 py-1 rounded-md">
          <CheckCircle2 className="w-3.5 h-3.5" /> Lead Saved
        </span>
      </Card>
    </div>
  );
}

function NodeTechnician({ reduced }) {
  return (
    <div className="h-full flex flex-col gap-3">
      <Card className="p-4" delay={0.3} floatOffset={0.5} reduced={reduced}>
        <div className="flex items-center gap-2 mb-3">
          <NodeNumber n={5} />
          <p className="text-sm font-semibold text-white leading-tight">Technician</p>
        </div>
        <Pill pulse>Job Assigned · AC Repair</Pill>
      </Card>
      <Card className="p-4 flex-1" delay={0.34} floatOffset={0.75} reduced={reduced}>
        <div className="flex items-center gap-2.5 mb-3">
          <span className="w-9 h-9 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
            <Users className="w-4 h-4 text-blue-300" />
          </span>
          <p className="text-[10px] text-slate-300">On the way</p>
        </div>
        <div className="rounded-md bg-[#0B1330] border border-white/5 h-14 flex items-center justify-center gap-1.5">
          <MapPin className="w-4 h-4 text-yellow-400" />
          <span className="text-[10px] text-slate-400">ETA 25 mins</span>
        </div>
      </Card>
    </div>
  );
}

function NodeCustomer({ reduced }) {
  return (
    <div className="h-full">
      <Card className="p-4" delay={0.36} floatOffset={1.1} reduced={reduced}>
        <div className="flex items-center gap-2 mb-3">
          <NodeNumber n={6} />
          <p className="text-sm font-semibold text-white leading-tight">Customer</p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[10px] font-medium bg-green-500/15 text-green-400 px-2.5 py-1 rounded-md mb-3">
          <CheckCircle2 className="w-3.5 h-3.5" /> Service Completed
        </span>
        <div className="flex gap-0.5 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
          ))}
        </div>
        <p className="text-[10px] text-slate-300 italic leading-relaxed">
          "Great service, very professional. Highly recommended!"
        </p>
        <p className="text-[10px] text-slate-500 mt-1.5">— Michael T.</p>
      </Card>
    </div>
  );
}

function NodeRevenue({ reduced }) {
  const [ref, inView] = useInViewOnce(0.3);
  const revenue = useCountUp([0, 28450], inView, 1400);
  const cpl = useCountUp([46, 30.68], inView, 1400);
  const calls = useCountUp([0, 181], inView, 1400);
  const bars = [30, 42, 38, 55, 60, 78, 90];

  return (
    <div ref={ref} className="relative">
      <motion.div
        className="pointer-events-none absolute -inset-3 rounded-3xl bg-blue-500/10 blur-2xl"
        animate={reduced ? {} : { opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <Card className="p-5 sm:p-6" delay={0.4} floatOffset={0.2} reduced={reduced} elevated>
        <div className="flex items-center gap-2.5 mb-4">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-[11px] font-bold shadow-[0_0_0_3px_rgba(37,99,235,0.25)]">
            7
          </span>
          <p className="text-base font-semibold text-white leading-tight">More Revenue</p>
          <span className="text-[11px] text-slate-500">(Business Growth)</span>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-wrap gap-8">
            <div>
              <p className="text-[11px] text-slate-500 mb-0.5">Revenue Generated</p>
              <p className="text-2xl font-bold text-white tracking-tight">${Math.round(revenue).toLocaleString()}</p>
              <p className="text-[11px] text-green-400 flex items-center gap-1 mt-0.5"><TrendingUp className="w-3.5 h-3.5" /> +64.3%</p>
            </div>
            <div>
              <p className="text-[11px] text-slate-500 mb-0.5">Avg. Cost / Lead</p>
              <p className="text-2xl font-bold text-white tracking-tight">${cpl.toFixed(2)}</p>
              <p className="text-[11px] text-green-400 flex items-center gap-1 mt-0.5"><TrendingDown className="w-3.5 h-3.5" /> -27.4%</p>
            </div>
            <div>
              <p className="text-[11px] text-slate-500 mb-0.5">Booked Calls</p>
              <p className="text-2xl font-bold text-white tracking-tight">{Math.round(calls)}</p>
              <p className="text-[11px] text-green-400 flex items-center gap-1 mt-0.5"><TrendingUp className="w-3.5 h-3.5" /> +48.6%</p>
            </div>
          </div>
          <div className="flex items-end gap-1.5 h-14">
            {bars.map((h, i) => (
              <motion.div
                key={i}
                className="w-3 rounded-t bg-gradient-to-t from-green-500 to-green-300"
                initial={{ height: 0 }}
                animate={inView ? { height: h } : {}}
                transition={{ duration: 0.6, delay: i * 0.06, ease: "easeOut" }}
              />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

/* ------------------------ connector down to revenue ----------------------- */

function RevenueConnectors({ reduced }) {
  const [leftRef, leftSize] = useMeasure();
  const [rightRef, rightSize] = useMeasure();
  return (
    <div className="hidden md:block relative h-9">
      <div ref={leftRef} className="absolute left-[25%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-400/30 to-blue-400/40" />
      <div ref={rightRef} className="absolute right-[25%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-400/30 to-blue-400/40" />
      <div className="absolute left-[25%] right-[25%] bottom-0 h-px bg-blue-400/40" />

      {!reduced && (
        <>
          <div className="absolute left-[25%] top-0" style={{ transform: "translateX(-3px)" }}>
            <FlowParticles length={leftSize.height} axis="y" count={2} duration={1.8} />
          </div>
          <div className="absolute right-[25%] top-0" style={{ transform: "translateX(3px)" }}>
            <FlowParticles length={rightSize.height} axis="y" count={2} duration={1.8} baseStyle={{ animationDelay: "0.9s" }} />
          </div>
        </>
      )}
    </div>
  );
}

/* ------------------------------- bottom bar -------------------------------- */

function BottomStrip() {
  const items = [
    [Phone, "More Booked Calls"],
    [BarChart3, "Lower Cost / Lead"],
    [DollarSign, "Higher Revenue"],
  ];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-14 pt-8 border-t border-white/5 text-center"
    >
      <p className="text-white font-semibold text-lg sm:text-xl tracking-tight mb-5">
        Better Systems. More Calls. Bigger Growth.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {items.map(([Icon, label]) => (
          <span
            key={label}
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-300 border border-white/10 bg-white/[0.02] rounded-full px-4 py-2.5 hover:border-blue-400/30 transition-colors"
          >
            <Icon className="w-3.5 h-3.5 text-blue-400" /> {label}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ---------------------------------- main ----------------------------------- */

export default function GoogleAdsEcosystemHero({ photoSrc = "/founder.jpg" }) {
  const reduced = usePrefersReducedMotion();
  const { ref: parallaxRef, sx, sy, onMouseMove, onMouseLeave } = useParallax();

  const ecosystemRotateX = useTransform(sy, (v) => v * -3);
  const ecosystemRotateY = useTransform(sx, (v) => v * 3);

  return (
    <section
      className="relative w-full bg-[#070C18] px-4 sm:px-8 lg:px-12 py-14 lg:py-20 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{ background: `radial-gradient(1200px 500px at 70% 10%, ${COLORS.navy}55, transparent 70%)` }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{ background: `radial-gradient(800px 400px at 15% 80%, ${COLORS.blue}40, transparent 70%)` }}
      />

      <div className="relative max-w-[1500px] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-10">
        {/* ---------------- LEFT: character + copy — kept under 20% width ---------------- */}
        <div className="lg:w-[19%] shrink-0 flex flex-col items-center lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-center lg:text-left mb-7"
          >
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-[1.15] tracking-tight">
              I Build Google Ads Systems That{" "}
              <span className="text-yellow-400">Generate More Booked Calls.</span>
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed mt-4">
              From clicks to customers — I build high-converting Google Ads systems for HVAC contractors.
            </p>
            <ul className="mt-5 space-y-2 text-left inline-block">
              {["Google Ads Campaigns", "Conversion Tracking", "GTM & GA4 Setup", "Landing Page Optimization", "Call Tracking & CRM"].map(
                (t) => (
                  <li key={t} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" /> {t}
                  </li>
                )
              )}
            </ul>
          </motion.div>

          <FounderPhoto photoSrc={photoSrc} />
          <div className="mb-6 w-full">
            <CampaignPerformanceCard reduced={reduced} />
          </div>

          <div className="flex flex-col gap-2.5 w-full max-w-[260px] mx-auto lg:mx-0">
            <a
              href="#audit"
              className="text-center text-sm font-semibold bg-blue-600 hover:bg-blue-500 active:scale-[0.98] transition-all text-white rounded-lg py-3 shadow-[0_8px_24px_rgba(37,99,235,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070C18]"
            >
              Book Free Audit →
            </a>
            <a
              href="#whatsapp"
              className="text-center text-sm font-medium border border-white/15 hover:border-white/30 hover:bg-white/[0.03] transition-colors text-slate-200 rounded-lg py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070C18]"
            >
              WhatsApp Chat
            </a>
          </div>
        </div>

        {/* ---------------- RIGHT: the ecosystem — main attraction, ~80% ---------------- */}
        <motion.div
          ref={parallaxRef}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="flex-1 min-w-0"
          style={{
            rotateX: reduced ? 0 : ecosystemRotateX,
            rotateY: reduced ? 0 : ecosystemRotateY,
            transformStyle: "preserve-3d",
            transformPerspective: 1200,
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-center lg:text-left text-xl sm:text-2xl font-semibold text-white tracking-tight mb-7"
          >
            The HVAC Growth Ecosystem
          </motion.h2>

          <FlowRail count={6} reduced={reduced} />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-start">
            <NodeGoogleAds reduced={reduced} />
            <NodeLandingPage reduced={reduced} />
            <NodePhoneCalls reduced={reduced} />
            <NodeCRM reduced={reduced} />
            <NodeTechnician reduced={reduced} />
            <NodeCustomer reduced={reduced} />
          </div>

          <RevenueConnectors reduced={reduced} />

          <NodeRevenue reduced={reduced} />
        </motion.div>
      </div>

      <div className="relative max-w-[1500px] mx-auto">
        <BottomStrip />
      </div>
    </section>
  );
}
