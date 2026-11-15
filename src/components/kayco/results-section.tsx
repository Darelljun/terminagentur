"use client";

import { useEffect, useRef, useState } from "react";
import { Split } from "@/components/ui/overstory-studio-landing";
import { PeakChart } from "@/components/ui/peak-chart";

const MONTHS = [
  "Jan",
  "Feb",
  "Mär",
  "Apr",
  "Mai",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Okt",
  "Nov",
  "Dez",
];
/** Schematischer Verlauf: Umsatz-Index (100 = vorher) bis zum Dreifachen. */
const SERIES: Record<string, number[]> = {
  "12 Monate": [100, 104, 112, 124, 139, 156, 175, 196, 219, 245, 272, 300],
};
const FONT =
  '"Inter Display","Inter","SF Pro Display",-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif';

export function ResultsSection() {
  const box = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(400);
  const [period, setPeriod] = useState("12 Monate");
  // Die Karte malt ihr Leuchtfeld pixelweise. Sie entsteht, sobald der Browser untätig ist
  // (oder spätestens, wenn sie sich nähert) – nicht mitten in einer Scrollbewegung.
  const [near, setNear] = useState(false);
  // Touch-Geräte: halbe Auflösung für das weiche Leuchtfeld, kein endloses „Atmen“ nach dem Einblenden.
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) =>
      setWidth(Math.round(Math.min(420, Math.max(260, e.contentRect.width)))),
    );
    ro.observe(el);
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setNear(true),
      { rootMargin: "1200px 0px" },
    );
    io.observe(el);
    const mq = window.matchMedia("(pointer: coarse)");
    const onMq = () => setCoarse(mq.matches);
    onMq();
    mq.addEventListener("change", onMq);
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const idle = w.requestIdleCallback
      ? w.requestIdleCallback(() => setNear(true), { timeout: 4000 })
      : window.setTimeout(() => setNear(true), 2500);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <section
      className="ovs-sec kay-results"
      data-sec="results"
      aria-labelledby="kay-results-title"
    >
      <div className="ovs-wrap kay-results-grid">
        <div>
          <p className="ovs-kicker ovs-kicker-light" data-rv>
            <span className="ovs-kicker-n">( ✦ )</span>
            <span>Ergebnisse</span>
          </p>
          <span id="kay-results-title">
            <Split
              text="Wenn der Kalender voll ist, wächst der Umsatz."
              className="ovs-h2"
            />
          </span>
          <dl className="kay-results-stats">
            <div data-rv>
              <dd>80</dd>
              <dt>Neukunden haben wir bereits gewonnen.</dt>
            </div>
            <div data-rv>
              <dd>3×</dd>
              <dt>So stark steigern wir den Umsatz unserer Kunden.</dt>
            </div>
          </dl>
          <p className="kay-results-text" data-rv>
            Mehr Beratungen statt mehr Akquise: Wer seine Zeit nicht mehr mit
            Leads verbringt, sondern mit vorbereiteten Gesprächen, verdient pro
            Woche mehr – bei gleichem Aufwand.
          </p>
        </div>
        <div className="kay-results-chart" ref={box} data-rv>
          {near ? (
            <PeakChart
              width={width}
              accent="#56d364"
              data={SERIES[period]}
              labels={MONTHS}
              value={3}
              valueSuffix="×"
              decimals={0}
              title="Umsatz unserer Kunden"
              caption="mit KAYCO gegenüber vorher · schematischer Verlauf"
              updatedText="Umsatz-Index"
              periods={Object.keys(SERIES)}
              period={period}
              onPeriodChange={setPeriod}
              formatValue={(v) => (v / 100).toFixed(1).replace(".", ",") + "×"}
              font={FONT}
              quality={coarse ? 0.5 : 1}
              breathe={!coarse}
            maxDpr={coarse ? 1.25 : 2}
            />
          ) : (
            <div
              aria-hidden="true"
              style={{ width, height: Math.round((width * 696) / 540) }}
            />
          )}
        </div>
      </div>
      <style>{CSS}</style>
    </section>
  );
}

const CSS = `
.kay-results{background:var(--ovs-forest);color:#edf1e6;overflow:hidden}
.kay-results .ovs-h2{color:#edf1e6}
.kay-results-grid{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:clamp(40px,6vw,96px);align-items:center}
.kay-results-stats{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:28px;margin-top:clamp(40px,5vw,64px)}
.kay-results-stats div{position:relative;padding-top:20px;border-top:1px solid rgba(237,241,230,.2);display:flex;flex-direction:column;gap:8px}
.kay-results-stats dd{font-size:clamp(56px,7vw,104px);line-height:.9;letter-spacing:-.06em;font-weight:500;color:var(--ovs-soft);font-variant-numeric:tabular-nums}
.kay-results-stats dt{font-size:15px;line-height:1.45;color:rgba(237,241,230,.72);max-width:16em}
.kay-results-text{margin-top:32px;font-size:clamp(16px,1.25vw,18.5px);line-height:1.55;color:rgba(237,241,230,.72);max-width:30em}
.kay-results-chart{display:flex;justify-content:center;min-width:0}
@media (max-width:900px){.kay-results-grid{grid-template-columns:1fr}}
`;
