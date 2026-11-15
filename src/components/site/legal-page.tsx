import type { ReactNode } from "react";
import { TriangleAlert } from "lucide-react";
import { Footer } from "./footer";
import { Header } from "./header";

/** Kennzeichnet vor Veröffentlichung zu ergänzende oder zu prüfende Angaben. */
export function Todo({ children }: { children: ReactNode }) {
  return (
    <mark className="rounded-md bg-amber-100 px-1.5 py-0.5 text-[0.9375rem] text-amber-950 [box-decoration-break:clone]">
      [{children}]
    </mark>
  );
}

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <Header onHome={false} />
      <main id="main" className="pt-32 pb-24 sm:pt-40 sm:pb-32">
        <article className="container-kayco max-w-[50rem]">
          <p className="eyebrow">Rechtliches</p>
          <h1 className="text-headline mt-4 text-ink">{title}</h1>
          <p className="mt-4 text-sm text-muted-foreground">Stand: {updated}</p>

          <div role="note" className="mt-10 flex gap-3 rounded-2xl bg-amber-50 p-5 text-[0.9375rem] leading-relaxed text-amber-950 ring-1 ring-amber-200">
            <TriangleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
            <p>
              <strong className="font-semibold">Entwurf – vor Veröffentlichung rechtlich prüfen.</strong> Gelb markierte
              Stellen müssen vor dem Livegang ergänzt oder bestätigt werden. Dieser Text ersetzt keine Rechtsberatung.
            </p>
          </div>

          <div className="legal-prose mt-12 space-y-10 text-[1.0625rem] leading-[1.7] text-muted-foreground [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-4 [&_h2]:text-[1.375rem] [&_h2]:font-semibold [&_h2]:tracking-[-0.02em] [&_h2]:text-ink [&_h3]:mt-6 [&_h3]:text-[1.0625rem] [&_h3]:font-semibold [&_h3]:text-ink [&_li]:mt-1.5 [&_p]:mt-3 [&_strong]:font-medium [&_strong]:text-ink [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6">
            {children}
          </div>
        </article>
      </main>
      <Footer onHome={false} />
    </>
  );
}
