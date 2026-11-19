"use client"

import { useEffect } from "react"

/**
 * Bewegungen wie bei om-vantage.de (dort Elementor + GSAP, hier ohne Bibliothek):
 * - [data-anim]  Einblenden beim Erscheinen, einmalig: „up“ (fadeInUp), „left“ (slideInLeft),
 *                „fl“/„fr“ (fadeInLeft/Right). Der Wächter setzt `data-in`, die Animation steht in fx.css.
 * - Hero-Hintergrund folgt leicht der Maus (Motion-Effekt „Maus-Tracking“), nur mit feinem Zeiger.
 * - Endlos-Animationen (Lichtstreifen, Pfeile) pausieren außerhalb des Bildes (`data-idle`).
 * Mit „Bewegung reduzieren“ passiert nichts – alle Inhalte stehen sofort da (siehe fx.css).
 */
export function FxController() {
  // Einblenden beim Erscheinen
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const io = new IntersectionObserver(
      (es) => {
        for (const e of es) {
          if (!e.isIntersecting) continue
          e.target.setAttribute("data-in", "")
          io.unobserve(e.target)
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    )
    document.querySelectorAll("[data-anim]:not([data-in])").forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Endlos-Animationen nur im Bild
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const hosts = document.querySelectorAll<HTMLElement>(".k-hero, .k-contact, .k-foot, .kay-about")
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

  // Hero-Hintergrund folgt der Maus
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const hero = document.querySelector<HTMLElement>(".k-hero")
    if (!fine || still || !hero) return
    let raf = 0
    let x = 0
    let y = 0
    const apply = () => {
      raf = 0
      hero.style.setProperty("--hx", x.toFixed(3))
      hero.style.setProperty("--hy", y.toFixed(3))
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      const r = hero.getBoundingClientRect()
      if (e.clientY > r.bottom) return
      x = (e.clientX - r.left) / r.width - 0.5
      y = (e.clientY - r.top) / r.height - 0.5
      if (!raf) raf = requestAnimationFrame(apply)
    }
    document.addEventListener("pointermove", onMove, { passive: true })
    return () => {
      document.removeEventListener("pointermove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return null
}
