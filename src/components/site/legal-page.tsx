import type { ReactNode } from "react"
import { ArrowLeft, TriangleAlert } from "lucide-react"
import Link from "next/link"
import { BrandMark } from "@/components/landing/primitives"
import { site } from "@/lib/site"

/** Kennzeichnet vor Veröffentlichung zu ergänzende oder zu prüfende Angaben. */
export function Todo({ children }: { children: ReactNode }) {
  return <mark className="k-todo">[{children}]</mark>
}

/** Rahmen für Impressum und Datenschutz im KAYCO-Designsystem (Stile: src/app/kayco.css, „k-legal“). */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <div className="k-root">
      <a href="#main" className="k-skip">
        Zum Inhalt springen
      </a>
      <header className="k-legal-head">
        <div className="k-wrap">
          <Link href="/" className="k-brand">
            <BrandMark />
            <span>KAYCO</span>
          </Link>
          <Link href="/" className="k-legal-back">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Zur Startseite
          </Link>
        </div>
      </header>
      <main id="main" className="k-legal">
        <article className="k-wrap">
          <p className="k-kicker">
            <span>Rechtliches</span>
          </p>
          <h1 className="k-h2">{title}</h1>
          <p className="k-legal-meta">Stand: {updated}</p>

          <div role="note" className="k-legal-note">
            <TriangleAlert aria-hidden="true" />
            <p>
              <strong>Entwurf – vor Veröffentlichung rechtlich prüfen.</strong> Gelb markierte Stellen müssen vor dem Livegang
              ergänzt oder bestätigt werden. Dieser Text ersetzt keine Rechtsberatung.
            </p>
          </div>

          <div className="k-prose">{children}</div>
        </article>
      </main>
      <footer className="k-legal-foot">
        <div className="k-wrap">
          <p>
            © 2026 {site.legalName} · {site.address.street}, {site.address.zip} {site.address.city}
          </p>
          <nav aria-label="Rechtliches">
            <Link href="/impressum">Impressum</Link>
            <Link href="/datenschutz">Datenschutz</Link>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
