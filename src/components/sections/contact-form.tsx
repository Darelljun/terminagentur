"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronDown, Info } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { buttonStyles } from "@/components/ui/button-link";
import { contactMailto, site } from "@/lib/site";
import { cn } from "@/lib/utils";

const ROLES = [
  "Selbstständige/r Finanzberater/in",
  "Versicherungsvermittler/in oder -makler/in",
  "Finanzvertrieb",
  "Finanzberatungsgesellschaft",
  "Vermögensberater/in",
  "Finanzdienstleister mit Vertriebsteam",
  "Sonstiges",
];

type Errors = Partial<Record<"name" | "email", string>>;

const fieldBase =
  "mt-2 block w-full rounded-2xl bg-canvas px-4 text-base text-ink ring-1 ring-transparent transition-[box-shadow,background-color] outline-none placeholder:text-muted-foreground/70 focus:bg-white focus:ring-2 focus:ring-ink aria-[invalid=true]:ring-destructive";

export function ContactForm() {
  const id = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [opened, setOpened] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const next: Errors = {};
    if (!get("name")) next.name = "Bitte gib deinen Namen an.";
    const email = get("email");
    if (!email) next.email = "Bitte gib deine E-Mail-Adresse an.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Bitte prüfe das Format der E-Mail-Adresse.";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`);
      first?.focus();
      return;
    }

    const optional = (label: string, key: string) => (get(key) ? [`${label}: ${get(key)}`] : []);
    const body = [
      "Hallo KAYCO-Team,",
      "",
      "ich interessiere mich für ein Strategiegespräch.",
      "",
      `Name: ${get("name")}`,
      ...optional("Unternehmen", "company"),
      `E-Mail: ${email}`,
      ...optional("Telefon", "phone"),
      ...optional("Tätigkeit", "role"),
      ...(get("message") ? ["", "Nachricht:", get("message")] : []),
    ].join("\n");
    window.location.href = contactMailto(`Anfrage Strategiegespräch – ${get("name")}`, body);
    setOpened(true);
  }

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${id}-${k}-error`} className="mt-1.5 text-sm text-destructive">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form noValidate onSubmit={onSubmit} className="mt-7 grid gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor={`${id}-name`} className="text-sm font-medium">
          Name <span className="text-muted-foreground">(Pflicht)</span>
        </label>
        <input
          id={`${id}-name`}
          name="name"
          autoComplete="name"
          className={cn(fieldBase, "h-12")}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? `${id}-name-error` : undefined}
        />
        {err("name")}
      </div>
      <div>
        <label htmlFor={`${id}-company`} className="text-sm font-medium">
          Unternehmen
        </label>
        <input id={`${id}-company`} name="company" autoComplete="organization" className={cn(fieldBase, "h-12")} />
      </div>
      <div>
        <label htmlFor={`${id}-email`} className="text-sm font-medium">
          E-Mail <span className="text-muted-foreground">(Pflicht)</span>
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          className={cn(fieldBase, "h-12")}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? `${id}-email-error` : undefined}
        />
        {err("email")}
      </div>
      <div>
        <label htmlFor={`${id}-phone`} className="text-sm font-medium">
          Telefon
        </label>
        <input id={`${id}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" className={cn(fieldBase, "h-12")} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={`${id}-role`} className="text-sm font-medium">
          Deine Tätigkeit
        </label>
        <div className="relative">
          <select id={`${id}-role`} name="role" defaultValue="" className={cn(fieldBase, "h-12 cursor-pointer appearance-none pr-11")}>
            <option value="">Bitte auswählen</option>
            {ROLES.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-4 mt-1 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        </div>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={`${id}-message`} className="text-sm font-medium">
          Worum geht es dir?
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={4}
          placeholder="z. B. Beratungsschwerpunkt, Region, gewünschte Terminanzahl"
          className={cn(fieldBase, "resize-y py-3")}
        />
      </div>

      <div className="sm:col-span-2">
        <button type="submit" className={cn(buttonStyles({ size: "lg" }), "h-auto min-h-14 w-full py-3 text-center whitespace-normal")}>
          Per E-Mail anfragen
          <ArrowRight className="size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" aria-hidden="true" />
        </button>
        <p className="mt-3 flex gap-2 text-xs leading-relaxed text-muted-foreground">
          <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          <span>
          Beim Absenden öffnet sich dein E-Mail-Programm mit einer vorbereiteten Nachricht an {site.email}. Über diese
          Website selbst werden keine Formulardaten übertragen oder gespeichert. Details in der{" "}
          <a href="/datenschutz" className="underline underline-offset-2 hover:text-ink">
            Datenschutzerklärung
          </a>
          .
          </span>
        </p>
        <div aria-live="polite">
          <AnimatePresence>
            {opened && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 rounded-2xl bg-canvas p-4 text-sm leading-relaxed text-ink"
              >
                Dein E-Mail-Programm sollte sich jetzt mit der vorbereiteten Nachricht geöffnet haben. Bitte sende sie dort
                ab. Falls sich nichts geöffnet hat, schreib uns direkt an{" "}
                <a href={`mailto:${site.email}`} className="font-medium underline underline-offset-2">
                  {site.email}
                </a>
                .
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </form>
  );
}
