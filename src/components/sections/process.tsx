"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useRef, useState } from "react";
import { EASE, Reveal } from "@/components/motion/reveal";
import { PROCESS_VISUALS } from "@/components/visuals/process-visuals";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

const STEPS = [
  {
    title: "Wir verstehen deinen Beratungsfokus",
    text: "Welche Themen berätst du, welche Menschen passen zu dir, wo bist du tätig? Daraus leiten wir ab, wen wir ansprechen.",
  },
  {
    title: "Wir entwickeln und betreuen deine Kampagne",
    text: "Wir erstellen die passende Kampagne und kümmern uns um die laufende Betreuung. Das Werbebudget trägst du – getrennt von unserer Vergütung.",
  },
  {
    title: "Interessenten werden kontaktiert und qualifiziert",
    text: "Wir sprechen mit den Interessenten, klären ihr Anliegen und erfragen, was für ein sinnvolles Beratungsgespräch wichtig ist.",
  },
  {
    title: "Passende Interessenten erhalten einen Termin",
    text: "Nur wer zu deinem Angebot passt und beraten werden möchte, bekommt einen festen Beratungstermin bei dir.",
  },
  {
    title: "Der Termin steht in deinem Kalender",
    text: "Mit dem Termin erhältst du ein kurzes Briefing: Anliegen, Ziel und relevante Ausgangslage. Du gehst vorbereitet ins Gespräch.",
  },
];

const heading = (id: string) => (
  <SectionHeading
    id={id}
    chapter="04"
    eyebrow="So funktioniert KAYCO"
    title={
      <>
        Fünf Schritte. <span className="serif-accent">Ein Termin.</span>
      </>
    }
    lead="Wir übernehmen Akquise und Qualifizierung. Du übernimmst die Beratung."
  />
);

/** Desktop: Sticky-Szene, gesteuert vom Scrollfortschritt. */
function DesktopScene() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const bar = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(STEPS.length - 1, Math.floor(v * STEPS.length))));
  const Visual = PROCESS_VISUALS[active];

  return (
    <div ref={ref} className="relative hidden h-[420vh] lg:block">
      <div className="sticky top-0 flex h-screen items-center">
        <div className="container-kayco grid w-full grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-center gap-16">
          <div>
            {heading("ablauf-title")}
            <ol className="relative mt-12 space-y-1 pl-6">
              <span aria-hidden="true" className="absolute top-2 bottom-2 left-0 w-px bg-black/10" />
              <motion.span aria-hidden="true" className="absolute top-2 bottom-2 left-0 w-px origin-top bg-ink" style={{ scaleY: bar }} />
              {STEPS.map((s, i) => (
                <li key={s.title} className="relative">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute top-[0.6rem] -left-[1.72rem] size-2.5 rounded-full ring-4 ring-canvas transition-colors duration-300",
                      i <= active ? (i === STEPS.length - 1 && i === active ? "bg-signal" : "bg-ink") : "bg-black/15",
                    )}
                  />
                  <p className={cn("text-lg font-semibold tracking-[-0.02em] transition-colors duration-300", i === active ? "text-ink" : "text-[#6e6e73]")}>
                    <span className="mr-3 text-xs tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </p>
                  {/* Höhe per CSS-Grid (0fr → 1fr): keine DOM-Messung, unterbricht kein Scrollen */}
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-premium)] motion-reduce:transition-none",
                      i === active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <p className="overflow-hidden pl-8 text-[0.9875rem] leading-relaxed text-muted-foreground">
                      <span className="block pt-2 pb-3">{s.text}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative flex h-[560px] items-center justify-center overflow-hidden rounded-[40px] bg-white ring-1 ring-black/[0.05]">
            <div aria-hidden="true" className="hairline-grid absolute inset-0 opacity-60" />
            <div aria-hidden="true" className="absolute top-6 left-6 text-[7rem] leading-none font-semibold tracking-[-0.06em] text-black/[0.04] tabular-nums">
              {String(active + 1).padStart(2, "0")}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 24, scale: 0.97, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, scale: 0.98, filter: "blur(6px)" }}
                transition={{ duration: 0.5, ease: EASE }}
                className="relative flex w-full justify-center px-10"
                aria-hidden="true"
              >
                <Visual />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Mobil/Tablet: gestapelte Szenen. */
function StackedScene() {
  return (
    <div className="py-24 sm:py-32 lg:hidden">
      <div className="container-kayco">
        {heading("ablauf-title-mobil")}
        <ol className="mt-14 space-y-14">
          {STEPS.map((s, i) => {
            const Visual = PROCESS_VISUALS[i];
            return (
              <li key={s.title}>
                <Reveal>
                  <p className="text-xs font-semibold text-muted-foreground tabular-nums">Schritt {String(i + 1).padStart(2, "0")}</p>
                  <h3 className="type-title mt-2 text-ink">{s.title}</h3>
                  <p className="mt-2 text-[0.9875rem] leading-relaxed text-muted-foreground">{s.text}</p>
                </Reveal>
                <Reveal delay={0.08} className="mt-6 flex justify-center rounded-[28px] bg-white px-4 py-8 ring-1 ring-black/[0.05]">
                  <div aria-hidden="true" className="flex w-full justify-center">
                    <Visual />
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export function Process() {
  return (
    <section id="ablauf" aria-labelledby="ablauf-title" className="relative bg-canvas">
      <DesktopScene />
      <StackedScene />
    </section>
  );
}
