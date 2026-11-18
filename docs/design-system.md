# KAYCO – Visueller Relaunch: Analyse & Designsystem

Stand: 18.11.2026 · Branch `design-relaunch`

Dieses Dokument ist die verbindliche Grundlage für den Relaunch. Erst Analyse, dann System,
dann Umsetzung. Inhalte (Texte, Reihenfolge, Links, Buchung, SEO, Rechtliches) bleiben
unverändert – geändert wird ausschließlich die Gestaltung.

---

## 1. Analyse

### 1.1 Referenz (om-vantage.de) – was sie hochwertig wirken lässt

| Bereich | Beobachtung | Übertragbares Prinzip |
|---|---|---|
| Grundton | Durchgehend dunkel (#0C0C0C) mit tiefblauen Lichtfeldern hinter Inhalten | Dunkle, ruhige Bühne; Tiefe durch weiches Licht statt durch Fotos |
| Typografie | Groteske (Barlow 600) mit enger Laufweite (−2,8 px bei 60 px), Verlauf von Grau nach Weiß in Überschriften; Fließtext leicht und hell-grau | Kräftige, eng gesetzte Headlines; klarer Kontrast Headline ↔ Fließtext |
| Hero | Zielgruppe als Vorzeile, große 3-zeilige Headline, Lead-Text, Social Proof, eine starke CTA | Klare Leserichtung: Kontext → Versprechen → Begründung → Handlung |
| Navigation | Schwebende, abgerundete Leiste mit Glas-Hintergrund, CTA rechts | Ruhige Leiste, CTA immer erreichbar |
| Rhythmus | Großzügige Abschnittsabstände (≈150 px), Inhalte auf ~800–1000 px Breite zentriert | Viel Luft, wenige Elemente pro Abschnitt |
| Karten | Dunkelblaue Flächen, 1 px Haarlinien-Rand, ~20 px Radius, große verblasste Ziffern | Karten über Rand + Fläche statt Schatten; Nummern als grafisches Element |
| Problem-Darstellung | Rot getönte Karten mit ✕ | Problem und Lösung farblich klar trennen |
| Kennzahlen | Zahlenreihe in umrandetem Kasten | Zahlen groß, Erklärung klein darunter |
| Buttons | Pillenform, Großbuchstaben, Pfeil-Icon, kräftige Akzentfarbe | Eine Akzentfarbe nur für Handlungen |
| FAQ | Haarlinien-Liste mit Plus-Symbol | Reduziertes Akkordeon |
| Abschluss | CTA-Kasten mit leuchtendem Rand, riesiger Schriftzug im Footer | Starker Schlusspunkt, Marke groß im Footer |
| Bewegung | Überschriften hellen beim Scrollen auf, sonst wenig Bewegung | Bewegung dient dem Lesen, nicht der Show |
| Mobil | Zentrierte Texte, große Headlines, Menü als Overlay | Mobil eigene, ruhige Komposition |

Nicht übernommen werden: Logo, Farben (Orange/Blau), Schriften (Barlow/Quicksand), Fotos,
Videos, Bewertungen, Logos, Texte oder die konkrete Anordnung einzelner Module.

### 1.2 Bestehende Kayco-Seite – Ausgangslage

| Bereich | Ist-Zustand | Problem für die Wahrnehmung als B2B-Agentur |
|---|---|---|
| Bildwelt | Baumkronen-Foto, fallende Blätter, wachsender Baum, Jahreszeiten-Paletten | Wirkt wie Naturprodukt/Kreativstudio, nicht wie Performance-Agentur |
| Farben | Papier-Beige (#F4F6F0), Waldgrün, Limette | Organisch, weich, wenig Kontrast |
| Typografie | Systemschrift + Didot/Bodoni-Wechselwort, Poppins im „Über uns“ | Drei Schriftwelten, uneinheitlich |
| Hero | Scroll-Szene „durch die Baumkronen aufsteigen“ | Aufwendig, inhaltlich ohne Bezug zu Terminen |
| Komponenten | Gemischte Stile aus Vorlage und Eigenbau (Kalender, Diagramm, Über uns) | Kein durchgängiges System |
| Technik | 3.000-Zeilen-Vorlage, GSAP-Storyboard, Canvas-Foto | Schwer wartbar, viel JavaScript |

Stärken, die bleiben: klare Texte, Kalender-Visualisierung (Problem), Diagramm (Ergebnisse),
klares Preismodell, gute Informationsarchitektur.

---

## 2. Markenidee: „Der bestätigte Slot“

KAYCO verkauft keine Leads, sondern **bestätigte Termine**. Das visuelle Leitmotiv ist deshalb
der **Slot**: ein abgerundetes Rechteck im Zeitraster eines Kalenders. Er taucht als Akzent-
quadrat in Labels, als leuchtende Kachel im Hero-Raster, als Knoten im Ablauf und als
Kalendereintrag auf. Signalgrün steht ausschließlich für „bestätigt / Handlung“.

Tonalität: dunkel, präzise, ruhig, selbstbewusst – Datenästhetik einer Performance-Agentur,
kein Fintech-SaaS-Template (keine Verlaufs-Blobs in Lila, keine Icon-Kachel-Raster als Füller).

---

## 3. Designsystem

### 3.1 Farben (Tokens, `src/app/globals.css`) – „Black Edition“

Nur noch ein Design: tiefschwarz. Der frühere Hell/Dunkel-Umschalter ist entfernt (Wunsch: Agentur-Look,
konsequent dunkel). `color-scheme: dark`, `theme-color #000000`.

| Token | Wert | Verwendung |
|---|---|---|
| `--k-bg` | `#000000` | Seitenhintergrund |
| `--k-bg-2` | `#050607` | Wechsel-Abschnitte |
| `--k-surface` | `#0B0D10` | Karten |
| `--k-surface-2` | `#12151A` | Karten-Hover, Eingebettetes |
| `--k-line` | `rgb(255 255 255 / .08)` | Haarlinien |
| `--k-line-2` | `rgb(255 255 255 / .15)` | Betonte Linien |
| `--k-text` | `#F4F6F8` | Text |
| `--k-text-2` | `#A3ABB8` | Fließtext, sekundär |
| `--k-text-3` | `#7B8493` | Labels, Metadaten |
| `--k-accent` | `#3DDC97` | Signalgrün: Buttons, Slots, Fokus, Lichteffekte |
| `--k-accent-2` | `#22D3EE` | Cyan – nur als zweite Farbe in Licht-Verläufen |
| `--k-accent-ink` | `#02130B` | Text auf Akzent |
| `--k-accent-text` | `#5AE6A8` | Akzent als Textfarbe |
| `--k-glow` | `rgb(34 120 255 / .22)` | Blaues Hintergrundlicht |
| `--k-warn` | `#F07C7C` | Verlust/Problem (Kalender) |

Kontraste (WCAG, auf Schwarz / auf der hellsten Kartenfläche `#12151A`): Text 19,4 / 16,9 ·
Text-2 9,1 / 7,9 · Text-3 5,6 / 4,8 · Akzent-Text 13,3 / 11,6 · Button-Text auf Akzent 10,8 → alle ≥ AA.
Der Lese-Effekt im Statement startet bei 42 % Deckkraft und hält damit ≥ 3:1 für große Schrift ein.
Überschriften mit Verlauf (Weiß → Grau) bleiben auch am dunkelsten Punkt über 7:1.

### 3.2 Typografie

- **Instrument Sans** (variabel, `wght` 400–700, `wdth` 75–100), lokal über `next/font`.
  - Headlines: `wdth 84` (halbschmal), `wght 600`, Laufweite −0,035 em, Zeilenhöhe 0,98–1,05.
  - Fließtext: `wdth 100`, `wght 400/500`.
- **Geist Mono** (500) für Labels, Nummern, Zeiten – die „Daten-Stimme“ der Agentur.

| Stufe | Größe | Einsatz |
|---|---|---|
| `display-xl` | clamp(50px, 8vw, 122px) | H1 |
| `display-l` | clamp(38px, 5.4vw, 80px) | H2 (Abschluss: clamp(42px, 6.8vw, 104px)) |
| `display-m` | clamp(22px, 2vw, 28px) | Karten-/Schritt-Titel |
| `body-l` | clamp(17px, 1.3vw, 20px) / 1,55 | Lead-Texte |
| `body` | 16px / 1,6 | Fließtext |
| `small` | 14px / 1,5 | Sekundäres |
| `label` | 12px Mono, Versalien, +0,08 em | Kicker, Chips, Zeiten |

### 3.3 Raster, Abstände, Formen

- Container 1240 px, Rand `clamp(20px, 4vw, 48px)`, 12-Spalten-Logik mit 24 px Abstand.
- Abschnitte: `clamp(96px, 11vw, 168px)` oben/unten; Kopf → Inhalt `clamp(48px, 6vw, 80px)`.
- 4-px-Grundraster. Radien: 8 (Chips) · 14 (kleine Elemente) · 22 (Karten) · 32 (Panels) · Pille.
- Tiefe über Fläche + Haarlinie + Innenkante (`inset 0 1px 0 rgb(255 255 255 / .04)`), Licht
  nur hinter Schlüsselelementen (Hero, Preise-Modell, Abschluss).

### 3.4 Komponenten

| Komponente | Spezifikation |
|---|---|
| Header | Volle Breite, 72 px (mobil 64 px). Oben transparent; ab 40 px Scroll Fläche `--k-bg` 78 % + Unschärfe + Haarlinie. Verhalten unverändert: Desktop sticky, blendet nach 400 px beim Runterscrollen (≥ 32 px) aus und beim Hochscrollen (≥ 20 px) ein; mobil fixiert, aus/ein nach 16 px, nie bei offenem Menü. Aktiver Menüpunkt mit Akzent-Slot. |
| Mobile-Menü | Vollflächiges Panel unter dem Header, nummerierte Links (Mono), CTA, Fokusfalle, Escape, Hintergrund-Scroll gesperrt, schließt beim Wechsel auf Desktop. |
| Kicker | Akzent-Slot (8 × 8, Radius 2) + Mono-Nummer + Label, z. B. `▪ 02 — WAS WIR ÜBERNEHMEN` |
| Abschnittskopf | Kicker + H2 links, Lead rechts (ab 960 px), sonst untereinander |
| Primär-Button | Akzentfläche, Pille, 48 px (mobil 52 px), 15 px/600, Pfeil verschiebt sich bei Hover um 3 px. Haupt-CTAs als „Shiny Button“: umlaufender Lichtrand, Glanz-Streifen, Leuchten bei Hover, magnetisch (Maus) |
| Sekundär-Button | Transparent, Rand `--k-line-2`, Hover Fläche `--k-surface-2` |
| Karte | `--k-surface`, Rand `--k-line`, Radius 22, Hover (nur Maus): Lichtkante folgt dem Zeiger, Spotlight, leichte 3D-Neigung |
| Chip | Mono 12 px, Rand `--k-line-2`, Radius 8 |
| Akkordeon | Haarlinien-Liste, Plus-Symbol in Kreis dreht zu ×, Höhe per CSS-Grid animiert |
| Kennzahl | Zahl `display-l` in Tabellenziffern, Haarlinie oben, Label `small` |

### 3.5 Bewegung

- Kurven: `--k-ease: cubic-bezier(.2,.7,.2,1)`; Dauer 160 ms (Mikro), 320 ms (UI), 700 ms (Einblenden).
- Einstieg Hero: CSS-Animation ab dem ersten Bild (kein Warten auf JavaScript). Die Headline ist ab dem
  ersten Bild schwach sichtbar und wird scharf (kein unsichtbarer Text → schneller LCP).
- Abschnitte: Einblenden gekoppelt an die Scrollposition (`animation-timeline: view()`); ohne
  Browser-Unterstützung sofort sichtbar. Keine Scroll-Übernahme, kein Pinning.
- `prefers-reduced-motion: reduce`: alle Animationen, Lichtstrahlen, Funkeln und Zähler aus, Inhalte
  sofort sichtbar, `scroll-behavior: auto`.

### 3.5.1 Effekt-Bibliothek (nach 21st.dev-Vorbildern, ohne neue Abhängigkeiten)

Alle Effekte sind selbst in CSS bzw. kleinem React-Code umgesetzt (`src/app/fx.css`,
`src/components/effects/`). Kein Motion/GSAP/Three.js.

| Effekt (Vorbild) | Wo | Umsetzung |
|---|---|---|
| Grid Beam (cult-ui) | Hero-Hintergrund | Canvas, Lichtstrahlen auf den Rasterlinien; startet erst nach dem Laden, pausiert außerhalb des Bildes und im Hintergrund-Tab |
| Spotlight | Hero, Leistungsliste, Footer-Schriftzug | Radialer Lichtkegel an der Zeigerposition (nur Maus) |
| Kinetic Typography | H1 | Wörter steigen gestaffelt aus der Unschärfe |
| Chromatic Text / Word Rotate | Wechselwort „Termine“ | Farbverlauf läuft über das Wort, Wechsel mit Unschärfe |
| Text Shimmer | Status-Zeile im Hero | Glanz läuft über den Text |
| Shiny Button + Magnetic Button | Haupt-CTAs | Rotierender Lichtrand, Glanzstreifen, folgt dem Zeiger um wenige Pixel |
| Border Beam (Magic UI) | Slot-Board, Preis „Jetzt starten“, Abschluss-Panel | Lichtpunkt umläuft den Rand (`offset-path`) |
| Tilt / 3D Card | Slot-Board, Einblick-Karten, Preiskarten, Über-uns-Panel | Leichte Neigung zum Zeiger (max. 6°/8°) |
| Glowing Effect (Aceternity) | Karten, Kalender, FAQ | Leuchtende Kante folgt dem Zeiger um die Karte |
| Infinite Marquee | Unter dem Hero, vor dem Kontakt | Laufband aus wörtlichen Aussagen der Seite, dekorativ (für Screenreader ausgeblendet) |
| Text Scroll Reveal | Alle H2 | Wörter erscheinen beim Scrollen gestaffelt |
| Number Ticker (Magic UI) | Kennzahlen, Ergebnisse, Preise | Zählt beim Hineinscrollen hoch; Server liefert den Endwert |
| Animated Beam | Ablauf | Lichtimpuls läuft die Pipeline entlang, Knoten pulsieren nacheinander |
| Lamp (Aceternity) | Abschluss-Panel | Lichtkegel öffnet sich beim Scrollen |
| Sparkles | Abschluss-Panel | Funkelnde Lichtpunkte |
| Text Hover Effect (Aceternity) | Footer-Schriftzug „KAYCO“ | Kontur zeichnet sich, Verlauf folgt dem Zeiger (Touch: wandert von selbst) |
| Scroll Progress | Oberkante | Fortschrittsbalken gekoppelt an die Scrollposition |

Regeln, damit das flüssig bleibt:
- Zeiger-Effekte nur mit Maus/Trackpad (`hover: hover` + `pointer: fine`), ein einziger Listener
  (`FxController`), pro Frame erst lesen, dann schreiben, nur sichtbare Elemente.
- Endlos-Animationen laufen nur, solange ihr Abschnitt im Bild ist (`data-idle` hält sie an).
- Unschärfe bei der Wort-Einblendung nur auf Desktop; auf Handys nur Deckkraft + Versatz.
- Canvas mit begrenzter Pixeldichte (1,5 bzw. 1,25 auf Touch).

### 3.6 Responsiv

Breakpoints: 560 · 820 (Header-Wechsel, wie bisher) · 1024 · 1280. Mobil: einspaltig,
Touch-Ziele ≥ 44 px, keine Hover-Abhängigkeiten, `overflow-x: clip` am Body, reservierte
Höhen für nachgeladene Elemente (keine Layoutsprünge).

### 3.7 Barrierefreiheit

Skip-Link, sichtbarer Fokus (2 px Akzent, 3 px Abstand), semantische Überschriften-Hierarchie
wie bisher, `aria-expanded`/`aria-controls` an Akkordeons, `aria-pressed` am Kalender-Umschalter,
Kontraste ≥ AA, dekorative Grafik `aria-hidden`.

---

## 4. Abbildung auf die bestehenden Abschnitte (Reihenfolge unverändert)

| # | Abschnitt (`id`) | Gestaltung neu |
|---|---|---|
| 1 | Hero (`top`) | Links Status-Pille, H1 mit Wechselwort, Lead, CTA; rechts „Slot-Board“ (Zeitraster, Kacheln leuchten nacheinander grün auf); mitternachtsblaues Licht |
| 2 | Über KAYCO (`about`) | Großes Statement, Zeilen hellen beim Lesen auf; Gründer-Kürzel als Avatare; 4 Kennzahlen in Haarlinien-Raster |
| 3 | Problem (`problem`) | Kalender als dunkler Produkt-Screen; Verlust in Rot-Grau, Beratung in Signalgrün |
| 4 | Leistung (`services`) | Nummerierte Akkordeon-Liste (Mono-Nummern, Zeit-Chip) |
| 5 | Einblick (`work`) | 2 × 2 Produktkarten mit UI-Ausschnitten + CTA-Karte (statt horizontaler Scroll-Strecke) |
| 6 | Ablauf (`process`) | Vier-Stufen-Pipeline mit verbundenen Slot-Knoten (mobil vertikal) |
| 7 | Ergebnisse (`results`) | Dunkles Panel, große Kennzahlen, Diagramm in Signalgrün |
| 8 | Über uns (`team`) | Monatsraster als Produktkarte, Text, sechs Punkte als Karten |
| 9 | Preise (`pricing`) | Drei Karten, „Unser Modell“ mit Akzentrand und Licht |
| 10 | FAQ (`faq`) | Links Kopf + Kontaktkarte, rechts Akkordeon |
| 11 | Kontakt (`contact`) | Abschluss-Panel mit Raster und Licht, CTA + E-Mail kopieren |
| – | Footer | Claim + CTA, Spalten, großer Schriftzug, Copyright, „Nach oben“ |
| – | Rechtsseiten | Gleiche Tokens, gut lesbare Textspalte (72 Zeichen) |
