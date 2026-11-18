import type { CSSProperties } from "react"
import { GridBeams } from "@/components/effects/grid-beams"
import { BorderBeam } from "@/components/effects/fx"
import type { LandingContent } from "@/content/types"
import { BookLink } from "./actions"
import { Arrow } from "./primitives"
import { WordMorph } from "./word-morph"

/** Belegung des Slot-Boards: 5 Tage × 7 Zeitfenster. 1 = bestätigter Termin, 2 = verlorene Akquise-Zeit. */
const BOARD = [
  [1, 0, 2, 1, 0],
  [0, 1, 0, 0, 1],
  [2, 0, 1, 2, 0],
  [1, 0, 0, 1, 0],
  [0, 2, 1, 0, 1],
  [1, 0, 0, 1, 0],
  [0, 1, 2, 0, 1],
]

/** „Kinetic Typography“: Wörter einer Zeile steigen gestaffelt aus der Unschärfe (CSS, ab dem ersten Bild). */
function Kinetic({ text, start }: { text: string; start: number }) {
  const words = text.split(" ")
  return (
    <>
      {words.map((w, i) => (
        <span key={i}>
          <span className="k-kw" style={{ "--d": (start + i * 0.07).toFixed(2) + "s" } as CSSProperties}>
            {w}
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  )
}

export function Hero({ c }: { c: LandingContent }) {
  const { hero, status } = c
  let booked = 0
  return (
    <section id="top" className="k-hero" data-sec="top" data-spotlight="" aria-label="Einleitung">
      <div className="k-hero-bg" aria-hidden="true">
        <GridBeams />
        <span className="k-hero-spot" />
        <span className="k-hero-orb k-hero-orb--a" />
        <span className="k-hero-orb k-hero-orb--b" />
      </div>
      <div className="k-wrap k-hero-grid">
        <div className="k-hero-copy">
          <p className="k-status k-in" style={{ "--d": "0.05s" } as CSSProperties}>
            <i aria-hidden="true" />
            <span className="k-shimmer">{status}</span>
          </p>
          <h1 className="k-h1">
            <span className="k-line">
              <Kinetic text={hero.lead} start={0.06} />
            </span>
            <span className="k-line k-line--accent">
              <span className="k-sr">{hero.words[0]} </span>
              <span aria-hidden="true">
                <WordMorph words={hero.words} />
              </span>
            </span>
            <span className="k-line">
              <Kinetic text={hero.tail} start={0.28} />
            </span>
          </h1>
          <p className="k-hero-sub k-in" style={{ "--d": "0.62s" } as CSSProperties}>
            {hero.sub}
          </p>
          <div className="k-hero-actions k-in" style={{ "--d": "0.74s" } as CSSProperties}>
            <BookLink className="k-btn k-btn--shiny k-btn--lg" data-magnetic="">
              <span>Strategiegespräch anfragen</span> <Arrow />
            </BookLink>
            <a className="k-cue" href="#about">
              <span className="k-cue-line" aria-hidden="true" />
              {hero.cue}
            </a>
          </div>
        </div>

        <div className="k-board-wrap k-in" style={{ "--d": "0.3s" } as CSSProperties} aria-hidden="true">
          <div className="k-board" data-tilt="">
            <BorderBeam duration={8} size={160} />
            <div className="k-board-bar">
              <i />
              <i />
              <i />
              <span />
            </div>
            <div className="k-board-head">
              {[0, 1, 2, 3, 4].map((d) => (
                <span key={d} />
              ))}
            </div>
            <div className="k-board-grid">
              {BOARD.flatMap((row, r) =>
                row.map((v, d) => {
                  const order = v === 1 ? booked++ : 0
                  return <span key={r + "-" + d} className={v === 1 ? "k-slot is-on" : v === 2 ? "k-slot is-lost" : "k-slot"} style={v === 1 ? ({ "--o": order } as CSSProperties) : undefined} />
                }),
              )}
            </div>
          </div>
          <div className="k-board-glow" />
        </div>
      </div>
    </section>
  )
}
