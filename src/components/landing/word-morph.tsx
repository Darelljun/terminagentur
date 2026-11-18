"use client"

import { useEffect, useState } from "react"

/**
 * Wechselwort in der Hero-Headline – nach „Chromatic Text Reveal“ (honestui, 21st.dev):
 * Jedes neue Wort taucht aus der Unschärfe auf, ein farbiger Verlauf (Grün → Cyan) streicht darüber.
 * Umsetzung in CSS (registrierte Eigenschaft --sweep), ohne Motion. Mit „Bewegung reduzieren“ bleibt
 * das erste Wort stehen. Das Wort steht in einer eigenen Zeile – ein Wechsel verschiebt nichts im Layout.
 */
export function WordMorph({ words }: { words: string[] }) {
  const [i, setI] = useState(0)
  const [out, setOut] = useState(false)

  useEffect(() => {
    if (words.length < 2) return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    let swap = 0
    const t = window.setInterval(() => {
      if (mq.matches || document.hidden) return
      setOut(true)
      swap = window.setTimeout(() => {
        setI((v) => (v + 1) % words.length)
        setOut(false)
      }, 420)
    }, 3600)
    return () => {
      window.clearInterval(t)
      window.clearTimeout(swap)
    }
  }, [words.length])

  return (
    <span className="k-morph" data-out={out ? "" : undefined}>
      <span className="k-chroma" key={i}>
        {words[i] || ""}
      </span>
    </span>
  )
}
