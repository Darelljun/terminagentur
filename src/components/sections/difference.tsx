import { CalendarCheck2, Check, FileText, Minus, PhoneMissed } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "./section-heading";

const CLASSIC = ["Kontaktdaten", "Eigene Nachfassarbeit", "Unklare Abschlussrelevanz", "Ungewisse Terminquote"];
const KAYCO = [
  "Vereinbarte Termine",
  "Vorqualifizierte Interessenten",
  "Relevante Vorabinformationen",
  "Direkte Kalenderintegration",
  "Ergebnisorientiertes Vergütungsmodell",
];

export function Difference() {
  return (
    <section id="unterschied" aria-labelledby="unterschied-title" className="py-24 sm:py-36">
      <div className="container-kayco">
        <SectionHeading
          id="unterschied-title"
          eyebrow="Der Unterschied"
          title={
            <>
              Andere verkaufen Kontakte.
              <br className="hidden sm:block" /> <span className="serif-accent">Wir vereinbaren Gespräche.</span>
            </>
          }
          lead="Ein Lead ist ein Name mit Telefonnummer. Ein Termin ist eine verbindliche Verabredung mit einem Menschen, der beraten werden möchte. Genau dort setzen wir an."
        />

        <div className="mt-16 grid gap-4 lg:grid-cols-2">
          {/* Klassisch */}
          <Reveal className="flex flex-col rounded-[32px] bg-canvas p-7 sm:p-10">
            <p className="text-sm font-medium text-muted-foreground">Klassische Leadgenerierung</p>
            <p className="text-title mt-2 text-ink">Du bekommst Daten.</p>

            <div aria-hidden="true" className="mt-8 rounded-2xl bg-white/70 p-4 ring-1 ring-black/[0.05]">
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-2">
                  <span className="block h-2.5 w-28 rounded-full bg-black/10" />
                  <span className="block h-2 w-20 rounded-full bg-black/[0.07]" />
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-black/[0.05] px-2.5 py-1 text-[0.6875rem] font-medium text-muted-foreground">
                  <PhoneMissed className="size-3" />3 Anrufversuche
                </span>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">Status: nicht erreicht · erneut versuchen</p>
            </div>

            <ul className="mt-8 space-y-3.5">
              {CLASSIC.map((c) => (
                <li key={c} className="flex items-center gap-3 text-[1.0625rem] text-muted-foreground">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-black/[0.06]" aria-hidden="true">
                    <Minus className="size-3.5" strokeWidth={2} />
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* KAYCO */}
          <Reveal delay={0.12} className="relative flex flex-col overflow-hidden rounded-[32px] bg-ink p-7 text-white sm:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-40 -right-40 size-96 rounded-full bg-[radial-gradient(circle,rgb(47_191_133/0.22),transparent_65%)]"
            />
            <p className="relative text-sm font-medium text-white/60">KAYCO</p>
            <p className="text-title relative mt-2">Du bekommst Gespräche.</p>

            <div aria-hidden="true" className="relative mt-8 rounded-2xl bg-white/[0.07] p-4 ring-1 ring-white/10">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-[#2FBF85] text-ink">
                    <CalendarCheck2 className="size-[18px]" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">Beratungstermin bestätigt</p>
                    <p className="text-xs text-white/60">Dienstag, 14:00 Uhr · Altersvorsorge</p>
                  </div>
                </div>
              </div>
              <p className="mt-3 flex items-center gap-1.5 text-xs text-white/60">
                <FileText className="size-3" />
                Briefing mit Anliegen und Ausgangslage liegt bereit
              </p>
            </div>

            <ul className="relative mt-8 space-y-3.5">
              {KAYCO.map((c) => (
                <li key={c} className="flex items-center gap-3 text-[1.0625rem]">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#2FBF85] text-ink" aria-hidden="true">
                    <Check className="size-3.5" strokeWidth={2.5} />
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
