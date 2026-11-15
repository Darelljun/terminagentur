import { ArrowDown, ShieldCheck } from "lucide-react";
import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { LiveDesk } from "@/components/visuals/live-desk";

/** Verzögerung für die CSS-Einblendung (läuft ohne JavaScript, gut für LCP). */
const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-28">
      {/* Licht & Raster */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[720px] w-[1200px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(47_191_133/0.10),transparent)]" />
        <div className="absolute top-[38%] -left-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgb(11_11_13/0.05),transparent)]" />
        <div className="hairline-grid absolute inset-0 [mask-image:radial-gradient(ellipse_75%_50%_at_50%_0%,#000_25%,transparent_75%)]" />
      </div>

      <div className="container-kayco relative flex flex-col items-center text-center">
        <p
          className="hero-in order-1 inline-flex items-center gap-2 rounded-full bg-white/80 py-1.5 pr-3.5 pl-2 text-[0.8125rem] font-medium text-ink ring-1 ring-black/[0.06] backdrop-blur"
          style={d(0.05)}
        >
          <span className="h-3 w-5 rounded-[4px] bg-signal" aria-hidden="true" />
          Termingenerierung für Finanzdienstleister
        </p>
        <h1 id="hero-title" className="type-display order-2 mt-5 text-ink sm:mt-6">
          <span className="hero-rise block" style={d(0.1)}>
            Keine Leads.
          </span>
          <span className="serif-accent hero-rise block pb-2 text-[1.08em]" style={d(0.2)}>
            Termine.
          </span>
        </h1>
        <p className="type-lead hero-rise order-4 mx-auto mt-8 max-w-[37rem] text-muted-foreground sm:order-3 sm:mt-5" style={d(0.3)}>
          Wir bringen qualifizierte Beratungstermine direkt in deinen Kalender. Damit du dich auf das konzentrieren
          kannst, was du am besten kannst: <span className="text-ink">beraten.</span>
        </p>

        <div className="hero-in order-5 mt-7 flex w-full flex-col items-center justify-center gap-3 sm:order-4 sm:w-auto sm:flex-row sm:gap-4" style={d(0.42)}>
          <ButtonLink href="#kontakt" size="lg" className="w-full sm:w-auto">
            Strategiegespräch vereinbaren
          </ButtonLink>
          <ButtonLink href="#ablauf" size="lg" variant="ghost" className="w-full sm:w-auto">
            So funktioniert KAYCO
            <ArrowDown className="size-4 transition-transform duration-200 group-hover/btn:translate-y-0.5" aria-hidden="true" />
          </ButtonLink>
        </div>
        <a
          href="#versprechen"
          className="hero-in order-6 mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ink sm:order-5"
          style={d(0.5)}
        >
          <ShieldCheck className="size-4 shrink-0 text-signal" strokeWidth={2} aria-hidden="true" />
          Garantie: mindestens 30 qualifizierte Termine pro Monat
        </a>

        <div className="hero-in relative order-3 mt-8 w-full text-left sm:order-6 sm:mt-12" style={d(0.55)}>
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-10 -bottom-10 h-24 rounded-full bg-black/10 blur-3xl" />
          <LiveDesk />
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Interaktive Demo mit fiktiven Daten – tippe auf einen Schritt, um ihn anzusehen.
          </p>
        </div>
      </div>
    </section>
  );
}
