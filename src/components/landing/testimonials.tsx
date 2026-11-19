import type { CSSProperties } from "react"
import type { LandingContent } from "@/content/types"
import { SectionHead } from "./primitives"
import { VideoCard } from "./video-card"

/**
 * Video-Testimonials als wischbare Reihe (wie die Kunden-Videos bei om-vantage).
 * Eigener Abschnitt nach dem Ablauf – ohne Einträge in src/content/kayco.ts erscheint er nicht.
 */
export function Testimonials({ c }: { c: LandingContent }) {
  const t = c.testimonials
  if (!t.items.length) return null
  return (
    <section id="stimmen" className="k-sec k-testi" data-sec="stimmen" aria-labelledby="k-testi-title">
      <div className="k-wrap">
        <SectionHead title={t.title} titleId="k-testi-title" />
        <ul className="k-testi-row">
          {t.items.map((it, i) => (
            <li key={it.video.src} data-anim="up" style={{ "--d": i * 0.1 + "s" } as CSSProperties}>
              <VideoCard video={it.video} />
              <p>
                <b>{it.name}</b>
                {it.role ? <span>{it.role}</span> : null}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
