"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CalendarCheck2, FileText, Inbox, ListChecks } from "lucide-react";
import { useEffect, useState } from "react";
import { EASE } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const DAYS = ["Mo", "Di", "Mi", "Do", "Fr"];
const START = 9;
const END = 18;

type Appt = { day: number; start: number; dur: number; topic: string; time: string };

const APPOINTMENTS: Appt[] = [
  { day: 0, start: 9.5, dur: 1, topic: "Altersvorsorge", time: "09:30" },
  { day: 0, start: 14, dur: 1, topic: "Baufinanzierung", time: "14:00" },
  { day: 1, start: 10, dur: 1, topic: "Vermögensaufbau", time: "10:00" },
  { day: 1, start: 15.5, dur: 1, topic: "Absicherung", time: "15:30" },
  { day: 2, start: 11, dur: 1, topic: "Altersvorsorge", time: "11:00" },
  { day: 2, start: 15, dur: 1, topic: "Immobilie", time: "15:00" },
  { day: 3, start: 9, dur: 1, topic: "Vermögensaufbau", time: "09:00" },
  { day: 3, start: 13.5, dur: 1, topic: "Baufinanzierung", time: "13:30" },
  { day: 4, start: 10.5, dur: 1, topic: "Absicherung", time: "10:30" },
  { day: 4, start: 14.5, dur: 1, topic: "Altersvorsorge", time: "14:30" },
];

const TOASTS = [
  { when: "Mi, 11:00", topic: "Altersvorsorge" },
  { when: "Do, 13:30", topic: "Baufinanzierung" },
  { when: "Fr, 10:30", topic: "Absicherung" },
  { when: "Di, 10:00", topic: "Vermögensaufbau" },
];

const STAGES = [
  { icon: Inbox, label: "Anfrage" },
  { icon: ListChecks, label: "Qualifiziert" },
  { icon: CalendarCheck2, label: "Termin" },
];

function Pipeline({ reduce }: { reduce: boolean }) {
  return (
    <div className="relative grid grid-cols-3 items-center">
      <div aria-hidden="true" className="absolute inset-x-[16%] top-1/2 h-px -translate-y-1/2 bg-border" />
      {!reduce && (
        <motion.span
          aria-hidden="true"
          className="absolute top-1/2 left-[16%] size-1.5 -translate-y-1/2 rounded-full bg-signal shadow-[0_0_0_4px_rgb(14_122_82/0.15)]"
          animate={{ left: ["16%", "84%"], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.6, times: [0, 0.1, 0.9, 1] }}
        />
      )}
      {STAGES.map(({ icon: Icon, label }, i) => (
        <div key={label} className="relative flex flex-col items-center gap-1.5">
          <span
            className={cn(
              "flex size-9 items-center justify-center rounded-full ring-1",
              i === 2 ? "bg-signal text-white ring-signal" : "bg-white text-ink ring-border",
            )}
          >
            <Icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
          </span>
          <span className="text-[0.6875rem] font-medium text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  );
}

export function HeroCalendar() {
  const reduce = useReducedMotion() ?? false;
  const [toast, setToast] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = window.setInterval(() => setToast((n) => (n + 1) % TOASTS.length), 3400);
    return () => window.clearInterval(t);
  }, [reduce]);

  const hours = Array.from({ length: END - START }, (_, i) => START + i);
  const pct = (h: number) => ((h - START) / (END - START)) * 100;

  return (
    <figure
      aria-label="Illustration: Eine Arbeitswoche, in der qualifizierte Beratungstermine eingetragen werden"
      className="relative mx-auto w-full max-w-[920px]"
    >
      <div className="glass shadow-float relative overflow-hidden rounded-[28px] ring-1 ring-black/[0.07] sm:rounded-[36px]">
        {/* Kopfzeile */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/80 px-5 py-4 sm:px-7">
          <div>
            <p className="text-[0.9375rem] font-semibold tracking-[-0.01em] text-ink">Deine Woche</p>
            <p className="text-xs text-muted-foreground">Beratungstermine, vereinbart durch KAYCO</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-signal-soft px-3 py-1.5 text-xs font-medium text-signal">
            <span className="size-1.5 rounded-full bg-signal" aria-hidden="true" />
            Ziel: mind. 30 Termine / Monat
          </span>
        </div>

        <div className="grid gap-0 md:grid-cols-[200px_1fr]">
          {/* Pipeline */}
          <div className="border-b border-border/80 px-5 py-5 md:border-r md:border-b-0 md:px-6 md:py-7">
            <p className="mb-4 text-[0.6875rem] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
              Vom Kontakt zum Termin
            </p>
            <Pipeline reduce={reduce} />
            <div className="mt-6 hidden space-y-2.5 md:block">
              {["Interesse geweckt", "Bedarf erfragt", "Termin bestätigt", "Briefing erstellt"].map((s, i) => (
                <motion.div
                  key={s}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + i * 0.15, duration: 0.6, ease: EASE }}
                  className="flex items-center gap-2.5 text-[0.8125rem] text-ink"
                >
                  <span className="flex size-4 items-center justify-center rounded-full bg-signal text-white" aria-hidden="true">
                    <svg viewBox="0 0 12 12" className="size-2.5">
                      <path d="M2.5 6.2 5 8.5l4.5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {s}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Kalender */}
          <div className="px-3 pt-4 pb-5 sm:px-6 sm:pt-5">
            <div className="grid grid-cols-[28px_repeat(5,1fr)] gap-x-1 sm:grid-cols-[40px_repeat(5,1fr)] sm:gap-x-2">
              <span />
              {DAYS.map((d) => (
                <span key={d} className="pb-2 text-center text-xs font-medium text-muted-foreground">
                  {d}
                </span>
              ))}
            </div>
            <div className="relative grid h-[260px] grid-cols-[28px_repeat(5,1fr)] gap-x-1 sm:h-[320px] sm:grid-cols-[40px_repeat(5,1fr)] sm:gap-x-2">
              {/* Stundenraster */}
              <div className="relative">
                {hours.map((h) => (
                  <span
                    key={h}
                    className="absolute right-1 -translate-y-1/2 text-[0.625rem] text-muted-foreground tabular-nums sm:right-2 sm:text-[0.6875rem]"
                    style={{ top: `${pct(h)}%` }}
                  >
                    {h}
                  </span>
                ))}
              </div>
              {DAYS.map((d, dayIndex) => (
                <div key={d} className="relative rounded-xl bg-black/[0.025]">
                  {hours.map((h) => (
                    <span key={h} aria-hidden="true" className="absolute inset-x-0 h-px bg-black/[0.04]" style={{ top: `${pct(h)}%` }} />
                  ))}
                  {APPOINTMENTS.filter((a) => a.day === dayIndex).map((a) => {
                    const order = APPOINTMENTS.indexOf(a);
                    return (
                      <motion.div
                        key={`${a.day}-${a.time}`}
                        initial={{ opacity: 0, scale: 0.92, y: 6 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.7 + order * 0.12, duration: 0.6, ease: EASE }}
                        className="absolute inset-x-0.5 overflow-hidden rounded-lg bg-white px-1.5 py-1 shadow-[0_1px_2px_rgb(0_0_0/0.06),0_4px_12px_-4px_rgb(0_0_0/0.10)] ring-1 ring-black/[0.05] sm:inset-x-1 sm:px-2 sm:py-1.5"
                        style={{ top: `${pct(a.start)}%`, height: `${(a.dur / (END - START)) * 100}%` }}
                      >
                        <span className="absolute inset-y-1 left-0.5 w-[2px] rounded-full bg-signal" aria-hidden="true" />
                        <p className="truncate pl-1 text-[0.5625rem] font-semibold text-ink sm:text-[0.6875rem]">{a.topic}</p>
                        <p className="hidden truncate pl-1 text-[0.625rem] text-muted-foreground tabular-nums sm:block">{a.time}</p>
                      </motion.div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Benachrichtigung */}
      <div className="pointer-events-none absolute -bottom-6 left-1/2 w-[min(92%,380px)] -translate-x-1/2 sm:-bottom-8 md:left-auto md:right-8 md:translate-x-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={toast}
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="glass shadow-float flex items-center gap-3 rounded-2xl px-4 py-3 ring-1 ring-black/[0.07]"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-signal text-white">
              <CalendarCheck2 className="size-[18px]" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.8125rem] font-semibold text-ink">Termin bestätigt · {TOASTS[toast].when}</p>
              <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                <FileText className="size-3" aria-hidden="true" />
                {TOASTS[toast].topic} · Briefing liegt bereit
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <figcaption className="sr-only">Illustration mit fiktiven Beispielterminen.</figcaption>
    </figure>
  );
}
