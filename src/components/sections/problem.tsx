import { PhoneMissed, PhoneOff, Voicemail, UserX, PhoneForwarded, Hash, PhoneCall } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ScrollWords } from "@/components/motion/scroll-words";
import { Chapter } from "./section-heading";

const LOG = [
  { time: "08:42", icon: Voicemail, status: "Mailbox" },
  { time: "08:51", icon: PhoneMissed, status: "Nicht erreicht" },
  { time: "09:05", icon: UserX, status: "Kein Bedarf mehr" },
  { time: "09:14", icon: Hash, status: "Nummer ungültig" },
  { time: "09:26", icon: PhoneForwarded, status: "Rückruf erbeten" },
  { time: "09:40", icon: Voicemail, status: "Mailbox" },
  { time: "09:58", icon: PhoneOff, status: "Besetzt" },
];

const PAINS = [
  ["Zu wenig planbare Gespräche", "Eine Woche ist voll, die nächste leer."],
  ["Unqualifizierte Leads", "Kontakte ohne echten Beratungsbedarf."],
  ["Niemand ist erreichbar", "Mailbox, besetzt, kein Rückruf."],
  ["Stundenlanges Nachtelefonieren", "Zeit am Telefon statt beim Kunden."],
  ["Hohe Agenturkosten ohne Garantie", "Pauschalen, egal ob Gespräche stattfinden."],
  ["Unzuverlässige Neukundengewinnung", "Empfehlungen allein tragen kein Wachstum."],
  ["Zu wenig Zeit für Beratung", "Akquise frisst den eigentlichen Beruf."],
];

export function Problem() {
  return (
    <section aria-labelledby="problem-title" className="relative py-24 sm:py-40">
      <div className="container-kayco">
        <Reveal>
          <Chapter n="01" label="Das Problem" />
          <h2 id="problem-title" className="sr-only">
            Das Problem: Am Beratungswissen fehlt es selten
          </h2>
        </Reveal>
        <ScrollWords
          className="mt-8 max-w-[62rem] text-[clamp(2rem,5.2vw,4.25rem)] leading-[1.08] font-semibold tracking-[-0.04em] text-ink"
          segments={[
            { text: "Am Beratungswissen fehlt es selten." },
            { text: "Es fehlt an planbaren Gesprächen, an Leads, die erreichbar sind – und an Zeit, die nicht am Telefon verloren geht.", accent: false },
            { text: "Das ändern wir.", accent: true },
          ]}
        />

        <div className="mt-20 grid items-start gap-12 sm:mt-28 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
          {/* Anrufliste */}
          <Reveal className="lg:sticky lg:top-28">
            <figure className="relative">
              <div className="shadow-float overflow-hidden rounded-[28px] bg-white ring-1 ring-black/[0.06]">
                <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-6">
                  <div className="flex items-center gap-2.5">
                    <PhoneCall className="size-4 text-ink" strokeWidth={1.7} aria-hidden="true" />
                    <p className="text-sm font-semibold text-ink">Anrufliste · gekaufte Leads</p>
                  </div>
                  <span className="rounded-md bg-canvas px-1.5 py-0.5 text-[0.625rem] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                    Illustration
                  </span>
                </div>
                <Stagger as="ul" className="divide-y divide-border">
                  {LOG.map(({ time, icon: Icon, status }, i) => (
                    <StaggerItem as="li" key={time} className="flex items-center gap-4 px-5 py-3.5 sm:px-6">
                      <span className="w-11 text-xs text-muted-foreground tabular-nums">{time}</span>
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-canvas text-muted-foreground">
                        <Icon className="size-3.5" aria-hidden="true" />
                      </span>
                      <span className="flex-1 text-sm text-ink">Kontakt {String(i + 1).padStart(2, "0")}</span>
                      <span className="rounded-full bg-black/[0.05] px-2.5 py-1 text-xs font-medium text-muted-foreground">{status}</span>
                    </StaggerItem>
                  ))}
                </Stagger>
                <div className="flex items-center justify-between bg-canvas px-5 py-4 sm:px-6">
                  <p className="text-sm text-muted-foreground">Ergebnis des Vormittags</p>
                  <p className="text-sm font-semibold text-ink">kein Beratungstermin</p>
                </div>
              </div>
              <figcaption className="mt-3 text-xs text-muted-foreground">
                Fiktives Beispiel eines Akquise-Vormittags mit gekauften Kontaktdaten.
              </figcaption>
            </figure>
          </Reveal>

          {/* Schmerzpunkte als Register */}
          <div>
            <Reveal>
              <p className="type-title max-w-[28rem] text-ink">
                Wir kennen diesen Alltag.{" "}
                <span className="text-muted-foreground">Viele Finanzberater erleben ihn jede Woche.</span>
              </p>
            </Reveal>
            <Stagger as="ol" className="mt-10 border-t border-border">
              {PAINS.map(([title, text], i) => (
                <StaggerItem
                  as="li"
                  key={title}
                  className="group grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-4 border-b border-border py-5 sm:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1fr)] sm:items-baseline"
                >
                  <span className="text-xs font-semibold text-muted-foreground tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-[1.0625rem] font-semibold tracking-[-0.015em] text-ink transition-transform duration-300 group-hover:translate-x-1 sm:text-lg">
                    {title}
                  </h3>
                  <p className="col-start-2 mt-1 text-[0.9375rem] text-muted-foreground sm:col-start-3 sm:mt-0">{text}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
