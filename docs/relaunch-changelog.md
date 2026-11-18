# KAYCO – Visueller Relaunch: Änderungen & Prüfprotokoll

Branch: `design-relaunch` (abgezweigt von `main` @ `d9048da`) · Stand: 18.11.2026 (inkl. Update 2)
Konzept und Designsystem: [`docs/design-system.md`](design-system.md)

## Update 2: „Black Edition“ & Animationen (18.11.2026)

Auftrag: dunkleres, schwarzes Agentur-Design und deutlich mehr Animation (Vorbilder von 21st.dev),
damit Besucher sofort sagen: „Mit denen will ich arbeiten.“

**Gestaltung**
- Tiefschwarzes Farbsystem (`#000` statt Mitternachtsblau), Signalgrün + Cyan als Lichtfarben,
  größere Headlines (H1 bis 122 px, H2 bis 80 px), Überschriften mit Weiß-Grau-Verlauf.
- Nur noch ein Design: Der Hell/Dunkel-Umschalter im Header ist entfernt.
- Feines Filmkorn über der Seite, leuchtende Kanten an den Abschnittsübergängen, Scroll-Fortschritt.

**17 Effekte** (Liste mit Vorbild und Einsatzort: [`design-system.md` → 3.5.1](design-system.md)):
Grid Beams im Hero, Kinetic Typography, chromatisches Wechselwort, Text Shimmer, Shiny + Magnetic
Buttons, Border Beam, 3D-Tilt, Glowing Effect, Spotlight, Infinite Marquee, Wort-für-Wort-Einblendung
der H2, Number Ticker, Animated Beam im Ablauf, Lamp, Sparkles, Text-Hover-Schriftzug im Footer.

**Neu, bewusst ergänzt (keine neuen Aussagen)**
| Was | Inhalt / Begründung |
|---|---|
| Zwei Laufbänder (unter dem Hero, vor dem Kontakt) | Nur wörtliche Aussagen, die bereits auf der Seite stehen (`marquee` in `src/content/kayco.ts`); für Screenreader ausgeblendet, damit nichts doppelt vorgelesen wird |
| Footer-Schriftzug als SVG mit Hover-Licht | Gleicher Text „KAYCO“ wie vorher (vorher Einzelbuchstaben) |
| Kalender wechselt einmal von selbst auf „Mit KAYCO“ | Erst wenn der Kalender gut sichtbar ist und man 1,4 s hinschaut; nie, wenn man selbst umgeschaltet hat |
| Zahlen zählen beim Hineinscrollen hoch | Server-HTML und Suchmaschinen sehen immer den Endwert |

**Technik**
- Neue Dateien: `src/app/fx.css` (Effekt-Schicht), `src/components/effects/` (`fx-controller.tsx`,
  `grid-beams.tsx`, `number-ticker.tsx`, `fx.tsx`). Keine neuen Abhängigkeiten.
- Leistung: Endlos-Animationen pausieren außerhalb des Bildes, Zeiger-Effekte nur mit Maus,
  Canvas startet erst nach dem Laden, Hero-Text ist ab dem ersten Bild sichtbar.

## 1. Was sich geändert hat (Relaunch, Update 1)

### Gestaltung
- Organischer Look vollständig ersetzt: kein Baumkronen-Foto, keine fallenden Blätter, kein wachsender
  Baum, keine Jahreszeiten-Paletten, keine Didot-/Poppins-Schriften mehr.
- Neues Designsystem „Der bestätigte Slot“: dunkle Bühne, Signalgrün nur für Termine und Handlungen,
  Instrument Sans (halbschmale Headlines) + Geist Mono (Labels, Zeiten, Nummern).
- Alle Abschnitte neu gestaltet (Hero mit Slot-Board, Statement mit Lese-Effekt, Kalender als
  Produkt-Screen, nummerierte Leistungsliste, Produktkarten, Vier-Stufen-Pipeline, Preiskarten,
  FAQ, Abschluss-Panel, Footer mit Schriftzug, Rechtsseiten).
- Helles Design war zunächst über den Umschalter erreichbar; mit Update 2 entfernt (siehe oben).

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

## 3. Prüfprotokoll (Stand nach Update 2)

| Prüfung | Ergebnis |
|---|---|
| Build (`next build`), TypeScript, ESLint | fehlerfrei |
| Inhaltsabgleich gegen den Stand vor dem Relaunch | Texte, Reihenfolge, Links, Überschriften, Meta-Daten, JSON-LD, Rechtsseiten gleich; neu nur Laufbänder (wörtliche Zitate), Schriftzug als SVG, Hell-Umschalter entfernt |
| Funktionstests (Playwright, 62 Prüfungen: Navigation, aktiver Menüpunkt, Header-Verhalten Desktop/mobil, Mobile-Menü inkl. Fokus/Escape/Scroll-Sperre, Kalender inkl. Auto-Wechsel, Akkordeons, FAQ, E-Mail kopieren, Links, Rechtsseiten, schwarzes Design, Zähler-Endwerte, Touch-Ziele) | alle bestanden |
| Browserkonsole (Produktion und Entwicklungsmodus) | keine Fehler, keine Hydrierungswarnungen |
| Horizontaler Überlauf (390 px, 360 px, 834 px, ganze Seite) | keiner |
| Layoutsprünge beim Laden und Scrollen (Handy, Tablet, Desktop) | 0,000 |
| `prefers-reduced-motion` | keine Animationen, alle Inhalte sichtbar, Wort wechselt nicht, kein Smooth-Scroll |
| Lighthouse Startseite mobil | Performance 85–88 · Barrierefreiheit 100 · Best Practices 100 · SEO 100 (gemessener LCP 0,3 s; der simulierte Wert 2,6 s entsteht durch die zusätzliche Stil-/Animationsarbeit beim ersten Aufbau) |
| Lighthouse Startseite Desktop | Performance 100 · Barrierefreiheit 100 · Best Practices 100 · SEO 100 |
| Lighthouse Impressum mobil / Desktop | 98 / 100 · alle anderen Kategorien 100 |
| Übertragene Datenmenge Startseite | 266 KB (Update 1: 257 KB, vor dem Relaunch 499 KB) |
| Ruckelnde Frames beim Scrollen (Handy 4× gedrosselt / Desktop) | 3–4 % / 2 % (ohne Pausieren außerhalb des Bildes wären es 15–18 % gewesen) |

Vergleich: vor dem Relaunch Lighthouse mobil 80–83 / 499 KB; nach Update 1 mobil 90–93 / 257 KB.

## 4. Offene Punkte (unverändert aus der Go-live-Checkliste)
- Rechtstexte prüfen und ergänzen, Buchungstool verbinden.
- Hinweis: Das Baumkronen-Foto wird nicht mehr verwendet; die Lizenz bleibt davon unberührt.
