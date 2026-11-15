# KAYCO – Designarchitektur

## Leitidee
„Keine Leads. Termine.“ Jede Sektion führt vom Problem (Kontaktdaten, Nachtelefonieren)
zum Ergebnis (bestätigter, vorbereiteter Termin im Kalender). Das wiederkehrende visuelle
Motiv ist der **Kalendereintrag**: Er erscheint im Hero, in der Gegenüberstellung, am Ende des
Ablaufs und als Terminbriefing.

## Gestaltungsprinzipien
- Hell, ruhig, präzise: Weiß und ein warmes Off-White (`--canvas`) wechseln sich als Sektionsflächen ab.
- Eine einzige dunkle Fläche (KAYCO-Karte in der Gegenüberstellung, finaler CTA) setzt Kontrast.
- Ein Akzent: **Signalgrün** (`--signal`) steht ausschließlich für „Termin bestätigt“ und Häkchen.
- Keine Verläufe als Dekoration, keine Stockfotos, keine erfundenen Zahlen, Logos oder Stimmen.

## Typografie
- Geist (Sans, self-hosted über `next/font`) für alles, enge Laufweite in großen Größen.
- Instrument Serif *kursiv* als Markenstimme für einzelne Schlüsselwörter („Termine.“).
- Skala: Display `clamp(3rem, 10vw, 8rem)`, Headline `clamp(2.25rem, 5.5vw, 4.25rem)`,
  Fließtext 17–19 px, Zeilenhöhe 1.5–1.6, maximale Zeilenlänge ca. 65 Zeichen.

## Farben (Kontrast geprüft, WCAG AA)
| Token | Wert | Einsatz |
|---|---|---|
| `--background` | `#FFFFFF` | Seite |
| `--canvas` | `#F5F5F2` | alternierende Sektionen |
| `--foreground` / `--ink` | `#0B0B0D` | Text, Primär-Buttons |
| `--muted-foreground` | `#5B5B62` | Sekundärtext (≥ 6:1 auf Weiß) |
| `--border` | `#E6E5E0` | Haarlinien |
| `--signal` | `#0E7A52` | bestätigte Termine, Häkchen |

## Bewegung (Motion)
- Einheitliche Kurve `cubic-bezier(0.22, 1, 0.36, 1)`, 0.5–0.9 s für Reveals, 150–250 ms für Hover.
- Reveal beim Scrollen (einmalig), gestaffelte Karten, Hero-Kalender füllt sich, Pipeline-Puls,
  Ablauf-Linie wird mit dem Scrollfortschritt gezeichnet, „30“ zählt hoch, Briefing-Wechsel per Tabs.
- `MotionConfig reducedMotion="user"` + CSS-Fallbacks: Bei `prefers-reduced-motion` entfallen
  Bewegungen, Inhalte stehen sofort im Endzustand.

## Informationsarchitektur (Startseite)
1. Hero – Kernbotschaft, Garantiehinweis, 2 CTAs, animierter Kalender + Pipeline
2. Problem – sieben typische Hürden der Branche
3. Unterschied – Leadgenerierung vs. KAYCO
4. Ablauf – fünf Schritte mit scrollgezeichneter Linie
5. Qualifizierung – Kategorien + Demo-Terminbriefing (fiktive Daten, gekennzeichnet)
6. Versprechen – 30-Termine-Garantie, 300 € Einrichtung, Werbebudget, Vergütung
7. Über KAYCO – Geschichte, Gründer Magdalena Kayser & Darell Kacou
8. Für wen – Zielgruppen + ehrliche Abgrenzung
9. FAQ – Accordion (Radix, Stil nach 21st.dev „Ghost Accordion“)
10. Kontakt – Buchung (vorbereitet über `NEXT_PUBLIC_BOOKING_URL`) + E-Mail-Anfrage

Rechtliches: `/impressum`, `/datenschutz`. Kein Cookie-Banner, da keine einwilligungspflichtigen
Technologien (kein Tracking, Schriften lokal, keine externen Skripte).

## Komponenten
- `components/site/*` – Header (nach 21st.dev „Floating Glassmorphic Navbar“), Footer, Logo
- `components/motion/*` – Reveal, Stagger, CountUp
- `components/sections/*` – je eine Datei pro Sektion
- `components/visuals/*` – Hero-Kalender, Briefing-Karte
- `components/ui/*` – shadcn/ui (Accordion, Tabs), ButtonLink
- `lib/site.ts` – zentrale Unternehmens- und Navigationsdaten
