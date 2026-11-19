import { Wordmark } from "@/components/effects/fx"
import { site } from "@/lib/site"
import type { LandingContent } from "@/content/types"
import { BackToTop, BookLink } from "./actions"
import { Arrow } from "./primitives"

export function SiteFooter({ c }: { c: LandingContent }) {
  const ft = c.footer
  return (
    <footer className="k-foot">
      {/* Großer, angeschnittener Schriftzug als Kontur – wie bei om-vantage */}
      <Wordmark text={c.brand} />
      <div className="k-wrap">
        <div className="k-foot-top">
          <div className="k-foot-claim">
            <p>{ft.claim}</p>
            <BookLink className="k-btn k-btn--primary">
              Strategiegespräch anfragen <Arrow />
            </BookLink>
          </div>
          <div className="k-foot-cols">
            {ft.columns.map((col) => (
              <div key={col.title}>
                <p>{col.title}</p>
                <ul>
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href}>{l.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <p>Adresse</p>
              <address>
                {site.legalName}
                <br />
                {site.address.street}
                <br />
                {site.address.zip} {site.address.city}
              </address>
            </div>
          </div>
        </div>
      </div>
      <div className="k-wrap k-foot-bottom">
        <span>{ft.copyright}</span>
        <span>{ft.note}</span>
        <BackToTop>
          Nach oben
          <svg className="k-arrow" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M8 13V3M4 7l4-4 4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </BackToTop>
      </div>
    </footer>
  )
}
