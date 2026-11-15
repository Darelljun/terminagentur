"use client";

import { AnimatePresence, LayoutGroup, motion, useInView, useReducedMotion } from "motion/react";
import { CalendarCheck2, FileText, Home, Pause, Play, Sparkles, Target, Users, Briefcase } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { EASE } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ Daten -- */

const STEPS = [
  { label: "Anfrage", hint: "Interesse geht ein" },
  { label: "Qualifizierung", hint: "Bedarf wird geklärt" },
  { label: "Angaben", hint: "Briefing entsteht" },
  { label: "Bestätigung", hint: "Termin wird fixiert" },
  { label: "Kalender", hint: "Slot ist gebucht" },
] as const;

const DURATION = [2600, 3400, 3400, 2600, 4200];

const DAYS = ["Mo", "Di", "Mi", "Do", "Fr"];
const START = 8;
const END = 18;
const TARGET = { day: 1, start: 14, dur: 1 };

const EXISTING = [
  { day: 0, start: 9, dur: 1, t: "Beratung", time: "09:00" },
  { day: 0, start: 11.5, dur: 1, t: "Beratung", time: "11:30" },
  { day: 1, start: 9.5, dur: 1, t: "Beratung", time: "09:30" },
  { day: 2, start: 10, dur: 1, t: "Beratung", time: "10:00" },
  { day: 2, start: 15, dur: 1, t: "Beratung", time: "15:00" },
  { day: 3, start: 9.5, dur: 1, t: "Beratung", time: "09:30" },
  { day: 4, start: 11, dur: 1, t: "Beratung", time: "11:00" },
];

const pct = (h: number) => ((h - START) / (END - START)) * 100;

/* ---------------------------------------------------------- Kartenszenen -- */

function CallBars() {
  return (
    <span className="flex h-3.5 items-end gap-[2px]" aria-hidden="true">
      {[0.5, 1, 0.7, 0.9, 0.4].map((h, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-signal"
          animate={{ scaleY: [h, 1, h * 0.6, 1, h] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" }}
          style={{ height: "100%", originY: 1 }}
        />
      ))}
    </span>
  );
}

function Check({ delay = 0 }: { delay?: number }) {
  return (
    <motion.span
      initial={{ scale: 0.4, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, type: "spring", stiffness: 500, damping: 28 }}
      className="flex size-[18px] shrink-0 items-center justify-center rounded-full bg-signal text-white"
      aria-hidden="true"
    >
      <svg viewBox="0 0 12 12" className="size-2.5">
        <path d="M2.5 6.2 5 8.5l4.5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.span>
  );
}

const fade = {
  initial: { opacity: 0, y: 8, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -6, filter: "blur(4px)" },
  transition: { duration: 0.45, ease: EASE },
};

function Person({ badge }: { badge: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-canvas text-[0.8125rem] font-semibold text-ink ring-1 ring-black/5">
        LM
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[0.9375rem] font-semibold tracking-[-0.01em] text-ink">Lena M.</p>
        <p className="truncate text-xs text-muted-foreground">Interesse: Altersvorsorge</p>
      </div>
      {badge}
    </div>
  );
}

function CardScene({ step }: { step: number }) {
  if (step === 0)
    return (
      <motion.div key="s0" {...fade}>
        <Person
          badge={
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-ink px-2.5 py-1 text-[0.6875rem] font-medium text-white">
              <span className="relative flex size-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-[#2FBF85]" />
                <span className="relative size-1.5 rounded-full bg-[#2FBF85]" />
              </span>
              Neu
            </span>
          }
        />
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-xl bg-canvas px-3 py-2">
            <p className="text-muted-foreground">Quelle</p>
            <p className="mt-0.5 font-medium text-ink">Kampagne</p>
          </div>
          <div className="rounded-xl bg-canvas px-3 py-2">
            <p className="text-muted-foreground">Eingang</p>
            <p className="mt-0.5 font-medium text-ink">gerade eben</p>
          </div>
        </div>
      </motion.div>
    );
  if (step === 1)
    return (
      <motion.div key="s1" {...fade}>
        <Person
          badge={
            <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-signal-soft px-2.5 py-1 text-[0.6875rem] font-medium text-signal">
              <CallBars />
              Gespräch
            </span>
          }
        />
        <ul className="mt-4 space-y-2.5 text-[0.8125rem] text-ink">
          {["Persönlich erreicht", "Beratungsbedarf bestätigt", "Passt zu deinem Fokus"].map((t, i) => (
            <motion.li
              key={t}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.6, duration: 0.4, ease: EASE }}
              className="flex items-center gap-2.5"
            >
              <Check delay={0.45 + i * 0.6} />
              {t}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    );
  if (step === 2)
    return (
      <motion.div key="s2" {...fade}>
        <div className="flex items-center justify-between">
          <p className="text-[0.6875rem] font-semibold tracking-[0.08em] text-muted-foreground uppercase">Terminbriefing</p>
          <span className="inline-flex items-center gap-1 text-[0.6875rem] font-medium text-signal">
            <Sparkles className="size-3" aria-hidden="true" />
            strukturiert
          </span>
        </div>
        <dl className="mt-3 space-y-2">
          {[
            [Briefcase, "Beruf", "Angestellt · Projektmanagerin"],
            [Users, "Familie", "Verheiratet · zwei Kinder"],
            [Home, "Wohnen", "Miete · Eigentum geplant"],
            [Target, "Ziel", "Überblick Altersvorsorge"],
          ].map(([Icon, k, v], i) => {
            const I = Icon as typeof Briefcase;
            return (
              <motion.div
                key={k as string}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.35, duration: 0.45, ease: EASE }}
                className="flex items-center gap-2.5 rounded-xl bg-canvas px-3 py-2"
              >
                <I className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                <dt className="w-14 shrink-0 text-xs text-muted-foreground">{k as string}</dt>
                <dd className="truncate text-[0.8125rem] font-medium text-ink">{v as string}</dd>
              </motion.div>
            );
          })}
        </dl>
      </motion.div>
    );
  return (
    <motion.div key="s3" {...fade} className="flex flex-col items-center py-2 text-center">
      <svg viewBox="0 0 52 52" className="size-14" aria-hidden="true">
        <motion.circle
          cx="26"
          cy="26"
          r="24"
          fill="none"
          stroke="var(--signal)"
          strokeWidth="2.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, ease: EASE }}
        />
        <motion.path
          d="M16 27l7 7 13-15"
          fill="none"
          stroke="var(--signal)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.5, duration: 0.45, ease: EASE }}
        />
      </svg>
      <p className="mt-3 text-[1.0625rem] font-semibold tracking-[-0.015em] text-ink">Termin bestätigt</p>
      <p className="mt-0.5 text-sm text-muted-foreground">Dienstag, 14:00 Uhr · Lena M.</p>
      <div className="mt-4 flex flex-wrap justify-center gap-1.5 text-[0.6875rem] font-medium">
        <span className="rounded-full bg-canvas px-2.5 py-1 text-ink">Altersvorsorge</span>
        <span className="rounded-full bg-canvas px-2.5 py-1 text-ink">Briefing angehängt</span>
      </div>
    </motion.div>
  );
}

/* --------------------------------------------------------------- Bühne -- */

export function LiveDesk() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px -10% 0px" });
  const reduce = useReducedMotion() ?? false;
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [cycle, setCycle] = useState(0);
  const autoplay = playing && inView && !reduce;
  const shownStep = reduce && playing ? 4 : step;

  useEffect(() => {
    if (!autoplay) return;
    const t = window.setTimeout(() => {
      if (step === STEPS.length - 1) setCycle((c) => c + 1);
      setStep((step + 1) % STEPS.length);
    }, DURATION[step]);
    return () => window.clearTimeout(t);
  }, [autoplay, step]);

  const select = (i: number) => {
    if (step === STEPS.length - 1 && i < step) setCycle((c) => c + 1);
    setStep(i);
    setPlaying(false);
  };

  const booked = shownStep === 4;

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[1120px]">
      <LayoutGroup id="live-desk">
        <div className="grid gap-3 lg:grid-cols-[248px_minmax(0,1fr)] lg:gap-4">
          {/* Schrittleiste */}
          <div className="glass relative flex flex-col rounded-[24px] p-2 ring-1 ring-black/[0.06] lg:rounded-[28px] lg:p-3">
            <div className="flex items-center justify-between px-2 pt-1 pb-2 lg:px-2 lg:pb-3">
              <p className="text-[0.6875rem] font-semibold tracking-[0.1em] text-muted-foreground uppercase">Live-Demo</p>
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Demo anhalten" : "Demo abspielen"}
                className="flex size-9 cursor-pointer items-center justify-center rounded-full text-ink transition-colors hover:bg-black/5"
              >
                {playing ? <Pause className="size-3.5" aria-hidden="true" /> : <Play className="size-3.5" aria-hidden="true" />}
              </button>
            </div>
            <ol className="grid grid-cols-5 gap-1 lg:grid-cols-1 lg:gap-0.5">
              {STEPS.map((s, i) => {
                const active = i === shownStep;
                const done = i < shownStep;
                return (
                  <li key={s.label}>
                    <button
                      type="button"
                      onClick={() => select(i)}
                      aria-pressed={active}
                      className={cn(
                        "group relative flex min-h-12 w-full cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-2xl px-1 py-2 text-left transition-colors lg:justify-start lg:px-3 lg:py-3",
                        active ? "bg-white shadow-[0_1px_2px_rgb(0_0_0/0.06),0_8px_20px_-12px_rgb(0_0_0/0.25)]" : "hover:bg-white/60",
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-7 shrink-0 items-center justify-center rounded-full text-[0.6875rem] font-semibold tabular-nums transition-colors",
                          active ? "bg-ink text-white" : done ? "bg-signal text-white" : "bg-black/[0.06] text-muted-foreground",
                        )}
                      >
                        {done ? <CheckGlyph /> : i + 1}
                      </span>
                      <span className="sr-only min-w-0 lg:not-sr-only lg:block lg:text-left">
                        <span className={cn("block truncate text-[0.6875rem] font-medium lg:text-sm", active ? "text-ink" : "text-muted-foreground")}>
                          {s.label}
                        </span>
                        <span className="block text-xs text-muted-foreground">{s.hint}</span>
                      </span>
                      {active && autoplay && (
                        <motion.span
                          key={`bar-${step}`}
                          aria-hidden="true"
                          className="absolute inset-x-3 bottom-1 h-[2px] origin-left rounded-full bg-ink/80"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: DURATION[step] / 1000, ease: "linear" }}
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ol>
            <p className="px-2 pt-2 pb-1 text-center text-[0.8125rem] lg:hidden" aria-live="polite">
              <span className="font-semibold text-ink">{STEPS[shownStep].label}</span>
              <span className="text-muted-foreground"> · {STEPS[shownStep].hint}</span>
            </p>
            <div className="mt-auto hidden rounded-2xl bg-white/70 p-4 ring-1 ring-black/[0.04] lg:block">
              <span className="block h-3 w-5 rounded-[4px] bg-signal" aria-hidden="true" />
              <p className="mt-3 text-[0.8125rem] leading-snug text-ink">Du siehst nur das Ergebnis:</p>
              <p className="text-[0.8125rem] leading-snug text-muted-foreground">einen bestätigten Termin mit Briefing.</p>
            </div>
          </div>

          {/* Kalender */}
          <div className="shadow-float relative overflow-hidden rounded-[28px] bg-white ring-1 ring-black/[0.06] lg:rounded-[32px]">
            <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3.5 sm:px-6">
              <div className="flex items-center gap-3">
                <CalendarCheck2 className="size-[18px] text-ink" strokeWidth={1.7} aria-hidden="true" />
                <p className="text-sm font-semibold tracking-[-0.01em] text-ink">Dein Kalender</p>
                <span className="hidden rounded-md bg-canvas px-1.5 py-0.5 text-[0.625rem] font-semibold tracking-[0.08em] text-muted-foreground uppercase sm:inline">
                  Demo · fiktive Daten
                </span>
              </div>
              <p className="text-xs text-muted-foreground tabular-nums">
                Beratungen diese Woche{" "}
                <motion.span key={booked ? "b" : "n"} initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="inline-block font-semibold text-ink">
                  {EXISTING.length + (booked ? 1 : 0)}
                </motion.span>
              </p>
            </div>

            <div className="relative px-2 pt-3 pb-4 sm:px-5">
              <div className="grid grid-cols-[30px_repeat(3,minmax(0,1fr))] gap-x-1.5 sm:grid-cols-[38px_repeat(5,minmax(0,1fr))] sm:gap-x-2">
                <span />
                {DAYS.map((d, i) => (
                  <span key={d} className={cn("pb-2 text-center text-xs font-medium", i === 1 ? "text-ink" : "text-muted-foreground", i > 2 && "hidden sm:block")}>
                    {d}
                  </span>
                ))}
              </div>

              <div
                className="relative grid h-[300px] grid-cols-[30px_repeat(3,minmax(0,1fr))] gap-x-1.5 sm:h-[400px] sm:grid-cols-[38px_repeat(5,minmax(0,1fr))] sm:gap-x-2"
              >
                <div className="relative">
                  {Array.from({ length: END - START }, (_, i) => START + i).map((h) => (
                    <span key={h} className="absolute right-1.5 -translate-y-1/2 text-[0.625rem] text-muted-foreground tabular-nums" style={{ top: `${pct(h)}%` }}>
                      {String(h).padStart(2, "0")}
                    </span>
                  ))}
                </div>
                {DAYS.map((d, dayIndex) => (
                  <div key={d} className={cn("relative rounded-xl bg-canvas/70", dayIndex > 2 && "hidden sm:block")}>
                    {Array.from({ length: END - START }, (_, i) => START + i).map((h) => (
                      <span key={h} aria-hidden="true" className="absolute inset-x-0 h-px bg-black/[0.045]" style={{ top: `${pct(h)}%` }} />
                    ))}
                    {EXISTING.filter((a) => a.day === dayIndex).map((a) => (
                      <div
                        key={a.time + a.day}
                        className="absolute inset-x-1 rounded-lg bg-white px-2 py-1.5 ring-1 ring-black/[0.05]"
                        style={{ top: `${pct(a.start)}%`, height: `${(a.dur / (END - START)) * 100}%` }}
                      >
                        <span className="absolute inset-y-1.5 left-1 w-[2px] rounded-full bg-black/15" aria-hidden="true" />
                        <p className="truncate pl-1.5 text-[0.625rem] font-medium text-ink sm:text-[0.6875rem]">{a.t}</p>
                        <p className="hidden truncate pl-1.5 text-[0.625rem] text-muted-foreground tabular-nums sm:block">{a.time}</p>
                      </div>
                    ))}
                  </div>
                ))}
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-[5] bg-white/45 backdrop-saturate-[0.4]"
                  initial={false}
                  animate={{ opacity: booked ? 0 : 1 }}
                  transition={{ duration: 0.6, ease: EASE }}
                />
              </div>

              {/* Ziel-Slot im Kalender */}
              <div className="pointer-events-none absolute inset-x-2 top-[calc(0.75rem+1.75rem)] bottom-4 grid grid-cols-[30px_repeat(3,minmax(0,1fr))] gap-x-1.5 sm:inset-x-5 sm:grid-cols-[38px_repeat(5,minmax(0,1fr))] sm:gap-x-2">
                <span />
                <span />
                <div className="relative">
                  {!booked && (
                    <div
                      className="absolute inset-x-1 rounded-lg border border-dashed border-signal/40"
                      style={{ top: `${pct(TARGET.start)}%`, height: `${(TARGET.dur / (END - START)) * 100}%` }}
                      aria-hidden="true"
                    />
                  )}
                  {booked && (
                    <motion.div
                      layoutId={`live-item-${cycle}`}
                      transition={{ type: "spring", stiffness: 260, damping: 30 }}
                      className="absolute inset-x-0.5 z-10 overflow-hidden rounded-lg bg-signal px-2 py-1.5 text-white shadow-[0_10px_30px_-8px_rgb(14_122_82/0.6)]"
                      style={{ top: `${pct(TARGET.start)}%`, height: `${(TARGET.dur / (END - START)) * 100}%` }}
                    >
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
                        <p className="truncate text-[0.625rem] font-semibold sm:text-[0.6875rem]">Lena M.</p>
                        <p className="flex items-center gap-1 truncate text-[0.625rem] text-white/80">
                          <FileText className="size-2.5 shrink-0" aria-hidden="true" />
                          14:00
                        </p>
                      </motion.div>
                      {!reduce && (
                        <motion.span
                          aria-hidden="true"
                          className="absolute inset-0 rounded-lg ring-2 ring-signal"
                          initial={{ opacity: 0.9, scale: 1 }}
                          animate={{ opacity: 0, scale: 1.35 }}
                          transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
                        />
                      )}
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Schwebende Live-Karte */}
              <AnimatePresence>
                {!booked && (
                  <motion.div
                    layoutId={`live-item-${cycle}`}
                    initial={{ opacity: 0, y: -24, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 30 }}
                    className="absolute inset-x-0 top-6 z-20 mx-auto w-[min(88%,330px)] overflow-hidden rounded-[22px] bg-white p-4 shadow-[0_2px_4px_rgb(0_0_0/0.04),0_30px_60px_-20px_rgb(0_0_0/0.35)] ring-1 ring-black/[0.06] sm:top-10 sm:right-auto sm:left-[18%] sm:mx-0 sm:p-5"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <CardScene step={shownStep} />
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bestätigungs-Toast */}
              <AnimatePresence>
                {booked && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ delay: 0.55, duration: 0.5, ease: EASE }}
                    className="glass absolute right-3 bottom-6 left-3 z-20 flex items-center gap-3 rounded-2xl p-3 shadow-[0_20px_40px_-16px_rgb(0_0_0/0.3)] ring-1 ring-black/[0.06] sm:right-6 sm:left-auto sm:w-[340px]"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-signal text-white">
                      <CalendarCheck2 className="size-[18px]" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-[0.8125rem] font-semibold text-ink">Neuer Termin · Di, 14:00 Uhr</p>
                      <p className="truncate text-xs text-muted-foreground">Briefing zu Lena M. liegt bereit</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </LayoutGroup>
    </div>
  );
}

function CheckGlyph() {
  return (
    <svg viewBox="0 0 12 12" className="size-3" aria-hidden="true">
      <path d="M2.5 6.2 5 8.5l4.5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
