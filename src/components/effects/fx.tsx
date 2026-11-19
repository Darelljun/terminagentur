import { LogoWord } from "@/components/landing/primitives"

/**
 * Footer-Schriftzug wie bei om-vantage: sehr groß, dezent, unten von der Footer-Linie angeschnitten –
 * in den Buchstabenformen des KAYCO-Logos. Rein dekorativ (für Screenreader ausgeblendet).
 */
export function Wordmark() {
  return (
    <div className="k-wordmark" aria-hidden="true">
      <LogoWord className="k-wordmark-svg" height={78} />
    </div>
  )
}
