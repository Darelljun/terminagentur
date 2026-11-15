import { Split } from "@/components/ui/overstory-studio-landing"
import { pricing } from "@/content/kayco"

/**
 * Gründerinnen und Gründer. Für echte Porträts `photo` setzen (Pfad in /public, z. B. "/team/magdalena.jpg").
 * Ohne Foto zeigt die Karte ein Monogramm.
 */
const FOUNDERS: { name: string; role: string; initials: string; photo?: string; tone: string }[] = [
  { name: "Magdalena Kayser", role: "Gründerin", initials: "MK", tone: "linear-gradient(160deg,#dfe8d6 0%,#9fbf7a 55%,#3d6a12 100%)" },
  { name: "Darell Kacou", role: "Gründer", initials: "DK", tone: "linear-gradient(160deg,#d4e0ee 0%,#7d9cc4 55%,#24405f 100%)" },
]

const PRINCIPLES = [
  { t: "Aus der Praxis", d: "Wir kennen Kaltakquise, Mailbox-Schleifen und No-Shows aus eigener Erfahrung – nicht aus Präsentationen." },
  { t: "Termine statt Leads", d: "Wir verkaufen keine Kontaktdaten. Wir vereinbaren Gespräche mit Menschen, die beraten werden wollen." },
  { t: "Fair abgerechnet", d: `${pricing.perAppointment} € pro Termin, ${pricing.setup} € einmalig für die Einrichtung. Keine monatlichen Agenturkosten.` },
]

export function AboutSection() {
  return (
    <section className="ovs-sec kay-team" data-sec="team" aria-labelledby="kay-team-title">
      <div className="ovs-wrap">
        <div className="ovs-head">
          <div>
            <p className="ovs-kicker" data-rv>
              <span className="ovs-kicker-n">( ✦ )</span>
              <span>Über uns</span>
            </p>
            <span id="kay-team-title">
              <Split text="Aus der Finanzbranche. Für die Finanzbranche." className="ovs-h2" />
            </span>
          </div>
          <p className="ovs-lede" data-rv>
            KAYCO ist ein junges Unternehmen aus Neuss. Gegründet von zwei Menschen, die selbst aus der
            Finanzdienstleistungsbranche kommen – und genau wissen, wo der Alltag von Finanzberatern hakt.
          </p>
        </div>

        <div className="kay-team-grid">
          <ul className="kay-founders">
            {FOUNDERS.map((f) => (
              <li key={f.name} className="kay-founder" data-rv>
                <div className="kay-portrait" style={{ background: f.tone }}>
                  {f.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={f.photo} alt={`Porträt von ${f.name}`} loading="lazy" decoding="async" />
                  ) : (
                    <span className="kay-mono" aria-hidden="true">
                      {f.initials}
                    </span>
                  )}
                  <span className="kay-portrait-shine" aria-hidden="true" />
                </div>
                <div className="kay-founder-meta">
                  <p className="kay-founder-name">{f.name}</p>
                  <p className="kay-founder-role">{f.role}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="kay-story">
            <p className="kay-story-lead" data-rv>
              Am Beratungswissen fehlt es selten. Auch nicht an der Fähigkeit, Kunden wirklich zu helfen.
            </p>
            <p data-rv>
              Das Problem beginnt vorher: zu wenige Interessenten, Leads, bei denen man nie weiß, ob sie gut oder schlecht sind,
              stundenlange Telefonate, erfolglose Kontaktversuche – und ein Kalender, der sich nicht zuverlässig füllt.
            </p>
            <p data-rv>
              Genau dieses Problem wollten wir lösen. Deshalb haben wir KAYCO gegründet und konzentrieren uns auf eine einzige
              Sache: qualifizierte Beratungstermine. Keine Kontaktlisten, keine allgemeine Marketingagentur – sondern Gespräche, die
              in deinem Kalender stehen.
            </p>
            <blockquote className="kay-belief" data-rv>
              <p>„Finanzberater sollten ihre Zeit mit Beratung verbringen – nicht damit, Kontaktdaten hinterherzutelefonieren.“</p>
              <footer>Magdalena Kayser &amp; Darell Kacou</footer>
            </blockquote>
          </div>
        </div>

        <ol className="kay-principles">
          {PRINCIPLES.map((p, i) => (
            <li key={p.t} data-rv>
              <span className="kay-principle-rule" aria-hidden="true" />
              <span className="kay-principle-n">0{i + 1}</span>
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </li>
          ))}
        </ol>
      </div>
      <style>{CSS}</style>
    </section>
  )
}

const CSS = `
.kay-team{background:linear-gradient(180deg,var(--ovs-paper),var(--ovs-mist) 120%)}
.kay-team-grid{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:clamp(40px,6vw,96px);align-items:start}
.kay-founders{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(14px,2vw,24px)}
.kay-founder{display:flex;flex-direction:column;gap:16px}
.kay-founder:nth-child(2){margin-top:clamp(36px,6vw,80px)}
.kay-portrait{position:relative;aspect-ratio:4/5;border-radius:clamp(22px,2.4vw,32px);overflow:hidden;display:grid;place-items:center;box-shadow:0 18px 36px -22px rgba(16,21,13,.4)}
.kay-portrait img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.kay-mono{font-family:var(--ovs-serif);font-size:clamp(64px,8vw,128px);line-height:1;letter-spacing:-.02em;color:rgba(255,255,255,.92);transform:scaleX(.86);}
.kay-portrait-shine{position:absolute;inset:0;background:radial-gradient(120% 70% at 20% 0%,rgba(255,255,255,.28),transparent 55%);z-index:1}
.kay-founder-name{font-family:var(--ovs-serif);font-size:clamp(24px,2.2vw,32px);line-height:1.05;letter-spacing:-.02em}
.kay-founder-role{margin-top:4px;font-size:14px;color:var(--ovs-ink2)}
.kay-story{display:flex;flex-direction:column;gap:18px;font-size:clamp(16px,1.2vw,18px);line-height:1.65;color:var(--ovs-ink2);max-width:34em}
.kay-story-lead{font-size:clamp(22px,2vw,30px);line-height:1.2;letter-spacing:-.03em;font-weight:500;color:var(--ovs-ink)}
.kay-belief{margin-top:10px;padding:22px 24px;border-radius:22px;background:var(--ovs-card);border:1px solid var(--ovs-line)}
.kay-belief p{font-family:var(--ovs-serif);font-size:clamp(20px,1.7vw,26px);line-height:1.25;color:var(--ovs-ink);letter-spacing:-.01em}
.kay-belief footer{margin-top:12px;font-size:13px;color:var(--ovs-ink2)}
.kay-principles{margin-top:clamp(64px,8vw,110px);display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:28px}
.kay-principles li{position:relative;padding-top:22px;display:flex;flex-direction:column;gap:8px}
.kay-principle-rule{position:absolute;left:0;right:0;top:0;height:1px;background:var(--ovs-ink);opacity:.2}
.kay-principle-n{font-size:13px;font-weight:600;color:var(--ovs-accent);font-variant-numeric:tabular-nums}
.kay-principles h3{font-size:clamp(20px,1.7vw,24px);letter-spacing:-.03em;font-weight:500;color:var(--ovs-ink)}
.kay-principles p{font-size:15px;line-height:1.55;color:var(--ovs-ink2);max-width:22em}
@media (max-width:900px){.kay-team-grid{grid-template-columns:1fr}.kay-principles{grid-template-columns:1fr;gap:24px}}
@media (max-width:480px){.kay-founder:nth-child(2){margin-top:28px}}
`
