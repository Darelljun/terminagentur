import type { CSSProperties } from "react"
import Image from "next/image"
import { Arrow } from "@/components/landing/primitives"
import { team } from "@/content/team"

/* Über uns – kurz, wie „Das sind wir“ bei om-vantage: Text links, Gründer-Karten mit Foto rechts. */
export function AboutSection() {
  return (
    <section id="team" className="k-sec kay-about" data-sec="team" aria-labelledby="kay-about-title">
      <div className="k-wrap kay-about-grid">
        <div className="kay-about-copy" data-anim="up">
          <h2 id="kay-about-title" className="k-h2">
            Über uns
          </h2>
          <p className="kay-about-lead">
            KAYCO ist ein junges Unternehmen, gegründet in Koblenz von Magdalena Kayser und Darell Kacou. Wir kommen selbst aus
            der Finanzdienstleistungsbranche – und kennen das Problem aus eigener Erfahrung.
          </p>
          <p>
            Deshalb konzentrieren wir uns auf eine einzige Sache: qualifizierte Beratungstermine. Du setzt dich hin und berätst –
            den Rest machen wir.
          </p>
          <a href="#contact" className="k-btn k-btn--primary">
            <span>Strategiegespräch anfragen</span>
            <Arrow />
          </a>
        </div>
        <ul className="kay-founders" aria-label="Gründer">
          {team.map((t, i) => (
            <li key={t.name} data-anim={i ? "fr" : "fl"} style={{ "--d": i * 0.12 + "s" } as CSSProperties}>
              <Image src={t.photo} alt={t.name} sizes="(max-width: 900px) 46vw, 320px" quality={92} />
              <b>{t.name}</b>
              <span>{t.role}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
