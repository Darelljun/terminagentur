"use client";

import { useEffect, useRef, useState } from "react";
import { SplitWords } from "@/components/effects/fx";
import { NumberTicker } from "@/components/effects/number-ticker";
import { Kicker } from "@/components/landing/primitives";
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
  // Die Karte malt ihr Leuchtfeld pixelweise. Sie entsteht erst, wenn die Seite geladen und die
  // Einstiegsanimation vorbei ist und der Browser untätig ist (oder früher, wenn sie sich nähert) –
  // nicht mitten in der Hero-Animation oder einer Scrollbewegung.
  const [near, setNear] = useState(false);
  // Touch-Geräte: halbe Auflösung für das weiche Leuchtfeld.
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
    let idle = 0;
    let wait = 0;
    const later = () => {
      // Hero-Einblendung dauert knapp 3 s ab dem Laden des Fotos
      wait = window.setTimeout(() => {
        idle = w.requestIdleCallback
          ? w.requestIdleCallback(() => setNear(true), { timeout: 3000 })
          : window.setTimeout(() => setNear(true), 0);
      }, 3500);
    };
    if (document.readyState === "complete") later();
    else window.addEventListener("load", later, { once: true });
    return () => {
      ro.disconnect();
      io.disconnect();
      mq.removeEventListener("change", onMq);
      window.removeEventListener("load", later);
      window.clearTimeout(wait);
      if (w.cancelIdleCallback) w.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
    };
  }, []);

  return (
    <section
      id="results"
      className="k-sec kay-results"
      data-sec="results"
      aria-labelledby="kay-results-title"
    >
      <div className="k-wrap kay-results-grid">
        <div>
          <div className="k-reveal">
            <Kicker n="✦" text="Ergebnisse" />
            <h2 id="kay-results-title" className="k-h2">
              <SplitWords text="Wenn der Kalender voll ist, wächst der Umsatz." />
            </h2>
          </div>
          <dl className="kay-results-stats">
            <div className="k-reveal">
              <dd>
                <NumberTicker value={80} />
              </dd>
              <dt>Neukunden haben wir bereits gewonnen.</dt>
            </div>
            <div className="k-reveal">
              <dd>
                <NumberTicker value={3} suffix="×" duration={1200} />
              </dd>
              <dt>So stark steigern wir den Umsatz unserer Kunden.</dt>
            </div>
          </dl>
          <p className="kay-results-text k-reveal">
            Mehr Beratungen statt mehr Akquise: Wer seine Zeit nicht mehr mit
            Leads verbringt, sondern mit vorbereiteten Gesprächen, verdient pro
            Woche mehr – bei gleichem Aufwand.
          </p>
        </div>
        <div className="kay-results-chart k-reveal" ref={box}>
          {near ? (
            <PeakChart
              width={width}
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
              breathe={false}
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
    </section>
  );
}

