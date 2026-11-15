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
    "Keine Leads. Termine. KAYCO ruft deine Interessenten an, qualifiziert sie und legt fertige Beratungstermine in deinen Kalender. 75 € pro Termin, keine monatlichen Agenturkosten.",
  /**
   * Link zum Online-Buchungstool (z. B. Cal.com, Calendly, Microsoft Bookings).
   * Wird über die Umgebungsvariable NEXT_PUBLIC_BOOKING_URL gesetzt.
   * Ohne Wert zeigt die Website den Status „noch nicht verbunden“ und bietet die E-Mail-Anfrage an.
   */
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL?.trim() || null,
} as const;
