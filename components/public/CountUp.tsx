"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface CountUpProps {
  value: string;
  className?: string;
}

// Parses numeric portion out of a mixed string and animates it.
// e.g. "$28.50" -> prefix "$", 28.5, suffix "" ; "+310%" -> prefix "+", 310, suffix "%"
export function CountUp({ value, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const match = value.match(/^(-?[\d,.]+)/);
    if (!match) {
      setDisplay(value);
      return;
    }
    const prefix = value.slice(0, value.indexOf(match[1]));
    const suffix = value.slice(match[1].length);
    const raw = match[1].replace(/,/g, '');
    const hasDecimal = raw.includes('.');
    const decimals = hasDecimal ? raw.split('.')[1].length : 0;
    const target = parseFloat(raw);

    if (!inView) return;

    const duration = 1200;
    const start = performance.now();
    let raf = 0;

    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      const current = target * eased;
      const formatted = current.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
      setDisplay(`${prefix}${formatted}${suffix}`);
      if (p < 1) raf = requestAnimationFrame(step);
      else {
        // snap to final exact value
        const final = target.toLocaleString('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        });
        setDisplay(`${prefix}${final}${suffix}`);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
