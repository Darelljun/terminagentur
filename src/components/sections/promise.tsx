"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { ShieldCheck } from "lucide-react";
import { useRef, useState } from "react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import { Chapter } from "./section-heading";

const TOTAL = 30;

const LEDGER: { k: string; v: React.ReactNode; big?: string }[] = [
  { k: "Garantie", big: "30", v: "Mindestens 30 qualifizierte Beratungstermine pro Monat." },
  {
    k: "Wenn nicht",
    v: "Erreichen wir die vereinbarte Mindestzahl in einem Garantiezeitraum nicht, entfällt unsere laufende Dienstleistungsvergütung für diesen Zeitraum.",
  },
  { k: "Einrichtung", big: "300 €", v: "Einmalig. Keine hohen Set-up-Kosten, keine versteckten Einrichtungsgebühren." },
  { k: "Werbebudget", v: "Trägst du selbst – klar getrennt von unserer Vergütung." },
  { k: "Laufende Vergütung", v: "Richtet sich nach den vereinbarten qualifizierten Terminen – nicht nach Leads." },
  { k: "Nicht von der Garantie erfasst", v: "Die einmalige Einrichtungspauschale und bereits eingesetztes Werbebudget." },
];

function SlotGrid({ filled }: { filled: number }) {
  return (
    <div className="grid grid-cols-5 gap-2 sm:gap-2.5" aria-hidden="true">
      {["Mo", "Di", "Mi", "Do", "Fr"].map((d) => (
        <span key={d} className="pb-1 text-center text-[0.625rem] font-medium tracking-[0.1em] text-white/40 uppercase">
          {d}
        </span>
      ))}
      {Array.from({ length: TOTAL }, (_, i) => {
        const on = i < filled;
        return (
          <span key={i} className="relative h-9 rounded-lg ring-1 ring-white/10 ring-inset sm:h-12 sm:rounded-xl">
            <motion.span
              className="absolute inset-0 rounded-[inherit] bg-[#2FBF85]"
              initial={false}
              animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.6 }}
              transition={{ type: "spring", stiffness: 420, damping: 30 }}
              style={{ boxShadow: on ? "0 0 24px -4px rgb(47 191 133 / 0.65)" : undefined }}
            />
          </span>
        );
      })}
    </div>
  );
}

export function Guarantee() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const [count, setCount] = useState(TOTAL);
  const [armed, setArmed] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce) return;
    if (!armed) setArmed(true);
    setCount(Math.max(0, Math.min(TOTAL, Math.round(v * 1.15 * TOTAL))));
  });
  const shown = reduce || !armed ? TOTAL : count;

  return (
    <section id="versprechen" data-nav-theme="dark" aria-labelledby="versprechen-title" className="relative overflow-x-clip bg-ink text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -top-60 right-[-10%] size-[900px] rounded-full bg-[radial-gradient(closest-side,rgb(47_191_133/0.16),transparent)]" />

      <div ref={ref} className="relative lg:h-[210vh]">
        <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center">
          <div className="container-kayco grid items-center gap-12 py-24 sm:py-32 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20 lg:py-0">
            <div>
              <Chapter n="06" label="Unser Versprechen" inverse />
              <h2 id="versprechen-title" className="mt-6">
                <span className="sr-only">30 qualifizierte Termine. Jeden Monat. Garantiert.</span>
                <span aria-hidden="true" className="flex items-end gap-4">
                  <span className="block w-[1.15em] text-[clamp(9rem,30vw,22rem)] leading-[0.78] font-semibold tracking-[-0.075em] text-white tabular-nums">
                    {shown}
                  </span>
                </span>
                <span aria-hidden="true" className="type-headline mt-6 block text-white">
                  qualifizierte Termine. <span className="serif-accent text-[#2FBF85]">Jeden Monat.</span>
                </span>
              </h2>
              <p className="type-lead mt-6 max-w-[34rem] text-white/65">
                Das ist unsere Termingarantie. Wir messen uns nicht an Klicks oder Leads, sondern an Gesprächen in deinem
                Kalender.
              </p>
            </div>

            <div className="rounded-[32px] bg-white/[0.04] p-5 ring-1 ring-white/10 sm:p-8">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-sm font-medium text-white/80">Dein Monat</p>
                <p className="text-sm text-white/50 tabular-nums">
                  <span className={cn("font-semibold", shown === TOTAL ? "text-[#2FBF85]" : "text-white")}>{shown}</span> / {TOTAL}
                </p>
              </div>
              <SlotGrid filled={shown} />
              <motion.p
                animate={{ opacity: shown === TOTAL ? 1 : 0.35 }}
                className="mt-6 flex items-center gap-2 text-sm text-white/80"
              >
                <ShieldCheck className="size-4 text-[#2FBF85]" aria-hidden="true" />
                Mindestzahl erreicht – so sieht unser Versprechen aus.
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      {/* Konditionen als Register */}
      <div className="container-kayco relative pb-24 sm:pb-36">
        <Reveal>
          <p className="text-[0.6875rem] font-semibold tracking-[0.14em] text-white/55 uppercase">Die Konditionen – transparent</p>
        </Reveal>
        <Stagger as="ul" className="mt-6 border-t border-white/10">
          {LEDGER.map((row) => (
            <StaggerItem
              as="li"
              key={row.k}
              className="grid gap-2 border-b border-white/10 py-6 sm:grid-cols-[13rem_minmax(0,1fr)] sm:items-baseline sm:gap-10 lg:grid-cols-[18rem_minmax(0,1fr)] sm:py-7"
            >
              <p className="text-sm font-medium text-white/55">{row.k}</p>
              <div className="flex items-baseline gap-5">
                {row.big && <span className="shrink-0 whitespace-nowrap text-[2rem] leading-none font-semibold tracking-[-0.04em] text-white tabular-nums sm:text-[2.5rem]">{row.big}</span>}
                <p className="text-[1.0625rem] leading-relaxed text-white/85">{row.v}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal>
          <p className="mt-6 max-w-[44rem] text-sm leading-relaxed text-white/50">
            Die genauen Bedingungen – etwa die Kriterien eines qualifizierten Termins und der Garantiezeitraum – halten wir vor
            Beginn gemeinsam schriftlich im Vertrag fest.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
