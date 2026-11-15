import Link from "next/link";
import { navItems, site } from "@/lib/site";
import { Logo } from "./logo";

export function Footer({ onHome = true }: { onHome?: boolean }) {
  const base = onHome ? "" : "/";
  return (
    <footer className="border-t border-border bg-canvas">
      <div className="container-kayco grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted-foreground">
            Qualifizierte Beratungstermine für Finanzdienstleister in Deutschland. Keine Leads. Termine.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-6 inline-flex min-h-11 items-center text-[0.9375rem] font-medium text-ink underline decoration-border underline-offset-4 transition-colors hover:decoration-ink"
          >
            {site.email}
          </a>
        </div>

        <nav aria-label="Seitenübersicht">
          <p className="text-sm font-semibold text-ink">Website</p>
          <ul className="mt-4 space-y-1">
            {navItems.map((n) => (
              <li key={n.id}>
                <a
                  href={`${base}#${n.id}`}
                  className="inline-flex min-h-9 items-center text-[0.9375rem] text-muted-foreground transition-colors hover:text-ink"
                >
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`${base}#kontakt`}
                className="inline-flex min-h-9 items-center text-[0.9375rem] text-muted-foreground transition-colors hover:text-ink"
              >
                Kontakt
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <p className="text-sm font-semibold text-ink">Unternehmen</p>
          <address className="mt-4 text-[0.9375rem] leading-relaxed text-muted-foreground not-italic">
            {site.legalName}
            <br />
            {site.address.street}
            <br />
            {site.address.zip} {site.address.city}
          </address>
          <ul className="mt-5 space-y-1">
            <li>
              <Link href="/impressum" className="inline-flex min-h-9 items-center text-[0.9375rem] text-muted-foreground transition-colors hover:text-ink">
                Impressum
              </Link>
            </li>
            <li>
              <Link href="/datenschutz" className="inline-flex min-h-9 items-center text-[0.9375rem] text-muted-foreground transition-colors hover:text-ink">
                Datenschutz
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-kayco flex flex-col gap-2 py-6 text-[0.8125rem] text-muted-foreground sm:flex-row sm:justify-between">
          <p>
            © 2026 {site.legalName}. KAYCO ist eine Marke von {site.legalName}.
          </p>
          <p>Ein B2B-Angebot für Finanzdienstleister in Deutschland.</p>
        </div>
      </div>
    </footer>
  );
}
