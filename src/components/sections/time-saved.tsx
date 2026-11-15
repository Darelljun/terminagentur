import { Reveal } from "@/components/motion/reveal";
import { CompareReveal } from "@/components/ui/compare-reveal";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

type Kind = "anrufen" | "nachfassen" | "mailbox" | "beratung";
type Block = [number, number, Kind];

const START = 8;
const END = 18;
const DAYS = ["Mo", "Di", "Mi", "Do", "Fr"];

const BEFORE: Block[][] = [
  [[9, 11, "anrufen"], [11, 12, "nachfassen"], [14, 15, "beratung"], [15, 17, "anrufen"]],
  [[9, 10.5, "nachfassen"], [10.5, 12, "anrufen"], [13, 14, "mailbox"], [14, 16.5, "anrufen"]],
  [[9, 12, "anrufen"], [14, 15, "beratung"], [15, 17, "nachfassen"]],
  [[9, 11, "nachfassen"], [11, 12, "anrufen"], [13, 16, "anrufen"]],
  [[9, 10, "mailbox"], [10, 12, "anrufen"], [14, 15, "beratung"], [15, 16.5, "nachfassen"]],
];

const AFTER: Block[][] = [
  [[9, 10, "beratung"], [11, 12, "beratung"], [14, 15, "beratung"]],
  [[9.5, 10.5, "beratung"], [14, 15, "beratung"], [16, 17, "beratung"]],
  [[10, 11, "beratung"], [13, 14, "beratung"], [15.5, 16.5, "beratung"]],
  [[9, 10, "beratung"], [11, 12, "beratung"], [15, 16, "beratung"]],
  [[10, 11, "beratung"], [13, 14, "beratung"]],
];

const STYLE: Record<Kind, { cls: string; label: string }> = {
  anrufen: { cls: "bg-[#2a2a2e] text-white", label: "Leads anrufen" },
  nachfassen: { cls: "bg-[#6b6b72] text-white", label: "Nachfassen" },
  mailbox: { cls: "bg-[repeating-linear-gradient(135deg,#d9d8d2_0_6px,#e8e7e2_6px_12px)] text-ink", label: "Mailbox" },
  beratung: { cls: "bg-signal text-white", label: "Beratung" },
};

const top = (h: number) => `${((h - START) / (END - START)) * 100}%`;

function Week({ data, tone }: { data: Block[][]; tone: "before" | "after" }) {
  return (
    <div className={cn("absolute inset-0 px-3 pt-16 pb-5 sm:px-8 sm:pt-20 sm:pb-8", tone === "before" ? "bg-[#ecebe7]" : "bg-white")}>
      <div className="grid h-full grid-cols-[26px_repeat(3,minmax(0,1fr))] gap-x-1.5 sm:grid-cols-[36px_repeat(5,minmax(0,1fr))] sm:gap-x-3">
        <div className="relative">
          {[8, 10, 12, 14, 16, 18].map((h) => (
            <span key={h} className="absolute right-1 -translate-y-1/2 text-[0.625rem] text-muted-foreground tabular-nums" style={{ top: top(h) }}>
              {h}
            </span>
          ))}
        </div>
        {data.map((day, i) => (
          <div key={DAYS[i]} className={cn("relative", i > 2 && "hidden sm:block")}>
            <span className="absolute -top-7 left-0 text-xs font-medium text-muted-foreground">{DAYS[i]}</span>
            <div className={cn("absolute inset-0 rounded-xl", tone === "before" ? "bg-black/[0.03]" : "bg-canvas")} />
            {day.map(([s, e, k]) => (
              <div
                key={s}
                className={cn("absolute inset-x-0.5 overflow-hidden rounded-lg px-1.5 py-1 sm:px-2", STYLE[k].cls)}
                style={{ top: top(s), height: `calc(${((e - s) / (END - START)) * 100}% - 3px)` }}
              >
                <p className="truncate text-[0.625rem] font-medium sm:text-[0.6875rem]">{STYLE[k].label}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TimeSaved() {
  return (
    <section aria-labelledby="zeit-title" className="relative py-24 sm:py-40">
      <div className="container-kayco">
        <SectionHeading
          id="zeit-title"
          chapter="03"
          eyebrow="Die Zeit"
          title={
            <>
              Dieselbe Woche. <span className="serif-accent">Eine andere Aufgabe.</span>
            </>
          }
          lead="Wenn die Akquise bei uns liegt, gehört dein Kalender der Beratung. Zieh den Regler und vergleiche."
        />

        <Reveal className="mt-14 sm:mt-16">
          <CompareReveal
            ariaLabel="Vergleich einer Arbeitswoche: mit gekauften Leads und mit KAYCO"
            labels={["Mit Leads", "Mit KAYCO"]}
            className="shadow-float h-[440px] rounded-[28px] ring-1 ring-black/[0.06] sm:h-[560px] sm:rounded-[36px]"
            before={<Week data={BEFORE} tone="before" />}
            after={<Week data={AFTER} tone="after" />}
          />
        </Reveal>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground" aria-label="Legende">
            {(["anrufen", "nachfassen", "mailbox", "beratung"] as Kind[]).map((k) => (
              <li key={k} className="flex items-center gap-2">
                <span className={cn("size-3 rounded-[4px]", STYLE[k].cls)} aria-hidden="true" />
                {STYLE[k].label}
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted-foreground">Illustration einer typischen Woche – keine Messwerte.</p>
        </div>
      </div>
    </section>
  );
}
