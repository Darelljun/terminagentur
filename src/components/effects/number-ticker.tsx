"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Zahl zählt beim Hineinscrollen hoch – nach „Number Ticker“ (Magic UI, 21st.dev), ohne Motion.
 * Server und erster Render zeigen den Endwert (Suchmaschinen, kein Hydrierungs-Konflikt). Liegt die Zahl
 * beim Laden schon im Bild oder ist „Bewegung reduzieren“ aktiv, bleibt sie einfach stehen.
 */
export function NumberTicker({ value, decimals = 0, prefix = "", suffix = "", duration = 1600 }: { value: number; decimals?: number; prefix?: string; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [shown, setShown] = useState(value)

  useEffect(() => {
    const el = ref.current
    if (!el || value === 0) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const r = el.getBoundingClientRect()
    if (r.top < window.innerHeight && r.bottom > 0) return
    let raf = 0
    setShown(0)
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        const t0 = performance.now()
        const step = (now: number) => {
          const p = Math.min(1, (now - t0) / duration)
          const eased = 1 - Math.pow(2, -10 * p)
          setShown(p >= 1 ? value : value * eased)
          if (p < 1) raf = requestAnimationFrame(step)
        }
        raf = requestAnimationFrame(step)
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, duration])

  const text = new Intl.NumberFormat("de-DE", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(shown)
  return (
    <span ref={ref} className="k-ticker">
      {prefix + text + suffix}
    </span>
  )
}
