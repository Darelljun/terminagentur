import { BadgeEuro, CalendarCheck2, ClipboardList, PhoneOff, ShieldCheck, Users } from "lucide-react"
import { pricing } from "@/content/kayco"

import type { CSSProperties } from "react"
import { SplitWords } from "@/components/effects/fx"
import { Arrow } from "@/components/landing/primitives"

/*
 * Über-uns-Sektion: Monatsraster als Produktkarte mit schwebender Karte, Text mit Button,
 * darunter sechs Punkte als Karten. Stile: src/app/kayco.css („kay-about“).
 */

const POINTS = [
  { icon: Users, title: "Aus der Finanzbranche", text: "Wir kommen selbst aus der Finanzdienstleistung und kennen deinen Alltag aus eigener Erfahrung." },
  { icon: PhoneOff, title: "Termine statt Leads", text: "Du rufst keinen einzigen Lead mehr an. Wir telefonieren, du berätst." },
  { icon: ClipboardList, title: "Vorqualifiziert", text: "Nur wer zu dir passt und beraten werden möchte, bekommt einen Termin." },
  { icon: CalendarCheck2, title: "Direkt im Kalender", text: "Jeder Termin steht in deinem Kalender – mit Briefing zur Vorbereitung." },
  { icon: BadgeEuro, title: "Fair abgerechnet", text: `${pricing.perAppointment} € pro Termin, ${pricing.setup} € einmalig. Keine monatlichen Agenturkosten.` },
  { icon: ShieldCheck, title: "Spezialisiert", text: "Ausschließlich für Finanzdienstleister im deutschen Markt – keine Agentur für alles." },
]

/** Stilisierte Monatsübersicht: fast jeder Slot ist ein gebuchter Termin. */
const SLOTS = Array.from({ length: 30 }, (_, i) => ![3, 11, 17, 26].includes(i))

export function AboutSection() {
  return (
    <section id="team" className="k-sec kay-about" data-sec="team" aria-labelledby="kay-about-title">
      <div className="k-wrap">
        {/* Bild-Fläche + Text */}
        <div className="kay-about-top">
          <div className="kay-about-visual k-reveal" aria-hidden="true">
            <div className="kay-about-panel" data-tilt="" data-glow="">
              <p className="kay-about-panel-k">Dein Monat mit KAYCO</p>
              <div className="kay-about-grid">
                {["Mo", "Di", "Mi", "Do", "Fr"].map((d) => (
                  <span key={d} className="kay-about-day">
                    {d}
                  </span>
                ))}
                {SLOTS.map((on, i) => (
                  <span key={i} className={on ? "kay-about-slot is-on" : "kay-about-slot"} style={{ "--i": i } as CSSProperties} />
                ))}
              </div>
            </div>
            <div className="kay-about-badge">
              <div className="kay-about-avs">
                <span className="kay-av" data-tone="1">
                  MK
                </span>
                <span className="kay-av" data-tone="2">
                  DK
                </span>
                <span className="kay-av" data-tone="3">
                  80
                </span>
              </div>
              <p>80 Neukunden bereits gewonnen</p>
            </div>
          </div>

          <div className="kay-about-copy k-reveal">
            <span className="kay-about-bar" aria-hidden="true" />
            <h2 id="kay-about-title" className="k-h2">
              <SplitWords text="Über uns" />
            </h2>
            <p className="kay-about-lead">
              KAYCO ist ein junges Unternehmen, gegründet in Koblenz von Magdalena Kayser und Darell Kacou. Wir kommen selbst aus
              der Finanzdienstleistungsbranche – und kennen das Problem aus eigener Erfahrung.
            </p>
            <p>
              Am Beratungswissen fehlt es selten. Es fehlt an Interessenten, an Leads, bei denen man vorher weiß, ob sie gut sind,
              und an Zeit, die nicht am Telefon verloren geht. Genau das wollten wir ändern.
            </p>
            <p>
              Deshalb konzentrieren wir uns auf eine einzige Sache: qualifizierte Beratungstermine. Du setzt dich hin und berätst –
              den Rest machen wir.
            </p>
            <a href="#contact" className="k-btn k-btn--primary kay-about-btn" data-magnetic="">
              <span>Strategiegespräch anfragen</span>
              <Arrow />
            </a>
          </div>
        </div>

        {/* Raster mit sechs Punkten */}
        <div className="kay-about-features">
          <h3 className="k-reveal">Wofür KAYCO steht</h3>
          <p className="kay-about-sub k-reveal">
            Keine austauschbare Marketingagentur – sondern ein Partner, der nur eine Sache macht: Termine, die stattfinden.
          </p>
          <div className="kay-about-points">
            {POINTS.map(({ icon: Icon, title, text }) => (
              <div key={title} className="kay-about-point k-reveal" data-glow="">
                <div className="kay-about-icon">
                  <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                </div>
                <h4>{title}</h4>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

