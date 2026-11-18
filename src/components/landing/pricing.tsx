import { BorderBeam } from "@/components/effects/fx"
import { NumberTicker } from "@/components/effects/number-ticker"
import type { LandingContent } from "@/content/types"
import { BookLink } from "./actions"
import { Arrow, Check, SectionHead } from "./primitives"

export function Pricing({ c }: { c: LandingContent }) {
  const pc = c.pricing
  return (
    <section id="pricing" className="k-sec k-pricing" data-sec="pricing" aria-labelledby="k-pricing-title">
      <div className="k-wrap">
        <SectionHead n="05" kicker={pc.kicker} title={pc.title} titleId="k-pricing-title" lede={pc.text} />
        <div className="k-plans">
          {pc.plans.map((p) => (
            <div key={p.name} className="k-plan k-reveal" data-featured={p.featured ? "" : undefined} data-glow="" data-tilt="">
              {p.featured ? <BorderBeam duration={7} size={200} /> : null}
              <p className="k-plan-name">
                {p.name}
                {p.badge ? <span>{p.badge}</span> : null}
              </p>
              <p className="k-plan-price">
                {p.price === null ? <span>Individuell</span> : <span><NumberTicker value={p.price} suffix=" €" /></span>}
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
              <BookLink className={"k-btn " + (p.featured ? "k-btn--shiny" : "k-btn--ghost")}>
                <span>{p.cta}</span> <Arrow />
              </BookLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
