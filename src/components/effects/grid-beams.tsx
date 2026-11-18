"use client"

import { useEffect, useRef } from "react"

/**
 * Lichtstrahlen auf den Rasterlinien des Hero-Hintergrunds – angepasst nach „Grid Beam“ (cult-ui, 21st.dev).
 * Änderungen gegenüber dem Original: KAYCO-Farben (Signalgrün/Cyan), nur jede zweite Linie bekommt einen
 * Strahl, Pixeldichte begrenzt, Schleife pausiert außerhalb des Bildes und im Hintergrund-Tab, mit
 * „Bewegung reduzieren“ wird nichts gezeichnet. Raster: 88 × 64 px, ab links oben (wie .k-hero-bg).
 */
const CELL_W = 88
const CELL_H = 64
const COLORS: [number, number, number][] = [
  [61, 220, 151],
  [34, 211, 238],
  [120, 240, 190],
]

export function GridBeams() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const ctx = cv.getContext("2d")
    if (!ctx) return
    const coarse = window.matchMedia("(pointer: coarse)").matches
    const dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.25 : 1.5)
    let w = 0
    let h = 0
    let raf = 0
    let visible = true
    // Erst zeichnen, wenn die Seite nach dem Laden zur Ruhe kommt – der Hero-Text hat beim Start Vorrang.
    let ready = false
    let start = 0

    const resize = () => {
      const r = cv.getBoundingClientRect()
      w = r.width
      h = r.height
      cv.width = Math.round(w * dpr)
      cv.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(cv)

    const beam = (x0: number, y0: number, x1: number, y1: number, rgb: [number, number, number], a: number) => {
      const g = ctx.createLinearGradient(x0, y0, x1, y1)
      const [r, gg, b] = rgb
      g.addColorStop(0, `rgba(${r},${gg},${b},0)`)
      g.addColorStop(0.45, `rgba(${r},${gg},${b},${(a * 0.7).toFixed(3)})`)
      g.addColorStop(0.5, `rgba(${Math.min(255, r + 120)},${Math.min(255, gg + 60)},${Math.min(255, b + 80)},${a.toFixed(3)})`)
      g.addColorStop(1, `rgba(${r},${gg},${b},0)`)
      ctx.strokeStyle = g
      ctx.beginPath()
      ctx.moveTo(x0, y0)
      ctx.lineTo(x1, y1)
      ctx.stroke()
    }

    const draw = (now: number) => {
      raf = 0
      if (!visible || document.hidden) return
      const t = (now - start) / 1000
      const fade = Math.min(1, t / 1.2)
      ctx.clearRect(0, 0, w, h)
      ctx.lineWidth = 1.4
      const rows = Math.floor(h / CELL_H)
      const cols = Math.floor(w / CELL_W)
      const len = coarse ? 120 : 170
      // waagerechte Strahlen auf jeder zweiten Linie
      for (let r = 1; r <= rows; r += 2) {
        const y = r * CELL_H + 0.5
        const speed = 0.11 + (r % 3) * 0.035
        const p = (t * speed + r * 0.37) % 1.3
        const x = p * (w + len * 2) - len
        const dir = r % 4 === 1 ? 1 : -1
        const xx = dir > 0 ? x : w - x
        beam(xx - len * dir, y, xx, y, COLORS[r % COLORS.length], 0.55 * fade)
      }
      // senkrechte Strahlen auf jeder zweiten Spalte (versetzt)
      for (let c = 2; c <= cols; c += 2) {
        const x = c * CELL_W + 0.5
        const speed = 0.09 + (c % 3) * 0.03
        const p = (t * speed + c * 0.29) % 1.4
        const y = p * (h + len * 2) - len
        beam(x, y - len, x, y, COLORS[(c + 1) % COLORS.length], 0.45 * fade)
      }
      raf = requestAnimationFrame(draw)
    }

    const kick = () => {
      if (ready && !raf && visible && !document.hidden) raf = requestAnimationFrame(draw)
    }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      kick()
    })
    io.observe(cv)
    document.addEventListener("visibilitychange", kick)
    const begin = () => {
      ready = true
      start = performance.now()
      kick()
    }
    const ric = window.requestIdleCallback as typeof window.requestIdleCallback | undefined
    const idle = ric ? ric(begin, { timeout: 1500 }) : 0
    const tid = ric ? 0 : window.setTimeout(begin, 900)
    return () => {
      if (idle) window.cancelIdleCallback(idle)
      window.clearTimeout(tid)
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener("visibilitychange", kick)
    }
  }, [])

  return <canvas ref={ref} className="k-beams" aria-hidden="true" />
}
