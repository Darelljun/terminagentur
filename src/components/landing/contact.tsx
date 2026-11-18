import { BorderBeam, Lamp, Sparkles, SplitWords } from "@/components/effects/fx"
import type { LandingContent } from "@/content/types"
import { BookLink, CopyEmail } from "./actions"
import { Arrow } from "./primitives"

/** Abschluss: Ohne Buchungstool öffnet die CTA eine E-Mail an KAYCO, mit Buchungstool das Tool. */
export function Contact({ c }: { c: LandingContent }) {
  return (
    <section id="contact" className="k-sec k-contact" data-sec="contact" aria-labelledby="k-contact-title">
      <div className="k-wrap">
        <div className="k-final k-reveal">
          <div className="k-final-bg" aria-hidden="true" />
          <Sparkles />
          <Lamp />
          <BorderBeam duration={10} size={260} />
          <h2 id="k-contact-title" className="k-final-h">
            <SplitWords text={c.cta.title} />
          </h2>
          <p className="k-final-text">{c.cta.text}</p>
          <div className="k-final-actions">
            <BookLink href={"mailto:" + c.email} className="k-btn k-btn--shiny k-btn--lg" data-magnetic="">
              <span>{c.cta.button}</span>
              <Arrow />
            </BookLink>
            <CopyEmail email={c.email} className="k-btn k-btn--ghost k-btn--lg" copiedLabel="Kopiert" icon />
          </div>
        </div>
      </div>
    </section>
  )
}
