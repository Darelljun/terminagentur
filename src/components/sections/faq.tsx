import { Reveal } from "@/components/motion/reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { site } from "@/lib/site";

export const FAQS: { q: string; a: string }[] = [
  {
    q: "Was unterscheidet KAYCO von einer Leadagentur?",
    a: "Eine Leadagentur liefert dir Kontaktdaten – das Anrufen, Nachfassen und Terminieren bleibt bei dir. KAYCO geht einen Schritt weiter: Wir sprechen mit den Interessenten, qualifizieren sie und vereinbaren einen festen Beratungstermin, der direkt in deinem Kalender steht. Auch unsere laufende Vergütung richtet sich nach qualifizierten Terminen, nicht nach Leads.",
  },
  {
    q: "Was zählt als qualifizierter Termin?",
    a: "Grundsätzlich ein fest vereinbarter Beratungstermin mit einer Person, die zu deiner Zielgruppe passt, einen echten Beratungsbedarf geäußert und dem Termin mit dir zugestimmt hat. Die genauen Kriterien legen wir vor dem Start gemeinsam mit dir fest und halten sie schriftlich fest – sie sind auch die Grundlage der Garantie.",
  },
  {
    q: "Wie funktioniert die 30-Termine-Garantie?",
    a: "Wir garantieren mindestens 30 qualifizierte Termine pro Monat. Erreichen wir diese Mindestzahl in einem Garantiezeitraum nicht, entfällt unsere laufende Dienstleistungsvergütung für diesen Zeitraum. Die einmalige Einrichtungspauschale und bereits eingesetztes Werbebudget sind davon nicht automatisch erfasst. Die verbindlichen Bedingungen werden im Vertrag festgelegt.",
  },
  {
    q: "Wie hoch sind die Einrichtungskosten?",
    a: "Die Einrichtung kostet einmalig 300 €. Damit richten wir die Zusammenarbeit ein – von der Abstimmung deines Beratungsfokus bis zur Anbindung deines Kalenders. Darüber hinaus gibt es keine versteckten Einrichtungsgebühren. Alle Konditionen erhältst du vor Vertragsschluss transparent in deinem Angebot.",
  },
  {
    q: "Wer trägt das Werbebudget?",
    a: "Das Werbebudget trägst du selbst. Es ist von unserer Vergütung getrennt. Welche Höhe für deine Ziele und deine Region sinnvoll ist, besprechen wir im Strategiegespräch.",
  },
  {
    q: "Wie gelangen die Termine in meinen Kalender?",
    a: "Vereinbarte Termine werden direkt in deinen Kalender eingetragen. Welche Kalenderlösung wir dafür anbinden, stimmen wir bei der Einrichtung mit dir ab.",
  },
  {
    q: "Welche Informationen erhalte ich vor dem Termin?",
    a: "Zu jedem Termin erhältst du ein kurzes Briefing: das Beratungsanliegen, das Ziel des Gesprächs und – je nach Thema – relevante Angaben etwa zur beruflichen, familiären oder Wohnsituation. Wir erfragen dabei nur, was für das jeweilige Beratungsziel notwendig ist und rechtmäßig erhoben werden darf.",
  },
  {
    q: "Wie schnell kann die Zusammenarbeit starten?",
    a: "Nach dem Strategiegespräch und der Einrichtung starten wir mit deiner Kampagne. Wann die ersten Termine im Kalender stehen, hängt unter anderem von deinem Beratungsfokus, deiner Region und deinem Werbebudget ab. Statt einer pauschalen Zahl nennen wir dir im Strategiegespräch einen realistischen Zeitplan.",
  },
  {
    q: "Für welche Finanzdienstleister eignet sich KAYCO?",
    a: "Für selbstständige Finanzberater, Versicherungsvermittler und -makler, Finanzvertriebe, Finanzberatungsgesellschaften, Vermögensberater und Finanzdienstleister mit eigenen Vertriebsteams – ausschließlich im deutschen Markt.",
  },
  {
    q: "Wie geht KAYCO mit den Daten der Interessenten um?",
    a: "Interessenten werden darüber informiert, dass ihre Angaben zur Vorbereitung des Beratungsgesprächs an dich als Berater weitergegeben werden. Wir erheben nur die für das Gespräch notwendigen Informationen. Die datenschutzrechtliche Ausgestaltung der Zusammenarbeit regeln wir vertraglich mit dir.",
  },
  {
    q: "Ist das Strategiegespräch verbindlich?",
    a: `Nein. Im Strategiegespräch lernen wir dein Geschäft kennen und prüfen gemeinsam, ob eine Zusammenarbeit sinnvoll ist. Du kannst es direkt hier auf der Seite anfragen oder uns an ${site.email} schreiben.`,
  },
];

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-24 sm:py-36">
      <div className="container-kayco grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-title" className="text-headline mt-4 text-ink">
            Fragen, <span className="serif-accent">klar beantwortet.</span>
          </h2>
          <p className="text-lead mt-6 text-muted-foreground">
            Deine Frage ist nicht dabei?{" "}
            <a href={`mailto:${site.email}`} className="text-ink underline decoration-border underline-offset-4 hover:decoration-ink">
              Schreib uns
            </a>
            .
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <Accordion type="single" collapsible className="border-t border-border">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`faq-${i}`} className="border-b border-border">
                <AccordionTrigger className="rounded-none py-6 text-[1.0625rem] leading-snug font-medium tracking-[-0.015em] text-ink sm:text-lg">
                  <span className="flex gap-4">
                    <span className="w-6 shrink-0 pt-1 text-xs font-medium text-muted-foreground tabular-nums" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {f.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pr-12 pb-7 pl-10 text-[0.9875rem] leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
