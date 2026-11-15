import { Poppins } from "next/font/google"
import { BadgeEuro, CalendarCheck2, ClipboardList, PhoneOff, ShieldCheck, Users } from "lucide-react"
import { pricing } from "@/content/kayco"

/*
 * Über-uns-Sektion nach dem vorgegebenen Layout (Bild + schwebende Karte, Text mit Button,
 * darunter ein Raster mit sechs Punkten) – in KAYCO-Farben.
 * Poppins wird über next/font lokal ausgeliefert statt von Google Fonts geladen (DSGVO).
 */
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600"], display: "swap" })

const POINTS = [
  { icon: Users, title: "Aus der Finanzbranche", text: "Wir kommen selbst aus der Finanzdienstleistung und kennen deinen Alltag aus eigener Erfahrung." },
  { icon: PhoneOff, title: "Termine statt Leads", text: "Du rufst keinen einzigen Lead mehr an. Wir telefonieren, du berätst." },
  { icon: ClipboardList, title: "Vorqualifiziert", text: "Nur wer zu dir passt und beraten werden möchte, bekommt einen Termin." },
  { icon: CalendarCheck2, title: "Direkt im Kalender", text: "Jeder Termin steht in deinem Kalender – mit Briefing zur Vorbereitung." },
  { icon: BadgeEuro, title: "Fair abgerechnet", text: `${pricing.perAppointment} € pro Termin, ${pricing.setup} € einmalig. Keine monatlichen Agenturkosten.` },
  { icon: ShieldCheck, title: "Spezialisiert", text: "Ausschließlich für Finanzdienstleister im deutschen Markt – keine Agentur für alles." },
]

/** Stilisierte Monatsübersicht: fast jeder Slot ist ein gebuchter Termin. */
const SLOTS = Array.from({ length: 30 }, (_, i) => ![3, 11, 17, 26].includes(i))

export function AboutSection() {
  return (
    <section className={`ovs-sec kay-about ${poppins.className}`} data-sec="team" aria-labelledby="kay-about-title">
      <div className="ovs-wrap">
        {/* Bild-Fläche + Text */}
        <div className="kay-about-top">
          <div className="kay-about-visual" data-rv aria-hidden="true">
            <div className="kay-about-panel">
              <p className="kay-about-panel-k">Dein Monat mit KAYCO</p>
              <div className="kay-about-grid">
                {["Mo", "Di", "Mi", "Do", "Fr"].map((d) => (
                  <span key={d} className="kay-about-day">
                    {d}
                  </span>
                ))}
                {SLOTS.map((on, i) => (
                  <span key={i} className={on ? "kay-about-slot is-on" : "kay-about-slot"} />
                ))}
              </div>
            </div>
            <div className="kay-about-badge">
              <div className="kay-about-avs">
                <span className="kay-av" style={{ background: "#c4dc52", color: "#10150d", zIndex: 1 }}>
                  MK
                </span>
                <span className="kay-av" style={{ background: "#a9c6e4", color: "#10150d", zIndex: 2 }}>
                  DK
                </span>
                <span className="kay-av" style={{ background: "#3d6a12", color: "#fff", zIndex: 3 }}>
                  80
                </span>
              </div>
              <p>80 Neukunden bereits gewonnen</p>
            </div>
          </div>

          <div className="kay-about-copy" data-rv>
            <h2 id="kay-about-title">Über uns</h2>
            <div className="kay-about-bar" />
            <p className="kay-about-lead">
              KAYCO ist ein junges Unternehmen, gegründet in Koblenz von Magdalena Kayser und Darell Kacou. Wir kommen selbst aus
              der Finanzdienstleistungsbranche – und kennen das Problem aus eigener Erfahrung.
            </p>
            <p>
              Am Beratungswissen fehlt es selten. Es fehlt an Interessenten, an Leads, bei denen man vorher weiß, ob sie gut sind,
              und an Zeit, die nicht am Telefon verloren geht. Genau das wollten wir ändern.
            </p>
            <p>
              Deshalb konzentrieren wir uns auf eine einzige Sache: qualifizierte Beratungstermine. Du setzt dich hin und berätst –
              den Rest machen wir.
            </p>
            <a href="#contact" className="kay-about-btn">
              <span>Strategiegespräch anfragen</span>
              <svg width="13" height="12" viewBox="0 0 13 12" fill="none" aria-hidden="true">
                <path
                  d="M12.53 6.53a.75.75 0 0 0 0-1.06L7.757.697a.75.75 0 1 0-1.06 1.06L10.939 6l-4.242 4.243a.75.75 0 0 0 1.06 1.06zM0 6v.75h12v-1.5H0z"
                  fill="#fff"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Raster mit sechs Punkten */}
        <div className="kay-about-features">
          <h3 data-rv>Wofür KAYCO steht</h3>
          <p className="kay-about-sub" data-rv>
            Keine austauschbare Marketingagentur – sondern ein Partner, der nur eine Sache macht: Termine, die stattfinden.
          </p>
          <div className="kay-about-points">
            <div aria-hidden="true" className="kay-about-glow" />
            {POINTS.map(({ icon: Icon, title, text }) => (
              <div key={title} className="kay-about-point" data-rv>
                <div className="kay-about-icon">
                  <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                </div>
                <h4>{title}</h4>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{CSS}</style>
    </section>
  )
}

const CSS = `
.kay-about{background:var(--ovs-paper);color:#475569}
.kay-about .kay-about-top{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:40px}
@media (min-width:768px){.kay-about .kay-about-top{flex-direction:row;gap:clamp(56px,6vw,80px)}}
.kay-about .kay-about-visual{position:relative;width:100%;max-width:28rem;flex-shrink:0;overflow:hidden;border-radius:16px;box-shadow:0 25px 50px -12px rgba(61,106,18,.4)}
.kay-about .kay-about-panel{position:relative;aspect-ratio:4/5;padding:28px 26px 120px;background:radial-gradient(120% 80% at 80% 0%,rgba(196,220,82,.35),transparent 60%),linear-gradient(165deg,#1b3510 0%,#0e1a10 70%);display:flex;flex-direction:column}
.kay-about .kay-about-panel-k{font-size:12px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:rgba(237,241,230,.7)}
.kay-about .kay-about-grid{margin-top:18px;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px}
.kay-about .kay-about-day{font-size:10px;text-align:center;letter-spacing:.08em;color:rgba(237,241,230,.45);padding-bottom:2px}
.kay-about .kay-about-slot{height:30px;border-radius:8px;border:1px solid rgba(237,241,230,.12)}
.kay-about .kay-about-slot.is-on{background:#2fbf85;border-color:transparent;box-shadow:0 0 18px -6px rgba(47,191,133,.7)}
.kay-about .kay-about-badge{position:absolute;left:24px;bottom:24px;display:flex;align-items:center;gap:10px;max-width:18rem;background:#fff;padding:16px;border-radius:12px}
@media (min-width:640px){.kay-about .kay-about-badge{left:32px;bottom:32px}}
.kay-about .kay-about-badge p{font-size:14px;line-height:1.35;font-weight:500;color:#1e293b}
.kay-about .kay-about-avs{display:flex;flex-shrink:0}
.kay-about .kay-av{position:relative;display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:999px;border:3px solid #fff;font-size:11px;font-weight:600;transition:transform .2s}
.kay-about .kay-av+.kay-av{margin-left:-8px}
.kay-about .kay-av:hover{transform:translateY(-4px)}
.kay-about .kay-about-copy{max-width:32rem;font-size:14px;line-height:1.7;color:#475569}
.kay-about .kay-about-copy h2{font-size:20px;line-height:1.3;font-weight:600;text-transform:uppercase;letter-spacing:.02em;color:#1e293b}
.kay-about .kay-about-bar{margin-top:8px;width:96px;height:3px;border-radius:999px;background:linear-gradient(90deg,#3d6a12,#c4dc52)}
.kay-about .kay-about-copy p{margin-top:16px}
.kay-about .kay-about-copy .kay-about-lead{margin-top:32px;font-size:16px;color:#334155}
.kay-about .kay-about-btn{margin-top:32px;display:inline-flex;align-items:center;gap:8px;padding:12px 32px;border-radius:999px;background:linear-gradient(90deg,#3d6a12,#6f9a2a);color:#fff;font-size:14px;font-weight:500;transition:transform .2s}
.kay-about .kay-about-btn:hover{transform:translateY(-2px)}
.kay-about .kay-about-features{position:relative;margin-top:clamp(96px,10vw,128px)}
.kay-about .kay-about-features h3{text-align:center;font-size:30px;line-height:1.2;font-weight:600;color:#1e293b}
.kay-about .kay-about-sub{margin:8px auto 0;max-width:32rem;text-align:center;font-size:14px;line-height:1.6;color:#64748b}
.kay-about .kay-about-points{position:relative;max-width:64rem;margin:0 auto;padding-top:64px;display:grid;grid-template-columns:minmax(0,1fr);gap:56px}
@media (min-width:768px){.kay-about .kay-about-points{grid-template-columns:repeat(2,minmax(0,1fr));gap:72px 80px}}
@media (min-width:1024px){.kay-about .kay-about-points{grid-template-columns:repeat(3,minmax(0,1fr))}}
.kay-about .kay-about-icon{display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:6px;background:#f1f7e4;border:1px solid #d6e6b4;color:#3d6a12}
.kay-about .kay-about-point h4{margin-top:20px;font-size:16px;font-weight:500;color:#334155}
.kay-about .kay-about-point p{margin-top:8px;font-size:14px;line-height:1.6;color:#64748b}
.kay-about .kay-about-glow{position:absolute;left:50%;top:-20rem;width:520px;height:520px;transform:translateX(-50%);border-radius:999px;background:#fbffe1;filter:blur(150px);z-index:-1;pointer-events:none}
@media (max-width:480px){.kay-about .kay-about-panel{padding:22px 18px 110px}.kay-about .kay-about-slot{height:24px}.kay-about .kay-about-badge{left:16px;bottom:16px;right:16px}}
`
