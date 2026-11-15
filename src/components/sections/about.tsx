import { Reveal } from "@/components/motion/reveal";
import { site } from "@/lib/site";
import { Chapter } from "./section-heading";

export function About() {
  return (
    <section id="ueber-uns" aria-labelledby="ueber-uns-title" className="relative bg-canvas py-24 sm:py-40">
      <div className="container-kayco">
        <Reveal>
          <Chapter n="07" label="Über KAYCO" />
          <h2 id="ueber-uns-title" className="sr-only">
            Über KAYCO: Aus der Finanzbranche, für die Finanzbranche
          </h2>
          <blockquote className="mt-10 max-w-[64rem]">
            <p className="serif-accent text-[clamp(2.25rem,6vw,5.25rem)] leading-[1.02] text-ink">
              „Finanzberater sollten ihre Zeit mit Beratung verbringen – nicht damit, Kontaktdaten hinterherzutelefonieren.“
            </p>
            <footer className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="h-px w-10 bg-black/20" aria-hidden="true" />
              Unsere Überzeugung
            </footer>
          </blockquote>
        </Reveal>

        <div className="mt-20 grid gap-12 border-t border-border pt-12 sm:mt-28 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-24">
          <Reveal>
            <p className="type-title text-ink">Aus der Finanzbranche. Für die Finanzbranche.</p>
            <ul className="mt-10 space-y-6">
              {site.founders.map((name, i) => (
                <li key={name} className="flex items-end justify-between gap-6 border-b border-border pb-5">
                  <div>
                    <p className="serif-accent text-[2rem] leading-none text-ink">{name}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{i === 0 ? "Gründerin" : "Gründer"}</p>
                  </div>
                  <span aria-hidden="true" className="h-4 w-7 shrink-0 rounded-[5px] bg-signal" />
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="columns-1 gap-10 text-[1.0625rem] leading-[1.75] text-muted-foreground md:columns-2 [&_p]:mb-6 [&_p]:break-inside-avoid">
            <p className="text-ink">
              KAYCO ist ein junges Unternehmen, gegründet von Magdalena Kayser und Darell Kacou – zwei Menschen, die selbst
              aus der Finanzdienstleistungsbranche kommen.
            </p>
            <p>
              Die Probleme vieler Finanzberater kennen wir deshalb nicht aus Marktanalysen, sondern aus eigener Erfahrung. Am
              Beratungswissen fehlt es selten. Auch nicht an der Fähigkeit, Kunden wirklich zu helfen.
            </p>
            <p>
              Das Problem beginnt vorher: zu wenige Interessenten, Leads, die nicht passen, zeitintensive Telefonate,
              erfolglose Kontaktversuche – und ein Kalender, der sich nicht zuverlässig füllt.
            </p>
            <p>
              Genau dieses Problem wollten wir lösen. Deshalb konzentrieren wir uns auf eine einzige Sache: die Gewinnung und
              Vereinbarung qualifizierter Beratungstermine. Keine Kontaktlisten, keine allgemeine Marketingagentur – sondern
              Gespräche, die in deinem Kalender stehen.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
