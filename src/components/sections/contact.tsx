import { CalendarClock, Mail } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { contactMailto, site } from "@/lib/site";
import { ContactForm } from "./contact-form";
import { Chapter } from "./section-heading";

export function Contact() {
  const booking = site.bookingUrl;
  return (
    <section id="kontakt" aria-labelledby="kontakt-title" className="bg-canvas px-3 pb-3 sm:px-4 sm:pb-4">
      <div data-nav-theme="dark" className="relative overflow-hidden rounded-[36px] bg-ink py-24 text-white sm:rounded-[48px] sm:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-48 left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(47_191_133/0.16),transparent_62%)]"
        />
        <div className="container-kayco relative">
          <Reveal className="mx-auto max-w-[48rem] text-center">
            <Chapter n="10" label="Strategiegespräch" inverse className="justify-center" />
            <h2 id="kontakt-title" className="type-headline mt-5">
              Dein Kalender. <span className="serif-accent">Unser Ergebnis.</span>
            </h2>
            <p className="type-lead mx-auto mt-6 max-w-[36rem] text-white/70">
              Lass uns in einem unverbindlichen Strategiegespräch klären, wie viele Termine du brauchst, wen du beraten
              möchtest – und ob KAYCO zu dir passt.
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            {/* Buchung */}
            <Reveal className="flex flex-col rounded-[28px] bg-white/[0.06] p-7 ring-1 ring-white/10 sm:p-9">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-white text-ink">
                <CalendarClock className="size-5" strokeWidth={1.7} aria-hidden="true" />
              </span>
              <h3 className="type-title mt-6">Termin direkt buchen</h3>
              {booking ? (
                <>
                  <p className="mt-3 text-[0.9875rem] leading-relaxed text-white/70">
                    Wähle einen freien Termin für dein Strategiegespräch direkt im Online-Kalender.
                  </p>
                  <div className="mt-auto pt-8">
                    <ButtonLink href={booking} target="_blank" rel="noopener noreferrer" variant="inverse" size="lg" className="w-full">
                      Freien Termin wählen
                    </ButtonLink>
                    <p className="mt-3 text-xs text-white/50">Öffnet den Buchungskalender in einem neuen Tab.</p>
                  </div>
                </>
              ) : (
                <>
                  <p className="mt-3 text-[0.9875rem] leading-relaxed text-white/70">
                    Die Online-Terminbuchung ist vorbereitet und wird in Kürze freigeschaltet. Bis dahin vereinbaren wir dein
                    Strategiegespräch persönlich per E-Mail.
                  </p>
                  <p className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-white/[0.08] px-3 py-1.5 text-xs font-medium text-white/70 ring-1 ring-white/10">
                    <span className="size-1.5 rounded-full bg-amber-300" aria-hidden="true" />
                    Online-Kalender: noch nicht verbunden
                  </p>
                  <div className="mt-auto pt-8">
                    <ButtonLink
                      href={contactMailto("Terminwunsch Strategiegespräch", "Hallo KAYCO-Team,\n\nich möchte ein Strategiegespräch vereinbaren. Mögliche Zeiten:\n\n")}
                      variant="inverse"
                      size="lg"
                      className="w-full"
                    >
                      <Mail className="size-4" aria-hidden="true" />
                      Terminwunsch per E-Mail senden
                    </ButtonLink>
                    <p className="mt-3 text-xs text-white/50">Öffnet dein E-Mail-Programm mit einer vorbereiteten Nachricht.</p>
                  </div>
                </>
              )}
              <p className="mt-8 border-t border-white/10 pt-6 text-sm text-white/60">
                Oder direkt:{" "}
                <a href={`mailto:${site.email}`} className="font-medium text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
                  {site.email}
                </a>
              </p>
            </Reveal>

            {/* Formular */}
            <Reveal delay={0.1} className="rounded-[28px] bg-white p-7 text-ink sm:p-9">
              <h3 className="type-title">Anfrage vorbereiten</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
                Ein paar Angaben helfen uns, das Gespräch gut vorzubereiten.
              </p>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
