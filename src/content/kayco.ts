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
    { label: "Ablauf", href: "#process" },
    { label: "Ergebnisse", href: "#results" },
    { label: "Preise", href: "#pricing" },
    { label: "Über uns", href: "#team" },
    { label: "FAQ", href: "#faq" },
  ],
  hero: {
    // Zielgruppe wie in der FAQ („Für wen ist KAYCO?“), gekürzt
    pre: "Für Finanzberater, Versicherungsmakler und Finanzdienstleister.",
    lead: "Keine Leads.",
    words: ["Termine", "Beratungen", "Gespräche"],
    tail: "im Kalender.",
    // Satz aus der Seitenbeschreibung (Meta-Description)
    intro: "KAYCO ruft deine Interessenten an, qualifiziert sie und legt fertige Beratungstermine in deinen Kalender.",
    sub: "Du berätst. Wir machen den Rest.",
    // wie im Abschnitt „Über uns“
    founders: "Gegründet von Magdalena Kayser und Darell Kacou",
    // Optional: Video rechts im Hero statt der Kalender-Ansicht, z. B.
    // video: { src: "/videos/kayco-intro.mp4", poster: "/videos/kayco-intro.jpg", title: "KAYCO in 60 Sekunden" },
  },
  stats: [
    { value: pricing.perAppointment, suffix: " €", label: "pro vereinbartem Termin – sonst nichts" },
    { value: 0, suffix: " €", label: "monatliche Agenturkosten" },
    { value: pricing.setup, suffix: " €", label: "einmalig für die Einrichtung" },
    { value: 30, suffix: "+", label: "qualifizierte Termine pro Monat garantiert – nach oben offen" },
  ],
  // Die fünf Leistungen erscheinen als Leiste unter dem Hero
  services: {
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
  process: {
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
  results: {
    title: "Wenn der Kalender voll ist, wächst der Umsatz.",
    text: "Mehr Beratungen statt mehr Akquise: Wer seine Zeit nicht mehr mit Leads verbringt, sondern mit vorbereiteten Gesprächen, verdient pro Woche mehr – bei gleichem Aufwand.",
    stats: [
      { value: 80, label: "Neukunden haben wir bereits gewonnen." },
      { value: 3, suffix: "×", label: "So stark steigern wir den Umsatz unserer Kunden." },
    ],
  },
  /**
   * Video-Testimonials. Solange die Liste leer ist, erscheint der Bereich nicht.
   * Videos als MP4 (H.264) nach public/videos/ legen, Vorschaubild (JPG) daneben, dann z. B.:
   * { name: "Max Muster", role: "Finanzberater, Köln", video: { src: "/videos/max.mp4", poster: "/videos/max.jpg", title: "Max über KAYCO" } }
   */
  testimonials: {
    title: "Das sagen unsere Kunden.",
    items: [],
  },
  pricing: {
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
          { label: "Ablauf", href: "#process" },
          { label: "Ergebnisse", href: "#results" },
          { label: "Preise", href: "#pricing" },
          { label: "Über uns", href: "#team" },
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
