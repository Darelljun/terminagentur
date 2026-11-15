# KAYCO – Designarchitektur v2 („Der Slot“)

## Markenidee
Das zentrale Markenelement ist der **Slot**: ein abgerundetes Rechteck in Signalgrün, ein
gebuchter Beratungstermin. Er ist Bildmarke, Interface-Element und erzählerischer Faden.
Die gesamte Seite ist eine Produktpräsentation in Kapiteln: Aus Rauschen (Leads, Anrufe,
Mailbox) wird ein Slot im Kalender.

## Prinzipien
- **Produkt statt Dekoration.** Jede Sektion zeigt ein realistisches Interface-Artefakt
  (Kalender, Anrufliste, Datensatz, Briefing, Monatsraster) statt Icon-Karten.
- **Kapitel-Dramaturgie.** Nummerierte Kapitel (01–09) mit je eigener Komposition:
  Bühne, Wort-Enthüllung, Artefakt-Vergleich, Vorher/Nachher-Regler, Sticky-Szene,
  Explosionsansicht, Nachtbühne, Editorial, Register.
- **Hell mit einer Nachtbühne.** Helle Flächen, Haarlinien, große weiche Schatten,
  Glas nur auf Bedienelementen. Die Garantie spielt auf dunkler Bühne – der Höhepunkt.
- **Ein Akzent.** Signalgrün nur für bestätigte Termine.
- **Typografie.** Geist (eng, präzise) + Instrument Serif kursiv als Markenstimme.
  Kleine Labels in Versalien mit Laufweite für den „Software-Präzisions“-Charakter.

## Kapitel
| # | Sektion | Visuelle Idee |
|---|---|---|
| – | Hero | Interaktive Live-Bühne: Anfrage → Qualifizierung → Angaben → Bestätigung → Slot fliegt in den Kalender (Motion `layoutId`). Pausierbar, klickbare Schritte. |
| 01 | Problem | Scrollgesteuerte Wort-Enthüllung + illustrierte Anrufliste eines Akquise-Tags |
| 02 | Unterschied | Zwei Artefakte: Datensatz (Lead) vs. Kalender-Slot (Termin) |
| 03 | Zeit | Vorher/Nachher-Regler über einer Arbeitswoche (Zeitersparnis, als Illustration gekennzeichnet) |
| 04 | Ablauf | Sticky-Szene: Fünf Schritte steuern eine Geräteansicht (Desktop); mobil gestapelte Szenen |
| 05 | Qualifizierung | Explosionsansicht des Terminbriefings mit Callouts |
| 06 | Garantie | Nachtbühne: 30 Slots füllen sich mit dem Scrollen, „30“ zählt mit; Konditionen als Register |
| 07 | Über uns | Editorial mit großem Zitat und Gründerzeilen |
| 08 | Für wen | Typografisches Register statt Kartenraster |
| 09 | FAQ | Accordion |
| – | Kontakt | Finale Bühne mit Buchung + Anfrage |

## Mobile
Eigene Inszenierung: Live-Bühne im ersten Screen, horizontale Schrittleiste, Tagesansicht
statt Wochenansicht, gestapelte Prozess-Szenen, Monatsraster 5 × 6, schwebende CTA-Leiste
nach dem Hero (blendet am Kontaktbereich aus). Touch-Ziele ≥ 44 px.

## Bewegung
Kurve `cubic-bezier(0.22, 1, 0.36, 1)`. Federn für Layout-Übergänge. Scroll-Kopplung nur
dort, wo sie erzählt (Wort-Enthüllung, Ablauf, Garantie). Autoplay der Hero-Bühne
pausiert außerhalb des Viewports und ist per Button anhaltbar (WCAG 2.2.2).
`prefers-reduced-motion`: keine Autoplay-, Scroll- oder Transform-Effekte, Endzustände sofort.
