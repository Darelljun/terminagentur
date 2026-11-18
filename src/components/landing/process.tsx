import type { CSSProperties } from "react"
import type { LandingContent } from "@/content/types"
import { SplitWords } from "@/components/effects/fx"
import { Kicker } from "./primitives"

/** Ablauf als Vier-Stufen-Pipeline: verbundene Slot-Knoten (Desktop waagerecht, mobil senkrecht). */
export function Process({ c }: { c: LandingContent }) {
  const pr = c.process
  return (
    <section id="process" className="k-sec k-process" data-sec="process" aria-labelledby="k-process-title">
      <div className="k-wrap">
        <div className="k-head">
          <div className="k-head-main k-reveal">
            <Kicker n="04" text={pr.kicker} />
            <h2 id="k-process-title" className="k-h2 k-h2--wide">
              <SplitWords text={pr.title} />
            </h2>
          </div>
        </div>
        <div className="k-steps-wrap">
          <span className="k-steps-rail" aria-hidden="true">
            <span />
            <b className="k-rail-pulse" />
          </span>
          <ol className="k-steps">
          {pr.steps.map((s, i) => (
            <li key={s.name} className="k-step k-reveal" style={{ "--i": i } as CSSProperties}>
              <span className="k-step-node" aria-hidden="true" />
              <p className="k-step-k">
                <span>0{i + 1}</span>
                <b>{s.name}</b>
                <em>{s.when}</em>
              </p>
              <h3 className="k-h3">{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
