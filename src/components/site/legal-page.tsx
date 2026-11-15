import type { ReactNode } from "react"
import { ArrowLeft, TriangleAlert } from "lucide-react"
import Link from "next/link"
import { site } from "@/lib/site"

/** Kennzeichnet vor Veröffentlichung zu ergänzende oder zu prüfende Angaben. */
export function Todo({ children }: { children: ReactNode }) {
  return (
    <mark className="rounded-md bg-amber-100 px-1.5 py-0.5 text-[0.9375rem] text-amber-950 [box-decoration-break:clone]">
      [{children}]
    </mark>
  )
}

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-[#f4f6f0] text-[#10150d]">
      <a
        href="#main"
        className="sr-only z-[100] rounded-full bg-[#10150d] px-5 py-3 text-sm font-medium text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Zum Inhalt springen
      </a>
      <header className="border-b border-black/10">
        <div className="container-kayco flex h-16 items-center justify-between">
          <Link href="/" className="text-[1.0625rem] font-semibold tracking-[0.14em]">
            KAYCO
          </Link>
          <Link href="/" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#4b5546] hover:text-[#10150d]">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Zur Startseite
          </Link>
        </div>
      </header>
      <main id="main" className="py-16 sm:py-24">
        <article className="container-kayco max-w-[50rem]">
          <p className="text-sm font-medium text-[#4b5546]">Rechtliches</p>
          <h1 className="type-headline mt-4">{title}</h1>
          <p className="mt-4 text-sm text-[#4b5546]">Stand: {updated}</p>

          <div role="note" className="mt-10 flex gap-3 rounded-2xl bg-amber-50 p-5 text-[0.9375rem] leading-relaxed text-amber-950 ring-1 ring-amber-200">
            <TriangleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
            <p>
              <strong className="font-semibold">Entwurf – vor Veröffentlichung rechtlich prüfen.</strong> Gelb markierte
              Stellen müssen vor dem Livegang ergänzt oder bestätigt werden. Dieser Text ersetzt keine Rechtsberatung.
            </p>
          </div>

          <div className="mt-12 space-y-10 text-[1.0625rem] leading-[1.7] text-[#4b5546] [&_a]:text-[#10150d] [&_a]:underline [&_a]:underline-offset-4 [&_h2]:text-[1.375rem] [&_h2]:font-semibold [&_h2]:tracking-[-0.02em] [&_h2]:text-[#10150d] [&_h3]:mt-6 [&_h3]:text-[1.0625rem] [&_h3]:font-semibold [&_h3]:text-[#10150d] [&_li]:mt-1.5 [&_p]:mt-3 [&_strong]:font-medium [&_strong]:text-[#10150d] [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6">
            {children}
          </div>
        </article>
      </main>
      <footer className="border-t border-black/10">
        <div className="container-kayco flex flex-col gap-3 py-8 text-sm text-[#4b5546] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 {site.legalName} · {site.address.street}, {site.address.zip} {site.address.city}
          </p>
          <nav aria-label="Rechtliches" className="flex gap-6">
            <Link href="/impressum" className="hover:text-[#10150d]">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-[#10150d]">
              Datenschutz
            </Link>
            <a href={`mailto:${site.email}`} className="hover:text-[#10150d]">
              {site.email}
            </a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
