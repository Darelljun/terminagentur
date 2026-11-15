"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { CalendarCheck2, Compass, Megaphone, MessagesSquare, UserCheck } from "lucide-react";
import { useRef } from "react";
import { EASE } from "@/components/motion/reveal";
import { SectionHeading } from "./section-heading";

const STEPS = [
  {
    icon: Compass,
    title: "Wir verstehen deinen Beratungsfokus",
    text: "Welche Themen berätst du, welche Menschen passen zu dir, in welcher Region bist du tätig? Daraus leiten wir ab, wen wir ansprechen.",
    tag: "Zielgruppe & Fokus",
  },
  {
    icon: Megaphone,
    title: "Wir entwickeln und betreuen deine Kampagne",
    text: "Wir erstellen die passende Kampagne für deine Zielgruppe und kümmern uns um die laufende Betreuung. Das Werbebudget trägst du – getrennt von unserer Vergütung.",
    tag: "Kampagne",
  },
  {
    icon: MessagesSquare,
    title: "Interessenten werden kontaktiert und qualifiziert",
    text: "Wir sprechen mit den Interessenten, klären ihr Anliegen und erfragen, was für ein sinnvolles Beratungsgespräch wichtig ist.",
    tag: "Qualifizierung",
  },
  {
    icon: UserCheck,
    title: "Passende Interessenten erhalten einen Termin",
    text: "Nur wer zu deinem Angebot passt und beraten werden möchte, bekommt einen festen Beratungstermin bei dir.",
    tag: "Terminvereinbarung",
  },
  {
    icon: CalendarCheck2,
    title: "Der Termin steht in deinem Kalender",
    text: "Mit dem Termin erhältst du ein kurzes Briefing: Anliegen, Ziel und relevante Ausgangslage. Du gehst vorbereitet ins Gespräch.",
    tag: "Kalender & Briefing",
  },
];

export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="ablauf" aria-labelledby="ablauf-title" className="bg-canvas py-24 sm:py-36">
      <div className="container-kayco grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            id="ablauf-title"
            eyebrow="So funktioniert KAYCO"
            title={
              <>
                Vom ersten Kontakt <span className="serif-accent">bis in deinen Kalender.</span>
              </>
            }
            lead="Fünf Schritte, eine klare Aufgabenteilung: Wir übernehmen die Akquise und Qualifizierung. Du übernimmst die Beratung."
          />
        </div>

        <ol ref={ref} className="relative">
          {/* Linie */}
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[21px] w-px bg-black/10" />
          <motion.span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[21px] w-px origin-top bg-ink"
            style={{ scaleY: reduce ? 1 : progress }}
          />
          {STEPS.map(({ icon: Icon, title, text, tag }, i) => {
            const last = i === STEPS.length - 1;
            return (
              <motion.li
                key={title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                transition={{ duration: 0.8, ease: EASE }}
                className="relative grid grid-cols-[44px_1fr] gap-5 pb-12 last:pb-0 sm:gap-7"
              >
                <span
                  className={
                    last
                      ? "relative z-10 flex size-11 items-center justify-center rounded-full bg-signal text-white ring-8 ring-canvas"
                      : "relative z-10 flex size-11 items-center justify-center rounded-full bg-white text-ink ring-1 ring-black/10 outline-8 outline-canvas outline-solid"
                  }
                >
                  <Icon className="size-[18px]" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <div className="rounded-3xl bg-white p-6 ring-1 ring-black/[0.05] sm:p-8">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-xs font-semibold text-muted-foreground tabular-nums">Schritt {i + 1}</span>
                    <span className="rounded-full bg-canvas px-2.5 py-0.5 text-xs font-medium text-muted-foreground">{tag}</span>
                  </div>
                  <h3 className="text-title mt-3 text-ink">{title}</h3>
                  <p className="mt-2.5 text-[0.9875rem] leading-relaxed text-muted-foreground">{text}</p>
                  {last && (
                    <div className="mt-6 flex items-center gap-3 rounded-2xl bg-signal-soft px-4 py-3" aria-hidden="true">
                      <CalendarCheck2 className="size-[18px] text-signal" strokeWidth={1.8} />
                      <p className="text-sm font-medium text-signal">Termin eingetragen · Briefing verfügbar</p>
                    </div>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
