import { FxController } from "@/components/effects/fx-controller"
import { AboutSection } from "@/components/kayco/about-section"
import { ProblemCalendar } from "@/components/kayco/problem-calendar"
import { ResultsSection } from "@/components/kayco/results-section"
import type { LandingContent } from "@/content/types"
import { Contact } from "./contact"
import { Faq } from "./faq"
import { Hero } from "./hero"
import { Manifesto } from "./manifesto"
import { Pricing } from "./pricing"
import { Process } from "./process"
import { ServiceList } from "./services"
import { SectionHead } from "./primitives"
import { SiteFooter } from "./site-footer"
import { SiteHeader } from "./site-header"
import { Work } from "./work"

/**
 * Startseite im KAYCO-Designsystem. Reihenfolge der Abschnitte wie bisher:
 * Hero → Über KAYCO → Problem → Leistung → Einblick → Ablauf → Ergebnisse → Über uns → Preise → FAQ → Kontakt.
 * Server-Komponente; interaktiv sind nur Header, Wechselwort, Akkordeons, Kalender, Diagramm und Buttons.
 */
export function Landing({ c }: { c: LandingContent }) {
  return (
    <div className="k-root">
      <a className="k-skip" href="#main">
        Zum Inhalt springen
      </a>
      <FxController />
      <div className="k-progress" aria-hidden="true" />
      <div className="k-grain" aria-hidden="true" />
      <SiteHeader brand={c.brand} links={c.links} />
      <main id="main">
        <Hero c={c} />
        <Manifesto c={c} />
        <ProblemCalendar />
        <section id="services" className="k-sec k-services" data-sec="services" aria-labelledby="k-services-title">
          <div className="k-wrap">
            <SectionHead n="02" kicker={c.services.kicker} title={c.services.title} titleId="k-services-title" lede={c.services.text} />
            <ServiceList items={c.services.items} />
          </div>
        </section>
        <Work c={c} />
        <Process c={c} />
        <ResultsSection />
        <AboutSection />
        <Pricing c={c} />
        <Faq c={c} />
        <Contact c={c} />
      </main>
      <SiteFooter c={c} />
    </div>
  )
}
