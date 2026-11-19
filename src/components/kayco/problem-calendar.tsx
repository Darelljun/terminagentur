"use client"

import { useEffect, useRef, useState } from "react"
import { SectionHead } from "@/components/landing/primitives"
import { GcalBar, GcalSide, GcalWeek, KIND, WITH, WITHOUT, type Ev, type Kind } from "./gcal"

const hours = (evs: Ev[], money: boolean) => evs.filter((e) => !!KIND[e.k].money === money).reduce((a, e) => a + (e.e - e.s), 0)
const fmt = (h: number) => (Number.isInteger(h) ? String(h) : h.toFixed(1).replace(".", ",")) + " Std."

/** Problem-Abschnitt: dieselbe Woche ohne und mit KAYCO in einer Google-Kalender-Ansicht. */
export function ProblemCalendar() {
  const [withKayco, setWithKayco] = useState(false)
  // Einmaliger Aha-Moment: Sobald der Kalender gut sichtbar ist, wechselt er von selbst auf „Mit KAYCO“ –
  // aber nur, solange niemand selbst umgeschaltet hat.
  const cal = useRef<HTMLDivElement>(null)
  const touched = useRef(false)
  useEffect(() => {
    const el = cal.current
    if (!el) return
    let t = 0
    // Sichtbar heißt: Oberkante des Kalenders liegt in den oberen 55 % des Fensters. Wer nur durchscrollt,
    // bricht den Zeitgeber wieder ab – der Wechsel passiert nur, wenn man wirklich hinschaut.
    const io = new IntersectionObserver(
      ([e]) => {
        window.clearTimeout(t)
        if (!e.isIntersecting || touched.current) return
        t = window.setTimeout(() => {
          io.disconnect()
          if (!touched.current) setWithKayco(true)
        }, 1400)
      },
      { rootMargin: "0px 0px -45% 0px" },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      window.clearTimeout(t)
    }
  }, [])
  const choose = (v: boolean) => {
    touched.current = true
    setWithKayco(v)
  }
  const evs = withKayco ? WITH : WITHOUT
  const paid = hours(evs, true)
  const lost = hours(evs, false)
  const count = evs.filter((e) => KIND[e.k].money).length

  const toggle = (
    <div className="gc-switch" role="group" aria-label="Kalenderansicht">
      <button type="button" aria-pressed={!withKayco} onClick={() => choose(false)}>
        Mit Leads
      </button>
      <button type="button" aria-pressed={withKayco} onClick={() => choose(true)}>
        Mit KAYCO
      </button>
    </div>
  )

  return (
    <section id="problem" className="k-sec kay-problem" data-sec="problem" aria-labelledby="kay-problem-title">
      <div className="k-wrap">
        <SectionHead
          title="Volle Woche. Kaum Umsatz."
          titleId="kay-problem-title"
          lede="So sieht der Kalender vieler Finanzberater aus: Leads abtelefonieren, Mailbox, Nachfassen, No-Shows. Du weißt nie, ob ein Lead gut oder schlecht ist – bis du ihn angerufen hast. Zeit, die Geld kostet, statt Geld zu bringen."
        />

        <div className="gc" ref={cal} data-anim="up">
          <GcalBar right={toggle} />
          <div className="gc-body">
            <GcalSide>
              <div className="gc-sum" aria-live="polite">
                <p className="gc-sum-k">Diese Woche</p>
                <p className="kay-side-big">
                  <b>{count}</b> {count === 1 ? "Beratung" : "Beratungen"}
                </p>
                <div className="gc-sum-row">
                  <span className="gc-chk" style={{ background: KIND.beratung.bg }} />
                  <span>Beratung, die Geld bringt</span>
                  <b>{fmt(paid)}</b>
                </div>
                <div className="gc-sum-row">
                  <span className="gc-chk" style={{ background: KIND.anrufen.bg }} />
                  <span>Akquise, die Zeit frisst</span>
                  <b>{fmt(lost)}</b>
                </div>
                <p className="gc-sum-note">
                  {withKayco
                    ? "Jeder orangefarbene Slot ist ein fertiger Termin mit Briefing. Akquise: null Stunden – die übernehmen wir."
                    : "Der Rest der Woche geht für Leads drauf, von denen du vorher nicht weißt, ob sie gut oder schlecht sind."}
                </p>
              </div>
              <div className="gc-cals">
                <p>Meine Kalender</p>
                <ul>
                  {(Object.keys(KIND) as Kind[]).map((k) => (
                    <li key={k}>
                      <span className="gc-chk" style={{ background: KIND[k].bg }} />
                      {KIND[k].label}
                    </li>
                  ))}
                </ul>
              </div>
            </GcalSide>
            <GcalWeek
              sets={[
                { id: "o", evs: WITHOUT },
                { id: "w", evs: WITH },
              ]}
              active={withKayco ? "w" : "o"}
              start={8}
              end={19}
              now={11.4}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
