"use client"

import { useState } from "react"
import type { LandingContent } from "@/content/types"
import { CopyEmail } from "./actions"
import { SplitWords } from "@/components/effects/fx"
import { Kicker } from "./primitives"

export function Faq({ c }: { c: LandingContent }) {
  const fq = c.faq
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="k-sec k-faq" data-sec="faq" aria-labelledby="k-faq-title">
      <div className="k-wrap k-faq-grid">
        <div className="k-faq-side">
          <div className="k-reveal">
            <Kicker n="06" text={fq.kicker} />
            <h2 id="k-faq-title" className="k-h2">
              <SplitWords text={fq.title} />
            </h2>
          </div>
          <div className="k-faq-card k-reveal" data-glow="">
            <p>{fq.text}</p>
            <CopyEmail email={c.email} className="k-btn k-btn--ghost" copiedLabel="In die Zwischenablage kopiert" />
          </div>
        </div>
        <div className="k-acc">
          {fq.items.map((f, i) => {
            const on = open === i
            return (
              <div key={f.q} className="k-acc-item k-reveal" data-open={on ? "" : undefined}>
                <h3>
                  <button type="button" aria-expanded={on} aria-controls={"k-faq-" + i} onClick={() => setOpen(on ? -1 : i)}>
                    {f.q}
                    <span className="k-plus" aria-hidden="true" />
                  </button>
                </h3>
                <div id={"k-faq-" + i} className="k-fold" role="region" aria-label={f.q} inert={!on}>
                  <div>
                    <p>{f.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
