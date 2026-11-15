import { ArrowRight, CalendarCheck2, Clock, FileText, Minus, Check, UserRound } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "./section-heading";

const ROWS: [string, string][] = [
  ["Kontaktdaten", "Vereinbarte Termine"],
  ["Eigene Nachfassarbeit", "Vorqualifizierte Interessenten"],
  ["Unklare Abschlussrelevanz", "Relevante Vorabinformationen"],
  ["Ungewisse Terminquote", "Direkte Kalenderintegration"],
  ["Vergütung pro Lead", "Ergebnisorientiertes Vergütungsmodell"],
];

function LeadArtifact() {
  return (
    <div className="overflow-hidden rounded-[24px] bg-white ring-1 ring-black/[0.06]" aria-hidden="true">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="size-2.5 rounded-full bg-black/10" />
        <span className="size-2.5 rounded-full bg-black/10" />
        <span className="size-2.5 rounded-full bg-black/10" />
        <span className="ml-2 text-xs text-muted-foreground">leads_export.csv</span>
      </div>
      <div className="overflow-hidden px-4 py-4 text-[0.75rem] leading-relaxed text-muted-foreground tabular-nums">
        <div className="grid grid-cols-[1.1fr_1.2fr_0.9fr] gap-3 border-b border-dashed border-border pb-2 font-semibold text-ink/70">
          <span>Name</span>
          <span>Telefon</span>
          <span>Status</span>
        </div>
        {[
          ["M. Schneider", "0151 ••• 2291", "offen"],
          ["K. Yilmaz", "0176 ••• 0834", "Mailbox"],
          ["J. Becker", "0160 ••• 5517", "2 Versuche"],
        ].map(([n, t, s]) => (
          <div key={n} className="grid grid-cols-[1.1fr_1.2fr_0.9fr] gap-3 border-b border-dashed border-border py-2 last:border-0">
            <span className="truncate">{n}</span>
            <span className="truncate">{t}</span>
            <span className="truncate">{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AppointmentArtifact() {
  return (
    <div className="overflow-hidden rounded-[24px] bg-white shadow-[0_30px_60px_-24px_rgb(14_122_82/0.45)] ring-1 ring-signal/30" aria-hidden="true">
      <div className="flex items-center gap-3 bg-signal px-4 py-3.5 text-white">
        <CalendarCheck2 className="size-[18px]" strokeWidth={1.8} />
        <p className="text-sm font-semibold">Beratung · Altersvorsorge</p>
        <span className="ml-auto rounded-full bg-white/20 px-2 py-0.5 text-[0.6875rem] font-medium">Bestätigt</span>
      </div>
      <div className="space-y-2.5 px-4 py-4 text-[0.8125rem] text-ink">
        <p className="flex items-center gap-2.5">
          <Clock className="size-3.5 text-muted-foreground" />
          Dienstag, 14:00 – 15:00 Uhr
        </p>
        <p className="flex items-center gap-2.5">
          <UserRound className="size-3.5 text-muted-foreground" />
          Lena M. · hat zugesagt
        </p>
        <div className="rounded-xl bg-canvas p-3">
          <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <FileText className="size-3" />
            Briefing
          </p>
          <p className="mt-1 text-[0.8125rem]">Angestellt · verheiratet, zwei Kinder · möchte Überblick über ihre Vorsorge.</p>
        </div>
      </div>
    </div>
  );
}

export function Difference() {
  return (
    <section id="unterschied" aria-labelledby="unterschied-title" className="relative bg-canvas py-24 sm:py-40">
      <div className="container-kayco">
        <SectionHeading
          id="unterschied-title"
          chapter="02"
          eyebrow="Der Unterschied"
          title={
            <>
              Ein Lead ist ein Datensatz. <span className="serif-accent">Ein Termin ist ein Gespräch.</span>
            </>
          }
          lead="Andere Agenturen verkaufen Kontaktdaten und überlassen dir die eigentliche Arbeit. Wir gehen den Schritt weiter – bis in deinen Kalender."
        />

        {/* Artefakte */}
        <div className="mt-16 grid items-center gap-6 sm:mt-20 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-8">
          <Reveal>
            <p className="mb-4 text-sm font-medium text-muted-foreground">Was du bei einem Lead bekommst</p>
            <div className="opacity-90 grayscale">
              <LeadArtifact />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold tracking-[0.14em] text-white">
              KAYCO
              <ArrowRight className="size-4 rotate-90 lg:rotate-0" aria-hidden="true" />
            </span>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mb-4 text-sm font-medium text-ink">Was du mit KAYCO bekommst</p>
            <AppointmentArtifact />
          </Reveal>
        </div>

        {/* Gegenüberstellung als Register */}
        <Reveal className="mt-16 overflow-hidden rounded-[28px] bg-white ring-1 ring-black/[0.05] sm:mt-20">
          <div className="grid grid-cols-2 border-b border-border text-sm font-semibold">
            <p className="px-4 py-4 text-muted-foreground sm:px-8 sm:py-5">Klassische Leadgenerierung</p>
            <p className="border-l border-border px-4 py-4 text-ink sm:px-8 sm:py-5">KAYCO</p>
          </div>
          <Stagger as="ul">
            {ROWS.map(([a, b]) => (
              <StaggerItem as="li" key={b} className="grid grid-cols-2 border-b border-border last:border-0">
                <span className="flex items-start gap-2.5 px-4 py-4 text-[0.9375rem] text-muted-foreground sm:px-8 sm:py-5 sm:text-base">
                  <Minus className="mt-1 size-3.5 shrink-0" aria-hidden="true" />
                  {a}
                </span>
                <span className="flex items-start gap-2.5 border-l border-border px-4 py-4 text-[0.9375rem] font-medium text-ink sm:px-8 sm:py-5 sm:text-base">
                  <Check className="mt-1 size-3.5 shrink-0 text-signal" strokeWidth={2.5} aria-hidden="true" />
                  {b}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>
      </div>
    </section>
  );
}
