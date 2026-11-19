import type { CSSProperties } from "react"
import { CalendarCheck2, FileText, ListChecks, Megaphone, PhoneCall, Wallet } from "lucide-react"
import { GcalMini } from "@/components/kayco/gcal"
import type { LandingContent } from "@/content/types"
import { BookLink } from "./actions"
import { Arrow } from "./primitives"
import { VideoCard } from "./video-card"
import { WordMorph } from "./word-morph"

/** Symbole der Leistungsreihe – gleiche Reihenfolge wie die Leistungen in src/content/kayco.ts. */
const FEATURE_ICONS = [Megaphone, PhoneCall, ListChecks, CalendarCheck2, FileText]

const d = (s: number) => ({ "--d": s + "s" }) as CSSProperties

/**
 * Hero im Aufbau von om-vantage.de: Zielgruppen-Zeile, dreizeilige Headline im Silber-Verlauf, Einleitung,
 * Faktenreihe (an Stelle von Bewertungen – es werden keine erfunden), orange Haupt-CTA, Gründer-Zeile,
 * rechts das Medium (Video, sobald vorhanden – sonst eine Google-Kalender-Wochenansicht), darunter fünf Leistungen.
 * Alle Texte stammen aus dem bestehenden Inhalt (Hero, Kennzahlen, Leistungen, Über uns).
 * Die Elemente sind direkte Rasterkinder, damit die Reihenfolge mobil wie beim Vorbild umsortiert werden kann.
 */
export function Hero({ c }: { c: LandingContent }) {
  const { hero } = c
  const termine = c.stats[3]
  const kosten = c.stats[1]
  return (
    <section id="top" className="k-hero" data-sec="top" aria-label="Einleitung">
      <div className="k-wrap k-hero-grid">
        <p className="k-hero-pre k-in" style={d(0.05)}>
          {hero.pre}
        </p>

        <h1 className="k-h1">
          <span className="k-line k-hl" style={d(0.1)}>
            {hero.lead}
          </span>
          <span className="k-line k-hl" style={d(0.2)}>
            <span className="k-sr">{hero.words[0]} </span>
            <span aria-hidden="true">
              <WordMorph words={hero.words} />
            </span>
          </span>
          <span className="k-line k-hl" style={d(0.3)}>
            {hero.tail}
          </span>
        </h1>

        <p className="k-hero-sub k-in" style={d(0.42)}>
          {hero.intro} {hero.sub}
        </p>

        <ul className="k-hero-facts k-in" style={d(0.5)}>
          <li>
            <CalendarCheck2 aria-hidden="true" />
            <span>
              <b>
                {termine.value}
                {termine.suffix}
              </b>{" "}
              {/* nur der erste Teil der Kennzahl („… garantiert“), der Zusatz steht in „Über KAYCO“ */}
              {termine.label.split(" – ")[0]}
            </span>
          </li>
          <li>
            <Wallet aria-hidden="true" />
            <span>
              <b>
                {kosten.value}
                {kosten.suffix}
              </b>{" "}
              {kosten.label}
            </span>
          </li>
        </ul>

        <div className="k-hero-cta k-in" style={d(0.58)}>
          <BookLink className="k-btn k-btn--primary k-btn--xl">
            <span>Strategiegespräch anfragen</span> <Arrow />
          </BookLink>
        </div>

        <p className="k-hero-founders k-in" style={d(0.66)}>
          <span className="k-hero-avs" aria-hidden="true">
            <span className="kay-av">MK</span>
            <span className="kay-av" data-tone="3">
              DK
            </span>
          </span>
          {hero.founders}
        </p>

        <div className="k-hero-media k-in" style={d(0.3)}>
          {hero.video ? <VideoCard video={hero.video} className="k-video--hero" /> : <GcalMini />}
        </div>

        <ul className="k-hero-feats k-in" style={d(0.74)} aria-label="Was wir übernehmen">
          {c.services.items.map((s, i) => {
            const Icon = FEATURE_ICONS[i] ?? ListChecks
            return (
              <li key={s.title}>
                <span className="k-hero-ico" aria-hidden="true">
                  <Icon />
                </span>
                <span className="k-hero-feat-t">
                  <strong>{s.title}</strong>
                  <span>{s.time}</span>
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
