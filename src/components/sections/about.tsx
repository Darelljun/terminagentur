import { Reveal } from "@/components/motion/reveal";
import { site } from "@/lib/site";

const FOUNDERS = [
  { name: site.founders[0], initials: "MK", role: "Gründerin" },
  { name: site.founders[1], initials: "DK", role: "Gründer" },
];

export function About() {
  return (
    <section id="ueber-uns" aria-labelledby="ueber-uns-title" className="py-24 sm:py-36">
      <div className="container-kayco grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-24">
        <Reveal>
          <p className="eyebrow">Über KAYCO</p>
          <h2 id="ueber-uns-title" className="text-headline mt-4 text-ink">
            Aus der Finanzbranche. <span className="serif-accent">Für die Finanzbranche.</span>
          </h2>

          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {FOUNDERS.map((f) => (
              <li key={f.name} className="flex items-center gap-4 rounded-3xl bg-canvas p-5">
                <span
                  aria-hidden="true"
                  className="flex size-14 shrink-0 items-center justify-center rounded-full bg-ink text-[0.9375rem] font-semibold tracking-[0.04em] text-white"
                >
                  {f.initials}
                </span>
                <div>
                  <p className="text-[1.0625rem] font-semibold tracking-[-0.015em] text-ink">{f.name}</p>
                  <p className="text-sm text-muted-foreground">{f.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="space-y-6 text-[1.0625rem] leading-[1.7] text-muted-foreground sm:text-lg">
          <p className="text-lead text-ink">
            KAYCO ist ein junges Unternehmen. Gegründet von Magdalena Kayser und Darell Kacou – zwei Menschen, die selbst aus
            der Finanzdienstleistungsbranche kommen.
          </p>
          <p>
            Wir kennen die Probleme vieler Finanzberater deshalb nicht aus Marktanalysen, sondern aus eigener Erfahrung. Und
            wir haben gesehen: Am Beratungswissen fehlt es selten. Auch nicht an der Fähigkeit, Kunden wirklich zu helfen.
          </p>
          <p>
            Das Problem beginnt vorher. Zu wenige Interessenten. Leads, die nicht passen. Zeitintensive Telefonate,
            erfolglose Kontaktversuche – und ein Kalender, der sich nicht zuverlässig füllt.
          </p>
          <p>Genau dieses Problem wollten wir lösen. Deshalb haben wir KAYCO gegründet.</p>
          <blockquote className="border-l-2 border-ink pl-6">
            <p className="text-title text-ink">
              Finanzberater sollten ihre Zeit mit Beratung verbringen – nicht damit, jeden Tag Kontaktdaten
              hinterherzutelefonieren.
            </p>
            <footer className="mt-3 text-sm text-muted-foreground">Unsere Überzeugung</footer>
          </blockquote>
          <p>
            Deshalb konzentrieren wir uns auf eine einzige Sache: die Gewinnung und Vereinbarung qualifizierter
            Beratungstermine. Keine Kontaktlisten, keine allgemeine Marketingagentur – sondern Gespräche, die in deinem
            Kalender stehen.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
