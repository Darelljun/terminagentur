import type { LandingContent } from "@/content/types"
import { BookLink } from "./actions"
import { Arrow, Check, SectionHead, money } from "./primitives"

export function Pricing({ c }: { c: LandingContent }) {
  const pc = c.pricing
  return (
    <section id="pricing" className="k-sec k-pricing" data-sec="pricing" aria-labelledby="k-pricing-title">
      <div className="k-wrap">
        <SectionHead n="05" kicker={pc.kicker} title={pc.title} titleId="k-pricing-title" lede={pc.text} />
        <div className="k-plans">
          {pc.plans.map((p) => (
            <div key={p.name} className="k-plan k-reveal" data-featured={p.featured ? "" : undefined}>
              <p className="k-plan-name">
                {p.name}
                {p.badge ? <span>{p.badge}</span> : null}
              </p>
              <p className="k-plan-price">
                {p.price === null ? <span>Individuell</span> : <span>{money(p.price)}</span>}
                {p.price !== null && p.unit ? <small>{p.unit}</small> : null}
              </p>
              <p className="k-plan-text">{p.text}</p>
              <ul>
                {p.features.map((f) => (
                  <li key={f}>
                    <Check />
                    {f}
                  </li>
                ))}
              </ul>
              <BookLink className={"k-btn " + (p.featured ? "k-btn--primary" : "k-btn--ghost")}>
                {p.cta} <Arrow />
              </BookLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
