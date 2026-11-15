export const site = {
  name: "KAYCO",
  legalName: "Kacou North",
  domain: "kayco.de",
  url: "https://kayco.de",
  email: "hello@kayco.de",
  address: {
    street: "Albertus-Magnus-Straße 4",
    zip: "41470",
    city: "Neuss",
    country: "Deutschland",
  },
  founders: ["Magdalena Kayser", "Darell Kacou"],
  title: "KAYCO – Qualifizierte Beratungstermine für Finanzdienstleister",
  description:
    "Keine Leads. Termine. KAYCO vereinbart vorqualifizierte Beratungstermine für Finanzberater, Versicherungsmakler und Finanzvertriebe – mit Garantie auf mindestens 30 qualifizierte Termine pro Monat.",
  /**
   * Link zum Online-Buchungstool (z. B. Cal.com, Calendly, Microsoft Bookings).
   * Wird über die Umgebungsvariable NEXT_PUBLIC_BOOKING_URL gesetzt.
   * Ohne Wert zeigt die Website den Status „noch nicht verbunden“ und bietet die E-Mail-Anfrage an.
   */
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL?.trim() || null,
} as const;

export const navItems = [
  { label: "Unterschied", id: "unterschied" },
  { label: "Ablauf", id: "ablauf" },
  { label: "Qualifizierung", id: "qualifizierung" },
  { label: "Versprechen", id: "versprechen" },
  { label: "Über uns", id: "ueber-uns" },
  { label: "FAQ", id: "faq" },
] as const;

export const contactMailto = (subject = "Anfrage Strategiegespräch", body = "") =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}${
    body ? `&body=${encodeURIComponent(body)}` : ""
  }`;
