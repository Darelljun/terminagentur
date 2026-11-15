import { CalendarX2, Clock3, Hourglass, PhoneOff, ReceiptEuro, TrendingDown, UserX } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

const PROBLEMS = [
  {
    icon: CalendarX2,
    title: "Zu wenig planbare Gespräche",
    text: "Eine Woche ist voll, die nächste leer. Ohne verlässliche Termine lässt sich weder Umsatz noch Wachstum planen.",
    wide: true,
  },
  {
    icon: UserX,
    title: "Unqualifizierte Leads",
    text: "Kontaktdaten von Menschen, die sich kaum an ihre Anfrage erinnern oder gar keinen Beratungsbedarf haben.",
  },
  {
    icon: PhoneOff,
    title: "Niemand ist erreichbar",
    text: "Mailbox, besetzt, kein Rückruf. Ein großer Teil der Leads führt nie zu einem Gespräch.",
  },
  {
    icon: Clock3,
    title: "Stundenlanges Nachtelefonieren",
    text: "Zeit, die du am Telefon verbringst, statt mit Kunden zu arbeiten.",
  },
  {
    icon: ReceiptEuro,
    title: "Hohe Agenturkosten ohne Garantie",
    text: "Monatliche Pauschalen werden fällig – ganz gleich, ob am Ende Gespräche stattfinden.",
  },
  {
    icon: TrendingDown,
    title: "Unzuverlässige Neukundengewinnung",
    text: "Empfehlungen und Bestandskunden allein tragen auf Dauer kein planbares Wachstum.",
  },
  {
    icon: Hourglass,
    title: "Zu wenig Zeit für Beratung",
    text: "Akquise, Nachfassen, Organisation – für die eigentliche Beratung bleibt immer weniger übrig.",
    wide: true,
  },
];

export function Problem() {
  return (
    <section aria-labelledby="problem-title" className="bg-canvas py-24 sm:py-36">
      <div className="container-kayco">
        <SectionHeading
          id="problem-title"
          eyebrow="Das Problem"
          title={
            <>
              Am Beratungswissen liegt es selten.{" "}
              <span className="text-muted-foreground">Das Problem beginnt vorher.</span>
            </>
          }
          lead="Viele Finanzberater können Kunden hervorragend helfen. Was fehlt, sind genug passende Gespräche – und die Zeit, sie zu führen."
        />

        <Stagger as="ul" className="mt-16 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {PROBLEMS.map(({ icon: Icon, title, text, wide }) => (
            <StaggerItem
              as="li"
              key={title}
              className={cn(
                "group rounded-3xl bg-white p-7 ring-1 ring-black/[0.05] transition-[box-shadow,transform] duration-300 ease-[var(--ease-premium)] hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-24px_rgb(0_0_0/0.25)] sm:p-8",
                wide && "lg:col-span-2",
                title === "Zu wenig Zeit für Beratung" && "sm:col-span-2",
              )}
            >
              <span className="flex size-11 items-center justify-center rounded-2xl bg-canvas text-ink transition-colors duration-300 group-hover:bg-ink group-hover:text-white">
                <Icon className="size-5" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <h3 className="text-title mt-6 text-ink">{title}</h3>
              <p className="mt-2.5 max-w-[34rem] text-[0.9875rem] leading-relaxed text-muted-foreground">{text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
