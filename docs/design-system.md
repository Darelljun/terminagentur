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

Nicht übernommen werden: Logo, Schriften (Barlow/Quicksand), Fotos, Videos, Bewertungen, Logos,
Texte oder die konkrete Anordnung einzelner Module. Die Farbpalette (Orange/Navy) wird seit Update 3
auf Wunsch übernommen (siehe 3.1).

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
Kalendereintrag auf. Orange (seit Update 3, vorher Signalgrün) steht ausschließlich für „bestätigt / Handlung“.

Tonalität: dunkel, präzise, ruhig, selbstbewusst – Datenästhetik einer Performance-Agentur,
kein Fintech-SaaS-Template (keine Verlaufs-Blobs in Lila, keine Icon-Kachel-Raster als Füller).

---

## 3. Designsystem

### 3.1 Farben (Tokens, `src/app/globals.css`) – Palette von om-vantage.de

Die Seitenfarbe ist ohne Cascade-Layer und zusätzlich auf jedem Abschnitt gesetzt (`kayco.css`, „Grundlagen“) –
so bleibt alles dunkel, auch wenn eine Umgebung (Vorschau-Rahmen, alter Browser) eigene Seitenstile mitbringt.

Seit Update 3 übernimmt KAYCO die Farbpalette der Referenz om-vantage.de (Werte direkt von der Seite
ausgelesen). Nur ein Design (dunkel), `theme-color #0C0C0C`. Seit Update 4 einheitlich wie dort: jeder
Abschnitt hat dieselbe Hintergrundfarbe `#0C0C0C`, Karten sind Umrandungen (1 px, Radius 24) mit einem
Navy-Schimmer von unten, Navy-Blau ist das Licht, Orange ausschließlich für Handlungen und fertige Termine.

| Token | Wert | om-vantage-Quelle | Verwendung |
|---|---|---|---|
| `--k-bg` | `#0C0C0C` | Seitenhintergrund | Seitenhintergrund |
| `--k-bg-2` | `#0C0C0C` | wie Hintergrund | (keine Wechsel-Abschnitte mehr) |
| `--k-surface` | `#0C0C0C` | Karten stehen auf der Seitenfarbe | Karten (Umrandung + Navy-Schimmer `--k-card-glow`) |
| `--k-surface-2` | `#1D1D1F` | dunkle Nav-Pille | Navigations-Button, Hover, Eingebettetes |
| `--k-line` | `rgb(255 255 255 / .125)` | Kartenrand | Haarlinien |
| `--k-line-2` | `rgb(255 255 255 / .2)` | – | Betonte Linien |
| `--k-text` | `#FFFFFF` | Überschriften | Text |
| `--k-text-2` | `#D1D1D1` | Fließtext | Fließtext, sekundär |
| `--k-text-3` | `#8A8A8A` | `#7A7A7A`, für AA aufgehellt | Labels, Metadaten |
| `--k-accent` | `#FF8F00` | CTA-Buttons, Sterne | Buttons, Termin-Slots, Fokus |
| `--k-accent-hi` / `-lo` | `#FFA31F` / `#E07A00` | – | Hover, Verlauf der Slots |
| `--k-accent-ink` | `#1A0E00` | Schrift auf Orange | Text auf Akzent |
| `--k-navy` | `#023E97` | Markenblau, Lichtfelder, CTA-Box-Rand | Licht, hervorgehobene Karte |
| `--k-navy-deep` | `#0C1733` | dunkle Navy-Karte | Avatare, Kalender |
| `--k-accent-2` | `#0067FF` | Blau-Verlauf | zweite Lichtfarbe (Strahlen, Lamp, Kanten) |
| `--k-link` | `#7AB3FF` | Links | helles Blau in Verläufen und Icons |
| `--k-silver` | Weiß → `#7A7A7A` | Headline-Verlauf | H1 und Zielgruppen-Zeile im Hero |
| `--k-glow` | `rgb(2 62 151 / .22)` | Hero-Lichtfeld | Hintergrundlicht |
| `--k-warn` | `#FF5A4F` | Rot `#F30404`, für Text aufgehellt | Verlust/Problem (Kalender) |

Kontraste (WCAG, auf `#0C0C0C` / auf `#1D1D1F`): Text 19,6 / 16,9 · Text-2 12,8 / 11,0 ·
Text-3 5,7 / 4,9 · Orange als Text 8,6 / 7,4 · Schrift auf Orange 8,3 · alle Kalendereinträge ≥ 9:1 → alle ≥ AA.
Der Lese-Effekt im Statement startet bei 42 % Deckkraft und hält damit ≥ 3:1 für große Schrift ein.

### 3.1.1 Logo (Update 8)

- **Bildzeichen:** blaue Kachel (Radius 25 %, Verlauf `#0067FF` → `#023E97`, feine helle Innenkante), weißes
  geometrisches „K“, oranger Punkt oben rechts – der gerade eingegangene Termin.
- **Schriftzug:** „KAYCO“ aus gleich starken Strichen (Strichstärke 20 % der Versalhöhe), flache Enden; der
  Querbalken des „A“ ist ein oranger, abgerundeter Slot („der bestätigte Slot“).
- Dateien: `BrandMark`, `LogoWord`, `Logo` in `src/components/landing/primitives.tsx`; Favicon `src/app/icon.svg`;
  Social-Vorschaubild `src/app/opengraph-image.tsx`. Mindestgröße Bildzeichen 16 px, Schriftzug 12 px hoch.

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
| Header | Schwebende Pille wie om-vantage: bündig mit dem Inhalt, 64 px hoch (mobil 56 px), 14 px Abstand oben, Radius 50, Glas-Unschärfe; ab 40 px Scroll Fläche `--k-header` + Haarlinie. Links 15 px/600 weiß, aktiver Abschnitt grau, Button dunkel (`#1D1D1F`). Verhalten unverändert: Desktop sticky, blendet nach 400 px beim Runterscrollen (≥ 32 px) aus und beim Hochscrollen (≥ 20 px) ein; mobil fixiert, aus/ein nach 16 px, nie bei offenem Menü. Aktiver Menüpunkt mit Akzent-Slot. |
| Mobile-Menü | Vollflächiges Panel unter dem Header, nummerierte Links (Mono), CTA, Fokusfalle, Escape, Hintergrund-Scroll gesperrt, schließt beim Wechsel auf Desktop. |
| Kicker | Akzent-Slot (8 × 8, Radius 2) + Mono-Nummer + Label, z. B. `▪ 02 — WAS WIR ÜBERNEHMEN` |
| Abschnittskopf | Kicker + H2 links, Lead rechts (ab 960 px), sonst untereinander |
| Primär-Button | Orange, Pille, Versalien wie om-vantage, 48 px (Hero 54 px), Schrift `#1A0E00` (statt Weiß, wegen Kontrast), Pfeil verschiebt sich bei Hover um 3 px. Haupt-CTAs als „Shiny Button“: umlaufender Lichtrand, Glanz-Streifen, Leuchten bei Hover, magnetisch (Maus) |
| Sekundär-Button | Transparent, Rand `--k-line-2`, Hover Fläche `--k-surface-2` |
| Karte | Seitenfarbe, Rand `rgba(255,255,255,.125)`, Radius 24, Navy-Schimmer von unten; Hover (nur Maus): Lichtkante folgt dem Zeiger, Spotlight, leichte 3D-Neigung. Abschluss-Box: 2 px Navy-Rand mit Leuchten |
| Chip | Mono 12 px, Rand `--k-line-2`, Radius 8 |
| Akkordeon | Haarlinien-Liste, Plus-Symbol in Kreis dreht zu ×, Höhe per CSS-Grid animiert |
| Kennzahl | Zahl `display-l` in Tabellenziffern, Haarlinie oben, Label `small` |

### 3.5 Bewegung – wie om-vantage.de (Update 5)

Die Effekte wurden von om-vantage.de ausgelesen (dort Elementor + GSAP) und ohne Bibliothek nachgebaut
(`src/app/fx.css`, `src/components/effects/fx-controller.tsx`). Die früheren 21st.dev-Effekte (Neigung,
Leuchtkanten, Spotlight, Lichtkegel, Funkeln, Border Beam, Fortschrittsbalken, Filmkorn, Wort-Einblendung)
sind entfernt.

| Effekt bei om-vantage | KAYCO | Umsetzung |
|---|---|---|
| Elementor `fadeInUp` / `slideInLeft` / `fadeInLeft/Right`, 1,25 s, einmalig | Abschnittsköpfe, Kalender, Ergebnis-Kasten, FAQ, Abschluss (hoch); Preiskarten (von links); Zeitleiste und Gründer (von links/rechts) | `data-anim` + IntersectionObserver setzt `data-in`; versteckt nur mit JavaScript (`@media (scripting: enabled)`) |
| GSAP „scroll-gradient-title“: Überschriften von 10 % Weiß zum Silber-Verlauf (Scrub `top 80 % → top 20 %`) | alle H2 und Abschluss-Titel | `animation-timeline: view()`, `animation-range: cover 20vh cover 80vh` |
| `fadeInMoveUp` im Hero (30 px) | Zielgruppe, Headline-Zeilen, Text, Button, Medium | CSS ab dem ersten Bild |
| Motion-FX „vertikal scrollen“ | Hero-Headline wandert beim Scrollen 56 px nach oben | `animation-timeline: scroll(root)` |
| Motion-FX „Maus-Tracking“ (Hintergrund) | Hero-Licht folgt leicht dem Zeiger | `--hx/--hy` aus FxController, nur mit Maus |
| `glass-sweep` über der Vorteilsleiste | Lichtstreifen über der Leistungsleiste | CSS, 6 s, pausiert außerhalb des Bildes |
| `moveIcon` (Pfeil wippt 8 px) | Pfeile in orangen und dunklen Buttons | CSS, pausiert außerhalb des Bildes |
| GSAP-Zeitleiste füllt sich (Scrub `top 50 % → bottom 50 %`) | Ablauf | benannte `view-timeline` |
| Swiper-Karussell (Kunden-Videos) | Video-Testimonials (sobald vorhanden) | wischbare Reihe mit Scroll-Snap |

`prefers-reduced-motion: reduce`: nichts bewegt sich, alle Inhalte stehen sofort da, kein Smooth-Scroll.

### 3.5.1 Kalender im Stil von Google Kalender

Alle Kalender (Hero, Problem-Abschnitt) sind als Google-Kalender-Wochenansicht im dunklen Modus nachgebaut
(`src/components/kayco/gcal.tsx`): Kopfzeile mit „Heute“, Pfeilen und Monat, „Erstellen“-Knopf,
Mini-Monat, „Meine Kalender“ als Legende, heutiger Tag als blauer Kreis, rote Jetzt-Linie, Ereignisfarben
aus der Google-Palette (Graphit, Heidelbeere, Banane, Tomate, Lavendel), Beratungen in KAYCO-Orange.
Helle Schrift auf dunklem Grund (Seitenleiste/Raster `#1B1C1E`/`#131314`, Text `#E3E3E3`; alle Ereignisse ≥ 4,5:1),
damit es keine weißen Flächen auf der dunklen Seite gibt. Kein Google-Logo und keine Google-Marke.

### 3.6 Responsiv

Breakpoints: 560 · 820 (Header-Wechsel, wie bisher) · 1024 · 1280. Mobil: einspaltig,
Touch-Ziele ≥ 44 px, keine Hover-Abhängigkeiten, `overflow-x: clip` am Body, reservierte
Höhen für nachgeladene Elemente (keine Layoutsprünge).

### 3.7 Barrierefreiheit

Skip-Link, sichtbarer Fokus (2 px Akzent, 3 px Abstand), semantische Überschriften-Hierarchie
wie bisher, `aria-expanded`/`aria-controls` an Akkordeons, `aria-pressed` am Kalender-Umschalter,
Kontraste ≥ AA, dekorative Grafik `aria-hidden`.

---

## 4. Abschnitte (seit Update 7: sechs Abschnitte, wie om-vantage)

| # | Abschnitt | Gestaltung |
|---|---|---|
| 1 | Hero (`top`) | Aufbau wie om-vantage; Belege 80 Neukunden / 3× Umsatz; Gründer-Avatare mit Foto; Laptop: rechts Google-Kalender-Woche, Handy: Benachrichtigungen „Neuer Termin“ (später optional Video) |
| 2 | Problem (`problem`) | „Volle Woche. Kaum Umsatz.“ + Google-Kalender (dunkel), umschaltbar „Mit Leads“ / „Mit KAYCO“ |
| 3 | Ablauf (`process`) | Zeitleiste mit Mittellinie, Titel und Text wechseln die Seite |
| – | Stimmen (`stimmen`) | Video-Testimonials, erscheinen erst mit Inhalt |
| 4 | Über uns (`team`) | kurzer Text + Gründer-Karten mit Foto (wie die Team-Karten bei om-vantage) |
| 5 | FAQ (`faq`) | Akkordeon |
| 6 | Kontakt (`contact`) | Abschluss-Box mit Navy-Rand |
| – | Footer | angeschnittener Kontur-Schriftzug, Spalten Navigation / Rechtliches / Adresse |

Entfernt in Update 5: „Über KAYCO“-Statement mit Kennzahlen, Leistungsliste (steht als Leiste im Hero),
„Einblick“-Karten, Diagramm, „Wofür KAYCO steht“-Karten. Entfernt in Update 7: Preise (Preise stehen in FAQ,
Ablauf und Abschluss), Ergebnisse als eigener Abschnitt (Belege im Hero).
