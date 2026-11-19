"use client"

import { useRef, useState } from "react"
import type { Video } from "@/content/types"

/**
 * Video mit Vorschaubild und Play-Knopf (wie die Videos bei om-vantage). Selbst gehostet (MP4), lädt erst beim
 * Klick (`preload="none"`) – kein Drittanbieter, keine Cookies, kein Datenverbrauch vor dem Abspielen.
 */
export function VideoCard({ video, className }: { video: Video; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const play = () => {
    setPlaying(true)
    ref.current?.play().catch(() => setPlaying(false))
  }
  return (
    <div className={"k-video" + (className ? " " + className : "")} data-playing={playing ? "" : undefined}>
      <video ref={ref} src={video.src} poster={video.poster} preload="none" playsInline controls={playing} onEnded={() => setPlaying(false)} />
      {playing ? null : (
        <button type="button" className="k-video-play" onClick={play} aria-label={video.title + " abspielen"}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
          </svg>
        </button>
      )}
    </div>
  )
}
