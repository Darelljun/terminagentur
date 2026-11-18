import type { CaseMock, LandingContent } from "@/content/types"
import { BookLink } from "./actions"
import { Arrow, BrandMark, Kicker } from "./primitives"

/** Produktansichten in den Einblick-Karten (Inhalte wie bisher, neu gestaltet). */
function Mock({ mock, name }: { mock: CaseMock; name: string }) {
  if (mock === "mobile")
    return (
      <div className="k-mock k-mock--phone">
        <div className="k-phone-notch" />
        <p className="k-mk-sm">Nächster Termin</p>
        <p className="k-mk-big">Di, 14:00</p>
        <div className="k-phone-split">
          <span style={{ width: "58%" }} />
          <span style={{ width: "42%" }} />
        </div>
        {["Lena M. · Vorsorge", "Jonas K. · Baufi", "Sarah T. · Vermögen"].map((t, i) => (
          <div className="k-mk-row" key={t}>
            <i data-tone={i} />
            <span>{t}</span>
            <b>{["14:00", "16:30", "Do 10:00"][i]}</b>
          </div>
        ))}
      </div>
    )
  return (
    <div className="k-mock">
      <div className="k-mk-bar">
        <i />
        <i />
        <i />
        <span>{name.toLowerCase()}</span>
      </div>
      <div className="k-mk-body">
        <div className="k-mk-side">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} data-on={i === 1 ? "" : undefined} />
          ))}
        </div>
        {mock === "chat" ? (
          <div className="k-mk-main">
            <div className="k-bubble">Worum geht es Ihnen genau?</div>
            <div className="k-bubble k-bubble--me">Ich möchte wissen, ob meine Vorsorge reicht.</div>
            <div className="k-bubble">Passt Dienstag, 14 Uhr für das Beratungsgespräch?</div>
          </div>
        ) : mock === "doc" ? (
          <div className="k-mk-main">
            <p className="k-mk-sm">Terminbriefing</p>
            <p className="k-mk-h">Lena M. · Altersvorsorge</p>
            {[92, 78, 86, 60].map((w, i) => (
              <span className="k-mk-line" key={i} style={{ width: w + "%" }} />
            ))}
            <div className="k-mk-chips">
              <span>Angestellt · 2 Kinder</span>
              <span>Termin bestätigt</span>
            </div>
          </div>
        ) : (
          <div className="k-mk-main">
            <div className="k-mk-kpis">
              {[
                ["Anfragen", "neu"],
                ["Im Gespräch", "läuft"],
                ["Termine", "fix"],
              ].map((k) => (
                <div key={k[0]}>
                  <span>{k[0]}</span>
                  <b>{k[1]}</b>
                </div>
              ))}
            </div>
            <svg className="k-mk-chart" viewBox="0 0 300 110" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 90 C 30 84, 50 70, 80 74 S 130 50, 160 54 S 210 30, 240 28 S 280 14, 300 10 V110 H0z" fill="var(--k-accent-soft)" />
              <path d="M0 90 C 30 84, 50 70, 80 74 S 130 50, 160 54 S 210 30, 240 28 S 280 14, 300 10" fill="none" stroke="var(--k-accent)" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}

export function Work({ c }: { c: LandingContent }) {
  const wk = c.work
  return (
    <section id="work" className="k-sec k-work" data-sec="work" aria-labelledby="k-work-title">
      <div className="k-wrap">
        <div className="k-head">
          <div className="k-head-main k-reveal">
            <Kicker n="03" text={wk.kicker} />
            <h2 id="k-work-title" className="k-h2">
              {wk.title}
            </h2>
          </div>
        </div>
        <div className="k-cases">
          {wk.items.map((item) => (
            <article key={item.client} className="k-case k-reveal">
              <a href="#contact" className="k-case-link" aria-label={item.client + ": " + item.title}>
                <div className="k-case-art">
                  <Mock mock={item.mock} name={item.client} />
                </div>
                <div className="k-case-meta">
                  <p className="k-case-client">
                    {item.client}
                    <span>
                      {item.kind} · {item.year}
                    </span>
                  </p>
                  <h3 className="k-h3">{item.title}</h3>
                  <p className="k-case-metric">
                    <b>{item.metric}</b>
                    <span>{item.metricLabel}</span>
                  </p>
                </div>
              </a>
            </article>
          ))}
          <article className="k-case k-case--next k-reveal">
            <BookLink className="k-case-link">
              <BrandMark className="k-case-next-mark" />
              <span className="k-case-next-t">{wk.next}</span>
              <span className="k-btn k-btn--primary">
                Gespräch anfragen <Arrow />
              </span>
            </BookLink>
          </article>
        </div>
      </div>
    </section>
  )
}
