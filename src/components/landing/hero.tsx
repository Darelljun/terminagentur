import type { CSSProperties } from "react"
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

export function Hero({ c }: { c: LandingContent }) {
  const { hero, status } = c
  let booked = 0
  return (
    <section id="top" className="k-hero" data-sec="top" aria-label="Einleitung">
      <div className="k-hero-bg" aria-hidden="true" />
      <div className="k-wrap k-hero-grid">
        <div className="k-hero-copy">
          <p className="k-status k-in" style={{ "--d": "0.05s" } as CSSProperties}>
            <i aria-hidden="true" />
            {status}
          </p>
          <h1 className="k-h1">
            <span className="k-line k-in" style={{ "--d": "0.12s" } as CSSProperties}>
              {hero.lead}
            </span>
            <span className="k-line k-line--accent k-in" style={{ "--d": "0.22s" } as CSSProperties}>
              <span className="k-sr">{hero.words[0]} </span>
              <span aria-hidden="true">
                <WordMorph words={hero.words} />
              </span>
            </span>
            <span className="k-line k-in" style={{ "--d": "0.32s" } as CSSProperties}>
              {hero.tail}
            </span>
          </h1>
          <p className="k-hero-sub k-in" style={{ "--d": "0.44s" } as CSSProperties}>
            {hero.sub}
          </p>
          <div className="k-hero-actions k-in" style={{ "--d": "0.54s" } as CSSProperties}>
            <BookLink className="k-btn k-btn--primary k-btn--lg">
              Strategiegespräch anfragen <Arrow />
            </BookLink>
            <a className="k-cue" href="#about">
              <span className="k-cue-line" aria-hidden="true" />
              {hero.cue}
            </a>
          </div>
        </div>

        <div className="k-board-wrap k-in" style={{ "--d": "0.3s" } as CSSProperties} aria-hidden="true">
          <div className="k-board">
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
