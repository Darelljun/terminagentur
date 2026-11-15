import { X } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "./section-heading";

const GROUPS = [
  ["Selbstständige Finanzberater", "Du berätst eigenständig und willst planbar mehr Gespräche führen."],
  ["Versicherungsvermittler & -makler", "Du willst mehr Zeit für Beratung statt für Kaltakquise."],
  ["Finanzvertriebe", "Dein Vertrieb braucht einen verlässlichen Strom an Terminen für das Team."],
  ["Finanzberatungsgesellschaften", "Ihr wollt Neukundengewinnung professionalisieren und planbar machen."],
  ["Vermögensberater", "Du suchst Gespräche mit Menschen, die Vermögen strukturiert aufbauen wollen."],
  ["Finanzdienstleister mit Vertriebsteams", "Eure Berater sollen beraten – die Termine kommen von uns."],
];

const NOT_FOR = [
  "Du möchtest Adresslisten oder Kontaktdaten kaufen.",
  "Du bietest keine Finanz- oder Versicherungsberatung an.",
  "Du bist nicht in Deutschland tätig.",
  "Du hast keine Kapazität für zusätzliche Gespräche.",
];

export function Audience() {
  return (
    <section id="fuer-wen" aria-labelledby="fuer-wen-title" className="relative py-24 sm:py-40">
      <div className="container-kayco">
        <SectionHeading
          id="fuer-wen-title"
          chapter="08"
          eyebrow="Für wen"
          title={
            <>
              Spezialisiert auf eine Branche. <span className="serif-accent">Auf deine.</span>
            </>
          }
          lead="Eine reine B2B-Dienstleistung für Finanzdienstleister in Deutschland."
        />

        <Stagger as="ul" className="mt-14 border-t border-ink sm:mt-20">
          {GROUPS.map(([title, text], i) => (
            <StaggerItem
              as="li"
              key={title}
              className="group relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 border-b border-border py-6 transition-colors sm:grid-cols-[4rem_minmax(0,1.1fr)_minmax(0,1fr)_2.5rem] sm:items-center sm:py-8"
            >
              <span className="text-xs font-semibold text-muted-foreground tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-[1.375rem] leading-tight font-semibold tracking-[-0.03em] text-ink transition-transform duration-500 ease-[var(--ease-premium)] group-hover:translate-x-2 sm:text-[2rem]">
                {title}
              </h3>
              <p className="col-start-2 mt-2 text-[0.9375rem] text-muted-foreground sm:col-start-3 sm:mt-0 sm:text-base">{text}</p>
              <span
                aria-hidden="true"
                className="hidden h-5 w-9 justify-self-end rounded-[6px] bg-black/[0.06] transition-colors duration-300 group-hover:bg-signal sm:block"
              />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-14 grid gap-6 sm:mt-20 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
          <p className="type-title text-ink">
            Ehrlich gesagt: <span className="text-muted-foreground">KAYCO ist nicht das Richtige, wenn …</span>
          </p>
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {NOT_FOR.map((n) => (
              <li key={n} className="flex gap-3 text-[0.9875rem] leading-relaxed text-muted-foreground">
                <X className="mt-1 size-4 shrink-0" strokeWidth={2} aria-hidden="true" />
                {n}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
