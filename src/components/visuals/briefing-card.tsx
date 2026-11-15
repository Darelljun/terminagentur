"use client";

import { motion } from "motion/react";
import { Briefcase, CalendarCheck2, Home, MessageSquareText, Target, Users } from "lucide-react";
import { useState } from "react";
import { Tabs as TabsPrimitive } from "radix-ui";
import { EASE } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

type Profile = {
  id: string;
  tab: string;
  name: string;
  initials: string;
  when: string;
  topic: string;
  job: string;
  family: string;
  living: string;
  goal: string;
  context: string;
};

const PROFILES: Profile[] = [
  {
    id: "vorsorge",
    tab: "Vorsorge",
    name: "Lena M.",
    initials: "LM",
    when: "Dienstag, 14:00 Uhr",
    topic: "Altersvorsorge",
    job: "Angestellt · Projektmanagerin",
    family: "Verheiratet · zwei Kinder",
    living: "Zur Miete · Eigentum in Planung",
    goal: "Überblick über die bestehende Vorsorge und Klarheit, welche Lücke bis zur Rente bleibt.",
    context: "Hat bestehende Verträge, aber keinen Gesamtüberblick. Wünscht ein ruhiges, verständliches Gespräch.",
  },
  {
    id: "baufi",
    tab: "Baufinanzierung",
    name: "Jonas K.",
    initials: "JK",
    when: "Donnerstag, 10:30 Uhr",
    topic: "Baufinanzierung",
    job: "Selbstständig · Handwerksbetrieb",
    family: "Ledig · keine Kinder",
    living: "Zur Miete · Wohnungskauf in ca. 12 Monaten",
    goal: "Realistischen Finanzierungsrahmen klären und verstehen, welche Unterlagen benötigt werden.",
    context: "Hat bereits erste Objekte angesehen. Möchte vor Gesprächen mit Banken gut vorbereitet sein.",
  },
  {
    id: "vermoegen",
    tab: "Vermögen",
    name: "Sarah T.",
    initials: "ST",
    when: "Freitag, 16:00 Uhr",
    topic: "Vermögensaufbau",
    job: "Angestellt · Ingenieurin",
    family: "Verheiratet · ein Kind",
    living: "Wohneigentum",
    goal: "Monatlich strukturiert investieren und für das Kind langfristig vorsorgen.",
    context: "Spart bisher hauptsächlich auf dem Tagesgeld. Interessiert an einer langfristigen Strategie.",
  },
];

function Row({ icon: Icon, label, value }: { icon: typeof Briefcase; label: string; value: string }) {
  return (
    <div className="py-3.5">
      <dt className="flex items-center gap-2.5 text-xs font-medium text-muted-foreground">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-canvas text-ink">
          <Icon className="size-3.5" strokeWidth={1.8} aria-hidden="true" />
        </span>
        {label}
      </dt>
      <dd className="mt-1.5 pl-[2.375rem] text-[0.9375rem] leading-snug text-ink">{value}</dd>
    </div>
  );
}

export function BriefingCard() {
  const [value, setValue] = useState(PROFILES[0].id);

  return (
    <div className="shadow-float relative rounded-[32px] bg-white ring-1 ring-black/[0.06]">
      <TabsPrimitive.Root value={value} onValueChange={setValue}>
        <div className="flex flex-col gap-4 border-b border-border px-5 pt-5 pb-4 sm:px-7 sm:pt-6">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-ink px-2 py-0.5 text-[0.6875rem] font-semibold tracking-[0.08em] text-white">DEMO</span>
            <span className="text-xs text-muted-foreground">Fiktive Beispieldaten</span>
          </div>
          <TabsPrimitive.List
            aria-label="Beispiel-Briefing auswählen"
            className="relative grid w-full grid-cols-3 gap-1 rounded-full bg-canvas p-1"
          >
            {PROFILES.map((p) => (
              <TabsPrimitive.Trigger
                key={p.id}
                value={p.id}
                className="relative min-h-10 min-w-0 cursor-pointer rounded-full px-1 text-[0.75rem] font-medium sm:px-2 sm:text-[0.8125rem] text-muted-foreground transition-colors data-[state=active]:text-ink"
              >
                {value === p.id && (
                  <motion.span
                    layoutId="briefing-pill"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-white shadow-[0_1px_3px_rgb(0_0_0/0.10)]"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative block truncate">{p.tab}</span>
              </TabsPrimitive.Trigger>
            ))}
          </TabsPrimitive.List>
        </div>

        {PROFILES.map((p) => (
          <TabsPrimitive.Content key={p.id} value={p.id} className="outline-none">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="px-5 pt-6 pb-6 sm:px-7 sm:pb-7"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <span className="flex size-12 items-center justify-center rounded-full bg-canvas text-sm font-semibold text-ink" aria-hidden="true">
                    {p.initials}
                  </span>
                  <div>
                    <p className="text-lg font-semibold tracking-[-0.015em] text-ink">{p.name}</p>
                    <p className="text-sm text-muted-foreground">Beratungsinteresse: {p.topic}</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3 rounded-2xl bg-signal-soft px-4 py-3">
                <CalendarCheck2 className="size-[18px] shrink-0 text-signal" strokeWidth={1.8} aria-hidden="true" />
                <p className="text-sm font-medium text-signal">Termin bestätigt · {p.when}</p>
              </div>

              <dl className="mt-3 grid divide-y divide-border sm:grid-cols-2 sm:gap-x-6 sm:divide-y-0">
                <Row icon={Briefcase} label="Berufliche Situation" value={p.job} />
                <Row icon={Users} label="Familiäre Situation" value={p.family} />
                <Row icon={Home} label="Wohnsituation" value={p.living} />
                <Row icon={Target} label="Ziel des Gesprächs" value={p.goal} />
              </dl>

              <div className={cn("mt-2 rounded-2xl bg-canvas p-4")}>
                <p className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <MessageSquareText className="size-3.5" aria-hidden="true" />
                  Notiz aus der Qualifizierung
                </p>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink">{p.context}</p>
              </div>
            </motion.div>
          </TabsPrimitive.Content>
        ))}
      </TabsPrimitive.Root>
    </div>
  );
}
