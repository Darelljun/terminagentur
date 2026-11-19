import type { CSSProperties, ReactNode } from "react"
import { ChevronLeft, ChevronRight, Euro, Menu, PhoneMissed, Plus, Search } from "lucide-react"

/*
 * Kalender-Ansicht im Stil von Google Kalender (dunkler Modus, Wochenansicht) – nachgebaut, ohne Google-Logo oder
 * -Marken. Wird im Hero (kompakt, nur KAYCO-Termine) und im Problem-Abschnitt (umschaltbar) verwendet.
 * Server-tauglich: keine Hooks; der Umschalter lebt in problem-calendar.tsx. Stile: kayco.css („gc-“).
 */

export type Kind = "anrufen" | "mailbox" | "nachfassen" | "noshow" | "unpassend" | "beratung"
export type Ev = { d: number; s: number; e: number; k: Kind; t?: string }

/** Beispielwoche im November 2026; Donnerstag ist „heute“. */
export const DAYS = [
  { k: "Mo", n: 16 },
  { k: "Di", n: 17 },
  { k: "Mi", n: 18 },
  { k: "Do", n: 19 },
  { k: "Fr", n: 20 },
]
export const TODAY = 3
export const MONTH = "November 2026"

/** Ereignisfarben aus der Google-Kalender-Palette (Graphit, Heidelbeere, Banane, Tomate, Lavendel); Beratung in KAYCO-Orange. */
export const KIND: Record<Kind, { label: string; bg: string; fg: string; money?: boolean }> = {
  anrufen: { label: "Leads abtelefonieren", bg: "#616161", fg: "#ffffff" },
  mailbox: { label: "Mailbox – erneut anrufen", bg: "#3f51b5", fg: "#ffffff" },
  nachfassen: { label: "Nachfassen", bg: "#f6bf26", fg: "#1f1f1f" },
  noshow: { label: "No-Show", bg: "#d50000", fg: "#ffffff" },
  unpassend: { label: "Kein Bedarf", bg: "#7986cb", fg: "#1f1f1f" },
  beratung: { label: "Beratung", bg: "#ff8f00", fg: "#1a0e00", money: true },
}

export const WITHOUT: Ev[] = [
  { d: 0, s: 8.5, e: 10.5, k: "anrufen" },
  { d: 0, s: 10.5, e: 11.25, k: "mailbox" },
  { d: 0, s: 11.5, e: 12.5, k: "nachfassen" },
  { d: 0, s: 14, e: 15, k: "noshow", t: "No-Show · Termin abgesagt" },
  { d: 0, s: 15.25, e: 17.5, k: "anrufen" },
  { d: 1, s: 8.5, e: 9.5, k: "mailbox" },
  { d: 1, s: 9.5, e: 12, k: "anrufen" },
  { d: 1, s: 13, e: 14, k: "unpassend", t: "Kein Bedarf · Gespräch abgebrochen" },
  { d: 1, s: 14.5, e: 15.5, k: "beratung", t: "Beratung · Altersvorsorge" },
  { d: 1, s: 16, e: 18, k: "nachfassen" },
  { d: 2, s: 8.5, e: 11.5, k: "anrufen" },
  { d: 2, s: 11.5, e: 12.25, k: "mailbox" },
  { d: 2, s: 13.5, e: 15, k: "nachfassen" },
  { d: 2, s: 15.25, e: 17.75, k: "anrufen" },
  { d: 3, s: 8.5, e: 9.25, k: "mailbox" },
  { d: 3, s: 9.5, e: 10.5, k: "noshow", t: "No-Show · nicht erschienen" },
  { d: 3, s: 10.75, e: 13, k: "anrufen" },
  { d: 3, s: 14, e: 16.5, k: "nachfassen" },
  { d: 4, s: 8.5, e: 11, k: "anrufen" },
  { d: 4, s: 11.25, e: 12, k: "unpassend", t: "Lead ungültig · falsche Nummer" },
  { d: 4, s: 13, e: 14, k: "beratung", t: "Beratung · Baufinanzierung" },
  { d: 4, s: 14.5, e: 16, k: "mailbox" },
]

export const WITH: Ev[] = [
  { d: 0, s: 9, e: 10, k: "beratung", t: "Beratung · Altersvorsorge" },
  { d: 0, s: 11, e: 12, k: "beratung", t: "Beratung · Baufinanzierung" },
  { d: 0, s: 14, e: 15, k: "beratung", t: "Beratung · Vermögensaufbau" },
  { d: 0, s: 16, e: 17, k: "beratung", t: "Beratung · Absicherung" },
  { d: 1, s: 9.5, e: 10.5, k: "beratung", t: "Beratung · Altersvorsorge" },
  { d: 1, s: 13, e: 14, k: "beratung", t: "Beratung · Baufinanzierung" },
  { d: 1, s: 15, e: 16, k: "beratung", t: "Beratung · Altersvorsorge" },
  { d: 2, s: 9, e: 10, k: "beratung", t: "Beratung · Vermögensaufbau" },
  { d: 2, s: 10.5, e: 11.5, k: "beratung", t: "Beratung · Absicherung" },
  { d: 2, s: 14, e: 15, k: "beratung", t: "Beratung · Altersvorsorge" },
  { d: 2, s: 16, e: 17, k: "beratung", t: "Beratung · Baufinanzierung" },
  { d: 3, s: 9, e: 10, k: "beratung", t: "Beratung · Altersvorsorge" },
  { d: 3, s: 11, e: 12, k: "beratung", t: "Beratung · Vermögensaufbau" },
  { d: 3, s: 14.5, e: 15.5, k: "beratung", t: "Beratung · Baufinanzierung" },
  { d: 4, s: 9.5, e: 10.5, k: "beratung", t: "Beratung · Absicherung" },
  { d: 4, s: 11, e: 12, k: "beratung", t: "Beratung · Altersvorsorge" },
  { d: 4, s: 13.5, e: 14.5, k: "beratung", t: "Beratung · Vermögensaufbau" },
]

const time = (h: number) => `${Math.floor(h)}:${String(Math.round((h % 1) * 60)).padStart(2, "0")}`

/** Kopfzeile wie bei Google Kalender: Menü, Kalender-Symbol, „Heute“, Pfeile, Monat; rechts frei belegbar. */
export function GcalBar({ right, compact }: { right?: ReactNode; compact?: boolean }) {
  return (
    <div className="gc-bar">
      <div className="gc-bar-l">
        {compact ? null : (
          <span className="gc-ico" aria-hidden="true">
            <Menu size={20} />
          </span>
        )}
        <span className="gc-logo" aria-hidden="true">
          <i />
          <b>{DAYS[TODAY].n}</b>
        </span>
        <span className="gc-name">Kalender</span>
        <span className="gc-today" aria-hidden="true">
          Heute
        </span>
        <span className="gc-nav" aria-hidden="true">
          <ChevronLeft size={18} />
          <ChevronRight size={18} />
        </span>
        <span className="gc-month">{MONTH}</span>
      </div>
      <div className="gc-bar-r">
        {compact ? null : (
          <span className="gc-ico gc-hide-sm" aria-hidden="true">
            <Search size={20} />
          </span>
        )}
        {right}
      </div>
    </div>
  )
}

/** Monatsübersicht November 2026 (beginnt am Sonntag; Wochen ab Montag). */
const MINI: number[] = [26, 27, 28, 29, 30, 31, ...Array.from({ length: 30 }, (_, i) => i + 1), 1, 2, 3, 4, 5, 6]

export function GcalSide({ children }: { children?: ReactNode }) {
  return (
    <aside className="gc-side">
      <span className="gc-create" aria-hidden="true">
        <Plus size={20} />
        Erstellen
      </span>
      <div className="gc-mini" aria-hidden="true">
        <p>
          {MONTH}
          <span>
            <ChevronLeft size={16} />
            <ChevronRight size={16} />
          </span>
        </p>
        <div className="gc-mini-grid">
          {["M", "D", "M", "D", "F", "S", "S"].map((d, i) => (
            <b key={i}>{d}</b>
          ))}
          {MINI.map((n, i) => {
            const own = i >= 6 && i < 36
            const week = own && n >= DAYS[0].n && n <= DAYS[4].n
            return (
              <span key={i} className={(own ? "" : "gc-out ") + (week ? "gc-wk " : "") + (n === DAYS[TODAY].n && own ? "gc-now" : "")}>
                {n}
              </span>
            )
          })}
        </div>
      </div>
      {children}
    </aside>
  )
}

/**
 * Wochenraster. `sets` sind übereinanderliegende Wochen (z. B. ohne/mit KAYCO); sichtbar ist die Woche mit `id === active`.
 * Der Wechsel ist ein reiner CSS-Übergang. `days` begrenzt mobil die Spaltenzahl über eine Klasse.
 */
export function GcalWeek({ sets, active, start, end, now, pop }: { sets: { id: string; evs: Ev[] }[]; active: string; start: number; end: number; now?: number; pop?: boolean }) {
  const pct = (h: number) => ((h - start) / (end - start)) * 100
  const hours = Array.from({ length: end - start }, (_, i) => start + i)
  let order = 0
  return (
    <div className="gc-week">
      <div className="gc-head">
        <span className="gc-tz" aria-hidden="true">
          GMT+01
        </span>
        {DAYS.map((d, i) => (
          <span key={d.k} className={(i === TODAY ? "gc-is-today " : "") + (i > 2 ? "gc-hide-sm" : "")}>
            <em>{d.k}.</em>
            <b>{d.n}</b>
          </span>
        ))}
      </div>
      <div className="gc-grid">
        <div className="gc-times" aria-hidden="true">
          {hours.slice(1).map((h) => (
            <span key={h} style={{ top: `${pct(h)}%` }}>
              {String(h).padStart(2, "0")}:00
            </span>
          ))}
        </div>
        {DAYS.map((d, di) => (
          <div key={d.k} className={"gc-day" + (di > 2 ? " gc-hide-sm" : "")}>
            {hours.slice(1).map((h) => (
              <span key={h} className="gc-hline" style={{ top: `${pct(h)}%` }} aria-hidden="true" />
            ))}
            {sets.map((set) =>
              set.evs
                .filter((e) => e.d === di && e.s >= start && e.e <= end)
                .map((e) => {
                  const c = KIND[e.k]
                  const on = set.id === active
                  const o = order++
                  return (
                    <div
                      key={set.id + e.d + "-" + e.s}
                      className={"gc-ev" + (pop ? " gc-pop" : "")}
                      data-on={on ? "" : undefined}
                      aria-hidden={on ? undefined : true}
                      style={
                        {
                          top: `${pct(e.s)}%`,
                          height: `calc(${((e.e - e.s) / (end - start)) * 100}% - 2px)`,
                          background: c.bg,
                          color: c.fg,
                          "--dl": `${(di * 0.04 + (e.s - start) * 0.012).toFixed(3)}s`,
                          "--o": o,
                        } as CSSProperties
                      }
                    >
                      <p className="gc-ev-t">
                        {c.money ? <Euro size={11} strokeWidth={2.5} aria-hidden="true" /> : e.k === "mailbox" ? <PhoneMissed size={11} aria-hidden="true" /> : null}
                        <span>{e.t ?? c.label}</span>
                      </p>
                      {e.e - e.s >= 0.75 ? (
                        <p className="gc-ev-s">
                          {time(e.s)} – {time(e.e)}
                        </p>
                      ) : null}
                    </div>
                  )
                }),
            )}
            {now !== undefined && di === TODAY ? <span className="gc-nowline" style={{ top: `${pct(now)}%` }} aria-hidden="true" /> : null}
          </div>
        ))}
      </div>
    </div>
  )
}

/** Kompakte Wochenansicht für den Hero: nur KAYCO-Termine, die nacheinander erscheinen. */
export function GcalMini() {
  return (
    <div className="gc gc--mini" aria-hidden="true">
      <GcalBar compact />
      <GcalWeek sets={[{ id: "w", evs: WITH }]} active="w" start={8} end={18} now={11.4} pop />
    </div>
  )
}

/** Benachrichtigungen „Neuer Termin“ – die Handy-Fassung des Hero-Mediums (statt der Kalender-Woche). */
const NOTIFS = [
  { t: "Beratung · Altersvorsorge", when: "Mo., 16. Nov. · 9:00 – 10:00", ago: "vor 5 Min." },
  { t: "Beratung · Baufinanzierung", when: "Di., 17. Nov. · 13:00 – 14:00", ago: "vor 2 Min." },
  { t: "Beratung · Vermögensaufbau", when: "Mi., 18. Nov. · 9:00 – 10:00", ago: "jetzt" },
]

export function GcalNotifs() {
  return (
    <ul className="k-notifs" aria-hidden="true">
      {NOTIFS.map((n, i) => (
        <li key={n.t} className="k-notif" style={{ "--o": i } as CSSProperties}>
          <span className="gc-logo k-notif-ico">
            <b>{DAYS[TODAY].n}</b>
          </span>
          <p className="k-notif-t">Neuer Termin</p>
          <span className="k-notif-ago">{n.ago}</span>
          <p className="k-notif-b">{n.t}</p>
          <p className="k-notif-s">{n.when} · mit Briefing</p>
        </li>
      ))}
    </ul>
  )
}
