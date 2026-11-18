import type { LandingContent } from "@/content/types"
import { site } from "@/lib/site"

/** Preismodell – zentral, damit Website, FAQ und strukturierte Daten übereinstimmen. */
export const pricing = {
  perAppointment: 75,
  setup: 300,
} as const

export const faqItems = [
  {
    q: "Was unterscheidet KAYCO von einer Leadagentur?",
    a: "Eine Leadagentur verkauft dir Kontaktdaten – ob die gut oder schlecht sind, merkst du erst beim Telefonieren. Wir rufen die Interessenten selbst an, qualifizieren sie und legen fertige Beratungstermine in deinen Kalender. Du rufst keinen einzigen Lead mehr an.",
  },
  {
    q: "Was kostet KAYCO?",
    a: `Einmalig ${pricing.setup} € für die Einrichtung und ${pricing.perAppointment} € pro Termin, den wir für dich vereinbaren. Dazu kommt dein eigenes Werbebudget. Monatliche Agenturkosten oder Pauschalen gibt es nicht.`,
  },
  {
    q: "Wofür genau zahle ich die 75 €?",
    a: "Für jeden Beratungstermin, den wir mit einem passenden, vorqualifizierten Interessenten in deinen Kalender legen. Für Leads, Anrufversuche oder Mailbox-Nachrichten zahlst du nichts. Die genauen Kriterien eines Termins halten wir vor dem Start gemeinsam schriftlich fest.",
  },
  {
    q: "Wer trägt das Werbebudget?",
    a: "Du – direkt und getrennt von unserer Vergütung. Die Höhe legst du fest; im Strategiegespräch zeigen wir dir, welches Budget für deine Ziele und deine Region sinnvoll ist.",
  },
  {
    q: "Wie viele Termine sind möglich?",
    a: "Wir garantieren dir – abhängig von deinem Werbebudget – mindestens 30 qualifizierte Termine pro Monat. Nach oben gibt es keine Grenze: Mit mehr Budget vereinbaren wir entsprechend mehr Termine. Welches Budget du für dein Ziel brauchst, besprechen wir im Strategiegespräch; die genauen Garantiebedingungen halten wir vor dem Start schriftlich fest.",
  },
  {
    q: "Welche Informationen bekomme ich vor dem Termin?",
    a: "Zu jedem Termin ein kurzes Briefing: Anliegen, Ziel des Gesprächs und – je nach Thema – Angaben zur beruflichen, familiären oder Wohnsituation. Wir erfragen nur, was für das Gespräch wirklich nötig ist.",
  },
  {
    q: "Wie kommen die Termine in meinen Kalender?",
    a: "Wir tragen sie direkt ein. Welchen Kalender wir anbinden, stimmen wir bei der Einrichtung mit dir ab.",
  },
  {
    q: "Für wen ist KAYCO gemacht?",
    a: "Für selbstständige Finanzberater, Versicherungsmakler, Finanzvertriebe, Vermögensberater und Finanzdienstleister mit Vertriebsteams in Deutschland.",
  },
]

export const landingProps: LandingContent = {
  brand: "KAYCO",
  links: [
    { label: "Leistung", href: "#services" },
    { label: "Ablauf", href: "#process" },
    { label: "Ergebnisse", href: "#results" },
    { label: "Über uns", href: "#team" },
    { label: "Preise", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
  status: `${pricing.perAppointment} € pro Termin · keine monatlichen Agenturkosten`,
  hero: {
    lead: "Keine Leads.",
    words: ["Termine", "Beratungen", "Gespräche"],
    tail: "im Kalender.",
    cue: "Scrollen und mehr erfahren",
    sub: "Du berätst. Wir machen den Rest.",
  },
  manifesto: {
    kicker: "Über KAYCO",
    text: "Wir kommen selbst aus der Finanzbranche [team] und wissen, wie viel Zeit Leads kosten. Deshalb rufen wir deine Interessenten an, qualifizieren sie und legen fertige Termine in deinen Kalender. [chart] Du setzt dich hin und berätst. Mehr musst du nicht tun. [leaf]",
  },
  stats: [
    { value: pricing.perAppointment, suffix: " €", label: "pro vereinbartem Termin – sonst nichts" },
    { value: 0, suffix: " €", label: "monatliche Agenturkosten" },
    { value: pricing.setup, suffix: " €", label: "einmalig für die Einrichtung" },
    { value: 30, suffix: "+", label: "qualifizierte Termine pro Monat garantiert – nach oben offen" },
  ],
  services: {
    kicker: "Was wir übernehmen",
    title: "Alles bis zum Termin. Du übernimmst nur die Beratung.",
    text: "Andere liefern dir Leads und lassen dich damit allein. Wir übernehmen die komplette Strecke – von der Anzeige bis zum bestätigten Termin in deinem Kalender.",
    items: [
      {
        title: "Kampagne",
        time: "Start",
        text: "Wir entwickeln und betreuen Kampagnen, die genau deine Zielgruppe ansprechen. Das Werbebudget zahlst du direkt – transparent und getrennt von uns.",
        tags: ["Zielgruppe", "Anzeigen", "Anfrageseite", "Optimierung"],
      },
      {
        title: "Erstkontakt",
        time: "Wir rufen an",
        text: "Jeder Interessent wird von uns angerufen. Keine Lead-Listen mehr, die bei dir liegen bleiben, keine Mailbox-Schleifen für dich.",
        tags: ["Anrufe", "Nachfassen", "Erreichbarkeit"],
      },
      {
        title: "Qualifizierung",
        time: "Im Gespräch",
        text: "Wir klären Bedarf und Ausgangslage – Beruf, Familie, Wohnsituation, Beratungsanliegen. Nur wer wirklich passt, bekommt einen Termin.",
        tags: ["Bedarf", "Ausgangslage", "Passung"],
      },
      {
        title: "Terminvereinbarung",
        time: `${pricing.perAppointment} € / Termin`,
        text: "Passende Interessenten bekommen einen festen Beratungstermin bei dir. Bezahlt wird nur, was wir wirklich in deinen Kalender legen.",
        tags: ["Fester Termin", "Bestätigung", "Kalendereintrag"],
      },
      {
        title: "Briefing",
        time: "Vor jedem Termin",
        text: "Zu jedem Termin bekommst du ein kurzes Briefing. Du weißt, wer dir gegenübersitzt und warum – und gehst vorbereitet ins Gespräch.",
        tags: ["Anliegen", "Ziel", "Vorbereitung"],
      },
    ],
  },
  work: {
    kicker: "Einblick",
    title: "So sieht KAYCO für dich aus.",
    next: "Dein Kalender ist der nächste.",
    items: [
      {
        client: "Kampagne",
        kind: "Wir bringen Interessenten",
        title: "Anzeigen für deine Zielgruppe – aufgesetzt und betreut von uns.",
        metric: "0 €",
        metricLabel: "monatliche Agenturkosten",
        year: "Schritt 1",
        mock: "dashboard",
      },
      {
        client: "Qualifizierung",
        kind: "Wir rufen an",
        title: "Jeder Interessent wird persönlich angerufen und qualifiziert.",
        metric: "0",
        metricLabel: "Leads, die du selbst anrufen musst",
        year: "Schritt 2",
        mock: "chat",
      },
      {
        client: "Briefing",
        kind: "Du bist vorbereitet",
        title: "Zu jedem Termin weißt du, wer kommt und worum es geht.",
        metric: "1",
        metricLabel: "Briefing pro Termin",
        year: "Schritt 3",
        mock: "doc",
      },
      {
        client: "Kalender",
        kind: "Du berätst",
        title: "Fertige Beratungstermine – direkt in deinem Kalender.",
        metric: `${pricing.perAppointment} €`,
        metricLabel: "pro Termin – und sonst nichts",
        year: "Schritt 4",
        mock: "mobile",
      },
    ],
  },
  process: {
    kicker: "Ablauf",
    title: "In vier Schritten zum vollen Kalender.",
    steps: [
      {
        name: "Gespräch",
        when: "unverbindlich",
        title: "Strategiegespräch",
        text: "Wir lernen deinen Beratungsfokus, deine Zielgruppe und deine Region kennen – und prüfen gemeinsam, ob es passt.",
      },
      {
        name: "Einrichtung",
        when: `einmalig ${pricing.setup} €`,
        title: "Wir richten alles ein",
        text: "Kampagne, Qualifizierung und Kalenderanbindung: Wir bauen die komplette Strecke für dich auf.",
      },
      {
        name: "Akquise",
        when: "laufend",
        title: "Wir telefonieren",
        text: "Wir kontaktieren und qualifizieren jeden Interessenten. Du musst keinen einzigen Lead mehr anrufen.",
      },
      {
        name: "Termine",
        when: `${pricing.perAppointment} € pro Termin`,
        title: "Du berätst",
        text: "Fertige Termine landen mit Briefing in deinem Kalender. Du setzt dich hin und berätst – mehr musst du nicht tun.",
      },
    ],
  },
  pricing: {
    kicker: "Preise",
    title: "Du zahlst nur für Termine. Sonst für nichts.",
    text: `Keine monatlichen Agenturkosten, keine Pauschalen. Einmalig die Einrichtung, dein eigenes Werbebudget – und ${pricing.perAppointment} € für jeden Termin, den wir in deinen Kalender legen.`,
    plans: [
      {
        name: "Einrichtung",
        price: pricing.setup,
        unit: "einmalig",
        text: "Wir bauen die komplette Strecke für dich auf – einmal, dann läuft es.",
        features: ["Strategie für deine Zielgruppe", "Kampagne aufsetzen", "Qualifizierung abstimmen", "Kalender anbinden"],
        cta: "Gespräch buchen",
      },
      {
        name: "Pro Termin",
        price: pricing.perAppointment,
        unit: "pro Termin",
        text: "Du zahlst ausschließlich für Beratungstermine, die wir für dich vereinbaren.",
        features: ["Interessent angerufen und qualifiziert", "Fester Termin in deinem Kalender", "Briefing vor jedem Gespräch", "Keine monatliche Agenturgebühr"],
        cta: "Jetzt starten",
        featured: true,
        badge: "Unser Modell",
      },
      {
        name: "Werbebudget",
        price: null,
        text: "Das Werbebudget zahlst du direkt – getrennt von uns. Die Höhe bestimmst du selbst.",
        features: ["Volle Kostenkontrolle", "Kein Aufschlag von KAYCO", "Höhe nach deinen Zielen", "Wir beraten dich dazu"],
        cta: "Budget besprechen",
      },
    ],
  },
  faq: {
    kicker: "Fragen",
    title: "Was Finanzberater uns zuerst fragen.",
    text: "Noch etwas offen? Schreib uns – wir antworten persönlich.",
    items: faqItems,
  },
  cta: {
    title: "Setz dich hin. Berate. Den Rest machen wir.",
    text: `Lass uns in einem unverbindlichen Strategiegespräch klären, wie viele Termine du brauchst. ${pricing.setup} € Einrichtung, ${pricing.perAppointment} € pro Termin – keine monatlichen Agenturkosten.`,
    button: "Strategiegespräch anfragen",
  },
  footer: {
    claim: "Du berätst. Wir füllen deinen Kalender.",
    copyright: `© 2026 ${site.legalName} · ${site.address.street}, ${site.address.zip} ${site.address.city}`,
    columns: [
      {
        title: "KAYCO",
        links: [
          { label: "Problem", href: "#problem" },
          { label: "Leistung", href: "#services" },
          { label: "Ablauf", href: "#process" },
          { label: "Über uns", href: "#team" },
          { label: "Preise", href: "#pricing" },
        ],
      },
      {
        title: "Rechtliches",
        links: [
          { label: "Impressum", href: "/impressum" },
          { label: "Datenschutz", href: "/datenschutz" },
          { label: "Kontakt", href: `mailto:${site.email}` },
        ],
      },
    ],
    note: "Keine Leads. Termine.",
  },
  email: site.email,
}
