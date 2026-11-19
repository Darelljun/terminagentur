import type { CSSProperties } from "react"
import type { LandingContent } from "@/content/types"
import { VideoCard } from "./video-card"

/** Video-Testimonials als wischbare Reihe (wie die Kunden-Videos bei om-vantage). Ohne Einträge: nichts. */
export function Testimonials({ c }: { c: LandingContent }) {
  const t = c.testimonials
  if (!t.items.length) return null
  return (
    <div className="k-testi">
      <h3 className="k-h2 k-testi-h" id="k-testi-title">
        {t.title}
      </h3>
      <ul className="k-testi-row" aria-labelledby="k-testi-title">
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
  )
}
