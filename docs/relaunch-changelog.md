# KAYCO – Visueller Relaunch: Änderungen & Prüfprotokoll

Branch: `design-relaunch` (abgezweigt von `main` @ `d9048da`) · Stand: 18.11.2026
Konzept und Designsystem: [`docs/design-system.md`](design-system.md)

## 1. Was sich geändert hat

### Gestaltung
- Organischer Look vollständig ersetzt: kein Baumkronen-Foto, keine fallenden Blätter, kein wachsender
  Baum, keine Jahreszeiten-Paletten, keine Didot-/Poppins-Schriften mehr.
- Neues Designsystem „Der bestätigte Slot“: dunkle Bühne, Signalgrün nur für Termine und Handlungen,
  Instrument Sans (halbschmale Headlines) + Geist Mono (Labels, Zeiten, Nummern).
- Alle Abschnitte neu gestaltet (Hero mit Slot-Board, Statement mit Lese-Effekt, Kalender als
  Produkt-Screen, nummerierte Leistungsliste, Produktkarten, Vier-Stufen-Pipeline, Preiskarten,
  FAQ, Abschluss-Panel, Footer mit Schriftzug, Rechtsseiten).
- Helles Design bleibt über den bestehenden Umschalter erreichbar; Standard ist jetzt dunkel.

### Technik
- Neue Komponenten unter `src/components/landing/`, Stile zentral in `src/app/kayco.css`,
  Tokens in `src/app/globals.css`. Inhalte unverändert in `src/content/kayco.ts`
  (Typen jetzt in `src/content/types.ts`).
- Die Startseite ist überwiegend Server-Komponente; interaktiv sind nur Header, Wechselwort,
  Akkordeons, Kalender-Umschalter, Diagramm und Buttons.
- Entfernt: die 3.000-Zeilen-Vorlage `overstory-studio-landing.tsx`, GSAP (Abhängigkeit
  deinstalliert), das Baumkronen-Foto `public/images/canopy.avif`, die ungenutzte `button-link.tsx`.
- Animationen nur über `transform`/`opacity`, Einblenden per CSS (`animation-timeline: view()`),
  keine Scroll-Übernahme, vollständige Unterstützung für `prefers-reduced-motion`.

### Bewusste, kleine Abweichungen (keine Inhaltsänderung)
| Was | Warum |
|---|---|
| Zusätzliche CTA „Strategiegespräch anfragen“ im Hero | Vorhandener Text, vorhandenes Ziel (`#contact` bzw. Buchungstool) – gibt dem Hero eine klare Handlung |
| Zähler „01 / 05“ der früheren Horizontal-Scroll-Strecke entfällt | Die Einblick-Karten stehen jetzt in einem Raster statt in einer gepinnten Scroll-Strecke; der Zähler war reines Bedienelement |
| Wechselwort der Headline steht in eigener Zeile | Verhindert Layoutsprünge beim Wortwechsel |
| Standard-Design dunkel (Umschalter-Beschriftung daher anfangs „Zu Tageslicht wechseln“) | Beide Beschriftungen wie bisher, nur der Startzustand ist getauscht |
| Sprungziele als echte Anker (`#services` usw.) mit Abschnitts-IDs, Skip-Link auf `#main` | Funktioniert ohne JavaScript, Adresse ist teilbar |

## 2. Was nachweislich gleich geblieben ist

Maschineller Abgleich der gerenderten Seite vorher/nachher (Texte je Abschnitt, Links, Buttons,
Überschriften, Meta-Daten, strukturierte Daten):

- **Texte:** alle Wörter aller 11 Abschnitte, Header und Footer identisch (einzige Ausnahmen oben).
- **Reihenfolge:** top → about → problem → services → work → process → results → team → pricing → faq → contact.
- **Navigation:** gleiche 6 Menüpunkte, gleiche Ziele; Footer-Links und Rechtsseiten-Links gleich.
- **Überschriften-Hierarchie:** 38 Überschriften, gleiche Ebenen (H1–H4) und Texte.
- **SEO:** Title, Description, Canonical, Open Graph, Twitter, robots, `lang` und JSON-LD
  (Organization, Service, FAQPage) unverändert.
- **Rechtsseiten:** Impressum und Datenschutz textgleich, alle Links gleich.
- **Terminbuchung:** mit gesetztem `NEXT_PUBLIC_BOOKING_URL` öffnen alle 8 Buchungs-Buttons das
  Buchungstool (geprüft mit Test-URL); ohne Buchungstool führen sie zu `#contact`, die Abschluss-CTA
  öffnet wie bisher eine E-Mail an hello@kayco.io.
- **Kontakt:** keine Formulare vorhanden (wie bisher); E-Mail-Links und „E-Mail kopieren“ funktionieren.
- **Tracking:** auf der Seite war und ist kein Tracking eingebunden.
- **Header-Verhalten:** exakt übernommen aus `main` (Desktop sticky mit Hysterese, mobil fixiert mit
  Aus-/Einblenden, solid ab 40 px, nie ausgeblendet bei offenem Menü).

## 3. Prüfprotokoll

| Prüfung | Ergebnis |
|---|---|
| Build (`next build`), TypeScript, ESLint | fehlerfrei |
| Funktionstests (Playwright, 59 Prüfungen: Navigation, aktiver Menüpunkt, Header-Verhalten Desktop/mobil, Mobile-Menü inkl. Fokus/Escape/Scroll-Sperre, Kalender, Akkordeons, FAQ, E-Mail kopieren, Links, Rechtsseiten, Theme, Touch-Ziele) | alle bestanden |
| Browserkonsole (Produktion und Entwicklungsmodus) | keine Fehler, keine Hydrierungswarnungen |
| Horizontaler Überlauf (390 px, 360 px, 834 px, ganze Seite) | keiner |
| Layoutsprünge beim Laden und Scrollen (Handy, Tablet, Desktop) | 0,000 |
| `prefers-reduced-motion` | keine Animationen, alle Inhalte sichtbar, Wort wechselt nicht, kein Smooth-Scroll |
| Lighthouse Startseite mobil | Performance 90–93 · Barrierefreiheit 100 · Best Practices 100 · SEO 100 |
| Lighthouse Startseite Desktop | Performance 100 · Barrierefreiheit 100 · Best Practices 100 · SEO 100 |
| Lighthouse Impressum mobil / Desktop | 94 / 100 · alle anderen Kategorien 100 |
| Übertragene Datenmenge Startseite | 257 KB (vorher 499 KB) |
| Ruckelnde Frames beim Scrollen (Handy 4× gedrosselt / Desktop) | 2 % / 0–1 % |

Vergleich vor dem Relaunch (gleiche Messmethode): Lighthouse mobil 80–83, Desktop 100, 499 KB.

## 4. Offene Punkte (unverändert aus der Go-live-Checkliste)
- Rechtstexte prüfen und ergänzen, Buchungstool verbinden.
- Hinweis: Das Baumkronen-Foto wird nicht mehr verwendet; die Lizenz bleibt davon unberührt.
