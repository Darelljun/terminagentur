"use client";

/**
 * Vorher/Nachher-Regler – adaptiert von „Compare Reveal“ (Motiq, MIT-Lizenz, via 21st.dev).
 * Feder-Physik für den Teiler, Intro-Schwenk beim ersten Erscheinen, vollständige
 * Tastaturbedienung (Pfeile, Shift+Pfeile, Pos1/Ende) und Touch-Support.
 * Angepasst an KAYCO-Tokens; ohne Feder und Schwenk bei reduzierter Bewegung.
 */

import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const K = 140;
const C = 18;
const SWEEP = 2.6;
const clamp = (v: number, lo = 0, hi = 100) => Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
function sweepAt(u: number) {
  if (u < 0.38) return lerp(50, 88, ease(u / 0.38));
  if (u < 0.78) return lerp(88, 12, ease((u - 0.38) / 0.4));
  return lerp(12, 50, ease((u - 0.78) / 0.22));
}

export function CompareReveal({
  before,
  after,
  labels,
  className,
  ariaLabel,
}: {
  before: ReactNode;
  after: ReactNode;
  labels: [string, string];
  className?: string;
  ariaLabel: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion() ?? false;
  const [pct, setPct] = useState(50);
  const sim = useRef({ x: 50, v: 0, target: 50, dragging: false, intro: false, introDone: false, introStart: 0 });
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const paint = useCallback(() => {
    const x = clamp(sim.current.x);
    if (topRef.current) topRef.current.style.clipPath = `inset(0 ${(100 - x).toFixed(2)}% 0 0)`;
    if (lineRef.current) lineRef.current.style.left = `${x.toFixed(2)}%`;
    handleRef.current?.setAttribute("aria-valuenow", String(Math.round(x)));
  }, []);

  useEffect(() => {
    paint();
    if (reduce || !onScreen) return;
    const s = sim.current;
    if (!s.introDone) {
      s.intro = true;
      s.introStart = performance.now() / 1000;
    }
    let raf = 0;
    let last = performance.now();
    const frame = (ts: number) => {
      const dt = Math.min(0.05, Math.max(0.001, (ts - last) / 1000));
      last = ts;
      if (s.intro) {
        const u = (ts / 1000 - s.introStart) / SWEEP;
        if (u >= 1) {
          s.intro = false;
          s.introDone = true;
        } else s.target = sweepAt(u);
      }
      s.v += ((s.target - s.x) * K - s.v * C) * dt;
      s.x = clamp(s.x + s.v * dt);
      paint();
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [reduce, onScreen, paint]);

  const commit = (next: number) => {
    const s = sim.current;
    s.intro = false;
    s.introDone = true;
    s.target = clamp(next);
    if (reduce) {
      s.x = s.target;
      paint();
    }
    setPct(Math.round(s.target));
  };

  const fromEvent = (clientX: number) => {
    const r = rootRef.current?.getBoundingClientRect();
    if (r) commit(((clientX - r.left) / Math.max(1, r.width)) * 100);
  };

  return (
    <div
      ref={rootRef}
      role="group"
      aria-label={ariaLabel}
      onPointerDown={(e) => {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        sim.current.dragging = true;
        e.currentTarget.setPointerCapture?.(e.pointerId);
        fromEvent(e.clientX);
      }}
      onPointerMove={(e) => sim.current.dragging && fromEvent(e.clientX)}
      onPointerUp={() => (sim.current.dragging = false)}
      onPointerCancel={() => (sim.current.dragging = false)}
      className={cn("relative cursor-ew-resize touch-pan-y overflow-hidden select-none", className)}
    >
      <div className="absolute inset-0">{after}</div>
      <div ref={topRef} className="absolute inset-0 will-change-[clip-path]" style={{ clipPath: "inset(0 50% 0 0)" }}>
        {before}
      </div>

      <span className="pointer-events-none absolute top-4 left-4 z-10 rounded-full bg-ink/80 px-3 py-1.5 text-[0.6875rem] font-semibold tracking-[0.08em] text-white uppercase backdrop-blur">
        {labels[0]}
      </span>
      <span className="pointer-events-none absolute top-4 right-4 z-10 rounded-full bg-signal px-3 py-1.5 text-[0.6875rem] font-semibold tracking-[0.08em] text-white uppercase">
        {labels[1]}
      </span>

      <div ref={lineRef} className="pointer-events-none absolute top-0 bottom-0 z-20 -ml-px w-0.5 bg-ink" style={{ left: "50%" }}>
        <button
          ref={handleRef}
          type="button"
          role="slider"
          aria-label={`Vergleich: ${labels[0]} gegenüber ${labels[1]}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
          aria-valuetext={`${pct} Prozent ${labels[0]}`}
          onKeyDown={(e) => {
            const step = e.shiftKey ? 10 : 2;
            const base = sim.current.target;
            const map: Record<string, number> = {
              ArrowRight: base + step,
              ArrowUp: base + step,
              ArrowLeft: base - step,
              ArrowDown: base - step,
              Home: 0,
              End: 100,
            };
            if (!(e.key in map)) return;
            e.preventDefault();
            commit(map[e.key]);
          }}
          className="pointer-events-auto absolute top-1/2 left-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full bg-white text-ink shadow-[0_8px_24px_-6px_rgb(0_0_0/0.35)] ring-1 ring-black/10"
        >
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
            <path d="M6 1 1 7l5 6M12 1l5 6-5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
