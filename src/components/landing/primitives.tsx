import type { CSSProperties, ReactNode } from "react"

/*
 * Gemeinsame Bausteine des KAYCO-Designsystems (docs/design-system.md).
 * Alle Stile stehen in src/app/kayco.css unter dem Präfix „k-“.
 */

/**
 * Abschnittskopf wie bei om-vantage: Überschrift (leuchtet beim Scrollen von 10 % Weiß zum Silber-Verlauf auf),
 * optional ein Begleittext rechts (ab Tablet) bzw. darunter.
 */
export function SectionHead({ title, titleId, lede, side }: { title: string; titleId: string; lede?: ReactNode; side?: ReactNode }) {
  return (
    <div className="k-head">
      <div className="k-head-main" data-anim="up">
        <h2 id={titleId} className="k-h2">
          {title}
        </h2>
      </div>
      {lede || side ? (
        <div className="k-head-side" data-anim="up" style={{ "--d": "0.15s" } as CSSProperties}>
          {lede ? <p className="k-lede">{lede}</p> : null}
          {side}
        </div>
      ) : null}
    </div>
  )
}

export function Arrow({ down }: { down?: boolean }) {
  return (
    <svg className="k-arrow" viewBox="0 0 16 16" aria-hidden="true" style={down ? { transform: "rotate(90deg)" } : undefined}>
      <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Check() {
  return (
    <svg className="k-check" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/*
 * KAYCO-Logo (Variante 3). Bildzeichen: dunkle Kachel mit weißem „K“ und eisblauem Slot – der bestätigte Termin.
 * Schriftzug: geometrische Versalien, im „O“ ein eisblauer Punkt (der Termin im Kalender).
 * Ohne IDs (mehrfach auf einer Seite nutzbar); die Kachel ist ein CSS-Verlauf, die überstehenden Striche
 * schneidet das jeweilige SVG-Ansichtsfenster ab. Stile: kayco.css („k-mark“, „k-logo-word“).
 */
export function BrandMark({ className = "k-mark" }: { className?: string }) {
  return (
    <span className={className} aria-hidden="true">
      <svg viewBox="0 0 64 64">
        <svg x="0" y="16" width="64" height="32" viewBox="0 16 64 32">
          <path d="M20 8V56M44 8L25 32L44 56" fill="none" stroke="#fff" strokeWidth="7.5" strokeMiterlimit="10" />
        </svg>
        <rect className="k-mark-slot" x="38" y="41" width="14" height="7" rx="3.5" fill="#4cc3ff" />
      </svg>
    </span>
  )
}

export function LogoWord({ className = "k-logo-word", height = 100 }: { className?: string; height?: number }) {
  return (
    <svg className={className} viewBox={`0 0 500 ${height}`} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="20" strokeMiterlimit="10">
        <path d="M10 -20V120M78 -20L24 50L78 120" />
        <path d="M100 120L142 -20L184 120M118 68H166" />
        <path d="M204 -20L240 48L276 -20M240 44V120" />
        <path d="M366.3 21.7A40 40 0 1 0 366.3 78.3" />
        <circle cx="440" cy="50" r="40" />
      </g>
      <circle className="k-logo-slot" cx="440" cy="50" r="13" />
    </svg>
  )
}

/** Logo für Header und Rechtsseiten: Bildzeichen + Schriftzug, Name als Text für Screenreader. */
export function Logo({ name }: { name: string }) {
  return (
    <>
      <BrandMark />
      <LogoWord />
      <span className="k-sr">{name}</span>
    </>
  )
}

/** Euro-Betrag im deutschen Format, z. B. „300 €“. */
export function money(value: number) {
  return new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 }).format(value) + " €"
}
