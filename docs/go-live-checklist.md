# KAYCO – Checkliste vor dem Livegang

## Rechtliches (gelb markierte Stellen auf /impressum und /datenschutz)
- [ ] Impressum: vollständiger Name der Inhaberin/des Inhabers bzw. Rechtsform und vertretungsberechtigte Person(en)
- [ ] Impressum: weiterer schneller Kontaktweg (z. B. Telefonnummer) prüfen
- [ ] Impressum: USt-IdNr. ergänzen, falls vorhanden (Steuernummer wird bewusst nicht veröffentlicht)
- [ ] Impressum: Registereintrag nur falls vorhanden, sonst Abschnitt entfernen
- [ ] Gewerberecht prüfen: Erlaubnis-/Registerpflichten (z. B. §§ 34d, 34f GewO) für die Terminvermittlung
- [ ] Datenschutz: Hosting-Anbieter, Logfile-Speicherdauer, AV-Vertrag, ggf. Drittlandübermittlung
- [ ] Datenschutz: E-Mail-Anbieter für hello@kayco.io
- [ ] Datenschutz: Datenschutzbeauftragter erforderlich?
- [ ] Datenschutz: Rechtsgrundlage und Rollen (AV / gemeinsame / getrennte Verantwortlichkeit) bei der Weitergabe von Interessentendaten an Finanzdienstleister festlegen und vertraglich regeln
- [ ] Datenschutzhinweise für Interessenten an der Erhebungsstelle (Kampagnen-/Formularseiten) bereitstellen
- [ ] Hinweisbox „Entwurf – vor Veröffentlichung rechtlich prüfen“ in `src/components/site/legal-page.tsx` entfernen, sobald alles geprüft ist
- [ ] Verträge: Kriterien „qualifizierter Termin“, Garantiezeitraum, Vergütung je Termin schriftlich festlegen (die Website verweist darauf)

## Terminbuchung
- [ ] Buchungstool wählen (z. B. Cal.com, Calendly, Microsoft Bookings) und Link als `NEXT_PUBLIC_BOOKING_URL` setzen (siehe `.env.example`), danach neu bauen
- [ ] Datenschutzerklärung, Abschnitt 5 „Online-Terminbuchung“, für den gewählten Anbieter ergänzen
- [ ] Prüfen, ob das Buchungstool einwilligungspflichtige Cookies setzt – dann Einwilligungslösung ergänzen

## Bilder
- [x] Hero-Foto `public/images/canopy.avif` (Adobe Stock #303147850): Lizenz liegt bei KAYCO vor (bestätigt am 15.11.2026)

## Technik
- [ ] Domain kayco.io auf das Hosting zeigen lassen, HTTPS aktiv
- [ ] Postfach hello@kayco.io empfängt E-Mails (Testmail senden)
- [ ] Google Search Console: Sitemap `https://www.kayco.io/sitemap.xml` einreichen
