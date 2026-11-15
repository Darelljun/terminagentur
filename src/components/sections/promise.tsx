import { BadgeEuro, CalendarCheck2, Megaphone, ShieldCheck } from "lucide-react";
import { CountUp, Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

const TERMS = [
  {
    icon: BadgeEuro,
    value: "300 €",
    title: "Einmalige Einrichtung",
    text: "Keine hohen Set-up-Kosten und keine versteckten Einrichtungsgebühren.",
  },
  {
    icon: Megaphone,
    value: "Dein Budget",
    title: "Werbebudget separat",
    text: "Das Werbebudget trägst du selbst. Es ist klar von unserer Vergütung getrennt.",
  },
  {
    icon: CalendarCheck2,
    value: "Pro Termin",
    title: "Ergebnisorientierte Vergütung",
    text: "Unsere laufende Vergütung richtet sich nach den vereinbarten qualifizierten Terminen – nicht nach Leads.",
  },
];

export function Guarantee() {
  return (
    <section id="versprechen" aria-labelledby="versprechen-title" className="relative overflow-hidden bg-canvas py-24 sm:py-36">
      <div className="container-kayco">
        <Reveal className="text-center">
          <p className="eyebrow">Unser Versprechen</p>
          <h2 id="versprechen-title" className="mt-6 text-ink">
            <span className="block text-[clamp(8rem,32vw,20rem)] leading-[0.82] font-semibold tracking-[-0.07em] tabular-nums">
              <CountUp to={30} />
            </span>
            <span className="text-headline mt-4 block">
              qualifizierte Termine. <span className="serif-accent">Jeden Monat.</span>
            </span>
          </h2>
          <p className="text-lead mx-auto mt-6 max-w-[38rem] text-muted-foreground">
            Mindestens 30 qualifizierte Beratungstermine pro Monat – das ist unsere Termingarantie. Und an ihr messen wir
            uns.
          </p>
        </Reveal>

        <Stagger className="mt-16 grid gap-3 sm:gap-4 md:grid-cols-3">
          {TERMS.map(({ icon: Icon, value, title, text }) => (
            <StaggerItem key={title} className="rounded-3xl bg-white p-7 ring-1 ring-black/[0.05] sm:p-8">
              <Icon className="size-5 text-ink" strokeWidth={1.6} aria-hidden="true" />
              <p className="mt-6 text-[2rem] leading-none font-semibold tracking-[-0.04em] text-ink">{value}</p>
              <h3 className="mt-3 text-[1.0625rem] font-semibold tracking-[-0.015em] text-ink">{title}</h3>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted-foreground">{text}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-4">
          <div className="grid gap-8 rounded-[32px] bg-white p-7 ring-1 ring-black/[0.05] sm:p-10 lg:grid-cols-[auto_1fr_1fr] lg:gap-12">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-signal text-white">
              <ShieldCheck className="size-6" strokeWidth={1.7} aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-title text-ink">So funktioniert die Garantie</h3>
              <p className="mt-3 text-[0.9875rem] leading-relaxed text-muted-foreground">
                Erreichen wir in einem Garantiezeitraum die vereinbarte Mindestzahl von 30 qualifizierten Terminen nicht,
                entfällt unsere laufende Dienstleistungsvergütung für diesen Zeitraum. Die genauen Bedingungen – etwa die
                Kriterien eines qualifizierten Termins und der Garantiezeitraum – halten wir vor Beginn gemeinsam schriftlich
                im Vertrag fest.
              </p>
            </div>
            <div className="rounded-2xl bg-canvas p-5 sm:p-6">
              <p className="text-sm font-semibold text-ink">Transparent: Was die Garantie nicht umfasst</p>
              <ul className="mt-3 space-y-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
                <li className="flex gap-2.5">
                  <span aria-hidden="true" className="mt-2.5 size-1 shrink-0 rounded-full bg-muted-foreground" />
                  Die einmalige Einrichtungspauschale von 300 €
                </li>
                <li className="flex gap-2.5">
                  <span aria-hidden="true" className="mt-2.5 size-1 shrink-0 rounded-full bg-muted-foreground" />
                  Bereits eingesetztes Werbebudget
                </li>
              </ul>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Beides ist nicht automatisch von der Garantie erfasst.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
