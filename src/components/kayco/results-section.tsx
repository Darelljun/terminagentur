import type { CSSProperties } from "react"
import { NumberTicker } from "@/components/effects/number-ticker"
import { SectionHead } from "@/components/landing/primitives"
import { Testimonials } from "@/components/landing/testimonials"
import type { LandingContent } from "@/content/types"

/**
 * Ergebnisse wie die Fallstudien-Kästen bei om-vantage: Kennzahlen in einem umrandeten Kasten mit Navy-Licht,
 * Zahlen zählen beim Hineinscrollen hoch. Darunter erscheinen die Video-Testimonials, sobald es welche gibt.
 */
export function ResultsSection({ c }: { c: LandingContent }) {
  const r = c.results
  return (
    <section id="results" className="k-sec kay-results" data-sec="results" aria-labelledby="kay-results-title">
      <div className="k-wrap">
        <SectionHead title={r.title} titleId="kay-results-title" lede={r.text} />
        <dl className="kay-results-box" data-anim="up">
          {r.stats.map((s, i) => (
            <div key={s.label} style={{ "--d": i * 0.12 + "s" } as CSSProperties}>
              <dd>
                <NumberTicker value={s.value} prefix={s.prefix} suffix={s.suffix} duration={s.value < 10 ? 1200 : 1600} />
              </dd>
              <dt>{s.label}</dt>
            </div>
          ))}
        </dl>
        <Testimonials c={c} />
      </div>
    </section>
  )
}
