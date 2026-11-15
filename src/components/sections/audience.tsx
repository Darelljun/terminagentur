import { Building2, Landmark, LineChart, Network, ShieldHalf, UserRound, X } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "./section-heading";

const GROUPS = [
  { icon: UserRound, title: "Selbstständige Finanzberater", text: "Du berätst eigenständig und willst planbar mehr Gespräche führen." },
  { icon: ShieldHalf, title: "Versicherungsvermittler & -makler", text: "Du willst mehr Zeit für Beratung statt für Kaltakquise." },
  { icon: Network, title: "Finanzvertriebe", text: "Dein Vertrieb braucht einen verlässlichen Strom an Terminen für das Team." },
  { icon: Building2, title: "Finanzberatungsgesellschaften", text: "Ihr wollt Neukundengewinnung professionalisieren und planbar machen." },
  { icon: LineChart, title: "Vermögensberater", text: "Du suchst Gespräche mit Menschen, die ihr Vermögen strukturiert aufbauen wollen." },
  { icon: Landmark, title: "Finanzdienstleister mit Vertriebsteams", text: "Eure Berater sollen beraten – die Termine kommen von uns." },
];

const NOT_FOR = [
  "Du möchtest Adresslisten oder Kontaktdaten kaufen, um sie selbst abzutelefonieren.",
  "Du bietest keine Finanz- oder Versicherungsberatung an.",
  "Du bist nicht in Deutschland tätig.",
  "Du hast aktuell keine Kapazität, zusätzliche Beratungsgespräche zu führen.",
];

export function Audience() {
  return (
    <section id="fuer-wen" aria-labelledby="fuer-wen-title" className="bg-canvas py-24 sm:py-36">
      <div className="container-kayco">
        <SectionHeading
          id="fuer-wen-title"
          eyebrow="Für wen KAYCO geeignet ist"
          title={
            <>
              Spezialisiert auf eine Branche. <span className="text-muted-foreground">Auf deine.</span>
            </>
          }
          lead="KAYCO ist eine reine B2B-Dienstleistung für Finanzdienstleister in Deutschland. Wir kennen eure Themen, eure Abläufe und eure Gespräche."
        />

        <Stagger as="ul" className="mt-16 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {GROUPS.map(({ icon: Icon, title, text }) => (
            <StaggerItem
              as="li"
              key={title}
              className="rounded-3xl bg-white p-7 ring-1 ring-black/[0.05] transition-shadow duration-300 hover:shadow-[0_20px_40px_-24px_rgb(0_0_0/0.25)]"
            >
              <Icon className="size-5 text-ink" strokeWidth={1.6} aria-hidden="true" />
              <h3 className="mt-5 text-[1.125rem] font-semibold tracking-[-0.02em] text-ink">{title}</h3>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted-foreground">{text}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-4">
          <div className="grid gap-6 rounded-[32px] bg-white p-7 ring-1 ring-black/[0.05] sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
            <div>
              <h3 className="text-title text-ink">Ehrlich gesagt: KAYCO ist nicht das Richtige, wenn …</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
                Wir arbeiten lieber mit wenigen passenden Partnern als mit allen.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {NOT_FOR.map((n) => (
                <li key={n} className="flex gap-3 rounded-2xl bg-canvas p-4 text-[0.9375rem] leading-relaxed text-ink">
                  <X className="mt-1 size-4 shrink-0 text-muted-foreground" strokeWidth={2} aria-hidden="true" />
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
