import { Briefcase, Home, MessageCircleQuestion, Users } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { BriefingCard } from "@/components/visuals/briefing-card";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

const LEFT = [
  { icon: Briefcase, title: "Berufliche Situation", text: "Angestellt oder selbstständig, Tätigkeit, bei Bedarf grobe Einkommenssituation." },
  { icon: Users, title: "Familiäre Situation", text: "Familienstand, Kinder, allgemeine Lebenssituation." },
];
const RIGHT = [
  { icon: Home, title: "Wohnsituation", text: "Miete oder Eigentum, geplante Veränderungen." },
  { icon: MessageCircleQuestion, title: "Beratungsanliegen", text: "Bedarf, Themen und Ziel des Gesprächs." },
];

function Callout({ item, side, delay }: { item: (typeof LEFT)[number]; side: "left" | "right"; delay: number }) {
  const Icon = item.icon;
  return (
    <Reveal delay={delay} className={cn("relative", side === "left" ? "lg:text-right" : "")}>
      <div className={cn("flex gap-4 lg:block", side === "left" && "lg:ml-auto")}>
        <span
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-2xl bg-white text-ink ring-1 ring-black/[0.06]",
            side === "left" && "lg:ml-auto",
          )}
        >
          <Icon className="size-[18px]" strokeWidth={1.7} aria-hidden="true" />
        </span>
        <div className="lg:mt-4">
          <h3 className="text-[1.0625rem] font-semibold tracking-[-0.015em] text-ink">{item.title}</h3>
          <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted-foreground">{item.text}</p>
        </div>
      </div>
      {/* Verbindungslinie zur Karte */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-5 hidden h-px w-12 bg-gradient-to-r lg:block xl:w-16",
          side === "left" ? "-right-16 from-black/0 to-black/20 xl:-right-20" : "-left-16 from-black/20 to-black/0 xl:-left-20",
        )}
      />
    </Reveal>
  );
}

export function Qualification() {
  return (
    <section id="qualifizierung" aria-labelledby="qualifizierung-title" className="relative overflow-x-clip py-24 sm:py-40">
      <div className="container-kayco">
        <SectionHeading
          id="qualifizierung-title"
          chapter="05"
          eyebrow="Die Qualifizierung"
          align="center"
          title={
            <>
              Nicht einfach ein Termin. <span className="serif-accent">Ein Gespräch mit Vorbereitung.</span>
            </>
          }
          lead="Bevor ein Termin in deinem Kalender landet, sprechen wir mit dem Interessenten. Du weißt vorher, wer dir gegenübersitzt – und warum."
        />

        <div className="relative mt-16 grid items-center gap-10 sm:mt-24 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1.6fr)_minmax(0,0.62fr)] lg:gap-14 xl:gap-16">
          <div aria-hidden="true" className="pointer-events-none absolute top-1/2 left-1/2 -z-10 size-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(47_191_133/0.10),transparent)]" />
          <div className="order-2 grid gap-8 sm:grid-cols-2 lg:order-1 lg:grid-cols-1 lg:gap-16">
            {LEFT.map((it, i) => (
              <Callout key={it.title} item={it} side="left" delay={0.1 + i * 0.1} />
            ))}
          </div>
          <Reveal className="order-1 lg:order-2">
            <BriefingCard />
          </Reveal>
          <div className="order-3 grid gap-8 sm:grid-cols-2 lg:grid-cols-1 lg:gap-16">
            {RIGHT.map((it, i) => (
              <Callout key={it.title} item={it} side="right" delay={0.2 + i * 0.1} />
            ))}
          </div>
        </div>

        <Reveal className="mx-auto mt-16 max-w-[44rem] text-center">
          <p className="text-sm leading-relaxed text-muted-foreground">
            <strong className="font-medium text-ink">Beispielhaft und bedarfsabhängig.</strong> Wir erfragen nur, was für das
            jeweilige Beratungsziel notwendig ist und rechtmäßig erhoben werden darf – kein starrer Pflichtfragebogen. Das
            Briefing oben ist eine Demo mit frei erfundenen Personen und Angaben.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
