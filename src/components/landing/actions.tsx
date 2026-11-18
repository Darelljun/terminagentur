"use client"

import { useState, type ReactNode } from "react"
import { site } from "@/lib/site"

/**
 * Buchungs-Link. Ist ein Buchungstool verbunden (NEXT_PUBLIC_BOOKING_URL), öffnet jeder Klick es direkt.
 * Ohne Buchungstool bleibt es ein normaler Link – standardmäßig zum Kontaktbereich (#contact).
 */
export function BookLink({ href = "#contact", className, children, onNavigate }: { href?: string; className?: string; children: ReactNode; onNavigate?: () => void }) {
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        onNavigate?.()
        if (!site.bookingUrl) return
        e.preventDefault()
        window.open(site.bookingUrl, "_blank", "noopener")
      }}
    >
      {children}
    </a>
  )
}

/** Kopiert die E-Mail-Adresse und meldet das für Screenreader. */
export function CopyEmail({ email, className, copiedLabel, icon }: { email: string; className?: string; copiedLabel: string; icon?: boolean }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    const done = () => {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    }
    if (navigator.clipboard) navigator.clipboard.writeText(email).then(done, done)
    else done()
  }
  return (
    <button type="button" className={className} onClick={copy}>
      <span aria-live="polite">{copied ? copiedLabel : email}</span>
      {icon ? (
        <svg className="k-arrow" viewBox="0 0 16 16" aria-hidden="true">
          {copied ? (
            <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          ) : (
            <path d="M5.5 5.5V3.5h7v7h-2M3.5 5.5h7v7h-7z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          )}
        </svg>
      ) : null}
    </button>
  )
}

/** „Nach oben“ im Footer. */
export function BackToTop({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      className="k-top"
      onClick={() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })
      }}
    >
      {children}
    </button>
  )
}
