import type { CSSProperties } from "react"
import type { LandingContent } from "@/content/types"
import { SectionHead } from "./primitives"

/**
 * Ablauf als Zeitleiste wie bei om-vantage: Linie in der Mitte, die sich beim Scrollen füllt; Titel und Text
 * wechseln die Seite. Mobil steht die Linie links und alles untereinander.
 */
export function Process({ c }: { c: LandingContent }) {
  const pr = c.process
  return (
    <section id="process" className="k-sec k-process" data-sec="process" aria-labelledby="k-process-title">
      <div className="k-wrap">
        <SectionHead title={pr.title} titleId="k-process-title" />
        <div className="k-tl">
          <span className="k-tl-line" aria-hidden="true">
            <span />
          </span>
          <ol>
          {pr.steps.map((s, i) => (
            <li key={s.name} className="k-tl-item" data-side={i % 2 ? "r" : "l"}>
              <span className="k-tl-dot" aria-hidden="true" />
              <div className="k-tl-title" data-anim={i % 2 ? "fr" : "fl"} style={{ "--d": "0.05s" } as CSSProperties}>
                <span className="k-tl-n">0{i + 1}</span>
                <h3 className="k-h3">{s.title}</h3>
              </div>
              <div className="k-tl-body" data-anim={i % 2 ? "fl" : "fr"} style={{ "--d": "0.15s" } as CSSProperties}>
                <p className="k-tl-tag">
                  {s.name} · {s.when}
                </p>
                <p>{s.text}</p>
              </div>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
