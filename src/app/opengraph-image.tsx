import { ImageResponse } from "next/og";

export const alt = "KAYCO – Keine Leads. Termine.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Logo (Variante 3: Bildzeichen + Schriftzug) als SVG-Daten – dieselben Formen wie BrandMark/LogoWord */
const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 64"><rect width="64" height="64" rx="16" fill="#141416"/><rect x=".75" y=".75" width="62.5" height="62.5" rx="15.25" fill="none" stroke="#3a3a3d" stroke-width="1.5"/><svg x="0" y="16" width="64" height="32" viewBox="0 16 64 32"><path d="M20 8V56M44 8L25 32L44 56" fill="none" stroke="#fff" stroke-width="7.5" stroke-miterlimit="10"/></svg><rect x="38" y="41" width="14" height="7" rx="3.5" fill="#4cc3ff"/><svg x="84" y="16" width="160" height="32" viewBox="0 0 500 100"><g fill="none" stroke="#fff" stroke-width="20" stroke-miterlimit="10"><path d="M10 -20V120M78 -20L24 50L78 120"/><path d="M100 120L142 -20L184 120M118 68H166"/><path d="M204 -20L240 48L276 -20M240 44V120"/><path d="M366.3 21.7A40 40 0 1 0 366.3 78.3"/><circle cx="440" cy="50" r="40"/></g><circle cx="440" cy="50" r="13" fill="#4cc3ff"/></svg></svg>`;
const LOGO = "data:image/svg+xml;base64," + Buffer.from(LOGO_SVG).toString("base64");

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "radial-gradient(900px at 15% 20%, rgba(2, 62, 151, 0.35), rgba(0, 0, 0, 0) 65%), radial-gradient(700px at 80% 60%, rgba(76, 195, 255, 0.16), rgba(0, 0, 0, 0) 60%), #0c0c0c",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse rendert nur <img> */}
          <img src={LOGO} width={300} height={64} alt="" />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 120, fontWeight: 700, letterSpacing: -5, color: "#ffffff", lineHeight: 1 }}>Keine Leads.</div>
          <div style={{ fontSize: 120, fontWeight: 700, letterSpacing: -5, color: "#4CC3FF", lineHeight: 1.05 }}>Termine.</div>
        </div>
        <div style={{ fontSize: 30, color: "#d1d1d1" }}>Qualifizierte Beratungstermine für Finanzdienstleister · kayco.io</div>
      </div>
    ),
    size,
  );
}
