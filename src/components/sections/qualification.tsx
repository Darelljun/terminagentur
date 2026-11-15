import { Briefcase, Home, MessageCircleQuestion, Users } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { BriefingCard } from "@/components/visuals/briefing-card";
import { SectionHeading } from "./section-heading";

const CATEGORIES = [
  {
    icon: Briefcase,
    title: "Berufliche Situation",
    items: "Angestellt oder selbstständig, berufliche Tätigkeit, bei Bedarf die grobe Einkommenssituation.",
  },
  {
    icon: Users,
    title: "Familiäre Situation",
    items: "Familienstand, Kinder, allgemeine Lebenssituation.",
  },
  {
    icon: Home,
    title: "Wohnsituation",
    items: "Miete oder Eigentum, geplante Veränderungen.",
  },
  {
    icon: MessageCircleQuestion,
    title: "Beratungsanliegen",
    items: "Welcher Bedarf besteht, welche Themen interessieren, welches Ziel soll das Gespräch haben?",
  },
];

export function Qualification() {
  return (
    <section id="qualifizierung" aria-labelledby="qualifizierung-title" className="py-24 sm:py-36">
      <div className="container-kayco">
        <SectionHeading
          id="qualifizierung-title"
          eyebrow="Die Qualifizierung"
          title={
            <>
              Nicht einfach ein Termin. <span className="serif-accent">Ein Gespräch mit Vorbereitung.</span>
            </>
          }
          lead="Bevor ein Termin in deinem Kalender landet, sprechen wir mit dem Interessenten. So weißt du vor dem Gespräch, wer dir gegenübersitzt und warum er einen Termin möchte."
        />

        <div className="mt-16 grid grid-cols-[minmax(0,1fr)] items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
          <div>
            <Stagger as="ul" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {CATEGORIES.map(({ icon: Icon, title, items }) => (
                <StaggerItem as="li" key={title} className="flex gap-4 rounded-3xl bg-canvas p-6">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-white text-ink ring-1 ring-black/[0.05]">
                    <Icon className="size-[18px]" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-[1.0625rem] font-semibold tracking-[-0.015em] text-ink">{title}</h3>
                    <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted-foreground">{items}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                <strong className="font-medium text-ink">Beispielhaft und bedarfsabhängig.</strong> Wir erfragen nur, was für
                das jeweilige Beratungsziel tatsächlich notwendig ist und rechtmäßig erhoben werden darf. Es gibt keinen
                starren Pflichtfragebogen – die Inhalte stimmen wir mit dir auf deinen Beratungsfokus ab.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:sticky lg:top-28">
            <BriefingCard />
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Beispielhafte Darstellung eines Terminbriefings. Alle Personen und Angaben sind frei erfunden.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
