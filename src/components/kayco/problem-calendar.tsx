"use client"

import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ChevronLeft, ChevronRight, Euro, Menu, PhoneMissed, Search } from "lucide-react"
import { useState } from "react"
import { Kicker, Split } from "@/components/ui/overstory-studio-landing"

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
  anrufen: { label: "Leads abtelefonieren", bg: "#616161", fg: "#fff" },
  mailbox: { label: "Mailbox – erneut anrufen", bg: "#7986cb", fg: "#fff" },
  nachfassen: { label: "Nachfassen", bg: "#f6bf26", fg: "#3c2a00" },
  noshow: { label: "No-Show", bg: "#e67c73", fg: "#fff" },
  unpassend: { label: "Kein Bedarf", bg: "#a79b8e", fg: "#fff" },
  beratung: { label: "Beratung", bg: "#0b8043", fg: "#fff", money: true },
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

const hours = (evs: Ev[], money: boolean) => evs.filter((e) => !!KIND[e.k].money === money).reduce((a, e) => a + (e.e - e.s), 0)
const fmt = (h: number) => (Number.isInteger(h) ? String(h) : h.toFixed(1).replace(".", ",")) + " Std."
const pct = (h: number) => ((h - START) / (END - START)) * 100
const time = (h: number) => `${String(Math.floor(h)).padStart(2, "0")}:${String(Math.round((h % 1) * 60)).padStart(2, "0")}`

export function ProblemCalendar() {
  const [withKayco, setWithKayco] = useState(false)
  const reduce = useReducedMotion() ?? false
  const evs = withKayco ? WITH : WITHOUT
  const paid = hours(evs, true)
  const lost = hours(evs, false)
  const count = evs.filter((e) => KIND[e.k].money).length

  return (
    <section className="ovs-sec kay-problem" data-sec="problem" aria-labelledby="kay-problem-title">
      <div className="ovs-wrap">
        <div className="ovs-head">
          <div>
            <Kicker n="✦" text="Das Problem" />
            <span id="kay-problem-title">
              <Split text="Volle Woche. Kaum Umsatz." className="ovs-h2" />
            </span>
          </div>
          <p className="ovs-lede" data-rv>
            So sieht der Kalender vieler Finanzberater aus: Leads abtelefonieren, Mailbox, Nachfassen, No-Shows. Du weißt nie, ob
            ein Lead gut oder schlecht ist – bis du ihn angerufen hast. Zeit, die Geld kostet, statt Geld zu bringen.
          </p>
        </div>

        <div className="kay-cal" data-rv>
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
                <span className="kay-dot" style={{ background: "#0b8043" }} />
                <span>Beratung, die Geld bringt</span>
                <b>{fmt(paid)}</b>
              </div>
              <div className="kay-side-row">
                <span className="kay-dot" style={{ background: "#616161" }} />
                <span>Akquise, die Zeit frisst</span>
                <b>{fmt(lost)}</b>
              </div>
              <div className="kay-side-meter" aria-hidden="true">
                <motion.i
                  style={{ background: "#0b8043" }}
                  animate={{ width: `${(paid / Math.max(1, paid + lost)) * 100}%` }}
                  transition={{ duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
                />
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
                    <AnimatePresence initial={false}>
                      {evs
                        .filter((e) => e.d === di)
                        .map((e) => {
                          const c = KIND[e.k]
                          return (
                            <motion.div
                              key={(withKayco ? "w" : "o") + e.d + "-" + e.s}
                              className="kay-ev"
                              initial={reduce ? false : { opacity: 0, scale: 0.92, y: 6 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
                              transition={{ duration: 0.35, delay: reduce ? 0 : di * 0.04 + (e.s - START) * 0.012 }}
                              style={{ top: `${pct(e.s)}%`, height: `calc(${((e.e - e.s) / (END - START)) * 100}% - 2px)`, background: c.bg, color: c.fg }}
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
                            </motion.div>
                          )
                        })}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <p className="kay-cal-foot">Beispielwoche zur Veranschaulichung – keine Messwerte.</p>
      </div>
      <style>{CSS}</style>
    </section>
  )
}

const CSS = `
.kay-problem{background:var(--ovs-paper)}
.kay-cal{background:#fff;color:#1f1f1f;border-radius:28px;box-shadow:0 1px 2px rgba(16,21,13,.06),0 40px 80px -40px rgba(16,21,13,.35);border:1px solid var(--ovs-line);overflow:hidden;font-family:"Google Sans","Product Sans",var(--ovs-sans)}
.ovs-root[data-scheme="dark"] .kay-cal{background:#1b1f1c;color:#e8eae6}
.kay-cal-bar{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 16px;border-bottom:1px solid rgba(0,0,0,.08)}
.ovs-root[data-scheme="dark"] .kay-cal-bar{border-color:rgba(255,255,255,.1)}
.kay-cal-left,.kay-cal-right{display:flex;align-items:center;gap:12px;min-width:0}
.kay-cal-icon{display:grid;place-items:center;width:36px;height:36px;border-radius:50%;color:#5f6368}
.kay-cal-logo{position:relative;width:34px;height:36px;border-radius:6px;background:#fff;border:1px solid #dadce0;display:grid;place-items:center;overflow:hidden;flex:none}
.kay-cal-logo i{position:absolute;left:0;right:0;top:0;height:8px;background:#1a73e8}
.kay-cal-logo b{font-size:14px;font-weight:600;color:#1a73e8;margin-top:6px}
.kay-cal-name{font-size:20px;color:#3c4043;letter-spacing:0}
.ovs-root[data-scheme="dark"] .kay-cal-name{color:#e8eae6}
.kay-cal-today{border:1px solid #dadce0;border-radius:999px;padding:6px 16px;font-size:14px;color:#3c4043}
.kay-cal-nav{display:flex;gap:6px;color:#5f6368}
.kay-cal-month{font-size:18px;color:#3c4043;white-space:nowrap}
.ovs-root[data-scheme="dark"] .kay-cal-month,.ovs-root[data-scheme="dark"] .kay-cal-today{color:#e8eae6}
.kay-switch{display:flex;background:#f1f3f4;border-radius:999px;padding:4px}
.kay-switch button{height:36px;padding:0 16px;border-radius:999px;font-size:14px;font-weight:550;color:#5f6368;transition:background .25s,color .25s;cursor:pointer;white-space:nowrap}
.kay-switch button[aria-pressed="true"]{background:#fff;color:#1f1f1f;box-shadow:0 1px 3px rgba(0,0,0,.15)}
.kay-switch button:last-child[aria-pressed="true"]{background:#0b8043;color:#fff}
.kay-cal-body{display:grid;grid-template-columns:270px minmax(0,1fr)}
.kay-cal-side{padding:22px 20px;border-right:1px solid rgba(0,0,0,.08);display:flex;flex-direction:column;gap:12px}
.ovs-root[data-scheme="dark"] .kay-cal-side{border-color:rgba(255,255,255,.1)}
.kay-side-k{font-size:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#5f6368}
.kay-side-row{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:10px;font-size:14px}
.kay-side-row b{font-variant-numeric:tabular-nums}
.kay-dot{width:10px;height:10px;border-radius:3px;display:inline-block;flex:none}
.kay-side-meter{height:8px;border-radius:999px;background:#616161;overflow:hidden}
.kay-side-meter i{display:block;height:100%;border-radius:999px}
.kay-side-big{font-size:15px;color:#5f6368;margin-top:8px}
.kay-side-big b{font-size:44px;line-height:1;letter-spacing:-.04em;color:#0b8043;font-weight:600;margin-right:4px;font-variant-numeric:tabular-nums}
.kay-side-note{font-size:13.5px;line-height:1.5;color:#5f6368}
.kay-legend{display:grid;gap:6px;margin-top:auto;padding-top:14px;border-top:1px solid rgba(0,0,0,.08);font-size:12.5px;color:#5f6368}
.kay-legend li{display:flex;align-items:center;gap:8px}
.kay-week{min-width:0;padding:8px 12px 16px 0}
.kay-week-head{display:grid;grid-template-columns:52px repeat(5,minmax(0,1fr));padding-bottom:8px}
.kay-week-head span{display:flex;flex-direction:column;align-items:center;gap:2px}
.kay-week-head em{font-style:normal;font-size:11px;font-weight:600;letter-spacing:.06em;color:#5f6368;text-transform:uppercase}
.kay-week-head b{font-size:24px;font-weight:400;color:#3c4043}
.ovs-root[data-scheme="dark"] .kay-week-head b{color:#e8eae6}
.kay-week-grid{position:relative;display:grid;grid-template-columns:52px repeat(5,minmax(0,1fr));height:560px}
.kay-times{position:relative}
.kay-times span{position:absolute;right:8px;transform:translateY(-50%);font-size:11px;color:#70757a;font-variant-numeric:tabular-nums}
.kay-day{position:relative;border-left:1px solid rgba(0,0,0,.08)}
.ovs-root[data-scheme="dark"] .kay-day,.ovs-root[data-scheme="dark"] .kay-hline{border-color:rgba(255,255,255,.08)}
.kay-hline{position:absolute;left:0;right:0;border-top:1px solid rgba(0,0,0,.07)}
.kay-ev{position:absolute;left:3px;right:6px;border-radius:6px;padding:3px 7px;overflow:hidden;box-shadow:0 1px 2px rgba(0,0,0,.12)}
.kay-ev-t{display:flex;align-items:center;gap:4px;font-size:12px;font-weight:500;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.kay-ev-s{font-size:11px;opacity:.85;margin-top:1px;font-variant-numeric:tabular-nums}
.kay-cal-foot{margin-top:14px;font-size:12.5px;color:var(--ovs-ink2)}
@media (max-width:960px){.kay-cal-body{grid-template-columns:1fr}.kay-cal-side{border-right:0;border-bottom:1px solid rgba(0,0,0,.08)}.kay-legend{display:none}.kay-cal-today,.kay-cal-nav{display:none}}
@media (max-width:640px){.kay-hide-sm{display:none!important}.kay-week-head,.kay-week-grid{grid-template-columns:44px repeat(3,minmax(0,1fr))}.kay-week-grid{height:500px}.kay-cal-month{display:none}.kay-cal-bar{padding:10px 12px}.kay-cal-name{font-size:17px}.kay-switch button{padding:0 12px;font-size:13px}.kay-cal-logo{display:none}.kay-cal{border-radius:22px}}
@media (max-width:400px){.kay-cal-name{display:none}}
`
