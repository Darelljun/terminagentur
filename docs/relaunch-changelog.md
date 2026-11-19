# KAYCO – Visueller Relaunch: Änderungen & Prüfprotokoll

Branch: `design-relaunch` (abgezweigt von `main` @ `d9048da`) · Stand: 19.11.2026 (inkl. Update 8)
Konzept und Designsystem: [`docs/design-system.md`](design-system.md)

## Update 8: Neues Logo, Handy-Hero mit Termin-Benachrichtigungen (19.11.2026)

- **Logo** neu als Vektor (SVG, `BrandMark`/`LogoWord` in `src/components/landing/primitives.tsx`), drei
  Varianten vorgelegt, gewählt: **Variante 3** – dunkle Kachel mit weißem „K“ und orangem Slot; Schriftzug aus
  geometrischen Versalien mit orangem Punkt im „O“.
  Eingesetzt in Header, Rechtsseiten, Footer-Schriftzug (groß, dezent, angeschnitten), Favicon und
  Social-Vorschaubild. Hover: Slot und Punkt pulsieren kurz.
- **Handy-Hero:** statt der Kalender-Woche unter dem Intro eine Gründer-Karte (beide Porträts, „Magdalena
  Kayser & Darell Kacou · Gründerteam von KAYCO“ und der Satz aus „Über uns“: „Wir kommen selbst aus der
  Finanzdienstleistungsbranche – und kennen das Problem aus eigener Erfahrung.“). Grund: Direkt danach folgt
  der Kalender-Abschnitt – Termin-Motive im Hero wären doppelt (ein erster Versuch mit Benachrichtigungen
  „Neuer Termin“ wurde deshalb wieder ersetzt). Die kleine Avatar-Zeile entfällt auf dem Handy. Laptop
  unverändert mit Kalender; ein eingetragenes Hero-Video ersetzt beides.

## Update 7: Gründerfotos, noch kompakter (19.11.2026)

- **Fotos** von Magdalena Kayser und Darell Kacou in den Gründer-Karten („Über uns“, Porträt 4:5) und als
  runde Avatare im Hero (wie die Avatar-Reihe bei om-vantage). Nachbesserung nach Rückmeldung („sehen
  komprimiert aus“): Zuschnitte jetzt in Originalauflösung ohne Skalierung (JPEG 95 %, ohne
  Farbunterabtastung) in `src/assets/team/`; `next/image` verkleinert erst beim Ausliefern, mit Qualität 92
  statt 75 (`images.qualities: [75, 92]` in `next.config.ts`), Avatare in 2×/3×-Auflösung, kein
  Unschärfe-Platzhalter. Ausgeliefert z. B. 640 px WebP (51–79 KB) für die Karten.
- **Abschnitt „Preise“ entfernt:** Die Preise stehen weiter in der FAQ („Was kostet KAYCO?“), in den
  Ablauf-Schritten (einmalig 300 € / 75 € pro Termin), in der Leistungsleiste und in der Abschluss-Box.
- **Abschnitt „Ergebnisse“ entfernt:** 80 Neukunden und 3× Umsatz stehen jetzt als Belege im Hero – an der
  Stelle, an der om-vantage Bewertungen zeigt.
- Jetzt 6 Abschnitte: Hero → Problem → Ablauf → [Video-Stimmen, sobald vorhanden] → Über uns → FAQ → Kontakt.
  Navigation: Problem · Ablauf · Über uns · FAQ. Seite rund 6.400 px hoch (vorher 8.000, ursprünglich 13.700).

## Update 6: Dunkler Hintergrund überall erzwungen (19.11.2026)

Rückmeldung: Der Hintergrund erschien weiß, die helle Schrift war darauf nicht zu sehen.
- **Ursache:** Die Seitenfarbe stand in einer Cascade-Layer (`@layer base`). Bringt eine Umgebung eigene
  Seitenstile mit (z. B. ein Vorschau-Rahmen im hellen Modus) oder kennt ein Browser keine Layer, gewinnen
  diese – der Grund wird weiß, die Schrift bleibt hell. Nachgestellt und behoben.
- **Lösung:** Seitenfarbe `#0C0C0C` ohne Layer und mit Vorrang auf `html`/`body`, zusätzlich auf der Seitenwurzel
  und jedem einzelnen Abschnitt (Hero, alle Sections, Footer, Rechtsseiten). Geprüft mit simulierten fremden
  Stilen, die Weiß sogar erzwingen: alle Abschnitte bleiben dunkel.
- **Kalender** im dunklen Modus von Google Kalender statt hell – keine weißen Flächen mehr.
- Kleiner Fehler behoben: Der obere Abstand der Navigation schob die Seite 14 px nach unten (heller Streifen oben).

## Update 5: Kompakt im Agenturstil von om-vantage (19.11.2026)

Auftrag: alle Abschnitte in einer Farbe, lesbare Typografie, Inhalte minimieren, unnötige Abschnitte raus,
Kalender als Google Kalender, gleiche Animationen wie om-vantage, Platz für Video-Testimonials.

- **Kompakter:** 8 statt 11 Abschnitte, Seite rund 40 % kürzer. Entfernt: „Über KAYCO“-Statement mit
  Kennzahlen, Leistungsliste, „Einblick“-Karten, Diagramm, „Wofür KAYCO steht“-Karten, Kicker über den
  Überschriften. Navigation: Ablauf · Ergebnisse · Preise · Über uns · FAQ.
- **Google-Kalender-Ansicht** im Hero und im Problem-Abschnitt (hell, dunkle Schrift; ohne Google-Logo).
  Beispielwoche jetzt 16.–20. November 2026, „heute“ = Donnerstag.
- **Animationen wie om-vantage** (Tabelle in [`design-system.md` → 3.5](design-system.md)); alle
  21st.dev-Effekte entfernt.
- **Typografie:** H2 kompakter (bis 52 px wie om-vantage 45 px), Silber-Verlauf auf allen Überschriften.
- **Video-Testimonials vorbereitet:** Bereich erscheint automatisch, sobald Videos eingetragen sind;
  optional auch ein Video rechts im Hero. Anleitung: [`docs/videos.md`](videos.md).
- **Über uns gekürzt:** ein Absatz weniger („Am Beratungswissen fehlt es selten …“), dafür Gründer-Karten.

## Update 4: Hero wie om-vantage, einheitliche Farbe (19.11.2026)

Auftrag: Hero-Bereich genau wie om-vantage.de aufbauen; eine einheitliche Farbe auf der ganzen Website.

**Hero** (Maße, Abstände und Farben von om-vantage.de vermessen, Inhalte von KAYCO):
| om-vantage | KAYCO | Herkunft des Textes |
|---|---|---|
| Zielgruppen-Zeile | „Für Finanzberater, Versicherungsmakler und Finanzdienstleister.“ | FAQ „Für wen ist KAYCO?“, gekürzt |
| H1, 60 px, Silber-Verlauf | „Keine Leads. / Termine / im Kalender.“ mit Wechselwort, 64 px, Silber-Verlauf | unverändert |
| Einleitung | „KAYCO ruft deine Interessenten an, … Du berätst. Wir machen den Rest.“ | Meta-Description + bisheriger Untertitel |
| Google-/Trustpilot-Bewertungen | **keine** – stattdessen „30+ qualifizierte Termine pro Monat garantiert“ und „0 € monatliche Agenturkosten“ | Kennzahlen aus „Über KAYCO“ (keine erfundenen Bewertungen) |
| Orange CTA in Versalien | „STRATEGIEGESPRÄCH ANFRAGEN“ (Schrift dunkel statt weiß – Kontrast) | unverändert, nur Versalien per CSS |
| Avatare + „Sichere Dir Deinen Platz!“ | Kürzel MK/DK + „Gegründet von Magdalena Kayser und Darell Kacou“ | Abschnitt „Über uns“ |
| Video rechts | Slot-Board, jetzt flach mit Radius 24 | – |
| Leiste mit 5 Vorteilen | Kampagne · Erstkontakt · Qualifizierung · Terminvereinbarung · Briefing | Titel und Zeit-Chips der Leistungen |
| Schwebende Navigation | Pille mit Glas-Unschärfe, Links weiß, aktiver Abschnitt grau, dunkler Button | Verhalten (Ein-/Ausblenden) unverändert |

Entfernt aus dem Hero: Preis-Pille „75 € pro Termin · keine monatlichen Agenturkosten“ (Information steht
weiter in Kennzahlen, Preisen und Kontakt), Link „Scrollen und mehr erfahren“, Raster, Lichtstrahlen (Grid
Beams), Leuchtkugeln, 3D-Neigung und Lichtpunkt am Board, Glanz auf der Status-Zeile.

**Einheitliche Farbe:** jeder Abschnitt `#0C0C0C` (keine abweichenden Abschnittsflächen, keine Trennlinien
oder Leuchtkanten mehr), Karten als Umrandung auf der Seitenfarbe mit Navy-Schimmer von unten (wie die
Schritt-Karten bei om-vantage), Abschluss-Box mit 2 px Navy-Rand und Leuchten (wie die Erstgespräch-Box),
Raster im Abschluss entfernt, Kalender-Kategorie „Kein Bedarf“ in kühlem Grau statt Braun, orange Buttons
überall in Versalien.

## Update 3: Farbpalette von om-vantage.de, Laufbänder entfernt (19.11.2026)

Auftrag: Farbpalette genau wie om-vantage.de; das Laufband mit „75 € pro Termin“ entfernen, damit
KAYCO als ernstzunehmende Agentur wirkt.

- **Farben:** Werte direkt von om-vantage.de ausgelesen und als Tokens übernommen – Hintergrund
  `#0C0C0C`, Karten `#1C1C1C`, Text `#FFFFFF`/`#D1D1D1`, Orange `#FF8F00` für Buttons und Termine,
  Navy `#023E97` und Blau `#0067FF`/`#7AB3FF` für Licht und hervorgehobene Karten (Tabelle:
  [`design-system.md` → 3.1](design-system.md)). Grün und Cyan sind überall ersetzt: Effekte,
  Lichtstrahlen, Footer-Schriftzug, Kalender, Diagramm, Favicon-Punkt und Social-Vorschaubild.
- **Hervorgehobener Preis** wie die CTA-Box bei om-vantage: Navy-Rand mit Navy-Leuchten, Button orange.
- **Laufbänder entfernt** (unter dem Hero und vor dem Kontakt), samt Komponente, Stilen und Inhaltsfeld.
- **Eine Textanpassung aus sachlichem Grund:** Im Kalender hieß es „Jeder grüne Slot ist ein fertiger
  Termin …“. Die Slots sind jetzt orange, daher „Jeder orangefarbene Slot …“.
- Bewusste Abweichung von om-vantage: Grau für Labels `#8A8A8A` statt `#7A7A7A` (sonst unter AA auf Karten).

## Update 2: „Black Edition“ & Animationen (18.11.2026)

Auftrag: dunkleres, schwarzes Agentur-Design und deutlich mehr Animation (Vorbilder von 21st.dev),
damit Besucher sofort sagen: „Mit denen will ich arbeiten.“

**Gestaltung**
- Tiefschwarzes Farbsystem (`#000` statt Mitternachtsblau), Signalgrün + Cyan als Lichtfarben,
  größere Headlines (H1 bis 122 px, H2 bis 80 px), Überschriften mit Weiß-Grau-Verlauf.
- Nur noch ein Design: Der Hell/Dunkel-Umschalter im Header ist entfernt.
- Feines Filmkorn über der Seite, leuchtende Kanten an den Abschnittsübergängen, Scroll-Fortschritt.

**17 Effekte, seit Update 3 noch 16** (Liste mit Vorbild und Einsatzort: [`design-system.md` → 3.5.1](design-system.md)):
Grid Beams im Hero, Kinetic Typography, chromatisches Wechselwort, Text Shimmer, Shiny + Magnetic
Buttons, Border Beam, 3D-Tilt, Glowing Effect, Spotlight, ~~Infinite Marquee~~, Wort-für-Wort-Einblendung
der H2, Number Ticker, Animated Beam im Ablauf, Lamp, Sparkles, Text-Hover-Schriftzug im Footer.

**Neu, bewusst ergänzt (keine neuen Aussagen)**
| Was | Inhalt / Begründung |
|---|---|
| Zwei Laufbänder | In Update 3 wieder entfernt |
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

## 3. Prüfprotokoll (Stand nach Update 8)

| Prüfung | Ergebnis |
|---|---|
| Build (`next build`), TypeScript, ESLint | fehlerfrei |
| Inhaltsabgleich gegen den Stand vor dem Relaunch | Texte, Reihenfolge, Links, Überschriften, Meta-Daten, JSON-LD, Rechtsseiten gleich; Unterschiede nur: Hero (siehe Update 4), Schriftzug als SVG, Hell-Umschalter entfernt, Kalender-Satz „grüne“ → „orangefarbene“ Slot |
| Funktionstests (Playwright, 60 Prüfungen, u. a. Gründerfotos geladen und Belege im Hero: Navigation, aktiver Menüpunkt, Header-Verhalten, Mobile-Menü inkl. Fokus/Escape/Scroll-Sperre, kompakte Abschnittsfolge, Google-Kalender (dunkel) lesbar, Kalender inkl. Auto-Wechsel, FAQ, E-Mail kopieren, Links, Rechtsseiten, Einblenden, Zähler-Endwerte, Touch-Ziele) | alle bestanden |
| Browserkonsole (Produktion und Entwicklungsmodus) | keine Fehler, keine Hydrierungswarnungen |
| Horizontaler Überlauf (390 px, 360 px, 834 px, ganze Seite) | keiner |
| Layoutsprünge beim Laden und Scrollen (Handy, Tablet, Desktop) | 0,000 |
| `prefers-reduced-motion` | keine Animationen, alle Inhalte sichtbar, Wort wechselt nicht, kein Smooth-Scroll |
| Lighthouse Startseite mobil | Performance 94–96 (Update 6: 92–94, Update 4: 93, Update 3: 91, Update 2: 85–88) · Barrierefreiheit 100 · Best Practices 100 · SEO 100 (gemessener LCP 0,3 s; der simulierte Wert 2,6 s entsteht durch die zusätzliche Stil-/Animationsarbeit beim ersten Aufbau) |
| Lighthouse Startseite Desktop | Performance 100 · Barrierefreiheit 100 · Best Practices 100 · SEO 100 |
| Lighthouse Impressum mobil / Desktop | 97 / 100 · alle anderen Kategorien 100 |
| Übertragene Datenmenge Startseite | 274 KB mobil inkl. Fotos in hoher Qualität (Update 1: 257 KB, vor dem Relaunch 499 KB) |
| Ruckelnde Frames beim Scrollen (Handy 4× gedrosselt / Desktop) | 3–4 % / 2 % (ohne Pausieren außerhalb des Bildes wären es 15–18 % gewesen) |

Vergleich: vor dem Relaunch Lighthouse mobil 80–83 / 499 KB; nach Update 1 mobil 90–93 / 257 KB.

## 4. Offene Punkte (unverändert aus der Go-live-Checkliste)
- Rechtstexte prüfen und ergänzen, Buchungstool verbinden.
- Hinweis: Das Baumkronen-Foto wird nicht mehr verwendet; die Lizenz bleibt davon unberührt.
