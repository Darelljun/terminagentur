"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"
import type { Link } from "@/content/types"
import { BookLink } from "./actions"
import { Arrow, BrandMark } from "./primitives"

/**
 * Header mit dem bestehenden Verhalten (übernommen aus dem Stand auf main):
 * - ab 40 px Scroll „solid“ (Fläche + Unschärfe + Haarlinie)
 * - Desktop: sticky; blendet erst nach 400 px aus, wenn ≥ 32 px am Stück nach unten gescrollt wurde,
 *   und wieder ein nach ≥ 20 px nach oben
 * - Mobil (≤ 820 px): fixiert; aus nach 16 px nach unten (ab 100 px), ein nach 16 px nach oben,
 *   nie bei offenem Menü
 * Aktiver Menüpunkt und Zustände werden direkt am DOM gesetzt – ohne Re-Render beim Scrollen.
 */
export function SiteHeader({ brand, links }: { brand: string; links: Link[] }) {
  const bar = useRef<HTMLElement>(null)
  const menuBtn = useRef<HTMLButtonElement>(null)
  const sheet = useRef<HTMLDivElement>(null)
  const [menu, setMenu] = useState(false)

  // Scroll-Verhalten
  useEffect(() => {
    const h = bar.current
    if (!h) return
    const html = document.documentElement
    const mobile = window.matchMedia("(max-width: 820px)")
    const pageTop = 0
    let previousY = Math.max(0, window.scrollY)
    let direction = 0
    let directionStart = previousY
    let desktopDirection = 0
    let desktopDistance = 0
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const y = Math.max(0, window.scrollY)
        const delta = y - previousY
        previousY = y
        h.toggleAttribute("data-solid", y > pageTop + 40)

        if (!mobile.matches) {
          if (y <= pageTop + 400) {
            h.removeAttribute("data-hidden")
            desktopDirection = 0
            desktopDistance = 0
            return
          }
          if (Math.abs(delta) < 2) return
          const nextDirection = Math.sign(delta)
          if (nextDirection !== desktopDirection) {
            desktopDirection = nextDirection
            desktopDistance = 0
          }
          desktopDistance += Math.abs(delta)
          if (desktopDirection > 0 && desktopDistance >= 32) h.setAttribute("data-hidden", "")
          if (desktopDirection < 0 && desktopDistance >= 20) h.removeAttribute("data-hidden")
          return
        }

        if (y <= pageTop + 100 || html.hasAttribute("data-menu")) {
          h.removeAttribute("data-hidden")
          direction = 0
          directionStart = y
          return
        }
        if (Math.abs(delta) < 1) return
        const nextDirection = delta > 0 ? 1 : -1
        if (direction !== nextDirection) {
          direction = nextDirection
          directionStart = y
        }
        if (direction > 0 && y - directionStart > 16) h.setAttribute("data-hidden", "")
        else if (direction < 0 && directionStart - y > 16) h.removeAttribute("data-hidden")
      })
    }
    const onModeChange = () => {
      h.removeAttribute("data-hidden")
      previousY = Math.max(0, window.scrollY)
      direction = 0
      directionStart = previousY
      desktopDirection = 0
      desktopDistance = 0
      onScroll()
      // Menü schließen, wenn auf Desktop-Breite gewechselt wird
      if (!mobile.matches) setMenu(false)
    }
    mobile.addEventListener("change", onModeChange)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()

    // Aktiven Menüpunkt markieren
    const mark = (sec: string) => {
      h.querySelectorAll(".k-nav-links a").forEach((a) => a.toggleAttribute("data-on", a.getAttribute("href") === "#" + sec))
    }
    const io = new IntersectionObserver(
      (es) => {
        for (const e of es) if (e.isIntersecting) mark((e.target as HTMLElement).dataset.sec || "")
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )
    document.querySelectorAll("[data-sec]").forEach((s) => io.observe(s))

    return () => {
      mobile.removeEventListener("change", onModeChange)
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [])

  // Menü: Hintergrund sperren, Fokus hinein und zurück, Escape, Tab-Falle
  useEffect(() => {
    const html = document.documentElement
    html.toggleAttribute("data-menu", menu)
    if (!menu) return
    const btn = menuBtn.current
    sheet.current?.querySelector<HTMLElement>("a,button")?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false)
        btn?.focus()
      }
      if (e.key === "Tab" && sheet.current) {
        const f = [btn, ...Array.from(sheet.current.querySelectorAll<HTMLElement>("a,button"))].filter(Boolean) as HTMLElement[]
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("keydown", onKey)
      html.removeAttribute("data-menu")
    }
  }, [menu])

  // Beim Antippen eines Menülinks: Sperre sofort lösen, damit der Browser zum Ziel scrollen kann
  const closeForNav = () => {
    document.documentElement.removeAttribute("data-menu")
    setMenu(false)
  }

  return (
    <>
      <header ref={bar} className="k-nav" data-open={menu ? "" : undefined}>
        <div className="k-nav-in">
          <a className="k-brand" href="#top" onClick={() => setMenu(false)}>
            <BrandMark />
            <span>{brand}</span>
          </a>
          <nav className="k-nav-links" aria-label="Hauptnavigation">
            {links.map((l) => (
              <a key={l.label} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="k-nav-end">
            <BookLink className="k-btn k-btn--primary k-btn--sm k-nav-cta" data-magnetic="">
              <span>Gespräch buchen</span>
              <Arrow />
            </BookLink>
            <button ref={menuBtn} type="button" className="k-icon-btn k-burger" aria-expanded={menu} aria-controls="k-menu" aria-label="Menü" onClick={() => setMenu((m) => !m)}>
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      <div id="k-menu" ref={sheet} className="k-sheet" role="dialog" aria-modal="true" aria-label="Menü" hidden={!menu}>
        <div className="k-sheet-links">
          {links.map((l, i) => (
            <a key={l.label} href={l.href} onClick={closeForNav} style={{ "--i": i } as CSSProperties}>
              <span>0{i + 1}</span>
              {l.label}
            </a>
          ))}
        </div>
        <BookLink className="k-btn k-btn--primary k-btn--lg" onNavigate={closeForNav}>
          Strategiegespräch <Arrow />
        </BookLink>
      </div>
    </>
  )
}
