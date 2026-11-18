import type { CSSProperties } from "react"

/*
 * Server-seitige Effekt-Bausteine (reines CSS, kein JavaScript im Browser), angepasst nach 21st.dev:
 * Text Scroll Reveal, Infinite Marquee, Border Beam, Sparkles, Lamp, Text Hover Effect.
 * Stile: src/app/fx.css
 */

/** „Text Scroll Reveal“: Wörter tauchen beim Scrollen gestaffelt aus der Unschärfe auf. Text bleibt identisch. */
export function SplitWords({ text }: { text: string }) {
  const words = text.split(" ")
  return (
    <>
      {words.map((w, i) => (
        <span key={i}>
          <span className="k-w" style={{ "--i": i } as CSSProperties}>
            {w}
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  )
}

/** „Infinite Marquee“: endlos laufendes Band (dekorativ, für Screenreader ausgeblendet). */
export function Marquee({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const row = (
    <ul className="k-marquee-row">
      {items.map((t, i) => (
        <li key={i}>
          <i aria-hidden="true" />
          {t}
        </li>
      ))}
    </ul>
  )
  return (
    <div className="k-marquee" data-reverse={reverse ? "" : undefined} aria-hidden="true">
      <div className="k-marquee-track">
        {row}
        {row}
      </div>
    </div>
  )
}

/** „Border Beam“ (Magic UI): Lichtpunkt, der um den Rand des Elternelements läuft. */
export function BorderBeam({ duration = 9, delay = 0, size = 180 }: { duration?: number; delay?: number; size?: number }) {
  return <span className="k-beam" aria-hidden="true" style={{ "--b-dur": duration + "s", "--b-delay": -delay + "s", "--b-size": size + "px" } as CSSProperties} />
}

/** Feste, gestreute Positionen für „Sparkles“ (ohne Zufall, damit Server und Browser gleich rendern). */
const SPARKS = Array.from({ length: 22 }, (_, i) => ({
  x: (i * 37.3) % 100,
  y: (i * 61.7) % 100,
  s: 1 + ((i * 7) % 3),
  d: 2.4 + ((i * 13) % 30) / 10,
  o: ((i * 17) % 40) / 10,
}))

/** „Sparkles“: funkelnde Lichtpunkte, die langsam aufsteigen. */
export function Sparkles() {
  return (
    <div className="k-sparkles" aria-hidden="true">
      {/* Eine gemeinsame Aufwärtsbewegung für alle Punkte statt einer je Punkt (spart Rechenzeit) */}
      <div className="k-sparkles-drift">
        {SPARKS.map((p, i) => (
          <i key={i} style={{ left: p.x + "%", top: p.y + "%", width: p.s, height: p.s, animationDuration: p.d + "s", animationDelay: -p.o + "s" }} />
        ))}
      </div>
    </div>
  )
}

/** „Lamp“ (Aceternity): Lichtkegel mit leuchtender Kante, öffnet sich beim Hineinscrollen. */
export function Lamp() {
  return (
    <div className="k-lamp" aria-hidden="true">
      <span className="k-lamp-cone k-lamp-cone--l" />
      <span className="k-lamp-cone k-lamp-cone--r" />
      <span className="k-lamp-glow" />
      <span className="k-lamp-line" />
    </div>
  )
}

/** „Text Hover Effect“ (Aceternity): Schriftzug zeichnet sich als Kontur, Verlauf folgt dem Zeiger. */
export function Wordmark({ text }: { text: string }) {
  const t = (cls: string) => (
    <text x="50%" y="56%" textAnchor="middle" dominantBaseline="middle" className={cls}>
      {text}
    </text>
  )
  return (
    <div className="k-wordmark" data-spotlight="" aria-hidden="true">
      <svg className="k-wm-base" viewBox="0 0 1000 230" preserveAspectRatio="xMidYMid meet">
        {t("k-wm-fill")}
        {t("k-wm-stroke")}
      </svg>
      {/* Verlaufsebene, per CSS-Maske nur rund um den Zeiger sichtbar */}
      <svg className="k-wm-top" viewBox="0 0 1000 230" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="k-wm-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3ddc97" />
            <stop offset="50%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#a7f3d0" />
          </linearGradient>
        </defs>
        {t("k-wm-glow")}
      </svg>
    </div>
  )
}
