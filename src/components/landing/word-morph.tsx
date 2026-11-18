"use client"

import { useEffect, useState, type CSSProperties } from "react"

/**
 * Wechselwort in der Hero-Headline. Die Buchstaben steigen per CSS-Animation ein und aus
 * (transform + opacity). Mit „Bewegung reduzieren“ bleibt das erste Wort stehen.
 * Das Wort steht in einer eigenen Zeile – ein Wechsel verschiebt nichts im Layout.
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
      }, 460)
    }, 3400)
    return () => {
      window.clearInterval(t)
      window.clearTimeout(swap)
    }
  }, [words.length])

  const word = words[i] || ""
  return (
    <span className="k-morph" data-out={out ? "" : undefined}>
      <span className="k-morph-word" key={i}>
        {Array.from(word).map((ch, k) => (
          <span key={k} className="k-ch" style={{ "--k": k } as CSSProperties}>
            {ch}
          </span>
        ))}
      </span>
    </span>
  )
}
