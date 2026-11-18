import { Fragment } from "react"
import { NumberTicker } from "@/components/effects/number-ticker"
import type { LandingContent } from "@/content/types"
import { BrandMark, Kicker } from "./primitives"

/** Zerlegt das Statement in Wörter und Bild-Platzhalter: „[team]“, „[chart]“, „[leaf]“ (= Bildmarke). */
function parts(text: string) {
  return text
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => {
      const m = t.match(/^\[(team|chart|leaf)\]$/)
      return m ? { pic: m[1], word: "" } : { pic: "", word: t }
    })
}

function Pic({ kind }: { kind: string }) {
  if (kind === "team")
    return (
      <span className="k-pic k-pic--team" aria-hidden="true">
        <i>MK</i>
        <i>DK</i>
      </span>
    )
  if (kind === "chart")
    return (
      <span className="k-pic k-pic--chart" aria-hidden="true">
        <svg viewBox="0 0 80 40">
          <path d="M4 34 L20 26 L32 30 L48 16 L60 20 L76 6" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="76" cy="6" r="4" fill="currentColor" />
        </svg>
      </span>
    )
  return (
    <span className="k-pic k-pic--mark" aria-hidden="true">
      <BrandMark className="k-pic-mark" />
    </span>
  )
}

export function Manifesto({ c }: { c: LandingContent }) {
  return (
    <section id="about" className="k-sec k-manifesto" data-sec="about" aria-label="Über KAYCO">
      <div className="k-wrap">
        <div className="k-reveal">
          <Kicker n="01" text={c.manifesto.kicker} />
        </div>
        <p className="k-man">
          {parts(c.manifesto.text).map((p, i) =>
            p.pic ? (
              <Fragment key={i}>
                <Pic kind={p.pic} />{" "}
              </Fragment>
            ) : (
              <Fragment key={i}>
                <span className="k-mw">{p.word}</span>{" "}
              </Fragment>
            ),
          )}
        </p>
        <dl className="k-stats">
          {c.stats.map((s) => (
            <div key={s.label} className="k-stat k-reveal">
              <dd>
                <NumberTicker value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
              </dd>
              <dt>{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
