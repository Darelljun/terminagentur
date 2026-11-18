"use client"

import { useState } from "react"
import type { Service } from "@/content/types"

/** Leistungsliste als Akkordeon. Geschlossene Inhalte sind per `inert` aus Tab-Reihenfolge und Vorlese-Baum genommen. */
export function ServiceList({ items }: { items: Service[] }) {
  const [open, setOpen] = useState(-1)
  return (
    <div className="k-svc">
      {items.map((s, i) => {
        const on = open === i
        return (
          <div key={s.title} className="k-svc-row k-reveal" data-open={on ? "" : undefined} data-spotlight="">
            <h3 className="k-svc-h">
              <button type="button" aria-expanded={on} aria-controls={"k-svc-" + i} onClick={() => setOpen(on ? -1 : i)}>
                <span className="k-svc-n">0{i + 1}</span>
                <span className="k-svc-t">{s.title}</span>
                <span className="k-svc-time">{s.time}</span>
                <span className="k-plus" aria-hidden="true" />
              </button>
            </h3>
            <div id={"k-svc-" + i} className="k-fold" role="region" aria-label={s.title} inert={!on}>
              <div>
                <div className="k-svc-body">
                  <p>{s.text}</p>
                  <ul>
                    {s.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
