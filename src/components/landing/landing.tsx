import { FxController } from "@/components/effects/fx-controller"
import { AboutSection } from "@/components/kayco/about-section"
import { ProblemCalendar } from "@/components/kayco/problem-calendar"
import { ResultsSection } from "@/components/kayco/results-section"
import type { LandingContent } from "@/content/types"
import { Contact } from "./contact"
import { Faq } from "./faq"
import { Hero } from "./hero"
import { Pricing } from "./pricing"
import { Process } from "./process"
import { SiteFooter } from "./site-footer"
import { SiteHeader } from "./site-header"

/**
 * Startseite – kompakt im Agenturstil von om-vantage:
 * Hero → Problem (Kalender) → Ablauf → Ergebnisse (+ Video-Stimmen) → Preise → Über uns → FAQ → Kontakt.
 * Server-Komponente; interaktiv sind nur Header, Wechselwort, Kalender-Umschalter, Akkordeon, Videos und Buttons.
 */
export function Landing({ c }: { c: LandingContent }) {
  return (
    <div className="k-root">
      <a className="k-skip" href="#main">
        Zum Inhalt springen
      </a>
      <FxController />
      <SiteHeader brand={c.brand} links={c.links} />
      <main id="main">
        <Hero c={c} />
        <ProblemCalendar />
        <Process c={c} />
        <ResultsSection c={c} />
        <Pricing c={c} />
        <AboutSection />
        <Faq c={c} />
        <Contact c={c} />
      </main>
      <SiteFooter c={c} />
    </div>
  )
}
