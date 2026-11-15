import { ArrowDown, ShieldCheck } from "lucide-react";
import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { HeroVisual } from "@/components/visuals/hero-visual";

/** Verzögerung für die CSS-Einblendung (läuft ohne JavaScript, gut für LCP). */
const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div
        aria-hidden="true"
        className="hairline-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,#000_30%,transparent_75%)]"
      />
      <div className="container-kayco relative text-center">
        <p className="eyebrow hero-in" style={d(0.05)}>
          Termingenerierung für Finanzdienstleister
        </p>
        <h1 id="hero-title" className="text-display mt-5 text-ink">
          <span className="hero-rise block" style={d(0.1)}>
            Keine Leads.
          </span>
          <span className="serif-accent hero-rise block pb-2 text-[1.08em]" style={d(0.2)}>
            Termine.
          </span>
        </h1>
        <p className="text-lead hero-rise mx-auto mt-7 max-w-[38rem] text-muted-foreground" style={d(0.3)}>
          Wir bringen qualifizierte Beratungstermine direkt in deinen Kalender. Damit du dich auf das konzentrieren
          kannst, was du am besten kannst: <span className="text-ink">beraten.</span>
        </p>

        <div className="hero-in mt-8 flex justify-center" style={d(0.4)}>
          <a
            href="#versprechen"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink ring-1 ring-border transition-[box-shadow] hover:ring-ink/25"
          >
            <ShieldCheck className="size-4 shrink-0 text-signal" strokeWidth={2} aria-hidden="true" />
            Garantie: mindestens 30 qualifizierte Termine pro Monat
          </a>
        </div>

        <div className="hero-in mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row" style={d(0.5)}>
          <ButtonLink href="#kontakt" size="lg" className="w-full sm:w-auto">
            Strategiegespräch vereinbaren
          </ButtonLink>
          <ButtonLink href="#ablauf" size="lg" variant="ghost" className="w-full sm:w-auto">
            So funktioniert KAYCO
            <ArrowDown className="size-4 transition-transform duration-200 group-hover/btn:translate-y-0.5" aria-hidden="true" />
          </ButtonLink>
        </div>
      </div>

      <HeroVisual />
    </section>
  );
}
