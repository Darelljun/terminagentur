import { CalendarCheck2, Check, FileText, Megaphone, MessageCircle, Target } from "lucide-react";
import { cn } from "@/lib/utils";

function Panel({ title, icon: Icon, children, className }: { title: string; icon: typeof Target; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("w-full max-w-[380px] rounded-[24px] bg-white p-5 shadow-[0_2px_4px_rgb(0_0_0/0.04),0_24px_50px_-20px_rgb(0_0_0/0.3)] ring-1 ring-black/[0.06]", className)}>
      <p className="flex items-center gap-2 text-[0.6875rem] font-semibold tracking-[0.1em] text-muted-foreground uppercase">
        <Icon className="size-3.5" aria-hidden="true" />
        {title}
      </p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

const Chip = ({ on, children }: { on?: boolean; children: React.ReactNode }) => (
  <span
    className={cn(
      "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium",
      on ? "bg-ink text-white" : "bg-canvas text-muted-foreground",
    )}
  >
    {on && <Check className="size-3" strokeWidth={2.5} aria-hidden="true" />}
    {children}
  </span>
);

export function FocusVisual() {
  return (
    <Panel title="Beratungsprofil" icon={Target}>
      <p className="text-xs text-muted-foreground">Themen</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        <Chip on>Altersvorsorge</Chip>
        <Chip on>Baufinanzierung</Chip>
        <Chip>Vermögensaufbau</Chip>
        <Chip>Absicherung</Chip>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">Zielgruppe</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        <Chip on>Angestellte</Chip>
        <Chip on>Familien</Chip>
        <Chip>Selbstständige</Chip>
      </div>
      <div className="mt-4 flex items-center justify-between rounded-xl bg-canvas px-3 py-2.5 text-xs">
        <span className="text-muted-foreground">Region</span>
        <span className="font-medium text-ink">Dein Einzugsgebiet</span>
      </div>
    </Panel>
  );
}

export function CampaignVisual() {
  return (
    <Panel title="Kampagne" icon={Megaphone}>
      <div className="overflow-hidden rounded-2xl ring-1 ring-black/[0.06]">
        <div className="relative h-28 bg-[radial-gradient(circle_at_30%_30%,#e5f2ea,transparent_60%),linear-gradient(135deg,#f5f5f2,#ecebe7)]">
          <span className="absolute top-3 left-3 rounded-md bg-white/80 px-1.5 py-0.5 text-[0.625rem] font-medium text-muted-foreground">Anzeige</span>
          <span className="absolute right-4 bottom-4 h-8 w-12 rounded-lg bg-signal shadow-[0_8px_20px_-6px_rgb(14_122_82/0.6)]" />
          <span className="absolute right-[4.5rem] bottom-7 h-5 w-9 rounded-md bg-white ring-1 ring-black/5" />
        </div>
        <div className="p-3.5">
          <p className="text-sm font-semibold text-ink">Altersvorsorge verständlich erklärt</p>
          <p className="mt-0.5 text-xs text-muted-foreground">Jetzt ein persönliches Beratungsgespräch anfragen.</p>
          <span className="mt-3 inline-flex rounded-full bg-ink px-3 py-1.5 text-xs font-medium text-white">Mehr erfahren</span>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="inline-flex items-center gap-1.5 font-medium text-signal">
          <span className="size-1.5 rounded-full bg-signal" />
          Kampagne aktiv
        </span>
        <span className="text-muted-foreground">Werbebudget: bei dir</span>
      </div>
    </Panel>
  );
}

export function QualifyVisual() {
  return (
    <Panel title="Qualifizierungsgespräch" icon={MessageCircle}>
      <div className="space-y-2 text-[0.8125rem]">
        <p className="w-fit max-w-[85%] rounded-2xl rounded-tl-md bg-canvas px-3.5 py-2 text-ink">Worum geht es Ihnen genau?</p>
        <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-tr-md bg-ink px-3.5 py-2 text-white">
          Ich möchte wissen, ob meine Vorsorge reicht.
        </p>
        <p className="w-fit max-w-[85%] rounded-2xl rounded-tl-md bg-canvas px-3.5 py-2 text-ink">Sind Sie angestellt oder selbstständig?</p>
      </div>
      <ul className="mt-4 space-y-2 border-t border-border pt-4 text-xs text-ink">
        {["Bedarf bestätigt", "Passt zur Zielgruppe", "Termin gewünscht"].map((t) => (
          <li key={t} className="flex items-center gap-2">
            <span className="flex size-4 items-center justify-center rounded-full bg-signal text-white">
              <Check className="size-2.5" strokeWidth={3} aria-hidden="true" />
            </span>
            {t}
          </li>
        ))}
      </ul>
    </Panel>
  );
}

export function BookVisual() {
  return (
    <Panel title="Terminvereinbarung" icon={CalendarCheck2}>
      <p className="text-xs text-muted-foreground">Vorgeschlagene Zeiten</p>
      <div className="mt-2 grid grid-cols-3 gap-1.5 text-xs font-medium">
        {["Mo 10:00", "Di 14:00", "Do 16:30"].map((t, i) => (
          <span key={t} className={cn("rounded-xl px-2 py-2.5 text-center", i === 1 ? "bg-signal text-white" : "bg-canvas text-muted-foreground")}>
            {t}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3 rounded-2xl bg-signal-soft p-3">
        <span className="flex size-8 items-center justify-center rounded-full bg-signal text-white">
          <Check className="size-4" strokeWidth={2.5} aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-semibold text-signal">Zusage erhalten</p>
          <p className="text-xs text-signal/80">Dienstag, 14:00 Uhr · Lena M.</p>
        </div>
      </div>
    </Panel>
  );
}

export function CalendarVisual() {
  return (
    <Panel title="Dein Kalender" icon={CalendarCheck2}>
      <div className="grid grid-cols-[28px_1fr] gap-x-2 text-[0.625rem] text-muted-foreground tabular-nums">
        {[12, 13, 14, 15, 16].map((h) => (
          <div key={h} className="contents">
            <span className="h-9 -translate-y-1.5">{h}:00</span>
            <span className="relative h-9 border-t border-black/[0.06]">
              {h === 14 && (
                <span className="absolute inset-x-0 top-0.5 flex h-[calc(2.25rem-4px)] items-center gap-2 rounded-lg bg-signal px-2.5 text-xs font-medium text-white shadow-[0_10px_24px_-8px_rgb(14_122_82/0.6)]">
                  Lena M. · Altersvorsorge
                </span>
              )}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-xl bg-canvas p-3">
        <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <FileText className="size-3" aria-hidden="true" />
          Briefing angehängt
        </p>
        <p className="mt-1 text-[0.8125rem] text-ink">Angestellt · verheiratet, zwei Kinder · Überblick zur Vorsorge.</p>
      </div>
    </Panel>
  );
}

export const PROCESS_VISUALS = [FocusVisual, CampaignVisual, QualifyVisual, BookVisual, CalendarVisual];
