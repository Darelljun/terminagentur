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

/** Bildmarke: Kalenderblatt mit bestätigtem Slot (wie das Favicon). */
export function BrandMark({ className = "k-mark" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <rect x="1" y="1" width="30" height="30" rx="9" fill="currentColor" />
      <rect x="7" y="9" width="18" height="2" rx="1" fill="var(--k-bg)" opacity="0.45" />
      <rect x="7" y="14" width="10" height="9" rx="2.5" fill="var(--k-bg)" />
      <circle cx="22" cy="18.5" r="2.25" fill="var(--k-accent)" />
    </svg>
  )
}

/** Euro-Betrag im deutschen Format, z. B. „300 €“. */
export function money(value: number) {
  return new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 }).format(value) + " €"
}
