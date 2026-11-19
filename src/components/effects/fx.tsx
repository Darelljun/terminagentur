/**
 * Footer-Schriftzug wie bei om-vantage: sehr groß, nur als Kontur, unten von der Footer-Linie angeschnitten.
 * Rein dekorativ (für Screenreader ausgeblendet). Stile: src/app/fx.css („k-wordmark“).
 */
export function Wordmark({ text }: { text: string }) {
  return (
    <div className="k-wordmark" aria-hidden="true">
      <svg viewBox="0 0 1000 200" preserveAspectRatio="xMidYMax meet">
        <text x="50%" y="236" textAnchor="middle">
          {text}
        </text>
      </svg>
    </div>
  )
}
