"use client"

import { ChevronLeft, ChevronRight, Euro, Menu, PhoneMissed, Search } from "lucide-react"
import { useState, type CSSProperties } from "react"
import { SectionHead } from "@/components/landing/primitives"

type Kind = "anrufen" | "mailbox" | "nachfassen" | "noshow" | "unpassend" | "beratung"
type Ev = { d: number; s: number; e: number; k: Kind; t?: string }

const DAYS = [
  { k: "Mo", n: "17" },
  { k: "Di", n: "18" },
  { k: "Mi", n: "19" },
  { k: "Do", n: "20" },
  { k: "Fr", n: "21" },
]
const START = 8
const END = 19

/** Farben angelehnt an klassische Kalender-Farbpaletten. */
const KIND: Record<Kind, { label: string; bg: string; fg: string; money?: boolean }> = {
  // Farben als Design-Tokens (src/app/kayco.css): Akquise in gedämpften Tönen, Beratung im Signalgrün
  anrufen: { label: "Leads abtelefonieren", bg: "var(--kc-call)", fg: "var(--kc-call-fg)" },
  mailbox: { label: "Mailbox – erneut anrufen", bg: "var(--kc-mail)", fg: "var(--kc-mail-fg)" },
  nachfassen: { label: "Nachfassen", bg: "var(--kc-follow)", fg: "var(--kc-follow-fg)" },
  noshow: { label: "No-Show", bg: "var(--kc-noshow)", fg: "var(--kc-noshow-fg)" },
  unpassend: { label: "Kein Bedarf", bg: "var(--kc-none)", fg: "var(--kc-none-fg)" },
  beratung: { label: "Beratung", bg: "var(--k-accent)", fg: "var(--k-accent-ink)", money: true },
}

const WITHOUT: Ev[] = [
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

const WITH: Ev[] = [
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

const SETS = [
  { id: "o", withKayco: false, evs: WITHOUT },
  { id: "w", withKayco: true, evs: WITH },
]
const hours = (evs: Ev[], money: boolean) => evs.filter((e) => !!KIND[e.k].money === money).reduce((a, e) => a + (e.e - e.s), 0)
const fmt = (h: number) => (Number.isInteger(h) ? String(h) : h.toFixed(1).replace(".", ",")) + " Std."
const pct = (h: number) => ((h - START) / (END - START)) * 100
const time = (h: number) => `${String(Math.floor(h)).padStart(2, "0")}:${String(Math.round((h % 1) * 60)).padStart(2, "0")}`

export function ProblemCalendar() {
  const [withKayco, setWithKayco] = useState(false)
  const evs = withKayco ? WITH : WITHOUT
  const paid = hours(evs, true)
  const lost = hours(evs, false)
  const count = evs.filter((e) => KIND[e.k].money).length

  return (
    <section id="problem" className="k-sec kay-problem" data-sec="problem" aria-labelledby="kay-problem-title">
      <div className="k-wrap">
        <SectionHead
          n="✦"
          kicker="Das Problem"
          title="Volle Woche. Kaum Umsatz."
          titleId="kay-problem-title"
          lede="So sieht der Kalender vieler Finanzberater aus: Leads abtelefonieren, Mailbox, Nachfassen, No-Shows. Du weißt nie, ob ein Lead gut oder schlecht ist – bis du ihn angerufen hast. Zeit, die Geld kostet, statt Geld zu bringen."
        />

        <div className="kay-cal k-reveal">
          {/* Werkzeugleiste im Kalender-Stil */}
          <div className="kay-cal-bar">
            <div className="kay-cal-left">
              <span className="kay-cal-icon" aria-hidden="true">
                <Menu size={18} />
              </span>
              <span className="kay-cal-logo" aria-hidden="true">
                <i />
                <b>{withKayco ? "21" : "17"}</b>
              </span>
              <span className="kay-cal-name">Kalender</span>
              <span className="kay-cal-today" aria-hidden="true">
                Heute
              </span>
              <span className="kay-cal-nav" aria-hidden="true">
                <ChevronLeft size={18} />
                <ChevronRight size={18} />
              </span>
              <span className="kay-cal-month">Beispielwoche</span>
            </div>
            <div className="kay-cal-right">
              <span className="kay-cal-icon kay-hide-sm" aria-hidden="true">
                <Search size={18} />
              </span>
              <div className="kay-switch" role="group" aria-label="Kalenderansicht">
                <button type="button" aria-pressed={!withKayco} onClick={() => setWithKayco(false)}>
                  Mit Leads
                </button>
                <button type="button" aria-pressed={withKayco} onClick={() => setWithKayco(true)}>
                  Mit KAYCO
                </button>
              </div>
            </div>
          </div>

          <div className="kay-cal-body">
            {/* Seitenleiste: Bilanz der Woche */}
            <aside className="kay-cal-side" aria-live="polite">
              <p className="kay-side-k">Bilanz dieser Woche</p>
              <div className="kay-side-row">
                <span className="kay-dot" style={{ background: "var(--k-accent)" }} />
                <span>Beratung, die Geld bringt</span>
                <b>{fmt(paid)}</b>
              </div>
              <div className="kay-side-row">
                <span className="kay-dot" style={{ background: "var(--kc-call)" }} />
                <span>Akquise, die Zeit frisst</span>
                <b>{fmt(lost)}</b>
              </div>
              <div className="kay-side-meter" aria-hidden="true">
                <i style={{ background: "var(--k-accent)", width: `${(paid / Math.max(1, paid + lost)) * 100}%` }} />
              </div>
              <p className="kay-side-big">
                <b>{count}</b> {count === 1 ? "Beratung" : "Beratungen"}
              </p>
              <p className="kay-side-note">
                {withKayco
                  ? "Jeder grüne Slot ist ein fertiger Termin mit Briefing. Akquise: null Stunden – die übernehmen wir."
                  : "Der Rest der Woche geht für Leads drauf, von denen du vorher nicht weißt, ob sie gut oder schlecht sind."}
              </p>
              <ul className="kay-legend">
                {(Object.keys(KIND) as Kind[]).map((k) => (
                  <li key={k}>
                    <span className="kay-dot" style={{ background: KIND[k].bg }} />
                    {KIND[k].label}
                  </li>
                ))}
              </ul>
            </aside>

            {/* Wochenansicht */}
            <div className="kay-week">
              <div className="kay-week-head">
                <span />
                {DAYS.map((d, i) => (
                  <span key={d.k} className={i > 2 ? "kay-hide-sm" : undefined}>
                    <em>{d.k}</em>
                    <b>{d.n}</b>
                  </span>
                ))}
              </div>
              <div className="kay-week-grid">
                <div className="kay-times">
                  {Array.from({ length: END - START }, (_, i) => START + i).map((h) => (
                    <span key={h} style={{ top: `${pct(h)}%` }}>
                      {h}:00
                    </span>
                  ))}
                </div>
                {DAYS.map((d, di) => (
                  <div key={d.k} className={"kay-day" + (di > 2 ? " kay-hide-sm" : "")}>
                    {Array.from({ length: END - START }, (_, i) => START + i).map((h) => (
                      <span key={h} className="kay-hline" style={{ top: `${pct(h)}%` }} aria-hidden="true" />
                    ))}
                    {/* Beide Wochen liegen übereinander; der Wechsel ist ein reiner CSS-Übergang (opacity + transform). */}
                    {SETS.map((set) =>
                      set.evs
                        .filter((e) => e.d === di)
                        .map((e) => {
                          const c = KIND[e.k]
                          const on = set.withKayco === withKayco
                          return (
                            <div
                              key={set.id + e.d + "-" + e.s}
                              className="kay-ev"
                              data-on={on ? "" : undefined}
                              aria-hidden={on ? undefined : true}
                              style={
                                {
                                  top: `${pct(e.s)}%`,
                                  height: `calc(${((e.e - e.s) / (END - START)) * 100}% - 2px)`,
                                  background: c.bg,
                                  color: c.fg,
                                  "--dl": `${(di * 0.04 + (e.s - START) * 0.012).toFixed(3)}s`,
                                } as CSSProperties
                              }
                            >
                              <p className="kay-ev-t">
                                {c.money ? <Euro size={11} strokeWidth={2.5} aria-hidden="true" /> : e.k === "mailbox" ? <PhoneMissed size={11} aria-hidden="true" /> : null}
                                {e.t ?? c.label}
                              </p>
                              {e.e - e.s >= 0.75 ? (
                                <p className="kay-ev-s">
                                  {time(e.s)} – {time(e.e)}
                                </p>
                              ) : null}
                            </div>
                          )
                        }),
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <p className="kay-cal-foot">Beispielwoche zur Veranschaulichung – keine Messwerte.</p>
      </div>
    </section>
  )
}

