"use client"

import { useEffect } from "react"

/**
 * Ein einziger Zeiger-Listener für alle Maus-Effekte der Seite (nach 21st.dev-Vorbildern):
 * - [data-glow]       „Glowing Effect“ (Aceternity): Lichtkante folgt dem Zeiger um die Karte
 * - [data-tilt]       „Tilt“ (motion-primitives): leichte 3D-Neigung zum Zeiger
 * - [data-magnetic]   magnetischer Button: zieht sich ein paar Pixel zum Zeiger
 * - [data-spotlight]  „Spotlight“: weiches Licht an der Zeigerposition
 *
 * Läuft nur mit feinem Zeiger (Maus/Trackpad) und ohne „Bewegung reduzieren“. Pro Frame werden erst
 * alle Maße gelesen, dann alle Werte geschrieben (kein Layout-Thrashing); nur sichtbare Elemente zählen.
 */
export function FxController() {
  // Endlos-Animationen (glänzende Buttons, Lichtstreifen, Funkeln, Laufband …) laufen nur, solange ihr
  // Abschnitt im Bild ist. Außerhalb setzt der Wächter `data-idle`, und fx.css hält sie an – das spart beim
  // Scrollen auf schwächeren Handys spürbar Rechenzeit. Gilt für Maus und Touch.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const hosts = document.querySelectorAll<HTMLElement>(".k-hero, .k-marquee, .k-work, .k-process, .k-pricing, .k-contact, .k-wordmark")
    const io = new IntersectionObserver(
      (es) => {
        for (const e of es) e.target.toggleAttribute("data-idle", !e.isIntersecting)
      },
      { rootMargin: "160px 0px" },
    )
    hosts.forEach((el) => io.observe(el))
    return () => {
      io.disconnect()
      hosts.forEach((el) => el.removeAttribute("data-idle"))
    }
  }, [])

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)")
    const still = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (!fine.matches || still.matches) return

    const sel = "[data-glow],[data-tilt],[data-magnetic],[data-spotlight]"
    const visible = new Set<HTMLElement>()
    const io = new IntersectionObserver(
      (es) => {
        for (const e of es) {
          const el = e.target as HTMLElement
          if (e.isIntersecting) visible.add(el)
          else visible.delete(el)
        }
      },
      { rootMargin: "120px 0px" },
    )
    const observe = () => document.querySelectorAll<HTMLElement>(sel).forEach((el) => io.observe(el))
    observe()
    // Abschnitte, die später hydriert oder gerendert werden (z. B. Diagramm), mit erfassen
    let pending = 0
    const mo = new MutationObserver(() => {
      window.clearTimeout(pending)
      pending = window.setTimeout(observe, 400)
    })
    mo.observe(document.body, { childList: true, subtree: true })

    const angle = new WeakMap<HTMLElement, number>()
    let px = -9999
    let py = -9999
    let raf = 0

    const frame = () => {
      raf = 0
      const els = Array.from(visible)
      const rects = els.map((el) => el.getBoundingClientRect())
      els.forEach((el, i) => {
        const r = rects[i]
        const x = px - r.left
        const y = py - r.top
        const inside = x >= 0 && y >= 0 && x <= r.width && y <= r.height
        const near = px > r.left - 80 && px < r.right + 80 && py > r.top - 80 && py < r.bottom + 80

        if (el.hasAttribute("data-spotlight") || el.hasAttribute("data-glow")) {
          el.style.setProperty("--mx", x.toFixed(1) + "px")
          el.style.setProperty("--my", y.toFixed(1) + "px")
        }
        if (el.hasAttribute("data-glow")) {
          el.style.setProperty("--g-on", near ? "1" : "0")
          if (near) {
            // Winkel stetig halten (kein Sprung von 359° auf 0°), damit die Übergänge nicht einmal herumlaufen
            const target = (Math.atan2(y - r.height / 2, x - r.width / 2) * 180) / Math.PI + 90
            const cur = angle.get(el) ?? target
            const diff = ((((target - cur + 180) % 360) + 360) % 360) - 180
            const next = cur + diff
            angle.set(el, next)
            el.style.setProperty("--g-a", next.toFixed(1))
          }
        }
        if (el.hasAttribute("data-tilt")) {
          const rx = inside ? (0.5 - y / r.height) * 6 : 0
          const ry = inside ? (x / r.width - 0.5) * 8 : 0
          el.style.setProperty("--rx", rx.toFixed(2) + "deg")
          el.style.setProperty("--ry", ry.toFixed(2) + "deg")
        }
        if (el.hasAttribute("data-magnetic")) {
          const mx = inside ? (x - r.width / 2) * 0.18 : 0
          const my = inside ? (y - r.height / 2) * 0.28 : 0
          el.style.setProperty("--tx", mx.toFixed(1) + "px")
          el.style.setProperty("--ty", my.toFixed(1) + "px")
        }
      })
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      px = e.clientX
      py = e.clientY
      if (!raf) raf = requestAnimationFrame(frame)
    }
    const onLeave = () => {
      px = -9999
      py = -9999
      if (!raf) raf = requestAnimationFrame(frame)
    }
    const onScroll = () => {
      if (px > -9999 && !raf) raf = requestAnimationFrame(frame)
    }
    document.addEventListener("pointermove", onMove, { passive: true })
    document.documentElement.addEventListener("pointerleave", onLeave)
    window.addEventListener("scroll", onScroll, { passive: true })
    document.documentElement.setAttribute("data-fx", "")
    return () => {
      document.removeEventListener("pointermove", onMove)
      document.documentElement.removeEventListener("pointerleave", onLeave)
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(raf)
      io.disconnect()
      mo.disconnect()
      window.clearTimeout(pending)
      document.documentElement.removeAttribute("data-fx")
    }
  }, [])
  return null
}
